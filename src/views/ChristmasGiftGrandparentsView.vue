<template>
  <main class="bg-white">

    <!-- Hero -->
    <section class="bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Christmas Gift Ideas for Grandparents</p>
        <h1 class="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          The Christmas gift your grandparents<br>
          <em class="text-[#C4A882] italic">will treasure forever</em>
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#A8A29E]">
          Not another jumper. Not a box of chocolates. This Christmas, give Grandma or Grandad the chance to capture their life story — in their own words, with their own voice — as a beautiful keepsake book.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <router-link
            to="/gift?campaign=christmas"
            class="rounded-full bg-[#C4A882] px-7 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90"
          >
            Gift a story this Christmas →
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

    <!-- Why this gift -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Why this gift is different</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Most gifts get forgotten. This one gets passed down.</h2>
        </div>
        <div class="mt-8 text-sm leading-7 text-stone-600 text-center max-w-xl mx-auto">
          <p>Your grandparents have lived through things you'll never fully know. The world they grew up in. The struggles they faced. The small moments that stayed with them for life.</p>
          <p class="mt-4">Tell Me Your Story gives them a structured, guided way to share all of it — answered at their own pace, in their own words. And when it's done, it becomes a printed keepsake book your whole family will treasure for generations.</p>
        </div>
      </div>
    </section>

    <!-- What they get -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">What they get</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">A gift that captures a whole life</h2>
        </div>
        <div class="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          <div class="rounded-2xl bg-white p-6">
            <p class="text-2xl">📖</p>
            <p class="mt-3 text-sm font-semibold text-stone-900">100 guided questions</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">Written for their life — childhood, family, work, love, lessons, and legacy. No blank page, no pressure.</p>
          </div>
          <div class="rounded-2xl bg-white p-6">
            <p class="text-2xl">🎙️</p>
            <p class="mt-3 text-sm font-semibold text-stone-900">Their voice, preserved</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">Answer by speaking naturally. A QR code in the printed book lets grandchildren hear their voice any time — forever.</p>
          </div>
          <div class="rounded-2xl bg-white p-6">
            <p class="text-2xl">📚</p>
            <p class="mt-3 text-sm font-semibold text-stone-900">A beautiful printed book</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">Professionally printed and bound in the UK. A real hardcover book delivered to the door — something to unwrap on Christmas Day.</p>
          </div>
          <div class="rounded-2xl bg-white p-6">
            <p class="text-2xl">⏱️</p>
            <p class="mt-3 text-sm font-semibold text-stone-900">At their own pace</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">Answer one question a day or a hundred at once. Everything saves automatically. No weekly emails, no pressure.</p>
          </div>
          <div class="rounded-2xl bg-white p-6">
            <p class="text-2xl">✨</p>
            <p class="mt-3 text-sm font-semibold text-stone-900">Easy to use</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">Simple enough for anyone — no technical skill needed. Works on phone, tablet, or computer.</p>
          </div>
          <div class="rounded-2xl bg-white p-6">
            <p class="text-2xl">🤍</p>
            <p class="mt-3 text-sm font-semibold text-stone-900">The whole family can read along</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">Share a link so everyone can follow the story as it grows. A gift that brings the family together.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Story types -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Choose the right story</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">A story written just for them</h2>
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
        <p class="font-display text-xl italic leading-relaxed text-stone-700 sm:text-2xl">
          "He told me about a motorbike he saved up for two years to buy. I never knew that about him."
        </p>
        <p class="mt-4 text-sm text-[#9C7C5C]">— From a Tell Me Your Story keepsake</p>
      </div>
    </section>

    <!-- How gifting works -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">How gifting works</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Simple to give, simple to receive</h2>
        </div>
        <div class="mt-10 space-y-6">
          <div class="flex items-start gap-5">
            <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#1C1917] text-sm font-bold text-white">1</div>
            <div>
              <p class="text-sm font-semibold text-stone-900">Choose a gift tier</p>
              <p class="mt-1 text-xs leading-5 text-stone-500">Pick from Story, Story + Photos, All Stories, or Premium. One-time payment, no subscription.</p>
            </div>
          </div>
          <div class="flex items-start gap-5">
            <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#1C1917] text-sm font-bold text-white">2</div>
            <div>
              <p class="text-sm font-semibold text-stone-900">Get your gift link instantly</p>
              <p class="mt-1 text-xs leading-5 text-stone-500">A unique gift link is emailed to you immediately. Share it with Grandma or Grandad whenever you're ready — on Christmas Day, or before.</p>
            </div>
          </div>
          <div class="flex items-start gap-5">
            <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#1C1917] text-sm font-bold text-white">3</div>
            <div>
              <p class="text-sm font-semibold text-stone-900">They start their story</p>
              <p class="mt-1 text-xs leading-5 text-stone-500">They open the link, create a free account, and their access is unlocked automatically. Answer whenever they feel like it.</p>
            </div>
          </div>
          <div class="flex items-start gap-5">
            <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#1C1917] text-sm font-bold text-white">4</div>
            <div>
              <p class="text-sm font-semibold text-stone-900">Order the printed book</p>
              <p class="mt-1 text-xs leading-5 text-stone-500">When they're ready, order a professionally printed and bound hardcover delivered to the door. The whole family gets a copy of something irreplaceable.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-[#1C1917] px-5 py-16 text-center sm:px-8 sm:py-20">
      <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Christmas 2026</p>
      <h2 class="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">Give them the gift of being heard</h2>
      <p class="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#A8A29E]">
        Their stories are irreplaceable. This Christmas, give Grandma or Grandad something that will matter long after the wrapping paper is gone.
      </p>
      <router-link to="/gift?campaign=christmas" class="mt-8 inline-block rounded-full bg-[#C4A882] px-8 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">
        Gift a story this Christmas →
      </router-link>
      <p class="mt-4 text-xs text-[#9C7C5C]">Gift link sent instantly · One-time payment · Printed book from £21.99</p>
    </section>

  </main>
</template>

<script setup lang="ts">
import { useSeo } from '../composables/useSeo'

const storyTypes = [
  { icon: '👵', title: "Grandma's Story",   desc: 'Her childhood, her family, her traditions, and the wisdom she\'s gathered over a lifetime.' },
  { icon: '👴', title: "Grandad's Story",   desc: 'His working life, his adventures, his proudest moments, and the lessons he wants to pass on.' },
  { icon: '👨', title: "Dad's Story",       desc: 'A story written for a father — from his earliest memories to what he wants his family to know.' },
  { icon: '👩', title: "Mum's Story",       desc: 'A story written for a mother — her life, her love, and everything in between.' },
]

useSeo({
  title: 'Christmas Gift Ideas for Grandparents 2026 — Tell Me Your Story | Life Story Keepsake Book',
  description: 'The best Christmas gift for Grandma or Grandad — capture their life story in their own words. Guided questions, voice recordings, and a beautifully printed keepsake book. UK delivery.',
  canonical: 'https://tellmeyourstory.uk/christmas-gift-ideas-for-grandparents',
})
</script>

<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
</style>