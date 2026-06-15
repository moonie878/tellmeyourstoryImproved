import { ref } from 'vue'
import type { StorySection, StoryProject, PdfTheme } from '../types/story'
import type { StoryImage } from '../types/story'
import { getChapterIntro } from '../utils/pdfDesign'

export type VideoTheme = PdfTheme
export type VideoSlideDuration = 3 | 5 | 8
export type VideoTransition = 'cut' | 'fade' | 'slow-fade'

export type VideoOptions = {
  theme: VideoTheme
  slideDuration: VideoSlideDuration
  transition: VideoTransition
  musicFile: File | null
  musicTrack?: 'gentle-piano' | 'warm-strings' | 'soft-acoustic' | null
}

export type VideoSlide =
  | { type: 'title'; title: string; subtitle: string; coverImageUrl?: string }
  | { type: 'chapter'; chapter: string; intro: string; chapterIndex: number }
  | { type: 'answer'; question: string; answer: string; imageUrl?: string; chapter: string; qrUrl?: string }
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
  images: StoryImage[],
  voiceMap: Map<string, string>
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

  // Pre-compute which chapters have at least one answered section
  const answeredChapters = new Set(
    sections
      .filter((s) => s.answer?.trim() && s.chapter)
      .map((s) => s.chapter as string)
  )

  for (const section of sections) {
    if (section.chapter && section.chapter !== currentChapter) {
      currentChapter = section.chapter
      // Only add chapter slide if this chapter has answered sections
      if (answeredChapters.has(currentChapter)) {
        chapterIndex++
        slides.push({
          type: 'chapter',
          chapter: currentChapter,
          intro: getChapterIntro(currentChapter),
          chapterIndex,
        })
      }
    }

    if (section.answer?.trim()) {
      slides.push({
        type: 'answer',
        question: section.question,
        answer: section.answer.trim(),
        imageUrl: imageMap.get(section.id) ?? undefined,
        chapter: section.chapter ?? '',
        qrUrl: voiceMap.get(section.id),   // ← add this
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

    // QR code — bottom right if voice recording available
    if (slide.type === 'answer' && slide.qrUrl) {
      try {
        const qrImg = await loadImage(
          `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(slide.qrUrl)}`
        )
        if (qrImg) {
          const QR = 120
          const qrX = W - pad - QR
          const qrY = H - 60 - QR - 20
          ctx.drawImage(qrImg, qrX, qrY, QR, QR)
          ctx.font = `300 18px Georgia, serif`
          ctx.fillStyle = colors.textMuted
          ctx.textAlign = 'center'
          ctx.fillText('Scan to hear this memory', qrX + QR / 2, qrY + QR + 22)
        }
      } catch {
        // QR failed silently
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
    const { FFmpeg } = await import('@ffmpeg/ffmpeg')
    const { fetchFile, toBlobURL } = await import('@ffmpeg/util')

    const ffmpeg = new FFmpeg()

    progressLabel.value = 'Loading video engine...'
    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm'
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
      wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
    })

    ffmpeg.on('progress', ({ progress: p }) => {
      progress.value = Math.round(50 + p * 45)
      progressLabel.value = `Encoding video... ${progress.value}%`
    })

    const { supabase } = await import('../lib/supabase')
    const { data: voiceData } = await supabase
      .from('voice_recordings')
      .select('id, section_id, show_qr')
      .eq('project_id', project.id)
      .eq('show_qr', true)

    const voiceMap = new Map<string, string>()
    if (voiceData) {
      for (const rec of voiceData) {
        voiceMap.set(rec.section_id, `https://tellmeyourstory.uk/listen/${rec.id}`)
      }
    }

    const slides = buildSlides(project, sections, images, voiceMap)

    const canvas = document.createElement('canvas')
    canvas.width = W
    canvas.height = H
    const ctx = canvas.getContext('2d')!

    const fps = 25
    const frameDuration = options.slideDuration
    const transitionSecs = options.transition === 'cut' ? 0
      : options.transition === 'fade' ? 1
      : 2
    const transitionFrameCount = transitionSecs * fps

    // Helper — capture current canvas as Uint8Array without holding onto ArrayBuffer
    async function captureFrame(): Promise<Uint8Array> {
      const blob: Blob = await new Promise((resolve) =>
        canvas.toBlob((b) => resolve(b!), 'image/png')
      )
      const ab = await blob.arrayBuffer()
      return new Uint8Array(ab)
    }

    let frameIndex = 0

   async function writeFrames(data: Uint8Array, count: number) {
  for (let f = 0; f < count; f++) {
    // Fresh copy each time — ffmpeg detaches the buffer on write
    await ffmpeg.writeFile(`frame${String(frameIndex).padStart(5, '0')}.png`, new Uint8Array(data))
    frameIndex++
  }
}

    // Render and write frames one slide at a time — never hold more than 2 slides in memory
    progressLabel.value = 'Rendering slides...'

    let prevFrameData: Uint8Array | null = null

    for (let s = 0; s < slides.length; s++) {
      progress.value = Math.round((s / slides.length) * 45)
      progressLabel.value = `Rendering slide ${s + 1} of ${slides.length}...`

      await drawSlide(ctx, slides[s], options.theme)
      const currFrameData = await captureFrame()

      // Transition from previous slide
      if (transitionFrameCount > 0 && prevFrameData && s > 0) {
        const prevBlob = new Blob([new Uint8Array(prevFrameData)], { type: 'image/png' })
        const prevImg = new Image()
        prevImg.src = URL.createObjectURL(prevBlob)
        await new Promise((r) => { prevImg.onload = r })

        const currBlob = new Blob([new Uint8Array(currFrameData)], { type: 'image/png' })
        const currImg = new Image()
        currImg.src = URL.createObjectURL(currBlob)
        await new Promise((r) => { currImg.onload = r })

        for (let t = 0; t < transitionFrameCount; t++) {
          const alpha = t / (transitionFrameCount - 1)
          ctx.clearRect(0, 0, W, H)
          ctx.globalAlpha = 1
          ctx.drawImage(prevImg, 0, 0)
          ctx.globalAlpha = alpha
          ctx.drawImage(currImg, 0, 0)
          ctx.globalAlpha = 1
          const blendData = await captureFrame()
await ffmpeg.writeFile(`frame${String(frameIndex).padStart(5, '0')}.png`, new Uint8Array(blendData))
frameIndex++
        }

        URL.revokeObjectURL(prevImg.src)
        URL.revokeObjectURL(currImg.src)
      }

      // Static frames for this slide
      const isFirst = s === 0
      const isLast = s === slides.length - 1
      const leadIn  = isFirst ? 0 : Math.floor(transitionFrameCount / 2)
      const leadOut = isLast  ? 0 : Math.floor(transitionFrameCount / 2)
      const staticFrames = Math.max(1, (frameDuration * fps) - leadIn - leadOut)
      await writeFrames(currFrameData, staticFrames)

      prevFrameData = currFrameData
    }

    progress.value = 48
    progressLabel.value = 'Assembling video...'

    const ffmpegArgs: string[] = [
      '-framerate', String(fps),
      '-i', 'frame%05d.png',
    ]

    if (options.musicFile) {
      const musicData = await fetchFile(options.musicFile)
      await ffmpeg.writeFile('music.mp3', musicData)
      const totalDuration = slides.length * frameDuration + (slides.length - 1) * transitionSecs
      ffmpegArgs.push('-i', 'music.mp3')
      ffmpegArgs.push('-c:v', 'libx264')
      ffmpegArgs.push('-c:a', 'aac')
      ffmpegArgs.push('-filter_complex', `[1:a]aloop=loop=-1:size=2147483647,atrim=duration=${totalDuration}[aout]`)
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

    progress.value = 95
    progressLabel.value = 'Preparing download...'

    const rawData = await ffmpeg.readFile('output.mp4')
    const uint8Data = rawData instanceof Uint8Array ? rawData : new Uint8Array(rawData as unknown as ArrayBuffer)
    const blob = new Blob([new Uint8Array(uint8Data)], { type: 'video/mp4' })
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = `${project.title.replace(/\s+/g, '-').toLowerCase()}-story.mp4`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    setTimeout(() => URL.revokeObjectURL(url), 10000)

    progress.value = 100
    progressLabel.value = 'Done! Your video is downloading.'

    for (let i = 0; i < frameIndex; i++) {
      await ffmpeg.deleteFile(`frame${String(i).padStart(5, '0')}.png`).catch(() => null)
    }
    await ffmpeg.deleteFile('output.mp4').catch(() => null)
    if (options.musicFile) {
      await ffmpeg.deleteFile('music.mp3').catch(() => null)
    }

  } catch (err) {
    console.error('Video generation error:', err)
    error.value = err instanceof Error
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