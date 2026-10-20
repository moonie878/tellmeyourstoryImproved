/**
 * server/audio.js — one place where voice recordings become playable audio.
 *
 * WHY THIS EXISTS
 *
 * MediaRecorder gives you whatever the RECORDING device supports. On Chrome
 * (Android and desktop) that is WebM/Opus. iOS Safari cannot play WebM at all
 * — not in an <audio> tag, not by direct link, not ever.
 *
 * That was fine until the listener stopped being the recorder. A grandmother
 * records on her Android phone; her daughter scans the QR code in the printed
 * book on an iPhone and gets silence. Roughly half of UK phones are iPhones,
 * so roughly half of every printed book was mute.
 *
 * So: whatever comes in, an MP3 goes to storage. MP3 plays on everything —
 * every iPhone, every Android, every ten-year-old iPad someone's mum still
 * uses. It is not the most efficient codec and that does not matter here.
 *
 * Side benefit: MediaRecorder WebM files usually carry no duration metadata,
 * which is why <audio> sometimes reported Infinity. Re-encoded MP3s have it.
 *
 * Requires: npm i @ffmpeg-installer/ffmpeg
 * (ships static binaries, so Render needs no build-image change)
 */

const { spawn } = require('child_process')
const { writeFile, readFile, unlink } = require('fs/promises')
const { tmpdir } = require('os')
const { join } = require('path')
const crypto = require('crypto')

const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path

const BUCKET = 'voice-recordings'

/** 64kbps mono is ample for speech and keeps books-worth of audio small. */
const BITRATE = '64k'

function extensionFor(mimeType = '') {
  if (mimeType.includes('webm')) return 'webm'
  if (mimeType.includes('ogg')) return 'ogg'
  if (mimeType.includes('mpeg') || mimeType.includes('mp3')) return 'mp3'
  return 'mp4'
}

/**
 * Transcode any audio buffer to MP3.
 *
 * Deliberately via temp files rather than stdin/stdout pipes. MediaRecorder
 * WebM has no cues and no duration in the header, and ffmpeg needs to seek to
 * decode it reliably — piping it in fails intermittently, which is the worst
 * kind of failure to debug.
 */
async function toMp3(inputBuffer, sourceMimeType = '') {
  const stamp = crypto.randomBytes(8).toString('hex')
  const inPath = join(tmpdir(), `tmys-${stamp}.${extensionFor(sourceMimeType)}`)
  const outPath = join(tmpdir(), `tmys-${stamp}.mp3`)

  await writeFile(inPath, inputBuffer)

  try {
    await new Promise((resolve, reject) => {
      const ff = spawn(ffmpegPath, [
        '-hide_banner',
        '-loglevel', 'error',
        '-y',
        '-i', inPath,
        '-vn',              // drop any video track
        '-ac', '1',         // mono — it is one person talking
        '-ar', '44100',
        '-b:a', BITRATE,
        '-write_xing', '1', // duration header, so players show the length
        outPath,
      ])

      const stderr = []
      ff.stderr.on('data', (d) => stderr.push(d))
      ff.on('error', reject)
      ff.on('close', (code) => {
        if (code === 0) return resolve()
        reject(new Error(`ffmpeg exited ${code}: ${Buffer.concat(stderr).toString().slice(0, 500)}`))
      })
    })

    return await readFile(outPath)
  } finally {
    await unlink(inPath).catch(() => {})
    await unlink(outPath).catch(() => {})
  }
}

/**
 * Transcode and store a recording, returning the public MP3 URL.
 *
 * The original is kept alongside under `originals/`. It costs almost nothing
 * and means a future re-encode never needs the customer to record again.
 *
 * If ffmpeg fails for any reason the original is stored and returned, so a
 * transcode problem degrades to "works on Android" rather than losing
 * somebody's grandmother's voice. That is the right way round.
 */
async function storeRecording({ supabaseAdmin, buffer, mimeType, projectId, sectionId }) {
  const stamp = Date.now()
  const base = `${projectId}/${sectionId}-${stamp}`

  // Keep the original first — before anything that can fail.
  const originalPath = `originals/${base}.${extensionFor(mimeType)}`
  await supabaseAdmin.storage
    .from(BUCKET)
    .upload(originalPath, buffer, { contentType: mimeType || 'application/octet-stream', upsert: true })
    .catch((err) => console.error('Original archive failed (continuing):', err.message))

  let mp3
  try {
    mp3 = await toMp3(buffer, mimeType)
  } catch (err) {
    console.error('Transcode failed, storing the original instead:', err.message)
    const fallbackPath = `${base}.${extensionFor(mimeType)}`
    const { error } = await supabaseAdmin.storage
      .from(BUCKET)
      .upload(fallbackPath, buffer, { contentType: mimeType || 'application/octet-stream', upsert: true })
    if (error) throw new Error(`Upload failed: ${error.message}`)
    const { data } = supabaseAdmin.storage.from(BUCKET).getPublicUrl(fallbackPath)
    return { publicUrl: data.publicUrl, transcoded: false }
  }

  const mp3Path = `${base}.mp3`
  const { error } = await supabaseAdmin.storage
    .from(BUCKET)
    .upload(mp3Path, mp3, { contentType: 'audio/mpeg', upsert: true })
  if (error) throw new Error(`Upload failed: ${error.message}`)

  const { data } = supabaseAdmin.storage.from(BUCKET).getPublicUrl(mp3Path)
  return { publicUrl: data.publicUrl, transcoded: true }
}

module.exports = { toMp3, storeRecording, extensionFor, BUCKET }
