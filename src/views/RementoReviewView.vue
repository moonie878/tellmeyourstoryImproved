<template>
  <main class="bg-white">

    <!-- Hero -->
    <section class="bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Remento Review 2026</p>
        <h1 class="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          Remento review 2026<br>
          <em class="text-[#C4A882] italic">is it right for UK families?</em>
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#A8A29E]">
          An honest review of Remento — how it works, what its AI writing options mean for your family's stories, what it really costs from the UK, and who it suits.
        </p>
      </div>
    </section>

    <!-- What is Remento -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">What is Remento?</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Voice-first storytelling, turned into a book</h2>
        </div>
        <div class="mt-8 text-sm leading-7 text-stone-600 max-w-xl mx-auto">
          <p>Remento is a US company. Each week the storyteller gets a prompt by email or text, taps a link and records their answer by voice or video — no app, login or password. Remento's Speech-To-Story technology turns each recording into written text, and at the end of the year the stories are printed in a full-colour hardcover with a QR code for each story that plays the original recording.</p>
          <p class="mt-4">It appeared on Shark Tank and has a lot of happy customers, particularly families whose storyteller would much rather talk than type. There's one choice worth understanding before you buy: how the recordings become written words.</p>
        </div>
      </div>
    </section>

    <!-- The AI rewriting question -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">The most important question</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Whose words end up in the book?</h2>
        </div>
        <div class="mt-8 grid gap-5 sm:grid-cols-2">
          <div class="rounded-2xl border border-stone-200 bg-white p-6">
            <p class="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-3">How Remento works</p>
            <ol class="space-y-3 text-xs text-stone-600">
              <li class="flex gap-2"><span class="text-[#947449] flex-shrink-0">1.</span>Your loved one records their answer by voice or video</li>
              <li class="flex gap-2"><span class="text-[#947449] flex-shrink-0">2.</span>Remento transcribes the recording</li>
              <li class="flex gap-2"><span class="text-[#947449] flex-shrink-0">3.</span>You choose: a cleaned-up word-for-word transcript, or an AI-written narrative (first or third person, short or detailed)</li>
              <li class="flex gap-2"><span class="text-[#947449] flex-shrink-0">4.</span>That text is printed, with a QR code that plays the original recording</li>
            </ol>
            <p class="mt-4 text-xs font-medium text-stone-700">If you pick the narrative option, the printed words are the AI's retelling, not theirs.</p>
          </div>
          <div class="rounded-2xl border border-[#7C5C3B] bg-[#FAF7F4] p-6">
            <p class="text-xs font-semibold uppercase tracking-wider text-[#7C5C3B] mb-3">Why this matters</p>
            <p class="text-xs leading-6 text-stone-600">The narrative option reads beautifully, but it is a retelling. In 20 years, the printed page will be how most of the family remembers the story — the QR code helps, but only while the link still works.</p>
            <p class="mt-3 text-xs leading-6 text-stone-600">If their exact phrasing matters to you, choose Remento's word-for-word option — or use a tool where they type or speak their own words directly.</p>
            <router-link to="/remento-alternative" class="mt-4 inline-block text-xs text-[#7C5C3B] underline hover:no-underline">See the best Remento alternatives for UK families →</router-link>
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
                <span v-for="i in 5" :key="i" aria-hidden="true" class="text-lg" :class="i <= rating.score ? 'text-[#947449]' : 'text-stone-200'">★</span>
                <span class="ml-2 text-sm font-medium text-stone-700"><span class="sr-only">Rated </span>{{ rating.score }}/5</span>
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
        <p class="mt-4 text-xs leading-5 text-stone-500">
          Checked {{ CHECKED_ON }} from
          <a href="https://www.remento.co/faq" target="_blank" rel="noopener noreferrer" class="underline hover:no-underline">Remento's FAQ</a>.
          Prices are in US dollars and change — check their site before you buy.
        </p>
      </div>
    </section>

    <!-- Related pages -->
    <section class="px-5 py-12 sm:px-8">
      <div class="mx-auto max-w-3xl">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C] mb-6">Related reading</p>
        <div class="grid gap-4 sm:grid-cols-3">
          <router-link to="/storyworth-review" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Storyworth Review 2026</p>
            <p class="mt-1 text-xs text-stone-500">Is Storyworth worth it for UK families?</p>
          </router-link>
          <router-link to="/remento-alternative" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Remento Alternatives</p>
            <p class="mt-1 text-xs text-stone-500">The best UK alternatives to Remento</p>
          </router-link>
          <router-link to="/life-story-questions" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">150 Life Story Questions</p>
            <p class="mt-1 text-xs text-stone-500">The questions that unlock real stories</p>
          </router-link>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-[#1C1917] px-5 py-16 text-center sm:px-8 sm:py-20">
      <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">The UK alternative</p>
      <h2 class="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">Their own words. Their own voice.</h2>
      <p class="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#A8A29E]">
        Type or speak each answer — the book keeps their own words, with a QR code beside every recorded story. One-time payment in pounds.
      </p>
      <router-link to="/register" class="mt-8 inline-block rounded-full bg-[#C4A882] px-8 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">
        Try 5 questions free →
      </router-link>
      <p class="mt-4 text-xs text-[#9C7C5C]">5 questions free · One-time from £3.99 · Printed book from {{ printFrom }} plus UK shipping</p>
    </section>

  </main>
</template>

<script setup lang="ts">
import { useSeo } from '../composables/useSeo'
import { PRINTED_BOOK_FROM_PRICE } from '../lib/printPricing'

/** Update whenever the Remento facts below are re-checked. */
const CHECKED_ON = 'September 2026'

const printFrom = `£${PRINTED_BOOK_FROM_PRICE.toFixed(2)}`

const ratings = [
  { category: 'Ease of use',          score: 5, note: 'No app, login or password — the storyteller taps a link from email or text and records.' },
  { category: 'Voice recording',      score: 5, note: 'Voice or video, up to 30 minutes per story, with a QR code for each story in the book.' },
  { category: 'Faithfulness of text', score: 3, note: 'Word-for-word option keeps their phrasing; the AI narrative option retells it.' },
  { category: 'Value for UK users',   score: 3, note: 'Priced in US dollars, with a colour hardcover included. UK shipping is extra and takes about 3 weeks.' },
  { category: 'Print quality',        score: 4, note: '8×10 inch full-colour hardcover, up to 200 pages included.' },
  { category: 'Owning your data',     score: 5, note: 'Download recordings, photos and stories any time — and they stay accessible if you don\'t renew.' },
]

const pros = [
  'Very easy for older storytellers — no app or password',
  'Voice or video recording, up to 30 minutes per story',
  'A QR code for each story plays the original recording',
  'Full-colour 8×10 hardcover included',
  'Choice of word-for-word transcript or written narrative',
  'You can download everything, and keep access without renewing',
]

const cons = [
  'A yearly plan in US dollars, not a one-time payment',
  'Every answer has to be recorded — there is no typing option for the storyteller',
  'The narrative option replaces their phrasing with an AI retelling',
  'UK shipping is extra, and books take around three weeks to arrive',
  'Each extra storyteller is a separate purchase',
  'Books over 200 pages cost $30 more; the designed e-book is $49.99',
]

const costs = [
  { item: 'First year',                  price: '$99',        note: 'One storyteller, unlimited family collaborators, one colour hardcover', highlight: false },
  { item: 'Renewal (optional)',          price: '$99/yr or $12/mo', note: 'Only needed to record new stories', highlight: false },
  { item: 'Extra printed copy',          price: '$69',        note: 'Up to 200 pages; $99 for 201–380 pages',  highlight: true  },
  { item: 'Book over 200 pages',         price: '$30',        note: 'One-off surcharge',                       highlight: false },
  { item: 'Designed e-book',             price: '$49.99',     note: 'Stories can also be exported as text or PDF', highlight: false },
  { item: 'Shipping to the UK',          price: 'Extra',      note: 'Calculated at checkout; about 3 weeks',   highlight: true  },
]

useSeo({
  title: 'Remento Review UK (2026): Pros, Cons and Real Costs',
  description: 'An honest Remento review for UK families: how the voice recording and AI writing work, what it really costs from the UK, and who it suits. Checked September 2026.',
})
</script>

<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
</style>