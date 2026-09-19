<template>
  <main class="bg-white">

    <!-- Hero -->
    <section class="bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Updated {{ CHECKED_ON }}</p>
        <h1 class="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          The best memory book apps in the UK<br>
          <em class="text-[#C4A882] italic">compared honestly for 2026</em>
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#A8A29E]">
          Five good ways to turn a parent's or grandparent's memories into a book — what each costs in pounds,
          how the storyteller answers, whether you can hear their voice in the book, and who each one suits best.
        </p>
      </div>
    </section>

    <!-- Disclosure -->
    <section class="px-5 pt-10 sm:px-8">
      <div class="mx-auto max-w-3xl rounded-2xl border border-[#E8DDD0] bg-[#FAF7F4] p-5 text-sm leading-6 text-stone-600">
        <strong class="text-stone-900">Who wrote this:</strong> we make Tell Me Your Story, one of the options below,
        so we're not neutral. We've tried to be fair anyway: every competitor fact is taken from their own website,
        linked at the bottom, and we say plainly where another option is the better choice.
      </div>
    </section>

    <!-- Quick picks -->
    <section class="px-5 py-14 sm:px-8 sm:py-16">
      <div class="mx-auto max-w-4xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">The short version</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Our quick picks</h2>
        </div>
        <div class="mt-10 grid gap-4 sm:grid-cols-2">
          <a
            v-for="app in apps"
            :key="app.id"
            :href="`#${app.id}`"
            class="group rounded-2xl border p-5 transition hover:border-[#7C5C3B]"
            :class="app.ours ? 'border-[#7C5C3B] bg-[#FAF7F4]' : 'border-stone-200'"
          >
            <p class="text-xs font-semibold uppercase tracking-wider text-[#9C7C5C]">{{ app.bestFor }}</p>
            <p class="mt-2 font-display text-lg font-bold text-stone-900 group-hover:text-[#7C5C3B]">{{ app.name }}</p>
            <p class="mt-1 text-sm text-stone-600">{{ app.price }}</p>
          </a>
        </div>
      </div>
    </section>

    <!-- Comparison table -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-5xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Side by side</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">How they compare</h2>
        </div>

        <div class="mt-10 overflow-x-auto rounded-2xl border border-stone-200 bg-white">
          <table class="w-full min-w-[760px] text-left text-sm">
            <thead>
              <tr class="border-b border-stone-200 bg-stone-50 text-xs font-semibold uppercase tracking-wider text-stone-500">
                <th scope="col" class="px-4 py-3"> </th>
                <th v-for="app in apps" :key="app.id" scope="col" class="px-4 py-3" :class="app.ours ? 'text-[#7C5C3B]' : ''">
                  {{ app.short }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, i) in tableRows" :key="row.label" :class="i % 2 === 0 ? 'bg-white' : 'bg-stone-50'">
                <th scope="row" class="px-4 py-3 align-top font-medium text-stone-700">{{ row.label }}</th>
                <td v-for="app in apps" :key="app.id" class="px-4 py-3 align-top text-stone-600">
                  {{ app.table[row.key] }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- Each option -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl space-y-10">
        <article
          v-for="(app, i) in apps"
          :id="app.id"
          :key="app.id"
          class="scroll-mt-24 rounded-2xl border p-6 sm:p-8"
          :class="app.ours ? 'border-[#7C5C3B] bg-[#FAF7F4]' : 'border-stone-200'"
        >
          <p class="text-xs font-semibold uppercase tracking-wider text-[#9C7C5C]">{{ i + 1 }}. {{ app.bestFor }}</p>
          <h2 class="mt-2 font-display text-2xl font-bold text-stone-900">{{ app.name }}</h2>
          <p class="mt-1 text-sm font-medium text-stone-700">{{ app.price }}</p>
          <p class="mt-4 text-sm leading-7 text-stone-600">{{ app.summary }}</p>

          <div class="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <h3 class="text-xs font-semibold uppercase tracking-wider text-green-800">Good</h3>
              <ul class="mt-2 space-y-2 text-sm leading-6 text-stone-600">
                <li v-for="p in app.pros" :key="p" class="flex gap-2"><span class="text-green-700" aria-hidden="true">✓</span>{{ p }}</li>
              </ul>
            </div>
            <div>
              <h3 class="text-xs font-semibold uppercase tracking-wider text-stone-500">Worth knowing</h3>
              <ul class="mt-2 space-y-2 text-sm leading-6 text-stone-600">
                <li v-for="c in app.cons" :key="c" class="flex gap-2"><span class="text-stone-400" aria-hidden="true">–</span>{{ c }}</li>
              </ul>
            </div>
          </div>

          <div class="mt-6 flex flex-wrap gap-4 text-sm">
            <router-link v-if="app.ours" to="/register" class="rounded-full bg-[#7C5C3B] px-5 py-2.5 font-medium text-white transition hover:opacity-90">
              Try 5 questions free →
            </router-link>
            <router-link v-if="app.readMore" :to="app.readMore.to" class="self-center text-[#7C5C3B] underline hover:no-underline">
              {{ app.readMore.label }}
            </router-link>
          </div>
        </article>
      </div>
    </section>

    <!-- How to choose -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">How to choose</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Four questions that decide it</h2>
        </div>
        <div class="mt-10 space-y-4">
          <div v-for="q in chooseQuestions" :key="q.q" class="rounded-2xl bg-white p-5">
            <h3 class="text-sm font-semibold text-stone-900">{{ q.q }}</h3>
            <p class="mt-2 text-sm leading-6 text-stone-600">{{ q.a }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <h2 class="text-center font-display text-2xl font-bold text-stone-900 sm:text-3xl">Common questions</h2>
        <div class="mt-8 divide-y divide-stone-200 rounded-2xl border border-stone-200">
          <details v-for="item in faqs" :key="item.q" class="faq-item px-5 py-4 sm:px-6">
            <summary class="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-stone-900 sm:text-base">
              {{ item.q }}
              <span class="faq-icon flex-shrink-0 text-xl leading-none text-[#7C5C3B]" aria-hidden="true">+</span>
            </summary>
            <p class="mt-3 text-sm leading-relaxed text-stone-600">{{ item.a }}</p>
          </details>
        </div>

        <p class="mt-8 text-center text-xs leading-5 text-stone-500">
          Details checked {{ CHECKED_ON }} from each company's own site:
          <a href="https://storykeeper.com/uk/" target="_blank" rel="noopener noreferrer" class="underline hover:no-underline">StoryKeeper UK</a>,
          <a href="https://welcome.storyworth.com/gb/faq" target="_blank" rel="noopener noreferrer" class="underline hover:no-underline">Storyworth UK FAQ</a>,
          <a href="https://www.remento.co/faq" target="_blank" rel="noopener noreferrer" class="underline hover:no-underline">Remento FAQ</a>.
          Prices and features change — check before you buy.
        </p>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-[#1C1917] px-5 py-16 text-center sm:px-8 sm:py-20">
      <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Not sure yet?</p>
      <h2 class="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">Try it free before you choose anything</h2>
      <p class="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#A8A29E]">
        Answer 5 questions with Tell Me Your Story — type or speak — and see whether they enjoy it. No card needed.
      </p>
      <router-link to="/register" class="mt-8 inline-block rounded-full bg-[#C4A882] px-8 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">
        Try 5 questions free →
      </router-link>
      <p class="mt-4 text-xs text-[#9C7C5C]">One-time from £3.99 · Printed book from {{ printFrom }} including UK delivery</p>
    </section>

  </main>
</template>

<script setup lang="ts">
import { useSeo } from '../composables/useSeo'
import { PRINTED_BOOK_FROM_PRICE } from '../lib/printPricing'

/** Update whenever the competitor facts below are re-checked. */
const CHECKED_ON = 'September 2026'

const printFrom = `£${PRINTED_BOOK_FROM_PRICE.toFixed(2)}`

interface App {
  id: string
  name: string
  short: string
  bestFor: string
  price: string
  ours?: boolean
  summary: string
  pros: string[]
  cons: string[]
  readMore?: { to: string; label: string }
  table: Record<string, string>
}

const apps: App[] = [
  {
    id: 'tell-me-your-story',
    name: 'Tell Me Your Story',
    short: 'Tell Me Your Story',
    bestFor: 'Best free way to start',
    price: '5 questions free · one-time from £3.99 · print from ' + printFrom + ' including UK delivery',
    ours: true,
    summary:
      'Built in Southampton. The storyteller answers guided questions by typing or tapping the microphone, at their own pace. Every voice-recorded story gets its own QR code beside it in the printed book. You can try 5 questions free, pay once when you are ready, and only pay for printing if you want a book.',
    pros: [
      'Try it free first — no card needed',
      'Lowest-cost start: a digital keepsake from £3.99',
      'Type or speak each answer',
      'A QR code beside every voice-recorded story',
      'Tribute video option',
    ],
    cons: [
      'Printing is extra, and softcover only for now',
      'No phone-call or video recording',
      'A younger, smaller company than the others',
    ],
    table: { based: 'UK', pay: 'One-time', start: 'Free, then £3.99+', answer: 'Type or voice', voice: 'QR per recorded story', book: `Extra, from ${printFrom}`, delivery: 'UK delivery included' },
  },
  {
    id: 'storykeeper',
    name: 'StoryKeeper',
    short: 'StoryKeeper',
    bestFor: 'Best for a hardcover included, paid once',
    price: '£79 (Classic) or £99 (Plus), one-time',
    summary:
      'A London-based service that has printed more than 12,000 books. Storytellers can write, dictate, or record audio or video, with weekly prompts or at their own pace, and chapters can link to the original recordings by QR code. It is a one-time payment with no deadline, and an A5 hardcover with free UK delivery is included.',
    pros: [
      'One-time payment, no deadline',
      'Write, dictate, audio or video',
      'Hardcover and free UK delivery included',
      'Plus plan adds phone-call recording and unlimited contributors',
      '60-day money-back guarantee',
    ],
    cons: [
      'You pay £79 before you can try it',
      'Phone calls and multiple contributors need the £99 Plus plan',
      'Compact A5 book size',
    ],
    readMore: { to: '/storykeeper-review', label: 'Read our StoryKeeper review' },
    table: { based: 'UK', pay: 'One-time', start: '£79', answer: 'Write, audio, video', voice: 'QR per chapter', book: 'A5 hardcover included', delivery: 'Free' },
  },
  {
    id: 'storyworth',
    name: 'Storyworth',
    short: 'Storyworth',
    bestFor: 'Best for a weekly email routine',
    price: 'From £49 a year',
    summary:
      'The best-known name. A question arrives each week by email or text, the storyteller replies, and the answers build into a hardcover book included in the plan. Upgraded plans add phone recording, and the book has one QR code on the last page linking to the stories and recordings online.',
    pros: [
      'Very simple — questions arrive by email or text',
      'Phone recording on upgraded plans, even from a landline',
      'Hardcover included',
      'Can keep editing after the plan year ends',
    ],
    cons: [
      'An annual plan rather than a one-time payment',
      'Entry plan is written answers with a black-and-white book',
      'Shipping to the UK is charged on top; import fees possible',
    ],
    readMore: { to: '/storyworth-review', label: 'Read our Storyworth review' },
    table: { based: 'US (UK site in £)', pay: 'Annual', start: '£49/yr', answer: 'Write; phone on upgraded plans', voice: 'One QR, last page', book: 'Hardcover included', delivery: 'Charged at checkout' },
  },
  {
    id: 'remento',
    name: 'Remento',
    short: 'Remento',
    bestFor: 'Best for storytellers who would rather talk',
    price: '$99 a year (US dollars)',
    summary:
      'Voice and video first. The storyteller taps a link from email or text and records each answer — no app or password. Remento turns the recording into either a cleaned-up transcript or an AI-written story, and the full-colour hardcover includes a QR code for each story that plays the original recording.',
    pros: [
      'Very easy for storytellers who dislike typing',
      'Voice or video, with a QR code for each story',
      '8×10 full-colour hardcover included',
      'Download everything, and keep access without renewing',
    ],
    cons: [
      'Priced in US dollars, as a yearly plan',
      'Every answer has to be recorded — no typing option',
      'UK shipping is extra and takes about three weeks',
    ],
    readMore: { to: '/remento-review', label: 'Read our Remento review' },
    table: { based: 'US', pay: 'Annual', start: '$99', answer: 'Voice or video', voice: 'QR per story', book: '8×10 hardcover included', delivery: 'Extra, ~3 weeks' },
  },
  {
    id: 'guided-journal',
    name: 'A paper guided journal',
    short: 'Paper journal',
    bestFor: 'Best for no technology at all',
    price: 'Usually the cheapest option',
    summary:
      'A printed book of questions with space to write the answers by hand — widely available from bookshops and online. There is nothing to set up, and a book in their own handwriting is a keepsake in itself.',
    pros: [
      'No devices, accounts or internet needed',
      'Their own handwriting on every page',
      'Inexpensive, and easy to give as a gift',
    ],
    cons: [
      'No voice recordings',
      'Only one copy — nothing to share or back up',
      'Relies on them writing by hand, which can be hard',
    ],
    table: { based: 'Various', pay: 'One-off', start: 'Low', answer: 'Handwritten', voice: '✗', book: 'Is the book', delivery: 'Varies' },
  },
]

const tableRows = [
  { key: 'based',    label: 'Based in' },
  { key: 'pay',      label: 'How you pay' },
  { key: 'start',    label: 'Cost to start' },
  { key: 'answer',   label: 'How they answer' },
  { key: 'voice',    label: 'Voice in the book' },
  { key: 'book',     label: 'Printed book' },
  { key: 'delivery', label: 'UK delivery' },
]

const chooseQuestions = [
  {
    q: 'Will they type, talk, or write by hand?',
    a: 'Typists and writers suit any of them. If they would much rather talk, look at Remento or StoryKeeper (video and phone calls), or Tell Me Your Story (tap the microphone). If they avoid technology altogether, a paper journal is the kindest choice.',
  },
  {
    q: 'Do you want to pay once, or is a yearly plan fine?',
    a: 'StoryKeeper and Tell Me Your Story are one-time payments with no deadline. Storyworth and Remento are yearly plans built around a year of weekly questions.',
  },
  {
    q: 'How much does hearing their voice matter?',
    a: 'Remento, StoryKeeper and Tell Me Your Story all put QR codes next to stories in the book. Storyworth has one QR code at the back linking to its online archive. A paper journal has no audio.',
  },
  {
    q: 'Do you want a hardcover included in the price?',
    a: `StoryKeeper, Storyworth and Remento include a hardcover. Tell Me Your Story keeps the app cheap and charges for printing separately (softcover from ${printFrom} including UK delivery), so it costs less if you only want a digital keepsake or one softcover.`,
  },
]

// Shown on the page AND used for the FAQPage schema, so they always match.
const faqs = [
  {
    q: 'What is the best memory book app in the UK?',
    a: 'It depends on your family. For a hardcover included and a one-time payment, StoryKeeper is strong. For a weekly email routine, Storyworth. For storytellers who would rather talk, Remento. To try it free and keep costs low, Tell Me Your Story.',
  },
  {
    q: 'Which memory book apps are UK-based?',
    a: 'StoryKeeper (London) and Tell Me Your Story (Southampton) are UK-based and priced in pounds. Storyworth is a US company with a UK site priced in pounds. Remento is a US company priced in dollars that ships to the UK for an extra fee.',
  },
  {
    q: 'Which memory book apps have no subscription?',
    a: 'StoryKeeper and Tell Me Your Story are one-time payments with no deadline. Storyworth and Remento are yearly plans.',
  },
  {
    q: 'Can I hear their voice in the printed book?',
    a: 'Yes, with most of them. Remento, StoryKeeper and Tell Me Your Story print QR codes next to stories that play the original recording. Storyworth includes one QR code on the last page linking to the stories and recordings online.',
  },
  {
    q: 'Is there a free memory book app?',
    a: 'Tell Me Your Story lets you answer 5 questions free with no card, and you only pay if you want to unlock everything or order a book. The others require payment upfront, though Storyworth, Remento and StoryKeeper offer money-back guarantees.',
  },
]

useSeo({
  title: 'Best Memory Book Apps UK (2026): 5 Options Compared',
  description: 'The best memory book apps for UK families compared honestly: StoryKeeper, Storyworth, Remento, Tell Me Your Story and paper journals — prices in pounds, voice recording and QR codes.',
  type: 'article',
  schema: {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: 'The best memory book apps in the UK, compared honestly for 2026',
        author: { '@type': 'Person', name: 'Mark', url: 'https://tellmeyourstory.uk/my-story' },
        publisher: { '@id': 'https://tellmeyourstory.uk/#organization' },
        dateModified: '2026-09-18',
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  },
})
</script>

<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
.faq-item summary::-webkit-details-marker { display: none; }
.faq-item[open] .faq-icon { transform: rotate(45deg); }
.faq-icon { transition: transform 0.2s; }
</style>