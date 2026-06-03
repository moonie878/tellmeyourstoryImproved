<template>
  <main class="bg-white">

    <!-- Hero -->
    <section class="bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Life Story Video</p>
        <h1 class="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          Turn a life story into<br>
          <em class="text-[#C4A882] italic">a beautiful video keepsake</em>
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#A8A29E]">
          Export your loved one's life story as a professionally designed video — with their answers, photos, and music — ready to share with the whole family or play at a celebration of life.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <router-link
            to="/register"
            class="rounded-full bg-[#C4A882] px-7 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90"
          >
            Start a life story free →
          </router-link>
          <router-link
            to="/example"
            class="rounded-full border border-white/20 px-7 py-3 text-sm font-medium text-white transition hover:bg-white/10"
          >
            See an example
          </router-link>
        </div>
      </div>
    </section>

    <!-- What is a life story video -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">What is a life story video?</p>
        <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">A film of their life — in their own words</h2>
        <p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-500">
          Once someone has answered their life story questions, Tell Me Your Story can export the whole thing as a beautiful video — their answers displayed on screen, with photos and background music. Something you can watch together, share on a phone, or play at a family gathering.
        </p>
      </div>
    </section>

    <!-- What's in the video -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">What's in the video</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Beautifully designed, ready to share</h2>
        </div>
        <div class="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          <div v-for="feature in features" :key="feature.title" class="rounded-2xl bg-white p-6">
            <p class="text-2xl">{{ feature.icon }}</p>
            <p class="mt-3 text-sm font-semibold text-stone-900">{{ feature.title }}</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">{{ feature.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- When to use it -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">When to use it</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">More ways to share a life story</h2>
        </div>
        <div class="mt-10 space-y-4">
          <div v-for="use in uses" :key="use.title" class="flex items-start gap-4 rounded-2xl border border-stone-200 p-5">
            <span class="text-2xl flex-shrink-0">{{ use.icon }}</span>
            <div>
              <p class="text-sm font-semibold text-stone-900">{{ use.title }}</p>
              <p class="mt-1 text-xs leading-5 text-stone-500">{{ use.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Book + Video -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Two formats, one story</p>
        <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">A printed book and a video — from the same story</h2>
        <p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-500">
          Unlike other platforms that only offer one format, Tell Me Your Story lets you export the same story as a beautifully designed PDF book, a printed hardcover, and a video — all from one set of answers.
        </p>
        <div class="mt-8 grid gap-5 sm:grid-cols-3">
          <div class="rounded-2xl border border-stone-200 bg-white p-5 text-center">
            <p class="text-2xl">📄</p>
            <p class="mt-3 text-sm font-semibold text-stone-900">PDF export</p>
            <p class="mt-1 text-xs text-stone-500">Download a beautifully designed PDF keepsake</p>
          </div>
          <div class="rounded-2xl border border-[#7C5C3B] bg-[#FAF7F4] p-5 text-center">
            <p class="text-2xl">📚</p>
            <p class="mt-3 text-sm font-semibold text-stone-900">Printed book</p>
            <p class="mt-1 text-xs text-stone-500">Order a hardcover delivered to your door</p>
          </div>
          <div class="rounded-2xl border border-stone-200 bg-white p-5 text-center">
            <p class="text-2xl">🎬</p>
            <p class="mt-3 text-sm font-semibold text-stone-900">Story video</p>
            <p class="mt-1 text-xs text-stone-500">Export as a video to watch and share</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Pricing</p>
        <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Start free, export when you're ready</h2>
        <div class="mt-8 grid gap-5 sm:grid-cols-2">
          <div class="rounded-2xl border border-stone-200 bg-stone-50 p-6 text-left">
            <p class="text-xs font-semibold uppercase tracking-wider text-stone-400">Story + Book export</p>
            <p class="mt-3 text-2xl font-bold text-stone-900">From £3.99</p>
            <p class="mt-1 text-xs text-stone-500">One-time payment · PDF and printed book</p>
          </div>
          <div class="rounded-2xl border border-[#7C5C3B] bg-[#FAF7F4] p-6 text-left">
            <p class="text-xs font-semibold uppercase tracking-wider text-[#7C5C3B]">Story video export</p>
            <p class="mt-3 text-2xl font-bold text-stone-900">£19.99</p>
            <p class="mt-1 text-xs text-stone-500">One-time download · yours to keep and share</p>
          </div>
        </div>
        <p class="mt-4 text-xs text-stone-400">No subscription · No annual fee · Pay once, keep forever</p>
      </div>
    </section>

    <!-- Quote -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <p class="font-display text-xl italic leading-relaxed text-stone-700 sm:text-2xl">
          "He told me about a motorbike he saved up for two years to buy. I never knew that about him."
        </p>
        <p class="mt-4 text-sm text-[#9C7C5C]">— From a Tell Me Your Story keepsake</p>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-[#1C1917] px-5 py-16 text-center sm:px-8 sm:py-20">
      <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Start today</p>
      <h2 class="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">Their story deserves to be seen</h2>
      <p class="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#A8A29E]">
        Start a life story for free today. Export as a book, a printed hardcover, or a beautiful video — whenever you're ready.
      </p>
      <router-link to="/register" class="mt-8 inline-block rounded-full bg-[#C4A882] px-8 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">
        Start a life story free →
      </router-link>
      <p class="mt-4 text-xs text-[#9C7C5C]">Free to start · PDF from £3.99 · Video export £19.99 · Printed book from £34.98</p>
    </section>

  </main>
</template>

<script setup lang="ts">
import { useSeo } from '../composables/useSeo'

const features = [
  { icon: '📝', title: 'Their answers on screen',   desc: 'Each question and answer displayed beautifully — chapter by chapter, just like the printed book.' },
  { icon: '📸', title: 'Photos throughout',         desc: 'Images added to the story appear in the video alongside the answers they relate to.' },
  { icon: '🎵', title: 'Background music',          desc: 'Choose from gentle piano, warm strings, or soft acoustic — or upload your own music.' },
  { icon: '🎬', title: '1080p HD quality',          desc: 'Exported as a full HD MP4 file, ready to play on any device, TV, or share via WhatsApp.' },
  { icon: '⏱️', title: 'Custom slide duration',    desc: 'Control how long each answer stays on screen — from a quick overview to a longer watch.' },
  { icon: '✨', title: 'Elegant transitions',       desc: 'Smooth fade transitions between slides give the video a professional, cinematic feel.' },
]

const uses = [
  { icon: '👨‍👩‍👧', title: 'Play at a family gathering',      desc: 'A birthday, anniversary, or Christmas — play the video on the TV and watch the family react to stories they\'ve never heard.' },
  { icon: '🕯️', title: 'Celebration of life service',      desc: 'Share a loved one\'s story at their funeral or memorial — a dignified, personal tribute that celebrates who they were.' },
  { icon: '📱', title: 'Share with family far away',        desc: 'Send the video file to family members who couldn\'t be there. A life story that travels.' },
  { icon: '🎂', title: 'A milestone birthday gift',        desc: 'Present the video at a 70th, 80th, or 90th birthday — a film of their life, created by the people who love them.' },
]

useSeo({
  title: 'Life Story Video UK — Export a Life Story as a Beautiful Video | Tell Me Your Story',
  description: 'Turn a loved one\'s life story into a beautiful video keepsake. Their answers, photos, and music — exported as a 1080p HD video ready to share or play at a celebration of life. From £19.99.',
  canonical: 'https://tellmeyourstory.uk/life-story-video',
})
</script>

<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
</style>