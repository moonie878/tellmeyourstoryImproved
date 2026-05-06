<template>
  <section id="pricing" class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
    <div class="mx-auto max-w-6xl">

      <div class="section-label text-center">Pricing</div>
      <h2 class="section-title mt-3 text-center">
        Start free, upgrade when you're ready
      </h2>
      <p class="mx-auto mt-4 max-w-2xl text-center text-base leading-[1.8] text-[#5C534E]">
        Begin writing for free with no time limit. Unlock the finished keepsake when you're ready to export.
      </p>

      <!-- Table — desktop -->
      <div class="mt-10 hidden overflow-hidden rounded-3xl border border-[#E8DDD0] bg-white md:block">
        <table class="w-full border-collapse">
          <thead>
            <tr class="border-b border-[#E8DDD0]">
              <th class="w-[32%] px-6 py-5 text-left text-xs font-medium uppercase tracking-[0.15em] text-[#8C847E]">What you get</th>
              <th class="w-[17%] px-4 py-5 text-center">
                <p class="text-base font-semibold text-[#1C1917]">Free</p>
                <p class="mt-1 text-2xl font-bold text-[#1C1917]">£0</p>
                <router-link to="/register" @click="$emit('track', 'free')"
                  class="mt-3 block rounded-full border border-[#D6CFC8] px-4 py-2 text-xs font-medium text-[#1C1917] transition hover:bg-[#F5F0E8]">
                  Start free
                </router-link>
              </th>
              <th class="w-[17%] px-4 py-5 text-center">
                <p class="text-base font-semibold text-[#1C1917]">Single Story</p>
                <p class="mt-1 text-2xl font-bold text-[#1C1917]">£3.99</p>
                <router-link to="/register" @click="$emit('track', 'single')"
                  class="mt-3 block rounded-full border border-[#D6CFC8] px-4 py-2 text-xs font-medium text-[#1C1917] transition hover:bg-[#F5F0E8]">
                  Get started
                </router-link>
              </th>
              <th class="w-[17%] bg-[#1C1917] px-4 py-5 text-center">
                <p class="text-[10px] font-medium uppercase tracking-[0.15em] text-[#9C7C5C]">Most popular</p>
                <p class="mt-1 text-base font-semibold text-white">Story + Photos</p>
                <p class="mt-1 text-2xl font-bold text-white">£5.99</p>
                <router-link to="/register" @click="$emit('track', 'photos')"
                  class="mt-3 block rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#1C1917] transition hover:opacity-90">
                  Get started
                </router-link>
              </th>
              <th class="w-[17%] px-4 py-5 text-center">
                <p class="text-[10px] font-medium uppercase tracking-[0.15em] text-[#7C5C3B]">✦ Premium</p>
                <p class="mt-1 text-base font-semibold text-[#1C1917]">Full Collection</p>
                <p class="mt-1 text-2xl font-bold text-[#1C1917]">£11.99</p>
                <router-link to="/register" @click="$emit('track', 'full')"
                  class="mt-3 block rounded-full bg-[#7C5C3B] px-4 py-2 text-xs font-semibold text-white transition hover:opacity-90">
                  Get started
                </router-link>
              </th>
            </tr>
          </thead>
          <tbody>
            <!-- Section: Writing -->
            <tr class="bg-[#FAF7F4]">
              <td colspan="5" class="px-6 py-2 text-[10px] font-medium uppercase tracking-[0.15em] text-[#8C847E]">Writing &amp; saving</td>
            </tr>
            <tr v-for="row in writingRows" :key="row.label" class="border-t border-[#F0EBE3] transition hover:bg-[#FAF7F4]">
              <td class="px-6 py-3 text-sm text-[#3C3530]">{{ row.label }}</td>
              <td class="px-4 py-3 text-center"><span :class="row.free ? 'check' : 'cross'">{{ row.free ? '✓' : '—' }}</span></td>
              <td class="px-4 py-3 text-center"><span :class="row.single ? 'check' : 'cross'">{{ row.single ? '✓' : '—' }}</span></td>
              <td class="bg-[#F5F0E8] px-4 py-3 text-center"><span :class="row.photos ? 'check' : 'cross'">{{ row.photos ? '✓' : '—' }}</span></td>
              <td class="px-4 py-3 text-center"><span :class="row.full ? 'check' : 'cross'">{{ row.full ? '✓' : '—' }}</span></td>
            </tr>

            <!-- Section: Keepsake Book -->
            <tr class="bg-[#FAF7F4]">
              <td colspan="5" class="px-6 py-2 text-[10px] font-medium uppercase tracking-[0.15em] text-[#8C847E]">Keepsake book (PDF)</td>
            </tr>
            <tr v-for="row in bookRows" :key="row.label" class="border-t border-[#F0EBE3] transition hover:bg-[#FAF7F4]">
              <td class="px-6 py-3 text-sm text-[#3C3530]">{{ row.label }}</td>
              <td class="px-4 py-3 text-center"><span :class="row.free ? 'check' : 'cross'">{{ row.free ? '✓' : '—' }}</span></td>
              <td class="px-4 py-3 text-center">
                <span v-if="typeof row.single === 'boolean'" :class="row.single ? 'check' : 'cross'">{{ row.single ? '✓' : '—' }}</span>
                <span v-else class="text-sm text-[#5C534E]">{{ row.single }}</span>
              </td>
              <td class="bg-[#F5F0E8] px-4 py-3 text-center"><span :class="row.photos ? 'check' : 'cross'">{{ row.photos ? '✓' : '—' }}</span></td>
              <td class="px-4 py-3 text-center"><span :class="row.full ? 'check' : 'cross'">{{ row.full ? '✓' : '—' }}</span></td>
            </tr>

            <!-- Section: Video & Extras -->
            <tr class="bg-[#FAF7F4]">
              <td colspan="5" class="px-6 py-2 text-[10px] font-medium uppercase tracking-[0.15em] text-[#8C847E]">Video &amp; extras</td>
            </tr>
            <tr v-for="row in extrasRows" :key="row.label" class="border-t border-[#F0EBE3] transition hover:bg-[#FAF7F4]">
              <td class="px-6 py-3 text-sm text-[#3C3530]">{{ row.label }}</td>
              <td class="px-4 py-3 text-center">
                <span v-if="typeof row.free === 'boolean'" :class="row.free ? 'check' : 'cross'">{{ row.free ? '✓' : '—' }}</span>
                <span v-else class="text-sm text-[#5C534E]">{{ row.free }}</span>
              </td>
              <td class="px-4 py-3 text-center">
                <span v-if="typeof row.single === 'boolean'" :class="row.single ? 'check' : 'cross'">{{ row.single ? '✓' : '—' }}</span>
                <span v-else class="text-sm text-[#5C534E]">{{ row.single }}</span>
              </td>
              <td class="bg-[#F5F0E8] px-4 py-3 text-center">
                <span v-if="typeof row.photos === 'boolean'" :class="row.photos ? 'check' : 'cross'">{{ row.photos ? '✓' : '—' }}</span>
                <span v-else class="text-sm text-[#5C534E]">{{ row.photos }}</span>
              </td>
              <td class="px-4 py-3 text-center">
                <span v-if="typeof row.full === 'boolean'" :class="row.full ? 'check' : 'cross'">{{ row.full ? '✓' : '—' }}</span>
                <span v-else class="text-sm text-[#5C534E]">{{ row.full }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Mobile cards -->
      <div class="mt-8 grid gap-4 md:hidden">
        <div v-for="plan in mobilePlans" :key="plan.name"
          :class="['rounded-3xl border p-6', plan.featured ? 'border-[#1C1917] bg-[#1C1917]' : 'border-[#E8DDD0] bg-white']">
          <div v-if="plan.badge" class="mb-1 text-[10px] font-medium uppercase tracking-[0.15em]"
            :class="plan.featured ? 'text-[#9C7C5C]' : 'text-[#7C5C3B]'">
            {{ plan.badge }}
          </div>
          <div class="flex items-baseline justify-between">
            <p class="text-lg font-semibold" :class="plan.featured ? 'text-white' : 'text-[#1C1917]'">{{ plan.name }}</p>
            <p class="text-2xl font-bold" :class="plan.featured ? 'text-white' : 'text-[#1C1917]'">{{ plan.price }}</p>
          </div>
          <ul class="mt-4 space-y-2">
            <li v-for="feature in plan.features" :key="feature"
              class="flex items-start gap-2 text-sm"
              :class="plan.featured ? 'text-[#A8A29E]' : 'text-[#5C534E]'">
              <span :class="plan.featured ? 'text-[#9C7C5C]' : 'text-[#7C5C3B]'" class="mt-0.5 flex-shrink-0">✓</span>
              {{ feature }}
            </li>
          </ul>
          <router-link to="/register" @click="$emit('track', plan.id)"
            :class="['mt-5 block rounded-full px-4 py-2.5 text-center text-sm font-semibold transition',
              plan.featured
                ? 'bg-white text-[#1C1917] hover:opacity-90'
                : plan.id === 'full'
                  ? 'bg-[#7C5C3B] text-white hover:opacity-90'
                  : 'border border-[#D6CFC8] text-[#1C1917] hover:bg-[#F5F0E8]']">
            {{ plan.cta }}
          </router-link>
        </div>
      </div>

      <p class="mt-6 text-center text-xs text-[#8C847E]">
        One-time payment · No subscription · No renewal
      </p>

    </div>
  </section>
</template>

<script setup lang="ts">
defineEmits(['track'])

const writingRows = [
  { label: 'Start any story type', free: true, single: true, photos: true, full: true },
  { label: 'All 100 guided questions', free: true, single: true, photos: true, full: true },
  { label: 'Autosave', free: true, single: true, photos: true, full: true },
  { label: 'Add photos per answer', free: true, single: true, photos: true, full: true },
]

const bookRows = [
  { label: 'PDF export', free: false, single: true, photos: true, full: true },
  { label: 'Chapters, drop caps & layouts', free: false, single: true, photos: true, full: true },
  { label: 'Design themes', free: false, single: true, photos: true, full: true },
  { label: 'Photos included in PDF', free: false, single: false, photos: true, full: true },
  { label: 'Cover image', free: false, single: false, photos: true, full: true },
]

const extrasRows = [
  { label: 'Video export (MP4)', free: false, single: false, photos: false, full: true },
  { label: 'All story types', free: false, single: '1 story', photos: '1 story', full: true },
  { label: 'Number of exports', free: false, single: '1', photos: '1', full: 'Unlimited' },
]

const mobilePlans = [
  {
    id: 'free',
    name: 'Free',
    price: '£0',
    badge: null,
    featured: false,
    cta: 'Start free',
    features: [
      'Start any story type',
      'All 100 guided questions',
      'Autosave',
      'Add photos per answer',
    ],
  },
  {
    id: 'single',
    name: 'Single Story',
    price: '£3.99',
    badge: null,
    featured: false,
    cta: 'Get Single Story',
    features: [
      'Everything in Free',
      'PDF keepsake export',
      'Chapters, drop caps & layouts',
      'Design themes',
    ],
  },
  {
    id: 'photos',
    name: 'Story + Photos',
    price: '£5.99',
    badge: 'Most popular',
    featured: true,
    cta: 'Get Story + Photos',
    features: [
      'Everything in Single Story',
      'Photos included in PDF',
      'Cover image',
    ],
  },
  {
    id: 'full',
    name: 'Full Collection',
    price: '£11.99',
    badge: '✦ Premium',
    featured: false,
    cta: 'Get Full Collection',
    features: [
      'All story types',
      'Photos in all exports',
      'Video export (MP4)',
      'Unlimited exports',
    ],
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
.section-label {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #8C847E;
}
.section-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(1.8rem, 3vw, 2.6rem);
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: #1C1917;
  max-width: 640px;
  margin-left: auto;
  margin-right: auto;
}
</style>