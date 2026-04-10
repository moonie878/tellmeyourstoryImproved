import jsPDF from 'jspdf'
import { Document, Packer, Paragraph, TextRun } from 'docx'
import { saveAs } from 'file-saver'
import type {
  PdfSettings,
  StoryImage,
  StoryProject,
  StorySection,
} from '../types/story'
import { getPdfDesign, getPageMetrics } from '../utils/pdfDesign'

type ExportPdfArgs = {
  project: StoryProject
  sections: StorySection[]
  settings: PdfSettings
  hasTier4Access: boolean
  hasImageExportAccess: boolean
  coverImageUrl: string
  getAllImagesForExport: () => Promise<StoryImage[]>
  loadImageAsBase64: (url: string) => Promise<string>
}

type ExportWordArgs = {
  project: StoryProject
  sections: StorySection[]
}

export function useStoryExport() {
  function sanitizeFileName(value: string) {
    return value
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
  }

  function applyPageBackground(
    doc: jsPDF,
    color: readonly number[],
    pageWidth: number,
    pageHeight: number
  ) {
    doc.setFillColor(color[0], color[1], color[2])
    doc.rect(0, 0, pageWidth, pageHeight, 'F')
  }

  function setTextColor(doc: jsPDF, color: readonly number[]) {
    doc.setTextColor(color[0], color[1], color[2])
  }

  function setDrawColor(doc: jsPDF, color: readonly number[]) {
    doc.setDrawColor(color[0], color[1], color[2])
  }

  function drawPageBorder(
    doc: jsPDF,
    settings: PdfSettings,
    pageWidth: number,
    pageHeight: number,
    borderColor: readonly number[]
  ) {
    if (settings.borderStyle === 'none') return
    if (settings.orientation === 'landscape-spread') return

    setDrawColor(doc, borderColor)
    doc.setLineWidth(0.3)

    if (settings.borderStyle === 'fine-line') {
      doc.roundedRect(12, 14, pageWidth - 24, pageHeight - 28, 4, 4)
      return
    }

    if (settings.borderStyle === 'corner-floral') {
      doc.roundedRect(12, 14, pageWidth - 24, pageHeight - 28, 4, 4)

      doc.line(18, 24, 30, 24)
      doc.line(18, 24, 18, 36)

      doc.line(pageWidth - 18, 24, pageWidth - 30, 24)
      doc.line(pageWidth - 18, 24, pageWidth - 18, 36)

      doc.line(18, pageHeight - 24, 30, pageHeight - 24)
      doc.line(18, pageHeight - 24, 18, pageHeight - 36)

      doc.line(pageWidth - 18, pageHeight - 24, pageWidth - 30, pageHeight - 24)
      doc.line(pageWidth - 18, pageHeight - 24, pageWidth - 18, pageHeight - 36)

      doc.circle(24, 30, 0.7, 'S')
      doc.circle(pageWidth - 24, 30, 0.7, 'S')
      doc.circle(24, pageHeight - 30, 0.7, 'S')
      doc.circle(pageWidth - 24, pageHeight - 30, 0.7, 'S')
    }
  }

function getPreferredQuoteWithoutRepeats(
  sections: StorySection[],
  currentIndex: number,
  usedQuotes: Set<string>
) {
  const previousSections = sections.slice(0, currentIndex)

  const candidates = [
    ...[...previousSections]
      .reverse()
      .filter(
        (section) =>
          !!section.is_highlighted &&
          !!section.answer &&
          section.answer.trim().length >= 40
      ),
    ...[...previousSections]
      .reverse()
      .filter(
        (section) =>
          !!section.answer &&
          section.answer.trim().length >= 40
      ),
  ]

  for (const section of candidates) {
    const quote = getQuoteFromAnswer(section.answer || '')
    if (quote && !usedQuotes.has(quote)) {
      usedQuotes.add(quote)
      return quote
    }
  }

  return ''
}

  
  function drawSoftDivider(
    doc: jsPDF,
    centerX: number,
    y: number,
    width: number,
    color: readonly number[]
  ) {
    setDrawColor(doc, color)
    doc.setLineWidth(0.25)
    doc.line(centerX - width / 2, y, centerX + width / 2, y)
  }

  function drawFlourishDivider(
    doc: jsPDF,
    centerX: number,
    y: number,
    width: number,
    color: readonly number[]
  ) {
    setDrawColor(doc, color)
    doc.setLineWidth(0.35)

    const half = width / 2
    doc.line(centerX - half, y, centerX - 10, y)
    doc.line(centerX + 10, y, centerX + half, y)

    doc.circle(centerX, y, 0.8, 'S')
    doc.circle(centerX - 4, y, 0.45, 'S')
    doc.circle(centerX + 4, y, 0.45, 'S')
  }

  function drawElegantDivider(
    doc: jsPDF,
    settings: PdfSettings,
    centerX: number,
    y: number,
    width: number,
    design: ReturnType<typeof getPdfDesign>
  ) {
    if (settings.dividerStyle === 'flourish') {
      drawFlourishDivider(doc, centerX, y, width, design.theme.accent)
      return
    }

    if (settings.dividerStyle === 'gold-line') {
      drawSoftDivider(doc, centerX, y, width, design.theme.accent)
      return
    }

    drawSoftDivider(doc, centerX, y, width, design.theme.divider)
  }

  function drawDropCapParagraph(
    doc: jsPDF,
    text: string,
    x: number,
    y: number,
    width: number,
    design: ReturnType<typeof getPdfDesign>
  ) {
    const trimmed = text.trim()

    if (!trimmed) return 0

    const firstLetter = trimmed.charAt(0)
    const rest = trimmed.slice(1).trimStart()

    doc.setFont(design.font.title, 'bold')
    doc.setFontSize(24)
    doc.setTextColor(design.theme.accent[0], design.theme.accent[1], design.theme.accent[2])
    doc.text(firstLetter, x, y + 2)

    doc.setFont(design.font.body, design.font.bodyStyle)
    doc.setFontSize(design.layout.answerSize + 0.3)
    setTextColor(doc, design.theme.textPrimary)

    const splitRest = doc.splitTextToSize(rest, width - 10)
    doc.text(splitRest, x + 10, y)

    return Math.max(12, splitRest.length * design.layout.lineHeight)
  }

  function getStorySubtitle(project: StoryProject | null | undefined) {
    const map: Record<string, string> = {
      mum: 'A life told through memories, moments, and love',
      dad: 'A life told through memories, lessons, and love',
      grandma: 'A collection of memories, traditions, and family stories',
      grandad: 'A collection of stories, life lessons, and legacy',
      life: 'A life remembered through stories, moments, and reflection',
      couple: 'A story of love, life, and the years built together',
    }

    return map[project?.story_type || ''] || 'A story told through memories, moments, and love'
  }

  function getChapterIntro(chapter: string) {
    const map: Record<string, string> = {
      Beginnings:
        'Every story has a beginning. These are the earliest memories and moments that shaped everything that followed.',
      Childhood:
        'The years of growing up, family life, and the small moments that often stay with us the longest.',
      'Teenage Years':
        'A chapter of change, identity, and becoming.',
      'Early Adulthood':
        'The beginning of independence, responsibility, and life taking shape.',
      'Relationships & Love':
        'The people, connections, and moments of love that left a lasting mark.',
      'Family Life':
        'A chapter shaped by home, family, care, and the memories made together.',
      'Work & Life Path':
        'The path of work, purpose, resilience, and the choices that helped define a life.',
      'Memories & Milestones':
        'The moments that changed everything, brought the most joy, or were never forgotten.',
      'Values & Lessons':
        'The beliefs, lessons, and values that remained important over time.',
      'Reflections & Legacy':
        'A final chapter of gratitude, meaning, and what deserves to be remembered.',
    }

    return map[chapter] || 'A new chapter in this story.'
  }

  
  function getChapterNumberLabel(chapterIndex: number) {
    const labels = [
      'Chapter One',
      'Chapter Two',
      'Chapter Three',
      'Chapter Four',
      'Chapter Five',
      'Chapter Six',
      'Chapter Seven',
      'Chapter Eight',
      'Chapter Nine',
      'Chapter Ten',
    ]

    return labels[chapterIndex] || `Chapter ${chapterIndex + 1}`
  }

  function getQuoteFromAnswer(answer: string, maxLength = 140) {
  const cleaned = answer.replace(/\s+/g, ' ').trim()
  if (!cleaned) return ''

  const sentences = cleaned
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean)

  const strongSentence = sentences.find(
    (sentence) =>
      sentence.length >= 40 &&
      sentence.length <= maxLength &&
      !sentence.includes(':') &&
      !sentence.toLowerCase().startsWith('because')
  )

  if (strongSentence) {
    return strongSentence
  }

  if (cleaned.length <= maxLength) {
    return cleaned
  }

  const shortened = cleaned.slice(0, maxLength)
  const lastSpace = shortened.lastIndexOf(' ')

  return `${shortened.slice(0, lastSpace > 0 ? lastSpace : maxLength)}…`
}

 function shouldInsertQuotePage(index: number, totalSections: number) {
  if (index === 0) return false

  if (totalSections <= 8) {
    return index === 4
  }

  if (totalSections <= 16) {
    return index > 0 && index % 6 === 0
  }

  return index > 0 && index % 5 === 0
}

  function shouldUseCenteredSpreadLayout(
    section: StorySection,
    hasImage: boolean
  ) {
    if (hasImage) return false

    const answerLength = (section.answer || '').trim().length
    const questionLength = (section.question || '').trim().length
    const totalLength = answerLength + questionLength

    return totalLength <= 360
  }

  function getPreferredQuote(
  sections: StorySection[],
  currentIndex: number
) {
  const previousSections = sections.slice(0, currentIndex)

  const highlighted = [...previousSections]
    .reverse()
    .find(
      (section) =>
        !!section.is_highlighted &&
        !!section.answer &&
        section.answer.trim().length >= 40
    )

  if (highlighted) {
    const quote = getQuoteFromAnswer(highlighted.answer)
    if (quote) return quote
  }

  const previous = previousSections[previousSections.length - 1]
  if (previous?.answer) {
    const quote = getQuoteFromAnswer(previous.answer)
    if (quote) return quote
  }

  const fallback = [...previousSections]
    .reverse()
    .find(
      (section) =>
        !!section.answer &&
        section.answer.trim().length >= 40
    )

  if (fallback?.answer) {
    return getQuoteFromAnswer(fallback.answer)
  }

  return ''
}

  function addFooter(
    doc: jsPDF,
    pageNumber: number,
    storyTitle: string,
    textMuted: readonly number[],
    pageWidth: number,
    pageHeight: number,
    settings: PdfSettings
  ) {
    const metrics = getPageMetrics(settings)

    setTextColor(doc, textMuted)

    if (settings.orientation === 'landscape-spread') {
      const leftCenter = metrics.leftX + metrics.columnWidth / 2
      const rightCenter = metrics.rightX + metrics.columnWidth / 2

      const leftPageNumber = pageNumber * 2 - 1
      const rightPageNumber = pageNumber * 2

      if (pageNumber > 6 && pageNumber % 8 === 0) {
        doc.setFontSize(8)
        doc.text(storyTitle, leftCenter, 14, { align: 'center' })
        doc.text(storyTitle, rightCenter, 14, { align: 'center' })
      }

      doc.setFontSize(9)
      doc.text(`${leftPageNumber}`, leftCenter, pageHeight - 10, {
        align: 'center',
      })
      doc.text(`${rightPageNumber}`, rightCenter, pageHeight - 10, {
        align: 'center',
      })

      return
    }

    if (pageNumber > 6 && pageNumber % 8 === 0) {
      doc.setFontSize(8)
      doc.text(storyTitle, pageWidth / 2, settings.printReady ? 12 : 14, {
        align: 'center',
      })
    }

    doc.setFontSize(9)
    doc.text(`${pageNumber}`, pageWidth / 2, pageHeight - (settings.printReady ? 12 : 10), {
      align: 'center',
    })
  }

  function getImageCaption(section: StorySection) {
  const question = (section.question || '').trim()

  if (!question) return 'A moment worth remembering'

  if (question.length <= 70) return question

  return 'A moment connected to this story'
}

  async function renderCoverPage(
    doc: jsPDF,
    storyTitle: string,
    storySubtitle: string,
    settings: PdfSettings,
    coverImageUrl: string,
    hasTier4Access: boolean,
    loadImageAsBase64: (url: string) => Promise<string>
  ) {
    const design = getPdfDesign(settings)
    const metrics = getPageMetrics(settings)

    applyPageBackground(doc, design.theme.pageBg, metrics.pageWidth, metrics.pageHeight)

    if (settings.layout === 'elegant') {
      drawPageBorder(doc, settings, metrics.pageWidth, metrics.pageHeight, design.theme.border)
    }

    if (
      design.layout.coverFrame &&
      settings.orientation === 'portrait' &&
      settings.layout !== 'elegant'
    ) {
      setDrawColor(doc, design.theme.border)
      doc.roundedRect(15, 20, metrics.pageWidth - 30, metrics.pageHeight - 40, 8, 8)
    }

    const shouldShowCoverImage =
      settings.includeCoverImage && !!coverImageUrl && hasTier4Access

    if (shouldShowCoverImage) {
      try {
        const coverImgData = await loadImageAsBase64(coverImageUrl)

        const img = new Image()
        img.src = coverImgData

        await new Promise((resolve, reject) => {
          img.onload = resolve
          img.onerror = reject
        })

        const isSpread = settings.orientation === 'landscape-spread'
        const maxWidth = isSpread ? 110 : settings.layout === 'minimal' ? 150 : 140
        const maxHeight = isSpread ? 120 : settings.layout === 'elegant' ? 100 : 90

        let imgWidth = img.width
        let imgHeight = img.height

        const ratio = Math.min(maxWidth / imgWidth, maxHeight / imgHeight)
        imgWidth *= ratio
        imgHeight *= ratio

        const imageX = isSpread ? 167 : (metrics.pageWidth - imgWidth) / 2
        const imageY = isSpread ? 42 : settings.layout === 'minimal' ? 48 : 42

        if (settings.layout !== 'minimal') {
          setDrawColor(doc, design.theme.border)
          doc.roundedRect(imageX - 2, imageY - 2, imgWidth + 4, imgHeight + 4, 3, 3)
        }

        doc.addImage(coverImgData, 'PNG', imageX, imageY, imgWidth, imgHeight)
      } catch (err) {
        console.error('Cover image failed:', err)
      }
    }

    const isSpread = settings.orientation === 'landscape-spread'

    if (isSpread) {
      doc.setFont(design.font.body, 'normal')
      doc.setFontSize(11)
      setTextColor(doc, design.theme.textMuted)
      doc.text('Tell Me Your Story', 38, 48)

      doc.setFont(design.font.title, design.font.titleStyle)
      doc.setFontSize(design.layout.titleSize)
      setTextColor(doc, design.theme.textPrimary)
      doc.text(storyTitle, 38, 78, { maxWidth: 95 })

      doc.setFont(design.font.body, 'normal')
      doc.setFontSize(design.layout.subtitleSize)
      setTextColor(doc, design.theme.textSecondary)
      const splitSubtitle = doc.splitTextToSize(storySubtitle, 95)
      doc.text(splitSubtitle, 38, 100)

      setDrawColor(doc, design.theme.divider)
      doc.line(metrics.centerX, 18, metrics.centerX, metrics.pageHeight - 18)

      doc.setFontSize(10)
      setTextColor(doc, design.theme.textMuted)
      doc.text('Created with love', 38, 170)

      return
    }

    doc.setFont(design.font.body, 'normal')
    doc.setFontSize(12)
    setTextColor(doc, design.theme.textMuted)
    doc.text('Tell Me Your Story', metrics.centerX, shouldShowCoverImage ? 150 : 52, {
      align: 'center',
    })

if (settings.layout === 'elegant') {
  drawSmallOrnament(
    doc,
    metrics.centerX,
    shouldShowCoverImage ? 162 : 64,
    design.theme.accent
  )
}

    doc.setFont(design.font.title, design.font.titleStyle)
    doc.setFontSize(design.layout.titleSize)
    setTextColor(doc, design.theme.textPrimary)
    doc.text(
      storyTitle,
      metrics.centerX,
      shouldShowCoverImage
        ? settings.layout === 'elegant'
          ? 186
          : settings.layout === 'minimal'
            ? 168
            : 175
        : settings.layout === 'elegant'
          ? 98
          : settings.layout === 'minimal'
            ? 105
            : 86,
      {
        align: 'center',
        maxWidth: 145,
      }
    )

    drawElegantDivider(
      doc,
      settings,
      metrics.centerX,
      shouldShowCoverImage ? 188 : 100,
      settings.layout === 'elegant' ? 54 : 100,
      design
    )

    doc.setFont(design.font.body, 'normal')
    doc.setFontSize(design.layout.subtitleSize)
    setTextColor(doc, design.theme.textSecondary)
    const subtitleY = shouldShowCoverImage ? 200 : 114
    doc.text(storySubtitle, metrics.centerX, subtitleY, { align: 'center', maxWidth: 130 })

if (settings.layout === 'elegant') {
  drawDoubleDivider(doc, metrics.centerX, subtitleY + 16, 34, design.theme.border)
}

    doc.setFontSize(10)
    setTextColor(doc, design.theme.textMuted)
    doc.text('Created with love', metrics.centerX, 246, { align: 'center' })
  }

  function renderDedicationPage(doc: jsPDF, settings: PdfSettings) {
    const design = getPdfDesign(settings)
    const metrics = getPageMetrics(settings)
    const dedication = 'Created with love and care.'

    doc.addPage()
    applyPageBackground(doc, design.theme.secondaryBg, metrics.pageWidth, metrics.pageHeight)

    if (settings.layout === 'elegant') {
      drawPageBorder(doc, settings, metrics.pageWidth, metrics.pageHeight, design.theme.border)
    }

    doc.setFont(design.font.body, design.font.accentStyle)
    doc.setFontSize(settings.layout === 'elegant' ? 20 : 18)
    setTextColor(doc, design.theme.textSecondary)

    if (settings.orientation === 'landscape-spread') {
      doc.text(dedication, 215, 105, {
        align: 'center',
        maxWidth: 90,
      })
      setDrawColor(doc, design.theme.divider)
      doc.line(metrics.centerX, 18, metrics.centerX, metrics.pageHeight - 18)
      return
    }

    if (settings.layout === 'elegant') {
      drawElegantDivider(doc, settings, metrics.centerX, 116, 40, design)
    }

    doc.text(dedication, metrics.centerX, 140, {
      align: 'center',
      maxWidth: 140,
    })

    if (settings.layout === 'elegant') {
      drawElegantDivider(doc, settings, metrics.centerX, 166, 32, design)
    }
  }

function drawDoubleDivider(
  doc: jsPDF,
  centerX: number,
  y: number,
  width: number,
  color: readonly number[]
) {
  setDrawColor(doc, color)
  doc.setLineWidth(0.2)
  doc.line(centerX - width / 2, y, centerX + width / 2, y)
  doc.line(centerX - width / 2 + 4, y + 2, centerX + width / 2 - 4, y + 2)
}

function drawSmallOrnament(
  doc: jsPDF,
  centerX: number,
  y: number,
  color: readonly number[]
) {
  setDrawColor(doc, color)
  doc.setLineWidth(0.25)

  doc.line(centerX - 16, y, centerX - 6, y)
  doc.line(centerX + 6, y, centerX + 16, y)

  doc.circle(centerX, y, 1.1, 'S')
  doc.circle(centerX - 3.5, y, 0.5, 'S')
  doc.circle(centerX + 3.5, y, 0.5, 'S')
}

function shouldUseCenteredPortraitLayout(
  section: StorySection,
  hasImage: boolean,
  settings: PdfSettings
) {
  if (settings.layout !== 'elegant') return false
  if (hasImage) return false

  const answerLength = (section.answer || '').trim().length
  const questionLength = (section.question || '').trim().length

  return answerLength > 0 && answerLength <= 180 && questionLength <= 120
}

  function renderQuotePage(
    doc: jsPDF,
    quote: string,
    settings: PdfSettings
  ) {
    const design = getPdfDesign(settings)
    const metrics = getPageMetrics(settings)

    doc.addPage()
    applyPageBackground(doc, design.theme.secondaryBg, metrics.pageWidth, metrics.pageHeight)

    if (settings.layout === 'elegant') {
      drawPageBorder(doc, settings, metrics.pageWidth, metrics.pageHeight, design.theme.border)
    }

    if (settings.orientation === 'landscape-spread') {
      setDrawColor(doc, design.theme.divider)
      doc.line(metrics.centerX, 18, metrics.centerX, metrics.pageHeight - 18)

      doc.setFont(design.font.body, 'normal')
      doc.setFontSize(10)
      setTextColor(doc, design.theme.textMuted)
      doc.text('A memory worth keeping', metrics.centerX, 60, {
        align: 'center',
      })

const cleanQuote = `“${quote}”`

      drawElegantDivider(doc, settings, metrics.centerX, 92, 44, design)

     doc.setFont(design.font.title, design.font.accentStyle)
doc.setFontSize(
  settings.layout === 'elegant'
    ? cleanQuote.length < 90
      ? 22
      : 19
    : 18
)
      setTextColor(doc, design.theme.textPrimary)

      
      const splitQuote = doc.splitTextToSize(cleanQuote, 136)

      doc.text(splitQuote, metrics.centerX, 128, {
        align: 'center',
        maxWidth: 136,
      })

      if (settings.layout === 'elegant') {
        doc.setFont(design.font.body, 'italic')
        doc.setFontSize(9)
        setTextColor(doc, design.theme.textMuted)
        doc.text('held onto with love', metrics.centerX, 168, {
          align: 'center',
        })
      }

      return
    }

    if (settings.layout === 'elegant') {
      doc.setFont(design.font.body, 'normal')
      doc.setFontSize(9)
      setTextColor(doc, design.theme.textMuted)
      doc.text('A MEMORY WORTH KEEPING', metrics.centerX, 78, { align: 'center' })
drawSmallOrnament(doc, metrics.centerX, 90, design.theme.accent)
      drawElegantDivider(doc, settings, metrics.centerX, 90, 44, design)

      doc.setFont(design.font.title, 'italic')
doc.setFontSize(quote.length < 90 ? 23 : 20)
      setTextColor(doc, design.theme.textPrimary)

      const splitQuote = doc.splitTextToSize(`“${quote}”`, 94)
      doc.text(splitQuote, metrics.centerX, 126, {
        align: 'center',
        maxWidth: 94,
      })
      drawDoubleDivider(doc, metrics.centerX, 182, 26, design.theme.border)
      doc.setFont(design.font.body, 'italic')
      doc.setFontSize(10)
      setTextColor(doc, design.theme.textMuted)
      doc.text('held onto with love', metrics.centerX, 194, { align: 'center' })

      return
    }

    doc.setFont(design.font.body, 'normal')
    doc.setFontSize(10)
    setTextColor(doc, design.theme.textMuted)
    doc.text('A memory worth keeping', metrics.centerX, 94, { align: 'center' })

    setDrawColor(doc, design.theme.divider)
    doc.line(60, 110, 150, 110)

    doc.setFont(design.font.title, design.font.accentStyle)
    doc.setFontSize(20)
    setTextColor(doc, design.theme.textPrimary)

    const splitQuote = doc.splitTextToSize(`“${quote}”`, metrics.contentWidth - 26)
    doc.text(splitQuote, metrics.centerX, 132, {
      align: 'center',
    })

    setDrawColor(doc, design.theme.divider)
    doc.line(60, 180, 150, 180)
  }

  function renderChapterHeading(
    doc: jsPDF,
    chapterTitle: string,
    chapterIndex: number,
    settings: PdfSettings
  ) {
    const design = getPdfDesign(settings)
    const metrics = getPageMetrics(settings)
    const intro = getChapterIntro(chapterTitle)
    const chapterLabel = getChapterNumberLabel(chapterIndex)

    applyPageBackground(doc, design.theme.secondaryBg, metrics.pageWidth, metrics.pageHeight)

    if (settings.layout === 'elegant') {
      drawPageBorder(doc, settings, metrics.pageWidth, metrics.pageHeight, design.theme.border)
      
    }

    if (settings.orientation === 'landscape-spread') {
      setDrawColor(doc, design.theme.divider)
      doc.line(metrics.centerX, 18, metrics.centerX, metrics.pageHeight - 18)

      doc.setFont(design.font.body, 'normal')
      doc.setFontSize(10)
      setTextColor(doc, design.theme.textMuted)
      doc.text(chapterLabel, metrics.rightX + metrics.columnWidth / 2, 56, {
        align: 'center',
      })

      drawElegantDivider(
        doc,
        settings,
        metrics.rightX + metrics.columnWidth / 2,
        68,
        36,
        design
      )

      doc.setFont(design.font.title, design.font.titleStyle)
      doc.setFontSize(design.layout.chapterTitleSize + 2)
      setTextColor(doc, design.theme.textPrimary)
      doc.text(chapterTitle, metrics.rightX + metrics.columnWidth / 2, 88, {
        align: 'center',
        maxWidth: metrics.columnWidth - 18,
      })

      doc.setFont(design.font.body, design.font.accentStyle)
      doc.setFontSize(12)
      setTextColor(doc, design.theme.textSecondary)

      const introWidth = metrics.columnWidth - 24
      const splitIntro = doc.splitTextToSize(intro, introWidth)

      doc.text(
        splitIntro,
        metrics.rightX + metrics.columnWidth / 2,
        126,
        {
          align: 'center',
          maxWidth: introWidth,
        }
      )

      if (settings.layout === 'elegant' && settings.chapterStyle === 'flourish') {
        drawElegantDivider(
          doc,
          settings,
          metrics.rightX + metrics.columnWidth / 2,
          162,
          28,
          design
        )
      }

      return
    }

    if (settings.layout === 'elegant') {
      doc.setFont(design.font.body, 'normal')
      doc.setFontSize(9)
      setTextColor(doc, design.theme.textMuted)
      doc.text(chapterLabel.toUpperCase(), metrics.centerX, 68, { align: 'center' })
      drawSmallOrnament(doc, metrics.centerX, 80, design.theme.accent)

      drawSmallOrnament(doc, metrics.centerX, 80, design.theme.accent)

      doc.setFont(design.font.title, design.font.titleStyle)
      doc.setFontSize(28)
      setTextColor(doc, design.theme.textPrimary)
      doc.text(chapterTitle, metrics.centerX, 108, {
        align: 'center',
        maxWidth: 118,
      })

      doc.setFont(design.font.body, 'italic')
      doc.setFontSize(11)
      setTextColor(doc, design.theme.textSecondary)

      const splitIntro = doc.splitTextToSize(intro, 96)
doc.text(splitIntro, metrics.centerX, 134, {
  align: 'center',
  maxWidth: 96,
})

      if (settings.chapterStyle === 'flourish') {
        drawElegantDivider(doc, settings, metrics.centerX, 176, 40, design)
      }

      return
    }

    doc.setFont(design.font.body, 'normal')
    doc.setFontSize(10)
    setTextColor(doc, design.theme.textMuted)
    doc.text(chapterLabel, metrics.centerX, 72, { align: 'center' })

    doc.setFont(design.font.title, 'bold')
    doc.setFontSize(80)
    doc.setTextColor(235, 235, 235)
    doc.text(String(chapterIndex + 1), metrics.centerX, 118, {
      align: 'center',
    })

    doc.setFont(design.font.title, design.font.titleStyle)
    doc.setFontSize(26)
    setTextColor(doc, design.theme.textPrimary)
    doc.text(chapterTitle, metrics.centerX, 138, {
      align: 'center',
      maxWidth: 130,
    })

    setDrawColor(doc, design.theme.divider)
    doc.line(55, 112, 155, 112)

    doc.setFont(design.font.body, design.font.accentStyle)
    doc.setFontSize(12)
    doc.setTextColor(120, 120, 120)
    const splitIntro = doc.splitTextToSize(intro, metrics.contentWidth - 26)
    doc.text(splitIntro, metrics.centerX, 156, {
      align: 'center',
    })
  }

  async function renderPortraitSection(
    doc: jsPDF,
    section: StorySection,
    settings: PdfSettings,
    images: StoryImage[],
    yState: { y: number },
    hasImageExportAccess: boolean,
    loadImageAsBase64: (url: string) => Promise<string>
  ) {
    const design = getPdfDesign(settings)
    const metrics = getPageMetrics(settings)

    if (yState.y > 210) {
      doc.addPage()
      applyPageBackground(doc, design.theme.pageBg, metrics.pageWidth, metrics.pageHeight)
      if (settings.layout === 'elegant') {
        drawPageBorder(doc, settings, metrics.pageWidth, metrics.pageHeight, design.theme.border)
      }
      yState.y = metrics.marginTop
    }

    doc.setFont(design.font.body, 'italic')
    doc.setFontSize(
      settings.layout === 'elegant'
        ? design.layout.questionSize
        : design.layout.questionSize - 0.5
    )
    setTextColor(doc, design.theme.textSecondary)

    const questionText = section.question
    const safeWidth = metrics.contentWidth
    const splitQuestion = doc.splitTextToSize(questionText, safeWidth)

    const answerX =
      settings.printReady && settings.layout === 'classic'
        ? metrics.marginLeft + 2
        : settings.printReady
          ? metrics.marginLeft + 3
          : metrics.marginLeft + 2

    const questionGap = settings.printReady ? 8 : 6
    doc.text(splitQuestion, answerX, yState.y)
    yState.y += splitQuestion.length * design.layout.lineHeight + questionGap

    doc.setFont(design.font.body, design.font.bodyStyle)
    doc.setFontSize(design.layout.answerSize + 0.3)
    setTextColor(doc, design.theme.textPrimary)

    const answerText = section.answer.trim()
    const sectionGap = design.layout.sectionSpacing + 8

    const useDropCap =
      settings.layout === 'elegant' &&
      !!settings.dropCaps &&
      answerText.length > 220

    if (useDropCap) {
      const usedHeight = drawDropCapParagraph(
        doc,
        answerText,
        answerX,
        yState.y,
        safeWidth,
        design
      )
      yState.y += usedHeight + sectionGap
    } else {
      const splitAnswer = doc.splitTextToSize(answerText, safeWidth)
      doc.text(splitAnswer, answerX, yState.y)
      yState.y += splitAnswer.length * design.layout.lineHeight + sectionGap
    }
    const sectionImage = images
  .filter((img) => img.section_id === section.id)
  .sort(
    (a, b) =>
      new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime()
  )[0]

const hasImage = !!(hasImageExportAccess && sectionImage?.image_url)

if (shouldUseCenteredPortraitLayout(section, hasImage, settings)) {
  const centerWidth = Math.min(110, metrics.contentWidth - 24)

  doc.setFont(design.font.body, 'italic')
  doc.setFontSize(design.layout.questionSize - 0.2)
  setTextColor(doc, design.theme.textSecondary)

  const splitQuestionCentered = doc.splitTextToSize(section.question, centerWidth)
  doc.text(splitQuestionCentered, metrics.centerX, yState.y + 8, {
    align: 'center',
    maxWidth: centerWidth,
  })

  yState.y += splitQuestionCentered.length * design.layout.lineHeight + 14

  doc.setFont(design.font.body, design.font.bodyStyle)
  doc.setFontSize(design.layout.answerSize + 0.5)
  setTextColor(doc, design.theme.textPrimary)

  const splitAnswerCentered = doc.splitTextToSize(section.answer.trim(), centerWidth)
  doc.text(splitAnswerCentered, metrics.centerX, yState.y, {
    align: 'center',
    maxWidth: centerWidth,
  })

  yState.y += splitAnswerCentered.length * design.layout.lineHeight + design.layout.sectionSpacing + 12
  return
} 

    if (hasImageExportAccess && sectionImage?.image_url) {
      try {
        const imgData = await loadImageAsBase64(sectionImage.image_url)

        const img = new Image()
        img.src = imgData

        await new Promise((resolve, reject) => {
          img.onload = resolve
          img.onerror = reject
        })

        const maxWidth = metrics.contentWidth
        const maxHeight = design.layout.imageMaxHeight

        let imgWidth = img.width
        let imgHeight = img.height

        const ratio = Math.min(maxWidth / imgWidth, maxHeight / imgHeight)
        imgWidth *= ratio
        imgHeight *= ratio

        if (yState.y + imgHeight > metrics.maxY) {
          doc.addPage()
          applyPageBackground(doc, design.theme.pageBg, metrics.pageWidth, metrics.pageHeight)
          if (settings.layout === 'elegant') {
            drawPageBorder(doc, settings, metrics.pageWidth, metrics.pageHeight, design.theme.border)
          }
          yState.y = metrics.marginTop
        }

        const x = (metrics.pageWidth - imgWidth) / 2

        if (design.layout.imageFrameStyle !== 'none') {
          setDrawColor(doc, design.theme.border)

          if (design.layout.imageFrameStyle === 'luxury') {
            doc.roundedRect(x - 4, yState.y - 4, imgWidth + 8, imgHeight + 8, 4, 4)
          } else {
            doc.roundedRect(x - 2, yState.y - 2, imgWidth + 4, imgHeight + 4, 2, 2)
          }
        }

        doc.addImage(imgData, 'PNG', x, yState.y, imgWidth, imgHeight)

        yState.y += imgHeight + 8

        if (settings.layout === 'elegant') {
          yState.y += 10
        } else {
          doc.setFont(design.font.body, 'italic')
doc.setFontSize(9)
setTextColor(doc, design.theme.textMuted)
doc.text(getImageCaption(section), metrics.centerX, yState.y, {
  align: 'center',
  maxWidth: 120,
})

yState.y += design.layout.imageSpacing
        }
      } catch (err) {
        console.error(err)
      }
    }

    if (
      design.layout.showSectionDividers &&
      settings.layout !== 'elegant' &&
      yState.y < metrics.maxY
    ) {
      setDrawColor(doc, design.theme.divider)
      doc.line(metrics.marginLeft, yState.y, metrics.pageWidth - metrics.marginRight, yState.y)
      yState.y += design.layout.sectionSpacing + 6
    } else {
      yState.y += design.layout.sectionSpacing + 8
    }
  }

  async function renderSpreadSection(
    doc: jsPDF,
    section: StorySection,
    settings: PdfSettings,
    images: StoryImage[],
    hasImageExportAccess: boolean,
    loadImageAsBase64: (url: string) => Promise<string>
  ) {
    const design = getPdfDesign(settings)
    const metrics = getPageMetrics(settings)

    const questionText = section.question
    const answerText = section.answer.trim()

    const sectionImage = images
      .filter((img) => img.section_id === section.id)
      .sort(
        (a, b) =>
          new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime()
      )[0]

    const hasImage = !!(hasImageExportAccess && sectionImage?.image_url)
    const useCenteredLayout = shouldUseCenteredSpreadLayout(section, hasImage)

    if (!hasImage) {
      applyPageBackground(doc, design.theme.pageBg, metrics.pageWidth, metrics.pageHeight)

      doc.setDrawColor(245, 245, 245)
      doc.line(metrics.centerX, 18, metrics.centerX, metrics.pageHeight - 18)

      if (useCenteredLayout) {
        const spreadTextWidth = 120
        const centerX = metrics.centerX
        let y = 60

        doc.setFont(design.font.body, 'italic')
        doc.setFontSize(design.layout.questionSize)
        setTextColor(doc, design.theme.textSecondary)

        const splitQuestion = doc.splitTextToSize(section.question, spreadTextWidth)
        doc.text(splitQuestion, centerX, y, {
          align: 'center',
          maxWidth: spreadTextWidth,
        })

        y += splitQuestion.length * design.layout.lineHeight + 10

        doc.setFont(design.font.body, design.font.bodyStyle)
        doc.setFontSize(design.layout.answerSize + 0.5)
        setTextColor(doc, design.theme.textPrimary)

        const splitAnswer = doc.splitTextToSize(section.answer.trim(), spreadTextWidth)
        doc.text(splitAnswer, centerX, y, {
          align: 'center',
          maxWidth: spreadTextWidth,
        })

        return
      }

      let isFirstSpreadPage = true
      let remainingAnswerLines: string[] = []

      const splitQuestion = doc.splitTextToSize(section.question, metrics.columnWidth)
      remainingAnswerLines = doc.splitTextToSize(section.answer.trim(), metrics.columnWidth)

      while (isFirstSpreadPage || remainingAnswerLines.length > 0) {
        applyPageBackground(doc, design.theme.pageBg, metrics.pageWidth, metrics.pageHeight)

        doc.setDrawColor(245, 245, 245)
        doc.line(metrics.centerX, 18, metrics.centerX, metrics.pageHeight - 18)

        let leftY = 34
        let rightY = 34

        if (isFirstSpreadPage) {
          doc.setFont(design.font.body, 'italic')
          doc.setFontSize(design.layout.questionSize - 0.3)
          setTextColor(doc, design.theme.textSecondary)

          doc.text(splitQuestion, metrics.leftX, leftY)
          leftY += splitQuestion.length * design.layout.lineHeight + 10
        }

        doc.setFont(design.font.body, design.font.bodyStyle)
        doc.setFontSize(design.layout.answerSize + 0.3)
        setTextColor(doc, design.theme.textPrimary)

        const leftAvailableHeight = metrics.maxY - leftY
        const leftLineCapacity = Math.max(
          0,
          Math.floor(leftAvailableHeight / design.layout.lineHeight)
        )

        const leftLines = remainingAnswerLines.slice(0, leftLineCapacity)
        remainingAnswerLines = remainingAnswerLines.slice(leftLineCapacity)

        if (leftLines.length) {
          doc.text(leftLines, metrics.leftX, leftY)
        }

        const rightAvailableHeight = metrics.maxY - rightY
        const rightLineCapacity = Math.max(
          0,
          Math.floor(rightAvailableHeight / design.layout.lineHeight)
        )

        const rightLines = remainingAnswerLines.slice(0, rightLineCapacity)
        remainingAnswerLines = remainingAnswerLines.slice(rightLineCapacity)

        if (rightLines.length) {
          doc.text(rightLines, metrics.rightX, rightY)
        }

        isFirstSpreadPage = false

        if (remainingAnswerLines.length > 0) {
          doc.addPage()
        }
      }

      return
    }

    let isFirstSpreadPage = true
    let remainingAnswerLines: string[] = []

    const splitQuestion = doc.splitTextToSize(questionText, metrics.columnWidth)
    remainingAnswerLines = doc.splitTextToSize(answerText, metrics.columnWidth)

    let imageRendered = false

    while (isFirstSpreadPage || remainingAnswerLines.length > 0) {
      applyPageBackground(doc, design.theme.pageBg, metrics.pageWidth, metrics.pageHeight)

      doc.setDrawColor(245, 245, 245)
      doc.line(metrics.centerX, 18, metrics.centerX, metrics.pageHeight - 18)

      let leftY = 28
      let rightY = 32

      if (isFirstSpreadPage) {
        doc.setFont(design.font.body, 'italic')
        doc.setFontSize(design.layout.questionSize - 0.5)
        setTextColor(doc, design.theme.textSecondary)

        doc.text(splitQuestion, metrics.leftX, leftY)
        leftY += splitQuestion.length * design.layout.lineHeight + design.layout.questionSpacing
      }

      doc.setFont(design.font.body, design.font.bodyStyle)
      doc.setFontSize(design.layout.answerSize + 0.3)
      setTextColor(doc, design.theme.textPrimary)

      const leftAvailableHeight = metrics.maxY - leftY
      const leftLineCapacity = Math.max(
        0,
        Math.floor(leftAvailableHeight / design.layout.lineHeight)
      )

      const leftLines = remainingAnswerLines.slice(0, leftLineCapacity)
      remainingAnswerLines = remainingAnswerLines.slice(leftLineCapacity)

      if (leftLines.length) {
        doc.text(leftLines, metrics.leftX, leftY)
      }

      if (!imageRendered && hasImageExportAccess && sectionImage?.image_url) {
        try {
          const imgData = await loadImageAsBase64(sectionImage.image_url)

          const img = new Image()
          img.src = imgData

          await new Promise((resolve, reject) => {
            img.onload = resolve
            img.onerror = reject
          })

          const maxWidth = metrics.columnWidth
          const maxHeight =
            settings.layout === 'elegant'
              ? 100
              : settings.layout === 'minimal'
                ? 82
                : 88

          let imgWidth = img.width
          let imgHeight = img.height

          const ratio = Math.min(maxWidth / imgWidth, maxHeight / imgHeight)
          imgWidth *= ratio
          imgHeight *= ratio

          const imageX = metrics.rightX + (metrics.columnWidth - imgWidth) / 2

          if (design.layout.imageFrameStyle !== 'none') {
            setDrawColor(doc, design.theme.border)

            if (design.layout.imageFrameStyle === 'luxury') {
              doc.roundedRect(imageX - 4, rightY - 4, imgWidth + 8, imgHeight + 8, 4, 4)
            } else {
              doc.roundedRect(imageX - 2, rightY - 2, imgWidth + 4, imgHeight + 4, 2, 2)
            }
          }

          doc.addImage(imgData, 'PNG', imageX, rightY, imgWidth, imgHeight)
          rightY += imgHeight + design.layout.imageSpacing
          imageRendered = true
        } catch (err) {
          console.error(err)
        }
      }

      const rightAvailableHeight = metrics.maxY - rightY
      const rightLineCapacity = Math.max(
        0,
        Math.floor(rightAvailableHeight / design.layout.lineHeight)
      )

      const rightLines = remainingAnswerLines.slice(0, rightLineCapacity)
      remainingAnswerLines = remainingAnswerLines.slice(rightLineCapacity)

      if (rightLines.length) {
        doc.setFont(design.font.body, design.font.bodyStyle)
        doc.setFontSize(design.layout.answerSize + 0.3)
        setTextColor(doc, design.theme.textPrimary)
        doc.text(rightLines, metrics.rightX, rightY)
      }

      isFirstSpreadPage = false

      if (remainingAnswerLines.length > 0) {
        doc.addPage()
      }
    }
  }

  function renderClosingPage(doc: jsPDF, settings: PdfSettings) {
    const design = getPdfDesign(settings)
    const metrics = getPageMetrics(settings)

    doc.addPage()
    applyPageBackground(doc, design.theme.secondaryBg, metrics.pageWidth, metrics.pageHeight)

    if (settings.layout === 'elegant') {
      drawPageBorder(doc, settings, metrics.pageWidth, metrics.pageHeight, design.theme.border)
    }

    doc.setFont(design.font.title, design.font.accentStyle)
    doc.setFontSize(20)
    setTextColor(doc, design.theme.textPrimary)
    doc.text('A story worth keeping', metrics.centerX, 118, { align: 'center' })

    if (settings.layout === 'elegant') {
      drawElegantDivider(doc, settings, metrics.centerX, 128, 36, design)
    } else {
      setDrawColor(doc, design.theme.divider)
      doc.line(72, 128, 138, 128)
    }

    doc.setFont(design.font.body, design.font.bodyStyle)
doc.setFontSize(12)
setTextColor(doc, design.theme.textSecondary)
doc.text(
  'This story was created to be remembered, shared, and held onto for generations.',
  metrics.centerX,
  145,
  { align: 'center', maxWidth: 125 }
)
if (settings.layout === 'elegant') {
  drawDoubleDivider(doc, metrics.centerX, 168, 30, design.theme.border)
}
  }

  async function exportWord({ project, sections }: ExportWordArgs) {
    const storyTitle = project?.title || 'Tell Me Your Story'
    const children: Paragraph[] = []

    const printableSections = sections.filter(
      (section) => section.answer && section.answer.trim().length > 0
    )

    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: storyTitle,
            bold: true,
            size: 32,
          }),
        ],
      })
    )

    children.push(new Paragraph(''))

    printableSections.forEach((section) => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: section.question,
              bold: true,
            }),
          ],
        })
      )

      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: section.answer?.trim() || '',
            }),
          ],
        })
      )

      children.push(new Paragraph(''))
    })

    const doc = new Document({
      sections: [
        {
          children,
        },
      ],
    })

    const blob = await Packer.toBlob(doc)
    saveAs(blob, `${storyTitle}.docx`)
  }

  async function exportPdf({
    project,
    sections,
    settings,
    hasTier4Access,
    hasImageExportAccess,
    coverImageUrl,
    getAllImagesForExport,
    loadImageAsBase64,
  }: ExportPdfArgs) {
    const activeSettings: PdfSettings = hasTier4Access
      ? settings
      : {
          layout: 'classic',
          font: 'serif',
          theme: 'warm',
          orientation: 'portrait',
          includeCoverImage: hasImageExportAccess,
          includeDedication: false,
          printReady: false,
          borderStyle: 'none',
          dividerStyle: 'soft-line',
          chapterStyle: 'standard',
          ornamentStyle: 'none',
          dropCaps: false,
        }

    const design = getPdfDesign(activeSettings)
    const metrics = getPageMetrics(activeSettings)

    const doc = new jsPDF({
      orientation: activeSettings.orientation === 'landscape-spread' ? 'l' : 'p',
      unit: 'mm',
      format: 'a4',
    })

    const storyTitle = project?.title || 'Tell Me Your Story'
    const storySubtitle = getStorySubtitle(project)

    const printableSections = sections.filter(
      (section) => section.answer && section.answer.trim().length > 0
    )

    const usedQuotes = new Set<string>()

    await renderCoverPage(
      doc,
      storyTitle,
      storySubtitle,
      activeSettings,
      coverImageUrl,
      hasTier4Access,
      loadImageAsBase64
    )

    if (activeSettings.includeDedication && hasTier4Access) {
      renderDedicationPage(doc, activeSettings)
    }

    const images = await getAllImagesForExport()

    let currentChapter = ''
    let chapterIndex = -1

    if (activeSettings.orientation === 'portrait') {
      const yState = { y: metrics.marginTop }

      for (let index = 0; index < printableSections.length; index++) {
        const section = printableSections[index]

        if (section.chapter && section.chapter !== currentChapter) {
          currentChapter = section.chapter
          chapterIndex += 1

          doc.addPage()
          renderChapterHeading(doc, currentChapter, chapterIndex, activeSettings)

          doc.addPage()
          applyPageBackground(doc, design.theme.secondaryBg, metrics.pageWidth, metrics.pageHeight)
          if (activeSettings.layout === 'elegant') {
            drawPageBorder(doc, activeSettings, metrics.pageWidth, metrics.pageHeight, design.theme.border)
          }
          doc.setFont(design.font.body, 'italic')
doc.setFontSize(13)
setTextColor(doc, design.theme.textMuted)

if (activeSettings.layout === 'elegant') {
  drawSmallOrnament(doc, metrics.centerX, metrics.pageHeight / 2 - 16, design.theme.accent)
}

doc.text(
  'Take a moment to reflect on what comes next…',
  metrics.centerX,
  metrics.pageHeight / 2,
  { align: 'center' }
)

if (activeSettings.layout === 'elegant') {
  drawDoubleDivider(doc, metrics.centerX, metrics.pageHeight / 2 + 14, 24, design.theme.border)
}

          doc.addPage()
          applyPageBackground(doc, design.theme.pageBg, metrics.pageWidth, metrics.pageHeight)
          if (activeSettings.layout === 'elegant') {
            drawPageBorder(doc, activeSettings, metrics.pageWidth, metrics.pageHeight, design.theme.border)
          }
          yState.y = metrics.marginTop
        }

        const insertedQuotePage = shouldInsertQuotePage(index, printableSections.length)

        if (insertedQuotePage) {
  const quote = getPreferredQuoteWithoutRepeats(printableSections, index, usedQuotes)
  if (quote) {
    renderQuotePage(doc, quote, activeSettings)

    doc.addPage()
    applyPageBackground(doc, design.theme.pageBg, metrics.pageWidth, metrics.pageHeight)
    if (activeSettings.layout === 'elegant') {
      drawPageBorder(doc, activeSettings, metrics.pageWidth, metrics.pageHeight, design.theme.border)
    }
    yState.y = metrics.marginTop
  }
}

        if (!insertedQuotePage && index > 0 && index % 2 === 0) {
          doc.addPage()
          applyPageBackground(doc, design.theme.pageBg, metrics.pageWidth, metrics.pageHeight)
          if (activeSettings.layout === 'elegant') {
            drawPageBorder(doc, activeSettings, metrics.pageWidth, metrics.pageHeight, design.theme.border)
          }
          yState.y = metrics.marginTop
        }

        await renderPortraitSection(
          doc,
          section,
          activeSettings,
          images,
          yState,
          hasImageExportAccess,
          loadImageAsBase64
        )
      }
    } else {
      for (let index = 0; index < printableSections.length; index++) {
        const section = printableSections[index]

        if (section.chapter && section.chapter !== currentChapter) {
          currentChapter = section.chapter
          chapterIndex += 1

          doc.addPage()
          renderChapterHeading(doc, currentChapter, chapterIndex, activeSettings)
        }

       if (shouldInsertQuotePage(index, printableSections.length)) {
  const quote = getPreferredQuoteWithoutRepeats(printableSections, index, usedQuotes)
  if (quote) {
    renderQuotePage(doc, quote, activeSettings)
  }
}

        doc.addPage()
        await renderSpreadSection(
          doc,
          section,
          activeSettings,
          images,
          hasImageExportAccess,
          loadImageAsBase64
        )
      }
    }

    renderClosingPage(doc, activeSettings)

    const totalPages = doc.getNumberOfPages()

    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i)
      addFooter(
        doc,
        i,
        storyTitle,
        design.theme.textMuted,
        metrics.pageWidth,
        metrics.pageHeight,
        activeSettings
      )
    }

    doc.save(`${sanitizeFileName(storyTitle)}.pdf`)
  }

  return {
    exportPdf,
    exportWord,
    sanitizeFileName,
    applyPageBackground,
    setTextColor,
    setDrawColor,
  }
}