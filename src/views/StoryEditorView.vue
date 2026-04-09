<template>
  <div class="min-h-screen bg-stone-50 px-6 py-12">
    <div v-if="project" class="mb-6">
      <label class="mb-2 block text-sm font-medium text-stone-600">
        Story title
      </label>

      <input
        v-model="project.title"
        @blur="saveProjectTitle"
        type="text"
        class="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-stone-900"
        placeholder="Enter story title"
      />
    </div>

    <div
      v-if="hasTier4Access"
      class="mb-6 rounded-2xl border border-stone-200 bg-white p-4"
    >
      <label class="block text-sm font-medium text-stone-700">
        Cover image
      </label>

      <input
        type="file"
        accept="image/*"
        @change="handleCoverImageUpload"
        class="mt-3 block w-full text-sm text-stone-600"
      />

      <p v-if="coverImageStatus" class="mt-2 text-sm text-stone-500">
        {{ coverImageStatus }}
      </p>

      <p class="mt-3 text-center text-xs text-stone-500">
        This will appear on your cover page
      </p>

      <div v-if="coverImageUrl" class="mt-4">
        <div class="mt-4 flex justify-center">
          <div
            class="flex h-56 w-40 items-center justify-center overflow-hidden rounded-xl border border-stone-200 bg-white"
          >
            <img
              :src="coverImageUrl"
              alt="Cover image"
              class="max-h-full max-w-full object-contain"
              @error="coverImageStatus = 'Cover image needs refreshing. Please upload it again.'"
            />
          </div>
        </div>
      </div>
    </div>

    <div
      v-else
      class="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-4"
    >
      <p class="text-sm font-medium text-amber-800">
        Premium keepsake design is included in Tier 4
      </p>

      <p class="mt-2 text-sm leading-6 text-amber-700">
        Unlock cover images, richer layouts, and a more beautifully finished keepsake designed to feel worth keeping or gifting.
      </p>

      <button
        @click="upgradeFromCover"
        class="cursor-pointer mt-4 rounded-full bg-[#7C5C3B] hover:opacity-90 transition px-4 py-2 text-sm font-medium text-white"
      >
        Unlock Premium Keepsake
      </button>
    </div>

    <p
      v-if="paymentMessage"
      class="mb-4 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
    >
      {{ paymentMessage }}
    </p>

    <p
      v-if="cancelMessage"
      class="mb-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700"
    >
      {{ cancelMessage }}
    </p>

    <p
      v-if="pdfSettingsSaved"
      class="mb-4 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
    >
      {{ pdfSettingsSaved }}
    </p>

    <ExportSuccessBanner
      v-if="exportSuccess"
      :has-image-export-access="hasImageExportAccess"
      :has-tier4-access="hasTier4Access"
      @upgrade-premium="upgradeWithImages"
      @open-customiser="showPdfCustomizer = true"
    />

    <p
      v-if="answeredProgress > 40 && !hasImageExportAccess"
      class="mb-2 text-xs text-stone-500"
    >
      You’ve already written {{ answeredProgress }}% of your story — don’t lose the chance to turn it into something lasting.
    </p>

    <div class="mb-6">
      <div class="flex flex-wrap items-center gap-4">
        <button
          @click="handleExportClick"
          :disabled="isExporting"
          class="cursor-pointer h-[42px] rounded-full px-5 text-white transition transform hover:scale-[1.02] active:scale-[0.98]" 
          :class="isPaidUser ? 'bg-[#7C5C3B] hover:opacity-90 transition' : 'cursor-not-allowed bg-stone-400'"
        >
          <span v-if="!isExporting">Create Keepsake PDF</span>
          <span v-else>Creating your keepsake… ✨</span>
        </button>

        <button
          @click="exportWordHandler"
          :disabled="!isPaidUser || isExportingWord"
          class="cursor-pointer h-[42px] rounded-full px-5 text-white transition transform hover:scale-[1.02] active:scale-[0.98]"
          :class="isPaidUser ? 'bg-[#7C5C3B] hover:opacity-90 transition' : 'cursor-not-allowed bg-stone-400'"
        >
          <span v-if="!isExportingWord">Download Story Document</span>
          <span v-else>Preparing document...</span>
        </button>

        <button
          @click="openPremiumPreview"
          class="cursor-pointer rounded-full border border-stone-900 px-6 py-3 text-sm font-medium hover:bg-stone-100 transition transform hover:scale-[1.02]"
        >
          Preview Your Finished Keepsake
        </button>

        <button
          v-if="isPaidUser"
          @click="showPdfCustomizer = true"
          class="cursor-pointer h-[42px] rounded-full border border-stone-900 px-5 text-stone-900 transition transform hover:scale-[1.02] active:scale-[0.98]"
        >
          {{ hasTier4Access ? 'Design your keepsake' : 'Preview premium design' }}
        </button>

        <button
          v-if="isPaidUser && !hasImageExportAccess"
          @click="upgradeFromTopButtons"
          class="cursor-pointer h-[42px] rounded-full border border-stone-900 px-5 text-stone-900 transition transform hover:scale-[1.02] active:scale-[0.98]"
        >
          Add Photos & Premium Layouts
        </button>
      </div>

      <div
        v-if="!hasImageExportAccess"
        class="mt-3 flex items-start gap-2 text-xs text-stone-500"
      >
        <span class="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-medium text-amber-700">
          Premium
        </span>

        <span class="leading-5">
          Add photos, richer layouts, and a more beautifully finished keepsake feel when you’re ready.
        </span>
      </div>
    </div>

    <div
      v-if="hasTier4Access"
      class="mb-6 rounded-2xl border border-stone-200 bg-white p-4"
    >
      <p class="text-sm font-medium text-stone-900">
        Your keepsake design is ready
      </p>
      <p class="mt-2 text-sm text-stone-600">
        Export this story as a beautifully styled book with your chosen format, layout, typography, and cover design.
      </p>
    </div>

    <div
      v-else-if="isPaidUser"
      class="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-4"
    >
      <p class="text-sm font-medium text-amber-800">
        Want a more beautifully finished keepsake?
      </p>
      <p class="mt-2 text-sm text-amber-700">
        Tier 4 unlocks premium layouts, cover design, Portrait Book and Open Spread formats, and the full keepsake design experience.
      </p>
    </div>

    <p class="mb-4 text-sm text-stone-500">
      Current plan:
      <span class="font-medium text-stone-900">
        {{ currentPlanLabel }}
      </span>
    </p>

    <div
      v-if="showMidwayUpgrade"
      class="mb-6 rounded-3xl border border-amber-200 bg-amber-50 p-6"
    >
      <p class="text-sm font-semibold uppercase tracking-[0.18em] text-amber-700">
        Your story is taking shape
      </p>

      <h3 class="mt-2 text-xl font-semibold text-amber-900">
        This could become something really special
      </h3>

      <p class="mt-2 text-sm text-amber-800">
        You’re already building something meaningful. Premium turns this into a beautifully finished keepsake with photos and richer design.
      </p>

      <div class="mt-4 flex flex-wrap items-center gap-3">
        <button
          @click="upgradeFromMidway"
          class="cursor-pointer rounded-full bg-stone-900 px-5 py-2 text-sm text-white"
        >
          Make it a keepsake
        </button>

        <button
          @click="showMidwayUpgrade = false"
          class="cursor-pointer text-sm text-amber-700 underline"
        >
          Maybe later
        </button>
      </div>
    </div>

    <StoryUpgradePanel
      v-if="currentPlan !== 'tier4' && answeredProgress < 20"
      :upgrade-message="upgradeMessage"
      :recommended-text="recommendedUpgradeText"
      :show-tier1="showTier1"
      :show-tier2="showTier2"
      :show-tier3="showTier3"
      :show-tier4="showTier4"
      :tier2-button-text="currentPlan === 'tier1' ? 'Add photos to your story' : 'Choose Tier 2'"
      :tier3-button-text="currentPlan === 'tier2' ? 'Upgrade to All Stories' : 'Choose Tier 3'"
      :tier4-button-text="
        currentPlan === 'tier2' || currentPlan === 'tier3'
          ? 'Upgrade to Premium Keepsake'
          : 'Choose Premium Keepsake'
      "
      @tier1="upgradeSingleText"
      @tier2="upgradeSingleImages"
      @tier3="upgradeAllText"
      @tier4="upgradeAllImages"
    />

    <div class="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-8">
  <div class="order-2 lg:order-1 lg:self-start">
        <StoryMapSidebar
          :chapter-tree="chapterTree"
          :current-section-index="currentSectionIndex"
          :is-chapter-open="isChapterOpen"
          @toggle-chapter="toggleChapter"
          @go-to-section="goToSectionByIndex"
        />
      </div>

      <div class="order-1 lg:order-2">
        <div class="lg:sticky lg:top-6">
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
  </div>
</template>

<script setup lang="ts">
    import { ref, onMounted, computed, nextTick, watch } from 'vue'
    import { supabase } from '../lib/supabase'
    import { useRoute, useRouter } from 'vue-router'
    import { track } from '../lib/analytics'

    import type {
    PdfSettings,   
    StoryProject,
    StorySection,
    StoryChapterGroup,
    } from '../types/story'

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

    const route = useRoute()
    const router = useRouter()
    const hasShownMidwayUpgrade = ref(false)
    const showMidwayUpgrade = ref(false)

    const projectId = route.params.id as string

    const showPremiumPreview = ref(false)
    const showPdfCustomizer = ref(false)

    const isExportingWord = ref(false)
    const exportSuccess = ref(false)
    const isExporting = ref(false)
    const currentSectionIndex = ref(0)
    const saveError = ref('')
    const checkoutLoading = ref(false)

    const sections = ref<StorySection[]>([])
    const openChapters = ref<Record<string, boolean>>({})
    const pdfSettingsSaved = ref('')
    const pdfSettings = ref<PdfSettings>(getDefaultPdfSettings())

    const isPaidUser = ref(false)
    const project = ref<StoryProject | null>(null)
    const paymentMessage = ref('')
    const cancelMessage = ref('')
    const hasImageExportAccess = ref(false)
    const isSavingAnswer = ref(false)

    const currentImageUrl = ref('')
    const imageUploadStatus = ref('')
    const currentImagePreview = ref('')

    const coverImageUrl = ref('')
    const coverImageStatus = ref('')

    const lastSavedAt = ref<Date | null>(null)
    const answerTextarea = ref<HTMLTextAreaElement | null>(null)
    const saveStatus = ref('')

    const answeredProgress = computed(() => {
  if (!sections.value.length) return 0

  const completed = sections.value.filter(
    (section) => section.answer && section.answer.trim().length > 0
  ).length

  return Math.round((completed / sections.value.length) * 100)
})

    const hasCurrentStoryAccess = ref(false)
    const hasAllStoriesAccess = ref(false)

    let saveTimeout: ReturnType<typeof setTimeout> | null = null

    const { exportPdf: runPdfExport, exportWord: runWordExport } = useStoryExport()

    const currentSection = computed(() => {
    return sections.value[currentSectionIndex.value] || null
    })

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
} = useStoryAccess(
  hasCurrentStoryAccess,
  hasAllStoriesAccess,
  hasImageExportAccess,
  isPaidUser
)

    const {  
  upgradeSingleText,
  upgradeSingleImages,
  upgradeAllText,
  upgradeAllImages,
  upgradeWithImages,
} = useStoryCheckout(
  checkoutLoading,
  projectId,
  project,
  hasAllStoriesAccess,
  saveCurrentAnswerBeforeCheckout
)

    const {
  handleImageUpload,
  loadCurrentSectionImage,
  getAllImagesForExport,
  loadImageAsBase64,
  removeCurrentImage,
  handleCoverImageUpload, 
  clearCurrentImageState,
} = useStoryImages({
  projectId,
  project,
  currentSection,
  currentImageUrl,
  currentImagePreview,
  imageUploadStatus,
  coverImageUrl,
  coverImageStatus,
})

const {
  editorProgress,
  getProgressMessage,
  getSavedLabel,
} = useStoryProgress(
  sections,
  currentSectionIndex,
  lastSavedAt
)

    

    const isStoryComplete = computed(() => {
  return sections.value.length > 0 &&
    sections.value.every(section => section.answer && section.answer.trim().length > 0)
})

    const chapterTree = computed<StoryChapterGroup[]>(() => {
    if (!sections.value.length) return []

    const groups: Record<string, any[]> = {}

    

    sections.value.forEach((section, index) => {
    const chapter = section.chapter || 'Other'

    if (!groups[chapter]) {
    groups[chapter] = []
    }

    groups[chapter].push({
    ...section,
    index,
    isCompleted: !!section.answer && !!section.answer.trim(),
    })
    })

    return Object.entries(groups).map(([chapter, questions]) => ({
    chapter,
    questions,
    count: questions.length,
    completedCount: questions.filter((q: any) => q.isCompleted).length,
    }))
    })

    

    watch(currentSectionIndex, async () => {
    clearCurrentImageState()
    await nextTick()
    answerTextarea.value?.focus()
    await loadCurrentSectionImage()
    })

    watch(
    () => currentSection.value?.answer,
    () => {
    if (!currentSection.value) return

    if (exportSuccess.value) {
  exportSuccess.value = false
}

    if (saveTimeout) {
    clearTimeout(saveTimeout)
    }

    saveStatus.value = 'Saving...'

    saveTimeout = setTimeout(async () => {
    await saveAnswer(currentSection.value)
    }, 800)
    }
    )

watch(isStoryComplete, (complete) => {
  if (complete && !hasTier4Access.value) {
    setTimeout(() => {
      showPremiumPreview.value = true
    }, 800)
  }
})

watch(
  () => answeredProgress.value,
  (val) => {
     console.log('answeredProgress:', val)
    if (
      val >= 60 &&
      !hasImageExportAccess.value &&
      !hasShownMidwayUpgrade.value
    ) {
        console.log('show midway banner')
      showMidwayUpgrade.value = true
      hasShownMidwayUpgrade.value = true
    }
  }
)

watch(editorProgress, (val) => {
  if (val === 100) {
    setTimeout(() => {
      window.scrollTo({ top: 300, behavior: 'smooth' })
    }, 300)
  }
})
    

    onMounted(async () => {
    await loadSections()
    await loadAnswers()
    await loadUserAccess()
    await checkPaymentStatus()
    await loadCurrentSectionImage()
    })

    function openCustomiserFromPreview() {
    showPremiumPreview.value = false
    showPdfCustomizer.value = true
    track('customiser_opened', {
    projectId,
  })
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
    if (!(chapter in chapterMap)) {
    chapterMap[chapter] = true
    }
    })

    openChapters.value = chapterMap
    }

    async function goToSectionByIndex(index: number) {
    if (currentSection.value) {
    await saveAnswer(currentSection.value)
    }

    currentSectionIndex.value = index
    }

    async function loadSections() {
    const { data: projectData } = await supabase
    .from('story_projects')
    .select('*')
    .eq('id', projectId)
    .single()

    if (!projectData) return

    project.value = projectData
    coverImageUrl.value = projectData.cover_image_url || ''

    if (projectData.pdf_settings) {
    pdfSettings.value = {
    ...pdfSettings.value,
    ...projectData.pdf_settings,
    }
    }

    const { data: sectionData } = await supabase
    .from('story_sections')
    .select('*')
    .eq('story_type', projectData.story_type)
    .order('order_index', { ascending: true })

    if (sectionData) {
    sections.value = sectionData.map((s) => ({
    id: s.id,
    chapter: s.chapter,
    question: s.question,
    answer: '',
    is_highlighted: false,
    }))
    }
    }

    async function loadAnswers() {
    const { data, error } = await supabase
    .from('story_answers')
    .select('*')
    .eq('project_id', projectId)

    if (!error && data) {
    sections.value = sections.value.map((section) => {
    const saved = data
    .filter((a) => a.section_id === section.id)
    .sort(
    (a, b) =>
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )[0]

    return {
    ...section,
    answer: saved?.answer || '',
    is_highlighted: saved?.is_highlighted || false,
    }
    })
    }

    initializeOpenChapters()
    goToResumeSection()
    }

    async function saveProjectTitle() {
    if (!project.value) return

    await supabase
    .from('story_projects')
    .update({
    title: project.value.title,
    })
    .eq('id', projectId)
    }

    async function loadUserAccess() {
    const {
    data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
    isPaidUser.value = false
    hasCurrentStoryAccess.value = false
    hasAllStoriesAccess.value = false
    return
    }

    const storyType = project.value?.story_type

    const { data, error } = await supabase
    .from('user_access')
    .select('*')
    .eq('user_id', user.id)

    if (error) {
    console.error('Access error:', error.message)
    isPaidUser.value = false
    hasCurrentStoryAccess.value = false
    hasAllStoriesAccess.value = false
    return
    }

    hasAllStoriesAccess.value = !!data?.some(
    (item) => item.access_type === 'story' && item.story_type === 'all'
    )

    hasCurrentStoryAccess.value =
    hasAllStoriesAccess.value ||
    !!data?.some(
    (item) => item.access_type === 'story' && item.story_type === storyType
    )

    const hasExportAccess = !!data?.some(
    (item) =>
    item.access_type === 'export' &&
    (item.variant === 'text_only' || item.variant === 'with_images')
    )

    hasImageExportAccess.value = !!data?.some(
    (item) => item.access_type === 'export' && item.variant === 'with_images'
    )

    isPaidUser.value = hasCurrentStoryAccess.value && hasExportAccess
    }

    async function checkPaymentStatus() {
    const paymentStatus = route.query.payment

    if (paymentStatus === 'success') {
    await loadUserAccess()
    paymentMessage.value = hasImageExportAccess.value
    ? 'Payment successful! Image export is now unlocked.'
    : 'Payment successful! Your export is now unlocked.'
    cancelMessage.value = ''
    }

    if (paymentStatus === 'cancelled') {
    cancelMessage.value =
    'Payment was cancelled. You can try again whenever you are ready.'
    paymentMessage.value = ''
    }

    if (paymentStatus) {
    router.replace({
    path: route.path,
    query: {},
    })
    }
    }

    async function exportPdfHandler() {
        track('export_started', {
  projectId,
  hasImages: hasImageExportAccess.value,
})
    if (!isPaidUser.value) {
  showPremiumPreview.value = true

  track('upgrade_clicked', {
    source: 'export_blocked',
  })

  return
    }

    if (!project.value) return

    if (currentSection.value) {
    if (saveTimeout) {
    clearTimeout(saveTimeout)
    }

    await saveAnswer(currentSection.value)
    }

    isExporting.value = true
    await new Promise((r) => setTimeout(r, 400))

    try {
    await runPdfExport({
    project: project.value,
    sections: sections.value,
    settings: pdfSettings.value,
    hasTier4Access: hasTier4Access.value,
    hasImageExportAccess: hasImageExportAccess.value,
    coverImageUrl: coverImageUrl.value,
    getAllImagesForExport,
    loadImageAsBase64,
    })
track('export_success', {
  projectId,
  hasImages: hasImageExportAccess.value,
  hasTier4: hasTier4Access.value,
})
    exportSuccess.value = true
    pdfSettingsSaved.value = 'Your keepsake has been downloaded'

    nextTick(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    })

    setTimeout(() => {
    if (pdfSettingsSaved.value === 'Your keepsake has been downloaded') {
    pdfSettingsSaved.value = ''
    }
    }, 2000)
    } catch (err) {
    console.error('Export failed:', err)
    } finally {
    isExporting.value = false
    }
    }

    async function exportWordHandler() {
    if (!isPaidUser.value) {
    alert('Upgrade required to download your story.')
    return
    }

    if (!project.value) return

    if (currentSection.value) {
    if (saveTimeout) {
    clearTimeout(saveTimeout)
    }

    await saveAnswer(currentSection.value)
    }

    isExportingWord.value = true

    try {
    await runWordExport({
    project: project.value,
    sections: sections.value,
    })

    pdfSettingsSaved.value = 'Your document has been downloaded'

    setTimeout(() => {
    if (pdfSettingsSaved.value === 'Your document has been downloaded') {
    pdfSettingsSaved.value = ''
    }
    }, 2000)
    } catch (err) {
    console.error('Word export failed:', err)
    } finally {
    isExportingWord.value = false
    }
    }

    async function goToNextSection() {
    if (!currentSection.value) return

    await saveAnswer(currentSection.value)

    if (currentSectionIndex.value < sections.value.length - 1) {
    currentSectionIndex.value++
    }
    }

    async function goToPreviousSection() {
    if (!currentSection.value) return

    await saveAnswer(currentSection.value)

    if (currentSectionIndex.value > 0) {
    currentSectionIndex.value--
    }
    }

    async function saveAnswer(section: StorySection) {
    if (isSavingAnswer.value) return

    isSavingAnswer.value = true
    saveError.value = ''

   const { error } = await supabase.from('story_answers').upsert(
  [
    {
      project_id: projectId,
      section_id: section.id,
      answer: section.answer,
      is_highlighted: !!section.is_highlighted,
    },
  ],
  {
    onConflict: 'project_id,section_id',
  }
)

    if (error) {
    saveStatus.value = ''
    saveError.value = 'Could not save your answer. Please try again.'
    isSavingAnswer.value = false
    return
    }

    saveError.value = ''
    lastSavedAt.value = new Date()
    saveStatus.value = 'Saved'
    isSavingAnswer.value = false

    setTimeout(() => {
    if (saveStatus.value === 'Saved') {
    saveStatus.value = ''
    }
    }, 1500)
    }

    

    

    
    

    async function saveCurrentAnswerBeforeCheckout() {
    if (currentSection.value) {
    if (saveTimeout) {
    clearTimeout(saveTimeout)
    }

    await saveAnswer(currentSection.value)
    }
    }

    function goToResumeSection() {
    const lastAnsweredIndex = [...sections.value]
    .map((section, index) => ({
    index,
    hasAnswer: !!section.answer && !!section.answer.trim(),
    }))
    .filter((item) => item.hasAnswer)
    .map((item) => item.index)
    .pop()

    if (lastAnsweredIndex !== undefined) {
    currentSectionIndex.value = lastAnsweredIndex
    return
    }

    currentSectionIndex.value = 0
    }   
    

    async function savePdfDesign() {
    if (!project.value) return

    const { error } = await supabase
    .from('story_projects')
    .update({
    pdf_settings: pdfSettings.value,
    })
    .eq('id', projectId)
    .select()

    track('design_saved', {
  projectId,
  settings: pdfSettings.value,
})
    if (error) {
    console.error('Save PDF settings failed:', error)
    pdfSettingsSaved.value = 'Could not save design'

    setTimeout(() => {
    if (pdfSettingsSaved.value === 'Could not save design') {
    pdfSettingsSaved.value = ''
    }
    }, 2000)

    return
    }

    project.value = {
    ...project.value,
    pdf_settings: pdfSettings.value,
    }

    pdfSettingsSaved.value = 'PDF design saved'
    showPdfCustomizer.value = false

    setTimeout(() => {
    if (pdfSettingsSaved.value === 'PDF design saved') {
    pdfSettingsSaved.value = ''
    }
    }, 1500)
    }     

    

    function updateCurrentAnswer(value: string) {
  if (!currentSection.value) return
  currentSection.value.answer = value
}

function handleExportClick() {
  if (!isPaidUser.value) {
    showPremiumPreview.value = true
    return
  }

  exportPdfHandler()
}

function handleFinish() {
    track('preview_opened', {
    source: 'completion_finish',
    projectId,
  })
  if (!isPaidUser.value) {
    showPremiumPreview.value = true
    return
  }

  if (!hasTier4Access.value) {
    showPremiumPreview.value = true
    return
  }

  showPdfCustomizer.value = true
}

function openPremiumPreview() {
  showPremiumPreview.value = true
  track('preview_opened', {
    projectId,
  })
}

function upgradeFromMidway() {
  track('upgrade_clicked', {
    source: 'midway_banner',
    projectId,
    plan: 'with_images',
  })
  upgradeWithImages()
}

function upgradeFromCover(){
    track('upgrade_clicked', {
    source: 'cover_banner',
    projectId,
    plan: 'with_images',
  })
  upgradeAllImages()
}

function upgradeFromTopButtons() {
  track('upgrade_clicked', {
    source: 'editor_top_buttons',
    projectId,
    plan: hasAllStoriesAccess.value ? 'all_images' : 'single_images',
  })

  upgradeWithImages()
}


function upgradeFromCompletionCard() {
  track('upgrade_clicked', {
    source: 'completion_card',
    projectId,
    plan: hasAllStoriesAccess.value ? 'all_images' : 'single_images',
  })

  upgradeWithImages()
}

function upgradeFromPreviewModal() {
  track('upgrade_clicked', {
    source: 'premium_preview',
    projectId,
    plan: 'all_images',
  })

  upgradeAllImages()
}

async function toggleCurrentHighlight() {
  if (!currentSection.value) return

  currentSection.value.is_highlighted = !currentSection.value.is_highlighted
  await saveAnswer(currentSection.value)
}

</script>

<style scoped>
    .fade-slide-enter-active,
    .fade-slide-leave-active {
        transition: all 0.25s ease;
    }

    .fade-slide-enter-from {
        opacity: 0;
        transform: translateY(8px);
    }

    .fade-slide-leave-to {
        opacity: 0;
        transform: translateY(-8px);
    }
</style>