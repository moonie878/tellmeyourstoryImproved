<template>
  <main class="bg-white">

    <!-- Hero -->
    <section class="bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">90th Birthday Gift Ideas</p>
        <h1 class="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          The most meaningful 90th birthday gift<br>
          <em class="text-[#C4A882] italic">nine decades of stories deserve</em>
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#A8A29E]">
          Reaching 90 is extraordinary. Nine decades of memories, people, and moments that exist nowhere else in the world. The best gift you can give is helping them capture it all — before it's lost.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <router-link to="/gift" class="rounded-full bg-[#C4A882] px-7 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Gift a life story →</router-link>
          <router-link to="/example" class="rounded-full border border-white/20 px-7 py-3 text-sm font-medium text-white transition hover:bg-white/10">See an example</router-link>
        </div>
      </div>
    </section>

    <!-- Why 90 -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Why this birthday is unlike any other</p>
        <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Nine decades of living history</h2>
        <p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-500">Someone turning 90 was born in the 1930s or earlier. They've lived through the Second World War, the birth of the NHS, the moon landing, the internet, and everything in between. Their personal memories of those events are irreplaceable — and they're running out of time to share them.</p>
        <p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-500">A 90th birthday is not the time for another bouquet of flowers. It's the moment to capture something that will outlast all of you.</p>
        <div class="mx-auto mt-6 max-w-xl flex flex-wrap justify-center gap-3">
          <router-link to="/80th-birthday-gift-ideas" class="text-xs text-[#7C5C3B] underline hover:no-underline">80th birthday gift ideas →</router-link>
          <span class="text-xs text-stone-300">·</span>
          <router-link to="/questions-to-ask-elderly-parents" class="text-xs text-[#7C5C3B] underline hover:no-underline">100 questions to ask elderly parents →</router-link>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">What they get</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">A life story book — in their own words</h2>
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

    <!-- Quote -->
    <section class="px-5 py-16 sm:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <p class="font-display text-xl italic leading-relaxed text-stone-700 sm:text-2xl">"He told me about a motorbike he saved up for two years to buy. I never knew that about him."</p>
        <p class="mt-4 text-sm text-[#9C7C5C]">— From a Tell Me Your Story keepsake</p>
      </div>
    </section>

    <!-- Pricing -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Pricing</p>
        <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Choose the right gift</h2>
        <p class="mt-3 text-sm text-stone-500">One-time payment. Gift link sent instantly. No subscription.</p>
        <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="tier in tiers" :key="tier.name" class="rounded-3xl border p-5 text-center"
            :class="tier.featured ? 'border-[#7C5C3B] bg-[#FAF7F4]' : 'border-stone-200 bg-white'">
            <p v-if="tier.featured" class="mb-2 text-[10px] font-semibold uppercase tracking-wider text-[#7C5C3B]">Most popular</p>
            <p class="text-xs font-medium text-stone-500">{{ tier.name }}</p>
            <p class="mt-2 text-2xl font-bold text-stone-900">£{{ tier.price }}</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">{{ tier.desc }}</p>
            <router-link to="/gift" class="mt-4 block rounded-full py-2 text-xs font-medium transition"
              :class="tier.featured ? 'bg-[#7C5C3B] text-white hover:opacity-90' : 'border border-stone-300 text-stone-700 hover:bg-stone-50'">Gift this →</router-link>
          </div>
        </div>
        <p class="mt-4 text-xs text-stone-400">Add a printed hardcover book from £34.98 — delivered to their door</p>
      </div>
    </section>

    <!-- Related pages -->
    <section class="px-5 py-12 sm:px-8">
      <div class="mx-auto max-w-3xl">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C] mb-6">Related reading</p>
        <div class="grid gap-4 sm:grid-cols-3">
          <router-link to="/80th-birthday-gift-ideas" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">80th Birthday Gift Ideas</p>
            <p class="mt-1 text-xs text-stone-500">Eight decades of stories worth keeping</p>
          </router-link>
          <router-link to="/gifts-for-parents-who-have-everything" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Gifts for Parents Who Have Everything</p>
            <p class="mt-1 text-xs text-stone-500">The gift no one else can give</p>
          </router-link>
          <router-link to="/questions-to-ask-elderly-parents" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Questions to Ask Elderly Parents</p>
            <p class="mt-1 text-xs text-stone-500">100 questions to draw out their stories</p>
          </router-link>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-[#1C1917] px-5 py-16 text-center sm:px-8 sm:py-20">
      <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">The 90th birthday gift they'll never forget</p>
      <h2 class="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">Nine decades of stories. Captured forever.</h2>
      <p class="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#A8A29E]">Give them the gift of being heard — and give the whole family something they'll treasure for generations.</p>
      <router-link to="/gift" class="mt-8 inline-block rounded-full bg-[#C4A882] px-8 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Gift a life story today →</router-link>
      <p class="mt-4 text-xs text-[#9C7C5C]">Gift link sent instantly · One-time payment · Printed book from £34.98</p>
    </section>

  </main>
</template>

<script setup lang="ts">
import { useSeo } from '../composables/useSeo'

const features = [
  { icon: '📖', title: '100 guided questions', desc: 'Covering every chapter of nine decades — childhood, work, family, love, and legacy.' },
  { icon: '🎙️', title: 'Voice recordings', desc: 'Answer by speaking. Their voice preserved in the printed book via QR codes — forever.' },
  { icon: '📚', title: 'UK printed hardcover', desc: 'Professionally printed and bound. Delivered to their door. From £34.98.' },
  { icon: '⏱️', title: 'At their own pace', desc: 'One question at a time, no pressure, no deadline. Everything saves automatically.' },
  { icon: '✨', title: 'Simple to use', desc: 'Works on any phone, tablet, or computer. Simple enough for anyone at any age.' },
  { icon: '🤍', title: 'For the whole family', desc: 'Share with children, grandchildren, and great-grandchildren — all reading together.' },
]

const tiers = [
  { name: 'Story Gift',     price: '3.99',  desc: 'PDF keepsake for one story',           featured: false },
  { name: 'Story + Photos', price: '7.99',  desc: 'PDF with photos included',             featured: true  },
  { name: 'All Stories',    price: '11.99', desc: 'All 7 story types unlocked',           featured: false },
  { name: 'Premium',        price: '17.99', desc: 'Photos, premium layouts, all stories', featured: false },
]

useSeo({
  title: '90th Birthday Gift Ideas 2026 — Tell Me Your Story | Life Story Keepsake Book',
  description: 'The most meaningful 90th birthday gift — capture nine decades of stories in a beautiful keepsake book. Guided questions, voice recordings, UK printed hardcover. From £3.99.',
  canonical: 'https://tellmeyourstory.uk/90th-birthday-gift-ideas',
})
</script>

<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
</style>