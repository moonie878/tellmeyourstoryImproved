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
          A complete guide to capturing a loved one's life story — from the first question to a beautifully finished keepsake book.
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
        <div class="mt-8 text-sm leading-7 text-stone-600 max-w-xl mx-auto">
          <p>Most families know they should capture their parents' or grandparents' life story — but they never quite get around to it. The blank page feels overwhelming. Where do you even begin? What questions do you ask? How do you get someone to actually open up?</p>
          <p class="mt-4">This guide covers everything you need to know — whether you're starting from scratch with a notebook, using a recording device, or using a platform like Tell Me Your Story that does the heavy lifting for you.</p>
        </div>
        <div class="mt-6 flex flex-wrap justify-center gap-3">
          <router-link to="/life-story-questions" class="text-xs text-[#7C5C3B] underline hover:no-underline">150 life story questions to get started →</router-link>
          <span class="text-xs text-stone-300">·</span>
          <router-link to="/life-story-interview-questions" class="text-xs text-[#7C5C3B] underline hover:no-underline">How to run a life story interview →</router-link>
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
        <div class="mt-10 space-y-6">
          <div v-for="step in steps" :key="step.number" class="rounded-2xl bg-white p-6">
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

    <!-- What to include -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">What to include</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Chapters to cover in a life story</h2>
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

    <!-- Tips -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Tips from experience</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">What works — and what doesn't</h2>
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

    <!-- The easy way -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">The easier way</p>
        <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Let us do the heavy lifting</h2>
        <p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-500">Tell Me Your Story takes care of everything in this guide automatically. The questions are already written. The structure is already designed. They just answer — and we turn it into a beautifully printed keepsake book.</p>
        <router-link to="/register" class="mt-8 inline-block rounded-full bg-[#7C5C3B] px-8 py-3 text-sm font-semibold text-white transition hover:opacity-90">Start a life story free →</router-link>
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
          <router-link to="/life-story-questions" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">150 Life Story Questions</p>
            <p class="mt-1 text-xs text-stone-500">The questions that unlock real stories</p>
          </router-link>
          <router-link to="/life-story-interview-questions" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Life Story Interview Questions</p>
            <p class="mt-1 text-xs text-stone-500">How to run a proper life story interview</p>
          </router-link>
          <router-link to="/keepsake-book" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Keepsake Book</p>
            <p class="mt-1 text-xs text-stone-500">Turn a life story into a printed keepsake</p>
          </router-link>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-[#1C1917] px-5 py-16 text-center sm:px-8 sm:py-20">
      <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Start today</p>
      <h2 class="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">Their story won't write itself</h2>
      <p class="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#A8A29E]">Free to start, no commitment. Begin capturing their life story today.</p>
      <router-link to="/register" class="mt-8 inline-block rounded-full bg-[#C4A882] px-8 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Start a life story free →</router-link>
      <p class="mt-4 text-xs text-[#9C7C5C]">Free to start · One-time payment · Printed book from £34.98</p>
    </section>

  </main>
</template>

<script setup lang="ts">
import { useSeo } from '../composables/useSeo'

const steps = [
  { number: '1', title: 'Decide on the format', desc: 'Written answers, recorded interviews, or a guided platform. Each has pros and cons. Written answers give more time to reflect. Recordings capture tone and personality. A guided platform like Tell Me Your Story combines both — written or spoken answers, structured questions, automatic saving.' },
  { number: '2', title: 'Choose your chapters', desc: 'A life story works best when it follows the natural arc of a life — childhood, teenage years, work, love, family, challenges, and legacy. Don\'t try to cover everything at once. Start with the chapter they\'re most comfortable talking about.' },
  { number: '3', title: 'Write or gather the questions', desc: 'The best questions are open-ended and specific. "What was your childhood like?" gets a short answer. "What is your earliest memory?" gets a story. Aim for questions that can\'t be answered with yes or no.' },
  { number: '4', title: 'Create the right environment', desc: 'Side-by-side works better than face-to-face. A walk, a car journey, a quiet cup of tea. Older people often open up more naturally when they\'re relaxed and there\'s no pressure to perform.' },
  { number: '5', title: 'Record if you can', desc: 'Ask permission to record on your phone. Their voice — the accent, the pauses, the laugh — is worth more than any transcript. Even a low-quality recording captures something that written words can\'t.' },
  { number: '6', title: 'Edit lightly', desc: 'Resist the urge to polish everything. The things that make their answers feel authentic — the digressions, the repetitions, the specific phrases they use — are exactly what makes a life story feel real.' },
  { number: '7', title: 'Turn it into a keepsake', desc: 'A life story that exists only in a notebook or phone recording is at risk. Export it to a PDF, print it as a book, or use Tell Me Your Story to generate a professionally designed keepsake automatically.' },
]

const chapters = [
  { icon: '🌱', title: 'Childhood & origins',    desc: 'Where they grew up, their earliest memories, and the world they were born into.' },
  { icon: '🎒', title: 'School & teenage years', desc: 'Friends, teachers, first loves, and the moments that shaped them.' },
  { icon: '💼', title: 'Work & career',          desc: 'Their working life, proudest achievements, and what they learned.' },
  { icon: '❤️', title: 'Love & relationships',  desc: 'How they met their partner, their marriage, and the people who mattered most.' },
  { icon: '👨‍👩‍👧', title: 'Family life',       desc: 'Raising children, family traditions, and the memories made at home.' },
  { icon: '💪', title: 'Hard times',            desc: 'Struggles, losses, and how they got through the difficult times.' },
  { icon: '🌟', title: 'Proudest moments',      desc: 'The achievements, surprises, and the things they\'re most proud of.' },
  { icon: '🤍', title: 'Legacy & wisdom',       desc: 'What they want to pass on and how they want to be remembered.' },
  { icon: '😄', title: 'Favourite things',      desc: 'The small details — foods, places, films, songs — that make a life complete.' },
]

const tips = [
  { icon: '🎯', title: 'One question at a time', desc: 'Don\'t present a list of questions. Ask one and follow where it leads. The best stories always surface in the tangents.' },
  { icon: '🤐', title: 'Let silence sit', desc: 'Don\'t rush to fill pauses. Older people sometimes take longer to retrieve memories. The silence is usually worth waiting through.' },
  { icon: '🔄', title: 'Come back to it', desc: 'You don\'t need to capture everything in one sitting. Some memories surface days after a conversation started. Return to it over time.' },
  { icon: '📸', title: 'Use photos as prompts', desc: 'Old photos are powerful triggers for memories. Show them a photo from their past and ask what was happening at the time.' },
  { icon: '🎭', title: 'Follow the emotion', desc: 'When someone gets animated, leans forward, or laughs — that\'s where the story is. Follow that energy, not the structure.' },
  { icon: '✍️', title: 'Edit lightly', desc: 'Keep their voice intact. Don\'t over-polish. The things that feel imperfect are often what makes a life story feel most real.' },
]

useSeo({
  title: 'How to Write a Life Story — A Complete Guide | Tell Me Your Story',
  description: 'A complete guide to capturing a loved one\'s life story — from the first question to a beautifully finished keepsake book. Tips, chapters to cover, and what actually works.',
  canonical: 'https://tellmeyourstory.uk/how-to-write-a-life-story',
})
</script>

<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
</style>