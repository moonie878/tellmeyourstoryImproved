<template>
  <main class="bg-white">

    <!-- Hero -->
    <section class="bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">70th Birthday Gift Ideas</p>
        <h1 class="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          The most meaningful 70th birthday gift<br>
          <em class="text-[#C4A882] italic">you'll ever give</em>
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#A8A29E]">
          A 70th birthday deserves more than flowers or chocolates. Give them the chance to capture their life story — 70 years of memories, in their own words, turned into a beautiful keepsake book.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <router-link to="/gift" class="rounded-full bg-[#C4A882] px-7 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">
            Gift a life story →
          </router-link>
          <router-link to="/example" class="rounded-full border border-white/20 px-7 py-3 text-sm font-medium text-white transition hover:bg-white/10">
            See an example
          </router-link>
        </div>
      </div>
    </section>

    <!-- Why 70 is special -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Why 70 is different</p>
        <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Seventy years of stories that deserve to be kept</h2>
        <p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-500">
          A 70th birthday is a milestone that makes people reflect. For the person turning 70, it's a natural moment to look back at everything they've lived through. For their family, it's a reminder that those stories — the ones they've told at dinner tables for years — should be properly captured before they're lost.
        </p>
        <p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-500">
          The best 70th birthday gift isn't something they'll put in a drawer. It's something that lasts for generations.
        </p>
        <div class="mx-auto mt-6 max-w-xl flex flex-wrap justify-center gap-3">
          <router-link to="/questions-to-ask-elderly-parents" class="text-xs text-[#7C5C3B] underline hover:no-underline">100 questions to ask elderly parents →</router-link>
          <span class="text-xs text-stone-300">·</span>
          <router-link to="/gifts-for-parents-who-have-everything" class="text-xs text-[#7C5C3B] underline hover:no-underline">More gift ideas for parents →</router-link>
        </div>
      </div>
    </section>

    <!-- Gift options -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">70th birthday gift ideas</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">From thoughtful to truly unforgettable</h2>
        </div>
        <div class="mt-10 space-y-4">
          <div v-for="gift in gifts" :key="gift.title" class="rounded-2xl bg-white p-6">
            <div class="flex items-start gap-4">
              <span class="text-2xl flex-shrink-0">{{ gift.icon }}</span>
              <div class="flex-1">
                <div class="flex items-center justify-between gap-4">
                  <p class="text-sm font-semibold text-stone-900">{{ gift.title }}</p>
                  <span class="text-xs font-medium rounded-full px-3 py-1 flex-shrink-0"
                    :class="gift.highlight ? 'bg-[#7C5C3B] text-white' : 'bg-stone-100 text-stone-500'">
                    {{ gift.tag }}
                  </span>
                </div>
                <p class="mt-2 text-xs leading-5 text-stone-500">{{ gift.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- What they get -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">What Tell Me Your Story includes</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">A 70th birthday gift that lasts forever</h2>
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

    <!-- How gifting works -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">How it works</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Simple to give, simple to receive</h2>
        </div>
        <div class="mt-10 space-y-6">
          <div v-for="step in steps" :key="step.number" class="flex items-start gap-5">
            <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#1C1917] text-sm font-bold text-white">{{ step.number }}</div>
            <div>
              <p class="text-sm font-semibold text-stone-900">{{ step.title }}</p>
              <p class="mt-1 text-xs leading-5 text-stone-500">{{ step.desc }}</p>
            </div>
          </div>
        </div>
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
            <router-link to="/gift" class="mt-4 block rounded-full py-2 text-xs font-medium transition"
              :class="tier.featured ? 'bg-[#7C5C3B] text-white hover:opacity-90' : 'border border-stone-300 text-stone-700 hover:bg-stone-50'">
              Gift this →
            </router-link>
          </div>
        </div>
        <p class="mt-4 text-xs text-stone-400">Add a printed hardcover book from £34.98 — delivered to their door</p>
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
          <router-link to="/80th-birthday-gift-ideas" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">80th Birthday Gift Ideas</p>
            <p class="mt-1 text-xs text-stone-500">Eight decades of stories worth capturing</p>
          </router-link>
          <router-link to="/gifts-for-parents-who-have-everything" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Gifts for Parents Who Have Everything</p>
            <p class="mt-1 text-xs text-stone-500">The gift no one else can give</p>
          </router-link>
          <router-link to="/questions-to-ask-elderly-parents" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Questions to Ask Elderly Parents</p>
            <p class="mt-1 text-xs text-stone-500">100 questions to draw out their stories</p>
          </router-link>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-[#1C1917] px-5 py-16 text-center sm:px-8 sm:py-20">
      <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">The 70th birthday gift they'll never forget</p>
      <h2 class="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">Seventy years of stories. Captured forever.</h2>
      <p class="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#A8A29E]">
        Give them the gift of being heard — and give the whole family a keepsake they'll treasure for generations.
      </p>
      <router-link to="/gift" class="mt-8 inline-block rounded-full bg-[#C4A882] px-8 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">
        Gift a life story today →
      </router-link>
      <p class="mt-4 text-xs text-[#9C7C5C]">Gift link sent instantly · One-time payment · Printed book from £34.98</p>
    </section>

  </main>
</template>

<script setup lang="ts">
import { useSeo } from '../composables/useSeo'

const gifts = [
  { icon: '📖', title: 'A life story book — Tell Me Your Story', tag: 'Most meaningful', highlight: true, desc: 'Guide them through 100 questions covering every chapter of their 70 years. Their answers become a beautifully designed keepsake book, printed and delivered to their door. A gift that lasts for generations.' },
  { icon: '🌸', title: 'Flowers or a plant', tag: 'Classic', highlight: false, desc: 'A thoughtful gesture, but gone within a week. Better as an accompanying gift than a main one.' },
  { icon: '💆', title: 'Spa day or experience', tag: 'Treat', highlight: false, desc: 'A lovely treat for someone who enjoys pampering. Not personal, but enjoyable.' },
  { icon: '📸', title: 'Family photo album', tag: 'Sentimental', highlight: false, desc: 'Meaningful, but only captures moments — not the stories behind them. Pair with Tell Me Your Story for something truly complete.' },
  { icon: '🍽️', title: 'Family dinner or party', tag: 'Memorable', highlight: false, desc: 'A celebration they\'ll remember — especially if combined with a gift that captures their stories for the family to keep.' },
  { icon: '✈️', title: 'Trip or experience day', tag: 'Adventurous', highlight: false, desc: 'Great for the adventurous 70-year-old. A memory in the moment, but the story behind it deserves to be captured too.' },
]

const features = [
  { icon: '📖', title: '100 guided questions', desc: 'Written for their life — childhood, work, family, love, and legacy. No blank page, no pressure.' },
  { icon: '🎙️', title: 'Voice recordings', desc: 'Answer by speaking. A QR code in the printed book lets family hear their voice any time — forever.' },
  { icon: '📚', title: 'UK printed hardcover', desc: 'Professionally printed and bound in the UK. Delivered to their door. Softcover from £34.98.' },
  { icon: '⏱️', title: 'Answer at their pace', desc: 'One question a day or ten at once. Everything saves automatically.' },
  { icon: '✨', title: 'Easy to use', desc: 'Simple enough for anyone. Works on phone, tablet, or computer.' },
  { icon: '🤍', title: 'Share with family', desc: 'The whole family can read along as the story grows.' },
]

const steps = [
  { number: '1', title: 'Choose a gift', desc: 'Pick from Story, Story + Photos, All Stories, or Premium. One-time payment, no subscription.' },
  { number: '2', title: 'Get your gift link instantly', desc: 'A unique gift link is emailed to you immediately. Share it on their birthday — or before.' },
  { number: '3', title: 'They start their story', desc: 'They open the link, create a free account, and start answering questions whenever they feel like it.' },
  { number: '4', title: 'Order the printed book', desc: 'When they\'re ready, order a professionally printed hardcover delivered to the door.' },
]

const tiers = [
  { name: 'Story Gift',     price: '3.99',  desc: 'PDF keepsake for one story',           featured: false },
  { name: 'Story + Photos', price: '7.99',  desc: 'PDF with photos included',             featured: true  },
  { name: 'All Stories',    price: '11.99', desc: 'All 7 story types unlocked',           featured: false },
  { name: 'Premium',        price: '17.99', desc: 'Photos, premium layouts, all stories', featured: false },
]

useSeo({
  title: '70th Birthday Gift Ideas 2026 — Tell Me Your Story | Life Story Keepsake Book',
  description: 'The most meaningful 70th birthday gift — capture 70 years of stories in a beautiful keepsake book. Guided questions, voice recordings, UK printed hardcover. From £3.99.',
  canonical: 'https://tellmeyourstory.uk/70th-birthday-gift-ideas',
})
</script>

<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
</style>