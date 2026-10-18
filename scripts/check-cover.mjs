/**
 * scripts/check-cover.mjs
 *
 * Checks a generated cover PDF without uploading anything to Lulu.
 *
 *   node scripts/check-cover.mjs cover.pdf hardcover
 *   node scripts/check-cover.mjs cover.pdf hardcover 6.35
 *   node scripts/check-cover.mjs cover.pdf hardcover 6.35 lulu-template.pdf
 *
 * Bindings: softcover | hardcover | dustjacket
 * Install once:  npm i -D pdf-lib
 *
 * ── READ THIS BEFORE TRUSTING A PASS ────────────────────────────────────────
 *
 * Without a template, this script CANNOT catch a wrong edge constant. It uses
 * the same LOST_EDGE values as generateCoverPDF.ts, so the magenta centre
 * lines land wherever the generator centred the artwork, and the artwork sits
 * on them perfectly no matter how wrong the constant is. That is exactly how a
 * cover that was 3.175mm off passed every check here three times running
 * between June and October 2026.
 *
 * Pass Lulu's cover template as the 4th argument. The template is drawn by the
 * people who make the book, so it is the only source of truth in the room.
 * With it, this writes a multi-page file: your cover with guides, the template
 * on its own, and the two superimposed. Flip between pages 1 and 2 in any
 * viewer — if the board edges move, your constants are wrong.
 *
 * Get the template from Lulu for the pod package id you are printing.
 *
 * ── Where the hardcover numbers come from ───────────────────────────────────
 *
 * Measured from Lulu's template for 0600X0900.FC.PRE.CW.080CW444.GXX, whose
 * own text reads:
 *
 *     TOTAL DOCUMENT SIZE (with wrap)  355.6mm x 273.05mm
 *     BOOK TRIM SIZE                   158.75mm x 241.3mm
 *     WRAP AREA (from wrap edge)       15.875mm
 *     SAFETY MARGIN (from wrap edge)   15.875mm
 *     Spine width                      6.35mm   [at 66 pages]
 *
 * The board overhangs the page by 6.35mm (0.25in), not 3.175mm, and the boards
 * butt straight onto the spine folds — there is no joint gap.
 *
 * Softcover and dustjacket values below are NOT verified against templates.
 * Do the same exercise for those before trusting a printed one.
 */

import { readFile, writeFile } from 'fs/promises'
import { PDFDocument, rgb } from 'pdf-lib'

const PT_PER_MM = 72 / 25.4
const mm = (v) => v * PT_PER_MM

const TRIM_W = 152.4   // 6in page
const TRIM_H = 228.6   // 9in page
const FLAP_W = 76.2    // 3in

/** Per-side sheet allowance — must match EDGE_ALLOWANCE. */
const SHEET_EDGE = { softcover: 3.175, hardcover: 22.225, dustjacket: 3.175 }
/** Per-side loss — must match LOST_EDGE. Where the visible cover begins. */
const LOST_EDGE  = { softcover: 3.175, hardcover: 15.875, dustjacket: 3.175 }
/** Board overhang beyond the page — must match BOARD_OVERHANG. */
const OVERHANG   = { softcover: 0,     hardcover: 6.35,   dustjacket: 0 }
/** Safety margin inside the visible edge — must match SAFE_MARGIN. */
const SAFE       = { softcover: 8,     hardcover: 15.875, dustjacket: 8 }

const [, , file, bindingArg = 'softcover', spineArg, templateArg] = process.argv

if (!file) {
  console.error('Usage: node scripts/check-cover.mjs <cover.pdf> [softcover|hardcover|dustjacket] [spine_mm] [lulu-template.pdf]')
  process.exit(1)
}

const binding = bindingArg.toLowerCase()
if (!SHEET_EDGE[binding]) {
  console.error(`Unknown binding "${bindingArg}". Use softcover, hardcover or dustjacket.`)
  process.exit(1)
}

const sheetEdge = SHEET_EDGE[binding]
const lostEdge  = LOST_EDGE[binding]
const overhang  = OVERHANG[binding]
const safe      = SAFE[binding]
const flap      = binding === 'dustjacket' ? FLAP_W : 0

const bytes = await readFile(file)
const pdf   = await PDFDocument.load(bytes)
const page  = pdf.getPages()[0]

if (!page) {
  console.error('That PDF has no pages.')
  process.exit(1)
}

const wMm = page.getWidth()  / PT_PER_MM
const hMm = page.getHeight() / PT_PER_MM

// Spine from the SHEET allowance — this one is about the PDF, not the book.
const spine = spineArg ? parseFloat(spineArg) : wMm - sheetEdge * 2 - flap * 2 - TRIM_W * 2

const spineLeft  = (wMm - spine) / 2
const spineRight = spineLeft + spine

// Panels run from the spine fold out to the VISIBLE edge.
const backLeft   = lostEdge + flap
const backRight  = spineLeft
const frontLeft  = spineRight
const frontRight = wMm - lostEdge - flap
const panelW     = frontRight - frontLeft
const expectedPanel = TRIM_W + overhang

const backCX  = (backLeft + backRight) / 2
const frontCX = (frontLeft + frontRight) / 2

const contentTop = lostEdge + safe
const contentBot = hMm - lostEdge - safe

console.log(`\nCover: ${file}`)
console.log(`Binding: ${binding}  ·  sheet allowance ${sheetEdge}mm/side  ·  wrap ${lostEdge}mm/side  ·  safe ${safe}mm\n`)
console.log(`  sheet          ${wMm.toFixed(2)} x ${hMm.toFixed(2)} mm`)
console.log(`  spine          ${spine.toFixed(2)} mm${spineArg ? '' : '  (inferred — pass the real value as the 3rd argument)'}`)
console.log(`  visible panel  ${panelW.toFixed(2)} mm   expected ${expectedPanel.toFixed(2)} mm` +
            (overhang ? `  (page ${TRIM_W} + ${overhang} board)` : ''))
console.log(`  board height   ${(hMm - lostEdge * 2).toFixed(2)} mm   expected ${(TRIM_H + overhang * 2).toFixed(2)} mm`)
console.log('')
console.log(`  back board     ${backLeft.toFixed(3)} .. ${backRight.toFixed(3)} mm`)
console.log(`  spine          ${spineLeft.toFixed(3)} .. ${spineRight.toFixed(3)} mm`)
console.log(`  front board    ${frontLeft.toFixed(3)} .. ${frontRight.toFixed(3)} mm`)
console.log(`  safe band      ${contentTop.toFixed(2)} .. ${contentBot.toFixed(2)} mm down`)
console.log(`  panel centres  back ${backCX.toFixed(3)} mm · front ${frontCX.toFixed(3)} mm`)
console.log(`                 (compare these to the template's own lines)\n`)

const problems = []
if (Math.abs(panelW - expectedPanel) > 1.5) {
  problems.push(`visible panel is ${panelW.toFixed(2)}mm, expected ~${expectedPanel.toFixed(2)}mm — sheet width and spine disagree`)
}
if (Math.abs(hMm - (TRIM_H + sheetEdge * 2)) > 1.5) {
  problems.push(`sheet height is ${hMm.toFixed(2)}mm, expected ~${(TRIM_H + sheetEdge * 2).toFixed(2)}mm for ${binding}`)
}
if (spine <= 0) {
  problems.push(`spine computed as ${spine.toFixed(2)}mm — check the binding argument matches the file`)
}

// ── Template comparison — the only check here that is not circular ──────────
let tplDoc = null
if (templateArg) {
  try {
    tplDoc = await PDFDocument.load(await readFile(templateArg))
    const tp = tplDoc.getPages()[0]
    const tW = tp.getWidth()  / PT_PER_MM
    const tH = tp.getHeight() / PT_PER_MM
    console.log(`  template       ${tW.toFixed(2)} x ${tH.toFixed(2)} mm  (${templateArg})`)
    if (Math.abs(tW - wMm) > 0.5 || Math.abs(tH - hMm) > 0.5) {
      problems.push(
        `template sheet is ${tW.toFixed(2)}x${tH.toFixed(2)}mm but the cover is ` +
        `${wMm.toFixed(2)}x${hMm.toFixed(2)}mm — different page count or pod package, ` +
        `so the overlay will not line up`,
      )
    } else {
      console.log('  template sheet matches the cover exactly — the overlay is meaningful.\n')
    }
  } catch (err) {
    problems.push(`could not read the template (${templateArg}): ${err.message}`)
  }
} else {
  console.log('  NO TEMPLATE GIVEN — the centring check below is circular and proves nothing.')
  console.log('  Pass Lulu\'s template as the 4th argument to make it real.\n')
}

if (problems.length) {
  console.log('  PROBLEMS')
  for (const p of problems) console.log(`   - ${p}`)
} else {
  console.log('  Sheet geometry looks right for this binding.')
}

// ── Draw the guides ─────────────────────────────────────────────────────────
const RED     = rgb(0.85, 0.1, 0.25)   // visible edge — artwork outside this is lost
const BLUE    = rgb(0.15, 0.4, 0.85)   // spine folds
const GREEN   = rgb(0.1, 0.6, 0.3)     // safe margin — keep text inside
const MAGENTA = rgb(0.85, 0.2, 0.75)   // panel centres — artwork must straddle these

const vline = (x, color, dash, thickness = 0.6) =>
  page.drawLine({
    start: { x: mm(x), y: 0 },
    end:   { x: mm(x), y: mm(hMm) },
    thickness, color, opacity: 0.9, dashArray: dash,
  })

const hline = (y, color, dash) =>
  page.drawLine({
    start: { x: 0,       y: mm(y) },
    end:   { x: mm(wMm), y: mm(y) },
    thickness: 0.6, color, opacity: 0.9, dashArray: dash,
  })

// Visible edges — where the wrap folds under
vline(lostEdge, RED)
vline(wMm - lostEdge, RED)
hline(lostEdge, RED)
hline(hMm - lostEdge, RED)

// Spine folds
vline(spineLeft, BLUE, [4, 3])
vline(spineRight, BLUE, [4, 3])

// Dust jacket flap folds
if (flap) {
  vline(backLeft, BLUE, [4, 3])
  vline(frontRight, BLUE, [4, 3])
}

// Safe margins
vline(lostEdge + safe, GREEN, [2, 3])
vline(wMm - lostEdge - safe, GREEN, [2, 3])
hline(contentTop, GREEN, [2, 3])
hline(contentBot, GREEN, [2, 3])

// Panel centres
vline(backCX,  MAGENTA, [6, 2], 0.9)
vline(frontCX, MAGENTA, [6, 2], 0.9)

// ── Write the output ────────────────────────────────────────────────────────
const out = file.replace(/\.pdf$/i, '') + '-guides.pdf'

if (tplDoc) {
  // Page 1 — your cover with guides
  // Page 2 — Lulu's template alone
  // Page 3 — the template laid over your cover
  const outDoc = await PDFDocument.create()

  const [guided] = await outDoc.copyPages(pdf, [0])
  outDoc.addPage(guided)

  const [tplCopy] = await outDoc.copyPages(tplDoc, [0])
  outDoc.addPage(tplCopy)

  try {
    const [again] = await outDoc.copyPages(pdf, [0])
    const overlay = outDoc.addPage(again)
    const embedded = await outDoc.embedPage(tplDoc.getPages()[0])
    overlay.drawPage(embedded, {
      x: 0, y: 0,
      width:  overlay.getWidth(),
      height: overlay.getHeight(),
      opacity: 0.45,
    })
  } catch (err) {
    console.log(`\n  (overlay page skipped: ${err.message})`)
  }

  await writeFile(out, await outDoc.save())
} else {
  await writeFile(out, await pdf.save())
}

console.log(`\n  Written to ${out}`)
console.log('   red     = visible edge (anything outside folds under the board)')
console.log('   blue    = spine folds')
console.log('   green   = safe margin (keep text inside)')
console.log('   magenta = panel centre')

if (tplDoc) {
  console.log('\n   page 1 = your cover with guides')
  console.log('   page 2 = Lulu\'s template')
  console.log('   page 3 = the two superimposed')
  console.log('\n  Flip between pages 1 and 2. If the board edges or the spine move,')
  console.log('  your constants disagree with Lulu and the printed book will be off.')
} else {
  console.log('\n  Remember: without a template this file only shows that the generator')
  console.log('  agrees with itself. It is not evidence the cover is correct.')
}
console.log('')

process.exitCode = problems.length ? 1 : 0
