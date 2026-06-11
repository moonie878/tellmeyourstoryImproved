<template>
  <main class="bg-white">

    <!-- Hero -->
    <section class="bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Questions to Ask Your Grandma</p>
        <h1 class="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          100 questions to ask your grandma<br>
          <em class="text-[#C4A882] italic">before her stories are lost</em>
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#A8A29E]">
          Your grandma has lived through things you can barely imagine. These questions will draw out the stories she's been carrying for decades — and Tell Me Your Story will help you keep them forever.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <router-link to="/register" class="rounded-full bg-[#C4A882] px-7 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Start capturing Grandma's story free →</router-link>
          <router-link to="/example" class="rounded-full border border-white/20 px-7 py-3 text-sm font-medium text-white transition hover:bg-white/10">See an example</router-link>
        </div>
      </div>
    </section>

    <!-- Why ask -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Why now</p>
        <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Your grandma's stories exist nowhere else in the world</h2>
        <p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-500">No book, no documentary, no archive holds what she holds. Her experience of growing up, of falling in love, of raising a family, of living through history — it lives only in her memory. Once she's gone, it's gone. Ask now.</p>
        <div class="mt-6 flex flex-wrap justify-center gap-3">
          <router-link to="/questions-to-ask-elderly-parents" class="text-xs text-[#7C5C3B] underline hover:no-underline">Questions for elderly parents →</router-link>
          <span class="text-xs text-stone-300">·</span>
          <router-link to="/dementia-life-story-book" class="text-xs text-[#7C5C3B] underline hover:no-underline">Life story books for dementia →</router-link>
        </div>
      </div>
    </section>

    <!-- Questions -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="text-center mb-10">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">The questions</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Questions to ask your grandma</h2>
        </div>
        <div class="grid gap-5 sm:grid-cols-2">
          <div v-for="category in categories" :key="category.title" class="rounded-2xl bg-white p-6">
            <p class="text-lg mb-1">{{ category.icon }}</p>
            <p class="text-sm font-semibold text-stone-900 mb-4">{{ category.title }}</p>
            <ul class="space-y-2">
              <li v-for="q in category.questions" :key="q" class="text-xs leading-5 text-stone-600 flex gap-2">
                <span class="text-[#9C7C5C] flex-shrink-0 mt-0.5">◦</span>
                <span>{{ q }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA mid -->
    <section class="px-5 py-12 sm:px-8">
      <div class="mx-auto max-w-3xl rounded-3xl bg-[#1C1917] p-8 text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Don't just ask — capture</p>
        <h2 class="mt-3 font-display text-2xl font-bold text-white">Turn her answers into a keepsake book</h2>
        <p class="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#A8A29E]">Tell Me Your Story guides your grandma through 100 questions — she can speak her answers aloud — and turns them into a beautifully printed book with her voice recorded inside via QR codes.</p>
        <router-link to="/register" class="mt-6 inline-block rounded-full bg-[#C4A882] px-7 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Start free →</router-link>
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
          <router-link to="/questions-to-ask-your-grandad" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Questions to Ask Your Grandad</p>
            <p class="mt-1 text-xs text-stone-500">100 questions for your grandfather</p>
          </router-link>
          <router-link to="/questions-to-ask-elderly-parents" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Questions for Elderly Parents</p>
            <p class="mt-1 text-xs text-stone-500">The full 100 question guide</p>
          </router-link>
          <router-link to="/dementia-life-story-book" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Dementia Life Story Book</p>
            <p class="mt-1 text-xs text-stone-500">Capture memories before they fade</p>
          </router-link>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-[#1C1917] px-5 py-16 text-center sm:px-8 sm:py-20">
      <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Don't wait</p>
      <h2 class="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">Her stories deserve to be kept</h2>
      <p class="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#A8A29E]">Start capturing your grandma's life story today — free, no commitment, in her own words and her own voice.</p>
      <router-link to="/register" class="mt-8 inline-block rounded-full bg-[#C4A882] px-8 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Start Grandma's story free →</router-link>
      <p class="mt-4 text-xs text-[#9C7C5C]">Free to start · One-time payment · Printed book from £34.98</p>
    </section>

  </main>
</template>

<script setup lang="ts">
import { useSeo } from '../composables/useSeo'

const categories = [
  {
    icon: '🌱', title: 'Her childhood',
    questions: [
      'What is your very first memory?',
      'What was your home like as a child?',
      'What did you do for fun?',
      'Did your family have much money?',
      'What was your mum like?',
      'What did you eat for dinner as a child?',
      'What was school like for you?',
      'What parts of childhood were you happiest?',
    ]
  },
  {
    icon: '📻', title: 'Growing up through history',
    questions: [
      'What big world events do you remember from your childhood?',
      'Did the war affect your family?',
      'What was life like before television?',
      'What did you make do without that people have today?',
      'What was the biggest change you saw in your lifetime?',
      'What do you miss about the world you grew up in?',
      'How did you get your news before the internet?',
      'What do you think young people today take for granted?',
    ]
  },
  {
    icon: '❤️', title: 'Love and marriage',
    questions: [
      'How did you meet Grandad?',
      'What was your first impression of him?',
      'When did you know he was the one?',
      'What did getting married feel like?',
      'What made your marriage last?',
      'What do you miss most about him?',
      'What would you tell a young couple today?',
      'What\'s the most romantic thing he ever did?',
    ]
  },
  {
    icon: '👩‍👧', title: 'Being a mother and grandmother',
    questions: [
      'What was it like to have children?',
      'What were you most worried about as a mother?',
      'What\'s your proudest parenting moment?',
      'What do you wish you\'d done differently?',
      'What does being a grandmother mean to you?',
      'What do you hope your grandchildren remember about you?',
      'What values did you most want to pass on?',
      'What\'s your favourite memory of your children growing up?',
    ]
  },
  {
    icon: '🍳', title: 'Everyday life and traditions',
    questions: [
      'What did a typical day look like for you?',
      'What did you cook that the family loved most?',
      'What traditions did you keep in your home?',
      'What do you do that your mother used to do?',
      'What did Christmas look like in your house?',
      'What did Sunday afternoons feel like?',
      'What\'s a recipe you want to make sure isn\'t lost?',
      'What small things made life feel good?',
    ]
  },
  {
    icon: '🤍', title: 'Wisdom and legacy',
    questions: [
      'What are you most grateful for in your life?',
      'What\'s the hardest thing you\'ve been through?',
      'What helped you get through difficult times?',
      'What do you know now that you wish you\'d known when you were young?',
      'What are you most proud of?',
      'What do you want your grandchildren to know about you?',
      'What message would you leave for the next generation?',
      'What has your life taught you about what really matters?',
    ]
  },
]

useSeo({
  title: 'Questions to Ask Your Grandma — 100 Questions Before It\'s Too Late | Tell Me Your Story',
  description: 'The best questions to ask your grandma about her life, childhood, and memories. 100 questions designed to capture her stories before they\'re lost — and keep them forever.',
  canonical: 'https://tellmeyourstory.uk/questions-to-ask-your-grandma',
})
</script>

<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
</style>