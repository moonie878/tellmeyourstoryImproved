import jsPDF from 'jspdf'
import { EBGaramondRegular } from '../fonts/EBGaramond-Regular'
import { EBGaramondItalic } from '../fonts/EBGaramond-Italic'
import { EBGaramondBold } from '../fonts/EBGaramond-Bold'
import { EBGaramondBoldItalic } from '../fonts/EBGaramond-BoldItalic'

// ─── Lulu cover spec for 6x9 perfect bind, 60lb uncoated ─────────────────────
//
// Total cover = front + spine + back + bleed
//
// Bleed:        0.125 inches all sides (3.175mm)
// Trim height:  9 inches (228.6mm)
// Trim width:   6 inches (152.4mm) per side
// Spine width:  page_count × 0.002252 inches (60lb paper)
//
// Total width mm  = (6 + 6 + spine_inches) × 25.4 + (0.125 × 2) × 25.4
// Total height mm = (9 + 0.125 × 2) × 25.4

const BLEED_IN   = 0.125          // inches
const TRIM_W_IN  = 6              // inches per side
const TRIM_H_IN  = 9              // inches
const PPI_60LB   = 0.002252       // inches per page for 60lb uncoated

// ─── Colours — match interior ─────────────────────────────────────────────────
const C_PAGE_BG   = [248, 244, 239] as const
const C_PRIMARY   = [38, 34, 32]    as const
const C_SECONDARY = [92, 84, 78]    as const
const C_MUTED     = [140, 132, 126] as const
const C_ACCENT    = [148, 116, 74]  as const
const C_DIVIDER   = [221, 214, 206] as const
const C_DARK      = [28, 25, 23]    as const

const IMG_QUALITY = 0.85

// ─── Helpers ──────────────────────────────────────────────────────────────────
function inToMm(inches: number) { return inches * 25.4 }

function setFill(doc: jsPDF, c: readonly number[]) {
  doc.setFillColor(c[0], c[1], c[2])
}
function setTxt(doc: jsPDF, c: readonly number[]) {
  doc.setTextColor(c[0], c[1], c[2])
}
function setDraw(doc: jsPDF, c: readonly number[]) {
  doc.setDrawColor(c[0], c[1], c[2])
}

function ornament(doc: jsPDF, cx: number, y: number) {
  setDraw(doc, C_ACCENT)
  doc.setLineWidth(0.3)
  doc.line(cx - 18, y, cx - 6, y)
  doc.line(cx + 6,  y, cx + 18, y)
  doc.circle(cx,     y, 1.0, 'S')
  doc.circle(cx - 4, y, 0.4, 'S')
  doc.circle(cx + 4, y, 0.4, 'S')
}

async function compressImage(imgData: string, targetW: number, targetH: number): Promise<string> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    const img = new Image()
    img.onload = () => {
      const scale = Math.min((targetW * 11.811) / img.width, (targetH * 11.811) / img.height, 1)
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

// ─── Main cover generator ─────────────────────────────────────────────────────

export interface CoverOptions {
  title: string
  subtitle: string
  pageCount: number
  coverImageUrl?: string
  loadImageAsBase64?: (url: string) => Promise<string>
  luluWidth?: number    // add these
  luluHeight?: number   // add these
}

export async function generateCoverPDF(options: CoverOptions): Promise<Blob> {
  const { title, subtitle, pageCount, coverImageUrl, loadImageAsBase64, luluWidth, luluHeight } = options

    

  // ── Calculate dimensions ────────────────────────────────────────────────────
  const spineIn   = pageCount * PPI_60LB
 
 // Use Lulu's exact dimensions if provided, otherwise calculate
  const totalW = luluWidth || inToMm(TRIM_W_IN * 2 + pageCount * PPI_60LB + BLEED_IN * 2)
  const totalH = luluHeight || inToMm(TRIM_H_IN + BLEED_IN * 2)
  const bleed  = inToMm(BLEED_IN)  // 3.175mm
  const trimW  = inToMm(TRIM_W_IN) // 152.4mm per side
  const trimH  = inToMm(TRIM_H_IN) // 228.6mm
  const spine  = inToMm(spineIn)   // varies by page count

  // Key X positions
  const backLeft   = 0                         // back cover starts at left bleed edge
  const spineLeft  = bleed + trimW             // spine starts after back + bleed
  const frontLeft  = spineLeft + spine         // front cover starts after spine
  const frontRight = totalW                    // right bleed edge

  // Key Y positions
  const topBleed    = 0
  
  const contentBot  = totalH - bleed - 18    // bottom margin inside trim
  const midY        = totalH / 2

  // Create doc at cover dimensions
  const doc = new jsPDF({
    unit: 'mm',
    format: [totalW, totalH],
    orientation: 'landscape',
  })

  // Register fonts
  doc.addFileToVFS('EBGaramond-Regular.ttf', EBGaramondRegular)
  doc.addFont('EBGaramond-Regular.ttf', 'EBGaramond', 'normal')
  doc.addFileToVFS('EBGaramond-Italic.ttf', EBGaramondItalic)
  doc.addFont('EBGaramond-Italic.ttf', 'EBGaramond', 'italic')
  doc.addFileToVFS('EBGaramond-Bold.ttf', EBGaramondBold)
  doc.addFont('EBGaramond-Bold.ttf', 'EBGaramond', 'bold')
  doc.addFileToVFS('EBGaramond-BoldItalic.ttf', EBGaramondBoldItalic)
  doc.addFont('EBGaramond-BoldItalic.ttf', 'EBGaramond', 'bolditalic')

  // ── Full background ─────────────────────────────────────────────────────────
  setFill(doc, C_PAGE_BG)
  doc.rect(0, 0, totalW, totalH, 'F')

  // ── FRONT COVER ─────────────────────────────────────────────────────────────
  const frontCX = frontLeft + trimW / 2   // centre of front panel

  // Cover image — top half of front
  if (coverImageUrl && loadImageAsBase64) {
    try {
      const rawImg = await loadImageAsBase64(coverImageUrl)
      const img = new Image()
      img.src = rawImg
      await new Promise((resolve, reject) => { img.onload = resolve; img.onerror = reject })

      const maxIW = trimW - 24
      const maxIH = trimH * 0.42
      const ratio = Math.min(maxIW / img.width, maxIH / img.height)
      const iw = img.width * ratio
      const ih = img.height * ratio
      const ix = frontLeft + (trimW - iw) / 2
      const iy = bleed + 20

      const compressed = await compressImage(rawImg, iw, ih)

      setDraw(doc, C_DIVIDER)
      doc.setLineWidth(0.3)
      doc.roundedRect(ix - 1.5, iy - 1.5, iw + 3, ih + 3, 2, 2)
      doc.addImage(compressed, 'JPEG', ix, iy, iw, ih)

      ornament(doc, frontCX, iy + ih + 12)

      // Title below image
      doc.setFont('EBGaramond', 'bold')
      doc.setFontSize(22)
      setTxt(doc, C_PRIMARY)
      doc.text(title, frontCX, iy + ih + 26, { align: 'center', maxWidth: trimW - 24 })

      ornament(doc, frontCX, iy + ih + 36)

      doc.setFont('EBGaramond', 'italic')
      doc.setFontSize(10)
      setTxt(doc, C_SECONDARY)
      doc.text(subtitle, frontCX, iy + ih + 48, { align: 'center', maxWidth: trimW - 24 })

    } catch {
      renderFrontTextOnly(doc, title, subtitle, frontCX, bleed, trimH)
    }
  } else {
    renderFrontTextOnly(doc, title, subtitle, frontCX, bleed, trimH)
  }

  // Footer line on front
  setDraw(doc, C_DIVIDER)
  doc.setLineWidth(0.2)
  doc.line(frontLeft + 12, contentBot + 6, frontRight - 12, contentBot + 6)

  doc.setFont('EBGaramond', 'normal')
  doc.setFontSize(7.5)
  setTxt(doc, C_MUTED)
  doc.text('Tell Me Your Story · tellmeyourstory.uk', frontCX, contentBot + 12, { align: 'center' })

  // ── SPINE ───────────────────────────────────────────────────────────────────
  if (spine > 8) {
    // Only render spine text if wide enough to read
    const spineCX = spineLeft + spine / 2
    const spineMidY = totalH / 2

    // Spine background — slightly darker
    setFill(doc, [240, 235, 228])
    doc.rect(spineLeft, 0, spine, totalH, 'F')

    // Spine title — rotated
    doc.setFont('EBGaramond', 'bold')
    doc.setFontSize(Math.min(9, spine * 3))
    setTxt(doc, C_PRIMARY)

    doc.saveGraphicsState()
    // Rotate around spine centre
      
// Rotate text 90 degrees for spine using jsPDF's built-in angle option
doc.setFont('EBGaramond', 'bold')
doc.setFontSize(Math.min(9, spine * 3))
setTxt(doc, C_PRIMARY)
doc.text(
  title,
  spineCX,
  spineMidY,
  {
    align: 'center',
    angle: 90,
    maxWidth: trimH - 40,
  }
)
    doc.restoreGraphicsState()

    // Small logo at spine bottom
    doc.setFont('EBGaramond', 'normal')
    doc.setFontSize(6)
    setTxt(doc, C_MUTED)
  }

  // Spine divider lines
  setDraw(doc, C_DIVIDER)
  doc.setLineWidth(0.3)
  doc.line(spineLeft,        bleed,           spineLeft,        totalH - bleed)
  doc.line(spineLeft + spine, bleed,           spineLeft + spine, totalH - bleed)

  // ── BACK COVER ──────────────────────────────────────────────────────────────
  const backCX = bleed + trimW / 2

  // Back cover dark accent block at top
  setFill(doc, C_DARK)
  doc.rect(backLeft, topBleed, bleed + trimW, totalH * 0.12, 'F')

  // Brand name in dark block
  doc.setFont('EBGaramond', 'normal')
  doc.setFontSize(8)
  setTxt(doc, [198, 168, 130])
  doc.text('TELL ME YOUR STORY', backCX, bleed + totalH * 0.06, { align: 'center' })

  // Ornament
  ornament(doc, backCX, bleed + totalH * 0.12 + 16)

  // Back cover description
  doc.setFont('EBGaramond', 'italic')
  doc.setFontSize(11)
  setTxt(doc, C_SECONDARY)
  doc.text(
    `"${title}"`,
    backCX,
    bleed + totalH * 0.12 + 30,
    { align: 'center', maxWidth: trimW - 24 }
  )

  doc.setFont('EBGaramond', 'normal')
  doc.setFontSize(9)
  setTxt(doc, C_SECONDARY)

  const backDesc = 'A life told through memories, moments, and love. Created with Tell Me Your Story — capturing the stories that matter most, before they are lost.'
  const backLines = doc.splitTextToSize(backDesc, trimW - 32)
  backLines.forEach((ln: string, i: number) => {
    doc.text(ln, backCX, bleed + totalH * 0.12 + 46 + i * 6, { align: 'center' })
  })

  // Ornament before URL
  ornament(doc, backCX, midY + 20)

  // Website
  doc.setFont('EBGaramond', 'normal')
  doc.setFontSize(8)
  setTxt(doc, C_MUTED)
  doc.text('tellmeyourstory.uk', backCX, midY + 32, { align: 'center' })

  // Back cover footer
  setDraw(doc, C_DIVIDER)
  doc.setLineWidth(0.2)
  doc.line(bleed + 12, contentBot + 6, bleed + trimW - 12, contentBot + 6)

  doc.setFont('EBGaramond', 'normal')
  doc.setFontSize(7)
  setTxt(doc, C_MUTED)
  doc.text('Printed by Lulu Press · tellmeyourstory.uk', backCX, contentBot + 12, { align: 'center' })

  // ── Bleed guide marks (crop marks) — helps printer ──────────────────────────
  // These are very faint lines at the trim boundaries
  setDraw(doc, [200, 200, 200])
  doc.setLineWidth(0.1)
  // Top trim line
  doc.line(0, bleed, totalW, bleed)
  // Bottom trim line
  doc.line(0, totalH - bleed, totalW, totalH - bleed)
  // Left trim line (back cover left edge)
  doc.line(bleed, 0, bleed, totalH)
  // Right trim line (front cover right edge)
  doc.line(totalW - bleed, 0, totalW - bleed, totalH)

  return doc.output('blob')
}

// ─── Fallback: front cover text only (no image) ───────────────────────────────
function renderFrontTextOnly(
  doc: jsPDF,
  title: string,
  subtitle: string,
  frontCX: number,
  bleed: number,
  trimH: number
) {
  const midY = bleed + trimH / 2

  doc.setFont('EBGaramond', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(140, 132, 126)
  doc.text('A MEMORY WORTH KEEPING', frontCX, midY - 40, { align: 'center' })

  ornament(doc, frontCX, midY - 30)

  doc.setFont('EBGaramond', 'bold')
  doc.setFontSize(26)
  doc.setTextColor(38, 34, 32)
  doc.text(title, frontCX, midY - 12, { align: 'center', maxWidth: 130 })

  ornament(doc, frontCX, midY + 6)

  doc.setFont('EBGaramond', 'italic')
  doc.setFontSize(10)
  doc.setTextColor(92, 84, 78)
  doc.text(subtitle, frontCX, midY + 20, { align: 'center', maxWidth: 120 })
}

// ─── Utility: get spine width in mm for a given page count ────────────────────
export function getSpineWidthMm(pageCount: number): number {
  return inToMm(pageCount * PPI_60LB)
}

// ─── Utility: get full cover dimensions for a given page count ────────────────
export function getCoverDimensions(pageCount: number) {
  const spineIn  = pageCount * PPI_60LB
  const totalWIn = TRIM_W_IN * 2 + spineIn + BLEED_IN * 2
  const totalHIn = TRIM_H_IN + BLEED_IN * 2
  return {
    width_mm:  inToMm(totalWIn),
    height_mm: inToMm(totalHIn),
    spine_mm:  inToMm(spineIn),
    bleed_mm:  inToMm(BLEED_IN),
  }
}