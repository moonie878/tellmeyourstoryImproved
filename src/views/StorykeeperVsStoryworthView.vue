<template>
  <main class="bg-white">

    <!-- Hero -->
    <section class="bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">StoryKeeper vs Storyworth</p>
        <h1 class="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          StoryKeeper vs Storyworth<br>
          <em class="text-[#C4A882] italic">an honest comparison</em>
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#A8A29E]">
          StoryKeeper and Storyworth are two of the most searched life story platforms. They're more similar than different — but the differences matter depending on what you need. This guide compares them honestly, with a UK perspective.
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
        <div class="mt-10 grid gap-5 sm:grid-cols-3">
          <div v-for="summary in summaries" :key="summary.name" class="rounded-2xl border p-6 text-center"
            :class="summary.featured ? 'border-[#7C5C3B] bg-[#FAF7F4]' : 'border-stone-200'">
            <p v-if="summary.featured" class="text-[10px] font-semibold uppercase tracking-wider text-[#7C5C3B] mb-2">UK alternative</p>
            <p class="font-display text-lg font-bold text-stone-900">{{ summary.name }}</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">{{ summary.desc }}</p>
            <p class="mt-3 text-xs font-semibold text-stone-700">{{ summary.price }}</p>
          </div>
        </div>
        <div class="mt-6 flex flex-wrap justify-center gap-3">
          <router-link to="/storykeeper-review" class="text-xs text-[#7C5C3B] underline hover:no-underline">Full StoryKeeper review →</router-link>
          <span class="text-xs text-stone-300">·</span>
          <router-link to="/storyworth-review" class="text-xs text-[#7C5C3B] underline hover:no-underline">Full Storyworth review →</router-link>
          <span class="text-xs text-stone-300">·</span>
          <router-link to="/storyworth-vs-remento" class="text-xs text-[#7C5C3B] underline hover:no-underline">Storyworth vs Remento →</router-link>
        </div>
      </div>
    </section>

    <!-- Comparison table -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="text-center mb-10">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Feature comparison</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">StoryKeeper vs Storyworth vs Tell Me Your Story</h2>
        </div>
        <div class="rounded-2xl border border-stone-200 bg-white overflow-hidden">
          <div class="grid grid-cols-4 bg-[#1C1917] px-4 py-3 text-xs font-semibold text-white gap-2">
            <div>Feature</div>
            <div class="text-center">StoryKeeper</div>
            <div class="text-center">Storyworth</div>
            <div class="text-center text-[#C4A882]">Tell Me Your Story</div>
          </div>
          <div v-for="(row, i) in comparisonRows" :key="row.feature"
            class="grid grid-cols-4 px-4 py-3 gap-2 text-xs border-t border-stone-100"
            :class="i % 2 === 0 ? 'bg-white' : 'bg-stone-50'">
            <div class="text-stone-700 font-medium">{{ row.feature }}</div>
            <div class="text-center" :class="row.sk === '✓' ? 'text-green-600' : row.sk === '✗' ? 'text-stone-300' : 'text-stone-600'">{{ row.sk }}</div>
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
      <div class="mx-auto max-w-4xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Our verdict</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Which should you choose?</h2>
        </div>
        <div class="mt-10 grid gap-5 sm:grid-cols-3">
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
          <router-link to="/storykeeper-review" class="rounded-2xl border border-stone-200 bg-white p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">StoryKeeper Review</p>
            <p class="mt-1 text-xs text-stone-500">A full honest look at StoryKeeper</p>
          </router-link>
          <router-link to="/storyworth-review" class="rounded-2xl border border-stone-200 bg-white p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Storyworth Review</p>
            <p class="mt-1 text-xs text-stone-500">A full honest look at Storyworth</p>
          </router-link>
          <router-link to="/storyworth-vs-remento" class="rounded-2xl border border-stone-200 bg-white p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Storyworth vs Remento</p>
            <p class="mt-1 text-xs text-stone-500">Another popular comparison</p>
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
  { name: 'StoryKeeper', desc: 'Guided questions and printed book. UK subdomain available. Smaller and less established than Storyworth.', price: 'Subscription model', featured: false },
  { name: 'Storyworth', desc: 'Weekly email questions, annual subscription. The best-known name in life story platforms. US-focused.', price: 'From ~£79/year', featured: false },
  { name: 'Tell Me Your Story', desc: 'UK-native with voice recording, QR codes in printed books, and no subscription. Free to start.', price: 'Free to start · from £3.99', featured: true },
]

const comparisonRows = [
  { feature: 'UK-based service',         sk: 'UK subdomain',   sw: '✗',        tm: '✓' },
  { feature: 'Free to start',            sk: '✗',              sw: '✗',        tm: '✓' },
  { feature: 'Subscription required',    sk: 'Yes',            sw: 'Annual',   tm: 'No subscription' },
  { feature: 'Voice recording',          sk: '✗',              sw: 'Limited',  tm: '✓' },
  { feature: 'Voice in printed book',    sk: '✗',              sw: '✗',        tm: 'QR codes' },
  { feature: 'Printed book available',   sk: '✓',              sw: '✓',        tm: '✓' },
  { feature: 'Hardcover option',         sk: '✓',              sw: '✓',        tm: '✓' },
  { feature: 'UK printing & delivery',   sk: '✗',              sw: '✗',        tm: '✓' },
  { feature: 'Photo support',            sk: '✓',              sw: '✓',        tm: '✓' },
  { feature: 'AI writing assist',        sk: '✓',              sw: '✓',        tm: '✓' },
  { feature: 'Tribute video export',     sk: '✗',              sw: '✗',        tm: '✓' },
  { feature: 'One-time payment option',  sk: '✗',              sw: '✗',        tm: '✓' },
  { feature: 'Family collaboration',     sk: 'Limited',        sw: 'Limited',  tm: '✓' },
]

const deepDive = [
  {
    label: 'About StoryKeeper',
    title: 'StoryKeeper — guided questions and printed books',
    paras: [
      'StoryKeeper follows a similar model to Storyworth — guided questions that prompt the user to write about their life, with answers compiled into a printed book. They have a UK subdomain (storykeeper.com/uk) which gives them some visibility in UK search results.',
      'In practice, StoryKeeper is a smaller and less established platform than Storyworth. Their content output is thin — their blog has only a handful of posts, updated infrequently — and they have a very limited social media presence. The product itself is functional but without the brand recognition that Storyworth has built over many years.',
      'StoryKeeper does not offer voice recording, and their printed book is not produced in the UK. For UK families, this means the same shipping considerations that apply to Storyworth apply here too.',
    ]
  },
  {
    label: 'About Storyworth',
    title: 'Storyworth — the best-known name in the space',
    paras: [
      'Storyworth is the market leader in life story platforms, at least by brand recognition. Their weekly email format — one question per week, answered by email, compiled into a book at year end — is simple, effective, and has worked well for hundreds of thousands of families since they launched.',
      'The annual subscription model means you pay upfront for the year regardless of how actively you use the service. Some families find this creates helpful accountability; others find they\'ve paid for a year and only answered a handful of questions.',
      'Storyworth is a US company. UK customers pay in dollars, and the printed book ships from the US. Delivery times and costs are higher than a UK-printed alternative, and there\'s no voice recording — the finished book contains written answers only.',
      'Storyworth recently added AI features (Magic Questions, Magic Editor, Magic Designer) that suggest questions based on what\'s already been answered and help polish the finished book. These are genuinely useful additions.',
    ]
  },
  {
    label: 'The UK alternative',
    title: 'Tell Me Your Story — built for UK families',
    paras: [
      'Tell Me Your Story was built specifically for UK families who want voice recording alongside written answers, UK printing and delivery, and a one-time payment rather than an annual subscription.',
      'The most distinctive feature is voice recording with QR codes. When someone records a voice answer, a QR code is automatically included in the printed book next to that answer. Family members scan it and hear them speak — their actual voice, preserved in the pages of a physical book. Neither StoryKeeper nor Storyworth offers this.',
      `The pricing model is also different. You can start for free with no card required. When you're ready to export or print, you pay once — from £3.99 for a digital export, from £${PRINTED_BOOK_FROM_PRICE.toFixed(2)} for a printed book. No annual renewal, no subscription running in the background.`,
      'The printed book is produced in the UK by Lulu Press and delivered within 10-14 days, with no international shipping costs or customs complications.',
    ]
  },
]

const verdicts = [
  {
    name: 'StoryKeeper',
    price: 'Subscription',
    bestIf: [
      'You\'ve seen it specifically recommended',
      'Their specific question set suits your needs',
    ],
    considerOthers: [
      'You want UK printing and delivery',
      'Voice recording matters to you',
      'You prefer no subscription',
    ]
  },
  {
    name: 'Storyworth',
    price: '~£79/year',
    bestIf: [
      'You want the weekly email format',
      'Brand recognition matters',
      'The person prefers email to an app',
    ],
    considerOthers: [
      'You\'re UK-based and want UK printing',
      'Voice is important to you',
      'You don\'t want an annual subscription',
    ]
  },
  {
    name: 'Tell Me Your Story',
    price: 'Free to start · from £3.99',
    bestIf: [
      'You\'re UK-based',
      'Voice in the printed book matters',
      'You want no subscription',
    ],
    considerOthers: [
      'You specifically want weekly email prompts',
      'The person prefers email to an app',
    ]
  },
]

const faqs = [
  { q: 'What is the difference between StoryKeeper and Storyworth?', a: 'Both use guided questions to help families capture life stories and compile them into a printed book. Storyworth is much better known, uses a weekly email format, and has a larger user base. StoryKeeper is smaller and less established. Neither offers voice recording. Both are subscription-based.' },
  { q: 'Which is better — StoryKeeper or Storyworth?', a: 'For most UK families, Storyworth has the advantage of brand recognition and a larger community. However, both have significant limitations for UK users — US-based printing, no voice recording, and annual subscriptions. Tell Me Your Story is a UK-native alternative that addresses all three.' },
  { q: 'Is StoryKeeper available in the UK?', a: 'StoryKeeper has a UK subdomain (storykeeper.com/uk) but is not a UK company and does not print books in the UK. UK users face the same shipping considerations as with Storyworth.' },
  { q: 'Is there a UK alternative to StoryKeeper and Storyworth?', a: 'Yes — Tell Me Your Story is a UK-native platform with guided questions, voice recording with QR codes in the printed book, UK printing and delivery, and a one-time payment model with no subscription.' },
  { q: 'Do StoryKeeper or Storyworth offer voice recording?', a: 'No. Neither StoryKeeper nor Storyworth include voice recording as a standard feature. Tell Me Your Story includes voice recording in the free tier, with QR codes printed in the physical book so family can hear the voice recordings.' },
]

useSeo({
  title: 'StoryKeeper vs Storyworth — Honest Comparison 2026 | Tell Me Your Story',
  description: 'An honest comparison of StoryKeeper vs Storyworth — how they work, what they cost, what they\'re missing, and which is right for UK families. Plus a UK-native alternative.',
  canonical: 'https://tellmeyourstory.uk/storykeeper-vs-storyworth',
  schema: {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'What is the difference between StoryKeeper and Storyworth?', acceptedAnswer: { '@type': 'Answer', text: 'Both use guided questions and compile them into printed books. Storyworth is better known and uses a weekly email format. StoryKeeper is smaller. Neither offers voice recording. Both are subscription-based.' } },
          { '@type': 'Question', name: 'Is there a UK alternative to StoryKeeper and Storyworth?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — Tell Me Your Story is a UK-native platform with voice recording, QR codes in the printed book, UK printing, and a one-time payment model.' } },
          { '@type': 'Question', name: 'Do StoryKeeper or Storyworth offer voice recording?', acceptedAnswer: { '@type': 'Answer', text: 'No. Tell Me Your Story includes voice recording in the free tier with QR codes printed in the physical book.' } },
        ]
      }
    ]
  }
})
</script>

<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
</style>