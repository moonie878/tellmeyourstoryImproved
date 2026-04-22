<template>
  <main class="bg-[#f7f5f2] text-stone-900">
    <section class="border-b border-stone-200 bg-white px-4 py-16 sm:px-6 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <p class="text-xs font-medium uppercase tracking-[0.25em] text-stone-500 sm:text-sm">
          Family Memories
        </p>
        <h1 class="mt-4 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
          Questions to Ask Your Parents Before It’s Too Late
        </h1>
        <p class="mt-6 max-w-3xl text-base leading-7 text-stone-600 sm:text-lg sm:leading-8">
          So many important family stories go unasked until it feels too late. These thoughtful questions can help you start meaningful conversations with your mum or dad and preserve their memories, life experiences, and lessons while you still can.
        </p>
      </div>
    </section>

    <section class="px-4 py-12 sm:px-6 sm:py-16">
      <div class="mx-auto max-w-4xl space-y-10">
        <div class="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8">
          <h2 class="text-2xl font-semibold text-stone-900">Questions about their early life</h2>
          <ul class="mt-6 space-y-3 text-stone-600">
            <li>What was your childhood like?</li>
            <li>What do you remember most about where you grew up?</li>
            <li>What were your parents like when you were young?</li>
            <li>What did you dream of becoming?</li>
            <li>What are some of your happiest childhood memories?</li>
            <li>What was school like for you?</li>
            <li>Who were your closest friends growing up?</li>
            <li>What was the hardest part of your younger years?</li>
          </ul>
        </div>

        <div class="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8">
          <h2 class="text-2xl font-semibold text-stone-900">Questions about family, love, and parenthood</h2>
          <ul class="mt-6 space-y-3 text-stone-600">
            <li>What do you remember about the day I was born?</li>
            <li>How did you feel when you first held me?</li>
            <li>What were you scared of when you became a parent?</li>
            <li>What were your hopes for me when I was little?</li>
            <li>What family moments mean the most to you now?</li>
            <li>What do you wish you had done differently as a parent?</li>
            <li>What traditions or habits mattered most in our family?</li>
            <li>What do you never want forgotten about our family life?</li>
          </ul>
        </div>

        <div class="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8">
          <h2 class="text-2xl font-semibold text-stone-900">Questions about values and life lessons</h2>
          <ul class="mt-6 space-y-3 text-stone-600">
            <li>What are you most proud of in your life?</li>
            <li>What mistakes taught you the most?</li>
            <li>What advice would you give your younger self?</li>
            <li>What do you believe matters most in life?</li>
            <li>What kind of life do you hope your children live?</li>
            <li>What values do you most want to pass on?</li>
            <li>What do you want future generations to know about you?</li>
            <li>What do you hope will never be forgotten?</li>
          </ul>
        </div>

        <div class="rounded-3xl border border-stone-200 bg-[#f1ebe4] p-6 text-center sm:p-8">
          <h2 class="text-2xl font-semibold text-stone-900">
            Turn these answers into something you can keep forever
          </h2>
          <p class="mx-auto mt-4 max-w-2xl text-base leading-7 text-stone-600">
            Tell Me Your Story helps you capture a parent’s memories through guided questions and turn them into a beautifully designed keepsake book.
          </p>
          <div class="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <router-link
              to="/register"
              class="rounded-full bg-[#7C5C3B] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Start free
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
  title: 'Questions to Ask Your Parents Before It’s Too Late | Tell Me Your Story',
  description:
    'A thoughtful list of questions to ask your parents about their life, memories, family, and lessons before it feels too late.',
})
</script>