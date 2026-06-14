<template>
  <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
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
              <th class="w-[28%] px-6 py-5 text-left text-xs font-medium uppercase tracking-[0.15em] text-[#8C847E]">What you get</th>

              <th class="w-[14%] px-4 py-5 text-center">
                <p class="text-base font-semibold text-[#1C1917]">Free</p>
                <p class="mt-1 text-2xl font-bold text-[#1C1917]">£0</p>
                <router-link to="/register" @click="$emit('track', 'free')"
                  class="mt-3 block rounded-full border border-[#D6CFC8] px-3 py-2 text-xs font-medium text-[#1C1917] transition hover:bg-[#F5F0E8]">
                  Start free
                </router-link>
              </th>

              <th class="w-[14%] px-4 py-5 text-center">
                <p class="text-base font-semibold text-[#1C1917]">Keepsake Book</p>
                <p class="mt-1 text-2xl font-bold text-[#1C1917]">£3.99</p>
                <router-link to="/register" @click="$emit('track', 'book')"
                  class="mt-3 block rounded-full border border-[#D6CFC8] px-3 py-2 text-xs font-medium text-[#1C1917] transition hover:bg-[#F5F0E8]">
                  Get started
                </router-link>
              </th>

              <th class="w-[14%] bg-[#1C1917] px-4 py-5 text-center">
                <p class="text-[10px] font-medium uppercase tracking-[0.15em] text-[#9C7C5C]">Most popular</p>
                <p class="mt-1 text-base font-semibold text-white">Book + Photos</p>
                <p class="mt-1 text-2xl font-bold text-white">£7.99</p>
                <router-link to="/register" @click="$emit('track', 'photos')"
                  class="mt-3 block rounded-full bg-white px-3 py-2 text-xs font-semibold text-[#1C1917] transition hover:opacity-90">
                  Get started
                </router-link>
              </th>

              <th class="w-[14%] px-4 py-5 text-center">
                <p class="text-base font-semibold text-[#1C1917]">All Stories</p>
                <p class="mt-1 text-2xl font-bold text-[#1C1917]">£11.99</p>
                <router-link to="/register" @click="$emit('track', 'all')"
                  class="mt-3 block rounded-full border border-[#D6CFC8] px-3 py-2 text-xs font-medium text-[#1C1917] transition hover:bg-[#F5F0E8]">
                  Get started
                </router-link>
              </th>

              <th class="w-[16%] px-4 py-5 text-center">
                <p class="text-[10px] font-medium uppercase tracking-[0.15em] text-[#7C5C3B]">✦ Premium</p>
                <p class="text-base font-semibold text-[#1C1917]">Premium Keepsake</p>
                <p class="mt-1 text-2xl font-bold text-[#1C1917]">£17.99</p>
                <router-link to="/register" @click="$emit('track', 'premium')"
                  class="mt-3 block rounded-full bg-[#7C5C3B] px-3 py-2 text-xs font-semibold text-white transition hover:opacity-90">
                  Get started
                </router-link>
              </th>
            </tr>
          </thead>
          <tbody>
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
      <div class="mt-8 grid gap-4 md:hidden">
        <div v-for="plan in mobilePlans" :key="plan.name"
          :class="['rounded-3xl border p-6',
            plan.featured ? 'border-[#1C1917] bg-[#1C1917]' :
            plan.premium ? 'border-[#D6CFC8] bg-[#FAF7F4]' :
            'border-[#E8DDD0] bg-white']">
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
              plan.featured ? 'bg-white text-[#1C1917] hover:opacity-90' :
              plan.premium ? 'bg-[#7C5C3B] text-white hover:opacity-90' :
              'border border-[#D6CFC8] text-[#1C1917] hover:bg-[#F5F0E8]']">
            {{ plan.cta }}
          </router-link>
        </div>
      </div>

      <p class="mt-6 text-center text-xs text-[#8C847E]">
        One-time payment · No subscription · No renewal
      </p>

      <!-- ── Tribute Video ────────────────────────────────────────────── -->
      <div class="mt-12 overflow-hidden rounded-3xl border border-[#E8DDD0] bg-white">
        <div class="grid md:grid-cols-2">

          <!-- Left — info -->
          <div class="p-8 sm:p-10">
            <p class="section-label">Also available</p>
            <h3 class="mt-3 font-display text-2xl font-bold text-[#1C1917] sm:text-3xl">
              Tribute Video Creator
            </h3>
            <p class="mt-3 text-sm leading-7 text-[#5C534E]">
              Create a beautiful memorial video for someone you've lost.
              Upload photos, choose music, and generate a full HD MP4 — no
              account needed.
            </p>

            <ul class="mt-5 space-y-2">
              <li v-for="f in tributeFeatures" :key="f" class="flex items-start gap-2 text-sm text-[#3C3530]">
                <span class="mt-0.5 flex-shrink-0 text-[#7C5C3B]">✓</span>
                {{ f }}
              </li>
            </ul>

            <div class="mt-6 flex flex-wrap items-center gap-4">
              <router-link
                to="/tribute"
                @click="$emit('track', 'tribute')"
                class="rounded-full bg-[#1C1917] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Create a tribute video
              </router-link>
              <div class="text-right">
                <p class="text-2xl font-bold text-[#1C1917]">£19.99</p>
                <p class="text-xs text-[#8C847E]">Preview free · Pay to download</p>
              </div>
            </div>
          </div>

          <!-- Right — dark feature card -->
          <div class="bg-[#1C1917] p-8 sm:p-10">
            <p class="text-[10px] font-medium uppercase tracking-[0.2em] text-[#9C7C5C]">
              How it works
            </p>
            <div class="mt-5 space-y-5">
              <div v-for="step in tributeSteps" :key="step.title" class="flex items-start gap-4">
                <div class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#2C2420] text-sm">
                  {{ step.icon }}
                </div>
                <div>
                  <p class="text-sm font-semibold text-[#E8DDD0]">{{ step.title }}</p>
                  <p class="mt-0.5 text-xs leading-5 text-[#6C6460]">{{ step.desc }}</p>
                </div>
              </div>
            </div>

            <div class="mt-8 border-t border-[#2C2420] pt-6">
              <p class="text-xs text-[#5C534E]">
                No account required. Preview with watermark for free —
                pay £19.99 to download the full HD version.
                Included free with Premium Keepsake.
              </p>
            </div>
          </div>

        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
defineEmits(['track'])

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
  { label: 'Tribute video creator', free: false, book: false, photos: false, all: false, premium: true },
]

const mobilePlans = [
  {
    id: 'free',
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
    id: 'book',
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
    id: 'photos',
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
    id: 'all',
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
    id: 'premium',
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
      'Tribute video creator (free)',
    ],
  },
]

const tributeFeatures = [
  'Up to 30 photos in any order',
  'Choose from curated music or upload your own',
  'Fade, slow-fade or cut transitions',
  'Personal tribute text as a quote slide',
  'Full HD 1920×1080 MP4 download',
  'No account needed',
]

const tributeSteps = [
  { icon: '📸', title: 'Upload their photos', desc: 'Add up to 30 photos and arrange them in any order you like.' },
  { icon: '🎵', title: 'Choose music', desc: 'Pick a curated gentle track or upload a song that was meaningful to them.' },
  { icon: '👁', title: 'Preview free', desc: 'Generate a watermarked preview instantly to see how it looks.' },
  { icon: '⬇', title: 'Download for £19.99', desc: 'Pay once to download the full HD clean version — yours to keep forever.' },
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
.font-display {
  font-family: 'Playfair Display', Georgia, serif;
}
</style>