<template>
  <main class="bg-white">

    <!-- Hero -->
    <section class="bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Write Your Own Story</p>
        <h1 class="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          Don't wait to be asked<br>
          <em class="text-[#C4A882] italic">write your own life story</em>
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#A8A29E]">
          Most life stories only get written after someone's gone, by family piecing together what they can remember. Here's how to write yours yourself — in your own words, at your own pace, while you're the one who knows it best.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <router-link to="/register" class="rounded-full bg-[#C4A882] px-7 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Start your story free →</router-link>
          <router-link to="/example" class="rounded-full border border-white/20 px-7 py-3 text-sm font-medium text-white transition hover:bg-white/10">See an example</router-link>
        </div>
      </div>
    </section>

    <!-- Why -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Why write it yourself</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">You know your story better than anyone else ever will</h2>
        </div>
        <div class="mt-8 text-sm leading-7 text-stone-600 max-w-xl mx-auto space-y-4">
          <p>Most life stories get written by other people, after the fact — a son or daughter trying to remember what their parent told them, piecing together fragments from old conversations. It works, but it's a reconstruction, not the real thing.</p>
          <p>Writing your own story while you're here means it's actually in your words, with your reasoning, your humour, the details only you would think to include. Nobody else can know exactly why a decision felt right at the time, or what a particular ordinary afternoon meant to you. That's the part that gets lost when someone else has to guess.</p>
          <p>You don't need a reason like illness or age to start. Plenty of people write their story simply because they don't want their grandchildren to only know them as "the person in the photographs."</p>
        </div>
      </div>
    </section>

    <!-- Steps -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center mb-10">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Getting started</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">How to begin</h2>
        </div>
        <div class="space-y-4">
          <div v-for="(step, i) in steps" :key="step.title" class="rounded-2xl bg-white p-6 flex items-start gap-4">
            <span class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#1C1917] text-xs font-bold text-white">{{ i + 1 }}</span>
            <div>
              <p class="text-sm font-semibold text-stone-900">{{ step.title }}</p>
              <p class="mt-2 text-xs leading-6 text-stone-500">{{ step.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Overcoming hesitation -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center mb-10">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Common hesitations</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">"But my life isn't that interesting"</h2>
        </div>
        <div class="grid gap-5 sm:grid-cols-2">
          <div v-for="point in hesitations" :key="point.title" class="rounded-2xl bg-[#F5F0E8] p-6">
            <p class="text-sm font-semibold text-stone-900 mb-2">{{ point.title }}</p>
            <p class="text-xs leading-5 text-stone-500">{{ point.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- How TMYS helps -->
    <section class="bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">A simpler way to start</p>
        <h2 class="mt-3 font-display text-2xl font-bold text-white sm:text-3xl">Guided questions, your own pace, your own words</h2>
        <p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#A8A29E]">Tell Me Your Story gives you a structured way to write your own story without needing to know where to start. Answer questions about your life, one at a time — type your answer, or record your voice if speaking feels more natural. There's no deadline, and no need to write it all at once.</p>
        <div class="mt-8 grid gap-5 sm:grid-cols-3">
          <div v-for="feature in features" :key="feature.title" class="rounded-2xl bg-white/5 border border-white/10 p-5 text-left">
            <p class="text-2xl">{{ feature.icon }}</p>
            <p class="mt-3 text-xs font-semibold text-white">{{ feature.title }}</p>
            <p class="mt-1 text-xs leading-5 text-[#A8A29E]">{{ feature.desc }}</p>
          </div>
        </div>
        <router-link to="/register" class="mt-8 inline-block rounded-full bg-[#C4A882] px-8 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">
          Start free →
        </router-link>
        <p class="mt-4 text-xs text-[#9C7C5C]">Free to start · One-time payment · Printed book from £{{ PRINTED_BOOK_FROM_PRICE.toFixed(2) }}</p>
      </div>
    </section>

    <!-- FAQ -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">FAQ</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Common questions</h2>
        </div>
        <div class="mt-10 space-y-4">
          <div v-for="faq in faqs" :key="faq.q" class="rounded-2xl bg-white p-6">
            <p class="text-sm font-semibold text-stone-900">{{ faq.q }}</p>
            <p class="mt-2 text-xs leading-6 text-stone-500">{{ faq.a }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Related -->
    <section class="px-5 py-12 sm:px-8">
      <div class="mx-auto max-w-3xl">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C] mb-6">Related reading</p>
        <div class="grid gap-4 sm:grid-cols-3">
          <router-link to="/how-to-write-a-life-story" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">How to Write a Life Story</p>
            <p class="mt-1 text-xs text-stone-500">Capturing a loved one's story, step by step</p>
          </router-link>
          <router-link to="/life-story-journal" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Life Story Journal</p>
            <p class="mt-1 text-xs text-stone-500">A guided journal for capturing your story</p>
          </router-link>
          <router-link to="/keepsake-book" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Keepsake Book</p>
            <p class="mt-1 text-xs text-stone-500">Turn your story into a printed book</p>
          </router-link>
        </div>
      </div>
    </section>

  </main>
</template>

<script setup lang="ts">
import { useSeo } from '../composables/useSeo'
import { PRINTED_BOOK_FROM_PRICE } from '../lib/printPricing'

const steps = [
  { title: 'Don\'t start at the beginning', desc: 'Trying to start with "I was born in..." is the fastest way to get stuck. Start with whichever memory feels most alive to you right now, wherever it falls in your life — you can reorder everything later.' },
  { title: 'Use photographs as a way in', desc: 'Pull out old photos and let them prompt you. A photo of a particular afternoon often unlocks far more detail than trying to recall that period from memory alone.' },
  { title: 'Write or speak — whichever feels natural', desc: 'If sitting down to write feels like homework, try speaking instead. Many people find it far easier to tell their story out loud than to type it from a blank page.' },
  { title: 'Work in short bursts, not one long sitting', desc: 'A single memory, answered properly, is worth more than a rushed attempt to cover years in one go. Come back to it over days or weeks.' },
  { title: 'Don\'t worry about it being "good writing"', desc: 'This isn\'t a novel. The details, the honesty, and your actual voice matter far more than polished prose.' },
  { title: 'Decide what you want to happen to it', desc: 'Some people write purely for themselves. Others want it printed and shared with family while they\'re still here to see it land. Either is a good reason to write.' },
]

const hesitations = [
  { title: '"Nothing remarkable happened to me"', desc: 'Most life stories that matter to families aren\'t about remarkable events — they\'re about ordinary days, decisions, and small moments that shaped who someone became. Those are exactly what people want to know.' },
  { title: '"I\'m not a writer"', desc: 'You don\'t need to be. Honest and specific beats polished and vague every time. Speaking your answers aloud, rather than writing them, removes this concern entirely.' },
  { title: '"I don\'t know where to start"', desc: 'Guided questions solve this — you\'re never staring at a blank page, just answering one thing at a time.' },
  { title: '"There\'s no rush, I\'ll do it later"', desc: 'Many people who eventually write their story say they wish they\'d started years earlier, simply because memories are easier to access while they\'re still fresh.' },
]

const features = [
  { icon: '❓', title: 'Guided questions', desc: 'Never face a blank page — answer one question at a time, in any order you like.' },
  { icon: '🎙️', title: 'Type or speak', desc: 'Write your answers, or record your voice if that feels more natural.' },
  { icon: '📚', title: 'A real keepsake', desc: 'Turn your finished story into a beautifully printed book, whenever you\'re ready.' },
]

const faqs = [
  { q: 'Do I need a reason to write my own life story?', a: 'No. Many people write their story simply because they want their family to know them properly, not because of illness or age. There\'s no wrong time to start.' },
  { q: 'What if I\'m not a confident writer?', a: 'You can speak your answers aloud instead of writing them. Honesty and specific detail matter far more than polished prose — this isn\'t a novel, it\'s your story.' },
  { q: 'How long does it take to write a life story?', a: 'There\'s no set timeline. Some people complete a project in a few sittings, others return to it over months, answering a question whenever they have a spare half hour.' },
  { q: 'Can I write my story for myself, without sharing it?', a: 'Yes. Plenty of people write purely for their own reflection. You can also choose later whether to share it, print it, or keep it entirely private.' },
]

useSeo({
  title: 'Write Your Own Life Story — A Guide for Telling It Yourself',
  description: 'Don\'t wait to be asked. A practical guide to writing your own life story, in your own words, at your own pace — with guided questions to help you start.',
  canonical: 'https://tellmeyourstory.uk/write-your-own-life-story',
  schema: {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'Do I need a reason to write my own life story?', acceptedAnswer: { '@type': 'Answer', text: 'No. Many people write their story simply because they want their family to know them properly.' } },
          { '@type': 'Question', name: 'What if I am not a confident writer?', acceptedAnswer: { '@type': 'Answer', text: 'You can speak your answers aloud instead of writing them. Honesty and specific detail matter more than polished prose.' } },
          { '@type': 'Question', name: 'Can I write my story for myself, without sharing it?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. You can choose later whether to share it, print it, or keep it entirely private.' } },
        ]
      }
    ]
  }
})
</script>

<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
</style>