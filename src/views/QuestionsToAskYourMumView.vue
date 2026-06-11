<template>
  <main class="bg-white">

    <!-- Hero -->
    <section class="bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Questions to Ask Your Mum</p>
        <h1 class="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          100 questions to ask your mum<br>
          <em class="text-[#C4A882] italic">before it's too late</em>
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#A8A29E]">
          Your mum has stories you've never heard. Her childhood, her fears, her proudest moments, her regrets. These questions will draw them out — and Tell Me Your Story will help you capture them forever.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <router-link to="/register" class="rounded-full bg-[#C4A882] px-7 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Start capturing Mum's story free →</router-link>
          <router-link to="/example" class="rounded-full border border-white/20 px-7 py-3 text-sm font-medium text-white transition hover:bg-white/10">See an example</router-link>
        </div>
      </div>
    </section>

    <!-- Why ask -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Why these questions matter</p>
        <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">You know your mum. But do you know her story?</h2>
        <p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-500">Most of us know our mums as parents — but not as the young woman she once was. The girl who had dreams, fears, adventures, and a whole life before we came along. These questions bridge that gap.</p>
        <div class="mt-6 flex flex-wrap justify-center gap-3">
          <router-link to="/questions-to-ask-elderly-parents" class="text-xs text-[#7C5C3B] underline hover:no-underline">100 questions to ask elderly parents →</router-link>
          <span class="text-xs text-stone-300">·</span>
          <router-link to="/how-to-capture-parents-life-story" class="text-xs text-[#7C5C3B] underline hover:no-underline">How to capture her life story →</router-link>
        </div>
      </div>
    </section>

    <!-- Questions -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="text-center mb-10">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">The questions</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Questions to ask your mum</h2>
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
        <h2 class="mt-3 font-display text-2xl font-bold text-white">Turn her answers into a keepsake book</h2>
        <p class="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#A8A29E]">Tell Me Your Story guides your mum through 100 questions — she can type or speak her answers — and turns them into a beautifully printed book with her voice recorded inside.</p>
        <router-link to="/register" class="mt-6 inline-block rounded-full bg-[#C4A882] px-7 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Start free →</router-link>
      </div>
    </section>

    <!-- Tips -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">How to ask</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Tips for getting the best answers</h2>
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

    <!-- Printable CTA -->
<section class="px-5 pb-4 sm:px-8">
  <div class="mx-auto max-w-3xl text-center">
    <div class="rounded-2xl bg-[#F5F0E8] px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="text-left">
        <p class="text-sm font-semibold text-stone-900">Free printable version</p>
        <p class="text-xs text-stone-500 mt-0.5">Download a beautifully designed PDF to print and take with you</p>
      </div>
      <router-link
        to="/resources/50-questions-printable"
        class="flex-shrink-0 rounded-full bg-[#7C5C3B] px-5 py-2.5 text-xs font-semibold text-white transition hover:opacity-90"
      >
        Download free PDF →
      </router-link>
    </div>
  </div>
</section>

    <!-- Related pages -->
    <section class="bg-[#F5F0E8] px-5 py-12 sm:px-8">
      <div class="mx-auto max-w-3xl">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C] mb-6">Related reading</p>
        <div class="grid gap-4 sm:grid-cols-3">
          <router-link to="/questions-to-ask-your-dad" class="rounded-2xl border border-stone-200 bg-white p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Questions to Ask Your Dad</p>
            <p class="mt-1 text-xs text-stone-500">100 questions for your father</p>
          </router-link>
          <router-link to="/questions-to-ask-elderly-parents" class="rounded-2xl border border-stone-200 bg-white p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Questions for Elderly Parents</p>
            <p class="mt-1 text-xs text-stone-500">The full 100 question guide</p>
          </router-link>
          <router-link to="/gifts-for-parents-who-have-everything" class="rounded-2xl border border-stone-200 bg-white p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Gifts for Mums Who Have Everything</p>
            <p class="mt-1 text-xs text-stone-500">The most meaningful gift you can give</p>
          </router-link>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-[#1C1917] px-5 py-16 text-center sm:px-8 sm:py-20">
      <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Don't wait</p>
      <h2 class="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">Her story is worth keeping</h2>
      <p class="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#A8A29E]">Start capturing your mum's life story today — free, no commitment, in her own words and her own voice.</p>
      <router-link to="/register" class="mt-8 inline-block rounded-full bg-[#C4A882] px-8 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Start Mum's story free →</router-link>
      <p class="mt-4 text-xs text-[#9C7C5C]">Free to start · One-time payment · Printed book from £34.98</p>
    </section>

  </main>
</template>

<script setup lang="ts">
import { useSeo } from '../composables/useSeo'

const categories = [
  {
    icon: '🌱', title: 'Her childhood',
    questions: [
      'What is your earliest memory?',
      'What was your home like growing up?',
      'What did you do after school?',
      'Who was your best friend as a child?',
      'What was your relationship like with your parents?',
      'What did you want to be when you grew up?',
      'What parts of childhood felt happiest?',
      'What was the hardest thing about growing up?',
    ]
  },
  {
    icon: '🎒', title: 'School and teenage years',
    questions: [
      'What were you like at school?',
      'Which teacher had the biggest impact on you?',
      'What did you do for fun as a teenager?',
      'What music were you listening to?',
      'What was your first job?',
      'What was your biggest teenage ambition?',
      'Is there something you wish you\'d done differently?',
      'Who were you closest to at that age?',
    ]
  },
  {
    icon: '❤️', title: 'Love and relationships',
    questions: [
      'How did you meet Dad?',
      'What was your first impression of him?',
      'When did you know he was the one?',
      'What do you love most about him?',
      'What has marriage taught you?',
      'What\'s the secret to a happy relationship?',
      'What do you wish you\'d known about love when you were young?',
      'Who else has been important in your life?',
    ]
  },
  {
    icon: '👩‍👧', title: 'Being a mum',
    questions: [
      'What did it feel like to become a mum?',
      'What were you most worried about as a new parent?',
      'What\'s your proudest parenting moment?',
      'What do you wish you\'d done differently as a parent?',
      'What did you want most for your children?',
      'What values were most important to pass on?',
      'What\'s something your children don\'t know about you?',
      'What do you hope they remember about their childhood?',
    ]
  },
  {
    icon: '💼', title: 'Work and ambitions',
    questions: [
      'What jobs have you had over your life?',
      'What work are you most proud of?',
      'Was there a career you wished you\'d pursued?',
      'What sacrifices did you make for your family?',
      'What gave you the most satisfaction in your working life?',
      'What would you do differently career-wise?',
      'What did work mean to you beyond money?',
      'What did you find hardest about working life?',
    ]
  },
  {
    icon: '🤍', title: 'Legacy and wisdom',
    questions: [
      'What are you most grateful for in your life?',
      'What\'s the wisest thing you\'ve ever been told?',
      'What do you know now that you wish you\'d known at 20?',
      'What are you most proud of?',
      'What\'s the hardest thing you\'ve ever been through?',
      'What do you want to be remembered for?',
      'What message would you leave for your grandchildren?',
      'What has life taught you about happiness?',
    ]
  },
]

const tips = [
  { icon: '🎙️', title: 'Record the conversation', desc: 'Ask your mum to speak her answers rather than write them. Her voice, her pauses, her laughter — that\'s what you\'ll want to hear again one day.' },
  { icon: '☕', title: 'Pick the right moment', desc: 'Over a cup of tea, on a Sunday afternoon, during a car journey. Relaxed, unhurried, with no distractions.' },
  { icon: '👂', title: 'Listen more than you talk', desc: 'Resist the urge to fill silences. The best answers often come after a pause. Let her think.' },
  { icon: '🔁', title: 'Follow the thread', desc: 'When something interesting comes up, follow it. "Tell me more about that" is the most powerful follow-up question.' },
]

useSeo({
  title: 'Questions to Ask Your Mum — 100 Questions Before It\'s Too Late | Tell Me Your Story',
  description: 'The best questions to ask your mum about her life, childhood, and memories. 100 questions across 10 chapters — and a way to capture her answers forever.',
  canonical: 'https://tellmeyourstory.uk/questions-to-ask-your-mum',
})
</script>

<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
</style>