<template>
  <main class="bg-white">

    <!-- Hero -->
    <section class="bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Remento vs Tell Me Your Story</p>
        <h1 class="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          Remento vs Tell Me Your Story<br>
          <em class="text-[#C4A882] italic">which is right for your family?</em>
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#A8A29E]">
          Remento turns spoken memories into a keepsake book using AI transcription. Tell Me Your Story is a UK alternative with no subscription and no upfront cost. Here's an honest, side-by-side look at how they compare.
        </p>
      </div>
    </section>

    <!-- Quick summary -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Quick summary</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">What are they?</h2>
        </div>
        <div class="mt-10 grid gap-5 sm:grid-cols-2">
          <div v-for="summary in summaries" :key="summary.name" class="rounded-2xl border p-6 text-center"
            :class="summary.featured ? 'border-[#7C5C3B] bg-[#FAF7F4]' : 'border-stone-200'">
            <p v-if="summary.featured" class="text-[10px] font-semibold uppercase tracking-wider text-[#7C5C3B] mb-2">UK alternative</p>
            <p class="font-display text-lg font-bold text-stone-900">{{ summary.name }}</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">{{ summary.desc }}</p>
            <p class="mt-3 text-xs font-semibold text-stone-700">{{ summary.price }}</p>
          </div>
        </div>
        <div class="mt-6 flex flex-wrap justify-center gap-3">
          <router-link to="/remento-review" class="text-xs text-[#7C5C3B] underline hover:no-underline">Full Remento review →</router-link>
          <span class="text-xs text-stone-300">·</span>
          <router-link to="/remento-alternative" class="text-xs text-[#7C5C3B] underline hover:no-underline">Remento alternative →</router-link>
          <span class="text-xs text-stone-300">·</span>
          <router-link to="/storyworth-vs-remento" class="text-xs text-[#7C5C3B] underline hover:no-underline">Storyworth vs Remento →</router-link>
        </div>
      </div>
    </section>

    <!-- Comparison table -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center mb-10">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Feature comparison</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Remento vs Tell Me Your Story</h2>
        </div>
        <div class="rounded-2xl border border-stone-200 bg-white overflow-hidden">
          <div class="grid grid-cols-3 bg-[#1C1917] px-4 py-3 text-xs font-semibold text-white gap-2">
            <div>Feature</div>
            <div class="text-center">Remento</div>
            <div class="text-center text-[#C4A882]">Tell Me Your Story</div>
          </div>
          <div v-for="(row, i) in comparisonRows" :key="row.feature"
            class="grid grid-cols-3 px-4 py-3 gap-2 text-xs border-t border-stone-100"
            :class="i % 2 === 0 ? 'bg-white' : 'bg-stone-50'">
            <div class="text-stone-700 font-medium">{{ row.feature }}</div>
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

    <!-- Verdict -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Our verdict</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Which should you choose?</h2>
        </div>
        <div class="mt-10 grid gap-5 sm:grid-cols-2">
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
          <router-link to="/remento-review" class="rounded-2xl border border-stone-200 bg-white p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Remento Review</p>
            <p class="mt-1 text-xs text-stone-500">A full honest look at Remento</p>
          </router-link>
          <router-link to="/storyworth-vs-remento" class="rounded-2xl border border-stone-200 bg-white p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Storyworth vs Remento</p>
            <p class="mt-1 text-xs text-stone-500">Another popular comparison</p>
          </router-link>
          <router-link to="/remento-alternative" class="rounded-2xl border border-stone-200 bg-white p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Remento Alternative</p>
            <p class="mt-1 text-xs text-stone-500">Why UK families look elsewhere</p>
          </router-link>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-[#1C1917] px-5 py-16 text-center sm:px-8 sm:py-20">
      <h2 class="font-display text-2xl font-bold text-white sm:text-3xl">Try Tell Me Your Story free</h2>
      <p class="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#A8A29E]">No subscription, no card needed. See how it compares for yourself.</p>
      <router-link to="/register" class="mt-8 inline-block rounded-full bg-[#C4A882] px-8 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Start free →</router-link>
      <p class="mt-4 text-xs text-[#9C7C5C]">Free to start · One-time payment · Printed book from £{{ PRINTED_BOOK_FROM_PRICE.toFixed(2) }}</p>
    </section>

  </main>
</template>

<script setup lang="ts">
import { useSeo } from '../composables/useSeo'
import { PRINTED_BOOK_FROM_PRICE } from '../lib/printPricing'

const summaries = [
  { name: 'Remento', desc: 'Video/voice recording with AI transcription into a written story. Annual subscription. US-based, ships internationally.', price: '$99/year (~£79)', featured: false },
  { name: 'Tell Me Your Story', desc: 'UK-native with guided questions, voice recording, and QR codes in printed books. No subscription. Free to start.', price: 'Free to start · from £3.99', featured: true },
]

const comparisonRows = [
  { feature: 'UK-based service',             re: '✗',            tm: '✓' },
  { feature: 'Free to start',                re: '✗',            tm: '✓' },
  { feature: 'Subscription required',        re: 'Annual or monthly', tm: 'No subscription' },
  { feature: 'Input format',                 re: 'Video/voice only', tm: 'Type, or record voice' },
  { feature: 'Rich text editing',            re: '✗',            tm: '✓' },
  { feature: 'Voice recording included',     re: '✓',            tm: '✓' },
  { feature: 'QR codes in printed book',     re: '✓',            tm: '✓' },
  { feature: 'PDF export included',          re: '✗ ($49.99 extra)', tm: '✓ included' },
  { feature: 'Multiple projects per account', re: '✗ (1 per sub)', tm: '✓ unlimited' },
  { feature: 'Real-time collaboration',      re: '✗',            tm: '✓' },
  { feature: 'UK printing & delivery',       re: '✗ (ships from US)', tm: '✓' },
  { feature: 'Access if you stop paying',    re: 'Read-only',     tm: 'Stays accessible' },
  { feature: 'Extra family members to contribute', re: '$99 each', tm: 'Included' },
  { feature: 'Tribute video export',         re: '✗',            tm: '✓' },
  { feature: 'One-time payment option',      re: '✗',            tm: '✓' },
]

const deepDive = [
  {
    label: 'About Remento',
    title: 'Remento — record-first storytelling with AI transcription',
    paras: [
      'Remento\'s core idea is a good one: rather than asking someone to type out their life story, Remento has them speak it. A storyteller receives a prompt by email or text, records a short video or voice response, and Remento\'s "Speech-to-Story" technology transcribes it into a written narrative — either word-for-word or polished into flowing prose.',
      'This makes Remento a strong fit for people who find writing a chore, or who are more comfortable speaking than typing. There\'s no app to download, which lowers the barrier for less tech-confident family members.',
      'The subscription costs $99/year (or $12/month), and that covers one storyteller and one project. If you want to add a second family member as a storyteller, that\'s another $99. If you want a second book — a different project entirely — that requires a separate subscription too, since Remento is built around one project per subscription.',
      'A few costs aren\'t obvious upfront. Downloading a PDF of your own book costs an extra $49.99. Additional printed copies start from $69. International shipping outside the US adds $5 to $15 and roughly three weeks of delivery time. And if a subscription lapses, the account becomes read-only — recordings remain viewable, but no new content can be added until the subscription is renewed.',
      'There\'s also no rich text editing. Since stories come from AI-transcribed recordings, there\'s no way to simply write a memory from scratch — everything has to be spoken first.',
    ]
  },
  {
    label: 'About Tell Me Your Story',
    title: 'Tell Me Your Story — flexible input, no subscription, UK printed',
    paras: [
      'Tell Me Your Story gives you the choice Remento doesn\'t: type an answer, record it as voice, or do both. Some questions feel natural to speak aloud; others are easier to sit and write properly. Neither format is enforced, so the person telling their story can use whichever feels right for each question.',
      'Like Remento, voice recordings get a QR code printed directly into the finished book, so anyone holding it can scan and hear the actual voice behind the words. Unlike Remento, that\'s included as standard rather than something extra to unlock.',
      'There\'s no subscription. You start completely free, answer at your own pace, and pay once — only when you\'re ready to export or print. If your access ever lapses for any reason, your content stays exactly as you left it — nothing becomes locked or read-only.',
      'Multiple family members can contribute to the same project at no extra cost, and you can start as many separate story projects as you like without needing a new subscription for each one.',
      'The printed book is produced in the UK, with delivery typically within 10-14 days and no international shipping fees or customs delays — a meaningful difference for UK families ordering from a US-based platform like Remento.',
    ]
  },
]

const verdicts = [
  {
    name: 'Remento',
    price: '$99/year (~£79)',
    bestIf: [
      'The storyteller strongly prefers speaking over writing',
      'You want AI to polish spoken recordings into prose automatically',
      'You\'re US-based and want US printing and shipping',
    ],
    considerOthers: [
      'You\'re UK-based and want UK printing with no import costs',
      'You\'d rather pay once than commit to a recurring subscription',
      'You want the flexibility to write some answers and speak others',
      'You want more than one project without paying for a second subscription',
    ]
  },
  {
    name: 'Tell Me Your Story',
    price: 'Free to start · from £3.99',
    bestIf: [
      'You\'re UK-based and want UK printing with no import costs',
      'You want the choice to type or record voice, question by question',
      'You\'d rather pay once than commit to a yearly or monthly subscription',
      'You want multiple projects or contributors without extra fees',
    ],
    considerOthers: [
      'The storyteller specifically wants video recording, not just voice',
      'You strongly prefer a fully automated AI-polished narrative over editable text',
    ]
  },
]

const faqs = [
  { q: 'What is the main difference between Remento and Tell Me Your Story?', a: 'Remento is video/voice-only with AI transcription, an annual or monthly subscription, and ships from the US. Tell Me Your Story lets you type or record voice for each answer, is free to start, includes QR codes in the printed book as standard, and is UK-printed with no subscription.' },
  { q: 'Is Tell Me Your Story cheaper than Remento?', a: 'Remento costs $99/year (around £79), plus $49.99 for a PDF export and $69+ for additional printed copies. Tell Me Your Story is free to start, with digital exports from £3.99 and printed softcover books from £21.99 — a one-time payment, with no renewal required.' },
  { q: 'Does Remento support written answers, not just voice?', a: 'Remento is built around spoken recordings transcribed by AI — there is no way to simply type an answer from scratch. Tell Me Your Story lets you choose to type or record voice for any question.' },
  { q: 'What happens to my Remento content if I do not renew?', a: 'Your existing recordings and stories remain viewable, but the account becomes read-only — you cannot record new memories or make edits until you resubscribe. Tell Me Your Story does not lock your content if your access lapses.' },
  { q: 'Is there a UK alternative to Remento?', a: 'Yes — Tell Me Your Story is UK-native, with UK printing and delivery, no subscription, and QR codes for voice recordings included in the printed book as standard.' },
]

useSeo({
  title: 'Remento vs Tell Me Your Story — Honest Comparison 2026',
  description: 'Remento vs Tell Me Your Story compared: pricing, voice recording, UK printing, and subscription vs one-time payment. An honest look to help UK families choose.',
  canonical: 'https://tellmeyourstory.uk/remento-vs-tellmeyourstory',
  schema: {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'What is the main difference between Remento and Tell Me Your Story?', acceptedAnswer: { '@type': 'Answer', text: 'Remento is video/voice-only with AI transcription and an annual subscription, shipping from the US. Tell Me Your Story lets you type or record voice, is free to start, and is UK-printed with no subscription.' } },
          { '@type': 'Question', name: 'Is Tell Me Your Story cheaper than Remento?', acceptedAnswer: { '@type': 'Answer', text: 'Remento costs $99/year plus extra fees for PDF export and additional copies. Tell Me Your Story is free to start, with printed books from £21.99 as a one-time payment.' } },
          { '@type': 'Question', name: 'Is there a UK alternative to Remento?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — Tell Me Your Story is UK-native, with UK printing and delivery, no subscription, and QR codes for voice recordings included as standard.' } },
        ]
      }
    ]
  }
})
</script>

<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
</style>