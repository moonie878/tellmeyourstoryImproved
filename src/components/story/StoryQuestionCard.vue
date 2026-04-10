<template>
  <div class="space-y-6">
    <Transition name="fade-slide" mode="out-in">
      <div
        v-if="section"
        :key="section.id"
        class="rounded-2xl border border-stone-200 bg-white p-4 sm:p-6"
      >
        <!-- Top info -->
        <div class="text-center sm:text-left">
          <p class="text-xs font-medium uppercase tracking-[0.2em] text-stone-500">
            {{ section.chapter || 'Chapter' }}
          </p>

          <h2 class="mt-2 text-xl font-bold leading-8 text-stone-900 sm:text-2xl">
            {{ section.question }}
          </h2>

          <div class="mt-3 flex flex-col gap-2 text-xs text-stone-500 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
            <span>Question {{ currentIndex + 1 }} of {{ totalSections }}</span>
            <span class="hidden sm:inline">•</span>
            <span>{{ Math.round(progress) }}% complete</span>
            <span class="hidden sm:inline">•</span>
            <span v-if="saveStatus">{{ saveStatus }}</span>
            <span v-else-if="lastSavedLabel">{{ lastSavedLabel }}</span>
          </div>

          <div class="mt-4 h-2 w-full rounded-full bg-stone-200">
            <div
              class="h-2 rounded-full bg-[#7C5C3B] transition-all"
              :style="{ width: progress + '%' }"
            ></div>
          </div>

          <p class="mt-2 text-xs text-stone-500">
            {{ progressMessage }}
          </p>

          <p class="mt-2 text-xs text-stone-500">
            You can come back anytime — everything is saved automatically.
          </p>

          <p v-if="saveError" class="mt-3 text-sm text-red-600">
            {{ saveError }}
          </p>
        </div>

        <!-- Answer area -->
        <div class="mt-6">
          <textarea
            ref="textareaRef"
            :value="section.answer"
            @input="onAnswerInput"
            class="min-h-[220px] w-full resize-none rounded-2xl border border-stone-300 bg-stone-50 p-4 text-base leading-7 text-stone-900 placeholder:text-stone-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-stone-900 sm:min-h-[260px]"
            rows="8"
            placeholder="Write your answer here..."
          ></textarea>
        </div>

        <!-- Highlight -->
        <div class="mt-4">
          <button
            type="button"
            @click="$emit('toggle-highlight')"
            class="inline-flex w-full items-center justify-center gap-2 rounded-full border px-4 py-2.5 text-sm transition sm:w-auto"
            :class="
              isHighlighted
                ? 'border-amber-300 bg-amber-50 text-amber-800'
                : 'border-stone-300 bg-white text-stone-700 hover:bg-stone-50'
            "
          >
            <span>{{ isHighlighted ? '★' : '☆' }}</span>
            <span>
              {{ isHighlighted ? 'Highlighted for quote pages' : 'Highlight this memory' }}
            </span>
          </button>

          <p class="mt-2 text-xs text-stone-500">
            Highlighted memories may be featured as quote pages in your keepsake.
          </p>
        </div>

        <p
          v-if="!hasImageExportAccess"
          class="mt-4 text-xs leading-5 text-stone-500"
        >
          As you build your story, you can turn it into a beautifully finished keepsake anytime.
        </p>

        <!-- Image upload -->
        <div class="mt-6 rounded-2xl border border-stone-200 bg-stone-50 p-4">
          <label
            class="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-stone-300 bg-white px-4 py-6 text-center transition hover:bg-stone-50"
          >
            <span class="text-sm font-medium text-stone-700">
              Tap to add a photo
            </span>
            <span class="mt-1 text-xs leading-5 text-stone-500">
              JPG or PNG — helps make the finished keepsake feel more personal
            </span>

            <input
              type="file"
              accept="image/*"
              @change="$emit('image-upload', $event)"
              class="hidden"
            />
          </label>

          <p v-if="imageUploadStatus" class="mt-3 text-sm text-stone-500">
            {{ imageUploadStatus }}
          </p>

          <div
            v-if="currentImagePreview && currentImagePreview.length > 0"
            class="mt-4"
          >
            <div class="relative">
              <img
                :src="currentImagePreview"
                alt="Uploaded story image"
                class="max-h-64 w-full rounded-2xl object-cover"
                @error="$emit('image-error')"
              />

              <div
                v-if="!hasImageExportAccess"
                class="absolute right-2 top-2 rounded-full bg-amber-500 px-2 py-1 text-xs text-white"
              >
                Premium
              </div>
            </div>

            <div class="mt-3 flex flex-col gap-3 sm:flex-row">
              <label class="cursor-pointer rounded-full border border-stone-300 px-4 py-2 text-center text-sm hover:bg-stone-100">
                Replace image
                <input
                  type="file"
                  accept="image/*"
                  @change="$emit('image-upload', $event)"
                  class="hidden"
                />
              </label>

              <button
                @click="$emit('remove-image')"
                class="rounded-full border border-red-300 px-4 py-2 text-sm text-red-600"
              >
                Remove image
              </button>
            </div>
          </div>

          <p
            v-if="currentImagePreview && !hasImageExportAccess"
            class="mt-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs leading-5 text-amber-700"
          >
            This photo is saved to your story, but premium export is needed to include it in your finished keepsake.
            <button
              @click="$emit('upgrade-images')"
              class="ml-1 font-semibold underline"
            >
              Add photos to your story
            </button>
          </p>
        </div>

        <!-- Completion card -->
        <div
          v-if="progress === 100"
          class="mt-6 rounded-3xl border border-green-200 bg-green-50 p-5 text-center transition-all duration-500 sm:p-6"
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

          <p class="mt-4 text-sm text-green-700">
            Right now it’s your story — premium turns it into something you can truly keep.
          </p>

          <div class="mt-6 flex flex-col items-center gap-3">
            <button
              @click="$emit('finish')"
              class="w-full rounded-full bg-[#7C5C3B] px-6 py-3 text-sm font-medium text-white transition hover:opacity-90 sm:w-auto"
            >
              Create My Keepsake
            </button>

            <button
              v-if="!hasImageExportAccess"
              @click="$emit('upgrade-images')"
              class="w-full rounded-full border border-stone-900 px-5 py-3 text-sm sm:w-auto"
            >
              Make it more beautiful
            </button>

            <p class="text-xs text-green-700">
              Premium adds photos, richer layouts, and a more finished book-like feel.
            </p>
          </div>
        </div>

        <!-- Bottom navigation -->
        <div class="sticky bottom-0 mt-6 border-t border-stone-200 bg-white/95 pt-4 backdrop-blur">
          <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              @click="$emit('previous')"
              :disabled="currentIndex === 0"
              class="rounded-full border border-stone-300 px-5 py-3 text-sm transition disabled:opacity-50 hover:bg-stone-100"
            >
              Previous
            </button>

            <button
              @click="handleNextClick"
              class="rounded-full bg-[#7C5C3B] px-5 py-3 text-sm text-white transition hover:opacity-90"
            >
              {{ currentIndex === totalSections - 1 ? 'Finish your story' : 'Next' }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
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
    emit('finish')
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