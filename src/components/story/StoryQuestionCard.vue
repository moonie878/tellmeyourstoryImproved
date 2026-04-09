<template>
    <div class="space-y-6">
        <Transition name="fade-slide" mode="out-in">
            <div v-if="section"
                 :key="section.id"
                 class="rounded-2xl border border-stone-200 bg-white p-6">
                <p class="text-sm font-medium uppercase tracking-[0.2em] text-stone-500">
                    {{ section.chapter || 'Chapter' }}
                </p>

                <h2 class="mt-2 text-2xl font-bold text-stone-900">
                    {{ section.question }}
                </h2>

                <p class="mt-1 text-xs text-stone-500">
                    You can come back anytime — everything is saved automatically.
                </p>

                <p class="mt-2 text-sm text-stone-500">
                    Question {{ currentIndex + 1 }} of {{ totalSections }}
                </p>

                <p class="mt-4 text-sm text-stone-600">
                    {{ Math.round(progress) }}% complete
                </p>

                <div class="mt-4 h-2 w-full rounded-full bg-stone-200">
                    <div class="h-2 rounded-full bg-[#7C5C3B]"
                         :style="{ width: progress + '%' }"></div>
                </div>

                <p class="mt-1 text-xs text-stone-500">
                    {{ progressMessage }}
                </p>

                <div class="mt-3 flex items-center gap-2 text-sm text-stone-500">
                    <span v-if="saveStatus">{{ saveStatus }}</span>

                    <span v-if="lastSavedLabel && !saveStatus">
                        {{ lastSavedLabel }}
                    </span>

                    <p v-if="saveError" class="mt-2 text-sm text-red-600">
                        {{ saveError }}
                    </p>
                </div>

                <textarea ref="textareaRef"
                          :value="section.answer"
                          @input="onAnswerInput"
                          class="mt-6 w-full resize-none rounded-xl border border-stone-300 p-4"
                          rows="8"
                          placeholder="Write your answer here..."></textarea>
                          <button
  type="button"
  @click="$emit('toggle-highlight')"
  class="mt-4 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition"
  :class="
    isHighlighted
      ? 'border-amber-300 bg-amber-50 text-amber-800'
      : 'border-stone-300 bg-white text-stone-700 hover:bg-stone-50'
  "
>
  <span>{{ isHighlighted ? '★' : '☆' }}</span>
  <span>{{ isHighlighted ? 'Highlighted for quote pages' : 'Highlight this memory' }}</span>
</button>
<p class="mt-2 text-xs text-stone-500">
  Highlighted memories may be featured as quote pages in your keepsake.
</p>
                          <p
  v-if="!hasImageExportAccess"
  class="mt-4 text-xs text-stone-500"
>
  As you build your story, you can turn it into a beautifully finished keepsake anytime.
</p>

                <div class="mt-6 rounded-xl border border-stone-200 bg-stone-50 p-4">
                    <label
  class="mt-3 flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-stone-300 bg-white px-4 py-6 text-center transition hover:bg-stone-50 hover:scale-[1.02] active:scale-[0.98]"
>
  <span class="text-sm font-medium text-stone-700">
    Tap to add a photo
  </span>
  <span class="mt-1 text-xs text-stone-500">
    JPG or PNG — helps make the finished keepsake feel more personal
  </span>

  <input
    type="file"
    accept="image/*"
    @change="$emit('image-upload', $event)"
    class="hidden"
  />
</label>

                    <p v-if="imageUploadStatus" class="mt-2 text-sm text-stone-500">
                        {{ imageUploadStatus }}
                    </p>

                    <div v-if="currentImagePreview && currentImagePreview.length > 0"
                         class="mt-4">
                        <div class="relative">
                            <img :src="currentImagePreview"
                                 alt="Uploaded story image"
                                 class="h-64 w-full rounded-xl border border-stone-200 bg-white object-contain"
                                 @error="$emit('image-error')" />

                            <div v-if="!hasImageExportAccess"
                                 class="absolute right-2 top-2 rounded-full bg-amber-500 px-2 py-1 text-xs text-white">
                                Premium
                            </div>
                        </div>

                        <div class="mt-3 flex gap-3">
                            <label class="cursor-pointer rounded-full border border-stone-300 px-4 py-2 text-sm hover:bg-stone-100">
                                Replace image
                                <input type="file"
                                       accept="image/*"
                                       @change="$emit('image-upload', $event)"
                                       class="hidden" />
                            </label>

                            <button @click="$emit('remove-image')"
                                    class="cursor-pointer rounded-full border border-red-300 px-4 py-2 text-sm text-red-600">
                                Remove image
                            </button>
                        </div>
                    </div>

                    <p v-if="currentImagePreview && !hasImageExportAccess"
                       class="mt-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-700">
                        This photo is saved to your story, but premium export is needed to include it in your finished keepsake.
                        <button @click="$emit('upgrade-images')" class="cursor-pointer ml-2 font-semibold underline transition hover:-translate-y-1 hover:shadow-md">
                            Add photos to your story
                        </button>
                    </p>
                </div>

                <p v-if="currentImagePreview && !hasImageExportAccess"
                   class="mt-3 text-xs text-amber-600">
                    This image is saved, but image export requires the premium with-images plan.
                </p>

                <div
  <div
  v-if="progress === 100"
  class="mt-6 rounded-3xl border border-green-200 bg-green-50 p-6 text-center transition-all duration-500"
>
  <p class="text-sm font-semibold uppercase tracking-[0.18em] text-green-700">
    Story complete
  </p>

  <p class="mt-3 text-xl font-semibold text-green-900">
    You’ve created something worth keeping
  </p>

  <p class="mt-3 text-sm leading-6 text-green-800">
    Your story is ready to become a finished keepsake — something you can print, share, and revisit for years to come.
  </p>

  <!-- 🔥 NEW: emotional bridge -->
  <p class="mt-4 text-sm text-green-700">
  Right now it’s your story — premium turns it into something you can truly keep.
</p>

  <div class="mt-6 flex flex-col items-center gap-3">
    <!-- 🔥 PRIMARY CTA -->
    <button
      @click="$emit('finish')"
      class="cursor-pointer rounded-full bg-[#7C5C3B] hover:opacity-90 transition px-6 py-3 text-sm font-medium text-white"
    >
      Create My Keepsake
    </button>

    <!-- 🔥 SECONDARY CTA -->
    <button
      v-if="!hasImageExportAccess"
      @click="$emit('upgrade-images')"
      class="cursor-pointer rounded-full border border-stone-900 px-5 py-2 text-sm"
    >
      Make it more beautiful
    </button>

    <p class="text-xs text-green-700">
      Premium adds photos, richer layouts, and a more finished book-like feel.
    </p>
  </div>
</div>

                <div class="mt-6 flex items-center justify-between gap-4">
                    <button @click="$emit('previous')"
                            :disabled="currentIndex === 0"
                            class="cursor-pointer rounded-full border border-stone-300 px-5 py-2 disabled:opacity-50 transition hover:-translate-y-1 hover:shadow-md">
                        Previous
                    </button>

                    <button @click="handleNextClick"
                            class="cursor-pointer rounded-full bg-[#7C5C3B] hover:opacity-90 transition px-5 py-2 text-white transition hover:-translate-y-1 hover:shadow-md">
                        {{ currentIndex === totalSections - 1 ? 'Finish your story' : 'Next' }}
                    </button>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
    import { ref, watch, nextTick} from 'vue'
    import type { StorySection } from '../../types/story'   

    const props = defineProps<{
    section: StorySection | null
    currentIndex: number
    totalSections: number
    progress: number
    progressMessage: string
    saveStatus: string
    saveError: string
    lastSavedLabel: string
    currentImagePreview: string
    imageUploadStatus: string
    hasImageExportAccess: boolean
    isHighlighted: boolean
    }>()

    const emit = defineEmits<{
    (e: 'update-answer', value: string): void
    (e: 'image-upload', event: Event): void
    (e: 'remove-image'): void
    (e: 'upgrade-images'): void
    (e: 'export-pdf'): void
    (e: 'previous'): void
    (e: 'next'): void
    (e: 'finish'): void
    (e: 'image-error'): void
    (e: 'toggle-highlight'): void
    }>()    

    const textareaRef = ref<HTMLTextAreaElement | null>(null)

    function onAnswerInput(event: Event) {
    const target = event.target as HTMLTextAreaElement
    emit('update-answer', target.value)
    }

    watch(
    () => props.section?.id,
    async () => {
    await nextTick()
    textareaRef.value?.focus()
    }
    )

function handleNextClick() {
  if (props.currentIndex === props.totalSections - 1) {
    emit('finish') // or emit a custom "finish" event
  } else {
    emit('next')
  }
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