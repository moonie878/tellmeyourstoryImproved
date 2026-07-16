<template>
  <main class="bg-white">

    <!-- Hero -->
    <section class="bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Legacy Letter to Children</p>
        <h1 class="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          How to write a legacy letter<br>
          <em class="text-[#C4A882] italic">to your children and grandchildren</em>
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#A8A29E]">
          A legacy letter — sometimes called an ethical will — is one of the most meaningful things you can leave behind. Not money or possessions, but wisdom, love, and the story of who you were and what you believed. This guide shows you how to write one.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <router-link to="/register" class="rounded-full bg-[#C4A882] px-7 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Capture your story free →</router-link>
          <router-link to="/example" class="rounded-full border border-white/20 px-7 py-3 text-sm font-medium text-white transition hover:bg-white/10">See an example</router-link>
        </div>
      </div>
    </section>

    <!-- What is a legacy letter -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">What is a legacy letter?</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">An ethical will for the people you love</h2>
        </div>
        <div class="mt-8 text-sm leading-7 text-stone-600 max-w-xl mx-auto space-y-4">
          <p>A legacy letter — also called an ethical will, a values letter, or a letter of instruction — is a personal document that passes on the non-material things that matter: your values, your life lessons, your memories, your hopes for the people you leave behind.</p>
          <p>Unlike a legal will, a legacy letter has no formal requirements. It can be long or short, formal or conversational, written in one sitting or built up over time. What it has to be is honest and specific — the things only you can say, in your own voice.</p>
          <p>The tradition goes back centuries — people have always written letters to pass wisdom and love down through the generations. But it's still relatively uncommon, which is part of what makes it so powerful. Most people receive a will. Almost no one receives a letter from their parents telling them what they believed, what they learned, and what they hope for their children's lives.</p>
          <p>That letter is worth more than almost anything else you could leave.</p>
        </div>
        <div class="mt-6 flex flex-wrap justify-center gap-3">
          <router-link to="/how-to-write-a-life-story" class="text-xs text-[#7C5C3B] underline hover:no-underline">How to write a life story →</router-link>
          <span class="text-xs text-stone-300">·</span>
          <router-link to="/questions-to-ask-elderly-parents" class="text-xs text-[#7C5C3B] underline hover:no-underline">Life story questions →</router-link>
          <span class="text-xs text-stone-300">·</span>
          <router-link to="/keepsake-book" class="text-xs text-[#7C5C3B] underline hover:no-underline">Life story keepsake books →</router-link>
        </div>
      </div>
    </section>

    <!-- What to include -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">What to include</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">What goes in a legacy letter</h2>
          <p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-500">There are no rules. But the most meaningful legacy letters tend to cover some or all of these themes.</p>
        </div>
        <div class="mt-10 grid gap-5 sm:grid-cols-2 md:grid-cols-3">
          <div v-for="theme in themes" :key="theme.title" class="rounded-2xl bg-white p-6">
            <p class="text-2xl">{{ theme.icon }}</p>
            <p class="mt-3 text-sm font-semibold text-stone-900">{{ theme.title }}</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">{{ theme.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- How to write it -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">How to write it</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">How to write a legacy letter — step by step</h2>
        </div>
        <div class="mt-10 space-y-5">
          <div v-for="step in steps" :key="step.number" class="rounded-2xl border border-stone-200 p-6">
            <div class="flex items-start gap-5">
              <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#1C1917] text-sm font-bold text-white">{{ step.number }}</div>
              <div>
                <p class="text-sm font-semibold text-stone-900">{{ step.title }}</p>
                <p class="mt-2 text-xs leading-6 text-stone-500">{{ step.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Prompts -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Writing prompts</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Questions to help you start</h2>
          <p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-500">If you're not sure where to begin, start by answering some of these questions. Your answers are the raw material of your legacy letter.</p>
        </div>
        <div class="mt-10 grid gap-3 sm:grid-cols-2">
          <div v-for="prompt in prompts" :key="prompt" class="rounded-xl bg-white px-4 py-3 text-sm text-stone-700 leading-5">
            {{ prompt }}
          </div>
        </div>
        <div class="mt-8 text-center">
          <p class="text-sm text-stone-500 mb-4">Want all 100 questions — covering every chapter of your life?</p>
          <router-link to="/register" class="inline-block rounded-full bg-[#7C5C3B] px-7 py-3 text-sm font-semibold text-white transition hover:opacity-90">Start answering free →</router-link>
        </div>
      </div>
    </section>

    <!-- Example excerpts -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">What it looks like</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Legacy letter examples</h2>
          <p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-500">These excerpts show the kind of writing that makes a legacy letter feel real — specific, honest, and unmistakably the person who wrote it.</p>
        </div>
        <div class="mt-10 space-y-5">
          <div v-for="example in examples" :key="example.theme" class="rounded-2xl bg-[#F5F0E8] p-6">
            <p class="text-xs font-semibold uppercase tracking-wider text-[#9C7C5C] mb-3">{{ example.theme }}</p>
            <p class="font-display text-base italic leading-7 text-stone-700">"{{ example.text }}"</p>
          </div>
        </div>
      </div>
    </section>

    <!-- TMYS connection -->
    <section class="bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">The fuller picture</p>
        <h2 class="mt-3 font-display text-2xl font-bold text-white sm:text-3xl">A legacy letter is just the beginning</h2>
        <p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#A8A29E]">A legacy letter captures your values and wisdom. A full life story captures everything — your childhood, your early life, your loves, your hardest times, your proudest moments, and the things you want your family to know. Tell Me Your Story guides you through 100 questions and turns your answers into a beautifully printed keepsake book your family will keep forever.</p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <router-link to="/register" class="rounded-full bg-[#C4A882] px-7 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Start your story free →</router-link>
          <router-link to="/example" class="rounded-full border border-white/20 px-7 py-3 text-sm font-medium text-white transition hover:bg-white/10">See an example</router-link>
        </div>
        <p class="mt-5 text-xs text-[#9C7C5C]">Free to start · No subscription · Printed book from £21.99</p>
      </div>
    </section>

    <!-- FAQ -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">FAQ</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Common questions</h2>
        </div>
        <div class="mt-10 space-y-4">
          <div v-for="faq in faqs" :key="faq.q" class="rounded-2xl border border-stone-200 p-6">
            <p class="text-sm font-semibold text-stone-900">{{ faq.q }}</p>
            <p class="mt-2 text-xs leading-6 text-stone-500">{{ faq.a }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Related -->
    <section class="bg-[#F5F0E8] px-5 py-12 sm:px-8">
      <div class="mx-auto max-w-3xl">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C] mb-6">Related reading</p>
        <div class="grid gap-4 sm:grid-cols-3">
          <router-link to="/how-to-write-a-life-story" class="rounded-2xl border border-stone-200 bg-white p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">How to Write a Life Story</p>
            <p class="mt-1 text-xs text-stone-500">A complete step-by-step guide</p>
          </router-link>
          <router-link to="/keepsake-book" class="rounded-2xl border border-stone-200 bg-white p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Life Story Keepsake Book</p>
            <p class="mt-1 text-xs text-stone-500">Turn a life story into a printed keepsake</p>
          </router-link>
          <router-link to="/questions-to-ask-elderly-parents" class="rounded-2xl border border-stone-200 bg-white p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Life Story Questions</p>
            <p class="mt-1 text-xs text-stone-500">100 questions to start the process</p>
          </router-link>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-[#1C1917] px-5 py-16 text-center sm:px-8 sm:py-20">
      <h2 class="font-display text-2xl font-bold text-white sm:text-3xl">Your story is worth telling</h2>
      <p class="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#A8A29E]">Start capturing it today — free, in your own words, at your own pace. A legacy worth keeping.</p>
      <router-link to="/register" class="mt-8 inline-block rounded-full bg-[#C4A882] px-8 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Start your story free →</router-link>
      <p class="mt-4 text-xs text-[#9C7C5C]">Free to start · One-time payment · Printed book from £34.98</p>
    </section>

  </main>
</template>

<script setup lang="ts">
import { useSeo } from '../composables/useSeo'

const themes = [
  { icon: '💛', title: 'Your love for them', desc: 'Tell them, specifically, what they have meant to you. Not in general terms — in specific ones. The moments you remember. The things that made you proud.' },
  { icon: '🌱', title: 'Your values', desc: 'What you believe about how to live. What you\'ve learned about what matters and what doesn\'t. What you hope they\'ll carry forward.' },
  { icon: '📚', title: 'Your life lessons', desc: 'The things you know now that you wish you\'d known earlier. The lessons that came the hard way. What you\'d tell your younger self.' },
  { icon: '🌟', title: 'What you\'re proud of', desc: 'Not just achievements — but the choices you made, the person you tried to be, the things you got right.' },
  { icon: '🤍', title: 'Your hopes for them', desc: 'What you wish for them. Not prescriptions — hopes. The life you hope they\'ll have, the people you hope they\'ll become.' },
  { icon: '😄', title: 'Your stories', desc: 'Specific memories. Funny ones. Surprising ones. The ones that show who you really were beneath the role of parent or grandparent.' },
  { icon: '💼', title: 'Your history', desc: 'Where you came from. What shaped you before they knew you. The parts of your life they might never have asked about.' },
  { icon: '🕯️', title: 'Anything left unsaid', desc: 'Apologies. Explanations. Things you always meant to say but never quite did. A legacy letter is the place to say them.' },
  { icon: '📖', title: 'Your definition of a good life', desc: 'What you believe makes a life meaningful. What you think was worth it. What you\'d choose again.' },
]

const steps = [
  { number: '1', title: 'Decide who it\'s for', desc: 'A legacy letter can be addressed to your children collectively, to each child individually, to grandchildren, or to all of them at once. Individual letters — tailored to each person — tend to be the most meaningful, because they say: I saw you specifically. But a single letter to the whole family is still a profound gift.' },
  { number: '2', title: 'Start with what you want them to know', desc: 'Not what you want to say — what you want them to know. There\'s a difference. The goal is for them to feel something when they read it: known, loved, guided. Start by writing down three things you most want each person to understand about you, about life, or about how you feel about them.' },
  { number: '3', title: 'Write in your own voice', desc: 'Don\'t try to write beautifully. Write honestly. The most moving legacy letters aren\'t the most eloquent — they\'re the most specific and most real. Use the words you actually use. Tell the stories you actually tell. Let it sound like you.' },
  { number: '4', title: 'Be specific', desc: '"I love you" matters. "I love the way you always [specific thing]" matters more. Specificity is what transforms a nice letter into something someone will read a hundred times. Name the moments. Name the qualities. Name the things they do that you\'ve never told them you noticed.' },
  { number: '5', title: 'Don\'t wait until you\'re dying', desc: 'Many people think of a legacy letter as something to write at the end of life. But it\'s more powerful — and more useful — written now. It can be updated and added to over the years. And it\'s easier to write honestly about your life when you\'re living it than when you\'re leaving it.' },
  { number: '6', title: 'Decide how to share it', desc: 'Some people give their legacy letter to their children now and discuss it together. Others leave it with their will. Others share it gradually — a copy at a significant birthday, another at a wedding. There\'s no wrong answer. What matters is that it exists and that it reaches the people it was written for.' },
]

const prompts = [
  'What do you most want your children to know about you?',
  'What values have guided your life that you want to pass on?',
  'What do you know now that you wish you\'d known at 25?',
  'What is your proudest moment as a parent?',
  'What mistakes do you hope they\'ll avoid?',
  'What do you believe about happiness?',
  'What has love taught you?',
  'What was the hardest thing you ever did — and what did it teach you?',
  'What advice would you give them about work?',
  'What advice would you give them about relationships?',
  'What are you most grateful for in your life?',
  'What do you hope they\'ll remember about you?',
  'Is there anything you\'ve never said that you want to say now?',
  'What does being a good person mean to you?',
  'What do you hope for their future?',
  'What family traditions do you hope they\'ll keep?',
  'What is something about yourself they might not know?',
  'What would you do differently if you could?',
  'What risks were worth taking?',
  'If your life were a letter — what would it say?',
]

const examples = [
  {
    theme: 'On what matters',
    text: 'I spent a lot of my thirties worried about things that turned out not to matter much. The career. The house. What people thought. What I\'ve learned — slowly, and not always willingly — is that it\'s the ordinary days that count. Who\'s at your table. Whether you were kind. Whether you paid attention. The rest is furniture.'
  },
  {
    theme: 'On love',
    text: 'I wasn\'t always good at showing you how much I loved you. I\'m not sure I knew how, some of the time. But I want you to know that watching you become yourself has been one of the great privileges of my life. I am proud of you in ways I\'ve probably never found the right words for. Consider this the attempt.'
  },
  {
    theme: 'On mistakes',
    text: 'There are things I would do differently. Times I was impatient when I should have been still. Times I was quiet when I should have spoken. I hope you can forgive those gaps — I was doing my best with what I had, as everyone is, all the time. I hope knowing that makes it easier.'
  },
  {
    theme: 'On what you hope for them',
    text: 'I don\'t hope you\'ll be successful — though I think you will be. I hope you\'ll be kind. I hope you\'ll find work that feels like yours. I hope you\'ll have people around you who know you properly. I hope you\'ll be as happy in your ordinary days as I have been in mine.'
  },
]

const faqs = [
  { q: 'What is a legacy letter?', a: 'A legacy letter — also called an ethical will or values letter — is a personal document that passes on the non-material things that matter: your values, your life lessons, your love for the people you\'re writing to, and your hopes for their future. Unlike a legal will, it has no formal requirements and can be written in any form.' },
  { q: 'What is the difference between a legacy letter and an ethical will?', a: 'They\'re the same thing, described differently. An ethical will is the traditional term, from a long historical tradition of passing on values rather than assets. A legacy letter is a more modern and accessible way of describing the same document.' },
  { q: 'How long should a legacy letter be?', a: 'There\'s no right length. Some of the most powerful legacy letters are a single page. Others run to many pages. What matters is that it\'s honest and specific — not how long it is. Write as much as you have to say and no more.' },
  { q: 'When should you write a legacy letter?', a: 'Now. Don\'t wait until you\'re facing illness or the end of your life. A legacy letter is more useful and more honest when written from the middle of a life — and it can be updated and added to over the years. Many people find writing one clarifies what they actually believe and value.' },
  { q: 'Should I give my legacy letter to my children now or leave it with my will?', a: 'Both approaches work. Sharing it now opens a conversation and lets you discuss it together — which can be deeply meaningful. Leaving it with your will means they receive it at the moment it may mean most. Some people do both: share a version now and leave a fuller or updated version for later.' },
  { q: 'Can Tell Me Your Story help me write a legacy letter?', a: 'Yes. Tell Me Your Story\'s 100 guided questions cover every chapter of life — including values, lessons, hopes, and what you want to pass on. The answers become a beautifully printed keepsake book that works as a comprehensive legacy letter and life story combined.' },
]

useSeo({
  title: 'How to Write a Legacy Letter to Your Children — Guide & Examples | Tell Me Your Story',
  description: 'A legacy letter passes on the things a will can\'t — your values, your wisdom, your love, and your hopes. A complete guide to writing one, with prompts, examples, and step-by-step advice.',
  canonical: 'https://tellmeyourstory.uk/legacy-letter-to-children',
  schema: {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'What is a legacy letter?', acceptedAnswer: { '@type': 'Answer', text: 'A legacy letter is a personal document that passes on the non-material things that matter: your values, your life lessons, your love, and your hopes for the future. Unlike a legal will, it has no formal requirements.' } },
          { '@type': 'Question', name: 'What is the difference between a legacy letter and an ethical will?', acceptedAnswer: { '@type': 'Answer', text: 'They\'re the same thing described differently. An ethical will is the traditional term. A legacy letter is a more modern and accessible description of the same document.' } },
          { '@type': 'Question', name: 'How long should a legacy letter be?', acceptedAnswer: { '@type': 'Answer', text: 'There\'s no right length. Some of the most powerful legacy letters are a single page. What matters is that it\'s honest and specific — not how long it is.' } },
          { '@type': 'Question', name: 'When should you write a legacy letter?', acceptedAnswer: { '@type': 'Answer', text: 'Now. Don\'t wait until you\'re facing the end of your life. A legacy letter is more useful and more honest when written from the middle of a life — and it can be updated over the years.' } },
          { '@type': 'Question', name: 'Should I give my legacy letter to my children now or leave it with my will?', acceptedAnswer: { '@type': 'Answer', text: 'Both approaches work. Sharing it now opens a conversation. Leaving it with your will means they receive it when it may mean most. Some people do both.' } },
        ]
      }
    ]
  }
})
</script>

<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
</style>