<template>
  <div class="space-y-4">
    <Transition name="fade-slide" mode="out-in">
      <div
        v-if="section"
        :key="section.id"
        class="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm"
      >

        <!-- ── Question header ─────────────────────────────────────────────── -->
        <div class="border-b border-stone-100 px-5 py-4 sm:px-6">
          <div class="flex items-start justify-between gap-4">
            <div class="flex-1 min-w-0">
              <p class="text-[10px] font-medium uppercase tracking-[0.2em] text-stone-400">
                {{ section.chapter || 'Chapter' }}
              </p>
              <h2 class="mt-1.5 text-lg font-bold leading-7 text-stone-900 sm:text-xl">
                {{ section.question }}
              </h2>
            </div>
            <!-- Save status -->
            <span v-if="saveStatus" class="flex-shrink-0 text-xs text-stone-400 mt-1">{{ saveStatus }}</span>
            <span v-else-if="lastSavedLabel" class="flex-shrink-0 text-xs text-stone-400 mt-1">{{ lastSavedLabel }}</span>
          </div>

          <!-- Progress bar -->
          <div class="mt-3 flex items-center gap-3">
            <div class="flex-1 h-1 rounded-full bg-stone-200">
              <div class="h-1 rounded-full bg-[#7C5C3B] transition-all" :style="{ width: progress + '%' }" />
            </div>
            <span class="flex-shrink-0 text-xs text-stone-400">{{ Math.round(progress) }}%</span>
          </div>
          <p v-if="saveError" class="mt-2 text-xs text-red-600">{{ saveError }}</p>
        </div>

        <!-- ── Answer area ─────────────────────────────────────────────────── -->
        <div class="px-5 py-4 sm:px-6">

          <!-- Toolbar -->
          <div class="mb-3 flex flex-wrap items-center justify-between gap-2">
  <p class="text-xs text-stone-400 min-w-0">
              <span v-if="voiceRecording.isRecording.value" class="flex items-center gap-1.5 text-red-600 font-medium">
                <span class="inline-block h-2 w-2 animate-pulse rounded-full bg-red-500" />
                Recording…
              </span>
              <span v-else-if="voiceRecording.isTranscribing.value" class="text-stone-400">✦ Transcribing…</span>
              <span v-else-if="voiceRecording.isSaving.value" class="text-stone-400">Saving…</span>
              <span v-else>Type your answer or speak it</span>
           </p>
  <div class="flex flex-shrink-0 items-center gap-2">
              <!-- Voice saved badge -->
              <span
                v-if="existingRecording && !voiceRecording.isRecording.value"
                class="flex items-center gap-1 rounded-full bg-green-50 border border-green-200 px-2 py-0.5 text-xs text-green-700"
              >
                🎙️ Saved
              </span>

              <!-- Mic button -->
              <button
                v-if="voiceRecording.speechSupported"
                type="button"
                @click="handleVoiceToggle"
                :disabled="voiceRecording.isSaving.value || voiceRecording.isTranscribing.value"
                class="flex items-center gap-1.5 rounded-full border px-2 py-1.5 text-xs font-medium transition disabled:opacity-50 sm:px-3"
                :class="voiceRecording.isRecording.value
                  ? 'border-red-300 bg-red-50 text-red-700 hover:bg-red-100'
                  : 'border-stone-300 bg-white text-stone-700 hover:bg-stone-50'"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 1a4 4 0 0 1 4 4v6a4 4 0 0 1-8 0V5a4 4 0 0 1 4-4zm0 2a2 2 0 0 0-2 2v6a2 2 0 0 0 4 0V5a2 2 0 0 0-2-2zm-1 14.93V20H9v2h6v-2h-2v-2.07A8 8 0 0 0 20 11h-2a6 6 0 0 1-12 0H4a8 8 0 0 0 7 7.93z"/>
                </svg>
                {{ voiceRecording.isRecording.value ? 'Stop' : existingRecording ? 'Re-record' : '🎙️ Speak' }}
              </button>
            </div>
          </div>

          <!-- QR toggle — only when recording exists -->
          <div v-if="existingRecording && !voiceRecording.isRecording.value" class="mb-3 flex items-center justify-between rounded-xl border border-green-100 bg-green-50 px-3 py-2">
            <div>
              <p class="text-xs font-medium text-green-800">Include QR code in printed book</p>
              <p class="text-[10px] text-green-600">Family scan to hear this memory</p>
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

          <!-- Textarea -->
          <textarea
            ref="textareaRef"
            :value="voiceRecording.isRecording.value ? voiceRecording.liveTranscript.value : section.answer"
            @input="onAnswerInput"
            class="min-h-[200px] w-full resize-none rounded-xl border bg-stone-50 p-4 text-base leading-7 text-stone-900 placeholder:text-stone-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#7C5C3B] sm:min-h-[240px] transition"
            :class="voiceRecording.isRecording.value ? 'border-red-200 bg-red-50/30' : 'border-stone-200'"
            rows="8"
            :placeholder="voiceRecording.isRecording.value ? 'Speak your answer — transcript appears when you stop' : 'Write your answer here…'"
            :readonly="voiceRecording.isRecording.value"
          />

          <!-- Voice tip -->
          <p v-if="!voiceRecording.isRecording.value && !section.answer && voiceRecording.speechSupported" class="mt-2 text-xs text-stone-400">
            💡 Tap <strong>Speak</strong> — talk naturally and we'll transcribe it for you
          </p>
          <p v-if="voiceRecording.error.value" class="mt-2 text-xs text-red-500">{{ voiceRecording.error.value }}</p>
        </div>

        <!-- ── Voice recording player ──────────────────────────────────────── -->
        <div
          v-if="existingRecording && !voiceRecording.isRecording.value"
          class="mx-5 mb-4 rounded-xl border border-green-200 bg-green-50 p-3 sm:mx-6"
        >
          <div class="flex items-center gap-3">
            <button
              @click="toggleExistingPlayback"
              class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#7C5C3B] text-white transition hover:opacity-90"
            >
              <svg v-if="!isPlayingExisting" xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 ml-0.5" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
            </button>

            <div class="flex-1">
              <div class="h-1.5 w-full overflow-hidden rounded-full bg-green-200">
                <div class="h-1.5 rounded-full bg-[#7C5C3B] transition-all" :style="{ width: `${existingProgress}%` }" />
              </div>
              <p class="mt-1 text-[10px] text-green-600">{{ existingRecording.duration_seconds }}s · QR code in printed book</p>
            </div>

            <div class="flex-shrink-0 text-center">
              <canvas ref="qrCanvas" class="rounded" width="56" height="56" />
            </div>

            <button @click="deleteExistingRecording" class="flex-shrink-0 text-xs text-stone-400 hover:text-red-500 transition">Remove</button>
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

        <!-- ── Writing assist ─────────────────────────────────────────────── -->
        <div class="border-t border-stone-100 px-5 py-4 sm:px-6">
          <div class="flex flex-wrap gap-2">
            <button
              v-if="!section?.answer?.trim() || section.answer.trim().length <= 20"
              type="button"
              @click="fetchWritingAssist('start')"
              :disabled="writingAssistLoading"
              class="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-3 py-1.5 text-xs font-medium text-stone-600 transition hover:bg-stone-50 disabled:opacity-50"
            >
              <span>💡</span> Help me start this
            </button>
            <button
              v-else-if="!writingAssistLoading"
              type="button"
              @click="fetchWritingAssist('expand')"
              class="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-3 py-1.5 text-xs font-medium text-stone-600 transition hover:bg-stone-50"
            >
              <span>✨</span> Help me expand this
            </button>
            <div v-if="writingAssistLoading" class="flex items-center gap-2 text-xs text-stone-400">
              <span class="inline-block h-3 w-3 animate-spin rounded-full border-2 border-stone-300 border-t-stone-600" />
              Getting suggestions…
            </div>

            <!-- Highlight button -->
            <button
              type="button"
              @click="$emit('toggle-highlight')"
              class="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition"
              :class="isHighlighted ? 'border-amber-300 bg-amber-50 text-amber-800' : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'"
            >
              <span>{{ isHighlighted ? '★' : '☆' }}</span>
              {{ isHighlighted ? 'Highlighted' : 'Highlight memory' }}
            </button>
          </div>

          <p v-if="writingAssistError" class="mt-2 text-xs text-red-500">{{ writingAssistError }}</p>

          <div v-if="writingAssistSuggestions.length" class="mt-3 rounded-xl border border-amber-100 bg-amber-50 p-4">
            <p class="text-xs font-medium text-amber-800">💡 Things to think about adding</p>
            <p class="mt-0.5 text-[10px] text-amber-600">These are just prompts — keep writing in your own words</p>
            <ul class="mt-3 space-y-2">
              <li v-for="(suggestion, i) in writingAssistSuggestions" :key="i" class="text-xs leading-5 text-amber-900">{{ suggestion }}</li>
            </ul>
            <button @click="writingAssistSuggestions = []" class="mt-3 text-[10px] text-amber-600 hover:underline">Dismiss</button>
          </div>

          <!-- Family comments -->
          <div v-if="commentCount > 0" class="mt-3">
            <button
              @click="showComments = !showComments"
              class="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-800 transition hover:bg-amber-100"
            >
              <span>💬</span>
              {{ commentCount }} family comment{{ commentCount === 1 ? '' : 's' }}
              <span class="text-amber-500">{{ showComments ? '▲' : '▼' }}</span>
            </button>
            <div v-if="showComments" class="mt-3 space-y-3 rounded-xl border border-amber-100 bg-amber-50 p-4">
              <p class="text-xs font-medium text-amber-800">What family said about this answer</p>
              <div v-for="comment in sectionComments" :key="comment.id" class="flex gap-3">
                <div class="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-amber-200 text-xs font-semibold text-amber-800">
                  {{ comment.author_name.charAt(0).toUpperCase() }}
                </div>
                <div>
                  <p class="text-xs font-medium text-stone-800">{{ comment.author_name }}</p>
                  <p class="mt-0.5 text-xs leading-5 text-stone-600">{{ comment.comment }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ── Photo upload ────────────────────────────────────────────────── -->
        <div class="border-t border-stone-100 px-5 pb-4 sm:px-6">
          <div v-if="currentImagePreview && currentImagePreview.length > 0" class="mt-4">
            <div class="relative">
              <img :src="currentImagePreview" alt="Story image" class="max-h-56 w-full rounded-xl object-cover" @error="$emit('image-error')" />
              <div v-if="!hasImageExportAccess" class="absolute right-2 top-2 rounded-full bg-amber-500 px-2 py-0.5 text-xs font-medium text-white">Premium</div>
            </div>
            <div class="mt-3 flex gap-2">
              <label class="cursor-pointer rounded-full border border-stone-200 px-3 py-1.5 text-xs font-medium text-stone-600 hover:bg-stone-50">
                Replace photo
                <input type="file" accept="image/*" @change="$emit('image-upload', $event)" class="hidden" />
              </label>
              <button @click="$emit('remove-image')" class="rounded-full border border-red-200 px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50">Remove</button>
            </div>
            <p v-if="!hasImageExportAccess" class="mt-2 text-xs text-amber-700">
              Photo saved — <button @click="$emit('upgrade-images')" class="font-semibold underline">upgrade to include it in your keepsake</button>
            </p>
          </div>

          <div v-else class="mt-4">
            <label class="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-stone-200 bg-stone-50 px-4 py-3 transition hover:bg-stone-100">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 flex-shrink-0 text-stone-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
              </svg>
              <div>
                <p class="text-xs font-medium text-stone-600">Add a photo to this answer</p>
                <p class="text-[10px] text-stone-400">Helps make your keepsake feel more personal</p>
              </div>
              <input type="file" accept="image/*" @change="$emit('image-upload', $event)" class="hidden" />
            </label>
          </div>

          <p v-if="imageUploadStatus" class="mt-2 text-xs text-stone-500">{{ imageUploadStatus }}</p>
        </div>

        <!-- ── Completion card ─────────────────────────────────────────────── -->
        <div v-if="progress === 100" class="mx-5 mb-4 rounded-2xl border border-green-200 bg-green-50 p-5 text-center sm:mx-6">
          <p class="text-xs font-semibold uppercase tracking-wider text-green-700">Story complete</p>
          <p class="mt-2 text-lg font-semibold text-green-900">You've created something worth keeping</p>
          <p class="mt-2 text-sm leading-6 text-green-800">Your story is ready to become a finished keepsake.</p>
          <div class="mt-4 flex flex-col items-center gap-2">
            <button @click="$emit('finish')" class="rounded-full bg-[#7C5C3B] px-6 py-2.5 text-sm font-medium text-white transition hover:opacity-90">Create My Keepsake</button>
            <button v-if="!hasImageExportAccess" @click="$emit('upgrade-images')" class="rounded-full border border-stone-300 px-5 py-2.5 text-sm text-stone-700 hover:bg-stone-50">Make it more beautiful</button>
          </div>
        </div>

        <!-- ── Navigation ─────────────────────────────────────────────────── -->
        <div class="sticky bottom-0 border-t border-stone-100 bg-white/95 px-5 py-3 backdrop-blur sm:px-6">
          <div class="flex items-center justify-between gap-3">
            <button
              @click="$emit('previous')"
              :disabled="currentIndex === 0"
              class="rounded-full border border-stone-200 px-5 py-2.5 text-sm font-medium text-stone-600 transition disabled:opacity-30 hover:bg-stone-50"
            >
              ← Previous
            </button>
            <span class="text-xs text-stone-400">{{ currentIndex + 1 }} / {{ totalSections }}</span>
            <button
              @click="handleNextClick"
              class="rounded-full bg-[#7C5C3B] px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
            >
              {{ currentIndex === totalSections - 1 ? 'Finish →' : 'Next →' }}
            </button>
          </div>
        </div>

      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, onUnmounted, computed } from 'vue'
import type { StorySection } from '../../types/story'
import { useVoiceRecording } from '../../lib/useVoiceRecording_whisper'
import type { VoiceRecording } from '../../lib/useVoiceRecording_whisper'
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

const textareaRef       = ref<HTMLTextAreaElement | null>(null)
const existingRecording = ref<VoiceRecording | null>(null)
const qrCanvas          = ref<HTMLCanvasElement | null>(null)
const existingAudioRef  = ref<HTMLAudioElement | null>(null)
const isPlayingExisting = ref(false)
const existingCurrentTime = ref(0)
const existingDuration    = ref(0)
const existingProgress    = ref(0)

const writingAssistLoading     = ref(false)
const writingAssistSuggestions = ref<string[]>([])
const writingAssistError       = ref('')

const sectionComments = ref<any[]>([])
const showComments    = ref(false)
const commentCount    = computed(() => sectionComments.value.length)

const voiceRecording = useVoiceRecording()

async function toggleQR() {
  if (!existingRecording.value) return
  const newValue = !existingRecording.value.show_qr
  await supabase.from('voice_recordings').update({ show_qr: newValue }).eq('id', existingRecording.value.id)
  existingRecording.value = { ...existingRecording.value, show_qr: newValue }
}

async function loadSectionComments() {
  if (!props.section || !props.projectId) return
  const { data } = await supabase
    .from('story_comments').select('*')
    .eq('project_id', props.projectId)
    .eq('section_id', props.section.id)
    .order('created_at', { ascending: true })
  sectionComments.value = data || []
}

async function loadExistingRecording() {
  if (!props.section || !props.projectId) return
  existingRecording.value = await voiceRecording.loadRecording(props.section.id, props.projectId)
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
      body: JSON.stringify({ question: props.section.question, answer: props.section.answer || '', mode }),
    })
    const data = await response.json()
    if (!response.ok || !data.suggestions) { writingAssistError.value = 'Could not load suggestions. Please try again.'; return }
    writingAssistSuggestions.value = data.suggestions
  } catch {
    writingAssistError.value = 'Could not reach the writing assistant. Please try again.'
  } finally {
    writingAssistLoading.value = false
  }
}

async function generateQRCode(recordingId: string) {
  if (!qrCanvas.value) return
  const url = `${window.location.origin}/listen/${recordingId}`
  try {
    await QRCode.toCanvas(qrCanvas.value, url, { width: 56, margin: 1, color: { dark: '#1C1917', light: '#F0FDF4' } })
  } catch (err) {
    console.error('QR generation error:', err)
  }
}

watch(
  () => existingRecording.value?.id,
  async (id) => {
    if (!id) return
    await nextTick()
    await new Promise(resolve => setTimeout(resolve, 50))
    await generateQRCode(id)
  },
  { flush: 'post' }
)

async function handleVoiceToggle() {
  if (voiceRecording.isRecording.value) {
    const result = await voiceRecording.stopRecording()
    if (!result || !props.section) return
    emit('update-answer', result.transcript)
    const saved = await voiceRecording.saveRecording(result.blob, result.transcript, result.durationSeconds, props.section.id, props.projectId)
    if (saved) {
      existingRecording.value = null
      await nextTick()
      existingRecording.value = saved
      await nextTick()
      await new Promise(resolve => setTimeout(resolve, 100))
    }
  } else {
    await voiceRecording.startRecording(props.section?.answer || '')
  }
}

function toggleExistingPlayback() {
  if (!existingAudioRef.value) return
  if (isPlayingExisting.value) { existingAudioRef.value.pause(); isPlayingExisting.value = false }
  else { existingAudioRef.value.play(); isPlayingExisting.value = true }
}

function onExistingTimeUpdate() {
  if (!existingAudioRef.value) return
  existingCurrentTime.value = existingAudioRef.value.currentTime
  existingProgress.value = existingDuration.value ? (existingCurrentTime.value / existingDuration.value) * 100 : 0
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

function onAnswerInput(event: Event) {
  const target = event.target as HTMLTextAreaElement
  emit('update-answer', target.value)
}

function handleNextClick() {
  if (voiceRecording.isRecording.value) voiceRecording.cancelRecording()
  if (props.currentIndex === props.totalSections - 1) emit('finish')
  else emit('next')
}

watch(
  () => props.section?.id,
  async () => {
    if (voiceRecording.isRecording.value) voiceRecording.cancelRecording()
    existingRecording.value = null
    writingAssistSuggestions.value = []
    writingAssistError.value = ''
    sectionComments.value = []
    showComments.value = false
    await loadSectionComments()
    isPlayingExisting.value = false
    await nextTick()
    textareaRef.value?.focus()
    await new Promise(resolve => setTimeout(resolve, 280))
    await loadExistingRecording()
  },
  { immediate: true }
)

onUnmounted(() => { voiceRecording.cancelRecording() })
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active { transition: all 0.25s ease; }
.fade-slide-enter-from { opacity: 0; transform: translateY(8px); }
.fade-slide-leave-to { opacity: 0; transform: translateY(-8px); }
</style>