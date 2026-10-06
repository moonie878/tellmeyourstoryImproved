/**
 * scripts/check-cover.mjs
 *
 * Checks a generated cover PDF without uploading anything to Lulu.
 *
 *  1. Measures the actual sheet size and reports it in mm.
 *  2. Works out where the fold, the spine and the safe lines fall.
 *  3. Draws a CENTRE line down each panel, so you can see at a glance whether
 *     the artwork is actually centred on the finished cover.
 *  4. Writes a copy with those guides on top.
 *
 * Usage:
 *   node scripts/check-cover.mjs cover.pdf hardcover
 *   node scripts/check-cover.mjs cover.pdf softcover  [spine_mm]
 *
 * Bindings: softcover | hardcover | dustjacket
 * Install once:  npm i -D pdf-lib
 *
 * ── Why there are two edge constants ────────────────────────────────────────
 * SHEET_EDGE is how much wider the PDF is than two trimmed pages plus the
 * spine. LOST_EDGE is how much of that actually disappears when the cover is
 * finished. On softcover they are the same. On a hardcover case wrap they are
 * not: the board is cut 3.175mm larger than the page on the fore-edge, head
 * and tail, so of the 22.225mm allowance only 19.05mm folds under.
 *
 * The earlier version of this script used SHEET_EDGE for both. It drew the
 * fold line 3.175mm inside where the fold really is, which is why it passed a
 * cover whose panels were 1.5875mm off — and would now fail a correct one.
 * Keep these in step with generateCoverPDF.ts.
 */

import { readFile, writeFile } from 'fs/promises'
import { PDFDocument, rgb } from 'pdf-lib'

const PT_PER_MM = 72 / 25.4
const mm = (v) => v * PT_PER_MM

const TRIM_W = 152.4   // 6in
const TRIM_H = 228.6   // 9in
const FLAP_W = 76.2    // 3in
const SAFE   = 8       // must match SAFE_MARGIN in generateCoverPDF.ts

/** Per-side sheet allowance — must match EDGE_ALLOWANCE. */
const SHEET_EDGE = { softcover: 3.175, hardcover: 22.225, dustjacket: 3.175 }
/** Per-side loss — must match LOST_EDGE. Where the visible cover begins. */
const LOST_EDGE  = { softcover: 3.175, hardcover: 19.05,  dustjacket: 3.175 }
/** Board overhang beyond the page, fore-edge/head/tail — must match BOARD_OVERHANG. */
const OVERHANG   = { softcover: 0,     hardcover: 3.175,  dustjacket: 0 }

const [, , file, bindingArg = 'softcover', spineArg] = process.argv

if (!file) {
  console.error('Usage: node scripts/check-cover.mjs <cover.pdf> [softcover|hardcover|dustjacket] [spine_mm]')
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

// Panels run from the spine out to the VISIBLE edge.
const backLeft   = lostEdge + flap
const frontRight = wMm - lostEdge - flap
const panelW     = frontRight - spineRight
const expectedPanel = TRIM_W + overhang

const backCX  = (backLeft + spineLeft) / 2
const frontCX = (spineRight + frontRight) / 2

console.log(`\nCover: ${file}`)
console.log(`Binding: ${binding}  ·  sheet allowance ${sheetEdge}mm/side  ·  actually lost ${lostEdge}mm/side\n`)
console.log(`  sheet         ${wMm.toFixed(2)} x ${hMm.toFixed(2)} mm`)
console.log(`  spine         ${spine.toFixed(2)} mm${spineArg ? '' : '  (inferred — pass the real value as the 3rd argument)'}`)
console.log(`  visible panel ${panelW.toFixed(2)} mm   expected ${expectedPanel.toFixed(2)} mm` +
            (overhang ? `  (page ${TRIM_W} + ${overhang} board)` : ''))
console.log(`  visible area  ${lostEdge.toFixed(2)} .. ${(wMm - lostEdge).toFixed(2)} mm across`)
console.log(`  safe band     ${(lostEdge + SAFE).toFixed(1)} .. ${(hMm - lostEdge - SAFE).toFixed(1)} mm down`)
console.log(`  panel centres back ${backCX.toFixed(3)} mm · front ${frontCX.toFixed(3)} mm`)
console.log(`                (the magenta lines — artwork must be symmetric about them)\n`)

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

if (problems.length) {
  console.log('  PROBLEMS')
  for (const p of problems) console.log(`   - ${p}`)
} else {
  console.log('  Sheet geometry looks right for this binding.')
}

// ── Draw the guides ─────────────────────────────────────────────────────────
const RED     = rgb(0.85, 0.1, 0.25)   // fold / trim — artwork outside this is lost
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

// Fold / trim edges — the real ones
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
vline(lostEdge + SAFE, GREEN, [2, 3])
vline(wMm - lostEdge - SAFE, GREEN, [2, 3])
hline(lostEdge + SAFE, GREEN, [2, 3])
hline(hMm - lostEdge - SAFE, GREEN, [2, 3])

// Panel centres — the check the old version was missing
vline(backCX,  MAGENTA, [6, 2], 0.9)
vline(frontCX, MAGENTA, [6, 2], 0.9)

const out = file.replace(/\.pdf$/i, '') + '-guides.pdf'
await writeFile(out, await pdf.save())

console.log(`\n  Guides written to ${out}`)
console.log('   red     = fold / trim edge (anything outside is lost)')
console.log('   blue    = spine folds')
console.log('   green   = safe margin (keep text inside)')
console.log('   magenta = panel centre — the title block must sit evenly either side')
console.log('\n  The sheet checks above are automatic. The centring is not: open the')
console.log('  file and look at the magenta lines. A cover can pass every numeric')
console.log('  check and still be visibly off-centre — that is exactly what the')
console.log('  October 2026 hardcover did.\n')

process.exitCode = problems.length ? 1 : 0
