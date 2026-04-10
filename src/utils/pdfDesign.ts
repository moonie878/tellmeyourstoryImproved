import type { PdfSettings } from '../types/story'

export function getDefaultPdfSettings(): PdfSettings {
  return {
    layout: 'elegant',
    font: 'serif',
    theme: 'warm',
    orientation: 'portrait',
    includeCoverImage: true,
    includeDedication: true,
    printReady: false,
    borderStyle: 'fine-line',
    dividerStyle: 'flourish',
    chapterStyle: 'flourish',
    ornamentStyle: 'none',
    dropCaps: true,
  }
}

export function getPdfDesign(settings: PdfSettings) {
  const themeMap = {
    warm: {
      pageBg: [248, 244, 239],
      secondaryBg: [252, 249, 245],
      textPrimary: [38, 34, 32],
      textSecondary: [92, 84, 78],
      textMuted: [140, 132, 126],
      border: [221, 214, 206],
      divider: [224, 215, 203],
      accent: [148, 116, 74],
    },
    neutral: {
      pageBg: [255, 255, 255],
      secondaryBg: [248, 248, 248],
      textPrimary: [35, 35, 35],
      textSecondary: [90, 90, 90],
      textMuted: [140, 140, 140],
      border: [220, 220, 220],
      divider: [232, 232, 232],
      accent: [120, 120, 120],
    },
    'dark-ink': {
      pageBg: [244, 243, 240],
      secondaryBg: [236, 235, 232],
      textPrimary: [28, 28, 30],
      textSecondary: [76, 76, 82],
      textMuted: [128, 128, 132],
      border: [205, 205, 210],
      divider: [220, 220, 224],
      accent: [88, 88, 96],
    },
  } as const

  const fontMap = {
    serif: {
      title: 'times',
      body: 'times',
      titleStyle: 'bold',
      questionStyle: 'italic',
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
      questionSize: 12.5,
      answerSize: 11.2,
      titleSize: 26,
      subtitleSize: 13,
      chapterTitleSize: 22,
      chapterIntroSize: 11,
      lineHeight: 6.8,
      questionSpacing: 8,
      sectionSpacing: 12,
      imageSpacing: 12,
      imageMaxHeight: 118,
      dividerWidth: 110,
      showSectionDividers: true,
      questionStyle: 'italic',
      imageFrameStyle: 'soft',
      pageNumberSize: 9,
      runningHeaderSize: 8,
    },
    minimal: {
      coverFrame: false,
      chapterCentered: false,
      questionSize: 11.8,
      answerSize: 10.4,
      titleSize: 24,
      subtitleSize: 12,
      chapterTitleSize: 18,
      chapterIntroSize: 10.5,
      lineHeight: 5.8,
      questionSpacing: 6,
      sectionSpacing: 8,
      imageSpacing: 10,
      imageMaxHeight: 92,
      dividerWidth: 65,
      showSectionDividers: false,
      questionStyle: 'bold',
      imageFrameStyle: 'none',
      pageNumberSize: 8,
      runningHeaderSize: 8,
    },
    elegant: {
      coverFrame: true,
      chapterCentered: true,
      questionSize: 11.8,
      answerSize: 10.8,
      titleSize: 32,
      subtitleSize: 12.5,
      chapterTitleSize: 26,
      chapterIntroSize: 11,
      lineHeight: 7.4,
      questionSpacing: 11,
      sectionSpacing: 20,
      imageSpacing: 18,
      imageMaxHeight: 118,
      dividerWidth: 90,
      showSectionDividers: false,
      questionStyle: 'italic',
      imageFrameStyle: 'luxury',
      pageNumberSize: 8,
      runningHeaderSize: 8,
    },
  } as const

  const baseLayout = layoutMap[settings.layout]

  const adjustedLayout = settings.printReady
    ? {
        ...baseLayout,
        lineHeight: baseLayout.lineHeight + 0.2,
        sectionSpacing: baseLayout.sectionSpacing + 2,
        questionSize: baseLayout.questionSize - 0.2,
        answerSize: baseLayout.answerSize - 0.2,
        imageMaxHeight: baseLayout.imageMaxHeight - 8,
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
        leftX: 22,
        rightX: 156,
        columnWidth: 114,
      },
      minimal: {
        leftX: 18,
        rightX: 152,
        columnWidth: 120,
      },
      elegant: {
        leftX: 26,
        rightX: 162,
        columnWidth: 104,
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
          marginLeft: 32,
          marginRight: 28,
          contentWidth: 146,
        },
      }
    : {
        classic: {
          marginLeft: 24,
          marginRight: 24,
          contentWidth: 162,
        },
        minimal: {
          marginLeft: 30,
          marginRight: 30,
          contentWidth: 150,
        },
        elegant: {
          marginLeft: 30,
          marginRight: 30,
          contentWidth: 150,
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

export function getChapterIntro(chapter: string) {
  const map: Record<string, string> = {
    Beginnings:
      'Every story has a beginning. These are the first memories, early years, and foundations that shaped everything that followed.',
    Childhood:
      'The years of discovery, play, family routines, and the small moments that often stay with us the longest.',
    'Teenage Years':
      'A chapter of growth, uncertainty, identity, and the experiences that begin to shape the person someone becomes.',
    'Early Adulthood':
      'The season of first big decisions, independence, responsibility, and finding direction.',
    'Relationships & Love':
      'The people, connections, and moments of love that left a lasting mark.',
    'Family Life':
      'A chapter shaped by home, family, care, and the memories made together.',
    'Work & Life Path':
      'The path of work, purpose, resilience, and the choices that helped define a life.',
    'Memories & Milestones':
      'The moments that changed everything, brought the most joy, or stayed unforgettable.',
    'Values & Lessons':
      'The beliefs, lessons, and guiding values that remained important over time.',
    'Reflections & Legacy':
      'A final chapter of gratitude, meaning, and what deserves to be remembered.',
  }

  return map[chapter] || 'A new chapter in this story.'
}