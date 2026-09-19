<template>
  <main class="bg-white">

    <!-- Hero -->
    <section class="bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Remento vs Tell Me Your Story</p>
        <h1 class="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          Remento vs Tell Me Your Story<br>
          <em class="text-[#C4A882] italic">which is right for your family?</em>
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#A8A29E]">
          Remento turns spoken memories into a keepsake book using AI transcription. Tell Me Your Story is a UK alternative with no subscription and no upfront cost. Here's an honest, side-by-side look at how they compare.
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
          <router-link to="/remento-review" class="text-xs text-[#7C5C3B] underline hover:no-underline">Full Remento review →</router-link>
          <span class="text-xs text-stone-300">·</span>
          <router-link to="/remento-alternative" class="text-xs text-[#7C5C3B] underline hover:no-underline">Remento alternative →</router-link>
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
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Remento vs Tell Me Your Story</h2>
        </div>
        <div class="overflow-x-auto rounded-2xl border border-stone-200 bg-white">
          <div class="grid min-w-[480px] grid-cols-3 gap-2 bg-[#1C1917] px-4 py-3 text-xs font-semibold text-white">
            <div>Feature</div>
            <div class="text-center">Remento</div>
            <div class="text-center text-[#C4A882]">Tell Me Your Story</div>
          </div>
          <div v-for="(row, i) in comparisonRows" :key="row.feature"
            class="grid min-w-[480px] grid-cols-3 gap-2 border-t border-stone-100 px-4 py-3 text-xs"
            :class="i % 2 === 0 ? 'bg-white' : 'bg-stone-50'">
            <div class="text-stone-700 font-medium">{{ row.feature }}</div>
            <div class="text-center" :class="row.re === '✓' ? 'text-green-600' : row.re === '✗' ? 'text-stone-300' : 'text-stone-600'">{{ row.re }}</div>
            <div class="text-center font-medium" :class="row.tm === '✓' ? 'text-[#7C5C3B]' : row.tm === '✗' ? 'text-stone-300' : 'text-[#7C5C3B]'">{{ row.tm }}</div>
          </div>
        </div>
        <p class="mt-4 text-center text-xs leading-5 text-stone-500">
          Remento details checked {{ CHECKED_ON }} from
          <a href="https://www.remento.co/faq" target="_blank" rel="noopener noreferrer" class="underline hover:no-underline">Remento's FAQ</a>.
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
          <router-link to="/remento-review" class="rounded-2xl border border-stone-200 bg-white p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Remento Review</p>
            <p class="mt-1 text-xs text-stone-500">A full honest look at Remento</p>
          </router-link>
          <router-link to="/storyworth-vs-remento" class="rounded-2xl border border-stone-200 bg-white p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Storyworth vs Remento</p>
            <p class="mt-1 text-xs text-stone-500">Another popular comparison</p>
          </router-link>
          <router-link to="/remento-alternative" class="rounded-2xl border border-stone-200 bg-white p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Remento Alternative</p>
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
      <p class="mt-4 text-xs text-[#9C7C5C]">5 questions free · One-time payment · Printed book from {{ printFrom }} including UK delivery</p>
    </section>

  </main>
</template>

<script setup lang="ts">
import { useSeo } from '../composables/useSeo'
import { PRINTED_BOOK_FROM_PRICE } from '../lib/printPricing'

/** Update whenever the Remento facts below are re-checked. */
const CHECKED_ON = 'September 2026'

const printFrom = `£${PRINTED_BOOK_FROM_PRICE.toFixed(2)}`

const summaries = [
  { name: 'Remento', desc: 'Voice and video first: the storyteller records each answer from a link, and AI turns recordings into written stories. A colour hardcover is included. US company, priced in dollars.', price: '$99 a year (US dollars)', featured: false },
  { name: 'Tell Me Your Story', desc: 'Built in the UK. Type or speak each answer, with a QR code beside every recorded story in the printed book. One-time payment in pounds.', price: '5 questions free · from £3.99', featured: true },
]

const comparisonRows = [
  { feature: 'Company',                     re: 'US (priced in $)',           tm: 'UK (priced in £)' },
  { feature: 'Try before you pay',          re: '30-day money-back',          tm: '5 questions free' },
  { feature: 'How you pay',                 re: '$99/yr or $12/mo',           tm: 'One-time payment' },
  { feature: 'How they answer',             re: 'Voice or video',             tm: 'Type or voice' },
  { feature: 'Words in the book',           re: 'Transcript or AI narrative', tm: 'Their own words' },
  { feature: 'QR codes in printed book',    re: '✓ Each story',               tm: '✓ Each recorded story' },
  { feature: 'Printed book',                re: '✓ Hardcover included',       tm: `From ${printFrom} inc. UK delivery` },
  { feature: 'Extra copies',                re: '$69 each',                   tm: 'Same as first copy' },
  { feature: 'Digital copy',                re: 'Text/PDF export; e-book $49.99', tm: 'PDF on paid plans' },
  { feature: 'Family contributors',         re: '✓ Unlimited',                tm: '✓ Invite by link' },
  { feature: 'Extra storyteller',           re: 'Separate $99 purchase',      tm: 'Start another story' },
  { feature: 'Delivery to the UK',          re: 'From US, extra fee, ~3 weeks', tm: 'Delivered to UK addresses' },
  { feature: 'If you stop paying',          re: 'Keep access; no new recordings', tm: 'Nothing to renew' },
  { feature: 'Tribute video export',        re: '✗',                          tm: '✓' },
]

const deepDive = [
  {
    label: 'About Remento',
    title: 'Remento — record-first storytelling',
    paras: [
      "Remento's core idea is a good one: rather than asking someone to type out their life story, it has them speak it. The storyteller gets a prompt by email or text, taps a link and records a voice or video answer — no app, login or password. Remento's Speech-To-Story technology then turns the recording into text: either a cleaned-up word-for-word transcript, or a written narrative you can set to first or third person, short or detailed.",
      'That makes Remento a strong fit for people who find writing a chore. At the end of the year, stories and photos go into an 8×10 full-colour hardcover (up to 200 pages included), with a QR code for each story that plays the original recording.',
      'It costs $99 for the first year, billed in US dollars, covering one storyteller with unlimited family collaborators. Renewing ($99 a year or $12 a month) is only needed to record new stories — if you stop, you can still read, listen, download everything and order copies.',
      'Costs to know: extra copies are $69 each, books over 200 pages are $30 more, and a designed e-book is $49.99 (stories can also be exported as text or PDF). Books ship to the UK from the US for an extra fee and typically arrive in about three weeks.',
    ],
  },
  {
    label: 'About Tell Me Your Story',
    title: 'Tell Me Your Story — type or speak, pay once',
    paras: [
      'Tell Me Your Story gives the storyteller the choice: type an answer, record it by voice, or both. Some questions feel natural to talk through; others are easier to sit and write properly.',
      'Like Remento, every voice-recorded story gets a QR code printed beside it in the book, so anyone holding it can scan and hear the voice behind the words. The printed text is their own words — writing help is there if they want it, but nothing is rewritten for them.',
      `There's no yearly plan. You start free with 5 questions, go at your own pace, and pay once in pounds — digital plans from £3.99, printed softcovers from ${printFrom} including UK delivery.`,
      'Printed books are made to order and delivered to UK addresses, typically within 10–14 days.',
    ],
  },
]

const verdicts = [
  {
    name: 'Remento',
    price: '$99 a year',
    bestIf: [
      'The storyteller strongly prefers speaking (or video) over writing',
      'You like AI turning recordings into polished chapters',
      'You want a colour hardcover included in one price',
    ],
    considerOthers: [
      "You'd rather pay once, in pounds",
      'You want the choice to type some answers',
      'You want the printed text to be their own words, with no AI retelling option to manage',
    ],
  },
  {
    name: 'Tell Me Your Story',
    price: '5 questions free · from £3.99',
    bestIf: [
      'You want the choice to type or record, question by question',
      "You'd rather pay once than commit to a yearly or monthly plan",
      'You want to try it free before paying',
      'You want their own words in the book, with a QR code beside each recording',
    ],
    considerOthers: [
      'The storyteller wants to record video, not just voice',
      'You want AI to write polished chapters from recordings automatically',
    ],
  },
]

// Shown on the page AND used for the FAQPage schema, so they always match.
const faqs = [
  { q: 'What is the main difference between Remento and Tell Me Your Story?', a: 'Remento is a yearly plan in US dollars where the storyteller records every answer by voice or video, and AI turns recordings into text. Tell Me Your Story is a one-time payment in pounds where the storyteller can type or speak each answer, and every recorded story gets a QR code in the printed book.' },
  { q: 'Is Tell Me Your Story cheaper than Remento?', a: `For one printed book, usually. Remento is $99 for the first year with a colour hardcover included, and UK shipping is extra; extra copies are $69. Tell Me Your Story is free to start, with one-time plans from £3.99 and printed softcovers from ${printFrom} including UK delivery.` },
  { q: 'Can the storyteller type answers on Remento?', a: 'Remento is built around recording each answer by voice or video; the written text is created from the recording and can be edited afterwards. Tell Me Your Story lets the storyteller type or record any answer.' },
  { q: 'What happens to my Remento stories if I do not renew?', a: 'According to Remento, you can still read your stories, listen to recordings, download everything and order more copies — you just cannot record new stories until you renew.' },
  { q: 'Is there a UK alternative to Remento?', a: 'Yes — Tell Me Your Story is built and run in the UK, priced in pounds, with printed books delivered to UK addresses, voice recording with a QR code beside every recorded story, and no yearly plan.' },
]

useSeo({
  title: 'Remento vs Tell Me Your Story — Honest UK Comparison 2026',
  description: 'Remento vs Tell Me Your Story compared for UK families: dollars vs pounds, voice-only vs type or speak, AI writing, QR codes, UK delivery and yearly plan vs one-time payment.',
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