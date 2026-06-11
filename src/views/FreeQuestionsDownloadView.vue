<template>
  <main class="bg-white">

    <!-- Hero -->
    <section class="bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Free Printable</p>
        <h1 class="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          50 questions to ask your parents<br>
          <em class="text-[#C4A882] italic">before it's too late</em>
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#A8A29E]">
          A free printable covering 5 chapters of life — childhood, teenage years, love and family, work, and legacy. Print it out, sit down with your parent or grandparent, and start asking.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href="/resources/50-questions-to-ask-your-parents.pdf"
            download
            class="rounded-full bg-[#C4A882] px-7 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90"
          >
            Download free PDF →
          </a>
          <router-link
            to="/register"
            class="rounded-full border border-white/20 px-7 py-3 text-sm font-medium text-white transition hover:bg-white/10"
          >
            Capture their story digitally
          </router-link>
        </div>
        <p class="mt-4 text-xs text-[#5C534E]">Free · No email required · Instant download</p>
      </div>
    </section>

    <!-- What's inside -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">What's inside</p>
        <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">5 chapters · 50 questions</h2>
        <p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-500">Each chapter focuses on a different part of their life. The questions are specific enough to unlock real memories — not so heavy that they feel like an interrogation.</p>
      </div>
      <div class="mx-auto mt-10 max-w-4xl grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        <div v-for="chapter in chapters" :key="chapter.title" class="rounded-2xl bg-[#F5F0E8] p-5 text-center">
          <p class="text-2xl">{{ chapter.icon }}</p>
          <p class="mt-3 text-xs font-semibold text-stone-900">{{ chapter.title }}</p>
          <p class="mt-1 text-xs text-stone-500">{{ chapter.count }} questions</p>
        </div>
      </div>
    </section>

    <!-- Preview questions -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Sample questions</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Questions that unlock real stories</h2>
        </div>
        <div class="mt-8 space-y-3">
          <div v-for="(q, i) in sampleQuestions" :key="i" class="rounded-2xl bg-white p-4 flex items-start gap-4">
            <span class="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#1C1917] text-xs font-bold text-white">{{ i + 1 }}</span>
            <p class="text-sm text-stone-700 leading-6">{{ q }}</p>
          </div>
        </div>
        <p class="mt-6 text-center text-xs text-stone-400">Plus 40 more across all 5 chapters in the free download</p>
      </div>
    </section>

    <!-- Download CTA -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="rounded-3xl bg-[#1C1917] p-8 sm:p-12 text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Free download</p>
          <h2 class="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">Print it. Ask them. Keep it.</h2>
          <p class="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#A8A29E]">A beautifully designed 6-page PDF. Print it at home, take it to their house, and start asking. No email required — just download and go.</p>
          <a
            href="/resources/50-questions-to-ask-your-parents.pdf"
            download
            class="mt-8 inline-block rounded-full bg-[#C4A882] px-8 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90"
          >
            Download free PDF →
          </a>
          <p class="mt-4 text-xs text-[#5C534E]">Free · No email required · Instant download · 6 pages · A4</p>
        </div>
      </div>
    </section>

    <!-- Go further -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Want to go further?</p>
        <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Turn their answers into a keepsake book</h2>
        <p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-500">The printable is a great starting point. Tell Me Your Story takes it further — 100 guided questions, voice recordings, photos, and a beautifully printed hardcover book with QR codes so family can hear their voice forever.</p>
        <div class="mt-8 grid gap-5 sm:grid-cols-3">
          <div v-for="feature in features" :key="feature.title" class="rounded-2xl bg-white p-5 text-center">
            <p class="text-2xl">{{ feature.icon }}</p>
            <p class="mt-3 text-xs font-semibold text-stone-900">{{ feature.title }}</p>
            <p class="mt-1 text-xs leading-5 text-stone-500">{{ feature.desc }}</p>
          </div>
        </div>
        <router-link to="/register" class="mt-8 inline-block rounded-full bg-[#7C5C3B] px-8 py-3 text-sm font-semibold text-white transition hover:opacity-90">
          Start their story free →
        </router-link>
        <p class="mt-3 text-xs text-stone-400">Free to start · One-time payment · Printed book from £34.98</p>
      </div>
    </section>

    <!-- Related pages -->
    <section class="px-5 py-12 sm:px-8">
      <div class="mx-auto max-w-3xl">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C] mb-6">Related reading</p>
        <div class="grid gap-4 sm:grid-cols-3">
          <router-link to="/questions-to-ask-elderly-parents" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">100 Questions for Elderly Parents</p>
            <p class="mt-1 text-xs text-stone-500">The full expanded question list</p>
          </router-link>
          <router-link to="/how-to-capture-parents-life-story" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">How to Capture a Life Story</p>
            <p class="mt-1 text-xs text-stone-500">Tips, tools, and step-by-step guide</p>
          </router-link>
          <router-link to="/keepsake-book" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Keepsake Book</p>
            <p class="mt-1 text-xs text-stone-500">Turn their answers into a printed book</p>
          </router-link>
        </div>
      </div>
    </section>

  </main>
</template>

<script setup lang="ts">
import { useSeo } from '../composables/useSeo'

const chapters = [
  { icon: '🌱', title: 'Childhood',        count: 10 },
  { icon: '🎒', title: 'Teenage Years',    count: 10 },
  { icon: '❤️', title: 'Love & Family',   count: 10 },
  { icon: '💼', title: 'Work',             count: 10 },
  { icon: '🤍', title: 'Legacy',           count: 10 },
]

const sampleQuestions = [
  'What is your very earliest memory?',
  'What did you want to be when you grew up — and what happened?',
  'How did you know your partner was the one?',
  'What sacrifice are you most glad you made?',
  'What do you know now that you wish you\'d known at 20?',
  'What are you most proud of in your whole life?',
  'What message would you leave for your grandchildren?',
  'What has your life taught you about what really matters?',
  'What\'s the hardest thing you\'ve ever been through?',
  'What do you want to be remembered for?',
]

const features = [
  { icon: '🎙️', title: 'Voice recordings',       desc: 'Record answers by speaking. Their voice preserved via QR codes in the printed book.' },
  { icon: '📚', title: 'UK printed hardcover',    desc: 'Professionally printed and delivered to your door. From £34.98.' },
  { icon: '📸', title: 'Photos and chapters',     desc: 'Add photos alongside answers. Beautiful layouts across 10 chapters.' },
]

useSeo({
  title: 'Free Printable — 50 Questions to Ask Your Parents Before It\'s Too Late | Tell Me Your Story',
  description: 'Download a free printable with 50 questions to ask your parents or grandparents. 5 chapters covering childhood, love, work, and legacy. No email required — instant download.',
  canonical: 'https://tellmeyourstory.uk/resources/50-questions-printable',
})
</script>

<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
</style>