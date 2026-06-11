<template>
  <main class="bg-white">

    <!-- Hero -->
    <section class="bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Questions to Ask Your Grandad</p>
        <h1 class="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          100 questions to ask your grandad<br>
          <em class="text-[#C4A882] italic">before it's too late</em>
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#A8A29E]">
          Your grandad has lived through things you'll never fully know. These 100 questions help you draw out the stories, the memories, and the wisdom he's carried his whole life.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <router-link to="/register" class="rounded-full bg-[#C4A882] px-7 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">
            Capture his story free →
          </router-link>
          <router-link to="/example" class="rounded-full border border-white/20 px-7 py-3 text-sm font-medium text-white transition hover:bg-white/10">
            See an example
          </router-link>
        </div>
      </div>
    </section>

    <!-- Why ask -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Why these questions matter</p>
        <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Grandads rarely volunteer their stories</h2>
        <p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-500">
          Most grandads are from a generation that didn't talk about themselves much. They got on with things. They didn't complain. And they certainly didn't sit around telling stories about their feelings. But ask the right question at the right moment — and something extraordinary happens.
        </p>
        <p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-500">
          The stories are in there. They just need to be asked for.
        </p>
        <div class="mx-auto mt-6 max-w-xl flex flex-wrap justify-center gap-3">
          <router-link to="/questions-to-ask-elderly-parents" class="text-xs text-[#7C5C3B] underline hover:no-underline">100 questions to ask elderly parents →</router-link>
          <span class="text-xs text-stone-300">·</span>
          <router-link to="/fathers-day-gift-for-grandad" class="text-xs text-[#7C5C3B] underline hover:no-underline">Father's Day gift for Grandad →</router-link>
        </div>
      </div>
    </section>

    <!-- Questions -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="text-center mb-12">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">100 questions</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Questions to ask your grandad about his life</h2>
        </div>
        <div v-for="chapter in chapters" :key="chapter.title" class="mb-10">
          <h3 class="font-display text-lg font-bold text-stone-900 mb-4 flex items-center gap-2">
            <span>{{ chapter.icon }}</span>
            <span>{{ chapter.title }}</span>
          </h3>
          <div class="grid gap-3 sm:grid-cols-2">
            <div v-for="q in chapter.questions" :key="q" class="rounded-2xl bg-white p-4 text-sm text-stone-700 leading-5">{{ q }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Tips -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">How to ask</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Getting grandad to open up</h2>
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

    <!-- Quote -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <p class="font-display text-xl italic leading-relaxed text-stone-700 sm:text-2xl">
          "He told me about a motorbike he saved up for two years to buy. I never knew that about him."
        </p>
        <p class="mt-4 text-sm text-[#9C7C5C]">— From a Tell Me Your Story keepsake</p>
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
    <section class="px-5 py-12 sm:px-8">
      <div class="mx-auto max-w-3xl">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C] mb-6">Related reading</p>
        <div class="grid gap-4 sm:grid-cols-3">
          <router-link to="/questions-to-ask-elderly-parents" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Questions to Ask Elderly Parents</p>
            <p class="mt-1 text-xs text-stone-500">100 questions for parents and grandparents</p>
          </router-link>
          <router-link to="/fathers-day-gift-for-grandad" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Father's Day Gift for Grandad</p>
            <p class="mt-1 text-xs text-stone-500">The gift he'll never forget</p>
          </router-link>
          <router-link to="/how-to-capture-parents-life-story" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">How to Capture a Life Story</p>
            <p class="mt-1 text-xs text-stone-500">A practical step-by-step guide</p>
          </router-link>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-[#1C1917] px-5 py-16 text-center sm:px-8 sm:py-20">
      <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Don't wait</p>
      <h2 class="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">Capture his story before it's lost</h2>
      <p class="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#A8A29E]">
        Tell Me Your Story guides your grandad through 100 questions and turns his answers into a beautiful keepsake book — in his own words, with his own voice.
      </p>
      <router-link to="/register" class="mt-8 inline-block rounded-full bg-[#C4A882] px-8 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">
        Start free today →
      </router-link>
      <p class="mt-4 text-xs text-[#9C7C5C]">Free to start · One-time payment · Printed book from £34.98</p>
    </section>

  </main>
</template>

<script setup lang="ts">
import { useSeo } from '../composables/useSeo'

const chapters = [
  {
    icon: '🌱', title: 'Childhood & growing up',
    questions: [
      'Where were you born and what was it like?', 'What is your earliest memory?',
      'What was your childhood home like?', 'What did your parents do for work?',
      'Did you have brothers and sisters?', 'What did you get up to as a boy?',
      'What was school like for you?', 'Who was your best friend growing up?',
      'What world events do you remember from your childhood?', 'What did you want to be when you grew up?',
    ],
  },
  {
    icon: '💼', title: 'Work & career',
    questions: [
      'What was your first job?', 'What did you spend most of your working life doing?',
      'What was the hardest job you ever had?', 'What work are you most proud of?',
      'Did you ever have a boss who really influenced you?', 'What did your job involve day to day?',
      'Did you ever work away from home?', 'What did you learn from your working life?',
      'Was there a job you always wanted but never had?', 'How did the world of work change over your lifetime?',
    ],
  },
  {
    icon: '⚽', title: 'Hobbies & passions',
    questions: [
      'What did you do in your spare time when you were young?', 'Did you play any sports?',
      'What music did you love?', 'Did you have any hobbies that surprised people?',
      'What were your favourite films or TV shows?', 'Did you ever build or make anything you were proud of?',
      'What sport or team did you follow?', 'Did you ever win anything?',
      'What did you do to relax?', 'Is there something you were really good at that nobody knew about?',
    ],
  },
  {
    icon: '❤️', title: 'Love & family',
    questions: [
      'How did you meet Grandma?', 'What was it like when you first fell in love?',
      'What do you think makes a marriage last?', 'What was it like becoming a dad for the first time?',
      'What are your proudest moments as a father?', 'What do you most want your grandchildren to know about you?',
      'What family traditions matter most to you?', 'What was a typical Sunday like when the kids were young?',
      'Is there anything you wish you had said to someone you loved?', 'What does family mean to you?',
    ],
  },
  {
    icon: '🌍', title: 'Adventures & experiences',
    questions: [
      'What is the most adventurous thing you ever did?', 'Where is the furthest you ever travelled?',
      'Did you ever do something that surprised even yourself?', 'What is the most beautiful place you ever saw?',
      'Is there anywhere you always wanted to go but never did?', 'Did you ever live somewhere unexpected?',
      'What is the most spontaneous thing you ever did?', 'What experience changed the way you see the world?',
      'Did you ever serve in the military or know people who did?', 'What is your most treasured memory from outside home?',
    ],
  },
  {
    icon: '💪', title: 'Hard times & resilience',
    questions: [
      'What is the hardest thing you have ever been through?', 'How did you get through the toughest times?',
      'Was there a time when everything seemed to fall apart?', 'What gave you strength when things were hard?',
      'Have you ever felt truly lost?', 'What has grief taught you?',
      'Is there something you have had to forgive?', 'What would you tell your younger self about hard times?',
      'What is something you regret, and what did it teach you?', 'What are you most proud of surviving?',
    ],
  },
  {
    icon: '🤍', title: 'Wisdom & legacy',
    questions: [
      'What do you believe in most deeply?', 'What values do you most want to pass on?',
      'What do you think the secret to a happy life is?', 'What has life taught you about what matters?',
      'What do you wish you had spent more time on?', 'What do you wish you had worried less about?',
      'What is the most important lesson life has taught you?', 'What do you want to be remembered for?',
      'Is there anything you want to say to the people you love?', 'What story do you most want to make sure is never forgotten?',
    ],
  },
]

const tips = [
  { icon: '🎣', title: 'Ask during an activity', desc: 'Grandads often open up more easily when they\'re doing something — fishing, gardening, watching the match. Side-by-side conversation is less confronting than face-to-face.' },
  { icon: '🎯', title: 'Start with one question', desc: 'Don\'t present a list. Just ask one question and follow where it leads. "What was your first job?" can unlock hours of stories.' },
  { icon: '🤐', title: 'Let the silence sit', desc: 'Grandads from older generations sometimes take a moment to retrieve memories. Don\'t rush to fill the silence — the story is usually worth the wait.' },
  { icon: '📱', title: 'Record if you can', desc: 'Ask if you can record on your phone. His voice telling the story — the accent, the pauses, the laugh — is worth more than any transcript.' },
]

useSeo({
  title: '100 Questions to Ask Your Grandad Before It\'s Too Late | Tell Me Your Story',
  description: 'Questions to ask your grandad about his life — childhood, work, adventures, family, and the wisdom he\'s gathered over a lifetime. 100 questions across 7 chapters.',
  canonical: 'https://tellmeyourstory.uk/questions-to-ask-your-grandad',
})
</script>

<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
</style>