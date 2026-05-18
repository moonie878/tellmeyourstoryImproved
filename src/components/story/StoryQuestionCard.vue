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
            <div class="h-2 rounded-full bg-[#7C5C3B] transition-all" :style="{ width: progress + '%' }" />
          </div>
          <p class="mt-2 text-xs text-stone-500">{{ progressMessage }}</p>
          <p class="mt-2 text-xs text-stone-500">You can come back anytime — everything is saved automatically.</p>
          <p v-if="saveError" class="mt-3 text-sm text-red-600">{{ saveError }}</p>
        </div>

        <!-- Answer area -->
        <div class="mt-6">

          <!-- Toolbar -->
          <div class="mb-2 flex items-center justify-between gap-2 flex-wrap">
            <p class="text-xs text-stone-500">Type your answer or speak it</p>

            <div class="flex items-center gap-2">
              <!-- Recording status -->
              <span v-if="voiceRecording.isRecording.value" class="flex items-center gap-1.5 text-xs text-red-600">
                <span class="inline-block h-2 w-2 animate-pulse rounded-full bg-red-500" />
                Recording…
              </span>
              <span v-else-if="voiceRecording.isSaving.value" class="text-xs text-stone-400">Saving…</span>

              <!-- Existing recording indicator -->
              <span
                v-if="existingRecording && !voiceRecording.isRecording.value"
                class="flex items-center gap-1 rounded-full bg-green-50 border border-green-200 px-2 py-1 text-xs text-green-700"
              >
                <span>🎙️</span> Voice saved
              </span>

              <!-- Mic button -->
              <button
                v-if="voiceRecording.speechSupported"
                type="button"
                @click="handleVoiceToggle"
                :disabled="voiceRecording.isSaving.value"
                class="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition disabled:opacity-50"
                :class="voiceRecording.isRecording.value
                  ? 'border-red-300 bg-red-50 text-red-700 hover:bg-red-100'
                  : 'border-stone-300 bg-white text-stone-700 hover:bg-stone-50'"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 1a4 4 0 0 1 4 4v6a4 4 0 0 1-8 0V5a4 4 0 0 1 4-4zm0 2a2 2 0 0 0-2 2v6a2 2 0 0 0 4 0V5a2 2 0 0 0-2-2zm-1 14.93V20H9v2h6v-2h-2v-2.07A8 8 0 0 0 20 11h-2a6 6 0 0 1-12 0H4a8 8 0 0 0 7 7.93z"/>
                </svg>
                {{ voiceRecording.isRecording.value ? 'Stop' : existingRecording ? 'Re-record' : 'Speak' }}
              </button>
              </div>
          </div>
              <!-- QR toggle -->
<div v-if="existingRecording" class="mt-3 flex items-center justify-between border-t border-green-200 pt-3">
  <div>
    <p class="text-xs font-medium text-green-800">Include QR code in printed book</p>
    <p class="text-[10px] text-green-600 mt-0.5">Family scan to hear this memory in your voice</p>
  </div>
  <button
    @click="toggleQR"
    class="relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200"
    :class="existingRecording.show_qr ? 'bg-[#7C5C3B]' : 'bg-stone-300'"
  >
    <span
      class="inline-block h-4 w-4 transform rounded-full bg-white shadow transition duration-200"
      :class="existingRecording.show_qr ? 'translate-x-4' : 'translate-x-0'"
    />
  </button>
</div>
           

          <textarea
            ref="textareaRef"
            :value="voiceRecording.isRecording.value ? voiceRecording.liveTranscript.value : section.answer"
            @input="onAnswerInput"
            class="min-h-[220px] w-full resize-none rounded-2xl border bg-stone-50 p-4 text-base leading-7 text-stone-900 placeholder:text-stone-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-stone-900 sm:min-h-[260px] transition"
            :class="voiceRecording.isRecording.value ? 'border-red-300 ring-1 ring-red-200' : 'border-stone-300'"
            rows="8"
            :placeholder="voiceRecording.isRecording.value ? 'Listening… speak your answer' : 'Write your answer here...'"
            :readonly="voiceRecording.isRecording.value"
          />

          <!-- Voice error -->
          <p v-if="voiceRecording.error.value" class="mt-1.5 text-xs text-red-600">
            {{ voiceRecording.error.value }}
          </p>

          <!-- Voice tip -->
          <p v-else-if="voiceRecording.speechSupported && !voiceRecording.isRecording.value && !section.answer" class="mt-1.5 text-xs text-stone-400">
            💡 Tap <strong>Speak</strong> and talk naturally — your words appear as you speak and are saved as a voice recording
          </p>
        </div>

        <!-- Existing voice recording player + QR code -->
        <div
          v-if="existingRecording && !voiceRecording.isRecording.value"
          class="mt-4 rounded-2xl border border-green-200 bg-green-50 p-4"
        >
          <div class="flex items-start justify-between gap-4">
            <div class="flex-1">
              <p class="text-xs font-medium text-green-800">🎙️ Voice recording saved</p>
              <p class="mt-1 text-xs text-green-700">
                {{ existingRecording.duration_seconds }}s · Family can scan the QR code in your printed book to hear this memory
              </p>

              <!-- Mini audio player -->
              <div class="mt-3 flex items-center gap-3">
                <button
                  @click="toggleExistingPlayback"
                  class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#7C5C3B] text-white transition hover:opacity-90"
                >
                  <svg v-if="!isPlayingExisting" xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                  </svg>
                </button>

                <div class="flex-1">
                  <div class="h-1.5 w-full rounded-full bg-green-200 overflow-hidden">
                    <div class="h-1.5 rounded-full bg-[#7C5C3B] transition-all" :style="{ width: `${existingProgress}%` }" />
                  </div>
                </div>

                <button
                  @click="deleteExistingRecording"
                  class="text-xs text-green-600 hover:underline flex-shrink-0"
                >
                  Remove
                </button>
              </div>

              <audio
                ref="existingAudioRef"
                :src="existingRecording.audio_url"
                @timeupdate="onExistingTimeUpdate"
                @loadedmetadata="onExistingMetadata"
                @ended="isPlayingExisting = false"
                preload="metadata"
              />
            </div>

            <!-- QR code -->
            <div class="flex-shrink-0 text-center">
              <canvas ref="qrCanvas" class="rounded-lg" width="80" height="80" />
              <p class="mt-1 text-[10px] text-green-700">Scan to listen</p>
            </div>
          </div>

          <p class="mt-3 text-[10px] text-green-600">
            This QR code will appear in your printed book next to this answer
          </p>
        </div>
<!-- Writing assist -->
<div class="mt-4">
 <!-- Show "start" button when answer is short/empty -->
<button
  v-if="!section?.answer?.trim() || section.answer.trim().length <= 20"
  type="button"
  @click="fetchWritingAssist('start')"
  :disabled="writingAssistLoading"
  class="inline-flex items-center gap-1.5 rounded-full border border-stone-300 bg-white px-4 py-2 text-xs font-medium text-stone-700 transition hover:bg-stone-50 disabled:opacity-50"
>
  <span>💡</span>
  <span>Help me start this answer</span>
</button>

<!-- Show "expand" button when answer has content -->
<button
  v-else-if="!writingAssistLoading"
  type="button"
  @click="fetchWritingAssist('expand')"
  class="inline-flex items-center gap-1.5 rounded-full border border-stone-300 bg-white px-4 py-2 text-xs font-medium text-stone-700 transition hover:bg-stone-50"
>
  <span>✨</span>
  <span>Help me expand this answer</span>
</button>
 
  <div v-if="writingAssistLoading" class="mt-3 flex items-center gap-2 text-xs text-stone-400">
    <span class="inline-block h-3 w-3 animate-spin rounded-full border-2 border-stone-300 border-t-stone-600" />
    Getting suggestions…
  </div>
 
  <p v-if="writingAssistError" class="mt-2 text-xs text-red-500">
    {{ writingAssistError }}
  </p>
 
  <div
    v-if="writingAssistSuggestions.length"
    class="mt-3 rounded-2xl border border-amber-100 bg-amber-50 p-4"
  >
    <p class="text-xs font-medium text-amber-800">
      💡 Things to think about adding
    </p>
    <p class="mt-1 text-[10px] text-amber-600">
      These are just prompts — keep writing in your own words
    </p>
    <ul class="mt-3 space-y-2">
      <li
        v-for="(suggestion, i) in writingAssistSuggestions"
        :key="i"
        class="text-xs leading-5 text-amber-900"
      >
        {{ suggestion }}
      </li>
    </ul>
    <button
      @click="writingAssistSuggestions = []"
      class="mt-3 text-[10px] text-amber-600 hover:underline"
    >
      Dismiss
    </button>
  </div>
</div>
        <!-- Highlight -->
        <div class="mt-4">
          <button
            type="button"
            @click="$emit('toggle-highlight')"
            class="inline-flex w-full items-center justify-center gap-2 rounded-full border px-4 py-2.5 text-sm transition sm:w-auto"
            :class="isHighlighted ? 'border-amber-300 bg-amber-50 text-amber-800' : 'border-stone-300 bg-white text-stone-700 hover:bg-stone-50'"
          >
            <span>{{ isHighlighted ? '★' : '☆' }}</span>
            <span>{{ isHighlighted ? 'Highlighted for quote pages' : 'Highlight this memory' }}</span>
          </button>
          <p class="mt-2 text-xs text-stone-500">Highlighted memories may be featured as quote pages in your keepsake.</p>
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
              <img :src="currentImagePreview" alt="Uploaded story image" class="max-h-64 w-full rounded-2xl object-cover" @error="$emit('image-error')" />
              <div v-if="!hasImageExportAccess" class="absolute right-2 top-2 rounded-full bg-amber-500 px-2 py-1 text-xs text-white">Premium</div>
            </div>
            <div class="mt-3 flex flex-col gap-3 sm:flex-row">
              <label class="cursor-pointer rounded-full border border-stone-300 px-4 py-2 text-center text-sm hover:bg-stone-100">
                Replace image
                <input type="file" accept="image/*" @change="$emit('image-upload', $event)" class="hidden" />
              </label>
              <button @click="$emit('remove-image')" class="rounded-full border border-red-300 px-4 py-2 text-sm text-red-600">Remove image</button>
            </div>
          </div>
          <p v-if="currentImagePreview && !hasImageExportAccess" class="mt-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs leading-5 text-amber-700">
            This photo is saved to your story, but premium export is needed to include it in your finished keepsake.
            <button @click="$emit('upgrade-images')" class="ml-1 font-semibold underline">Add photos to your story</button>
          </p>
        </div>

        <!-- Completion card -->
        <div v-if="progress === 100" class="mt-6 rounded-3xl border border-green-200 bg-green-50 p-5 text-center transition-all duration-500 sm:p-6">
          <p class="text-sm font-semibold uppercase tracking-[0.18em] text-green-700">Story complete</p>
          <p class="mt-3 text-xl font-semibold text-green-900">You've created something worth keeping</p>
          <p class="mt-3 text-sm leading-6 text-green-800">Your story is ready to become a finished keepsake — something you can print, share, and revisit for years to come.</p>
          <p class="mt-4 text-sm text-green-700">Right now it's your story — premium turns it into something you can truly keep.</p>
          <div class="mt-6 flex flex-col items-center gap-3">
            <button @click="$emit('finish')" class="w-full rounded-full bg-[#7C5C3B] px-6 py-3 text-sm font-medium text-white transition hover:opacity-90 sm:w-auto">Create My Keepsake</button>
            <button v-if="!hasImageExportAccess" @click="$emit('upgrade-images')" class="w-full rounded-full border border-stone-900 px-5 py-3 text-sm sm:w-auto">Make it more beautiful</button>
            <p class="text-xs text-green-700">Premium adds photos, richer layouts, and a more finished book-like feel.</p>
          </div>
        </div>

        <!-- Navigation -->
        <div class="sticky bottom-0 mt-6 border-t border-stone-200 bg-white/95 pt-4 backdrop-blur">
          <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button @click="$emit('previous')" :disabled="currentIndex === 0" class="rounded-full border border-stone-300 px-5 py-3 text-sm transition disabled:opacity-50 hover:bg-stone-100">
              Previous
            </button>
            <button @click="handleNextClick" class="rounded-full bg-[#7C5C3B] px-5 py-3 text-sm text-white transition hover:opacity-90">
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
import { useVoiceRecording } from '../../lib/useVoiceRecording'
import type { VoiceRecording } from '../../lib/useVoiceRecording'
import QRCode from 'qrcode'
import { supabase } from '../../lib/supabase'

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
  projectId: string
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

const textareaRef      = ref<HTMLTextAreaElement | null>(null)
const existingRecording = ref<VoiceRecording | null>(null)
const qrCanvas         = ref<HTMLCanvasElement | null>(null)

// Existing recording playback
const existingAudioRef  = ref<HTMLAudioElement | null>(null)
const isPlayingExisting = ref(false)
const existingCurrentTime = ref(0)
const existingDuration    = ref(0)
const existingProgress    = ref(0)

const writingAssistLoading = ref(false)
const writingAssistSuggestions = ref<string[]>([])
const writingAssistError = ref('')

const voiceRecording = useVoiceRecording()

// ── Load existing recording when section changes ──────────────────────────────
async function toggleQR() {
  if (!existingRecording.value) return
  const newValue = !existingRecording.value.show_qr
  await supabase
    .from('voice_recordings')
    .update({ show_qr: newValue })
    .eq('id', existingRecording.value.id)
  existingRecording.value = { ...existingRecording.value, show_qr: newValue }
}

async function loadExistingRecording() {
  if (!props.section || !props.projectId) return
  existingRecording.value = await voiceRecording.loadRecording(props.section.id, props.projectId)
  // watcher on existingRecording.value?.id will handle QR generation
}

async function fetchWritingAssist(mode: 'start' | 'expand') {
  if (!props.section?.question) return

  writingAssistLoading.value = true
  writingAssistSuggestions.value = []
  writingAssistError.value = ''

  try {
    const response = await fetch('https://tellmeyourstoryimproved.onrender.com/writing-assist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question: props.section.question,
        answer: props.section.answer || '',
        mode,
      }),
    })

    const data = await response.json()
    if (!response.ok || !data.suggestions) {
      writingAssistError.value = 'Could not load suggestions. Please try again.'
      return
    }
    writingAssistSuggestions.value = data.suggestions
  } catch {
    writingAssistError.value = 'Could not reach the writing assistant. Please try again.'
  } finally {
    writingAssistLoading.value = false
  }
}

async function generateQRCode(recordingId: string) {
  if (!qrCanvas.value) {
    console.warn('QR canvas not available')
    return
  }
  const url = `${window.location.origin}/listen/${recordingId}`
  try {
    await QRCode.toCanvas(qrCanvas.value, url, {
      width: 80,
      margin: 1,
      color: { dark: '#1C1917', light: '#F0FDF4' },
    })
  } catch (err) {
    console.error('QR generation error:', err)
  }
}

// flush: 'post' runs AFTER Vue has updated the DOM
// so qrCanvas is guaranteed to be mounted when this fires
watch(
  () => existingRecording.value?.id,
  async (id) => {
    if (id) await generateQRCode(id)
  },
  { flush: 'post' }
)

// ── Voice recording flow ──────────────────────────────────────────────────────

async function handleVoiceToggle() {
  if (voiceRecording.isRecording.value) {
    // Stop and save
    const result = await voiceRecording.stopRecording()
    if (!result || !props.section) return

    emit('update-answer', result.transcript)

    const saved = await voiceRecording.saveRecording(
      result.blob,
      result.transcript,
      result.durationSeconds,
      props.section.id,
      props.projectId
    )

    if (saved) {
      existingRecording.value = saved
      await nextTick()
    }
  } else {
    // If re-recording — stop existing playback and pause audio
    if (existingAudioRef.value) {
      existingAudioRef.value.pause()
      isPlayingExisting.value = false
    }

    // Wait for any existing recognition to fully release
    await new Promise(resolve => setTimeout(resolve, 600))

    await voiceRecording.startRecording(props.section?.answer || '')
  }
}

// ── Existing recording playback ───────────────────────────────────────────────

function toggleExistingPlayback() {
  if (!existingAudioRef.value) return
  if (isPlayingExisting.value) {
    existingAudioRef.value.pause()
    isPlayingExisting.value = false
  } else {
    existingAudioRef.value.play()
    isPlayingExisting.value = true
  }
}

function onExistingTimeUpdate() {
  if (!existingAudioRef.value) return
  existingCurrentTime.value = existingAudioRef.value.currentTime
  existingProgress.value = existingDuration.value
    ? (existingCurrentTime.value / existingDuration.value) * 100
    : 0
}

function onExistingMetadata() {
  if (existingAudioRef.value) existingDuration.value = existingAudioRef.value.duration
}

async function deleteExistingRecording() {
  if (!props.section || !confirm('Remove this voice recording?')) return
  await voiceRecording.deleteRecording(props.section.id, props.projectId)
  existingRecording.value = null
  isPlayingExisting.value = false
}

// ── Textarea input ────────────────────────────────────────────────────────────

function onAnswerInput(event: Event) {
  const target = event.target as HTMLTextAreaElement
  emit('update-answer', target.value)
}

// ── Navigation ────────────────────────────────────────────────────────────────

function handleNextClick() {
  if (voiceRecording.isRecording.value) voiceRecording.cancelRecording()
  if (props.currentIndex === props.totalSections - 1) {
    emit('finish')
  } else {
    emit('next')
  }
}

// ── Watchers ──────────────────────────────────────────────────────────────────

watch(
  () => props.section?.id,
  async () => {
    if (voiceRecording.isRecording.value) voiceRecording.cancelRecording()
    existingRecording.value = null
    writingAssistSuggestions.value = []
    writingAssistError.value = ''
    isPlayingExisting.value = false
    await nextTick()
    textareaRef.value?.focus()

    // Wait for the out-in transition to complete (250ms) before loading
    // so the canvas is guaranteed to be mounted when the QR watcher fires
    await new Promise(resolve => setTimeout(resolve, 280))
    await loadExistingRecording()
  },
  { immediate: true }
)

onUnmounted(() => {
  voiceRecording.cancelRecording()
})
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active { transition: all 0.25s ease; }
.fade-slide-enter-from { opacity: 0; transform: translateY(8px); }
.fade-slide-leave-to { opacity: 0; transform: translateY(-8px); }
</style>