/**
 * scripts/optimise-images.mjs
 *
 * Two jobs, both run once and committed — so the Vercel build doesn't have to
 * compress images on every deploy (that was costing ~4.5 minutes a build):
 *
 *   1. Shrinks the original .jpg/.png files in place (resized and re-encoded).
 *   2. Creates a .webp beside each one for pages that use it.
 *
 * Run:
 *   npm i -D sharp
 *   node scripts/optimise-images.mjs            # webp only (safe, no originals touched)
 *   node scripts/optimise-images.mjs --originals  # also shrink the .jpg/.png files
 *
 * Safe to re-run: files already small enough are skipped.
 */

import { readdir, stat, rename, unlink } from 'fs/promises'
import { join, extname, relative, dirname, basename } from 'path'
import sharp from 'sharp'

const ROOT = 'public/images'
const MAX_WIDTH = 1600        // plenty for 2× retina at the sizes the site shows
const WEBP_QUALITY = 78
const JPEG_QUALITY = 80
const SHRINK_ORIGINALS = process.argv.includes('--originals')

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) yield* walk(full)
    else yield full
  }
}

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`

let webpMade = 0
let shrunk = 0
let skipped = 0
let before = 0
let after = 0

for await (const file of walk(ROOT)) {
  const ext = extname(file).toLowerCase()
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue

  const src = await stat(file)

  // ── 1. Shrink the original in place ────────────────────────────────────────
  if (SHRINK_ORIGINALS) {
    const image = sharp(file).rotate()
    const { width = 0 } = await image.metadata()
    const tooWide = width > MAX_WIDTH
    const tooBig = src.size > 300 * 1024

    if (tooWide || tooBig) {
      const tmp = join(dirname(file), `.tmp-${basename(file)}`)
      const pipeline = image.resize({ width: MAX_WIDTH, withoutEnlargement: true })

      if (ext === '.png') {
        // palette + compression: the big wins are textures and screenshots
        await pipeline.png({ compressionLevel: 9, palette: true, quality: 80 }).toFile(tmp)
      } else {
        await pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toFile(tmp)
      }

      const out = await stat(tmp)
      if (out.size < src.size) {
        await rename(tmp, file)
        before += src.size
        after += out.size
        shrunk++
        console.log(`  ↓ ${relative(ROOT, file).padEnd(46)} ${kb(src.size).padStart(9)} → ${kb(out.size).padStart(8)}`)
      } else {
        await unlink(tmp) // compression made it bigger — keep the original
      }
    }
  }

  // ── 2. Make a .webp beside it ─────────────────────────────────────────────
  const out = file.slice(0, -ext.length) + '.webp'
  const current = await stat(file)

  try {
    const existing = await stat(out)
    if (existing.mtimeMs >= current.mtimeMs) {
      skipped++
      continue
    }
  } catch {
    // no .webp yet
  }

  await sharp(file)
    .rotate()
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY, effort: 5 })
    .toFile(out)

  const webp = await stat(out)
  webpMade++
  console.log(`  ✓ ${relative(ROOT, out).padEnd(46)} ${kb(current.size).padStart(9)} → ${kb(webp.size).padStart(8)}`)
}

console.log(
  `\n  ${webpMade} webp written, ${shrunk} originals shrunk, ${skipped} already up to date` +
    (shrunk ? ` — originals ${kb(before)} → ${kb(after)} (${Math.round((1 - after / before) * 100)}% smaller)` : ''),
)
if (!SHRINK_ORIGINALS) {
  console.log('  Tip: run with --originals to shrink the .jpg/.png files too.\n')
}
