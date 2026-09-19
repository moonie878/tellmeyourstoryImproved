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
          <p>Storyworth was one of the first platforms to capture a parent or grandparent's life story through guided questions. Founded in the US in 2012, it sends a question each week by email or text — the storyteller replies, and their answers are collected into a hardcover book. It now sells to UK customers in pounds.</p>
          <p class="mt-4">It's a genuinely good idea and it has worked well for a huge number of families. There are still a few things UK families should know before paying — mainly how the pricing, voice recording and shipping work. If you're also considering Remento, read our <router-link to="/remento-review" class="text-[#7C5C3B] underline hover:no-underline">Remento review</router-link> for a direct comparison.</p>
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
                <span v-for="i in 5" :key="i" aria-hidden="true" class="text-lg" :class="i <= rating.score ? 'text-[#947449]' : 'text-stone-200'">★</span>
                <span class="ml-2 text-sm font-medium text-stone-700"><span class="sr-only">Rated </span>{{ rating.score }}/5</span>
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
            <p class="text-sm font-semibold text-white">What to budget</p>
            <p class="text-sm font-bold text-[#C4A882]">Plan + shipping + any extra copies</p>
          </div>
          <p class="pt-2 text-center text-xs leading-5 text-stone-500">
            Checked {{ CHECKED_ON }} from
            <a href="https://welcome.storyworth.com/gb/faq" target="_blank" rel="noopener noreferrer" class="underline hover:no-underline">Storyworth's UK FAQ</a>
            and <a href="https://www.storyworth.co.uk/" target="_blank" rel="noopener noreferrer" class="underline hover:no-underline">storyworth.co.uk</a>.
            Prices change — check their site before you buy.
          </p>
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
              <li>✓ Want a hardcover included in one upfront price</li>
              <li>✓ Want questions to arrive by email or text each week</li>
              <li>✓ Have a storyteller who'd rather talk on the phone than use an app</li>
              <li>✓ Are happy with an annual plan</li>
            </ul>
          </div>
          <div class="rounded-2xl border border-[#7C5C3B] bg-[#FAF7F4] p-6">
            <p class="text-sm font-semibold text-stone-900 mb-3">Consider an alternative if you…</p>
            <ul class="space-y-2 text-xs text-stone-600">
              <li>✓ Would rather pay once than yearly</li>
              <li>✓ Want voice recording on any plan, not just upgraded ones</li>
              <li>✓ Want a QR code beside every recorded story in the book</li>
              <li>✓ Want to try it free first, without a card</li>
              <li>✓ Prefer to go at your own pace, with no deadline</li>
            </ul>
            <router-link to="/storyworth-alternative" class="mt-4 inline-block text-xs text-[#7C5C3B] underline hover:no-underline">See the best Storyworth alternatives for UK families →</router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Related pages -->
    <section class="px-5 py-12 sm:px-8">
      <div class="mx-auto max-w-3xl">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C] mb-6">Related reading</p>
        <div class="grid gap-4 sm:grid-cols-3">
          <router-link to="/remento-review" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Remento Review 2026</p>
            <p class="mt-1 text-xs text-stone-500">Does the AI rewriting preserve their voice?</p>
          </router-link>
          <router-link to="/storyworth-alternative" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Storyworth Alternatives</p>
            <p class="mt-1 text-xs text-stone-500">The best UK alternatives to Storyworth</p>
          </router-link>
          <router-link to="/life-story-questions" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">150 Life Story Questions</p>
            <p class="mt-1 text-xs text-stone-500">The questions that unlock real stories</p>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Alternative CTA -->
    <section class="bg-[#1C1917] px-5 py-16 text-center sm:px-8 sm:py-20">
      <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">The UK alternative</p>
      <h2 class="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">Try Tell Me Your Story instead</h2>
      <p class="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#A8A29E]">
        Built in the UK. One-time payment. Voice recording on every plan, with a QR code beside every recorded story in the printed book.
      </p>
      <router-link to="/register" class="mt-8 inline-block rounded-full bg-[#C4A882] px-8 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">
        Start free — no subscription →
      </router-link>
      <p class="mt-4 text-xs text-[#9C7C5C]">5 questions free · One-time from £3.99 · Printed book from {{ printFrom }} including UK delivery</p>
    </section>

  </main>
</template>

<script setup lang="ts">
import { useSeo } from '../composables/useSeo'
import { PRINTED_BOOK_FROM_PRICE } from '../lib/printPricing'

/** Update whenever the Storyworth facts below are re-checked. */
const CHECKED_ON = 'September 2026'

const printFrom = `£${PRINTED_BOOK_FROM_PRICE.toFixed(2)}`

const ratings = [
  { category: 'Ease of use',        score: 4, note: 'Questions arrive by email or text — nothing to install. Upgraded plans add phone recording, even from a landline.' },
  { category: 'Question quality',   score: 4, note: 'A large library across every chapter of life, and you can edit questions or write your own.' },
  { category: 'Value for UK users', score: 3, note: 'Sold in pounds from £49 a year with a hardcover included. Shipping to the UK is extra and import fees are possible.' },
  { category: 'Voice recordings',   score: 3, note: 'Phone recording on upgraded plans. One QR code on the last page links to the stories and recordings online.' },
  { category: 'Print quality',      score: 4, note: '6 × 9 inch hardcover, printed in the US and Europe. Colour interiors on the higher plans.' },
  { category: 'Flexibility',        score: 3, note: 'Weekly by default, but you can change the frequency and answer as many questions as you like.' },
]

const pros = [
  'Established since 2012 with a very large customer base',
  'Questions arrive by email or text — nothing to install',
  'Upgraded plans let storytellers record by phone, even on a landline',
  'A hardcover book is included in every plan',
  'Free e-book downloads and a 30-day money-back guarantee',
  'You can keep editing and order books after the plan year ends',
]

const cons = [
  'An annual plan rather than a one-time payment — the top plan renews automatically',
  'The entry plan is written answers only, with a black-and-white book',
  'Voice recording needs an upgraded plan',
  'One QR code at the back of the book, rather than one beside each story',
  'Shipping to the UK is charged on top, and import fees are possible',
  'Extra colour copies cost £59 each',
]

const costs = [
  { item: 'Basic plan',                     price: 'From £49/yr', note: 'Includes one black-and-white hardcover', highlight: false },
  { item: 'Upgraded plans',                 price: 'More',        note: 'Colour book and phone voice recording',  highlight: false },
  { item: 'Extra black-and-white copy',     price: '£29',         note: 'Per additional copy',                    highlight: false },
  { item: 'Extra colour copy',              price: '£59',         note: 'Up to 300 pages; £79 above that',         highlight: true  },
  { item: 'Shipping to the UK',             price: 'At checkout', note: 'Import fees possible on delivery',        highlight: true  },
]

useSeo({
  title: 'Storyworth UK Review (2026): Prices, Pros and Cons',
  description: 'An honest Storyworth review for UK families: what it does well, where it falls short, what it really costs in pounds, and who it suits. Checked September 2026.',
})
</script>

<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
</style>