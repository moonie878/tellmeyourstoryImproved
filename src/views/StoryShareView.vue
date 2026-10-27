<template>
  <div class="min-h-screen bg-[#F5F0E8]">

    <!-- Loading -->
    <div v-if="loading" class="flex min-h-screen items-center justify-center">
      <p class="text-sm text-stone-500">Loading story…</p>
    </div>

    <!-- Not found -->
    <div v-else-if="!loaded" class="flex min-h-screen items-center justify-center px-5 text-center">
      <div>
        <p class="text-4xl">📖</p>
        <h1 class="mt-4 text-xl font-bold text-stone-900">Story not found</h1>
        <p class="mt-2 text-sm text-stone-500">This link may have expired or been removed.</p>
      </div>
    </div>

    <!-- Story -->
    <div v-else class="mx-auto max-w-2xl px-5 py-12 sm:px-8">

      <!-- Header -->
      <div class="text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Tell Me Your Story</p>
        <h1 class="mt-4 font-display text-3xl font-bold text-[#1C1917] sm:text-4xl">
          {{ title || 'A Family Story' }}
        </h1>
        <p class="mt-3 text-sm text-[#5C534E]">
          A keepsake being created with love
        </p>
      </div>

      <!-- Answered sections -->
      <div class="mt-10 space-y-6">
        <div
          v-for="section in sections"
          :key="section.id"
          class="rounded-2xl border border-[#E8DDD0] bg-white p-6"
        >
          <p class="text-xs font-medium uppercase tracking-wider text-[#9C7C5C]">{{ section.chapter }}</p>
          <h2 class="mt-2 font-display text-lg font-semibold italic text-[#1C1917]">
            "{{ section.question }}"
          </h2>
          <p class="mt-4 text-sm leading-7 text-[#3C3530]">{{ section.answer }}</p>

          <!-- Comments for this section -->
          <div v-if="getComments(section.id).length" class="mt-4 border-t border-[#F0EBE3] pt-4 space-y-3">
            <div
              v-for="comment in getComments(section.id)"
              :key="comment.id"
              class="flex gap-3"
            >
              <div class="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#E8DDD0] text-xs font-semibold text-[#7C5C3B]">
                {{ (comment.author_name || '?').charAt(0).toUpperCase() }}
              </div>
              <div>
                <p class="text-xs font-medium text-[#1C1917]">{{ comment.author_name }}</p>
                <p class="mt-0.5 text-xs leading-5 text-[#5C534E]">{{ comment.comment }}</p>
              </div>
            </div>
          </div>

          <!-- Add comment -->
          <div class="mt-4 border-t border-[#F0EBE3] pt-4">
            <div v-if="commentingOn === section.id" class="space-y-2">
              <input
                v-model="commenterName"
                placeholder="Your name"
                class="w-full rounded-xl border border-[#E8DDD0] bg-[#FAF7F4] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#7C5C3B]"
              />
              <textarea
                v-model="commentText"
                placeholder="Leave a memory or reaction…"
                rows="3"
                class="w-full resize-none rounded-xl border border-[#E8DDD0] bg-[#FAF7F4] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#7C5C3B]"
              />
              <p v-if="commentError" class="text-xs text-red-600">{{ commentError }}</p>
              <div class="flex gap-2">
                <button
                  @click="submitComment(section.id)"
                  :disabled="submitting"
                  class="rounded-full bg-[#7C5C3B] px-4 py-2 text-xs font-medium text-white transition hover:opacity-90 disabled:opacity-50"
                >
                  {{ submitting ? 'Posting…' : 'Post comment' }}
                </button>
                <button
                  @click="commentingOn = null"
                  class="rounded-full border border-stone-200 px-4 py-2 text-xs font-medium text-stone-600 transition hover:bg-stone-50"
                >
                  Cancel
                </button>
              </div>
            </div>
            <button
              v-else
              @click="commentingOn = section.id"
              class="text-xs text-[#9C7C5C] hover:text-[#7C5C3B] transition"
            >
              + Leave a comment
            </button>
          </div>
        </div>
      </div>

      <!-- Footer CTA -->
      <div class="mt-12 rounded-3xl bg-[#1C1917] px-6 py-8 text-center">
        <p class="text-sm font-medium text-white">Want to create your own?</p>
        <p class="mt-2 text-xs text-[#A8A29E]">Tell Me Your Story helps families capture life stories with voice recordings and keepsake books.</p>
        <a
          href="https://tellmeyourstory.uk"
          class="mt-4 inline-block rounded-full bg-white px-5 py-2.5 text-xs font-semibold text-[#1C1917] transition hover:opacity-90"
        >
          Start a free story →
        </a>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const API_BASE = import.meta.env.VITE_API_BASE_URL as string

interface Section {
  id: string
  chapter: string
  question: string
  answer: string
}

interface Comment {
  id: string
  section_id: string
  author_name: string
  comment: string
  created_at: string
}

const loading       = ref(true)
const loaded        = ref(false)
const title         = ref('')
const sections      = ref<Section[]>([])
const comments      = ref<Comment[]>([])
const commentingOn  = ref<string | null>(null)
const commenterName = ref('')
const commentText   = ref('')
const commentError  = ref('')
const submitting    = ref(false)

function getComments(sectionId: string) {
  return comments.value.filter((c) => String(c.section_id) === String(sectionId))
}

/**
 * Everything now comes from the API, which validates the share token with the
 * service role. The browser's anon key needs no access to story_shares,
 * story_projects, story_answers, story_sections or story_comments.
 */
async function submitComment(sectionId: string) {
  if (!commenterName.value.trim() || !commentText.value.trim()) return
  submitting.value = true
  commentError.value = ''

  try {
    const token = route.params.token as string
    const response = await fetch(`${API_BASE}/share/${encodeURIComponent(token)}/comment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sectionId,
        authorName: commenterName.value.trim(),
        comment: commentText.value.trim(),
      }),
    })

    if (!response.ok) {
      commentError.value = "That couldn't be posted. Please try again."
      return
    }

    const data = await response.json()
    if (data.comment) comments.value = [...comments.value, data.comment]

    commentText.value = ''
    commentingOn.value = null
  } catch (err) {
    console.error('Comment error:', err)
    commentError.value = "That couldn't be posted. Please try again."
  } finally {
    submitting.value = false
  }
}

onMounted(async () => {
  const token = route.params.token as string

  try {
    const response = await fetch(`${API_BASE}/share/${encodeURIComponent(token)}`)

    if (!response.ok) {
      loaded.value = false
      return
    }

    const data = await response.json()

    title.value = data.title || ''
    sections.value = Array.isArray(data.sections) ? data.sections : []
    comments.value = Array.isArray(data.comments) ? data.comments : []
    loaded.value = true
  } catch (err) {
    console.error('Share page error:', err)
    loaded.value = false
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
</style>