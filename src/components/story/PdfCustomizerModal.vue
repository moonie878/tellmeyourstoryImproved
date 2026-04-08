<template>
  <div
    v-if="open"
    class="fixed inset-0 z-50 overflow-y-auto bg-black/40 px-4 py-6"
  >
    <div
      class="mx-auto flex w-full max-w-5xl max-h-[92vh] flex-col overflow-hidden rounded-3xl bg-white shadow-2xl"
    >
      <!-- Header -->
      <div class="shrink-0 border-b border-stone-200 bg-white px-8 py-6">
        <div class="flex items-start justify-between gap-4">
          <div>
            <p class="text-xs font-medium uppercase tracking-[0.25em] text-stone-500">
              Keepsake Design
            </p>

            <h3 class="mt-3 text-3xl font-bold text-stone-900">
              {{ hasTier4Access
                ? 'Design your story as a finished keepsake'
                : 'Preview premium design' }}
            </h3>

            <p class="mt-3 max-w-xl text-sm leading-6 text-stone-600">
              Choose how your story feels when it’s printed, shared, or saved — from layout and typography to overall tone.
            </p>

            <div
              v-if="!hasTier4Access"
              class="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4"
            >
              <p class="text-sm font-medium text-amber-800">
                Premium design preview
              </p>
              <p class="mt-2 text-sm text-amber-700">
                Explore Portrait Book, Open Spread, premium styles, and photo-based keepsake design. Upgrade to save and export with these settings.
              </p>
            </div>
          </div>

          <button
            @click="$emit('close')"
            class="rounded-full border border-stone-300 px-4 py-2 text-sm"
          >
            Close
          </button>
        </div>
      </div>

      <!-- Scrollable Body -->
      <div class="min-h-0 flex-1 overflow-y-auto px-8 py-6">
        <div class="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">

          <!-- LEFT: Controls -->
          <div>
            <div class="mb-6 rounded-2xl border border-stone-200 bg-stone-50 p-4 text-center">
              <p class="text-sm text-stone-600">
                This is where your story becomes something worth keeping.
              </p>
            </div>

            <div class="space-y-5">

              <!-- Layout -->
              <div>
                <label class="block text-xs font-medium uppercase tracking-[0.15em] text-stone-500">
                  Book layout
                </label>
                <p class="mt-1 text-xs text-stone-500">
                  Choose how your story is structured across pages.
                </p>

                <select
                  :value="modelValue.orientation"
                  @change="updateField('orientation', ($event.target as HTMLSelectElement).value as PdfSettings['orientation'])"
                  class="mt-2 w-full rounded-xl border border-stone-300 bg-white px-4 py-3"
                >
                  <option value="portrait">Portrait Book</option>
                  <option value="landscape-spread">Open Spread</option>
                </select>
              </div>

              <!-- Style -->
              <div>
                <label class="block text-xs font-medium uppercase tracking-[0.15em] text-stone-500">
                  Visual Style
                </label>
                <p class="mt-1 text-xs text-stone-500">
                  Subtle differences that change the tone of your keepsake.
                </p>

                <select
                  :value="modelValue.layout"
                 @change="updateField('layout', ($event.target as HTMLSelectElement).value as PdfSettings['layout'])"
                  class="mt-2 w-full rounded-xl border border-stone-300 bg-white px-4 py-3"
                >
                  <option value="classic">Classic</option>
                  <option value="minimal">Minimal</option>
                  <option value="elegant">Elegant</option>
                </select>
              </div>

              <!-- Typography -->
              <div>
                <label class="block text-xs font-medium uppercase tracking-[0.15em] text-stone-500">
                  Typography
                </label>
                <p class="mt-1 text-xs text-stone-500">
                  Changes how your story feels when read.
                </p>

                <select
                  :value="modelValue.font"
                  @change="updateField('font', ($event.target as HTMLSelectElement).value as PdfSettings['font'])"
                  class="mt-2 w-full rounded-xl border border-stone-300 bg-white px-4 py-3"
                >
                  <option value="serif">Serif</option>
                  <option value="clean">Clean</option>
                  <option value="bookish">Bookish</option>
                </select>
              </div>

              <!-- Theme -->
              <div>
                <label class="block text-xs font-medium uppercase tracking-[0.15em] text-stone-500">
                  Colour mood
                </label>
                <p class="mt-1 text-xs text-stone-500">
                  Sets the overall mood of your finished book.
                </p>

                <select
                  :value="modelValue.theme"
                 @change="updateField('theme', ($event.target as HTMLSelectElement).value as PdfSettings['theme'])"
                  class="mt-2 w-full rounded-xl border border-stone-300 bg-white px-4 py-3"
                >
                  <option value="warm">Warm</option>
                  <option value="neutral">Neutral</option>
                  <option value="dark-ink">Dark Ink</option>
                </select>
              </div>

              <!-- Toggles -->
              <div class="space-y-3 rounded-2xl border border-stone-200 bg-stone-50 p-4">
                <label class="flex items-center gap-3 text-sm text-stone-700">
                  <input
                    :checked="modelValue.includeCoverImage"
                    type="checkbox"
                    @change="updateField('includeCoverImage', ($event.target as HTMLInputElement).checked)"
                  />
                  Include cover image
                </label>

                <label class="flex items-center gap-3 text-sm text-stone-700">
                  <input
                    :checked="modelValue.includeDedication"
                    type="checkbox"
                    @change="updateField('includeDedication', ($event.target as HTMLInputElement).checked)"
                  />
                  Include dedication page
                </label>

                <label class="flex items-center gap-3 text-sm text-stone-700">
                  <input
                    :checked="modelValue.printReady"
                    type="checkbox"
                    @change="updateField('printReady', ($event.target as HTMLInputElement).checked)"
                  />
                  Print-ready book layout
                </label>

                <p class="text-xs text-stone-500">
                  Adds safer margins and calmer page spacing for printing and binding.
                </p>
              </div>

            </div>
          </div>

          <!-- RIGHT: Preview -->
          <div>
            <p class="text-sm font-medium text-stone-700">Live preview</p>
            <p class="mt-1 text-xs text-stone-500">
              Live preview updates instantly
            </p>

            <div
              class="mt-3 rounded-3xl border border-stone-200 p-6 shadow-inner"
              :class="previewThemeClass"
            >
              <div
  class="relative mx-auto rounded-2xl border bg-white"
  :class="[previewPageClass, previewStyleClass, previewInnerSpacingClass, previewPrintFrameClass]"
>
  <div
    v-if="modelValue.orientation === 'landscape-spread'"
    class="absolute inset-y-4 left-1/2 w-px -translate-x-1/2 bg-stone-200"
  ></div>

  <template v-if="modelValue.orientation === 'portrait'">
    <div
      v-if="modelValue.includeCoverImage"
      class="relative mb-4 h-36 overflow-hidden rounded-xl border border-stone-200 bg-stone-100"
    >
      <img
        :src="previewCoverImageSrc"
        alt="Preview cover"
        class="h-full w-full object-cover"
        :class="!hasTier4Access ? 'blur-sm scale-105' : ''"
      />

      <div
        v-if="!hasTier4Access"
        class="absolute inset-0 flex items-center justify-center bg-white/50"
      >
        <span class="rounded-full bg-white px-3 py-1 text-xs font-medium text-stone-700 shadow">
          Upgrade to add your own photos
        </span>
      </div>

      <div
        v-if="!coverImageUrl"
        class="absolute left-3 top-3 rounded-full bg-white/90 px-2 py-1 text-[10px] font-medium text-stone-600"
      >
        Sample preview
      </div>
    </div>

    <div
      v-else
      class="mb-4 flex h-36 items-center justify-center rounded-xl border border-dashed border-stone-300 text-sm text-stone-400"
    >
      Cover image hidden
    </div>

    <div :class="previewPrintContentWidthClass">
      <p class="text-center text-[10px] uppercase tracking-[0.25em] text-stone-500">
        Tell Me Your Story
      </p>

      <h4
        class="mt-3 text-center text-stone-900"
        :class="[previewFontClass, previewTitleClass]"
      >
        {{ projectTitle || 'Your Story Title' }}
      </h4>

      <p
        class="mt-3 text-center text-sm text-stone-500"
        :class="previewPrintBodyClass"
      >
        A personal collection of memories
      </p>

      <div :class="[previewChapterBlockClass, previewPrintChapterSpacingClass]">
        <p class="text-sm font-semibold text-stone-800">
          Chapter Preview
        </p>
        <p class="mt-1 text-xs text-stone-500">
          Beginnings
        </p>
        <p class="mt-3 text-sm text-stone-700" :class="previewPrintBodyClass">
          Where and when were you born?
        </p>
        <p class="mt-2 text-xs text-stone-500" :class="previewPrintBodyClass">
          This is how your finished keepsake could feel.
        </p>
      </div>

      <p
        v-if="modelValue.includeDedication"
        class="mt-5 text-center text-xs italic text-stone-500"
      >
        Includes dedication page
      </p>
    </div>
  </template>

  <template v-else>
    <div
      class="grid h-full grid-cols-2 gap-4"
      :class="modelValue.printReady ? 'px-2 py-1' : ''"
    >
      <div class="pr-2">
        <p class="text-[10px] uppercase tracking-[0.25em] text-stone-500">
          Chapter
        </p>
        <h4
          class="mt-3 text-stone-900"
          :class="[previewFontClass, previewTitleClass]"
        >
          {{ projectTitle || 'Your Story Title' }}
        </h4>
        <p class="mt-3 text-sm text-stone-600" :class="previewPrintBodyClass">
          An open spread designed to feel like a printed keepsake book.
        </p>
        <p class="mt-4 text-xs text-stone-500">
          Left page
        </p>
      </div>

      <div class="pl-2">
        <div
          v-if="modelValue.includeCoverImage"
          class="relative mb-3 h-28 overflow-hidden rounded-xl border border-stone-200 bg-stone-100"
        >
          <img
            :src="previewCoverImageSrc"
            alt="Preview spread"
            class="h-full w-full object-cover"
            :class="!hasTier4Access ? 'blur-sm scale-105' : ''"
          />

          <div
            v-if="!hasTier4Access"
            class="absolute inset-0 flex items-center justify-center bg-white/50"
          >
            <span class="rounded-full bg-white px-3 py-1 text-xs font-medium text-stone-700 shadow">
              Upgrade to add your own photos
            </span>
          </div>

          <div
            v-if="!coverImageUrl"
            class="absolute left-3 top-3 rounded-full bg-white/90 px-2 py-1 text-[10px] font-medium text-stone-600"
          >
            Sample preview
          </div>
        </div>

        <div
          v-else
          class="mb-3 flex h-28 items-center justify-center rounded-xl border border-dashed border-stone-300 text-sm text-stone-400"
        >
          Image area hidden
        </div>

        <p class="text-sm text-stone-700" :class="previewPrintBodyClass">
          “Where and when were you born?”
        </p>
        <p class="mt-2 text-xs text-stone-500">
          Right page
        </p>
      </div>
    </div>
  </template>
</div>
            </div>
          </div>

        </div>
      </div>

      <!-- Footer -->
      <div class="shrink-0 border-t border-stone-200 bg-white px-8 py-5">
        <div class="flex justify-end gap-3">
          <button
            @click="$emit('close')"
            class="rounded-full border border-stone-300 px-5 py-2 text-sm"
          >
            Cancel
          </button>

          <template v-if="hasTier4Access">
            <button
              @click="$emit('save')"
              class="rounded-full bg-[#7C5C3B] hover:opacity-90 transition px-5 py-2 text-sm text-white"
            >
              Save my keepsake design
            </button>
          </template>

          <template v-else>
            <button
              @click="$emit('upgrade')"
              class="rounded-full bg-[#7C5C3B] hover:opacity-90 transition px-5 py-2 text-sm text-white"
            >
              Unlock Premium Design
            </button>
          </template>
        </div>

        <p class="mt-3 text-center text-xs text-stone-500">
          You can change this anytime before exporting.
        </p>
      </div>
    </div>
  </div>
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
    emit('update:modelValue', {
    ...props.modelValue,
    [key]: value,
    })
    }

    const previewCoverImageSrc = computed(() => {
    return props.coverImageUrl || sampleCoverImage
    })

    const previewThemeClass = computed(() => {
    if (props.modelValue.theme === 'warm') return 'bg-[#f7f2eb]'
    if (props.modelValue.theme === 'neutral') return 'bg-stone-100'
    if (props.modelValue.theme === 'dark-ink') return 'bg-stone-800 text-white'
    return 'bg-white'
    })

    const previewFontClass = computed(() => {
    if (props.modelValue.font === 'serif') return 'font-serif'
    if (props.modelValue.font === 'clean') return 'font-sans'
    if (props.modelValue.font === 'bookish') return 'font-serif italic'
    return 'font-serif'
    })

    const previewPageClass = computed(() => {
    return props.modelValue.orientation === 'landscape-spread'
    ? 'w-full max-w-[42rem] h-[20rem]'
    : 'w-72'
    })

    const previewStyleClass = computed(() => {
    if (props.modelValue.layout === 'minimal') return 'border-stone-200 shadow-none'
    if (props.modelValue.layout === 'elegant') return 'border-stone-300 shadow-md'
    return 'border-stone-300 shadow-sm'
    })

    const previewInnerSpacingClass = computed(() => {
    if (props.modelValue.layout === 'minimal') return 'p-5'
    if (props.modelValue.layout === 'elegant') return 'p-6'
    return 'p-4'
    })

    const previewTitleClass = computed(() => {
    if (props.modelValue.layout === 'minimal') return 'text-[1.7rem] tracking-tight'
    if (props.modelValue.layout === 'elegant') return 'text-[2rem]'
    return 'text-2xl'
    })

    const previewChapterBlockClass = computed(() => {
    if (props.modelValue.layout === 'minimal') return 'mt-6 pt-3'
    if (props.modelValue.layout === 'elegant') return 'mt-6 border-t border-stone-200 pt-5'
    return 'mt-5 border-t border-stone-200 pt-4'
    })

    const previewPrintFrameClass = computed(() => {
    return props.modelValue.printReady ? 'px-6 py-6' : ''
    })

    const previewPrintBodyClass = computed(() => {
    return props.modelValue.printReady ? 'leading-relaxed' : ''
    })

    const previewPrintContentWidthClass = computed(() => {
    if (!props.modelValue.printReady) return ''

    if (props.modelValue.orientation === 'landscape-spread') {
    return 'max-w-[95%]'
    }

    return 'max-w-[88%] mx-auto'
    })

    const previewPrintChapterSpacingClass = computed(() => {
    return props.modelValue.printReady ? 'mt-6 pt-5' : ''
    })
</script>