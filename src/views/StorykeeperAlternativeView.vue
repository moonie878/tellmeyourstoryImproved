<template>
  <main class="bg-white">

    <!-- Hero -->
    <section class="bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">StoryKeeper alternative · UK</p>
        <h1 class="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          Looking for a StoryKeeper alternative?<br>
          <em class="text-[#C4A882] italic">Try it free before you pay.</em>
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#A8A29E]">
          StoryKeeper is a good UK service that starts at £79 with a hardcover included. Tell Me Your Story lets you answer 5 questions free,
          then pay once from £3.99 — and only pay for printing if you want a book.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <router-link
            to="/register"
            class="rounded-full bg-[#C4A882] px-7 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90"
          >
            Try 5 questions free →
          </router-link>
          <router-link
            to="/example"
            class="rounded-full border border-white/20 px-7 py-3 text-sm font-medium text-white transition hover:bg-white/10"
          >
            See an example story
          </router-link>
        </div>
      </div>
    </section>

    <!-- Quick answer: which one fits -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">The short answer</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Which one is right for your family?</h2>
          <p class="mx-auto mt-3 max-w-xl text-sm leading-7 text-stone-500">
            Both are UK-based, one-time payments, and both put their voice in the book with QR codes. The difference is mostly how you start and what's included.
          </p>
        </div>

        <div class="mt-10 grid gap-5 sm:grid-cols-2">
          <div class="rounded-2xl border border-stone-200 p-6">
            <p class="text-xs font-semibold uppercase tracking-wider text-stone-400">Choose StoryKeeper if…</p>
            <ul class="mt-4 space-y-3 text-sm leading-6 text-stone-600">
              <li v-for="item in whenThem" :key="item" class="flex gap-2">
                <span class="text-stone-400" aria-hidden="true">•</span>{{ item }}
              </li>
            </ul>
          </div>
          <div class="rounded-2xl border border-[#7C5C3B] bg-[#FAF7F4] p-6">
            <p class="text-xs font-semibold uppercase tracking-wider text-[#7C5C3B]">Choose Tell Me Your Story if…</p>
            <ul class="mt-4 space-y-3 text-sm leading-6 text-stone-700">
              <li v-for="item in whenUs" :key="item" class="flex gap-2">
                <span class="text-[#7C5C3B]" aria-hidden="true">✓</span>{{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Comparison table -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Side by side</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">StoryKeeper vs Tell Me Your Story</h2>
        </div>

        <!-- Scrolls sideways on small phones instead of squashing -->
        <div class="mt-10 overflow-x-auto rounded-2xl border border-stone-200 bg-white">
          <table class="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr class="border-b border-stone-200 bg-stone-50 text-xs font-semibold uppercase tracking-wider text-stone-500">
                <th scope="col" class="px-5 py-3">Feature</th>
                <th scope="col" class="px-5 py-3">StoryKeeper (UK)</th>
                <th scope="col" class="px-5 py-3 text-[#7C5C3B]">Tell Me Your Story</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(row, i) in comparison"
                :key="row.feature"
                :class="i % 2 === 0 ? 'bg-white' : 'bg-stone-50'"
              >
                <th scope="row" class="px-5 py-4 align-top font-medium text-stone-700">{{ row.feature }}</th>
                <td class="px-5 py-4 align-top text-stone-600">{{ row.them }}</td>
                <td class="px-5 py-4 align-top font-medium" :class="row.usPositive ? 'text-green-700' : 'text-stone-700'">{{ row.us }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p class="mt-4 text-center text-xs leading-5 text-stone-500">
          StoryKeeper details checked {{ CHECKED_ON }} from
          <a href="https://storykeeper.com/uk/" target="_blank" rel="noopener noreferrer" class="underline hover:no-underline">StoryKeeper UK</a>.
          Prices and features change — check their site before you buy.
        </p>
      </div>
    </section>

    <!-- What you get -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">What you get with Tell Me Your Story</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Built around their voice</h2>
        </div>

        <div class="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          <div v-for="feature in features" :key="feature.title" class="rounded-2xl border border-stone-200 p-6">
            <p class="text-2xl" aria-hidden="true">{{ feature.icon }}</p>
            <h3 class="mt-3 text-sm font-semibold text-stone-900">{{ feature.title }}</h3>
            <p class="mt-2 text-xs leading-5 text-stone-500">{{ feature.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing comparison -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">The honest price comparison</p>
        <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">What you actually pay</h2>
        <p class="mx-auto mt-3 max-w-xl text-sm leading-7 text-stone-500">
          StoryKeeper includes a hardcover and free delivery in its price. We keep the app cheap and charge for printing separately,
          so you only pay for books you actually order. See our
          <router-link to="/storykeeper-review" class="text-[#7C5C3B] underline hover:no-underline">full StoryKeeper review</router-link>
          for more detail.
        </p>

        <div class="mt-10 grid gap-5 sm:grid-cols-2">
          <div class="rounded-2xl border border-stone-200 bg-white p-6 text-left">
            <p class="text-xs font-semibold uppercase tracking-wider text-stone-400">StoryKeeper (UK)</p>
            <p class="mt-3 text-2xl font-bold text-stone-900">From £79, once</p>
            <p class="mt-1 text-xs text-stone-500">One-time payment · A5 hardcover and free UK delivery included</p>
            <ul class="mt-4 space-y-2 text-xs leading-5 text-stone-500">
              <li>• Classic £79: one hardcover, one storyteller</li>
              <li>• Plus £99: two hardcovers, unlimited contributors, phone-call recording</li>
              <li>• Write, dictate, or record audio or video</li>
              <li>• 60-day money-back guarantee</li>
            </ul>
          </div>
          <div class="rounded-2xl border border-[#7C5C3B] bg-[#FAF7F4] p-6 text-left">
            <p class="text-xs font-semibold uppercase tracking-wider text-[#7C5C3B]">Tell Me Your Story</p>
            <p class="mt-3 text-2xl font-bold text-stone-900">From £3.99, once</p>
            <p class="mt-1 text-xs text-stone-500">One-time payment · no renewal</p>
            <ul class="mt-4 space-y-2 text-xs leading-5 text-stone-600">
              <li>✓ 5 questions free, no card needed</li>
              <li>✓ Voice recording on every plan</li>
              <li>✓ Printed softcover from {{ printFrom }} per copy, including UK delivery</li>
              <li>✓ Every copy costs the same — order one or ten</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ (same text feeds the FAQ schema) -->
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
      </div>
    </section>

    <!-- Quote -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <p class="font-display text-xl italic leading-relaxed text-stone-700 sm:text-2xl">
          "He told me about a motorbike he saved up for two years to buy. I never knew that about him."
        </p>
        <p class="mt-4 text-sm text-[#9C7C5C]">— From a Tell Me Your Story keepsake</p>
      </div>
    </section>

    <!-- Related pages -->
    <section class="px-5 py-12 sm:px-8">
      <div class="mx-auto max-w-3xl">
        <p class="mb-6 text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Related reading</p>
        <div class="grid gap-4 sm:grid-cols-3">
          <router-link to="/storykeeper-review" class="group rounded-2xl border border-stone-200 p-4 transition hover:border-[#7C5C3B]">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">StoryKeeper Review 2026</p>
            <p class="mt-1 text-xs text-stone-500">Pros, cons and real costs</p>
          </router-link>
          <router-link to="/storykeeper-vs-storyworth" class="group rounded-2xl border border-stone-200 p-4 transition hover:border-[#7C5C3B]">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">StoryKeeper vs Storyworth</p>
            <p class="mt-1 text-xs text-stone-500">Also comparing Storyworth? Read this first</p>
          </router-link>
          <router-link to="/life-story-questions" class="group rounded-2xl border border-stone-200 p-4 transition hover:border-[#7C5C3B]">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Life Story Questions</p>
            <p class="mt-1 text-xs text-stone-500">The questions that unlock real stories</p>
          </router-link>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-[#1C1917] px-5 py-16 text-center sm:px-8 sm:py-20">
      <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">A StoryKeeper alternative for UK families</p>
      <h2 class="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">Start their story today — free</h2>
      <p class="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#A8A29E]">
        Guided questions, voice recordings with a QR code for every story, and a printed keepsake book when you're ready.
      </p>
      <router-link to="/register" class="mt-8 inline-block rounded-full bg-[#C4A882] px-8 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">
        Try 5 questions free →
      </router-link>
      <p class="mt-4 text-xs text-[#9C7C5C]">No card needed · One-time payment · Printed books from {{ printFrom }} including UK delivery</p>
    </section>

  </main>
</template>

<script setup lang="ts">
import { useSeo } from '../composables/useSeo'
import { PRINTED_BOOK_FROM_PRICE } from '../lib/printPricing'

/** Update this whenever the StoryKeeper facts below are re-checked. */
const CHECKED_ON = 'September 2026'

const printFrom = `£${PRINTED_BOOK_FROM_PRICE.toFixed(2)}`

const whenThem = [
  'You want a hardcover and free UK delivery included in one price',
  'The storyteller would like to record video, or tell stories by phone (Plus plan)',
  'You want several relatives adding memories to one book (Plus plan)',
]

const whenUs = [
  'You want to try it properly first — 5 questions free, no card',
  'You want the lowest-cost start: a digital keepsake from £3.99',
  "You'd rather pay for printing only if and when you want a book",
  'You also want a tribute video option',
]

const comparison = [
  { feature: 'How you pay',             them: 'One-time, from £79',                         us: 'One-time, from £3.99',                               usPositive: true },
  { feature: 'Try before you pay',      them: '60-day money-back guarantee',                us: '5 questions free, no card needed',                   usPositive: true },
  { feature: 'Time limit',              them: 'None',                                       us: 'None',                                               usPositive: false },
  { feature: 'How they answer',         them: 'Write, dictate, or record audio or video',   us: 'Type or tap the microphone',                         usPositive: false },
  { feature: 'Phone-call recording',    them: 'On StoryKeeper Plus (£99)',                  us: 'Not available',                                      usPositive: false },
  { feature: 'Hearing it in the book',  them: 'QR code per chapter',                        us: 'QR code beside each voice-recorded story',           usPositive: false },
  { feature: 'Printed book',            them: 'A5 hardcover included; free UK delivery',    us: `Softcover from ${printFrom} including UK delivery`, usPositive: false },
  { feature: 'Family contributors',     them: 'Unlimited on Plus; one storyteller on Classic', us: 'Invite family by link',                          usPositive: false },
  { feature: 'Tribute video',           them: 'Not offered',                                us: 'Available',                                          usPositive: true },
]

const features = [
  { icon: '📖', title: '100+ guided questions',  desc: 'Every chapter of life — childhood, family, work, love and the lessons learned. Answer in any order, at your own pace.' },
  { icon: '🎙️', title: 'Type or speak',          desc: 'Tap the microphone and talk, or type — whichever suits each question. Recordings get a QR code beside that story in the printed book.' },
  { icon: '📚', title: 'Print only if you want', desc: `Keep it digital, or order a printed copy: softcover from ${printFrom} including UK delivery.` },
  { icon: '💷', title: 'Free to start',           desc: 'Answer 5 questions free, then pay once from £3.99. No renewal date and nothing to cancel.' },
  { icon: '🎬', title: 'Tribute video',           desc: 'Turn photos, music and a message into a video keepsake — for a celebration of life or family far away.' },
  { icon: '🤍', title: 'Family can read along',  desc: 'Share a link so the whole family can read the story as it grows, at no extra cost.' },
]

// Shown on the page AND used for the FAQPage schema, so they always match.
const faqs = [
  {
    q: 'Is StoryKeeper a UK company?',
    a: 'Yes. StoryKeeper is based in London, with a UK store priced in pounds and free UK delivery.',
  },
  {
    q: 'How much does StoryKeeper cost in the UK?',
    a: 'StoryKeeper Classic is £79 with one A5 hardcover; StoryKeeper Plus is £99 with two hardcovers, unlimited contributors and phone-call recording. Both are one-time payments with no deadline and a 60-day money-back guarantee.',
  },
  {
    q: 'Is Tell Me Your Story cheaper than StoryKeeper?',
    a: `To start, yes — you can answer 5 questions free and one-time plans begin at £3.99. A printed softcover starts at ${printFrom} including UK delivery. If you want a hardcover included in one price, StoryKeeper's £79 plan may be better value.`,
  },
  {
    q: 'Do both put their voice in the book?',
    a: 'Yes. StoryKeeper can link each chapter to the original audio or video with a QR code. Tell Me Your Story prints a QR code beside every voice-recorded story.',
  },
]

useSeo({
  title: 'StoryKeeper Alternative UK (2026) — Try It Free First',
  description: 'Comparing StoryKeeper? Tell Me Your Story lets you answer 5 questions free, then pay once from £3.99, with a QR code beside every recorded story. Print only if you want to.',
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
.faq-item summary::-webkit-details-marker { display: none; }
.faq-item[open] .faq-icon { transform: rotate(45deg); }
.faq-icon { transition: transform 0.2s; }
</style>