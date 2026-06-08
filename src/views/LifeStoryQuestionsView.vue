<template>
  <main class="bg-white">

    <!-- Hero -->
    <section class="bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Life Story Questions</p>
        <h1 class="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          150 life story questions<br>
          <em class="text-[#C4A882] italic">to ask someone you love</em>
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#A8A29E]">
          The best life story questions don't just get answers — they unlock memories, invite reflection, and reveal the person behind the facts. These 150 questions cover every chapter of a life.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <router-link to="/register" class="rounded-full bg-[#C4A882] px-7 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Start capturing their story free →</router-link>
          <router-link to="/example" class="rounded-full border border-white/20 px-7 py-3 text-sm font-medium text-white transition hover:bg-white/10">See an example</router-link>
        </div>
      </div>
    </section>

    <!-- What makes a good question -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">What makes a good question</p>
        <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Questions that unlock stories</h2>
        <div class="mt-8 grid gap-5 sm:grid-cols-2 text-left">
          <div class="rounded-2xl bg-red-50 p-5">
            <p class="text-xs font-semibold uppercase tracking-wider text-red-400">Avoid</p>
            <ul class="mt-3 space-y-2 text-xs text-stone-500">
              <li>✗ "Did you have a happy childhood?" — yes/no</li>
              <li>✗ "What did you do for work?" — too broad</li>
              <li>✗ "Do you have any regrets?" — too heavy</li>
              <li>✗ "What was your life like?" — too vague</li>
            </ul>
          </div>
          <div class="rounded-2xl bg-green-50 p-5">
            <p class="text-xs font-semibold uppercase tracking-wider text-green-500">Use instead</p>
            <ul class="mt-3 space-y-2 text-xs text-stone-500">
              <li>✓ "What is your earliest memory?" — specific</li>
              <li>✓ "What was your first day at work like?" — vivid</li>
              <li>✓ "Is there something you'd do differently?" — gentler</li>
              <li>✓ "What did a typical Sunday look like?" — concrete</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Questions -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="text-center mb-12">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">150 questions</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Life story questions by chapter</h2>
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

    <!-- CTA -->
    <section class="bg-[#1C1917] px-5 py-16 text-center sm:px-8 sm:py-20">
      <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Make it easy</p>
      <h2 class="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">100 questions already written for you</h2>
      <p class="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#A8A29E]">Tell Me Your Story guides your loved one through 100 carefully crafted questions and turns every answer into a beautifully printed keepsake book — automatically.</p>
      <router-link to="/register" class="mt-8 inline-block rounded-full bg-[#C4A882] px-8 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Start free today →</router-link>
      <p class="mt-4 text-xs text-[#9C7C5C]">Free to start · One-time payment · Printed book from £34.98</p>
    </section>

  </main>
</template>

<script setup lang="ts">
import { useSeo } from '../composables/useSeo'

const chapters = [
  {
    icon: '🌱', title: 'Childhood & early memories',
    questions: [
      'What is your earliest memory?', 'Where did you grow up?',
      'What was your childhood home like?', 'What did your parents do for work?',
      'What did you love doing as a child?', 'What was school like for you?',
      'Who was your best friend growing up?', 'What games did you play as a child?',
      'What family traditions do you remember from childhood?', 'What is a memory from childhood that still makes you smile?',
      'What did your bedroom look like?', 'What was your favourite food growing up?',
      'What did you get into trouble for?', 'What world events do you remember from your childhood?',
      'What did you want to be when you grew up?',
    ],
  },
  {
    icon: '🎒', title: 'School & teenage years',
    questions: [
      'What was secondary school like for you?', 'Who was your favourite teacher and why?',
      'What subject were you best at?', 'What music did you love as a teenager?',
      'Who did you have a crush on?', 'What was your first job?',
      'What did your parents think you would do with your life?', 'What were you most passionate about as a teenager?',
      'Did you ever get into serious trouble?', 'What was the biggest thing happening in the world when you were a teenager?',
      'What did you do at weekends?', 'What was the first thing you ever saved up to buy?',
      'Who influenced you most at that age?', 'What do you wish you had known then?',
      'What was the most adventurous thing you did as a teenager?',
    ],
  },
  {
    icon: '💑', title: 'Love & relationships',
    questions: [
      'How did you meet your partner?', 'What was your first date like?',
      'When did you know they were the one?', 'How did you get engaged?',
      'What was your wedding day like?', 'What has kept your relationship strong?',
      'What do you know now about love that you didn\'t know then?', 'Have you ever had your heart broken?',
      'Who has been the most important person in your life?', 'What is the kindest thing anyone has ever done for you?',
      'What is the kindest thing you have ever done for someone else?', 'Is there anyone you wish you had stayed closer to?',
      'What does love mean to you?', 'What would you tell a young person about relationships?',
      'What is your best piece of marriage advice?',
    ],
  },
  {
    icon: '💼', title: 'Work & career',
    questions: [
      'What was your first proper job?', 'What was the hardest job you ever had?',
      'What work are you most proud of?', 'Did you ever have a boss who changed the way you thought?',
      'What did you learn from your working life?', 'Was there a job you always wanted but never had?',
      'What was the best decision you made in your career?', 'Did you ever take a risk professionally?',
      'How did the world of work change over your lifetime?', 'What would you do differently if you started over?',
      'What did your job mean to you beyond the money?', 'Did you ever work away from home?',
      'What sacrifices did you make for your career?', 'What do you think makes a good worker?',
      'If you could give one piece of career advice, what would it be?',
    ],
  },
  {
    icon: '👨‍👩‍👧', title: 'Family & parenting',
    questions: [
      'What was it like becoming a parent for the first time?', 'What are your proudest moments as a parent?',
      'What was the hardest part of raising a family?', 'What family traditions matter most to you?',
      'What do you most want your children to remember about their childhood?', 'What was a typical day like when the children were young?',
      'What is the most important lesson you tried to teach your children?', 'What do you hope your grandchildren know about you?',
      'Is there anything you wish you had done differently as a parent?', 'What does family mean to you?',
      'What family story do you hope is never forgotten?', 'What did your parents teach you that you passed on?',
      'What surprised you most about parenthood?', 'What made you laugh most as a family?',
      'What was the happiest time in your family life?',
    ],
  },
  {
    icon: '💪', title: 'Hard times & resilience',
    questions: [
      'What is the hardest thing you have ever been through?', 'How did you get through the toughest times in your life?',
      'Was there a time when everything seemed to fall apart?', 'What gave you strength when things were hard?',
      'Have you ever lost someone who changed you?', 'Is there something you have had to forgive?',
      'What has grief taught you?', 'Have you ever felt truly lost?',
      'What is something you regret, and what did it teach you?', 'What are you most proud of surviving?',
      'Has there been a moment when you surprised yourself with your own strength?', 'What would you tell your younger self about hard times?',
      'What has life taught you about resilience?', 'Was there a time you nearly gave up but didn\'t?',
      'What is the most difficult decision you have ever had to make?',
    ],
  },
  {
    icon: '🤍', title: 'Legacy & wisdom',
    questions: [
      'What do you believe in most deeply?', 'What values do you most want to pass on?',
      'What do you think the secret to a happy life is?', 'What has brought you the most joy?',
      'What do you wish you had spent more time on?', 'What do you wish you had worried less about?',
      'What is the most important lesson life has taught you?', 'What do you want to be remembered for?',
      'Is there anything you want to say to the people you love?', 'What story do you most want to make sure is never forgotten?',
      'If you could live your life again, what would you keep the same?', 'What do you think happens after we die?',
      'What does a good life look like to you?', 'What advice would you give someone just starting out?',
      'What are you most grateful for?',
    ],
  },
]

useSeo({
  title: '150 Life Story Questions to Ask Someone You Love | Tell Me Your Story',
  description: '150 life story questions covering every chapter of a life — childhood, love, work, family, hard times, and legacy. The questions that unlock the stories families never thought to ask.',
  canonical: 'https://tellmeyourstory.uk/life-story-questions',
})
</script>

<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
</style>