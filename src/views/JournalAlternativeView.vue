<template>
  <main class="bg-white">

    <!-- Hero -->
    <section class="bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">"Tell Me Your Story" journals</p>
        <h1 class="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          Love the idea of a "Tell Me Your Story" journal?<br>
          <em class="text-[#C4A882] italic">Here's the version that keeps their voice.</em>
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#A8A29E]">
          Guided journals like "Mum, Tell Me Your Story" or "Grandad, Tell Me Your Story" are a lovely gift.
          Tell Me Your Story works the same way — guided questions about their life — but they can type or speak
          their answers, and every recorded story gets a QR code in the printed book so you can hear them tell it.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <router-link to="/register" class="rounded-full bg-[#C4A882] px-7 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">
            Try 5 questions free →
          </router-link>
          <router-link to="/example" class="rounded-full border border-white/20 px-7 py-3 text-sm font-medium text-white transition hover:bg-white/10">
            See an example story
          </router-link>
        </div>
      </div>
    </section>

    <!-- Clarification -->
    <section class="px-5 pt-10 sm:px-8">
      <div class="mx-auto max-w-3xl rounded-2xl border border-[#E8DDD0] bg-[#FAF7F4] p-5 text-sm leading-6 text-stone-600">
        <strong class="text-stone-900">Looking for the paper journal?</strong>
        There are many guided journals with "Tell Me Your Story" in the title, from different publishers, sold in bookshops and online.
        We're not connected to any of them — we're a separate, UK-built service that shares the same idea.
        If a paper journal is what you want, it's a great choice, and we explain below when it's the better one.
      </div>
    </section>

    <!-- Side by side -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Side by side</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">A paper journal vs Tell Me Your Story</h2>
        </div>

        <div class="mt-10 overflow-x-auto rounded-2xl border border-stone-200 bg-white">
          <table class="w-full min-w-[540px] text-left text-sm">
            <thead>
              <tr class="border-b border-stone-200 bg-stone-50 text-xs font-semibold uppercase tracking-wider text-stone-500">
                <th scope="col" class="px-5 py-3"> </th>
                <th scope="col" class="px-5 py-3">Paper guided journal</th>
                <th scope="col" class="px-5 py-3 text-[#7C5C3B]">Tell Me Your Story</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, i) in comparison" :key="row.feature" :class="i % 2 === 0 ? 'bg-white' : 'bg-stone-50'">
                <th scope="row" class="px-5 py-4 align-top font-medium text-stone-700">{{ row.feature }}</th>
                <td class="px-5 py-4 align-top text-stone-600">{{ row.journal }}</td>
                <td class="px-5 py-4 align-top font-medium text-stone-700">{{ row.us }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- Which suits -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">The honest answer</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Which one suits them?</h2>
        </div>
        <div class="mt-10 grid gap-5 sm:grid-cols-2">
          <div class="rounded-2xl border border-stone-200 bg-white p-6">
            <p class="text-xs font-semibold uppercase tracking-wider text-stone-400">Choose a paper journal if…</p>
            <ul class="mt-4 space-y-3 text-sm leading-6 text-stone-600">
              <li v-for="item in whenJournal" :key="item" class="flex gap-2"><span class="text-stone-400" aria-hidden="true">•</span>{{ item }}</li>
            </ul>
          </div>
          <div class="rounded-2xl border border-[#7C5C3B] bg-[#FAF7F4] p-6">
            <p class="text-xs font-semibold uppercase tracking-wider text-[#7C5C3B]">Choose Tell Me Your Story if…</p>
            <ul class="mt-4 space-y-3 text-sm leading-6 text-stone-700">
              <li v-for="item in whenUs" :key="item" class="flex gap-2"><span class="text-[#7C5C3B]" aria-hidden="true">✓</span>{{ item }}</li>
            </ul>
          </div>
        </div>
        <p class="mx-auto mt-8 max-w-2xl text-center text-sm leading-7 text-stone-600">
          Or do both: many families give the journal for the handwriting, and record a few favourite stories so
          they can hear them too. Our
          <router-link to="/resources/50-questions-printable" class="text-[#7C5C3B] underline hover:no-underline">free printable of 50 questions</router-link>
          works well alongside either.
        </p>
      </div>
    </section>

    <!-- Whose story -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Start in a minute</p>
        <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Whose story do you want to keep?</h2>
        <p class="mx-auto mt-3 max-w-xl text-sm leading-7 text-stone-500">
          Each has its own set of questions, like the different journal editions — and the first 5 are free.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-2" role="group" aria-label="Choose whose story to start">
          <router-link
            v-for="option in storyOptions"
            :key="option.type"
            :to="`/register?type=${option.type}`"
            class="story-chip"
          >
            {{ option.label }}
          </router-link>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <h2 class="text-center font-display text-2xl font-bold text-stone-900 sm:text-3xl">Common questions</h2>
        <div class="mt-8 divide-y divide-stone-200 rounded-2xl border border-stone-200 bg-white">
          <details v-for="item in faqs" :key="item.q" class="faq-item px-5 py-4 sm:px-6">
            <summary class="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-stone-900 sm:text-base">
              {{ item.q }}
              <span class="faq-icon flex-shrink-0 text-xl leading-none text-[#7C5C3B]" aria-hidden="true">+</span>
            </summary>
            <p class="mt-3 text-sm leading-relaxed text-stone-600">{{ item.a }}</p>
          </details>
        </div>
      </div>
    </section>

    <!-- Related -->
    <section class="px-5 py-12 sm:px-8">
      <div class="mx-auto max-w-3xl">
        <p class="mb-6 text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Related reading</p>
        <div class="grid gap-4 sm:grid-cols-3">
          <router-link to="/best-memory-book-apps-uk" class="group rounded-2xl border border-stone-200 p-4 transition hover:border-[#7C5C3B]">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Best memory book apps (UK)</p>
            <p class="mt-1 text-xs text-stone-500">Five options compared honestly</p>
          </router-link>
          <router-link to="/life-story-journal" class="group rounded-2xl border border-stone-200 p-4 transition hover:border-[#7C5C3B]">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Life story journals</p>
            <p class="mt-1 text-xs text-stone-500">Paper, digital, or both</p>
          </router-link>
          <router-link to="/questions-to-ask-your-mum" class="group rounded-2xl border border-stone-200 p-4 transition hover:border-[#7C5C3B]">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Questions to ask your mum</p>
            <p class="mt-1 text-xs text-stone-500">The prompts that unlock real stories</p>
          </router-link>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-[#1C1917] px-5 py-16 text-center sm:px-8 sm:py-20">
      <h2 class="font-display text-2xl font-bold text-white sm:text-3xl">Their stories, in their own voice</h2>
      <p class="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#A8A29E]">
        Guided questions like the journals — plus voice recording, sharing with family, and a printed book with a QR code by every recorded story.
      </p>
      <router-link to="/register" class="mt-8 inline-block rounded-full bg-[#C4A882] px-8 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">
        Try 5 questions free →
      </router-link>
      <p class="mt-4 text-xs text-[#9C7C5C]">No card needed · One-time from £3.99 · Printed book from {{ printFrom }} including UK delivery</p>
    </section>

  </main>
</template>

<script setup lang="ts">
import { useSeo } from '../composables/useSeo'
import { PRINTED_BOOK_FROM_PRICE } from '../lib/printPricing'

const printFrom = `£${PRINTED_BOOK_FROM_PRICE.toFixed(2)}`

// `type` must match an id in src/data/storyTypes.ts (unknown ids are ignored).
const storyOptions = [
  { type: 'mum', label: 'Mum' },
  { type: 'dad', label: 'Dad' },
  { type: 'grandma', label: 'Nan' },
  { type: 'grandad', label: 'Grandad' },
  { type: 'life', label: 'Someone else' },
]

const comparison = [
  { feature: 'Questions',            journal: 'Printed prompts, often 100+',           us: '100+ guided questions, answered in any order' },
  { feature: 'How they answer',      journal: 'Handwriting',                           us: 'Type, or tap the microphone and talk' },
  { feature: 'Their voice',          journal: 'Not included',                          us: 'Recorded, with a QR code beside the story in the printed book' },
  { feature: 'Photos',               journal: 'Some have space to stick them in',      us: 'Add photos to any answer' },
  { feature: 'Copies',               journal: 'One — the journal itself',              us: 'Share a link with family; order as many printed copies as you like' },
  { feature: 'If it gets lost',      journal: 'The only copy is gone',                 us: 'Saved in your online account' },
  { feature: 'Cost',                 journal: 'Usually the cheapest option',           us: `5 questions free; one-time from £3.99; print from ${printFrom} including UK delivery` },
]

const whenJournal = [
  'Their handwriting is part of the gift',
  "They'd rather not use a phone, tablet or computer",
  'You want something to wrap and hand over today',
]

const whenUs = [
  'You want to hear their voice, not just read their words',
  'Writing by hand has become difficult for them',
  "You'd like every family member to have a copy",
  "You'd like the stories backed up, not in a single notebook",
]

// Shown on the page AND used for the FAQPage schema, so they always match.
const faqs = [
  {
    q: 'Are you the company that makes the "Tell Me Your Story" journals?',
    a: 'No. Many guided journals with "Tell Me Your Story" in the title are made by different publishers. Tell Me Your Story (tellmeyourstory.uk) is a separate, UK-built service with the same idea — guided questions about someone’s life — plus voice recording and printed books.',
  },
  {
    q: 'Is there a digital version of a "Tell Me Your Story" journal?',
    a: 'Tell Me Your Story works like a digital guided journal: 100+ questions, answered by typing or speaking, with photos. When you are ready, you can download a keepsake or order a printed book where every recorded story has a QR code to play their voice.',
  },
  {
    q: 'Can my mum speak her answers instead of writing them?',
    a: 'Yes. She can tap the microphone and talk — her words are typed up for her and the recording is kept — or type if she prefers. She can mix both.',
  },
  {
    q: 'Is there a version for Nan, Grandad or Dad?',
    a: 'Yes. There are separate question sets for Mum, Dad, Nan, Grandad and more, like the different journal editions. You can start any of them free.',
  },
  {
    q: 'How much does it cost compared with a journal?',
    a: `A paper journal is usually the cheapest option. Tell Me Your Story lets you answer 5 questions free, then pay once from £3.99. A printed book starts at ${printFrom} including UK delivery.`,
  },
]

useSeo({
  title: '"Tell Me Your Story" Journal Alternative — With Their Voice',
  description: 'Like the "Tell Me Your Story" guided journals, but they can type or speak — and a QR code in the printed book plays their voice. Mum, Dad, Nan and Grandad editions. Try free.',
  schema: {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  },
})
</script>

<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
.story-chip { display: inline-flex; align-items: center; min-height: 44px; padding: 10px 20px; border-radius: 100px; background: #7C5C3B; color: white; font-size: 14px; font-weight: 500; text-decoration: none; transition: opacity 0.2s, transform 0.2s; }
.story-chip:hover { opacity: 0.9; transform: translateY(-1px); }
.faq-item summary::-webkit-details-marker { display: none; }
.faq-item[open] .faq-icon { transform: rotate(45deg); }
.faq-icon { transition: transform 0.2s; }
</style>