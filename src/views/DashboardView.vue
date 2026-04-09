<template>
  <div class="min-h-screen bg-stone-50 px-6 py-10 md:py-12">
    <div class="mx-auto max-w-6xl space-y-8">
      <!-- Hero -->
      <section class="overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-sm">
        <div class="grid gap-8 px-6 py-8 md:grid-cols-[1.2fr_0.8fr] md:px-8 md:py-10">
          <div>
            <p class="text-xs font-medium uppercase tracking-[0.25em] text-stone-500">
              Dashboard
            </p>

            <h1 class="mt-3 text-3xl font-bold text-stone-900 md:text-4xl">
              Welcome to Tell Me Your Story
            </h1>

            <p class="mt-4 max-w-2xl text-stone-600 leading-7">
              Create meaningful keepsakes, return to them whenever you like, and turn treasured
              memories into something beautifully finished.
            </p>

            <div class="mt-6 flex flex-wrap gap-3">
              <button
                @click="createStory('mum')"
                class="rounded-full bg-[#7C5C3B] px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
              >
                Start Mum Story
              </button>

              <button
                @click="createStory('dad')"
                class="rounded-full border border-stone-300 bg-white px-5 py-2.5 text-sm font-medium text-stone-900 transition hover:bg-stone-100"
              >
                Start Dad Story
              </button>
            </div>

            <p
              v-if="isFirstTimeUser"
              class="mt-5 inline-block rounded-full bg-stone-100 px-3 py-1 text-sm text-stone-700"
            >
              Your first keepsake can be started in under a minute
            </p>
          </div>

          <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-1">
            <div class="rounded-3xl bg-stone-50 p-5">
              <p class="text-sm font-semibold text-stone-900">Your library</p>
              <p class="mt-2 text-sm text-stone-600">
                Keep all your stories in one place and return whenever inspiration comes.
              </p>
            </div>

            <div class="rounded-3xl bg-stone-50 p-5">
              <p class="text-sm font-semibold text-stone-900">Finished keepsakes</p>
              <p class="mt-2 text-sm text-stone-600">
                Export polished PDFs and documents when you’re ready to preserve the story.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Story starters -->
      <section class="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm md:p-8">
        <div class="flex items-end justify-between gap-4">
          <div>
            <p class="text-xs font-medium uppercase tracking-[0.25em] text-stone-500">
              Start a new story
            </p>
            <h2 class="mt-2 text-2xl font-bold text-stone-900">
              Choose the keepsake you want to create
            </h2>
          </div>
        </div>

        <div class="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <button
            v-for="type in storyTypes"
            :key="type.key"
            @click="createStory(type.key)"
            class="group rounded-[1.75rem] border border-stone-200 bg-stone-50 p-5 text-left transition hover:-translate-y-1 hover:border-stone-300 hover:bg-white hover:shadow-md"
          >
            <p class="text-xs font-medium uppercase tracking-[0.2em] text-stone-500">
              {{ type.label }}
            </p>
            <h3 class="mt-3 text-lg font-semibold text-stone-900">
              {{ type.title }}
            </h3>
            <p class="mt-2 text-sm leading-6 text-stone-600">
              {{ type.description }}
            </p>
            <p class="mt-4 text-sm font-medium text-[#7C5C3B]">
              Start story →
            </p>
          </button>
        </div>
      </section>

      <!-- Empty state -->
      <section
        v-if="isFirstTimeUser"
        class="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm md:p-8"
      >
        <div class="max-w-3xl">
          <p class="text-xs font-medium uppercase tracking-[0.25em] text-stone-500">
            Welcome
          </p>
          <h2 class="mt-3 text-2xl font-bold text-stone-900">
            Start your first keepsake in a few simple steps
          </h2>
          <p class="mt-3 text-stone-600 leading-7">
            Choose a story, answer one memory at a time, and slowly turn it into something you can
            save, print, and share.
          </p>
        </div>

        <div class="mt-8 grid gap-4 md:grid-cols-3">
          <div class="rounded-2xl bg-stone-50 p-5">
            <p class="text-sm font-semibold text-stone-900">1. Choose a story</p>
            <p class="mt-2 text-sm text-stone-600">
              Start with a meaningful story type and begin capturing memories straight away.
            </p>
          </div>

          <div class="rounded-2xl bg-stone-50 p-5">
            <p class="text-sm font-semibold text-stone-900">2. Answer at your own pace</p>
            <p class="mt-2 text-sm text-stone-600">
              Write one answer at a time with autosave, so nothing feels rushed.
            </p>
          </div>

          <div class="rounded-2xl bg-stone-50 p-5">
            <p class="text-sm font-semibold text-stone-900">3. Turn it into a keepsake</p>
            <p class="mt-2 text-sm text-stone-600">
              Export the finished story as a beautifully preserved PDF or Word document.
            </p>
          </div>
        </div>
      </section>

      <!-- Stories -->
      <section v-if="stories.length" class="space-y-5">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs font-medium uppercase tracking-[0.25em] text-stone-500">
              Your stories
            </p>
            <h2 class="mt-2 text-2xl font-bold text-stone-900">
              Continue where you left off
            </h2>
          </div>
        </div>

        <div class="grid gap-5 lg:grid-cols-2">
          <article
            v-for="story in stories"
            :key="story.id"
            class="overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div class="grid gap-0 sm:grid-cols-[140px_1fr]">
              <!-- Thumbnail -->
              <div class="flex min-h-[160px] items-center justify-center bg-stone-100 p-4">
                <img
                  v-if="story.cover_image_url"
                  :src="story.cover_image_url"
                  alt="Story cover"
                  class="h-full max-h-[180px] w-auto rounded-xl object-cover shadow-sm"
                />
                <div
                  v-else
                  class="flex h-full w-full items-center justify-center rounded-2xl border border-dashed border-stone-300 bg-white px-4 text-center"
                >
                  <div>
                    <p class="text-xs font-medium uppercase tracking-[0.18em] text-stone-500">
                      {{ story.story_type }}
                    </p>
                    <p class="mt-2 text-sm text-stone-600">
                      Keepsake preview
                    </p>
                  </div>
                </div>
              </div>

              <!-- Content -->
              <div class="p-6">
                <div class="flex flex-wrap items-center gap-2">
                  <h3 class="text-xl font-semibold text-stone-900">
                    {{ story.title }}
                  </h3>

                  <span
                    v-if="hasAllStoriesAccess()"
                    class="rounded-full bg-stone-900 px-3 py-1 text-xs font-medium text-white"
                  >
                    All Stories
                  </span>

                  <span
                    v-else-if="hasStoryAccess(story.story_type)"
                    class="rounded-full bg-stone-200 px-3 py-1 text-xs font-medium text-stone-700"
                  >
                    Unlocked
                  </span>

                  <span
                    v-else
                    class="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700"
                  >
                    Free Draft
                  </span>
                </div>

                <p class="mt-2 text-sm text-stone-500">
                  {{ formatStoryType(story.story_type) }} • {{ formatDate(story.created_at) }}
                </p>

                <div class="mt-5">
                  <div class="flex items-center justify-between text-sm text-stone-600">
                    <span>Progress</span>
                    <span class="font-medium text-stone-900">{{ story.progress }}%</span>
                  </div>

                  <div class="mt-2 h-2 w-full rounded-full bg-stone-200">
                    <div
                      class="h-2 rounded-full bg-[#7C5C3B]"
                      :style="{ width: `${story.progress}%` }"
                    ></div>
                  </div>
                </div>

                <div class="mt-4 space-y-1 text-sm text-stone-600">
                  <p>
                    Story access:
                    <span
                      v-if="hasStoryAccess(story.story_type)"
                      class="font-medium text-green-600"
                    >
                      Unlocked
                    </span>
                    <span v-else class="font-medium text-amber-600">
                      Free draft
                    </span>
                  </p>

                  <p>
                    Export:
                    <span
                      v-if="canExportStory(story.story_type)"
                      class="font-medium text-green-600"
                    >
                      Unlocked
                    </span>
                    <span v-else class="font-medium text-amber-600">
                      Locked
                    </span>
                  </p>
                </div>

                <p class="mt-4 text-sm leading-6 text-stone-600">
                  {{
                    hasStoryAccess(story.story_type)
                      ? 'Keep building this story whenever you’re ready, then turn it into a finished keepsake.'
                      : 'Keep writing for free, then upgrade when you’re ready to create the finished keepsake.'
                  }}
                </p>

                <div class="mt-6 flex flex-wrap gap-3">
                  <button
                    @click="openStory(story.id)"
                    class="rounded-full bg-[#7C5C3B] px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
                  >
                    {{ hasStoryAccess(story.story_type) ? 'Continue' : 'Edit Draft' }}
                  </button>

                  <button
                    @click.stop="deleteStory(story.id)"
                    class="rounded-full border border-red-300 bg-white px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- Bottom info cards -->
      <section class="grid gap-6 md:grid-cols-3">
        <div class="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm">
          <h2 class="text-lg font-semibold text-stone-900">Your stories</h2>
          <p class="mt-2 text-sm leading-6 text-stone-600">
            Start and continue keepsakes for parents, grandparents, couples, and more.
          </p>
        </div>

        <div class="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm">
          <h2 class="text-lg font-semibold text-stone-900">Your progress</h2>
          <p class="mt-2 text-sm leading-6 text-stone-600">
            Return any time and keep building each story at your own pace.
          </p>
        </div>

        <div class="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm">
          <h2 class="text-lg font-semibold text-stone-900">Your keepsakes</h2>
          <p class="mt-2 text-sm leading-6 text-stone-600">
            Turn completed stories into polished keepsakes you can save, print, and share.
          </p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { supabase } from '../lib/supabase'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { track } from '../lib/analytics'

const stories = ref<any[]>([])
const userAccess = ref<any[]>([])
const isFirstTimeUser = ref(false)
const deletingStoryId = ref<string | null>(null)

const router = useRouter()

const storyTypes = [
  {
    key: 'mum',
    label: 'Most popular',
    title: "Mum's Story",
    description: 'Capture her memories, stories, and life lessons in a keepsake worth saving.',
  },
  {
    key: 'dad',
    label: 'Meaningful gift',
    title: "Dad's Story",
    description: 'Preserve his humour, memories, milestones, and the moments that shaped him.',
  },
  {
    key: 'grandma',
    label: 'Family history',
    title: "Grandma's Story",
    description: 'Keep treasured family memories, traditions, and stories from her life.',
  },
  {
    key: 'life',
    label: 'Full memoir',
    title: 'Life Story',
    description: 'Create a wider life-story keepsake that captures memories across the years.',
  },
]

function getStoryTitle(type: string) {
  const titles: Record<string, string> = {
    mum: 'Mum Story',
    dad: 'Dad Story',
    grandma: 'Grandma Story',
    grandad: 'Grandad Story',
    life: 'Life Story',
    couple: 'Couple Story',
  }

  return titles[type] || 'New Story'
}

function formatStoryType(type: string) {
  const labels: Record<string, string> = {
    mum: "Mum's Story",
    dad: "Dad's Story",
    grandma: "Grandma's Story",
    grandad: "Grandad's Story",
    life: 'Life Story',
    couple: 'Couple Story',
  }

  return labels[type] || type
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString()
}

async function createStory(type: string) {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return

  const { data, error } = await supabase
    .from('story_projects')
    .insert([
      {
        user_id: user.id,
        title: getStoryTitle(type),
        story_type: type,
      },
    ])
    .select()
    .single()

  if (!error && data) {
    track('story_started', {
      source: 'dashboard',
      story_type: type,
    })

    router.push(`/story/${data.id}`)
  }
}

async function fetchStories() {
  const { data, error } = await supabase
    .from('story_projects')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Fetch stories error:', error.message)
    return
  }

  if (data) {
    const storiesWithProgress = await Promise.all(
      data.map(async (story) => {
        const progress = await getProgress(story)
        return {
          ...story,
          progress,
        }
      })
    )

    stories.value = storiesWithProgress
    isFirstTimeUser.value = storiesWithProgress.length === 0
  }
}

onMounted(async () => {
  await loadUserAccess()
  await fetchStories()
})

function openStory(id: string) {
  router.push(`/story/${id}`)
}

async function deleteStory(id: string) {
  if (deletingStoryId.value) return

  const confirmed = window.confirm('Are you sure you want to delete this story?')
  if (!confirmed) return

  deletingStoryId.value = id

  const { error } = await supabase
    .from('story_projects')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Delete error:', error.message)
    alert(error.message)
    deletingStoryId.value = null
    return
  }

  deletingStoryId.value = null
  await fetchStories()
}

async function getProgress(story: any) {
  const { data: answers, error: answersError } = await supabase
    .from('story_answers')
    .select('*')
    .eq('project_id', story.id)

  if (answersError) {
    console.error('Answers error:', answersError.message)
    return 0
  }

  const { data: sections, error: sectionsError } = await supabase
    .from('story_sections')
    .select('*')
    .eq('story_type', story.story_type)

  if (sectionsError) {
    console.error('Sections error:', sectionsError.message)
    return 0
  }

  const totalSections = sections?.length || 0
  const completedAnswers =
    answers?.filter((answer) => answer.answer && answer.answer.trim() !== '').length || 0

  if (totalSections === 0) return 0

  return Math.round((completedAnswers / totalSections) * 100)
}

async function loadUserAccess() {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    userAccess.value = []
    return
  }

  const { data, error } = await supabase
    .from('user_access')
    .select('*')
    .eq('user_id', user.id)

  if (error) {
    console.error('User access error:', error.message)
    userAccess.value = []
    return
  }

  userAccess.value = data || []
}

function hasStoryAccess(storyType: string) {
  return userAccess.value.some(
    (item) =>
      item.access_type === 'story' &&
      (item.story_type === storyType || item.story_type === 'all')
  )
}

function hasExportAccess() {
  return userAccess.value.some(
    (item) =>
      item.access_type === 'export' &&
      (item.variant === 'text_only' || item.variant === 'with_images')
  )
}

function canExportStory(storyType: string) {
  return hasStoryAccess(storyType) && hasExportAccess()
}

function hasAllStoriesAccess() {
  return userAccess.value.some(
    (item) =>
      item.access_type === 'story' &&
      item.story_type === 'all'
  )
}
</script>