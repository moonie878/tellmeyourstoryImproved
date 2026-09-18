/**
 * scripts/optimise-images.mjs
 *
 * Creates a .webp next to every .jpg / .jpeg / .png in public/images.
 * Originals are kept (social share images and old links still use them).
 *
 * Run once, then commit the new .webp files:
 *   npm i -D sharp
 *   node scripts/optimise-images.mjs
 *
 * Safe to re-run: images whose .webp is already up to date are skipped.
 */

import { readdir, stat } from 'fs/promises'
import { join, extname, relative } from 'path'
import sharp from 'sharp'

const ROOT = 'public/images'
const MAX_WIDTH = 1600 // plenty for 2× retina at the sizes the site displays
const QUALITY = 78 // visually identical for photos and screenshots

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) yield* walk(full)
    else yield full
  }
}

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`

let before = 0
let after = 0
let converted = 0
let skipped = 0

for await (const file of walk(ROOT)) {
  const ext = extname(file).toLowerCase()
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue

  const out = file.slice(0, -ext.length) + '.webp'
  const src = await stat(file)

  try {
    const existing = await stat(out)
    if (existing.mtimeMs >= src.mtimeMs) {
      skipped++
      continue
    }
  } catch {
    // no .webp yet
  }

  const image = sharp(file).rotate() // respect phone-photo orientation
  const { width = 0, height = 0 } = await image.metadata()

  await image
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY, effort: 5 })
    .toFile(out)

  const result = await stat(out)
  before += src.size
  after += result.size
  converted++

  const outWidth = Math.min(width, MAX_WIDTH)
  const outHeight = width ? Math.round((height * outWidth) / width) : height
  console.log(
    `  ✓ ${relative(ROOT, out).padEnd(48)} ${kb(src.size).padStart(8)} → ${kb(result.size).padStart(7)}   (${outWidth}×${outHeight})`,
  )
}

console.log(
  `\n  ${converted} converted, ${skipped} already up to date` +
    (converted ? ` — ${kb(before)} → ${kb(after)} (${Math.round((1 - after / before) * 100)}% smaller)` : ''),
)
