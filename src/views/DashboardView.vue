<template>
  <div class="min-h-screen bg-stone-50 px-4 py-8 sm:px-6 md:py-12">
    <div class="mx-auto max-w-6xl space-y-6 sm:space-y-8">

      <!-- Hero -->
      <section class="overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-sm">
        <div class="grid gap-6 px-5 py-6 sm:px-6 sm:py-8 md:grid-cols-[1.2fr_0.8fr] md:gap-8 md:px-8 md:py-10">
          <div class="text-center md:text-left">
            <p class="text-xs font-medium uppercase tracking-[0.25em] text-stone-500">Dashboard</p>
            <h1 class="mt-3 text-2xl font-bold text-stone-900 sm:text-3xl md:text-4xl">
              Welcome to Tell Me Your Story
            </h1>
            <p class="mt-4 max-w-2xl text-sm leading-7 text-stone-600 sm:text-base">
              Create meaningful keepsakes, return to them whenever you like, and turn treasured
              memories into something beautifully finished.
            </p>
            <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center md:justify-start">
              <button @click="createStory('mum')" class="rounded-full bg-[#7C5C3B] px-5 py-3 text-sm font-medium text-white transition hover:opacity-90">
                Start Mum Story
              </button>
              <button @click="createStory('dad')" class="rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-medium text-stone-900 transition hover:bg-stone-100">
                Start Dad Story
              </button>
              <button @click="createStory('child_story')" class="rounded-full bg-[#7C5C3B] px-5 py-3 text-sm font-medium text-white transition hover:opacity-90">
                Start Child Story
              </button>
            </div>
            <p v-if="isFirstTimeUser" class="mt-5 inline-block rounded-full bg-stone-100 px-3 py-1 text-sm text-stone-700">
              Your first keepsake can be started in under a minute — answer as many or as few questions as you like 💛
            </p>
          </div>

          <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-1">
            <div class="rounded-3xl bg-stone-50 p-5">
              <p class="text-sm font-semibold text-stone-900">Your library</p>
              <p class="mt-2 text-sm leading-6 text-stone-600">Keep all your stories in one place and return whenever inspiration comes.</p>
            </div>
            <div class="rounded-3xl bg-stone-50 p-5">
              <p class="text-sm font-semibold text-stone-900">Finished keepsakes</p>
              <p class="mt-2 text-sm leading-6 text-stone-600">Export polished PDFs and documents when you're ready to preserve the story.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Story starters -->
      <section class="rounded-[2rem] border border-stone-200 bg-white p-5 shadow-sm sm:p-6 md:p-8">
        <div class="text-center md:text-left">
          <p class="text-xs font-medium uppercase tracking-[0.25em] text-stone-500">Start a new story</p>
          <h2 class="mt-2 text-2xl font-bold text-stone-900">Choose the keepsake you want to create</h2>
          <p class="mt-2 text-sm text-stone-500">Answer as many or as few questions as feel right — there's no pressure to complete them all.</p>
        </div>
        <div class="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <button
            v-for="type in storyTypes"
            :key="type.id"
            @click="createStory(type.id)"
            class="group rounded-[1.75rem] border border-stone-200 bg-stone-50 p-5 text-left transition hover:-translate-y-1 hover:border-stone-300 hover:bg-white hover:shadow-md"
          >
            <p v-if="type.label" class="text-xs font-medium uppercase tracking-[0.2em] text-stone-500">{{ type.label }}</p>
            <h3 class="mt-3 text-lg font-semibold text-stone-900">{{ type.title }}</h3>
            <p class="mt-2 text-sm leading-6 text-stone-600">{{ type.description }}</p>
            <p class="mt-4 text-sm font-medium text-[#7C5C3B]">Start story →</p>
          </button>
        </div>
      </section>

      <!-- Empty state -->
      <section v-if="isFirstTimeUser" class="rounded-[2rem] border border-stone-200 bg-white p-5 shadow-sm sm:p-6 md:p-8">
        <div class="max-w-3xl text-center md:text-left">
          <p class="text-xs font-medium uppercase tracking-[0.25em] text-stone-500">Welcome</p>
          <h2 class="mt-3 text-2xl font-bold text-stone-900">Start your first keepsake in a few simple steps</h2>
          <p class="mt-3 text-sm leading-7 text-stone-600 sm:text-base">
            Choose a story, answer one memory at a time, and slowly turn it into something you can save, print, and share.
          </p>
        </div>
        <div class="mt-8 grid gap-4 md:grid-cols-3">
          <div class="rounded-2xl bg-stone-50 p-5">
            <p class="text-sm font-semibold text-stone-900">1. Choose a story</p>
            <p class="mt-2 text-sm leading-6 text-stone-600">Start with a meaningful story type and begin capturing memories straight away.</p>
          </div>
          <div class="rounded-2xl bg-stone-50 p-5">
            <p class="text-sm font-semibold text-stone-900">2. Answer at your own pace</p>
            <p class="mt-2 text-sm leading-6 text-stone-600">Write one answer at a time with autosave, so nothing feels rushed.</p>
          </div>
          <div class="rounded-2xl bg-stone-50 p-5">
            <p class="text-sm font-semibold text-stone-900">3. Turn it into a keepsake</p>
            <p class="mt-2 text-sm leading-6 text-stone-600">Export the finished story as a beautifully preserved PDF or printed book.</p>
          </div>
        </div>
      </section>

      <!-- Stories -->
      <section v-if="stories.length" class="space-y-5">
        <div class="text-center md:text-left">
          <p class="text-xs font-medium uppercase tracking-[0.25em] text-stone-500">Your stories</p>
          <h2 class="mt-2 text-2xl font-bold text-stone-900">Continue where you left off</h2>
        </div>

        <div class="grid gap-5 lg:grid-cols-2">
          <article
            v-for="story in stories"
            :key="story.id"
            class="overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div class="grid gap-0 sm:grid-cols-[140px_1fr]">
              <!-- Thumbnail -->
              <div class="flex min-h-[160px] items-center justify-center bg-stone-100 p-4">
                <img
                  v-if="story.cover_image_url"
                  :src="story.cover_image_url"
                  alt="Story cover"
                  class="h-full max-h-[180px] w-auto rounded-xl object-cover shadow-sm"
                  loading="lazy"
                />
                <div v-else class="flex h-full w-full items-center justify-center rounded-2xl border border-dashed border-stone-300 bg-white px-4 text-center">
                  <div>
                    <p class="text-xs font-medium uppercase tracking-[0.18em] text-stone-500">{{ story.story_type }}</p>
                    <p class="mt-2 text-sm text-stone-600">Keepsake preview</p>
                  </div>
                </div>
              </div>

              <!-- Content -->
              <div class="p-5 sm:p-6">
                <div class="flex flex-wrap items-center gap-2">
                  <h3 class="text-xl font-semibold text-stone-900">{{ story.title }}</h3>
                  <span v-if="hasAllStoriesAccess()" class="rounded-full bg-stone-900 px-3 py-1 text-xs font-medium text-white">All Stories</span>
                  <span v-else-if="hasStoryAccess(story.story_type)" class="rounded-full bg-stone-200 px-3 py-1 text-xs font-medium text-stone-700">Unlocked</span>
                  <span v-else class="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">Free Draft</span>
                </div>

                <p class="mt-2 text-sm text-stone-500">
                  {{ formatStoryType(story.story_type) }} • {{ formatDate(story.created_at) }}
                </p>

                <div class="mt-5">
                  <div class="flex items-center justify-between text-sm text-stone-600">
                    <span>Progress</span>
                    <span class="font-medium text-stone-900">{{ story.progress }}%</span>
                  </div>
                  <div class="mt-2 h-2 w-full rounded-full bg-stone-200">
                    <div class="h-2 rounded-full bg-[#7C5C3B] transition-all" :style="{ width: `${story.progress}%` }"></div>
                  </div>
                </div>

                <div class="mt-4 space-y-1 text-sm text-stone-600">
                  <p>
                    Story access:
                    <span v-if="hasStoryAccess(story.story_type)" class="font-medium text-green-600">Unlocked</span>
                    <span v-else class="font-medium text-amber-600">Free draft</span>
                  </p>
                  <p>
                    Export:
                    <span v-if="canExportStory(story.story_type)" class="font-medium text-green-600">Unlocked</span>
                    <span v-else class="font-medium text-amber-600">Locked</span>
                  </p>
                </div>

              <p class="mt-4 text-sm leading-6 text-stone-600">
  {{ hasStoryAccess(story.story_type)
    ? `Keep building this story whenever you're ready, then turn it into a finished keepsake.`
    : `Keep writing for free, then upgrade when you're ready to create the finished keepsake.` }}
</p>
                <!-- ── Action buttons ──────────────────────────────────── -->
                <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">

                  <!-- Continue / Edit -->
                  <button
                    @click="openStory(story.id)"
                    class="rounded-full bg-[#7C5C3B] px-4 py-3 text-sm font-medium text-white transition hover:opacity-90"
                  >
                    {{ hasStoryAccess(story.story_type) ? 'Continue' : 'Edit Draft' }}
                  </button>

                  <!-- ── ORDER PRINTED BOOK button ──────────────────────
                       Shows only when user has Premium Keepsake access.
                       Triggers generateAndOrder() which:
                         1. Builds interior PDF blob via exportTrueBookAsBlob()
                         2. Builds cover PDF blob via generateCoverPDF()
                         3. Opens PrintOrderModal with both blobs ready
                  ────────────────────────────────────────────────────── -->
                  <button
                    v-if="hasPrintAccess()"
                    @click="startPrintOrder(story)"
                    :disabled="generatingPrintId === story.id"
                    class="rounded-full border border-[#7C5C3B] bg-white px-4 py-3 text-sm font-medium text-[#7C5C3B] transition hover:bg-[#F5F0E8] disabled:opacity-50"
                  >
                    {{ generatingPrintId === story.id ? 'Preparing…' : '📖 Order Printed Book' }}
                  </button>

                  <!-- Delete -->
                  <button
                    @click.stop="deleteStory(story.id)"
                    :disabled="deletingStoryId === story.id"
                    class="rounded-full border border-red-300 bg-white px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                  >
                    {{ deletingStoryId === story.id ? 'Deleting...' : 'Delete' }}
                  </button>
                </div>

                <!-- Generating indicator -->
                <p v-if="generatingPrintId === story.id" class="mt-2 text-xs text-stone-500">
                  Building your book for print — this takes about 30 seconds…
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- Bottom info cards -->
      <section class="grid gap-5 md:grid-cols-3 md:gap-6">
        <div class="rounded-[1.75rem] border border-stone-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 class="text-lg font-semibold text-stone-900">Your stories</h2>
          <p class="mt-2 text-sm leading-6 text-stone-600">Start and continue keepsakes for parents, grandparents, couples, and more.</p>
        </div>
        <div class="rounded-[1.75rem] border border-stone-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 class="text-lg font-semibold text-stone-900">Your progress</h2>
          <p class="mt-2 text-sm leading-6 text-stone-600">Return any time and keep building each story at your own pace.</p>
        </div>
        <div class="rounded-[1.75rem] border border-stone-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 class="text-lg font-semibold text-stone-900">Your keepsakes</h2>
          <p class="mt-2 text-sm leading-6 text-stone-600">Turn completed stories into polished keepsakes you can save, print, and share.</p>
        </div>
      </section>
    </div>

    <!-- ── PrintOrderModal ──────────────────────────────────────────────────────
         Shown after PDFs are generated and ready.
         Collects shipping address, calculates shipping cost, places Lulu order.
    ─────────────────────────────────────────────────────────────────────────── -->
    <PrintOrderModal
      v-if="printModalOpen && printModalData"
      :interior-pdf-blob="printModalData.interiorBlob"
      :cover-pdf-blob="printModalData.coverBlob"
      :page-count="printModalData.pageCount"
      :story-title="printModalData.storyTitle"
      :story-id="printModalData.storyId"
      :user-id="printModalData.userId"
      :user-email="printModalData.userEmail"
      :print-cost="29.99"
      :stripe-payment-id="printModalData.stripePaymentId"
      @close="printModalOpen = false"
      @ordered="onOrdered"
    />
  </div>
</template>

<script setup lang="ts">
import { supabase } from '../lib/supabase'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { track } from '../lib/analytics'
import { STORY_TYPES } from '../data/storyTypes'
import { useStoryTrueBookExport } from '../composables/useTrueBookExport'
import { generateCoverPDF } from '../lib/generateCoverPDF'
import PrintOrderModal from '../components/print/PrintOrderModal.vue'

const stories          = ref<any[]>([])
const userAccess       = ref<any[]>([])
const isFirstTimeUser  = ref(false)
const deletingStoryId  = ref<string | null>(null)
const generatingPrintId = ref<string | null>(null)
const printModalOpen   = ref(false)
const printModalData   = ref<{
  interiorBlob: Blob
  coverBlob: Blob
  pageCount: number
  storyTitle: string
  storyId: string
  userId: string
  userEmail: string
  stripePaymentId: string
} | null>(null)

const router = useRouter()
const storyTypes = STORY_TYPES
const { exportTrueBookAsBlob } = useStoryTrueBookExport()

// ── Story helpers ─────────────────────────────────────────────────────────────

function getStoryTitle(type: string) {
  const story = STORY_TYPES.find((s) => s.id === type)
  return story?.projectTitle || 'New Story'
}

function formatStoryType(type: string) {
  const labels: Record<string, string> = {
    mum: "Mum's Story", dad: "Dad's Story", grandma: "Grandma's Story",
    grandad: "Grandad's Story", life: 'Life Story', couple: 'Couple Story',
    child_story: "Your Child's Story",
  }
  return labels[type] || type
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString()
}

// ── Access helpers ────────────────────────────────────────────────────────────

function hasStoryAccess(storyType: string) {
  return userAccess.value.some(
    (item) => item.access_type === 'story' &&
      (item.story_type === storyType || item.story_type === 'all')
  )
}

function hasExportAccess() {
  return userAccess.value.some(
    (item) => item.access_type === 'export' &&
      (item.variant === 'text_only' || item.variant === 'with_images')
  )
}

function canExportStory(storyType: string) {
  return hasStoryAccess(storyType) && hasExportAccess()
}

function hasAllStoriesAccess() {
  return userAccess.value.some(
    (item) => item.access_type === 'story' && item.story_type === 'all'
  )
}

// ── Print access — Premium Keepsake tier only ─────────────────────────────────
function hasPrintAccess() {
  return userAccess.value.some(
    (item) =>
      item.access_type === 'print' ||
      item.variant === 'premium' ||
      item.variant === 'with_images'  // anyone with photo export gets print too
  )
}

// ── Print order flow ──────────────────────────────────────────────────────────

async function startPrintOrder(story: any) {
  generatingPrintId.value = story.id

  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    // Fetch sections and images for this story
    const { data: sections } = await supabase
      .from('story_sections')
      .select('*')
      .eq('story_type', story.story_type)
      .order('order_index')

    const { data: answers } = await supabase
      .from('story_answers')
      .select('*')
      .eq('project_id', story.id)

    // Merge answers into sections
    const mergedSections = (sections || []).map((s: any) => {
      const answer = answers?.find((a: any) => a.section_id === s.id)
      return { ...s, answer: answer?.answer || '', is_highlighted: answer?.is_highlighted || false }
    })

    const storyTitle = story.title || 'My Story'
    const subtitle = `A life told through memories, moments, and love`

    // Helper to load images as base64
    async function loadImageAsBase64(url: string): Promise<string> {
      const response = await fetch(url)
      const blob = await response.blob()
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = reject
        reader.readAsDataURL(blob)
      })
    }

    // Helper to get all images for this story
    async function getAllImagesForExport() {
      const { data } = await supabase
        .from('story_images')
        .select('*')
        .eq('project_id', story.id)
      return data || []
    }

    // 1. Generate interior PDF blob
    const interiorBlob = await exportTrueBookAsBlob(
      story,
      mergedSections,
      getAllImagesForExport,
      loadImageAsBase64,
      story.cover_image_url || ''
    )

    // 2. Count pages (jsPDF gives us page count via the export)
    // Estimate: roughly 1 page per 2 answered sections + front matter (8 pages)
    const answeredCount = mergedSections.filter((s: any) => s.answer?.trim()).length
    const estimatedPages = Math.max(28, 8 + Math.ceil(answeredCount * 1.4))

    // Add this before generateCoverPDF() call in startPrintOrder()
    const dimsResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/lulu-cover-dimensions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        pod_package_id: '0600X0900.FC.STD.PB.060UW444.MXX',
        interior_page_count: estimatedPages,
        unit: 'mm',
      }),
    })
    const dims = await dimsResponse.json()

console.log('Cover dims from Lulu:', dims.width, dims.height)
    // 3. Generate cover PDF blob
    const coverBlob = await generateCoverPDF({
      title: storyTitle,
      subtitle,
      pageCount: estimatedPages,
      coverImageUrl: story.cover_image_url || '',
      loadImageAsBase64,
      luluWidth: parseFloat(dims.width),
      luluHeight: parseFloat(dims.height),
    })

    // 4. Get last Stripe payment ID for this user (as external reference)
    

    const stripePaymentId = `tmys-${story.id}-${Date.now()}`

    // 5. Open modal with both blobs ready
    printModalData.value = {
      interiorBlob,
      coverBlob,
      pageCount: estimatedPages,
      storyTitle,
      storyId: story.id,
      userId: user.id,
      userEmail: user.email || '',
      stripePaymentId,
    }
    printModalOpen.value = true

  } catch (err) {
    console.error('Print order preparation error:', err)
    alert('Something went wrong preparing your book. Please try again.')
  } finally {
    generatingPrintId.value = null
  }
}

function onOrdered(printJobId: string) {
  printModalOpen.value = false
  track('print_book_ordered', { print_job_id: printJobId })
}

// ── CRUD ──────────────────────────────────────────────────────────────────────

async function createStory(type: string) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  const { data, error } = await supabase
    .from('story_projects')
    .insert([{ user_id: user.id, title: getStoryTitle(type), story_type: type }])
    .select()
    .single()

  if (!error && data) {
    track('story_started', { source: 'dashboard', story_type: type })
    router.push(`/story/${data.id}`)
  }
}

async function fetchStories() {
  const { data, error } = await supabase
    .from('story_projects')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) { console.error('Fetch stories error:', error.message); return }

  if (data) {
    const storiesWithProgress = await Promise.all(
      data.map(async (story) => ({ ...story, progress: await getProgress(story) }))
    )
    stories.value = storiesWithProgress
    isFirstTimeUser.value = storiesWithProgress.length === 0
  }
}

function openStory(id: string) { router.push(`/story/${id}`) }

async function deleteStory(id: string) {
  if (deletingStoryId.value) return
  if (!window.confirm('Are you sure you want to delete this story?')) return

  deletingStoryId.value = id
  const { error } = await supabase.from('story_projects').delete().eq('id', id)
  if (error) { console.error('Delete error:', error.message); alert(error.message) }
  deletingStoryId.value = null
  await fetchStories()
}

async function getProgress(story: any) {
  const { data: answers, error: answersError } = await supabase
    .from('story_answers').select('*').eq('project_id', story.id)
  if (answersError) { console.error('Answers error:', answersError.message); return 0 }

  const { data: sections, error: sectionsError } = await supabase
    .from('story_sections').select('*').eq('story_type', story.story_type)
  if (sectionsError) { console.error('Sections error:', sectionsError.message); return 0 }

  const total = sections?.length || 0
  const completed = answers?.filter((a) => a.answer?.trim() !== '').length || 0
  return total === 0 ? 0 : Math.round((completed / total) * 100)
}

async function loadUserAccess() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) { userAccess.value = []; return }

  const { data, error } = await supabase
    .from('user_access').select('*').eq('user_id', user.id)
  if (error) { console.error('User access error:', error.message); userAccess.value = []; return }
  userAccess.value = data || []
}

onMounted(async () => {
  await loadUserAccess()
  await fetchStories()
})
</script>