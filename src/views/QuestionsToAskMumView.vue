#

## 2. `QuestionsToAskMumView.vue`


<template>
  <main class="bg-[#f7f5f2] text-stone-900">
    <section class="border-b border-stone-200 bg-white px-4 py-16 sm:px-6 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <p class="text-xs font-medium uppercase tracking-[0.25em] text-stone-500 sm:text-sm">
          Mum’s Story
        </p>
        <h1 class="mt-4 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
          Questions to Ask Your Mum About Her Life
        </h1>
        <p class="mt-6 max-w-3xl text-base leading-7 text-stone-600 sm:text-lg sm:leading-8">
          Your mum has a whole story that began long before you knew her as “mum.” These questions can help you discover more about her childhood, dreams, memories, struggles, and the lessons she wants to pass on.
        </p>
      </div>
    </section>

    <section class="px-4 py-12 sm:px-6 sm:py-16">
      <div class="mx-auto max-w-4xl space-y-10">
        <div class="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8">
          <h2 class="text-2xl font-semibold text-stone-900">Questions about her younger years</h2>
          <ul class="mt-6 space-y-3 text-stone-600">
            <li>What was your childhood like?</li>
            <li>What are your happiest memories from growing up?</li>
            <li>What were your parents like?</li>
            <li>What kind of teenager were you?</li>
            <li>What did you dream of doing when you were younger?</li>
            <li>What did you love most about your younger years?</li>
            <li>What was hardest for you back then?</li>
            <li>Who influenced you the most when you were young?</li>
          </ul>
        </div>

        <div class="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8">
          <h2 class="text-2xl font-semibold text-stone-900">Questions about becoming a mum</h2>
          <ul class="mt-6 space-y-3 text-stone-600">
            <li>What do you remember about the day I was born?</li>
            <li>How did you feel when you first held me?</li>
            <li>What were your biggest hopes for me?</li>
            <li>What worried you most when you became a parent?</li>
            <li>What moments from my childhood stay with you most?</li>
            <li>What did you love most about being my mum?</li>
            <li>What family traditions mattered most to you?</li>
            <li>What do you wish I understood more about that time in your life?</li>
          </ul>
        </div>

        <div class="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8">
          <h2 class="text-2xl font-semibold text-stone-900">Questions about her wisdom and legacy</h2>
          <ul class="mt-6 space-y-3 text-stone-600">
            <li>What are you most proud of in your life?</li>
            <li>What life lessons do you most want to pass on?</li>
            <li>What mistakes taught you the most?</li>
            <li>What do you believe matters most in life?</li>
            <li>What do you hope your children never forget?</li>
            <li>What are you most grateful for now?</li>
            <li>How would you like to be remembered?</li>
            <li>What would you want future generations to know about you?</li>
          </ul>
        </div>

        <div class="rounded-3xl border border-stone-200 bg-[#f1ebe4] p-6 text-center sm:p-8">
          <h2 class="text-2xl font-semibold text-stone-900">
            Preserve your mum’s story beautifully
          </h2>
          <p class="mx-auto mt-4 max-w-2xl text-base leading-7 text-stone-600">
            Use Tell Me Your Story to guide your mum through meaningful questions and turn her answers into a keepsake book your family can treasure.
          </p>
          <div class="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <router-link
              to="/register"
              class="rounded-full bg-[#7C5C3B] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Start Mum’s Story
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
  title: 'Questions to Ask Your Mum About Her Life | Tell Me Your Story',
  description:
    'A thoughtful list of questions to ask your mum about her childhood, memories, motherhood, life lessons, and legacy.',
})
</script>




