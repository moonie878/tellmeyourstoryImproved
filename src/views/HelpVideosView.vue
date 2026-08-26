<template>
  <main class="min-h-screen bg-[#F5F0E8] text-[#1C1917]">

    <!-- Hero -->
    <section class="px-5 pb-12 pt-20 sm:px-8 sm:pt-28">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-[11px] font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">
          How-to guides
        </p>
        <h1 class="mt-4 font-display text-3xl font-bold leading-tight tracking-[-0.02em] sm:text-4xl">
          Get the most from your story
        </h1>
        <p class="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-[#5C534E]">
          Short video guides to help you capture, record, export, and share your life story. Each one takes less than two minutes.
        </p>
      </div>
    </section>

    <!-- Quick jump -->
    <section class="px-5 sm:px-8">
      <div class="mx-auto max-w-3xl">
        <div class="flex flex-wrap justify-center gap-2">
          <button
            v-for="video in videos"
            :key="video.id"
            @click="scrollTo(video.id)"
            class="rounded-full border border-[#E8DDD0] bg-white px-4 py-2 text-xs font-medium text-[#5C534E] transition hover:border-[#7C5C3B] hover:text-[#7C5C3B]"
          >
            {{ video.label }}
          </button>
        </div>
      </div>
    </section>

    <!-- Videos -->
    <section class="px-5 py-12 sm:px-8">
      <div class="mx-auto max-w-3xl space-y-10">

        <div
          v-for="(video, index) in videos"
          :key="video.id"
          :id="video.id"
          class="scroll-mt-24 rounded-3xl border border-stone-200 bg-white shadow-sm overflow-hidden"
        >
          <!-- Video embed -->
          <div class="relative w-full bg-black" style="padding-bottom: 56.25%;">
            <iframe
              v-if="video.youtubeId"
              :src="`https://www.youtube.com/embed/${video.youtubeId}?rel=0`"
              class="absolute inset-0 h-full w-full"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              loading="lazy"
              :title="video.title"
            ></iframe>
            <div
              v-else
              class="absolute inset-0 flex items-center justify-center bg-[#2C2420]"
            >
              <div class="text-center">
                <p class="text-3xl">🎬</p>
                <p class="mt-2 text-sm text-stone-400">Video coming soon</p>
              </div>
            </div>
          </div>

          <!-- Info -->
          <div class="p-5 sm:p-6">
            <div class="flex items-start justify-between gap-4">
              <div>
                <p class="text-[10px] font-medium uppercase tracking-widest text-[#9C7C5C]">
                  {{ video.category }}
                </p>
                <h2 class="mt-1 text-lg font-semibold text-stone-900">
                  {{ video.title }}
                </h2>
                <p class="mt-2 text-sm leading-relaxed text-[#5C534E]">
                  {{ video.description }}
                </p>
              </div>
              <span class="flex-shrink-0 rounded-full bg-[#F5F0E8] px-3 py-1 text-xs font-medium text-[#9C7C5C]">
                {{ video.duration }}
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- CTA -->
    <section class="px-5 pb-16 sm:px-8">
      <div class="mx-auto max-w-3xl">
        <div class="rounded-3xl bg-[#2C2420] px-6 py-10 text-center sm:px-10">
          <h2 class="font-display text-xl font-semibold text-white sm:text-2xl">
            Ready to start your story?
          </h2>
          <p class="mt-3 text-sm text-stone-400">
            Try 5 questions free. No credit card needed.
          </p>
          <router-link
            to="/register"
            class="mt-5 inline-block rounded-full bg-[#7C5C3B] px-8 py-3.5 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Start your story free
          </router-link>
        </div>
      </div>
    </section>

  </main>
</template>

<script setup lang="ts">

interface HelpVideo {
  id: string
  label: string
  category: string
  title: string
  description: string
  duration: string
  youtubeId: string
}

const videos: HelpVideo[] = [
  {
    id: 'getting-started',
    label: 'Getting started',
    category: 'Getting started',
    title: 'How to create your first story',
    description: 'Sign up, choose a story type, and answer your first question. See how your words start becoming a keepsake book in under a minute.',
    duration: '~2 min',
    youtubeId: '1JF2QckjWdc',
  },
  {
    id: 'voice-recording',
    label: 'Voice recording',
    category: 'Features',
    title: 'How to record your voice',
    description: 'Tap the microphone and speak your answer naturally. Your voice is recorded and transcribed into text automatically — no typing needed.',
    duration: '~1 min',
    youtubeId: '',
  },
  {
    id: 'qr-codes',
    label: 'QR & export',
    category: 'Features',
    title: 'QR codes and exporting your PDF',
    description: 'Every voice recording gets a QR code printed in your book. Family can scan it with their phone and hear you tell the story in your own words. See how to export your finished PDF.',
    duration: '~2 min',
    youtubeId: '',
  },
  {
    id: 'writing-text',
    label: 'Writing',
    category: 'Features',
    title: 'Typing your answers and using the writing assistant',
    description: 'Type your answers at your own pace. If you get stuck, the AI writing assistant offers gentle prompts to help you think — it won\'t write it for you.',
    duration: '~1 min',
    youtubeId: '',
  },
  {
    id: 'adding-photos',
    label: 'Photos',
    category: 'Features',
    title: 'Adding photos to your answers',
    description: 'Upload photos alongside any answer to bring your memories to life. They appear in your exported book and PDF alongside the text.',
    duration: '~1 min',
    youtubeId: '',
  },
  {
    id: 'tribute-video',
    label: 'Tribute video',
    category: 'Features',
    title: 'Creating a tribute video',
    description: 'Turn your story into a video with photos, text, and music. Perfect for celebrations, memorials, or sharing with family who live far away.',
    duration: '~2 min',
    youtubeId: '',
  },
  {
    id: 'sharing',
    label: 'Sharing',
    category: 'Sharing & gifting',
    title: 'Sharing your story with family',
    description: 'Invite family members to read your story, listen to your voice recordings, and add their own comments and memories.',
    duration: '~1 min',
    youtubeId: '',
  },
  {
    id: 'gifting',
    label: 'Gifting',
    category: 'Sharing & gifting',
    title: 'Buying Tell Me Your Story as a gift',
    description: 'Give someone the gift of capturing their story. Buy access for them, add a personal message, and they receive a link to get started.',
    duration: '~1 min',
    youtubeId: '',
  },
]

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>