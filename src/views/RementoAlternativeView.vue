<template>
  <main class="bg-white">

    <!-- Hero -->
    <section class="bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Remento Alternative 2026</p>
        <h1 class="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          Looking for a Remento alternative?<br>
          <em class="text-[#C4A882] italic">Same idea. No subscription. Built for the UK.</em>
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#A8A29E]">
          Remento costs $99/year and rewrites your loved one's words with AI. Tell Me Your Story keeps their voice exactly as it is — with actual voice recordings, UK printing, and a one-time payment. Read our full <router-link to="/remento-review" class="text-[#C4A882] underline hover:no-underline">Remento review</router-link> for a detailed breakdown.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <router-link
            to="/register"
            class="rounded-full bg-[#C4A882] px-7 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90"
          >
            Start free — no subscription →
          </router-link>
          <router-link
            to="/example"
            class="rounded-full border border-white/20 px-7 py-3 text-sm font-medium text-white transition hover:bg-white/10"
          >
            See an example story
          </router-link>
        </div>
      </div>
    </section>

    <!-- Why people look for alternatives -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Why people look for alternatives</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Common frustrations with Remento</h2>
        </div>
        <div class="mt-10 space-y-4">
          <div v-for="reason in reasons" :key="reason.title" class="rounded-2xl border border-stone-200 p-5">
            <div class="flex items-start gap-4">
              <span class="mt-0.5 text-xl flex-shrink-0">{{ reason.icon }}</span>
              <div>
                <p class="text-sm font-semibold text-stone-900">{{ reason.title }}</p>
                <p class="mt-1 text-xs leading-5 text-stone-500">{{ reason.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Comparison table -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Side by side</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Remento vs Tell Me Your Story</h2>
        </div>

        <div class="mt-10 overflow-hidden rounded-2xl border border-stone-200 bg-white">
          <div class="grid grid-cols-3 border-b border-stone-200 bg-stone-50 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-stone-500">
            <span>Feature</span>
            <span class="text-center">Remento</span>
            <span class="text-center text-[#7C5C3B]">Tell Me Your Story</span>
          </div>
          <div
            v-for="(row, i) in comparison"
            :key="row.feature"
            class="grid grid-cols-3 px-5 py-4 text-sm"
            :class="i % 2 === 0 ? 'bg-white' : 'bg-stone-50'"
          >
            <span class="font-medium text-stone-700">{{ row.feature }}</span>
            <span class="text-center" :class="row.themNegative ? 'text-red-500' : 'text-stone-600'">{{ row.them }}</span>
            <span class="text-center font-medium" :class="row.usPositive ? 'text-green-600' : 'text-stone-600'">{{ row.us }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Key difference — voice vs AI rewrite -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">The most important difference</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Their words, not an AI's version of them</h2>
        </div>
        <div class="mt-8 grid gap-5 sm:grid-cols-2">
          <div class="rounded-2xl border border-stone-200 bg-stone-50 p-6">
            <p class="text-xs font-semibold uppercase tracking-wider text-stone-400">Remento</p>
            <p class="mt-3 text-sm leading-6 text-stone-600">Records your loved one's voice, then uses AI to rewrite what they said into polished prose. The printed book contains the AI's version of their words — not their actual words.</p>
          </div>
          <div class="rounded-2xl border border-[#7C5C3B] bg-[#FAF7F4] p-6">
            <p class="text-xs font-semibold uppercase tracking-wider text-[#7C5C3B]">Tell Me Your Story</p>
            <p class="mt-3 text-sm leading-6 text-stone-700">Records their voice and preserves it exactly. The printed book contains their actual answers — typos, personality, and all. A QR code lets family scan and hear their real voice any time.</p>
          </div>
        </div>
        <p class="mt-6 text-center text-sm text-stone-500">For a memory keepsake, authenticity matters. In 20 years, your family will want to read <em>their</em> words — not a polished AI summary. <router-link to="/remento-review" class="text-[#7C5C3B] underline hover:no-underline">Read our full Remento review →</router-link></p>
      </div>
    </section>

    <!-- What you get -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">What you get instead</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Everything you need, nothing you don't</h2>
        </div>

        <div class="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          <div class="rounded-2xl border border-stone-200 bg-white p-6">
            <p class="text-2xl">🎙️</p>
            <p class="mt-3 text-sm font-semibold text-stone-900">Real voice recordings</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">Record answers in their actual voice. QR codes in the printed book link back to the original recording — hear them speak any time.</p>
          </div>
          <div class="rounded-2xl border border-stone-200 bg-white p-6">
            <p class="text-2xl">📖</p>
            <p class="mt-3 text-sm font-semibold text-stone-900">Their words, unchanged</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">No AI rewriting. Their answers go straight into the book exactly as written or spoken — personality, quirks, and all.</p>
          </div>
          <div class="rounded-2xl border border-stone-200 bg-white p-6">
            <p class="text-2xl">📚</p>
            <p class="mt-3 text-sm font-semibold text-stone-900">UK printed hardcover</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">Printed and shipped from the UK. No international shipping fees, no 3-week wait. Softcover from £34.98.</p>
          </div>
          <div class="rounded-2xl border border-stone-200 bg-white p-6">
            <p class="text-2xl">💷</p>
            <p class="mt-3 text-sm font-semibold text-stone-900">One-time payment</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">Pay once, own forever. No $99/year renewal. No being locked out of your family's stories if you miss a payment.</p>
          </div>
          <div class="rounded-2xl border border-stone-200 bg-white p-6">
            <p class="text-2xl">✨</p>
            <p class="mt-3 text-sm font-semibold text-stone-900">AI writing assist (optional)</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">Gentle prompts to help expand short answers — but only if they want it. The words always stay theirs.</p>
          </div>
          <div class="rounded-2xl border border-stone-200 bg-white p-6">
            <p class="text-2xl">⏱️</p>
            <p class="mt-3 text-sm font-semibold text-stone-900">No time pressure</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">Answer one question or a hundred — at their own pace, whenever they feel like it. No weekly prompts, no subscription running down.</p>
          </div>
          <div class="rounded-2xl border border-stone-200 p-6">
  <p class="text-2xl">🎬</p>
  <p class="mt-3 text-sm font-semibold text-stone-900">Story video export</p>
  <p class="mt-2 text-xs leading-5 text-stone-500">Export the whole story as a beautiful 1080p video with photos and music — ready to share or play at a family gathering.</p>
</div>
        </div>
      </div>
    </section>

    <!-- Pricing comparison -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">The honest price comparison</p>
        <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">What you actually pay</h2>

        <div class="mt-10 grid gap-5 sm:grid-cols-2">
          <div class="rounded-2xl border border-stone-200 bg-stone-50 p-6 text-left">
            <p class="text-xs font-semibold uppercase tracking-wider text-stone-400">Remento</p>
            <p class="mt-3 text-2xl font-bold text-stone-900">$99/year</p>
            <p class="mt-1 text-xs text-stone-500">Annual subscription · renews or content becomes read-only</p>
            <ul class="mt-4 space-y-2 text-xs text-stone-500">
              <li>+ $69–99 per extra book copy</li>
              <li>+ $30 surcharge for books over 200 pages</li>
              <li>+ $24.99 for PDF/ebook export</li>
              <li>+ International shipping fees</li>
              <li>+ $99 per additional storyteller</li>
            </ul>
          </div>
          <div class="rounded-2xl border border-[#7C5C3B] bg-[#FAF7F4] p-6 text-left">
            <p class="text-xs font-semibold uppercase tracking-wider text-[#7C5C3B]">Tell Me Your Story</p>
            <p class="mt-3 text-2xl font-bold text-stone-900">From £3.99</p>
            <p class="mt-1 text-xs text-stone-500">One-time payment · yours forever</p>
            <ul class="mt-4 space-y-2 text-xs text-stone-600">
              <li>✓ PDF export included</li>
              <li>✓ UK shipping included in print price</li>
              <li>✓ No per-page surcharges</li>
              <li>✓ No renewal fees</li>
              <li>✓ Your content is always yours</li>
            </ul>
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

    <!-- Related pages -->
    <section class="px-5 py-12 sm:px-8">
      <div class="mx-auto max-w-3xl">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C] mb-6">Related reading</p>
        <div class="grid gap-4 sm:grid-cols-3">
          <router-link to="/remento-review" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Remento Review 2026</p>
            <p class="mt-1 text-xs text-stone-500">Full honest review — does the AI rewriting work?</p>
          </router-link>
          <router-link to="/storyworth-alternative" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Storyworth Alternative</p>
            <p class="mt-1 text-xs text-stone-500">Also comparing Storyworth? Read this first</p>
          </router-link>
          <router-link to="/life-story-questions" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">150 Life Story Questions</p>
            <p class="mt-1 text-xs text-stone-500">The questions that unlock real stories</p>
          </router-link>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-[#1C1917] px-5 py-16 text-center sm:px-8 sm:py-20">
      <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">The Remento alternative built for UK families</p>
      <h2 class="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">Their real voice. Their real words. Kept forever.</h2>
      <p class="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#A8A29E]">
        No subscription, no AI rewrites, no international shipping fees. Just their story — in their words and their voice — printed beautifully and kept forever.
      </p>
      <router-link to="/register" class="mt-8 inline-block rounded-full bg-[#C4A882] px-8 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">
        Start free — no subscription →
      </router-link>
      <p class="mt-4 text-xs text-[#9C7C5C]">Free to start · One-time payment · Printed books from £34.98</p>
    </section>

  </main>
</template>

<script setup lang="ts">
import { useSeo } from '../composables/useSeo'

const reasons = [
  {
    icon: '🤖',
    title: 'AI rewrites their words',
    desc: 'Remento transcribes voice recordings and then uses AI to rewrite them into polished prose. The book you receive contains the AI\'s version of what your loved one said — not their actual words.',
  },
  {
    icon: '💸',
    title: '$99/year subscription',
    desc: 'Remento charges $99/year and auto-renews. If you stop paying, your content becomes read-only. Multiple reviewers have described being locked out of their own family\'s stories.',
  },
  {
    icon: '🌍',
    title: 'US-focused product',
    desc: 'Remento is built for the US market. UK customers face USD pricing, international shipping delays of up to 3 weeks, and no UK-based printing option.',
  },
  {
    icon: '💰',
    title: 'Hidden extra costs',
    desc: 'PDF export costs $24.99 extra. Books over 200 pages incur a $30 surcharge. Each additional storyteller costs $99. The $99 headline price rarely reflects what families actually pay.',
  },
]

const comparison = [
  { feature: 'Pricing model',        them: '$99/year subscription', us: 'From £3.99 one-time',    themNegative: true,  usPositive: true  },
  { feature: 'Voice recordings',     them: '✓ Yes',                 us: '✓ Yes',                  themNegative: false, usPositive: true  },
  { feature: 'Words in book',        them: 'AI rewritten',          us: '✓ Their actual words',   themNegative: true,  usPositive: true  },
  { feature: 'QR codes in book',     them: '✓ Yes',                 us: '✓ Yes',                  themNegative: false, usPositive: false },
  { feature: 'UK printing',          them: '✗ US only',             us: '✓ UK printed',           themNegative: true,  usPositive: true  },
  { feature: 'PDF export',           them: '$24.99 extra',          us: '✓ Included',             themNegative: true,  usPositive: true  },
  { feature: 'Content ownership',    them: 'Read-only if lapsed',   us: '✓ Yours forever',        themNegative: true,  usPositive: true  },
  { feature: 'No renewal needed',    them: '✗ Annual fee',          us: '✓ One-time payment',     themNegative: true,  usPositive: true  },
  { feature: 'Answer at own pace',   them: 'Weekly prompts',        us: '✓ Any time',             themNegative: false, usPositive: true  },
  { feature: 'Video export',          them: '✗ No',                 us: '✓ £19.99 one-time',      themNegative: true,  usPositive: true  },
]

useSeo({
  title: 'Remento Alternative UK 2026 — Tell Me Your Story | No Subscription, Real Voice, UK Books',
  description: 'Looking for a Remento alternative in the UK? Tell Me Your Story keeps your loved one\'s real words and voice — no AI rewrites, no annual subscription, UK-printed keepsake books.',
  canonical: 'https://tellmeyourstory.uk/remento-alternative',
})
</script>

<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
</style>