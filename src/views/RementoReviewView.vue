<template>
  <main class="bg-white">

    <!-- Hero -->
    <section class="bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Remento Review 2026</p>
        <h1 class="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          Remento review 2026<br>
          <em class="text-[#C4A882] italic">does the AI rewriting work?</em>
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#A8A29E]">
          An honest review of Remento — what it does, what the AI rewriting actually means for your family's stories, and whether it's worth the annual subscription.
        </p>
      </div>
    </section>

    <!-- What is Remento -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">What is Remento?</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Voice recording with AI transcription</h2>
        </div>
        <div class="mt-8 text-sm leading-7 text-stone-600 max-w-xl mx-auto">
          <p>Remento is a US-based app that records your loved one answering prompted questions by voice, then uses AI to transcribe and rewrite those answers into polished prose. The result is printed as a book.</p>
          <p class="mt-4">It raised $3.3M in funding and appeared on Shark Tank in 2025, which gave it significant media attention. For many families, it looks like the perfect solution. But there's a significant question worth asking before you subscribe: do you want your loved one's actual words — or an AI's version of them?</p>
        </div>
      </div>
    </section>

    <!-- The AI rewriting question -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">The most important question</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Whose words are actually in the book?</h2>
        </div>
        <div class="mt-8 grid gap-5 sm:grid-cols-2">
          <div class="rounded-2xl border border-stone-200 bg-white p-6">
            <p class="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-3">How Remento works</p>
            <ol class="space-y-3 text-xs text-stone-600">
              <li class="flex gap-2"><span class="text-[#947449] flex-shrink-0">1.</span>Your loved one records their answer by voice</li>
              <li class="flex gap-2"><span class="text-[#947449] flex-shrink-0">2.</span>Remento transcribes the recording</li>
              <li class="flex gap-2"><span class="text-[#947449] flex-shrink-0">3.</span>AI rewrites the transcription into polished prose</li>
              <li class="flex gap-2"><span class="text-[#947449] flex-shrink-0">4.</span>The AI's version goes into the printed book</li>
            </ol>
            <p class="mt-4 text-xs text-red-600 font-medium">The book contains the AI's words — not their actual words.</p>
          </div>
          <div class="rounded-2xl border border-[#7C5C3B] bg-[#FAF7F4] p-6">
            <p class="text-xs font-semibold uppercase tracking-wider text-[#7C5C3B] mb-3">Why this matters</p>
            <p class="text-xs leading-6 text-stone-600">In 20 years, when your grandchildren read their great-grandparent's book, they'll be reading an AI's version of what was said — not the actual voice, phrasing, and personality of the person they loved.</p>
            <p class="mt-3 text-xs leading-6 text-stone-600">The specific words someone chooses, their turns of phrase, their digressions — these are what make a life story feel real. Polishing them away loses something irreplaceable.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Ratings -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Our verdict</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Remento rated by category</h2>
        </div>
        <div class="mt-10 space-y-4">
          <div v-for="rating in ratings" :key="rating.category" class="rounded-2xl border border-stone-200 p-5">
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

    <!-- Pros cons -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Honest assessment</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Remento pros and cons</h2>
        </div>
        <div class="mt-10 grid gap-5 sm:grid-cols-2">
          <div class="rounded-2xl border border-green-200 bg-green-50 p-6">
            <p class="text-sm font-semibold text-green-800 mb-4">What Remento does well</p>
            <ul class="space-y-3">
              <li v-for="pro in pros" :key="pro" class="flex items-start gap-2 text-xs text-green-700">
                <span class="flex-shrink-0 mt-0.5">✓</span><span>{{ pro }}</span>
              </li>
            </ul>
          </div>
          <div class="rounded-2xl border border-red-200 bg-red-50 p-6">
            <p class="text-sm font-semibold text-red-800 mb-4">Where Remento falls short</p>
            <ul class="space-y-3">
              <li v-for="con in cons" :key="con" class="flex items-start gap-2 text-xs text-red-700">
                <span class="flex-shrink-0 mt-0.5">✗</span><span>{{ con }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">The real cost</p>
        <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">What Remento actually costs</h2>
        <div class="mt-10 space-y-4 text-left">
          <div v-for="cost in costs" :key="cost.item" class="flex items-start justify-between gap-4 rounded-2xl border border-stone-200 p-4">
            <div>
              <p class="text-sm font-medium text-stone-900">{{ cost.item }}</p>
              <p class="mt-0.5 text-xs text-stone-500">{{ cost.note }}</p>
            </div>
            <p class="text-sm font-semibold flex-shrink-0" :class="cost.highlight ? 'text-red-600' : 'text-stone-900'">{{ cost.price }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-[#1C1917] px-5 py-16 text-center sm:px-8 sm:py-20">
      <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">The UK alternative</p>
      <h2 class="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">Their real words. Their real voice. No AI rewriting.</h2>
      <p class="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#A8A29E]">
        Tell Me Your Story preserves their actual words — not an AI's version of them. Voice recordings with QR codes, UK printing, one-time payment.
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
  { category: 'Voice recording quality', score: 4, note: 'Good mobile recording experience' },
  { category: 'Authenticity of output',  score: 2, note: 'AI rewrites their words — loses personality and voice' },
  { category: 'Value for UK users',      score: 2, note: 'USD pricing, international shipping, hidden extras' },
  { category: 'Ease of use',             score: 4, note: 'Simple mobile app interface' },
  { category: 'Print quality',           score: 3, note: 'Decent but US-printed for UK customers' },
  { category: 'Transparency',            score: 2, note: 'AI rewriting not prominently disclosed upfront' },
]

const pros = [
  'Good mobile voice recording experience',
  'Prompted questions guide the conversation',
  'QR codes in the book link to original recordings',
  'Clean, modern app design',
  'High media profile after Shark Tank appearance',
]

const cons = [
  'AI rewrites their words — the book contains AI prose, not their actual words',
  '$99/year subscription — content locked if you stop paying',
  'PDF export costs $24.99 extra — not included',
  '$30 surcharge for books over 200 pages',
  '$99 per additional storyteller',
  'US-focused — no UK printing, international shipping fees',
  'No one-time payment option',
]

const costs = [
  { item: 'Annual subscription',    price: '$99/yr',   note: 'Renews automatically',          highlight: false },
  { item: 'PDF/ebook export',       price: '$24.99',   note: 'Not included in subscription',  highlight: true },
  { item: 'Books over 200 pages',   price: '$30',      note: 'Per surcharge',                 highlight: true },
  { item: 'Extra storyteller',      price: '$99',      note: 'Per additional person',         highlight: true },
  { item: 'International shipping', price: '$20–40',   note: 'Per book to UK',                highlight: true },
]

useSeo({
  title: 'Remento Review 2026 — Does the AI Rewriting Work? | Tell Me Your Story',
  description: 'An honest Remento review for 2026. Does the AI rewriting preserve your loved one\'s voice? Pros, cons, real costs, and UK alternatives. Updated June 2026.',
  canonical: 'https://tellmeyourstory.uk/remento-review',
})
</script>

<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
</style>