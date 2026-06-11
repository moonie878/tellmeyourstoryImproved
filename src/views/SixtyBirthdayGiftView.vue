<template>
  <main class="bg-white">

    <!-- Hero -->
    <section class="bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">60th Birthday Gift Ideas</p>
        <h1 class="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          The most meaningful 60th birthday gift<br>
          <em class="text-[#C4A882] italic">for someone turning 60</em>
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#A8A29E]">
          Sixty is a milestone that makes people look back and forward at the same time. Give them something that honours the life they've lived — and preserves it forever.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <router-link to="/gift" class="rounded-full bg-[#C4A882] px-7 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Gift a life story →</router-link>
          <router-link to="/example" class="rounded-full border border-white/20 px-7 py-3 text-sm font-medium text-white transition hover:bg-white/10">See an example</router-link>
        </div>
      </div>
    </section>

    <!-- Why 60 -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Why 60 is different</p>
        <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Sixty years of stories worth keeping</h2>
        <p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-500">A 60th birthday is often the moment people start thinking seriously about legacy — what they've built, who they've loved, what they want to be remembered for. It's also the perfect moment for their family to make sure those stories are properly captured.</p>
        <p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-500">The best 60th birthday gift isn't another experience or a trip. It's something that lasts — a record of a remarkable life, in their own words.</p>
        <div class="mx-auto mt-6 max-w-xl flex flex-wrap justify-center gap-3">
          <router-link to="/70th-birthday-gift-ideas" class="text-xs text-[#7C5C3B] underline hover:no-underline">70th birthday gift ideas →</router-link>
          <span class="text-xs text-stone-300">·</span>
          <router-link to="/gifts-for-parents-who-have-everything" class="text-xs text-[#7C5C3B] underline hover:no-underline">More gift ideas for parents →</router-link>
        </div>
      </div>
    </section>

    <!-- Gift ideas comparison -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">60th birthday gift ideas</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">What actually lasts</h2>
        </div>
        <div class="mt-10 space-y-4">
          <div v-for="gift in gifts" :key="gift.title" class="rounded-2xl bg-white p-5">
            <div class="flex items-start gap-4">
              <span class="text-2xl flex-shrink-0">{{ gift.icon }}</span>
              <div class="flex-1">
                <div class="flex items-center justify-between gap-4 flex-wrap">
                  <p class="text-sm font-semibold text-stone-900">{{ gift.title }}</p>
                  <span class="text-xs font-medium rounded-full px-3 py-1 flex-shrink-0" :class="gift.highlight ? 'bg-[#7C5C3B] text-white' : 'bg-stone-100 text-stone-500'">{{ gift.tag }}</span>
                </div>
                <p class="mt-2 text-xs leading-5 text-stone-500">{{ gift.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">What they get</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">A gift that captures sixty years</h2>
        </div>
        <div class="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          <div v-for="feature in features" :key="feature.title" class="rounded-2xl border border-stone-200 p-6">
            <p class="text-2xl">{{ feature.icon }}</p>
            <p class="mt-3 text-sm font-semibold text-stone-900">{{ feature.title }}</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">{{ feature.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Quote -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <p class="font-display text-xl italic leading-relaxed text-stone-700 sm:text-2xl">"He told me about a motorbike he saved up for two years to buy. I never knew that about him."</p>
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
          <div v-for="tier in tiers" :key="tier.name" class="rounded-3xl border p-5 text-center" :class="tier.featured ? 'border-[#7C5C3B] bg-[#FAF7F4]' : 'border-stone-200 bg-white'">
            <p v-if="tier.featured" class="mb-2 text-[10px] font-semibold uppercase tracking-wider text-[#7C5C3B]">Most popular</p>
            <p class="text-xs font-medium text-stone-500">{{ tier.name }}</p>
            <p class="mt-2 text-2xl font-bold text-stone-900">£{{ tier.price }}</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">{{ tier.desc }}</p>
            <router-link to="/gift" class="mt-4 block rounded-full py-2 text-xs font-medium transition" :class="tier.featured ? 'bg-[#7C5C3B] text-white hover:opacity-90' : 'border border-stone-300 text-stone-700 hover:bg-stone-50'">Gift this →</router-link>
          </div>
        </div>
        <p class="mt-4 text-xs text-stone-400">Add a printed hardcover from £34.98 — delivered to their door</p>
      </div>
    </section>

    <!-- Related pages -->
    <section class="px-5 py-12 sm:px-8">
      <div class="mx-auto max-w-3xl">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C] mb-6">Related reading</p>
        <div class="grid gap-4 sm:grid-cols-3">
          <router-link to="/70th-birthday-gift-ideas" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">70th Birthday Gift Ideas</p>
            <p class="mt-1 text-xs text-stone-500">Seventy years of stories worth capturing</p>
          </router-link>
          <router-link to="/anniversary-gift-ideas" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Anniversary Gift Ideas</p>
            <p class="mt-1 text-xs text-stone-500">A love story captured forever</p>
          </router-link>
          <router-link to="/gifts-for-parents-who-have-everything" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Gifts for Parents Who Have Everything</p>
            <p class="mt-1 text-xs text-stone-500">The gift no one else can give</p>
          </router-link>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-[#1C1917] px-5 py-16 text-center sm:px-8 sm:py-20">
      <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">The 60th birthday gift they'll never forget</p>
      <h2 class="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">Sixty years of stories. Captured forever.</h2>
      <p class="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#A8A29E]">Give them the gift of being heard — and give the whole family something to treasure for generations.</p>
      <router-link to="/gift" class="mt-8 inline-block rounded-full bg-[#C4A882] px-8 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Gift a life story today →</router-link>
      <p class="mt-4 text-xs text-[#9C7C5C]">Gift link sent instantly · One-time payment · Printed book from £34.98</p>
    </section>

  </main>
</template>

<script setup lang="ts">
import { useSeo } from '../composables/useSeo'

const gifts = [
  { icon: '📖', title: 'A life story book — Tell Me Your Story', tag: 'Most meaningful', highlight: true, desc: '100 guided questions, voice recordings, and a beautifully printed hardcover book. Their stories preserved forever.' },
  { icon: '✈️', title: 'Experience or trip', tag: 'Memorable', highlight: false, desc: 'A great treat for the adventurous 60-year-old — but the memory fades. Pair with a life story book for something lasting.' },
  { icon: '🍽️', title: 'Celebration dinner', tag: 'Enjoyable', highlight: false, desc: 'Everyone loves a good meal. A celebration the whole family enjoys — especially combined with a keepsake gift.' },
  { icon: '📸', title: 'Photo book', tag: 'Sentimental', highlight: false, desc: 'Captures the moments but not the stories behind them. A life story book gives those photos context and meaning.' },
  { icon: '💆', title: 'Spa or pamper day', tag: 'Treat', highlight: false, desc: 'A lovely treat but not personal. Better as an accompanying gift.' },
]

const features = [
  { icon: '📖', title: '100 guided questions', desc: 'Covering every chapter of sixty years — childhood, work, family, love, and legacy.' },
  { icon: '🎙️', title: 'Voice recordings', desc: 'Their voice preserved via QR codes in the printed book — hear them tell the story forever.' },
  { icon: '📚', title: 'UK printed hardcover', desc: 'Professionally printed and bound. Delivered to their door. From £34.98.' },
  { icon: '⏱️', title: 'At their own pace', desc: 'No pressure, no deadline. Answer one question at a time.' },
  { icon: '✨', title: 'Simple to use', desc: 'Works on any phone, tablet, or computer.' },
  { icon: '🤍', title: 'For the whole family', desc: 'Share with children and grandchildren as the story grows.' },
]

const tiers = [
  { name: 'Story Gift',     price: '3.99',  desc: 'PDF keepsake for one story',           featured: false },
  { name: 'Story + Photos', price: '7.99',  desc: 'PDF with photos included',             featured: true  },
  { name: 'All Stories',    price: '11.99', desc: 'All 7 story types unlocked',           featured: false },
  { name: 'Premium',        price: '17.99', desc: 'Photos, premium layouts, all stories', featured: false },
]

useSeo({
  title: '60th Birthday Gift Ideas 2026 — Tell Me Your Story | Life Story Keepsake Book',
  description: 'The most meaningful 60th birthday gift — capture sixty years of stories in a beautiful keepsake book. Guided questions, voice recordings, UK printed hardcover. From £3.99.',
  canonical: 'https://tellmeyourstory.uk/60th-birthday-gift-ideas',
})
</script>

<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
</style>