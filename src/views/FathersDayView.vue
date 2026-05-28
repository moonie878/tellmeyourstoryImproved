<template>
  <main class="bg-white">

    <!-- Hero -->
    <section class="bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Father's Day — 15 June 2026</p>
        <h1 class="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          Give Dad the gift of<br><em class="text-[#C4A882] italic">being heard</em>
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#A8A29E]">
          Help Dad capture his life story in his own words — with voice recordings your family can hear forever.
          Free to start. 50% off this Father's Day.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <router-link
            to="/gift?campaign=fathers-day"
            class="rounded-full bg-[#C4A882] px-7 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90"
          >
            Gift Dad's Story — 50% off →
          </router-link>
          <router-link
            to="/story/new/dad"
            class="rounded-full border border-white/20 px-7 py-3 text-sm font-medium text-white transition hover:bg-white/10"
          >
            Start for free instead
          </router-link>
        </div>
        <div class="mt-5 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-[#9C7C5C]">
          <span>✦ 50% off all tiers</span>
          <span>✦ Gift link sent instantly</span>
          <span>✦ Dad redeems at his own pace</span>
        </div>
      </div>
    </section>

    <!-- What Dad gets -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">What Dad gets</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">A story worth keeping forever</h2>
        </div>

        <div class="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          <div class="rounded-2xl border border-stone-200 p-6">
            <p class="text-2xl">📖</p>
            <p class="mt-3 text-sm font-semibold text-stone-900">100 guided questions</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">From his earliest memories to what he wants to be remembered for. Written for a Dad's life.</p>
          </div>
          <div class="rounded-2xl border border-stone-200 p-6">
            <p class="text-2xl">🎙️</p>
            <p class="mt-3 text-sm font-semibold text-stone-900">His voice, preserved forever</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">He can answer by speaking naturally. A QR code in the printed book lets family hear his voice any time.</p>
          </div>
          <div class="rounded-2xl border border-stone-200 p-6">
            <p class="text-2xl">📚</p>
            <p class="mt-3 text-sm font-semibold text-stone-900">A beautiful keepsake</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">Download a professionally designed PDF — or order a printed book delivered to the door.</p>
          </div>
          <div class="rounded-2xl border border-stone-200 p-6">
            <p class="text-2xl">✨</p>
            <p class="mt-3 text-sm font-semibold text-stone-900">AI writing assist</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">Gentle prompts help him expand short answers — the words always stay his.</p>
          </div>
          <div class="rounded-2xl border border-stone-200 p-6">
            <p class="text-2xl">🤍</p>
            <p class="mt-3 text-sm font-semibold text-stone-900">Family can read along</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">Share a link so family can read the story as it grows and leave their own reactions.</p>
          </div>
          <div class="rounded-2xl border border-stone-200 p-6">
            <p class="text-2xl">⏱️</p>
            <p class="mt-3 text-sm font-semibold text-stone-900">His pace, no pressure</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">Everything saves automatically. He can answer one question a day or a hundred — whenever he's ready.</p>
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
      <div class="mx-auto max-w-4xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Father's Day offer — ends 15 June</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">50% off all gift tiers</h2>
          <p class="mt-3 text-sm text-stone-500">Purchase a gift and we'll send you a link to share with Dad. He redeems it at his own pace.</p>
        </div>

        <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="tier in tiers" :key="tier.name" class="rounded-3xl border p-5 text-center" :class="tier.featured ? 'border-[#7C5C3B] bg-[#FAF7F4]' : 'border-stone-200 bg-white'">
            <p v-if="tier.featured" class="mb-2 text-[10px] font-semibold uppercase tracking-wider text-[#7C5C3B]">Most popular</p>
            <p class="text-xs font-medium text-stone-500">{{ tier.name }}</p>
            <div class="mt-2 flex items-center justify-center gap-2">
              <span class="text-2xl font-bold text-stone-900">£{{ tier.salePrice }}</span>
              <span class="text-sm text-stone-400 line-through">£{{ tier.price }}</span>
            </div>
            <p class="mt-2 text-xs leading-5 text-stone-500">{{ tier.desc }}</p>
            <router-link
              to="/gift?campaign=fathers-day"
              class="mt-4 block rounded-full py-2 text-xs font-medium transition"
              :class="tier.featured ? 'bg-[#7C5C3B] text-white hover:opacity-90' : 'border border-stone-300 text-stone-700 hover:bg-stone-50'"
            >
              Gift this →
            </router-link>
          </div>
        </div>

        <p class="mt-8 text-center text-xs text-stone-400">One-time payment · No subscription · Gift link sent instantly to your email</p>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-[#1C1917] px-5 py-16 text-center sm:px-8 sm:py-20">
      <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Father's Day — 15 June 2026</p>
      <h2 class="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">Don't wait until it's too late</h2>
      <p class="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#A8A29E]">
        Dad's stories are irreplaceable. Give him the gift of being heard — and give your family something to treasure forever.
      </p>
      <router-link to="/gift?campaign=fathers-day" class="mt-8 inline-block rounded-full bg-[#C4A882] px-8 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">
        Gift Dad's Story — 50% off →
      </router-link>
    </section>

  </main>
</template>

<script setup lang="ts">
import { useSeo } from '../composables/useSeo'

const tiers = [
  { name: "Dad's Story",          price: '3.99',  salePrice: '2.00', desc: 'PDF keepsake for one story',           featured: false },
  { name: "Dad's Story + Photos", price: '7.99',  salePrice: '4.00', desc: 'PDF with photos included',             featured: true  },
  { name: 'All Stories',          price: '11.99', salePrice: '6.00', desc: 'All 7 story types unlocked',           featured: false },
  { name: 'Premium Keepsake',     price: '17.99', salePrice: '9.00', desc: 'Photos, premium layouts, all stories', featured: false },
]

useSeo({
  title: "Father's Day Gift Ideas 2026 — Give Dad the Gift of His Story | Tell Me Your Story",
  description: "The most meaningful Father's Day gift — help Dad capture his life story in his own words. Voice recordings, keepsake book, QR codes. 50% off this Father's Day.",
  canonical: 'https://tellmeyourstory.uk/fathers-day',
})
</script>

<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
</style>