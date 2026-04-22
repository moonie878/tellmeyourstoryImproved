## 3. `QuestionsToAskDadView.vue`


<template>
  <main class="bg-[#f7f5f2] text-stone-900">
    <section class="border-b border-stone-200 bg-white px-4 py-16 sm:px-6 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <p class="text-xs font-medium uppercase tracking-[0.25em] text-stone-500 sm:text-sm">
          Dad’s Story
        </p>
        <h1 class="mt-4 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
          Questions to Ask Your Dad About His Childhood
        </h1>
        <p class="mt-6 max-w-3xl text-base leading-7 text-stone-600 sm:text-lg sm:leading-8">
          Many people realise too late that they never really asked their dad about his life. These questions can help you learn more about his childhood, dreams, work, family memories, and the lessons he wants to leave behind.
        </p>
      </div>
    </section>

    <section class="px-4 py-12 sm:px-6 sm:py-16">
      <div class="mx-auto max-w-4xl space-y-10">
        <div class="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8">
          <h2 class="text-2xl font-semibold text-stone-900">Questions about his childhood</h2>
          <ul class="mt-6 space-y-3 text-stone-600">
            <li>What was your childhood like?</li>
            <li>What do you remember most about growing up?</li>
            <li>What was your family home like?</li>
            <li>What kind of child were you?</li>
            <li>What did you love doing when you were young?</li>
            <li>Who were your closest friends?</li>
            <li>What was the hardest part of your younger years?</li>
            <li>What dreams did you have when you were young?</li>
          </ul>
        </div>

        <div class="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8">
          <h2 class="text-2xl font-semibold text-stone-900">Questions about work, family, and fatherhood</h2>
          <ul class="mt-6 space-y-3 text-stone-600">
            <li>What work or achievements are you most proud of?</li>
            <li>What did you want your family life to feel like?</li>
            <li>What do you remember about the day I was born?</li>
            <li>How did you feel when you first became a dad?</li>
            <li>What were you most worried about as a parent?</li>
            <li>What are your favourite memories of our family life?</li>
            <li>What moments made you proud as a father?</li>
            <li>What do you wish I understood more about your life?</li>
          </ul>
        </div>

        <div class="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8">
          <h2 class="text-2xl font-semibold text-stone-900">Questions about lessons and legacy</h2>
          <ul class="mt-6 space-y-3 text-stone-600">
            <li>What values mattered most to you in life?</li>
            <li>What mistakes taught you the most?</li>
            <li>What advice would you give your younger self?</li>
            <li>What do you believe makes a good life?</li>
            <li>What are you most proud of overall?</li>
            <li>What do you hope your children carry forward?</li>
            <li>How would you like to be remembered?</li>
            <li>What do you never want forgotten about your story?</li>
          </ul>
        </div>

        <div class="rounded-3xl border border-stone-200 bg-[#f1ebe4] p-6 text-center sm:p-8">
          <h2 class="text-2xl font-semibold text-stone-900">
            Turn your dad’s memories into a keepsake
          </h2>
          <p class="mx-auto mt-4 max-w-2xl text-base leading-7 text-stone-600">
            Tell Me Your Story helps you ask meaningful questions, capture your dad’s answers, and turn them into a keepsake book your family can hold onto for years.
          </p>
          <div class="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <router-link
              to="/register"
              class="rounded-full bg-[#7C5C3B] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Start Dad’s Story
            </router-link>
            <router-link
              to="/example"
              class="rounded-full border border-stone-300 bg-white px-6 py-3 text-sm font-semibold text-stone-900 transition hover:bg-stone-100"
            >
              View example story
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { useSeo } from '../composables/useSeo'

useSeo({
  title: 'Questions to Ask Your Dad About His Childhood | Tell Me Your Story',
  description:
    'A thoughtful list of questions to ask your dad about his childhood, family life, fatherhood, values, lessons, and legacy.',
})
</script>



