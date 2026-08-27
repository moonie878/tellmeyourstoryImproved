<template>
  <main class="min-h-screen bg-[#F5F0E8] text-[#1C1917]">

    <!-- ══════════════════════════════════════════════════════════ -->
    <!-- HERO                                                       -->
    <!-- ══════════════════════════════════════════════════════════ -->
    <section class="px-5 pb-14 pt-16 sm:px-8 sm:pt-24">
      <div class="mx-auto max-w-3xl text-center">

        <!-- Urgency strip -->
        <div
          v-if="showDeadline"
          class="mx-auto mb-7 inline-flex items-center gap-2 rounded-full border border-[#E8DDD0] bg-white px-4 py-2"
        >
          <span class="inline-block h-1.5 w-1.5 rounded-full bg-[#B07D3A]"></span>
          <p class="text-xs font-medium text-stone-600">
            Order printed books by <strong class="text-stone-900">{{ PRINT_CUTOFF_LABEL }}</strong> for Christmas delivery
          </p>
        </div>

        <p class="text-[11px] font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">
          Christmas gifts for grandparents
        </p>

        <h1 class="mt-4 font-display text-3xl font-bold leading-[1.2] tracking-[-0.02em] sm:text-4xl md:text-[2.75rem]">
          The one gift they can't<br class="hidden sm:block" />
          <em class="italic text-[#7C5C3B]">already have</em>
        </h1>

        <p class="mx-auto mt-6 max-w-xl text-base leading-[1.8] text-[#5C534E]">
          Grandparents are notoriously hard to buy for. They have the slippers, the socks, the biscuit tin. What they don't have is their life story written down — in their own words, in their own voice, in a book the whole family can keep.
        </p>

        <div class="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <router-link
            to="/gift?campaign=christmas"
            class="rounded-full bg-[#7C5C3B] px-8 py-3.5 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Buy as a Christmas gift
          </router-link>
          <router-link
            to="/example"
            class="rounded-full border border-[#E8DDD0] bg-white px-8 py-3.5 text-sm font-medium text-stone-700 transition hover:border-[#7C5C3B] hover:text-[#7C5C3B]"
          >
            See a finished book
          </router-link>
        </div>

        <div class="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-[#A89880]">
          <span>One-time payment</span>
          <span>No subscription</span>
          <span>Printed books from £{{ PRINTED_BOOK_FROM_PRICE.toFixed(2) }}</span>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════════ -->
    <!-- WHY IT LANDS                                               -->
    <!-- ══════════════════════════════════════════════════════════ -->
    <section class="bg-white px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <h2 class="text-center font-display text-2xl font-bold sm:text-3xl">
          Why this works when nothing else does
        </h2>

        <div class="mt-10 space-y-8">
          <div v-for="reason in reasons" :key="reason.title" class="flex gap-5">
            <span class="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#7C5C3B]" />
            <div>
              <h3 class="font-display text-lg font-semibold text-stone-900">{{ reason.title }}</h3>
              <p class="mt-2 text-[15px] leading-[1.8] text-[#5C534E]">{{ reason.body }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════════ -->
    <!-- THE VOICE ANGLE — the differentiator                       -->
    <!-- ══════════════════════════════════════════════════════════ -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="rounded-3xl bg-[#2C2420] px-6 py-12 sm:px-12">
          <div class="mx-auto max-w-xl text-center">
            <p class="text-[11px] font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">
              What makes it different
            </p>
            <h2 class="mt-4 font-display text-2xl font-bold leading-tight text-white sm:text-3xl">
              Your grandchildren will hear your voice long after you're gone
            </h2>
            <p class="mt-5 text-[15px] leading-[1.8] text-stone-400">
              They can answer each question out loud instead of writing. Their voice is saved, and a QR code is printed beside that memory in the book. Anyone can scan it with a phone and hear them tell the story themselves — in twenty years, in fifty.
            </p>
            <p class="mt-5 text-[15px] leading-[1.8] text-stone-400">
              No other memory book does this. It's the reason families tell us this is the gift that made someone cry on Christmas morning.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════════ -->
    <!-- COMPARISON                                                 -->
    <!-- ══════════════════════════════════════════════════════════ -->
    <section class="bg-white px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <h2 class="text-center font-display text-2xl font-bold sm:text-3xl">
          The usual presents, and this one
        </h2>
        <p class="mt-3 text-center text-sm text-stone-500">
          What most people buy grandparents at Christmas, and what happens to it.
        </p>

        <div class="mt-10 overflow-hidden rounded-2xl border border-stone-200">
          <div
            v-for="(row, i) in comparison"
            :key="row.gift"
            class="grid grid-cols-[1fr_1.4fr] gap-4 px-5 py-4 sm:px-6"
            :class="[
              i % 2 === 0 ? 'bg-white' : 'bg-[#FAF9F7]',
              row.highlight ? 'border-l-2 border-[#7C5C3B] bg-[#FAF7F4]' : ''
            ]"
          >
            <p class="text-sm" :class="row.highlight ? 'font-semibold text-stone-900' : 'text-stone-700'">
              {{ row.gift }}
            </p>
            <p class="text-sm" :class="row.highlight ? 'text-[#7C5C3B]' : 'text-stone-500'">
              {{ row.outcome }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════════ -->
    <!-- HOW GIFTING WORKS                                          -->
    <!-- ══════════════════════════════════════════════════════════ -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <h2 class="text-center font-display text-2xl font-bold sm:text-3xl">
          How to give it at Christmas
        </h2>

        <div class="mt-10 grid gap-8 sm:grid-cols-3">
          <div v-for="(step, i) in steps" :key="step.title">
            <span class="flex h-8 w-8 items-center justify-center rounded-full bg-white font-display text-sm font-bold text-[#7C5C3B]">
              {{ i + 1 }}
            </span>
            <h3 class="mt-4 font-display text-base font-semibold text-stone-900">{{ step.title }}</h3>
            <p class="mt-2 text-[14px] leading-[1.75] text-[#5C534E]">{{ step.body }}</p>
          </div>
        </div>

        <div class="mt-10 rounded-2xl border border-[#E8DDD0] bg-white p-6 text-center">
          <p class="text-sm leading-relaxed text-stone-600">
            Plenty of families buy it before Christmas, gift the link on the day, and order the printed book together in the new year once the questions are answered. There's no rush and no expiry.
          </p>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════════ -->
    <!-- FAQ — SEO weight                                           -->
    <!-- ══════════════════════════════════════════════════════════ -->
    <section class="bg-white px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <h2 class="text-center font-display text-2xl font-bold sm:text-3xl">
          Common questions
        </h2>

        <div class="mt-10 divide-y divide-stone-100">
          <details v-for="faq in faqs" :key="faq.q" class="group py-5">
            <summary class="flex cursor-pointer items-center justify-between gap-4 list-none">
              <h3 class="text-[15px] font-semibold text-stone-900">{{ faq.q }}</h3>
              <span class="flex-shrink-0 text-stone-300 transition group-open:rotate-180">
                <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </span>
            </summary>
            <p class="mt-3 text-[15px] leading-[1.8] text-[#5C534E]">{{ faq.a }}</p>
          </details>
        </div>
      </div>
    </section>

    <!-- ══════════════════════════════════════════════════════════ -->
    <!-- FINAL CTA                                                  -->
    <!-- ══════════════════════════════════════════════════════════ -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <h2 class="font-display text-2xl font-bold leading-tight sm:text-3xl">
          Every year you don't ask is a year of stories lost
        </h2>
        <p class="mx-auto mt-4 max-w-lg text-[15px] leading-[1.8] text-[#5C534E]">
          Grandparents won't be here forever. Neither will the stories only they can tell. This Christmas, ask them.
        </p>

        <div class="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <router-link
            to="/gift?campaign=christmas"
            class="rounded-full bg-[#7C5C3B] px-8 py-3.5 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Buy as a Christmas gift
          </router-link>
          <router-link
            to="/register"
            class="rounded-full border border-[#E8DDD0] bg-white px-8 py-3.5 text-sm font-medium text-stone-700 transition hover:border-[#7C5C3B] hover:text-[#7C5C3B]"
          >
            Try 5 questions free
          </router-link>
        </div>

        <div class="mt-8 flex justify-center">
          <a
            href="https://uk.trustpilot.com/review/tellmeyourstory.uk"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 rounded-full border border-[#E8DDD0] bg-white px-5 py-2.5 text-sm text-stone-600 transition hover:border-[#00B67A]"
          >
            <span class="text-base" style="color: #00B67A;">★★★★★</span>
            <span>Rated <strong class="text-stone-900">5.0</strong> on</span>
            <span class="font-semibold" style="color: #00B67A;">Trustpilot</span>
          </a>
        </div>
      </div>
    </section>

    <!-- Related pages — internal linking for SEO -->
    <section class="px-5 pb-16 sm:px-8">
      <div class="mx-auto max-w-3xl">
        <p class="text-center text-xs font-medium uppercase tracking-[0.2em] text-[#9C7C5C]">
          You might also like
        </p>
        <div class="mt-5 flex flex-wrap justify-center gap-2">
          <router-link
            v-for="link in relatedLinks"
            :key="link.to"
            :to="link.to"
            class="rounded-full border border-[#E8DDD0] bg-white px-4 py-2 text-sm text-stone-600 transition hover:border-[#7C5C3B] hover:text-[#7C5C3B]"
          >{{ link.label }}</router-link>
        </div>
      </div>
    </section>

  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { PRINTED_BOOK_FROM_PRICE } from '../lib/printPricing'
import { useSeo } from '../composables/useSeo'



useSeo({
  title: 'Christmas Gift Ideas for Grandparents 2026 — Tell Me Your Story | Life Story Keepsake Book',
  description: 'The best Christmas gift for Grandma or Grandad — capture their life story in their own words. Guided questions, voice recordings, and a beautifully printed keepsake book. UK delivery.',
  canonical: 'https://tellmeyourstory.uk/christmas-gift-ideas-for-grandparents',
})


/**
 * Print cutoff — Lulu takes 10–14 days including UK shipping,
 * so 10 December is the safe last order date. Update the year
 * each season, or move to a shared constant if other pages need it.
 */
import { PRINT_CUTOFF_LABEL, isChristmasSeason } from '../lib/christmas'

const showDeadline = computed(() => isChristmasSeason())

const reasons = [
  {
    title: 'They already have everything they need',
    body: 'By the time someone is a grandparent, they have spent decades acquiring things. Another candle, another jumper, another gadget they will politely thank you for. What they have never been given is time and attention on the subject of their own life.',
  },
  {
    title: 'It gives them something to do, not something to own',
    body: 'The gift is not really the book. It is the weeks of answering questions about their childhood, their first job, how they met their partner, what they were frightened of. Most grandparents enjoy this enormously, and it gives them a reason to talk to the family more often.',
  },
  {
    title: 'It answers questions nobody thinks to ask in time',
    body: 'Almost everyone who has lost a parent or grandparent says the same thing: I wish I had asked more. The details go first — what the house smelled like, what their mother was like, the small stupid things that make a person who they were.',
  },
  {
    title: 'The whole family gets it, not just one person',
    body: 'Unlike most presents, this one multiplies. Siblings can read it, children can read it, and grandchildren who are too young now will have it when they are old enough to care.',
  },
]

const comparison = [
  { gift: 'Slippers or a dressing gown', outcome: 'Worn out within a year', highlight: false },
  { gift: 'Chocolates or a hamper', outcome: 'Gone by New Year', highlight: false },
  { gift: 'A photo frame', outcome: 'Lovely, but tells no story', highlight: false },
  { gift: 'A subscription box', outcome: 'Another monthly payment to cancel', highlight: false },
  { gift: 'Their life story, in their own voice', outcome: 'Read by grandchildren not yet born', highlight: true },
]

const steps = [
  {
    title: 'Buy the gift',
    body: 'Choose a plan, add a personal message, and pay once. You get a gift link by email straight away — no physical delivery to worry about.',
  },
  {
    title: 'Give it on the day',
    body: 'Print the link into a card, send it by WhatsApp, or open it together on Christmas morning. There is no expiry date, so it works whenever you are ready.',
  },
  {
    title: 'Help them get started',
    body: 'Sit with them and do the first question together. That is usually all it takes — most people carry on by themselves once they see their words on the page.',
  },
]



const faqs = [
  {
    q: 'What if my grandparents are not good with technology?',
    a: 'They do not need to be. They can answer by speaking instead of typing — they tap one button and talk, and we turn it into text automatically. Plenty of families do it together, with a grandchild holding the phone while the grandparent talks.',
  },
  {
    q: 'How long does it take them to finish?',
    a: 'There is no requirement to finish. Some people answer everything in a fortnight, others do one question a week for a year. The book can be printed at any point, with however many answers exist at the time.',
  },
  {
    q: 'When do I need to order by for Christmas?',
    a: `Printed books take roughly 10 to 14 days including UK delivery, so order by ${PRINT_CUTOFF_LABEL} to be safe. Digital keepsakes have no deadline at all — you can buy one on Christmas Eve and it works immediately.`,
  },
  {
    q: 'Can several of us chip in?',
    a: 'Yes. One person buys and shares the gift link, and the rest of the family can be invited into the story afterwards to read along, listen to the recordings, and add their own comments.',
  },
  {
    q: 'What if they never get round to it?',
    a: 'Their answers are saved forever, so nothing is wasted if they stop and come back months later. In practice the hardest part is the first question, which is why we suggest doing that one together.',
  },
  {
    q: 'Is it a subscription?',
    a: 'No. It is a one-time payment with nothing to cancel and no renewal. Printed books are ordered separately if and when you want one.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

const relatedLinks = [
  { to: '/questions-to-ask-elderly-parents', label: 'Questions to ask elderly parents' },
  { to: '/questions-about-childhood', label: 'Childhood questions' },
  { to: '/life-story-questions', label: 'Life story questions' },
  { to: '/christmas', label: 'Christmas keepsakes' },
  { to: '/gift', label: 'All gift options' },
]
</script>

<style scoped>
.font-display {
  font-family: 'Playfair Display', Georgia, serif;
}
details > summary::-webkit-details-marker {
  display: none;
}
</style>



<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
</style>