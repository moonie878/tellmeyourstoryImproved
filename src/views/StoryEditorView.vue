<template>
  <!-- Checkout loading overlay -->
  <div
    v-if="checkoutLoading"
    class="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 px-6"
  >
    <div class="w-full max-w-md rounded-[2rem] bg-white p-8 text-center shadow-2xl">
      <div class="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-stone-200 border-t-[#7C5C3B]"></div>
      <h3 class="mt-6 text-xl font-semibold text-stone-900">Preparing your checkout</h3>
      <p class="mt-3 text-sm leading-6 text-stone-600">This can take a few moments while everything loads. Please don't close this page.</p>
    </div>
  </div>

  <div class="min-h-screen bg-[#F5F0E8]">

    <!-- ── Sticky top bar ──────────────────────────────────────────────────── -->
    <div class="sticky top-0 z-20 border-b border-stone-200 bg-white px-4 py-3 sm:px-6">
      <div class="mx-auto flex max-w-7xl items-center gap-3">

        <!-- Story title -->
        <div class="min-w-0 flex-1">
          <input
            v-if="project"
            v-model="project.title"
            @blur="saveProjectTitle"
            type="text"
            class="w-full truncate bg-transparent text-base font-semibold text-stone-900 focus:outline-none"
            placeholder="Story title"
          />
        </div>

        <!-- Action buttons -->
        <div class="flex flex-shrink-0 items-center gap-2">

          <!-- Primary: Export PDF (paid) or Preview keepsake (free) -->
          <button
            v-if="isPaidUser"
            @click="handleExportClick"
            :disabled="isExporting"
            class="rounded-full bg-[#7C5C3B] px-4 py-2 text-xs font-medium text-white transition hover:opacity-90 disabled:opacity-50 sm:px-5 sm:text-sm"
          >
            {{ isExporting ? 'Creating…' : 'Export PDF' }}
          </button>

          <button
            v-else
            @click="openPremiumPreview"
            class="rounded-full bg-[#7C5C3B] px-4 py-2 text-xs font-medium text-white transition hover:opacity-90 sm:px-5 sm:text-sm"
          >
            Preview keepsake
          </button>

          <!-- More actions dropdown (paid users only) -->
          <div class="relative" v-if="isPaidUser" data-more-actions>
            <button
              @click="showMoreActions = !showMoreActions"
              class="rounded-full border border-stone-200 bg-white px-3 py-2 text-xs font-medium text-stone-700 transition hover:bg-stone-50"
            >
              More ▾
            </button>
            <div
              v-if="showMoreActions"
              class="absolute right-0 top-full z-30 mt-1 w-52 rounded-2xl border border-stone-200 bg-white py-2 shadow-lg"
            >
               <button
                @click="openPremiumPreview(); showMoreActions = false"
                class="w-full px-4 py-2.5 text-left text-sm text-stone-700 hover:bg-stone-50"
              >
  👁️ Preview finished keepsake
</button>
              <button
                v-if="hasTier4Access"
                @click="showTrueBookModal = true; showMoreActions = false"
                class="w-full px-4 py-2.5 text-left text-sm text-stone-700 hover:bg-stone-50"
              >
                📖 True Book PDF
              </button>
              <button
                v-if="hasTier4Access"
                @click="showVideoModal = true; showMoreActions = false"
                class="w-full px-4 py-2.5 text-left text-sm text-stone-700 hover:bg-stone-50"
              >
                🎬 Create video
              </button>
              <button
                @click="exportWordHandler(); showMoreActions = false"
                :disabled="!isPaidUser || isExportingWord"
                class="w-full px-4 py-2.5 text-left text-sm text-stone-700 hover:bg-stone-50 disabled:opacity-50"
              >
                {{ isExportingWord ? 'Preparing…' : '📄 Download Word doc' }}
              </button>
              <button
                v-if="isPaidUser"
                @click="showPdfCustomizer = true; showMoreActions = false"
                class="w-full px-4 py-2.5 text-left text-sm text-stone-700 hover:bg-stone-50"
              >
                {{ hasTier4Access ? '🎨 Design keepsake' : '🎨 Preview premium design' }}
              </button>
              <button
                v-if="isPaidUser && !hasImageExportAccess"
                @click="upgradeFromTopButtons(); showMoreActions = false"
                class="w-full px-4 py-2.5 text-left text-sm text-[#7C5C3B] hover:bg-stone-50"
              >
                ⭐ Add photos & premium layouts
              </button>
            </div>
          </div>

          <!-- Cover image button (tier 4 only) -->
          <div v-if="hasTier4Access" class="relative flex items-center gap-2">
  <img
    v-if="coverImageUrl"
    :src="coverImageUrl"
    class="h-8 w-6 rounded object-cover border border-stone-200"
    alt="Cover"
  />
  <label class="cursor-pointer rounded-full border border-stone-200 bg-white px-3 py-2 text-xs font-medium text-stone-700 transition hover:bg-stone-50">
    {{ coverImageUrl ? 'Change cover' : '+ Cover image' }}
    <input type="file" accept="image/*" @change="handleCoverImageUpload" class="hidden" />
  </label>
  <button
    v-if="coverImageUrl"
    @click="removeCoverImage"
    class="text-xs text-stone-400 hover:text-red-500"
  >✕</button>
</div>

        </div>
      </div>

      <!-- Plan label + upgrade link -->
      <div class="mx-auto mt-1.5 max-w-7xl">
        <p class="text-[10px] text-stone-400">
          {{ currentPlanLabel }}
          <span v-if="!hasImageExportAccess">
            · <button @click="upgradeFromTopButtons" class="text-[#7C5C3B] hover:underline">Upgrade for photos &amp; premium layouts</button>
          </span>
        </p>
      </div>
    </div>

    <!-- ── Status messages ─────────────────────────────────────────────────── -->
    <div class="mx-auto max-w-7xl px-4 pt-4 sm:px-6">
      <p v-if="paymentMessage" class="mb-3 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">{{ paymentMessage }}</p>
      <p v-if="cancelMessage" class="mb-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">{{ cancelMessage }}</p>
      <p v-if="pdfSettingsSaved" class="mb-3 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">{{ pdfSettingsSaved }}</p>
      <ExportSuccessBanner
        v-if="exportSuccess"
        :has-image-export-access="hasImageExportAccess"
        :has-tier4-access="hasTier4Access"
        @upgrade-premium="upgradeWithImages"
        @open-customiser="showPdfCustomizer = true"
      />
    </div>

    <!-- ── Main editor ─────────────────────────────────────────────────────── -->
    <div class="mx-auto max-w-7xl px-4 py-5 sm:px-6">

      <!-- Upgrade panel (free/low tier, early in journey) -->
      <div v-if="currentPlan !== 'tier4' && answeredProgress < 20" class="mb-5">
        <StoryUpgradePanel
          :upgrade-message="upgradeMessage"
          :recommended-text="recommendedUpgradeText"
          :show-tier1="showTier1"
          :show-tier2="showTier2"
          :show-tier3="showTier3"
          :show-tier4="showTier4"
          :tier2-button-text="currentPlan === 'tier1' ? 'Add photos to your story' : 'Choose Tier 2'"
          :tier3-button-text="currentPlan === 'tier2' ? 'Upgrade to All Stories' : 'Choose Tier 3'"
          :tier4-button-text="currentPlan === 'tier2' || currentPlan === 'tier3' ? 'Upgrade to Premium Keepsake' : 'Choose Premium Keepsake'"
          @tier1="upgradeSingleText"
          @tier2="upgradeSingleImages"
          @tier3="upgradeAllText"
          @tier4="upgradeAllImages"
        />
      </div>

      <!-- Midway upgrade nudge -->
      <div v-if="showMidwayUpgrade" class="mb-5 rounded-3xl border border-amber-200 bg-amber-50 p-5">
        <p class="text-xs font-semibold uppercase tracking-wider text-amber-700">Your story is taking shape</p>
        <h3 class="mt-1.5 text-lg font-semibold text-amber-900">This could become something really special</h3>
        <p class="mt-1.5 text-sm text-amber-800">You're already building something meaningful. Premium turns this into a beautifully finished keepsake with photos and richer design.</p>
        <div class="mt-3 flex gap-3">
          <button @click="upgradeFromMidway" class="rounded-full bg-stone-900 px-4 py-2 text-sm text-white">Make it a keepsake</button>
          <button @click="showMidwayUpgrade = false" class="text-sm text-amber-700 underline">Maybe later</button>
        </div>
      </div>

      <!-- Share nudge (after 10 answers) -->
      <Transition name="fade">
        <div v-if="showShareNudge" class="mb-5 rounded-2xl border border-[#E8DDD0] bg-[#FAF7F4] px-5 py-4">
          <div class="flex items-start justify-between gap-4">
            <div class="flex-1">
              <p class="text-sm font-medium text-[#1C1917]">🤍 Know someone who should do this?</p>
              <p class="mt-1 text-xs leading-5 text-stone-500">Share it with someone who has a parent or grandparent whose stories should be kept.</p>
              <div class="mt-3 flex flex-wrap gap-2">
                <button @click="handleShare" class="inline-flex items-center gap-1.5 rounded-full bg-[#7C5C3B] px-4 py-2 text-xs font-medium text-white transition hover:opacity-90">Share the site</button>
                <button @click="shareWhatsApp('story_editor')" class="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-3 py-2 text-xs font-medium text-stone-700 transition hover:bg-stone-50">💬 WhatsApp</button>
                <button @click="shareEmail('story_editor')" class="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-3 py-2 text-xs font-medium text-stone-700 transition hover:bg-stone-50">✉️ Email</button>
                <p v-if="shareResult" class="self-center text-xs text-green-600">{{ shareResult }}</p>
              </div>
            </div>
            <button @click="showShareNudge = false" class="mt-0.5 text-stone-400 hover:text-stone-600">✕</button>
          </div>
        </div>
      </Transition>

      <!-- Editor grid: story map + question card -->
      <div class="grid gap-5 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-8">

        <!-- Story map sidebar -->
        <div class="lg:order-1 lg:self-start lg:sticky lg:top-[72px]">

          <!-- Mobile toggle -->
          <button
            @click="showMobileMap = !showMobileMap"
            class="flex w-full items-center justify-between rounded-2xl border border-stone-200 bg-white px-4 py-3 text-sm font-medium text-stone-700 lg:hidden"
          >
            <span>📖 Story Map</span>
            <span class="text-stone-400">{{ showMobileMap ? '▲' : '▼' }}</span>
          </button>

          <div :class="showMobileMap ? 'mt-2 block' : 'hidden lg:block'">
            <StoryMapSidebar
              :chapter-tree="chapterTree"
              :current-section-index="currentSectionIndex"
              :is-chapter-open="isChapterOpen"
              @toggle-chapter="toggleChapter"
              @go-to-section="goToSectionByIndex"
            />
          </div>
        </div>

        <!-- Question card -->
        <div class="lg:order-2">
          <div class="mb-3 rounded-2xl border border-stone-100 bg-white px-4 py-3 text-center">
            <p class="text-xs text-stone-400">💛 Answer as many or as few questions as you like — every answer adds to your story.</p>
          </div>

          <StoryQuestionCard
            :section="currentSection"
            :current-index="currentSectionIndex"
            :total-sections="sections.length"
            :progress="editorProgress"
            :progress-message="getProgressMessage()"
            :save-status="saveStatus"
            :save-error="saveError"
            :last-saved-label="getSavedLabel()"
            :current-image-preview="currentImagePreview"
            :image-upload-status="imageUploadStatus"
            :has-image-export-access="hasImageExportAccess"
            :is-highlighted="!!currentSection?.is_highlighted"
            :project-id="projectId"
            @update-answer="updateCurrentAnswer"
            @image-upload="handleImageUpload"
            @remove-image="removeCurrentImage"
            @upgrade-images="upgradeFromCompletionCard"
            @export-pdf="exportPdfHandler"
            @previous="goToPreviousSection"
            @next="goToNextSection"
            @finish="handleFinish"
            @image-error="imageUploadStatus = 'This image needs refreshing. Please upload it again.'"
            @toggle-highlight="toggleCurrentHighlight"
          />
        </div>

      </div>
    </div>

    <!-- ── Modals ──────────────────────────────────────────────────────────── -->
    <PremiumPreviewModal
      :open="showPremiumPreview"
      :has-tier4-access="hasTier4Access"
      :cover-image-url="coverImageUrl"
      :project-title="project?.title"
      :sections="sections"
      @close="showPremiumPreview = false"
      @upgrade="upgradeFromPreviewModal"
      @open-customiser="openCustomiserFromPreview"
    />

    <PdfCustomizerModal
      :open="showPdfCustomizer"
      v-model="pdfSettings"
      :has-tier4-access="hasTier4Access"
      :cover-image-url="coverImageUrl"
      :project-title="project?.title"
      @close="showPdfCustomizer = false"
      @save="savePdfDesign"
      @upgrade="upgradeAllImages"
    />

    <VideoExportModal
      :open="showVideoModal"
      :is-generating="videoGenerating"
      :progress="videoProgress"
      :progress-label="videoProgressLabel"
      :error="videoError"
      :answered-count="answeredSections"
      @close="showVideoModal = false"
      @export="handleVideoExport"
    />

    <TrueBookExportModal
      :open="showTrueBookModal"
      :is-exporting="trueBookExporting"
      :progress="trueBookProgress"
      :progress-label="trueBookProgressLabel"
      :error="trueBookError"
      @close="showTrueBookModal = false"
      @export="handleTrueBookExport"
    />

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, nextTick, watch } from 'vue'
import { supabase } from '../lib/supabase'
import { useRoute, useRouter } from 'vue-router'
import { track } from '../lib/analytics'

import type { PdfSettings, StoryProject, StorySection, StoryChapterGroup } from '../types/story'

import { getDefaultPdfSettings } from '../utils/pdfDesign'
import { useStoryExport } from '../composables/useStoryExport'
import StoryQuestionCard from '../components/story/StoryQuestionCard.vue'
import StoryMapSidebar from '../components/story/StoryMapSidebar.vue'
import { useStoryAccess } from '../composables/useStoryAccess'
import { useStoryCheckout } from '../composables/useStoryCheckout'
import { useStoryImages } from '../composables/useStoryImages'
import { useStoryProgress } from '../composables/useStoryProgress'
import ExportSuccessBanner from '../components/story/ExportSuccessBanner.vue'
import PremiumPreviewModal from '../components/story/PremiumPreviewModal.vue'
import PdfCustomizerModal from '../components/story/PdfCustomizerModal.vue'
import StoryUpgradePanel from '../components/story/StoryUpgradePanel.vue'
import type { VideoOptions } from '../composables/useStoryVideo'
import VideoExportModal from '../components/story/VideoExportModal.vue'
import { useStoryVideo } from '../composables/useStoryVideo'
import TrueBookExportModal from '../components/story/TrueBookExportModal.vue'
import { useStoryTrueBookExport } from '../composables/useTrueBookExport'
import { useShare } from '../composables/useShare'

const route = useRoute()
const router = useRouter()

const projectId = route.params.id as string

// ── UI state ───────────────────────────────────────────────────────────────────
const showMoreActions     = ref(false)
const showMobileMap       = ref(false)
const showPremiumPreview  = ref(false)
const showPdfCustomizer   = ref(false)
const showVideoModal      = ref(false)
const showTrueBookModal   = ref(false)
const showMidwayUpgrade   = ref(false)
const showShareNudge      = ref(false)
const hasShownMidwayUpgrade = ref(false)

// ── Loading / export state ─────────────────────────────────────────────────────
const checkoutLoading  = ref(false)
const isExporting      = ref(false)
const isExportingWord  = ref(false)
const exportSuccess    = ref(false)
const isSavingAnswer   = ref(false)

// ── Story state ────────────────────────────────────────────────────────────────
const sections            = ref<StorySection[]>([])
const openChapters        = ref<Record<string, boolean>>({})
const currentSectionIndex = ref(0)
const project             = ref<StoryProject | null>(null)
const pdfSettings         = ref<PdfSettings>(getDefaultPdfSettings())

// ── Access state ───────────────────────────────────────────────────────────────
const isPaidUser              = ref(false)
const hasCurrentStoryAccess   = ref(false)
const hasAllStoriesAccess     = ref(false)
const hasImageExportAccess    = ref(false)

// ── Status messages ────────────────────────────────────────────────────────────
const saveStatus      = ref('')
const saveError       = ref('')
const paymentMessage  = ref('')
const cancelMessage   = ref('')
const pdfSettingsSaved = ref('')

// ── Image state ────────────────────────────────────────────────────────────────
const currentImageUrl    = ref('')
const imageUploadStatus  = ref('')
const currentImagePreview = ref('')
const coverImageUrl      = ref('')
const coverImageStatus   = ref('')

const isInitialLoad = ref(true)

// ── Misc ───────────────────────────────────────────────────────────────────────
const lastSavedAt    = ref<Date | null>(null)
const answerTextarea = ref<HTMLTextAreaElement | null>(null)
const shareResult    = ref('')
let saveTimeout: ReturnType<typeof setTimeout> | null = null

// ── Composables ────────────────────────────────────────────────────────────────
const { share, shareWhatsApp, shareEmail } = useShare()
const { exportPdf: runPdfExport, exportWord: runWordExport } = useStoryExport()

const {
  isGenerating: videoGenerating,
  progress: videoProgress,
  progressLabel: videoProgressLabel,
  error: videoError,
  generateVideo,
} = useStoryVideo()

const {
  isExporting: trueBookExporting,
  progress: trueBookProgress,
  progressLabel: trueBookProgressLabel,
  error: trueBookError,
  exportTrueBook,
} = useStoryTrueBookExport()

const {
  currentPlan,
  hasTier4Access,
  showTier1,
  showTier2,
  showTier3,
  showTier4,
  recommendedUpgradeText,
  upgradeMessage,
  currentPlanLabel,
} = useStoryAccess(hasCurrentStoryAccess, hasAllStoriesAccess, hasImageExportAccess, isPaidUser)

const {
  upgradeSingleText,
  upgradeSingleImages,
  upgradeAllText,
  upgradeAllImages,
  upgradeWithImages,
} = useStoryCheckout(checkoutLoading, projectId, project, hasAllStoriesAccess, saveCurrentAnswerBeforeCheckout)

const {
  handleImageUpload,
  loadCurrentSectionImage,
  getAllImagesForExport,
  loadImageAsBase64,
  removeCurrentImage,
  handleCoverImageUpload,
  clearCurrentImageState,
  refreshCoverImageIfExpired,
} = useStoryImages({
  projectId, project, currentSection: computed(() => currentSection.value),
  currentImageUrl, currentImagePreview, imageUploadStatus,
  coverImageUrl, coverImageStatus,
})

const { editorProgress, getProgressMessage, getSavedLabel } = useStoryProgress(
  sections, currentSectionIndex, lastSavedAt
)

// ── Computed ───────────────────────────────────────────────────────────────────
const currentSection = computed(() => sections.value[currentSectionIndex.value] || null)

const answeredSections = computed(() =>
  sections.value.filter((s) => s.answer?.trim()).length
)

const answeredProgress = computed(() => {
  if (!sections.value.length) return 0
  const completed = sections.value.filter((s) => s.answer && s.answer.trim().length > 0).length
  return Math.round((completed / sections.value.length) * 100)
})

const isStoryComplete = computed(() =>
  sections.value.length > 0 &&
  sections.value.every((s) => s.answer && s.answer.trim().length > 0)
)

const chapterTree = computed<StoryChapterGroup[]>(() => {
  if (!sections.value.length) return []
  const groups: Record<string, any[]> = {}
  sections.value.forEach((section, index) => {
    const chapter = section.chapter || 'Other'
    if (!groups[chapter]) groups[chapter] = []
    groups[chapter].push({ ...section, index, isCompleted: !!section.answer?.trim() })
  })
  return Object.entries(groups).map(([chapter, questions]) => ({
    chapter,
    questions,
    count: questions.length,
    completedCount: questions.filter((q: any) => q.isCompleted).length,
  }))
})

// ── Watchers ───────────────────────────────────────────────────────────────────
watch(currentSectionIndex, async () => {
  clearCurrentImageState()
  await nextTick()
  answerTextarea.value?.focus()
  await loadCurrentSectionImage()
})

watch(
  () => currentSection.value?.answer,
  (newVal, oldVal) => {
    if (!currentSection.value) return
    if (newVal === oldVal) return  // ← no actual change, skip
    if (exportSuccess.value) exportSuccess.value = false
    if (saveTimeout) clearTimeout(saveTimeout)
    saveStatus.value = 'Saving...'
    saveTimeout = setTimeout(async () => {
      await saveAnswer(currentSection.value!)
    }, 800)
  }
)

watch(isStoryComplete, (complete) => {
  if (complete && !hasTier4Access.value) {
    setTimeout(() => { showPremiumPreview.value = true }, 800)
  }
})

watch(
  () => answeredProgress.value,
  (val) => {
    if (val >= 60 && !hasImageExportAccess.value && !hasShownMidwayUpgrade.value) {
      showMidwayUpgrade.value = true
      hasShownMidwayUpgrade.value = true
    }
  }
)

watch(
  () => answeredSections.value,
  (val, oldVal) => {
    if (val >= 10 && oldVal < 10) showShareNudge.value = true
  }
)

// ── Lifecycle ──────────────────────────────────────────────────────────────────
onMounted(async () => {

  // Wait for auth session to be fully established
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    // Retry once after a short delay for OAuth redirect sessions
    await new Promise(resolve => setTimeout(resolve, 500))
  }

  await loadSections()
  await loadAnswers()
  await loadUserAccess()
  await checkPaymentStatus()
  await loadCurrentSectionImage()
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// ── Functions ──────────────────────────────────────────────────────────────────
function handleClickOutside(e: MouseEvent) {
  const target = e.target as HTMLElement
  if (!target.closest('[data-more-actions]')) showMoreActions.value = false
}

async function handleShare() {
  const result = await share('story_editor')
  if (result === 'copied') {
    shareResult.value = 'Link copied!'
    setTimeout(() => shareResult.value = '', 3000)
  }
}

function toggleChapter(chapter: string) {
  openChapters.value[chapter] = !openChapters.value[chapter]
}

function isChapterOpen(chapter: string) {
  return !!openChapters.value[chapter]
}

function initializeOpenChapters() {
  const chapterMap: Record<string, boolean> = {}
  sections.value.forEach((section) => {
    const chapter = section.chapter || 'Other'
    if (!(chapter in chapterMap)) chapterMap[chapter] = false
  })
  openChapters.value = chapterMap
}

async function goToSectionByIndex(index: number) {
  if (currentSection.value) await saveAnswer(currentSection.value)
  currentSectionIndex.value = index

  // Open the chapter of the section we navigated to
  const chapter = sections.value[index]?.chapter
  if (chapter) openChapters.value[chapter] = true
}

async function loadSections() {
  const { data: projectData } = await supabase
    .from('story_projects').select('*').eq('id', projectId).single()
  if (!projectData) return

  project.value = projectData
  coverImageUrl.value = projectData.cover_image_url || ''
  if (coverImageUrl.value) {
    coverImageUrl.value = await refreshCoverImageIfExpired(coverImageUrl.value)
  }
  if (projectData.pdf_settings) {
    pdfSettings.value = { ...pdfSettings.value, ...projectData.pdf_settings }
  }

  const { data: sectionData } = await supabase
    .from('story_sections').select('*')
    .eq('story_type', projectData.story_type)
    .order('order_index', { ascending: true })

  if (sectionData) {
    sections.value = sectionData.map((s) => ({
      id: s.id, chapter: s.chapter, question: s.question, answer: '', is_highlighted: false,
    }))
  }
}

async function loadAnswers() {
  const { data, error } = await supabase
    .from('story_answers').select('*').eq('project_id', projectId)

  if (!error && data) {
    // Set flag BEFORE updating sections so watcher doesn't fire during load
    isInitialLoad.value = false  // ← move to here

    sections.value = sections.value.map((section) => {
      const saved = data
        .filter((a) => a.section_id === section.id)
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0]
      return { ...section, answer: saved?.answer || '', is_highlighted: saved?.is_highlighted || false }
    })
  } else {
    isInitialLoad.value = false  // ← also set if no data
  }

  initializeOpenChapters()
  goToResumeSection()
}

async function saveProjectTitle() {
  if (!project.value) return
  await supabase.from('story_projects').update({ title: project.value.title }).eq('id', projectId)
}

async function loadUserAccess() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) { isPaidUser.value = false; hasCurrentStoryAccess.value = false; hasAllStoriesAccess.value = false; return }

  const storyType = project.value?.story_type
  const { data, error } = await supabase.from('user_access').select('*').eq('user_id', user.id)

  if (error) { console.error('Access error:', error.message); isPaidUser.value = false; hasCurrentStoryAccess.value = false; hasAllStoriesAccess.value = false; return }

  hasAllStoriesAccess.value = !!data?.some((item) => item.access_type === 'story' && item.story_type === 'all')
  hasCurrentStoryAccess.value = hasAllStoriesAccess.value || !!data?.some((item) => item.access_type === 'story' && item.story_type === storyType)
  hasImageExportAccess.value = !!data?.some((item) => item.access_type === 'export' && item.variant === 'with_images')
  const hasExportAccess = !!data?.some((item) => item.access_type === 'export' && (item.variant === 'text_only' || item.variant === 'with_images'))
  isPaidUser.value = hasCurrentStoryAccess.value && hasExportAccess
}

async function checkPaymentStatus() {
  const paymentStatus = route.query.payment
  if (paymentStatus === 'success') {
    await loadUserAccess()
    paymentMessage.value = hasImageExportAccess.value ? 'Payment successful! Image export is now unlocked.' : 'Payment successful! Your export is now unlocked.'
    cancelMessage.value = ''
  }
  if (paymentStatus === 'cancelled') {
    cancelMessage.value = 'Payment was cancelled. You can try again whenever you are ready.'
    paymentMessage.value = ''
  }
  if (paymentStatus) router.replace({ path: route.path, query: {} })
}

async function exportPdfHandler() {
  track('export_started', { projectId, hasImages: hasImageExportAccess.value })
  if (!isPaidUser.value) { showPremiumPreview.value = true; track('upgrade_clicked', { source: 'export_blocked' }); return }
  if (!project.value) return
  if (currentSection.value) { if (saveTimeout) clearTimeout(saveTimeout); await saveAnswer(currentSection.value) }

  isExporting.value = true
  await new Promise((r) => setTimeout(r, 400))
  try {
    await runPdfExport({ project: project.value, sections: sections.value, settings: pdfSettings.value, hasTier4Access: hasTier4Access.value, hasImageExportAccess: hasImageExportAccess.value, coverImageUrl: coverImageUrl.value, getAllImagesForExport, loadImageAsBase64 })
    track('export_success', { projectId, hasImages: hasImageExportAccess.value, hasTier4: hasTier4Access.value })
    exportSuccess.value = true
    pdfSettingsSaved.value = 'Your keepsake has been downloaded'
    nextTick(() => window.scrollTo({ top: 0, behavior: 'smooth' }))
    setTimeout(() => { if (pdfSettingsSaved.value === 'Your keepsake has been downloaded') pdfSettingsSaved.value = '' }, 2000)
  } catch (err) {
    console.error('Export failed:', err)
  } finally {
    isExporting.value = false
  }
}

async function exportWordHandler() {
  if (!isPaidUser.value) { alert('Upgrade required to download your story.'); return }
  if (!project.value) return
  if (currentSection.value) { if (saveTimeout) clearTimeout(saveTimeout); await saveAnswer(currentSection.value) }
  isExportingWord.value = true
  try {
    await runWordExport({ project: project.value, sections: sections.value })
    pdfSettingsSaved.value = 'Your document has been downloaded'
    setTimeout(() => { if (pdfSettingsSaved.value === 'Your document has been downloaded') pdfSettingsSaved.value = '' }, 2000)
  } catch (err) {
    console.error('Word export failed:', err)
  } finally {
    isExportingWord.value = false
  }
}

async function goToNextSection() {
  if (!currentSection.value) return
  await saveAnswer(currentSection.value)
  if (currentSectionIndex.value < sections.value.length - 1) currentSectionIndex.value++
}

async function goToPreviousSection() {
  if (!currentSection.value) return
  await saveAnswer(currentSection.value)
  if (currentSectionIndex.value > 0) currentSectionIndex.value--
}

async function saveAnswer(section: StorySection) {
  if (isSavingAnswer.value) return
  isSavingAnswer.value = true
  saveError.value = ''
  const { error } = await supabase.from('story_answers').upsert(
    [{ project_id: projectId, section_id: section.id, answer: section.answer, is_highlighted: !!section.is_highlighted }],
    { onConflict: 'project_id,section_id' }
  )
  if (error) { saveStatus.value = ''; saveError.value = 'Could not save your answer. Please try again.'; isSavingAnswer.value = false; return }
  saveError.value = ''
  lastSavedAt.value = new Date()
  saveStatus.value = 'Saved'
  isSavingAnswer.value = false
  setTimeout(() => { if (saveStatus.value === 'Saved') saveStatus.value = '' }, 1500)
}

async function saveCurrentAnswerBeforeCheckout() {
  if (currentSection.value) { if (saveTimeout) clearTimeout(saveTimeout); await saveAnswer(currentSection.value) }
}

function goToResumeSection() {
  const lastAnsweredIndex = [...sections.value]
    .map((s, i) => ({ i, has: !!s.answer?.trim() }))
    .filter(x => x.has).map(x => x.i).pop()

  currentSectionIndex.value = lastAnsweredIndex ?? 0

  // Open the starting chapter
  const chapter = sections.value[currentSectionIndex.value]?.chapter
  if (chapter) openChapters.value[chapter] = true
}

async function savePdfDesign() {
  if (!project.value) return
  const { error } = await supabase.from('story_projects').update({ pdf_settings: pdfSettings.value }).eq('id', projectId).select()
  track('design_saved', { projectId, settings: pdfSettings.value })
  if (error) { console.error('Save PDF settings failed:', error); pdfSettingsSaved.value = 'Could not save design'; setTimeout(() => { if (pdfSettingsSaved.value === 'Could not save design') pdfSettingsSaved.value = '' }, 2000); return }
  project.value = { ...project.value, pdf_settings: pdfSettings.value }
  pdfSettingsSaved.value = 'PDF design saved'
  showPdfCustomizer.value = false
  setTimeout(() => { if (pdfSettingsSaved.value === 'PDF design saved') pdfSettingsSaved.value = '' }, 1500)
}

async function removeCoverImage() {
  coverImageUrl.value = ''
  coverImageStatus.value = ''
  await supabase.from('story_projects').update({ cover_image_url: null }).eq('id', projectId)
}

function updateCurrentAnswer(value: string) {
  if (!currentSection.value) return
  currentSection.value.answer = value
}

function handleExportClick() {
  if (!isPaidUser.value) { showPremiumPreview.value = true; return }
  exportPdfHandler()
}

function handleFinish() {
  track('preview_opened', { source: 'completion_finish', projectId })
  if (!isPaidUser.value || !hasTier4Access.value) { showPremiumPreview.value = true; return }
  showPdfCustomizer.value = true
}

function openPremiumPreview() {
  showPremiumPreview.value = true
  track('preview_opened', { projectId })
}

function openCustomiserFromPreview() {
  showPremiumPreview.value = false
  showPdfCustomizer.value = true
  track('customiser_opened', { projectId })
}

function upgradeFromMidway() {
  track('upgrade_clicked', { source: 'midway_banner', projectId, plan: 'with_images' })
  upgradeWithImages()
}



function upgradeFromTopButtons() {
  track('upgrade_clicked', { source: 'editor_top_buttons', projectId, plan: hasAllStoriesAccess.value ? 'all_images' : 'single_images' })
  upgradeWithImages()
}

function upgradeFromCompletionCard() {
  track('upgrade_clicked', { source: 'completion_card', projectId, plan: hasAllStoriesAccess.value ? 'all_images' : 'single_images' })
  upgradeWithImages()
}

function upgradeFromPreviewModal() {
  track('upgrade_clicked', { source: 'premium_preview', projectId, plan: 'all_images' })
  upgradeAllImages()
}

async function handleVideoExport(options: VideoOptions) {
  await generateVideo(project.value!, sections.value, await getAllImagesForExport(), { ...options, musicTrack: null })
}

async function toggleCurrentHighlight() {
  if (!currentSection.value) return
  currentSection.value.is_highlighted = !currentSection.value.is_highlighted
  await saveAnswer(currentSection.value)
}

async function handleTrueBookExport() {
  await exportTrueBook(project.value!, sections.value, getAllImagesForExport, loadImageAsBase64, coverImageUrl.value)
}
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active { transition: all 0.25s ease; }
.fade-slide-enter-from { opacity: 0; transform: translateY(8px); }
.fade-slide-leave-to { opacity: 0; transform: translateY(-8px); }
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>