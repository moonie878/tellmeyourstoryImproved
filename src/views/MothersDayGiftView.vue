<template>
  <main class="bg-white">

    <!-- Hero -->
    <section class="bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Mother's Day Gift Ideas</p>
        <h1 class="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          The Mother's Day gift<br>
          <em class="text-[#C4A882] italic">she'll treasure forever</em>
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#A8A29E]">
          Not flowers that fade. Not chocolates that disappear. Give Mum or Grandma the chance to capture her life story — in her own words, with her own voice — as a beautiful keepsake book.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <router-link to="/gift" class="rounded-full bg-[#C4A882] px-7 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Gift a life story →</router-link>
          <router-link to="/example" class="rounded-full border border-white/20 px-7 py-3 text-sm font-medium text-white transition hover:bg-white/10">See an example</router-link>
        </div>
      </div>
    </section>

    <!-- Why this gift -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Why this gift is different</p>
        <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Mum's story deserves to be kept</h2>
        <p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-500">Your mum has a lifetime of stories most of the family have never heard. The girl she was before she became your mum. The sacrifices she made. The things that made her laugh. The moments that changed everything.</p>
        <p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-500">This Mother's Day, give her the gift of being asked — and the chance to answer in her own words, at her own pace, for everyone she loves.</p>
      </div>
    </section>

    <!-- Features -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">What she gets</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">A gift that captures a whole life</h2>
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

    <!-- Story types -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Choose the right story</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Written just for her</h2>
        </div>
        <div class="mt-10 grid gap-4 sm:grid-cols-2">
          <div v-for="type in storyTypes" :key="type.title" class="flex items-start gap-4 rounded-2xl border border-stone-200 p-5">
            <span class="text-2xl flex-shrink-0">{{ type.icon }}</span>
            <div>
              <p class="text-sm font-semibold text-stone-900">{{ type.title }}</p>
              <p class="mt-1 text-xs leading-5 text-stone-500">{{ type.desc }}</p>
            </div>
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
        <p class="mt-4 text-xs text-stone-400">Add a printed hardcover book from £21.99 — delivered to her door</p>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-[#1C1917] px-5 py-16 text-center sm:px-8 sm:py-20">
      <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">This Mother's Day</p>
      <h2 class="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">Give Mum the gift of being heard</h2>
      <p class="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#A8A29E]">Her story is irreplaceable. This Mother's Day, give her something that lasts long after the flowers have faded.</p>
      <router-link to="/gift" class="mt-8 inline-block rounded-full bg-[#C4A882] px-8 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Gift a life story today →</router-link>
      <p class="mt-4 text-xs text-[#9C7C5C]">Gift link sent instantly · One-time payment · Printed book from £21.99</p>
    </section>

  </main>
</template>

<script setup lang="ts">
import { useSeo } from '../composables/useSeo'

const features = [
  { icon: '📖', title: '100 guided questions', desc: 'Written for her life — childhood, family, work, love, and legacy. No blank page, no pressure.' },
  { icon: '🎙️', title: 'Her voice, preserved', desc: 'Answer by speaking. A QR code in the printed book lets the family hear her voice any time — forever.' },
  { icon: '📚', title: 'UK printed hardcover', desc: 'Professionally printed and bound in the UK. Delivered to her door. From £21.99.' },
  { icon: '⏱️', title: 'At her own pace', desc: 'One question a day or ten at once. No pressure, no deadline, no subscription running down.' },
  { icon: '✨', title: 'Simple to use', desc: 'Works on phone, tablet, or computer. Simple enough for anyone.' },
  { icon: '🤍', title: 'For the whole family', desc: 'Share with siblings and grandchildren so everyone can read along as the story grows.' },
]

const storyTypes = [
  { icon: '👩', title: "Mum's Story",   desc: 'A story written for a mother — her life, her love, and everything in between.' },
  { icon: '👵', title: "Grandma's Story", desc: 'Her childhood, her family, her traditions, and the wisdom she\'s gathered over a lifetime.' },
  { icon: '📖', title: 'Life Story',    desc: 'A complete life story covering all chapters — ideal for Mum or any woman whose story deserves to be told.' },
  { icon: '🌟', title: 'All Stories',   desc: 'All 7 story types unlocked — for the mum or grandma whose whole family wants to contribute.' },
]

const tiers = [
  { name: 'Story Gift',     price: '3.99',  desc: 'PDF keepsake for one story',           featured: false },
  { name: 'Story + Photos', price: '7.99',  desc: 'PDF with photos included',             featured: true  },
  { name: 'All Stories',    price: '11.99', desc: 'All 7 story types unlocked',           featured: false },
  { name: 'Premium',        price: '17.99', desc: 'Photos, premium layouts, all stories', featured: false },
]

useSeo({
  title: 'Mother\'s Day Gift Ideas 2027 — Tell Me Your Story | Life Story Keepsake Book',
  description: 'The most meaningful Mother\'s Day gift — capture Mum or Grandma\'s life story in a beautiful keepsake book. Guided questions, voice recordings, UK printed hardcover. From £3.99.',
  canonical: 'https://tellmeyourstory.uk/mothers-day-gift-ideas',
})
</script>

<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
</style>