<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
        v-if="open"
        class="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm px-3 py-4 sm:px-4 sm:py-6"
        @click.self="$emit('close')"
      >
        <div class="flex min-h-full items-center justify-center">
          <div class="flex max-h-[94vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">

            <!-- Header -->
            <div class="shrink-0 border-b border-stone-100 bg-white px-6 py-5 sm:px-8 sm:py-6">
              <div class="flex items-start justify-between gap-4">
                <div class="max-w-3xl">
                  <p class="eyebrow">✦ Premium Preview</p>
                  <h3 class="mt-2 font-display text-2xl font-bold leading-tight text-stone-900 sm:text-3xl">
                    This is your story — turned into something worth keeping
                  </h3>
                  <p class="mt-2 max-w-2xl text-sm leading-6 text-stone-500">
                    Drag the slider to see the difference between a standard export and a beautifully finished premium keepsake.
                  </p>
                </div>
                <button
                  @click="$emit('close')"
                  class="shrink-0 rounded-full p-2 text-stone-400 hover:bg-stone-100 hover:text-stone-600 transition"
                >
                  ✕
                </button>
              </div>
            </div>

            <!-- Body -->
            <div class="min-h-0 overflow-y-auto px-6 py-6 sm:px-8 sm:py-8">

              <!-- Slider labels -->
              <div class="mb-3 flex items-center justify-between">
                <span class="slider-label">Standard Story</span>
                <span class="slider-label">Premium Keepsake ✦</span>
              </div>

              <!-- Compare slider area -->
              <div
                ref="premiumPreviewRef"
                class="compare-area"
                @pointerdown="onPremiumPreviewPointerDown"
                @pointermove="onPremiumPreviewPointerMove"
                @pointerup="onPremiumPreviewPointerUp"
                @pointercancel="onPremiumPreviewPointerUp"
              >
                <!-- Drag hint -->
                <Transition name="hint-fade">
                  <div
                    v-if="showPremiumPreviewHint"
                    class="pointer-events-none absolute left-1/2 top-4 z-30 -translate-x-1/2 rounded-full bg-stone-900/90 px-4 py-2 text-xs font-medium text-white shadow-lg"
                  >
                    ← Drag to compare →
                  </div>
                </Transition>

                <!-- Premium side (behind) -->
                <div class="absolute inset-0 bg-[#F5EFE6]">
                  <div class="absolute inset-0 flex items-center justify-center px-5 py-6 sm:px-8 sm:py-8 md:px-10 md:py-10">
                    <div class="w-full max-w-5xl">

                      <!-- Mobile premium -->
                      <div class="mx-auto max-w-[300px] premium-card sm:max-w-[340px] md:hidden">
                        <div class="relative overflow-hidden rounded-2xl border border-stone-200 bg-stone-100">
                          <img
                            :src="previewCoverImageSrc"
                            alt="Premium preview"
                            class="h-[160px] w-full object-cover sm:h-[180px]"
                          />
                          <div v-if="!coverImageUrl" class="sample-badge">Sample preview</div>
                        </div>
                        <p class="mt-4 text-[10px] uppercase tracking-[0.28em] text-stone-400">Tell Me Your Story</p>
                        <h4 class="mt-3 font-display text-[1.65rem] leading-none text-stone-900 sm:text-[1.9rem]">
                          {{ projectTitle || 'Your Story Title' }}
                        </h4>
                        <p class="mt-2 text-sm leading-6 text-stone-500">{{ previewSubtitle }}</p>
                        <div class="mt-4 border-t border-stone-200 pt-4">
                          <p class="text-[10px] uppercase tracking-[0.24em] text-stone-400">Chapter Preview</p>
                          <h5 class="mt-2 font-display text-xl text-stone-900 sm:text-2xl">{{ previewChapter }}</h5>
                          <p class="mt-3 text-sm italic leading-6 text-[#7C5C3B]">"{{ previewQuote }}"</p>
                        </div>
                      </div>

                      <!-- Desktop premium -->
                      <div class="hidden items-start gap-5 md:grid md:grid-cols-2">
                        <div class="premium-card">
                          <p class="text-[10px] uppercase tracking-[0.28em] text-stone-400">Tell Me Your Story</p>
                          <div class="mx-auto my-3 h-px w-14 bg-[#C9B08C]"></div>
                          <h4 class="font-display text-[2.4rem] leading-none text-stone-900">
                            {{ projectTitle || 'Your Story Title' }}
                          </h4>
                          <p class="mt-3 text-sm leading-6 text-stone-500">{{ previewSubtitle }}</p>
                          <div class="mt-6 border-t border-stone-200 pt-5">
                            <p class="text-[10px] uppercase tracking-[0.24em] text-stone-400">Chapter One</p>
                            <h5 class="mt-3 font-display text-3xl text-stone-900">{{ previewChapter }}</h5>
                            <div class="my-3 h-px w-10 bg-[#C9B08C]"></div>
                            <p class="text-sm italic leading-7 text-[#7C5C3B]">"{{ previewQuote }}"</p>
                          </div>
                        </div>

                        <div class="premium-card">
                          <div class="relative overflow-hidden rounded-2xl border border-stone-200 bg-stone-100">
                            <img
                              :src="previewCoverImageSrc"
                              alt="Premium preview"
                              class="h-[260px] w-full object-cover"
                            />
                            <div v-if="!coverImageUrl" class="sample-badge">Sample preview</div>
                          </div>
                          <div class="mt-4">
                            <p class="text-sm font-semibold text-stone-900">{{ previewQuestion }}</p>
                            <p class="mt-2 text-xs leading-6 text-stone-500">
                              Richer layouts, quote moments, photo-led pages, and a polished keepsake finish.
                            </p>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

                <!-- Standard side (clips over premium) -->
                <div
                  class="absolute inset-0 bg-stone-50"
                  :style="{ clipPath: `inset(0 ${100 - premiumPreviewSlider}% 0 0)` }"
                >
                  <div class="absolute inset-0 flex items-center justify-center px-5 py-6 sm:px-8 sm:py-8 md:px-10 md:py-10">
                    <div class="w-full max-w-[280px] standard-card sm:max-w-[320px] md:max-w-[420px]">
                      <div class="mb-4 flex h-32 items-center justify-center rounded-2xl border border-dashed border-stone-300 bg-stone-100 text-sm text-stone-400 sm:h-40">
                        No cover image
                      </div>
                      <p class="text-center text-[10px] uppercase tracking-[0.28em] text-stone-400">
                        Tell Me Your Story
                      </p>
                      <h4 class="mt-3 text-center font-serif text-[1.7rem] leading-none text-stone-900 sm:text-[2rem]">
                        {{ projectTitle || 'Your Story Title' }}
                      </h4>
                      <p class="mt-3 text-center text-sm text-stone-400">A simple text-based keepsake</p>
                      <div class="mt-5 border-t border-stone-200 pt-4">
                        <p class="text-sm font-medium text-stone-700">Chapter Preview</p>
                        <p class="mt-1 text-xs text-stone-400">{{ previewChapter }}</p>
                        <p class="mt-3 text-sm text-stone-600">{{ previewQuestion }}</p>
                        <p class="mt-2 text-xs leading-5 text-stone-400">
                          Clean and readable — but without the richer keepsake feel.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Slider handle -->
                <div
                  class="absolute inset-y-0 z-10"
                  :style="{ left: `${premiumPreviewSlider}%`, transform: 'translateX(-50%)' }"
                >
                  <div class="relative flex h-full items-center justify-center">
                    <div
                      class="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 transition-colors"
                      :class="isDraggingPremiumPreview ? 'bg-stone-800' : 'bg-white/80'"
                    ></div>
                    <div
                      class="handle-btn transition-transform"
                      :class="isDraggingPremiumPreview ? 'scale-110 shadow-2xl' : 'hover:scale-105'"
                    >
                      <span class="text-stone-500 text-sm leading-none">‹ ›</span>
                    </div>
                  </div>
                </div>

                <!-- Bottom fade -->
                <div class="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/5 to-transparent"></div>
              </div>

              <!-- Benefit cards -->
              <div class="mt-8 grid gap-4 sm:grid-cols-3">
                <div class="benefit-card">
                  <div class="benefit-icon">📖</div>
                  <p class="benefit-title">Feels like a real book</p>
                  <p class="benefit-desc">Premium layouts with chapter moments, breathing space, and an editorial feel that a simple export can't match.</p>
                </div>
                <div class="benefit-card">
                  <div class="benefit-icon">🎬</div>
                  <p class="benefit-title">Export as video too</p>
                  <p class="benefit-desc">Premium unlocks video export — their story with music and photos, rendered as a shareable MP4 you can play at family moments.</p>
                </div>
                <div class="benefit-card">
                  <div class="benefit-icon">🖼️</div>
                  <p class="benefit-title">Photos throughout</p>
                  <p class="benefit-desc">Add personal photos alongside answers and a cover image — turning a document into something worth gifting and printing.</p>
                </div>
              </div>

              <!-- CTA -->
              <div class="cta-section mt-8">
                <div class="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                  <div class="max-w-2xl">
                    <p class="font-display text-xl font-bold text-stone-900">
                      You're already creating something meaningful.
                    </p>
                    <p class="mt-2 text-sm leading-6 text-stone-500">
                      Premium turns it into a finished keepsake — something to hold, share, and come back to for years.
                    </p>
                    <ul class="mt-4 space-y-2">
                      <li class="cta-feature">✦ Beautiful chapter layouts and structure</li>
                      <li class="cta-feature">✦ Highlighted quote pages from meaningful moments</li>
                      <li class="cta-feature">✦ Photos woven throughout your story</li>
                      <li class="cta-feature">✦ Video export with music</li>
                    </ul>
                  </div>

                  <div class="flex flex-col items-stretch gap-3 lg:items-end lg:shrink-0">
                    <button
                      v-if="!hasTier4Access"
                      @click="$emit('upgrade')"
                      class="btn-primary"
                    >
                      Create My Keepsake Book
                    </button>
                    <button
                      v-else
                      @click="$emit('open-customiser')"
                      class="btn-primary"
                    >
                      Open My Keepsake Design
                    </button>
                    <p class="text-xs text-stone-400 lg:text-right lg:max-w-[18rem]">
                      You can keep writing and upgrade whenever you're ready — nothing is lost.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
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

const previewCoverImageSrc = computed(() => props.coverImageUrl || sampleCoverImage)

const answeredSections = computed(() =>
  (props.sections || []).filter((s) => !!s.answer && s.answer.trim().length > 0)
)

const highlightedSections = computed(() =>
  answeredSections.value.filter((s) => !!s.is_highlighted)
)

const previewChapter = computed(() =>
  answeredSections.value.find((s) => s.chapter)?.chapter || 'Beginnings'
)

const previewQuestion = computed(() =>
  answeredSections.value.find((s) => s.question)?.question || 'Where and when were you born?'
)

const previewQuote = computed(() => {
  const source = highlightedSections.value[0]?.answer || answeredSections.value[0]?.answer || ''
  if (!source) return 'A story filled with meaningful memories, moments, and love.'
  const cleaned = source.replace(/\s+/g, ' ').trim()
  if (cleaned.length <= 140) return cleaned
  const shortened = cleaned.slice(0, 140)
  const lastSpace = shortened.lastIndexOf(' ')
  return `${shortened.slice(0, lastSpace > 0 ? lastSpace : 140)}…`
})

const previewSubtitle = computed(() =>
  highlightedSections.value.length > 0
    ? 'A more personal, beautifully finished keepsake'
    : 'A beautifully designed memory book'
)
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');

.font-display, h3, h4, h5 { font-family: 'Playfair Display', Georgia, serif; }

.eyebrow {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #9C7C5C;
}

.slider-label {
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #A8A29E;
}

/* Compare area */
.compare-area {
  position: relative;
  height: 320px;
  width: 100%;
  overflow: hidden;
  border-radius: 24px;
  border: 1px solid #E7E5E4;
  background: #F5F0E8;
  touch-action: none;
  user-select: none;
  cursor: ew-resize;
}

@media (min-width: 640px) { .compare-area { height: 360px; } }
@media (min-width: 768px) { .compare-area { height: 520px; border-radius: 28px; } }

/* Premium card */
.premium-card {
  background: #FAF6F0;
  border: 1px solid #E8DDD0;
  border-radius: 24px;
  padding: 28px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.1);
}

/* Standard card */
.standard-card {
  background: white;
  border: 1px solid #E7E5E4;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}

@media (min-width: 768px) { .standard-card { border-radius: 28px; padding: 28px; } }

/* Sample badge */
.sample-badge {
  position: absolute;
  left: 12px;
  top: 12px;
  background: rgba(255,255,255,0.9);
  border-radius: 100px;
  padding: 3px 10px;
  font-size: 10px;
  font-weight: 500;
  color: #78716C;
}

/* Slider handle */
.handle-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: white;
  border: 1px solid rgba(255,255,255,0.7);
  box-shadow: 0 4px 24px rgba(0,0,0,0.18);
  backdrop-filter: blur(4px);
}

@media (min-width: 640px) {
  .handle-btn { width: 48px; height: 48px; }
}

/* Benefit cards */
.benefit-card {
  background: white;
  border: 1px solid #E7E5E4;
  border-radius: 20px;
  padding: 20px;
}

.benefit-icon { font-size: 22px; margin-bottom: 10px; }
.benefit-title { font-size: 14px; font-weight: 600; color: #1C1917; margin-bottom: 6px; }
.benefit-desc { font-size: 13px; line-height: 1.7; color: #78716C; }

/* CTA section */
.cta-section {
  background: linear-gradient(135deg, #2C2420 0%, #1C1917 100%);
  border-radius: 24px;
  padding: 28px;
}

.cta-feature {
  font-size: 13px;
  color: #C4A882;
  padding: 3px 0;
}

/* Buttons */
.btn-primary {
  display: inline-block;
  background: white;
  color: #1C1917;
  font-size: 14px;
  font-weight: 600;
  padding: 13px 28px;
  border-radius: 100px;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s;
  white-space: nowrap;
}

.btn-primary:hover { opacity: 0.9; }

/* Transitions */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.hint-fade-enter-active,
.hint-fade-leave-active {
  transition: all 0.4s ease;
}

.hint-fade-enter-from,
.hint-fade-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(4px);
}
</style>