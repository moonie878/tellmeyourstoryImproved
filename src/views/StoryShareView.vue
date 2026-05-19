<template>
  <div class="min-h-screen bg-[#F5F0E8]">

    <!-- Loading -->
    <div v-if="loading" class="flex min-h-screen items-center justify-center">
      <p class="text-sm text-stone-500">Loading story…</p>
    </div>

    <!-- Not found -->
    <div v-else-if="!share" class="flex min-h-screen items-center justify-center px-5 text-center">
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
          {{ project?.title || 'A Family Story' }}
        </h1>
        <p class="mt-3 text-sm text-[#5C534E]">
          A keepsake being created with love
        </p>
      </div>

      <!-- Answered sections -->
      <div class="mt-10 space-y-6">
        <div
          v-for="section in answeredSections"
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
                {{ comment.author_name.charAt(0).toUpperCase() }}
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
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { supabase } from '../lib/supabase'

const route = useRoute()

const loading      = ref(true)
const share        = ref<any>(null)
const project      = ref<any>(null)
const sections     = ref<any[]>([])
const comments     = ref<any[]>([])
const commentingOn = ref<string | null>(null)
const commenterName = ref('')
const commentText  = ref('')
const submitting   = ref(false)

const answeredSections = computed(() => sections.value)

function getComments(sectionId: string) {
  return comments.value.filter(c => c.section_id === sectionId)
}

async function loadComments() {
  if (!share.value) return
  const { data } = await supabase
    .from('story_comments')
    .select('*')
    .eq('project_id', share.value.project_id)
    .order('created_at', { ascending: true })
  comments.value = data || []
}

async function submitComment(sectionId: string) {
  if (!commenterName.value.trim() || !commentText.value.trim()) return
  submitting.value = true

  try {
    const { error } = await supabase
      .from('story_comments')
      .insert({
        project_id:  share.value.project_id,
        section_id:  sectionId,
        token:       route.params.token as string,
        author_name: commenterName.value.trim(),
        comment:     commentText.value.trim(),
      })

    if (!error) {
      commentText.value  = ''
      commentingOn.value = null
      await loadComments()
    }
  } finally {
    submitting.value = false
  }
}

onMounted(async () => {
  const token = route.params.token as string

  // Load share record
  const { data: shareData } = await supabase
    .from('story_shares')
    .select('*')
    .eq('token', token)
    .maybeSingle()

  if (!shareData) {
    loading.value = false
    return
  }

  share.value = shareData

  // Load project
  const { data: projectData } = await supabase
    .from('story_projects')
    .select('title, story_type')
    .eq('id', shareData.project_id)
    .maybeSingle()

  project.value = projectData

  // Load sections with answers
  // Replace the sections query in onMounted with:
const { data: answerData } = await supabase
  .from('story_answers')
  .select('id, section_id, answer, is_highlighted, story_sections(id, chapter, question, order_index)')
  .eq('project_id', shareData.project_id)
  .not('answer', 'is', null)
  .neq('answer', '')
  .order('story_sections(order_index)', { ascending: true })

sections.value = (answerData || []).map((a: any) => ({
  id: a.section_id,
  answer_id: a.id,
  chapter: a.story_sections?.chapter,
  question: a.story_sections?.question,
  answer: a.answer,
}))

  await loadComments()
  loading.value = false
})
</script>

<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
</style>