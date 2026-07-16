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

      <textarea
        ref="textareaRef"
        v-model="answer"
        rows="6"
        class="mt-5 w-full resize-none rounded-2xl border border-stone-200 bg-[#FAFAF8] p-4 text-sm leading-relaxed text-stone-800 placeholder:text-stone-300 focus:border-[#7C5C3B] focus:outline-none focus:ring-1 focus:ring-[#7C5C3B]/30"
        placeholder="Start typing or just speak from the heart…"
      ></textarea>

      <!-- Voice recording slot — can wire to useVoiceRecording later -->
      <div class="mt-3 flex items-center justify-between">
        <p class="text-xs text-stone-400">
          {{ answer.length > 0 ? `${answer.trim().split(/\s+/).filter(Boolean).length} words` : 'Take your time' }}
        </p>
        <button
          @click="submitFirstAnswer"
          :disabled="!answer.trim()"
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
        <!-- Page inner content -->
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

          <!-- Answer text -->
          <div class="my-6 flex-1">
            <p class="font-serif text-sm leading-[1.9] text-stone-800 sm:text-[15px]">
              {{ answer }}
            </p>
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
import { ref, onMounted, nextTick } from 'vue'

interface StorySection {
  id: string
  chapter?: string
  question: string
  answer: string
  is_highlighted?: boolean
}

const props = defineProps<{
  firstSection: StorySection | null
  totalSections: number
}>()

const emit = defineEmits<{
  (e: 'answer-submitted', payload: { sectionId: string; answer: string }): void
  (e: 'continue'): void
}>()

const phase = ref<'question' | 'preview'>('question')
const answer = ref('')
const textareaRef = ref<HTMLTextAreaElement | null>(null)

onMounted(async () => {
  await nextTick()
  textareaRef.value?.focus()
})

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