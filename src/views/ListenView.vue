<template>
  <div class="min-h-screen bg-[#F5F0E8] flex items-center justify-center px-4 py-12">

    <!-- Loading -->
    <div v-if="loading" class="text-center">
      <div class="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-stone-200 border-t-[#7C5C3B]" />
      <p class="mt-4 text-sm text-stone-500">Loading memory…</p>
    </div>

    <!-- Not found -->
    <div v-else-if="!recording" class="text-center max-w-md">
      <p class="text-4xl">🎙️</p>
      <h1 class="mt-4 font-display text-2xl font-bold text-stone-900">Recording not found</h1>
      <p class="mt-3 text-sm text-stone-600">This recording may have been removed or the link may be incorrect.</p>
      <router-link to="/" class="mt-6 inline-block text-sm text-[#7C5C3B] hover:underline">← Tell Me Your Story</router-link>
    </div>

    <!-- Player -->
    <div v-else class="w-full max-w-md">

      <!-- Brand -->
      <div class="text-center mb-8">
        <p class="text-xs font-medium uppercase tracking-[0.25em] text-[#9C7C5C]">Tell Me Your Story</p>
        <p class="mt-1 text-sm text-stone-500">A memory worth keeping</p>
      </div>

      <!-- Card -->
      <div class="rounded-3xl bg-white shadow-xl overflow-hidden">

        <!-- Header -->
        <div class="bg-[#1C1917] px-6 py-8 text-center">
          <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#7C5C3B]">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 1a4 4 0 0 1 4 4v6a4 4 0 0 1-8 0V5a4 4 0 0 1 4-4zm0 2a2 2 0 0 0-2 2v6a2 2 0 0 0 4 0V5a2 2 0 0 0-2-2zm-1 14.93V20H9v2h6v-2h-2v-2.07A8 8 0 0 0 20 11h-2a6 6 0 0 1-12 0H4a8 8 0 0 0 7 7.93z"/>
            </svg>
          </div>
          <h1 class="mt-4 font-display text-xl font-bold text-white">{{ recording.transcript ? 'Hear this memory' : 'A recorded memory' }}</h1>
          <p class="mt-2 text-sm text-[#A8A29E]">Recorded by {{ storyTitle }}</p>
        </div>

        <!-- Question -->
        <div class="px-6 pt-6">
          <p class="text-xs font-medium uppercase tracking-[0.2em] text-stone-400">The question</p>
          <p class="mt-2 text-base font-semibold leading-7 text-stone-900 font-display italic">
            "{{ question }}"
          </p>
        </div>

        <!-- Audio player -->
        <div class="px-6 py-6">
          <div class="rounded-2xl bg-stone-50 p-4">

            <!-- Custom player -->
            <div class="flex items-center gap-4">
              <button
                @click="togglePlay"
                class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#7C5C3B] text-white transition hover:opacity-90"
              >
                <!-- Play icon -->
                <svg v-if="!isPlaying" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                <!-- Pause icon -->
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                </svg>
              </button>

              <div class="flex-1">
                <!-- Progress bar -->
                <div
                  class="h-2 w-full cursor-pointer rounded-full bg-stone-200 overflow-hidden"
                  @click="seekAudio"
                  ref="progressBarRef"
                >
                  <div
                    class="h-2 rounded-full bg-[#7C5C3B] transition-all"
                    :style="{ width: `${progressPercent}%` }"
                  />
                </div>

                <!-- Time -->
                <div class="mt-1.5 flex justify-between text-xs text-stone-400">
                  <span>{{ formatTime(currentTime) }}</span>
                  <span>{{ formatTime(duration) }}</span>
                </div>
              </div>
            </div>

            <!-- Hidden audio element -->
            <audio
              ref="audioRef"
              :src="recording.audio_url"
              @timeupdate="onTimeUpdate"
              @loadedmetadata="onLoadedMetadata"
              @ended="isPlaying = false"
              preload="metadata"
            />
          </div>

          <!-- Transcript -->
          <div v-if="recording.transcript" class="mt-4">
            <p class="text-xs font-medium uppercase tracking-[0.2em] text-stone-400">Their answer</p>
            <p class="mt-2 text-sm leading-7 text-stone-700 italic">
              "{{ recording.transcript }}"
            </p>
          </div>
        </div>

        <!-- Footer -->
        <div class="border-t border-stone-100 px-6 py-4 text-center">
          <p class="text-xs text-stone-400">
            Captured with
            <a href="https://tellmeyourstory.uk" class="text-[#7C5C3B] hover:underline">Tell Me Your Story</a>
            — preserving the stories that matter most
          </p>
        </div>
      </div>

      <!-- Duration badge -->
      <p class="mt-4 text-center text-xs text-stone-400">
        {{ recording.duration_seconds }}s recording · Scan QR code to share
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { supabase } from '../lib/supabase'

const route = useRoute()

const recording   = ref<any>(null)
const loading     = ref(true)
const storyTitle  = ref('')
const question    = ref('')
const isPlaying   = ref(false)
const currentTime = ref(0)
const duration    = ref(0)

const audioRef       = ref<HTMLAudioElement | null>(null)
const progressBarRef = ref<HTMLDivElement | null>(null)

const progressPercent = computed(() =>
  duration.value ? (currentTime.value / duration.value) * 100 : 0
)

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

function togglePlay() {
  if (!audioRef.value) return
  if (isPlaying.value) {
    audioRef.value.pause()
    isPlaying.value = false
  } else {
    audioRef.value.play()
    isPlaying.value = true
  }
}

function onTimeUpdate() {
  if (audioRef.value) currentTime.value = audioRef.value.currentTime
}

function onLoadedMetadata() {
  if (audioRef.value) duration.value = audioRef.value.duration
}

function seekAudio(event: MouseEvent) {
  if (!audioRef.value || !progressBarRef.value) return
  const rect    = progressBarRef.value.getBoundingClientRect()
  const percent = (event.clientX - rect.left) / rect.width
  audioRef.value.currentTime = percent * duration.value
}

onMounted(async () => {
  const id = route.params.id as string
  loading.value = true

  try {
    // Query 1 — get the recording
    const { data: rec, error } = await supabase
      .from('voice_recordings')
      .select('*')
      .eq('id', id)
      .single()

    console.log('Recording fetch:', rec, error)

    if (!rec) {
      loading.value = false
      return
    }

    recording.value = rec

    // Query 2 — get the story title separately
    if (rec.project_id) {
      const { data: project } = await supabase
        .from('story_projects')
        .select('title, story_type')
        .eq('id', rec.project_id)
        .single()

      if (project) storyTitle.value = project.title || 'Someone special'
    }

    // Query 3 — get the question
    if (rec.section_id) {
      const { data: section } = await supabase
        .from('story_sections')
        .select('question')
        .eq('id', rec.section_id)
        .single()

      if (section) question.value = section.question
    }

  } catch (err) {
    console.error('Listen page error:', err)
  } finally {
    loading.value = false
  }
})
</script>

<script lang="ts">
export default { name: 'ListenView' }
</script>

<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
</style>