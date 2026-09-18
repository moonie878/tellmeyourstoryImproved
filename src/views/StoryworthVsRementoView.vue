<template>
  <main class="bg-white">

    <!-- Hero -->
    <section class="bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Storyworth vs Remento</p>
        <h1 class="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          Storyworth vs Remento<br>
          <em class="text-[#C4A882] italic">an honest comparison</em>
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#A8A29E]">
          Both Storyworth and Remento help families capture life stories. They do it differently, at different price points, with different strengths. This guide compares them honestly — and includes Tell Me Your Story as a UK-native alternative worth considering.
        </p>
      </div>
    </section>

    <!-- Quick summary -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Quick summary</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Who are they for?</h2>
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
          <router-link to="/storyworth-review" class="text-xs text-[#7C5C3B] underline hover:no-underline">Full Storyworth review →</router-link>
          <span class="text-xs text-stone-300">·</span>
          <router-link to="/remento-review" class="text-xs text-[#7C5C3B] underline hover:no-underline">Full Remento review →</router-link>
          <span class="text-xs text-stone-300">·</span>
          <router-link to="/storykeeper-vs-storyworth" class="text-xs text-[#7C5C3B] underline hover:no-underline">StoryKeeper vs Storyworth →</router-link>
        </div>
      </div>
    </section>

    <!-- Comparison table -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="text-center mb-10">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Feature comparison</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Storyworth vs Remento vs Tell Me Your Story</h2>
        </div>
        <div class="overflow-x-auto rounded-2xl border border-stone-200 bg-white">
          <div class="grid min-w-[620px] grid-cols-4 gap-2 bg-[#1C1917] px-4 py-3 text-xs font-semibold text-white">
            <div>Feature</div>
            <div class="text-center">Storyworth</div>
            <div class="text-center">Remento</div>
            <div class="text-center text-[#C4A882]">Tell Me Your Story</div>
          </div>
          <div v-for="(row, i) in comparisonRows" :key="row.feature"
            class="grid min-w-[620px] grid-cols-4 gap-2 border-t border-stone-100 px-4 py-3 text-xs"
            :class="i % 2 === 0 ? 'bg-white' : 'bg-stone-50'">
            <div class="text-stone-700 font-medium">{{ row.feature }}</div>
            <div class="text-center" :class="row.sw === '✓' ? 'text-green-600' : row.sw === '✗' ? 'text-stone-300' : 'text-stone-600'">{{ row.sw }}</div>
            <div class="text-center" :class="row.re === '✓' ? 'text-green-600' : row.re === '✗' ? 'text-stone-300' : 'text-stone-600'">{{ row.re }}</div>
            <div class="text-center font-medium" :class="row.tm === '✓' ? 'text-[#7C5C3B]' : row.tm === '✗' ? 'text-stone-300' : 'text-[#7C5C3B]'">{{ row.tm }}</div>
          </div>
        </div>
        <p class="mt-4 text-center text-xs leading-5 text-stone-500">
          Details checked {{ CHECKED_ON }} from
          <a href="https://welcome.storyworth.com/gb/faq" target="_blank" rel="noopener noreferrer" class="underline hover:no-underline">Storyworth's UK FAQ</a>
          and <a href="https://www.remento.co/faq" target="_blank" rel="noopener noreferrer" class="underline hover:no-underline">Remento's FAQ</a>.
          Check their sites for current prices before you buy.
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

    <!-- Who should choose what -->
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
          <router-link to="/storyworth-review" class="rounded-2xl border border-stone-200 bg-white p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Storyworth Review</p>
            <p class="mt-1 text-xs text-stone-500">A full honest look at Storyworth</p>
          </router-link>
          <router-link to="/remento-review" class="rounded-2xl border border-stone-200 bg-white p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Remento Review</p>
            <p class="mt-1 text-xs text-stone-500">A full honest look at Remento</p>
          </router-link>
          <router-link to="/storykeeper-vs-storyworth" class="rounded-2xl border border-stone-200 bg-white p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">StoryKeeper vs Storyworth</p>
            <p class="mt-1 text-xs text-stone-500">Another popular comparison</p>
          </router-link>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-[#1C1917] px-5 py-16 text-center sm:px-8 sm:py-20">
      <h2 class="font-display text-2xl font-bold text-white sm:text-3xl">Try Tell Me Your Story free</h2>
      <p class="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#A8A29E]">No subscription, no card needed. Start capturing a life story today and see the difference for yourself.</p>
      <router-link to="/register" class="mt-8 inline-block rounded-full bg-[#C4A882] px-8 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Start free →</router-link>
      <p class="mt-4 text-xs text-[#9C7C5C]">5 questions free · One-time payment · Printed book from {{ printFrom }} plus UK shipping</p>
    </section>

  </main>
</template>

<script setup lang="ts">
import { useSeo } from '../composables/useSeo'
import { PRINTED_BOOK_FROM_PRICE } from '../lib/printPricing'

/** Update whenever the Storyworth / Remento facts below are re-checked. */
const CHECKED_ON = 'September 2026'

const printFrom = `£${PRINTED_BOOK_FROM_PRICE.toFixed(2)}`

const summaries = [
  { name: 'Storyworth', desc: 'Weekly questions by email or text on an annual plan, with a hardcover included. The best-known brand in the space — a US company with a UK site priced in pounds.', price: 'From £49 a year', featured: false },
  { name: 'Remento', desc: 'Voice and video first: the storyteller answers weekly prompts by speaking, and AI turns the recordings into written stories. US-based; ships books to the UK for an extra fee.', price: '$99 a year (US dollars)', featured: false },
  { name: 'Tell Me Your Story', desc: 'Built in the UK. Type or speak your answers at your own pace, with a QR code beside every recorded story in the printed book. One-time payment.', price: '5 questions free · from £3.99', featured: true },
]

const comparisonRows = [
  { feature: 'Company',                  sw: 'US (UK site in £)',          re: 'US (priced in $)',         tm: 'UK' },
  { feature: 'Free to start',            sw: '✗',                          re: '✗',                        tm: '✓ 5 questions' },
  { feature: 'How you pay',              sw: 'Annual plan',                re: 'Annual plan',              tm: 'One-time payment' },
  { feature: 'How they answer',          sw: 'Write; phone on upgraded plans', re: 'Speak or video',       tm: 'Type or speak' },
  { feature: 'Voice in printed book',    sw: 'One QR code, last page',     re: 'QR codes in the book',     tm: 'QR code beside each story' },
  { feature: 'Printed book',             sw: '✓ Included',                 re: '✓ Included',               tm: `From ${printFrom} + shipping` },
  { feature: 'Hardcover',                sw: '✓',                          re: '✓',                        tm: '✓' },
  { feature: 'Delivery to the UK',       sw: 'Shipping extra',             re: 'Shipping extra, ~3 weeks', tm: 'Delivered to UK addresses' },
  { feature: 'Photo support',            sw: '✓',                          re: '✓',                        tm: '✓' },
  { feature: 'AI help',                  sw: 'Interviews, proofreader',    re: 'Speech-to-Story',          tm: 'Writing assist' },
  { feature: 'Guided questions',         sw: '✓',                          re: '✓',                        tm: '✓' },
  { feature: 'Family involvement',       sw: 'Sharing, Family Calls',      re: 'Unlimited collaborators',  tm: 'Invite family by link' },
  { feature: 'Tribute video export',     sw: '✗',                          re: '✗',                        tm: '✓' },
]

const deepDive = [
  {
    label: 'How Storyworth works',
    title: 'Storyworth — the email approach',
    paras: [
      'Storyworth sends a question each week by email or text. The storyteller replies, and the answers build up into a hardcover book, which is included in the plan.',
      "The weekly routine is Storyworth's biggest strength — it's gentle and low-pressure, and it suits people who would never sit down to fill in a questionnaire. You can change how often questions arrive and answer as many as you like.",
      'Storyworth sells to UK customers in pounds, from £49 a year. Books are printed in the US and Europe; shipping outside the US is charged when you order, and import fees may apply. On upgraded plans, storytellers can record by phone — even from a landline — and the book includes one QR code on the last page linking to the stories and recordings online.',
      'Storyworth suits families where the storyteller is comfortable with email, a hardcover included in one price appeals, and a year-long plan fits.',
    ],
  },
  {
    label: 'How Remento works',
    title: 'Remento — the voice-first approach',
    paras: [
      "Remento's core idea is voice. The storyteller answers weekly prompts by recording their voice or video — no app to download — and Remento's Speech-to-Story technology turns the recording into a written story, either close to word-for-word or as a polished narrative.",
      'It works well for people who find typing hard but speak easily. The finished hardcover includes QR codes that play the original recordings, which is a lovely touch.',
      'Remento costs $99 a year, billed in US dollars, with one hardcover included. Books ship from the US; UK delivery is charged extra and typically takes around three weeks, with no customs charges on arrival.',
      'Remento suits families where the storyteller prefers speaking to typing, AI-written chapters appeal, and paying yearly in dollars is fine.',
    ],
  },
  {
    label: 'How Tell Me Your Story compares',
    title: 'Tell Me Your Story — the UK option',
    paras: [
      'Tell Me Your Story combines guided questions (like Storyworth) with voice recording (like Remento). Storytellers can type or speak each answer, and every voice-recorded story gets its own QR code beside it in the printed book, so family can scan it and hear that exact story in their own voice.',
      'There is no annual plan. You start with 5 questions free, no card needed, and pay once when you are ready — digital plans from £3.99, printed softcovers from ' + printFrom + ' plus UK shipping.',
      'Printed books are made to order and delivered to UK addresses, typically within 10–14 days. Hardcover and dust-jacket options are available.',
      'Tell Me Your Story suits UK families who want voice and a printed book together, prefer paying once in pounds, and want to go at their own pace.',
    ],
  },
]

const verdicts = [
  {
    name: 'Storyworth',
    price: 'From £49 a year',
    bestIf: [
      'You want a gentle weekly question by email or text',
      'You want a hardcover included in one price',
      'The storyteller is comfortable writing, or prefers the phone',
    ],
    considerOthers: [
      'You want voice recording without upgrading',
      "You'd rather pay once than yearly",
      'You want a QR code beside every recorded story',
    ],
  },
  {
    name: 'Remento',
    price: '$99 a year',
    bestIf: [
      'The storyteller prefers speaking (or video) to typing',
      'You like AI turning recordings into polished chapters',
      'A hardcover included in one price appeals',
    ],
    considerOthers: [
      "You'd rather pay once, in pounds",
      'You want the option to type answers as well as speak',
      'You want to try it free before paying',
    ],
  },
  {
    name: 'Tell Me Your Story',
    price: '5 questions free · from £3.99',
    bestIf: [
      'You want to type or speak — whichever suits each answer',
      'You want a QR code beside every recorded story',
      'You prefer a one-time payment in pounds',
    ],
    considerOthers: [
      'You specifically want questions emailed each week',
      'The storyteller would rather use email or the phone than an app',
    ],
  },
]

// Shown on the page AND used for the FAQPage schema, so they always match.
const faqs = [
  { q: 'Is Storyworth available in the UK?', a: 'Yes. Storyworth sells to UK customers in pounds, with plans from £49 a year. Books are printed in the US and Europe, shipping outside the US is charged when you order, and import fees may apply.' },
  { q: 'Is Remento available in the UK?', a: 'Yes. Remento accepts UK customers and ships printed books to the UK for an extra fee. Pricing is in US dollars ($99 a year), and international deliveries typically arrive within about three weeks.' },
  { q: 'What is the main difference between Storyworth and Remento?', a: 'Storyworth is built around weekly questions answered in writing, with phone recording on upgraded plans. Remento is voice and video first, with AI turning recordings into written stories and QR codes in the book that play them. Both are annual plans that include a hardcover.' },
  { q: 'Which is cheaper — Storyworth or Remento?', a: "For UK buyers, Storyworth's entry plan is cheaper at £49 a year, but it is written answers with a black-and-white book. Remento is $99 a year. Both charge extra for UK shipping. Tell Me Your Story is free to start, with one-time plans from £3.99 and printed books from " + printFrom + ' plus UK shipping.' },
  { q: 'Is there a UK alternative to Storyworth and Remento?', a: 'Yes — Tell Me Your Story is built and run in the UK, priced in pounds, with guided questions, voice recording on every plan, a QR code beside every recorded story in the printed book, and a one-time payment.' },
]

useSeo({
  title: 'Storyworth vs Remento (2026) — Honest UK Comparison',
  description: 'Storyworth vs Remento compared for UK families: how they work, prices in pounds and dollars, voice recording, QR codes and UK delivery — plus a UK alternative.',
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