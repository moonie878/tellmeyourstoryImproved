<template>
  <main class="bg-white">

    <!-- Hero -->
    <section class="bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Gift for Someone Who Has Everything</p>
        <h1 class="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          The perfect gift for someone<br>
          <em class="text-[#C4A882] italic">who has everything</em>
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#A8A29E]">
          When someone has everything they need, give them something no one else can — the chance to capture their life story. Their memories, their voice, their wisdom. Kept forever.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <router-link to="/gift" class="rounded-full bg-[#C4A882] px-7 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Give this gift →</router-link>
          <router-link to="/example" class="rounded-full border border-white/20 px-7 py-3 text-sm font-medium text-white transition hover:bg-white/10">See an example</router-link>
        </div>
      </div>
    </section>

    <!-- Why experiences fail -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Why most gifts don't work</p>
        <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">They don't need more things</h2>
        <p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-500">People who have everything have usually spent a lifetime accumulating what they need. More things isn't the answer. The jumper goes unworn, the experience voucher goes unused, the chocolates sit in a drawer.</p>
        <p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-500">But there's one thing they have that nobody else in the world has — a lifetime of stories. And most of those stories will never be told unless someone asks.</p>
        <div class="mx-auto mt-6 max-w-xl flex flex-wrap justify-center gap-3">
          <router-link to="/gifts-for-parents-who-have-everything" class="text-xs text-[#7C5C3B] underline hover:no-underline">Gifts for parents who have everything →</router-link>
          <span class="text-xs text-stone-300">·</span>
          <router-link to="/life-story-questions" class="text-xs text-[#7C5C3B] underline hover:no-underline">Questions to draw out their stories →</router-link>
        </div>
      </div>
    </section>

    <!-- Gift ideas -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Gift ideas compared</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">What actually works</h2>
        </div>
        <div class="mt-10 space-y-4">
          <div v-for="gift in gifts" :key="gift.title" class="rounded-2xl bg-white p-5">
            <div class="flex items-start gap-4">
              <span class="text-2xl flex-shrink-0">{{ gift.icon }}</span>
              <div class="flex-1">
                <div class="flex items-center justify-between gap-3 flex-wrap">
                  <p class="text-sm font-semibold text-stone-900">{{ gift.title }}</p>
                  <span class="text-xs font-medium rounded-full px-3 py-1 flex-shrink-0" :class="gift.highlight ? 'bg-[#7C5C3B] text-white' : gift.negative ? 'bg-red-50 text-red-500' : 'bg-stone-100 text-stone-500'">{{ gift.tag }}</span>
                </div>
                <p class="mt-2 text-xs leading-5 text-stone-500">{{ gift.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">What Tell Me Your Story includes</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">A gift that lasts for generations</h2>
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
        <p class="mt-4 text-xs text-stone-400">Add a printed hardcover from £21.99 — delivered to their door</p>
      </div>
    </section>

    <!-- Related pages -->
    <section class="px-5 py-12 sm:px-8">
      <div class="mx-auto max-w-3xl">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C] mb-6">Related reading</p>
        <div class="grid gap-4 sm:grid-cols-3">
          <router-link to="/gifts-for-parents-who-have-everything" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Gifts for Parents Who Have Everything</p>
            <p class="mt-1 text-xs text-stone-500">Specifically for mums, dads and grandparents</p>
          </router-link>
          <router-link to="/70th-birthday-gift-ideas" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">70th Birthday Gift Ideas</p>
            <p class="mt-1 text-xs text-stone-500">The most meaningful milestone birthday gift</p>
          </router-link>
          <router-link to="/anniversary-gift-ideas" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Anniversary Gift Ideas</p>
            <p class="mt-1 text-xs text-stone-500">A love story captured forever</p>
          </router-link>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-[#1C1917] px-5 py-16 text-center sm:px-8 sm:py-20">
      <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">The gift they'll never forget</p>
      <h2 class="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">Give them the gift of being heard</h2>
      <p class="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#A8A29E]">Their stories are irreplaceable. This is the gift that captures them — and gives everyone something to treasure forever.</p>
      <router-link to="/gift" class="mt-8 inline-block rounded-full bg-[#C4A882] px-8 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Give this gift today →</router-link>
      <p class="mt-4 text-xs text-[#9C7C5C]">Gift link sent instantly · One-time payment · Printed book from £21.99</p>
    </section>

  </main>
</template>

<script setup lang="ts">
import { useSeo } from '../composables/useSeo'

const gifts = [
  { icon: '📖', title: 'A life story book — Tell Me Your Story', tag: 'Most meaningful', highlight: true, negative: false, desc: '100 guided questions, voice recordings, and a beautifully printed hardcover. Their stories preserved forever. A gift that lasts for generations.' },
  { icon: '🌸', title: 'Flowers', tag: 'Gone in a week', highlight: false, negative: true, desc: 'A kind gesture but short-lived. Better as an accompanying gift.' },
  { icon: '🎁', title: 'Gift vouchers', tag: 'Often unused', highlight: false, negative: true, desc: 'Practical but impersonal. Many go unused. Not the answer for a meaningful occasion.' },
  { icon: '✈️', title: 'Experience day', tag: 'Enjoyable', highlight: false, negative: false, desc: 'Fun in the moment but the memory fades. The story behind it is worth capturing too.' },
  { icon: '📸', title: 'Photo book', tag: 'Sentimental', highlight: false, negative: false, desc: 'Captures moments — but not the stories behind them. Pair with Tell Me Your Story for something complete.' },
]

const features = [
  { icon: '📖', title: '100 guided questions', desc: 'Covering every chapter of their life — no blank page, no pressure.' },
  { icon: '🎙️', title: 'Voice recordings',    desc: 'Their voice preserved in the printed book via QR codes — forever.' },
  { icon: '📚', title: 'UK printed hardcover', desc: 'Professionally printed and bound. Delivered to their door. From £21.99.' },
  { icon: '💷', title: 'One-time payment',     desc: 'Pay once, own forever. No subscription.' },
  { icon: '⏱️', title: 'No pressure',          desc: 'Answer at their own pace. No weekly emails, no deadline.' },
  { icon: '🤍', title: 'For the whole family', desc: 'Share with everyone so the whole family can read along.' },
]

const tiers = [
  { name: 'Story Gift',     price: '3.99',  desc: 'PDF keepsake for one story',           featured: false },
  { name: 'Story + Photos', price: '7.99',  desc: 'PDF with photos included',             featured: true  },
  { name: 'All Stories',    price: '11.99', desc: 'All 7 story types unlocked',           featured: false },
  { name: 'Premium',        price: '17.99', desc: 'Photos, premium layouts, all stories', featured: false },
]

useSeo({
  title: 'Gift for Someone Who Has Everything UK 2026 — Tell Me Your Story',
  description: 'The best gift for someone who has everything — capture their life story in a beautiful keepsake book. Guided questions, voice recordings, UK printed hardcover. From £3.99.',
  canonical: 'https://tellmeyourstory.uk/gift-for-someone-who-has-everything',
})
</script>

<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
</style>