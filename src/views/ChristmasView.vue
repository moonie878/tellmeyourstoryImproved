<template>
  <main class="bg-white">

    <!-- Hero -->
    <section class="bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#C4A882]">Christmas 2026 — The gift that lasts forever</p>
        <h1 class="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          Give the gift of<br><em class="text-[#C4A882] italic">their story, in their words</em>
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#A8A29E]">
          This Christmas, give someone the chance to capture their life story — with guided questions, voice recordings, and a beautiful keepsake book your family will treasure for generations.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <router-link
            to="/gift?campaign=christmas"
            class="rounded-full bg-[#C4A882] px-7 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90"
          >
            Gift a story this Christmas →
          </router-link>
          <router-link
            to="/register"
            class="rounded-full border border-white/20 px-7 py-3 text-sm font-medium text-white transition hover:bg-white/10"
          >
            Start for free instead
          </router-link>
        </div>
        <div class="mt-5 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-[#9C7C5C]">
          <span>✦ Gift link sent instantly</span>
          <span>✦ They redeem at their own pace</span>
          <span>✦ Printed book available</span>
        </div>
      </div>
    </section>

    <!-- Why Christmas -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Why Tell Me Your Story</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">The Christmas gift nobody else will think of</h2>
          <p class="mx-auto mt-3 max-w-xl text-sm leading-7 text-stone-500">
            Not another jumper. Not a voucher. Something that captures the stories, voice, and memories of someone you love — before it's too late.
          </p>
        </div>

        <div class="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          <div class="rounded-2xl border border-stone-200 p-6">
            <p class="text-2xl">📖</p>
            <p class="mt-3 text-sm font-semibold text-stone-900">100 guided questions</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">From their earliest memories to the lessons they want to pass on. Written for every chapter of life.</p>
          </div>
          <div class="rounded-2xl border border-stone-200 p-6">
            <p class="text-2xl">🎙️</p>
            <p class="mt-3 text-sm font-semibold text-stone-900">Their voice, preserved forever</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">Answer by speaking naturally. A QR code in the printed book lets family hear their voice any time.</p>
          </div>
          <div class="rounded-2xl border border-stone-200 p-6">
            <p class="text-2xl">📚</p>
            <p class="mt-3 text-sm font-semibold text-stone-900">A beautiful printed book</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">Download a professionally designed PDF or order a printed hardcover delivered to the door.</p>
          </div>
          <div class="rounded-2xl border border-stone-200 p-6">
            <p class="text-2xl">✨</p>
            <p class="mt-3 text-sm font-semibold text-stone-900">AI writing assist</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">Gentle prompts help expand short answers — the words always stay theirs.</p>
          </div>
          <div class="rounded-2xl border border-stone-200 p-6">
            <p class="text-2xl">🤍</p>
            <p class="mt-3 text-sm font-semibold text-stone-900">The whole family can read along</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">Share a link so family can read the story as it grows and leave their own reactions.</p>
          </div>
          <div class="rounded-2xl border border-stone-200 p-6">
            <p class="text-2xl">⏱️</p>
            <p class="mt-3 text-sm font-semibold text-stone-900">No pressure, no deadline</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">Everything saves automatically. They can answer one question a week or a hundred — whenever they're ready.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Who it's for -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Perfect for</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">A gift for everyone in your family</h2>
        </div>
        <div class="mt-10 grid gap-5 sm:grid-cols-2 md:grid-cols-4">
          <div
            v-for="person in giftFor"
            :key="person.title"
            class="rounded-2xl bg-white p-5 text-center shadow-sm"
          >
            <p class="text-3xl">{{ person.emoji }}</p>
            <p class="mt-3 text-sm font-semibold text-stone-900">{{ person.title }}</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">{{ person.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Quote -->
    <section class="px-5 py-16 sm:px-8">
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
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Christmas gift tiers</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Choose the right gift</h2>
          <p class="mt-3 text-sm text-stone-500">Purchase a gift and we'll send you a link to share. They redeem it at their own pace.</p>
        </div>

        <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="tier in tiers"
            :key="tier.name"
            class="rounded-3xl border p-5 text-center"
            :class="tier.featured ? 'border-[#7C5C3B] bg-[#FAF7F4]' : 'border-stone-200 bg-white'"
          >
            <p v-if="tier.featured" class="mb-2 text-[10px] font-semibold uppercase tracking-wider text-[#7C5C3B]">Most popular</p>
            <p class="text-xs font-medium text-stone-500">{{ tier.name }}</p>
            <div class="mt-2 flex items-center justify-center gap-2">
              <span class="text-2xl font-bold text-stone-900">£{{ tier.price }}</span>
            </div>
            <p class="mt-2 text-xs leading-5 text-stone-500">{{ tier.desc }}</p>
            <router-link
              to="/gift?campaign=christmas"
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

    <!-- Printed book upsell -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Something to unwrap</p>
        <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Order a printed book to put under the tree</h2>
        <p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-500">
          Once the story is written, order a professionally printed and bound hardcover book delivered straight to your door. Something real to hold, keep, and pass down.
        </p>
        <div class="mt-6 inline-flex items-center gap-3 rounded-2xl border border-stone-200 bg-white px-6 py-4 shadow-sm">
          <p class="text-2xl">📦</p>
          <div class="text-left">
            <p class="text-sm font-semibold text-stone-900">Printed hardcover book</p>
            <p class="mt-0.5 text-xs text-stone-500">From £29.98 · UK shipping included · Printed and shipped from the UK</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Internal link — Christmas gifts for grandparents -->
<section class="px-5 pb-12 sm:px-8">
  <div class="mx-auto max-w-3xl rounded-2xl border border-[#E8DDD0] bg-white p-6 sm:p-8">
    <p class="text-[11px] font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">
      Buying for a grandparent?
    </p>
    <h2 class="mt-3 font-display text-xl font-semibold text-stone-900">
      Grandparents are the hardest people to buy for
    </h2>
    <p class="mt-3 text-[15px] leading-[1.8] text-[#5C534E]">
      They already have the slippers and the biscuit tin. If you're stuck this year,
      we've written a guide to
      <router-link
        to="/christmas-gifts-for-grandparents"
        class="font-medium text-[#7C5C3B] underline underline-offset-2"
      >Christmas gifts for grandparents</router-link>
      and why capturing their life story lands differently to anything else you could wrap.
    </p>
  </div>
</section>

    <!-- CTA -->
    <section class="bg-[#1C1917] px-5 py-16 text-center sm:px-8 sm:py-20">
      <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Christmas 2026</p>
      <h2 class="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">Their stories won't wait forever</h2>
      <p class="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#A8A29E]">
        This Christmas, give someone the gift of being heard. Their memories, their voice, their story — kept safe for everyone who comes after.
      </p>
      <router-link
        to="/gift?campaign=christmas"
        class="mt-8 inline-block rounded-full bg-[#C4A882] px-8 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90"
      >
        Gift a story this Christmas →
      </router-link>
      <p class="mt-4 text-xs text-[#9C7C5C]">Free to start · Printed book available · No subscription</p>
    </section>

  </main>
</template>

<script setup lang="ts">
import { useSeo } from '../composables/useSeo'

const tiers = [
  { name: 'Story Gift',            price: '3.99',  desc: 'PDF keepsake for one story',           featured: false },
  { name: 'Story + Photos',        price: '7.99',  desc: 'PDF with photos included',             featured: true  },
  { name: 'All Stories',           price: '11.99', desc: 'All 7 story types unlocked',           featured: false },
  { name: 'Premium Keepsake',      price: '17.99', desc: 'Photos, premium layouts, all stories', featured: false },
]

const giftFor = [
  { emoji: '👨', title: 'Grandad',   desc: 'His wartime stories, his working life, his proudest moments.' },
  { emoji: '👩', title: 'Grandma',   desc: 'Her family traditions, her childhood, her words of wisdom.' },
  { emoji: '👨‍👧', title: 'Mum or Dad', desc: 'The stories your parents carry that you\'ve never fully heard.' },
  { emoji: '👫', title: 'A couple',  desc: 'Their love story, their life together, their shared memories.' },
]

useSeo({
  title: 'Christmas Gift Ideas 2026 — Give the Gift of Their Story | Tell Me Your Story',
  description: 'The most meaningful Christmas gift — help a loved one capture their life story in their own words. Voice recordings, keepsake book, printed hardcover. Tell Me Your Story.',
  canonical: 'https://tellmeyourstory.uk/christmas',
})
</script>

<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
</style>