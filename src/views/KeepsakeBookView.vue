<template>
  <main class="bg-white">

    <!-- Hero -->
    <section class="bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Keepsake Book</p>
        <h1 class="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          Create a keepsake book<br>
          <em class="text-[#C4A882] italic">your family will treasure forever</em>
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#A8A29E]">
          A keepsake book captures the memories, moments, and stories of someone you love — in their own words, with their own voice — turned into a beautifully printed book that lasts for generations.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <router-link to="/register" class="rounded-full bg-[#C4A882] px-7 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Create a keepsake book free →</router-link>
          <router-link to="/example" class="rounded-full border border-white/20 px-7 py-3 text-sm font-medium text-white transition hover:bg-white/10">See an example</router-link>
        </div>
      </div>
    </section>

    <!-- What is a keepsake book -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">What is a keepsake book?</p>
        <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">More than a photo album</h2>
        <p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-500">A keepsake book is a structured record of someone's life — told in their own words. Not just photos, but the stories behind them. Not just dates, but what those moments actually felt like. Something a grandchild will read in 30 years and feel like they really knew their grandparent.</p>
        <div class="mt-6 flex flex-wrap justify-center gap-3">
          <router-link to="/what-is-a-life-story-book" class="text-xs text-[#7C5C3B] underline hover:no-underline">What is a life story book? →</router-link>
          <span class="text-xs text-stone-300">·</span>
          <router-link to="/life-story-questions" class="text-xs text-[#7C5C3B] underline hover:no-underline">See the 150 questions inside →</router-link>
        </div>
      </div>
    </section>

    <!-- Types -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Story types</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">A keepsake book for every person</h2>
        </div>
        <div class="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          <div v-for="type in storyTypes" :key="type.title" class="rounded-2xl bg-white p-5 text-center">
            <p class="text-2xl">{{ type.icon }}</p>
            <p class="mt-3 text-sm font-semibold text-stone-900">{{ type.title }}</p>
            <p class="mt-1 text-xs leading-5 text-stone-500">{{ type.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">What's inside</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">What makes ours different</h2>
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
        <p class="mt-4 text-sm text-[#9C7C5C]">— From a Tell Me Your Story keepsake book</p>
      </div>
    </section>

    <!-- Pricing -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Pricing</p>
        <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Start free, pay once when you're ready</h2>
        <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="tier in tiers" :key="tier.name" class="rounded-3xl border p-5 text-center"
            :class="tier.featured ? 'border-[#7C5C3B] bg-[#FAF7F4]' : 'border-stone-200 bg-white'">
            <p v-if="tier.featured" class="mb-2 text-[10px] font-semibold uppercase tracking-wider text-[#7C5C3B]">Most popular</p>
            <p class="text-xs font-medium text-stone-500">{{ tier.name }}</p>
            <p class="mt-2 text-2xl font-bold text-stone-900">£{{ tier.price }}</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">{{ tier.desc }}</p>
            <router-link to="/register" class="mt-4 block rounded-full py-2 text-xs font-medium transition"
              :class="tier.featured ? 'bg-[#7C5C3B] text-white hover:opacity-90' : 'border border-stone-300 text-stone-700 hover:bg-stone-50'">Get started →</router-link>
          </div>
        </div>
        <p class="mt-4 text-xs text-stone-400">One-time payment · No subscription · Printed book from £34.98</p>
      </div>
    </section>

    <!-- Related pages -->
    <section class="px-5 py-12 sm:px-8">
      <div class="mx-auto max-w-3xl">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C] mb-6">Related reading</p>
        <div class="grid gap-4 sm:grid-cols-3">
          <router-link to="/what-is-a-life-story-book" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">What Is a Life Story Book?</p>
            <p class="mt-1 text-xs text-stone-500">Everything you need to know</p>
          </router-link>
          <router-link to="/life-story-questions" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">150 Life Story Questions</p>
            <p class="mt-1 text-xs text-stone-500">The questions inside every keepsake book</p>
          </router-link>
          <router-link to="/gifts-for-parents-who-have-everything" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Gifts for Parents Who Have Everything</p>
            <p class="mt-1 text-xs text-stone-500">The most meaningful gift you can give</p>
          </router-link>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-[#1C1917] px-5 py-16 text-center sm:px-8 sm:py-20">
      <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Start today</p>
      <h2 class="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">Their story deserves to be kept</h2>
      <p class="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#A8A29E]">Free to start, no commitment. Create a keepsake book today — in their own words, with their own voice.</p>
      <router-link to="/register" class="mt-8 inline-block rounded-full bg-[#C4A882] px-8 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Create a keepsake book free →</router-link>
      <p class="mt-4 text-xs text-[#9C7C5C]">Free to start · One-time payment · Printed book from £34.98</p>
    </section>

  </main>
</template>

<script setup lang="ts">
import { useSeo } from '../composables/useSeo'

const storyTypes = [
  { icon: '👨', title: "Dad's Story",      desc: 'His life, his work, his adventures, and everything he wants the family to know.' },
  { icon: '👩', title: "Mum's Story",      desc: 'Her life, her love, and the stories she\'s never thought to tell.' },
  { icon: '👴', title: "Grandad's Story",  desc: 'His working life, his passions, and the wisdom he\'s gathered over a lifetime.' },
  { icon: '👵', title: "Grandma's Story",  desc: 'Her childhood, her family, and the memories she holds for the whole family.' },
  { icon: '📖', title: 'Life Story',       desc: 'A complete life story covering all chapters of a remarkable life.' },
  { icon: '🌟', title: 'All Stories',      desc: 'All 7 story types — for the family that wants to capture everyone.' },
]

const features = [
  { icon: '📖', title: '100 guided questions', desc: 'Covering every chapter of life — from earliest memories to legacy. No blank page, no pressure.' },
  { icon: '🎙️', title: 'Voice recordings',    desc: 'Record answers by voice. A QR code in the printed book lets family hear them speak — forever.' },
  { icon: '📸', title: 'Photos included',      desc: 'Add photos alongside answers to bring every memory to life on the page.' },
  { icon: '📚', title: 'UK printed hardcover', desc: 'Professionally printed and bound in the UK. Softcover from £34.98, hardcover options available.' },
  { icon: '💷', title: 'One-time payment',     desc: 'Pay once, own forever. No subscription, no annual fee.' },
  { icon: '🤍', title: 'Share with family',   desc: 'A link lets everyone read along as the story grows.' },
]

const tiers = [
  { name: 'Story only',     price: '3.99',  desc: 'PDF keepsake for one story',           featured: false },
  { name: 'Story + Photos', price: '7.99',  desc: 'PDF with photos included',             featured: true  },
  { name: 'All Stories',    price: '11.99', desc: 'All 7 story types unlocked',           featured: false },
  { name: 'Premium',        price: '17.99', desc: 'Photos, premium layouts, all stories', featured: false },
]

useSeo({
  title: 'Keepsake Book UK — Create a Life Story Keepsake Book | Tell Me Your Story',
  description: 'Create a beautiful keepsake book for a parent or grandparent. 100 guided questions, voice recordings, photos, and a professionally printed hardcover. UK delivery. Free to start.',
  canonical: 'https://tellmeyourstory.uk/keepsake-book',
})
</script>

<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
</style>