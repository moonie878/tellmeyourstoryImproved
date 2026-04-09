import type { StorySection } from '../types/story'

export function isLongAnswer(answer: string) {
  return answer.length > 400
}

export function isVeryLongAnswer(answer: string) {
  return answer.length > 900
}

export function shouldHighlightQuote(section: StorySection) {
  return section.highlighted === true
}

export function shouldInsertQuotePageSmart(
  section: StorySection,
  index: number
) {
  // priority: user selected
  if (section.highlighted) return true

  // fallback: long emotional answers every ~6
  if (section.answer.length > 250 && index % 6 === 0) return true

  return false
}