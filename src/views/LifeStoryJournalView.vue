<template>
  <main class="bg-white">

    <!-- Hero -->
    <section class="bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Life Story Journal</p>
        <h1 class="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          Create a life story journal<br>
          <em class="text-[#C4A882] italic">that becomes a keepsake book</em>
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#A8A29E]">
          A life story journal guides someone through the chapters of their life — question by question, in their own words. Tell Me Your Story is a digital life story journal that turns every answer into a beautiful keepsake book, with their voice inside it.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <router-link to="/register" class="rounded-full bg-[#C4A882] px-7 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Start a life story journal free →</router-link>
          <router-link to="/example" class="rounded-full border border-white/20 px-7 py-3 text-sm font-medium text-white transition hover:bg-white/10">See an example</router-link>
        </div>
        <p class="mt-5 text-xs text-[#9C7C5C]">5 questions free · No card needed · Built in the UK</p>
      </div>
    </section>

    <!-- What it is -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">The short version</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">What is a life story journal?</h2>
        </div>
        <div class="mt-8 space-y-4 text-sm leading-7 text-stone-600">
          <p>
            A life story journal is a guided record of someone's life, built one question at a time. Instead of facing a blank page — which is where most memoirs quietly die — the journal asks something specific: what was your childhood home like, what did you spend your first proper wages on, what do you want your grandchildren to know about you. They answer the ones they feel like answering, and a life takes shape without anyone having to sit down and "write a book".
          </p>
          <p>
            Paper versions have been sold in gift shops for years and they work beautifully when they get finished. The trouble is how often they don't: a bound book of blank lines is intimidating, handwriting gets harder with age, and the one copy that exists can be lost, damaged, or simply handed to one child out of three.
          </p>
          <p>
            A digital life story journal solves the practical problems. Answers save as they go, so nothing is lost if the journal sits untouched for a month. Questions can be answered out of order, or by speaking rather than writing. The whole family can read along, and several people can add to the same story. And at the end you can print as many copies as there are relatives who want one.
          </p>
        </div>
      </div>
    </section>

    <!-- Digital vs paper -->
    <section class="bg-[#FAF7F4] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Digital vs paper</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Which type of life story journal is right?</h2>
        </div>
        <div class="mt-10 grid gap-5 sm:grid-cols-2">
          <div class="rounded-2xl border border-stone-200 bg-white p-6">
            <p class="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-4">Paper journal</p>
            <ul class="space-y-3 text-xs text-stone-600">
              <li class="flex gap-2"><span class="text-green-500 flex-shrink-0">✓</span>Tactile, handwritten feel</li>
              <li class="flex gap-2"><span class="text-green-500 flex-shrink-0">✓</span>No technology needed</li>
              <li class="flex gap-2"><span class="text-red-400 flex-shrink-0">✗</span>Many people never finish it</li>
              <li class="flex gap-2"><span class="text-red-400 flex-shrink-0">✗</span>Handwriting can be hard to read</li>
              <li class="flex gap-2"><span class="text-red-400 flex-shrink-0">✗</span>Can be lost, damaged, or deteriorate</li>
              <li class="flex gap-2"><span class="text-red-400 flex-shrink-0">✗</span>Can't capture voice recordings</li>
              <li class="flex gap-2"><span class="text-red-400 flex-shrink-0">✗</span>Hard to share with the wider family</li>
            </ul>
          </div>
          <div class="rounded-2xl border border-[#7C5C3B] bg-white p-6">
            <p class="text-xs font-semibold uppercase tracking-wider text-[#7C5C3B] mb-4">Tell Me Your Story</p>
            <ul class="space-y-3 text-xs text-stone-600">
              <li class="flex gap-2"><span class="text-[#7C5C3B] flex-shrink-0">✓</span>Questions already written for you</li>
              <li class="flex gap-2"><span class="text-[#7C5C3B] flex-shrink-0">✓</span>Answer by typing or speaking</li>
              <li class="flex gap-2"><span class="text-[#7C5C3B] flex-shrink-0">✓</span>Everything saves automatically</li>
              <li class="flex gap-2"><span class="text-[#7C5C3B] flex-shrink-0">✓</span>Voice recordings preserved forever</li>
              <li class="flex gap-2"><span class="text-[#7C5C3B] flex-shrink-0">✓</span>Turns into a printed hardcover book</li>
              <li class="flex gap-2"><span class="text-[#7C5C3B] flex-shrink-0">✓</span>Share with the whole family</li>
              <li class="flex gap-2"><span class="text-[#7C5C3B] flex-shrink-0">✓</span>Free to start</li>
            </ul>
          </div>
        </div>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <router-link to="/life-story-questions" class="text-xs text-[#7C5C3B] underline hover:no-underline">See 150 life story questions free →</router-link>
          <span class="text-xs text-stone-300">·</span>
          <router-link to="/keepsake-book" class="text-xs text-[#7C5C3B] underline hover:no-underline">What goes inside a keepsake book →</router-link>
        </div>
      </div>
    </section>

    <!-- How to start -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Getting going</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">How to start a life story journal</h2>
          <p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-600">
            It takes about ten minutes to begin, and the first sitting matters more than the rest — if it feels like homework, the journal stops.
          </p>
        </div>
        <ol class="mt-10 space-y-6">
          <li v-for="(step, i) in steps" :key="step.title" class="flex gap-4">
            <span class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#7C5C3B] text-xs font-semibold text-white">{{ i + 1 }}</span>
            <div>
              <p class="text-sm font-semibold text-stone-900">{{ step.title }}</p>
              <p class="mt-1 text-sm leading-7 text-stone-600">{{ step.body }}</p>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <!-- What's inside -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Inside the journal</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">100 questions across 10 chapters</h2>
          <p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-600">
            Each chapter covers one part of a life, with ten questions inside it. Nobody has to answer all of them — most people work through the chapters that matter to them and leave the rest.
          </p>
        </div>
        <div class="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          <div v-for="chapter in chapters" :key="chapter.title" class="rounded-2xl bg-white p-5 text-center">
            <p class="text-2xl" aria-hidden="true">{{ chapter.icon }}</p>
            <p class="mt-3 text-sm font-semibold text-stone-900">{{ chapter.title }}</p>
            <p class="mt-1 text-xs text-stone-500">{{ chapter.count }} questions</p>
          </div>
        </div>
        <p class="mt-8 text-center text-xs text-stone-500">
          Want to read the questions before you sign up?
          <router-link to="/life-story-questions" class="text-[#7C5C3B] underline hover:no-underline">All 150 are listed here, free</router-link>.
        </p>
      </div>
    </section>

    <!-- What to write -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">The hard part</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">What to write in a life story journal</h2>
        </div>
        <div class="mt-8 space-y-4 text-sm leading-7 text-stone-600">
          <p>
            The instinct is to write the official version — dates, places, schools, job titles. That is the part a family can already find out, and it is the part nobody rereads. What gets read is the detail nobody else would know: what the kitchen smelled like on a Sunday, the name of the dog, what your father said when you told him you were leaving the job.
          </p>
          <p>
            So answer in the small. One remembered afternoon is worth more than a decade summarised. If a question brings back a single image rather than a whole story, write the image down — that is usually where the story was hiding.
          </p>
          <p>
            Don't tidy it up, either. Half-finished sentences, tangents, the odd contradiction: that is what makes it sound like a person rather than a Wikipedia entry. The grandchildren reading it in thirty years aren't marking it.
          </p>
          <p>
            And if the journal is for someone else to fill in — a parent, a grandparent — resist the urge to correct them. Their version of an event is the thing you are keeping, even where you remember it differently.
          </p>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="bg-[#FAF7F4] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">What makes it different</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">More than a journal — a keepsake</h2>
        </div>
        <div class="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          <div v-for="feature in features" :key="feature.title" class="rounded-2xl border border-stone-200 bg-white p-6">
            <p class="text-2xl" aria-hidden="true">{{ feature.icon }}</p>
            <p class="mt-3 text-sm font-semibold text-stone-900">{{ feature.title }}</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">{{ feature.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Quote -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <p class="font-display text-xl italic leading-relaxed text-stone-700 sm:text-2xl">"He told me about a motorbike he saved up for two years to buy. I never knew that about him."</p>
        <p class="mt-4 text-sm text-[#9C7C5C]">— From a Tell Me Your Story life story journal</p>
      </div>
    </section>

    <!-- Pricing -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Pricing</p>
        <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Start free, pay once when you're ready</h2>
        <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="tier in tiers" :key="tier.name" class="rounded-3xl border p-5 text-center" :class="tier.featured ? 'border-[#7C5C3B] bg-[#FAF7F4]' : 'border-stone-200 bg-white'">
            <p v-if="tier.featured" class="mb-2 text-[10px] font-semibold uppercase tracking-wider text-[#7C5C3B]">Most popular</p>
            <p class="text-xs font-medium text-stone-500">{{ tier.name }}</p>
            <p class="mt-2 text-2xl font-bold text-stone-900">£{{ tier.price }}</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">{{ tier.desc }}</p>
            <router-link to="/register" class="mt-4 block rounded-full py-2 text-xs font-medium transition" :class="tier.featured ? 'bg-[#7C5C3B] text-white hover:opacity-90' : 'border border-stone-300 text-stone-700 hover:bg-stone-50'">Get started →</router-link>
          </div>
        </div>
        <p class="mt-4 text-xs text-stone-400">One-time payment · No subscription · Printed book from {{ printFrom }} including UK delivery</p>
      </div>
    </section>

    <!-- FAQ -->
    <section class="bg-[#FAF7F4] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">FAQ</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Common questions</h2>
        </div>
        <div class="mt-10 space-y-4">
          <div v-for="faq in faqs" :key="faq.q" class="rounded-2xl border border-stone-200 bg-white p-6">
            <p class="text-sm font-semibold text-stone-900">{{ faq.q }}</p>
            <p class="mt-2 text-xs leading-6 text-stone-500">{{ faq.a }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Related pages -->
    <section class="px-5 py-12 sm:px-8">
      <div class="mx-auto max-w-3xl">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C] mb-6">Related reading</p>
        <div class="grid gap-4 sm:grid-cols-3">
          <router-link to="/life-story-questions" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">150 Life Story Questions</p>
            <p class="mt-1 text-xs text-stone-500">The full free list, by chapter</p>
          </router-link>
          <router-link to="/keepsake-book" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Keepsake Book</p>
            <p class="mt-1 text-xs text-stone-500">Turn the journal into a printed book</p>
          </router-link>
          <router-link to="/how-to-write-a-life-story" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">How to Write a Life Story</p>
            <p class="mt-1 text-xs text-stone-500">A complete guide from start to finish</p>
          </router-link>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-[#1C1917] px-5 py-16 text-center sm:px-8 sm:py-20">
      <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Start today</p>
      <h2 class="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">A life story journal that becomes a book</h2>
      <p class="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#A8A29E]">Free to start, no commitment. Begin their life story journal today — and turn it into a beautifully printed keepsake when they're ready.</p>
      <router-link to="/register" class="mt-8 inline-block rounded-full bg-[#C4A882] px-8 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Start a life story journal free →</router-link>
      <p class="mt-4 text-xs text-[#9C7C5C]">Free to start · One-time payment · Printed book from {{ printFrom }} including UK delivery</p>
    </section>

    <!-- Related comparisons — links every comparison page to the others -->
    <ComparisonLinks />

  </main>
</template>

<script setup lang="ts">
import { useSeo, SITE_URL } from '../composables/useSeo'
import { PRINTED_BOOK_FROM_PRICE } from '../lib/printPricing'
import ComparisonLinks from '../components/seo/ComparisonLinks.vue'

const printFrom = `£${PRINTED_BOOK_FROM_PRICE.toFixed(2)}`

const chapters = [
  { icon: '🌱', title: 'Childhood',        count: 10 },
  { icon: '🎒', title: 'Teenage years',    count: 10 },
  { icon: '💼', title: 'Work & career',    count: 10 },
  { icon: '❤️', title: 'Love',            count: 10 },
  { icon: '👨‍👩‍👧', title: 'Family',      count: 10 },
  { icon: '🌍', title: 'Adventures',       count: 10 },
  { icon: '📚', title: 'Values',           count: 10 },
  { icon: '💪', title: 'Hard times',       count: 10 },
  { icon: '🌟', title: 'Proudest moments', count: 10 },
  { icon: '🤍', title: 'Legacy',           count: 10 },
]

const steps = [
  {
    title: 'Decide who the journal is for',
    body: 'A journal someone fills in about their own life reads differently from one a daughter fills in about her mother. Both work — but it changes which questions land, and whether you are writing or interviewing.',
  },
  {
    title: 'Start with one easy chapter, not chapter one',
    body: 'Childhood and first jobs are the gentlest places to begin. Legacy and hard times are the chapters worth having, but they are not where anybody should start on day one.',
  },
  {
    title: 'Answer out loud if writing is a chore',
    body: 'Speaking an answer takes a minute and sounds more like them than anything they would have typed. In Tell Me Your Story the recording is kept, so the printed book can carry a QR code that plays it back.',
  },
  {
    title: 'Add the photograph while you remember which one it was',
    body: 'A photo attached to the answer it belongs to is worth ten in a shoebox. It is also the moment to write on the back of it, so to speak — who is in it, and where.',
  },
  {
    title: 'Set a small, regular rhythm',
    body: 'One question on a Sunday will finish a journal. An afternoon of forty questions usually finishes the enthusiasm instead. Everything saves as you go, so there is no penalty for stopping.',
  },
  {
    title: 'Print it before you think it is finished',
    body: 'A journal is never done — there is always one more chapter. Print at forty or fifty answers anyway. You can always order another copy later, and a book in someone’s hands tends to prompt the next twenty answers.',
  },
]

const features = [
  { icon: '🎙️', title: 'Voice recordings',       desc: 'Answer questions by speaking. Their voice preserved in the printed book via QR codes.' },
  { icon: '📸', title: 'Photos alongside answers', desc: 'Add photos to bring memories to life on the page.' },
  { icon: '📚', title: 'Becomes a printed book',  desc: 'The journal exports as a professionally designed PDF or printed hardcover.' },
  { icon: '💷', title: 'One-time payment',        desc: 'Pay once, own forever. No subscription or annual fee.' },
  { icon: '🤍', title: 'Share with family',       desc: 'The whole family can read along as the journal grows.' },
  { icon: '⏱️', title: 'No pressure',             desc: 'Answer one question at a time, whenever they feel like it.' },
]

const tiers = [
  { name: 'Story only',     price: '3.99',  desc: 'PDF keepsake for one story',           featured: false },
  { name: 'Story + Photos', price: '7.99',  desc: 'PDF with photos included',             featured: true  },
  { name: 'All Stories',    price: '11.99', desc: 'All 7 story types unlocked',           featured: false },
  { name: 'Premium',        price: '17.99', desc: 'Photos, premium layouts, all stories', featured: false },
]

// Shown on the page AND used for the FAQPage schema, so they always match.
const faqs = [
  {
    q: 'What is the difference between a life story journal and a diary?',
    a: 'A diary records what happened today; a life story journal looks back across a whole life, guided by questions. A diary is usually private, while a journal like this is written to be read — by children and grandchildren, often years later.',
  },
  {
    q: 'How long does a life story journal take to fill in?',
    a: 'There is no deadline and nothing expires. Most people answer a handful of questions a week and have something worth printing within a couple of months. Forty to sixty answers makes a substantial book; ten good ones already makes a keepsake.',
  },
  {
    q: 'Can the whole family add to one journal?',
    a: 'Yes. You can invite relatives by link, so a brother in Australia and a daughter down the road can both add to the same story. It is the usual way families put together a journal for a parent or grandparent.',
  },
  {
    q: 'Do you have to print a book?',
    a: `No. The journal works perfectly well as a digital keepsake, and plans start at £3.99 for the PDF. Printing is separate and entirely optional — a printed book starts at ${printFrom} including UK delivery, with hardcover options.`,
  },
  {
    q: 'What happens to the voice recordings?',
    a: 'Each recorded answer is kept and gets its own QR code beside that story in the printed book. Scan the page with any phone camera and you hear that exact story in their voice — which is the part most families say they are gladdest to have.',
  },
  {
    q: 'Is it a subscription?',
    a: 'No. You pay once for the plan you choose and there is nothing to renew or cancel. Printed books are ordered separately, as and when you want one.',
  },
]

useSeo({
  title: 'Life Story Journal UK — A Guided Journal That Becomes a Book',
  description: 'A digital life story journal: 100 guided questions across 10 chapters. Answer by typing or speaking, add photos, then print it as a keepsake. Free to start.',
  canonical: 'https://tellmeyourstory.uk/life-story-journal',
  schema: {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FAQPage',
        '@id': `${SITE_URL}/life-story-journal#faq`,
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${SITE_URL}/life-story-journal#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Life Story Journal', item: `${SITE_URL}/life-story-journal` },
        ],
      },
    ],
  },
})
</script>

<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
</style>
