<template>
  <main class="bg-white">

    <!-- Hero -->
    <section class="bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Questions About Childhood</p>
        <h1 class="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          Questions to ask about<br>
          <em class="text-[#C4A882] italic">someone's childhood</em>
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#A8A29E]">
          Childhood questions unlock the most vivid, personal stories. Where they grew up. What they ate for breakfast. Who they loved. These questions draw out the details that make a life story feel real.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <router-link to="/register" class="rounded-full bg-[#C4A882] px-7 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Start capturing their story free →</router-link>
          <router-link to="/example" class="rounded-full border border-white/20 px-7 py-3 text-sm font-medium text-white transition hover:bg-white/10">See an example</router-link>
        </div>
      </div>
    </section>

    <!-- Why childhood -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Why childhood questions work</p>
        <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Childhood memories are the most vivid — and the most at risk</h2>
        <p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-500">Childhood is where identity is formed. The details a person remembers — the smell of their grandmother's kitchen, the games they played in the street, the moment they first understood something important — these are the stories that make a person who they are. And they're often the first to be lost.</p>
        <div class="mt-6 flex flex-wrap justify-center gap-3">
          <router-link to="/life-story-questions" class="text-xs text-[#7C5C3B] underline hover:no-underline">See all 150 life story questions →</router-link>
          <span class="text-xs text-stone-300">·</span>
          <router-link to="/how-to-capture-parents-life-story" class="text-xs text-[#7C5C3B] underline hover:no-underline">How to capture their life story →</router-link>
        </div>
      </div>
    </section>

    <!-- Questions -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="text-center mb-10">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">The questions</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">50 questions about childhood</h2>
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

    <!-- Why these questions unlock stories -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Why these questions work</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Specific questions unlock specific memories</h2>
        </div>
        <div class="mt-8 space-y-4">
          <div v-for="reason in reasons" :key="reason.title" class="rounded-2xl border border-stone-200 p-5 flex gap-4">
            <span class="text-xl flex-shrink-0">{{ reason.icon }}</span>
            <div>
              <p class="text-sm font-semibold text-stone-900">{{ reason.title }}</p>
              <p class="mt-1 text-xs leading-5 text-stone-500">{{ reason.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA mid -->
    <section class="px-5 py-12 sm:px-8">
      <div class="mx-auto max-w-3xl rounded-3xl bg-[#1C1917] p-8 text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Don't just ask — capture</p>
        <h2 class="mt-3 font-display text-2xl font-bold text-white">Turn childhood memories into a keepsake book</h2>
        <p class="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#A8A29E]">Tell Me Your Story includes a full childhood chapter with questions like these — plus 9 more chapters covering every part of their life. Answer by typing or speaking. Turn into a printed book.</p>
        <router-link to="/register" class="mt-6 inline-block rounded-full bg-[#C4A882] px-7 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Start free →</router-link>
      </div>
    </section>

    <!-- Related pages -->
    <section class="px-5 py-12 sm:px-8">
      <div class="mx-auto max-w-3xl">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C] mb-6">Related reading</p>
        <div class="grid gap-4 sm:grid-cols-3">
          <router-link to="/life-story-questions" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">150 Life Story Questions</p>
            <p class="mt-1 text-xs text-stone-500">The full set across all chapters of life</p>
          </router-link>
          <router-link to="/questions-to-ask-elderly-parents" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Questions for Elderly Parents</p>
            <p class="mt-1 text-xs text-stone-500">100 questions across all chapters</p>
          </router-link>
          <router-link to="/life-story-interview-questions" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Life Story Interview Questions</p>
            <p class="mt-1 text-xs text-stone-500">How to run a proper interview</p>
          </router-link>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-[#1C1917] px-5 py-16 text-center sm:px-8 sm:py-20">
      <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Start today</p>
      <h2 class="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">Their childhood stories are worth keeping</h2>
      <p class="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#A8A29E]">Start capturing their story today — free, no commitment. Their childhood, their voice, their words. Kept forever.</p>
      <router-link to="/register" class="mt-8 inline-block rounded-full bg-[#C4A882] px-8 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Start their story free →</router-link>
      <p class="mt-4 text-xs text-[#9C7C5C]">Free to start · One-time payment · Printed book from £34.98</p>
    </section>

  </main>
</template>

<script setup lang="ts">
import { useSeo } from '../composables/useSeo'

const categories = [
  {
    icon: '🏠', title: 'Home and family',
    questions: [
      'What is your earliest memory?',
      'What was your home like as a child?',
      'What did your bedroom look like?',
      'What did the kitchen smell like?',
      'What did your family do together?',
      'What was your relationship with your parents like?',
      'Did you have brothers or sisters? What were they like?',
      'What did you fight about at home?',
      'What traditions did your family keep?',
      'What did Sunday feel like in your house?',
    ]
  },
  {
    icon: '🎒', title: 'School and friends',
    questions: [
      'What was your school like?',
      'Who was your best friend as a child?',
      'Who was your favourite teacher?',
      'What did you get in trouble for at school?',
      'What were you good at?',
      'What did you struggle with?',
      'What did you do at playtime?',
      'What was the walk to school like?',
      'Did you enjoy school? Why or why not?',
      'What happened after school?',
    ]
  },
  {
    icon: '🎮', title: 'Play and free time',
    questions: [
      'What games did you play?',
      'What were your favourite toys?',
      'What did you do in the summer holidays?',
      'Did you have a favourite place to go?',
      'What did you watch on television?',
      'What music did you listen to?',
      'What books did you read?',
      'What did you save up for?',
      'What did you do when it rained?',
      'What was the most fun thing you ever did as a child?',
    ]
  },
  {
    icon: '🍽️', title: 'Food and daily life',
    questions: [
      'What did you eat for breakfast?',
      'What was your favourite meal?',
      'What food did you hate?',
      'What sweets did you love?',
      'What did you eat at Christmas?',
      'Was there ever a time when money was tight?',
      'What did a typical weekday look like?',
      'What did you wear to school?',
      'What did you want to be when you grew up?',
      'What did your parents want you to be?',
    ]
  },
  {
    icon: '💭', title: 'Feelings and formative moments',
    questions: [
      'When were you happiest as a child?',
      'What were you afraid of?',
      'What was the hardest thing about your childhood?',
      'Was there a moment that changed everything?',
      'Who did you look up to?',
      'What\'s something you believed as a child that you later learned wasn\'t true?',
      'What\'s a memory that still makes you smile?',
      'What do you wish had been different?',
      'What do you miss about childhood?',
      'What from your childhood shaped who you became?',
    ]
  },
]

const reasons = [
  { icon: '🎯', title: 'Specific questions get specific answers', desc: '"What did your bedroom look like?" gets a far richer answer than "Tell me about your childhood." Details unlock memories.' },
  { icon: '👃', title: 'Sensory details bring memories to life', desc: 'Questions about smells, tastes, sounds, and textures unlock memories that more abstract questions miss entirely.' },
  { icon: '😊', title: 'Childhood memories are often positive', desc: 'Starting with childhood is gentle and non-threatening. It\'s a good way in for people who find talking about themselves difficult.' },
  { icon: '🔗', title: 'One memory leads to another', desc: 'A question about school friends often leads to a story about a particular day, which leads to a memory they\'ve never told anyone.' },
]

useSeo({
  title: '50 Questions to Ask About Childhood Memories (Free List)',
  description: '50 thoughtful questions to ask about someone\'s childhood — covering home, school, friends, food, and feelings. Use them in conversation, or capture the answers forever with Tell Me Your Story.',
  canonical: 'https://tellmeyourstory.uk/questions-about-childhood',
})
</script>

<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
</style>