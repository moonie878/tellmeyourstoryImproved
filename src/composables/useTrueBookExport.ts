import jsPDF from 'jspdf'
import { ref } from 'vue'
import type { StoryImage, StoryProject, StorySection } from '../types/story'
import { EBGaramondRegular } from '../fonts/EBGaramond-Regular'
import { EBGaramondItalic } from '../fonts/EBGaramond-Italic'
import { EBGaramondBold } from '../fonts/EBGaramond-Bold'
import { EBGaramondBoldItalic } from '../fonts/EBGaramond-BoldItalic'

// ─── Page dimensions — 6x9 inch in mm (jsPDF uses mm by default) ───
const PW = 152.4  // 6 inches
const PH = 228.6  // 9 inches

// ─── Margins ──────────────────────────────────────────────────────────
// Recto (odd/right pages): wider inner (left) margin for binding
const RECTO_INNER  = 22   // binding side
const RECTO_OUTER  = 16   // outside edge
const RECTO_TOP    = 20
const RECTO_BOTTOM = 18

// Verso (even/left pages): wider inner (right) margin for binding — mirrored
const VERSO_INNER  = 22   // binding side (right on even pages)
const VERSO_OUTER  = 16   // outside edge (left on even pages)
const VERSO_TOP    = 20
const VERSO_BOTTOM = 18

// ─── Typography ───────────────────────────────────────────────────────
const TITLE_SIZE       = 22
const SUBTITLE_SIZE    = 10
const CHAPTER_SIZE     = 18
const CHAPTER_NUM_SIZE = 9
const QUESTION_SIZE    = 9.5
const ANSWER_SIZE      = 10
const RUNNING_SIZE     = 7.5
const PAGE_NUM_SIZE    = 8
const LINE_HEIGHT      = 5.8
const QUESTION_GAP     = 5
const SECTION_GAP      = 10

// ─── Colours ──────────────────────────────────────────────────────────
const C_PAGE_BG   = [248, 244, 239] as const
const C_PRIMARY   = [38, 34, 32]    as const
const C_SECONDARY = [92, 84, 78]    as const
const C_MUTED     = [140, 132, 126] as const
const C_ACCENT    = [148, 116, 74]  as const
const C_DIVIDER   = [221, 214, 206] as const

// ─── Helpers ──────────────────────────────────────────────────────────
function isRecto(pageNum: number) { return pageNum % 2 !== 0 }

function contentX(pageNum: number) {
  return isRecto(pageNum) ? RECTO_INNER : VERSO_OUTER
}

function contentWidth(pageNum: number) {
  return PW - (isRecto(pageNum) ? RECTO_INNER + RECTO_OUTER : VERSO_OUTER + VERSO_INNER)
}

function setFill(doc: jsPDF, c: readonly number[]) {
  doc.setFillColor(c[0], c[1], c[2])
}

function setTxt(doc: jsPDF, c: readonly number[]) {
  doc.setTextColor(c[0], c[1], c[2])
}

function setDraw(doc: jsPDF, c: readonly number[]) {
  doc.setDrawColor(c[0], c[1], c[2])
}

function line(doc: jsPDF, x1: number, y1: number, x2: number, y2: number) {
  doc.line(x1, y1, x2, y2)
}

function ornament(doc: jsPDF, cx: number, y: number) {
  setDraw(doc, C_ACCENT)
  doc.setLineWidth(0.25)
  line(doc, cx - 18, y, cx - 6,  y)
  line(doc, cx + 6,  y, cx + 18, y)
  doc.circle(cx,     y, 1.0, 'S')
  doc.circle(cx - 4, y, 0.4, 'S')
  doc.circle(cx + 4, y, 0.4, 'S')
}

function pageBg(doc: jsPDF) {
  setFill(doc, C_PAGE_BG)
  doc.rect(0, 0, PW, PH, 'F')
}

function splitText(doc: jsPDF, text: string, width: number): string[] {
  return doc.splitTextToSize(text, width)
}

function textHeight(lines: string[]): number {
  return lines.length * LINE_HEIGHT
}

// ─── Running header ───────────────────────────────────────────────────
function drawRunningHeader(
  doc: jsPDF,
  pageNum: number,
  bookTitle: string,
  chapterName: string,
  skipHeader: Set<number>
) {
  if (skipHeader.has(pageNum)) return

  doc.setFont('EBGaramond', 'italic')
  doc.setFontSize(RUNNING_SIZE)
  setTxt(doc, C_MUTED)

  setDraw(doc, C_DIVIDER)
  doc.setLineWidth(0.2)

  if (isRecto(pageNum)) {
    // Right page — chapter name right-aligned, page number outside right
    const x = PW - RECTO_OUTER
    doc.text(chapterName, x, RECTO_TOP - 4, { align: 'right' })
    line(doc, RECTO_INNER, RECTO_TOP - 2, PW - RECTO_OUTER, RECTO_TOP - 2)

    doc.setFont('EBGaramond', 'normal')
    doc.setFontSize(PAGE_NUM_SIZE)
    doc.text(String(pageNum), x, PH - RECTO_BOTTOM + 6, { align: 'right' })
  } else {
    // Left page — book title left-aligned, page number outside left
    const x = VERSO_OUTER
    doc.text(bookTitle, x, VERSO_TOP - 4, { align: 'left' })
    line(doc, VERSO_OUTER, VERSO_TOP - 2, PW - VERSO_INNER, VERSO_TOP - 2)

    doc.setFont('EBGaramond', 'normal')
    doc.setFontSize(PAGE_NUM_SIZE)
    doc.text(String(pageNum), x, PH - VERSO_BOTTOM + 6, { align: 'left' })
  }
}

// ─── Ensure chapter starts on recto (odd) page ─────────────────────
function ensureRecto(doc: jsPDF, currentPage: { n: number }, skipHeader: Set<number>) {
  if (isRecto(currentPage.n)) return
  doc.addPage()
  currentPage.n++
  pageBg(doc)
  skipHeader.add(currentPage.n)
}

// ─── Front matter: half title ─────────────────────────────────────
async function renderHalfTitle(
  doc: jsPDF,
  title: string,
  pageNum: { n: number },
  skipHeader: Set<number>,
  coverImageUrl: string,
  loadImageAsBase64: (url: string) => Promise<string>
) {
  pageBg(doc)
  skipHeader.add(pageNum.n)

  const cx = PW / 2

  if (coverImageUrl) {
    try {
      const imgData = await loadImageAsBase64(coverImageUrl)
      const img = new Image()
      img.src = imgData
      await new Promise((resolve, reject) => {
        img.onload = resolve
        img.onerror = reject
      })
      const maxW = 100
      const maxH = 70
      const ratio = Math.min(maxW / img.width, maxH / img.height)
      const iw = img.width * ratio
      const ih = img.height * ratio
      const ix = (PW - iw) / 2
      const iy = PH * 0.28

      setDraw(doc, C_DIVIDER)
      doc.setLineWidth(0.3)
      doc.roundedRect(ix - 1.5, iy - 1.5, iw + 3, ih + 3, 2, 2)
      doc.addImage(imgData, 'PNG', ix, iy, iw, ih)

      ornament(doc, cx, iy + ih + 12)

      doc.setFont('EBGaramond', 'bold')
      doc.setFontSize(TITLE_SIZE - 2)
      setTxt(doc, C_PRIMARY)
      doc.text(title, cx, iy + ih + 26, { align: 'center', maxWidth: 120 })
    } catch {
      renderHalfTitleText(doc, title, cx)
    }
  } else {
    renderHalfTitleText(doc, title, cx)
  }

  doc.setFont('EBGaramond', 'normal')
  doc.setFontSize(8)
  setTxt(doc, C_MUTED)
  doc.text('Tell Me Your Story', cx, PH - 16, { align: 'center' })
}

function renderHalfTitleText(doc: jsPDF, title: string, cx: number) {
  doc.setFont('EBGaramond', 'bold')
  doc.setFontSize(TITLE_SIZE - 4)
  setTxt(doc, C_PRIMARY)
  doc.text(title, cx, PH / 2 - 10, { align: 'center' })
}

// ─── Front matter: blank verso ────────────────────────────────────
function renderBlankVerso(doc: jsPDF, pageNum: { n: number }, skipHeader: Set<number>) {
  doc.addPage()
  pageNum.n++
  pageBg(doc)
  skipHeader.add(pageNum.n)
}

// ─── Front matter: full title page ───────────────────────────────
async function renderTitlePage(
  doc: jsPDF,
  title: string,
  subtitle: string,
  coverImageUrl: string,
  loadImageAsBase64: (url: string) => Promise<string>,
  pageNum: { n: number },
  skipHeader: Set<number>
) {
  doc.addPage()
  pageNum.n++
  pageBg(doc)
  skipHeader.add(pageNum.n)

  const cx = PW / 2

  // Cover image — top portion of page
  if (coverImageUrl) {
    try {
      const imgData = await loadImageAsBase64(coverImageUrl)
      const img = new Image()
      img.src = imgData
      await new Promise((resolve, reject) => {
        img.onload = resolve
        img.onerror = reject
      })

      const maxW = 110
      const maxH = 80
      const ratio = Math.min(maxW / img.width, maxH / img.height)
      const iw = img.width * ratio
      const ih = img.height * ratio
      const ix = (PW - iw) / 2
      const iy = 28

      setDraw(doc, C_DIVIDER)
      doc.setLineWidth(0.3)
      doc.roundedRect(ix - 1.5, iy - 1.5, iw + 3, ih + 3, 2, 2)
      doc.addImage(imgData, 'PNG', ix, iy, iw, ih)

      ornament(doc, cx, iy + ih + 12)

      doc.setFont('EBGaramond', 'bold')
      doc.setFontSize(TITLE_SIZE)
      setTxt(doc, C_PRIMARY)
      doc.text(title, cx, iy + ih + 26, { align: 'center', maxWidth: 120 })

      ornament(doc, cx, iy + ih + 36)

      doc.setFont('EBGaramond', 'italic')
      doc.setFontSize(SUBTITLE_SIZE)
      setTxt(doc, C_SECONDARY)
      doc.text(subtitle, cx, iy + ih + 48, { align: 'center', maxWidth: 110 })

    } catch {
      // fallback — no image
      renderTitlePageNoImage(doc, title, subtitle, cx)
    }
  } else {
    renderTitlePageNoImage(doc, title, subtitle, cx)
  }

  doc.setFont('EBGaramond', 'normal')
  doc.setFontSize(8)
  setTxt(doc, C_MUTED)
  doc.text('Tell Me Your Story · tellmeyourstory.uk', cx, PH - 14, { align: 'center' })
}

function renderTitlePageNoImage(doc: jsPDF, title: string, subtitle: string, cx: number) {
  ornament(doc, cx, PH / 2 - 28)

  doc.setFont('EBGaramond', 'bold')
  doc.setFontSize(TITLE_SIZE)
  setTxt(doc, C_PRIMARY)
  doc.text(title, cx, PH / 2 - 14, { align: 'center', maxWidth: 120 })

  ornament(doc, cx, PH / 2 + 2)

  doc.setFont('EBGaramond', 'italic')
  doc.setFontSize(SUBTITLE_SIZE)
  setTxt(doc, C_SECONDARY)
  doc.text(subtitle, cx, PH / 2 + 16, { align: 'center', maxWidth: 110 })
}

// ─── Front matter: copyright / dedication ─────────────────────────
function renderCopyrightPage(doc: jsPDF, title: string, pageNum: { n: number }, skipHeader: Set<number>) {
  doc.addPage()
  pageNum.n++
  pageBg(doc)
  skipHeader.add(pageNum.n)

  const cx = PW / 2
  const year = new Date().getFullYear()

  doc.setFont('EBGaramond', 'italic')
  doc.setFontSize(12)
  setTxt(doc, C_SECONDARY)
  doc.text('Every life holds a story worth telling.', cx, PH / 2 - 20, { align: 'center' })
  doc.text('This is yours.', cx, PH / 2 - 12, { align: 'center' })

  ornament(doc, cx, PH / 2)

  doc.setFont('EBGaramond', 'normal')
  doc.setFontSize(8)
  setTxt(doc, C_MUTED)
  doc.text(`${title}`, cx, PH / 2 + 14, { align: 'center' })
  doc.text(`Created with Tell Me Your Story · ${year}`, cx, PH / 2 + 20, { align: 'center' })
  doc.text('tellmeyourstory.uk', cx, PH / 2 + 26, { align: 'center' })
}

// ─── Front matter: table of contents ──────────────────────────────
function renderTableOfContents(
  doc: jsPDF,
  chapters: string[],
  chapterPages: Map<string, number>,
  _pageNum: { n: number },
  _skipHeader: Set<number>
) {
  // TOC is rendered by going back to the reserved TOC page — no page manipulation needed
  const x = RECTO_INNER
  const w = PW - RECTO_INNER - RECTO_OUTER
  const cx = x + w / 2

  doc.setFont('EBGaramond', 'normal')
  doc.setFontSize(CHAPTER_NUM_SIZE)
  setTxt(doc, C_MUTED)
  doc.text('CONTENTS', cx, RECTO_TOP + 4, { align: 'center' })

  ornament(doc, cx, RECTO_TOP + 12)

  let y = RECTO_TOP + 24

  for (const chapter of chapters) {
    const pg = chapterPages.get(chapter)
    if (!pg) continue

    doc.setFont('EBGaramond', 'normal')
    doc.setFontSize(9.5)
    setTxt(doc, C_PRIMARY)
    doc.text(chapter, x, y)

    // Dotted leader
    setTxt(doc, C_MUTED)
    doc.setFontSize(8)
    const chW = doc.getTextWidth(chapter)
    const pgStr = String(pg)
    const pgW = doc.getTextWidth(pgStr)
    const leaderStart = x + chW + 3
    const leaderEnd = x + w - pgW - 3
    let lx = leaderStart
    while (lx < leaderEnd) {
      doc.text('.', lx, y)
      lx += 2.2
    }

    doc.setFontSize(9)
    setTxt(doc, C_SECONDARY)
    doc.text(pgStr, x + w, y, { align: 'right' })

    y += 8
  }
}

// ─── Chapter heading page ─────────────────────────────────────────
function renderChapterPage(
  doc: jsPDF,
  chapter: string,
  chapterIndex: number,
  intro: string,
  pageNum: { n: number },
  skipHeader: Set<number>
) {
  pageBg(doc)
  skipHeader.add(pageNum.n)

  const cx = PW / 2
  const labels = [
    'Chapter One', 'Chapter Two', 'Chapter Three', 'Chapter Four', 'Chapter Five',
    'Chapter Six', 'Chapter Seven', 'Chapter Eight', 'Chapter Nine', 'Chapter Ten',
  ]
  const label = labels[chapterIndex] || `Chapter ${chapterIndex + 1}`

  doc.setFont('EBGaramond', 'normal')
  doc.setFontSize(CHAPTER_NUM_SIZE)
  setTxt(doc, C_MUTED)
  doc.text(label.toUpperCase(), cx, PH * 0.36, { align: 'center' })

  ornament(doc, cx, PH * 0.41)

  doc.setFont('EBGaramond', 'bold')
  doc.setFontSize(CHAPTER_SIZE)
  setTxt(doc, C_PRIMARY)
  doc.text(chapter, cx, PH * 0.50, { align: 'center', maxWidth: 110 })

  ornament(doc, cx, PH * 0.57)

  doc.setFont('EBGaramond', 'italic')
  doc.setFontSize(9)
  setTxt(doc, C_SECONDARY)
  const introLines = splitText(doc, intro, 110)
  introLines.forEach((ln, i) => {
    doc.text(ln, cx, PH * 0.63 + i * 5.5, { align: 'center' })
  })

  // Bottom rule
  setDraw(doc, C_DIVIDER)
  doc.setLineWidth(0.2)
  line(doc, PW * 0.25, PH - 20, PW * 0.75, PH - 20)
}

// ─── Quote page ───────────────────────────────────────────────────
function renderQuotePage(
  doc: jsPDF,
  quote: string,
  pageNum: { n: number },
  skipHeader: Set<number>
) {
  doc.addPage()
  pageNum.n++
  pageBg(doc)
  skipHeader.add(pageNum.n)

  const cx = PW / 2
  const maxW = 110

  doc.setFont('EBGaramond', 'normal')
  doc.setFontSize(7.5)
  setTxt(doc, C_MUTED)
  doc.text('A MEMORY WORTH KEEPING', cx, PH * 0.34, { align: 'center' })

  ornament(doc, cx, PH * 0.40)

  const shortened = quote.length > 200
    ? quote.slice(0, 200).replace(/\s+\S*$/, '') + '…'
    : quote
  doc.setFont('EBGaramond', 'italic')
  doc.setFontSize(11)
  setTxt(doc, C_SECONDARY)
  const qLines = splitText(doc, `"${shortened}"`, maxW)
  const qStartY = PH * 0.50 - (qLines.length * 6.2) / 2
  qLines.forEach((ln, i) => {
    doc.text(ln, cx, qStartY + i * 6.2, { align: 'center' })
  })

  ornament(doc, cx, PH * 0.66)

  doc.setFont('EBGaramond', 'italic')
  doc.setFontSize(8)
  setTxt(doc, C_MUTED)
  doc.text('held onto with love', cx, PH * 0.72, { align: 'center' })

  // Ensure next content starts on recto — but don't skip header on that page
  doc.addPage()
  pageNum.n++
  pageBg(doc)
}

// ─── Closing page ─────────────────────────────────────────────────
function renderClosingPage(doc: jsPDF, pageNum: { n: number }, skipHeader: Set<number>) {
  ensureRecto(doc, pageNum, skipHeader)
  doc.addPage()
  pageNum.n++
  pageBg(doc)
  skipHeader.add(pageNum.n)

  const cx = PW / 2

  ornament(doc, cx, PH * 0.40)

  doc.setFont('EBGaramond', 'italic')
  doc.setFontSize(14)
  setTxt(doc, C_SECONDARY)
  doc.text('A story worth keeping.', cx, PH * 0.48, { align: 'center' })

  ornament(doc, cx, PH * 0.55)

  doc.setFont('EBGaramond', 'normal')
  doc.setFontSize(8)
  setTxt(doc, C_MUTED)
  doc.text('Created with Tell Me Your Story', cx, PH * 0.63, { align: 'center' })
  doc.text('tellmeyourstory.uk', cx, PH * 0.68, { align: 'center' })
}

// ─── Section (question + answer + optional photo) renderer ────────
async function renderSection(
  doc: jsPDF,
  section: StorySection,
  imageUrl: string | undefined,
  loadImageAsBase64: (url: string) => Promise<string>,
  pageNum: { n: number },
  y: { val: number },
  isFirstInChapter: boolean
): Promise<void> {
  const maxY = PH - RECTO_BOTTOM - 10

  // Load image if available
  let imgData: string | null = null
  let imgW = 0
  let imgH = 0

  if (imageUrl) {
    try {
      imgData = await loadImageAsBase64(imageUrl)
      const img = new Image()
      img.src = imgData
      await new Promise((resolve, reject) => {
        img.onload = resolve
        img.onerror = reject
      })

      // Scale image to fit right column
      const maxIW = contentWidth(pageNum.n) * 0.45
      const maxIH = 55
      const ratio = Math.min(maxIW / img.width, maxIH / img.height)
      imgW = img.width * ratio
      imgH = img.height * ratio
    } catch {
      imgData = null
    }
  }

  // Calculate text width — narrower if image
  const textW = imgData ? contentWidth(pageNum.n) - imgW - 6 : contentWidth(pageNum.n)

  // Question
  doc.setFont('EBGaramond', 'italic')
  doc.setFontSize(QUESTION_SIZE)
  setTxt(doc, C_SECONDARY)
  const qLines = splitText(doc, section.question, textW)
  const qH = textHeight(qLines)

  // Answer
  doc.setFont('EBGaramond', 'normal')
  doc.setFontSize(ANSWER_SIZE)
  setTxt(doc, C_PRIMARY)

  const answerText = (section.answer || '').trim()
  let aLines: string[] = []

  if (isFirstInChapter && answerText) {
    // Drop cap — first letter separate
    const rest = answerText.slice(1)
    aLines = splitText(doc, rest, textW - 6)
  } else {
    aLines = splitText(doc, answerText, textW)
  }

  const aH = textHeight(aLines)

  // Page break if needed
  if (y.val + qH + QUESTION_GAP + Math.min(aH, 30) > maxY) {
    doc.addPage()
    pageNum.n++
    pageBg(doc)
    y.val = isRecto(pageNum.n) ? RECTO_TOP : VERSO_TOP
  }

  const currentX = contentX(pageNum.n)
  const currentW = contentWidth(pageNum.n)
  const textWFinal = imgData ? currentW - imgW - 6 : currentW

  // Draw question
  doc.setFont('EBGaramond', 'italic')
  doc.setFontSize(QUESTION_SIZE)
  setTxt(doc, C_SECONDARY)
  const qLinesFinal = splitText(doc, section.question, textWFinal)
  qLinesFinal.forEach((ln, i) => {
    doc.text(ln, currentX, y.val + i * LINE_HEIGHT)
  })

  y.val += textHeight(qLinesFinal) + QUESTION_GAP

  // Draw answer
  if (answerText) {
    if (isFirstInChapter) {
      // Drop cap
      const firstLetter = answerText.charAt(0)
      const rest = answerText.slice(1)

      doc.setFont('EBGaramond', 'bold')
      doc.setFontSize(20)
      setTxt(doc, C_ACCENT)
      doc.text(firstLetter, currentX, y.val + 2)
      const dcW = doc.getTextWidth(firstLetter) + 1.5

      doc.setFont('EBGaramond', 'normal')
      doc.setFontSize(ANSWER_SIZE)
      setTxt(doc, C_PRIMARY)
      const restLines = splitText(doc, rest, textWFinal - dcW)
      restLines.forEach((ln, i) => {
        doc.text(ln, currentX + dcW, y.val + i * LINE_HEIGHT)
      })
      y.val += textHeight(restLines)
    } else {
      doc.setFont('EBGaramond', 'normal')
      doc.setFontSize(ANSWER_SIZE)
      setTxt(doc, C_PRIMARY)
      const aLinesFinal = splitText(doc, answerText, textWFinal)
      aLinesFinal.forEach((ln, i) => {
        doc.text(ln, currentX, y.val + i * LINE_HEIGHT)
      })
      y.val += textHeight(aLinesFinal)
    }
  }

  // Draw image to the right if available
  if (imgData) {
    const imgX = currentX + textWFinal + 4
    const imgY = y.val - aH - QUESTION_GAP - textHeight(qLinesFinal)

    setDraw(doc, C_DIVIDER)
    doc.setLineWidth(0.25)
    doc.roundedRect(imgX - 1, imgY - 1, imgW + 2, imgH + 2, 2, 2)
    doc.addImage(imgData, 'PNG', imgX, imgY, imgW, imgH)

    if (y.val < imgY + imgH + 4) {
      y.val = imgY + imgH + 4
    }
  }

  y.val += SECTION_GAP
}

// ─── Chapter intro map ────────────────────────────────────────────
const CHAPTER_INTROS: Record<string, string> = {
  Beginnings: 'Every story has a beginning. These are the earliest memories and moments that shaped everything that followed.',
  Childhood: 'The years of discovery, play, and the small moments that often stay with us the longest.',
  'Teenage Years': 'A chapter of growth, identity, and the experiences that begin to shape the person someone becomes.',
  'Early Adulthood': 'The season of first big decisions, independence, and finding direction.',
  'Relationships & Love': 'The people, connections, and moments of love that left a lasting mark.',
  'Family Life': 'A chapter shaped by home, family, care, and the memories made together.',
  'Work & Life Path': 'The path of work, purpose, resilience, and the choices that helped define a life.',
  'Memories & Milestones': 'The moments that changed everything, brought the most joy, or stayed unforgettable.',
  'Values & Lessons': 'The beliefs, lessons, and guiding values that remained important over time.',
  'Reflections & Legacy': 'A final chapter of gratitude, meaning, and what deserves to be remembered.',
}

const STORY_SUBTITLES: Record<string, string> = {
  mum:    'A life told through memories, moments, and love',
  dad:    'A life told through memories, lessons, and love',
  grandma: 'A collection of memories, traditions, and family stories',
  grandad: 'A collection of stories, life lessons, and legacy',
  life:   'A life remembered through stories, moments, and reflection',
  couple: 'A story of love, life, and the years built together',
}

// ─── Main export function ─────────────────────────────────────────
export function useStoryTrueBookExport() {
  const isExporting = ref(false)
  const progress   = ref(0)
  const progressLabel = ref('')
  const error      = ref('')

  async function exportTrueBook(
    project: StoryProject,
    sections: StorySection[],
    getAllImagesForExport: () => Promise<StoryImage[]>,
    loadImageAsBase64: (url: string) => Promise<string>,
    coverImageUrl: string
  ): Promise<void> {
    isExporting.value   = true
    progress.value      = 0
    progressLabel.value = 'Preparing your book…'
    error.value         = ''

    try {
      const doc = new jsPDF({ unit: 'mm', format: [PW, PH], orientation: 'portrait' })

      // Register embedded fonts — required for Lulu print compatibility
      doc.addFileToVFS('EBGaramond-Regular.ttf', EBGaramondRegular)
      doc.addFont('EBGaramond-Regular.ttf', 'EBGaramond', 'normal')

      doc.addFileToVFS('EBGaramond-Italic.ttf', EBGaramondItalic)
      doc.addFont('EBGaramond-Italic.ttf', 'EBGaramond', 'italic')

      doc.addFileToVFS('EBGaramond-Bold.ttf', EBGaramondBold)
      doc.addFont('EBGaramond-Bold.ttf', 'EBGaramond', 'bold')

      doc.addFileToVFS('EBGaramond-BoldItalic.ttf', EBGaramondBoldItalic)
      doc.addFont('EBGaramond-BoldItalic.ttf', 'EBGaramond', 'bolditalic')

      const answered = sections.filter((s) => s.answer?.trim())
      if (answered.length === 0) {
        error.value = 'Please answer at least one question before exporting.'
        return
      }

      // Load images
      progressLabel.value = 'Loading photos…'
      progress.value = 5
      const images = await getAllImagesForExport()
      const imageMap = new Map(images.map((img) => [img.section_id, img.image_url]))

      const storyTitle    = project.title || 'My Story'
      const storySubtitle = STORY_SUBTITLES[project.story_type || ''] || 'A story told through memories, moments, and love'

      // Get unique answered chapters
      const answeredChapters = [...new Set(
        answered.filter((s) => s.chapter).map((s) => s.chapter as string)
      )]

      // ── Front matter ───────────────────────────────────────────
      progressLabel.value = 'Building front matter…'
      progress.value = 10

      const skipHeader = new Set<number>()
      const pageNum = { n: 1 }

      // Page 1 — Half title (recto)
      pageBg(doc)
      await renderHalfTitle(doc, storyTitle, pageNum, skipHeader, coverImageUrl, loadImageAsBase64)

      // Page 2 — Blank verso
      renderBlankVerso(doc, pageNum, skipHeader)

      // Page 3 — Full title page (recto)
      await renderTitlePage(doc, storyTitle, storySubtitle, coverImageUrl, loadImageAsBase64, pageNum, skipHeader)

      // Page 4 — Copyright/dedication (verso)
      renderCopyrightPage(doc, storyTitle, pageNum, skipHeader)

      // ── First pass: collect chapter page numbers ───────────────
      // We'll render TOC after chapters so we know page numbers
      // For now, reserve pages 5–6 for TOC (we'll inject it last using doc.insertPage equivalent)
      // Instead we track chapter start pages during render

      // Page 5 — TOC placeholder (recto) — we add a blank here and fill after
      doc.addPage()
      pageNum.n++
      pageBg(doc)
      skipHeader.add(pageNum.n) // skip header on TOC page
      const tocPageNum = pageNum.n

      // Page 6 — blank verso after TOC
      doc.addPage()
      pageNum.n++
      pageBg(doc)
      skipHeader.add(pageNum.n)

      // ── Chapter pages ──────────────────────────────────────────
      const chapterPages = new Map<string, number>()
      let currentChapter = ''
      let chapterIndex = -1
      let isFirstInChapter = false
      const usedQuotes = new Set<string>()

      // y persists across all sections — only resets when a new page starts
      const y = { val: RECTO_TOP }

      progress.value = 20

      for (let si = 0; si < answered.length; si++) {
        const section = answered[si]

        // New chapter?
        if (section.chapter && section.chapter !== currentChapter) {
          currentChapter = section.chapter
          chapterIndex++
          isFirstInChapter = true

          // Chapter always starts on recto
          ensureRecto(doc, pageNum, skipHeader)
          doc.addPage()
          pageNum.n++
          pageBg(doc)

          chapterPages.set(currentChapter, pageNum.n)
          renderChapterPage(
            doc,
            currentChapter,
            chapterIndex,
            CHAPTER_INTROS[currentChapter] || 'A new chapter in this story.',
            pageNum,
            skipHeader
          )

          // First content page of chapter (verso after chapter heading)
          doc.addPage()
          pageNum.n++
          pageBg(doc)

          // Reset y for the new chapter content page
          y.val = isRecto(pageNum.n) ? RECTO_TOP : VERSO_TOP

        } else {
          isFirstInChapter = false
        }

        // Quote page before certain sections
        if (si > 0 && si % 6 === 0 && answered[si - 1]?.answer) {
          const quote = answered[si - 1].answer!.trim()
          if (quote.length >= 40 && !usedQuotes.has(quote)) {
            usedQuotes.add(quote)
            renderQuotePage(doc, quote, pageNum, skipHeader)
            y.val = isRecto(pageNum.n) ? RECTO_TOP : VERSO_TOP
          }
        }

        // Quote page for highlighted sections
        if (section.is_highlighted && section.answer && !usedQuotes.has(section.answer.trim())) {
          const quote = section.answer.trim()
          if (quote.length >= 40) {
            usedQuotes.add(quote)
            renderQuotePage(doc, quote, pageNum, skipHeader)
            y.val = isRecto(pageNum.n) ? RECTO_TOP : VERSO_TOP
          }
        }

        await renderSection(
          doc,
          section,
          imageMap.get(section.id),
          loadImageAsBase64,
          pageNum,
          y,
          isFirstInChapter
        )

        // After renderSection, if it added a new page, y is already updated inside renderSection
        // but we need to make sure y reflects the current page top if pageNum changed
        progress.value = 20 + Math.round((si / answered.length) * 65)
        progressLabel.value = `Typesetting page ${pageNum.n}…`
      }

      // ── Closing page ───────────────────────────────────────────
      progressLabel.value = 'Adding closing pages…'
      renderClosingPage(doc, pageNum, skipHeader)

      // ── Running headers on all pages ───────────────────────────
      progressLabel.value = 'Adding running headers…'
      progress.value = 88

      // Build a page→chapter map for headers
      const pageChapterMap = new Map<number, string>()
      let lastChapter = storyTitle
      for (let pg = 1; pg <= pageNum.n; pg++) {
        for (const [ch, chPg] of chapterPages.entries()) {
          if (chPg <= pg) lastChapter = ch
        }
        pageChapterMap.set(pg, lastChapter)
      }

      // jsPDF doesn't support going back to previous pages natively
      // so we draw headers by saving current state and using internal page switching
      const totalPages = doc.getNumberOfPages()
      for (let pg = 1; pg <= totalPages; pg++) {
        doc.setPage(pg)
        const chName = pageChapterMap.get(pg) || storyTitle
        drawRunningHeader(doc, pg, storyTitle, chName, skipHeader)
      }

      // ── TOC — go back to TOC page and render it ────────────────
      progressLabel.value = 'Building table of contents…'
      progress.value = 93
      doc.setPage(tocPageNum)
      pageBg(doc)
      const tocPageRef = { n: tocPageNum }
      renderTableOfContents(doc, answeredChapters, chapterPages, tocPageRef, skipHeader)

      // ── Save ───────────────────────────────────────────────────
      progressLabel.value = 'Saving your book…'
      progress.value = 97

      const filename = `${storyTitle.toLowerCase().replace(/[^a-z0-9]/g, '-')}-true-book.pdf`
      doc.save(filename)

      progress.value = 100
      progressLabel.value = 'Your book is downloading!'

      setTimeout(() => {
        if (progress.value === 100) {
          progress.value = 0
          progressLabel.value = ''
        }
      }, 4000)

    } catch (err) {
      console.error('True book export error:', err)
      error.value = err instanceof Error
        ? err.message
        : 'Something went wrong generating your book. Please try again.'
    } finally {
      isExporting.value = false
    }
  }

  return {
    isExporting,
    progress,
    progressLabel,
    error,
    exportTrueBook,
  }
}