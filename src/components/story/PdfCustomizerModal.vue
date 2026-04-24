<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
        v-if="open"
        class="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm px-3 py-4 sm:px-4 sm:py-6"
        @click.self="$emit('close')"
      >
        <div class="mx-auto flex max-h-[94vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">

          <!-- Header -->
          <div class="shrink-0 border-b border-stone-100 bg-white px-6 py-5 sm:px-8 sm:py-6">
            <div class="flex items-start justify-between gap-4">
              <div>
                <p class="text-[11px] font-medium uppercase tracking-[0.25em] text-stone-400">
                  Keepsake Design
                </p>
                <h3 class="mt-2 font-display text-2xl font-bold text-stone-900 sm:text-3xl">
                  {{ hasTier4Access ? 'Design your keepsake' : 'Preview premium design' }}
                </h3>
                <p class="mt-2 max-w-xl text-sm leading-6 text-stone-500">
                  Choose how your story looks when it's printed, saved, or shared.
                </p>

                <div
                  v-if="!hasTier4Access"
                  class="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3"
                >
                  <p class="text-sm font-medium text-amber-800">
                    ✦ Premium design preview
                  </p>
                  <p class="mt-1 text-sm text-amber-700">
                    Explore all styles and layouts. Upgrade to save and export with your chosen design.
                  </p>
                </div>
              </div>

              <button
                @click="$emit('close')"
                class="shrink-0 rounded-full p-2 text-stone-400 hover:bg-stone-100 hover:text-stone-600 transition"
              >
                ✕
              </button>
            </div>
          </div>

          <!-- Scrollable body -->
          <div class="min-h-0 flex-1 overflow-y-auto px-6 py-6 sm:px-8">
            <div class="grid gap-8 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-10">

              <!-- Controls — left on desktop, second on mobile -->
              <div class="order-2 lg:order-1 space-y-6">

                <!-- Orientation -->
                <div>
                  <label class="control-label">Book layout</label>
                  <p class="control-hint">How your story is structured across pages.</p>
                  <div class="mt-3 grid grid-cols-2 gap-2">
                    <button
                      v-for="opt in orientationOptions"
                      :key="opt.value"
                      @click="updateField('orientation', opt.value)"
                      class="option-btn"
                      :class="modelValue.orientation === opt.value ? 'option-btn-active' : 'option-btn-inactive'"
                    >
                      <span class="option-icon">{{ opt.icon }}</span>
                      <span class="option-label">{{ opt.label }}</span>
                      <span class="option-hint">{{ opt.hint }}</span>
                    </button>
                  </div>
                </div>

                <!-- Style -->
                <div>
                  <label class="control-label">Visual style</label>
                  <p class="control-hint">The tone and feel of your finished keepsake.</p>
                  <div class="mt-3 grid grid-cols-3 gap-2">
                    <button
                      v-for="opt in layoutOptions"
                      :key="opt.value"
                      @click="updateField('layout', opt.value)"
                      class="option-btn"
                      :class="modelValue.layout === opt.value ? 'option-btn-active' : 'option-btn-inactive'"
                    >
                      <span class="option-icon">{{ opt.icon }}</span>
                      <span class="option-label">{{ opt.label }}</span>
                      <span class="option-hint">{{ opt.hint }}</span>
                    </button>
                  </div>
                </div>

                <!-- Typography -->
                <div>
                  <label class="control-label">Typography</label>
                  <p class="control-hint">How your story feels when read.</p>
                  <div class="mt-3 grid grid-cols-3 gap-2">
                    <button
                      v-for="opt in fontOptions"
                      :key="opt.value"
                      @click="updateField('font', opt.value)"
                      class="option-btn"
                      :class="modelValue.font === opt.value ? 'option-btn-active' : 'option-btn-inactive'"
                    >
                      <span class="option-sample" :class="opt.sampleClass">{{ opt.sample }}</span>
                      <span class="option-label mt-1">{{ opt.label }}</span>
                    </button>
                  </div>
                </div>

                <!-- Theme -->
                <div>
                  <label class="control-label">Colour mood</label>
                  <p class="control-hint">The overall tone of your finished book.</p>
                  <div class="mt-3 grid grid-cols-3 gap-2">
                    <button
                      v-for="opt in themeOptions"
                      :key="opt.value"
                      @click="updateField('theme', opt.value)"
                      class="option-btn overflow-hidden"
                      :class="modelValue.theme === opt.value ? 'option-btn-active' : 'option-btn-inactive'"
                    >
                      <span
                        class="mx-auto mb-2 block h-8 w-full rounded-lg border"
                        :style="{ background: opt.bg, borderColor: opt.border }"
                      ></span>
                      <span class="option-label">{{ opt.label }}</span>
                    </button>
                  </div>
                </div>

                <!-- Elegant options — only when elegant selected -->
                <Transition name="section-fade">
                  <div v-if="modelValue.layout === 'elegant'" class="rounded-2xl border border-[#E8DDD4] bg-[#FAF7F4] p-4 space-y-4">
                    <p class="text-xs font-medium uppercase tracking-[0.18em] text-[#9C7C5C]">✦ Elegant options</p>

                    <div>
                      <label class="control-label">Border style</label>
                      <div class="mt-2 grid grid-cols-3 gap-2">
                        <button
                          v-for="opt in borderOptions"
                          :key="opt.value"
                          @click="updateField('borderStyle', opt.value)"
                          class="option-btn-sm"
                          :class="(modelValue.borderStyle || 'fine-line') === opt.value ? 'option-btn-active' : 'option-btn-inactive'"
                        >
                          {{ opt.label }}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label class="control-label">Divider style</label>
                      <div class="mt-2 grid grid-cols-3 gap-2">
                        <button
                          v-for="opt in dividerOptions"
                          :key="opt.value"
                          @click="updateField('dividerStyle', opt.value)"
                          class="option-btn-sm"
                          :class="(modelValue.dividerStyle || 'flourish') === opt.value ? 'option-btn-active' : 'option-btn-inactive'"
                        >
                          {{ opt.label }}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label class="control-label">Chapter style</label>
                      <div class="mt-2 grid grid-cols-2 gap-2">
                        <button
                          v-for="opt in chapterOptions"
                          :key="opt.value"
                          @click="updateField('chapterStyle', opt.value)"
                          class="option-btn-sm"
                          :class="(modelValue.chapterStyle || 'flourish') === opt.value ? 'option-btn-active' : 'option-btn-inactive'"
                        >
                          {{ opt.label }}
                        </button>
                      </div>
                    </div>
                  </div>
                </Transition>

                <!-- Toggles -->
                <div class="space-y-1 rounded-2xl border border-stone-200 bg-stone-50 p-4">
                  <p class="mb-3 text-xs font-medium uppercase tracking-[0.15em] text-stone-400">Options</p>

                  <label class="toggle-row">
                    <span class="toggle-label">Drop caps</span>
                    <span class="toggle-hint">Decorative first letter on each answer</span>
                    <div class="ml-auto">
                      <input
                        :checked="!!modelValue.dropCaps"
                        type="checkbox"
                        class="toggle-input"
                        @change="updateField('dropCaps', ($event.target as HTMLInputElement).checked)"
                      />
                    </div>
                  </label>

                  <label class="toggle-row">
                    <span class="toggle-label">Cover image</span>
                    <span class="toggle-hint">Show your cover photo on the first page</span>
                    <div class="ml-auto">
                      <input
                        :checked="modelValue.includeCoverImage"
                        type="checkbox"
                        class="toggle-input"
                        @change="updateField('includeCoverImage', ($event.target as HTMLInputElement).checked)"
                      />
                    </div>
                  </label>

                  <label class="toggle-row">
                    <span class="toggle-label">Dedication page</span>
                    <span class="toggle-hint">A quiet page before the story begins</span>
                    <div class="ml-auto">
                      <input
                        :checked="modelValue.includeDedication"
                        type="checkbox"
                        class="toggle-input"
                        @change="updateField('includeDedication', ($event.target as HTMLInputElement).checked)"
                      />
                    </div>
                  </label>

                  <label class="toggle-row">
                    <span class="toggle-label">Print-ready layout</span>
                    <span class="toggle-hint">Wider margins for printing and binding</span>
                    <div class="ml-auto">
                      <input
                        :checked="modelValue.printReady"
                        type="checkbox"
                        class="toggle-input"
                        @change="updateField('printReady', ($event.target as HTMLInputElement).checked)"
                      />
                    </div>
                  </label>
                </div>

              </div>

              <!-- Preview — right on desktop, first on mobile -->
              <div class="order-1 lg:order-2">
                <div class="flex items-center justify-between mb-3">
                  <p class="text-sm font-medium text-stone-700">Live preview</p>
                  <span class="text-xs text-stone-400">Updates instantly</span>
                </div>

                <div
                  class="rounded-3xl border p-5 sm:p-7 flex items-start justify-center transition-colors duration-300"
                  :class="previewThemeClass"
                >
                  <div
                    class="relative rounded-2xl border bg-white transition-all duration-300"
                    :class="[previewPageClass, previewStyleClass, previewInnerSpacingClass, previewPrintFrameClass]"
                  >
                    <div
                      v-if="modelValue.orientation === 'landscape-spread'"
                      class="absolute inset-y-4 left-1/2 w-px -translate-x-1/2 bg-stone-200"
                    ></div>

                    <!-- Portrait layout -->
                    <template v-if="modelValue.orientation === 'portrait'">
                      <div
                        v-if="modelValue.includeCoverImage"
                        class="relative mb-4 h-32 overflow-hidden rounded-xl border border-stone-200 bg-stone-100 sm:h-36"
                      >
                        <img
                          :src="previewCoverImageSrc"
                          alt="Preview cover"
                          class="h-full w-full object-cover"
                          :class="!hasTier4Access ? 'blur-sm scale-105' : ''"
                        />
                        <div v-if="!hasTier4Access" class="absolute inset-0 flex items-center justify-center bg-white/50">
                          <span class="rounded-full bg-white px-3 py-1 text-xs font-medium text-stone-700 shadow">
                            Upgrade to add photos
                          </span>
                        </div>
                        <div v-if="!coverImageUrl" class="absolute left-3 top-3 rounded-full bg-white/90 px-2 py-1 text-[10px] font-medium text-stone-600">
                          Sample
                        </div>
                      </div>
                      <div v-else class="mb-4 flex h-32 items-center justify-center rounded-xl border border-dashed border-stone-300 text-sm text-stone-400 sm:h-36">
                        Cover hidden
                      </div>

                      <div :class="previewPrintContentWidthClass">
                        <p class="text-center text-[10px] uppercase tracking-[0.28em] text-stone-400">
                          Tell Me Your Story
                        </p>
                        <div v-if="modelValue.layout === 'elegant'" class="mx-auto mt-3 h-px w-14 bg-[#c9b08c]"></div>
                        <h4 class="mt-3 text-center text-stone-900" :class="[previewFontClass, previewTitleClass]">
                          {{ projectTitle || 'Your Story' }}
                        </h4>
                        <p class="mt-2 text-center text-xs text-stone-400" :class="previewPrintBodyClass">
                          A personal collection of memories
                        </p>
                        <div v-if="modelValue.layout === 'elegant'" class="mx-auto mt-4 h-px w-8 bg-stone-200"></div>

                        <div :class="[previewChapterBlockClass, previewPrintChapterSpacingClass]">
                          <p class="text-center text-[10px] uppercase tracking-[0.24em] text-stone-400">Chapter One</p>
                          <p class="mt-2 text-center text-base text-stone-900" :class="previewFontClass">Beginnings</p>
                          <div v-if="modelValue.layout === 'elegant'" class="mx-auto mt-2 h-px w-10 bg-[#c9b08c]"></div>
                          <p class="mt-3 text-center text-xs italic text-stone-500" :class="previewPrintBodyClass">
                            Every story has a beginning.
                          </p>
                          <p class="mt-3 text-xs text-stone-600" :class="previewPrintBodyClass">
                            Where and when were you born?
                          </p>
                          <p class="mt-2 text-[10px] text-stone-400">
                            This is how your keepsake will feel.
                          </p>
                        </div>

                        <p v-if="modelValue.includeDedication" class="mt-4 text-center text-[10px] italic text-stone-400">
                          Includes dedication page
                        </p>
                      </div>
                    </template>

                    <!-- Landscape spread layout -->
                    <template v-else>
                      <div class="grid h-full grid-cols-2 gap-3 sm:gap-4" :class="modelValue.printReady ? 'px-2 py-1' : ''">
                        <div class="pr-1 sm:pr-2">
                          <p class="text-[10px] uppercase tracking-[0.25em] text-stone-400">Chapter</p>
                          <h4 class="mt-2 text-stone-900" :class="[previewFontClass, previewTitleClass]">
                            {{ projectTitle || 'Your Story' }}
                          </h4>
                          <p class="mt-2 text-xs text-stone-500" :class="previewPrintBodyClass">
                            An open spread designed to feel like a printed keepsake book.
                          </p>
                          <p class="mt-3 text-[10px] text-stone-400">Left page</p>
                        </div>
                        <div class="pl-1 sm:pl-2">
                          <div v-if="modelValue.includeCoverImage" class="relative mb-2 h-24 overflow-hidden rounded-xl border border-stone-200 bg-stone-100 sm:h-28">
                            <img :src="previewCoverImageSrc" alt="Preview" class="h-full w-full object-cover" :class="!hasTier4Access ? 'blur-sm scale-105' : ''" />
                            <div v-if="!hasTier4Access" class="absolute inset-0 flex items-center justify-center bg-white/50">
                              <span class="rounded-full bg-white px-2 py-0.5 text-[10px] font-medium text-stone-700 shadow">Upgrade</span>
                            </div>
                          </div>
                          <div v-else class="mb-2 flex h-24 items-center justify-center rounded-xl border border-dashed border-stone-300 text-xs text-stone-400 sm:h-28">Hidden</div>
                          <p class="text-xs text-stone-600" :class="previewPrintBodyClass">"Where and when were you born?"</p>
                          <p class="mt-1 text-[10px] text-stone-400">Right page</p>
                        </div>
                      </div>
                    </template>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="shrink-0 border-t border-stone-100 bg-white px-6 py-4 sm:px-8 sm:py-5">
            <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p class="text-xs text-stone-400">
                You can change this anytime before exporting.
              </p>
              <div class="flex flex-col gap-2 sm:flex-row">
                <button
                  @click="$emit('close')"
                  class="rounded-full border border-stone-300 px-5 py-2.5 text-sm text-stone-700 transition hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  v-if="hasTier4Access"
                  @click="$emit('save')"
                  class="rounded-full bg-[#7C5C3B] px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
                >
                  Save keepsake design
                </button>
                <button
                  v-else
                  @click="$emit('upgrade')"
                  class="rounded-full bg-[#7C5C3B] px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
                >
                  Unlock premium design
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import sampleCoverImage from '../../assets/sample-cover.jpg'
import type { PdfSettings } from '../../types/story'

const props = defineProps<{
  open: boolean
  modelValue: PdfSettings
  hasTier4Access: boolean
  coverImageUrl: string
  projectTitle?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: PdfSettings): void
  (e: 'close'): void
  (e: 'save'): void
  (e: 'upgrade'): void
}>()

function updateField<K extends keyof PdfSettings>(key: K, value: PdfSettings[K]) {
  emit('update:modelValue', { ...props.modelValue, [key]: value })
}

// Option definitions
const orientationOptions = [
  { value: 'portrait' as const, icon: '📄', label: 'Portrait Book', hint: 'Traditional' },
  { value: 'landscape-spread' as const, icon: '📖', label: 'Open Spread', hint: 'Like a book' },
]

const layoutOptions = [
  { value: 'classic' as const, icon: '🏛', label: 'Classic', hint: 'Timeless' },
  { value: 'minimal' as const, icon: '◻', label: 'Minimal', hint: 'Clean' },
  { value: 'elegant' as const, icon: '✦', label: 'Elegant', hint: 'Refined' },
]

const fontOptions = [
  { value: 'serif' as const, label: 'Serif', sample: 'Aa', sampleClass: 'font-serif' },
  { value: 'clean' as const, label: 'Clean', sample: 'Aa', sampleClass: 'font-sans' },
  { value: 'bookish' as const, label: 'Bookish', sample: 'Aa', sampleClass: 'font-serif italic' },
]

const themeOptions = [
  { value: 'warm' as const, label: 'Warm', bg: '#F8F4EF', border: '#E0D7CB' },
  { value: 'neutral' as const, label: 'Neutral', bg: '#FFFFFF', border: '#E8E8E8' },
  { value: 'dark-ink' as const, label: 'Dark Ink', bg: '#F4F3F0', border: '#DCDCE0' },
]

const borderOptions = [
  { value: 'none' as const, label: 'None' },
  { value: 'fine-line' as const, label: 'Fine line' },
  { value: 'corner-floral' as const, label: 'Floral' },
]

const dividerOptions = [
  { value: 'soft-line' as const, label: 'Soft line' },
  { value: 'flourish' as const, label: 'Flourish' },
  { value: 'gold-line' as const, label: 'Gold line' },
]

const chapterOptions = [
  { value: 'standard' as const, label: 'Standard' },
  { value: 'flourish' as const, label: 'Flourish' },
]

// Preview computed
const previewCoverImageSrc = computed(() => props.coverImageUrl || sampleCoverImage)

const previewThemeClass = computed(() => {
  if (props.modelValue.theme === 'warm') return 'bg-[#F5EFE6] border-[#E8DDD0]'
  if (props.modelValue.theme === 'neutral') return 'bg-stone-100 border-stone-200'
  if (props.modelValue.theme === 'dark-ink') return 'bg-stone-700 border-stone-600'
  return 'bg-stone-50 border-stone-200'
})

const previewFontClass = computed(() => {
  if (props.modelValue.font === 'serif') return 'font-serif'
  if (props.modelValue.font === 'clean') return 'font-sans'
  if (props.modelValue.font === 'bookish') return 'font-serif italic'
  return 'font-serif'
})

const previewPageClass = computed(() => {
  return props.modelValue.orientation === 'landscape-spread'
    ? 'w-full max-w-[42rem] h-[18rem] sm:h-[20rem]'
    : 'w-64 sm:w-72'
})

const previewStyleClass = computed(() => {
  if (props.modelValue.layout === 'minimal') return 'border-stone-200 shadow-none'
  if (props.modelValue.layout === 'elegant') return 'border-[#d8cbbd] shadow-lg bg-[#fffdf9]'
  return 'border-stone-300 shadow-sm'
})

const previewInnerSpacingClass = computed(() => {
  if (props.modelValue.layout === 'minimal') return 'p-4 sm:p-5'
  if (props.modelValue.layout === 'elegant') return 'px-5 py-6 sm:px-7 sm:py-8'
  return 'p-4'
})

const previewTitleClass = computed(() => {
  if (props.modelValue.layout === 'minimal') return 'text-[1.5rem] tracking-tight sm:text-[1.7rem]'
  if (props.modelValue.layout === 'elegant') return 'text-[1.9rem] leading-tight sm:text-[2.15rem]'
  return 'text-xl sm:text-2xl'
})

const previewChapterBlockClass = computed(() => {
  if (props.modelValue.layout === 'minimal') return 'mt-6 pt-3'
  if (props.modelValue.layout === 'elegant') return 'mt-6 pt-5'
  return 'mt-5 border-t border-stone-200 pt-4'
})

const previewPrintFrameClass = computed(() => {
  return props.modelValue.printReady ? 'px-5 py-5 sm:px-6 sm:py-6' : ''
})

const previewPrintBodyClass = computed(() => {
  return props.modelValue.printReady ? 'leading-relaxed' : ''
})

const previewPrintContentWidthClass = computed(() => {
  if (props.modelValue.layout === 'elegant') return 'max-w-[82%] mx-auto'
  if (!props.modelValue.printReady) return ''
  if (props.modelValue.orientation === 'landscape-spread') return 'max-w-[95%]'
  return 'max-w-[88%] mx-auto'
})

const previewPrintChapterSpacingClass = computed(() => {
  return props.modelValue.printReady ? 'mt-6 pt-5' : ''
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&display=swap');

.font-display { font-family: 'Playfair Display', Georgia, serif; }

/* Control labels */
.control-label {
  display: block;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #78716C;
}

.control-hint {
  margin-top: 3px;
  font-size: 12px;
  color: #A8A29E;
}

/* Option buttons — large */
.option-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  padding: 12px 8px;
  border-radius: 16px;
  border: 1.5px solid;
  transition: all 0.15s ease;
  text-align: center;
  cursor: pointer;
}

.option-btn-active {
  border-color: #1C1917;
  background: #1C1917;
  color: white;
}

.option-btn-inactive {
  border-color: #E7E5E4;
  background: white;
  color: #1C1917;
}

.option-btn-inactive:hover {
  border-color: #A8A29E;
  background: #FAFAF9;
}

.option-icon { font-size: 18px; }
.option-label { font-size: 12px; font-weight: 500; }
.option-hint { font-size: 10px; opacity: 0.6; }
.option-sample { font-size: 22px; line-height: 1; }

/* Option buttons — small */
.option-btn-sm {
  padding: 8px 6px;
  border-radius: 12px;
  border: 1.5px solid;
  font-size: 11px;
  font-weight: 500;
  transition: all 0.15s ease;
  cursor: pointer;
  text-align: center;
}

/* Toggle rows */
.toggle-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 2px;
  padding: 10px 0;
  border-bottom: 1px solid #F5F5F4;
  cursor: pointer;
}

.toggle-row:last-child { border-bottom: none; }

.toggle-label {
  font-size: 13px;
  font-weight: 500;
  color: #1C1917;
  width: 100%;
}

.toggle-hint {
  font-size: 11px;
  color: #A8A29E;
  flex: 1;
}

.toggle-input {
  width: 16px;
  height: 16px;
  accent-color: #7C5C3B;
  cursor: pointer;
}

/* Transitions */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.section-fade-enter-active,
.section-fade-leave-active {
  transition: all 0.2s ease;
}

.section-fade-enter-from,
.section-fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>