import { ref } from 'vue'

/*
 * ─── History ─────────────────────────────────────────────────────────────────
 *
 * Oct 2026 (1): the original wrote one full-size PNG per FRAME into ffmpeg's
 *   virtual filesystem — 125 identical 1920x1080 PNGs for a 5-second slide.
 *   Thirty photos came to ~4,900 files and ~3.7 GB, past the WebAssembly
 *   ceiling, so generation died at the assembly step after every slide had
 *   rendered. Each slide is now written once and ffmpeg holds it.
 *
 * Oct 2026 (2), after Mark's test pass:
 *   - progress could read -216004650%. ffmpeg.wasm reports nonsense progress
 *     for looped-image inputs; it is now clamped and only nudges within the
 *     band owned by the chunk being encoded.
 *   - video clips lost their sound. Clip audio is now mixed in at the right
 *     offset and the music ducks underneath it.
 *   - the cover photo was cropped to fill the title slide. Backdrops are now
 *     blurred, so nothing reads as cut off.
 *   - a corrupt image rendered as a white box and still charged the customer.
 *     Images are validated and skipped; if none survive, the render fails
 *     before payment.
 *
 * Measured while tuning (native ffmpeg 6.1.1, 8-slide chunk, 33s of video):
 *   one static 1080p image, encode only ......... 11.5s   <- the floor
 *   full xfade chain ............................ 19.6s
 *   holds encoded separately, xfade only on the
 *     transitions ............................... 18.7s   (1.05x — not worth it)
 *   720p instead of 1080p ....................... 8.4s    (1.37x)
 *   preset ultrafast ............................ 8.1s    (1.42x, 2.7x filesize)
 * So filter tricks are a dead end: x264 at 1080p is the floor. The only lever
 * that moves it materially is threading — see USE_MULTITHREAD below.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export type TributeTransition = 'fade' | 'slow-fade' | 'cut'
export type TributeSlideDuration = 3 | 5 | 8

export interface TributeMediaItem {
  type: 'photo' | 'video'
  src?: string
  file?: File
  previewUrl?: string
}

export interface TributeOptions {
  media: TributeMediaItem[]
  photos: string[]
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
  | 'gentle-piano' | 'warm-strings' | 'soft-acoustic'
  | 'peaceful-melody' | 'silent' | 'custom'

export const MUSIC_TRACKS: Record<TributeMusicTrack, { label: string; description: string; emoji: string }> = {
  'gentle-piano':    { label: 'Gentle Piano',    description: 'Soft and peaceful',    emoji: '🎹' },
  'warm-strings':    { label: 'Warm Strings',    description: 'Tender and warm',      emoji: '🎻' },
  'soft-acoustic':   { label: 'Soft Acoustic',   description: 'Simple and heartfelt', emoji: '🎸' },
  'peaceful-melody': { label: 'Peaceful Melody', description: 'Calm and reflective',  emoji: '🎵' },
  'silent':          { label: 'No Music',        description: 'Silence only',         emoji: '🔇' },
  'custom':          { label: 'Upload your own', description: 'Your chosen music',    emoji: '📁' },
}

// ─── Constants ────────────────────────────────────────────────────────────────

const W = 1920
const H = 1080
const FPS = 25

/** Shared with the builder UI so the cap is enforced in one place. */
export const MAX_PHOTOS = 30
export const MAX_VIDEOS = 5

/** Slides per encoded chunk. Keeps the xfade chain inside wasm's memory ceiling. */
const CHUNK_SIZE = 8

const MAX_CLIP_SECONDS = 30

/** How far the music drops while a video clip's own sound is playing. */
const MUSIC_DUCK = 0.22

const CREAM  = '#F8F4EF'
const DARK   = '#1C1917'
const ACCENT = '#947449'
const MUTED  = '#8C847E'

const PHOTO_MAX_W = Math.round(W * 0.62)
const PHOTO_MAX_H = Math.round(H * 0.80)

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** True only for an image that actually decoded to something with pixels. */
function isUsable(img: HTMLImageElement | null): img is HTMLImageElement {
  return !!img && img.naturalWidth > 0 && img.naturalHeight > 0
}

function loadImageFromUrl(url: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload  = () => resolve(isUsable(img) ? img : null)
    img.onerror = () => resolve(null)
    img.src = url
  })
}

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
    const timer = setTimeout(() => done(null), 15000)
    video.preload = 'metadata'
    video.muted = true
    video.onloadedmetadata = () => {
      clearTimeout(timer)
      const d = Number.isFinite(video.duration) ? video.duration : null
      done(d && d > 0 ? Math.min(d, MAX_CLIP_SECONDS) : null)
    }
    video.onerror = () => { clearTimeout(timer); done(null) }
    video.src = url
  })
}

/**
 * Background photo for the title, quote and closing slides.
 *
 * This used to be a plain cover fit, which crops to 16:9 — on a portrait photo
 * that lops off the top of someone's head, and it was obvious even at low
 * opacity. Blurring it means the crop can't be read as a crop: it becomes
 * colour and tone behind the text, which is all it was ever meant to be.
 */
function drawBlurredBackdrop(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  opacity: number,
) {
  // Slight overscan so the blur doesn't pull transparent edges inward.
  const over = 1.12
  const scale = Math.max(W / img.width, H / img.height) * over
  const dw = img.width * scale
  const dh = img.height * scale
  ctx.save()
  ctx.globalAlpha = opacity
  // Not every engine supports canvas filters; without it we simply get the
  // old un-blurred backdrop rather than a broken slide.
  try { ctx.filter = 'blur(36px)' } catch { /* no filter support */ }
  ctx.drawImage(img, (W - dw) / 2, (H - dh) / 2, dw, dh)
  ctx.restore()
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxW: number): string[] {
  const words = text.split(' ')
  const lines: string[] = []
  let current = ''
  for (const word of words) {
    const test = current ? `${current} ${word}` : word
    if (ctx.measureText(test).width > maxW && current) {
      lines.push(current); current = word
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
  if (isUsable(photoImg)) drawBlurredBackdrop(ctx, photoImg, 0.45)
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

/** The white mount takes the shape of the photo, so portraits aren't stranded in beige. */
function drawPhotoSlide(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  options: TributeOptions,
  slideIndex: number,
  totalItems: number,
) {
  ctx.fillStyle = CREAM
  ctx.fillRect(0, 0, W, H)

  const scale = Math.min(PHOTO_MAX_W / img.naturalWidth, PHOTO_MAX_H / img.naturalHeight)
  const dw = Math.round(img.naturalWidth * scale)
  const dh = Math.round(img.naturalHeight * scale)
  const dx = Math.round((W - dw) / 2)
  const dy = Math.round((H - dh) / 2 - 16)

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
  ctx.beginPath(); ctx.moveTo(60, 36); ctx.lineTo(W - 60, 36); ctx.stroke()

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
  if (isUsable(photoImg)) drawBlurredBackdrop(ctx, photoImg, 0.28)
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
  if (isUsable(photoImg)) drawBlurredBackdrop(ctx, photoImg, 0.32)
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

// ─── Timeline planning ────────────────────────────────────────────────────────

interface Segment {
  kind: 'image' | 'video'
  file: string
  duration: number
  /** Clip only: where its own audio sits in the finished video. Filled by planTimeline. */
  startsAt?: number
}

interface Plan {
  chunks: Segment[][]
  total: number
  clips: { file: string; start: number; duration: number }[]
}

/** The crossfade actually used between two segments, which xfade caps. */
function effectiveT(wanted: number, nextDuration: number, accSoFar: number): number {
  return Math.min(wanted, nextDuration / 2, accSoFar / 2)
}

/**
 * Splits segments into chunks and works out the real timeline.
 *
 * The timeline is SIMULATED rather than assumed, because xfade clamps the
 * crossfade when a segment is short — which happens at every chunk boundary,
 * where a slide is halved. Assuming a uniform transition length made the music
 * duration and the clip offsets drift on slow-fade.
 */
function planTimeline(segments: Segment[], transitionSecs: number, size: number): Plan {
  const chunks: Segment[][] = []
  let i = 0
  while (i < segments.length) {
    const end = Math.min(i + size, segments.length)
    const chunk = segments.slice(i, end).map((s) => ({ ...s }))
    const boundary = chunk[chunk.length - 1]
    if (end < segments.length && boundary.kind === 'image') boundary.duration /= 2
    if (i > 0) {
      const prev = segments[i - 1]
      if (prev.kind === 'image') chunk.unshift({ ...prev, duration: prev.duration / 2 })
    }
    chunks.push(chunk)
    i = end
    if (size >= segments.length) break
  }

  const clips: Plan['clips'] = []
  let globalStart = 0
  for (const chunk of chunks) {
    let acc = chunk[0].duration
    if (chunk[0].kind === 'video') {
      clips.push({ file: chunk[0].file, start: globalStart, duration: chunk[0].duration })
    }
    for (let k = 1; k < chunk.length; k++) {
      const t = transitionSecs > 0 ? effectiveT(transitionSecs, chunk[k].duration, acc) : 0
      const startWithin = acc - t
      if (chunk[k].kind === 'video') {
        clips.push({ file: chunk[k].file, start: globalStart + startWithin, duration: chunk[k].duration })
      }
      acc = acc + chunk[k].duration - t
    }
    globalStart += acc
  }

  return { chunks, total: globalStart, clips }
}

function chunkArgs(chunk: Segment[], transitionSecs: number, threads: number, outName: string): string[] {
  const args: string[] = []
  for (const s of chunk) {
    if (s.kind === 'image') args.push('-loop', '1', '-t', String(s.duration), '-i', s.file)
    else args.push('-t', String(s.duration), '-i', s.file)
  }

  const chains: string[] = []
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
      const t = effectiveT(transitionSecs, chunk[i].duration, acc)
      const offset = Math.max(0, Number((acc - t).toFixed(3)))
      chains.push(`[${cur}][v${i}]xfade=transition=fade:duration=${t}:offset=${offset}[x${i}]`)
      acc = acc + chunk[i].duration - t
      cur = `x${i}`
    }
    vout = cur
  } else if (chunk.length > 1) {
    chains.push(chunk.map((_, i) => `[v${i}]`).join('') + `concat=n=${chunk.length}:v=1:a=0[vcat]`)
    vout = 'vcat'
  } else {
    vout = 'v0'
  }

  args.push('-filter_complex', chains.join(';'), '-map', `[${vout}]`)
  if (threads > 1) args.push('-threads', String(threads))
  args.push(
    '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '20',
    '-pix_fmt', 'yuv420p', '-r', String(FPS), '-g', String(FPS), '-an', outName,
  )
  return args
}

// ─── Main composable ──────────────────────────────────────────────────────────

export function useTributeVideo() {
  const isGenerating  = ref(false)
  const progress      = ref(0)
  const progressLabel = ref('')
  const error         = ref('')

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

      /*
       * Multi-threaded core when the page is cross-origin isolated, which needs
       * COOP/COEP headers on this route (see vercel.json). x264 scales well
       * across cores, and threading is the only change that materially moves
       * render time — filter and preset tweaks were measured and don't.
       * Falls back silently to the single-threaded core everywhere else,
       * including Safari, which has no COEP: credentialless.
       */
      const isolated = typeof crossOriginIsolated !== 'undefined' && crossOriginIsolated === true
      const cores = typeof navigator !== 'undefined' ? (navigator.hardwareConcurrency || 2) : 2
      const threads = isolated ? Math.max(1, Math.min(8, cores - 1)) : 1

      progressLabel.value = 'Loading video engine…'
      const pkg = isolated ? '@ffmpeg/core-mt' : '@ffmpeg/core'
      const baseURL = `https://unpkg.com/${pkg}@0.12.6/dist/esm`
      const loadCfg: Record<string, string> = {
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
      }
      if (isolated) {
        loadCfg.workerURL = await toBlobURL(`${baseURL}/ffmpeg-core.worker.js`, 'text/javascript')
      }
      await ffmpeg.load(loadCfg)

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

      // ── Gather and validate media ───────────────────────────────────────────
      const mediaItems: TributeMediaItem[] = options.media?.length
        ? options.media
        : options.photos.map((src) => ({ type: 'photo' as const, src }))

      progressLabel.value = 'Loading photos…'
      progress.value = 4

      const imageCache = new Map<string, HTMLImageElement>()
      let skipped = 0
      for (const item of mediaItems) {
        if (item.type !== 'photo' || !item.src || imageCache.has(item.src)) continue
        const img = await loadImageFromUrl(item.src)
        if (isUsable(img)) imageCache.set(item.src, img)
        else skipped++
      }

      // A photo that won't decode used to render as a blank white card — and
      // because the render "succeeded", the customer was still charged for it.
      if (imageCache.size === 0) {
        throw new Error(
          skipped > 0
            ? "None of those photos could be read. Please remove them and upload different ones."
            : 'Add at least one photo before creating your tribute.',
        )
      }

      const usablePhotos = mediaItems.filter((m) => m.type === 'photo' && m.src && imageCache.has(m.src))
      const firstPhotoImg = usablePhotos[0]?.src ? imageCache.get(usablePhotos[0].src!) ?? null : null

      // ── Render each slide once ──────────────────────────────────────────────
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
        progress.value = 4 + Math.round((i / Math.max(1, mediaItems.length)) * 24)
        progressLabel.value = `Rendering slide ${i + 1} of ${mediaItems.length}…`

        if (item.type === 'photo' && item.src) {
          const img = imageCache.get(item.src)
          if (img) {
            photoNo++
            const n = photoNo
            await pushImage(() => drawPhotoSlide(ctx, img, options, n, usablePhotos.length), slideSecs)
          }
        } else if (item.type === 'video' && item.file) {
          const duration = await probeVideoDuration(item.file)
          if (duration && duration > 0.4) {
            const name = `c${String(fileNo++).padStart(3, '0')}.mp4`
            await write(name, await fetchFile(item.file))
            segments.push({ kind: 'video', file: name, duration })
          } else {
            skipped++
          }
        }

        if (i === halfway - 1 && options.tribute.trim()) {
          await pushImage(() => drawTributeTextSlide(ctx, options, firstPhotoImg), slideSecs)
        }
      }

      await pushImage(() => drawClosingSlide(ctx, options, firstPhotoImg), slideSecs)

      // ── Plan and encode ─────────────────────────────────────────────────────
      const transitionSecs = options.transition === 'cut' ? 0
        : options.transition === 'fade' ? 1 : 2

      const plan = planTimeline(segments, transitionSecs, CHUNK_SIZE)
      const chunkFiles: string[] = []

      /*
       * ffmpeg.wasm reports garbage progress for looped-image inputs — it has
       * no real duration to measure against, and Mark saw -216004650%. Chunk
       * completion is the trustworthy signal; ffmpeg's number only moves
       * within the band owned by the chunk currently encoding, and only when
       * it's a sane fraction.
       */
      const ENCODE_FROM = 30
      const ENCODE_TO   = 90
      ffmpeg.on('progress', ({ progress: p }: { progress: number }) => {
        const band = (ENCODE_TO - ENCODE_FROM) / plan.chunks.length
        const base = ENCODE_FROM + band * chunkFiles.length
        const frac = Number.isFinite(p) && p >= 0 && p <= 1 ? p : 0
        const next = Math.round(base + frac * band)
        progress.value = Math.max(progress.value, Math.min(ENCODE_TO, next))
      })

      for (let c = 0; c < plan.chunks.length; c++) {
        progressLabel.value = plan.chunks.length > 1
          ? `Encoding part ${c + 1} of ${plan.chunks.length}…`
          : 'Encoding your tribute…'
        progress.value = Math.max(progress.value, Math.round(ENCODE_FROM + ((ENCODE_TO - ENCODE_FROM) / plan.chunks.length) * c))
        const out = `part${c}.mp4`
        await ffmpeg.exec(chunkArgs(plan.chunks[c], transitionSecs, threads, out))
        written.push(out)
        chunkFiles.push(out)
      }

      // ── Join, mix the audio ─────────────────────────────────────────────────
      progress.value = 91
      progressLabel.value = 'Adding music…'

      let musicFile: File | null = options.musicFile
      if (options.musicTrack !== 'custom' && options.musicTrack !== 'silent' && !musicFile) {
        try {
          const res = await fetch(`/audio/${options.musicTrack}.mp3`)
          if (res.ok) musicFile = new File([await res.blob()], 'music.mp3', { type: 'audio/mp3' })
        } catch { /* music is optional — never fail the render over it */ }
      }
      const hasMusic = musicFile !== null && options.musicTrack !== 'silent'
      const total = plan.total

      await write('parts.txt', new TextEncoder().encode(
        chunkFiles.map((f) => `file '${f}'`).join('\n') + '\n',
      ))

      const args = ['-f', 'concat', '-safe', '0', '-i', 'parts.txt']
      const chains: string[] = []
      const mixInputs: string[] = []
      let inputNo = 1

      if (hasMusic && musicFile) {
        await write('music.mp3', await fetchFile(musicFile))
        args.push('-stream_loop', '-1', '-i', 'music.mp3')
        const musicIdx = inputNo++
        // Duck the music under each clip so the clip's own sound carries.
        const duckCond = plan.clips.length
          ? plan.clips.map((c) => `between(t,${c.start.toFixed(2)},${(c.start + c.duration).toFixed(2)})`).join('+')
          : ''
        const vol = duckCond ? `volume='if(${duckCond},${MUSIC_DUCK},1)':eval=frame,` : ''
        chains.push(
          `[${musicIdx}:a]atrim=duration=${total.toFixed(3)},${vol}` +
          `afade=t=out:st=${Math.max(0, total - 3).toFixed(3)}:d=3[mus]`,
        )
        mixInputs.push('[mus]')
      }

      // Each clip's own audio, placed where the clip sits in the finished video.
      plan.clips.forEach((clip, n) => {
        args.push('-i', clip.file)
        const idx = inputNo++
        const ms = Math.round(clip.start * 1000)
        chains.push(
          `[${idx}:a]atrim=duration=${clip.duration.toFixed(3)},` +
          `adelay=${ms}|${ms},apad=whole_dur=${total.toFixed(3)}[cl${n}]`,
        )
        mixInputs.push(`[cl${n}]`)
      })

      if (mixInputs.length === 1) {
        chains.push(`${mixInputs[0]}anull[aout]`)
      } else if (mixInputs.length > 1) {
        chains.push(`${mixInputs.join('')}amix=inputs=${mixInputs.length}:normalize=0:duration=first[aout]`)
      }

      if (mixInputs.length) {
        args.push('-filter_complex', chains.join(';'), '-map', '0:v', '-map', '[aout]',
                  '-c:a', 'aac', '-b:a', '160k')
      } else {
        args.push('-map', '0:v')
      }
      args.push('-c:v', 'copy', '-movflags', '+faststart', 'output.mp4')

      await ffmpeg.exec(args)
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
      progressLabel.value = skipped > 0
        ? `Your tribute is ready. ${skipped} file${skipped > 1 ? 's' : ''} couldn't be read and ${skipped > 1 ? 'were' : 'was'} left out.`
        : 'Your tribute is ready.'

      return { blob, filename }

    } catch (err) {
      console.error('Tribute generation error:', err)
      error.value = err instanceof Error
        ? err.message
        : 'Something went wrong making your tribute. Please try again.'
      return null

    } finally {
      if (ffmpeg) {
        for (const name of written) await ffmpeg.deleteFile(name).catch(() => null)
      }
      isGenerating.value = false
      setTimeout(() => {
        if (!isGenerating.value) { progress.value = 0; progressLabel.value = '' }
      }, 6000)
    }
  }

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
    MAX_PHOTOS,
    MAX_VIDEOS,
    MUSIC_TRACKS,
  }
}