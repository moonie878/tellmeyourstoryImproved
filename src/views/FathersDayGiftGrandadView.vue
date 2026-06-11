<template>
  <main class="bg-white">

    <!-- Hero -->
    <section class="bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Father's Day Gift for Grandad</p>
        <h1 class="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          The Father's Day gift<br>
          <em class="text-[#C4A882] italic">your grandad will never forget</em>
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#A8A29E]">
          Grandad has lived through more than you'll ever fully know. This Father's Day, give him the chance to share all of it — in his own words, with his own voice, turned into a beautiful keepsake book.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <router-link to="/gift" class="rounded-full bg-[#C4A882] px-7 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Gift a life story →</router-link>
          <router-link to="/example" class="rounded-full border border-white/20 px-7 py-3 text-sm font-medium text-white transition hover:bg-white/10">See an example</router-link>
        </div>
      </div>
    </section>

    <!-- Why grandad -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Why grandads especially</p>
        <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Grandads rarely volunteer their stories</h2>
        <p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-500">Most grandads are from a generation that didn't talk about themselves much. They got on with things. They didn't complain. And they certainly didn't sit around sharing their feelings. But the stories are in there — they just need to be asked for.</p>
        <p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-500">This Father's Day, give him the gift of being asked — and a gentle, structured way to answer at his own pace.</p>
        <div class="mx-auto mt-6 max-w-xl flex flex-wrap justify-center gap-3">
          <router-link to="/questions-to-ask-your-grandad" class="text-xs text-[#7C5C3B] underline hover:no-underline">100 questions to ask your grandad →</router-link>
          <span class="text-xs text-stone-300">·</span>
          <router-link to="/gifts-for-parents-who-have-everything" class="text-xs text-[#7C5C3B] underline hover:no-underline">More Father's Day gift ideas →</router-link>
        </div>
      </div>
    </section>

    <!-- What he gets -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">What he gets</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">A gift that captures a lifetime</h2>
        </div>
        <div class="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          <div v-for="feature in features" :key="feature.title" class="rounded-2xl bg-white p-6">
            <p class="text-2xl">{{ feature.icon }}</p>
            <p class="mt-3 text-sm font-semibold text-stone-900">{{ feature.title }}</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">{{ feature.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Questions preview -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">What he'll be asked</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Questions written just for him</h2>
          <p class="mx-auto mt-3 max-w-lg text-sm text-stone-500">A sample of the 100 questions in Grandad's Story</p>
        </div>
        <div class="mt-10 grid gap-3 sm:grid-cols-2">
          <div v-for="q in questions" :key="q" class="rounded-2xl bg-stone-50 p-4 text-sm text-stone-700 italic leading-5">"{{ q }}"</div>
        </div>
        <p class="mt-6 text-center text-xs text-stone-400">Plus 90 more questions covering every chapter of his life</p>
        <p class="mt-3 text-center text-xs"><router-link to="/questions-to-ask-your-grandad" class="text-[#7C5C3B] underline hover:no-underline">See all 100 questions to ask your grandad →</router-link></p>
      </div>
    </section>

    <!-- How gifting works -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">How it works</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Simple to give, simple to receive</h2>
        </div>
        <div class="mt-10 space-y-5">
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
          <div v-for="tier in tiers" :key="tier.name" class="rounded-3xl border p-5 text-center"
            :class="tier.featured ? 'border-[#7C5C3B] bg-[#FAF7F4]' : 'border-stone-200 bg-white'">
            <p v-if="tier.featured" class="mb-2 text-[10px] font-semibold uppercase tracking-wider text-[#7C5C3B]">Most popular</p>
            <p class="text-xs font-medium text-stone-500">{{ tier.name }}</p>
            <p class="mt-2 text-2xl font-bold text-stone-900">£{{ tier.price }}</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">{{ tier.desc }}</p>
            <router-link to="/gift" class="mt-4 block rounded-full py-2 text-xs font-medium transition"
              :class="tier.featured ? 'bg-[#7C5C3B] text-white hover:opacity-90' : 'border border-stone-300 text-stone-700 hover:bg-stone-50'">Gift this →</router-link>
          </div>
        </div>
        <p class="mt-4 text-xs text-stone-400">Add a printed hardcover from £34.98 — delivered to his door</p>
      </div>
    </section>

    <!-- Quote -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <p class="font-display text-xl italic leading-relaxed text-stone-700 sm:text-2xl">"He told me about a motorbike he saved up for two years to buy. I never knew that about him."</p>
        <p class="mt-4 text-sm text-[#9C7C5C]">— From a Tell Me Your Story keepsake</p>
      </div>
    </section>

    <!-- Related pages -->
    <section class="px-5 py-12 sm:px-8">
      <div class="mx-auto max-w-3xl">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C] mb-6">Related reading</p>
        <div class="grid gap-4 sm:grid-cols-3">
          <router-link to="/questions-to-ask-your-grandad" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Questions to Ask Your Grandad</p>
            <p class="mt-1 text-xs text-stone-500">100 questions to draw out his stories</p>
          </router-link>
          <router-link to="/gifts-for-parents-who-have-everything" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Gifts for Parents Who Have Everything</p>
            <p class="mt-1 text-xs text-stone-500">More meaningful gift ideas</p>
          </router-link>
          <router-link to="/keepsake-book" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Keepsake Book</p>
            <p class="mt-1 text-xs text-stone-500">Everything that goes inside a keepsake book</p>
          </router-link>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-[#1C1917] px-5 py-16 text-center sm:px-8 sm:py-20">
      <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">This Father's Day</p>
      <h2 class="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">Give Grandad the gift of being heard</h2>
      <p class="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#A8A29E]">His stories are irreplaceable. This Father's Day, give him something that lasts long after the day is over.</p>
      <router-link to="/gift" class="mt-8 inline-block rounded-full bg-[#C4A882] px-8 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Gift a life story today →</router-link>
      <p class="mt-4 text-xs text-[#9C7C5C]">Gift link sent instantly · One-time payment · Printed book from £34.98</p>
    </section>

  </main>
</template>

<script setup lang="ts">
import { useSeo } from '../composables/useSeo'

const features = [
  { icon: '📖', title: '100 guided questions', desc: 'Written for his life — childhood, work, adventures, family, and the wisdom he wants to pass on.' },
  { icon: '🎙️', title: 'His voice, preserved', desc: 'Answer by speaking. A QR code in the printed book lets the family hear him tell the story himself — forever.' },
  { icon: '📚', title: 'UK printed hardcover', desc: 'Professionally printed and bound in the UK. Delivered to his door. From £34.98 including shipping.' },
  { icon: '⏱️', title: 'At his own pace', desc: 'No weekly email pressure. Answer one question at a time, whenever he feels like it.' },
  { icon: '✨', title: 'Simple to use', desc: 'Works on any phone, tablet, or computer. Simple enough for any grandad.' },
  { icon: '🤍', title: 'For the whole family', desc: 'The grandchildren, the cousins, the whole family can read along as the story grows.' },
]

const questions = [
  'What is your earliest memory?',
  'What was your first job?',
  'How did you meet Grandma?',
  'What are you most proud of in your life?',
  'What was the hardest thing you ever went through?',
  'What do you want your grandchildren to know about you?',
  'What story do you most want to make sure is never forgotten?',
  'What advice would you give someone just starting out?',
]

const steps = [
  { number: '1', title: 'Choose a gift', desc: 'Pick from Story, Story + Photos, All Stories, or Premium. One-time payment, no subscription.' },
  { number: '2', title: 'Get your gift link instantly', desc: 'A unique gift link is emailed to you immediately. Share it with Grandad on Father\'s Day.' },
  { number: '3', title: 'He starts his story', desc: 'He opens the link, creates a free account, and starts answering whenever he feels like it.' },
  { number: '4', title: 'Order the printed book', desc: 'When he\'s ready, order a professionally printed hardcover delivered to the door.' },
]

const tiers = [
  { name: 'Story Gift',     price: '3.99',  desc: 'PDF keepsake for one story',           featured: false },
  { name: 'Story + Photos', price: '7.99',  desc: 'PDF with photos included',             featured: true  },
  { name: 'All Stories',    price: '11.99', desc: 'All 7 story types unlocked',           featured: false },
  { name: 'Premium',        price: '17.99', desc: 'Photos, premium layouts, all stories', featured: false },
]

useSeo({
  title: 'Father\'s Day Gift for Grandad 2026 — Tell Me Your Story | Life Story Keepsake Book',
  description: 'The most meaningful Father\'s Day gift for Grandad — capture his life story in his own words and voice. 100 guided questions, UK printed hardcover. Gift link sent instantly. From £3.99.',
  canonical: 'https://tellmeyourstory.uk/fathers-day-gift-for-grandad',
})
</script>

<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
</style>