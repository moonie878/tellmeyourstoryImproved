<template>
  <main class="bg-white">

    <!-- Hero -->
    <section class="bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Life Story Interview Questions</p>
        <h1 class="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          100 life story interview questions<br>
          <em class="text-[#C4A882] italic">for a parent or grandparent</em>
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#A8A29E]">
          The complete list of questions for a life story interview — organised by chapter, designed to draw out stories rather than just facts.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <router-link to="/register" class="rounded-full bg-[#C4A882] px-7 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Let us ask the questions →</router-link>
          <router-link to="/example" class="rounded-full border border-white/20 px-7 py-3 text-sm font-medium text-white transition hover:bg-white/10">See an example</router-link>
        </div>
      </div>
    </section>

    <!-- Interview tips -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Before you start</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">How to run a life story interview</h2>
        </div>
        <div class="mt-10 grid gap-4 sm:grid-cols-2">
          <div v-for="tip in interviewTips" :key="tip.title" class="rounded-2xl border border-stone-200 p-5">
            <p class="text-xl mb-2">{{ tip.icon }}</p>
            <p class="text-sm font-semibold text-stone-900">{{ tip.title }}</p>
            <p class="mt-1 text-xs leading-5 text-stone-500">{{ tip.desc }}</p>
          </div>
        </div>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <router-link to="/how-to-capture-parents-life-story" class="text-xs text-[#7C5C3B] underline hover:no-underline">Full guide to capturing a life story →</router-link>
          <span class="text-xs text-stone-300">·</span>
          <router-link to="/life-story-questions" class="text-xs text-[#7C5C3B] underline hover:no-underline">150 life story questions →</router-link>
        </div>
      </div>
    </section>

    <!-- Questions by chapter -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="text-center mb-12">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">100 questions</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Life story interview questions by chapter</h2>
        </div>
        <div v-for="chapter in chapters" :key="chapter.title" class="mb-10">
          <div class="flex items-center gap-3 mb-4">
            <span class="text-2xl">{{ chapter.icon }}</span>
            <h3 class="font-display text-lg font-bold text-stone-900">{{ chapter.title }}</h3>
          </div>
          <div class="grid gap-3 sm:grid-cols-2">
            <div v-for="q in chapter.questions" :key="q" class="rounded-2xl bg-white p-4 text-sm text-stone-700 leading-5">{{ q }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- The easier way -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">The easier way</p>
        <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Let us run the interview for you</h2>
        <p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-500">These 100 questions are already built into Tell Me Your Story. Your parent or grandparent can answer at their own pace — typing or by voice — and we turn everything into a beautifully designed keepsake book automatically.</p>
        <router-link to="/register" class="mt-8 inline-block rounded-full bg-[#7C5C3B] px-8 py-3 text-sm font-semibold text-white transition hover:opacity-90">Start free today →</router-link>
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
            <p class="mt-1 text-xs text-stone-500">The expanded question list by chapter</p>
          </router-link>
          <router-link to="/how-to-capture-parents-life-story" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">How to Capture a Life Story</p>
            <p class="mt-1 text-xs text-stone-500">Tools, tips, and step-by-step guidance</p>
          </router-link>
          <router-link to="/questions-to-ask-elderly-parents" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Questions for Elderly Parents</p>
            <p class="mt-1 text-xs text-stone-500">100 questions tailored for older parents</p>
          </router-link>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-[#1C1917] px-5 py-16 text-center sm:px-8 sm:py-20">
      <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Start today</p>
      <h2 class="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">100 questions already written. Free to start.</h2>
      <p class="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#A8A29E]">No preparation needed. Just start — and let the questions do the work.</p>
      <router-link to="/register" class="mt-8 inline-block rounded-full bg-[#C4A882] px-8 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Start a life story free →</router-link>
      <p class="mt-4 text-xs text-[#9C7C5C]">Free to start · One-time payment · Printed book from £34.98</p>
    </section>

  </main>
</template>

<script setup lang="ts">
import { useSeo } from '../composables/useSeo'

const interviewTips = [
  { icon: '🎙️', title: 'Record the conversation', desc: 'Ask permission to record on your phone. Their voice telling the story is worth more than any notes you take.' },
  { icon: '🎯', title: 'Ask one question at a time', desc: 'Don\'t fire through a list. Ask one question, listen fully, follow the tangents — the best stories live in the digressions.' },
  { icon: '🤐', title: 'Be comfortable with silence', desc: 'Let pauses sit. Older people sometimes take a moment to find a memory. Silence is not awkward — it\'s where the stories come from.' },
  { icon: '🔄', title: 'Come back over multiple sessions', desc: 'You don\'t need to cover everything at once. Short sessions of 30–45 minutes work better than marathon interviews.' },
  { icon: '📸', title: 'Bring old photos', desc: 'Photos are powerful memory triggers. Show them an old photo and ask what was happening at the time.' },
  { icon: '✍️', title: 'Write down the answers afterwards', desc: 'Even if you recorded, write key stories in your own words while they\'re fresh. Then you have both.' },
]

const chapters = [
  {
    icon: '🌱', title: 'Childhood & early life',
    questions: [
      'What is your earliest memory?', 'Where did you grow up?',
      'What was your childhood home like?', 'What did your parents do for work?',
      'What did you love doing as a child?', 'Who was your best friend growing up?',
      'What was school like for you?', 'What were you afraid of as a child?',
      'What family traditions do you remember?', 'What world events do you remember from your childhood?',
    ],
  },
  {
    icon: '🎒', title: 'Teenage years',
    questions: [
      'What were your dreams when you were young?', 'What music did you love as a teenager?',
      'Did you have a part-time job?', 'Who did you admire most?',
      'What were you most passionate about?', 'Did you ever get into trouble?',
      'What was your first experience of love?', 'What did your parents expect of you?',
      'What did you do at weekends?', 'What do you wish you\'d known then?',
    ],
  },
  {
    icon: '💼', title: 'Work & career',
    questions: [
      'What was your very first job?', 'What did you spend most of your working life doing?',
      'What work are you most proud of?', 'What was the hardest job you ever had?',
      'Did you ever take a big professional risk?', 'What did you learn from your working life?',
      'Was there a job you always wanted but never had?', 'How did the world of work change over your lifetime?',
      'What would you do differently if you started over?', 'What advice would you give someone starting their career?',
    ],
  },
  {
    icon: '❤️', title: 'Love & relationships',
    questions: [
      'How did you meet your partner?', 'What was it like when you first fell in love?',
      'How did you know they were the one?', 'What has kept your relationship strong?',
      'Who has been the most important person in your life?', 'Have you ever had your heart broken?',
      'What have you learned about love?', 'Is there something you wish you\'d said to someone?',
      'What is the kindest thing anyone has done for you?', 'What does love mean to you now?',
    ],
  },
  {
    icon: '👨‍👩‍👧', title: 'Family & parenting',
    questions: [
      'What was it like becoming a parent?', 'What are your proudest moments as a parent?',
      'What was the hardest part of raising a family?', 'What family traditions matter most?',
      'What do you want your children to remember about their childhood?', 'What surprised you most about parenthood?',
      'What do you hope your grandchildren know about you?', 'What was a typical Sunday like?',
      'Is there anything you wish you\'d done differently as a parent?', 'What does family mean to you?',
    ],
  },
  {
    icon: '💪', title: 'Hard times & resilience',
    questions: [
      'What is the hardest thing you\'ve ever been through?', 'How did you get through the toughest times?',
      'Has there been a time when everything seemed to fall apart?', 'What gave you strength when things were hard?',
      'Have you ever felt truly lost?', 'Is there something you\'ve had to forgive?',
      'What has grief taught you?', 'What would you tell your younger self about hard times?',
      'What are you most proud of surviving?', 'What is the most difficult decision you\'ve ever made?',
    ],
  },
  {
    icon: '🤍', title: 'Legacy & wisdom',
    questions: [
      'What do you believe in most deeply?', 'What values do you most want to pass on?',
      'What is the secret to a happy life?', 'What has brought you the most joy?',
      'What do you wish you\'d spent more time on?', 'What do you wish you\'d worried less about?',
      'What is the most important lesson life has taught you?', 'What do you want to be remembered for?',
      'Is there anything you want to say to the people you love?', 'What story do you most want never forgotten?',
    ],
  },
]

useSeo({
  title: 'Life Story Interview Questions: 100 Questions by Chapter (2026)',
  description: '100 life story interview questions, organised by chapter: childhood, love, work, family, hard times, and legacy. Free to use — start your interview today.',
  canonical: 'https://tellmeyourstory.uk/life-story-interview-questions',
})
</script>

<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
</style>