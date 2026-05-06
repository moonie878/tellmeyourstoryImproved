<template>
  <main class="bg-[#F5F0E8] min-h-screen">

    <!-- Hero -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="eyebrow">Pricing</p>
        <h1 class="mt-4 font-display text-3xl font-bold leading-tight tracking-[-0.02em] text-[#1C1917] sm:text-4xl md:text-5xl">
          Start free, upgrade when you're ready
        </h1>
        <p class="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#5C534E] sm:text-lg">
          Begin capturing their story for free — no time limit, no credit card. Unlock the finished keepsake when you're ready to export.
        </p>
        <div class="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-[#8C847E]">
          <span class="flex items-center gap-1.5"><span class="text-[#7C5C3B] font-semibold">✓</span> One-time payment</span>
          <span class="flex items-center gap-1.5"><span class="text-[#7C5C3B] font-semibold">✓</span> No subscription</span>
          <span class="flex items-center gap-1.5"><span class="text-[#7C5C3B] font-semibold">✓</span> No renewal</span>
        </div>
      </div>
    </section>

    <!-- Table — desktop -->
    <section class="px-5 pb-8 sm:px-8">
      <div class="mx-auto max-w-6xl">
        <div class="hidden overflow-hidden rounded-3xl border border-[#E8DDD0] bg-white md:block">
          <table class="w-full border-collapse">
            <thead>
              <tr class="border-b border-[#E8DDD0]">
                <th class="w-[28%] px-6 py-6 text-left text-xs font-medium uppercase tracking-[0.15em] text-[#8C847E]">What you get</th>

                <!-- Free -->
                <th class="w-[14%] px-4 py-6 text-center">
                  <p class="text-base font-semibold text-[#1C1917]">Free</p>
                  <p class="mt-1 text-2xl font-bold text-[#1C1917]">£0</p>
                  <p class="mt-1 text-xs text-[#8C847E]">No card needed</p>
                  <router-link to="/register"
                    class="mt-3 block rounded-full border border-[#D6CFC8] px-3 py-2 text-xs font-medium text-[#1C1917] transition hover:bg-[#F5F0E8]">
                    Start free
                  </router-link>
                </th>

                <!-- Keepsake Book -->
                <th class="w-[14%] px-4 py-6 text-center">
                  <p class="text-base font-semibold text-[#1C1917]">Keepsake Book</p>
                  <p class="mt-1 text-2xl font-bold text-[#1C1917]">£3.99</p>
                  <p class="mt-1 text-xs text-[#8C847E]">One-time</p>
                  <router-link to="/register"
                    class="mt-3 block rounded-full border border-[#D6CFC8] px-3 py-2 text-xs font-medium text-[#1C1917] transition hover:bg-[#F5F0E8]">
                    Get started
                  </router-link>
                </th>

                <!-- Book + Photos — featured -->
                <th class="w-[14%] bg-[#1C1917] px-4 py-6 text-center">
                  <p class="text-[10px] font-medium uppercase tracking-[0.15em] text-[#9C7C5C]">Most popular</p>
                  <p class="mt-1 text-base font-semibold text-white">Book + Photos</p>
                  <p class="mt-1 text-2xl font-bold text-white">£7.99</p>
                  <p class="mt-1 text-xs text-[#9C7C5C]">One-time</p>
                  <router-link to="/register"
                    class="mt-3 block rounded-full bg-white px-3 py-2 text-xs font-semibold text-[#1C1917] transition hover:opacity-90">
                    Get started
                  </router-link>
                </th>

                <!-- All Stories -->
                <th class="w-[14%] px-4 py-6 text-center">
                  <p class="text-base font-semibold text-[#1C1917]">All Stories</p>
                  <p class="mt-1 text-2xl font-bold text-[#1C1917]">£11.99</p>
                  <p class="mt-1 text-xs text-[#8C847E]">One-time</p>
                  <router-link to="/register"
                    class="mt-3 block rounded-full border border-[#D6CFC8] px-3 py-2 text-xs font-medium text-[#1C1917] transition hover:bg-[#F5F0E8]">
                    Get started
                  </router-link>
                </th>

                <!-- Premium Keepsake -->
                <th class="w-[16%] px-4 py-6 text-center">
                  <p class="text-[10px] font-medium uppercase tracking-[0.15em] text-[#7C5C3B]">✦ Premium</p>
                  <p class="text-base font-semibold text-[#1C1917]">Premium Keepsake</p>
                  <p class="mt-1 text-2xl font-bold text-[#1C1917]">£17.99</p>
                  <p class="mt-1 text-xs text-[#8C847E]">One-time</p>
                  <router-link to="/register"
                    class="mt-3 block rounded-full bg-[#7C5C3B] px-3 py-2 text-xs font-semibold text-white transition hover:opacity-90">
                    Get started
                  </router-link>
                </th>
              </tr>
            </thead>
            <tbody>
              <!-- Writing -->
              <tr class="bg-[#FAF7F4]">
                <td colspan="6" class="px-6 py-2 text-[10px] font-medium uppercase tracking-[0.15em] text-[#8C847E]">Writing &amp; saving</td>
              </tr>
              <tr v-for="row in writingRows" :key="row.label" class="border-t border-[#F0EBE3] transition hover:bg-[#FAF7F4]">
                <td class="px-6 py-3 text-sm text-[#3C3530]">{{ row.label }}</td>
                <td class="px-4 py-3 text-center"><span :class="row.free ? 'check' : 'cross'">{{ row.free ? '✓' : '—' }}</span></td>
                <td class="px-4 py-3 text-center"><span :class="row.book ? 'check' : 'cross'">{{ row.book ? '✓' : '—' }}</span></td>
                <td class="bg-[#F5F0E8] px-4 py-3 text-center"><span :class="row.photos ? 'check' : 'cross'">{{ row.photos ? '✓' : '—' }}</span></td>
                <td class="px-4 py-3 text-center"><span :class="row.all ? 'check' : 'cross'">{{ row.all ? '✓' : '—' }}</span></td>
                <td class="px-4 py-3 text-center"><span :class="row.premium ? 'check' : 'cross'">{{ row.premium ? '✓' : '—' }}</span></td>
              </tr>

              <!-- Keepsake Book -->
              <tr class="bg-[#FAF7F4]">
                <td colspan="6" class="px-6 py-2 text-[10px] font-medium uppercase tracking-[0.15em] text-[#8C847E]">Keepsake book (PDF)</td>
              </tr>
              <tr v-for="row in bookRows" :key="row.label" class="border-t border-[#F0EBE3] transition hover:bg-[#FAF7F4]">
                <td class="px-6 py-3 text-sm text-[#3C3530]">{{ row.label }}</td>
                <td class="px-4 py-3 text-center"><span :class="row.free ? 'check' : 'cross'">{{ row.free ? '✓' : '—' }}</span></td>
                <td class="px-4 py-3 text-center"><span :class="row.book ? 'check' : 'cross'">{{ row.book ? '✓' : '—' }}</span></td>
                <td class="bg-[#F5F0E8] px-4 py-3 text-center"><span :class="row.photos ? 'check' : 'cross'">{{ row.photos ? '✓' : '—' }}</span></td>
                <td class="px-4 py-3 text-center"><span :class="row.all ? 'check' : 'cross'">{{ row.all ? '✓' : '—' }}</span></td>
                <td class="px-4 py-3 text-center"><span :class="row.premium ? 'check' : 'cross'">{{ row.premium ? '✓' : '—' }}</span></td>
              </tr>

              <!-- Extras -->
              <tr class="bg-[#FAF7F4]">
                <td colspan="6" class="px-6 py-2 text-[10px] font-medium uppercase tracking-[0.15em] text-[#8C847E]">Story types &amp; extras</td>
              </tr>
              <tr v-for="row in extrasRows" :key="row.label" class="border-t border-[#F0EBE3] transition hover:bg-[#FAF7F4]">
                <td class="px-6 py-3 text-sm text-[#3C3530]">{{ row.label }}</td>
                <td class="px-4 py-3 text-center">
                  <span v-if="typeof row.free === 'boolean'" :class="row.free ? 'check' : 'cross'">{{ row.free ? '✓' : '—' }}</span>
                  <span v-else class="text-sm text-[#5C534E]">{{ row.free }}</span>
                </td>
                <td class="px-4 py-3 text-center">
                  <span v-if="typeof row.book === 'boolean'" :class="row.book ? 'check' : 'cross'">{{ row.book ? '✓' : '—' }}</span>
                  <span v-else class="text-sm text-[#5C534E]">{{ row.book }}</span>
                </td>
                <td class="bg-[#F5F0E8] px-4 py-3 text-center">
                  <span v-if="typeof row.photos === 'boolean'" :class="row.photos ? 'check' : 'cross'">{{ row.photos ? '✓' : '—' }}</span>
                  <span v-else class="text-sm text-[#5C534E]">{{ row.photos }}</span>
                </td>
                <td class="px-4 py-3 text-center">
                  <span v-if="typeof row.all === 'boolean'" :class="row.all ? 'check' : 'cross'">{{ row.all ? '✓' : '—' }}</span>
                  <span v-else class="text-sm text-[#5C534E]">{{ row.all }}</span>
                </td>
                <td class="px-4 py-3 text-center">
                  <span v-if="typeof row.premium === 'boolean'" :class="row.premium ? 'check' : 'cross'">{{ row.premium ? '✓' : '—' }}</span>
                  <span v-else class="text-sm text-[#5C534E]">{{ row.premium }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Mobile cards -->
        <div class="grid gap-4 md:hidden">
          <div v-for="plan in mobilePlans" :key="plan.name"
            :class="['rounded-3xl border p-6',
              plan.featured ? 'border-[#1C1917] bg-[#1C1917]' :
              plan.premium ? 'border-[#D6CFC8] bg-white' :
              'border-[#E8DDD0] bg-white']">
            <div v-if="plan.badge" class="mb-1 text-[10px] font-medium uppercase tracking-[0.15em]"
              :class="plan.featured ? 'text-[#9C7C5C]' : 'text-[#7C5C3B]'">
              {{ plan.badge }}
            </div>
            <div class="flex items-baseline justify-between">
              <p class="text-lg font-semibold" :class="plan.featured ? 'text-white' : 'text-[#1C1917]'">{{ plan.name }}</p>
              <p class="text-2xl font-bold" :class="plan.featured ? 'text-white' : 'text-[#1C1917]'">{{ plan.price }}</p>
            </div>
            <p class="mt-1 text-xs" :class="plan.featured ? 'text-[#9C7C5C]' : 'text-[#8C847E]'">One-time payment</p>
            <ul class="mt-4 space-y-2">
              <li v-for="feature in plan.features" :key="feature"
                class="flex items-start gap-2 text-sm"
                :class="plan.featured ? 'text-[#A8A29E]' : 'text-[#5C534E]'">
                <span :class="plan.featured ? 'text-[#9C7C5C]' : 'text-[#7C5C3B]'" class="mt-0.5 flex-shrink-0">✓</span>
                {{ feature }}
              </li>
            </ul>
            <router-link to="/register"
              :class="['mt-5 block rounded-full px-4 py-2.5 text-center text-sm font-semibold transition',
                plan.featured ? 'bg-white text-[#1C1917] hover:opacity-90' :
                plan.premium ? 'bg-[#7C5C3B] text-white hover:opacity-90' :
                'border border-[#D6CFC8] text-[#1C1917] hover:bg-[#F5F0E8]']">
              {{ plan.cta }}
            </router-link>
          </div>
        </div>

        <p class="mt-6 text-center text-xs text-[#8C847E]">
          One-time payment · No subscription · No renewal · Download when ready
        </p>
      </div>
    </section>

    <!-- FAQ -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-2xl">
        <h2 class="font-display text-2xl font-bold text-[#1C1917] sm:text-3xl text-center">Common questions</h2>
        <div class="mt-8 space-y-4">
          <div v-for="faq in faqs" :key="faq.q" class="rounded-2xl border border-[#E8DDD0] bg-white px-6 py-5">
            <p class="font-semibold text-[#1C1917] text-sm">{{ faq.q }}</p>
            <p class="mt-2 text-sm leading-relaxed text-[#5C534E]">{{ faq.a }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Bottom CTA -->
    <section class="px-5 pb-20 sm:px-8">
      <div class="mx-auto max-w-2xl rounded-3xl bg-[#1C1917] px-6 py-10 sm:px-8 sm:py-12 text-center">
        <p class="text-[11px] font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Tell Me Your Story</p>
        <h3 class="mt-3 font-display text-2xl font-bold text-white sm:text-3xl">
          Start free today
        </h3>
        <p class="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#A8A29E]">
          No credit card needed. Answer as many or as few questions as feel right — and upgrade to a keepsake whenever you're ready.
        </p>
        <router-link
          to="/register"
          class="mt-8 inline-block rounded-full bg-white px-7 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90"
        >
          Start capturing their story — it's free
        </router-link>
      </div>
    </section>

  </main>
</template>

<script setup lang="ts">
import { useSeo } from '../composables/useSeo'

useSeo({
  title: 'Pricing | Tell Me Your Story',
  description: 'Start free with no time limit. Unlock a beautifully designed keepsake book or video when you\'re ready. One-time payment — no subscription, no renewal.',
})

const writingRows = [
  { label: 'Start any story type', free: true, book: true, photos: true, all: true, premium: true },
  { label: 'All 100 guided questions', free: true, book: true, photos: true, all: true, premium: true },
  { label: 'Autosave', free: true, book: true, photos: true, all: true, premium: true },
  { label: 'Add photos per answer', free: true, book: true, photos: true, all: true, premium: true },
]

const bookRows = [
  { label: 'PDF export', free: false, book: true, photos: true, all: true, premium: true },
  { label: 'Chapters, drop caps & layouts', free: false, book: true, photos: true, all: true, premium: true },
  { label: 'Design themes', free: false, book: true, photos: true, all: true, premium: true },
  { label: 'Photos included in PDF', free: false, book: false, photos: true, all: false, premium: true },
  { label: 'Cover image', free: false, book: false, photos: true, all: false, premium: true },
  { label: 'Premium layouts & styling', free: false, book: false, photos: false, all: false, premium: true },
  { label: 'Portrait & Open Spread formats', free: false, book: false, photos: false, all: false, premium: true },
]

const extrasRows = [
  { label: 'Number of stories', free: false, book: '1 story', photos: '1 story', all: 'Unlimited', premium: 'Unlimited' },
  { label: 'All story types unlocked', free: false, book: false, photos: false, all: true, premium: true },
  { label: 'Video export (MP4)', free: false, book: false, photos: false, all: false, premium: true },
]

const mobilePlans = [
  {
    name: 'Free',
    price: '£0',
    badge: null,
    featured: false,
    premium: false,
    cta: 'Start free',
    features: [
      'Start any story type',
      'All 100 guided questions',
      'Autosave',
      'Add photos per answer',
    ],
  },
  {
    name: 'Keepsake Book',
    price: '£3.99',
    badge: null,
    featured: false,
    premium: false,
    cta: 'Get Keepsake Book',
    features: [
      'Everything in Free',
      'PDF keepsake export',
      'Chapters, drop caps & layouts',
      'Design themes',
    ],
  },
  {
    name: 'Book + Photos',
    price: '£7.99',
    badge: 'Most popular',
    featured: true,
    premium: false,
    cta: 'Get Book + Photos',
    features: [
      'Everything in Keepsake Book',
      'Photos included in PDF',
      'Cover image',
    ],
  },
  {
    name: 'All Stories',
    price: '£11.99',
    badge: null,
    featured: false,
    premium: false,
    cta: 'Get All Stories',
    features: [
      'All story types unlocked',
      'Unlimited stories',
      'Text-only PDF exports',
    ],
  },
  {
    name: 'Premium Keepsake',
    price: '£17.99',
    badge: '✦ Premium',
    featured: false,
    premium: true,
    cta: 'Get Premium Keepsake',
    features: [
      'All story types unlocked',
      'Photos in all exports',
      'Premium layouts & styling',
      'Portrait & Open Spread formats',
      'Video export (MP4)',
    ],
  },
]

const faqs = [
  {
    q: 'Is it really free to start?',
    a: 'Yes — completely free, no credit card needed. You can answer all 100 questions and add photos at no cost. You only pay when you\'re ready to export your finished keepsake.',
  },
  {
    q: 'What\'s the difference between Keepsake Book and Book + Photos?',
    a: 'The Keepsake Book (£3.99) exports a beautifully designed PDF with chapters, layouts, and themes — but without your uploaded photos. Book + Photos (£7.99) includes all your photos in the PDF alongside each answer, plus a cover image.',
  },
  {
    q: 'Can I upgrade later after starting free?',
    a: 'Yes — you can start free, answer questions at your own pace, and upgrade to any tier whenever you\'re ready to export. Your answers are always saved.',
  },
  {
    q: 'Is this a one-time payment or a subscription?',
    a: 'One-time payment only. You pay once to unlock your chosen tier and keep it forever. No subscription, no renewal, no hidden fees.',
  },
  {
    q: 'What is All Stories — who is it for?',
    a: 'All Stories (£11.99) is for families who want to capture multiple people\'s stories — a mum, a dad, grandparents. You unlock all story types and can create unlimited text-only PDF exports.',
  },
  {
    q: 'What does Premium Keepsake include that others don\'t?',
    a: 'Premium Keepsake (£17.99) is the most complete tier — it includes everything, plus premium layouts and styling, Portrait and Open Spread book formats, photos in all exports, and video export as an MP4.',
  },
]
</script>

<style scoped>
.check {
  color: #3B6D11;
  font-weight: 600;
  font-size: 14px;
}
.cross {
  color: #C4B8B0;
  font-size: 14px;
}
.eyebrow {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #8C847E;
}
.font-display {
  font-family: 'Playfair Display', Georgia, serif;
}
</style>