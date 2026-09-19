<template>
  <div class="flex min-h-screen items-center justify-center bg-[#F5F0E8] px-4 py-12">

    <!-- Loading -->
    <div v-if="loading" class="text-center" role="status">
      <div class="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-stone-200 border-t-[#7C5C3B]" />
      <p class="mt-4 text-base text-stone-500">Loading memory…</p>
    </div>

    <!-- Not found -->
    <div v-else-if="!recording" class="max-w-md text-center">
      <p class="text-4xl" aria-hidden="true">🎙️</p>
      <h1 class="mt-4 font-display text-2xl font-bold text-stone-900">Recording not found</h1>
      <p class="mt-3 text-base text-stone-600">This recording may have been removed, or the link may be incorrect.</p>
      <router-link to="/" class="mt-6 inline-block text-base text-[#7C5C3B] hover:underline">← Tell Me Your Story</router-link>
    </div>

    <!-- Player -->
    <div v-else class="w-full max-w-md">

      <!-- Brand -->
      <div class="mb-8 text-center">
        <p class="text-xs font-medium uppercase tracking-[0.25em] text-[#9C7C5C]">Tell Me Your Story</p>
        <p class="mt-1 text-sm text-stone-500">A memory worth keeping</p>
      </div>

      <!-- Card -->
      <div class="overflow-hidden rounded-3xl bg-white shadow-xl">

        <!-- Header -->
        <div class="bg-[#1C1917] px-6 py-8 text-center">
          <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#7C5C3B]">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 1a4 4 0 0 1 4 4v6a4 4 0 0 1-8 0V5a4 4 0 0 1 4-4zm0 2a2 2 0 0 0-2 2v6a2 2 0 0 0 4 0V5a2 2 0 0 0-2-2zm-1 14.93V20H9v2h6v-2h-2v-2.07A8 8 0 0 0 20 11h-2a6 6 0 0 1-12 0H4a8 8 0 0 0 7 7.93z"/>
            </svg>
          </div>
          <h1 class="mt-4 font-display text-xl font-bold text-white">Hear this memory</h1>
          <p v-if="storyTitle" class="mt-2 text-sm text-[#A8A29E]">From {{ storyTitle }}</p>
          <p v-if="playlist.length > 1" class="mt-1 text-sm text-[#C4A882]">
            Story {{ positionInPlaylist + 1 }} of {{ playlist.length }}
          </p>
        </div>

        <!-- Question -->
        <div v-if="question" class="px-6 pt-6">
          <p class="text-xs font-medium uppercase tracking-[0.2em] text-stone-400">The question</p>
          <p class="mt-2 font-display text-lg font-semibold italic leading-8 text-stone-900">
            "{{ question }}"
          </p>
        </div>

        <!-- Audio player -->
        <div class="px-6 py-6">
          <div class="rounded-2xl bg-stone-50 p-4">
            <div class="flex items-center gap-4">
              <button
                type="button"
                class="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-[#7C5C3B] text-white transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1917] focus-visible:ring-offset-2"
                :aria-label="isPlaying ? 'Pause' : 'Play the recording'"
                @click="togglePlay"
              >
                <svg v-if="!isPlaying" xmlns="http://www.w3.org/2000/svg" class="ml-0.5 h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                </svg>
              </button>

              <div class="flex-1">
                <div
                  ref="progressBarRef"
                  class="h-3 w-full cursor-pointer overflow-hidden rounded-full bg-stone-200"
                  role="slider"
                  aria-label="Playback position"
                  :aria-valuenow="Math.round(currentTime)"
                  aria-valuemin="0"
                  :aria-valuemax="Math.round(duration)"
                  @click="seekAudio"
                >
                  <div class="h-3 rounded-full bg-[#7C5C3B] transition-all" :style="{ width: `${progressPercent}%` }" />
                </div>
                <div class="mt-1.5 flex justify-between text-sm text-stone-500">
                  <span>{{ formatTime(currentTime) }}</span>
                  <span>{{ formatTime(duration) }}</span>
                </div>
              </div>
            </div>

            <audio
              ref="audioRef"
              :src="recording.audio_url"
              preload="metadata"
              @timeupdate="onTimeUpdate"
              @loadedmetadata="onLoadedMetadata"
              @ended="onEnded"
              @error="audioError = true"
            />
          </div>

          <p v-if="audioError" class="mt-3 text-sm text-red-600" role="alert">
            This recording couldn't be played. Please try again in a moment.
          </p>

          <!-- Transcript -->
          <div v-if="recording.transcript" class="mt-5">
            <p class="text-xs font-medium uppercase tracking-[0.2em] text-stone-400">Their answer</p>
            <p class="mt-2 text-base italic leading-8 text-stone-700">"{{ recording.transcript }}"</p>
          </div>
        </div>

        <!-- Previous / next story -->
        <nav
          v-if="playlist.length > 1"
          class="flex items-center justify-between gap-3 border-t border-stone-100 px-6 py-4"
          aria-label="More stories"
        >
          <router-link
            v-if="previousId"
            :to="`/listen/${previousId}`"
            class="flex min-h-[48px] items-center rounded-full border border-stone-300 px-5 text-base font-medium text-stone-800 transition hover:bg-stone-50"
          >
            ← Previous
          </router-link>
          <span v-else />

          <router-link
            v-if="nextId"
            :to="`/listen/${nextId}`"
            class="flex min-h-[48px] items-center rounded-full bg-[#7C5C3B] px-5 text-base font-semibold text-white transition hover:opacity-90"
          >
            Next story →
          </router-link>
        </nav>

        <!-- Footer -->
        <div class="border-t border-stone-100 px-6 py-4 text-center">
          <p class="text-sm text-stone-500">
            Captured with
            <a href="https://tellmeyourstory.uk" class="text-[#7C5C3B] hover:underline">Tell Me Your Story</a>
            — preserving the stories that matter most
          </p>
        </div>
      </div>

      <p v-if="nextId" class="mt-4 text-center text-sm text-stone-500">
        When this story ends, we'll take you straight to the next one.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { supabase } from '../lib/supabase'

const route = useRoute()
const router = useRouter()

interface PlaylistItem {
  id: string
  order: number
}

const recording   = ref<any>(null)
const loading     = ref(true)
const storyTitle  = ref('')
const question    = ref('')
const isPlaying   = ref(false)
const currentTime = ref(0)
const duration    = ref(0)
const audioError  = ref(false)
const playlist    = ref<PlaylistItem[]>([])

/** True when the visitor arrived by pressing Next, so the next story can auto-play. */
const autoPlayNext = ref(false)

const audioRef       = ref<HTMLAudioElement | null>(null)
const progressBarRef = ref<HTMLDivElement | null>(null)

const progressPercent = computed(() => (duration.value ? (currentTime.value / duration.value) * 100 : 0))

const positionInPlaylist = computed(() => playlist.value.findIndex((p) => p.id === recording.value?.id))
const previousId = computed(() => (positionInPlaylist.value > 0 ? playlist.value[positionInPlaylist.value - 1].id : null))
const nextId = computed(() =>
  positionInPlaylist.value >= 0 && positionInPlaylist.value < playlist.value.length - 1
    ? playlist.value[positionInPlaylist.value + 1].id
    : null,
)

function formatTime(seconds: number) {
  if (isNaN(seconds) || !isFinite(seconds) || seconds < 0) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

async function togglePlay() {
  if (!audioRef.value) return
  if (isPlaying.value) {
    audioRef.value.pause()
    isPlaying.value = false
  } else {
    try {
      await audioRef.value.play()
      isPlaying.value = true
    } catch {
      isPlaying.value = false
    }
  }
}

function onTimeUpdate() {
  if (audioRef.value) currentTime.value = audioRef.value.currentTime
}

function onLoadedMetadata() {
  if (audioRef.value && isFinite(audioRef.value.duration)) duration.value = audioRef.value.duration
  if (autoPlayNext.value) {
    autoPlayNext.value = false
    togglePlay()
  }
}

function onEnded() {
  isPlaying.value = false
  if (nextId.value) {
    autoPlayNext.value = true
    router.push(`/listen/${nextId.value}`)
  }
}

function seekAudio(event: MouseEvent) {
  if (!audioRef.value || !progressBarRef.value || !duration.value) return
  const rect = progressBarRef.value.getBoundingClientRect()
  const percent = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width))
  audioRef.value.currentTime = percent * duration.value
}

/**
 * Every recording in the same story that is set to show a QR code,
 * in the order the questions appear in the book.
 */
async function loadPlaylist(projectId: string) {
  const { data: recs } = await supabase
    .from('voice_recordings')
    .select('id, section_id, show_qr, created_at')
    .eq('project_id', projectId)

  const visible = (recs || []).filter((r: any) => r.show_qr !== false)
  if (visible.length < 2) {
    playlist.value = visible.map((r: any) => ({ id: r.id, order: 0 }))
    return
  }

  const { data: sections } = await supabase
    .from('story_sections')
    .select('id, order_index')
    .in('id', visible.map((r: any) => r.section_id))

  const orderById = new Map((sections || []).map((s: any) => [s.id, s.order_index ?? 0]))
  playlist.value = visible
    .map((r: any) => ({ id: r.id, order: orderById.get(r.section_id) ?? Number.MAX_SAFE_INTEGER }))
    .sort((a, b) => a.order - b.order)
}

async function load(id: string) {
  loading.value = !recording.value // keep the card on screen when moving between stories
  isPlaying.value = false
  currentTime.value = 0
  duration.value = 0
  audioError.value = false

  try {
    const { data: rec } = await supabase.from('voice_recordings').select('*').eq('id', id).maybeSingle()
    if (!rec) {
      recording.value = null
      return
    }

    recording.value = rec
    if (rec.duration_seconds) duration.value = rec.duration_seconds

    const [projectResult, sectionResult] = await Promise.all([
      rec.project_id
        ? supabase.from('story_projects').select('title').eq('id', rec.project_id).maybeSingle()
        : Promise.resolve({ data: null }),
      rec.section_id
        ? supabase.from('story_sections').select('question').eq('id', rec.section_id).maybeSingle()
        : Promise.resolve({ data: null }),
    ])

    storyTitle.value = (projectResult.data as any)?.title || ''
    question.value = (sectionResult.data as any)?.question || ''

    // Only reload the playlist when moving into a different story
    if (rec.project_id && !playlist.value.some((p) => p.id === rec.id)) {
      await loadPlaylist(rec.project_id)
    }
  } catch (err) {
    console.error('Listen page error:', err)
  } finally {
    loading.value = false
  }
}

// Reacts to /listen/a → /listen/b too (the same page is reused).
watch(
  () => route.params.id as string,
  (id) => { if (id) load(id) },
  { immediate: true },
)
</script>

<script lang="ts">
export default { name: 'ListenView' }
</script>

<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
</style>