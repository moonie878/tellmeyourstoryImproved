<template>
  <main class="bg-white">

    <!-- Hero -->
    <section class="bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">How to Write a Life Story</p>
        <h1 class="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          How to write a life story<br>
          <em class="text-[#C4A882] italic">that will be treasured forever</em>
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#A8A29E]">
          A complete guide to capturing a loved one's life story — from the very first question to a beautifully finished keepsake book. Whether you're starting from scratch or looking for a simpler way, this is everything you need.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <router-link to="/register" class="rounded-full bg-[#C4A882] px-7 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Start a life story free →</router-link>
          <router-link to="/example" class="rounded-full border border-white/20 px-7 py-3 text-sm font-medium text-white transition hover:bg-white/10">See an example</router-link>
        </div>
      </div>
    </section>

    <!-- Overview -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Where to start</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">The hardest part is starting</h2>
        </div>
        <div class="mt-8 text-sm leading-7 text-stone-600 max-w-xl mx-auto space-y-4">
          <p>Most families know they should capture their parents' or grandparents' life story — but they never quite get around to it. The blank page feels overwhelming. Where do you even begin? What questions do you ask? How do you get someone to actually open up?</p>
          <p>This guide covers everything you need to know — whether you're starting from scratch with a notebook, using a recording device, or using a platform like Tell Me Your Story that does the heavy lifting for you.</p>
          <p>One thing to understand upfront: you don't need to capture everything. A life story doesn't have to be comprehensive to be valuable. Even a handful of vivid, honest answers to the right questions can produce something a family will treasure for generations.</p>
          <p>The key is to start. However imperfect, however incomplete — start today. The conversations you have now are the ones you'll be grateful for later.</p>
        </div>
        <div class="mt-6 flex flex-wrap justify-center gap-3">
          <router-link to="/life-story-questions" class="text-xs text-[#7C5C3B] underline hover:no-underline">150 life story questions to get started →</router-link>
          <span class="text-xs text-stone-300">·</span>
          <router-link to="/life-story-interview-questions" class="text-xs text-[#7C5C3B] underline hover:no-underline">How to run a life story interview →</router-link>
          <span class="text-xs text-stone-300">·</span>
          <router-link to="/questions-to-ask-elderly-parents" class="text-xs text-[#7C5C3B] underline hover:no-underline">Questions to ask elderly parents →</router-link>
          <span class="text-xs text-stone-300">·</span>
          <router-link to="/legacy-letter-to-children" class="text-xs text-[#7C5C3B] underline hover:no-underline">How to write a legacy letter →</router-link>
          <span class="text-xs text-stone-300">·</span>
          <router-link to="/reminiscence-therapy-life-story" class="text-xs text-[#7C5C3B] underline hover:no-underline">Reminiscence therapy →</router-link>
        </div>
      </div>
    </section>

    <!-- Steps -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Step by step</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">How to write a life story — 7 steps</h2>
        </div>
        <div class="mt-10 space-y-5">
          <div v-for="step in steps" :key="step.number" class="rounded-2xl bg-white p-6">
            <div class="flex items-start gap-5">
              <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#1C1917] text-sm font-bold text-white">{{ step.number }}</div>
              <div>
                <p class="text-sm font-semibold text-stone-900">{{ step.title }}</p>
                <p class="mt-2 text-xs leading-6 text-stone-500">{{ step.desc }}</p>
                <p v-if="step.detail" class="mt-2 text-xs leading-6 text-stone-400 italic">{{ step.detail }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- What to include -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">What to include</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Chapters to cover in a life story</h2>
          <p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-500">A life story works best when it follows the natural arc of a life. You don't need to cover every chapter — start with the ones they're most comfortable talking about.</p>
        </div>
        <div class="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          <div v-for="chapter in chapters" :key="chapter.title" class="rounded-2xl border border-stone-200 p-5">
            <p class="text-xl">{{ chapter.icon }}</p>
            <p class="mt-3 text-sm font-semibold text-stone-900">{{ chapter.title }}</p>
            <p class="mt-1 text-xs leading-5 text-stone-500">{{ chapter.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Common mistakes -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">What to avoid</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Common mistakes when writing a life story</h2>
        </div>
        <div class="mt-10 space-y-4">
          <div v-for="mistake in mistakes" :key="mistake.title" class="rounded-2xl bg-white p-5">
            <div class="flex items-start gap-4">
              <span class="text-xl flex-shrink-0">{{ mistake.icon }}</span>
              <div>
                <p class="text-sm font-semibold text-stone-900">{{ mistake.title }}</p>
                <p class="mt-1 text-xs leading-5 text-stone-500">{{ mistake.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Tips -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Tips from experience</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">What works — and what doesn't</h2>
        </div>
        <div class="mt-10 space-y-4">
          <div v-for="tip in tips" :key="tip.title" class="rounded-2xl border border-stone-200 p-5">
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

    <!-- The easy way -->
    <section class="bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">The easier way</p>
        <h2 class="mt-3 font-display text-2xl font-bold text-white sm:text-3xl">Let us do the heavy lifting</h2>
        <p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#A8A29E]">Tell Me Your Story takes care of everything in this guide automatically. The questions are already written across 10 chapters of life. The structure is already designed. They just answer — by typing or speaking — and we turn it into a beautifully printed keepsake book with QR codes that play their voice recordings.</p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <router-link to="/register" class="rounded-full bg-[#C4A882] px-7 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Start a life story free →</router-link>
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
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Common questions about writing a life story</h2>
        </div>
        <div class="mt-10 space-y-4">
          <div v-for="faq in faqs" :key="faq.q" class="rounded-2xl border border-stone-200 p-6">
            <p class="text-sm font-semibold text-stone-900">{{ faq.q }}</p>
            <p class="mt-2 text-xs leading-6 text-stone-500">{{ faq.a }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Related pages -->
    <section class="bg-[#F5F0E8] px-5 py-12 sm:px-8">
      <div class="mx-auto max-w-3xl">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C] mb-6">Related reading</p>
        <div class="grid gap-4 sm:grid-cols-3">
          <router-link to="/life-story-questions" class="rounded-2xl border border-stone-200 bg-white p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">150 Life Story Questions</p>
            <p class="mt-1 text-xs text-stone-500">The questions that unlock real stories</p>
          </router-link>
          <router-link to="/life-story-interview-questions" class="rounded-2xl border border-stone-200 bg-white p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Life Story Interview Questions</p>
            <p class="mt-1 text-xs text-stone-500">How to run a proper life story interview</p>
          </router-link>
          <router-link to="/keepsake-book" class="rounded-2xl border border-stone-200 bg-white p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Keepsake Book</p>
            <p class="mt-1 text-xs text-stone-500">Turn a life story into a printed keepsake</p>
          </router-link>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-[#1C1917] px-5 py-16 text-center sm:px-8 sm:py-20">
      <h2 class="font-display text-2xl font-bold text-white sm:text-3xl">Their story won't write itself</h2>
      <p class="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#A8A29E]">Free to start, no commitment. Begin capturing their life story today.</p>
      <router-link to="/register" class="mt-8 inline-block rounded-full bg-[#C4A882] px-8 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Start a life story free →</router-link>
      <p class="mt-4 text-xs text-[#9C7C5C]">Free to start · One-time payment · Printed book from £21.99</p>
    </section>

  </main>
</template>

<script setup lang="ts">
import { useSeo } from '../composables/useSeo'

const steps = [
  {
    number: '1',
    title: 'Decide on your format',
    desc: 'Written answers, recorded interviews, or a guided platform — each has its place. Written answers give more time to reflect and work well for people who prefer to work through things in their own time. Recordings capture tone and personality that text alone can\'t reproduce — the accent, the laugh, the rhythm of how they tell a story. A guided platform like Tell Me Your Story combines both, with structured questions, built-in voice recording, and automatic saving.',
    detail: 'Most families find a guided platform the easiest route — because the hardest part of writing a life story is knowing what to ask.',
  },
  {
    number: '2',
    title: 'Choose your chapters',
    desc: 'A life story works best when it follows the natural arc of a life — childhood, teenage years, work, love, family, hard times, proudest moments, and legacy. You don\'t need to cover every chapter at once. Start with the one they\'re most comfortable talking about — often childhood, which tends to produce the most vivid and detailed memories.',
    detail: 'Don\'t start at the beginning if it feels forced. Start where the energy is.',
  },
  {
    number: '3',
    title: 'Write or gather your questions',
    desc: 'The best questions are open-ended and specific. "What was your childhood like?" gets a short answer. "What is your earliest memory?" gets a story. "What did your childhood home smell like?" gets an even better one. Aim for questions that can\'t be answered with yes or no — questions that require them to retrieve a specific moment rather than give a general description.',
    detail: 'Our guide to life story questions has 150 examples across every chapter of life.',
  },
  {
    number: '4',
    title: 'Create the right environment',
    desc: 'Side-by-side works better than face-to-face — it\'s less like an interview and more like a conversation. A walk, a car journey, a quiet cup of tea at the kitchen table. Older people often open up more naturally when they\'re relaxed, occupied with something else, and there\'s no pressure to perform. Avoid formal settings, clipboards, and anything that feels like an interrogation.',
    detail: 'If they seem reluctant, start with something lighter — a funny memory, a favourite meal, a song they loved.',
  },
  {
    number: '5',
    title: 'Record if you can',
    desc: 'Ask permission to record on your phone. Most people say yes once they understand it\'s just for the family. Their voice — the accent, the pauses, the way they laugh at their own stories — is worth more than any transcript. Even a low-quality recording made on a phone captures something that written words simply can\'t. If they\'re comfortable, Tell Me Your Story\'s built-in voice recording saves directly to their keepsake book.',
    detail: 'Voice recordings become more precious over time. Start recording sooner than you think you need to.',
  },
  {
    number: '6',
    title: 'Edit lightly',
    desc: 'Resist the urge to polish everything. The things that make their answers feel authentic — the digressions, the repetitions, the specific phrases they use, the moments where they trail off and then come back to something — are exactly what makes a life story feel real rather than written. You\'re not creating literature. You\'re preserving a person.',
    detail: 'Correct obvious errors but keep their voice. If they always said "anyroad" instead of "anyway" — keep it.',
  },
  {
    number: '7',
    title: 'Turn it into a keepsake',
    desc: 'A life story that exists only in a notebook or phone recording is at risk — phones break, notebooks get lost. Export it to a PDF, print it as a book, or use Tell Me Your Story to generate a professionally designed keepsake automatically. A physical printed book is the gold standard — something that can be shared, displayed, and passed down to grandchildren who won\'t know what a phone app is.',
    detail: 'Printed books from Tell Me Your Story start at £21.99 including UK delivery.',
  },
]

const chapters = [
  { icon: '🌱', title: 'Childhood & origins',    desc: 'Where they grew up, their earliest memories, their parents and siblings, and the world they were born into.' },
  { icon: '🎒', title: 'School & teenage years', desc: 'Friends, teachers, first loves, the music they loved, and the moments that shaped who they became.' },
  { icon: '💼', title: 'Work & career',          desc: 'Their working life, proudest achievements, best bosses, and what work taught them about themselves.' },
  { icon: '❤️', title: 'Love & relationships',  desc: 'How they met their partner, what drew them together, their marriage, and what they\'ve learned about love.' },
  { icon: '👨‍👩‍👧', title: 'Family life',       desc: 'Becoming a parent, raising children, family traditions, and the memories made at home.' },
  { icon: '💪', title: 'Hard times',            desc: 'Struggles, losses, difficult choices, and how they got through the hardest seasons of their life.' },
  { icon: '🌟', title: 'Proudest moments',      desc: 'The achievements, surprises, and the things they\'re most proud of — big and small.' },
  { icon: '🤍', title: 'Legacy & wisdom',       desc: 'What they want to pass on, how they want to be remembered, and what they\'d tell their younger self.' },
  { icon: '😄', title: 'Favourite things',      desc: 'The small details — foods, places, films, songs, smells — that make a life complete and specific.' },
]

const mistakes = [
  { icon: '❌', title: 'Asking too many questions at once', desc: 'Presenting a list of questions feels like an interview and produces short, surface-level answers. Ask one question and follow where it leads. The best stories always surface in the tangents.' },
  { icon: '❌', title: 'Starting at the beginning', desc: 'You don\'t have to start with childhood. Start where the energy is — wherever they seem most animated or willing. You can fill in the gaps later.' },
  { icon: '❌', title: 'Over-editing their voice', desc: 'The instinct to make their answers sound better is understandable but damaging. Their specific phrases, their particular way of telling a story — that\'s exactly what you\'re trying to preserve.' },
  { icon: '❌', title: 'Trying to capture everything in one sitting', desc: 'Life stories are built over time. One good question in a car journey, one story over tea, one memory triggered by an old photo. Spread it out and the story will be richer for it.' },
  { icon: '❌', title: 'Leaving it in digital form only', desc: 'A life story on a phone or laptop is fragile. Print it, or export it to a permanent format. The families who regret capturing a life story are the ones who captured it but didn\'t preserve it.' },
]

const tips = [
  { icon: '🎯', title: 'One question at a time', desc: 'Don\'t present a list of questions. Ask one and follow where it leads. The best stories always surface in the tangents and digressions — the things they weren\'t planning to say.' },
  { icon: '🤐', title: 'Let silence sit', desc: 'Don\'t rush to fill pauses. Older people sometimes take longer to retrieve memories. The silence is usually worth waiting through. Some of the best answers come after the longest pauses.' },
  { icon: '🔄', title: 'Come back to it', desc: 'You don\'t need to capture everything in one sitting. Some memories surface days after a conversation started. Keep a note of anything they mention wanting to return to and follow it up on your next visit.' },
  { icon: '📸', title: 'Use photos as prompts', desc: 'Old photos are powerful triggers for memories. Show them a photo from their past and ask what was happening, who the people are, what they remember about that day. The stories that follow are often the most vivid.' },
  { icon: '🎭', title: 'Follow the emotion', desc: 'When someone gets animated, leans forward, or laughs — that\'s where the real story is. Follow that energy rather than the structure of your question list. You can always come back.' },
  { icon: '✍️', title: 'Edit lightly', desc: 'Keep their voice intact. Don\'t over-polish. The things that feel imperfect — the digressions, the specific phrases they always use — are often what makes a life story feel most real and most like them.' },
]

const faqs = [
  { q: 'How do you write a life story?', a: 'Start with good questions — specific, open-ended ones that can\'t be answered with yes or no. Create a relaxed environment rather than a formal interview setting. Record if you can. Edit lightly to preserve their voice. Then turn it into something permanent — a PDF, a printed book, or a platform like Tell Me Your Story that handles the structure and design automatically.' },
  { q: 'How long does it take to write a life story?', a: 'It depends on how much you want to capture. A single sitting of a few hours can produce something meaningful. Most families find it works best spread over several sessions — a few questions at a time, returned to over weeks or months. Everything saves automatically with Tell Me Your Story, so there\'s no pressure to do it all at once.' },
  { q: 'Where do you start when writing a life story?', a: 'Start wherever the energy is. Childhood memories tend to be the most vivid and the easiest to access, so they\'re often a good starting point. But if they\'re more animated about their working life or a particular story, start there. You can always fill in the other chapters later.' },
  { q: 'What questions do you ask when writing a life story?', a: 'The best questions are specific and open-ended. "What is your earliest memory?" works better than "What was your childhood like?" "What did your home smell like?" unlocks more than "Where did you grow up?" Our guide to life story questions has 150 examples across every chapter of life.' },
  { q: 'How do you write someone else\'s life story?', a: 'Through conversation, primarily. Sit with them, ask questions, and let them lead. Record if they\'re comfortable with it. Write down what you remember afterwards. A guided platform like Tell Me Your Story makes it easier — the questions are already written, and they can answer by speaking rather than typing.' },
  { q: 'What should a life story include?', a: 'Childhood and origins, school years, work and career, love and relationships, family life, hard times, proudest moments, and legacy. You don\'t need to cover everything — even a handful of vivid answers across a few chapters creates something meaningful. The voice matters more than the comprehensiveness.' },
]

useSeo({
  title: 'How to Write a Life Story — Complete Step-by-Step Guide (2026) | Tell Me Your Story',
  description: 'A complete guide to capturing a loved one\'s life story — what questions to ask, how to create the right environment, common mistakes to avoid, and how to turn it into a keepsake. Free to start.',
  canonical: 'https://tellmeyourstory.uk/how-to-write-a-life-story',
  schema: {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'How do you write a life story?', acceptedAnswer: { '@type': 'Answer', text: 'Start with good questions — specific, open-ended ones that can\'t be answered with yes or no. Create a relaxed environment. Record if you can. Edit lightly to preserve their voice. Then turn it into something permanent — a PDF, a printed book, or a platform like Tell Me Your Story.' } },
          { '@type': 'Question', name: 'How long does it take to write a life story?', acceptedAnswer: { '@type': 'Answer', text: 'It depends on how much you want to capture. A single sitting of a few hours can produce something meaningful. Most families find it works best spread over several sessions — a few questions at a time, returned to over weeks or months.' } },
          { '@type': 'Question', name: 'Where do you start when writing a life story?', acceptedAnswer: { '@type': 'Answer', text: 'Start wherever the energy is. Childhood memories tend to be the most vivid and easiest to access. But if they\'re more animated about their working life or a particular story, start there.' } },
          { '@type': 'Question', name: 'What should a life story include?', acceptedAnswer: { '@type': 'Answer', text: 'Childhood and origins, school years, work and career, love and relationships, family life, hard times, proudest moments, and legacy. You don\'t need to cover everything — even a handful of vivid answers creates something meaningful.' } },
        ]
      },
      {
        '@type': 'HowTo',
        name: 'How to Write a Life Story',
        description: 'A step-by-step guide to capturing a loved one\'s life story and turning it into a keepsake.',
        step: [
          { '@type': 'HowToStep', name: 'Decide on your format', text: 'Choose between written answers, recorded interviews, or a guided platform.' },
          { '@type': 'HowToStep', name: 'Choose your chapters', text: 'Select the chapters of life to cover — childhood, work, love, family, legacy.' },
          { '@type': 'HowToStep', name: 'Gather your questions', text: 'Write open-ended, specific questions that can\'t be answered with yes or no.' },
          { '@type': 'HowToStep', name: 'Create the right environment', text: 'Choose a relaxed setting — side-by-side, not face-to-face.' },
          { '@type': 'HowToStep', name: 'Record if you can', text: 'Ask permission to record on your phone — their voice is irreplaceable.' },
          { '@type': 'HowToStep', name: 'Edit lightly', text: 'Preserve their voice. Don\'t over-polish.' },
          { '@type': 'HowToStep', name: 'Turn it into a keepsake', text: 'Export to PDF or order a printed book that can be shared and kept forever.' },
        ]
      }
    ]
  }
})
</script>

<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
</style>