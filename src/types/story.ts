export type PdfLayout = 'classic' | 'minimal' | 'elegant'
export type PdfFont = 'serif' | 'clean' | 'bookish'
export type PdfTheme = 'warm' | 'neutral' | 'dark-ink'
export type PdfOrientation = 'portrait' | 'landscape-spread'

export type PdfBorderStyle = 'none' | 'fine-line' | 'corner-floral'
export type PdfDividerStyle = 'soft-line' | 'flourish' | 'gold-line'
export type PdfChapterStyle = 'standard' | 'flourish'
export type PdfOrnamentStyle = 'none' | 'floral'

export type PdfSettings = {
  layout: PdfLayout
  font: PdfFont
  theme: PdfTheme
  orientation: PdfOrientation
  includeCoverImage: boolean
  includeDedication: boolean
  printReady: boolean
  borderStyle?: PdfBorderStyle
  dividerStyle?: PdfDividerStyle
  chapterStyle?: PdfChapterStyle
  ornamentStyle?: PdfOrnamentStyle
  dropCaps?: boolean
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
  is_highlighted?: boolean
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

// Add this to your existing types/story.ts file

export type StoryProfile = {
  id: string
  project_id: string
  full_name: string | null
  date_of_birth: string | null // ISO date string, e.g. "1952-03-14"
  birth_place: string | null
  occupation: string | null
  father_name: string | null
  mother_name: string | null
  spouse_name: string | null
  children_names: string | null
  siblings_names: string | null
  created_at: string
  updated_at: string
}

export type StoryProfileInput = Omit<
  StoryProfile,
  'id' | 'created_at' | 'updated_at'
>