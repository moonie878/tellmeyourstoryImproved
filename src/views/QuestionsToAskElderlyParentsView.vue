<template>
  <main class="bg-white">

    <!-- Hero -->
    <section class="bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Questions to Ask Elderly Parents</p>
        <h1 class="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          100 questions to ask your<br>
          <em class="text-[#C4A882] italic">elderly parents about their life</em>
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#A8A29E]">
          The stories your elderly parents carry are irreplaceable. These 100 questions help you draw them out — gently, naturally, and before it's too late.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <router-link to="/register" class="rounded-full bg-[#C4A882] px-7 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">
            Start capturing their story free →
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
        <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Every family has stories that will be lost</h2>
        <p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-500">
          Most elderly parents have lived through extraordinary things — wartime childhoods, hard choices, quiet sacrifices. But they rarely volunteer these stories unprompted. The right question, asked at the right moment, can unlock a lifetime of memories your family would never otherwise hear.
        </p>
        <div class="mx-auto mt-6 max-w-xl flex flex-wrap justify-center gap-3">
          <router-link to="/how-to-capture-parents-life-story" class="text-xs text-[#7C5C3B] underline hover:no-underline">How to capture your parents' life story →</router-link>
          <span class="text-xs text-stone-300">·</span>
          <router-link to="/dementia-life-story-book" class="text-xs text-[#7C5C3B] underline hover:no-underline">Life story books for dementia →</router-link>
        </div>
      </div>
    </section>

    <!-- Questions -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="text-center mb-12">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">100 questions</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Questions to ask elderly parents about their life</h2>
        </div>

        <div v-for="chapter in chapters" :key="chapter.title" class="mb-10">
          <h3 class="font-display text-lg font-bold text-stone-900 mb-4 flex items-center gap-2">
            <span>{{ chapter.icon }}</span>
            <span>{{ chapter.title }}</span>
          </h3>
          <div class="grid gap-3 sm:grid-cols-2">
            <div v-for="q in chapter.questions" :key="q" class="rounded-2xl bg-white p-4 text-sm text-stone-700 leading-5">
              {{ q }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- How to ask -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">How to ask</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Tips for getting elderly parents to open up</h2>
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

    <!-- Related pages -->
    <section class="px-5 py-12 sm:px-8">
      <div class="mx-auto max-w-3xl">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C] mb-6">Related reading</p>
        <div class="grid gap-4 sm:grid-cols-3">
          <router-link to="/blog/questions-to-ask-your-parents" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">100 Questions to Ask Your Parents</p>
            <p class="mt-1 text-xs text-stone-500">The full list across 10 chapters of life</p>
          </router-link>
          <router-link to="/dementia-life-story-book" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Dementia Life Story Book</p>
            <p class="mt-1 text-xs text-stone-500">Capture their story before memories fade</p>
          </router-link>
          <router-link to="/gifts-for-parents-who-have-everything" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Gifts for Elderly Parents</p>
            <p class="mt-1 text-xs text-stone-500">The most meaningful gift you can give</p>
          </router-link>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-[#1C1917] px-5 py-16 text-center sm:px-8 sm:py-20">
      <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Don't wait</p>
      <h2 class="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">Capture their answers before they're lost</h2>
      <p class="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#A8A29E]">
        Tell Me Your Story guides your elderly parent through 100 questions and turns their answers into a beautiful keepsake book — in their own words, with their own voice.
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
    icon: '🌱',
    title: 'Childhood & early life',
    questions: [
      'Where were you born and what was it like growing up there?',
      'What is your earliest memory?',
      'What was your childhood home like?',
      'What did your parents do for work?',
      'Did you have brothers and sisters? What were they like?',
      'What did you enjoy doing as a child?',
      'What was school like for you?',
      'Who was your best friend growing up?',
      'What were your favourite foods as a child?',
      'What world events do you remember from your childhood?',
    ],
  },
  {
    icon: '🎒',
    title: 'Teenage years',
    questions: [
      'What music did you love as a teenager?',
      'What were your dreams when you were young?',
      'Did you have a part-time job as a teenager?',
      'What was the first thing you ever saved up to buy?',
      'Who did you admire most when you were young?',
      'What was the biggest thing happening in the world when you were a teenager?',
      'Did you ever get into trouble as a teenager?',
      'What did your parents think you would do with your life?',
      'What were you most passionate about at that age?',
      'What do you wish you had known then that you know now?',
    ],
  },
  {
    icon: '💼',
    title: 'Work & career',
    questions: [
      'What was your first job?',
      'What was the hardest job you ever had?',
      'What work are you most proud of?',
      'Did you ever have a boss who really influenced you?',
      'What did you learn from your working life that you want to pass on?',
      'Was there a job you always wanted but never had?',
      'What sacrifices did you make for your career — or for your family?',
      'How did the world of work change over your lifetime?',
      'What was the best decision you ever made in your career?',
      'If you could do it all again, would you choose the same path?',
    ],
  },
  {
    icon: '❤️',
    title: 'Love & relationships',
    questions: [
      'How did you meet your partner?',
      'What was it like when you first fell in love?',
      'What do you think makes a marriage or relationship last?',
      'What have you learned about love over your lifetime?',
      'Who has been the most important person in your life?',
      'Have you ever had your heart broken?',
      'What do you wish you had said to someone you loved?',
      'What is the kindest thing anyone has ever done for you?',
      'What is the kindest thing you have ever done for someone else?',
      'What does love mean to you now, compared to when you were young?',
    ],
  },
  {
    icon: '👨‍👩‍👧',
    title: 'Family life',
    questions: [
      'What was it like becoming a parent for the first time?',
      'What are your proudest moments as a parent?',
      'What was the hardest part of raising a family?',
      'What family traditions are most important to you?',
      'What do you most want your children to remember about their childhood?',
      'What do you hope your grandchildren know about you?',
      'What was a typical Sunday like when the children were young?',
      'What was the happiest time in your family life?',
      'Is there anything you wish you had done differently as a parent?',
      'What does family mean to you?',
    ],
  },
  {
    icon: '🌍',
    title: 'Adventures & travel',
    questions: [
      'What is the furthest you have ever travelled from home?',
      'What is the most beautiful place you have ever seen?',
      'Did you ever do something that surprised even yourself?',
      'What is the most adventurous thing you have ever done?',
      'Is there anywhere you always wanted to go but never did?',
      'What is your most treasured travel memory?',
      'Did you ever live somewhere other than where you grew up?',
      'What was the biggest change you ever made in your life?',
      'What is the most spontaneous thing you have ever done?',
      'What experience changed the way you see the world?',
    ],
  },
  {
    icon: '📚',
    title: 'Values & beliefs',
    questions: [
      'What do you believe in most deeply?',
      'Has your faith or spirituality changed over your lifetime?',
      'What values did your parents pass on to you?',
      'What values do you most want to pass on?',
      'What do you think is the most important quality a person can have?',
      'What has life taught you about kindness?',
      'Is there something you used to believe that you no longer do?',
      'What does a good life look like to you?',
      'What would you stand up for, no matter what?',
      'What do you think happens after we die?',
    ],
  },
  {
    icon: '💪',
    title: 'Challenges & resilience',
    questions: [
      'What is the hardest thing you have ever been through?',
      'How did you get through the most difficult times in your life?',
      'Has there been a time when everything seemed to fall apart?',
      'What gave you strength when things were hard?',
      'Is there something you have had to forgive — yourself or someone else?',
      'What has grief taught you?',
      'Have you ever felt truly lost? What did you do?',
      'What is something you regret, and what did it teach you?',
      'What would you tell your younger self about hard times?',
      'What are you most proud of surviving?',
    ],
  },
  {
    icon: '🌟',
    title: 'Proudest moments',
    questions: [
      'What are you most proud of in your life?',
      'What achievement took the most out of you?',
      'Was there a moment when you surprised yourself?',
      'What is something you did that nobody else knows about?',
      'What do you hope people remember most about you?',
      'Has there been a moment when you felt truly at peace?',
      'What is the best decision you ever made?',
      'What do you think your greatest contribution to the world has been?',
      'Who helped you become who you are?',
      'If you could relive one day, what would it be?',
    ],
  },
  {
    icon: '🤍',
    title: 'Legacy & wisdom',
    questions: [
      'What do you most want your family to know about you?',
      'What advice would you give to someone just starting out in life?',
      'What has brought you the most joy?',
      'What do you think the secret to a happy life is?',
      'What do you wish you had spent more time on?',
      'What do you wish you had worried less about?',
      'What is the most important lesson life has taught you?',
      'What do you want to be remembered for?',
      'Is there anything you want to say to the people you love?',
      'What story do you most want to make sure is never forgotten?',
    ],
  },
]

const tips = [
  {
    icon: '☕',
    title: 'Pick the right moment',
    desc: 'A car journey, a walk, or a quiet cup of tea works better than a formal sit-down. Elderly parents open up more naturally when they\'re relaxed and there\'s no pressure.',
  },
  {
    icon: '🎯',
    title: 'Start with one question',
    desc: 'Don\'t present a list. Just ask one question and follow where it leads. The best stories surface in the tangents.',
  },
  {
    icon: '🤐',
    title: 'Let there be silence',
    desc: 'Elderly people sometimes take longer to retrieve memories. Don\'t rush to fill the silence — give them time and the stories will come.',
  },
  {
    icon: '📱',
    title: 'Record the answers',
    desc: 'Ask if you can record on your phone, or use Tell Me Your Story\'s voice recording feature. Hearing their voice telling the story is worth more than any transcript.',
  },
  {
    icon: '🔄',
    title: 'Come back to it',
    desc: 'You don\'t need to ask everything at once. Return to it over several visits. Some memories surface days after a conversation started.',
  },
]

useSeo({
  title: '100 Questions to Ask Elderly Parents About Their Life | Tell Me Your Story',
  description: 'The questions most families never think to ask elderly parents — until it\'s too late. 100 meaningful questions across 10 chapters of their life, from childhood to legacy.',
  canonical: 'https://tellmeyourstory.uk/questions-to-ask-elderly-parents',
})
</script>

<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
</style>