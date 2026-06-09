<template>
  <main class="bg-white">

    <!-- Hero -->
    <section class="bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Storyworth Review 2026</p>
        <h1 class="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          Storyworth review 2026<br>
          <em class="text-[#C4A882] italic">is it worth it for UK families?</em>
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#A8A29E]">
          An honest review of Storyworth — what it does well, where it falls short, and whether there's a better alternative for UK families.
        </p>
      </div>
    </section>

    <!-- What is Storyworth -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">What is Storyworth?</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">The original life story platform</h2>
        </div>
        <div class="mt-8 text-sm leading-7 text-stone-600 max-w-xl mx-auto">
          <p>Storyworth was one of the first platforms to tackle the idea of capturing a parent or grandparent's life story through guided questions. Founded in the US in 2012, it works by sending one question per week by email — the recipient replies, and their answers are collected into a book at the end of the year.</p>
          <p class="mt-4">It's a genuinely good idea, and for many American families it has worked well. But a lot has changed since 2012 — and for UK families in particular, there are some significant limitations worth knowing about before you pay.</p>
        </div>
      </div>
    </section>

    <!-- Ratings -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Our verdict</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Storyworth rated by category</h2>
        </div>
        <div class="mt-10 space-y-4">
          <div v-for="rating in ratings" :key="rating.category" class="rounded-2xl bg-white p-5">
            <div class="flex items-center justify-between gap-4">
              <div class="flex-1">
                <p class="text-sm font-semibold text-stone-900">{{ rating.category }}</p>
                <p class="mt-1 text-xs text-stone-500">{{ rating.note }}</p>
              </div>
              <div class="flex items-center gap-1 flex-shrink-0">
                <span v-for="i in 5" :key="i" class="text-lg" :class="i <= rating.score ? 'text-[#947449]' : 'text-stone-200'">★</span>
                <span class="ml-2 text-sm font-medium text-stone-700">{{ rating.score }}/5</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Pros and cons -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Honest assessment</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Storyworth pros and cons</h2>
        </div>
        <div class="mt-10 grid gap-5 sm:grid-cols-2">
          <div class="rounded-2xl border border-green-200 bg-green-50 p-6">
            <p class="text-sm font-semibold text-green-800 mb-4">What Storyworth does well</p>
            <ul class="space-y-3">
              <li v-for="pro in pros" :key="pro" class="flex items-start gap-2 text-xs text-green-700">
                <span class="flex-shrink-0 mt-0.5">✓</span>
                <span>{{ pro }}</span>
              </li>
            </ul>
          </div>
          <div class="rounded-2xl border border-red-200 bg-red-50 p-6">
            <p class="text-sm font-semibold text-red-800 mb-4">Where Storyworth falls short</p>
            <ul class="space-y-3">
              <li v-for="con in cons" :key="con" class="flex items-start gap-2 text-xs text-red-700">
                <span class="flex-shrink-0 mt-0.5">✗</span>
                <span>{{ con }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing breakdown -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">The real cost</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">What Storyworth actually costs UK families</h2>
        </div>
        <div class="mt-10 space-y-4">
          <div v-for="cost in costs" :key="cost.item" class="flex items-start justify-between gap-4 rounded-2xl bg-white p-4">
            <div>
              <p class="text-sm font-medium text-stone-900">{{ cost.item }}</p>
              <p class="mt-0.5 text-xs text-stone-500">{{ cost.note }}</p>
            </div>
            <p class="text-sm font-semibold text-stone-900 flex-shrink-0" :class="cost.highlight ? 'text-red-600' : ''">{{ cost.price }}</p>
          </div>
          <div class="rounded-2xl bg-stone-800 p-4 flex justify-between items-center">
            <p class="text-sm font-semibold text-white">Realistic total for a UK family</p>
            <p class="text-sm font-bold text-[#C4A882]">$200–300+ per year</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Who it's for -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Our verdict</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Who Storyworth is right for</h2>
        </div>
        <div class="mt-10 grid gap-5 sm:grid-cols-2">
          <div class="rounded-2xl border border-stone-200 p-6">
            <p class="text-sm font-semibold text-stone-900 mb-3">Storyworth works well if you…</p>
            <ul class="space-y-2 text-xs text-stone-500">
              <li>✓ Are based in the US</li>
              <li>✓ Want a weekly email cadence to prompt answers</li>
              <li>✓ Are happy paying annually</li>
              <li>✓ Don't need voice recordings</li>
            </ul>
          </div>
          <div class="rounded-2xl border border-[#7C5C3B] bg-[#FAF7F4] p-6">
            <p class="text-sm font-semibold text-stone-900 mb-3">Consider an alternative if you…</p>
            <ul class="space-y-2 text-xs text-stone-600">
              <li>✓ Are based in the UK</li>
              <li>✓ Want voice recordings in the printed book</li>
              <li>✓ Prefer a one-time payment</li>
              <li>✓ Want UK printing without extra shipping</li>
              <li>✓ Don't want weekly email pressure</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Alternative CTA -->
    <section class="bg-[#1C1917] px-5 py-16 text-center sm:px-8 sm:py-20">
      <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">The UK alternative</p>
      <h2 class="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">Try Tell Me Your Story instead</h2>
      <p class="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#A8A29E]">
        Built for UK families. One-time payment. Voice recordings with QR codes in the printed book. No weekly emails, no annual subscription, no international shipping fees.
      </p>
      <router-link to="/register" class="mt-8 inline-block rounded-full bg-[#C4A882] px-8 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">
        Start free — no subscription →
      </router-link>
      <p class="mt-4 text-xs text-[#9C7C5C]">Free to start · One-time from £3.99 · Printed book from £34.98</p>
    </section>

  </main>
</template>

<script setup lang="ts">
import { useSeo } from '../composables/useSeo'

const ratings = [
  { category: 'Ease of use',        score: 4, note: 'Simple email-based flow — easy for elderly parents to use' },
  { category: 'Question quality',   score: 4, note: 'Good range of questions across different life chapters' },
  { category: 'Value for UK users', score: 2, note: 'USD pricing, international shipping adds significant cost' },
  { category: 'Voice recordings',   score: 2, note: 'Only available on higher-priced plans' },
  { category: 'Print quality',      score: 3, note: 'Acceptable but US-printed, slow delivery to UK' },
  { category: 'Flexibility',        score: 2, note: 'Weekly email cadence only — can\'t answer at own pace easily' },
]

const pros = [
  'Established platform with a long track record',
  'Simple email-based flow most parents can manage',
  'Large question library across many life topics',
  'Printed book quality is decent',
  'Good for families who want weekly prompts',
]

const cons = [
  'Annual subscription — content becomes read-only if you stop paying',
  'USD pricing only — no GBP option for UK families',
  'International shipping adds $20–40 per book',
  'Weekly email cadence can feel like homework',
  'Voice recordings only on more expensive plans',
  'No QR codes linking to voice in the printed book',
  'No UK-based printing option',
  'Extra charges for additional copies and colour printing',
]

const costs = [
  { item: 'Annual subscription',        price: '$59–$199/yr', note: 'Basic to premium tier', highlight: false },
  { item: 'International shipping',     price: '$20–40',      note: 'Per book to UK',        highlight: true },
  { item: 'Extra colour copy',          price: '$79',         note: 'Per additional copy',    highlight: true },
  { item: 'Pages over limit',           price: '$20+',        note: 'Per page overage',       highlight: false },
  { item: 'Renewal next year',          price: '$59–$199',    note: 'Or lose edit access',    highlight: true },
]

useSeo({
  title: 'Storyworth Review 2026 — Is It Worth It for UK Families? | Tell Me Your Story',
  description: 'An honest Storyworth review for UK families in 2026. Pros, cons, real costs, and whether there\'s a better UK alternative. Updated June 2026.',
  canonical: 'https://tellmeyourstory.uk/storyworth-review',
})
</script>

<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
</style>