<template>
  <main class="bg-white">

    <!-- Hero -->
    <section class="bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Storyworth vs Tell Me Your Story</p>
        <h1 class="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          Storyworth vs Tell Me Your Story<br>
          <em class="text-[#C4A882] italic">which is right for your family?</em>
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#A8A29E]">
          Storyworth is the best-known name in life story platforms. Tell Me Your Story is a UK-built alternative with voice recording on every plan and a one-time payment. Here's an honest, side-by-side look at how they compare.
        </p>
      </div>
    </section>

    <!-- Quick summary -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Quick summary</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">What are they?</h2>
        </div>
        <div class="mt-10 grid gap-5 sm:grid-cols-2">
          <div v-for="summary in summaries" :key="summary.name" class="rounded-2xl border p-6 text-center"
            :class="summary.featured ? 'border-[#7C5C3B] bg-[#FAF7F4]' : 'border-stone-200'">
            <p v-if="summary.featured" class="text-[10px] font-semibold uppercase tracking-wider text-[#7C5C3B] mb-2">UK alternative</p>
            <p class="font-display text-lg font-bold text-stone-900">{{ summary.name }}</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">{{ summary.desc }}</p>
            <p class="mt-3 text-xs font-semibold text-stone-700">{{ summary.price }}</p>
          </div>
        </div>
        <div class="mt-6 flex flex-wrap justify-center gap-3">
          <router-link to="/storyworth-review" class="text-xs text-[#7C5C3B] underline hover:no-underline">Full Storyworth review →</router-link>
          <span class="text-xs text-stone-300">·</span>
          <router-link to="/storykeeper-vs-storyworth" class="text-xs text-[#7C5C3B] underline hover:no-underline">StoryKeeper vs Storyworth →</router-link>
          <span class="text-xs text-stone-300">·</span>
          <router-link to="/storyworth-vs-remento" class="text-xs text-[#7C5C3B] underline hover:no-underline">Storyworth vs Remento →</router-link>
        </div>
      </div>
    </section>

    <!-- Comparison table -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center mb-10">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Feature comparison</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Storyworth vs Tell Me Your Story</h2>
        </div>
        <div class="overflow-x-auto rounded-2xl border border-stone-200 bg-white">
          <div class="grid min-w-[480px] grid-cols-3 gap-2 bg-[#1C1917] px-4 py-3 text-xs font-semibold text-white">
            <div>Feature</div>
            <div class="text-center">Storyworth</div>
            <div class="text-center text-[#C4A882]">Tell Me Your Story</div>
          </div>
          <div v-for="(row, i) in comparisonRows" :key="row.feature"
            class="grid min-w-[480px] grid-cols-3 gap-2 border-t border-stone-100 px-4 py-3 text-xs"
            :class="i % 2 === 0 ? 'bg-white' : 'bg-stone-50'">
            <div class="text-stone-700 font-medium">{{ row.feature }}</div>
            <div class="text-center" :class="row.sw === '✓' ? 'text-green-600' : row.sw === '✗' ? 'text-stone-300' : 'text-stone-600'">{{ row.sw }}</div>
            <div class="text-center font-medium" :class="row.tm === '✓' ? 'text-[#7C5C3B]' : row.tm === '✗' ? 'text-stone-300' : 'text-[#7C5C3B]'">{{ row.tm }}</div>
          </div>
        </div>
        <p class="mt-4 text-center text-xs leading-5 text-stone-500">
          Storyworth details checked {{ CHECKED_ON }} from
          <a href="https://welcome.storyworth.com/gb/faq" target="_blank" rel="noopener noreferrer" class="underline hover:no-underline">Storyworth's UK FAQ</a>.
          Check their site for current prices before you buy.
        </p>
      </div>
    </section>

    <!-- Deep dive -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl space-y-12">
        <div v-for="section in deepDive" :key="section.title">
          <div class="text-center">
            <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">{{ section.label }}</p>
            <h2 class="mt-3 font-display text-2xl font-bold text-stone-900">{{ section.title }}</h2>
          </div>
          <div class="mt-6 text-sm leading-7 text-stone-600 space-y-4">
            <p v-for="para in section.paras" :key="para">{{ para }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Verdict -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Our verdict</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Which should you choose?</h2>
        </div>
        <div class="mt-10 grid gap-5 sm:grid-cols-2">
          <div v-for="verdict in verdicts" :key="verdict.name" class="rounded-2xl bg-white border border-stone-200 p-6">
            <p class="font-display text-lg font-bold text-stone-900">{{ verdict.name }}</p>
            <p class="mt-1 text-xs text-[#9C7C5C] font-medium">{{ verdict.price }}</p>
            <p class="mt-3 text-xs font-semibold text-stone-700 uppercase tracking-wide">Best if:</p>
            <ul class="mt-2 space-y-1">
              <li v-for="point in verdict.bestIf" :key="point" class="flex gap-2 text-xs leading-5 text-stone-600">
                <span class="text-green-600 flex-shrink-0">✓</span>{{ point }}
              </li>
            </ul>
            <p class="mt-3 text-xs font-semibold text-stone-700 uppercase tracking-wide">Consider others if:</p>
            <ul class="mt-2 space-y-1">
              <li v-for="point in verdict.considerOthers" :key="point" class="flex gap-2 text-xs leading-5 text-stone-600">
                <span class="text-stone-400 flex-shrink-0">→</span>{{ point }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">FAQ</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Common questions</h2>
        </div>
        <div class="mt-10 space-y-4">
          <div v-for="faq in faqs" :key="faq.q" class="rounded-2xl border border-stone-200 p-6">
            <p class="text-sm font-semibold text-stone-900">{{ faq.q }}</p>
            <p class="mt-2 text-xs leading-6 text-stone-500">{{ faq.a }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Related -->
    <section class="bg-[#F5F0E8] px-5 py-12 sm:px-8">
      <div class="mx-auto max-w-3xl">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C] mb-6">Related reading</p>
        <div class="grid gap-4 sm:grid-cols-3">
          <router-link to="/storyworth-review" class="rounded-2xl border border-stone-200 bg-white p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Storyworth Review</p>
            <p class="mt-1 text-xs text-stone-500">A full honest look at Storyworth</p>
          </router-link>
          <router-link to="/storykeeper-vs-storyworth" class="rounded-2xl border border-stone-200 bg-white p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">StoryKeeper vs Storyworth</p>
            <p class="mt-1 text-xs text-stone-500">Another popular comparison</p>
          </router-link>
          <router-link to="/storyworth-alternative" class="rounded-2xl border border-stone-200 bg-white p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Storyworth Alternative</p>
            <p class="mt-1 text-xs text-stone-500">Why UK families look elsewhere</p>
          </router-link>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-[#1C1917] px-5 py-16 text-center sm:px-8 sm:py-20">
      <h2 class="font-display text-2xl font-bold text-white sm:text-3xl">Try Tell Me Your Story free</h2>
      <p class="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#A8A29E]">No subscription, no card needed. See how it compares for yourself.</p>
      <router-link to="/register" class="mt-8 inline-block rounded-full bg-[#C4A882] px-8 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Start free →</router-link>
      <p class="mt-4 text-xs text-[#9C7C5C]">5 questions free · One-time payment · Printed book from {{ printFrom }} plus UK shipping</p>
    </section>

  </main>
</template>

<script setup lang="ts">
import { useSeo } from '../composables/useSeo'
import { PRINTED_BOOK_FROM_PRICE } from '../lib/printPricing'

/** Update whenever the Storyworth facts below are re-checked. */
const CHECKED_ON = 'September 2026'

const printFrom = `£${PRINTED_BOOK_FROM_PRICE.toFixed(2)}`

const summaries = [
  { name: 'Storyworth', desc: 'Weekly questions by email or text on an annual plan, with a hardcover book included. The best-known name in the space — a US company with a UK site priced in pounds.', price: 'From £49 a year', featured: false },
  { name: 'Tell Me Your Story', desc: 'Built in the UK around voice: record answers on any plan and every recorded story gets its own QR code in the printed book. One-time payment.', price: '5 questions free · from £3.99', featured: true },
]

const comparisonRows = [
  { feature: 'Company',                  sw: 'US (UK site in £)',               tm: 'UK (Southampton)' },
  { feature: 'Try before you pay',       sw: '30-day money-back',               tm: '5 questions free' },
  { feature: 'How you pay',              sw: 'Annual plan',                     tm: 'One-time payment' },
  { feature: 'Question format',          sw: 'Weekly email or text (adjustable)', tm: 'Guided app, your own pace' },
  { feature: 'Voice recording',          sw: 'By phone, upgraded plans',        tm: '✓ Every plan' },
  { feature: 'Voice in printed book',    sw: 'One QR code, last page',          tm: 'QR code beside each story' },
  { feature: 'Printed book',             sw: '✓ Included in plan',              tm: `From ${printFrom} + shipping` },
  { feature: 'Hardcover option',         sw: '✓',                               tm: '✓' },
  { feature: 'Delivery to the UK',       sw: 'Printed US/Europe, shipping extra', tm: 'Delivered to UK addresses' },
  { feature: 'Photo support',            sw: '✓',                               tm: '✓' },
  { feature: 'AI help',                  sw: 'Guided interviews, proofreader',  tm: 'Writing assist' },
  { feature: 'Family involvement',       sw: 'Sharing, Family Calls',           tm: 'Invite family by link' },
  { feature: 'Tribute video export',     sw: '✗',                               tm: '✓' },
  { feature: 'When you pay',             sw: 'Upfront, for the year',           tm: 'Start free, pay when ready' },
]

const deepDive = [
  {
    label: 'About Storyworth',
    title: 'Storyworth — the market leader',
    paras: [
      'Storyworth is the best-known name in this space, and for good reason. A question arrives each week by email or text, the storyteller replies, and the answers are compiled into a hardcover book. It is simple, and it has worked well for a huge number of families.',
      'You pay upfront for a year, which some families find gives helpful structure. Others find the year goes by with only a handful of answers. Storyworth does let you change how often questions arrive, answer as many as you like, and keep editing after the year ends.',
      "Storyworth is a US company, but it sells to UK customers in pounds, with plans starting at £49 a year. Books are printed in the US and Europe; shipping outside the US is charged when you order, and import fees may apply.",
      "On upgraded plans, storytellers can record stories over the phone — even from a landline — and the recording is typed up for them. The printed book includes one QR code on the last page that opens the stories and recordings online for people on the family's sharing list.",
      'Storyworth also offers guided phone interviews that turn a conversation into a written story, and a built-in proofreader. It is a mature product that keeps evolving.',
    ],
  },
  {
    label: 'About Tell Me Your Story',
    title: 'Tell Me Your Story — built in the UK, with voice at the centre',
    paras: [
      'Tell Me Your Story was built around the idea that voice matters as much as the written word. Tap the microphone and talk; the words are typed up and the recording is kept. In the printed book, a QR code sits beside every voice-recorded story, so anyone holding the book can scan it and hear that exact story in their own voice.',
      `There's no annual plan. You start with 5 questions free, no card required, and go at your own pace. When you're ready, you pay once: digital plans start from £3.99 and a printed softcover starts from ${printFrom} plus UK shipping.`,
      'Printed books are made to order and delivered to UK addresses, typically within 10–14 days. Hardcover and dust-jacket options are available.',
      'Tell Me Your Story also offers a tribute video — turning photos, music and a message into a video keepsake, which many families use at a celebration of life or to share with relatives abroad.',
    ],
  },
]

const verdicts = [
  {
    name: 'Storyworth',
    price: 'From £49 a year',
    bestIf: [
      'You want a hardcover included in one upfront price',
      'You want a weekly question by email or text',
      'The storyteller would rather talk on the phone than use an app',
    ],
    considerOthers: [
      "You'd rather pay once than yearly",
      'You want voice recording without upgrading',
      'You want a QR code beside every recorded story',
    ],
  },
  {
    name: 'Tell Me Your Story',
    price: '5 questions free · from £3.99',
    bestIf: [
      "You'd rather pay once than commit to a yearly plan",
      'Hearing them speak matters — every recorded story gets its own QR code',
      'You want to try it properly first, free',
      'You want to go at your own pace, with no deadline',
    ],
    considerOthers: [
      'You specifically want questions emailed each week',
      'The storyteller strongly prefers email or phone to an app',
    ],
  },
]

// Shown on the page AND used for the FAQPage schema, so they always match.
const faqs = [
  { q: 'What is the main difference between Storyworth and Tell Me Your Story?', a: 'Storyworth is an annual plan built around weekly questions by email or text, with a hardcover included and phone voice recording on upgraded plans. Tell Me Your Story is a one-time payment: you answer in the app at your own pace, voice recording is on every plan, and every recorded story gets its own QR code in the printed book.' },
  { q: 'Is Tell Me Your Story cheaper than Storyworth?', a: `For one printed book, usually. Storyworth's UK plans start at £49 a year and include a hardcover. Tell Me Your Story is free to start, with one-time plans from £3.99 and printed softcovers from ${printFrom} plus UK shipping. If you want several hardcover copies, compare the per-copy prices for your order.` },
  { q: 'Does Storyworth offer voice recording?', a: 'Yes, on its upgraded plans — storytellers can record stories over the phone and they are transcribed. The printed book has one QR code on the last page linking to the stories and recordings online. Tell Me Your Story includes voice recording on every plan and prints a QR code beside each recorded story.' },
  { q: 'Is there a UK alternative to Storyworth?', a: 'Yes — Tell Me Your Story is built and run in the UK, priced in pounds, with printed books delivered to UK addresses, voice recording on every plan and no annual plan.' },
  { q: 'Can I try Tell Me Your Story before paying?', a: 'Yes. You can answer 5 questions free with no card required, and your answers are saved if you decide to upgrade.' },
]

useSeo({
  title: 'Storyworth vs Tell Me Your Story — Honest UK Comparison 2026',
  description: 'Storyworth vs Tell Me Your Story compared for UK families: price in pounds, voice recording, QR codes in the book, delivery, and annual plan vs one-time payment.',
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
</style>