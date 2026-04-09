import jsPDF from 'jspdf'
import { Document, Packer, Paragraph, TextRun } from 'docx'
import { saveAs } from 'file-saver'
import type { PdfSettings, StoryImage, StoryProject, StorySection } from '../types/story'
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

  if (cleaned.length <= maxLength) {
    return cleaned
  }

  const shortened = cleaned.slice(0, maxLength)
  const lastSpace = shortened.lastIndexOf(' ')

  return `${shortened.slice(0, lastSpace > 0 ? lastSpace : maxLength)}…`
}

function shouldInsertQuotePage(index: number) {
  return index > 0 && index % 5 === 0
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

    doc.setFontSize(settings.printReady ? 9 : 9)
    doc.text(`${pageNumber}`, pageWidth / 2, pageHeight - (settings.printReady ? 12 : 10), {
      align: 'center',
    })
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

    if (design.layout.coverFrame && settings.orientation === 'portrait') {
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

    setDrawColor(doc, design.theme.divider)
    doc.line(
      55,
      shouldShowCoverImage ? 188 : 100,
      155,
      shouldShowCoverImage ? 188 : 100
    )

    doc.setFont(design.font.body, 'normal')
    doc.setFontSize(design.layout.subtitleSize)
    setTextColor(doc, design.theme.textSecondary)
    const subtitleY = shouldShowCoverImage ? 200 : 114
    doc.text(storySubtitle, metrics.centerX, subtitleY, { align: 'center', maxWidth: 130 })

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

    doc.text(dedication, metrics.centerX, 140, {
      align: 'center',
      maxWidth: 140,
    })
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

  if (settings.orientation === 'landscape-spread') {
  // center divider (book fold)
  setDrawColor(doc, design.theme.divider)
  doc.line(metrics.centerX, 18, metrics.centerX, metrics.pageHeight - 18)

  const leftCenter = metrics.leftX + metrics.columnWidth / 2
  const rightCenter = metrics.rightX + metrics.columnWidth / 2

  // ===== LABEL (BOTH PAGES)
  doc.setFont(design.font.body, 'normal')
  doc.setFontSize(10)
  setTextColor(doc, design.theme.textMuted)

  doc.text('A memory worth keeping', leftCenter, 60, { align: 'center' })
  doc.text('A memory worth keeping', rightCenter, 60, { align: 'center' })

  // ===== DIVIDER LINES (BOTH PAGES)
  setDrawColor(doc, design.theme.divider)

  doc.line(leftCenter - 35, 110, leftCenter + 35, 110)
  doc.line(rightCenter - 35, 110, rightCenter + 35, 110)

  // ===== QUOTE (CENTERED ACROSS BOTH PAGES)
  doc.setFont(design.font.title, design.font.accentStyle)
  doc.setFontSize(18)
  setTextColor(doc, design.theme.textPrimary)

  const cleanQuote = `“${quote}”`
  const splitQuote = doc.splitTextToSize(cleanQuote, 140)

  doc.text(splitQuote, metrics.centerX, 145, {
    align: 'center',
  })

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

  if (settings.orientation === 'landscape-spread') {
    setDrawColor(doc, design.theme.divider)
    doc.line(metrics.centerX, 18, metrics.centerX, metrics.pageHeight - 18)

    doc.setFont(design.font.body, 'normal')
    doc.setFontSize(10)
    setTextColor(doc, design.theme.textMuted)
    doc.text(chapterLabel, metrics.rightX + metrics.columnWidth / 2, 56, {
      align: 'center',
    })

    doc.setFont(design.font.title, design.font.titleStyle)
    doc.setFontSize(design.layout.chapterTitleSize + 2)
    setTextColor(doc, design.theme.textPrimary)
    doc.text(chapterTitle, metrics.rightX + metrics.columnWidth / 2, 76, {
      align: 'center',
      maxWidth: metrics.columnWidth - 16,
    })

    setDrawColor(doc, design.theme.divider)
    doc.line(metrics.rightX + 14, 86, metrics.rightX + metrics.columnWidth - 14, 86)

    doc.setFont(design.font.body, design.font.accentStyle)
doc.setFontSize(12)
doc.setTextColor(120, 120, 120)

const introWidth = metrics.columnWidth - 24
const splitIntro = doc.splitTextToSize(intro, introWidth)

doc.text(
  splitIntro,
  metrics.rightX + metrics.columnWidth / 2,
  140,
  {
    align: 'center',
    maxWidth: introWidth,
  }
)

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
      yState.y = metrics.marginTop
    }

    doc.setFont(design.font.body, 'italic')
    doc.setFontSize(design.layout.questionSize - 0.5)
    setTextColor(doc, design.theme.textSecondary)


    
    const questionText = section.question
    const safeWidth = metrics.contentWidth - 4
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
   const splitAnswer = doc.splitTextToSize(answerText, safeWidth)
    doc.text(splitAnswer, answerX, yState.y)

    const sectionGap = design.layout.sectionSpacing + 8
    yState.y += splitAnswer.length * design.layout.lineHeight + sectionGap

    const sectionImage = images
      .filter((img) => img.section_id === section.id)
      .sort(
        (a, b) =>
          new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime()
      )[0]

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

// move below the image first
yState.y += imgHeight + 8

doc.setFontSize(10)
doc.setTextColor(140, 140, 140)
doc.text('A moment captured in time', metrics.centerX, yState.y, {
  align: 'center',
})

// add spacing after caption
yState.y += design.layout.imageSpacing
      } catch (err) {
        console.error(err)
      }
    }

    if (design.layout.showSectionDividers && yState.y < metrics.maxY) {
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

    let isFirstSpreadPage = true
    let remainingAnswerLines: string[] = []

    const questionText = section.question
    const answerText = section.answer.trim()

    const splitQuestion = doc.splitTextToSize(questionText, metrics.columnWidth)
    remainingAnswerLines = doc.splitTextToSize(answerText, metrics.columnWidth)

    const sectionImage = images
      .filter((img) => img.section_id === section.id)
      .sort(
        (a, b) =>
          new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime()
      )[0]

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
        leftY += leftLines.length * design.layout.lineHeight
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
        rightY += rightLines.length * design.layout.lineHeight
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

    doc.setFont(design.font.title, design.font.accentStyle)
doc.setFontSize(20)
setTextColor(doc, design.theme.textPrimary)
doc.text('A story worth keeping', metrics.centerX, 118, { align: 'center' })

setDrawColor(doc, design.theme.divider)
doc.line(72, 128, 138, 128)

doc.setFont(design.font.body, design.font.bodyStyle)
doc.setFontSize(12)
setTextColor(doc, design.theme.textSecondary)
doc.text(
  'Created with love, to be remembered and shared for years to come.',
  metrics.centerX,
  145,
  { align: 'center', maxWidth: 125 }
)
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

    doc.addPage()
    applyPageBackground(doc, design.theme.pageBg, metrics.pageWidth, metrics.pageHeight)

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

// NEW: add breathing page
doc.addPage()
applyPageBackground(doc, design.theme.secondaryBg, metrics.pageWidth, metrics.pageHeight)

// optional small quote or empty page
doc.setFontSize(14)
doc.setTextColor(120, 120, 120)
doc.text('Take a moment to reflect on what comes next…', metrics.centerX, metrics.pageHeight / 2, {
  align: 'center',
})

  // start story content on a fresh page
  doc.addPage()
  applyPageBackground(doc, design.theme.pageBg, metrics.pageWidth, metrics.pageHeight)
  yState.y = metrics.marginTop
}

    if (shouldInsertQuotePage(index)) {
      const quote = getQuoteFromAnswer(printableSections[index - 1]?.answer || '')
      if (quote) {
        renderQuotePage(doc, quote, activeSettings)

        // start the next story content on a fresh normal page
    doc.addPage()
    applyPageBackground(doc, design.theme.pageBg, metrics.pageWidth, metrics.pageHeight)
    yState.y = metrics.marginTop
      }      
    }
    const justInsertedQuotePage = shouldInsertQuotePage(index)

if (justInsertedQuotePage) {
  const quote = getQuoteFromAnswer(printableSections[index - 1]?.answer || '')
  if (quote) {
    renderQuotePage(doc, quote, activeSettings)

    // always reset to a clean content page after a quote
    doc.addPage()
    applyPageBackground(doc, design.theme.pageBg, metrics.pageWidth, metrics.pageHeight)
    yState.y = metrics.marginTop
  }
}


if (!justInsertedQuotePage && index > 0 && index % 2 === 0) {
  doc.addPage()
  applyPageBackground(doc, design.theme.pageBg, metrics.pageWidth, metrics.pageHeight)
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

    if (shouldInsertQuotePage(index)) {
      const quote = getQuoteFromAnswer(printableSections[index - 1]?.answer || '')
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