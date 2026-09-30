import jsPDF from 'jspdf'
import { EBGaramondRegular } from '../fonts/EBGaramond-Regular'
import { EBGaramondItalic } from '../fonts/EBGaramond-Italic'
import { EBGaramondBold } from '../fonts/EBGaramond-Bold'
import { EBGaramondBoldItalic } from '../fonts/EBGaramond-BoldItalic'

// ─── Lulu cover spec ──────────────────────────────────────────────────────────
//
// Dimensions come from Lulu's /cover-dimensions/ endpoint — always pass those
// in as luluWidth/luluHeight/luluSpine.
//
// THE RULE THIS FILE NOW FOLLOWS:
//   Nothing is positioned from TRIM_W or BLEED. Every panel edge is derived
//   from the sheet Lulu gave us and the spine Lulu gave us. The only binding-
//   specific constant is EDGE_ALLOWANCE — how much of each side disappears
//   when the cover is finished.
//
// Why that matters (the June–Sept 2026 hardcover bug):
//   Softcover loses 3.175mm of bleed per side. A hardcover case wrap folds
//   22.225mm around the board on every side. The old code laid everything out
//   as though only the bleed was lost, so on hardcover the front footer printed
//   13mm outside the finished cover (gone), the content block centred 9mm too
//   high (dead space along the bottom), and two hand-tuned "nudge" constants
//   pushed the front panel a further 3mm sideways. Deriving the safe area from
//   EDGE_ALLOWANCE removes all three at once and needs no magic numbers.

const TRIM_W = 152.4   // mm — 6in. Fallback sizing only; never used for layout.
const TRIM_H = 228.6   // mm — 9in. Fallback sizing only; never used for layout.
const FLAP_W = 76.2    // mm — standard 3in dust jacket flap

/**
 * Distance from the PDF edge to the visible edge of the finished cover.
 *
 *  softcover / dustjacket — 3.175mm (0.125in) bleed, trimmed off.
 *  hardcover case wrap    — 22.225mm (0.875in) folded around the board.
 *
 * The hardcover figure is confirmed against Lulu's own published spec for
 * 0600X0900.FC.PRE.CW.080CW444.GXX: a 365.12mm sheet with a 15.88mm spine
 * leaves (365.12 - 152.4*2 - 15.88) / 2 = 22.225mm per side.
 */
const EDGE_ALLOWANCE: Record<string, number> = {
  softcover:  3.175,
  hardcover:  22.225,
  dustjacket: 3.175,
}

/** Keep text and rules at least this far inside the visible edge. */
const SAFE_MARGIN = 8 // mm

const IMG_QUALITY = 0.85

// ─── Colours ──────────────────────────────────────────────────────────────────
const C_PAGE_BG   = [248, 244, 239] as const
const C_PRIMARY   = [38, 34, 32]    as const
const C_SECONDARY = [92, 84, 78]    as const
const C_MUTED     = [140, 132, 126] as const
const C_ACCENT    = [148, 116, 74]  as const
const C_DIVIDER   = [221, 214, 206] as const
const C_DARK      = [28, 25, 23]    as const
const C_SPINE_BG  = [240, 235, 228] as const

// ─── Helpers ──────────────────────────────────────────────────────────────────

function setFill(doc: jsPDF, c: readonly number[]) { doc.setFillColor(c[0], c[1], c[2]) }
function setTxt(doc: jsPDF, c: readonly number[])  { doc.setTextColor(c[0], c[1], c[2]) }
function setDraw(doc: jsPDF, c: readonly number[]) { doc.setDrawColor(c[0], c[1], c[2]) }

function ornament(doc: jsPDF, cx: number, y: number) {
  setDraw(doc, C_ACCENT)
  doc.setLineWidth(0.3)
  doc.line(cx - 18, y, cx - 6,  y)
  doc.line(cx + 6,  y, cx + 18, y)
  doc.circle(cx,     y, 1.0, 'S')
  doc.circle(cx - 4, y, 0.4, 'S')
  doc.circle(cx + 4, y, 0.4, 'S')
}

async function compressImage(imgData: string, targetW: number, targetH: number): Promise<string> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    const img    = new Image()
    img.onload = () => {
      const scale   = Math.min((targetW * 11.811) / img.width, (targetH * 11.811) / img.height, 1)
      canvas.width  = Math.round(img.width  * scale)
      canvas.height = Math.round(img.height * scale)
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      resolve(canvas.toDataURL('image/jpeg', IMG_QUALITY))
    }
    img.onerror = () => resolve(imgData)
    img.src = imgData
  })
}

// ─── Types ────────────────────────────────────────────────────────────────────

export type BindingType = 'softcover' | 'hardcover' | 'dustjacket'

export interface CoverOptions {
  title: string
  subtitle: string
  pageCount: number
  coverImageUrl?: string
  loadImageAsBase64?: (url: string) => Promise<string>
  /** Sheet width in mm, from Lulu /cover-dimensions. */
  luluWidth?: number
  /** Sheet height in mm, from Lulu /cover-dimensions. */
  luluHeight?: number
  /** Spine width in mm, from Lulu /cover-dimensions. Strongly preferred. */
  luluSpine?: number
  bindingType?: BindingType
}

/** Everything the drawing code needs, all derived from Lulu's sheet. */
interface CoverGeometry {
  totalW: number
  totalH: number
  edge: number
  spine: number
  spineLeft: number
  spineRight: number
  spineCX: number
  backLeft: number
  backRight: number
  backCX: number
  frontLeft: number
  frontRight: number
  frontCX: number
  panelW: number
  contentTop: number
  contentBot: number
}

/**
 * Derives every panel edge from the finished sheet.
 *
 * The cover is always symmetrical about the spine, so the spine sits dead
 * centre and each panel runs from the spine out to the edge allowance. No
 * panel width is assumed — it falls out of the arithmetic, which is what
 * keeps hardcover and softcover correct with the same code.
 */
function buildGeometry(
  totalW: number,
  totalH: number,
  spineIn: number,
  bindingType: BindingType,
): CoverGeometry {
  const edge = EDGE_ALLOWANCE[bindingType] ?? EDGE_ALLOWANCE.softcover
  const isDustJacket = bindingType === 'dustjacket'
  const flap = isDustJacket ? FLAP_W : 0

  // Never let a bad spine collapse the layout.
  const maxSpine = totalW - 2 * edge - 2 * flap - 40
  const spine = Math.max(0, Math.min(spineIn, maxSpine))

  const spineLeft  = (totalW - spine) / 2
  const spineRight = spineLeft + spine

  const backLeft   = edge + flap
  const backRight  = spineLeft
  const frontLeft  = spineRight
  const frontRight = totalW - edge - flap

  return {
    totalW,
    totalH,
    edge,
    spine,
    spineLeft,
    spineRight,
    spineCX:  totalW / 2,
    backLeft,
    backRight,
    backCX:   (backLeft + backRight) / 2,
    frontLeft,
    frontRight,
    frontCX:  (frontLeft + frontRight) / 2,
    panelW:   frontRight - frontLeft,
    contentTop: edge + SAFE_MARGIN,
    contentBot: totalH - edge - SAFE_MARGIN,
  }
}

// ─── Main cover generator ─────────────────────────────────────────────────────

export async function generateCoverPDF(options: CoverOptions): Promise<Blob> {
  const {
    title,
    subtitle,
    pageCount,
    coverImageUrl,
    loadImageAsBase64,
    luluWidth,
    luluHeight,
    luluSpine,
    bindingType = 'softcover',
  } = options

  const isDustJacket = bindingType === 'dustjacket'
  const edge = EDGE_ALLOWANCE[bindingType] ?? EDGE_ALLOWANCE.softcover

  // ── Sheet size ─────────────────────────────────────────────────────────────
  let totalW = luluWidth
  let totalH = luluHeight

  if (!totalW || !totalH) {
    console.warn(
      `[generateCoverPDF] No luluWidth/luluHeight for bindingType="${bindingType}". ` +
      `Falling back to an estimate — Lulu may reject this. Fetch real dimensions ` +
      `from /lulu-cover-dimensions first.`,
    )
    const estSpine = getSpineWidthMm(pageCount || 28)
    totalW = totalW || TRIM_W * 2 + estSpine + edge * 2 + (isDustJacket ? FLAP_W * 2 : 0)
    totalH = totalH || TRIM_H + edge * 2
  }

  // ── Spine ──────────────────────────────────────────────────────────────────
  // Lulu returns the spine in the same response as width/height. Use it.
  // Falling back to page-count maths is a last resort: it was the old default
  // and it is what let a wrong constant shift the whole front panel sideways.
  let spine = luluSpine && luluSpine > 0 ? luluSpine : 0

  if (!spine) {
    const byPages = getSpineWidthMm(pageCount || 28)
    const bySheet = totalW - edge * 2 - (isDustJacket ? FLAP_W * 2 : 0) - TRIM_W * 2
    // Prefer the sheet-derived figure when it is plausible; it reflects the
    // real book rather than a generic paper-thickness constant.
    spine = bySheet > 1 && bySheet < totalW / 3 ? bySheet : byPages
    console.warn(
      `[generateCoverPDF] No luluSpine provided — using ${spine.toFixed(2)}mm ` +
      `(sheet-derived: ${bySheet.toFixed(2)}, page-derived: ${byPages.toFixed(2)}). ` +
      `Pass spine from /lulu-cover-dimensions for an exact layout.`,
    )
  }

  const g = buildGeometry(totalW, totalH, spine, bindingType)

  console.log(
    `Cover PDF (${bindingType}): ${g.totalW.toFixed(2)}×${g.totalH.toFixed(2)}mm · ` +
    `spine ${g.spine.toFixed(2)}mm · panel ${g.panelW.toFixed(2)}mm · ` +
    `edge allowance ${g.edge.toFixed(2)}mm · safe band ${g.contentTop.toFixed(1)}–${g.contentBot.toFixed(1)}mm`,
  )

  // ── Document ───────────────────────────────────────────────────────────────
  const doc = new jsPDF({
    unit:        'mm',
    format:      [g.totalW, g.totalH],
    orientation: g.totalW > g.totalH ? 'landscape' : 'portrait',
  })

  doc.addFileToVFS('EBGaramond-Regular.ttf',    EBGaramondRegular)
  doc.addFont('EBGaramond-Regular.ttf',    'EBGaramond', 'normal')
  doc.addFileToVFS('EBGaramond-Italic.ttf',     EBGaramondItalic)
  doc.addFont('EBGaramond-Italic.ttf',     'EBGaramond', 'italic')
  doc.addFileToVFS('EBGaramond-Bold.ttf',       EBGaramondBold)
  doc.addFont('EBGaramond-Bold.ttf',       'EBGaramond', 'bold')
  doc.addFileToVFS('EBGaramond-BoldItalic.ttf', EBGaramondBoldItalic)
  doc.addFont('EBGaramond-BoldItalic.ttf', 'EBGaramond', 'bolditalic')

  // Background runs to the sheet edge so the wrap folds in the same colour.
  setFill(doc, C_PAGE_BG)
  doc.rect(0, 0, g.totalW, g.totalH, 'F')

  // ── Dust jacket flaps ──────────────────────────────────────────────────────
  if (isDustJacket) {
    setFill(doc, [242, 237, 230])
    doc.rect(g.edge, g.edge, FLAP_W, g.totalH - g.edge * 2, 'F')
    doc.rect(g.frontRight, g.edge, FLAP_W, g.totalH - g.edge * 2, 'F')

    setDraw(doc, C_DIVIDER)
    doc.setLineWidth(0.3)
    doc.line(g.backLeft,   g.edge, g.backLeft,   g.totalH - g.edge)
    doc.line(g.frontRight, g.edge, g.frontRight, g.totalH - g.edge)

    doc.setFont('EBGaramond', 'italic')
    doc.setFontSize(9)
    setTxt(doc, C_MUTED)
    doc.text('Tell Me Your Story', g.edge + FLAP_W / 2, g.totalH / 2, {
      align: 'center', maxWidth: FLAP_W - 12,
    })

    doc.setFont('EBGaramond', 'normal')
    doc.setFontSize(8)
    setTxt(doc, C_MUTED)
    doc.text('tellmeyourstory.uk', g.frontRight + FLAP_W / 2, g.totalH / 2, {
      align: 'center', maxWidth: FLAP_W - 12,
    })
  }

  // ── Front cover ────────────────────────────────────────────────────────────

  const maxIW = g.panelW - 24
  const maxIH = (g.contentBot - g.contentTop) * 0.46
  let renderedFront = false

  if (coverImageUrl && loadImageAsBase64) {
    try {
      const rawImg = await loadImageAsBase64(coverImageUrl)
      const img    = new Image()
      img.src      = rawImg
      await new Promise<void>((resolve, reject) => {
        img.onload  = () => resolve()
        img.onerror = reject
      })

      // img.width/height are pixels — convert to mm at 96dpi before comparing
      // with maxIW/maxIH, which are in mm.
      const PX_TO_MM = 0.2646
      const naturalW = img.width  * PX_TO_MM
      const naturalH = img.height * PX_TO_MM

      const ratio = Math.min(maxIW / naturalW, maxIH / naturalH, 1)
      const iw    = naturalW * ratio
      const ih    = naturalH * ratio
      const ix    = g.frontCX - iw / 2

      // Block = image, ornament, title, ornament, subtitle. Centred in the
      // VISIBLE area (contentTop..contentBot), not the whole sheet — this is
      // what stops the design riding up and leaving dead space at the foot.
      const GAP_TITLE    = 26
      const GAP_SUBTITLE = 48
      const blockH = ih + GAP_SUBTITLE + 10
      const availableH = g.contentBot - g.contentTop - 14 // leave room for the footer
      const iy = g.contentTop + Math.max(0, (availableH - blockH) / 2)

      const compressed = await compressImage(rawImg, iw, ih)

      setDraw(doc, C_DIVIDER)
      doc.setLineWidth(0.3)
      doc.roundedRect(ix - 1.5, iy - 1.5, iw + 3, ih + 3, 2, 2)
      doc.addImage(compressed, 'JPEG', ix, iy, iw, ih)

      ornament(doc, g.frontCX, iy + ih + 12)

      doc.setFont('EBGaramond', 'bold')
      doc.setFontSize(22)
      setTxt(doc, C_PRIMARY)
      doc.text(title, g.frontCX, iy + ih + GAP_TITLE, {
        align: 'center', maxWidth: g.panelW - 24,
      })

      ornament(doc, g.frontCX, iy + ih + 36)

      doc.setFont('EBGaramond', 'italic')
      doc.setFontSize(10)
      setTxt(doc, C_SECONDARY)
      doc.text(subtitle, g.frontCX, iy + ih + GAP_SUBTITLE, {
        align: 'center', maxWidth: g.panelW - 24,
      })

      renderedFront = true
    } catch {
      renderedFront = false
    }
  }

  if (!renderedFront) {
    renderFrontTextOnly(doc, title, subtitle, g)
  }

  // Front footer — anchored to the visible bottom edge, inside the fold.
  const footerY = g.contentBot
  setDraw(doc, C_DIVIDER)
  doc.setLineWidth(0.2)
  doc.line(g.frontLeft + 12, footerY - 6, g.frontRight - 12, footerY - 6)
  doc.setFont('EBGaramond', 'normal')
  doc.setFontSize(7.5)
  setTxt(doc, C_MUTED)
  doc.text('Tell Me Your Story · tellmeyourstory.uk', g.frontCX, footerY, { align: 'center' })

  // ── Spine ──────────────────────────────────────────────────────────────────

  if (g.spine > 0) {
    setFill(doc, C_SPINE_BG)
    doc.rect(g.spineLeft, 0, g.spine, g.totalH, 'F')

    setDraw(doc, C_DIVIDER)
    doc.setLineWidth(0.3)
    doc.line(g.spineLeft,    g.edge, g.spineLeft,    g.totalH - g.edge)
    doc.line(g.spineRight,   g.edge, g.spineRight,   g.totalH - g.edge)

    // Only letter a spine wide enough to carry type legibly.
    if (g.spine >= 6) {
      const spineFont = Math.min(9, Math.max(6, g.spine * 1.6))
      doc.setFont('EBGaramond', 'bold')
      doc.setFontSize(spineFont)
      setTxt(doc, C_PRIMARY)

      // jsPDF anchors rotated text on its baseline, so the glyph body sits to
      // one side of the anchor. Shift by roughly a third of the cap height to
      // centre it on the spine. Derived from the font size rather than a fixed
      // constant, which is what previously threw the title onto the front cover.
      const capHeightMm  = spineFont * 0.3527 * 0.7
      const baselineFix  = capHeightMm * 0.5

      doc.text(title, g.spineCX + baselineFix, g.totalH / 2, {
        align:    'center',
        angle:    90,
        maxWidth: g.totalH - g.edge * 2 - 20,
      })
    }
  }

  // ── Back cover ─────────────────────────────────────────────────────────────

  // Header bleeds off the top and outer edge, so the block still reaches the
  // board edge after the wrap folds under.
  const headerVisibleH = (g.totalH - g.edge * 2) * 0.12
  const headerH = g.edge + headerVisibleH

  setFill(doc, C_DARK)
  doc.rect(0, 0, g.backRight, headerH, 'F')

  doc.setFont('EBGaramond', 'normal')
  doc.setFontSize(8)
  setTxt(doc, [198, 168, 130])
  doc.text('TELL ME YOUR STORY', g.backCX, g.edge + headerVisibleH * 0.62, { align: 'center' })

  ornament(doc, g.backCX, headerH + 16)

  doc.setFont('EBGaramond', 'italic')
  doc.setFontSize(11)
  setTxt(doc, C_SECONDARY)
  doc.text(`"${title}"`, g.backCX, headerH + 30, { align: 'center', maxWidth: g.panelW - 24 })

  doc.setFont('EBGaramond', 'normal')
  doc.setFontSize(9)
  setTxt(doc, C_SECONDARY)
  const desc  = 'A life told through memories, moments, and love. Created with Tell Me Your Story — capturing the stories that matter most, before they are lost.'
  const lines = doc.splitTextToSize(desc, g.panelW - 32)
  lines.forEach((ln: string, i: number) => {
    doc.text(ln, g.backCX, headerH + 46 + i * 6, { align: 'center' })
  })

  // Flow the closing mark from where the description actually ends, and centre
  // it in the space left above the footer.
  const descEndY  = headerH + 46 + lines.length * 6
  const midOfRest = descEndY + (g.contentBot - 14 - descEndY) / 2

  ornament(doc, g.backCX, midOfRest - 6)
  doc.setFont('EBGaramond', 'normal')
  doc.setFontSize(8)
  setTxt(doc, C_MUTED)
  doc.text('tellmeyourstory.uk', g.backCX, midOfRest + 6, { align: 'center' })

  // Back footer
  setDraw(doc, C_DIVIDER)
  doc.setLineWidth(0.2)
  doc.line(g.backLeft + 12, footerY - 6, g.backRight - 12, footerY - 6)
  doc.setFont('EBGaramond', 'normal')
  doc.setFontSize(7)
  setTxt(doc, C_MUTED)
  doc.text('Printed by Lulu Press · tellmeyourstory.uk', g.backCX, footerY, { align: 'center' })

  return doc.output('blob')
}

// ─── Fallback: front cover text only ─────────────────────────────────────────

function renderFrontTextOnly(doc: jsPDF, title: string, subtitle: string, g: CoverGeometry) {
  const midY = (g.contentTop + g.contentBot) / 2
  const maxW = g.panelW - 28

  doc.setFont('EBGaramond', 'normal')
  doc.setFontSize(9)
  setTxt(doc, C_MUTED)
  doc.text('A MEMORY WORTH KEEPING', g.frontCX, midY - 40, { align: 'center', maxWidth: maxW })

  ornament(doc, g.frontCX, midY - 30)

  doc.setFont('EBGaramond', 'bold')
  doc.setFontSize(26)
  setTxt(doc, C_PRIMARY)
  doc.text(title, g.frontCX, midY - 12, { align: 'center', maxWidth: maxW })

  ornament(doc, g.frontCX, midY + 6)

  doc.setFont('EBGaramond', 'italic')
  doc.setFontSize(10)
  setTxt(doc, C_SECONDARY)
  doc.text(subtitle, g.frontCX, midY + 20, { align: 'center', maxWidth: maxW })
}

// ─── Utilities ────────────────────────────────────────────────────────────────

/** Rough spine width from page count. Fallback only — prefer Lulu's figure. */
export function getSpineWidthMm(pageCount: number): number {
  return pageCount * 0.002252 * 25.4
}

/**
 * Estimated sheet size, for previews and sanity checks only.
 * Real print jobs must use /lulu-cover-dimensions.
 */
export function getCoverDimensions(
  pageCount: number,
  bindingType: BindingType = 'softcover',
) {
  const spine = getSpineWidthMm(pageCount)
  const edge  = EDGE_ALLOWANCE[bindingType] ?? EDGE_ALLOWANCE.softcover
  const flap  = bindingType === 'dustjacket' ? FLAP_W : 0

  return {
    width_mm:  TRIM_W * 2 + spine + edge * 2 + flap * 2,
    height_mm: TRIM_H + edge * 2,
    spine_mm:  spine,
    edge_mm:   edge,
  }
}