<template>
  <main class="bg-white">

    <!-- Hero -->
    <section class="bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Storyworth vs Remento</p>
        <h1 class="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          Storyworth vs Remento<br>
          <em class="text-[#C4A882] italic">an honest comparison</em>
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#A8A29E]">
          Both Storyworth and Remento help families capture life stories. They do it differently, at different price points, with different strengths. This guide compares them honestly — and includes Tell Me Your Story as a UK-native alternative worth considering.
        </p>
      </div>
    </section>

    <!-- Quick summary -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Quick summary</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Who are they for?</h2>
        </div>
        <div class="mt-10 grid gap-5 sm:grid-cols-3">
          <div v-for="summary in summaries" :key="summary.name" class="rounded-2xl border p-6 text-center"
            :class="summary.featured ? 'border-[#7C5C3B] bg-[#FAF7F4]' : 'border-stone-200'">
            <p v-if="summary.featured" class="text-[10px] font-semibold uppercase tracking-wider text-[#7C5C3B] mb-2">UK alternative</p>
            <p class="font-display text-lg font-bold text-stone-900">{{ summary.name }}</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">{{ summary.desc }}</p>
            <p class="mt-3 text-xs font-semibold text-stone-700">{{ summary.price }}</p>
          </div>
        </div>
        <div class="mt-6 flex flex-wrap justify-center gap-3">
          <router-link to="/storyworth-review" class="text-xs text-[#7C5C3B] underline hover:no-underline">Full Storyworth review →</router-link>
          <span class="text-xs text-stone-300">·</span>
          <router-link to="/remento-review" class="text-xs text-[#7C5C3B] underline hover:no-underline">Full Remento review →</router-link>
          <span class="text-xs text-stone-300">·</span>
          <router-link to="/storykeeper-vs-storyworth" class="text-xs text-[#7C5C3B] underline hover:no-underline">StoryKeeper vs Storyworth →</router-link>
        </div>
      </div>
    </section>

    <!-- Comparison table -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="text-center mb-10">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Feature comparison</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Storyworth vs Remento vs Tell Me Your Story</h2>
        </div>
        <div class="rounded-2xl border border-stone-200 bg-white overflow-hidden">
          <div class="grid grid-cols-4 bg-[#1C1917] px-4 py-3 text-xs font-semibold text-white gap-2">
            <div>Feature</div>
            <div class="text-center">Storyworth</div>
            <div class="text-center">Remento</div>
            <div class="text-center text-[#C4A882]">Tell Me Your Story</div>
          </div>
          <div v-for="(row, i) in comparisonRows" :key="row.feature"
            class="grid grid-cols-4 px-4 py-3 gap-2 text-xs border-t border-stone-100"
            :class="i % 2 === 0 ? 'bg-white' : 'bg-stone-50'">
            <div class="text-stone-700 font-medium">{{ row.feature }}</div>
            <div class="text-center" :class="row.sw === '✓' ? 'text-green-600' : row.sw === '✗' ? 'text-stone-300' : 'text-stone-600'">{{ row.sw }}</div>
            <div class="text-center" :class="row.re === '✓' ? 'text-green-600' : row.re === '✗' ? 'text-stone-300' : 'text-stone-600'">{{ row.re }}</div>
            <div class="text-center font-medium" :class="row.tm === '✓' ? 'text-[#7C5C3B]' : row.tm === '✗' ? 'text-stone-300' : 'text-[#7C5C3B]'">{{ row.tm }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Deep dive -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl space-y-12">
        <div v-for="section in deepDive" :key="section.title">
          <div class="text-center">
            <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">{{ section.label }}</p>
            <h2 class="mt-3 font-display text-2xl font-bold text-stone-900">{{ section.title }}</h2>
          </div>
          <div class="mt-6 text-sm leading-7 text-stone-600 space-y-4">
            <p v-for="para in section.paras" :key="para">{{ para }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Who should choose what -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Our verdict</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Which should you choose?</h2>
        </div>
        <div class="mt-10 grid gap-5 sm:grid-cols-3">
          <div v-for="verdict in verdicts" :key="verdict.name" class="rounded-2xl bg-white border border-stone-200 p-6">
            <p class="font-display text-lg font-bold text-stone-900">{{ verdict.name }}</p>
            <p class="mt-1 text-xs text-[#9C7C5C] font-medium">{{ verdict.price }}</p>
            <p class="mt-3 text-xs font-semibold text-stone-700 uppercase tracking-wide">Best if:</p>
            <ul class="mt-2 space-y-1">
              <li v-for="point in verdict.bestIf" :key="point" class="flex gap-2 text-xs leading-5 text-stone-600">
                <span class="text-green-600 flex-shrink-0">✓</span>{{ point }}
              </li>
            </ul>
            <p class="mt-3 text-xs font-semibold text-stone-700 uppercase tracking-wide">Consider others if:</p>
            <ul class="mt-2 space-y-1">
              <li v-for="point in verdict.considerOthers" :key="point" class="flex gap-2 text-xs leading-5 text-stone-600">
                <span class="text-stone-400 flex-shrink-0">→</span>{{ point }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">FAQ</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Common questions</h2>
        </div>
        <div class="mt-10 space-y-4">
          <div v-for="faq in faqs" :key="faq.q" class="rounded-2xl border border-stone-200 p-6">
            <p class="text-sm font-semibold text-stone-900">{{ faq.q }}</p>
            <p class="mt-2 text-xs leading-6 text-stone-500">{{ faq.a }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Related -->
    <section class="bg-[#F5F0E8] px-5 py-12 sm:px-8">
      <div class="mx-auto max-w-3xl">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C] mb-6">Related reading</p>
        <div class="grid gap-4 sm:grid-cols-3">
          <router-link to="/storyworth-review" class="rounded-2xl border border-stone-200 bg-white p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Storyworth Review</p>
            <p class="mt-1 text-xs text-stone-500">A full honest look at Storyworth</p>
          </router-link>
          <router-link to="/remento-review" class="rounded-2xl border border-stone-200 bg-white p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Remento Review</p>
            <p class="mt-1 text-xs text-stone-500">A full honest look at Remento</p>
          </router-link>
          <router-link to="/storykeeper-vs-storyworth" class="rounded-2xl border border-stone-200 bg-white p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">StoryKeeper vs Storyworth</p>
            <p class="mt-1 text-xs text-stone-500">Another popular comparison</p>
          </router-link>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-[#1C1917] px-5 py-16 text-center sm:px-8 sm:py-20">
      <h2 class="font-display text-2xl font-bold text-white sm:text-3xl">Try Tell Me Your Story free</h2>
      <p class="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#A8A29E]">No subscription, no card needed. Start capturing a life story today and see the difference for yourself.</p>
      <router-link to="/register" class="mt-8 inline-block rounded-full bg-[#C4A882] px-8 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Start free →</router-link>
      <p class="mt-4 text-xs text-[#9C7C5C]">Free to start · One-time payment · Printed book from £34.98</p>
    </section>

  </main>
</template>

<script setup lang="ts">
import { useSeo } from '../composables/useSeo'

const summaries = [
  { name: 'Storyworth', desc: 'Weekly email questions, annual subscription model. Best known brand in the space. US-focused with UK availability.', price: 'From ~£79/year', featured: false },
  { name: 'Remento', desc: 'Voice-first approach with AI transcription. Strong on audio quality. US-based, limited UK presence.', price: 'From ~£99/year', featured: false },
  { name: 'Tell Me Your Story', desc: 'UK-native platform with voice recording, printed books, and a one-time payment model. No subscription.', price: 'Free to start · from £3.99', featured: true },
]

const comparisonRows = [
  { feature: 'UK-based service',         sw: '✗',          re: '✗',         tm: '✓' },
  { feature: 'Free to start',            sw: '✗',          re: '✗',         tm: '✓' },
  { feature: 'Subscription required',    sw: 'Annual',     re: 'Annual',    tm: 'No subscription' },
  { feature: 'Voice recording',          sw: 'Limited',    re: '✓',         tm: '✓' },
  { feature: 'Voice in printed book',    sw: '✗',          re: '✗',         tm: 'QR codes' },
  { feature: 'Printed book available',   sw: '✓',          re: '✓',         tm: '✓' },
  { feature: 'Hardcover option',         sw: '✓',          re: '✓',         tm: '✓' },
  { feature: 'UK printing & delivery',   sw: '✗',          re: '✗',         tm: '✓' },
  { feature: 'Photo support',            sw: '✓',          re: '✓',         tm: '✓' },
  { feature: 'AI writing assist',        sw: '✓',          re: '✓',         tm: '✓' },
  { feature: 'Guided questions',         sw: '✓',          re: '✓',         tm: '✓' },
  { feature: 'Family collaboration',     sw: 'Limited',    re: 'Limited',   tm: '✓' },
  { feature: 'Tribute video export',     sw: '✗',          re: '✗',         tm: '✓' },
  { feature: 'One-time payment option',  sw: '✗',          re: '✗',         tm: '✓' },
]

const deepDive = [
  {
    label: 'How Storyworth works',
    title: 'Storyworth — the email approach',
    paras: [
      'Storyworth sends one question per week by email. The recipient replies to the email with their answer, and answers accumulate over the year into a book. At the end of the subscription, the answers are compiled into a printed hardcover book.',
      'The weekly email format is Storyworth\'s biggest strength — it creates a gentle, low-pressure routine that works well for people who would never sit down to fill in a questionnaire. The questions come to them, they answer in their own time, and the book builds itself.',
      'The main limitations are the subscription model (you pay annually whether you use it actively or not), the US focus (UK users pay in dollars and shipping from the US adds cost and time), and the lack of voice recording. Storyworth captures written answers only — you can\'t hear the person\'s voice in the finished book.',
      'Storyworth is best suited to families where the person answering is comfortable with email, the annual subscription model suits the budget, and the voice isn\'t a priority.',
    ]
  },
  {
    label: 'How Remento works',
    title: 'Remento — the voice-first approach',
    paras: [
      'Remento\'s core proposition is voice. Rather than typing answers, users speak them into the app, and Remento\'s AI transcribes and tidies the response. The idea is to lower the barrier for people who find typing difficult or who express themselves better out loud.',
      'The voice-first approach is genuinely differentiated and works well for the right user — particularly older people who struggle with typing but speak naturally and fluently. The AI transcription is good but not perfect, and answers sometimes need reviewing.',
      'Remento is US-based and less well-known in the UK. The subscription pricing is higher than Storyworth, and the printed book, while good quality, ships from the US with corresponding lead times and costs.',
      'Remento is best suited to families where the person answering prefers speaking to typing, budget is less of a concern, and a US shipping timeline is acceptable.',
    ]
  },
  {
    label: 'How Tell Me Your Story compares',
    title: 'Tell Me Your Story — the UK alternative',
    paras: [
      'Tell Me Your Story is a UK-based platform that combines guided questions (like Storyworth) with voice recording (like Remento) and adds something neither competitor offers: QR codes in the printed book that play the original voice recordings. Family members scan the code next to an answer and hear the person speak it — their actual voice, preserved in the pages of a physical book.',
      'The pricing model is also different. There\'s no subscription — you pay once when you\'re ready to export or print. Free to start, no card needed. This makes it accessible in a way neither Storyworth nor Remento are.',
      'The printed book is produced and shipped in the UK, which means faster delivery, lower shipping costs, and no customs complications. Hardcover, softcover, and dust jacket options are available.',
      'Tell Me Your Story is best suited to UK families who want voice recording integrated with a printed book, prefer a one-time payment to an annual subscription, and want UK printing and delivery.',
    ]
  },
]

const verdicts = [
  {
    name: 'Storyworth',
    price: '~£79/year',
    bestIf: [
      'You want a gentle weekly email format',
      'The person answering is comfortable with email',
      'Voice recording isn\'t a priority',
    ],
    considerOthers: [
      'You\'re in the UK and want UK printing',
      'You don\'t want an annual subscription',
      'Voice is important to you',
    ]
  },
  {
    name: 'Remento',
    price: '~£99/year',
    bestIf: [
      'The person prefers speaking to typing',
      'Audio quality and AI transcription matter',
      'Budget isn\'t the primary concern',
    ],
    considerOthers: [
      'You\'re in the UK and want local printing',
      'You want voice preserved in the physical book',
      'You prefer a one-time payment',
    ]
  },
  {
    name: 'Tell Me Your Story',
    price: 'Free to start · from £3.99',
    bestIf: [
      'You\'re based in the UK',
      'You want voice in the printed book via QR codes',
      'You prefer one-time payment over subscription',
    ],
    considerOthers: [
      'You specifically want weekly email prompts',
      'The person answering prefers email to an app',
    ]
  },
]

const faqs = [
  { q: 'Is Storyworth available in the UK?', a: 'Yes, Storyworth accepts UK customers and ships books to the UK. However it\'s a US company, prices are in dollars, and shipping from the US adds cost and delivery time. UK-native alternatives like Tell Me Your Story offer UK printing and delivery as standard.' },
  { q: 'Is Remento available in the UK?', a: 'Remento accepts UK customers but is primarily a US service. The app works in the UK but the printed book ships from the US. The service is less well-known in the UK than Storyworth.' },
  { q: 'What is the main difference between Storyworth and Remento?', a: 'Storyworth sends weekly email questions and compiles written answers into a book. Remento is voice-first — users speak their answers and AI transcribes them. Both are US-based annual subscription services. Tell Me Your Story combines both approaches (written and voice) with a one-time payment model and UK printing.' },
  { q: 'Which is cheaper — Storyworth or Remento?', a: 'Storyworth is generally cheaper at around £79/year versus Remento\'s higher-tier pricing. Both require annual subscriptions. Tell Me Your Story is free to start with one-time payments from £3.99 — no ongoing subscription.' },
  { q: 'Is there a UK alternative to Storyworth and Remento?', a: 'Yes — Tell Me Your Story is a UK-native platform offering guided questions, voice recording with QR codes in the printed book, UK printing and delivery, and a one-time payment model with no subscription.' },
]

useSeo({
  title: 'Storyworth vs Remento — Honest Comparison 2026 | Tell Me Your Story',
  description: 'An honest comparison of Storyworth vs Remento — how they work, what they cost, and who they\'re best for. Plus a UK-native alternative worth considering.',
  canonical: 'https://tellmeyourstory.uk/storyworth-vs-remento',
  schema: {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'What is the main difference between Storyworth and Remento?', acceptedAnswer: { '@type': 'Answer', text: 'Storyworth sends weekly email questions and compiles written answers. Remento is voice-first with AI transcription. Both are US-based annual subscriptions. Tell Me Your Story combines both with a one-time payment and UK printing.' } },
          { '@type': 'Question', name: 'Is Storyworth available in the UK?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, but it\'s a US company with dollar pricing and US shipping. UK-native alternatives like Tell Me Your Story offer UK printing and delivery as standard.' } },
          { '@type': 'Question', name: 'Is there a UK alternative to Storyworth and Remento?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — Tell Me Your Story is a UK-native platform with guided questions, voice recording, QR codes in the printed book, and a one-time payment model.' } },
        ]
      }
    ]
  }
})
</script>

<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
</style>