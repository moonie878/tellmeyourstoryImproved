<template>
  <main class="bg-white">

    <!-- Hero -->
    <section class="bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">How to Record Your Grandparent's Story</p>
        <h1 class="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          How to record your<br>
          <em class="text-[#C4A882] italic">grandparent's life story</em>
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#A8A29E]">
          Your grandparents have lived through things you'll never experience — wars, rationing, the birth of television, the internet, and everything in between. This guide shows you how to capture their stories before it's too late, with or without specialist equipment.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <router-link to="/register" class="rounded-full bg-[#C4A882] px-7 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Start capturing their story free →</router-link>
          <router-link to="/example" class="rounded-full border border-white/20 px-7 py-3 text-sm font-medium text-white transition hover:bg-white/10">See an example</router-link>
        </div>
      </div>
    </section>

    <!-- Why now -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Why it matters</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">The window is smaller than you think</h2>
        </div>
        <div class="mt-8 text-sm leading-7 text-stone-600 max-w-xl mx-auto space-y-4">
          <p>Most people intend to record their grandparents' stories. Very few actually do. The reasons are familiar — there's always more time, they'll do it at Christmas, they don't know where to start, or they worry it'll feel awkward.</p>
          <p>But the window is smaller than it feels. Memory fades. Health declines. And the stories that seem like they'll always be there — the ones your grandparents tell at every family gathering — can disappear with terrifying speed.</p>
          <p>The good news is that recording a grandparent's story doesn't require specialist equipment, a professional interviewer, or even a lot of time. A phone, the right questions, and a willingness to sit and listen is enough to capture something your family will treasure for generations.</p>
          <p>This guide covers everything you need — from the equipment to use, to the questions to ask, to how to turn what you capture into something permanent.</p>
        </div>
        <div class="mt-6 flex flex-wrap justify-center gap-3">
          <router-link to="/questions-to-ask-your-grandma" class="text-xs text-[#7C5C3B] underline hover:no-underline">Questions to ask your grandma →</router-link>
          <span class="text-xs text-stone-300">·</span>
          <router-link to="/questions-to-ask-your-grandad" class="text-xs text-[#7C5C3B] underline hover:no-underline">Questions to ask your grandad →</router-link>
          <span class="text-xs text-stone-300">·</span>
          <router-link to="/oral-history-questions" class="text-xs text-[#7C5C3B] underline hover:no-underline">100 oral history questions →</router-link>
        </div>
      </div>
    </section>

    <!-- Equipment options -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">What to use</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Recording equipment — from free to professional</h2>
          <p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-500">You don't need expensive equipment. What matters is that you record at all. Here are your options from simplest to most comprehensive.</p>
        </div>
        <div class="mt-10 grid gap-5 sm:grid-cols-2 md:grid-cols-3">
          <div v-for="option in equipment" :key="option.title" class="rounded-2xl bg-white p-6">
            <p class="text-2xl">{{ option.icon }}</p>
            <p class="mt-3 text-sm font-semibold text-stone-900">{{ option.title }}</p>
            <p class="mt-1 text-xs text-[#9C7C5C] font-medium">{{ option.cost }}</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">{{ option.desc }}</p>
            <p v-if="option.best" class="mt-2 text-xs text-[#7C5C3B] font-medium">Best for: {{ option.best }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Step by step -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Step by step</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">How to record your grandparent's story</h2>
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

    <!-- What to ask -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">What to ask</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">The best questions to ask your grandparents</h2>
          <p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-500">These questions are designed to draw out stories rather than facts. Start with whichever one feels most natural.</p>
        </div>
        <div class="mt-10 grid gap-3 sm:grid-cols-2">
          <div v-for="q in questions" :key="q" class="rounded-xl bg-white px-4 py-3 text-sm text-stone-700 leading-5">{{ q }}</div>
        </div>
        <div class="mt-8 text-center">
          <router-link to="/oral-history-questions" class="text-sm text-[#7C5C3B] underline hover:no-underline">See all 100 oral history questions →</router-link>
        </div>
      </div>
    </section>

    <!-- What to do with it -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">What to do with what you capture</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Don't let it live only on your phone</h2>
        </div>
        <div class="mt-8 text-sm leading-7 text-stone-600 max-w-xl mx-auto space-y-4">
          <p>A recording on your phone is precious — but it's fragile. Phones get lost, broken, or replaced. Files get accidentally deleted. Storage formats become obsolete. A recording that exists only on one device is one accident away from being lost forever.</p>
          <p>The most important thing you can do after recording is create a permanent copy in a format that will still be accessible in thirty years. There are several ways to do this:</p>
        </div>
        <div class="mt-8 space-y-4">
          <div v-for="option in preserveOptions" :key="option.title" class="rounded-2xl border border-stone-200 p-5">
            <div class="flex items-start gap-4">
              <span class="text-xl flex-shrink-0">{{ option.icon }}</span>
              <div>
                <p class="text-sm font-semibold text-stone-900">{{ option.title }}</p>
                <p class="mt-1 text-xs leading-5 text-stone-500">{{ option.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- TMYS -->
    <section class="bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">The all-in-one approach</p>
        <h2 class="mt-3 font-display text-2xl font-bold text-white sm:text-3xl">Record, preserve, and print in one place</h2>
        <p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#A8A29E]">Tell Me Your Story guides your grandparent through 100 questions — by typing or speaking — saves their voice recordings automatically, and turns everything into a beautifully printed keepsake book with QR codes that play their voice. Free to start.</p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <router-link to="/register" class="rounded-full bg-[#C4A882] px-7 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Start capturing their story free →</router-link>
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
          <router-link to="/oral-history-questions" class="rounded-2xl border border-stone-200 bg-white p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">100 Oral History Questions</p>
            <p class="mt-1 text-xs text-stone-500">Questions to capture their full story</p>
          </router-link>
          <router-link to="/questions-about-family-history" class="rounded-2xl border border-stone-200 bg-white p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Family History Questions</p>
            <p class="mt-1 text-xs text-stone-500">Questions about ancestry and heritage</p>
          </router-link>
          <router-link to="/keepsake-book" class="rounded-2xl border border-stone-200 bg-white p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Keepsake Book</p>
            <p class="mt-1 text-xs text-stone-500">Turn their story into a printed keepsake</p>
          </router-link>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-[#1C1917] px-5 py-16 text-center sm:px-8 sm:py-20">
      <h2 class="font-display text-2xl font-bold text-white sm:text-3xl">Start before it's too late</h2>
      <p class="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#A8A29E]">Free to start, no commitment. Begin capturing your grandparent's story today.</p>
      <router-link to="/register" class="mt-8 inline-block rounded-full bg-[#C4A882] px-8 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Start capturing their story free →</router-link>
      <p class="mt-4 text-xs text-[#9C7C5C]">Free to start · One-time payment · Printed book from £21.99</p>
    </section>

  </main>
</template>

<script setup lang="ts">
import { useSeo } from '../composables/useSeo'

const equipment = [
  { icon: '📱', title: 'Smartphone voice memo', cost: 'Free', desc: 'The built-in voice memo app on any smartphone records perfectly good quality audio for family use. Place the phone between you on the table. Use a quiet room with soft furnishings to reduce echo.', best: 'Getting started quickly' },
  { icon: '🎙️', title: 'Dedicated voice recorder', cost: '£30–£80', desc: 'A small digital voice recorder produces better quality audio than most phones, with longer battery life and more storage. Brands like Olympus and Sony make reliable entry-level models.', best: 'Better audio quality' },
  { icon: '📝', title: 'Recording + transcription app', cost: 'Free–£10/month', desc: 'Apps like Otter.ai or Rev record and automatically transcribe conversations. Useful if you want a written record as well as audio. Accuracy is good but not perfect — always keep the original recording.', best: 'Written transcript too' },
  { icon: '🎥', title: 'Video on a phone or tablet', cost: 'Free', desc: 'Video captures body language, expressions, and the visual context of the conversation. Prop the phone up at head height. Check the lighting — face a window rather than sitting with one behind you.', best: 'Capturing personality' },
  { icon: '💻', title: 'Tell Me Your Story', cost: 'Free to start', desc: 'Guides them through 100 questions, saves voice recordings automatically, and produces a beautifully designed keepsake book with QR codes that play their voice. The most structured and permanent option.', best: 'Everything in one place' },
  { icon: '✍️', title: 'Written notes', cost: 'Free', desc: 'If they\'re uncomfortable being recorded, take notes and write them up immediately afterwards. Less complete than a recording but better than nothing. Ask them to review and correct your summary.', best: 'When recording isn\'t possible' },
]

const steps = [
  { number: '1', title: 'Ask permission and explain why', desc: 'Tell them what you\'re doing and why — that you want to preserve their stories for the family. Most grandparents are touched to be asked. Some are surprised anyone wants to know. Let them know recordings will only be shared within the family.' },
  { number: '2', title: 'Choose the right setting', desc: 'A quiet room with no background noise. Somewhere they feel comfortable and relaxed — their own home is usually best. A kitchen table over a cup of tea often produces better conversations than a more formal setup. Avoid busy times of day when they might be tired.' },
  { number: '3', title: 'Set up your recording', desc: 'Test the recording before you start. Place the device between you rather than on one side. Check the battery and storage. If using a phone, put it on do not disturb mode to avoid interruptions.' },
  { number: '4', title: 'Start with something easy', desc: 'Don\'t open with the heavy questions. Start with something light and sensory — a favourite memory, a funny story, the house they grew up in. Once they\'re talking, they naturally move into deeper territory.' },
  { number: '5', title: 'Ask one question at a time', desc: 'Don\'t pepper them with questions. Ask one and follow where it leads. The best stories always surface in the tangents. Your job is to ask and listen, not to cover a checklist.' },
  { number: '6', title: 'Don\'t correct or interrupt', desc: 'If they remember something differently from how it happened, go with their version. Correcting people mid-story closes the conversation down. And emotional truth often matters more than factual accuracy in family history.' },
  { number: '7', title: 'Keep sessions short', desc: 'Thirty to sixty minutes is usually enough. Come back over multiple sessions rather than trying to get everything in one go. Some memories surface days after the session that triggered them.' },
  { number: '8', title: 'Back up immediately', desc: 'As soon as you get home, copy the recording to a second location — cloud storage, a laptop, or an external drive. Don\'t rely on one device. Stories that took a lifetime to live shouldn\'t be lost to a dead battery.' },
]

const questions = [
  'What\'s your earliest memory?',
  'What did your childhood home look and smell like?',
  'Who were you closest to growing up?',
  'What games did you play as a child?',
  'What was school like for you?',
  'What did you do for fun before television?',
  'What was the first job you ever had?',
  'How did you meet your partner?',
  'What was rationing like? (if applicable)',
  'What do you remember about major historical events?',
  'What was the hardest thing you\'ve ever been through?',
  'What achievement are you most proud of?',
  'What do you wish you\'d done differently?',
  'What do you want your grandchildren to know about you?',
  'What advice would you give about life?',
  'What would you do again exactly as you did it?',
  'Is there a story you\'ve always wanted to tell?',
  'What made you laugh more than anything?',
  'What does your life mean to you, looking back?',
  'Is there anything you\'ve never said that you\'d like to say now?',
]

const preserveOptions = [
  { icon: '☁️', title: 'Cloud backup', desc: 'Upload recordings to Google Drive, iCloud, or Dropbox immediately. This protects against device loss or damage and makes files accessible to other family members.' },
  { icon: '💿', title: 'External hard drive or USB', desc: 'Keep a physical copy on an external drive stored somewhere safe. Technology changes — include a brief note explaining what format the files are in and how to play them.' },
  { icon: '✍️', title: 'Transcription', desc: 'Create a written transcript of the key parts. Not a word-for-word record necessarily, but a narrative version of what they said. This is more readable and searchable than audio alone.' },
  { icon: '📚', title: 'Printed keepsake book', desc: 'The most permanent option. A printed book doesn\'t require electricity, software, or internet access to read. Tell Me Your Story turns voice recordings into a beautifully printed book with QR codes — the best of both worlds.' },
  { icon: '📤', title: 'Share with family', desc: 'Send copies of key recordings to other family members now. Don\'t wait until the story is "finished." The more people who have a copy, the less likely it is to be lost.' },
]

const faqs = [
  { q: 'How do I get my grandparent to open up about their life?', a: 'Start with something light and sensory rather than a direct question about their life. "What did your childhood home smell like?" works better than "Tell me about your childhood." Use old photographs as conversation starters. Be genuinely curious rather than conducting an interview — people open up to curiosity, not questionnaires.' },
  { q: 'What is the best way to record a grandparent\'s story?', a: 'A smartphone voice memo is enough for family use. Place it between you in a quiet room. Apps like Otter.ai add automatic transcription. Video adds visual context. Tell Me Your Story provides the most structured approach — guided questions, built-in recording, and automatic keepsake book production.' },
  { q: 'What questions should I ask my grandparents?', a: 'Start with childhood memories, daily life in their era, the people who shaped them, the hardest things they\'ve been through, their proudest moments, and what they want the family to know. Our guide to oral history questions has 100 examples across every chapter of life.' },
  { q: 'How do I preserve my grandparent\'s story?', a: 'Back up recordings to at least two locations immediately. Transcribe the key parts. Create a physical copy — either a printed book or a USB drive stored with important documents. Share copies with other family members so the story isn\'t dependent on any one person or device.' },
  { q: 'What if my grandparent doesn\'t want to be recorded?', a: 'Respect their wishes completely. Take written notes during the conversation and write them up as soon as possible afterwards. Ask them to review and correct your summary. Even an imperfect written record is valuable.' },
]

useSeo({
  title: 'How to Record Your Grandparent\'s Life Story — A Complete Guide | Tell Me Your Story',
  description: 'A practical guide to recording your grandparent\'s life story — what equipment to use, questions to ask, how to get them talking, and how to turn what you capture into something permanent.',
  canonical: 'https://tellmeyourstory.uk/how-to-record-grandparents-story',
  schema: {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'How do I get my grandparent to open up about their life?', acceptedAnswer: { '@type': 'Answer', text: 'Start with something light and sensory. "What did your childhood home smell like?" works better than "Tell me about your childhood." Use old photographs as conversation starters.' } },
          { '@type': 'Question', name: 'What is the best way to record a grandparent\'s story?', acceptedAnswer: { '@type': 'Answer', text: 'A smartphone voice memo is enough for family use. Place it between you in a quiet room. Tell Me Your Story provides the most structured approach — guided questions, built-in recording, and automatic keepsake book production.' } },
          { '@type': 'Question', name: 'How do I preserve my grandparent\'s story?', acceptedAnswer: { '@type': 'Answer', text: 'Back up recordings to at least two locations immediately. Create a physical copy — either a printed book or stored USB. Share copies with other family members.' } },
        ]
      },
      {
        '@type': 'HowTo',
        name: 'How to Record Your Grandparent\'s Life Story',
        step: [
          { '@type': 'HowToStep', name: 'Ask permission', text: 'Tell them what you\'re doing and why — that you want to preserve their stories for the family.' },
          { '@type': 'HowToStep', name: 'Choose the right setting', text: 'A quiet room in their own home, over a cup of tea. Avoid busy or noisy environments.' },
          { '@type': 'HowToStep', name: 'Set up your recording', text: 'Test the recording before you start. Place the device between you.' },
          { '@type': 'HowToStep', name: 'Start with something easy', text: 'Begin with a favourite memory or funny story before moving to deeper questions.' },
          { '@type': 'HowToStep', name: 'Ask one question at a time', text: 'Follow where each answer leads rather than working through a checklist.' },
          { '@type': 'HowToStep', name: 'Back up immediately', text: 'Copy the recording to a second location as soon as you get home.' },
        ]
      }
    ]
  }
})
</script>

<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
</style>