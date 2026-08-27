<template>
  <main class="min-h-screen bg-[#F5F0E8] text-[#1C1917]">

    <!-- HERO -->
    <section class="px-5 pb-12 pt-16 sm:px-8 sm:pt-24">
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
          Meaningful Christmas gifts
        </p>

        <h1 class="mt-4 font-display text-3xl font-bold leading-[1.2] tracking-[-0.02em] sm:text-4xl md:text-[2.75rem]">
          Eight gifts that actually<br class="hidden sm:block" />
          <em class="italic text-[#7C5C3B]">mean something</em>
        </h1>

        <p class="mx-auto mt-6 max-w-xl text-base leading-[1.8] text-[#5C534E]">
          Presents that get kept rather than quietly recycled. Most of these cost less than the gadget you were about to settle for, and all of them are about the person rather than the price tag.
        </p>
      </div>
    </section>

    <!-- INTRO -->
    <section class="bg-white px-5 py-14 sm:px-8 sm:py-16">
      <div class="mx-auto max-w-2xl">
        <div class="space-y-6 text-[15px] leading-[1.9] text-[#5C534E]">
          <p>
            A meaningful gift usually has one of three things going for it. It took thought rather than money. It carries something that can't be bought — a memory, a voice, a piece of family history. Or it gives the person time and attention rather than an object to find a home for.
          </p>
          <p>
            Everything below does at least one of those. We've put ours first because we think it's the strongest of them, but the rest are genuinely good ideas and several cost nothing at all.
          </p>
        </div>
      </div>
    </section>

    <!-- THE LIST -->
    <section class="px-5 py-14 sm:px-8">
      <div class="mx-auto max-w-3xl space-y-5">

        <!-- Featured -->
        <article class="overflow-hidden rounded-2xl border-2 border-[#7C5C3B] bg-white">
          <div class="bg-[#FAF7F4] px-6 py-3 sm:px-8">
            <p class="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7C5C3B]">
              Our pick
            </p>
          </div>
          <div class="px-6 py-7 sm:px-8">
            <div class="flex items-baseline gap-3">
              <span class="font-display text-2xl font-bold text-[#7C5C3B]">1</span>
              <h2 class="font-display text-xl font-semibold text-stone-900 sm:text-[22px]">
                Their life story, in their own voice
              </h2>
            </div>
            <p class="mt-4 text-[15px] leading-[1.85] text-[#5C534E]">
              Give someone the chance to record their own life — childhood, family, work, the moments that shaped them — one question at a time. They can type their answers or simply speak them, and the whole thing becomes a properly typeset keepsake book.
            </p>
            <p class="mt-4 text-[15px] leading-[1.85] text-[#5C534E]">
              The part that surprises people is the voice. Every recorded answer gets a QR code printed beside it in the book, so anyone can scan it and hear that person telling the story themselves — years later, and for as long as the book survives.
            </p>
            <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <router-link
                to="/gift?campaign=christmas"
                class="rounded-full bg-[#7C5C3B] px-6 py-3 text-center text-sm font-semibold text-white transition hover:opacity-90"
              >
                Buy as a gift — from £3.99
              </router-link>
              <router-link
                to="/example"
                class="rounded-full border border-[#E8DDD0] px-6 py-3 text-center text-sm font-medium text-stone-700 transition hover:border-[#7C5C3B] hover:text-[#7C5C3B]"
              >
                See a finished book
              </router-link>
            </div>
          </div>
        </article>

        <!-- The rest -->
        <article
          v-for="(idea, i) in ideas"
          :key="idea.title"
          class="rounded-2xl border border-[#E8DDD0] bg-white px-6 py-6 sm:px-8"
        >
          <div class="flex items-baseline gap-3">
            <span class="font-display text-xl font-bold text-[#C4A882]">{{ i + 2 }}</span>
            <h2 class="font-display text-lg font-semibold text-stone-900">{{ idea.title }}</h2>
          </div>
          <p class="mt-3 text-[15px] leading-[1.85] text-[#5C534E]">{{ idea.body }}</p>
          <p class="mt-3 text-xs text-[#9C7C5C]">{{ idea.cost }}</p>
        </article>

      </div>
    </section>

    <!-- WHAT MAKES IT MEANINGFUL -->
    <section class="bg-white px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-2xl">
        <h2 class="font-display text-2xl font-bold sm:text-3xl">
          How to tell if a gift will land
        </h2>
        <p class="mt-4 text-[15px] leading-[1.8] text-[#5C534E]">
          Three questions worth asking before you buy anything this year.
        </p>

        <div class="mt-8 space-y-7">
          <div v-for="test in tests" :key="test.q">
            <h3 class="font-display text-[17px] font-semibold text-stone-900">{{ test.q }}</h3>
            <p class="mt-2 text-[15px] leading-[1.8] text-[#5C534E]">{{ test.a }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="px-5 py-16 sm:px-8">
      <div class="mx-auto max-w-3xl">
        <div class="rounded-3xl bg-[#2C2420] px-6 py-12 text-center sm:px-12">
          <h2 class="font-display text-2xl font-bold leading-tight text-white sm:text-3xl">
            The one thing you can't buy later
          </h2>
          <p class="mx-auto mt-4 max-w-lg text-[15px] leading-[1.8] text-stone-400">
            Almost everyone who has lost a parent says the same thing — I wish I'd asked more. This Christmas, ask.
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
              class="rounded-full border border-stone-600 px-8 py-3.5 text-sm font-medium text-stone-300 transition hover:border-stone-400 hover:text-white"
            >
              Try 5 questions free
            </router-link>
          </div>
          <p class="mt-5 text-xs text-stone-500">
            One-time payment · No subscription · Printed books from £{{ PRINTED_BOOK_FROM_PRICE.toFixed(2) }}
          </p>
        </div>
      </div>
    </section>

    <!-- RELATED -->
    <section class="px-5 pb-16 sm:px-8">
      <div class="mx-auto max-w-3xl">
        <p class="text-center text-xs font-medium uppercase tracking-[0.2em] text-[#9C7C5C]">
          More gift guides
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

useSeo({
  title: 'Meaningful Christmas Gifts — 8 Ideas That Get Kept | Tell Me Your Story',
  description:
    'Eight meaningful Christmas gift ideas that get kept rather than recycled — from restored family photos to recording a life story in their own voice. Several cost nothing.',
  canonical: 'https://tellmeyourstory.uk/meaningful-christmas-gifts',
})

const ideas = [
  {
    title: 'A restored family photograph',
    body: 'Find the oldest damaged photo in the family — a creased wedding picture, a faded shot of a grandparent as a child — and have it professionally restored and framed. Most people have never seen these images looking as they did originally, and the reaction when they unwrap it is usually silence.',
    cost: 'Around £30–80 · Search for local photo restoration services',
  },
  {
    title: 'A recipe written out in their own hand',
    body: 'If an older relative is still with you, ask them to write out one family recipe by hand and have it framed, printed onto a tea towel, or engraved onto a chopping board. Handwriting is one of the things people miss most, and almost nobody thinks to preserve it while there is still time.',
    cost: 'Around £15–40 · Free if you frame it yourself',
  },
  {
    title: 'A letter to be opened later',
    body: 'Write a proper letter — not a card — saying the things you would want them to know. Seal it and mark it with a date years from now, or simply give it as it is. It costs nothing and it is almost always the present people keep in a drawer for the rest of their lives.',
    cost: 'Free',
  },
  {
    title: 'A day you spend together',
    body: 'A trip somewhere they used to live, a walk they have talked about for years, a return visit to a place that matters. Book it properly, put it in a card, and clear the date in your own diary. The gift is that you are giving up a day, not that you paid for a ticket.',
    cost: 'Varies · The point is the time, not the spend',
  },
  {
    title: 'Digitised home videos',
    body: 'Old camcorder tapes and cine reels degrade quietly in lofts and are often unplayable within a decade or two. Getting them transferred to digital rescues footage the family may not have seen since it was recorded, and can usually be arranged by post.',
    cost: 'Around £10–20 per tape · Book early, turnaround is slow at Christmas',
  },
  {
    title: 'A charitable gift in their name',
    body: 'For the person who genuinely wants nothing, a donation to something they care about — a hospice that looked after someone, a local charity, a cause tied to their work — lands better than another object. Choose something specific to them rather than a generic fund.',
    cost: 'Whatever you would have spent',
  },
  {
    title: 'A family photo book from this year',
    body: 'Not a shared album on someone\'s phone that nobody opens, but a printed book of the year — birthdays, holidays, ordinary Sunday afternoons. Physical photographs get looked at. Digital ones mostly do not.',
    cost: 'Around £25–50 · Allow two weeks for printing',
  },
]

const tests = [
  {
    q: 'Could you have bought it for anyone?',
    a: 'If the same present would have worked for a colleague, a neighbour or your postman, it is not really a gift for that person. Meaningful presents are usually slightly awkward to explain to anyone outside the family, because they depend on something only you know.',
  },
  {
    q: 'Will it still exist in ten years?',
    a: 'Consumables and gadgets are gone within a year or two. Things that carry information — photographs, recordings, handwriting, stories — tend to survive, and get more valuable as the people in them get older.',
  },
  {
    q: 'Does it cost you something other than money?',
    a: 'Thought, time, a difficult conversation, an afternoon spent digging through a box of old photos. The presents people remember almost always cost the giver something that could not be put on a card.',
  },
]

const listSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Meaningful Christmas gift ideas',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Their life story, in their own voice' },
    ...ideas.map((idea, i) => ({
      '@type': 'ListItem',
      position: i + 2,
      name: idea.title,
    })),
  ],
}

const relatedLinks = [
  { to: '/christmas-gifts-for-grandparents', label: 'Gifts for grandparents' },
  { to: '/christmas-gift-for-parents-who-have-everything', label: 'For parents who have everything' },
  { to: '/memory-book-vs-memory-box', label: 'Memory book vs memory box' },
  { to: '/gift', label: 'All gift options' },
]
</script>

<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
</style>