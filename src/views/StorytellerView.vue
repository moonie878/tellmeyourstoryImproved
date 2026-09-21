<template>
  <div class="min-h-screen bg-[#F5F0E8] px-4 py-8 sm:py-12">
    <div class="mx-auto max-w-xl">

      <!-- Brand -->
      <p class="text-center text-xs font-medium uppercase tracking-[0.25em] text-[#86664A]">Tell Me Your Story</p>

      <!-- Loading -->
      <div v-if="loading" class="mt-20 text-center" role="status">
        <div class="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-stone-200 border-t-[#7C5C3B]" />
        <p class="mt-4 text-lg text-stone-600">Getting your questions…</p>
      </div>

      <!-- Link not found -->
      <div v-else-if="notFound" class="mt-16 rounded-3xl bg-white p-8 text-center shadow-sm">
        <h1 class="font-display text-2xl font-bold text-stone-900">This link isn't working</h1>
        <p class="mt-3 text-lg leading-relaxed text-stone-600">
          It may have been changed. Ask the person who sent it to send you a new one.
        </p>
      </div>

      <!-- Stopped emails confirmation -->
      <div v-else-if="stoppedEmails" class="mt-10 rounded-3xl bg-white p-8 text-center shadow-sm">
        <h1 class="font-display text-2xl font-bold text-stone-900">We won't email you again</h1>
        <p class="mt-3 text-lg leading-relaxed text-stone-600">
          You can still answer questions any time using this link.
        </p>
        <button type="button" class="mt-6 min-h-[52px] rounded-full bg-[#7C5C3B] px-8 text-lg font-semibold text-white" @click="stoppedEmails = false">
          Answer a question
        </button>
      </div>

      <!-- Free limit reached -->
      <div v-else-if="limitReached" class="mt-10 rounded-3xl bg-white p-8 text-center shadow-sm">
        <h1 class="font-display text-2xl font-bold text-stone-900">Thank you, {{ data.storytellerName }}</h1>
        <p class="mt-3 text-lg leading-relaxed text-stone-600">
          You've answered all the questions that are open for now. We'll let {{ data.fromName }} know — they can
          open up the rest whenever they're ready.
        </p>
      </div>

      <!-- All done -->
      <div v-else-if="!current" class="mt-10 rounded-3xl bg-white p-8 text-center shadow-sm">
        <h1 class="font-display text-2xl font-bold text-stone-900">You've answered every question</h1>
        <p class="mt-3 text-lg leading-relaxed text-stone-600">
          Thank you, {{ data.storytellerName }}. {{ data.fromName }} is going to treasure these.
        </p>
      </div>

      <!-- The question -->
      <template v-else>
        <div class="mt-6 text-center">
          <p class="text-lg text-stone-700">
            <template v-if="justSaved">Thank you — that's saved. Here's the next one.</template>
            <template v-else>Hello {{ data.storytellerName }}. A question from {{ data.fromName }}:</template>
          </p>
          <p class="mt-1 text-base text-stone-500">Question {{ currentNumber }} of {{ data.questions.length }}</p>
        </div>

        <div class="mt-5 rounded-3xl bg-white p-6 shadow-sm sm:p-8">
          <p class="text-sm font-medium uppercase tracking-[0.18em] text-[#86664A]">{{ current.chapter || 'Your story' }}</p>
          <h1 class="mt-3 font-display text-2xl font-bold leading-snug text-stone-900 sm:text-3xl">{{ current.question }}</h1>

          <!-- Big microphone -->
          <div v-if="voice.speechSupported" class="mt-8 flex flex-col items-center text-center">
            <button
              type="button"
              class="flex h-24 w-24 items-center justify-center rounded-full text-white shadow-lg transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#7C5C3B]/30 disabled:opacity-50"
              :class="voice.isRecording.value ? 'bg-red-600' : 'bg-[#7C5C3B]'"
              :disabled="busy"
              :aria-label="voice.isRecording.value ? 'Stop recording' : 'Start recording your answer'"
              @click="toggleRecording"
            >
              <span v-if="voice.isRecording.value" class="block h-7 w-7 rounded-sm bg-white" aria-hidden="true" />
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-11 w-11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0 0 14 0"/><line x1="12" y1="17" x2="12" y2="22"/>
              </svg>
            </button>
            <p class="mt-4 text-lg font-medium" :class="voice.isRecording.value ? 'text-red-600' : 'text-stone-800'" role="status">
              <template v-if="voice.isRecording.value">Recording {{ clock(voice.elapsedSeconds.value) }} — tap to stop</template>
              <template v-else-if="voice.isTranscribing.value">Typing up what you said…</template>
              <template v-else-if="recordedBlob">Recorded — have a read below</template>
              <template v-else>Tap the button and just talk</template>
            </p>
          </div>

          <!-- Microphone help -->
          <div v-if="voice.errorCode.value" class="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-base leading-relaxed text-stone-700" role="alert">
            <p class="font-semibold">{{ voice.error.value }}</p>
            <p v-if="voice.errorCode.value === 'denied'" class="mt-1">
              Allow the microphone in your phone's settings for this website, then tap the button again — or type your answer below.
            </p>
          </div>
          <p v-if="notice" class="mt-4 rounded-2xl bg-[#FAF7F4] p-4 text-base text-stone-700" role="status">{{ notice }}</p>

          <label for="storyteller-answer" class="mt-8 block text-base font-medium text-stone-700">
            {{ voice.speechSupported ? 'Or type it here' : 'Your answer' }}
          </label>
          <textarea
            id="storyteller-answer"
            v-model="answer"
            rows="7"
            :readonly="voice.isRecording.value"
            class="answer-box mt-2 w-full resize-y rounded-2xl border border-stone-200 bg-[#FAFAF8] p-4 text-stone-800 placeholder:text-stone-400 focus:border-[#7C5C3B] focus:outline-none focus:ring-2 focus:ring-[#7C5C3B]/30"
            placeholder="Start wherever feels natural…"
          />

          <p v-if="saveError" class="mt-3 text-base text-red-700" role="alert">{{ saveError }}</p>

          <div class="mt-6 flex flex-col gap-3 sm:flex-row-reverse sm:justify-between">
            <button
              type="button"
              class="min-h-[56px] rounded-full bg-[#7C5C3B] px-8 text-lg font-semibold text-white transition hover:opacity-90 disabled:opacity-40"
              :disabled="busy || !answer.trim() || voice.isRecording.value"
              @click="saveAndNext"
            >
              {{ saving ? 'Saving…' : 'Save and next question' }}
            </button>
            <button
              type="button"
              class="min-h-[56px] rounded-full border border-stone-300 bg-white px-6 text-base font-medium text-stone-700 transition hover:bg-stone-50 disabled:opacity-40"
              :disabled="busy || voice.isRecording.value"
              @click="skip"
            >
              Skip this one
            </button>
          </div>
        </div>

        <p class="mt-6 text-center text-base text-stone-600">
          Everything you save goes straight into {{ data.fromName }}'s book. Come back to this link any time.
        </p>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useVoiceRecording } from '../lib/useVoiceRecording_whisper'
import { track } from '../lib/analytics'

const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'https://tellmeyourstoryimproved.onrender.com'

interface Question { id: string; chapter: string | null; question: string; answer: string }
interface StorytellerData {
  storytellerName: string
  fromName: string
  storyTitle: string
  answeredCount: number
  limitReached: boolean
  questions: Question[]
}

const route = useRoute()
const token = route.params.token as string

const loading = ref(true)
const notFound = ref(false)
const stoppedEmails = ref(false)
const data = ref<StorytellerData>({ storytellerName: '', fromName: '', storyTitle: '', answeredCount: 0, limitReached: false, questions: [] })
const limitReached = ref(false)

const currentId = ref<string | null>(null)
const skipped = ref<Set<string>>(new Set())
const answer = ref('')
const saving = ref(false)
const saveError = ref('')
const notice = ref('')
const justSaved = ref(false)

const voice = useVoiceRecording()
const recordedBlob = ref<Blob | null>(null)
let recordedDuration = 0
let recordedTranscript = ''

const busy = computed(() => saving.value || voice.isTranscribing.value)
const current = computed(() => data.value.questions.find((q) => q.id === currentId.value) || null)
const currentNumber = computed(() => data.value.questions.findIndex((q) => q.id === currentId.value) + 1)

function clock(seconds: number) {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`
}

/** Next question with no answer, skipping ones they chose to skip this visit. */
function pickNext(afterId?: string | null) {
  const qs = data.value.questions
  const start = afterId ? qs.findIndex((q) => q.id === afterId) + 1 : 0
  const ordered = [...qs.slice(start), ...qs.slice(0, start)]
  const next = ordered.find((q) => !q.answer && !skipped.value.has(q.id)) || ordered.find((q) => !q.answer)
  currentId.value = next?.id || null
  answer.value = next?.answer || ''
  resetRecording()
}

function resetRecording() {
  recordedBlob.value = null
  recordedDuration = 0
  recordedTranscript = ''
  notice.value = ''
  saveError.value = ''
  voice.clearError()
}

async function load() {
  try {
    const r = await fetch(`${SERVER_URL}/storyteller/${encodeURIComponent(token)}`)
    if (r.status === 404) { notFound.value = true; return }
    if (!r.ok) throw new Error(String(r.status))
    data.value = await r.json()
    limitReached.value = data.value.limitReached

    // Opened from an email for a particular question?
    const q = typeof route.query.q === 'string' ? route.query.q : null
    if (q && data.value.questions.some((x) => x.id === q)) {
      currentId.value = q
      answer.value = data.value.questions.find((x) => x.id === q)?.answer || ''
    } else {
      pickNext()
    }
    track('storyteller_opened', { answered: data.value.answeredCount })
  } catch {
    notFound.value = true
  } finally {
    loading.value = false
  }
}

async function toggleRecording() {
  notice.value = ''
  if (voice.isRecording.value) {
    const result = await voice.stopRecording()
    if (!result) return
    recordedBlob.value = result.blob
    recordedDuration = result.durationSeconds
    recordedTranscript = result.transcript
    if (result.transcriptionFailed) {
      notice.value = "Your recording is kept, but we couldn't type it up this time. Type a few words below, or record again."
    } else {
      const before = answer.value.trim()
      answer.value = before ? `${before}\n\n${result.transcript}` : result.transcript
    }
  } else {
    await voice.startRecording(answer.value)
  }
}

async function saveAndNext() {
  if (!current.value || !answer.value.trim()) return
  saving.value = true
  saveError.value = ''
  const sectionId = current.value.id

  try {
    // 1. The recording, if they spoke
    if (recordedBlob.value) {
      const form = new FormData()
      const type = recordedBlob.value.type
      const ext = type.includes('webm') ? 'webm' : type.includes('ogg') ? 'ogg' : 'mp4'
      form.append('audio', recordedBlob.value, `recording.${ext}`)
      form.append('sectionId', sectionId)
      form.append('transcript', recordedTranscript || answer.value)
      form.append('durationSeconds', String(recordedDuration))
      const r = await fetch(`${SERVER_URL}/storyteller/${encodeURIComponent(token)}/recording`, { method: 'POST', body: form })
      if (r.status === 402) { limitReached.value = true; return }
      if (!r.ok) throw new Error('recording')
    }

    // 2. The written answer
    const r = await fetch(`${SERVER_URL}/storyteller/${encodeURIComponent(token)}/answer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sectionId, answer: answer.value }),
    })
    if (r.status === 402) { limitReached.value = true; return }
    if (!r.ok) throw new Error('answer')
    const result = await r.json()

    const q = data.value.questions.find((x) => x.id === sectionId)
    if (q) q.answer = answer.value.trim()
    track('storyteller_answered', { spoken: !!recordedBlob.value, answered: result.answeredCount })

    if (result.limitReached) { limitReached.value = true; return }
    justSaved.value = true
    pickNext(sectionId)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } catch {
    saveError.value = "Sorry — that didn't save. Please check your internet connection and tap Save again. Nothing you wrote has been lost."
  } finally {
    saving.value = false
  }
}

function skip() {
  if (!current.value) return
  skipped.value.add(current.value.id)
  justSaved.value = false
  pickNext(current.value.id)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(async () => {
  if (route.query.stop === '1') {
    try {
      await fetch(`${SERVER_URL}/storyteller/${encodeURIComponent(token)}/stop-emails`, { method: 'POST' })
      stoppedEmails.value = true
    } catch { /* still show the page */ }
  }
  await load()
})

onUnmounted(() => voice.cancelRecording())
</script>

<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
.answer-box { font-family: 'Lora', Georgia, serif; font-size: 20px; line-height: 1.8; }
</style>
