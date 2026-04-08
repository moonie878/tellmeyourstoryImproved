import type { PdfSettings } from '../types/story'

export function getDefaultPdfSettings(): PdfSettings {
  return {
    layout: 'classic',
    font: 'serif',
    theme: 'warm',
    orientation: 'portrait',
    includeCoverImage: true,
    includeDedication: true,
    printReady: false,
  }
}

export function getPdfDesign(settings: PdfSettings) {
  const themeMap = {
    warm: {
      pageBg: [247, 242, 235],
      secondaryBg: [252, 250, 247],
      textPrimary: [40, 40, 40],
      textSecondary: [95, 95, 95],
      textMuted: [130, 130, 130],
      border: [210, 205, 198],
      divider: [225, 220, 214],
    },
    neutral: {
      pageBg: [255, 255, 255],
      secondaryBg: [248, 248, 248],
      textPrimary: [35, 35, 35],
      textSecondary: [90, 90, 90],
      textMuted: [140, 140, 140],
      border: [220, 220, 220],
      divider: [230, 230, 230],
    },
    'dark-ink': {
      pageBg: [245, 245, 244],
      secondaryBg: [237, 237, 235],
      textPrimary: [25, 25, 28],
      textSecondary: [70, 70, 75],
      textMuted: [120, 120, 125],
      border: [200, 200, 205],
      divider: [215, 215, 220],
    },
  } as const

  const fontMap = {
    serif: {
      title: 'times',
      body: 'times',
      titleStyle: 'bold',
      questionStyle: 'bold',
      bodyStyle: 'normal',
      accentStyle: 'italic',
    },
    clean: {
      title: 'helvetica',
      body: 'helvetica',
      titleStyle: 'bold',
      questionStyle: 'bold',
      bodyStyle: 'normal',
      accentStyle: 'normal',
    },
    bookish: {
      title: 'times',
      body: 'times',
      titleStyle: 'bolditalic',
      questionStyle: 'italic',
      bodyStyle: 'normal',
      accentStyle: 'italic',
    },
  } as const

  const layoutMap = {
    classic: {
      coverFrame: true,
      chapterCentered: true,
      questionSize: 13,
      answerSize: 11,
      titleSize: 24,
      subtitleSize: 13,
      chapterTitleSize: 20,
      lineHeight: 6.4,
      questionSpacing: 8,
      sectionSpacing: 10,
      imageSpacing: 12,
      imageMaxHeight: 120,
      dividerWidth: 110,
      showSectionDividers: true,
      questionStyle: 'bold',
      imageFrameStyle: 'soft',
    },
    minimal: {
      coverFrame: false,
      chapterCentered: false,
      questionSize: 12,
      answerSize: 10,
      titleSize: 26,
      subtitleSize: 12,
      chapterTitleSize: 17,
      lineHeight: 5.2,
      questionSpacing: 6,
      sectionSpacing: 7,
      imageSpacing: 10,
      imageMaxHeight: 95,
      dividerWidth: 70,
      showSectionDividers: false,
      questionStyle: 'italic',
      imageFrameStyle: 'none',
    },
    elegant: {
      coverFrame: true,
      chapterCentered: true,
      questionSize: 13,
      answerSize: 11.5,
      titleSize: 30,
      subtitleSize: 13,
      chapterTitleSize: 22,
      lineHeight: 6.8,
      questionSpacing: 10,
      sectionSpacing: 16,
      imageSpacing: 16,
      imageMaxHeight: 130,
      dividerWidth: 120,
      showSectionDividers: true,
      questionStyle: 'italic',
      imageFrameStyle: 'luxury',
    },
  } as const

  const baseLayout = layoutMap[settings.layout]

  const adjustedLayout = settings.printReady
    ? {
        ...baseLayout,
        lineHeight: baseLayout.lineHeight + 0.3,
        sectionSpacing: baseLayout.sectionSpacing + 2,
        questionSize: baseLayout.questionSize - 0.2,
        answerSize: baseLayout.answerSize - 0.2,
        imageMaxHeight: baseLayout.imageMaxHeight - 10,
      }
    : baseLayout

  return {
    theme: themeMap[settings.theme],
    font: fontMap[settings.font],
    layout: adjustedLayout,
  }
}

export function getPageMetrics(settings: PdfSettings) {
  const isLandscapeSpread = settings.orientation === 'landscape-spread'

  if (isLandscapeSpread) {
    const spreadMap = {
      classic: {
        leftX: 18,
        rightX: 153,
        columnWidth: 126,
      },
      minimal: {
        leftX: 14,
        rightX: 149,
        columnWidth: 132,
      },
      elegant: {
        leftX: 22,
        rightX: 159,
        columnWidth: 116,
      },
    } as const

    const spread = spreadMap[settings.layout]

    return {
      pageWidth: 297,
      pageHeight: 210,
      marginTop: 22,
      marginBottom: 18,
      marginLeft: 20,
      marginRight: 20,
      contentWidth: 257,
      maxY: 182,
      centerX: 148.5,
      leftX: spread.leftX,
      rightX: spread.rightX,
      columnWidth: spread.columnWidth,
      isLandscapeSpread: true,
    }
  }

  const portraitMap = settings.printReady
    ? {
        classic: {
          marginLeft: 30,
          marginRight: 24,
          contentWidth: 152,
        },
        minimal: {
          marginLeft: 28,
          marginRight: 26,
          contentWidth: 150,
        },
        elegant: {
          marginLeft: 26,
          marginRight: 24,
          contentWidth: 156,
        },
      }
    : {
        classic: {
          marginLeft: 22,
          marginRight: 22,
          contentWidth: 166,
        },
        minimal: {
          marginLeft: 30,
          marginRight: 30,
          contentWidth: 150,
        },
        elegant: {
          marginLeft: 24,
          marginRight: 26,
          contentWidth: 158,
        },
      }

  const portrait = portraitMap[settings.layout]

  return {
    pageWidth: 210,
    pageHeight: 297,
    marginTop: settings.printReady ? 34 : 30,
    marginBottom: settings.printReady ? 24 : 20,
    marginLeft: portrait.marginLeft,
    marginRight: portrait.marginRight,
    contentWidth: portrait.contentWidth,
    maxY: settings.printReady ? 262 : 270,
    centerX: 105,
    leftX: portrait.marginLeft,
    rightX: portrait.marginLeft,
    columnWidth: portrait.contentWidth,
    isLandscapeSpread: false,
  }
}