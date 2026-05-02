<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
        v-if="open"
        class="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm sm:items-center"
        @click.self="$emit('close')"
      >
        <div class="w-full max-w-lg rounded-t-3xl bg-white p-6 shadow-xl sm:rounded-3xl sm:p-8">

          <!-- Header -->
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs font-medium uppercase tracking-[0.2em] text-stone-500">Premium Export</p>
              <h2 class="mt-1 text-xl font-bold text-stone-900">Create a Video</h2>
            </div>
            <button
              @click="$emit('close')"
              class="rounded-full p-2 text-stone-400 hover:bg-stone-100 hover:text-stone-600"
            >
              ✕
            </button>
          </div>

          <p class="mt-2 text-sm leading-6 text-stone-500">
            Turn this story into a beautiful video — perfect for sharing with family or keeping as a memory.
          </p>

          <div class="mt-6 space-y-5">

            <!-- Theme -->
            <div>
              <label class="block text-sm font-medium text-stone-700">Theme</label>
              <div class="mt-2 flex gap-3">
                <button
                  v-for="t in themes"
                  :key="t.value"
                  @click="selectedTheme = t.value"
                  class="flex-1 rounded-2xl border p-3 text-center text-xs transition"
                  :class="selectedTheme === t.value
                    ? 'border-stone-900 bg-stone-900 text-white'
                    : 'border-stone-200 bg-white text-stone-700 hover:border-stone-400'"
                >
                  <span class="text-lg">{{ t.swatch }}</span>
                  <p class="mt-1 font-medium">{{ t.label }}</p>
                </button>
              </div>
            </div>

            <!-- Slide duration -->
            <div>
              <label class="block text-sm font-medium text-stone-700">Time per slide</label>
              <div class="mt-2 flex gap-3">
                <button
                  v-for="d in durations"
                  :key="d.value"
                  @click="selectedDuration = d.value"
                  class="flex-1 rounded-2xl border p-3 text-center text-xs transition"
                  :class="selectedDuration === d.value
                    ? 'border-stone-900 bg-stone-900 text-white'
                    : 'border-stone-200 bg-white text-stone-700 hover:border-stone-400'"
                >
                  <p class="text-lg font-bold">{{ d.label }}</p>
                  <p class="mt-0.5 opacity-70">{{ d.hint }}</p>
                </button>
              </div>
            </div>

            <!-- Transition style -->
            <div>
              <label class="block text-sm font-medium text-stone-700">Slide transition</label>
              <p class="mt-0.5 text-xs text-stone-500">How slides move from one to the next.</p>
              <div class="mt-3 grid grid-cols-3 gap-2">
                <button
                  v-for="t in transitions"
                  :key="t.value"
                  @click="selectedTransition = t.value"
                  class="rounded-2xl border p-3 text-center transition"
                  :class="selectedTransition === t.value
                    ? 'border-stone-900 bg-stone-900 text-white'
                    : 'border-stone-200 bg-white text-stone-700 hover:border-stone-400'"
                >
                  <!-- Mini transition preview -->
                  <div class="mx-auto mb-2 flex h-8 w-14 overflow-hidden rounded-lg border border-current opacity-60">
                    <div
                      v-if="t.value === 'cut'"
                      class="flex w-full"
                    >
                      <div class="h-full w-1/2 bg-stone-300"></div>
                      <div class="h-full w-1/2 bg-stone-600"></div>
                    </div>
                    <div
                      v-else-if="t.value === 'fade'"
                      class="relative w-full"
                    >
                      <div class="absolute inset-0 bg-stone-300"></div>
                      <div class="absolute inset-0 bg-gradient-to-r from-transparent via-stone-500 to-stone-600"></div>
                    </div>
                    <div
                      v-else-if="t.value === 'slow-fade'"
                      class="relative w-full"
                    >
                      <div class="absolute inset-0 bg-stone-300"></div>
                      <div class="absolute inset-0 bg-gradient-to-r from-transparent via-stone-400 to-stone-600" style="opacity: 0.7"></div>
                    </div>
                  </div>
                  <p class="text-xs font-medium">{{ t.label }}</p>
                  <p class="mt-0.5 text-[10px] opacity-60">{{ t.hint }}</p>
                </button>
              </div>
            </div>

            <!-- Music -->
            <div>
              <label class="block text-sm font-medium text-stone-700">Music</label>
              <p class="mt-0.5 text-xs text-stone-500">Upload an MP3, or leave blank for no music.</p>

              <div class="mt-2">
                <label
                  class="flex cursor-pointer items-center gap-3 rounded-2xl border border-dashed border-stone-300 bg-stone-50 px-4 py-3 text-sm text-stone-600 transition hover:bg-stone-100"
                >
                  <span>🎵</span>
                  <span>{{ musicFile ? musicFile.name : 'Upload music (MP3)' }}</span>
                  <input
                    type="file"
                    accept="audio/mp3,audio/mpeg"
                    @change="onMusicUpload"
                    class="hidden"
                  />
                </label>

                <button
                  v-if="musicFile"
                  @click="musicFile = null"
                  class="mt-2 text-xs text-red-500 hover:underline"
                >
                  Remove music
                </button>
              </div>
            </div>

            <!-- Estimated duration -->
            <div class="rounded-2xl border border-stone-100 bg-stone-50 px-4 py-3">
              <p class="text-xs text-stone-500">
                Estimated video length:
                <span class="font-medium text-stone-700">{{ estimatedDuration }}</span>
                · Export time: <span class="font-medium text-stone-700">~{{ estimatedExportTime }}</span>
              </p>
            </div>

          </div>

          <!-- Progress state -->
          <div v-if="isGenerating" class="mt-6">
            <div class="flex items-center justify-between text-sm">
              <span class="text-stone-600">{{ progressLabel }}</span>
              <span class="font-medium text-stone-900">{{ progress }}%</span>
            </div>
            <div class="mt-2 h-2 w-full overflow-hidden rounded-full bg-stone-200">
              <div
                class="h-2 rounded-full bg-[#7C5C3B] transition-all duration-500"
                :style="{ width: `${progress}%` }"
              ></div>
            </div>
            <p class="mt-2 text-xs text-stone-400">
  This takes a few minutes — please keep this window open. It's worth the wait 💛
</p>
          </div>

          <!-- Error -->
          <p v-if="error" class="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {{ error }}
          </p>

          <!-- Actions -->
          <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              @click="$emit('close')"
              :disabled="isGenerating"
              class="rounded-full border border-stone-300 px-5 py-3 text-sm text-stone-700 transition hover:bg-stone-50 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              @click="handleExport"
              :disabled="isGenerating"
              class="rounded-full bg-[#7C5C3B] px-6 py-3 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-50"
            >
              <span v-if="isGenerating">Creating video...</span>
              <span v-else>Create video</span>
            </button>
          </div>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { VideoTheme, VideoSlideDuration, VideoTransition } from '../../composables/useStoryVideo'

const props = defineProps<{
  open: boolean
  isGenerating: boolean
  progress: number
  progressLabel: string
  error: string
  answeredCount: number
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'export', options: {
    theme: VideoTheme
    slideDuration: VideoSlideDuration
    transition: VideoTransition
    musicFile: File | null
  }): void
}>()

const selectedTheme = ref<VideoTheme>('warm')
const selectedDuration = ref<VideoSlideDuration>(5)
const selectedTransition = ref<VideoTransition>('fade')
const musicFile = ref<File | null>(null)

const themes = [
  { value: 'warm' as VideoTheme, label: 'Warm', swatch: '🟤' },
  { value: 'neutral' as VideoTheme, label: 'Neutral', swatch: '⚪' },
  { value: 'dark-ink' as VideoTheme, label: 'Dark Ink', swatch: '⚫' },
]

const durations = [
  { value: 3 as VideoSlideDuration, label: '3s', hint: 'Quick' },
  { value: 5 as VideoSlideDuration, label: '5s', hint: 'Balanced' },
  { value: 8 as VideoSlideDuration, label: '8s', hint: 'Relaxed' },
]

const transitions = [
  { value: 'cut' as VideoTransition, label: 'Cut', hint: 'Instant' },
  { value: 'fade' as VideoTransition, label: 'Fade', hint: '1 second' },
  { value: 'slow-fade' as VideoTransition, label: 'Slow fade', hint: '2 seconds' },
]

const estimatedDuration = computed(() => {
  // Rough estimate: answered questions + chapter slides + title + closing
  const totalSlides = props.answeredCount + 4
  const seconds = totalSlides * selectedDuration.value
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`
})

const estimatedExportTime = computed(() => {
  const totalSlides = props.answeredCount + 4
  // ~10 seconds per slide is more realistic accounting for
  // canvas drawing, PNG encoding, and ffmpeg processing
  const secs = totalSlides * 10
  return secs < 60 ? `~${secs}s` : `~${Math.ceil(secs / 60)}m`
})

function onMusicUpload(event: Event) {
  const target = event.target as HTMLInputElement
  musicFile.value = target.files?.[0] ?? null
}

function handleExport() {
  emit('export', {
    theme: selectedTheme.value,
    slideDuration: selectedDuration.value,
    transition: selectedTransition.value,
    musicFile: musicFile.value,
  })
}
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active .modal-content,
.modal-fade-leave-active .modal-content {
  transition: transform 0.2s ease;
}

.modal-fade-enter-from .modal-content {
  transform: translateY(20px);
}
</style>