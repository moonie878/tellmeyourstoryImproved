<template>
  <main class="bg-white">

    <!-- Hero -->
    <section class="bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Family History Book</p>
        <h1 class="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          Create a family history book<br>
          <em class="text-[#C4A882] italic">in their own words</em>
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#A8A29E]">
          A family history book goes beyond dates and names. Tell Me Your Story captures the living memory behind your family tree — the stories, the people, and the moments that made your family who they are.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <router-link to="/register" class="rounded-full bg-[#C4A882] px-7 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">
            Start a family history book free →
          </router-link>
          <router-link to="/example" class="rounded-full border border-white/20 px-7 py-3 text-sm font-medium text-white transition hover:bg-white/10">
            See an example
          </router-link>
        </div>
      </div>
    </section>

    <!-- Beyond the family tree -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Beyond the family tree</p>
        <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Names and dates aren't enough</h2>
        <p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-500">
          Genealogy research tells you who your ancestors were. A family history book tells you what they were like. The stories behind the births, marriages, and deaths. The people who shaped the family — in their own voices, not just their vital records.
        </p>
        <div class="mt-6 flex flex-wrap justify-center gap-3">
          <router-link to="/life-story-questions" class="text-xs text-[#7C5C3B] underline hover:no-underline">150 life story questions to ask →</router-link>
          <span class="text-xs text-stone-300">·</span>
          <router-link to="/how-to-capture-parents-life-story" class="text-xs text-[#7C5C3B] underline hover:no-underline">How to capture a life story →</router-link>
        </div>
        <div class="mt-8 grid gap-5 sm:grid-cols-2">
          <div class="rounded-2xl bg-stone-50 p-6 text-left">
            <p class="text-xs font-semibold uppercase tracking-wider text-stone-400">Family tree research</p>
            <ul class="mt-3 space-y-2 text-xs text-stone-500">
              <li>✓ Names and dates</li>
              <li>✓ Birth, marriage, death records</li>
              <li>✓ Geographic origins</li>
              <li>✗ What they were actually like</li>
              <li>✗ The stories behind the records</li>
              <li>✗ Their voice and personality</li>
            </ul>
          </div>
          <div class="rounded-2xl bg-[#FAF7F4] border border-[#7C5C3B] p-6 text-left">
            <p class="text-xs font-semibold uppercase tracking-wider text-[#7C5C3B]">Tell Me Your Story</p>
            <ul class="mt-3 space-y-2 text-xs text-stone-600">
              <li>✓ Their stories in their own words</li>
              <li>✓ Voice recordings preserved</li>
              <li>✓ Every chapter of their life</li>
              <li>✓ Personality, humour, wisdom</li>
              <li>✓ Beautiful printed hardcover</li>
              <li>✓ QR codes linking to their voice</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- What's captured -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">What gets captured</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Every chapter of a family history</h2>
        </div>
        <div class="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          <div v-for="chapter in chapters" :key="chapter.title" class="rounded-2xl bg-white p-5">
            <p class="text-xl">{{ chapter.icon }}</p>
            <p class="mt-3 text-sm font-semibold text-stone-900">{{ chapter.title }}</p>
            <p class="mt-1 text-xs leading-5 text-stone-500">{{ chapter.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">How it works</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Built for family history</h2>
        </div>
        <div class="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          <div v-for="feature in features" :key="feature.title" class="rounded-2xl border border-stone-200 p-6">
            <p class="text-2xl">{{ feature.icon }}</p>
            <p class="mt-3 text-sm font-semibold text-stone-900">{{ feature.title }}</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">{{ feature.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Quote -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <p class="font-display text-xl italic leading-relaxed text-stone-700 sm:text-2xl">
          "He told me about a motorbike he saved up for two years to buy. I never knew that about him."
        </p>
        <p class="mt-4 text-sm text-[#9C7C5C]">— From a Tell Me Your Story family history book</p>
      </div>
    </section>

    <!-- Related pages -->
    <section class="px-5 py-12 sm:px-8">
      <div class="mx-auto max-w-3xl">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C] mb-6">Related reading</p>
        <div class="grid gap-4 sm:grid-cols-3">
          <router-link to="/life-story-questions" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">150 Life Story Questions</p>
            <p class="mt-1 text-xs text-stone-500">The questions that unlock family stories</p>
          </router-link>
          <router-link to="/how-to-write-a-life-story" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">How to Write a Life Story</p>
            <p class="mt-1 text-xs text-stone-500">A complete guide from start to keepsake</p>
          </router-link>
          <router-link to="/keepsake-book" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Keepsake Book</p>
            <p class="mt-1 text-xs text-stone-500">Everything that goes inside a keepsake book</p>
          </router-link>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-[#1C1917] px-5 py-16 text-center sm:px-8 sm:py-20">
      <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Start today</p>
      <h2 class="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">Your family history deserves more than a spreadsheet</h2>
      <p class="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#A8A29E]">
        Start a family history book today — free, no commitment. Capture the living memory behind your family tree before it's lost.
      </p>
      <router-link to="/register" class="mt-8 inline-block rounded-full bg-[#C4A882] px-8 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">
        Start a family history book free →
      </router-link>
      <p class="mt-4 text-xs text-[#9C7C5C]">Free to start · One-time payment · Printed book from £34.98</p>
    </section>

  </main>
</template>

<script setup lang="ts">
import { useSeo } from '../composables/useSeo'

const chapters = [
  { icon: '🌱', title: 'Origins & childhood',      desc: 'Where the family came from, what childhood was like, and the world they grew up in.' },
  { icon: '💑', title: 'Love & marriage',           desc: 'How they met, their wedding, and the relationships that built the family.' },
  { icon: '👨‍👩‍👧', title: 'Raising a family',     desc: 'What family life was like, the traditions, the hard times, and the proudest moments.' },
  { icon: '💼', title: 'Work & livelihood',         desc: 'How the family earned a living across generations — trades, professions, and businesses.' },
  { icon: '🌍', title: 'Migration & change',        desc: 'Where the family moved, why they moved, and what they left behind.' },
  { icon: '📚', title: 'Values & beliefs',          desc: 'What the family stood for, believed in, and wanted to pass down.' },
  { icon: '💪', title: 'Hardships & resilience',   desc: 'The struggles, losses, and difficult times the family survived.' },
  { icon: '🌟', title: 'Achievements & pride',     desc: 'The moments, milestones, and accomplishments worth remembering.' },
  { icon: '🤍', title: 'Legacy & wisdom',           desc: 'What the family wants future generations to know about them.' },
]

const features = [
  { icon: '📖', title: '100 guided questions',    desc: 'Written for a life story — covering everything from childhood to legacy. No blank page, no pressure.' },
  { icon: '🎙️', title: 'Voice recordings',       desc: 'Capture their voice telling the stories, not just the words. QR codes in the book link to the recordings.' },
  { icon: '📸', title: 'Photos included',         desc: 'Add family photos alongside the answers they relate to — building a true visual family history.' },
  { icon: '📚', title: 'UK printed hardcover',   desc: 'A professionally printed and bound book delivered to the door. Something to put on the family shelf.' },
  { icon: '🤍', title: 'Multiple storytellers',  desc: 'Create separate books for different family members — Mum\'s Story, Dad\'s Story, Grandma\'s Story.' },
  { icon: '💷', title: 'One-time payment',        desc: 'Pay once, own forever. No subscription, no annual fee. Your family history, permanently yours.' },
]

useSeo({
  title: 'Family History Book UK — Capture the Stories Behind Your Family Tree | Tell Me Your Story',
  description: 'Create a family history book that goes beyond names and dates. Guided questions, voice recordings, and a beautifully printed hardcover — the living memory of your family, preserved forever.',
  canonical: 'https://tellmeyourstory.uk/family-history-book',
})
</script>

<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
</style>