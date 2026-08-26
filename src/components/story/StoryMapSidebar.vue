<template>
  <aside class="overflow-hidden rounded-2xl border border-stone-200 bg-white lg:max-h-[calc(100vh-100px)] lg:overflow-y-auto overscroll-contain">

    <!-- ══════════════════════════════════════════════════════════ -->
    <!-- HEADER                                                     -->
    <!-- ══════════════════════════════════════════════════════════ -->
    <div class="border-b border-stone-100 px-5 py-4">

      <!-- Mobile toggle -->
      <button
        type="button"
        @click="isMobileOpen = !isMobileOpen"
        class="flex w-full items-center justify-between text-left lg:hidden"
      >
        <div>
          <h2 class="font-display text-base font-semibold text-stone-900">Story map</h2>
          <p class="mt-0.5 text-xs text-stone-400">
            {{ completedQuestions }} of {{ totalQuestions }} answered
          </p>
        </div>
        <span class="rounded-full border border-stone-200 px-3 py-1 text-xs font-medium text-stone-500">
          {{ isMobileOpen ? 'Hide' : 'Show' }}
        </span>
      </button>

      <!-- Desktop -->
      <div class="hidden lg:block">
        <h2 class="font-display text-base font-semibold text-stone-900">Story map</h2>

        <div class="mt-3 flex items-baseline justify-between">
          <p class="text-xs text-stone-400">Progress</p>
          <p class="font-display text-sm font-semibold text-stone-700">
            {{ completedQuestions }}<span class="text-stone-300">/{{ totalQuestions }}</span>
          </p>
        </div>
        <div class="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-stone-100">
          <div
            class="h-full rounded-full bg-[#7C5C3B] transition-all duration-700"
            :style="{ width: `${overallPercent}%` }"
          />
        </div>
      </div>
    </div>

    <!-- ══════════════════════════════════════════════════════════ -->
    <!-- CHAPTERS                                                   -->
    <!-- ══════════════════════════════════════════════════════════ -->
    <div
      v-show="isMobileOpen || isDesktop"
      class="max-h-[60vh] overflow-y-auto overscroll-contain p-2 lg:max-h-none lg:overflow-visible"
      @touchmove.stop
    >
      <div v-for="chapterGroup in chapterTree" :key="chapterGroup.chapter">

        <!-- Chapter row -->
        <button
          @click="$emit('toggle-chapter', chapterGroup.chapter)"
          class="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-stone-50"
        >
          <!-- Progress ring -->
          <span class="relative flex h-7 w-7 flex-shrink-0 items-center justify-center">
            <svg class="h-7 w-7 -rotate-90" viewBox="0 0 28 28">
              <circle cx="14" cy="14" r="11" fill="none" stroke="#F0EDE9" stroke-width="2.5" />
              <circle
                cx="14" cy="14" r="11"
                fill="none"
                :stroke="chapterGroup.completedCount === chapterGroup.count ? '#7C5C3B' : '#C4A882'"
                stroke-width="2.5"
                stroke-linecap="round"
                :stroke-dasharray="69.1"
                :stroke-dashoffset="69.1 - (69.1 * chapterPercent(chapterGroup)) / 100"
                class="transition-all duration-500"
              />
            </svg>
            <span
              v-if="chapterGroup.completedCount === chapterGroup.count"
              class="absolute text-[10px] text-[#7C5C3B]"
            >✓</span>
          </span>

          <span class="min-w-0 flex-1">
            <span class="block truncate text-[13px] font-semibold text-stone-800">
              {{ chapterGroup.chapter }}
            </span>
            <span class="block text-[11px] text-stone-400">
              {{ chapterGroup.completedCount }} of {{ chapterGroup.count }}
            </span>
          </span>

          <svg
            class="h-3.5 w-3.5 flex-shrink-0 text-stone-300 transition-transform duration-200"
            :class="isChapterOpen(chapterGroup.chapter) ? 'rotate-180' : ''"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        <!-- Questions -->
        <div v-if="isChapterOpen(chapterGroup.chapter)" class="mb-1 ml-[26px] border-l border-stone-100 pl-3">
          <button
            v-for="question in chapterGroup.questions"
            :key="question.id"
            @click="handleGoToSection(question.index)"
            class="group relative -ml-[13px] flex w-[calc(100%+13px)] items-start gap-2.5 rounded-lg py-2 pl-[13px] pr-2 text-left transition hover:bg-stone-50"
          >
            <!-- Active marker -->
            <span
              v-if="question.index === currentSectionIndex"
              class="absolute left-0 top-2 h-[calc(100%-16px)] w-[2px] rounded-full bg-[#7C5C3B]"
            />

            <span
              class="mt-[5px] h-1.5 w-1.5 flex-shrink-0 rounded-full transition"
              :class="question.isCompleted ? 'bg-[#7C5C3B]' : 'bg-stone-200 group-hover:bg-stone-300'"
            />

            <span
              class="line-clamp-2 text-[12px] leading-[1.5]"
              :class="question.index === currentSectionIndex
                ? 'font-semibold text-stone-900'
                : question.isCompleted ? 'text-stone-500' : 'text-stone-600'"
            >
              {{ question.question }}
            </span>
          </button>
        </div>

      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref } from 'vue'
import type { StoryChapterGroup } from '../../types/story'

const props = defineProps<{
  chapterTree: StoryChapterGroup[]
  currentSectionIndex: number
  isChapterOpen: (chapter: string) => boolean
}>()

const emit = defineEmits<{
  (e: 'toggle-chapter', chapter: string): void
  (e: 'go-to-section', index: number): void
}>()

const isMobileOpen = ref(false)
const isDesktop = ref(false)

const totalQuestions = computed(() =>
  props.chapterTree.reduce((sum, chapter) => sum + chapter.count, 0)
)

const completedQuestions = computed(() =>
  props.chapterTree.reduce((sum, chapter) => sum + chapter.completedCount, 0)
)

const overallPercent = computed(() =>
  totalQuestions.value === 0
    ? 0
    : Math.round((completedQuestions.value / totalQuestions.value) * 100)
)

function chapterPercent(chapter: StoryChapterGroup): number {
  if (!chapter.count) return 0
  return (chapter.completedCount / chapter.count) * 100
}

function updateViewportState() {
  isDesktop.value = window.innerWidth >= 1024
  isMobileOpen.value = isDesktop.value
}

function handleGoToSection(index: number) {
  emit('go-to-section', index)
  if (!isDesktop.value) isMobileOpen.value = false
}

onMounted(() => {
  updateViewportState()
  window.addEventListener('resize', updateViewportState)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateViewportState)
})
</script>

<style scoped>
.font-display {
  font-family: 'Playfair Display', Georgia, serif;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>