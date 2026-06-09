<template>
  <main class="bg-white">

    <!-- Hero -->
    <section class="bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">How to Capture Your Parents' Life Story</p>
        <h1 class="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          How to capture your parents'<br>
          <em class="text-[#C4A882] italic">life story before it's too late</em>
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#A8A29E]">
          A practical guide to recording your parents' life story — the questions to ask, the tools to use, and how to turn their answers into something the whole family will treasure.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <router-link to="/register" class="rounded-full bg-[#C4A882] px-7 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Start capturing free →</router-link>
          <router-link to="/example" class="rounded-full border border-white/20 px-7 py-3 text-sm font-medium text-white transition hover:bg-white/10">See an example</router-link>
        </div>
      </div>
    </section>

    <!-- Why now -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Why this matters</p>
        <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Most families leave it too late</h2>
        <p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-500">Most of us assume we'll get around to asking the important questions eventually. But life gets busy, and parents get older. The stories that seemed like they'd always be there quietly disappear — along with the person who held them.</p>
        <p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-500">The families who captured their parents' stories — even imperfectly, even partially — never regret it. The families who didn't almost always do.</p>
      </div>
    </section>

    <!-- Methods -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Four ways to do it</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">How to capture a life story — your options</h2>
        </div>
        <div class="mt-10 space-y-5">
          <div v-for="method in methods" :key="method.title" class="rounded-2xl bg-white p-6">
            <div class="flex items-start gap-4">
              <span class="text-2xl flex-shrink-0">{{ method.icon }}</span>
              <div class="flex-1">
                <div class="flex items-center gap-3 flex-wrap">
                  <p class="text-sm font-semibold text-stone-900">{{ method.title }}</p>
                  <span class="text-xs px-2 py-0.5 rounded-full" :class="method.tagClass">{{ method.tag }}</span>
                </div>
                <p class="mt-2 text-xs leading-5 text-stone-500">{{ method.desc }}</p>
                <div class="mt-3 flex gap-4 flex-wrap">
                  <span class="text-xs text-green-600">✓ {{ method.pro }}</span>
                  <span class="text-xs text-red-500">✗ {{ method.con }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Step by step -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Step by step</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">How to get started today</h2>
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

    <!-- Tips -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">What actually works</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Tips for getting parents to open up</h2>
        </div>
        <div class="mt-10 space-y-4">
          <div v-for="tip in tips" :key="tip.title" class="rounded-2xl border border-stone-200 bg-white p-5">
            <div class="flex items-start gap-4">
              <span class="text-xl flex-shrink-0">{{ tip.icon }}</span>
              <div>
                <p class="text-sm font-semibold text-stone-900">{{ tip.title }}</p>
                <p class="mt-1 text-xs leading-5 text-stone-500">{{ tip.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Quote -->
    <section class="px-5 py-16 sm:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <p class="font-display text-xl italic leading-relaxed text-stone-700 sm:text-2xl">"He told me about a motorbike he saved up for two years to buy. I never knew that about him."</p>
        <p class="mt-4 text-sm text-[#9C7C5C]">— From a Tell Me Your Story keepsake</p>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-[#1C1917] px-5 py-16 text-center sm:px-8 sm:py-20">
      <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">The easiest way to start</p>
      <h2 class="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">100 questions already written for you</h2>
      <p class="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#A8A29E]">Tell Me Your Story guides your parent through every chapter of their life — free to start, with a beautifully printed keepsake book when they're done.</p>
      <router-link to="/register" class="mt-8 inline-block rounded-full bg-[#C4A882] px-8 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Start capturing their story free →</router-link>
      <p class="mt-4 text-xs text-[#9C7C5C]">Free to start · One-time payment · Printed book from £34.98</p>
    </section>

  </main>
</template>

<script setup lang="ts">
import { useSeo } from '../composables/useSeo'

const methods = [
  { icon: '📱', title: 'Use a guided platform', tag: 'Easiest', tagClass: 'bg-green-100 text-green-700', desc: 'Platforms like Tell Me Your Story have the questions already written, save everything automatically, and turn answers into a finished book. No preparation needed — just start.', pro: 'No blank page, automatic saving, printed book included', con: 'Requires internet access' },
  { icon: '🎙️', title: 'Record audio interviews', tag: 'Personal', tagClass: 'bg-blue-100 text-blue-700', desc: 'Sit down with your parent, a list of questions, and record on your phone. You then have the raw audio — but you\'ll need to transcribe, edit, and format it yourself.', pro: 'Captures their voice naturally', con: 'Significant time needed to process recordings' },
  { icon: '📝', title: 'Written questionnaire', tag: 'Simple', tagClass: 'bg-amber-100 text-amber-700', desc: 'Send a list of questions by letter or email and ask them to write the answers. Works well for parents who prefer to write and take their time.', pro: 'They can answer at their own pace', con: 'Many parents won\'t complete it without encouragement' },
  { icon: '🎥', title: 'Video interview', tag: 'Memorable', tagClass: 'bg-purple-100 text-purple-700', desc: 'Film a conversation on your phone or camera. The most personal format — you get their expressions, mannerisms, and voice. Requires editing to be shareable.', pro: 'Captures personality and emotion', con: 'Technical barrier and needs editing to be usable' },
]

const steps = [
  { number: '1', title: 'Pick your format', desc: 'A guided platform, a recorded interview, a written questionnaire, or a combination. The best format is the one you\'ll actually start.' },
  { number: '2', title: 'Prepare a handful of questions', desc: 'Don\'t try to cover everything at once. Start with five or six questions across different parts of their life. Save the rest for follow-up sessions.' },
  { number: '3', title: 'Choose the right moment', desc: 'A relaxed car journey, a walk, or a quiet cup of tea works better than a formal sit-down. Side-by-side conversation is less confronting than face-to-face.' },
  { number: '4', title: 'Record if you can', desc: 'Ask permission to record on your phone. Their voice telling the story is worth more than any transcript — the accent, the pauses, the laugh.' },
  { number: '5', title: 'Save and preserve', desc: 'Don\'t let the answers live only on your phone. Export to a PDF, print a book, or use Tell Me Your Story to generate a professionally designed keepsake automatically.' },
]

const tips = [
  { icon: '🎯', title: 'Start with one question', desc: 'Don\'t present a list. Just ask one question and follow where it leads. "What is your earliest memory?" can unlock hours of stories.' },
  { icon: '🤐', title: 'Let the silence sit', desc: 'Don\'t rush to fill pauses. Older parents sometimes take a moment to retrieve memories. The silence is usually worth waiting through.' },
  { icon: '📸', title: 'Use old photos as prompts', desc: 'Show them a photo from their past and ask what was happening. Old photos are powerful triggers for stories they\'d forgotten they had.' },
  { icon: '🔄', title: 'Come back to it', desc: 'You don\'t need to capture everything in one sitting. Some memories surface days after a conversation started. Return to it over time.' },
  { icon: '🎭', title: 'Follow the tangents', desc: 'When they get animated or laugh — that\'s where the story is. Follow that energy rather than sticking rigidly to your question list.' },
]

useSeo({
  title: 'How to Capture Your Parents\' Life Story Before It\'s Too Late | Tell Me Your Story',
  description: 'A practical guide to recording your parents\' life story — the questions to ask, the tools to use, and how to turn their answers into a keepsake book. Free to start.',
  canonical: 'https://tellmeyourstory.uk/how-to-capture-parents-life-story',
})
</script>

<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
</style>