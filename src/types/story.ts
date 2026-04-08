export type PdfLayout = 'classic' | 'minimal' | 'elegant'
export type PdfFont = 'serif' | 'clean' | 'bookish'
export type PdfTheme = 'warm' | 'neutral' | 'dark-ink'
export type PdfOrientation = 'portrait' | 'landscape-spread'

export type PdfSettings = {
  layout: PdfLayout
  font: PdfFont
  theme: PdfTheme
  orientation: PdfOrientation
  includeCoverImage: boolean
  includeDedication: boolean
  printReady: boolean
}

export type StoryImage = {
  id?: string
  project_id: string
  section_id: string
  image_url: string
  created_at?: string
}

export type StorySection = {
  id: string
  chapter?: string
  question: string
  answer: string
}

export type StoryProject = {
  id: string
  title: string
  story_type: string
  cover_image_url?: string | null
  pdf_settings?: Partial<PdfSettings> | null
}

export type StoryChapterQuestion = StorySection & {
  index: number
  isCompleted: boolean
}

export type StoryChapterGroup = {
  chapter: string
  questions: StoryChapterQuestion[]
  count: number
  completedCount: number
}