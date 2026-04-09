<template>
  <div
    v-if="open"
    class="fixed inset-0 z-50 overflow-y-auto bg-black/50 px-4 py-6"
  >
    <div class="flex min-h-full items-center justify-center">
      <div class="flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-[2rem] bg-white shadow-2xl">
        <div class="shrink-0 border-b border-stone-200 bg-white px-8 py-6">
          <div class="flex items-start justify-between gap-4">
            <div class="max-w-3xl">
              <p class="text-xs font-medium uppercase tracking-[0.25em] text-stone-500">
                Premium Preview
              </p>
              <h3 class="mt-3 text-3xl font-bold text-stone-900">
  See how your story becomes a keepsake
</h3>
<p class="mt-3 max-w-2xl text-sm leading-6 text-stone-600">
  Premium transforms your answers into something that feels more personal, more beautifully finished, and more worthy of printing, sharing, or gifting.
</p>
            </div>

            <button
              @click="$emit('close')"
              class="shrink-0 rounded-full border border-stone-300 px-4 py-2 text-sm text-stone-700 transition hover:bg-stone-100"
            >
              Close
            </button>
          </div>
        </div>

        <div class="min-h-0 overflow-y-auto px-8 py-8">
          <div class="mb-4 flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.22em] text-stone-500">
  <span>Standard Story</span>
  <span>Premium Keepsake</span>
</div>

<div class="mt-5 text-center">
  <p class="text-sm text-stone-600">
    Drag the slider to see the difference between a simple story export and a more beautifully finished keepsake.
  </p>
</div>
          <div
            ref="premiumPreviewRef"
           class="relative mx-auto h-[360px] w-full max-w-5xl select-none overflow-hidden rounded-[2rem] border border-stone-200 bg-stone-100 shadow-inner touch-none md:h-[520px]"
            @pointerdown="onPremiumPreviewPointerDown"
            @pointermove="onPremiumPreviewPointerMove"
            @pointerup="onPremiumPreviewPointerUp"
            @pointercancel="onPremiumPreviewPointerUp"
          >
          
            <Transition
              enter-active-class="transition duration-500 ease-out"
              enter-from-class="opacity-0 translate-y-2"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition duration-300 ease-in"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <div
                v-if="showPremiumPreviewHint"
                class="pointer-events-none absolute left-1/2 top-4 z-30 -translate-x-1/2 rounded-full bg-stone-900/90 px-4 py-2 text-xs font-medium text-white shadow-lg"
              >
                Drag to compare
              </div>
            </Transition>

            <div class="absolute inset-0 bg-[#f7f2eb]">
              <div class="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-stone-200/20"></div>
            </div>

            <!-- PREMIUM SIDE (background layer) -->
<div class="absolute inset-0">
  <div class="absolute inset-0 flex items-center justify-center px-6 py-8 md:px-10 md:py-10">
    <div class="w-full max-w-5xl">
  <!-- Mobile premium preview -->
  <div class="mx-auto max-w-[340px] rounded-[1.75rem] border border-stone-300 bg-[#f6efe7] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.12)] md:hidden">
    <div class="relative overflow-hidden rounded-[1.25rem] border border-stone-200 bg-stone-100">
      <img
        :src="previewCoverImageSrc"
        alt="Premium preview"
        class="h-[180px] w-full object-cover"
      />

      <div
        v-if="!coverImageUrl"
        class="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-medium text-stone-600 shadow-sm"
      >
        Sample preview
      </div>
    </div>

    <p class="mt-4 text-[10px] uppercase tracking-[0.28em] text-stone-500">
      Tell Me Your Story
    </p>

    <h4 class="mt-3 font-serif text-[1.9rem] leading-none text-stone-900">
      {{ projectTitle || 'Your Story Title' }}
    </h4>

    <p class="mt-3 text-sm leading-6 text-stone-500">
  {{ previewSubtitle }}
</p>

    <div class="mt-5 border-t border-stone-200 pt-4">
      <p class="text-xs uppercase tracking-[0.24em] text-stone-500">
  Chapter Preview
</p>
<h5 class="mt-2 font-serif text-2xl text-stone-900">
  {{ previewChapter }}
</h5>
<p class="mt-4 text-sm italic leading-6 text-stone-600">
  “{{ previewQuote }}”
</p>
    </div>
  </div>

  <!-- Desktop premium preview -->
  <div class="hidden items-center gap-6 md:grid md:grid-cols-2">
    <!-- Left premium page -->
    <div class="rounded-[2rem] border border-stone-300 bg-[#f6efe7] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
      <p class="text-[10px] uppercase tracking-[0.28em] text-stone-500">
        Tell Me Your Story
      </p>

      <h4 class="mt-5 font-serif text-[2.4rem] leading-none text-stone-900">
        {{ projectTitle || 'Your Story Title' }}
      </h4>

     <p class="mt-4 text-sm leading-6 text-stone-500">
  {{ previewSubtitle }}
</p>

      <div class="mt-8 border-t border-stone-200 pt-6">
        <p class="text-xs uppercase tracking-[0.24em] text-stone-500">
  Chapter Preview
</p>
<h5 class="mt-3 font-serif text-3xl text-stone-900">
  {{ previewChapter }}
</h5>
<p class="mt-6 text-sm italic leading-7 text-stone-600">
  “{{ previewQuote }}”
</p>
      </div>
    </div>

    <!-- Right premium page -->
    <div class="rounded-[2rem] border border-stone-300 bg-[#f6efe7] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
      <div class="relative overflow-hidden rounded-[1.5rem] border border-stone-200 bg-stone-100">
        <img
          :src="previewCoverImageSrc"
          alt="Premium preview"
          class="h-[300px] w-full object-cover"
        />

        <div
          v-if="!coverImageUrl"
          class="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-medium text-stone-600 shadow-sm"
        >
          Sample preview
        </div>
      </div>

      <div class="mt-5">
       <p class="text-sm font-semibold text-stone-900">
  {{ previewQuestion }}
</p>
<p class="mt-2 text-sm leading-6 text-stone-600">
  Richer layouts, stronger emotional pacing, quote moments, photo-led pages, and a more polished final keepsake feel.
</p>
      </div>
    </div>
  </div>
</div>
  </div>
</div>

<!-- STANDARD SIDE (revealed by slider) -->
<div
  class="absolute inset-0 bg-stone-50"
  :style="{ clipPath: `inset(0 ${100 - premiumPreviewSlider}% 0 0)` }"
>
  <div class="absolute inset-0 flex items-center justify-center px-6 py-8 md:px-10 md:py-10">
    <div class="w-full max-w-[320px] rounded-[2rem] border border-stone-200 bg-white p-5 shadow-sm md:max-w-[420px] md:p-6">
      <div class="mb-5 flex h-40 items-center justify-center rounded-2xl border border-dashed border-stone-300 bg-stone-50 text-sm text-stone-400">
        No cover image
      </div>

      <p class="text-center text-[10px] uppercase tracking-[0.28em] text-stone-500">
        Tell Me Your Story
      </p>

      <h4 class="mt-4 text-center font-serif text-[2rem] leading-none text-stone-900">
        {{ projectTitle || 'Your Story Title' }}
      </h4>

      <p class="mt-4 text-center text-sm text-stone-500">
        A simple text-based keepsake
      </p>

      <div class="mt-6 border-t border-stone-200 pt-4">
       <p class="text-sm font-semibold text-stone-800">
  Chapter Preview
</p>
<p class="mt-1 text-xs text-stone-500">
  {{ previewChapter }}
</p>
<p class="mt-3 text-sm text-stone-700">
  {{ previewQuestion }}
</p>
<p class="mt-2 text-xs leading-6 text-stone-500">
  Clean, readable, and simple — but without the richer keepsake feel.
</p>
      </div>
    </div>
  </div>
</div>

            <div
              class="absolute inset-y-0 z-10"
              :style="{ left: `${premiumPreviewSlider}%`, transform: 'translateX(-50%)' }"
            >
              <div class="relative flex h-full items-center justify-center">
                <div
                  class="absolute inset-y-0 left-1/2 w-px -translate-x-1/2"
                  :class="isDraggingPremiumPreview ? 'bg-stone-900' : 'bg-white/90'"
                ></div>

                <div
                  class="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white shadow-xl backdrop-blur transition"
                  :class="isDraggingPremiumPreview ? 'scale-105 shadow-2xl' : 'hover:scale-105 hover:shadow-lg'"
                >
                  <div class="flex items-center gap-1 text-stone-500">
                    <span class="text-sm">‹</span>
                    <span class="text-sm">›</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/5 to-transparent"></div>
          </div>

          <div class="mt-8 grid gap-4 md:grid-cols-3">
  <div class="rounded-2xl border border-stone-200 bg-stone-50 p-5">
    <p class="text-sm font-semibold text-stone-900">
      Feels more like a real book
    </p>
    <p class="mt-2 text-sm leading-6 text-stone-600">
      Premium layouts create more breathing space, stronger chapter moments, and a calmer, more editorial feel.
    </p>
  </div>

  <div class="rounded-2xl border border-stone-200 bg-stone-50 p-5">
    <p class="text-sm font-semibold text-stone-900">
      Worth printing and gifting
    </p>
    <p class="mt-2 text-sm leading-6 text-stone-600">
      Turn meaningful answers into something polished enough to keep for yourself or give to someone you love.
    </p>
  </div>

  <div class="rounded-2xl border border-stone-200 bg-stone-50 p-5">
    <p class="text-sm font-semibold text-stone-900">
      Richer pages, images, and pacing
    </p>
    <p class="mt-2 text-sm leading-6 text-stone-600">
      Unlock cover images, stronger quote moments, portrait and spread layouts, and a more elevated keepsake finish.
    </p>
  </div>
</div>

          <div class="mt-8 rounded-3xl border border-stone-200 bg-stone-50 p-6">
            <div class="flex flex-col gap-6 lg:flex-row md:items-center md:justify-between">
              <div class="max-w-2xl">
               <p class="text-base font-semibold text-stone-900">
  You’ve already written something meaningful — premium helps it feel truly special
</p>
<p class="mt-2 text-sm leading-6 text-stone-600">
  Give your story a more beautiful final form with thoughtful layout, richer presentation, and a finished keepsake feel.
</p>
<p class="mt-3 text-xs text-stone-500">
  A simple one-time upgrade turns your story into something you can keep, print, and treasure.
</p>
              </div>
<div class="flex flex-col items-start gap-3 lg:items-end">
              <button
                v-if="!hasTier4Access"
                @click="$emit('upgrade')"
                class="shrink-0 rounded-full bg-[#7C5C3B] hover:opacity-90 transition px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
              >
                Create My Keepsake
              </button>

              <button
                v-else
                @click="$emit('open-customiser')"
                class="shrink-0 rounded-full bg-[#7C5C3B] hover:opacity-90 transition px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
              >
                Open My Keepsake Design
              </button>
              <p class="max-w-[18rem] text-xs text-stone-500 lg:text-right">
        You can keep writing and upgrade whenever you're ready — nothing is lost.
      </p>
 <p class="max-w-[18rem] text-xs text-stone-500 lg:text-right">
        Most people upgrade once they see how much more special the finished keepsake feels.
      </p>
</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, toRef } from 'vue'
import sampleCoverImage from '../../assets/sample-cover.jpg'
import { usePremiumPreview } from '../../composables/usePremiumPreview'

const props = defineProps<{
  open: boolean
  hasTier4Access: boolean
  coverImageUrl: string
  projectTitle?: string
  sections?: Array<{
    chapter?: string
    question?: string
    answer?: string
    is_highlighted?: boolean
  }>
}>()

defineEmits<{
  (e: 'close'): void
  (e: 'upgrade'): void
  (e: 'open-customiser'): void
}>()

const openRef = toRef(props, 'open')
const premiumPreviewRef = ref<HTMLElement | null>(null)

const {
  premiumPreviewSlider,
  isDraggingPremiumPreview,
  showPremiumPreviewHint,
  onPremiumPreviewPointerDown,
  onPremiumPreviewPointerMove,
  onPremiumPreviewPointerUp,
} = usePremiumPreview(openRef, premiumPreviewRef)

const previewCoverImageSrc = computed(() => {
  return props.coverImageUrl || sampleCoverImage
})

const answeredSections = computed(() => {
  return (props.sections || []).filter(
    (section) => !!section.answer && section.answer.trim().length > 0
  )
})

const highlightedSections = computed(() => {
  return answeredSections.value.filter((section) => !!section.is_highlighted)
})

const previewChapter = computed(() => {
  return (
    answeredSections.value.find((section) => section.chapter)?.chapter ||
    'Beginnings'
  )
})

const previewQuestion = computed(() => {
  return (
    answeredSections.value.find((section) => section.question)?.question ||
    'Where and when were you born?'
  )
})

const previewQuote = computed(() => {
  const source =
    highlightedSections.value[0]?.answer ||
    answeredSections.value[0]?.answer ||
    ''

  if (!source) {
    return 'A story filled with meaningful memories, moments, and love.'
  }

  const cleaned = source.replace(/\s+/g, ' ').trim()

  if (cleaned.length <= 140) return cleaned

  const shortened = cleaned.slice(0, 140)
  const lastSpace = shortened.lastIndexOf(' ')

  return `${shortened.slice(0, lastSpace > 0 ? lastSpace : 140)}…`
})

const previewSubtitle = computed(() => {
  return highlightedSections.value.length > 0
    ? 'A more personal, beautifully finished keepsake'
    : 'A beautifully designed memory book'
})
</script>