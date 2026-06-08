import { ref } from 'vue'

// ─── Types ────────────────────────────────────────────────────────────────────

export type TributeTransition  = 'fade' | 'slow-fade' | 'cut'
export type TributeSlideDuration = 3 | 5 | 8

export interface TributeMediaItem {
  type: 'photo' | 'video'
  src?: string        // base64 data URL for photos
  file?: File         // File object for videos
  previewUrl?: string // object URL for video preview thumbnail
}

export interface TributeOptions {
  media: TributeMediaItem[]    // ordered list of photos + videos
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
  'silent':          { label: 'No Music',         description: 'Silence only',         emoji: '🔇' },
  'custom':          { label: 'Upload your own', description: 'Your chosen music',    emoji: '📁' },
}

// ─── Canvas dimensions ────────────────────────────────────────────────────────
// ─── Frame rates ──────────────────────────────────────────────────────────────
const SLIDE_FPS = 12   // photo/title/text slides — fast generation
const VIDEO_FPS = 25   // user video clips — keeps motion smooth

const W = 1920
const H = 1080

// ─── Colours ──────────────────────────────────────────────────────────────────
const CREAM  = '#F8F4EF'
const DARK   = '#1C1917'
const ACCENT = '#947449'
const MUTED  = '#8C847E'

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function loadImageFromUrl(url: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload  = () => resolve(img)
    img.onerror = () => resolve(null)
    img.src = url
  })
}

function drawCoverImage(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number, y: number, w: number, h: number,
  opacity = 1
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
  ctx.font = `bold 28px Georgia, serif`
  ctx.fillStyle = '#ffffff'
  ctx.textAlign = 'center'
  ctx.translate(W / 2, H / 2)
  ctx.rotate(-Math.PI / 12)
  ctx.fillText('PREVIEW — tellmeyourstory.uk', 0, 0)
  ctx.restore()
}

// ─── Slide renderers ──────────────────────────────────────────────────────────

async function drawTitleSlide(
  ctx: CanvasRenderingContext2D,
  options: TributeOptions,
  photoImg: HTMLImageElement | null
) {
  const cx = W / 2
  ctx.fillStyle = DARK
  ctx.fillRect(0, 0, W, H)
  if (photoImg) {
    ctx.save()
    drawCoverImage(ctx, photoImg, 0, 0, W, H, 0.35)
    ctx.restore()
  }
  const grad = ctx.createLinearGradient(0, 0, 0, H)
  grad.addColorStop(0, 'rgba(28,25,23,0.7)')
  grad.addColorStop(0.5, 'rgba(28,25,23,0.4)')
  grad.addColorStop(1, 'rgba(28,25,23,0.85)')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, W, H)
  ctx.textAlign = 'center'
  ctx.font = `bold 88px Georgia, serif`
  ctx.fillStyle = '#F5F0E8'
  ctx.fillText(options.name, cx, H * 0.44)
  if (options.birthYear || options.deathYear) {
    ctx.font = `300 28px Georgia, serif`
    ctx.fillStyle = '#C4B8AC'
    const dates = [options.birthYear, options.deathYear].filter(Boolean).join(' — ')
    ctx.fillText(dates, cx, H * 0.52)
  }
  drawOrnament(ctx, cx, H * 0.58)
  ctx.font = `italic 22px Georgia, serif`
  ctx.fillStyle = MUTED
  ctx.fillText('A life remembered with love', cx, H * 0.65)
  if (options.watermark) drawWatermark(ctx)
}

async function drawPhotoSlide(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  options: TributeOptions,
  slideIndex: number,
  totalItems: number
) {
  ctx.fillStyle = CREAM
  ctx.fillRect(0, 0, W, H)
  const photoW = W * 0.62
  const photoH = H * 0.72
  const photoX = (W - photoW) / 2
  const photoY = (H - photoH) / 2 - 20
  ctx.save()
  ctx.shadowColor = 'rgba(0,0,0,0.15)'
  ctx.shadowBlur = 40
  ctx.shadowOffsetY = 8
  ctx.fillStyle = '#fff'
  ctx.fillRect(photoX - 6, photoY - 6, photoW + 12, photoH + 12)
  ctx.restore()
  ctx.save()
ctx.beginPath()
ctx.rect(photoX, photoY, photoW, photoH)
ctx.clip()

// Contain fit — show whole image, letterbox if needed
const scale = Math.min(photoW / img.width, photoH / img.height)
const dw = img.width * scale
const dh = img.height * scale
const dx = photoX + (photoW - dw) / 2
const dy = photoY + (photoH - dh) / 2

// Fill letterbox areas with a subtle dark background
ctx.fillStyle = '#F0EBE4'
ctx.fillRect(photoX, photoY, photoW, photoH)
ctx.drawImage(img, dx, dy, dw, dh)
ctx.restore()
  ctx.strokeStyle = '#E8DDD0'
  ctx.lineWidth = 1.5
  ctx.strokeRect(photoX, photoY, photoW, photoH)
  ctx.font = `italic 18px Georgia, serif`
  ctx.fillStyle = MUTED
  ctx.textAlign = 'left'
  ctx.fillText(options.name, photoX + 12, photoY + photoH + 28)
  ctx.textAlign = 'right'
  ctx.font = `300 14px Georgia, serif`
  ctx.fillStyle = '#C4B8AC'
  ctx.fillText(`${slideIndex} / ${totalItems}`, photoX + photoW, photoY + photoH + 28)
  ctx.strokeStyle = '#E8DDD0'
  ctx.lineWidth = 0.5
  ctx.beginPath()
  ctx.moveTo(60, 36)
  ctx.lineTo(W - 60, 36)
  ctx.stroke()
  if (options.watermark) drawWatermark(ctx)
}

async function drawTributeTextSlide(
  ctx: CanvasRenderingContext2D,
  options: TributeOptions,
  photoImg: HTMLImageElement | null
) {
  const cx = W / 2
  ctx.fillStyle = DARK
  ctx.fillRect(0, 0, W, H)
  if (photoImg) {
    ctx.save()
    drawCoverImage(ctx, photoImg, 0, 0, W, H, 0.2)
    ctx.restore()
  }
  ctx.fillStyle = 'rgba(28,25,23,0.75)'
  ctx.fillRect(0, 0, W, H)
  drawOrnament(ctx, cx, H * 0.28)
  ctx.textAlign = 'center'
  ctx.font = `italic 34px Georgia, serif`
  ctx.fillStyle = '#E8DDD0'
  const maxW = 900
  const lines = wrapText(ctx, `"${options.tribute}"`, maxW)
  const lineH = 52
  const totalTextH = lines.length * lineH
  const startY = H / 2 - totalTextH / 2
  lines.forEach((line, i) => {
    ctx.fillText(line, cx, startY + i * lineH)
  })
  drawOrnament(ctx, cx, H * 0.72)
  ctx.font = `300 20px Georgia, serif`
  ctx.fillStyle = MUTED
  ctx.fillText(`— ${options.name}`, cx, H * 0.78)
  if (options.watermark) drawWatermark(ctx)
}

async function drawClosingSlide(
  ctx: CanvasRenderingContext2D,
  options: TributeOptions,
  photoImg: HTMLImageElement | null
) {
  const cx = W / 2
  ctx.fillStyle = DARK
  ctx.fillRect(0, 0, W, H)
  if (photoImg) {
    ctx.save()
    drawCoverImage(ctx, photoImg, 0, 0, W, H, 0.25)
    ctx.restore()
  }
  ctx.fillStyle = 'rgba(28,25,23,0.8)'
  ctx.fillRect(0, 0, W, H)
  ctx.textAlign = 'center'
  drawOrnament(ctx, cx, H * 0.36)
  ctx.font = `italic 52px Georgia, serif`
  ctx.fillStyle = '#F5F0E8'
  ctx.fillText(options.name, cx, H * 0.46)
  if (options.birthYear || options.deathYear) {
    const dates = [options.birthYear, options.deathYear].filter(Boolean).join(' — ')
    ctx.font = `300 22px Georgia, serif`
    ctx.fillStyle = '#C4B8AC'
    ctx.fillText(dates, cx, H * 0.54)
  }
  drawOrnament(ctx, cx, H * 0.61)
  ctx.font = `300 18px Georgia, serif`
  ctx.fillStyle = MUTED
  ctx.fillText('Forever in our hearts', cx, H * 0.68)
  ctx.font = `300 14px Georgia, serif`
  ctx.fillStyle = '#5C534E'
  ctx.fillText('Created with Tell Me Your Story · tellmeyourstory.uk', cx, H - 32)
  if (options.watermark) drawWatermark(ctx)
}

// ─── Video frame extractor ────────────────────────────────────────────────────
// Extracts frames from a video file as PNG ArrayBuffers for FFmpeg

async function extractVideoFrames(
  file: File,
  fps: number,
  progressCallback: (p: number) => void
): Promise<{ frames: ArrayBuffer[]; duration: number }> {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video')
    video.muted = true
    video.playsInline = true
    const url = URL.createObjectURL(file)
    video.src = url

    video.onloadedmetadata = async () => {
      const duration = Math.min(video.duration, 30) // cap at 30s
      const totalFrames = Math.ceil(duration * fps)
      const canvas = document.createElement('canvas')
      canvas.width = W
      canvas.height = H
      const ctx = canvas.getContext('2d')!
      const frames: ArrayBuffer[] = []

      for (let f = 0; f < totalFrames; f++) {
        const time = f / fps
        video.currentTime = time
        await new Promise<void>((r) => { video.onseeked = () => r() })
       
        // Contain fit for video — letterbox rather than crop
const scale = Math.min(W / video.videoWidth, H / video.videoHeight)

// Fill background before drawing video
ctx.fillStyle = DARK
ctx.fillRect(0, 0, W, H)
        const dw = video.videoWidth * scale
        const dh = video.videoHeight * scale
        ctx.drawImage(video, (W - dw) / 2, (H - dh) / 2, dw, dh)

        const blob: Blob = await new Promise((r) => canvas.toBlob((b) => r(b!), 'image/png'))
        frames.push(await blob.arrayBuffer())
        progressCallback(f / totalFrames)
      }

      URL.revokeObjectURL(url)
      resolve({ frames, duration })
    }

    video.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('Could not load video file'))
    }
  })
}

// ─── Main composable ──────────────────────────────────────────────────────────

export function useTributeVideo() {
  const isGenerating  = ref(false)
  const progress      = ref(0)
  const progressLabel = ref('')
  const error         = ref('')

  async function generateTribute(options: TributeOptions): Promise<void> {
    isGenerating.value  = true
    progress.value      = 0
    progressLabel.value = 'Setting up…'
    error.value         = ''

    try {
      const { FFmpeg } = await import('@ffmpeg/ffmpeg')
      const { fetchFile, toBlobURL } = await import('@ffmpeg/util')

      const ffmpeg = new FFmpeg()

      progressLabel.value = 'Loading video engine…'

      const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm'
      await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
      })

      ffmpeg.on('progress', ({ progress: p }) => {
        progress.value = Math.round(70 + p * 25)
        progressLabel.value = `Encoding tribute… ${progress.value}%`
      })

      // ── Set up canvas ─────────────────────────────────────────────────────
      const canvas = document.createElement('canvas')
      canvas.width = W
      canvas.height = H
      const ctx = canvas.getContext('2d')!

      // ── Build media list ──────────────────────────────────────────────────
      // Support both old (photos array) and new (media array) formats
      const mediaItems: TributeMediaItem[] = options.media?.length
        ? options.media
        : options.photos.map(src => ({ type: 'photo' as const, src }))

      const photoItems  = mediaItems.filter(m => m.type === 'photo')
      const firstPhotoSrc = photoItems[0]?.src || null

      // Pre-load all photo images
      progressLabel.value = 'Loading photos…'
      progress.value = 5

      const photoImageCache = new Map<string, HTMLImageElement | null>()
      for (const item of mediaItems) {
        if (item.type === 'photo' && item.src && !photoImageCache.has(item.src)) {
          photoImageCache.set(item.src, await loadImageFromUrl(item.src))
        }
      }

      const firstPhotoImg = firstPhotoSrc ? (photoImageCache.get(firstPhotoSrc) ?? null) : null

      // ── Build slide list ──────────────────────────────────────────────────
      type TributeSlide =
        | { type: 'title' }
        | { type: 'photo'; src: string }
        | { type: 'video'; file: File }
        | { type: 'tribute-text' }
        | { type: 'closing' }

      const slides: TributeSlide[] = []
      slides.push({ type: 'title' })

      const halfItems = Math.floor(mediaItems.length / 2)
      for (let i = 0; i < mediaItems.length; i++) {
        const item = mediaItems[i]
        if (item.type === 'photo' && item.src) {
          slides.push({ type: 'photo', src: item.src })
        } else if (item.type === 'video' && item.file) {
          slides.push({ type: 'video', file: item.file })
        }
        if (i === halfItems - 1 && options.tribute.trim()) {
          slides.push({ type: 'tribute-text' })
        }
      }
      slides.push({ type: 'closing' })

      // ── Render all slides ─────────────────────────────────────────────────
      progressLabel.value = 'Rendering slides…'

      const fps = SLIDE_FPS
      const frameDuration = options.slideDuration
      const transitionSecs = options.transition === 'cut' ? 0
        : options.transition === 'fade' ? 1
        : 2
      const transitionFrameCount = transitionSecs * fps

      // Each segment is either a buffer array (photo/title/text) or video frames
      type Segment = { frames: ArrayBuffer[]; isVideo: boolean }
      const segments: Segment[] = []

      let slideCount = 0
      for (const slide of slides) {
        slideCount++
        progress.value = 5 + Math.round((slideCount / slides.length) * 40)
        progressLabel.value = `Rendering slide ${slideCount} of ${slides.length}…`

        if (slide.type === 'video') {
          // Extract video frames
          progressLabel.value = `Extracting video clip ${slideCount}…`
          const { frames } = await extractVideoFrames(
            slide.file,
            VIDEO_FPS,
            (p) => {
              progress.value = 5 + Math.round((slideCount / slides.length) * 40) + Math.round(p * 5)
            }
          )
          segments.push({ frames, isVideo: true })
        } else {
          // Render canvas slide to single frame, then repeat for duration
          if (slide.type === 'title') {
            await drawTitleSlide(ctx, options, firstPhotoImg)
          } else if (slide.type === 'photo') {
            const img = photoImageCache.get(slide.src) ?? null
            if (img) {
              const photoIndex = photoItems.findIndex(p => p.src === slide.src)
              await drawPhotoSlide(ctx, img, options, photoIndex + 1, photoItems.length)
            }
          } else if (slide.type === 'tribute-text') {
            await drawTributeTextSlide(ctx, options, firstPhotoImg)
          } else if (slide.type === 'closing') {
            await drawClosingSlide(ctx, options, firstPhotoImg)
          }

          const blob: Blob = await new Promise((r) => canvas.toBlob((b) => r(b!), 'image/png'))
          const buf = await blob.arrayBuffer()
          // Repeat frame for slide duration
          const frameCount = frameDuration * fps
          const frames: ArrayBuffer[] = Array(frameCount).fill(buf)
          segments.push({ frames, isVideo: false })
        }
      }

      // ── Write all frames with transitions ─────────────────────────────────
      progressLabel.value = 'Writing frames…'
      progress.value = 52

      let frameIndex = 0

      async function writeFrame(buf: ArrayBuffer) {
        const copy = new Uint8Array(buf.byteLength)
        copy.set(new Uint8Array(buf))
        await ffmpeg.writeFile(`frame${String(frameIndex).padStart(5, '0')}.png`, copy)
        frameIndex++
      }

      for (let s = 0; s < segments.length; s++) {
        const seg = segments[s]
        const isFirst = s === 0
        const isLast  = s === segments.length - 1

        if (seg.isVideo) {
          // Write all video frames directly — no transitions for video clips
          for (const frame of seg.frames) {
            await writeFrame(frame)
          }
        } else {
          // Static slide — write frames with transition
          const leadIn  = isFirst ? 0 : Math.floor(transitionFrameCount / 2)
          const leadOut = isLast  ? 0 : Math.floor(transitionFrameCount / 2)
          const staticFrames = Math.max(1, seg.frames.length - leadIn - leadOut)
          const frameBuf = seg.frames[0]

          for (let f = 0; f < staticFrames; f++) {
            await writeFrame(frameBuf)
          }

          // Fade transition to next segment
          if (transitionFrameCount > 0 && !isLast) {
            const currBuf = seg.frames[0]
            const nextSeg = segments[s + 1]
            const nextBuf = nextSeg.frames[0]

            const currBlob = new Blob([currBuf], { type: 'image/png' })
            const nextBlob = new Blob([nextBuf], { type: 'image/png' })

            const currImg = new Image()
            currImg.src = URL.createObjectURL(currBlob)
            await new Promise(r => { currImg.onload = r })

            const nextImg = new Image()
            nextImg.src = URL.createObjectURL(nextBlob)
            await new Promise(r => { nextImg.onload = r })

            for (let t = 0; t < transitionFrameCount; t++) {
              const alpha = t / (transitionFrameCount - 1)
              ctx.clearRect(0, 0, W, H)
              ctx.globalAlpha = 1
              ctx.drawImage(currImg, 0, 0)
              ctx.globalAlpha = alpha
              ctx.drawImage(nextImg, 0, 0)
              ctx.globalAlpha = 1
              const blendBlob: Blob = await new Promise(r => canvas.toBlob(b => r(b!), 'image/png'))
              await writeFrame(await blendBlob.arrayBuffer())
            }

            URL.revokeObjectURL(currImg.src)
            URL.revokeObjectURL(nextImg.src)
          }
        }
      }

      // ── Assemble with FFmpeg ──────────────────────────────────────────────
      progress.value = 68
      progressLabel.value = 'Assembling tribute video…'

      // Calculate total duration
      let totalDuration = 0
      for (const seg of segments) {
        totalDuration += seg.frames.length / fps
      }

      // Load music
      progressLabel.value = 'Loading music…'
      let resolvedMusicFile: File | null = options.musicFile

      if (options.musicTrack !== 'custom' && options.musicTrack !== 'silent' && !options.musicFile) {
        try {
          const response = await fetch(`/audio/${options.musicTrack}.mp3`)
          if (response.ok) {
            const blob = await response.blob()
            resolvedMusicFile = new File([blob], `${options.musicTrack}.mp3`, { type: 'audio/mp3' })
          }
        } catch {
          console.warn('Music fetch failed — continuing without music')
        }
      }

      const hasMusicFile = resolvedMusicFile !== null && options.musicTrack !== 'silent'

      const ffmpegArgs: string[] = [
        '-framerate', String(fps),
        '-i', 'frame%05d.png',
      ]

      if (hasMusicFile && resolvedMusicFile) {
        const musicData = await fetchFile(resolvedMusicFile)
        await ffmpeg.writeFile('music.mp3', musicData)
        ffmpegArgs.push('-i', 'music.mp3')
        ffmpegArgs.push('-c:v', 'libx264')
        ffmpegArgs.push('-c:a', 'aac')
        ffmpegArgs.push('-filter_complex',
          `[1:a]aloop=loop=-1:size=2147483647,atrim=duration=${totalDuration}[aout]`)
        ffmpegArgs.push('-map', '0:v:0')
        ffmpegArgs.push('-map', '[aout]')
      } else {
        ffmpegArgs.push('-c:v', 'libx264')
      }

      ffmpegArgs.push(
        '-pix_fmt', 'yuv420p',
        '-vf', `scale=${W}:${H}`,
        '-r', '25',
        '-preset', 'ultrafast',
        'output.mp4'
      )

      await ffmpeg.exec(ffmpegArgs)

      // ── Download ──────────────────────────────────────────────────────────
      progress.value = 96
      progressLabel.value = 'Preparing your tribute…'

      const rawData = await ffmpeg.readFile('output.mp4')
      const uint8Data = rawData instanceof Uint8Array
        ? rawData
        : new Uint8Array(rawData as unknown as ArrayBuffer)
      const safeData = new Uint8Array(uint8Data.byteLength)
      safeData.set(uint8Data)
      const blob = new Blob([safeData], { type: 'video/mp4' })
      const url = URL.createObjectURL(blob)

      const filename = options.watermark
        ? `${options.name.replace(/\s+/g, '-')}-tribute-preview.mp4`
        : `${options.name.replace(/\s+/g, '-')}-tribute.mp4`

      const a = document.createElement('a')
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      setTimeout(() => URL.revokeObjectURL(url), 10000)

      // Cleanup
      for (let i = 0; i < frameIndex; i++) {
        await ffmpeg.deleteFile(`frame${String(i).padStart(5, '0')}.png`).catch(() => null)
      }
      await ffmpeg.deleteFile('output.mp4').catch(() => null)
      if (hasMusicFile) await ffmpeg.deleteFile('music.mp3').catch(() => null)

      progress.value = 100
      progressLabel.value = options.watermark
        ? 'Preview ready! Upgrade to remove watermark.'
        : 'Your tribute is downloading.'

      setTimeout(() => {
        progress.value = 0
        progressLabel.value = ''
      }, 5000)

    } catch (err) {
      console.error('Tribute generation error:', err)
      error.value = err instanceof Error ? err.message : 'Something went wrong. Please try again.'
    } finally {
      isGenerating.value = false
    }
  }

  return {
    isGenerating,
    progress,
    progressLabel,
    error,
    generateTribute,
    MUSIC_TRACKS,
  }
}