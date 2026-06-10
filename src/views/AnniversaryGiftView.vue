<template>
  <main class="bg-white">

    <!-- Hero -->
    <section class="bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Anniversary Gift Ideas</p>
        <h1 class="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          The most meaningful anniversary gift<br>
          <em class="text-[#C4A882] italic">for a couple who have everything</em>
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#A8A29E]">
          Give a couple the chance to capture their love story — from how they met to what they've built together. A keepsake book the whole family will treasure.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <router-link to="/gift" class="rounded-full bg-[#C4A882] px-7 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Gift a life story →</router-link>
          <router-link to="/example" class="rounded-full border border-white/20 px-7 py-3 text-sm font-medium text-white transition hover:bg-white/10">See an example</router-link>
        </div>
      </div>
    </section>

    <!-- Milestone anniversaries -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Every milestone deserves it</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Perfect for every anniversary</h2>
        </div>
        <div class="mt-10 grid gap-4 sm:grid-cols-2">
          <div v-for="milestone in milestones" :key="milestone.title" class="rounded-2xl border border-stone-200 p-5">
            <div class="flex items-start gap-4">
              <span class="text-2xl flex-shrink-0">{{ milestone.icon }}</span>
              <div>
                <p class="text-sm font-semibold text-stone-900">{{ milestone.title }}</p>
                <p class="mt-1 text-xs leading-5 text-stone-500">{{ milestone.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- What's inside -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">What goes inside</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">A love story, captured in full</h2>
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
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">What they get</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">More than a gift — a family heirloom</h2>
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
        <p class="font-display text-xl italic leading-relaxed text-stone-700 sm:text-2xl">"He told me about a motorbike he saved up for two years to buy. I never knew that about him."</p>
        <p class="mt-4 text-sm text-[#9C7C5C]">— From a Tell Me Your Story keepsake</p>
      </div>
    </section>

    <!-- Pricing -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Pricing</p>
        <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Choose the right gift</h2>
        <p class="mt-3 text-sm text-stone-500">One-time payment. Gift link sent instantly. No subscription.</p>
        <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="tier in tiers" :key="tier.name" class="rounded-3xl border p-5 text-center" :class="tier.featured ? 'border-[#7C5C3B] bg-[#FAF7F4]' : 'border-stone-200 bg-white'">
            <p v-if="tier.featured" class="mb-2 text-[10px] font-semibold uppercase tracking-wider text-[#7C5C3B]">Most popular</p>
            <p class="text-xs font-medium text-stone-500">{{ tier.name }}</p>
            <p class="mt-2 text-2xl font-bold text-stone-900">£{{ tier.price }}</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">{{ tier.desc }}</p>
            <router-link to="/gift" class="mt-4 block rounded-full py-2 text-xs font-medium transition" :class="tier.featured ? 'bg-[#7C5C3B] text-white hover:opacity-90' : 'border border-stone-300 text-stone-700 hover:bg-stone-50'">Gift this →</router-link>
          </div>
        </div>
        <p class="mt-4 text-xs text-stone-400">Add a printed hardcover from £34.98 — delivered to their door</p>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-[#1C1917] px-5 py-16 text-center sm:px-8 sm:py-20">
      <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">The anniversary gift that lasts</p>
      <h2 class="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">Their love story. Kept forever.</h2>
      <p class="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#A8A29E]">A gift the whole family will treasure — a record of a love story told in their own words.</p>
      <router-link to="/gift" class="mt-8 inline-block rounded-full bg-[#C4A882] px-8 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Gift a life story today →</router-link>
      <p class="mt-4 text-xs text-[#9C7C5C]">Gift link sent instantly · One-time payment · Printed book from £34.98</p>
    </section>

  </main>
</template>

<script setup lang="ts">
import { useSeo } from '../composables/useSeo'

const milestones = [
  { icon: '💍', title: 'Silver anniversary — 25 years', desc: 'A quarter century of love. The perfect time to capture the story of how it all began.' },
  { icon: '🥇', title: 'Golden anniversary — 50 years', desc: 'Fifty years together is extraordinary. Their love story deserves to be preserved forever.' },
  { icon: '💎', title: 'Diamond anniversary — 60 years', desc: 'Six decades of marriage. A keepsake book for the ages.' },
  { icon: '🌹', title: 'Any anniversary', desc: 'Every year of a marriage is worth celebrating — and the stories are always worth capturing.' },
]

const chapters = [
  { icon: '💑', title: 'How they met',         desc: 'The full story of where they were, what happened, and when they knew.' },
  { icon: '💍', title: 'The proposal',          desc: 'How it happened, who knew, and what the answer felt like.' },
  { icon: '👰', title: 'The wedding day',       desc: 'Every detail they remember of the day they got married.' },
  { icon: '🏠', title: 'Building a life',       desc: 'First home, first challenges, the years they built something together.' },
  { icon: '👨‍👩‍👧', title: 'Family life',       desc: 'Raising children, family traditions, and the memories made at home.' },
  { icon: '🤍', title: 'What love means now',   desc: 'What they\'ve learned about love after all these years together.' },
]

const features = [
  { icon: '📖', title: '100 guided questions', desc: 'Questions written for a life story — covering their whole journey together and individually.' },
  { icon: '🎙️', title: 'Voice recordings',    desc: 'Their voices preserved in the printed book via QR codes — forever.' },
  { icon: '📚', title: 'UK printed hardcover', desc: 'Professionally printed and bound. Delivered to their door. From £34.98.' },
  { icon: '📸', title: 'Photos included',      desc: 'Add photos alongside the answers they relate to.' },
  { icon: '💷', title: 'One-time payment',     desc: 'Pay once, own forever. No subscription.' },
  { icon: '🤍', title: 'For the whole family', desc: 'Children and grandchildren can read along as the story grows.' },
]

const tiers = [
  { name: 'Story Gift',     price: '3.99',  desc: 'PDF keepsake for one story',           featured: false },
  { name: 'Story + Photos', price: '7.99',  desc: 'PDF with photos included',             featured: true  },
  { name: 'All Stories',    price: '11.99', desc: 'All 7 story types unlocked',           featured: false },
  { name: 'Premium',        price: '17.99', desc: 'Photos, premium layouts, all stories', featured: false },
]

useSeo({
  title: 'Anniversary Gift Ideas 2026 — Tell Me Your Story | Life Story Keepsake Book',
  description: 'The most meaningful anniversary gift — capture a couple\'s love story in a beautiful keepsake book. Perfect for silver, golden and diamond anniversaries. UK printed, from £3.99.',
  canonical: 'https://tellmeyourstory.uk/anniversary-gift-ideas',
})
</script>

<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
</style>