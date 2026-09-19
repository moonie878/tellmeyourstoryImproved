<template>
  <main class="bg-white">

    <!-- Hero -->
    <section class="bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Storyworth alternative · UK</p>
        <h1 class="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          Looking for a Storyworth alternative in the UK?<br>
          <em class="text-[#C4A882] italic">Pay once. Keep their voice.</em>
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#A8A29E]">
          Storyworth is a year-long plan built around weekly emailed questions. Tell Me Your Story is a one-time payment:
          answer at your own pace by typing or speaking, and every voice answer gets its own QR code in the printed book.
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
            Both are good ways to capture a life story. They suit different families.
          </p>
        </div>

        <div class="mt-10 grid gap-5 sm:grid-cols-2">
          <div class="rounded-2xl border border-stone-200 p-6">
            <p class="text-xs font-semibold uppercase tracking-wider text-stone-400">Choose Storyworth if…</p>
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
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Storyworth vs Tell Me Your Story</h2>
        </div>

        <!-- Scrolls sideways on small phones instead of squashing -->
        <div class="mt-10 overflow-x-auto rounded-2xl border border-stone-200 bg-white">
          <table class="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr class="border-b border-stone-200 bg-stone-50 text-xs font-semibold uppercase tracking-wider text-stone-500">
                <th scope="col" class="px-5 py-3">Feature</th>
                <th scope="col" class="px-5 py-3">Storyworth (UK)</th>
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
          Storyworth details checked {{ CHECKED_ON }} from
          <a href="https://welcome.storyworth.com/gb/faq" target="_blank" rel="noopener noreferrer" class="underline hover:no-underline">Storyworth's UK FAQ</a>
          and <a href="https://www.storyworth.co.uk/" target="_blank" rel="noopener noreferrer" class="underline hover:no-underline">storyworth.co.uk</a>.
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
          Storyworth includes a hardcover in the plan price. We keep the app cheap and charge for printing separately,
          so you only pay for books you actually order. See our
          <router-link to="/storyworth-review" class="text-[#7C5C3B] underline hover:no-underline">full Storyworth review</router-link>
          for more detail.
        </p>

        <div class="mt-10 grid gap-5 sm:grid-cols-2">
          <div class="rounded-2xl border border-stone-200 bg-white p-6 text-left">
            <p class="text-xs font-semibold uppercase tracking-wider text-stone-400">Storyworth (UK)</p>
            <p class="mt-3 text-2xl font-bold text-stone-900">From £49 a year</p>
            <p class="mt-1 text-xs text-stone-500">Annual plan · one hardcover book included</p>
            <ul class="mt-4 space-y-2 text-xs leading-5 text-stone-500">
              <li>• Entry plan: written answers, black-and-white book</li>
              <li>• Phone voice recording on upgraded plans</li>
              <li>• Extra copies £29 (black and white) or £59 (colour)</li>
              <li>• Shipping outside the US charged at checkout; import fees possible</li>
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
          <router-link to="/storyworth-review" class="group rounded-2xl border border-stone-200 p-4 transition hover:border-[#7C5C3B]">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Storyworth Review 2026</p>
            <p class="mt-1 text-xs text-stone-500">Pros, cons and real costs</p>
          </router-link>
          <router-link to="/storyworth-vs-remento" class="group rounded-2xl border border-stone-200 p-4 transition hover:border-[#7C5C3B]">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Storyworth vs Remento</p>
            <p class="mt-1 text-xs text-stone-500">Also comparing Remento? Read this first</p>
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
      <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">A Storyworth alternative for UK families</p>
      <h2 class="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">Start their story today — no subscription</h2>
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

/** Update this whenever the Storyworth facts below are re-checked. */
const CHECKED_ON = 'September 2026'

const printFrom = `£${PRINTED_BOOK_FROM_PRICE.toFixed(2)}`

const whenThem = [
  'You want a hardcover book included in one upfront price',
  'Your storyteller would rather answer by email, or by phone call — even a landline',
  'You like the idea of a gentle weekly question over a whole year',
]

const whenUs = [
  "You don't want a yearly plan — you'd rather pay once",
  'Hearing their voice matters: every recorded story gets its own QR code in the book',
  'You want to try it properly first, free and without a card',
  "You'd rather sit down together and go at your own pace, with no deadline",
]

const comparison = [
  { feature: 'How you pay',             them: 'Annual plan, from £49 (top plan renews automatically)', us: 'One-time payment, from £3.99',                      usPositive: true },
  { feature: 'Try before you pay',      them: '30-day money-back guarantee',                           us: '5 questions free, no card needed',                  usPositive: true },
  { feature: 'How questions arrive',    them: 'By email or text — weekly by default, can be changed',  us: 'In the app — answer as many as you like, any time', usPositive: false },
  { feature: 'Voice recording',         them: 'By phone call, on upgraded plans',                      us: 'Tap the microphone — on every plan, including free', usPositive: true },
  { feature: 'Hearing it in the book',  them: 'One QR code on the last page, linking to the stories online', us: 'A QR code beside every voice-recorded story',   usPositive: true },
  { feature: 'Printed book',            them: 'Hardcover included in the plan',                        us: `Softcover from ${printFrom} including UK delivery`, usPositive: false },
  { feature: 'Extra copies',            them: '£29 black and white, £59 colour',                       us: 'Same price as the first copy',                      usPositive: false },
  { feature: 'Where books come from',   them: 'Printed in the US and Europe; import fees possible',    us: 'Printed to order and delivered to UK addresses',    usPositive: false },
  { feature: 'Digital copy',            them: 'Free e-book download',                                  us: 'PDF download on paid plans',                        usPositive: false },
]

const features = [
  { icon: '📖', title: '100+ guided questions',  desc: 'Every chapter of life — childhood, family, work, love and the lessons learned. Answer in any order, at your own pace.' },
  { icon: '🎙️', title: 'Voice recordings',       desc: 'Tap the microphone and talk. The words are typed up for you and the recording is kept, with a QR code beside that story in the printed book.' },
  { icon: '📚', title: 'Printed keepsake books', desc: `Printed to order and delivered to UK addresses. Softcover from ${printFrom} including UK delivery.` },
  { icon: '💷', title: 'One-time payment',        desc: 'Pay once for the plan you choose. No renewal date and nothing to cancel.' },
  { icon: '✨', title: 'Writing help',            desc: 'Gentle prompts help expand short answers — the words always stay theirs.' },
  { icon: '🤍', title: 'Family can read along',  desc: 'Share a link so the whole family can read the story as it grows, at no extra cost.' },
]

// Shown on the page AND used for the FAQPage schema, so they always match.
const faqs = [
  {
    q: 'Is Storyworth available in the UK?',
    a: 'Yes. Storyworth sells to UK customers in pounds, with plans from £49 a year. Its books are printed in the US and Europe, shipping outside the US is charged when you order, and import fees may apply depending on where a copy is sent from.',
  },
  {
    q: 'Is Tell Me Your Story cheaper than Storyworth?',
    a: `For one printed book, usually. A paid plan starts at £3.99 as a one-time payment, and a printed softcover starts at ${printFrom} including UK delivery. Storyworth's plans start at £49 a year and include a hardcover. If you want several hardcover copies, compare the per-copy prices for your order.`,
  },
  {
    q: 'Does Storyworth record voices?',
    a: "Yes — on its upgraded plans, storytellers can record stories over the phone. Storyworth books include one QR code on the last page that links to the stories and recordings online. Tell Me Your Story puts a QR code beside each voice-recorded story instead, and voice recording is included on every plan.",
  },
  {
    q: 'Do I need a subscription?',
    a: 'No. Tell Me Your Story is a one-time payment for the plan you choose, with no renewal. You can start with 5 questions free and only pay if you want to unlock everything or order a printed book.',
  },
]

useSeo({
  title: 'Storyworth Alternative UK (2026) — Pay Once, Keep Their Voice',
  description: `Comparing Storyworth in the UK? Tell Me Your Story is a one-time payment with voice recording on every plan and a QR code beside every story. Try 5 questions free.`,
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