<template>
  <main class="bg-white">

    <!-- Hero -->
    <section class="bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Questions to Ask Your Dad</p>
        <h1 class="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          100 questions to ask your dad<br>
          <em class="text-[#C4A882] italic">while you still can</em>
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#A8A29E]">
          Dads rarely volunteer their stories. These questions are designed to draw them out — gently, naturally, in a way that doesn't feel like an interrogation. Capture his answers. Keep them forever.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <router-link to="/register" class="rounded-full bg-[#C4A882] px-7 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Start capturing Dad's story free →</router-link>
          <router-link to="/example" class="rounded-full border border-white/20 px-7 py-3 text-sm font-medium text-white transition hover:bg-white/10">See an example</router-link>
        </div>
      </div>
    </section>

    <!-- Why ask -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Why these questions matter</p>
        <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Dads don't often talk about their lives unprompted</h2>
        <p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-500">Most dads grew up in a generation that didn't talk about feelings or share personal stories easily. The right question — asked at the right moment, in the right way — changes everything. You might be surprised how much he wants to be asked.</p>
        <div class="mt-6 flex flex-wrap justify-center gap-3">
          <router-link to="/questions-to-ask-your-grandad" class="text-xs text-[#7C5C3B] underline hover:no-underline">Questions to ask your grandad →</router-link>
          <span class="text-xs text-stone-300">·</span>
          <router-link to="/fathers-day-gift-for-grandad" class="text-xs text-[#7C5C3B] underline hover:no-underline">Father's Day gift ideas →</router-link>
        </div>
      </div>
    </section>

    <!-- Questions -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="text-center mb-10">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">The questions</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Questions to ask your dad</h2>
        </div>
        <div class="grid gap-5 sm:grid-cols-2">
          <div v-for="category in categories" :key="category.title" class="rounded-2xl bg-white p-6">
            <p class="text-lg mb-1">{{ category.icon }}</p>
            <p class="text-sm font-semibold text-stone-900 mb-4">{{ category.title }}</p>
            <ul class="space-y-2">
              <li v-for="q in category.questions" :key="q" class="text-xs leading-5 text-stone-600 flex gap-2">
                <span class="text-[#9C7C5C] flex-shrink-0 mt-0.5">◦</span>
                <span>{{ q }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA mid -->
    <section class="px-5 py-12 sm:px-8">
      <div class="mx-auto max-w-3xl rounded-3xl bg-[#1C1917] p-8 text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Don't just ask — capture</p>
        <h2 class="mt-3 font-display text-2xl font-bold text-white">Turn his answers into a keepsake book</h2>
        <p class="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#A8A29E]">Tell Me Your Story guides your dad through 100 questions — he can type or speak his answers — and turns them into a beautifully printed book with his voice recorded inside.</p>
        <router-link to="/register" class="mt-6 inline-block rounded-full bg-[#C4A882] px-7 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Start free →</router-link>
      </div>
    </section>

    <!-- Tips -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">How to ask</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Getting a dad to open up</h2>
        </div>
        <div class="mt-8 space-y-4">
          <div v-for="tip in tips" :key="tip.title" class="rounded-2xl border border-stone-200 p-5 flex gap-4">
            <span class="text-xl flex-shrink-0">{{ tip.icon }}</span>
            <div>
              <p class="text-sm font-semibold text-stone-900">{{ tip.title }}</p>
              <p class="mt-1 text-xs leading-5 text-stone-500">{{ tip.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Related pages -->
    <section class="bg-[#F5F0E8] px-5 py-12 sm:px-8">
      <div class="mx-auto max-w-3xl">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C] mb-6">Related reading</p>
        <div class="grid gap-4 sm:grid-cols-3">
          <router-link to="/questions-to-ask-your-mum" class="rounded-2xl border border-stone-200 bg-white p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Questions to Ask Your Mum</p>
            <p class="mt-1 text-xs text-stone-500">100 questions for your mother</p>
          </router-link>
          <router-link to="/questions-to-ask-your-grandad" class="rounded-2xl border border-stone-200 bg-white p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Questions to Ask Your Grandad</p>
            <p class="mt-1 text-xs text-stone-500">100 questions for your grandfather</p>
          </router-link>
          <router-link to="/fathers-day-gift-for-grandad" class="rounded-2xl border border-stone-200 bg-white p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Father's Day Gift Ideas</p>
            <p class="mt-1 text-xs text-stone-500">The most meaningful Father's Day gift</p>
          </router-link>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-[#1C1917] px-5 py-16 text-center sm:px-8 sm:py-20">
      <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Don't wait</p>
      <h2 class="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">His story is worth keeping</h2>
      <p class="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#A8A29E]">Start capturing your dad's life story today — free, no commitment, in his own words and his own voice.</p>
      <router-link to="/register" class="mt-8 inline-block rounded-full bg-[#C4A882] px-8 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Start Dad's story free →</router-link>
      <p class="mt-4 text-xs text-[#9C7C5C]">Free to start · One-time payment · Printed book from £34.98</p>
    </section>

  </main>
</template>

<script setup lang="ts">
import { useSeo } from '../composables/useSeo'

const categories = [
  {
    icon: '🌱', title: 'His childhood',
    questions: [
      'What is your earliest memory?',
      'What was the house you grew up in like?',
      'What did you get up to after school?',
      'Who were your closest friends as a child?',
      'What was your relationship with your own dad like?',
      'What did you want to be when you grew up?',
      'What did a typical weekend look like?',
      'What was the hardest thing about your childhood?',
    ]
  },
  {
    icon: '🎒', title: 'School and teenage years',
    questions: [
      'What were you like at school?',
      'What subjects did you enjoy?',
      'What did you do for fun as a teenager?',
      'What music were you into?',
      'What was your first car?',
      'What was your first job?',
      'Who did you look up to when you were young?',
      'What trouble did you ever get into?',
    ]
  },
  {
    icon: '💼', title: 'Work and career',
    questions: [
      'How did you end up in your career?',
      'What\'s the proudest moment of your working life?',
      'What\'s the hardest job you\'ve ever done?',
      'Who did you work with that you\'ll never forget?',
      'What sacrifices did you make for the family?',
      'Is there a career you wish you\'d pursued?',
      'What did work mean to you?',
      'What would you tell your younger self about work?',
    ]
  },
  {
    icon: '❤️', title: 'Love and family',
    questions: [
      'How did you meet Mum?',
      'When did you know she was the one?',
      'What was the best day of your life?',
      'What did it feel like to become a dad?',
      'What\'s your proudest moment as a father?',
      'What do you wish you\'d done more of?',
      'What values were most important to you as a parent?',
      'What do you hope your children remember about you?',
    ]
  },
  {
    icon: '🌍', title: 'Adventures and experiences',
    questions: [
      'What\'s the best place you\'ve ever been?',
      'What\'s the most adventurous thing you\'ve ever done?',
      'What experience changed how you see the world?',
      'Is there somewhere you always wanted to go?',
      'What\'s your favourite memory of a family holiday?',
      'What risk are you glad you took?',
      'What did you do that surprised people?',
      'What would you do if you could do it all again?',
    ]
  },
  {
    icon: '🤍', title: 'Legacy and wisdom',
    questions: [
      'What are you most grateful for?',
      'What\'s the hardest thing you\'ve been through?',
      'What\'s the best advice you\'ve ever been given?',
      'What do you know now that you wish you\'d known at 20?',
      'What are you most proud of in your whole life?',
      'What do you want to be remembered for?',
      'What message would you leave for your grandchildren?',
      'What has your life taught you?',
    ]
  },
]

const tips = [
  { icon: '🚗', title: 'Ask in the car', desc: 'Side-by-side conversations are easier for dads than face-to-face. A long drive is one of the best places to ask these questions.' },
  { icon: '🎙️', title: 'Record on your phone', desc: 'Put your phone on the table and hit record. Tell him you want to keep his voice. Most dads are touched by that.' },
  { icon: '🍺', title: 'Pick a relaxed setting', desc: 'A pint, a walk, a Sunday afternoon. Relaxed and unhurried is when the real stories come out.' },
  { icon: '👂', title: 'Don\'t interrupt', desc: 'Let him finish his thought. Let him go off on tangents. The tangents are often the best bits.' },
]

useSeo({
  title: 'Questions to Ask Your Dad — 100 Questions Before It\'s Too Late | Tell Me Your Story',
  description: 'The best questions to ask your dad about his life, childhood, and memories. 100 questions designed to draw out the stories he\'s never thought to tell — and capture them forever.',
  canonical: 'https://tellmeyourstory.uk/questions-to-ask-your-dad',
})
</script>

<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
</style>