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
          Storyworth is the best-known name in life story platforms. Tell Me Your Story is a UK-built alternative with voice recording and no subscription. Here's an honest, side-by-side look at how they compare.
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
        <div class="rounded-2xl border border-stone-200 bg-white overflow-hidden">
          <div class="grid grid-cols-3 bg-[#1C1917] px-4 py-3 text-xs font-semibold text-white gap-2">
            <div>Feature</div>
            <div class="text-center">Storyworth</div>
            <div class="text-center text-[#C4A882]">Tell Me Your Story</div>
          </div>
          <div v-for="(row, i) in comparisonRows" :key="row.feature"
            class="grid grid-cols-3 px-4 py-3 gap-2 text-xs border-t border-stone-100"
            :class="i % 2 === 0 ? 'bg-white' : 'bg-stone-50'">
            <div class="text-stone-700 font-medium">{{ row.feature }}</div>
            <div class="text-center" :class="row.sw === '✓' ? 'text-green-600' : row.sw === '✗' ? 'text-stone-300' : 'text-stone-600'">{{ row.sw }}</div>
            <div class="text-center font-medium" :class="row.tm === '✓' ? 'text-[#7C5C3B]' : row.tm === '✗' ? 'text-stone-300' : 'text-[#7C5C3B]'">{{ row.tm }}</div>
          </div>
        </div>
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
      <p class="mt-4 text-xs text-[#9C7C5C]">Free to start · One-time payment · Printed book from £{{ PRINTED_BOOK_FROM_PRICE.toFixed(2) }}</p>
    </section>

  </main>
</template>

<script setup lang="ts">
import { useSeo } from '../composables/useSeo'
import { PRINTED_BOOK_FROM_PRICE } from '../lib/printPricing'

const summaries = [
  { name: 'Storyworth', desc: 'Weekly email questions, annual subscription. The best-known name in life story platforms. US-based.', price: 'From ~£79/year', featured: false },
  { name: 'Tell Me Your Story', desc: 'UK-native with voice recording, QR codes in printed books, and no subscription. Free to start.', price: 'Free to start · from £3.99', featured: true },
]

const comparisonRows = [
  { feature: 'UK-based service',         sw: '✗',        tm: '✓' },
  { feature: 'Free to start',            sw: '✗',        tm: '✓' },
  { feature: 'Subscription required',    sw: 'Annual',   tm: 'No subscription' },
  { feature: 'Question format',          sw: 'Weekly email', tm: 'Guided app, your own pace' },
  { feature: 'Voice recording',          sw: 'Limited',  tm: '✓' },
  { feature: 'Voice in printed book',    sw: '✗',        tm: 'QR codes' },
  { feature: 'Printed book available',   sw: '✓',        tm: '✓' },
  { feature: 'Hardcover option',         sw: '✓',        tm: '✓' },
  { feature: 'UK printing & delivery',   sw: '✗',        tm: '✓' },
  { feature: 'Photo support',            sw: '✓',        tm: '✓' },
  { feature: 'AI writing assist',        sw: '✓',        tm: '✓' },
  { feature: 'Tribute video export',     sw: '✗',        tm: '✓' },
  { feature: 'One-time payment option',  sw: '✗',        tm: '✓' },
  { feature: 'Family collaboration',     sw: 'Limited',  tm: '✓' },
  { feature: 'Pay before or after writing', sw: 'Pay upfront for the year', tm: 'Start free, pay when ready to export' },
]

const deepDive = [
  {
    label: 'About Storyworth',
    title: 'Storyworth — the market leader',
    paras: [
      'Storyworth is the best-known name in this space, and for good reason. Their weekly email format — one question sent every week, answered by reply, compiled into a book at the end of the year — is simple and has worked well for a huge number of families since they launched.',
      'The annual subscription means you commit and pay upfront for the year, which some families find creates helpful structure and accountability. Others find that a year goes by, they\'ve only answered a handful of questions, and they\'ve still paid the full amount regardless.',
      'Storyworth is a US company. UK customers are billed in dollars, and the printed book ships from the US — meaning longer delivery times, international shipping costs, and occasional customs considerations that don\'t apply to a UK-printed alternative.',
      'There\'s no meaningful voice recording built into the core product. The finished book is written answers only — there\'s no way for a family member to actually hear their parent or grandparent\'s voice in the pages.',
      'Storyworth has recently added AI features — Magic Questions, Magic Editor, and Magic Designer — which suggest follow-up questions and help polish the writing. These are genuinely useful, and a sign the product is still actively evolving.',
    ]
  },
  {
    label: 'About Tell Me Your Story',
    title: 'Tell Me Your Story — built for UK families, with voice at the centre',
    paras: [
      'Tell Me Your Story was built specifically around the idea that voice matters as much as the written word. When someone records a voice answer instead of (or alongside) typing it, a QR code is automatically placed in the printed book next to that answer. Anyone holding the physical book can scan it and hear the person speak, in their actual voice. This is something Storyworth simply doesn\'t offer.',
      `There's no annual subscription. You start with 5 questions free, no card required, and work at your own pace — there's no pressure to keep up with a weekly schedule if life gets in the way for a few weeks. When you're ready to export or print, you pay once. Digital exports start from £3.99, and a printed softcover book starts from £${PRINTED_BOOK_FROM_PRICE.toFixed(2)}.`,
      'The printed book is produced in the UK by Lulu Press, with delivery typically within 10-14 days, no international shipping fees, and no customs delays — a meaningful difference for UK families compared to ordering from a US-based service.',
      'Beyond the book, Tell Me Your Story also offers a tribute video export — turning the same questions and answers into a video keepsake, which can be a more accessible format for some families, particularly for sharing at a celebration of life or with family who live abroad.',
    ]
  },
]

const verdicts = [
  {
    name: 'Storyworth',
    price: '~£79/year',
    bestIf: [
      'You want the weekly email format specifically',
      'Brand recognition and a large existing community matter to you',
      'The person you\'re capturing prefers email over an app',
    ],
    considerOthers: [
      'You\'re UK-based and want UK printing and delivery',
      'Hearing the person\'s actual voice matters to you',
      'You\'d rather not commit to an annual subscription',
    ]
  },
  {
    name: 'Tell Me Your Story',
    price: 'Free to start · from £3.99',
    bestIf: [
      'You\'re UK-based and want UK printing with no import costs',
      'Voice recording and hearing them speak matters',
      'You\'d rather pay once than commit to a yearly subscription',
      'You want flexibility to answer at your own pace',
    ],
    considerOthers: [
      'You specifically want a weekly email prompt rather than an app',
      'The person you\'re capturing strongly prefers email to any app or website',
    ]
  },
]

const faqs = [
  { q: 'What is the main difference between Storyworth and Tell Me Your Story?', a: 'Storyworth uses a weekly email format and an annual subscription, with no voice recording and US-based printing. Tell Me Your Story is a UK-built alternative that lets you start for free, includes voice recording with QR codes in the printed book, and uses a one-time payment instead of a subscription.' },
  { q: 'Is Tell Me Your Story cheaper than Storyworth?', a: `Storyworth costs roughly £79/year as a subscription. Tell Me Your Story is free to start, with digital exports from £3.99 and printed softcover books from £${PRINTED_BOOK_FROM_PRICE.toFixed(2)} — a one-time payment, with no renewal required.` },
  { q: 'Does Storyworth offer voice recording?', a: 'Storyworth\'s core product is built around written answers sent by email. Voice options are limited compared to Tell Me Your Story, which includes voice recording on all tiers and prints a QR code in the finished book so family can scan it and hear the recording.' },
  { q: 'Is there a UK alternative to Storyworth?', a: 'Yes — Tell Me Your Story is a UK-native platform built specifically for UK families, with UK printing and delivery, voice recording with QR codes in the printed book, and no subscription required.' },
  { q: 'Can I try Tell Me Your Story before paying, like a free trial?', a: 'Yes. Unlike Storyworth\'s annual subscription, Tell Me Your Story is free to start with no card required. You can try 5 questions free before deciding whether to upgrade. Your answers are always saved.' },
]

useSeo({
  title: 'Storyworth vs Tell Me Your Story — Honest Comparison 2026',
  description: 'Storyworth vs Tell Me Your Story compared: pricing, voice recording, UK printing, and subscription vs one-time payment. An honest look to help UK families choose.',
  canonical: 'https://tellmeyourstory.uk/storyworth-vs-tellmeyourstory',
  schema: {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'What is the main difference between Storyworth and Tell Me Your Story?', acceptedAnswer: { '@type': 'Answer', text: 'Storyworth uses a weekly email format and an annual subscription, with no voice recording and US-based printing. Tell Me Your Story is UK-built, free to start, includes voice recording with QR codes in the printed book, and uses a one-time payment.' } },
          { '@type': 'Question', name: 'Is Tell Me Your Story cheaper than Storyworth?', acceptedAnswer: { '@type': 'Answer', text: `Storyworth costs roughly £79/year. Tell Me Your Story is free to start, with printed books from £${PRINTED_BOOK_FROM_PRICE.toFixed(2)} as a one-time payment, no renewal required.` } },
          { '@type': 'Question', name: 'Is there a UK alternative to Storyworth?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — Tell Me Your Story is a UK-native platform with UK printing and delivery, voice recording with QR codes in the printed book, and no subscription.' } },
        ]
      }
    ]
  }
})
</script>

<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
</style>