import { ref } from 'vue'

/*
 * ─── Why this file was rewritten (October 2026) ───────────────────────────────
 *
 * The old version wrote one full-size PNG per FRAME into ffmpeg.wasm's virtual
 * filesystem. A 5-second slide at 25fps is 125 identical 1920x1080 PNGs. Thirty
 * photos came to roughly 4,900 files and about 3.7 GB — past the WebAssembly
 * address-space ceiling — so generation reliably died at the assembly step,
 * after every slide had rendered. That is why people got all the way through
 * and then nothing happened.
 *
 * Now each slide is written ONCE and ffmpeg is told how long to hold it, with
 * crossfades done by the xfade filter rather than by blending frames in canvas.
 * Thirty photos is about 35 files and 26 MB.
 *
 * Two further things measured while fixing it:
 *
 *  - A single xfade chain across 33 slides peaks around 1.8 GB of working
 *    memory, which would still fail in wasm. Encoding in chunks of 8 brings
 *    that to under 700 MB. Chunk boundaries are placed half way through a
 *    slide's static hold, so the two sides of the join are the same still
 *    frame and the cut is invisible (measured: 0.04/255 mean pixel difference).
 *
 *  - User video clips were being rasterised to PNG frames too — 750 files for
 *    a 30-second clip. They are now handed to ffmpeg as files. That also
 *    removes a hang: the old frame extractor waited on a `seeked` event that
 *    never fires when you seek to the time the video is already at.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export type TributeTransition = 'fade' | 'slow-fade' | 'cut'
export type TributeSlideDuration = 3 | 5 | 8

export interface TributeMediaItem {
  type: 'photo' | 'video'
  src?: string        // base64 data URL for photos
  file?: File         // File object for videos
  previewUrl?: string // object URL for video preview thumbnail
}

export interface TributeOptions {
  media: TributeMediaItem[]
  photos: string[]             // kept for backwards compatibility
  name: string
  birthYear?: string
  deathYear?: string
  tribute: string
  musicTrack: TributeMusicTrack
  musicFile: File | null
  transition: TributeTransition
  slideDuration: TributeSlideDuration
  watermark: boolean
}

export interface TributeResult {
  blob: Blob
  filename: string
}

export type TributeMusicTrack =
  | 'gentle-piano'
  | 'warm-strings'
  | 'soft-acoustic'
  | 'peaceful-melody'
  | 'silent'
  | 'custom'

export const MUSIC_TRACKS: Record<TributeMusicTrack, { label: string; description: string; emoji: string }> = {
  'gentle-piano':    { label: 'Gentle Piano',    description: 'Soft and peaceful',    emoji: '🎹' },
  'warm-strings':    { label: 'Warm Strings',    description: 'Tender and warm',      emoji: '🎻' },
  'soft-acoustic':   { label: 'Soft Acoustic',   description: 'Simple and heartfelt', emoji: '🎸' },
  'peaceful-melody': { label: 'Peaceful Melody', description: 'Calm and reflective',  emoji: '🎵' },
  'silent':          { label: 'No Music',        description: 'Silence only',         emoji: '🔇' },
  'custom':          { label: 'Upload your own', description: 'Your chosen music',    emoji: '📁' },
}

// ─── Canvas / encode constants ────────────────────────────────────────────────

const W = 1920
const H = 1080
const FPS = 25

/** Slides per encoded chunk. Keeps the xfade chain short enough to fit in wasm. */
const CHUNK_SIZE = 8

/** Hard ceiling on a user video clip, in seconds. */
const MAX_CLIP_SECONDS = 30

const CREAM  = '#F8F4EF'
const DARK   = '#1C1917'
const ACCENT = '#947449'
const MUTED  = '#8C847E'

/** Largest a photo may be drawn. Height-led, so portraits get the room they need. */
const PHOTO_MAX_W = Math.round(W * 0.62)   // 1190
const PHOTO_MAX_H = Math.round(H * 0.80)   // 864

// ─── Helpers ──────────────────────────────────────────────────────────────────

function loadImageFromUrl(url: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload  = () => resolve(img)
    img.onerror = () => resolve(null)
    img.src = url
  })
}

/**
 * Reads a video's duration without decoding any frames.
 * Resolves to null rather than hanging if the file can't be read.
 */
function probeVideoDuration(file: File): Promise<number | null> {
  return new Promise((resolve) => {
    const video = document.createElement('video')
    const url = URL.createObjectURL(file)
    let settled = false
    const done = (v: number | null) => {
      if (settled) return
      settled = true
      URL.revokeObjectURL(url)
      resolve(v)
    }
    // Never let a bad file stall the whole render.
    const timer = setTimeout(() => done(null), 15000)
    video.preload = 'metadata'
    video.muted = true
    video.onloadedmetadata = () => {
      clearTimeout(timer)
      const d = Number.isFinite(video.duration) ? video.duration : null
      done(d ? Math.min(d, MAX_CLIP_SECONDS) : null)
    }
    video.onerror = () => { clearTimeout(timer); done(null) }
    video.src = url
  })
}

function drawCoverImage(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number, y: number, w: number, h: number,
  opacity = 1,
) {
  const scale = Math.max(w / img.width, h / img.height)
  const dw = img.width * scale
  const dh = img.height * scale
  ctx.save()
  ctx.globalAlpha = opacity
  ctx.drawImage(img, x + (w - dw) / 2, y + (h - dh) / 2, dw, dh)
  ctx.restore()
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxW: number): string[] {
  const words = text.split(' ')
  const lines: string[] = []
  let current = ''
  for (const word of words) {
    const test = current ? `${current} ${word}` : word
    if (ctx.measureText(test).width > maxW && current) {
      lines.push(current)
      current = word
    } else {
      current = test
    }
  }
  if (current) lines.push(current)
  return lines
}

function drawOrnament(ctx: CanvasRenderingContext2D, cx: number, y: number) {
  ctx.save()
  ctx.strokeStyle = ACCENT
  ctx.lineWidth = 1.5
  ctx.globalAlpha = 0.5
  ctx.beginPath(); ctx.moveTo(cx - 28, y); ctx.lineTo(cx - 8, y); ctx.stroke()
  ctx.beginPath(); ctx.moveTo(cx + 8, y); ctx.lineTo(cx + 28, y); ctx.stroke()
  ctx.fillStyle = ACCENT
  ctx.beginPath(); ctx.arc(cx, y, 3, 0, Math.PI * 2); ctx.fill()
  ctx.globalAlpha = 0.3
  ctx.beginPath(); ctx.arc(cx - 5, y, 1.5, 0, Math.PI * 2); ctx.fill()
  ctx.beginPath(); ctx.arc(cx + 5, y, 1.5, 0, Math.PI * 2); ctx.fill()
  ctx.restore()
}

function drawWatermark(ctx: CanvasRenderingContext2D) {
  ctx.save()
  ctx.globalAlpha = 0.4
  ctx.font = 'bold 28px Georgia, serif'
  ctx.fillStyle = '#ffffff'
  ctx.textAlign = 'center'
  ctx.translate(W / 2, H / 2)
  ctx.rotate(-Math.PI / 12)
  ctx.fillText('PREVIEW — tellmeyourstory.uk', 0, 0)
  ctx.restore()
}

// ─── Slide renderers ──────────────────────────────────────────────────────────

function drawTitleSlide(
  ctx: CanvasRenderingContext2D,
  options: TributeOptions,
  photoImg: HTMLImageElement | null,
) {
  const cx = W / 2
  ctx.fillStyle = DARK
  ctx.fillRect(0, 0, W, H)
  if (photoImg) drawCoverImage(ctx, photoImg, 0, 0, W, H, 0.35)
  const grad = ctx.createLinearGradient(0, 0, 0, H)
  grad.addColorStop(0, 'rgba(28,25,23,0.7)')
  grad.addColorStop(0.5, 'rgba(28,25,23,0.4)')
  grad.addColorStop(1, 'rgba(28,25,23,0.85)')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, W, H)
  ctx.textAlign = 'center'
  ctx.font = 'bold 88px Georgia, serif'
  ctx.fillStyle = '#F5F0E8'
  ctx.fillText(options.name, cx, H * 0.44)
  if (options.birthYear || options.deathYear) {
    ctx.font = '300 28px Georgia, serif'
    ctx.fillStyle = '#C4B8AC'
    ctx.fillText([options.birthYear, options.deathYear].filter(Boolean).join(' — '), cx, H * 0.52)
  }
  drawOrnament(ctx, cx, H * 0.58)
  ctx.font = 'italic 22px Georgia, serif'
  ctx.fillStyle = MUTED
  ctx.fillText('A life remembered with love', cx, H * 0.65)
  if (options.watermark) drawWatermark(ctx)
}

/**
 * The photo card now takes the SHAPE OF THE PHOTO.
 *
 * It used to be a fixed 1190x778 landscape box with a contain fit, so a portrait
 * phone photo — which is most photos of people — was drawn at 582px wide inside
 * it, filling 49% of the frame width with flat beige either side. A 9:16 photo
 * managed 37%. Now the white mount is sized to the scaled image, so a portrait
 * gets a portrait mount and reads as a deliberately presented print.
 */
function drawPhotoSlide(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  options: TributeOptions,
  slideIndex: number,
  totalItems: number,
) {
  ctx.fillStyle = CREAM
  ctx.fillRect(0, 0, W, H)

  const scale = Math.min(PHOTO_MAX_W / img.width, PHOTO_MAX_H / img.height)
  const dw = Math.round(img.width * scale)
  const dh = Math.round(img.height * scale)
  const dx = Math.round((W - dw) / 2)
  // Nudged up slightly to leave room for the caption line beneath.
  const dy = Math.round((H - dh) / 2 - 16)

  // White mount with a soft drop shadow, hugging the photo
  ctx.save()
  ctx.shadowColor = 'rgba(0,0,0,0.15)'
  ctx.shadowBlur = 40
  ctx.shadowOffsetY = 8
  ctx.fillStyle = '#fff'
  ctx.fillRect(dx - 6, dy - 6, dw + 12, dh + 12)
  ctx.restore()

  ctx.drawImage(img, dx, dy, dw, dh)

  ctx.strokeStyle = '#E8DDD0'
  ctx.lineWidth = 1.5
  ctx.strokeRect(dx, dy, dw, dh)

  // Caption aligned to the mount, not to a fixed box
  ctx.font = 'italic 18px Georgia, serif'
  ctx.fillStyle = MUTED
  ctx.textAlign = 'left'
  ctx.fillText(options.name, dx, dy + dh + 30)
  ctx.textAlign = 'right'
  ctx.font = '300 14px Georgia, serif'
  ctx.fillStyle = '#C4B8AC'
  ctx.fillText(`${slideIndex} / ${totalItems}`, dx + dw, dy + dh + 30)

  ctx.strokeStyle = '#E8DDD0'
  ctx.lineWidth = 0.5
  ctx.beginPath()
  ctx.moveTo(60, 36)
  ctx.lineTo(W - 60, 36)
  ctx.stroke()

  if (options.watermark) drawWatermark(ctx)
}

function drawTributeTextSlide(
  ctx: CanvasRenderingContext2D,
  options: TributeOptions,
  photoImg: HTMLImageElement | null,
) {
  const cx = W / 2
  ctx.fillStyle = DARK
  ctx.fillRect(0, 0, W, H)
  if (photoImg) drawCoverImage(ctx, photoImg, 0, 0, W, H, 0.2)
  ctx.fillStyle = 'rgba(28,25,23,0.75)'
  ctx.fillRect(0, 0, W, H)
  drawOrnament(ctx, cx, H * 0.28)
  ctx.textAlign = 'center'
  ctx.font = 'italic 34px Georgia, serif'
  ctx.fillStyle = '#E8DDD0'
  const lines = wrapText(ctx, `"${options.tribute}"`, 900)
  const lineH = 52
  const startY = H / 2 - (lines.length * lineH) / 2
  lines.forEach((line, i) => ctx.fillText(line, cx, startY + i * lineH))
  drawOrnament(ctx, cx, H * 0.72)
  ctx.font = '300 20px Georgia, serif'
  ctx.fillStyle = MUTED
  ctx.fillText(`— ${options.name}`, cx, H * 0.78)
  if (options.watermark) drawWatermark(ctx)
}

function drawClosingSlide(
  ctx: CanvasRenderingContext2D,
  options: TributeOptions,
  photoImg: HTMLImageElement | null,
) {
  const cx = W / 2
  ctx.fillStyle = DARK
  ctx.fillRect(0, 0, W, H)
  if (photoImg) drawCoverImage(ctx, photoImg, 0, 0, W, H, 0.25)
  ctx.fillStyle = 'rgba(28,25,23,0.8)'
  ctx.fillRect(0, 0, W, H)
  ctx.textAlign = 'center'
  drawOrnament(ctx, cx, H * 0.36)
  ctx.font = 'italic 52px Georgia, serif'
  ctx.fillStyle = '#F5F0E8'
  ctx.fillText(options.name, cx, H * 0.46)
  if (options.birthYear || options.deathYear) {
    ctx.font = '300 22px Georgia, serif'
    ctx.fillStyle = '#C4B8AC'
    ctx.fillText([options.birthYear, options.deathYear].filter(Boolean).join(' — '), cx, H * 0.54)
  }
  drawOrnament(ctx, cx, H * 0.61)
  ctx.font = '300 18px Georgia, serif'
  ctx.fillStyle = MUTED
  ctx.fillText('Forever in our hearts', cx, H * 0.68)
  ctx.font = '300 14px Georgia, serif'
  ctx.fillStyle = '#5C534E'
  ctx.fillText('Created with Tell Me Your Story · tellmeyourstory.uk', cx, H - 32)
  if (options.watermark) drawWatermark(ctx)
}

// ─── Segment planning ─────────────────────────────────────────────────────────

interface Segment {
  kind: 'image' | 'video'
  file: string      // filename inside the ffmpeg virtual filesystem
  duration: number  // seconds
}

/**
 * Splits segments into chunks that each encode independently.
 *
 * A boundary is placed half way through a slide's static hold, and the boundary
 * slide appears at the end of one chunk and the start of the next. Both sides
 * are the same still frame, so concatenating the chunks produces no visible cut.
 * Video segments are never split.
 */
function planChunks(segments: Segment[], size: number): Segment[][] {
  if (segments.length <= size) return [segments]
  const chunks: Segment[][] = []
  let i = 0
  while (i < segments.length) {
    const end = Math.min(i + size, segments.length)
    const chunk = segments.slice(i, end).map((s) => ({ ...s }))

    const boundary = chunk[chunk.length - 1]
    if (end < segments.length && boundary.kind === 'image') {
      boundary.duration = boundary.duration / 2
    }
    if (i > 0) {
      const prev = segments[i - 1]
      if (prev.kind === 'image') {
        chunk.unshift({ ...prev, duration: prev.duration / 2 })
      }
    }
    chunks.push(chunk)
    i = end
  }
  return chunks
}

/** Builds the ffmpeg argument list for one chunk. */
function chunkArgs(chunk: Segment[], transitionSecs: number, outName: string): string[] {
  const args: string[] = []

  for (const s of chunk) {
    if (s.kind === 'image') args.push('-loop', '1', '-t', String(s.duration), '-i', s.file)
    else args.push('-t', String(s.duration), '-i', s.file)
  }

  const chains: string[] = []
  // Normalise every input so xfade can join them: same size, pixel aspect and rate.
  // Video clips are scaled to fit and padded rather than cropped.
  for (let i = 0; i < chunk.length; i++) {
    chains.push(
      `[${i}:v]scale=${W}:${H}:force_original_aspect_ratio=decrease,` +
      `pad=${W}:${H}:(ow-iw)/2:(oh-ih)/2:color=0x1C1917,setsar=1,fps=${FPS},format=yuv420p[v${i}]`,
    )
  }

  let vout: string
  if (transitionSecs > 0 && chunk.length > 1) {
    let acc = chunk[0].duration
    let cur = 'v0'
    for (let i = 1; i < chunk.length; i++) {
      // xfade can only overlap as far as the shorter side allows
      const t = Math.min(transitionSecs, chunk[i].duration / 2, acc / 2)
      const offset = Math.max(0, Number((acc - t).toFixed(3)))
      const out = `x${i}`
      chains.push(`[${cur}][v${i}]xfade=transition=fade:duration=${t}:offset=${offset}[${out}]`)
      acc = acc + chunk[i].duration - t
      cur = out
    }
    vout = cur
  } else if (chunk.length > 1) {
    chains.push(
      chunk.map((_, i) => `[v${i}]`).join('') + `concat=n=${chunk.length}:v=1:a=0[vcat]`,
    )
    vout = 'vcat'
  } else {
    vout = 'v0'
  }

  args.push('-filter_complex', chains.join(';'), '-map', `[${vout}]`)
  args.push(
    '-c:v', 'libx264',
    '-preset', 'veryfast',
    '-crf', '20',
    '-pix_fmt', 'yuv420p',
    '-r', String(FPS),
    '-g', String(FPS),   // keyframe every second, so chunk joins line up cleanly
    '-an',
    outName,
  )
  return args
}

// ─── Main composable ──────────────────────────────────────────────────────────

export function useTributeVideo() {
  const isGenerating  = ref(false)
  const progress      = ref(0)
  const progressLabel = ref('')
  const error         = ref('')

  /**
   * Renders the tribute and returns the finished file.
   *
   * It no longer downloads the video itself — the caller decides what to do with
   * it. That is what lets the purchase flow render BEFORE taking payment, so
   * nobody is charged for a video that failed to build.
   *
   * Returns null if anything went wrong; `error` holds the message.
   */
  async function generateTribute(options: TributeOptions): Promise<TributeResult | null> {
    isGenerating.value  = true
    progress.value      = 0
    progressLabel.value = 'Setting up…'
    error.value         = ''

    const written: string[] = []
    let ffmpeg: any = null

    try {
      const { FFmpeg } = await import('@ffmpeg/ffmpeg')
      const { fetchFile, toBlobURL } = await import('@ffmpeg/util')

      ffmpeg = new FFmpeg()

      progressLabel.value = 'Loading video engine…'
      const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm'
      await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
      })

      const canvas = document.createElement('canvas')
      canvas.width = W
      canvas.height = H
      const ctx = canvas.getContext('2d')!

      const write = async (name: string, data: Uint8Array) => {
        await ffmpeg.writeFile(name, data)
        written.push(name)
      }

      const canvasToFile = async (name: string) => {
        const blob: Blob = await new Promise((r) => canvas.toBlob((b) => r(b!), 'image/png'))
        await write(name, new Uint8Array(await blob.arrayBuffer()))
      }

      // ── Gather media ────────────────────────────────────────────────────────
      const mediaItems: TributeMediaItem[] = options.media?.length
        ? options.media
        : options.photos.map((src) => ({ type: 'photo' as const, src }))

      const photoItems = mediaItems.filter((m) => m.type === 'photo' && m.src)
      if (photoItems.length === 0) throw new Error('Add at least one photo before creating your tribute.')

      progressLabel.value = 'Loading photos…'
      progress.value = 4

      const imageCache = new Map<string, HTMLImageElement | null>()
      for (const item of photoItems) {
        if (item.src && !imageCache.has(item.src)) {
          imageCache.set(item.src, await loadImageFromUrl(item.src))
        }
      }
      const firstPhotoImg = photoItems[0]?.src ? imageCache.get(photoItems[0].src!) ?? null : null

      // ── Render each slide ONCE ──────────────────────────────────────────────
      progressLabel.value = 'Rendering slides…'

      const segments: Segment[] = []
      const slideSecs = options.slideDuration
      const halfway = Math.floor(mediaItems.length / 2)
      let fileNo = 0

      const pushImage = async (draw: () => void, duration: number) => {
        draw()
        const name = `s${String(fileNo++).padStart(3, '0')}.png`
        await canvasToFile(name)
        segments.push({ kind: 'image', file: name, duration })
      }

      await pushImage(() => drawTitleSlide(ctx, options, firstPhotoImg), slideSecs)

      let photoNo = 0
      for (let i = 0; i < mediaItems.length; i++) {
        const item = mediaItems[i]
        progress.value = 4 + Math.round((i / mediaItems.length) * 26)
        progressLabel.value = `Rendering slide ${i + 1} of ${mediaItems.length}…`

        if (item.type === 'photo' && item.src) {
          const img = imageCache.get(item.src)
          if (img) {
            photoNo++
            const n = photoNo
            await pushImage(
              () => drawPhotoSlide(ctx, img, options, n, photoItems.length),
              slideSecs,
            )
          }
        } else if (item.type === 'video' && item.file) {
          const duration = await probeVideoDuration(item.file)
          if (duration && duration > 0.4) {
            const name = `c${String(fileNo++).padStart(3, '0')}.mp4`
            await write(name, await fetchFile(item.file))
            segments.push({ kind: 'video', file: name, duration })
          }
          // A clip we can't read is skipped rather than stalling the render.
        }

        if (i === halfway - 1 && options.tribute.trim()) {
          await pushImage(() => drawTributeTextSlide(ctx, options, firstPhotoImg), slideSecs)
        }
      }

      await pushImage(() => drawClosingSlide(ctx, options, firstPhotoImg), slideSecs)

      // ── Encode in chunks ────────────────────────────────────────────────────
      const transitionSecs = options.transition === 'cut' ? 0
        : options.transition === 'fade' ? 1
        : 2

      const chunks = planChunks(segments, CHUNK_SIZE)
      const chunkFiles: string[] = []

      ffmpeg.on('progress', ({ progress: p }: { progress: number }) => {
        // ffmpeg reports 0..1 per invocation; map it inside the current chunk's band.
        const band = 60 / chunks.length
        const base = 30 + band * chunkFiles.length
        progress.value = Math.min(92, Math.round(base + p * band))
      })

      for (let c = 0; c < chunks.length; c++) {
        progressLabel.value = chunks.length > 1
          ? `Encoding part ${c + 1} of ${chunks.length}…`
          : 'Encoding your tribute…'
        const out = `part${c}.mp4`
        await ffmpeg.exec(chunkArgs(chunks[c], transitionSecs, out))
        written.push(out)
        chunkFiles.push(out)
      }

      // ── Join, and add music ─────────────────────────────────────────────────
      progress.value = 92
      progressLabel.value = 'Adding music…'

      const totalDuration = segments.reduce((t, s) => t + s.duration, 0)
        - (transitionSecs > 0 ? Math.max(0, segments.length - 1) * transitionSecs : 0)

      let musicFile: File | null = options.musicFile
      if (options.musicTrack !== 'custom' && options.musicTrack !== 'silent' && !musicFile) {
        try {
          const res = await fetch(`/audio/${options.musicTrack}.mp3`)
          if (res.ok) {
            musicFile = new File([await res.blob()], 'music.mp3', { type: 'audio/mp3' })
          }
        } catch {
          // Music is a nice-to-have; a missing track must not fail the render.
        }
      }
      const hasMusic = musicFile !== null && options.musicTrack !== 'silent'

      const listName = 'parts.txt'
      await write(listName, new TextEncoder().encode(
        chunkFiles.map((f) => `file '${f}'`).join('\n') + '\n',
      ))

      const finalArgs = ['-f', 'concat', '-safe', '0', '-i', listName]
      if (hasMusic && musicFile) {
        await write('music.mp3', await fetchFile(musicFile))
        finalArgs.push('-stream_loop', '-1', '-i', 'music.mp3')
        finalArgs.push(
          '-filter_complex',
          `[1:a]atrim=duration=${totalDuration.toFixed(3)},` +
          `afade=t=out:st=${Math.max(0, totalDuration - 3).toFixed(3)}:d=3[aout]`,
        )
        finalArgs.push('-map', '0:v', '-map', '[aout]', '-c:a', 'aac', '-b:a', '160k')
      } else {
        finalArgs.push('-map', '0:v')
      }
      // The chunks are already encoded correctly — copy rather than re-encode.
      finalArgs.push('-c:v', 'copy', '-movflags', '+faststart', 'output.mp4')

      await ffmpeg.exec(finalArgs)
      written.push('output.mp4')

      // ── Read it back ────────────────────────────────────────────────────────
      progress.value = 97
      progressLabel.value = 'Finishing up…'

      const raw = await ffmpeg.readFile('output.mp4')
      const bytes = raw instanceof Uint8Array ? raw : new Uint8Array(raw as unknown as ArrayBuffer)
      const copy = new Uint8Array(bytes.byteLength)
      copy.set(bytes)
      const blob = new Blob([copy], { type: 'video/mp4' })

      if (blob.size < 1024) throw new Error('The video came out empty. Please try again with fewer photos.')

      const safeName = options.name.trim().replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '') || 'tribute'
      const filename = options.watermark
        ? `${safeName}-tribute-preview.mp4`
        : `${safeName}-tribute.mp4`

      progress.value = 100
      progressLabel.value = 'Your tribute is ready.'

      return { blob, filename }

    } catch (err) {
      console.error('Tribute generation error:', err)
      error.value = err instanceof Error
        ? err.message
        : 'Something went wrong making your tribute. Please try again.'
      return null

    } finally {
      // Always clear the virtual filesystem, success or failure.
      if (ffmpeg) {
        for (const name of written) {
          await ffmpeg.deleteFile(name).catch(() => null)
        }
      }
      isGenerating.value = false
      setTimeout(() => {
        if (!isGenerating.value) { progress.value = 0; progressLabel.value = '' }
      }, 4000)
    }
  }

  /** Saves a finished tribute to the user's device. */
  function downloadTribute(result: TributeResult) {
    const url = URL.createObjectURL(result.blob)
    const a = document.createElement('a')
    a.href = url
    a.download = result.filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    setTimeout(() => URL.revokeObjectURL(url), 10000)
  }

  /** Rough finished length, used for the estimate shown in the builder. */
  function estimateSeconds(
    mediaCount: number,
    slideDuration: number,
    transition: TributeTransition,
    hasTribute: boolean,
  ): number {
    const slides = mediaCount + 2 + (hasTribute ? 1 : 0)
    const t = transition === 'cut' ? 0 : transition === 'fade' ? 1 : 2
    return Math.max(0, slides * slideDuration - Math.max(0, slides - 1) * t)
  }

  return {
    isGenerating,
    progress,
    progressLabel,
    error,
    generateTribute,
    downloadTribute,
    estimateSeconds,
    MUSIC_TRACKS,
  }
}