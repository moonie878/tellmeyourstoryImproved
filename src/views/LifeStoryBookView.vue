<template>
  <main class="bg-white">

    <!-- Hero -->
    <section class="bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Life Story Book</p>
        <h1 class="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          Create a life story book<br>
          <em class="text-[#C4A882] italic">in their own words</em>
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#A8A29E]">
          A life story book captures the memories, moments, and wisdom of someone you love — before it's too late. Tell Me Your Story guides them through 100 questions and turns their answers into a beautifully printed keepsake.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <router-link
            to="/register"
            class="rounded-full bg-[#C4A882] px-7 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90"
          >
            Start a life story book free →
          </router-link>
          <router-link
            to="/example"
            class="rounded-full border border-white/20 px-7 py-3 text-sm font-medium text-white transition hover:bg-white/10"
          >
            See an example
          </router-link>
        </div>
      </div>
    </section>

    <!-- What is a life story book -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">What is a life story book?</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">More than a photo album. More than a diary.</h2>
        </div>
        <div class="mt-8 prose prose-stone mx-auto text-sm leading-7 text-stone-600">
          <p>A life story book is a structured record of someone's life — told in their own words. Not just the big events, but the small moments too. The smell of their childhood home. The job they almost didn't take. The person who changed everything.</p>
          <p class="mt-4">Unlike a photo album, a life story book captures the <em>meaning</em> behind the memories. Unlike a diary, it's guided by questions designed to unlock stories people never thought to tell.</p>
          <p class="mt-4">For families, a life story book becomes one of the most treasured possessions they own — especially after a loved one is gone.</p>
        </div>
      </div>
    </section>

    <!-- What goes inside -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">What goes inside</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Every chapter of a life, captured</h2>
        </div>
        <div class="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          <div v-for="chapter in chapters" :key="chapter.title" class="rounded-2xl bg-white p-5 shadow-sm">
            <p class="text-xl">{{ chapter.icon }}</p>
            <p class="mt-3 text-sm font-semibold text-stone-900">{{ chapter.title }}</p>
            <p class="mt-1 text-xs leading-5 text-stone-500">{{ chapter.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- How it works -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">How it works</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Three steps to a finished life story book</h2>
        </div>
        <div class="mt-10 space-y-6">
          <div v-for="step in steps" :key="step.number" class="flex items-start gap-5">
            <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#1C1917] text-sm font-bold text-white">
              {{ step.number }}
            </div>
            <div>
              <p class="text-sm font-semibold text-stone-900">{{ step.title }}</p>
              <p class="mt-1 text-xs leading-5 text-stone-500">{{ step.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">What makes ours different</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">A life story book built for UK families</h2>
        </div>
        <div class="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          <div class="rounded-2xl bg-white p-6">
            <p class="text-2xl">🎙️</p>
            <p class="mt-3 text-sm font-semibold text-stone-900">Voice recordings</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">Record answers by voice. A QR code in the printed book lets family hear them speak — long after they're gone.</p>
          </div>
          <div class="rounded-2xl bg-white p-6">
            <p class="text-2xl">📚</p>
            <p class="mt-3 text-sm font-semibold text-stone-900">UK printed hardcover</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">Professionally printed and bound in the UK. Softcover from £34.98, hardcover options available. Delivered to your door.</p>
          </div>
          <div class="rounded-2xl bg-white p-6">
            <p class="text-2xl">💷</p>
            <p class="mt-3 text-sm font-semibold text-stone-900">One-time payment</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">No subscription, no annual fee. Pay once and the story is yours forever.</p>
          </div>
          <div class="rounded-2xl bg-white p-6">
            <p class="text-2xl">✨</p>
            <p class="mt-3 text-sm font-semibold text-stone-900">AI writing assist</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">Gentle prompts help expand short answers. The words always stay theirs.</p>
          </div>
          <div class="rounded-2xl bg-white p-6">
            <p class="text-2xl">📸</p>
            <p class="mt-3 text-sm font-semibold text-stone-900">Photos included</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">Add photos alongside answers to bring memories to life on the page.</p>
          </div>
          <div class="rounded-2xl bg-white p-6">
            <p class="text-2xl">🤍</p>
            <p class="mt-3 text-sm font-semibold text-stone-900">Share with family</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">Share a link so the whole family can read the story as it grows — together.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Quote -->
    <section class="px-5 py-16 sm:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <p class="font-display text-xl italic leading-relaxed text-stone-700 sm:text-2xl">
          "He told me about a motorbike he saved up for two years to buy. I never knew that about him."
        </p>
        <p class="mt-4 text-sm text-[#9C7C5C]">— From a Tell Me Your Story life story book</p>
      </div>
    </section>

    <!-- Pricing -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Pricing</p>
        <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Start free, pay once when you're ready</h2>
        <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="tier in tiers" :key="tier.name"
            class="rounded-3xl border p-5 text-center"
            :class="tier.featured ? 'border-[#7C5C3B] bg-white' : 'border-stone-200 bg-white'"
          >
            <p v-if="tier.featured" class="mb-2 text-[10px] font-semibold uppercase tracking-wider text-[#7C5C3B]">Most popular</p>
            <p class="text-xs font-medium text-stone-500">{{ tier.name }}</p>
            <p class="mt-2 text-2xl font-bold text-stone-900">£{{ tier.price }}</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">{{ tier.desc }}</p>
            <router-link
              to="/register"
              class="mt-4 block rounded-full py-2 text-xs font-medium transition"
              :class="tier.featured ? 'bg-[#7C5C3B] text-white hover:opacity-90' : 'border border-stone-300 text-stone-700 hover:bg-stone-50'"
            >
              Get started →
            </router-link>
          </div>
        </div>
        <p class="mt-6 text-xs text-stone-400">One-time payment · No subscription · Printed book from £34.98</p>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-[#1C1917] px-5 py-16 text-center sm:px-8 sm:py-20">
      <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Start today</p>
      <h2 class="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">Their story deserves to be kept</h2>
      <p class="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#A8A29E]">
        Every family has stories that should never be forgotten. Start a life story book today — free, no commitment, no subscription.
      </p>
      <router-link to="/register" class="mt-8 inline-block rounded-full bg-[#C4A882] px-8 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">
        Start a life story book free →
      </router-link>
    </section>

  </main>
</template>

<script setup lang="ts">
import { useSeo } from '../composables/useSeo'

const chapters = [
  { icon: '🌱', title: 'Early life & childhood',       desc: 'Where they grew up, their earliest memories, family life, and the world they were born into.' },
  { icon: '🎒', title: 'School & teenage years',        desc: 'Friends, teachers, hobbies, and the moments that shaped who they became.' },
  { icon: '💼', title: 'Work & career',                 desc: 'Their working life, proudest achievements, hardest challenges, and what they learned.' },
  { icon: '❤️', title: 'Love & relationships',          desc: 'How they met their partner, their marriage, their family, and the people who mattered most.' },
  { icon: '👨‍👩‍👧', title: 'Family life',              desc: 'Raising children, family traditions, holidays, and the memories made at home.' },
  { icon: '🌍', title: 'Adventures & travel',           desc: 'Places they visited, experiences they treasure, and the world they explored.' },
  { icon: '📚', title: 'Values & life lessons',         desc: 'What they believe in, what they\'ve learned, and the wisdom they want to pass on.' },
  { icon: '🌟', title: 'Legacy & reflections',          desc: 'What they\'re proudest of, what they hope for, and how they want to be remembered.' },
  { icon: '😄', title: 'Favourite things & memories',   desc: 'The small details — favourite films, songs, meals, places — that make a life complete.' },
]

const steps = [
  { number: '1', title: 'Choose a story type',         desc: 'Pick from Mum\'s Story, Dad\'s Story, Grandad\'s Story, Life Story, and more. Each has 100 questions written for that person\'s life.' },
  { number: '2', title: 'Answer at your own pace',      desc: 'Write answers in the app, or record them by voice. Answer one question or a hundred — everything saves automatically.' },
  { number: '3', title: 'Export or print your book',    desc: 'Download a beautifully designed PDF, or order a professionally printed and bound hardcover book delivered to your door.' },
]

const tiers = [
  { name: 'Story only',       price: '3.99',  desc: 'PDF keepsake for one story',           featured: false },
  { name: 'Story + Photos',   price: '7.99',  desc: 'PDF with photos included',             featured: true  },
  { name: 'All Stories',      price: '11.99', desc: 'All 7 story types unlocked',           featured: false },
  { name: 'Premium',          price: '17.99', desc: 'Photos, premium layouts, all stories', featured: false },
]

useSeo({
  title: 'Life Story Book UK — Create a Keepsake Book in Their Own Words | Tell Me Your Story',
  description: 'Create a life story book for a parent or grandparent. 100 guided questions, voice recordings, and a beautifully printed hardcover book. UK printed and shipped. From £3.99.',
  canonical: 'https://tellmeyourstory.uk/life-story-book',
})
</script>

<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
</style>