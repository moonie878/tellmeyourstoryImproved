<template>
  <main class="bg-white">

    <!-- Hero -->
    <section class="bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">StoryKeeper Alternative</p>
        <h1 class="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          The best StoryKeeper alternative<br>
          <em class="text-[#C4A882] italic">for UK families</em>
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#A8A29E]">
          StoryKeeper costs $99 upfront, rewrites your loved one's words with AI, and ships from abroad. Tell Me Your Story is free to start, keeps their exact words, and prints in the UK.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <router-link to="/register" class="rounded-full bg-[#C4A882] px-7 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Try Tell Me Your Story free →</router-link>
          <router-link to="/storykeeper-review" class="rounded-full border border-white/20 px-7 py-3 text-sm font-medium text-white transition hover:bg-white/10">Read our StoryKeeper review</router-link>
        </div>
      </div>
    </section>

    <!-- Why people look for alternatives -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Why families look for alternatives</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Three reasons UK families choose something else</h2>
        </div>
        <div class="mt-8 space-y-4">
          <div v-for="reason in reasons" :key="reason.title" class="rounded-2xl border border-stone-200 p-5 flex gap-4">
            <span class="text-xl flex-shrink-0">{{ reason.icon }}</span>
            <div>
              <p class="text-sm font-semibold text-stone-900">{{ reason.title }}</p>
              <p class="mt-1 text-xs leading-5 text-stone-500">{{ reason.desc }}</p>
            </div>
          </div>
        </div>
        <div class="mt-6 flex flex-wrap justify-center gap-3">
          <router-link to="/storykeeper-review" class="text-xs text-[#7C5C3B] underline hover:no-underline">Read our full StoryKeeper review →</router-link>
          <span class="text-xs text-stone-300">·</span>
          <router-link to="/storyworth-alternative" class="text-xs text-[#7C5C3B] underline hover:no-underline">Also comparing Storyworth? →</router-link>
        </div>
      </div>
    </section>

    <!-- The alternative -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">The UK alternative</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Tell Me Your Story — built for UK families</h2>
          <p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-500">Everything StoryKeeper does — voice recordings, QR codes, printed hardcover books — built by a UK founder, for UK families, with UK printing and a free starting tier.</p>
        </div>
        <div class="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          <div v-for="feature in features" :key="feature.title" class="rounded-2xl bg-white p-6">
            <p class="text-2xl">{{ feature.icon }}</p>
            <p class="mt-3 text-sm font-semibold text-stone-900">{{ feature.title }}</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">{{ feature.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Comparison -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Side by side</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">StoryKeeper vs Tell Me Your Story</h2>
        </div>
        <div class="mt-10 overflow-x-auto">
          <table class="w-full text-xs">
            <thead>
              <tr>
                <th class="text-left py-3 px-4 text-stone-400 font-medium w-1/3"></th>
                <th class="py-3 px-4 text-center font-semibold text-stone-900 bg-stone-50 rounded-t-xl">StoryKeeper</th>
                <th class="py-3 px-4 text-center font-semibold text-white bg-[#1C1917] rounded-t-xl">Tell Me Your Story</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, i) in comparisonRows" :key="row.feature" :class="i % 2 === 0 ? 'bg-stone-50' : 'bg-white'">
                <td class="py-3 px-4 text-stone-600 font-medium">{{ row.feature }}</td>
                <td class="py-3 px-4 text-center text-stone-600">{{ row.them }}</td>
                <td class="py-3 px-4 text-center text-stone-900 font-medium bg-[#FAF7F4]">{{ row.us }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- The AI words question -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">The most important difference</p>
        <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Whose words are in the book?</h2>
        <p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-500">StoryKeeper uses AI and professional editors to shape spoken answers into polished narratives. The result reads well — but it's not exactly what your parent said. The specific phrases they chose, their way of telling a story, their personality — these can get edited out in the process.</p>
        <p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-500">Tell Me Your Story preserves every answer exactly as given. The words in the book are always theirs — not an AI's version of them. In 30 years, your grandchildren will be reading the actual words their great-grandparent spoke.</p>
      </div>
    </section>

    <!-- Pricing -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Pricing</p>
        <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Free to start — pay when you're ready</h2>
        <p class="mt-3 text-sm text-stone-500">Tell Me Your Story is free to try — 5 questions included, then pay once from £3.99 to unlock everything.</p>
        <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="tier in tiers" :key="tier.name" class="rounded-3xl border p-5 text-center" :class="tier.featured ? 'border-[#7C5C3B] bg-[#FAF7F4]' : 'border-stone-200 bg-white'">
            <p v-if="tier.featured" class="mb-2 text-[10px] font-semibold uppercase tracking-wider text-[#7C5C3B]">Most popular</p>
            <p class="text-xs font-medium text-stone-500">{{ tier.name }}</p>
            <p class="mt-2 text-2xl font-bold text-stone-900">£{{ tier.price }}</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">{{ tier.desc }}</p>
            <router-link to="/register" class="mt-4 block rounded-full py-2 text-xs font-medium transition" :class="tier.featured ? 'bg-[#7C5C3B] text-white hover:opacity-90' : 'border border-stone-300 text-stone-700 hover:bg-stone-50'">Get started →</router-link>
          </div>
        </div>
        <p class="mt-4 text-xs text-stone-400">One-time payment · No subscription · UK printed book from £34.98</p>
      </div>
    </section>

    <!-- Related pages -->
    <section class="bg-[#F5F0E8] px-5 py-12 sm:px-8">
      <div class="mx-auto max-w-3xl">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C] mb-6">Related reading</p>
        <div class="grid gap-4 sm:grid-cols-3">
          <router-link to="/storykeeper-review" class="rounded-2xl border border-stone-200 bg-white p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">StoryKeeper Review 2026</p>
            <p class="mt-1 text-xs text-stone-500">Full honest review — pros, cons, real costs</p>
          </router-link>
          <router-link to="/storyworth-alternative" class="rounded-2xl border border-stone-200 bg-white p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Storyworth Alternative</p>
            <p class="mt-1 text-xs text-stone-500">Also comparing Storyworth?</p>
          </router-link>
          <router-link to="/remento-alternative" class="rounded-2xl border border-stone-200 bg-white p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Remento Alternative</p>
            <p class="mt-1 text-xs text-stone-500">Also comparing Remento?</p>
          </router-link>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-[#1C1917] px-5 py-16 text-center sm:px-8 sm:py-20">
      <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Try it free today</p>
      <h2 class="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">The UK alternative to StoryKeeper</h2>
      <p class="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#A8A29E]">Free to start. Their exact words. Their own voice. UK printed hardcover. No upfront commitment.</p>
      <router-link to="/register" class="mt-8 inline-block rounded-full bg-[#C4A882] px-8 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Start free today →</router-link>
      <p class="mt-4 text-xs text-[#9C7C5C]">Free to start · One-time payment · UK printed book from £21.99</p>
    </section>

  </main>
</template>

<script setup lang="ts">
import { useSeo } from '../composables/useSeo'

const reasons = [
  { icon: '💵', title: '$99 upfront before you\'ve tried anything', desc: 'StoryKeeper requires a $99 payment before you can properly experience the platform. For families unsure whether their parent will engage, that\'s a significant commitment. Tell Me Your Story lets you try 5 questions free — you pay once from £3.99 when you\'re ready to unlock the full set and export.'},
  { icon: '🤖', title: 'AI rewrites your loved one\'s words', desc: 'StoryKeeper uses AI and professional editors to shape spoken answers into polished narratives. The result reads well — but it\'s not exactly what your parent said. If preserving their authentic voice matters to you, this is worth thinking about carefully.' },
  { icon: '🇬🇧', title: 'Not built for UK families', desc: 'StoryKeeper is an Ireland-based company operating globally. Their UK subdirectory has only a handful of pages. Tell Me Your Story is built by a UK founder, for UK families, with UK printing and delivery.' },
]

const features = [
  { icon: '🎙️', title: 'Voice recordings',       desc: 'Record answers by speaking. Their voice preserved in the printed book via QR codes — forever.' },
  { icon: '📚', title: 'UK printed hardcover',    desc: 'Professionally printed and delivered in the UK. Softcover from £34.98, hardcover available.' },
  { icon: '💷', title: 'Free to start',           desc: 'No upfront payment. Try 5 questions free, pay once from £3.99 to unlock everything.' },
  { icon: '✍️', title: 'Their exact words',       desc: 'No AI rewriting. Every answer preserved exactly as given — their voice, their phrases, their personality.' },
  { icon: '📸', title: 'Photos included',         desc: 'Add photos alongside answers to bring every memory to life on the page.' },
  { icon: '🤍', title: 'Share with family',       desc: 'Share with the whole family so everyone can read along as the story grows.' },
]

const comparisonRows = [
  { feature: 'Free to start',         them: '✗ $99 upfront',         us: '✓ Free tier available' },
  { feature: 'UK-based',              them: '✗ Ireland / global',    us: '✓ Southampton, UK' },
  { feature: 'UK printing',           them: '✗ International',       us: '✓ UK printed' },
  { feature: 'Voice recordings',      them: '✓ Yes',                 us: '✓ Yes' },
  { feature: 'QR codes in book',      them: '✓ Yes',                 us: '✓ Yes' },
  { feature: 'Preserves exact words', them: '✗ AI rewrites answers', us: '✓ Words unchanged' },
  { feature: 'One-time payment',      them: '✓ $99',                 us: '✓ From £3.99' },
  { feature: 'Gift purchase',         them: '✓ Yes',                 us: '✓ Yes' },
  { feature: 'Entry price',           them: '$99 (~£78)',             us: 'Free / from £3.99' },
]

const tiers = [
  { name: 'Story only',     price: '3.99',  desc: 'PDF keepsake for one story',           featured: false },
  { name: 'Story + Photos', price: '7.99',  desc: 'PDF with photos included',             featured: true  },
  { name: 'All Stories',    price: '11.99', desc: 'All 7 story types unlocked',           featured: false },
  { name: 'Premium',        price: '17.99', desc: 'Photos, premium layouts, all stories', featured: false },
]

useSeo({
  title: 'StoryKeeper Alternative UK 2026 — Tell Me Your Story | Free to Start, UK Printed',
  description: 'Looking for a StoryKeeper alternative? Tell Me Your Story is free to start, keeps your loved one\'s exact words, and prints in the UK. No $99 upfront fee.',
  canonical: 'https://tellmeyourstory.uk/storykeeper-alternative',
})
</script>

<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
</style>