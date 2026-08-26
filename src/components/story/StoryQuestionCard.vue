<template>
  <div>
    <Transition name="fade-slide" mode="out-in">
      <div
        v-if="section"
        :key="section.id"
        class="relative overflow-hidden rounded-2xl border border-stone-200 bg-white"
      >

        <!-- Reading progress — hairline at the very top -->
        <div class="absolute inset-x-0 top-0 z-10 h-[3px] bg-stone-100">
          <div
            class="h-full bg-[#7C5C3B] transition-all duration-700"
            :style="{ width: progress + '%' }"
          />
        </div>

        <!-- ══════════════════════════════════════════════════════════ -->
        <!-- QUESTION — the hero of the screen                          -->
        <!-- ══════════════════════════════════════════════════════════ -->
        <div class="px-6 pb-6 pt-8 sm:px-10 sm:pt-10">
          <div class="flex items-start justify-between gap-6">
            <div class="min-w-0 flex-1">
              <p class="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9C7C5C]">
                {{ section.chapter || 'Chapter' }}
              </p>
              <h2 class="mt-3 font-display text-[22px] font-semibold leading-[1.35] tracking-[-0.01em] text-stone-900 sm:text-[26px]">
                {{ section.question }}
              </h2>
            </div>

            <!-- Save state — quiet, top right -->
            <p class="mt-1 flex-shrink-0 text-[11px] text-stone-300">
              {{ saveStatus || lastSavedLabel }}
            </p>
          </div>

          <p v-if="saveError" class="mt-3 text-xs text-red-600">{{ saveError }}</p>
        </div>

        <!-- ══════════════════════════════════════════════════════════ -->
        <!-- WRITING SURFACE — feels like a page, not a form            -->
        <!-- ══════════════════════════════════════════════════════════ -->
        <div class="px-6 sm:px-10">

          <!-- Recording indicator -->
          <Transition name="fade">
            <div
              v-if="voiceRecording.isRecording.value"
              class="mb-3 flex items-center gap-2"
            >
              <span class="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
              <p class="text-xs font-medium text-red-600">Recording — speak naturally</p>
            </div>
            <p
              v-else-if="voiceRecording.isTranscribing.value"
              class="mb-3 text-xs text-stone-400"
            >Transcribing your recording…</p>
          </Transition>

          <textarea
            ref="textareaRef"
            :value="voiceRecording.isRecording.value ? voiceRecording.liveTranscript.value : section.answer"
            @input="onAnswerInput"
            class="prose-answer min-h-[260px] w-full resize-none border-0 bg-transparent p-0 focus:outline-none focus:ring-0 sm:min-h-[300px]"
            :class="voiceRecording.isRecording.value ? 'text-stone-500' : 'text-stone-800'"
            rows="10"
            :placeholder="voiceRecording.isRecording.value
              ? 'Your words will appear here when you stop…'
              : 'Start wherever feels natural. There is no wrong way to tell it.'"
            :readonly="voiceRecording.isRecording.value"
          />

          <p v-if="voiceRecording.error.value" class="mt-2 text-xs text-red-500">
            {{ voiceRecording.error.value }}
          </p>

          <!-- Word count + voice button -->
          <div class="mt-4 flex items-center justify-between border-t border-stone-100 pt-4">
            <p class="text-xs text-stone-400">
              <template v-if="wordCount">{{ wordCount }} {{ wordCount === 1 ? 'word' : 'words' }}</template>
              <template v-else-if="voiceRecording.speechSupported">
                Type, or tap Speak to talk it through
              </template>
              <template v-else>Type your answer</template>
            </p>

            <div class="flex items-center gap-2">
              <span
                v-if="existingRecording && !voiceRecording.isRecording.value"
                class="hidden text-[11px] text-[#4A7C59] sm:inline"
              >Voice saved</span>

              <button
                v-if="voiceRecording.speechSupported"
                type="button"
                @click="handleVoiceToggle"
                :disabled="voiceRecording.isSaving.value || voiceRecording.isTranscribing.value"
                class="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition disabled:opacity-40"
                :class="voiceRecording.isRecording.value
                  ? 'border-red-200 bg-red-50 text-red-700 hover:bg-red-100'
                  : 'border-stone-200 text-stone-700 hover:border-[#7C5C3B] hover:text-[#7C5C3B]'"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 1a4 4 0 0 1 4 4v6a4 4 0 0 1-8 0V5a4 4 0 0 1 4-4zm0 2a2 2 0 0 0-2 2v6a2 2 0 0 0 4 0V5a2 2 0 0 0-2-2zm-1 14.93V20H9v2h6v-2h-2v-2.07A8 8 0 0 0 20 11h-2a6 6 0 0 1-12 0H4a8 8 0 0 0 7 7.93z"/>
                </svg>
                {{ voiceRecording.isRecording.value ? 'Stop' : existingRecording ? 'Re-record' : 'Speak' }}
              </button>
            </div>
          </div>
        </div>

        <!-- ══════════════════════════════════════════════════════════ -->
        <!-- VOICE PLAYER                                               -->
        <!-- ══════════════════════════════════════════════════════════ -->
        <div
          v-if="existingRecording && !voiceRecording.isRecording.value"
          class="mx-6 mt-5 rounded-xl bg-[#FAF7F4] p-4 sm:mx-10"
        >
          <div class="flex items-center gap-4">
            <button
              @click="toggleExistingPlayback"
              class="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#7C5C3B] text-white transition hover:opacity-90"
            >
              <svg v-if="!isPlayingExisting" xmlns="http://www.w3.org/2000/svg" class="ml-0.5 h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
            </button>

            <div class="min-w-0 flex-1">
              <div class="h-1 w-full overflow-hidden rounded-full bg-[#E8DDD0]">
                <div class="h-full rounded-full bg-[#7C5C3B] transition-all" :style="{ width: `${existingProgress}%` }" />
              </div>
              <div class="mt-2 flex items-center justify-between gap-3">
                <p class="text-[11px] text-stone-500">{{ existingRecording.duration_seconds }}s recording</p>
                <div class="flex items-center gap-2">
                  <span class="text-[11px] text-stone-500">QR in book</span>
                  <button
                    @click="toggleQR"
                    class="relative inline-flex h-4 w-7 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200"
                    :class="existingRecording.show_qr ? 'bg-[#7C5C3B]' : 'bg-stone-300'"
                  >
                    <span
                      class="mt-0.5 ml-0.5 inline-block h-3 w-3 transform rounded-full bg-white shadow transition duration-200"
                      :class="existingRecording.show_qr ? 'translate-x-3' : 'translate-x-0'"
                    />
                  </button>
                </div>
              </div>
            </div>

            <canvas ref="qrCanvas" class="hidden flex-shrink-0 rounded sm:block" width="48" height="48" />

            <button
              @click="deleteExistingRecording"
              class="flex-shrink-0 text-[11px] text-stone-400 transition hover:text-red-500"
            >Remove</button>
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

        <!-- ══════════════════════════════════════════════════════════ -->
        <!-- TOOLS — one quiet row                                      -->
        <!-- ══════════════════════════════════════════════════════════ -->
        <div class="px-6 pt-5 sm:px-10">
          <div class="flex flex-wrap items-center gap-2">

            <button
              v-if="!section?.answer?.trim() || section.answer.trim().length <= 20"
              type="button"
              @click="fetchWritingAssist('start')"
              :disabled="writingAssistLoading"
              class="tool-btn"
            >Help me start</button>

            <button
              v-else-if="!writingAssistLoading"
              type="button"
              @click="fetchWritingAssist('expand')"
              class="tool-btn"
            >Help me add more</button>

            <span v-if="writingAssistLoading" class="inline-flex items-center gap-2 text-xs text-stone-400">
              <span class="inline-block h-3 w-3 animate-spin rounded-full border-2 border-stone-200 border-t-[#7C5C3B]" />
              Thinking…
            </span>

            <button
              type="button"
              @click="$emit('toggle-highlight')"
              class="tool-btn"
              :class="isHighlighted ? 'border-[#7C5C3B] bg-[#FAF7F4] text-[#7C5C3B]' : ''"
            >
              {{ isHighlighted ? 'Highlighted' : 'Highlight this memory' }}
            </button>

            <!-- Photo — inline, not a whole section -->
            <label v-if="!currentImagePreview" class="tool-btn cursor-pointer">
              Add a photo
              <input type="file" accept="image/*" @change="$emit('image-upload', $event)" class="hidden" />
            </label>

            <button
              v-if="commentCount > 0"
              @click="showComments = !showComments"
              class="tool-btn border-[#7C5C3B]/30 text-[#7C5C3B]"
            >
              {{ commentCount }} family comment{{ commentCount === 1 ? '' : 's' }}
            </button>
          </div>

          <p v-if="writingAssistError" class="mt-3 text-xs text-red-500">{{ writingAssistError }}</p>

          <!-- Writing assist output -->
          <Transition name="fade">
            <div v-if="writingAssistSuggestions.length" class="mt-4 rounded-xl bg-[#FAF7F4] p-5">
              <div class="flex items-start justify-between gap-4">
                <div>
                  <p class="text-xs font-semibold text-stone-800">Things you might add</p>
                  <p class="mt-0.5 text-[11px] text-stone-500">Prompts only — keep writing in your own words</p>
                </div>
                <button
                  @click="writingAssistSuggestions = []"
                  class="flex-shrink-0 text-[11px] text-stone-400 hover:text-stone-600"
                >Dismiss</button>
              </div>
              <ul class="mt-4 space-y-2.5">
                <li
                  v-for="(suggestion, i) in writingAssistSuggestions"
                  :key="i"
                  class="flex gap-3 text-[13px] leading-relaxed text-stone-700"
                >
                  <span class="mt-[7px] h-1 w-1 flex-shrink-0 rounded-full bg-[#9C7C5C]" />
                  {{ suggestion }}
                </li>
              </ul>
            </div>
          </Transition>

          <!-- Family comments -->
          <Transition name="fade">
            <div v-if="showComments && commentCount > 0" class="mt-4 rounded-xl bg-[#FAF7F4] p-5">
              <p class="text-xs font-semibold text-stone-800">What family said about this answer</p>
              <div class="mt-4 space-y-4">
                <div v-for="comment in sectionComments" :key="comment.id" class="flex gap-3">
                  <div class="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#E8DDD0] text-[11px] font-semibold text-[#7C5C3B]">
                    {{ comment.author_name.charAt(0).toUpperCase() }}
                  </div>
                  <div>
                    <p class="text-xs font-semibold text-stone-800">{{ comment.author_name }}</p>
                    <p class="mt-0.5 text-[13px] leading-relaxed text-stone-600">{{ comment.comment }}</p>
                  </div>
                </div>
              </div>
            </div>
          </Transition>

          <!-- Photo preview -->
          <div v-if="currentImagePreview && currentImagePreview.length > 0" class="mt-4">
            <div class="relative overflow-hidden rounded-xl">
              <img
                :src="currentImagePreview"
                alt="Story photo"
                class="max-h-64 w-full object-cover"
                @error="$emit('image-error')"
              />
              <div
                v-if="!hasImageExportAccess"
                class="absolute right-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur"
              >Premium</div>
            </div>
            <div class="mt-2.5 flex flex-wrap items-center gap-2">
              <label class="tool-btn cursor-pointer">
                Replace
                <input type="file" accept="image/*" @change="$emit('image-upload', $event)" class="hidden" />
              </label>
              <button @click="$emit('remove-image')" class="tool-btn hover:border-red-200 hover:text-red-500">
                Remove
              </button>
              <p v-if="!hasImageExportAccess" class="text-[11px] text-stone-500">
                Saved —
                <button @click="$emit('upgrade-images')" class="font-semibold text-[#7C5C3B] underline">
                  upgrade to include it in your keepsake
                </button>
              </p>
            </div>
          </div>

          <p v-if="imageUploadStatus" class="mt-2 text-xs text-stone-500">{{ imageUploadStatus }}</p>
        </div>

        <!-- ══════════════════════════════════════════════════════════ -->
        <!-- COMPLETION                                                 -->
        <!-- ══════════════════════════════════════════════════════════ -->
        <div v-if="progress === 100" class="mx-6 mt-6 rounded-2xl bg-[#2C2420] p-6 text-center sm:mx-10">
          <p class="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C4A882]">Story complete</p>
          <p class="mt-3 font-display text-xl font-semibold text-white">
            You've created something worth keeping
          </p>
          <p class="mt-2 text-sm leading-relaxed text-stone-400">
            Every answer is saved. It's ready to become a finished keepsake.
          </p>
          <div class="mt-5 flex flex-col items-center gap-2.5">
            <button
              @click="$emit('finish')"
              class="rounded-full bg-[#7C5C3B] px-7 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >Create my keepsake</button>
            <button
              v-if="!hasImageExportAccess"
              @click="$emit('upgrade-images')"
              class="text-xs text-stone-400 transition hover:text-white"
            >Add photos and premium layouts</button>
          </div>
        </div>

        <!-- ══════════════════════════════════════════════════════════ -->
        <!-- NAVIGATION                                                 -->
        <!-- ══════════════════════════════════════════════════════════ -->
        <div class="sticky bottom-0 mt-6 border-t border-stone-100 bg-white/90 px-6 py-3.5 backdrop-blur-sm sm:px-10">
          <div class="flex items-center justify-between gap-3">
            <button
              @click="$emit('previous')"
              :disabled="currentIndex === 0"
              class="rounded-full px-4 py-2 text-sm font-medium text-stone-500 transition hover:bg-stone-50 hover:text-stone-800 disabled:pointer-events-none disabled:opacity-25"
            >
              ← Previous
            </button>

            <span class="font-display text-xs text-stone-400">
              {{ currentIndex + 1 }} <span class="text-stone-300">of</span> {{ totalSections }}
            </span>

            <button
              @click="handleNextClick"
              class="rounded-full bg-[#7C5C3B] px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
            >
              {{ currentIndex === totalSections - 1 ? 'Finish' : 'Next' }} →
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

const wordCount = computed(() => {
  const text = props.section?.answer?.trim()
  if (!text) return 0
  return text.split(/\s+/).filter(Boolean).length
})

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
.font-display {
  font-family: 'Playfair Display', Georgia, serif;
}

/* The writing surface — a page, not a form field */
.prose-answer {
  font-family: 'Lora', Georgia, serif;
  font-size: 17px;
  line-height: 1.9;
  letter-spacing: 0.005em;
}
.prose-answer::placeholder {
  color: #C4BEB8;
  font-style: italic;
}

/* Quiet secondary buttons */
.tool-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  border-radius: 9999px;
  border: 1px solid #E7E5E4;
  background: #fff;
  padding: 0.4rem 0.85rem;
  font-size: 12px;
  font-weight: 500;
  color: #57534E;
  transition: all 0.2s ease;
}
.tool-btn:hover {
  border-color: #7C5C3B;
  color: #7C5C3B;
}
.tool-btn:disabled {
  opacity: 0.4;
  pointer-events: none;
}

.fade-enter-active,
.fade-leave-active { transition: opacity 0.25s ease; }
.fade-enter-from,
.fade-leave-to { opacity: 0; }

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.fade-slide-enter-from { opacity: 0; transform: translateY(12px); }
.fade-slide-leave-to { opacity: 0; transform: translateY(-8px); }
</style>