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
// THE RULE THIS FILE FOLLOWS:
//   Nothing is positioned from TRIM_W or BLEED. Every panel edge is derived
//   from the sheet Lulu gave us and the spine Lulu gave us. There are two
//   binding-specific constants and they are NOT interchangeable:
//
//     EDGE_ALLOWANCE — how much wider the SHEET is per side. Sheet maths only.
//     LOST_EDGE      — how much of that actually disappears. Layout only.
//
//   On softcover they are the same number. On a hardcover case wrap they are
//   not, because the board is cut larger than the page.
//
// Why that matters (the 2026 hardcover bugs, in order):
//   June–Sept: the code laid out as though only the 3.175mm bleed was lost, so
//   the front footer printed 13mm outside the finished cover, the content block
//   centred 9mm too high, and two hand-tuned "nudge" constants pushed the front
//   panel a further 3mm sideways.
//   October: fixing that with a single 22.225mm constant over-corrected. The
//   board overhangs the page by 3.175mm on the fore-edge, so only 19.05mm is
//   truly lost — treating all of it as lost pulled both panels 1.5875mm toward
//   the spine. Front cover printed left, back cover printed right, spine and
//   vertical placement correct (the overhang is symmetric at head and tail).

const TRIM_W = 152.4   // mm — 6in. Fallback sizing only; never used for layout.
const TRIM_H = 228.6   // mm — 9in. Fallback sizing only; never used for layout.
const FLAP_W = 76.2    // mm — standard 3in dust jacket flap

/**
 * SHEET arithmetic only — how much wider the PDF is than two trimmed pages
 * plus the spine, per side. Use this to derive or estimate the sheet size,
 * never to position anything.
 *
 * Confirmed against Lulu's published spec for
 * 0600X0900.FC.PRE.CW.080CW444.GXX: a 365.12mm sheet with a 15.88mm spine
 * leaves (365.12 - 152.4*2 - 15.88) / 2 = 22.225mm per side.
 */
const EDGE_ALLOWANCE: Record<string, number> = {
  softcover:  3.175,
  hardcover:  22.225,
  dustjacket: 3.175,
}

/**
 * LAYOUT — how much of each outer edge is genuinely gone once the cover is
 * finished, i.e. where the visible cover actually begins.
 *
 *  softcover / dustjacket — 3.175mm (0.125in) bleed, trimmed off.
 *  hardcover case wrap    — 19.05mm (0.75in) folded under the board.
 *
 * This is NOT the same as EDGE_ALLOWANCE, and conflating the two is what
 * caused the October 2026 hardcover bug. On a case wrap the board is cut
 * 3.175mm LARGER than the trimmed page, so of the 22.225mm allowance only
 * 19.05mm disappears — the remaining 3.175mm is board you can see and hold.
 *
 * Treating all 22.225mm as lost pulled both panel centres 1.5875mm toward
 * the spine (half the overhang each), which printed as a front cover shifted
 * left and a back cover shifted right. Vertically it cancelled out, because
 * the overhang is symmetric at head and tail — which is why the spine and the
 * vertical placement looked correct while the panels did not.
 */
const LOST_EDGE: Record<string, number> = {
  softcover:  3.175,
  hardcover:  19.05,
  dustjacket: 3.175,
}

/**
 * How much larger the board is than the trimmed page, on the fore-edge, head
 * and tail — never on the spine edge, where the hinge is. Kept for the
 * geometry log so the numbers can be checked against a finished book.
 */
const BOARD_OVERHANG: Record<string, number> = {
  softcover:  0,
  hardcover:  3.175,
  dustjacket: 0,
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
  // `edge` is the VISIBLE boundary — everything drawn is positioned from it.
  // The sheet allowance (EDGE_ALLOWANCE) is deliberately not used here; it is
  // larger than this on a case wrap and using it shifts both panels inward.
  const edge = LOST_EDGE[bindingType] ?? LOST_EDGE.softcover
  const sheetEdge = EDGE_ALLOWANCE[bindingType] ?? EDGE_ALLOWANCE.softcover
  const isDustJacket = bindingType === 'dustjacket'
  const flap = isDustJacket ? FLAP_W : 0

  // Never let a bad spine collapse the layout.
  const maxSpine = totalW - 2 * sheetEdge - 2 * flap - 40
  const spine = Math.max(0, Math.min(spineIn, maxSpine))

  const spineLeft  = (totalW - spine) / 2
  const spineRight = spineLeft + spine

  // Panels run from the spine out to the visible edge — on a hardcover that is
  // the board edge, which sits 3.175mm proud of the trimmed page.
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

/**
 * Works out the spine width to lay the cover out with.
 *
 * Lulu's /cover-dimensions response does not reliably carry a spine field, and
 * when it is missing the sheet itself gives an exact answer: the spine is
 * whatever is left once the two 6in panels and the edge allowance are taken off.
 * Page-count maths is the last resort — it is a generic paper-thickness guess.
 *
 * Exported so CoverTestPanel reports the same number the PDF is drawn with.
 */
export function resolveSpineMm(opts: {
  totalW: number
  luluSpine?: number
  pageCount?: number
  bindingType?: BindingType
}): { spine: number; source: 'lulu' | 'sheet' | 'pages' } {
  const { totalW, luluSpine, pageCount, bindingType = 'softcover' } = opts

  if (luluSpine && luluSpine > 0) return { spine: luluSpine, source: 'lulu' }

  // Sheet arithmetic: the spine is what is left of the sheet once the two
  // trimmed pages and the full per-side allowance are taken off. LOST_EDGE
  // would give the wrong answer here — this one is about the PDF, not the book.
  const sheetEdge = EDGE_ALLOWANCE[bindingType] ?? EDGE_ALLOWANCE.softcover
  const flap = bindingType === 'dustjacket' ? FLAP_W : 0
  const bySheet = totalW - sheetEdge * 2 - flap * 2 - TRIM_W * 2

  if (bySheet > 1 && bySheet < totalW / 3) return { spine: bySheet, source: 'sheet' }
  return { spine: getSpineWidthMm(pageCount || 28), source: 'pages' }
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
  // Sheet arithmetic only — the layout uses the visible edge, from buildGeometry.
  const sheetEdge = EDGE_ALLOWANCE[bindingType] ?? EDGE_ALLOWANCE.softcover

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
    totalW = totalW || TRIM_W * 2 + estSpine + sheetEdge * 2 + (isDustJacket ? FLAP_W * 2 : 0)
    totalH = totalH || TRIM_H + sheetEdge * 2
  }

  // ── Spine ──────────────────────────────────────────────────────────────────
  // Lulu returns the spine in the same response as width/height. Use it.
  // Falling back to page-count maths is a last resort: it was the old default
  // and it is what let a wrong constant shift the whole front panel sideways.
  const { spine, source: spineSource } = resolveSpineMm({
    totalW, luluSpine, pageCount, bindingType,
  })

  if (spineSource !== 'lulu') {
    console.warn(
      `[generateCoverPDF] Lulu returned no spine — using ${spine.toFixed(2)}mm ` +
      `derived from the ${spineSource === 'sheet' ? 'sheet width' : 'page count'}.`,
    )
  }

  const g = buildGeometry(totalW, totalH, spine, bindingType)

  // Panel centres are logged so a finished book can be checked against them:
  // measure the printed block's two side margins — they should match.
  console.log(
    `Cover PDF (${bindingType}): ${g.totalW.toFixed(2)}×${g.totalH.toFixed(2)}mm · ` +
    `spine ${g.spine.toFixed(2)}mm · visible panel ${g.panelW.toFixed(2)}mm ` +
    `(page ${TRIM_W} + ${(BOARD_OVERHANG[bindingType] ?? 0).toFixed(3)}mm board) · ` +
    `visible edge ${g.edge.toFixed(3)}mm · safe band ${g.contentTop.toFixed(1)}–${g.contentBot.toFixed(1)}mm · ` +
    `centres back ${g.backCX.toFixed(3)} front ${g.frontCX.toFixed(3)}`,
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

  // Front footer — anchored near the visible bottom edge, inside the fold.
  // Sat exactly on contentBot until Oct 2026, which put the baseline on the
  // safe line and let descenders hang below it. 3mm up keeps whole glyphs in.
  const FOOTER_LIFT = 3
  const footerY = g.contentBot - FOOTER_LIFT
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

      // NEVER pass align:'center' together with angle:90. jsPDF applies the
      // centring offset along X instead of along the rotated baseline, so the
      // title slides sideways by HALF ITS OWN LENGTH — a long title ends up on
      // the back cover, a short one stays put. That is what put "Dorothy's
      // Story" 10.7mm off the spine, and what the old 10mm nudge was chasing.
      //
      // Positioned by hand instead:
      //   x — rotated glyphs sit 0.1369mm per point left of the anchor
      //       (measured across 6/7/8/9/12pt; the relationship is exactly linear)
      //   y — rotated text runs upward from the anchor, so start half its
      //       length below the middle to centre it on the spine
      const SPINE_BASELINE_MM_PER_PT = 0.1369

      const maxTitleLen = g.totalH - g.edge * 2 - 20
      let spineTitle = title
      while (spineTitle.length > 4 && doc.getTextWidth(spineTitle) > maxTitleLen) {
        spineTitle = spineTitle.slice(0, -1)
      }
      if (spineTitle !== title) spineTitle = `${spineTitle.trimEnd()}…`

      const titleLen = doc.getTextWidth(spineTitle)

      doc.text(
        spineTitle,
        g.spineCX + spineFont * SPINE_BASELINE_MM_PER_PT,
        g.totalH / 2 + titleLen / 2,
        { angle: 90 },
      )
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

  const descEndY = headerH + 46 + lines.length * 6

  // ── How the book works ─────────────────────────────────────────────────────
  // The back cover used to leave ~77mm of nothing between the description and
  // the footer, with the URL marooned in the middle of it. That space now
  // explains the QR codes, which is the one thing a recipient holding this for
  // the first time will not work out on their own.
  const howY = descEndY + 20

  doc.setFont('EBGaramond', 'bold')
  doc.setFontSize(8)
  setTxt(doc, C_ACCENT)
  doc.text('HEAR THEM TELL IT', g.backCX, howY, { align: 'center' })

  doc.setFont('EBGaramond', 'normal')
  doc.setFontSize(9)
  setTxt(doc, C_SECONDARY)
  const how = 'Wherever a story was recorded aloud, a code sits beside it on the page. Scan that code with any phone camera and you will hear it told in their own voice.'
  const howLines = doc.splitTextToSize(how, g.panelW - 36)
  howLines.forEach((ln: string, i: number) => {
    doc.text(ln, g.backCX, howY + 11 + i * 6, { align: 'center' })
  })

  // ── Closing mark ───────────────────────────────────────────────────────────
  // Sits just above the footer so the two read as one foot group. Keeping it
  // mid-panel left air both above AND below it, and a gap between two content
  // groups reads as a mistake where a gap above an anchored foot does not.
  const howEndY  = howY + 11 + howLines.length * 6
  const closeY   = Math.max(howEndY + 16, footerY - 22)

  ornament(doc, g.backCX, closeY)
  doc.setFont('EBGaramond', 'normal')
  doc.setFontSize(8)
  setTxt(doc, C_MUTED)
  doc.text('tellmeyourstory.uk', g.backCX, closeY + 10, { align: 'center' })

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
  const spine     = getSpineWidthMm(pageCount)
  const sheetEdge = EDGE_ALLOWANCE[bindingType] ?? EDGE_ALLOWANCE.softcover
  const lostEdge  = LOST_EDGE[bindingType] ?? LOST_EDGE.softcover
  const flap      = bindingType === 'dustjacket' ? FLAP_W : 0

  return {
    width_mm:  TRIM_W * 2 + spine + sheetEdge * 2 + flap * 2,
    height_mm: TRIM_H + sheetEdge * 2,
    spine_mm:  spine,
    /** Per-side sheet allowance — for sizing the PDF. */
    edge_mm:   sheetEdge,
    /** Per-side loss — where the visible cover starts. For layout. */
    visible_edge_mm: lostEdge,
  }
}