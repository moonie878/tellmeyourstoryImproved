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

          <!-- Tier picker -->
          <div class="border-t border-stone-100 px-6 py-5 sm:px-8">
            <p class="mb-3 text-center text-xs font-medium uppercase tracking-widest text-stone-400">Choose your plan</p>

            <div class="grid grid-cols-2 gap-2">
              <button
                v-for="tier in tiers"
                :key="tier.id"
                @click="$emit('upgrade', tier.id)"
                :class="[
                  'relative rounded-2xl border p-3 text-left transition hover:border-[#7C5C3B]',
                  tier.popular
                    ? 'border-[#7C5C3B] bg-[#FAF7F4]'
                    : 'border-stone-200 bg-white'
                ]"
              >
                <span
                  v-if="tier.popular"
                  class="absolute -top-2 right-3 rounded-full bg-[#7C5C3B] px-2 py-0.5 text-[9px] font-medium text-white"
                >Most popular</span>
                <p class="text-sm font-semibold text-stone-900">{{ tier.price }}</p>
                <p class="mt-0.5 text-xs font-medium text-stone-700">{{ tier.name }}</p>
                <p class="mt-1 text-[10px] leading-snug text-stone-400">{{ tier.desc }}</p>
              </button>
            </div>

            <div class="mt-3 flex items-center justify-center gap-4 text-[11px] text-stone-400">
              <span>✓ One-time payment</span>
              <span>✓ No subscription</span>
              <span>✓ Answers always saved</span>
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
  (e: 'upgrade', tier: string): void
}>()

const tiers = [
  { id: 'tier1', name: 'Keepsake Book',    price: '£3.99',  desc: 'PDF export with chapters & layouts', popular: false },
  { id: 'tier2', name: 'Book + Photos',    price: '£7.99',  desc: 'Photos, cover image & premium design', popular: true },
  { id: 'tier3', name: 'All Stories',       price: '£11.99', desc: 'Unlimited stories & story types', popular: false },
  { id: 'tier4', name: 'Premium Keepsake', price: '£17.99', desc: 'Everything — video, print layouts & more', popular: false },
]

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