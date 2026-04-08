<template>
  <div class="min-h-screen bg-stone-50 px-6 py-10 md:py-12">
    <div class="mx-auto max-w-6xl space-y-8">
      <!-- Hero -->
      <section
        class="overflow-hidden rounded-[2rem] border border-stone-200/80 bg-gradient-to-br from-[#f8f2eb] via-white to-stone-50 shadow-sm"
      >
        <div class="grid gap-8 px-8 py-10 md:grid-cols-[1.4fr_0.8fr] md:px-10 md:py-12">
          <div>
            <p class="text-xs font-medium uppercase tracking-[0.25em] text-stone-500">
              Dashboard
            </p>

             <h1 class="mt-4 max-w-3xl text-3xl font-bold leading-tight text-stone-900 md:text-5xl">
              Preserve the stories you never want to lose
            </h1>

            <p class="mt-4 max-w-2xl text-base leading-7 text-stone-600 md:text-lg">
              Turn memories into beautifully written keepsakes for family, love, and legacy — one answer at a time.
            </p>

            <div class="mt-6 flex flex-wrap gap-3">
              <button
                @click="createStory('mum')"
                class="cursor-pointer rounded-full bg-[#7C5C3B] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:-translate-y-0.5 hover:opacity-90"
              >
                Start a keepsake
              </button>

              <router-link
                to="/"
                class="rounded-full border border-stone-300 bg-white px-5 py-2.5 text-sm font-medium text-stone-900 transition hover:bg-stone-100"
              >
                Back to home
              </router-link>
            </div>

            <p
              v-if="isFirstTimeUser"
              class="mt-5 inline-flex rounded-full bg-white/80 px-4 py-2 text-sm text-stone-700 shadow-sm"
            >
              Your first story can be started in under a minute
            </p>
          </div>

          <div class="grid gap-4 self-start">
            <div class="rounded-3xl border border-white/70 bg-white/80 p-5 shadow-sm">
              <p class="text-xs font-medium uppercase tracking-[0.2em] text-stone-500">
                Available keepsakes
              </p>
              <p class="mt-3 text-2xl font-semibold text-stone-900">
                {{ STORY_TYPES.length }}
              </p>
              <p class="mt-2 text-sm leading-6 text-stone-600">
                Stories for parents, grandparents, couples, and full life memories.
              </p>
            </div>

            <div class="rounded-3xl border border-white/70 bg-white/80 p-5 shadow-sm">
              <p class="text-xs font-medium uppercase tracking-[0.2em] text-stone-500">
                Your progress
              </p>
              <p class="mt-3 text-2xl font-semibold text-stone-900">
                {{ stories.length }}
              </p>
              <p class="mt-2 text-sm leading-6 text-stone-600">
                Keep building your stories over time and return whenever inspiration strikes.
              </p>
            </div>
          </div>
        </div>
      </section>
<div class="rounded-2xl border border-stone-200 bg-white px-6 py-4 text-sm text-stone-700 shadow-sm">
  Most people turn their stories into a finished keepsake once they’ve written a few memories.
</div>
      <!-- Why it matters -->
      <section class="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm">
        <div class="max-w-3xl">
          <p class="text-xs font-medium uppercase tracking-[0.25em] text-stone-500">
            Why it matters
          </p>

          <h2 class="mt-3 text-2xl font-bold text-stone-900">
            Small memories become meaningful when they’re kept
          </h2>

          <p class="mt-3 leading-7 text-stone-600">
            Every answer you add becomes part of something bigger — a story that can be saved,
            shared with family, or turned into a keepsake worth holding on to for years to come.
          </p>
        </div>
      </section>

      <!-- First time steps -->
      <section
        v-if="isFirstTimeUser"
        class="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm"
      >
        <div class="max-w-3xl">
          <p class="text-xs font-medium uppercase tracking-[0.25em] text-stone-500">
            Welcome
          </p>

          <h2 class="mt-3 text-2xl font-bold text-stone-900">
            Start your first keepsake in a few simple steps
          </h2>

          <p class="mt-3 text-stone-600 leading-7">
            Choose a story, answer one memory at a time, and slowly turn it into a finished
            keepsake you can save, share, or gift.
          </p>
        </div>

        <div class="mt-8 grid gap-4 md:grid-cols-3">
          <div class="rounded-3xl bg-stone-50 p-5">
            <p class="text-sm font-semibold text-stone-900">1. Choose a story</p>
            <p class="mt-2 text-sm leading-6 text-stone-600">
              Start with a story for Mum, Dad, Grandparents, a Couple, or a full Life Story.
            </p>
          </div>

          <div class="rounded-3xl bg-stone-50 p-5">
            <p class="text-sm font-semibold text-stone-900">2. Answer at your own pace</p>
            <p class="mt-2 text-sm leading-6 text-stone-600">
              Write one answer at a time with automatic saving, so nothing feels rushed.
            </p>
          </div>

          <div class="rounded-3xl bg-stone-50 p-5">
            <p class="text-sm font-semibold text-stone-900">3. Turn it into a keepsake</p>
            <p class="mt-2 text-sm leading-6 text-stone-600">
              When you are ready, export the finished story as a beautifully preserved keepsake.
            </p>
          </div>
        </div>

        <p class="mt-6 text-sm text-stone-500">
          You can begin for free and upgrade later when you’re ready to create your finished
          keepsake.
        </p>
      </section>

      <!-- Story picker -->
      <section class="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm">
        <div class="mb-6">
          <p class="text-xs font-medium uppercase tracking-[0.2em] text-stone-500">
            Start a new keepsake
          </p>

          <h2 class="mt-1 text-2xl font-semibold text-stone-900">
            Choose the story you want to begin
          </h2>

          <p class="mt-2 max-w-3xl text-stone-600 leading-7">
            Pick the story that fits best now — you can always come back and start another later.
          </p>
        </div>

        <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <div
            v-for="storyType in STORY_TYPES"
            :key="storyType.id"
            class="rounded-[1.75rem] border border-stone-200/80 bg-gradient-to-br from-white to-stone-50 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <p class="text-xs font-medium uppercase tracking-[0.2em] text-stone-500">
              Keepsake
            </p>

            <h3 class="mt-3 text-xl font-semibold text-stone-900">
              {{ storyType.title }}
            </h3>

            <p class="mt-3 min-h-[72px] text-sm leading-6 text-stone-600">
              {{ storyType.description }}
            </p>
              <p v-if="storyType.label" class="text-xs font-medium text-[#7C5C3B]">
              {{ storyType.label }}
            </p>

            <button
              @click="createStory(storyType.id)"
              class="mt-5 cursor-pointer rounded-full bg-[#7C5C3B] px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
            >
              Start {{ storyType.shortLabel }}
            </button>
          </div>
        </div>
      </section>

      <!-- Existing stories -->
      <section
        v-if="stories.length"
        class="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm"
      >
        <div class="mb-6">
          <p class="text-xs font-medium uppercase tracking-[0.2em] text-stone-500">
            Your stories
          </p>

          <h2 class="mt-1 text-2xl font-semibold text-stone-900">
            Continue where you left off
          </h2>
        </div>

        <div class="space-y-4">
          <div
            v-for="story in stories"
            :key="story.id"
            class="rounded-[1.75rem] border border-stone-200 bg-gradient-to-br from-white to-stone-50 p-6 shadow-sm transition hover:shadow-md"
          >
            <div class="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div class="flex-1">
                <div class="flex flex-wrap items-center gap-3">
                  <h3 class="text-xl font-semibold text-stone-900">
                    {{ story.displayTitle }}
                  </h3>

                  <span
                    v-if="hasAllStoriesAccess()"
                    class="rounded-full bg-stone-900 px-3 py-1 text-xs font-medium text-white"
                  >
                    All Stories Plan
                  </span>

                  <span
                    v-else-if="hasStoryAccess(story.story_type)"
                    class="rounded-full bg-stone-200 px-3 py-1 text-xs font-medium text-stone-700"
                  >
                    This Story Unlocked
                  </span>

                  <span
                    v-else
                    class="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700"
                  >
                    Free Draft
                  </span>
                </div>

                <p class="mt-2 text-sm text-stone-500">
                  {{ getStoryTypeLabel(story.story_type) }} •
                  {{ new Date(story.created_at).toLocaleDateString() }}
                </p>

                <div class="mt-5">
                  <div class="flex items-center justify-between text-sm text-stone-600">
                    <span>Progress</span>
                    <span class="font-medium text-stone-900">{{ story.progress }}%</span>
                  </div>

                  <div class="mt-2 h-2.5 w-full rounded-full bg-stone-200">
                    <div
                      class="h-2.5 rounded-full bg-[#7C5C3B]"
                      :style="{ width: `${story.progress}%` }"
                    ></div>
                  </div>
                </div>

                <div class="mt-4 flex flex-col gap-1 text-sm text-stone-600">
                  <p>
                    Story access:
                    <span v-if="hasStoryAccess(story.story_type)" class="font-medium text-green-600">
  Ready to turn into a keepsake
</span>

<span v-else class="font-medium text-amber-600">
  Keep writing — upgrade when you're ready
</span>
                  </p>

                  <p>
                    Export:
                    <span v-if="canExportStory(story.story_type)" class="font-medium text-green-600">
  Export available
</span>

<span v-else class="font-medium text-amber-600">
  Unlock when you're ready
</span>
                  </p>
                </div>

                <p class="mt-4 text-sm leading-6 text-stone-500">
                  {{
                    hasStoryAccess(story.story_type)
                      ? 'Keep building this story whenever you’re ready, then turn it into a finished keepsake.'
                      : 'Keep writing for free, then upgrade when you’re ready to create the finished keepsake.'
                  }}
                </p>
              </div>

              <div class="flex shrink-0 flex-wrap gap-3">
                <button
                  @click="openStory(story.id)"
                  class="cursor-pointer rounded-full bg-[#7C5C3B] px-4 py-2.5 text-sm font-medium text-white transition hover:-translate-y-1 hover:opacity-90 hover:shadow-md"
                >
                  {{ hasStoryAccess(story.story_type) ? 'Continue writing' : 'Continue writing' }}
                </button>

                <button
                  @click.stop="deleteStory(story.id)"
                  :disabled="deletingStoryId === story.id"
                  class="cursor-pointer rounded-full border border-red-300 bg-white px-4 py-2.5 text-sm font-medium text-red-600 transition hover:-translate-y-1 hover:bg-red-50 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {{ deletingStoryId === story.id ? 'Deleting...' : 'Delete' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Bottom cards -->
      <section class="grid gap-6 md:grid-cols-3">
        <div class="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm">
          <h2 class="text-lg font-semibold text-stone-900">My Stories</h2>
          <p class="mt-2 text-sm leading-6 text-stone-600">
            Start and continue story books for Mum, Dad, Grandparents, Couples, and Life Stories.
          </p>
        </div>

        <div class="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm">
          <h2 class="text-lg font-semibold text-stone-900">Progress</h2>
          <p class="mt-2 text-sm leading-6 text-stone-600">
            Pick up where you left off and watch each story grow over time.
          </p>
        </div>

        <div class="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm">
          <h2 class="text-lg font-semibold text-stone-900">Keepsakes</h2>
          <p class="mt-2 text-sm leading-6 text-stone-600">
            Turn completed stories into polished keepsakes you can save, print, and share.
          </p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../lib/supabase'
import { track } from '../lib/analytics'
import { STORY_TYPES, getStoryMeta } from '../data/storyTypes'

const stories = ref<any[]>([])
const userAccess = ref<any[]>([])
const isFirstTimeUser = ref(false)
const deletingStoryId = ref<string | null>(null)

const router = useRouter()

function getStoryTypeLabel(storyType: string) {
  return getStoryMeta(storyType)?.title || storyType
}

async function createStory(type: string) {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return

  const storyMeta = getStoryMeta(type)

  const { data, error } = await supabase
    .from('story_projects')
    .insert([
      {
        user_id: user.id,
        title: storyMeta?.projectTitle || 'Story',
        story_type: type,
      },
    ])
    .select()
    .single()

  if (error) {
    console.error('Create story error:', error.message)
    return
  }

  if (data) {
    router.push(`/story/${data.id}`)
  }
  track('story_started', {
  source: 'dashboard',
  story_type: type,
})
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
        const meta = getStoryMeta(story.story_type)

        return {
          ...story,
          progress,
          displayTitle: meta?.title || story.title || 'Story',
          description: meta?.description || '',
        }
      })
    )

    stories.value = storiesWithProgress
    isFirstTimeUser.value = storiesWithProgress.length === 0
  }
}

function openStory(id: string) {
  router.push(`/story/${id}`)
}

async function deleteStory(id: string) {
  if (deletingStoryId.value) return

  const confirmed = window.confirm('Are you sure you want to delete this story?')
  if (!confirmed) return

  deletingStoryId.value = id

  const { error } = await supabase.from('story_projects').delete().eq('id', id)

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
    (item) => item.access_type === 'story' && item.story_type === 'all'
  )
}

onMounted(async () => {
  await loadUserAccess()
  await fetchStories()
})
</script>