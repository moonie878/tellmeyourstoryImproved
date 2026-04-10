<template>
  <aside class="h-fit rounded-2xl border border-stone-200 bg-white p-4">
    <!-- Mobile / compact header -->
    <button
      type="button"
      @click="isMobileOpen = !isMobileOpen"
      class="flex w-full items-center justify-between text-left md:hidden"
    >
      <div>
        <h2 class="text-lg font-semibold text-stone-900">Story Map</h2>
        <p class="mt-1 text-sm text-stone-500">
          {{ completedQuestions }} / {{ totalQuestions }} questions complete
        </p>
      </div>

      <span class="rounded-full border border-stone-300 px-3 py-1 text-sm text-stone-600">
        {{ isMobileOpen ? 'Hide' : 'Show' }}
      </span>
    </button>

    <!-- Desktop header -->
    <div class="hidden md:block">
      <h2 class="text-lg font-semibold text-stone-900">Story Map</h2>
      <p class="mt-1 text-sm text-stone-500">
        Jump to any chapter or question
      </p>
      <p class="mt-2 text-xs text-stone-500">
        {{ completedQuestions }} / {{ totalQuestions }} questions complete
      </p>
    </div>

    <!-- Content -->
    <div
      v-show="isMobileOpen || isDesktop"
      class="mt-4 space-y-3"
    >
      <div
        v-for="chapterGroup in chapterTree"
        :key="chapterGroup.chapter"
        class="overflow-hidden rounded-xl border border-stone-200"
      >
        <button
          @click="$emit('toggle-chapter', chapterGroup.chapter)"
          class="flex w-full items-center justify-between px-4 py-3 text-left transition hover:bg-stone-50"
        >
          <div class="min-w-0 pr-4">
            <p class="font-medium text-stone-900">
              {{ chapterGroup.chapter }}
            </p>
            <p class="text-xs text-stone-500">
              {{ chapterGroup.completedCount }} / {{ chapterGroup.count }} complete
            </p>
          </div>

          <span class="shrink-0 text-sm text-stone-500">
            {{ isChapterOpen(chapterGroup.chapter) ? '−' : '+' }}
          </span>
        </button>

        <div
          v-if="isChapterOpen(chapterGroup.chapter)"
          class="border-t border-stone-200 px-2 py-2"
        >
          <button
            v-for="question in chapterGroup.questions"
            :key="question.id"
            @click="handleGoToSection(question.index)"
            class="mb-1 flex w-full items-start justify-between rounded-lg px-3 py-2 text-left text-sm transition hover:bg-stone-100"
            :class="question.index === currentSectionIndex ? 'bg-stone-100 font-medium' : ''"
          >
            <span class="pr-3 leading-5 text-stone-700">
              {{ question.index + 1 }}. {{ question.question }}
            </span>

            <span
              class="shrink-0 text-xs"
              :class="question.isCompleted ? 'text-green-600' : 'text-stone-400'"
            >
              {{ question.isCompleted ? '✓' : '○' }}
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

function updateViewportState() {
  isDesktop.value = window.innerWidth >= 1024

  // Keep mobile map collapsed by default, open on desktop
  if (isDesktop.value) {
    isMobileOpen.value = true
  } else {
    isMobileOpen.value = false
  }
}

function handleGoToSection(index: number) {
  emit('go-to-section', index)

  if (!isDesktop.value) {
    isMobileOpen.value = false
  }
}

onMounted(() => {
  updateViewportState()
  window.addEventListener('resize', updateViewportState)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateViewportState)
})
</script>