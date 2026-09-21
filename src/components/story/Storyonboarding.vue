<template>
  <!-- Phase 1: Answer the first question -->
  <div v-if="phase === 'question'" class="mx-auto max-w-2xl px-4 py-10 sm:py-16">
    <div class="text-center">
      <p class="text-xs font-medium uppercase tracking-widest text-[#7C5C3B]">Let's begin</p>
      <h1 class="mt-3 text-2xl font-semibold text-stone-900 sm:text-3xl">
        Every story starts with one question
      </h1>
      <p class="mt-2 text-base text-stone-600">
        Tell us the answer — out loud or typed — and see it come to life as a book page.
      </p>
    </div>

    <div class="mt-8 rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
      <p class="text-xs font-medium uppercase tracking-[0.2em] text-[#86664A]">
        {{ firstSection?.chapter || 'Your story' }}
      </p>
      <h2 class="mt-2 font-serif text-xl font-semibold leading-snug text-stone-900 sm:text-2xl">
        {{ firstSection?.question }}
      </h2>

      <!-- Voice first: one big button -->
      <div v-if="voiceRecording.speechSupported" class="mt-6 flex flex-col items-center text-center">
        <button
          type="button"
          @click="handleVoiceToggle"
          :disabled="voiceRecording.isSaving.value || voiceRecording.isTranscribing.value"
          class="flex h-20 w-20 items-center justify-center rounded-full text-white shadow-lg transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#7C5C3B]/30 disabled:opacity-50"
          :class="voiceRecording.isRecording.value ? 'bg-red-600 hover:bg-red-700' : 'bg-[#7C5C3B] hover:opacity-90'"
          :aria-label="voiceRecording.isRecording.value ? 'Stop recording' : 'Start recording your answer'"
        >
          <!-- Stop square while recording, microphone otherwise -->
          <span v-if="voiceRecording.isRecording.value" class="block h-6 w-6 rounded-sm bg-white" aria-hidden="true" />
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-9 w-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0 0 14 0"/><line x1="12" y1="17" x2="12" y2="22"/>
          </svg>
        </button>

        <p class="mt-3 min-h-[24px] text-base font-medium" role="status"
           :class="voiceRecording.isRecording.value ? 'text-red-600' : 'text-stone-800'">
          <template v-if="voiceRecording.isRecording.value">
            Recording {{ formatClock(voiceRecording.elapsedSeconds.value) }} — tap to stop
          </template>
          <template v-else-if="voiceRecording.isTranscribing.value">Typing up what you said…</template>
          <template v-else-if="hasVoiceRecording">Recorded — read it through below</template>
          <template v-else>Tap and tell it in your own words</template>
        </p>
        <p v-if="!voiceRecording.isRecording.value && !hasVoiceRecording" class="mt-1 text-sm text-stone-500">
          We'll type it up for you, and keep the recording for the book.
        </p>
      </div>

      <!-- Microphone problems: how to fix, or type instead -->
      <div
        v-if="voiceRecording.errorCode.value"
        class="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-stone-700"
        role="alert"
      >
        <p class="font-semibold text-stone-900">{{ voiceRecording.error.value }}</p>
        <p v-if="voiceRecording.errorCode.value === 'denied'" class="mt-1">
          Allow the microphone in your browser settings, then tap the button again — or just type below.
        </p>
      </div>

      <p v-if="transcriptionNotice" class="mt-4 rounded-xl bg-[#FAF7F4] p-3 text-sm text-stone-600" role="status">
        {{ transcriptionNotice }}
      </p>

      <!-- Typing is always there as the alternative -->
      <label for="first-answer" class="mt-6 block text-sm font-medium text-stone-600">
        {{ voiceRecording.speechSupported ? 'Or type your answer' : 'Your answer' }}
      </label>
      <textarea
        id="first-answer"
        ref="textareaRef"
        :value="voiceRecording.isRecording.value ? voiceRecording.liveTranscript.value : answer"
        @input="onAnswerInput"
        rows="6"
        class="first-answer mt-2 w-full resize-none rounded-2xl border p-4 leading-relaxed text-stone-800 placeholder:text-stone-400 transition focus:outline-none focus:ring-2 focus:ring-[#7C5C3B]/30"
        :class="voiceRecording.isRecording.value
          ? 'border-red-200 bg-red-50/30'
          : 'border-stone-200 bg-[#FAFAF8] focus:border-[#7C5C3B]'"
        :placeholder="voiceRecording.isRecording.value ? 'Your words will appear here when you stop…' : 'Start wherever feels natural…'"
        :readonly="voiceRecording.isRecording.value"
      ></textarea>

      <!-- Photo upload -->
      <div class="mt-4">
        <div v-if="imagePreview" class="relative">
          <img :src="imagePreview" alt="Story image" class="max-h-44 w-full rounded-xl object-cover" />
          <button
            @click="removeImage"
            class="absolute right-2 top-2 rounded-full bg-black/50 p-1.5 text-white transition hover:bg-black/70"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
          <label class="mt-2 inline-block cursor-pointer text-xs text-stone-500 hover:underline">
            Replace photo
            <input type="file" accept="image/*" @change="onImageUpload" class="hidden" />
          </label>
        </div>
        <label v-else class="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-stone-200 bg-stone-50 px-4 py-3 transition hover:bg-stone-100">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 flex-shrink-0 text-stone-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
          </svg>
          <div>
            <p class="text-sm font-medium text-stone-700">Add a photo to this answer</p>
            <p class="text-xs text-stone-500">It'll appear in your book page preview</p>
          </div>
          <input type="file" accept="image/*" @change="onImageUpload" class="hidden" />
        </label>
      </div>

      <!-- Footer -->
      <div class="mt-5 flex items-center justify-between">
        <p class="text-sm text-stone-500">
          {{ answer.length > 0 ? `${answer.trim().split(/\s+/).filter(Boolean).length} words` : 'Take your time' }}
        </p>
        <button
          @click="submitFirstAnswer"
          :disabled="!answer.trim() || voiceRecording.isRecording.value || voiceRecording.isTranscribing.value"
          class="min-h-[48px] rounded-full bg-[#7C5C3B] px-6 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-40"
        >
          See it as a book page →
        </button>
      </div>
    </div>

    <p class="mt-6 text-center text-sm text-stone-500">
      You'll be able to answer {{ totalSections - 1 }} more questions to build your full story.
    </p>
  </div>

  <!-- Phase 2: "Aha moment" — answer shown as a book page -->
  <div v-else-if="phase === 'preview'" class="mx-auto max-w-2xl px-4 py-10 sm:py-16">
    <div class="text-center">
      <p class="text-xs font-medium uppercase tracking-widest text-[#7C5C3B]">Here's your first page</p>
      <h1 class="mt-3 text-2xl font-semibold text-stone-900 sm:text-3xl">
        This is what your book will look like
      </h1>
    </div>

    <!-- Book page mock -->
    <div class="mt-8 mx-auto max-w-md">
      <div
        class="relative overflow-hidden rounded-sm bg-white shadow-[0_4px_24px_rgba(0,0,0,0.12)]"
        style="aspect-ratio: 6/9;"
      >
        <div class="flex h-full flex-col justify-between p-8 sm:p-10">
          <!-- Chapter + question -->
          <div>
            <p class="text-[10px] font-medium uppercase tracking-widest text-[#7C5C3B]/60">
              {{ firstSection?.chapter || 'Chapter one' }}
            </p>
            <h3 class="mt-2 font-serif text-base font-medium italic text-stone-700 sm:text-lg">
              "{{ firstSection?.question }}"
            </h3>
          </div>

          <!-- Image in book page -->
          <div v-if="imagePreview" class="my-4 flex-shrink-0">
            <img :src="imagePreview" alt="Story photo" class="mx-auto max-h-28 rounded-sm object-cover shadow-sm" />
          </div>

          <!-- Answer text -->
          <div class="my-4 flex-1 overflow-hidden">
            <p class="font-serif text-sm leading-[1.9] text-stone-800 sm:text-[15px]">
              {{ answer }}
            </p>
          </div>

          <!-- Voice badge -->
          <div v-if="hasVoiceRecording" class="mb-2 flex items-center gap-2 rounded-lg bg-[#F5F0E8] p-2">
            <div class="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded bg-white">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-[#7C5C3B]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M3 11V3h8v8H3zm2-2h4V5H5v4zm8-6h8v8h-8V3zm2 2v4h4V5h-4zM3 21v-8h8v8H3zm2-2h4v-4H5v4z"/>
              </svg>
            </div>
            <div class="text-left">
              <p class="text-[10px] font-medium text-stone-700">Their voice, on the page</p>
              <p class="text-[9px] text-stone-500">Scan the QR code in the printed book to listen</p>
            </div>
          </div>

          <!-- Page number -->
          <p class="text-center text-[10px] text-stone-300">1</p>
        </div>

        <!-- Subtle page edge effect -->
        <div class="absolute right-0 top-0 h-full w-[3px] bg-gradient-to-l from-stone-200/60 to-transparent"></div>
      </div>

      <!-- Page shadow / "book spine" hint -->
      <div class="mx-4 h-2 rounded-b-lg bg-stone-100"></div>
    </div>

    <div class="mt-8 text-center">
      <p class="text-base text-stone-700">
        {{ totalSections - 1 }} more questions to go.
        <span class="text-stone-500">Every answer becomes another page.</span>
      </p>
      <button
        @click="continueToEditor"
        class="mt-5 min-h-[48px] rounded-full bg-[#7C5C3B] px-8 text-sm font-semibold text-white transition hover:opacity-90"
      >
        Keep building your story
      </button>
      <p class="mt-3 text-sm text-stone-500">5 free questions included · upgrade any time for the full set</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, onUnmounted } from 'vue'
import type { StorySection } from '../../types/story'
import { useVoiceRecording } from '../../lib/useVoiceRecording_whisper'

const props = defineProps<{
  firstSection: StorySection | null
  totalSections: number
  projectId: string
}>()

const emit = defineEmits<{
  (e: 'answer-submitted', payload: { sectionId: string; answer: string }): void
  (e: 'image-upload', event: Event): void
  (e: 'continue'): void
}>()

const phase = ref<'question' | 'preview'>('question')
const answer = ref('')
const textareaRef = ref<HTMLTextAreaElement | null>(null)
const imagePreview = ref('')
const imageFile = ref<File | null>(null)
const hasVoiceRecording = ref(false)
const transcriptionNotice = ref('')

const voiceRecording = useVoiceRecording()

onMounted(async () => {
  await nextTick()
  textareaRef.value?.focus()
})

onUnmounted(() => {
  voiceRecording.cancelRecording()
})

function onAnswerInput(event: Event) {
  const target = event.target as HTMLTextAreaElement
  answer.value = target.value
}

function formatClock(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

async function handleVoiceToggle() {
  transcriptionNotice.value = ''
  if (voiceRecording.isRecording.value) {
    const result = await voiceRecording.stopRecording()
    if (!result || !props.firstSection) return

    if (result.transcriptionFailed) {
      transcriptionNotice.value = "Your recording is saved, but we couldn't type it up this time. Type a few words below, or record again."
    } else {
      // Add to anything they'd already typed, rather than replacing it
      const before = answer.value.trim()
      answer.value = before ? `${before}\n\n${result.transcript}` : result.transcript
    }
    hasVoiceRecording.value = true

    // Save the recording
    await voiceRecording.saveRecording(
      result.blob,
      result.transcript,
      result.durationSeconds,
      props.firstSection.id,
      props.projectId
    )
  } else {
    await voiceRecording.startRecording(answer.value)
  }
}

function onImageUpload(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return

  imageFile.value = file
  const reader = new FileReader()
  reader.onload = (e) => {
    imagePreview.value = e.target?.result as string
  }
  reader.readAsDataURL(file)

  // Also emit so StoryEditorView can handle the actual Supabase upload
  if (props.firstSection) {
  emit('image-upload', event)
}
}

function removeImage() {
  imagePreview.value = ''
  imageFile.value = null
}

function submitFirstAnswer() {
  if (!answer.value.trim() || !props.firstSection) return

  emit('answer-submitted', {
    sectionId: props.firstSection.id,
    answer: answer.value.trim(),
  })

  phase.value = 'preview'
}

function continueToEditor() {
  emit('continue')
}
</script>

<style scoped>
/* The first answer is a page, not a form field — bigger, bookish text */
.first-answer {
  font-family: 'Lora', Georgia, serif;
  font-size: 18px;
  line-height: 1.8;
}
</style>
