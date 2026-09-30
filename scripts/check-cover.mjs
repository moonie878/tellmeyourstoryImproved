/**
 * scripts/check-cover.mjs
 *
 * Checks a generated cover PDF without uploading anything to Lulu.
 *
 *  1. Measures the actual sheet size and reports it in mm.
 *  2. Works out where the fold (or trim) and safe lines fall for that binding.
 *  3. Writes a copy with those guides drawn on top, so you can open it in any
 *     PDF viewer and see immediately whether the artwork sits inside the folds.
 *
 * This is the same check Lulu's previewer gives you, minus the upload — use it
 * to iterate, then confirm the final file in Lulu's previewer or the sandbox.
 *
 * Usage:
 *   node scripts/check-cover.mjs cover.pdf hardcover
 *   node scripts/check-cover.mjs cover.pdf softcover  [spine_mm]
 *
 * Bindings: softcover | hardcover | dustjacket
 * Install once:  npm i -D pdf-lib
 */

import { readFile, writeFile } from 'fs/promises'
import { PDFDocument, rgb } from 'pdf-lib'

const PT_PER_MM = 72 / 25.4
const mm = (v) => v * PT_PER_MM

const TRIM_W = 152.4   // 6in
const TRIM_H = 228.6   // 9in
const FLAP_W = 76.2    // 3in
const SAFE   = 8       // must match SAFE_MARGIN in generateCoverPDF.ts

// Must match EDGE_ALLOWANCE in generateCoverPDF.ts
const EDGE = { softcover: 3.175, hardcover: 22.225, dustjacket: 3.175 }

const [, , file, bindingArg = 'softcover', spineArg] = process.argv

if (!file) {
  console.error('Usage: node scripts/check-cover.mjs <cover.pdf> [softcover|hardcover|dustjacket] [spine_mm]')
  process.exit(1)
}

const binding = bindingArg.toLowerCase()
if (!EDGE[binding]) {
  console.error(`Unknown binding "${bindingArg}". Use softcover, hardcover or dustjacket.`)
  process.exit(1)
}

const edge = EDGE[binding]
const flap = binding === 'dustjacket' ? FLAP_W : 0

const bytes = await readFile(file)
const pdf   = await PDFDocument.load(bytes)
const page  = pdf.getPages()[0]

if (!page) {
  console.error('That PDF has no pages.')
  process.exit(1)
}

const wMm = page.getWidth()  / PT_PER_MM
const hMm = page.getHeight() / PT_PER_MM

// Spine: given, or inferred from the sheet on the assumption of 6x9 panels.
const spine = spineArg ? parseFloat(spineArg) : wMm - edge * 2 - flap * 2 - TRIM_W * 2

const spineLeft  = (wMm - spine) / 2
const spineRight = spineLeft + spine
const backLeft   = edge + flap
const frontRight = wMm - edge - flap
const panelW     = frontRight - spineRight

console.log(`\nCover: ${file}`)
console.log(`Binding: ${binding} (edge allowance ${edge}mm per side)\n`)
console.log(`  sheet        ${wMm.toFixed(2)} x ${hMm.toFixed(2)} mm`)
console.log(`  spine        ${spine.toFixed(2)} mm${spineArg ? '' : '  (inferred — pass the real value as the 3rd argument)'}`)
console.log(`  panel width  ${panelW.toFixed(2)} mm`)
console.log(`  visible area ${edge.toFixed(2)} .. ${(wMm - edge).toFixed(2)} mm across`)
console.log(`  safe band    ${(edge + SAFE).toFixed(1)} .. ${(hMm - edge - SAFE).toFixed(1)} mm down\n`)

const problems = []
if (Math.abs(panelW - TRIM_W) > 1.5) {
  problems.push(`panel is ${panelW.toFixed(2)}mm, expected ~${TRIM_W}mm — sheet width and spine disagree`)
}
if (Math.abs(hMm - (TRIM_H + edge * 2)) > 1.5) {
  problems.push(`sheet height is ${hMm.toFixed(2)}mm, expected ~${(TRIM_H + edge * 2).toFixed(2)}mm for ${binding}`)
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
const RED   = rgb(0.85, 0.1, 0.25)   // fold / trim — artwork outside this is lost
const BLUE  = rgb(0.15, 0.4, 0.85)   // spine folds
const GREEN = rgb(0.1, 0.6, 0.3)     // safe margin — keep text inside

const vline = (x, color, dash) =>
  page.drawLine({
    start: { x: mm(x), y: 0 },
    end:   { x: mm(x), y: mm(hMm) },
    thickness: 0.6, color, opacity: 0.9, dashArray: dash,
  })

const hline = (y, color, dash) =>
  page.drawLine({
    start: { x: 0,        y: mm(y) },
    end:   { x: mm(wMm),  y: mm(y) },
    thickness: 0.6, color, opacity: 0.9, dashArray: dash,
  })

// Fold / trim edges
vline(edge, RED)
vline(wMm - edge, RED)
hline(edge, RED)
hline(hMm - edge, RED)

// Spine folds
vline(spineLeft, BLUE, [4, 3])
vline(spineRight, BLUE, [4, 3])

// Dust jacket flap folds
if (flap) {
  vline(backLeft, BLUE, [4, 3])
  vline(frontRight, BLUE, [4, 3])
}

// Safe margins
vline(edge + SAFE, GREEN, [2, 3])
vline(wMm - edge - SAFE, GREEN, [2, 3])
hline(edge + SAFE, GREEN, [2, 3])
hline(hMm - edge - SAFE, GREEN, [2, 3])

const out = file.replace(/\.pdf$/i, '') + '-guides.pdf'
await writeFile(out, await pdf.save())

console.log(`\n  Guides written to ${out}`)
console.log('   red   = fold / trim edge (anything outside is lost)')
console.log('   blue  = spine folds')
console.log('   green = safe margin (keep text inside)\n')

process.exitCode = problems.length ? 1 : 0
