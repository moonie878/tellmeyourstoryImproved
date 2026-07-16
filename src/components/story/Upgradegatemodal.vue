<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="open"
        class="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 px-4"
        @click.self="$emit('close')"
      >
        <div class="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl">

          <!-- Close button -->
          <button
            @click="$emit('close')"
            class="absolute right-4 top-4 z-10 text-stone-400 transition hover:text-stone-600"
          >✕</button>

          <!-- Header -->
          <div class="bg-[#F5F0E8] px-6 pb-6 pt-8 text-center sm:px-8">
            <p class="text-xs font-medium uppercase tracking-widest text-[#7C5C3B]">
              Your story is taking shape
            </p>
            <h2 class="mt-2 text-xl font-semibold text-stone-900 sm:text-2xl">
              You've written {{ answeredCount }} pages so far
            </h2>
            <p class="mt-2 text-sm text-stone-600">
              Here's a preview of what your finished book could look like.
            </p>
          </div>

          <!-- Mini book preview — horizontal scroll of formatted "pages" -->
          <div class="px-6 py-5 sm:px-8">
            <div class="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide">

              <!-- Cover page -->
              <div
                class="flex-shrink-0 snap-center rounded-sm bg-[#2C2420] shadow-md"
                style="width: 140px; aspect-ratio: 6/9;"
              >
                <div class="flex h-full flex-col items-center justify-center p-4 text-center">
                  <p class="text-[9px] font-medium uppercase tracking-widest text-[#C4A882]">
                    Tell Me Your Story
                  </p>
                  <p class="mt-2 font-serif text-xs font-medium text-white leading-snug">
                    {{ projectTitle || 'Untitled Story' }}
                  </p>
                </div>
              </div>

              <!-- Answer pages -->
              <div
                v-for="page in previewPages"
                :key="page.id"
                class="flex-shrink-0 snap-center rounded-sm bg-white shadow-md border border-stone-100"
                style="width: 140px; aspect-ratio: 6/9;"
              >
                <div class="flex h-full flex-col p-3">
                  <p class="text-[7px] font-medium uppercase tracking-wider text-[#7C5C3B]/50 leading-tight">
                    {{ page.chapter }}
                  </p>
                  <p class="mt-1 font-serif text-[8px] italic text-stone-500 leading-tight line-clamp-2">
                    "{{ page.question }}"
                  </p>
                  <p class="mt-1.5 flex-1 font-serif text-[8px] text-stone-700 leading-relaxed line-clamp-6">
                    {{ page.answer }}
                  </p>
                  <p class="mt-auto text-center text-[7px] text-stone-300">{{ page.pageNum }}</p>
                </div>
              </div>

              <!-- Locked pages teaser -->
              <div
                class="flex flex-shrink-0 snap-center items-center justify-center rounded-sm border-2 border-dashed border-stone-200 bg-stone-50"
                style="width: 140px; aspect-ratio: 6/9;"
              >
                <div class="p-3 text-center">
                  <p class="text-2xl">🔒</p>
                  <p class="mt-2 text-[9px] font-medium text-stone-500 leading-snug">
                    {{ remainingQuestions }}+ more<br/>questions waiting
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- CTA section -->
          <div class="border-t border-stone-100 px-6 py-5 sm:px-8">
            <button
              @click="$emit('upgrade')"
              class="w-full rounded-full bg-[#7C5C3B] py-3 text-sm font-medium text-white transition hover:opacity-90"
            >
              Upgrade to keep building — from £3.99
            </button>

            <div class="mt-3 flex items-center justify-center gap-4 text-[11px] text-stone-400">
              <span>✓ Unlock all questions</span>
              <span>✓ Export & print</span>
              <span>✓ AI writing help</span>
            </div>

            <button
              @click="$emit('close')"
              class="mt-3 w-full py-2 text-xs text-stone-400 transition hover:text-stone-600"
            >
              I'll come back later — keep my {{ answeredCount }} answers saved
            </button>
          </div>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface AnsweredSection {
  id: string
  chapter: string
  question: string
  answer: string
}

const props = defineProps<{
  open: boolean
  answeredSections: AnsweredSection[]
  projectTitle: string
  totalSections: number
}>()

defineEmits<{
  (e: 'close'): void
  (e: 'upgrade'): void
}>()

const answeredCount = computed(() => props.answeredSections.length)

const remainingQuestions = computed(() =>
  props.totalSections - answeredCount.value
)

const previewPages = computed(() =>
  props.answeredSections.map((s, i) => ({
    ...s,
    pageNum: i + 1,
  }))
)
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.25s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
</style>