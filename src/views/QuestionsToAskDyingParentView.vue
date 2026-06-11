<template>
  <main class="bg-white">

    <!-- Hero -->
    <section class="bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Questions to Ask a Dying Parent</p>
        <h1 class="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          What to ask a parent<br>
          <em class="text-[#C4A882] italic">nearing the end of their life</em>
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#A8A29E]">
          If your parent is approaching the end of their life, time is precious — and the conversations you have now are ones you'll treasure forever. This gentle guide helps you have those conversations and capture what matters most.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <router-link to="/register" class="rounded-full bg-[#C4A882] px-7 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Start capturing their story free →</router-link>
          <router-link to="/end-of-life-gift" class="rounded-full border border-white/20 px-7 py-3 text-sm font-medium text-white transition hover:bg-white/10">End of life gift ideas</router-link>
        </div>
      </div>
    </section>

    <!-- Gentle intro -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">A gentle note</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">These conversations are a gift — for both of you</h2>
        </div>
        <div class="mt-8 text-sm leading-7 text-stone-600 max-w-xl mx-auto">
          <p>Many people who are nearing the end of their life want to be asked about it. They want to share what they've learned, what they're proud of, who they've loved. But they rarely volunteer it — because they don't want to be a burden.</p>
          <p class="mt-4">Asking the question is the gift. It says: your life mattered. Your story matters. I want to know it. I want to keep it.</p>
          <p class="mt-4">Go gently. Let them lead. Not every question needs to be asked — but some will unlock something they've been waiting to say for years.</p>
        </div>
        <div class="mt-6 flex flex-wrap justify-center gap-3">
          <router-link to="/end-of-life-gift" class="text-xs text-[#7C5C3B] underline hover:no-underline">End of life gift ideas →</router-link>
          <span class="text-xs text-stone-300">·</span>
          <router-link to="/memorial-book" class="text-xs text-[#7C5C3B] underline hover:no-underline">Creating a memorial book →</router-link>
        </div>
      </div>
    </section>

    <!-- Questions -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="text-center mb-10">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Gentle questions</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">What to ask — and how to ask it</h2>
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

    <!-- How to record -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Capture what you can</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">How to record these conversations</h2>
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

    <!-- CTA mid -->
    <section class="px-5 py-12 sm:px-8">
      <div class="mx-auto max-w-3xl rounded-3xl bg-[#1C1917] p-8 text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">A gentle way to capture their story</p>
        <h2 class="mt-3 font-display text-2xl font-bold text-white">Tell Me Your Story</h2>
        <p class="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#A8A29E]">100 guided questions they can answer by speaking, at their own pace, when they feel up to it. Their voice recorded and preserved in a beautifully printed book — with QR codes so family can hear them speak forever.</p>
        <router-link to="/register" class="mt-6 inline-block rounded-full bg-[#C4A882] px-7 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Start free →</router-link>
      </div>
    </section>

    <!-- Related pages -->
    <section class="px-5 py-12 sm:px-8">
      <div class="mx-auto max-w-3xl">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C] mb-6">Related reading</p>
        <div class="grid gap-4 sm:grid-cols-3">
          <router-link to="/end-of-life-gift" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">End of Life Gift Ideas</p>
            <p class="mt-1 text-xs text-stone-500">Meaningful gifts for someone nearing end of life</p>
          </router-link>
          <router-link to="/memorial-book" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Memorial Book</p>
            <p class="mt-1 text-xs text-stone-500">Preserve their memory after they're gone</p>
          </router-link>
          <router-link to="/dementia-life-story-book" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Dementia Life Story Book</p>
            <p class="mt-1 text-xs text-stone-500">Capture memories before they fade</p>
          </router-link>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-[#1C1917] px-5 py-16 text-center sm:px-8 sm:py-20">
      <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Don't wait</p>
      <h2 class="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">Their story deserves to be kept</h2>
      <p class="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#A8A29E]">Start capturing their life story today — free, no commitment, in their own words and their own voice.</p>
      <router-link to="/register" class="mt-8 inline-block rounded-full bg-[#C4A882] px-8 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Start their story free →</router-link>
      <p class="mt-4 text-xs text-[#9C7C5C]">Free to start · One-time payment · Printed book from £34.98</p>
    </section>

  </main>
</template>

<script setup lang="ts">
import { useSeo } from '../composables/useSeo'

const categories = [
  {
    icon: '🌱', title: 'Their life and story',
    questions: [
      'What is your happiest memory?',
      'What are you most proud of in your life?',
      'What was the best period of your life?',
      'Is there something you\'ve never told me?',
      'What do you want me to know about you?',
      'What was the most important decision you ever made?',
      'Who has meant the most to you in your life?',
      'What\'s something you\'d like people to know about who you really were?',
    ]
  },
  {
    icon: '❤️', title: 'Love and family',
    questions: [
      'What has family meant to you?',
      'What do you love most about your children?',
      'What do you want your grandchildren to know about you?',
      'What\'s your favourite memory of our family?',
      'Is there anything you want to say to the people you love?',
      'What do you hope for us after you\'re gone?',
      'What are you most grateful for about your life?',
      'What has loving someone taught you?',
    ]
  },
  {
    icon: '📚', title: 'Wisdom and values',
    questions: [
      'What do you know now that you wish you\'d known earlier?',
      'What matters most in life?',
      'What would you do differently?',
      'What are you at peace with?',
      'What beliefs have guided your life?',
      'What do you want to be remembered for?',
      'What advice would you give to the people you\'re leaving behind?',
      'What has your life meant to you?',
    ]
  },
  {
    icon: '🕯️', title: 'Practical and meaningful',
    questions: [
      'Is there anything you want us to make sure happens?',
      'Is there a story you want to make sure gets told?',
      'Is there anyone you want me to reach out to?',
      'Are there things or objects that are important to you?',
      'What traditions do you hope we keep?',
      'What do you want your funeral or memorial to feel like?',
      'Is there anything left unsaid that you want to say?',
      'What would make you feel at peace?',
    ]
  },
]

const tips = [
  { icon: '📱', title: 'Record on your phone', desc: 'Even a voice memo is precious. Their voice answering these questions is something you\'ll be grateful for forever.' },
  { icon: '⏱️', title: 'Keep it short', desc: 'Don\'t try to cover everything at once. A 20 minute conversation on a good day is worth more than a long session on a difficult one.' },
  { icon: '🤫', title: 'Silence is okay', desc: 'You don\'t need to fill every pause. Some questions need time. Let it come in its own time.' },
  { icon: '✍️', title: 'Write down what you remember afterwards', desc: 'Even if you can\'t record, write down what they said as soon as you can. Memory fades faster than you think.' },
]

useSeo({
  title: 'Questions to Ask a Dying Parent — What to Ask Before It\'s Too Late | Tell Me Your Story',
  description: 'A gentle guide to the questions worth asking a parent who is nearing the end of their life. Capture their stories, wisdom, and voice before it\'s too late.',
  canonical: 'https://tellmeyourstory.uk/questions-to-ask-dying-parent',
})
</script>

<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
</style>
