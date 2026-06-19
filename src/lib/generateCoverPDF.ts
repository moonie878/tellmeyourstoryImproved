import jsPDF from 'jspdf'
import { EBGaramondRegular } from '../fonts/EBGaramond-Regular'
import { EBGaramondItalic } from '../fonts/EBGaramond-Italic'
import { EBGaramondBold } from '../fonts/EBGaramond-Bold'
import { EBGaramondBoldItalic } from '../fonts/EBGaramond-BoldItalic'

// ─── Lulu cover spec ──────────────────────────────────────────────────────────
//
// Dimensions come from Lulu's /cover-dimensions/ endpoint — always use those.
// Default fallback values are for a 28-page 6x9 softcover book.
//
// Softcover/Hardcover layout (left to right):
//   [bleed] [back cover: 152.4mm] [spine] [front cover: 152.4mm] [bleed]
//
// Dust jacket layout (left to right):
//   [bleed] [front flap] [back cover: 152.4mm] [spine] [front cover: 152.4mm] [back flap] [bleed]
//
// Bleed is 3.175mm (0.125 inches) on all sides.

const BLEED       = 3.175   // mm — fixed for all Lulu 6x9 books
const TRIM_W       = 152.4   // mm — 6 inches per side
const TRIM_H       = 228.6   // mm — 9 inches
const FLAP_W       = 76.2    // mm — standard 3 inch dust jacket flap
const HC_WRAP      = 6.35    // mm — case wrap hardcover adds 0.25" wrap allowance per side, on top of bleed

const IMG_QUALITY = 0.85

// ─── Colours ──────────────────────────────────────────────────────────────────
const C_PAGE_BG   = [248, 244, 239] as const
const C_PRIMARY   = [38, 34, 32]    as const
const C_SECONDARY = [92, 84, 78]    as const
const C_MUTED     = [140, 132, 126] as const
const C_ACCENT    = [148, 116, 74]  as const
const C_DIVIDER   = [221, 214, 206] as const
const C_DARK      = [28, 25, 23]    as const

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

export interface CoverOptions {
  title: string
  subtitle: string
  pageCount: number
  coverImageUrl?: string
  loadImageAsBase64?: (url: string) => Promise<string>
  luluWidth?: number
  luluHeight?: number
  bindingType?: 'softcover' | 'hardcover' | 'dustjacket'
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
    bindingType = 'softcover',
  } = options

  const isDustJacket = bindingType === 'dustjacket'
  const isHardcover  = bindingType === 'hardcover'

  // Use Lulu's exact dimensions if provided — ALWAYS prefer these.
  // Fallbacks below are last-resort estimates only and may not pass Lulu's
  // validation, especially for hardcover/case wrap which adds a wrap
  // allowance Lulu calculates per page-count via /cover-dimensions/.
  let totalW = luluWidth
  let totalH = luluHeight

  if (!totalW || !totalH) {
    console.warn(
      `[generateCoverPDF] No luluWidth/luluHeight provided for bindingType="${bindingType}". ` +
      `Falling back to an estimated size — this MAY be rejected by Lulu. ` +
      `Fetch real dimensions from /lulu-cover-dimensions before calling generateCoverPDF.`
    )

    if (isDustJacket) {
      totalW = totalW || 508.00
      totalH = totalH || 247.65
    } else if (isHardcover) {
      // Hardcover case wrap: standard bleed+trim+spine, PLUS wrap allowance
      // on each side (Lulu adds ~0.25" wrap on top of the flat bleed used
      // for softcover — this was previously missing entirely).
      const estSpine = getSpineWidthMm(pageCount || 28)
      totalW = totalW || (TRIM_W * 2 + estSpine + (BLEED + HC_WRAP) * 2)
      totalH = totalH || (TRIM_H + (BLEED + HC_WRAP) * 2)
    } else {
      totalW = totalW || 314.280
      totalH = totalH || 234.950
    }
  }

  // ── Layout calculations ────────────────────────────────────────────────────

  let backLeft:  number
  let spineLeft: number
  let frontLeft: number
  let spine:     number

  if (isDustJacket) {
    // Dust jacket: [bleed][front flap][back][spine][front][back flap][bleed]
    // Total = bleed*2 + flap*2 + trim*2 + spine
    spine     = totalW - BLEED * 2 - FLAP_W * 2 - TRIM_W * 2
    backLeft  = BLEED + FLAP_W
    spineLeft = backLeft + TRIM_W
    frontLeft = spineLeft + spine
  } else {
    // Softcover/Hardcover: [bleed][back][spine][front][bleed]
    spine     = totalW - TRIM_W * 2 - BLEED * 2
    backLeft  = BLEED
    spineLeft = backLeft + TRIM_W
    frontLeft = spineLeft + spine
  }

  const contentBot = totalH - BLEED - 18
  const backCX     = backLeft  + TRIM_W / 2
  const frontCX    = frontLeft + TRIM_W / 2
  const spineCX    = spineLeft + spine / 2

  console.log(`Cover PDF (${bindingType}): ${totalW.toFixed(3)}×${totalH.toFixed(3)}mm, spine: ${spine.toFixed(3)}mm`)

  // Create doc
  const doc = new jsPDF({
    unit:        'mm',
    format:      [totalW, totalH],
    orientation: totalW > totalH ? 'landscape' : 'portrait',
  })

  // Register fonts
  doc.addFileToVFS('EBGaramond-Regular.ttf',    EBGaramondRegular)
  doc.addFont('EBGaramond-Regular.ttf',    'EBGaramond', 'normal')
  doc.addFileToVFS('EBGaramond-Italic.ttf',     EBGaramondItalic)
  doc.addFont('EBGaramond-Italic.ttf',     'EBGaramond', 'italic')
  doc.addFileToVFS('EBGaramond-Bold.ttf',       EBGaramondBold)
  doc.addFont('EBGaramond-Bold.ttf',       'EBGaramond', 'bold')
  doc.addFileToVFS('EBGaramond-BoldItalic.ttf', EBGaramondBoldItalic)
  doc.addFont('EBGaramond-BoldItalic.ttf', 'EBGaramond', 'bolditalic')

  // ── Full background ────────────────────────────────────────────────────────
  setFill(doc, C_PAGE_BG)
  doc.rect(0, 0, totalW, totalH, 'F')

  // ── DUST JACKET FLAPS ──────────────────────────────────────────────────────
  if (isDustJacket) {
    // Front flap (left side) — subtle tint
    setFill(doc, [242, 237, 230])
    doc.rect(BLEED, BLEED, FLAP_W, totalH - BLEED * 2, 'F')

    // Back flap (right side)
    setFill(doc, [242, 237, 230])
    doc.rect(frontLeft + TRIM_W, BLEED, FLAP_W, totalH - BLEED * 2, 'F')

    // Fold lines
    setDraw(doc, C_DIVIDER)
    doc.setLineWidth(0.3)
    doc.line(BLEED + FLAP_W,           BLEED, BLEED + FLAP_W,           totalH - BLEED)
    doc.line(frontLeft + TRIM_W,       BLEED, frontLeft + TRIM_W,       totalH - BLEED)

    // Front flap text — "Tell Me Your Story"
    doc.setFont('EBGaramond', 'italic')
    doc.setFontSize(9)
    setTxt(doc, C_MUTED)
    doc.text(
      'Tell Me Your Story',
      BLEED + FLAP_W / 2,
      totalH / 2,
      { align: 'center', maxWidth: FLAP_W - 12 }
    )

    // Back flap — website
    doc.setFont('EBGaramond', 'normal')
    doc.setFontSize(8)
    setTxt(doc, C_MUTED)
    doc.text(
      'tellmeyourstory.uk',
      frontLeft + TRIM_W + FLAP_W / 2,
      totalH / 2,
      { align: 'center' }
    )
  }

  // ── FRONT COVER ───────────────────────────────────────────────────────────

  if (coverImageUrl && loadImageAsBase64) {
    try {
      const rawImg = await loadImageAsBase64(coverImageUrl)
      const img    = new Image()
      img.src      = rawImg
      await new Promise<void>((resolve, reject) => {
        img.onload  = () => resolve()
        img.onerror = reject
      })

      const maxIW  = TRIM_W - 24
      const maxIH  = TRIM_H * 0.42
      const ratio  = Math.min(maxIW / img.width, maxIH / img.height)
      const iw     = img.width  * ratio
      const ih     = img.height * ratio
      const ix     = frontLeft + (TRIM_W - iw) / 2
      const iy     = BLEED + 20

      const compressed = await compressImage(rawImg, iw, ih)

      setDraw(doc, C_DIVIDER)
      doc.setLineWidth(0.3)
      doc.roundedRect(ix - 1.5, iy - 1.5, iw + 3, ih + 3, 2, 2)
      doc.addImage(compressed, 'JPEG', ix, iy, iw, ih)

      ornament(doc, frontCX, iy + ih + 12)

      doc.setFont('EBGaramond', 'bold')
      doc.setFontSize(22)
      setTxt(doc, C_PRIMARY)
      doc.text(title, frontCX, iy + ih + 26, { align: 'center', maxWidth: TRIM_W - 24 })

      ornament(doc, frontCX, iy + ih + 36)

      doc.setFont('EBGaramond', 'italic')
      doc.setFontSize(10)
      setTxt(doc, C_SECONDARY)
      doc.text(subtitle, frontCX, iy + ih + 48, { align: 'center', maxWidth: TRIM_W - 24 })

    } catch {
      renderFrontTextOnly(doc, title, subtitle, frontCX, BLEED, TRIM_H)
    }
  } else {
    renderFrontTextOnly(doc, title, subtitle, frontCX, BLEED, TRIM_H)
  }

  // Front footer
  setDraw(doc, C_DIVIDER)
  doc.setLineWidth(0.2)
  doc.line(frontLeft + 12, contentBot + 6, frontLeft + TRIM_W - 12, contentBot + 6)
  doc.setFont('EBGaramond', 'normal')
  doc.setFontSize(7.5)
  setTxt(doc, C_MUTED)
  doc.text('Tell Me Your Story · tellmeyourstory.uk', frontCX, contentBot + 12, { align: 'center' })

  // ── SPINE ─────────────────────────────────────────────────────────────────

  setFill(doc, [240, 235, 228])
  doc.rect(spineLeft, 0, spine, totalH, 'F')

  setDraw(doc, C_DIVIDER)
  doc.setLineWidth(0.3)
  doc.line(spineLeft,        BLEED, spineLeft,        totalH - BLEED)
  doc.line(spineLeft + spine, BLEED, spineLeft + spine, totalH - BLEED)

  if (spine >= 6) {
    doc.setFont('EBGaramond', 'bold')
    doc.setFontSize(Math.min(8, spine * 2.5))
    setTxt(doc, C_PRIMARY)
    doc.text(title, spineCX, totalH / 2, {
      align:    'center',
      angle:    90,
      maxWidth: totalH - 40,
    })
  }

  // ── BACK COVER ────────────────────────────────────────────────────────────

  const backHeaderH = totalH * 0.12

  setFill(doc, C_DARK)
  doc.rect(backLeft, 0, TRIM_W, backHeaderH, 'F')

  doc.setFont('EBGaramond', 'normal')
  doc.setFontSize(8)
  setTxt(doc, [198, 168, 130])
  doc.text('TELL ME YOUR STORY', backCX, BLEED + totalH * 0.06, { align: 'center' })

  ornament(doc, backCX, backHeaderH + 16)

  doc.setFont('EBGaramond', 'italic')
  doc.setFontSize(11)
  setTxt(doc, C_SECONDARY)
  doc.text(`"${title}"`, backCX, backHeaderH + 30, { align: 'center', maxWidth: TRIM_W - 24 })

  doc.setFont('EBGaramond', 'normal')
  doc.setFontSize(9)
  setTxt(doc, C_SECONDARY)
  const desc  = 'A life told through memories, moments, and love. Created with Tell Me Your Story — capturing the stories that matter most, before they are lost.'
  const lines = doc.splitTextToSize(desc, TRIM_W - 32)
  lines.forEach((ln: string, i: number) => {
    doc.text(ln, backCX, backHeaderH + 46 + i * 6, { align: 'center' })
  })

  // Track where the description block actually ends, so the next ornament
  // and website line flow naturally from real content height rather than
  // jumping to a fixed totalH/2 position (which created a large dead gap
  // once cover height grew with the corrected hardcover dimensions).
  const descEndY = backHeaderH + 46 + lines.length * 6

  // Centre the remaining elements in whatever space is left between the
  // description and the footer, rather than anchoring to totalH/2.
  const remainingSpace = contentBot - descEndY
  const midOfRemaining = descEndY + remainingSpace / 2

  ornament(doc, backCX, midOfRemaining - 6)
  doc.setFont('EBGaramond', 'normal')
  doc.setFontSize(8)
  setTxt(doc, C_MUTED)
  doc.text('tellmeyourstory.uk', backCX, midOfRemaining + 6, { align: 'center' })

  // Back footer
  setDraw(doc, C_DIVIDER)
  doc.setLineWidth(0.2)
  doc.line(backLeft + 12, contentBot + 6, backLeft + TRIM_W - 12, contentBot + 6)
  doc.setFont('EBGaramond', 'normal')
  doc.setFontSize(7)
  setTxt(doc, C_MUTED)
  doc.text('Printed by Lulu Press · tellmeyourstory.uk', backCX, contentBot + 12, { align: 'center' })

  return doc.output('blob')
}

// ─── Fallback: front cover text only ─────────────────────────────────────────

function renderFrontTextOnly(
  doc: jsPDF, title: string, subtitle: string,
  frontCX: number, bleed: number, trimH: number
) {
  const midY = bleed + trimH / 2

  doc.setFont('EBGaramond', 'normal')
  doc.setFontSize(9)
  setTxt(doc, C_MUTED)
  doc.text('A MEMORY WORTH KEEPING', frontCX, midY - 40, { align: 'center' })

  ornament(doc, frontCX, midY - 30)

  doc.setFont('EBGaramond', 'bold')
  doc.setFontSize(26)
  setTxt(doc, C_PRIMARY)
  doc.text(title, frontCX, midY - 12, { align: 'center', maxWidth: 130 })

  ornament(doc, frontCX, midY + 6)

  doc.setFont('EBGaramond', 'italic')
  doc.setFontSize(10)
  setTxt(doc, C_SECONDARY)
  doc.text(subtitle, frontCX, midY + 20, { align: 'center', maxWidth: 120 })
}

// ─── Utilities ────────────────────────────────────────────────────────────────

export function getSpineWidthMm(pageCount: number): number {
  return pageCount * 0.002252 * 25.4
}

export function getCoverDimensions(pageCount: number, bindingType: 'softcover' | 'hardcover' | 'dustjacket' = 'softcover') {
  const spine = getSpineWidthMm(pageCount)
  const wrap  = bindingType === 'hardcover' ? HC_WRAP : 0

  return {
    width_mm:  TRIM_W * 2 + spine + (BLEED + wrap) * 2,
    height_mm: TRIM_H + (BLEED + wrap) * 2,
    spine_mm:  spine,
    bleed_mm:  BLEED,
  }
}