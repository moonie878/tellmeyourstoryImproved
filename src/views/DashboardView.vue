<template>
<div class="mb-6 rounded-2xl border border-stone-200 bg-white p-5">
  <p class="text-sm font-medium text-stone-900">
    Your stories are more than answers
  </p>

  <p class="mt-2 text-sm text-stone-600">
    Each one can become a keepsake — something you can save, print, and share with the people who matter most.
  </p>
</div>
    <div class="min-h-screen bg-stone-50 px-6 py-12">
        <div class="mx-auto max-w-6xl space-y-8">
   <div class="rounded-3xl border border-stone-200 bg-white p-8 shadow-sm">
  <div class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
    <div>
      <p class="text-xs font-medium uppercase tracking-[0.25em] text-stone-500">
        Dashboard
      </p>
      <h1 class="mt-3 text-3xl font-bold text-stone-900">
        Welcome to Tell Me Your Story
      </h1>
      <p class="mt-3 max-w-2xl text-stone-600">
  Create meaningful story books, keep writing over time, and turn memories into finished keepsakes.
</p>
<div class="rounded-3xl border border-stone-200 bg-white p-8 shadow-sm">
  <div class="max-w-3xl">
    <p class="text-xs font-medium uppercase tracking-[0.25em] text-stone-500">
      Why it matters
    </p>
    <h2 class="mt-3 text-2xl font-bold text-stone-900">
      Small memories become meaningful when they’re kept
    </h2>
    <p class="mt-3 text-stone-600 leading-7">
      Every answer you add becomes part of something bigger — a story that can be saved, shared with family, or turned into a keepsake worth holding on to.
    </p>
  </div>
</div>
        <p
  v-if="isFirstTimeUser"
  class="mt-4 inline-block rounded-full bg-stone-100 px-3 py-1 text-sm text-stone-700"
>
  Your first story can be started in under a minute
</p>
    </div>

    <div class="flex flex-wrap gap-3">
      <button
        @click="createStory('mum')"
        class="cursor-pointer rounded-full bg-[#7C5C3B] hover:opacity-90 transition px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
      >
        Start Mum Keepsake
      </button>

      <button
        @click="createStory('dad')"
        class="cursor-pointer rounded-full border border-stone-300 bg-white px-5 py-2.5 text-sm font-medium text-stone-900 transition hover:bg-stone-100"
      >
        Start Dad Keepsake
      </button>
    </div>
  </div>
</div>

<div
  v-if="isFirstTimeUser"
  class="rounded-3xl border border-stone-200 bg-white p-8 shadow-sm"
>
  <div class="max-w-3xl">
    <p class="text-xs font-medium uppercase tracking-[0.25em] text-stone-500">
      Welcome
    </p>
    <h2 class="mt-3 text-2xl font-bold text-stone-900">
  Start your first keepsake in a few simple steps
</h2>
<p class="mt-3 text-stone-600">
  Choose a story, answer one memory at a time, and slowly turn it into a finished keepsake you can save, share, or gift.
</p>
  </div>

  <div class="mt-8 grid gap-4 md:grid-cols-3">
    <div class="rounded-2xl bg-stone-50 p-5">
      <p class="text-sm font-semibold text-stone-900">1. Choose a story</p>
<p class="mt-2 text-sm text-stone-600">
  Start with a Mum or Dad story and begin capturing meaningful memories straight away.
</p>
    </div>

    <div class="rounded-2xl bg-stone-50 p-5">
      <p class="text-sm font-semibold text-stone-900">2. Answer at your own pace</p>
<p class="mt-2 text-sm text-stone-600">
  Write one answer at a time with automatic saving, so nothing feels rushed.
</p>
    </div>

    <div class="rounded-2xl bg-stone-50 p-5">
      <p class="text-sm font-semibold text-stone-900">3. Turn it into a keepsake</p>
<p class="mt-2 text-sm text-stone-600">
  When you are ready, export the finished story as a beautifully preserved PDF or Word document.
</p>
    </div>
  </div>

  <div class="mt-8 flex flex-wrap gap-3">
    <button
      @click="createStory('mum')"
      class="cursor-pointer rounded-full bg-[#7C5C3B] hover:opacity-90 transition px-5 py-2.5 text-sm font-medium text-white transition hover:-translate-y-1 hover:shadow-md"
    >
      Start Mum Keepsake
    </button>

    <button
      @click="createStory('dad')"
      class="cursor-pointer rounded-full border border-stone-300 bg-white px-5 py-2.5 text-sm font-medium text-stone-900 transition hover:-translate-y-1 hover:shadow-md"
    >
      Start Dad Keepsake
    </button>
  </div>
  <p class="mt-4 text-sm text-stone-500">
  You can begin for free and upgrade later when you’re ready to create your finished keepsake.
</p>
    <p class="mt-3 text-sm leading-6 text-stone-500">
  Premium unlocks richer photo-led layouts and a more beautifully finished keepsake experience.
</p>
</div>

<div v-if="stories.length">
  <div class="mb-4 flex items-center justify-between">
    <div>
      <p class="text-xs font-medium uppercase tracking-[0.2em] text-stone-500">
        Your stories
      </p>
      <h2 class="mt-1 text-2xl font-semibold text-stone-900">
        Continue where you left off
      </h2>
    </div>
  </div>

  <!-- Stories list -->
  <div class="mt-8 space-y-4">
    <div
      v-for="story in stories"
      :key="story.id"
      class="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm transition hover:shadow-md"
    >
      <div class="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <!-- LEFT SIDE -->
        <div class="flex-1">
          <div class="flex flex-wrap items-center gap-3">
            <h3 class="text-xl font-semibold text-stone-900">{{ story.title }}</h3>

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
            {{ story.story_type }} • {{ new Date(story.created_at).toLocaleDateString() }}
          </p>

          <div class="mt-4">
            <div class="flex items-center justify-between text-sm text-stone-600">
              <span>Progress</span>
              <span class="font-medium text-stone-900">{{ story.progress }}%</span>
            </div>

            <div class="mt-2 h-2 w-full rounded-full bg-stone-200">
              <div
                class="h-2 rounded-full bg-stone-900"
                :style="{ width: `${story.progress}%` }"
              ></div>
            </div>
          </div>

          <p class="mt-4 text-sm text-stone-600">
            Story access:
            <span v-if="hasStoryAccess(story.story_type)" class="font-medium text-green-600">
              Unlocked
            </span>
            <span v-else class="font-medium text-amber-600">
              Free draft
            </span>
          </p>

          <p class="mt-1 text-sm text-stone-600">
            Export:
            <span v-if="canExportStory(story.story_type)" class="font-medium text-green-600">
              Unlocked
            </span>
            <span v-else class="font-medium text-amber-600">
              Locked
            </span>
          </p>

         <p class="mt-3 text-sm text-stone-500">
  {{
    hasStoryAccess(story.story_type)
      ? 'Keep building this story whenever you’re ready, then turn it into a finished keepsake.'
      : 'Keep writing for free, then upgrade when you’re ready to create the finished keepsake.'
  }}
</p>
        </div>

        <!-- RIGHT SIDE BUTTONS -->
        <div class="flex flex-wrap gap-3 shrink-0">
          <button
            @click="openStory(story.id)"
            class="cursor-pointer rounded-full bg-[#7C5C3B] hover:opacity-90 transition px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90 transition hover:-translate-y-1 hover:shadow-md""
          >
            {{ hasStoryAccess(story.story_type) ? 'Continue' : 'Edit Draft' }}
          </button>

          <button
            @click.stop="deleteStory(story.id)"
            class="cursor-pointer rounded-full border border-red-300 bg-white px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 transition hover:-translate-y-1 hover:shadow-md""
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="grid gap-6 md:grid-cols-3">
  <div class="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
    <h2 class="text-lg font-semibold text-stone-900">My Stories</h2>
    <p class="mt-2 text-sm text-stone-600">
      Start and continue story books for Mum, Dad, and future story types.
    </p>
  </div>

  <div class="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
    <h2 class="text-lg font-semibold text-stone-900">Progress</h2>
    <p class="mt-2 text-sm text-stone-600">
      Pick up where you left off and watch each story grow over time.
    </p>
  </div>

  <div class="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
    <h2 class="text-lg font-semibold text-stone-900">Downloads</h2>
    <p class="mt-2 text-sm leading-6 text-stone-600">
  Turn completed stories into polished keepsakes you can save, print, and share.
</p>
  </div>
</div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { supabase } from '../lib/supabase'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'


const stories = ref<any[]>([])
const userAccess = ref<any[]>([])
const isFirstTimeUser = ref(false)
    const deletingStoryId = ref<string | null>(null)

const router = useRouter()

async function handleLogout() {
  const { error } = await supabase.auth.signOut()

  if (!error) {
    await router.replace('/login')
  }
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
      title: type === 'mum' ? 'Mum Story' : 'Dad Story',
      story_type: type,
    },
  ])
  .select()
  .single()

if (!error && data) {
  router.push(`/story/${data.id}`)
}
track('upgrade_clicked', {
  source: 'dashboard_start_story',
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