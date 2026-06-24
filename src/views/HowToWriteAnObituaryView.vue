<template>
  <main class="bg-white">

    <!-- Hero -->
    <section class="bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Writing an Obituary</p>
        <h1 class="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          How to write an obituary<br>
          <em class="text-[#C4A882] italic">that actually sounds like them</em>
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#A8A29E]">
          A simple, step-by-step guide to writing a meaningful obituary — and an easier way to do it, if you've already started capturing their story.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <router-link to="/register" class="rounded-full bg-[#C4A882] px-7 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Start their story free →</router-link>
          <router-link to="/tribute" class="rounded-full border border-white/20 px-7 py-3 text-sm font-medium text-white transition hover:bg-white/10">Create a tribute video</router-link>
        </div>
      </div>
    </section>

    <!-- Intro -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Where to start</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">An obituary tells the story of a life — that's it</h2>
        </div>
        <div class="mt-8 text-sm leading-7 text-stone-600 max-w-xl mx-auto space-y-4">
          <p>An obituary doesn't need to be formal or impersonal. At its simplest, it's a short account of who someone was — their background, what they did, who they loved, and what made them, them. There's no legal requirement to have one, but it gives family, friends, and the wider community a way to learn about the death and remember the person properly.</p>
          <p>The hardest part is usually starting. Staring at a blank page and trying to sum up an entire life in a few paragraphs, often while grieving, is genuinely difficult — which is exactly why having even a rough set of answers about someone's life already written down makes the whole process far easier.</p>
        </div>
      </div>
    </section>

    <!-- Steps -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center mb-10">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Step by step</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">How to write it</h2>
        </div>
        <div class="space-y-4">
          <div v-for="(step, i) in steps" :key="step.title" class="rounded-2xl bg-white p-6 flex items-start gap-4">
            <span class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#1C1917] text-xs font-bold text-white">{{ i + 1 }}</span>
            <div>
              <p class="text-sm font-semibold text-stone-900">{{ step.title }}</p>
              <p class="mt-2 text-xs leading-6 text-stone-500">{{ step.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- What to include -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center mb-10">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">What to include</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">The pieces that make up a good obituary</h2>
        </div>
        <div class="grid gap-5 sm:grid-cols-2">
          <div v-for="section in includeSections" :key="section.title" class="rounded-2xl bg-[#F5F0E8] p-6">
            <p class="text-lg mb-1">{{ section.icon }}</p>
            <p class="text-sm font-semibold text-stone-900 mb-2">{{ section.title }}</p>
            <p class="text-xs leading-5 text-stone-500">{{ section.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- The TMYS angle -->
    <section class="bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">If you've already started</p>
        <h2 class="mt-3 font-display text-2xl font-bold text-white sm:text-3xl">You may have already written most of it</h2>
        <p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#A8A29E]">If you or your loved one used Tell Me Your Story to capture their life — childhood, career, family, the moments that mattered — that's almost everything an obituary needs, already in their own words. Their answers to questions about their work, their relationships, and their proudest moments can be lifted almost directly into an obituary, rather than written from scratch under pressure.</p>
        <div class="mt-8 grid gap-5 sm:grid-cols-2">
          <div class="rounded-2xl bg-white/5 border border-white/10 p-6 text-left">
            <p class="text-sm font-semibold text-white">Already have their story captured?</p>
            <p class="mt-2 text-xs leading-6 text-[#A8A29E]">Go back through their answers about career, family, and proudest moments — much of an obituary is already there, in their own voice.</p>
          </div>
          <div class="rounded-2xl bg-white/5 border border-white/10 p-6 text-left">
            <p class="text-sm font-semibold text-white">Starting from nothing?</p>
            <p class="mt-2 text-xs leading-6 text-[#A8A29E]">Tell Me Your Story's guided questions can help you gather the details you need, even after someone has passed, by talking to family who knew them well.</p>
          </div>
        </div>
        <router-link to="/register" class="mt-8 inline-block rounded-full bg-[#C4A882] px-8 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">
          Start free →
        </router-link>
      </div>
    </section>

    <!-- Tribute video link -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Beyond the written word</p>
        <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Some tributes are better told in pictures and music</h2>
        <p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-500">An obituary works well in print and online, but for a service, a wake, or sharing with family further afield, a tribute video can say things words alone can't. Upload photos and video clips, add music, and create something to play at the service or share with those who couldn't be there.</p>
        <router-link to="/tribute" class="mt-8 inline-block rounded-full bg-[#7C5C3B] px-8 py-3 text-sm font-semibold text-white transition hover:opacity-90">
          Create a tribute video →
        </router-link>
        <p class="mt-3 text-xs text-stone-400">Free to preview · £19.99 to download</p>
      </div>
    </section>

    <!-- FAQ -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">FAQ</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Common questions</h2>
        </div>
        <div class="mt-10 space-y-4">
          <div v-for="faq in faqs" :key="faq.q" class="rounded-2xl bg-white p-6">
            <p class="text-sm font-semibold text-stone-900">{{ faq.q }}</p>
            <p class="mt-2 text-xs leading-6 text-stone-500">{{ faq.a }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Related -->
    <section class="px-5 py-12 sm:px-8">
      <div class="mx-auto max-w-3xl">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C] mb-6">Related reading</p>
        <div class="grid gap-4 sm:grid-cols-3">
          <router-link to="/tribute" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Tribute Video</p>
            <p class="mt-1 text-xs text-stone-500">Create a memorial video with photos and music</p>
          </router-link>
          <router-link to="/end-of-life-questions-to-ask-parents" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">End of Life Questions</p>
            <p class="mt-1 text-xs text-stone-500">The practical conversations worth having</p>
          </router-link>
          <router-link to="/bereavement-gift-ideas" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Bereavement Gift Ideas</p>
            <p class="mt-1 text-xs text-stone-500">Thoughtful gifts for someone who's grieving</p>
          </router-link>
        </div>
      </div>
    </section>

  </main>
</template>

<script setup lang="ts">
import { useSeo } from '../composables/useSeo'

const steps = [
  { title: 'Gather the basic facts', desc: 'Full name (including any well-known nickname), date of birth, date and place of death, and where they lived. These anchor the obituary and help people confirm who it\'s about.' },
  { title: 'List the people closest to them', desc: 'Spouse or partner, children, grandchildren, siblings — and if you wish, those who predeceased them. There\'s no obligation to list everyone, just whoever feels right to include.' },
  { title: 'Write a short, warm account of their life', desc: 'Career, education, hobbies, achievements, and the things they cared about. This is the heart of the obituary — focus on what made them who they were, not just a list of dates.' },
  { title: 'Add a personal detail or two', desc: 'A favourite saying, a habit everyone knew them for, the thing they always talked about. Small, specific details are often what people remember most.' },
  { title: 'Include funeral or service details, if relevant', desc: 'Date, time, location, and whether flowers or donations are preferred. Always check with the family before including sensitive details like cause of death.' },
  { title: 'Decide where to publish it', desc: 'A local or national newspaper, an online memorial platform, or simply shared with family and friends directly. Newspapers often charge by the word, so word count may shape how much detail you include.' },
]

const includeSections = [
  { icon: '📋', title: 'The basics', desc: 'Full name, age, date of death, and where they lived.' },
  { icon: '👨‍👩‍👧', title: 'Family', desc: 'Spouse, children, grandchildren, siblings — survived by and, if you wish, predeceased by.' },
  { icon: '💼', title: 'Life and work', desc: 'Career, education, military service, community involvement.' },
  { icon: '🎨', title: 'Personality and passions', desc: 'Hobbies, what they loved, what they were known for.' },
  { icon: '🕊️', title: 'Service details', desc: 'Date, time, and location of the funeral or memorial, if you want this included.' },
  { icon: '🌷', title: 'Flowers or donations', desc: 'Whether the family prefers flowers, or donations to a charity that mattered to them.' },
]

const faqs = [
  { q: 'What is the difference between an obituary and a death notice?', a: 'A death notice is short and factual — name, date of death, and funeral details. An obituary is longer and more personal, telling the story of someone\'s life, their background, achievements, and character.' },
  { q: 'How long should an obituary be?', a: 'It depends where it\'s published. Newspapers often charge by the word and have space limits, so a few short paragraphs is typical. Online memorial platforms usually allow much more length if you want to include more detail.' },
  { q: 'Do I need to include the cause of death?', a: 'No, there\'s no obligation to. If you do choose to include it, it\'s worth checking with close family first, as not everyone is comfortable sharing this publicly.' },
  { q: 'Can I use someone\'s own words in their obituary?', a: 'Yes, and it often makes for the most meaningful obituaries. If they shared stories about their life, career, or family beforehand — through a project like Tell Me Your Story, a letter, or a recorded conversation — quoting or drawing on their own words can make the obituary feel genuinely like them.' },
]

useSeo({
  title: 'How to Write an Obituary — A Simple Step-by-Step Guide',
  description: 'A clear guide to writing a meaningful obituary — what to include, how long it should be, and an easier way to do it if you\'ve already captured their life story.',
  canonical: 'https://tellmeyourstory.uk/how-to-write-an-obituary',
  schema: {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'What is the difference between an obituary and a death notice?', acceptedAnswer: { '@type': 'Answer', text: 'A death notice is short and factual. An obituary is longer and more personal, telling the story of someone\'s life.' } },
          { '@type': 'Question', name: 'How long should an obituary be?', acceptedAnswer: { '@type': 'Answer', text: 'It depends where it is published. Newspapers often have space limits, while online platforms usually allow more length.' } },
          { '@type': 'Question', name: 'Can I use someone\'s own words in their obituary?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. If their life story or memories were captured beforehand, drawing on their own words can make the obituary feel genuinely like them.' } },
        ]
      }
    ]
  }
})
</script>

<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
</style>