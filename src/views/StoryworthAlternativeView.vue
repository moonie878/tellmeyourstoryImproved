<template>
  <main class="bg-white">

    <!-- Hero -->
    <section class="bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Storyworth Alternative 2026</p>
        <h1 class="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          Looking for a Storyworth alternative?<br>
          <em class="text-[#C4A882] italic">Here's why UK families choose us</em>
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#A8A29E]">
          Storyworth costs $59–$199 per year and is built for the US market. Tell Me Your Story is a one-time payment, built for UK families, with voice recordings, QR codes, and printed books shipped from the UK. Read our full <router-link to="/storyworth-review" class="text-[#C4A882] underline hover:no-underline">Storyworth review</router-link> for a detailed breakdown.
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

    <!-- Why people leave Storyworth -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Why people look for alternatives</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Common frustrations with Storyworth</h2>
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
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Storyworth vs Tell Me Your Story</h2>
        </div>

        <div class="mt-10 overflow-hidden rounded-2xl border border-stone-200 bg-white">
          <div class="grid grid-cols-3 border-b border-stone-200 bg-stone-50 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-stone-500">
            <span>Feature</span>
            <span class="text-center">Storyworth</span>
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

    <!-- What you get -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">What you get instead</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Everything Storyworth offers, and more</h2>
        </div>

        <div class="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          <div class="rounded-2xl border border-stone-200 p-6">
            <p class="text-2xl">📖</p>
            <p class="mt-3 text-sm font-semibold text-stone-900">100+ guided questions</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">Every chapter of life covered — childhood, family, work, relationships, and legacy. Answer at your own pace, no weekly email pressure.</p>
          </div>
          <div class="rounded-2xl border border-stone-200 p-6">
            <p class="text-2xl">🎙️</p>
            <p class="mt-3 text-sm font-semibold text-stone-900">Voice recordings</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">Record answers by voice. A QR code in the printed book lets family scan and hear the story in their loved one's actual voice — forever.</p>
          </div>
          <div class="rounded-2xl border border-stone-200 p-6">
            <p class="text-2xl">📚</p>
            <p class="mt-3 text-sm font-semibold text-stone-900">UK printed books</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">Printed and shipped from the UK. No $20–40 international shipping fees. Softcover from £34.98, hardcover options available.</p>
          </div>
          <div class="rounded-2xl border border-stone-200 p-6">
            <p class="text-2xl">💷</p>
            <p class="mt-3 text-sm font-semibold text-stone-900">One-time payment</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">Pay once, own forever. No annual subscription. No renewal fees. No being locked out of your own family's stories.</p>
          </div>
          <div class="rounded-2xl border border-stone-200 p-6">
            <p class="text-2xl">✨</p>
            <p class="mt-3 text-sm font-semibold text-stone-900">AI writing assist</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">Gentle prompts help expand short answers — but the words always stay theirs. No AI rewrites, no losing their voice.</p>
          </div>
          <div class="rounded-2xl border border-stone-200 p-6">
            <p class="text-2xl">🤍</p>
            <p class="mt-3 text-sm font-semibold text-stone-900">Family can read along</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">Share a link so the whole family can read the story as it grows. No extra charge per person.</p>
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
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">The honest price comparison</p>
        <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">What you actually pay</h2>
        <p class="mx-auto mt-3 max-w-xl text-sm leading-7 text-stone-500">
          Storyworth's headline price is $59–$109 but most families end up paying significantly more once you add colour printing, extra copies, and international shipping. See our <router-link to="/storyworth-review" class="text-[#7C5C3B] underline hover:no-underline">full Storyworth review</router-link> for the complete cost breakdown.
        </p>

        <div class="mt-10 grid gap-5 sm:grid-cols-2">
          <div class="rounded-2xl border border-stone-200 bg-white p-6 text-left">
            <p class="text-xs font-semibold uppercase tracking-wider text-stone-400">Storyworth</p>
            <p class="mt-3 text-2xl font-bold text-stone-900">$59–$199/year</p>
            <p class="mt-1 text-xs text-stone-500">Annual subscription · renews or content becomes read-only</p>
            <ul class="mt-4 space-y-2 text-xs text-stone-500">
              <li>+ $20–40 international shipping per book</li>
              <li>+ $79 per extra colour copy</li>
              <li>+ $20 per page over the limit</li>
              <li>+ Pay again next year to keep editing</li>
            </ul>
          </div>
          <div class="rounded-2xl border border-[#7C5C3B] bg-[#FAF7F4] p-6 text-left">
            <p class="text-xs font-semibold uppercase tracking-wider text-[#7C5C3B]">Tell Me Your Story</p>
            <p class="mt-3 text-2xl font-bold text-stone-900">From £3.99</p>
            <p class="mt-1 text-xs text-stone-500">One-time payment · yours forever</p>
            <ul class="mt-4 space-y-2 text-xs text-stone-600">
              <li>✓ UK shipping included in print price</li>
              <li>✓ No annual renewal</li>
              <li>✓ No per-page fees</li>
              <li>✓ Your content is always yours</li>
            </ul>
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

    <!-- Related pages -->
    <section class="px-5 py-12 sm:px-8">
      <div class="mx-auto max-w-3xl">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C] mb-6">Related reading</p>
        <div class="grid gap-4 sm:grid-cols-3">
          <router-link to="/storyworth-review" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Storyworth Review 2026</p>
            <p class="mt-1 text-xs text-stone-500">Full honest review — pros, cons, real costs</p>
          </router-link>
          <router-link to="/remento-alternative" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Remento Alternative</p>
            <p class="mt-1 text-xs text-stone-500">Also comparing Remento? Read this first</p>
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
      <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">The Storyworth alternative built for UK families</p>
      <h2 class="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">Start for free today — no subscription required</h2>
      <p class="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#A8A29E]">
        Voice recordings, guided questions, beautiful keepsake books, and UK printing. Everything Storyworth offers — without the annual fee.
      </p>
      <router-link to="/register" class="mt-8 inline-block rounded-full bg-[#C4A882] px-8 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">
        Start free — no subscription →
      </router-link>
      <p class="mt-4 text-xs text-[#9C7C5C]">Free to start · One-time payment · Printed books from £21.99</p>
    </section>

  </main>
</template>

<script setup lang="ts">
import { useSeo } from '../composables/useSeo'

const reasons = [
  {
    icon: '💸',
    title: 'Annual subscription that keeps renewing',
    desc: 'Storyworth charges $59–$199 per year. If you stop paying, your content becomes read-only. Many families are surprised to find they can\'t edit their own stories without renewing.',
  },
  {
    icon: '🌍',
    title: 'Built for the US, not UK families',
    desc: 'Storyworth is an American product. International shipping adds $20–40 per book, prices are in USD, and there\'s no UK-based printing. You\'re paying import costs for a book of your family\'s memories.',
  },
  {
    icon: '📧',
    title: 'Weekly email pressure',
    desc: 'Storyworth sends one question per week by email. Many parents stop responding after a few months when it starts to feel like homework. There\'s no way to answer at your own pace.',
  },
  {
    icon: '🔒',
    title: 'Content locked behind subscription',
    desc: 'When your subscription ends, you lose edit access. To keep working on the story, you have to pay for another year — even if you just want to fix a typo.',
  },
]

const comparison = [
  { feature: 'Pricing model',        them: '$59–$199/year',        us: 'From £3.99 one-time',    themNegative: true,  usPositive: true  },
  { feature: 'UK printing',          them: '✗ US only',            us: '✓ UK printed & shipped', themNegative: true,  usPositive: true  },
  { feature: 'Voice recordings',     them: 'Color plan only',      us: '✓ All plans',            themNegative: false, usPositive: true  },
  { feature: 'QR codes in book',     them: '✗ No',                 us: '✓ Yes',                  themNegative: true,  usPositive: true  },
  { feature: 'Answer at own pace',   them: 'Weekly email prompts', us: '✓ Answer any time',      themNegative: false, usPositive: true  },
  { feature: 'Content ownership',    them: 'Read-only if lapsed',  us: '✓ Yours forever',        themNegative: true,  usPositive: true  },
  { feature: 'International ship',   them: '$20–40 extra',         us: '✓ UK shipping included', themNegative: true,  usPositive: true  },
  { feature: 'PDF export',           them: 'Not included',         us: '✓ Included',             themNegative: true,  usPositive: true  },
  { feature: 'AI writing assist',    them: '✗ No',                 us: '✓ Yes',                  themNegative: true,  usPositive: true  },
  { feature: 'Video export',          them: '✗ No',                 us: '✓ £17.99 one-time',      themNegative: true,  usPositive: true  },
]

useSeo({
  title: 'Storyworth Alternative UK 2026 — Tell Me Your Story | No Subscription, UK Printed Books',
  description: 'Looking for a Storyworth alternative in the UK? Tell Me Your Story offers voice recordings, guided questions, and UK-printed keepsake books from a one-time payment. No annual subscription.',
  canonical: 'https://tellmeyourstory.uk/storyworth-alternative',
})
</script>

<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
</style>