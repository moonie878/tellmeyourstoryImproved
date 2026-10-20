/**
 * scripts/backfill-audio.mjs
 *
 * Converts every voice recording already in storage to MP3 and repoints the
 * database at the new file.
 *
 * WHY IT MATTERS MORE THAN IT LOOKS
 *
 * The QR codes in printed books point at /listen/<id>, and that page reads
 * audio_url out of the voice_recordings table. So changing the stored URL
 * fixes books that are already on people's shelves — including ones bought
 * months ago that have been silent on every iPhone that scanned them.
 *
 * Nothing is deleted. The original WebM stays where it is.
 *
 * Usage:
 *   node scripts/backfill-audio.mjs --dry     # list what would change
 *   node scripts/backfill-audio.mjs           # do it
 *   node scripts/backfill-audio.mjs --limit 5 # try a handful first
 *
 * Needs SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.
 * Install once:  npm i -D @ffmpeg-installer/ffmpeg @supabase/supabase-js
 */

import { existsSync, readFileSync } from 'fs'
import { writeFile, readFile, unlink } from 'fs/promises'
import { spawn } from 'child_process'
import { tmpdir } from 'os'
import { join, resolve } from 'path'
import crypto from 'crypto'
import { createClient } from '@supabase/supabase-js'
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg'

const BUCKET = 'voice-recordings'
const BITRATE = '64k'

/** Node does not read .env on its own and this script has no dependencies for it. */
function loadEnv() {
  for (const name of ['.env', '.env.local']) {
    const path = resolve(name)
    if (!existsSync(path)) continue
    const text = readFileSync(path, 'utf-8').replace(/^﻿/, '')
    for (const line of text.split(/\r?\n/)) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const eq = trimmed.indexOf('=')
      if (eq === -1) continue
      const key = trimmed.slice(0, eq).trim().replace(/^export\s+/, '')
      let value = trimmed.slice(eq + 1).trim()
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1)
      } else {
        value = value.split(' #')[0].trim()
      }
      if (!(key in process.env)) process.env[key] = value
    }
  }
}

loadEnv()

const DRY = process.argv.includes('--dry')
const limitIdx = process.argv.indexOf('--limit')
const LIMIT = limitIdx !== -1 ? parseInt(process.argv[limitIdx + 1], 10) : Infinity

const SUPABASE_URL = process.env.SUPABASE_URL
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('\n  Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.')
  console.error('  Run this from the project root, where .env lives.\n')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SERVICE_KEY)

async function toMp3(buffer, ext) {
  const stamp = crypto.randomBytes(8).toString('hex')
  const inPath = join(tmpdir(), `tmys-${stamp}.${ext}`)
  const outPath = join(tmpdir(), `tmys-${stamp}.mp3`)
  await writeFile(inPath, buffer)
  try {
    await new Promise((res, rej) => {
      const ff = spawn(ffmpegInstaller.path, [
        '-hide_banner', '-loglevel', 'error', '-y',
        '-i', inPath,
        '-vn', '-ac', '1', '-ar', '44100', '-b:a', BITRATE,
        '-write_xing', '1',
        outPath,
      ])
      const err = []
      ff.stderr.on('data', (d) => err.push(d))
      ff.on('error', rej)
      ff.on('close', (code) =>
        code === 0 ? res() : rej(new Error(`ffmpeg ${code}: ${Buffer.concat(err).toString().slice(0, 300)}`)),
      )
    })
    return await readFile(outPath)
  } finally {
    await unlink(inPath).catch(() => {})
    await unlink(outPath).catch(() => {})
  }
}

/** The storage path inside the bucket, from a public URL. */
function storagePathFrom(url) {
  const marker = `/${BUCKET}/`
  const i = url.indexOf(marker)
  if (i === -1) return null
  return decodeURIComponent(url.slice(i + marker.length))
}

async function main() {
  const { data: rows, error } = await supabase
    .from('voice_recordings')
    .select('id, project_id, section_id, audio_url, created_at')
    .order('created_at', { ascending: true })

  if (error) {
    console.error('Could not read voice_recordings:', error.message)
    process.exit(1)
  }

  const needsWork = (rows || []).filter(
    (r) => r.audio_url && /\.(webm|ogg)(\?|$)/i.test(r.audio_url),
  )

  console.log(`\n  ${rows?.length || 0} recordings total`)
  console.log(`  ${needsWork.length} are WebM or Ogg — silent on every Apple device\n`)

  if (!needsWork.length) {
    console.log('  Nothing to do.\n')
    return
  }

  const todo = needsWork.slice(0, LIMIT)
  if (todo.length < needsWork.length) console.log(`  Doing the first ${todo.length} (--limit)\n`)

  let done = 0
  let failed = 0

  for (const row of todo) {
    const path = storagePathFrom(row.audio_url)
    if (!path) {
      console.log(`  ?  ${row.id} — could not work out the storage path, skipped`)
      failed++
      continue
    }

    if (DRY) {
      console.log(`  ·  ${path}  →  ${path.replace(/\.(webm|ogg)$/i, '.mp3')}`)
      continue
    }

    try {
      const { data: blob, error: dlErr } = await supabase.storage.from(BUCKET).download(path)
      if (dlErr) throw new Error(`download: ${dlErr.message}`)

      const buffer = Buffer.from(await blob.arrayBuffer())
      const ext = path.toLowerCase().endsWith('.ogg') ? 'ogg' : 'webm'
      const mp3 = await toMp3(buffer, ext)

      const mp3Path = path.replace(/\.(webm|ogg)$/i, '.mp3')
      const { error: upErr } = await supabase.storage
        .from(BUCKET)
        .upload(mp3Path, mp3, { contentType: 'audio/mpeg', upsert: true })
      if (upErr) throw new Error(`upload: ${upErr.message}`)

      const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(mp3Path)

      const { error: dbErr } = await supabase
        .from('voice_recordings')
        .update({ audio_url: pub.publicUrl })
        .eq('id', row.id)
      if (dbErr) throw new Error(`db: ${dbErr.message}`)

      const kb = (buffer.length / 1024).toFixed(0)
      const mp3kb = (mp3.length / 1024).toFixed(0)
      console.log(`  ok ${mp3Path}  (${kb}kB → ${mp3kb}kB)`)
      done++
    } catch (err) {
      console.error(`  !! ${path} — ${err.message}`)
      failed++
    }
  }

  if (DRY) {
    console.log(`\n  --dry: nothing changed. ${todo.length} would be converted.\n`)
  } else {
    console.log(`\n  Converted ${done}, failed ${failed}.`)
    console.log('  The originals are untouched. Printed books now play on Apple devices.\n')
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
