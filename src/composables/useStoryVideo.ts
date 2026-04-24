import { ref } from 'vue'
import type { StorySection, StoryProject, PdfTheme } from '../types/story'
import type { StoryImage } from '../types/story'
import { getChapterIntro } from '../utils/pdfDesign'

export type VideoTheme = PdfTheme
export type VideoSlideDuration = 3 | 5 | 8

export type VideoOptions = {
  theme: VideoTheme
  slideDuration: VideoSlideDuration
  musicFile: File | null
  musicTrack?: 'gentle-piano' | 'warm-strings' | 'soft-acoustic' | null
}

export type VideoSlide =
  | { type: 'title'; title: string; subtitle: string; coverImageUrl?: string }
  | { type: 'chapter'; chapter: string; intro: string; chapterIndex: number }
  | { type: 'answer'; question: string; answer: string; imageUrl?: string; chapter: string }
  | { type: 'closing' }

// Canvas dimensions — 1080p landscape
const W = 1920
const H = 1080

// Theme colour palettes matching pdfDesign.ts
const THEMES = {
  warm: {
    pageBg: '#F8F4EF',
    textPrimary: '#262220',
    textSecondary: '#5C544E',
    textMuted: '#8C847E',
    accent: '#947449',
    divider: '#E0D7CB',
  },
  neutral: {
    pageBg: '#FFFFFF',
    textPrimary: '#232323',
    textSecondary: '#5A5A5A',
    textMuted: '#8C8C8C',
    accent: '#787878',
    divider: '#E8E8E8',
  },
  'dark-ink': {
    pageBg: '#F4F3F0',
    textPrimary: '#1C1C1E',
    textSecondary: '#4C4C52',
    textMuted: '#808084',
    accent: '#585860',
    divider: '#DCDCE0',
  },
} as const

function buildSlides(
  project: StoryProject,
  sections: StorySection[],
  images: StoryImage[]
): VideoSlide[] {
  const slides: VideoSlide[] = []
  const imageMap = new Map(images.map((img) => [img.section_id, img.image_url]))

  // Title slide
  slides.push({
    type: 'title',
    title: project.title,
    subtitle: 'A life told through memories, moments, and love',
    coverImageUrl: project.cover_image_url ?? undefined,
  })

  let currentChapter = ''
  let chapterIndex = 0

  // Pre-compute which chapters have at least one answered question
const answeredChapters = new Set(
  sections
    .filter((s) => s.answer?.trim() && s.chapter)
    .map((s) => s.chapter as string)
)

for (const section of sections) {
  // Only add chapter slide if this chapter has answered questions
  if (
    section.chapter &&
    section.chapter !== currentChapter &&
    answeredChapters.has(section.chapter)
  ) {
    currentChapter = section.chapter
    chapterIndex++
    slides.push({
      type: 'chapter',
      chapter: currentChapter,
      intro: getChapterIntro(currentChapter),
      chapterIndex,
    })
  }

  // Only include answered questions
  if (section.answer?.trim()) {
    slides.push({
      type: 'answer',
      question: section.question,
      answer: section.answer.trim(),
      imageUrl: imageMap.get(section.id) ?? undefined,
      chapter: section.chapter ?? '',
    })
  }
}

  // Closing slide
  slides.push({ type: 'closing' })

  return slides
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  _lineHeight?: number
): string[] {
  const words = text.split(' ')
  const lines: string[] = []
  let current = ''

  for (const word of words) {
    const test = current ? `${current} ${word}` : word
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current)
      current = word
    } else {
      current = test
    }
  }

  if (current) lines.push(current)
  return lines
}

function drawOrnament(ctx: CanvasRenderingContext2D, cx: number, y: number, color: string) {
  ctx.save()
  ctx.strokeStyle = color
  ctx.lineWidth = 1.5
  ctx.globalAlpha = 0.6

  const lineLen = 80
  ctx.beginPath()
  ctx.moveTo(cx - lineLen - 14, y)
  ctx.lineTo(cx - 14, y)
  ctx.stroke()

  ctx.beginPath()
  ctx.moveTo(cx + 14, y)
  ctx.lineTo(cx + lineLen + 14, y)
  ctx.stroke()

  // Small circles
  ctx.fillStyle = color
  ctx.globalAlpha = 0.5
  ctx.beginPath()
  ctx.arc(cx - 8, y, 2.5, 0, Math.PI * 2)
  ctx.fill()
  ctx.beginPath()
  ctx.arc(cx, y, 4, 0, Math.PI * 2)
  ctx.fill()
  ctx.beginPath()
  ctx.arc(cx + 8, y, 2.5, 0, Math.PI * 2)
  ctx.fill()

  ctx.restore()
}

async function loadImage(url: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = () => resolve(null)
    img.src = url
  })
}

async function drawSlide(
  ctx: CanvasRenderingContext2D,
  slide: VideoSlide,
  theme: VideoTheme
): Promise<void> {
  const colors = THEMES[theme]
  const cx = W / 2
  const pad = 120

  // Background
  ctx.fillStyle = colors.pageBg
  ctx.fillRect(0, 0, W, H)

  if (slide.type === 'title') {
    // Cover image if available
    if (slide.coverImageUrl) {
      const img = await loadImage(slide.coverImageUrl)
      if (img) {
        // Left half image
        ctx.save()
        ctx.beginPath()
        ctx.rect(0, 0, W / 2, H)
        ctx.clip()
        const scale = Math.max((W / 2) / img.width, H / img.height)
        const iw = img.width * scale
        const ih = img.height * scale
        ctx.drawImage(img, (W / 2 - iw) / 2, (H - ih) / 2, iw, ih)

        // Gradient overlay on image side
        const grad = ctx.createLinearGradient(W / 2, 0, 0, 0)
        grad.addColorStop(0, colors.pageBg)
        grad.addColorStop(0.3, `${colors.pageBg}00`)
        ctx.fillStyle = grad
        ctx.fillRect(0, 0, W / 2, H)
        ctx.restore()

        // Text on right half
        const tx = W * 0.55
        const tw = W * 0.38

        ctx.font = `300 22px Georgia, serif`
        ctx.fillStyle = colors.textMuted
        ctx.textAlign = 'left'
        ctx.fillText('Tell Me Your Story', tx, H * 0.35)

        drawOrnament(ctx, tx + tw / 2, H * 0.4, colors.accent)

        ctx.font = `bold 72px Georgia, serif`
        ctx.fillStyle = colors.textPrimary
        const titleLines = wrapText(ctx, slide.title, tw, 90)
        titleLines.forEach((line, i) => {
          ctx.fillText(line, tx, H * 0.48 + i * 90)
        })

        const afterTitle = H * 0.48 + titleLines.length * 90 + 20
        drawOrnament(ctx, tx + tw / 2, afterTitle, colors.accent)

        ctx.font = `italic 28px Georgia, serif`
        ctx.fillStyle = colors.textSecondary
        const subLines = wrapText(ctx, slide.subtitle, tw, 40)
        subLines.forEach((line, i) => {
          ctx.fillText(line, tx, afterTitle + 40 + i * 44)
        })
      }
    } else {
      // No cover image — centred layout
      ctx.textAlign = 'center'

      ctx.font = `300 22px Georgia, serif`
      ctx.fillStyle = colors.textMuted
      ctx.fillText('Tell Me Your Story', cx, H * 0.32)

      drawOrnament(ctx, cx, H * 0.37, colors.accent)

      ctx.font = `bold 80px Georgia, serif`
      ctx.fillStyle = colors.textPrimary
      const titleLines = wrapText(ctx, slide.title, W - pad * 2, 100)
      titleLines.forEach((line, i) => {
        ctx.fillText(line, cx, H * 0.46 + i * 100)
      })

      const afterTitle = H * 0.46 + titleLines.length * 100 + 24
      drawOrnament(ctx, cx, afterTitle, colors.accent)

      ctx.font = `italic 30px Georgia, serif`
      ctx.fillStyle = colors.textSecondary
      ctx.fillText(slide.subtitle, cx, afterTitle + 50)
    }
  }

  if (slide.type === 'chapter') {
    ctx.textAlign = 'center'

    // Subtle top rule
    ctx.strokeStyle = colors.divider
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(pad, 60)
    ctx.lineTo(W - pad, 60)
    ctx.stroke()

    ctx.font = `300 20px Georgia, serif`
    ctx.fillStyle = colors.textMuted
    ctx.letterSpacing = '4px'
    ctx.fillText(`CHAPTER ${slide.chapterIndex}`, cx, H * 0.36)
    ctx.letterSpacing = '0px'

    drawOrnament(ctx, cx, H * 0.42, colors.accent)

    ctx.font = `bold 88px Georgia, serif`
    ctx.fillStyle = colors.textPrimary
    ctx.fillText(slide.chapter, cx, H * 0.55)

    drawOrnament(ctx, cx, H * 0.61, colors.accent)

    ctx.font = `italic 30px Georgia, serif`
    ctx.fillStyle = colors.textSecondary
    const introLines = wrapText(ctx, slide.intro, 900, 44)
    introLines.forEach((line, i) => {
      ctx.fillText(line, cx, H * 0.68 + i * 44)
    })

    // Bottom rule
    ctx.beginPath()
    ctx.moveTo(pad, H - 60)
    ctx.lineTo(W - pad, H - 60)
    ctx.stroke()
  }

  if (slide.type === 'answer') {
    const hasImage = !!slide.imageUrl
    const textX = hasImage ? pad : pad
    const textW = hasImage ? W * 0.52 - pad : W - pad * 2

    // Chapter label top left
    ctx.font = `300 18px Georgia, serif`
    ctx.fillStyle = colors.textMuted
    ctx.textAlign = 'left'
    ctx.fillText(slide.chapter.toUpperCase(), pad, 64)

    // Top divider
    ctx.strokeStyle = colors.divider
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(pad, 80)
    ctx.lineTo(W - pad, 80)
    ctx.stroke()

    // Question
    ctx.font = `italic 32px Georgia, serif`
    ctx.fillStyle = colors.textSecondary
    ctx.textAlign = 'left'
    const qLines = wrapText(ctx, slide.question, textW, 44)
    qLines.forEach((line, i) => {
      ctx.fillText(line, textX, 160 + i * 44)
    })

    const answerY = 160 + qLines.length * 44 + 40

    // Drop cap
    const firstLetter = slide.answer.charAt(0)
    const restAnswer = slide.answer.slice(1)

    ctx.font = `bold 72px Georgia, serif`
    ctx.fillStyle = colors.accent
    ctx.textAlign = 'left'
    ctx.fillText(firstLetter, textX, answerY + 8)
    const dropCapW = ctx.measureText(firstLetter).width + 6

    ctx.font = `400 30px Georgia, serif`
    ctx.fillStyle = colors.textPrimary

    // First line after drop cap
    const firstLineW = textW - dropCapW
    const allWords = restAnswer.split(' ')
    let firstLine = ''
    let remaining = ''
    let measuring = true

    for (let i = 0; i < allWords.length; i++) {
      const test = firstLine ? `${firstLine} ${allWords[i]}` : allWords[i]
      if (measuring && ctx.measureText(test).width > firstLineW) {
        remaining = allWords.slice(i).join(' ')
        measuring = false
        break
      }
      firstLine = test
    }
    if (measuring) remaining = ''

    ctx.fillText(firstLine, textX + dropCapW, answerY)

    // Remaining lines
    const remainingLines = wrapText(ctx, remaining, textW, 42)
    const maxLines = Math.min(remainingLines.length, hasImage ? 8 : 12)
    remainingLines.slice(0, maxLines).forEach((line, i) => {
      ctx.fillText(line, textX, answerY + 46 + i * 42)
    })

    // Image on right side
    if (hasImage && slide.imageUrl) {
      const img = await loadImage(slide.imageUrl)
      if (img) {
        const imgX = W * 0.56
        const imgW = W * 0.38
        const imgH = H * 0.72
        const imgY = (H - imgH) / 2

        // Rounded rect clip
        ctx.save()
        const r = 24
        ctx.beginPath()
        ctx.moveTo(imgX + r, imgY)
        ctx.lineTo(imgX + imgW - r, imgY)
        ctx.arcTo(imgX + imgW, imgY, imgX + imgW, imgY + r, r)
        ctx.lineTo(imgX + imgW, imgY + imgH - r)
        ctx.arcTo(imgX + imgW, imgY + imgH, imgX + imgW - r, imgY + imgH, r)
        ctx.lineTo(imgX + r, imgY + imgH)
        ctx.arcTo(imgX, imgY + imgH, imgX, imgY + imgH - r, r)
        ctx.lineTo(imgX, imgY + r)
        ctx.arcTo(imgX, imgY, imgX + r, imgY, r)
        ctx.closePath()
        ctx.clip()

        const scale = Math.max(imgW / img.width, imgH / img.height)
        const dw = img.width * scale
        const dh = img.height * scale
        ctx.drawImage(img, imgX + (imgW - dw) / 2, imgY + (imgH - dh) / 2, dw, dh)
        ctx.restore()
      }
    }

    // Bottom divider
    ctx.strokeStyle = colors.divider
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(pad, H - 60)
    ctx.lineTo(W - pad, H - 60)
    ctx.stroke()
  }

  if (slide.type === 'closing') {
    ctx.textAlign = 'center'

    drawOrnament(ctx, cx, H * 0.38, colors.accent)

    ctx.font = `italic 52px Georgia, serif`
    ctx.fillStyle = colors.textSecondary
    ctx.fillText('A story worth keeping.', cx, H * 0.48)

    drawOrnament(ctx, cx, H * 0.55, colors.accent)

    ctx.font = `300 22px Georgia, serif`
    ctx.fillStyle = colors.textMuted
    ctx.fillText('Created with Tell Me Your Story', cx, H * 0.64)

    ctx.font = `300 18px Georgia, serif`
    ctx.fillStyle = colors.textMuted
    ctx.fillText('tellmeyourstory.uk', cx, H * 0.7)
  }
}

export function useStoryVideo() {
  const isGenerating = ref(false)
  const progress = ref(0)
  const progressLabel = ref('')
  const error = ref('')

  async function generateVideo(
    project: StoryProject,
    sections: StorySection[],
    images: StoryImage[],
    options: VideoOptions
  ): Promise<void> {
    isGenerating.value = true
    progress.value = 0
    progressLabel.value = 'Setting up...'
    error.value = ''

    try {
      // Dynamically import ffmpeg to keep bundle size down
      const { FFmpeg } = await import('@ffmpeg/ffmpeg')
      const { fetchFile, toBlobURL } = await import('@ffmpeg/util')

      const ffmpeg = new FFmpeg()

      progressLabel.value = 'Loading video engine...'

      // Load ffmpeg core from CDN
      const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm'
      await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
      })

      ffmpeg.on('progress', ({ progress: p }) => {
        progress.value = Math.round(40 + p * 55)
        progressLabel.value = `Encoding video... ${progress.value}%`
      })

      // Build slides
      const slides = buildSlides(project, sections, images)

      // Draw each slide to canvas and capture as PNG
      const canvas = document.createElement('canvas')
      canvas.width = W
      canvas.height = H
      const ctx = canvas.getContext('2d')!

      const fps = 1
      const frameDuration = options.slideDuration

      progressLabel.value = 'Drawing slides...'

      let frameIndex = 0
     

      for (let s = 0; s < slides.length; s++) {
        const slide = slides[s]

        await drawSlide(ctx, slide, options.theme)

        progress.value = Math.round((s / slides.length) * 35)
        progressLabel.value = `Drawing slide ${s + 1} of ${slides.length}...`

        // Write N frames for this slide (one per second of duration)
       const blob: Blob = await new Promise((resolve) => canvas.toBlob((b) => resolve(b!), 'image/png'))
const buf = await blob.arrayBuffer()

for (let f = 0; f < frameDuration * fps; f++) {
  const name = `frame${String(frameIndex).padStart(5, '0')}.png`
  // Copy the buffer each time — ffmpeg detaches it after first write
  const copy = new Uint8Array(buf.byteLength)
  copy.set(new Uint8Array(buf))
  await ffmpeg.writeFile(name, copy)
  frameIndex++
}
      }

      progress.value = 38
      progressLabel.value = 'Assembling video...'

      // Build ffmpeg command
      const ffmpegArgs: string[] = [
        '-framerate', String(fps),
        '-i', 'frame%05d.png',
      ]

      // Add music if provided
      if (options.musicFile) {
        const musicData = await fetchFile(options.musicFile)
        await ffmpeg.writeFile('music.mp3', musicData)
        ffmpegArgs.push('-i', 'music.mp3')
       ffmpegArgs.push('-c:v', 'libx264')
ffmpegArgs.push('-c:a', 'aac')
ffmpegArgs.push('-filter_complex', '[1:a]aloop=loop=-1:size=2147483647,atrim=duration=' + String(slides.length * frameDuration) + '[aout]')
ffmpegArgs.push('-map', '0:v:0')
ffmpegArgs.push('-map', '[aout]')
      } else {
        ffmpegArgs.push('-c:v', 'libx264')
      }

      ffmpegArgs.push(
        '-pix_fmt', 'yuv420p',
        '-vf', `scale=${W}:${H}`,
        '-r', '25',
        '-preset', 'fast',
        'output.mp4'
      )

      await ffmpeg.exec(ffmpegArgs)

      progress.value = 95
      progressLabel.value = 'Preparing download...'

const rawData = await ffmpeg.readFile('output.mp4')
const uint8Data = rawData instanceof Uint8Array ? rawData : new Uint8Array(rawData as unknown as ArrayBuffer)
// Slice creates a genuine copy that isn't detached
const blob = new Blob([uint8Data.slice()], { type: 'video/mp4' })
      const url = URL.createObjectURL(blob)

      // Trigger download
      const a = document.createElement('a')
      a.href = url
      a.download = `${project.title.replace(/\s+/g, '-').toLowerCase()}-story.mp4`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)

      // Cleanup
      setTimeout(() => URL.revokeObjectURL(url), 10000)

      progress.value = 100
      progressLabel.value = 'Done! Your video is downloading.'

      // Clean up ffmpeg files
      for (let i = 0; i < frameIndex; i++) {
        const name = `frame${String(i).padStart(5, '0')}.png`
        await ffmpeg.deleteFile(name).catch(() => null)
      }
      await ffmpeg.deleteFile('output.mp4').catch(() => null)
      if (options.musicFile) {
        await ffmpeg.deleteFile('music.mp3').catch(() => null)
      }

    } catch (err) {
      console.error('Video generation error:', err)
      error.value =
        err instanceof Error
          ? err.message
          : 'Something went wrong generating the video. Please try again.'
    } finally {
      isGenerating.value = false
      setTimeout(() => {
        if (progress.value === 100) {
          progress.value = 0
          progressLabel.value = ''
        }
      }, 4000)
    }
  }

  return {
    isGenerating,
    progress,
    progressLabel,
    error,
    generateVideo,
  }
}