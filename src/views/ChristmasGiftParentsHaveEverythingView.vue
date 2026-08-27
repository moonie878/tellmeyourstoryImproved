<template>
  <main class="min-h-screen bg-[#F5F0E8] text-[#1C1917]">

    <!-- HERO -->
    <section class="px-5 pb-14 pt-16 sm:px-8 sm:pt-24">
      <div class="mx-auto max-w-3xl text-center">

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
          Christmas gifts for parents who have everything
        </p>

        <h1 class="mt-4 font-display text-3xl font-bold leading-[1.2] tracking-[-0.02em] sm:text-4xl md:text-[2.75rem]">
          They don't need<br class="hidden sm:block" />
          <em class="italic text-[#7C5C3B]">another thing</em>
        </h1>

        <p class="mx-auto mt-6 max-w-xl text-base leading-[1.8] text-[#5C534E]">
          If your mum or dad says "don't get me anything" every single year and means it, they're not being difficult. They genuinely have enough objects. The gift that works is one that isn't an object at all.
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
          <span>Nothing to store</span>
          <span>Printed books from £{{ PRINTED_BOOK_FROM_PRICE.toFixed(2) }}</span>
        </div>
      </div>
    </section>

    <!-- THE PROBLEM -->
    <section class="bg-white px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-2xl">
        <h2 class="font-display text-2xl font-bold sm:text-3xl">
          Why buying for them keeps failing
        </h2>

        <div class="mt-8 space-y-6 text-[15px] leading-[1.9] text-[#5C534E]">
          <p>
            By their sixties and seventies, most parents have spent forty years accumulating. The kitchen drawer is full. The wardrobe is full. The loft is full of things their own parents left them that they've never known what to do with.
          </p>
          <p>
            So every year the family circles the same options. Another candle. Another jumper in a colour they already own. A gadget that stays in the box. A voucher, which everyone knows means you gave up. And every year they say thank you and mean it, and the thing joins the pile.
          </p>
          <p class="text-stone-900">
            The problem isn't that you can't find a good object. It's that an object was never going to be the answer.
          </p>
          <p>
            What people at that stage of life increasingly want isn't more stuff — it's to feel that the life they've had actually mattered to somebody. That someone was paying attention. That the stories they carry around aren't going to disappear with them.
          </p>
          <p>
            That's a much easier thing to give than a perfect present, and almost nobody thinks to give it.
          </p>
        </div>
      </div>
    </section>

    <!-- THE ALTERNATIVE -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <h2 class="text-center font-display text-2xl font-bold sm:text-3xl">
          What to give instead
        </h2>
        <p class="mx-auto mt-3 max-w-lg text-center text-[15px] leading-relaxed text-[#5C534E]">
          Tell Me Your Story asks your parent a hundred questions about their life and turns their answers into a printed book. It takes up no space until they choose to print it, and it's the only present that gets more valuable over time.
        </p>

        <div class="mt-10 grid gap-4 sm:grid-cols-3">
          <div
            v-for="pillar in pillars"
            :key="pillar.title"
            class="rounded-2xl border border-[#E8DDD0] bg-white p-6"
          >
            <h3 class="font-display text-base font-semibold text-stone-900">{{ pillar.title }}</h3>
            <p class="mt-2.5 text-[14px] leading-[1.75] text-[#5C534E]">{{ pillar.body }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- VOICE -->
    <section class="px-5 pb-16 sm:px-8">
      <div class="mx-auto max-w-4xl">
        <div class="rounded-3xl bg-[#2C2420] px-6 py-12 sm:px-12">
          <div class="mx-auto max-w-xl text-center">
            <p class="text-[11px] font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">
              The part people don't expect
            </p>
            <h2 class="mt-4 font-display text-2xl font-bold leading-tight text-white sm:text-3xl">
              You can keep their voice, not just their words
            </h2>
            <p class="mt-5 text-[15px] leading-[1.8] text-stone-400">
              They can answer out loud rather than typing. Their voice is recorded, and a QR code is printed next to that memory in the book. Scan it with a phone and you hear them telling the story themselves.
            </p>
            <p class="mt-5 text-[15px] leading-[1.8] text-stone-400">
              Most families don't realise what that's worth until much later. Photographs are everywhere. Recordings of an ordinary parent talking about an ordinary Tuesday in 1968 are almost non-existent.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- OBJECTIONS -->
    <section class="bg-white px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-2xl">
        <h2 class="font-display text-2xl font-bold sm:text-3xl">
          "They'd never go for that"
        </h2>
        <p class="mt-4 text-[15px] leading-[1.8] text-[#5C534E]">
          It's the most common worry, and it's usually wrong. Here's what actually happens.
        </p>

        <div class="mt-9 space-y-7">
          <div v-for="obj in objections" :key="obj.claim">
            <h3 class="font-display text-[17px] font-semibold text-stone-900">{{ obj.claim }}</h3>
            <p class="mt-2 text-[15px] leading-[1.8] text-[#5C534E]">{{ obj.reply }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <h2 class="text-center font-display text-2xl font-bold sm:text-3xl">
          Common questions
        </h2>

        <div class="mt-10 divide-y divide-[#E8DDD0]">
          <details v-for="faq in faqs" :key="faq.q" class="group py-5">
            <summary class="flex cursor-pointer list-none items-center justify-between gap-4">
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

    <!-- FINAL CTA -->
    <section class="bg-white px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <h2 class="font-display text-2xl font-bold leading-tight sm:text-3xl">
          The gift they can't tell you they want
        </h2>
        <p class="mx-auto mt-4 max-w-lg text-[15px] leading-[1.8] text-[#5C534E]">
          Nobody asks their children to write down their life story. That's exactly why it lands the way it does.
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

    <!-- RELATED -->
    <section class="px-5 py-14 sm:px-8">
      <div class="mx-auto max-w-3xl">
        <p class="text-center text-xs font-medium uppercase tracking-[0.2em] text-[#9C7C5C]">
          Keep reading
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

const PRINT_CUTOFF = new Date('2026-12-10T23:59:59')
const PRINT_CUTOFF_LABEL = '10 December'

const showDeadline = computed(() => {
  const now = new Date()
  const seasonStart = new Date(now.getFullYear(), 8, 15)
  return now >= seasonStart && now <= PRINT_CUTOFF
})

const pillars = [
  {
    title: 'It takes up no space',
    body: 'Nothing arrives in the post unless they decide they want a printed copy. For a parent actively trying to get rid of clutter, that matters more than you would think.',
  },
  {
    title: 'It gives them something to do',
    body: 'A question a day, answered whenever they fancy it. Most people find it genuinely enjoyable, and it gives them a reason to ring you and say what they remembered.',
  },
  {
    title: 'It gets better with age',
    body: 'Unlike almost every other present, this one is worth more in twenty years than it is on Christmas Day. Your children will read it. Theirs might too.',
  },
]

const objections = [
  {
    claim: '"My dad would hate writing about himself"',
    reply: 'Most do at first. What changes it is that he never has to write anything — he can tap the microphone and just talk, and we turn what he says into text. Men who swore they had nothing interesting to say tend to be the ones who end up answering ninety questions.',
  },
  {
    claim: '"My mum isn\'t good with technology"',
    reply: 'It is one question on a screen at a time, with a big button to record. Plenty of families do the first few together over a cup of tea, and the parent carries on alone once they can see how it works. There is nothing to install.',
  },
  {
    claim: '"They\'ll never finish it"',
    reply: 'Finishing is not the point and there is no requirement to. Every answer is saved permanently, and the book can be printed with however many answers exist. Twelve good ones is already something your family will keep.',
  },
  {
    claim: '"It feels a bit morbid"',
    reply: 'In practice it is the opposite. People describe it as the most fun they have had talking about themselves in years — it is about a first job and a first car and what their mother was like, not about the ending. The morbid version is the one where nobody ever asks.',
  },
]

const faqs = [
  {
    q: 'How is this different from a blank memory journal?',
    a: 'A blank journal asks someone to sit down and write, which is why most of them stay blank. This asks one specific question at a time, they can answer by speaking rather than writing, and the finished result is typeset and printed properly rather than left in a drawer in their handwriting.',
  },
  {
    q: 'What if I want to give something physical on the day?',
    a: 'Buy the gift, print the link into a card, and wrap the card. Many families then order the printed book together in the new year once the questions are answered, which gives them a second thing to look forward to.',
  },
  {
    q: 'When do I need to order by for Christmas?',
    a: `Printed books take around 10 to 14 days including UK delivery, so ${PRINT_CUTOFF_LABEL} is the safe last order date. Digital gifts have no deadline — you can buy one on Christmas Eve and share it immediately.`,
  },
  {
    q: 'How much does it cost?',
    a: `Digital keepsakes start at £3.99 as a one-time payment, with no subscription and nothing to cancel. Printed books start at £${PRINTED_BOOK_FROM_PRICE.toFixed(2)} including UK delivery, and you only order one if you want one.`,
  },
  {
    q: 'Can the rest of the family join in?',
    a: 'Yes. Once a story is started it can be shared with anyone, so siblings and grandchildren can read the answers, listen to the voice recordings, and leave their own comments.',
  },
]

useSeo({
  title: 'Christmas Gifts for Parents Who Have Everything | Tell Me Your Story',
  description:
    "Stuck for a Christmas gift for parents who say don't get me anything? Capture their life story in their own words and voice — a keepsake that takes up no space. From £3.99.",
  canonical: 'https://tellmeyourstory.uk/christmas-gift-for-parents-who-have-everything',
})

const relatedLinks = [
  { to: '/christmas-gifts-for-grandparents', label: 'Christmas gifts for grandparents' },
  { to: '/meaningful-christmas-gifts', label: 'Meaningful Christmas gifts' },
  { to: '/questions-to-ask-elderly-parents', label: 'Questions to ask elderly parents' },
  { to: '/gift', label: 'All gift options' },
]
</script>

<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
details > summary::-webkit-details-marker { display: none; }
</style>