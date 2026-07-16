<template>
  <!-- Phase 1: Answer the first question -->
  <div v-if="phase === 'question'" class="mx-auto max-w-2xl px-4 py-10 sm:py-16">
    <div class="text-center">
      <p class="text-xs font-medium uppercase tracking-widest text-[#7C5C3B]">Let's begin</p>
      <h1 class="mt-3 text-2xl font-semibold text-stone-900 sm:text-3xl">
        Every story starts with one question
      </h1>
      <p class="mt-2 text-sm text-stone-500">
        Answer this first question and see your words come to life as a book page.
      </p>
    </div>

    <div class="mt-8 rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
      <p class="text-xs font-medium text-stone-400">
        {{ firstSection?.chapter || 'Your story' }}
      </p>
      <h2 class="mt-2 text-lg font-semibold text-stone-900 sm:text-xl">
        {{ firstSection?.question }}
      </h2>

      <!-- Toolbar -->
      <div class="mt-5 mb-3 flex flex-wrap items-center justify-between gap-2">
        <p class="text-xs text-stone-400">
          <span v-if="voiceRecording.isRecording.value" class="flex items-center gap-1.5 text-red-600 font-medium">
            <span class="inline-block h-2 w-2 animate-pulse rounded-full bg-red-500" />
            Recording…
          </span>
          <span v-else-if="voiceRecording.isTranscribing.value" class="text-stone-400">✦ Transcribing…</span>
          <span v-else>Type your answer or speak it</span>
        </p>
        <button
          type="button"
          @click="handleVoiceToggle"
          :disabled="voiceRecording.isSaving.value || voiceRecording.isTranscribing.value"
          class="flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-xs font-medium transition disabled:opacity-50 sm:px-3"
          :class="voiceRecording.isRecording.value
            ? 'border-red-300 bg-red-50 text-red-700 hover:bg-red-100'
            : 'border-stone-300 bg-white text-stone-700 hover:bg-stone-50'"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 1a4 4 0 0 1 4 4v6a4 4 0 0 1-8 0V5a4 4 0 0 1 4-4zm0 2a2 2 0 0 0-2 2v6a2 2 0 0 0 4 0V5a2 2 0 0 0-2-2zm-1 14.93V20H9v2h6v-2h-2v-2.07A8 8 0 0 0 20 11h-2a6 6 0 0 1-12 0H4a8 8 0 0 0 7 7.93z"/>
          </svg>
          {{ voiceRecording.isRecording.value ? 'Stop' : '🎙️ Speak' }}
        </button>
      </div>

      <textarea
        ref="textareaRef"
        :value="voiceRecording.isRecording.value ? voiceRecording.liveTranscript.value : answer"
        @input="onAnswerInput"
        rows="6"
        class="w-full resize-none rounded-2xl border p-4 text-sm leading-relaxed text-stone-800 placeholder:text-stone-300 focus:outline-none focus:ring-1 focus:ring-[#7C5C3B]/30 transition"
        :class="voiceRecording.isRecording.value
          ? 'border-red-200 bg-red-50/30'
          : 'border-stone-200 bg-[#FAFAF8] focus:border-[#7C5C3B]'"
        :placeholder="voiceRecording.isRecording.value ? 'Speak your answer — transcript appears when you stop' : 'Start typing or just speak from the heart…'"
        :readonly="voiceRecording.isRecording.value"
      ></textarea>

      <!-- Voice tip -->
      <p v-if="!voiceRecording.isRecording.value && !answer" class="mt-2 text-xs text-stone-400">
        💡 Tap <strong>Speak</strong> — talk naturally and we'll transcribe it for you
      </p>
      <p v-if="voiceRecording.error.value" class="mt-2 text-xs text-red-500">{{ voiceRecording.error.value }}</p>

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
            <p class="text-xs font-medium text-stone-600">Add a photo to this answer</p>
            <p class="text-[10px] text-stone-400">It'll appear in your book page preview</p>
          </div>
          <input type="file" accept="image/*" @change="onImageUpload" class="hidden" />
        </label>
      </div>

      <!-- Footer -->
      <div class="mt-5 flex items-center justify-between">
        <p class="text-xs text-stone-400">
          {{ answer.length > 0 ? `${answer.trim().split(/\s+/).filter(Boolean).length} words` : 'Take your time' }}
        </p>
        <button
          @click="submitFirstAnswer"
          :disabled="!answer.trim() || voiceRecording.isRecording.value || voiceRecording.isTranscribing.value"
          class="rounded-full bg-[#7C5C3B] px-6 py-2.5 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-40"
        >
          See it as a book page
        </button>
      </div>
    </div>

    <p class="mt-6 text-center text-xs text-stone-400">
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
          <div v-if="hasVoiceRecording" class="mb-2 flex items-center justify-center gap-1.5">
            <span class="inline-block h-1.5 w-1.5 rounded-full bg-green-500"></span>
            <p class="text-[9px] font-medium text-green-700">Voice recording included · QR code in printed book</p>
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
      <p class="text-sm text-stone-600">
        {{ totalSections - 1 }} more questions to go.
        <span class="text-stone-400">Every answer becomes another page.</span>
      </p>
      <button
        @click="continueToEditor"
        class="mt-5 rounded-full bg-[#7C5C3B] px-8 py-3 text-sm font-medium text-white transition hover:opacity-90"
      >
        Keep building your story
      </button>
      <p class="mt-3 text-xs text-stone-400">5 free questions included · upgrade any time for the full set</p>
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

async function handleVoiceToggle() {
  if (voiceRecording.isRecording.value) {
    const result = await voiceRecording.stopRecording()
    if (!result || !props.firstSection) return
    answer.value = result.transcript
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