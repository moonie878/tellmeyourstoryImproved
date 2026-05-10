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
            />
          </div>

          <p class="mt-2 text-xs text-stone-500">{{ progressMessage }}</p>
          <p class="mt-2 text-xs text-stone-500">You can come back anytime — everything is saved automatically.</p>
          <p v-if="saveError" class="mt-3 text-sm text-red-600">{{ saveError }}</p>
        </div>

        <!-- Answer area -->
        <div class="mt-6">

          <!-- Mic button row -->
          <div class="mb-2 flex items-center justify-between">
            <p class="text-xs text-stone-500">Type your answer or speak it</p>

            <div class="flex items-center gap-2">
              <!-- Recording status -->
              <span v-if="isRecording" class="flex items-center gap-1.5 text-xs text-red-600">
                <span class="inline-block h-2 w-2 animate-pulse rounded-full bg-red-500" />
                Recording…
              </span>
              <span v-else-if="!speechSupported" class="text-xs text-stone-400">
                Voice not supported in this browser
              </span>

              <!-- Mic button -->
              <button
                v-if="speechSupported"
                type="button"
                @click="toggleRecording"
                :title="isRecording ? 'Stop recording' : 'Speak your answer'"
                class="flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition"
                :class="isRecording
                  ? 'border-red-300 bg-red-50 text-red-700 hover:bg-red-100'
                  : 'border-stone-300 bg-white text-stone-700 hover:bg-stone-50'"
              >
                <!-- Mic icon -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3.5 w-3.5"
                  :class="isRecording ? 'text-red-600' : 'text-stone-600'"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 1a4 4 0 0 1 4 4v6a4 4 0 0 1-8 0V5a4 4 0 0 1 4-4zm0 2a2 2 0 0 0-2 2v6a2 2 0 0 0 4 0V5a2 2 0 0 0-2-2zm-1 14.93V20H9v2h6v-2h-2v-2.07A8 8 0 0 0 20 11h-2a6 6 0 0 1-12 0H4a8 8 0 0 0 7 7.93z"/>
                </svg>
                {{ isRecording ? 'Stop' : 'Speak' }}
              </button>
            </div>
          </div>

          <textarea
            ref="textareaRef"
            :value="section.answer"
            @input="onAnswerInput"
            class="min-h-[220px] w-full resize-none rounded-2xl border bg-stone-50 p-4 text-base leading-7 text-stone-900 placeholder:text-stone-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-stone-900 sm:min-h-[260px] transition"
            :class="isRecording ? 'border-red-300 ring-1 ring-red-200' : 'border-stone-300'"
            rows="8"
            :placeholder="isRecording ? 'Listening… speak your answer' : 'Write your answer here...'"
          />

          <!-- Voice tip -->
          <p v-if="speechSupported && !isRecording && !section.answer" class="mt-1.5 text-xs text-stone-400">
            💡 Tip — tap <strong>Speak</strong> and talk naturally. Your words will appear as you speak.
          </p>
        </div>

        <!-- Highlight -->
        <div class="mt-4">
          <button
            type="button"
            @click="$emit('toggle-highlight')"
            class="inline-flex w-full items-center justify-center gap-2 rounded-full border px-4 py-2.5 text-sm transition sm:w-auto"
            :class="isHighlighted
              ? 'border-amber-300 bg-amber-50 text-amber-800'
              : 'border-stone-300 bg-white text-stone-700 hover:bg-stone-50'"
          >
            <span>{{ isHighlighted ? '★' : '☆' }}</span>
            <span>{{ isHighlighted ? 'Highlighted for quote pages' : 'Highlight this memory' }}</span>
          </button>

          <p class="mt-2 text-xs text-stone-500">
            Highlighted memories may be featured as quote pages in your keepsake.
          </p>
        </div>

        <p v-if="!hasImageExportAccess" class="mt-4 text-xs leading-5 text-stone-500">
          As you build your story, you can turn it into a beautifully finished keepsake anytime.
        </p>

        <!-- Image upload -->
        <div class="mt-6 rounded-2xl border border-stone-200 bg-stone-50 p-4">
          <label class="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-stone-300 bg-white px-4 py-6 text-center transition hover:bg-stone-50">
            <span class="text-sm font-medium text-stone-700">Tap to add a photo</span>
            <span class="mt-1 text-xs leading-5 text-stone-500">JPG or PNG — helps make the finished keepsake feel more personal</span>
            <input type="file" accept="image/*" @change="$emit('image-upload', $event)" class="hidden" />
          </label>

          <p v-if="imageUploadStatus" class="mt-3 text-sm text-stone-500">{{ imageUploadStatus }}</p>

          <div v-if="currentImagePreview && currentImagePreview.length > 0" class="mt-4">
            <div class="relative">
              <img
                :src="currentImagePreview"
                alt="Uploaded story image"
                class="max-h-64 w-full rounded-2xl object-cover"
                @error="$emit('image-error')"
              />
              <div v-if="!hasImageExportAccess" class="absolute right-2 top-2 rounded-full bg-amber-500 px-2 py-1 text-xs text-white">
                Premium
              </div>
            </div>

            <div class="mt-3 flex flex-col gap-3 sm:flex-row">
              <label class="cursor-pointer rounded-full border border-stone-300 px-4 py-2 text-center text-sm hover:bg-stone-100">
                Replace image
                <input type="file" accept="image/*" @change="$emit('image-upload', $event)" class="hidden" />
              </label>
              <button @click="$emit('remove-image')" class="rounded-full border border-red-300 px-4 py-2 text-sm text-red-600">
                Remove image
              </button>
            </div>
          </div>

          <p v-if="currentImagePreview && !hasImageExportAccess" class="mt-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs leading-5 text-amber-700">
            This photo is saved to your story, but premium export is needed to include it in your finished keepsake.
            <button @click="$emit('upgrade-images')" class="ml-1 font-semibold underline">Add photos to your story</button>
          </p>
        </div>

        <!-- Completion card -->
        <div
          v-if="progress === 100"
          class="mt-6 rounded-3xl border border-green-200 bg-green-50 p-5 text-center transition-all duration-500 sm:p-6"
        >
          <p class="text-sm font-semibold uppercase tracking-[0.18em] text-green-700">Story complete</p>
          <p class="mt-3 text-xl font-semibold text-green-900">You've created something worth keeping</p>
          <p class="mt-3 text-sm leading-6 text-green-800">Your story is ready to become a finished keepsake — something you can print, share, and revisit for years to come.</p>
          <p class="mt-4 text-sm text-green-700">Right now it's your story — premium turns it into something you can truly keep.</p>

          <div class="mt-6 flex flex-col items-center gap-3">
            <button @click="$emit('finish')" class="w-full rounded-full bg-[#7C5C3B] px-6 py-3 text-sm font-medium text-white transition hover:opacity-90 sm:w-auto">
              Create My Keepsake
            </button>
            <button v-if="!hasImageExportAccess" @click="$emit('upgrade-images')" class="w-full rounded-full border border-stone-900 px-5 py-3 text-sm sm:w-auto">
              Make it more beautiful
            </button>
            <p class="text-xs text-green-700">Premium adds photos, richer layouts, and a more finished book-like feel.</p>
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
import { ref, watch, nextTick, onUnmounted } from 'vue'
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

const textareaRef   = ref<HTMLTextAreaElement | null>(null)
const isRecording   = ref(false)

// ─── Web Speech API setup ─────────────────────────────────────────────────────

const SpeechRecognition =
  (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition

const speechSupported = !!SpeechRecognition

let recognition: any = null

function setupRecognition() {
  if (!SpeechRecognition) return

  recognition = new SpeechRecognition()
  recognition.continuous      = true   // keep recording until stopped
  recognition.interimResults  = true   // show words as they're spoken
  recognition.lang             = 'en-GB'
  recognition.maxAlternatives = 1

  // Track what we had before recording started
  let baseText = props.section?.answer || ''

  recognition.onstart = () => {
    baseText = props.section?.answer || ''
    isRecording.value = true
  }

  recognition.onresult = (event: any) => {
    let interimTranscript = ''
    let finalTranscript   = ''

    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript
      if (event.results[i].isFinal) {
        finalTranscript += transcript + ' '
      } else {
        interimTranscript += transcript
      }
    }

    // Append new final words to existing answer
    if (finalTranscript) {
      baseText = baseText + finalTranscript
    }

    // Show interim results live in the textarea
    const displayText = baseText + interimTranscript
    emit('update-answer', displayText)

    // Keep textarea in sync
    if (textareaRef.value) {
      textareaRef.value.value = displayText
    }
  }

  recognition.onerror = (event: any) => {
    console.error('Speech recognition error:', event.error)
    isRecording.value = false
    if (event.error === 'not-allowed') {
      alert('Microphone access was denied. Please allow microphone access in your browser settings and try again.')
    }
  }

  recognition.onend = () => {
    isRecording.value = false
  }
}

function toggleRecording() {
  if (!recognition) setupRecognition()

  if (isRecording.value) {
    recognition.stop()
    isRecording.value = false
  } else {
    try {
      recognition.start()
    } catch (err) {
      console.error('Could not start recording:', err)
      // Recognition may already be running — stop and restart
      recognition.stop()
      setTimeout(() => {
        setupRecognition()
        recognition.start()
      }, 300)
    }
  }
}

// Stop recording when navigating away from a question
watch(
  () => props.section?.id,
  async () => {
    if (isRecording.value && recognition) {
      recognition.stop()
      isRecording.value = false
    }
    await nextTick()
    textareaRef.value?.focus()
  }
)

// Clean up on unmount
onUnmounted(() => {
  if (recognition) {
    recognition.stop()
    recognition = null
  }
})

// ─── Answer input ─────────────────────────────────────────────────────────────

function onAnswerInput(event: Event) {
  const target = event.target as HTMLTextAreaElement
  emit('update-answer', target.value)
}

function handleNextClick() {
  if (isRecording.value && recognition) {
    recognition.stop()
    isRecording.value = false
  }
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