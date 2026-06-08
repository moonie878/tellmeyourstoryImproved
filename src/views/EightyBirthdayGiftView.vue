<template>
  <main class="bg-white">

    <!-- Hero -->
    <section class="bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">80th Birthday Gift Ideas</p>
        <h1 class="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          The most meaningful 80th birthday gift<br>
          <em class="text-[#C4A882] italic">for someone who has everything</em>
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#A8A29E]">
          Eight decades of stories, memories, and wisdom. The best gift you can give someone turning 80 is the chance to capture all of it — before it's lost forever.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <router-link to="/gift" class="rounded-full bg-[#C4A882] px-7 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">
            Gift a life story →
          </router-link>
          <router-link to="/example" class="rounded-full border border-white/20 px-7 py-3 text-sm font-medium text-white transition hover:bg-white/10">
            See an example
          </router-link>
        </div>
      </div>
    </section>

    <!-- Why 80 -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Why this birthday is different</p>
        <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Eighty years is an extraordinary life</h2>
        <p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-500">
          Someone turning 80 has lived through more change than almost any generation in history. They've seen the world transform around them. They carry memories of people, places, and moments that exist nowhere else.
        </p>
        <p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-500">
          Most families assume these stories will always be there. They won't — unless someone thinks to ask. An 80th birthday is the moment to do that.
        </p>
      </div>
    </section>

    <!-- What they've lived through -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">What 80 years looks like</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Stories from a lifetime worth capturing</h2>
        </div>
        <div class="mt-10 grid gap-4 sm:grid-cols-2">
          <div v-for="memory in memories" :key="memory.title" class="rounded-2xl bg-white p-5">
            <p class="text-xl">{{ memory.icon }}</p>
            <p class="mt-3 text-sm font-semibold text-stone-900">{{ memory.title }}</p>
            <p class="mt-1 text-xs leading-5 text-stone-500">{{ memory.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- What they get -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">The gift</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">A life story book — in their own words</h2>
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
          <div v-for="tier in tiers" :key="tier.name"
            class="rounded-3xl border p-5 text-center"
            :class="tier.featured ? 'border-[#7C5C3B] bg-[#FAF7F4]' : 'border-stone-200 bg-white'"
          >
            <p v-if="tier.featured" class="mb-2 text-[10px] font-semibold uppercase tracking-wider text-[#7C5C3B]">Most popular</p>
            <p class="text-xs font-medium text-stone-500">{{ tier.name }}</p>
            <p class="mt-2 text-2xl font-bold text-stone-900">£{{ tier.price }}</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">{{ tier.desc }}</p>
            <router-link to="/gift" class="mt-4 block rounded-full py-2 text-xs font-medium transition"
              :class="tier.featured ? 'bg-[#7C5C3B] text-white hover:opacity-90' : 'border border-stone-300 text-stone-700 hover:bg-stone-50'">
              Gift this →
            </router-link>
          </div>
        </div>
        <p class="mt-4 text-xs text-stone-400">Add a printed hardcover book from £34.98 — delivered to their door</p>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-[#1C1917] px-5 py-16 text-center sm:px-8 sm:py-20">
      <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">The 80th birthday gift they'll never forget</p>
      <h2 class="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">Eighty years of stories. Captured forever.</h2>
      <p class="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#A8A29E]">
        Give them the gift of being heard — and give the whole family something they'll treasure for generations.
      </p>
      <router-link to="/gift" class="mt-8 inline-block rounded-full bg-[#C4A882] px-8 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">
        Gift a life story today →
      </router-link>
      <p class="mt-4 text-xs text-[#9C7C5C]">Gift link sent instantly · One-time payment · Printed book from £34.98</p>
    </section>

  </main>
</template>

<script setup lang="ts">
import { useSeo } from '../composables/useSeo'

const memories = [
  { icon: '✈️', title: 'A world transformed', desc: 'They\'ve watched the world change beyond recognition — from black and white TVs to smartphones, from rationing to abundance.' },
  { icon: '💑', title: 'Decades of love', desc: 'Marriages, losses, friendships spanning half a century. The people who shaped them and the relationships that defined their life.' },
  { icon: '👨‍👩‍👧', title: 'A family built', desc: 'Children raised, grandchildren watched grow up. The quiet sacrifices and the proudest moments of a parent and grandparent.' },
  { icon: '💪', title: 'Hardships survived', desc: 'Things they\'ve been through that the family may never fully know — and wisdom earned the hard way that deserves to be passed on.' },
  { icon: '🌍', title: 'History lived', desc: 'They\'ve lived through events that are now in history books. Their personal memories of those moments are irreplaceable.' },
  { icon: '🤍', title: 'Wisdom accumulated', desc: 'Eight decades of lessons, regrets, joys, and hard-won perspective. Things your children and grandchildren need to hear.' },
]

const features = [
  { icon: '📖', title: '100 guided questions', desc: 'Written for their life — childhood, work, family, love, and legacy. No blank page, no pressure.' },
  { icon: '🎙️', title: 'Voice recordings', desc: 'Answer by speaking. A QR code in the printed book lets family hear their voice any time — forever.' },
  { icon: '📚', title: 'UK printed hardcover', desc: 'Professionally printed and bound in the UK. Delivered to their door. From £34.98.' },
  { icon: '⏱️', title: 'No time pressure', desc: 'Answer one question a day or ten at once. No subscription running down.' },
  { icon: '✨', title: 'Simple to use', desc: 'Works on phone, tablet, or computer. Simple enough for anyone.' },
  { icon: '🤍', title: 'The whole family', desc: 'Share a link so children, grandchildren, and great-grandchildren can all read along.' },
]

const tiers = [
  { name: 'Story Gift',     price: '3.99',  desc: 'PDF keepsake for one story',           featured: false },
  { name: 'Story + Photos', price: '7.99',  desc: 'PDF with photos included',             featured: true  },
  { name: 'All Stories',    price: '11.99', desc: 'All 7 story types unlocked',           featured: false },
  { name: 'Premium',        price: '17.99', desc: 'Photos, premium layouts, all stories', featured: false },
]

useSeo({
  title: '80th Birthday Gift Ideas 2026 — Tell Me Your Story | Life Story Keepsake Book',
  description: 'The most meaningful 80th birthday gift for someone who has everything — capture 80 years of stories in a beautiful keepsake book. UK printed, voice recordings included. From £3.99.',
  canonical: 'https://tellmeyourstory.uk/80th-birthday-gift-ideas',
})
</script>

<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
</style>