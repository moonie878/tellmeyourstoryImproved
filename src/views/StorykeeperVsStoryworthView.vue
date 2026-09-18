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
          StoryKeeper and Storyworth are two of the most searched life story services in the UK. One is a one-time payment with voice and video; the other is an annual plan built around weekly questions. Here's an honest comparison, with prices in pounds.
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
        <div class="overflow-x-auto rounded-2xl border border-stone-200 bg-white">
          <div class="grid min-w-[640px] grid-cols-4 gap-2 bg-[#1C1917] px-4 py-3 text-xs font-semibold text-white">
            <div>Feature</div>
            <div class="text-center">StoryKeeper</div>
            <div class="text-center">Storyworth</div>
            <div class="text-center text-[#C4A882]">Tell Me Your Story</div>
          </div>
          <div v-for="(row, i) in comparisonRows" :key="row.feature"
            class="grid min-w-[640px] grid-cols-4 gap-2 border-t border-stone-100 px-4 py-3 text-xs"
            :class="i % 2 === 0 ? 'bg-white' : 'bg-stone-50'">
            <div class="text-stone-700 font-medium">{{ row.feature }}</div>
            <div class="text-center" :class="row.sk === '✓' ? 'text-green-600' : row.sk === '✗' ? 'text-stone-300' : 'text-stone-600'">{{ row.sk }}</div>
            <div class="text-center" :class="row.sw === '✓' ? 'text-green-600' : row.sw === '✗' ? 'text-stone-300' : 'text-stone-600'">{{ row.sw }}</div>
            <div class="text-center font-medium" :class="row.tm === '✓' ? 'text-[#7C5C3B]' : row.tm === '✗' ? 'text-stone-300' : 'text-[#7C5C3B]'">{{ row.tm }}</div>
          </div>
        </div>
        <p class="mt-4 text-center text-xs leading-5 text-stone-500">
          Details checked {{ CHECKED_ON }} from
          <a href="https://storykeeper.com/uk/" target="_blank" rel="noopener noreferrer" class="underline hover:no-underline">StoryKeeper UK</a>
          and <a href="https://welcome.storyworth.com/gb/faq" target="_blank" rel="noopener noreferrer" class="underline hover:no-underline">Storyworth's UK FAQ</a>.
          Prices and features change — check their sites before you buy.
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
      <p class="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#A8A29E]">Answer 5 questions free, no card needed. See how it compares for yourself.</p>
      <router-link to="/register" class="mt-8 inline-block rounded-full bg-[#C4A882] px-8 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Start free →</router-link>
      <p class="mt-4 text-xs text-[#9C7C5C]">5 questions free · One-time payment · Printed book from {{ printFrom }} plus UK shipping</p>
    </section>

  </main>
</template>

<script setup lang="ts">
import { useSeo } from '../composables/useSeo'
import { PRINTED_BOOK_FROM_PRICE } from '../lib/printPricing'

/** Update whenever the StoryKeeper / Storyworth facts below are re-checked. */
const CHECKED_ON = 'September 2026'

const printFrom = `£${PRINTED_BOOK_FROM_PRICE.toFixed(2)}`

const summaries = [
  { name: 'StoryKeeper', desc: 'London-based. Pay once, no deadline: write, dictate, or record audio or video, with a QR code per chapter. A5 hardcover and free UK delivery included.', price: 'From £79, one-time', featured: false },
  { name: 'Storyworth', desc: 'The best-known name. Weekly questions by email or text on an annual plan, with a hardcover included. US company with a UK site priced in pounds.', price: 'From £49 a year', featured: false },
  { name: 'Tell Me Your Story', desc: 'Built in the UK. Try 5 questions free, then pay once from £3.99. Type or speak each answer, with a QR code beside every recorded story. Print only if you want to.', price: '5 questions free · from £3.99', featured: true },
]

const comparisonRows = [
  { feature: 'Based in',                 sk: 'UK (London)',             sw: 'US (UK site in £)',           tm: 'UK (Southampton)' },
  { feature: 'How you pay',              sk: 'One-time',                sw: 'Annual plan',                 tm: 'One-time' },
  { feature: 'Entry price',              sk: '£79',                     sw: '£49/yr',                      tm: 'Free, then from £3.99' },
  { feature: 'Try before you pay',       sk: '60-day money-back',       sw: '30-day money-back',           tm: '5 questions free' },
  { feature: 'Time limit',               sk: 'None',                    sw: 'Plan year (+ edit time)',     tm: 'None' },
  { feature: 'How they answer',          sk: 'Write, dictate, audio, video', sw: 'Write; phone on upgraded plans', tm: 'Type or voice' },
  { feature: 'Phone-call recording',     sk: 'Plus plan (£99)',         sw: 'Upgraded plans',              tm: '✗' },
  { feature: 'Voice in printed book',    sk: 'QR code per chapter',     sw: 'One QR code, last page',      tm: 'QR code per recorded story' },
  { feature: 'Printed book',             sk: '✓ Hardcover included',    sw: '✓ Hardcover included',        tm: `From ${printFrom} + shipping` },
  { feature: 'Delivery to the UK',       sk: 'Free',                    sw: 'Charged at checkout',         tm: 'UK shipping extra' },
  { feature: 'Family contributors',      sk: 'Plus plan: unlimited',    sw: 'Sharing, Family Calls',       tm: 'Invite by link' },
  { feature: 'Tribute video export',     sk: '✗',                       sw: '✗',                           tm: '✓' },
]

const deepDive = [
  {
    label: 'About StoryKeeper',
    title: 'StoryKeeper — pay once, speak or write',
    paras: [
      'StoryKeeper is a London-based service that has printed more than 12,000 books. Prompts arrive weekly, or the storyteller can pick any question whenever they like. They can write, dictate, or record audio or video online, and each chapter in the printed book can carry a QR code that plays the original recording.',
      'It is a one-time payment with no deadline. StoryKeeper Classic (£79) includes one A5 hardcover and one storyteller. StoryKeeper Plus (£99) adds a second hardcover, unlimited contributors, a phone-call recording service and photo colourisation. Delivery is free, books can run to 500 pages, and there is a 60-day money-back guarantee.',
      'Writing support is available, but StoryKeeper says nothing changes without the storyteller approving it. It is a strong, well-reviewed option for UK families who want a hardcover included in the price.',
    ],
  },
  {
    label: 'About Storyworth',
    title: 'Storyworth — the best-known name in the space',
    paras: [
      'Storyworth sends a question each week by email or text, and the answers build into a hardcover book included in the plan. The routine is gentle and has worked for a huge number of families.',
      'It is an annual plan, sold to UK customers in pounds from £49 a year. The entry plan is written answers with a black-and-white book; upgraded plans add phone recording and colour. The book has one QR code on the last page linking to the stories and recordings online.',
      'Books are printed in the US and Europe, with shipping outside the US charged at checkout and possible import fees. You can keep editing and order books after the plan year ends.',
    ],
  },
  {
    label: 'Where Tell Me Your Story fits',
    title: 'Tell Me Your Story — the low-cost way to start',
    paras: [
      'Tell Me Your Story is built in Southampton. The main difference from both is how you start: answer 5 questions free, with no card, before paying anything. After that you pay once — from £3.99 for a digital keepsake — and only pay for printing if and when you want a book.',
      'Storytellers type or speak each answer. Every voice-recorded story gets its own QR code beside it in the printed book, so family can scan it and hear that exact story in their voice.',
      `A printed softcover starts at ${printFrom} plus UK shipping, with hardcover options. If a hardcover included in one price matters most, StoryKeeper or Storyworth may suit you better; if you want to try first and keep costs low, we're the cheaper place to begin.`,
    ],
  },
]

const verdicts = [
  {
    name: 'StoryKeeper',
    price: 'From £79, one-time',
    bestIf: [
      'You want a hardcover and free delivery included in one price',
      'The storyteller wants to record video, or tell stories by phone (Plus)',
      'You want several relatives contributing to one book (Plus)',
    ],
    considerOthers: [
      "You'd like to try it free before paying anything",
      'You only want a digital keepsake, or a lower-cost softcover',
    ],
  },
  {
    name: 'Storyworth',
    price: 'From £49 a year',
    bestIf: [
      'You want a weekly question by email or text',
      'The storyteller prefers email or the phone to a website',
      'Brand recognition matters to you',
    ],
    considerOthers: [
      "You'd rather pay once than yearly",
      'You want voice recording without upgrading',
      'You want a QR code with each story, not one at the back',
    ],
  },
  {
    name: 'Tell Me Your Story',
    price: '5 questions free · from £3.99',
    bestIf: [
      'You want to try it free before paying',
      'You want the lowest-cost start, and to print only if you want to',
      'You want a QR code beside every recorded story',
    ],
    considerOthers: [
      'You want a hardcover included in the price',
      'The storyteller would rather record by phone call or video',
    ],
  },
]

// Shown on the page AND used for the FAQPage schema, so they always match.
const faqs = [
  { q: 'What is the difference between StoryKeeper and Storyworth?', a: 'StoryKeeper is a one-time payment (from £79) with no deadline, where the storyteller can write, dictate, or record audio or video, and each chapter can have a QR code for the recording. Storyworth is an annual plan (from £49 a year) built around weekly questions, with written answers on the entry plan and phone recording on upgraded plans. Both include a hardcover.' },
  { q: 'Which is better — StoryKeeper or Storyworth?', a: 'It depends on the storyteller. StoryKeeper suits families who want to pay once, record voice or video, and take as long as they like. Storyworth suits families who want a steady weekly email routine and a well-known brand. If you want to try before paying anything, Tell Me Your Story lets you answer 5 questions free.' },
  { q: 'Is StoryKeeper a UK company?', a: 'Yes. StoryKeeper is based in London and has a UK store priced in pounds, with free UK delivery.' },
  { q: 'Do StoryKeeper or Storyworth offer voice recording?', a: 'Yes, both do. StoryKeeper lets storytellers record audio or video online on either plan, with phone-call recording on StoryKeeper Plus. Storyworth offers phone recording on its upgraded plans. Tell Me Your Story includes voice recording on every plan, including the free questions.' },
  { q: 'Is there a cheaper alternative to StoryKeeper and Storyworth?', a: `Tell Me Your Story is free to start and one-time plans begin at £3.99. A printed softcover starts at ${printFrom} plus UK shipping, so the total for one book is usually lower — though StoryKeeper and Storyworth include a hardcover in their price.` },
]

useSeo({
  title: 'StoryKeeper vs Storyworth (2026) — Honest UK Comparison',
  description: 'StoryKeeper vs Storyworth compared for UK families: one-time vs annual pricing, voice and video recording, QR codes, hardcovers and delivery — plus a free way to start.',
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