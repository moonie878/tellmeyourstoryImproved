<template>
  <main class="bg-white">

    <!-- Hero -->
    <section class="bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Life Story Journal</p>
        <h1 class="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          Create a life story journal<br>
          <em class="text-[#C4A882] italic">that becomes a keepsake book</em>
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#A8A29E]">
          A life story journal guides someone through the chapters of their life — question by question, in their own words. Tell Me Your Story is a digital life story journal that turns every answer into a beautiful keepsake book.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <router-link to="/register" class="rounded-full bg-[#C4A882] px-7 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Start a life story journal free →</router-link>
          <router-link to="/example" class="rounded-full border border-white/20 px-7 py-3 text-sm font-medium text-white transition hover:bg-white/10">See an example</router-link>
        </div>
      </div>
    </section>

    <!-- Digital vs paper -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Digital vs paper</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Which type of life story journal is right?</h2>
        </div>
        <div class="mt-10 grid gap-5 sm:grid-cols-2">
          <div class="rounded-2xl border border-stone-200 p-6">
            <p class="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-4">Paper journal</p>
            <ul class="space-y-3 text-xs text-stone-600">
              <li class="flex gap-2"><span class="text-green-500 flex-shrink-0">✓</span>Tactile, handwritten feel</li>
              <li class="flex gap-2"><span class="text-green-500 flex-shrink-0">✓</span>No technology needed</li>
              <li class="flex gap-2"><span class="text-red-400 flex-shrink-0">✗</span>Many people never finish it</li>
              <li class="flex gap-2"><span class="text-red-400 flex-shrink-0">✗</span>Handwriting can be hard to read</li>
              <li class="flex gap-2"><span class="text-red-400 flex-shrink-0">✗</span>Can be lost, damaged, or deteriorate</li>
              <li class="flex gap-2"><span class="text-red-400 flex-shrink-0">✗</span>Can't capture voice recordings</li>
              <li class="flex gap-2"><span class="text-red-400 flex-shrink-0">✗</span>Hard to share with the wider family</li>
            </ul>
          </div>
          <div class="rounded-2xl border border-[#7C5C3B] bg-[#FAF7F4] p-6">
            <p class="text-xs font-semibold uppercase tracking-wider text-[#7C5C3B] mb-4">Tell Me Your Story</p>
            <ul class="space-y-3 text-xs text-stone-600">
              <li class="flex gap-2"><span class="text-[#7C5C3B] flex-shrink-0">✓</span>Questions already written for you</li>
              <li class="flex gap-2"><span class="text-[#7C5C3B] flex-shrink-0">✓</span>Answer by typing or speaking</li>
              <li class="flex gap-2"><span class="text-[#7C5C3B] flex-shrink-0">✓</span>Everything saves automatically</li>
              <li class="flex gap-2"><span class="text-[#7C5C3B] flex-shrink-0">✓</span>Voice recordings preserved forever</li>
              <li class="flex gap-2"><span class="text-[#7C5C3B] flex-shrink-0">✓</span>Turns into a printed hardcover book</li>
              <li class="flex gap-2"><span class="text-[#7C5C3B] flex-shrink-0">✓</span>Share with the whole family</li>
              <li class="flex gap-2"><span class="text-[#7C5C3B] flex-shrink-0">✓</span>Free to start</li>
            </ul>
          </div>
        </div>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <router-link to="/life-story-questions" class="text-xs text-[#7C5C3B] underline hover:no-underline">See the 150 life story questions inside →</router-link>
          <span class="text-xs text-stone-300">·</span>
          <router-link to="/keepsake-book" class="text-xs text-[#7C5C3B] underline hover:no-underline">What goes inside a keepsake book →</router-link>
        </div>
      </div>
    </section>

    <!-- What's inside -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Inside the journal</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">100 questions across 10 chapters</h2>
        </div>
        <div class="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          <div v-for="chapter in chapters" :key="chapter.title" class="rounded-2xl bg-white p-5 text-center">
            <p class="text-2xl">{{ chapter.icon }}</p>
            <p class="mt-3 text-sm font-semibold text-stone-900">{{ chapter.title }}</p>
            <p class="mt-1 text-xs text-stone-500">{{ chapter.count }} questions</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">What makes it different</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">More than a journal — a keepsake</h2>
        </div>
        <div class="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          <div v-for="feature in features" :key="feature.title" class="rounded-2xl border border-stone-200 p-6">
            <p class="text-2xl">{{ feature.icon }}</p>
            <p class="mt-3 text-sm font-semibold text-stone-900">{{ feature.title }}</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">{{ feature.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Quote -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <p class="font-display text-xl italic leading-relaxed text-stone-700 sm:text-2xl">"He told me about a motorbike he saved up for two years to buy. I never knew that about him."</p>
        <p class="mt-4 text-sm text-[#9C7C5C]">— From a Tell Me Your Story life story journal</p>
      </div>
    </section>

    <!-- Pricing -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Pricing</p>
        <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Start free, pay once when you're ready</h2>
        <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="tier in tiers" :key="tier.name" class="rounded-3xl border p-5 text-center" :class="tier.featured ? 'border-[#7C5C3B] bg-[#FAF7F4]' : 'border-stone-200 bg-white'">
            <p v-if="tier.featured" class="mb-2 text-[10px] font-semibold uppercase tracking-wider text-[#7C5C3B]">Most popular</p>
            <p class="text-xs font-medium text-stone-500">{{ tier.name }}</p>
            <p class="mt-2 text-2xl font-bold text-stone-900">£{{ tier.price }}</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">{{ tier.desc }}</p>
            <router-link to="/register" class="mt-4 block rounded-full py-2 text-xs font-medium transition" :class="tier.featured ? 'bg-[#7C5C3B] text-white hover:opacity-90' : 'border border-stone-300 text-stone-700 hover:bg-stone-50'">Get started →</router-link>
          </div>
        </div>
        <p class="mt-4 text-xs text-stone-400">One-time payment · No subscription · Printed book from £34.98</p>
      </div>
    </section>

    <!-- Related pages -->
    <section class="px-5 py-12 sm:px-8">
      <div class="mx-auto max-w-3xl">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C] mb-6">Related reading</p>
        <div class="grid gap-4 sm:grid-cols-3">
          <router-link to="/life-story-questions" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">150 Life Story Questions</p>
            <p class="mt-1 text-xs text-stone-500">The questions inside every journal</p>
          </router-link>
          <router-link to="/keepsake-book" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Keepsake Book</p>
            <p class="mt-1 text-xs text-stone-500">Turn the journal into a printed book</p>
          </router-link>
          <router-link to="/how-to-write-a-life-story" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">How to Write a Life Story</p>
            <p class="mt-1 text-xs text-stone-500">A complete guide from start to finish</p>
          </router-link>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-[#1C1917] px-5 py-16 text-center sm:px-8 sm:py-20">
      <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Start today</p>
      <h2 class="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">A life story journal that becomes a book</h2>
      <p class="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#A8A29E]">Free to start, no commitment. Begin their life story journal today — and turn it into a beautifully printed keepsake when they're ready.</p>
      <router-link to="/register" class="mt-8 inline-block rounded-full bg-[#C4A882] px-8 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Start a life story journal free →</router-link>
      <p class="mt-4 text-xs text-[#9C7C5C]">Free to start · One-time payment · Printed book from £34.98</p>
    </section>

  </main>
</template>

<script setup lang="ts">
import { useSeo } from '../composables/useSeo'

const chapters = [
  { icon: '🌱', title: 'Childhood',        count: 10 },
  { icon: '🎒', title: 'Teenage years',    count: 10 },
  { icon: '💼', title: 'Work & career',    count: 10 },
  { icon: '❤️', title: 'Love',            count: 10 },
  { icon: '👨‍👩‍👧', title: 'Family',      count: 10 },
  { icon: '🌍', title: 'Adventures',       count: 10 },
  { icon: '📚', title: 'Values',           count: 10 },
  { icon: '💪', title: 'Hard times',       count: 10 },
  { icon: '🌟', title: 'Proudest moments', count: 10 },
  { icon: '🤍', title: 'Legacy',           count: 10 },
]

const features = [
  { icon: '🎙️', title: 'Voice recordings',       desc: 'Answer questions by speaking. Their voice preserved in the printed book via QR codes.' },
  { icon: '📸', title: 'Photos alongside answers', desc: 'Add photos to bring memories to life on the page.' },
  { icon: '📚', title: 'Becomes a printed book',  desc: 'The journal exports as a professionally designed PDF or printed hardcover.' },
  { icon: '💷', title: 'One-time payment',        desc: 'Pay once, own forever. No subscription or annual fee.' },
  { icon: '🤍', title: 'Share with family',       desc: 'The whole family can read along as the journal grows.' },
  { icon: '⏱️', title: 'No pressure',             desc: 'Answer one question at a time, whenever they feel like it.' },
]

const tiers = [
  { name: 'Story only',     price: '3.99',  desc: 'PDF keepsake for one story',           featured: false },
  { name: 'Story + Photos', price: '7.99',  desc: 'PDF with photos included',             featured: true  },
  { name: 'All Stories',    price: '11.99', desc: 'All 7 story types unlocked',           featured: false },
  { name: 'Premium',        price: '17.99', desc: 'Photos, premium layouts, all stories', featured: false },
]

useSeo({
  title: 'Life Story Journal UK — Create a Digital Journal That Becomes a Keepsake Book | Tell Me Your Story',
  description: 'A digital life story journal with 100 guided questions — answer by typing or voice, and turn every answer into a beautifully printed keepsake book. Free to start.',
  canonical: 'https://tellmeyourstory.uk/life-story-journal',
})
</script>

<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
</style>