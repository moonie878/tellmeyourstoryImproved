<template>
  <main class="bg-white">

    <!-- Hero -->
    <section class="bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">StoryKeeper Review 2026</p>
        <h1 class="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          StoryKeeper review 2026<br>
          <em class="text-[#C4A882] italic">is it worth £79?</em>
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#A8A29E]">
          An honest review of StoryKeeper for UK families — what you get for the money, what it does well, where it falls short, and who it suits.
        </p>
      </div>
    </section>

    <!-- What is Storyworth -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">What is StoryKeeper?</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">A UK life story book service, paid once</h2>
        </div>
        <div class="mt-8 text-sm leading-7 text-stone-600 max-w-xl mx-auto">
          <p>StoryKeeper is a London-based service that turns a parent's or grandparent's memories into a hardcover book. Prompts arrive weekly, or the storyteller can choose any question from the library whenever they like. They can write, dictate, or record audio or video, and each chapter in the book can have a QR code that plays the original recording.</p>
          <p class="mt-4">It's a one-time payment with no deadline, and it has printed more than 12,000 books with strong Trustpilot reviews. If you're also weighing up Storyworth, read our <router-link to="/storykeeper-vs-storyworth" class="text-[#7C5C3B] underline hover:no-underline">StoryKeeper vs Storyworth comparison</router-link>.</p>
        </div>
      </div>
    </section>

    <!-- Ratings -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Our verdict</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">StoryKeeper rated by category</h2>
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
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">StoryKeeper pros and cons</h2>
        </div>
        <div class="mt-10 grid gap-5 sm:grid-cols-2">
          <div class="rounded-2xl border border-green-200 bg-green-50 p-6">
            <p class="text-sm font-semibold text-green-800 mb-4">What StoryKeeper does well</p>
            <ul class="space-y-3">
              <li v-for="pro in pros" :key="pro" class="flex items-start gap-2 text-xs text-green-700">
                <span class="flex-shrink-0 mt-0.5">✓</span>
                <span>{{ pro }}</span>
              </li>
            </ul>
          </div>
          <div class="rounded-2xl border border-red-200 bg-red-50 p-6">
            <p class="text-sm font-semibold text-red-800 mb-4">Where StoryKeeper falls short</p>
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
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">What StoryKeeper costs in the UK</h2>
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
            <p class="text-sm font-bold text-[#C4A882]">£79 or £99, once — delivery included</p>
          </div>
          <p class="pt-2 text-center text-xs leading-5 text-stone-500">
            Checked {{ CHECKED_ON }} from
            <a href="https://storykeeper.com/uk/" target="_blank" rel="noopener noreferrer" class="underline hover:no-underline">StoryKeeper UK</a>.
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
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Who StoryKeeper is right for</h2>
        </div>
        <div class="mt-10 grid gap-5 sm:grid-cols-2">
          <div class="rounded-2xl border border-stone-200 p-6">
            <p class="text-sm font-semibold text-stone-900 mb-3">StoryKeeper works well if you…</p>
            <ul class="space-y-2 text-xs text-stone-500">
              <li>✓ Want a hardcover and free delivery in one price</li>
              <li>✓ Want the option of video as well as voice</li>
              <li>✓ Would like phone-call recording or several contributors (Plus)</li>
              <li>✓ Are happy to pay £79 upfront, with a money-back guarantee</li>
            </ul>
          </div>
          <div class="rounded-2xl border border-[#7C5C3B] bg-[#FAF7F4] p-6">
            <p class="text-sm font-semibold text-stone-900 mb-3">Consider an alternative if you…</p>
            <ul class="space-y-2 text-xs text-stone-600">
              <li>✓ Want to try it free first, without paying</li>
              <li>✓ Only need a digital keepsake, or a lower-cost softcover</li>
              <li>✓ Want to pay for printing only if you decide you want a book</li>
              <li>✓ Would also like a tribute video</li>
            </ul>
            <router-link to="/storykeeper-alternative" class="mt-4 inline-block text-xs text-[#7C5C3B] underline hover:no-underline">See how Tell Me Your Story compares →</router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Related pages -->
    <section class="px-5 py-12 sm:px-8">
      <div class="mx-auto max-w-3xl">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C] mb-6">Related reading</p>
        <div class="grid gap-4 sm:grid-cols-3">
          <router-link to="/storykeeper-vs-storyworth" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">StoryKeeper vs Storyworth</p>
            <p class="mt-1 text-xs text-stone-500">One-time vs annual, side by side</p>
          </router-link>
          <router-link to="/storykeeper-alternative" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">StoryKeeper Alternative</p>
            <p class="mt-1 text-xs text-stone-500">Try it free before you pay</p>
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
      <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Want to try before you pay?</p>
      <h2 class="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">Start with 5 free questions</h2>
      <p class="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#A8A29E]">
        Tell Me Your Story is built in the UK. Type or speak each answer, pay once from £3.99 when you're ready, and print only if you want a book.
      </p>
      <router-link to="/register" class="mt-8 inline-block rounded-full bg-[#C4A882] px-8 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">
        Try 5 questions free →
      </router-link>
      <p class="mt-4 text-xs text-[#9C7C5C]">5 questions free · One-time from £3.99 · Printed book from {{ printFrom }} including UK delivery</p>
    </section>

  </main>
</template>

<script setup lang="ts">
import { useSeo } from '../composables/useSeo'
import { PRINTED_BOOK_FROM_PRICE } from '../lib/printPricing'

/** Update whenever the StoryKeeper facts below are re-checked. */
const CHECKED_ON = 'September 2026'

const printFrom = `£${PRINTED_BOOK_FROM_PRICE.toFixed(2)}`

const ratings = [
  { category: 'Ease of use',        score: 4, note: 'Weekly prompts or choose your own; write, dictate or record online. Phone calls on the Plus plan.' },
  { category: 'Ways to tell a story', score: 5, note: 'Writing, dictation, audio and video — with QR codes linking chapters to the recordings.' },
  { category: 'Value for UK users', score: 4, note: 'One-time £79 with an A5 hardcover and free UK delivery. No free way to try it first.' },
  { category: 'Keeping their words', score: 4, note: 'Writing support is optional, and nothing changes without the storyteller approving it.' },
  { category: 'Print quality',      score: 4, note: 'A5 full-colour hardcover, up to 500 pages, unlimited colour photos.' },
  { category: 'Flexibility',        score: 5, note: 'No deadline and no subscription — take as long as you need.' },
]

const pros = [
  'UK-based, priced in pounds, with free UK delivery',
  'One-time payment with no deadline',
  'Write, dictate, or record audio and video',
  'QR codes link chapters to the original recordings',
  'Hardcover included, up to 500 pages',
  '60-day money-back guarantee and strong Trustpilot reviews',
]

const cons = [
  "You pay £79 upfront — there's no free way to try it",
  'Classic is for one storyteller; contributors and phone calls need Plus (£99)',
  'A5 is a compact book size',
  'There is no cheaper digital-only plan — every plan includes a printed book',
]

const costs = [
  { item: 'StoryKeeper Classic',   price: '£79', note: 'One A5 hardcover, one storyteller, audio and video recording', highlight: false },
  { item: 'StoryKeeper Plus',      price: '£99', note: 'Two hardcovers, unlimited contributors, phone-call recording, photo colourisation', highlight: false },
  { item: 'UK delivery',           price: 'Free', note: 'Included on both plans',                                         highlight: false },
  { item: 'Extra copies',          price: 'Extra', note: 'Can be ordered after the book is finished',                    highlight: false },
]

useSeo({
  title: 'StoryKeeper Review UK (2026): Is It Worth £79?',
  description: 'An honest StoryKeeper review for UK families: what £79 or £99 gets you, voice and video recording, QR codes, the hardcover book, and who it suits. Checked September 2026.',
})
</script>

<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
</style>