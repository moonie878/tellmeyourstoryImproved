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

  function addFooter(
    doc: jsPDF,
    pageNumber: number,
    pageCount: number,
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

      if (pageNumber > 1) {
        doc.setFontSize(9)
        doc.text(storyTitle, leftCenter, 14, { align: 'center' })
        doc.text(storyTitle, rightCenter, 14, { align: 'center' })
      }

      doc.setFontSize(10)
      doc.text(`${leftPageNumber}`, leftCenter, pageHeight - 10, {
        align: 'center',
      })
      doc.text(`${rightPageNumber}`, rightCenter, pageHeight - 10, {
        align: 'center',
      })

      return
    }

    if (pageNumber > 1) {
      doc.setFontSize(settings.printReady ? 9 : 10)
      doc.text(
        storyTitle,
        pageWidth / 2,
        settings.printReady ? 12 : 14,
        { align: 'center' }
      )
    }

    doc.setFontSize(settings.printReady ? 9 : 10)
    doc.text(
      settings.printReady ? `${pageNumber}` : `Page ${pageNumber} of ${pageCount}`,
      pageWidth / 2,
      pageHeight - (settings.printReady ? 12 : 10),
      { align: 'center' }
    )
  }

  async function renderCoverPage(
    doc: jsPDF,
    storyTitle: string,
    storyType: string,
    settings: PdfSettings,
    coverImageUrl: string,
    hasTier4Access: boolean,
    loadImageAsBase64: (url: string) => Promise<string>
  ) {
    const design = getPdfDesign(settings)
    const metrics = getPageMetrics(settings)
    const storySubtitle = `A story of ${storyType}'s life`

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
      doc.text(splitSubtitle, 38, 98)

      setDrawColor(doc, design.theme.divider)
      doc.line(metrics.centerX, 18, metrics.centerX, metrics.pageHeight - 18)

      doc.setFontSize(10)
      setTextColor(doc, design.theme.textMuted)
      doc.text(`Created on ${new Date().toLocaleDateString()}`, 38, 165)
      doc.text(`Story type: ${storyType}`, 38, 173)
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
    doc.text(
      storySubtitle,
      metrics.centerX,
      shouldShowCoverImage ? 200 : 114,
      { align: 'center' }
    )

    doc.setFontSize(11)
    setTextColor(doc, design.theme.textMuted)
    doc.text(`Created on ${new Date().toLocaleDateString()}`, metrics.centerX, 238, {
      align: 'center',
    })
    doc.text(`Story type: ${storyType}`, metrics.centerX, 246, { align: 'center' })
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

  function renderChapterHeading(
    doc: jsPDF,
    chapterTitle: string,
    y: number,
    settings: PdfSettings
  ) {
    const design = getPdfDesign(settings)
    const metrics = getPageMetrics(settings)

    doc.setFont(design.font.title, design.font.titleStyle)
    doc.setFontSize(design.layout.chapterTitleSize)
    setTextColor(doc, design.theme.textPrimary)

    if (settings.orientation === 'landscape-spread') {
      const chapterX = metrics.rightX + metrics.columnWidth / 2

      if (settings.layout === 'minimal') {
        doc.text(chapterTitle, metrics.rightX, y + 10)
        setDrawColor(doc, design.theme.divider)
        doc.line(metrics.rightX, y + 16, metrics.rightX + 70, y + 16)
        return
      }

      doc.text(chapterTitle, chapterX, y + 10, { align: 'center' })

      setDrawColor(doc, design.theme.divider)
      doc.line(metrics.rightX, y + 16, metrics.rightX + metrics.columnWidth, y + 16)

      if (settings.printReady && settings.layout === 'elegant') {
        doc.setFont(design.font.body, design.font.accentStyle)
        doc.setFontSize(11)
        setTextColor(doc, design.theme.textMuted)
        doc.text('A new chapter of memories', metrics.centerX, y + 22, {
          align: 'center',
        })
      }

      return
    }

    if (settings.printReady) {
      doc.setFontSize(20)
      setTextColor(doc, design.theme.textMuted)
      doc.text('Chapter', metrics.centerX, y - 12, { align: 'center' })
    }

    doc.setFont(design.font.title, design.font.titleStyle)
    doc.setFontSize(design.layout.chapterTitleSize)
    setTextColor(doc, design.theme.textPrimary)
    doc.text(chapterTitle, metrics.centerX, y, { align: 'center' })

    setDrawColor(doc, design.theme.divider)
    const dividerY = settings.printReady ? y + 10 : y + 5
    doc.line(50, dividerY, 160, dividerY)
  }

  async function renderPortraitSection(
    doc: jsPDF,
    section: StorySection,
    index: number,
    settings: PdfSettings,
    images: StoryImage[],
    yState: { y: number },
    hasImageExportAccess: boolean,
    loadImageAsBase64: (url: string) => Promise<string>
  ) {
    const design = getPdfDesign(settings)
    const metrics = getPageMetrics(settings)

    if (yState.y > 240) {
      doc.addPage()
      applyPageBackground(doc, design.theme.pageBg, metrics.pageWidth, metrics.pageHeight)
      yState.y = metrics.marginTop
    }

    doc.setFont(design.font.body, design.layout.questionStyle)
    doc.setFontSize(design.layout.questionSize)
    setTextColor(doc, design.theme.textPrimary)

    const questionText = `${index + 1}. ${section.question}`
    const splitQuestion = doc.splitTextToSize(questionText, metrics.contentWidth)
    const answerX =
      settings.printReady && settings.layout === 'classic'
        ? metrics.marginLeft + 2
        : settings.printReady
          ? metrics.marginLeft + 3
          : metrics.marginLeft + 2

    const questionGap = settings.printReady ? 6 : 4
    doc.text(splitQuestion, answerX, yState.y)
    yState.y += splitQuestion.length * design.layout.lineHeight + questionGap

    doc.setFont(design.font.body, design.font.bodyStyle)
    doc.setFontSize(design.layout.answerSize)
    setTextColor(doc, design.theme.textSecondary)

    const answerText = section.answer?.trim() || 'No answer provided.'
    const splitAnswer = doc.splitTextToSize(answerText, metrics.contentWidth)
    doc.text(splitAnswer, answerX, yState.y)

    const sectionGap = settings.printReady
      ? design.layout.sectionSpacing + 2
      : design.layout.sectionSpacing

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
        yState.y += imgHeight + design.layout.imageSpacing
      } catch (err) {
        console.error(err)
      }
    }

    if (design.layout.showSectionDividers && yState.y < metrics.maxY) {
      setDrawColor(doc, design.theme.divider)
      doc.line(metrics.marginLeft, yState.y, metrics.pageWidth - metrics.marginRight, yState.y)
      yState.y += design.layout.sectionSpacing
    } else {
      yState.y += settings.printReady
        ? design.layout.sectionSpacing + 2
        : design.layout.sectionSpacing
    }
  }

  async function renderSpreadSection(
    doc: jsPDF,
    section: StorySection,
    index: number,
    settings: PdfSettings,
    images: StoryImage[],
    hasImageExportAccess: boolean,
    loadImageAsBase64: (url: string) => Promise<string>
  ) {
    const design = getPdfDesign(settings)
    const metrics = getPageMetrics(settings)

    let isFirstSpreadPage = true
    let remainingAnswerLines: string[] = []

    const questionText = `${index + 1}. ${section.question}`
    const answerText = section.answer?.trim() || 'No answer provided.'

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
        doc.setFont(design.font.body, design.layout.questionStyle)
        doc.setFontSize(design.layout.questionSize)
        setTextColor(doc, design.theme.textPrimary)

        doc.text(splitQuestion, metrics.leftX, leftY)
        leftY += splitQuestion.length * design.layout.lineHeight + design.layout.questionSpacing
      }

      doc.setFont(design.font.body, design.font.bodyStyle)
      doc.setFontSize(design.layout.answerSize)
      setTextColor(doc, design.theme.textSecondary)

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
        doc.setFontSize(design.layout.answerSize)
        setTextColor(doc, design.theme.textSecondary)
        doc.text(rightLines, metrics.rightX, rightY)
        rightY += rightLines.length * design.layout.lineHeight
      }

      isFirstSpreadPage = false

      if (remainingAnswerLines.length > 0) {
        doc.addPage()
      }
    }
  }

  async function exportWord({ project, sections }: ExportWordArgs) {
    const storyTitle = project?.title || 'Tell Me Your Story'
    const children: Paragraph[] = []

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

    sections.forEach((section, index) => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `${index + 1}. ${section.question}`,
              bold: true,
            }),
          ],
        })
      )

      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: section.answer || 'No answer provided.',
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
    const storyType = project?.story_type || 'story'

    await renderCoverPage(
      doc,
      storyTitle,
      storyType,
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

    if (activeSettings.orientation === 'portrait') {
      const yState = { y: metrics.marginTop }

      doc.setFont(design.font.title, design.font.titleStyle)
      doc.setFontSize(20)
      setTextColor(doc, design.theme.textPrimary)
      doc.text(storyTitle, metrics.marginLeft, yState.y)
      yState.y += 15

      for (let index = 0; index < sections.length; index++) {
        const section = sections[index]

        if (section.chapter && section.chapter !== currentChapter) {
          currentChapter = section.chapter

          doc.addPage()
          applyPageBackground(doc, design.theme.pageBg, metrics.pageWidth, metrics.pageHeight)
          yState.y = metrics.marginTop

          const chapterStartY = activeSettings.printReady ? 60 : 50

          renderChapterHeading(doc, currentChapter, chapterStartY, activeSettings)

          yState.y = activeSettings.printReady
            ? chapterStartY + 30
            : chapterStartY + 20
        }

        await renderPortraitSection(
          doc,
          section,
          index,
          activeSettings,
          images,
          yState,
          hasImageExportAccess,
          loadImageAsBase64
        )
      }
    } else {
      for (let index = 0; index < sections.length; index++) {
        const section = sections[index]

        if (section.chapter && section.chapter !== currentChapter) {
          currentChapter = section.chapter
          doc.addPage()
          applyPageBackground(doc, design.theme.pageBg, metrics.pageWidth, metrics.pageHeight)
          renderChapterHeading(doc, currentChapter, 36, activeSettings)
        }

        doc.addPage()
        await renderSpreadSection(
          doc,
          section,
          index,
          activeSettings,
          images,
          hasImageExportAccess,
          loadImageAsBase64
        )
      }
    }

    const pageCount = doc.getNumberOfPages()

    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i)
      addFooter(
        doc,
        i,
        pageCount,
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