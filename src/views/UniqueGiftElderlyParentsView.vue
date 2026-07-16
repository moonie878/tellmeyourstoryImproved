<template>
  <main class="bg-white">

    <!-- Hero -->
    <section class="bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Unique Gift for Elderly Parents</p>
        <h1 class="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          The most meaningful gift<br>
          <em class="text-[#C4A882] italic">you'll ever give an elderly parent</em>
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#A8A29E]">
          When someone has everything they need, give them something no one else can — the chance to capture their life story. Their memories. Their voice. Their words. Kept forever in a beautiful book.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <router-link
            to="/gift"
            class="rounded-full bg-[#C4A882] px-7 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90"
          >
            Give this gift →
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

    <!-- The problem with other gifts -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">The problem with most gifts</p>
        <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">They already have everything they need</h2>
        <p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-500">
          Elderly parents are notoriously hard to buy for. They don't need more things. The jumpers go unworn. The chocolates get left out. The gift vouchers sit unused.
        </p>
        <p class="mx-auto mt-3 max-w-xl text-sm leading-7 text-stone-500">
          What they do have — that no one else in the world has — is a lifetime of stories. And most of those stories will never be told unless someone asks.
        </p>
      </div>
    </section>

    <!-- What this gift does -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">What this gift does</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Turns their memories into something that lasts</h2>
        </div>
        <div class="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          <div class="rounded-2xl bg-white p-6">
            <p class="text-2xl">📖</p>
            <p class="mt-3 text-sm font-semibold text-stone-900">100 guided questions</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">Thoughtful questions written for their life — childhood, work, family, values, and legacy. No blank page, no pressure, no interviewing skills needed.</p>
          </div>
          <div class="rounded-2xl bg-white p-6">
            <p class="text-2xl">🎙️</p>
            <p class="mt-3 text-sm font-semibold text-stone-900">Their actual voice</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">They can answer by speaking. Their voice is recorded and a QR code in the finished book lets the family hear them speak — long after they're gone.</p>
          </div>
          <div class="rounded-2xl bg-white p-6">
            <p class="text-2xl">📚</p>
            <p class="mt-3 text-sm font-semibold text-stone-900">A real printed book</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">Professionally printed and bound in the UK. A hardcover book of their life — delivered to the door and kept on the shelf for generations.</p>
          </div>
          <div class="rounded-2xl bg-white p-6">
            <p class="text-2xl">⏱️</p>
            <p class="mt-3 text-sm font-semibold text-stone-900">No pressure or deadline</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">Answer whenever they feel like it. One question a day or ten at once. Everything saves automatically. No subscription running down.</p>
          </div>
          <div class="rounded-2xl bg-white p-6">
            <p class="text-2xl">✨</p>
            <p class="mt-3 text-sm font-semibold text-stone-900">Simple to use</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">Works on phone, tablet, or computer. Simple enough for anyone — no technical skill needed.</p>
          </div>
          <div class="rounded-2xl bg-white p-6">
            <p class="text-2xl">🤍</p>
            <p class="mt-3 text-sm font-semibold text-stone-900">For the whole family</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">Share a link so siblings, grandchildren, and extended family can all follow the story as it grows.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Who it's for -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Who it's perfect for</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">A gift for any occasion</h2>
        </div>
        <div class="mt-10 grid gap-4 sm:grid-cols-2">
          <div v-for="occasion in occasions" :key="occasion.title" class="flex items-start gap-4 rounded-2xl border border-stone-200 p-5">
            <span class="text-2xl flex-shrink-0">{{ occasion.icon }}</span>
            <div>
              <p class="text-sm font-semibold text-stone-900">{{ occasion.title }}</p>
              <p class="mt-1 text-xs leading-5 text-stone-500">{{ occasion.desc }}</p>
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
            <router-link
              to="/gift"
              class="mt-4 block rounded-full py-2 text-xs font-medium transition"
              :class="tier.featured ? 'bg-[#7C5C3B] text-white hover:opacity-90' : 'border border-stone-300 text-stone-700 hover:bg-stone-50'"
            >
              Gift this →
            </router-link>
          </div>
        </div>

        <div class="mt-8 rounded-2xl border border-stone-200 bg-stone-50 p-5 text-left sm:flex sm:items-center sm:gap-5">
          <p class="text-2xl flex-shrink-0">📦</p>
          <div class="mt-3 sm:mt-0">
            <p class="text-sm font-semibold text-stone-900">Add a printed book — from £21.99</p>
            <p class="mt-1 text-xs text-stone-500">Once the story is written, order a professionally printed and bound hardcover delivered to their door. UK shipping included.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-[#1C1917] px-5 py-16 text-center sm:px-8 sm:py-20">
      <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Don't leave it too late</p>
      <h2 class="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">Their stories won't wait forever</h2>
      <p class="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#A8A29E]">
        Every family has stories that should never be forgotten. Give the gift that captures them — before it's too late.
      </p>
      <router-link to="/gift" class="mt-8 inline-block rounded-full bg-[#C4A882] px-8 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">
        Give this gift today →
      </router-link>
      <p class="mt-4 text-xs text-[#9C7C5C]">Gift link sent instantly · One-time payment · Printed book from £21.99</p>
    </section>

  </main>
</template>

<script setup lang="ts">
import { useSeo } from '../composables/useSeo'

const occasions = [
  { icon: '🎄', title: 'Christmas',         desc: 'The most meaningful gift under the tree — something that will matter long after the wrapping paper is gone.' },
  { icon: '🎂', title: 'Birthday',          desc: 'A milestone birthday — 70th, 80th, 90th — is the perfect moment to capture a whole life.' },
  { icon: '👨', title: "Father's Day",      desc: 'Give Dad or Grandad the gift of being heard. Their stories deserve to be kept.' },
  { icon: '👩', title: "Mother's Day",      desc: 'Mum or Grandma has a lifetime of stories she\'s never thought to tell. This gives her the chance.' },
  { icon: '💍', title: 'Anniversary',       desc: 'A couple\'s story of love, life, and the years built together — captured together.' },
  { icon: '🌷', title: 'Just because',      desc: 'Sometimes the best time to start is simply now — before another year passes.' },
]

const tiers = [
  { name: 'Story Gift',       price: '3.99',  desc: 'PDF keepsake for one story',           featured: false },
  { name: 'Story + Photos',   price: '7.99',  desc: 'PDF with photos included',             featured: true  },
  { name: 'All Stories',      price: '11.99', desc: 'All 7 story types unlocked',           featured: false },
  { name: 'Premium',          price: '17.99', desc: 'Photos, premium layouts, all stories', featured: false },
]

useSeo({
  title: 'Unique Gift for Elderly Parents UK 2026 — Tell Me Your Story | Life Story Keepsake Book',
  description: 'The most meaningful gift for an elderly parent who has everything. Capture their life story in their own words — guided questions, voice recordings, and a beautifully printed book. UK delivery.',
  canonical: 'https://tellmeyourstory.uk/unique-gift-for-elderly-parents',
})
</script>

<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
</style>