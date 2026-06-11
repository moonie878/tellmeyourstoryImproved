<template>
  <main class="bg-white">

    <!-- Hero -->
    <section class="bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">What Is a Life Story Book?</p>
        <h1 class="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          What is a life story book?<br>
          <em class="text-[#C4A882] italic">Everything you need to know</em>
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#A8A29E]">
          A complete guide to life story books — what they are, what goes inside, who they're for, and how to create one.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <router-link to="/register" class="rounded-full bg-[#C4A882] px-7 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Create a life story book free →</router-link>
          <router-link to="/example" class="rounded-full border border-white/20 px-7 py-3 text-sm font-medium text-white transition hover:bg-white/10">See an example</router-link>
        </div>
      </div>
    </section>

    <!-- Definition -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">The definition</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">What a life story book actually is</h2>
        </div>
        <div class="mt-8 text-sm leading-7 text-stone-600 max-w-xl mx-auto">
          <p>A life story book is a structured written record of a person's life — told in their own words. Unlike a biography (which is written by someone else) or a diary (which captures daily events), a life story book captures the big picture: the chapters, the turning points, the relationships, and the wisdom accumulated over a lifetime.</p>
          <p class="mt-4">Life story books have been used in care settings for decades — particularly in dementia care, where they help carers understand who a resident is beyond their diagnosis. But they're increasingly being created by families simply because they don't want the stories of their parents and grandparents to be lost.</p>
        </div>
        <div class="mt-6 flex flex-wrap justify-center gap-3">
          <router-link to="/dementia-life-story-book" class="text-xs text-[#7C5C3B] underline hover:no-underline">Dementia life story books →</router-link>
          <span class="text-xs text-stone-300">·</span>
          <router-link to="/how-to-write-a-life-story" class="text-xs text-[#7C5C3B] underline hover:no-underline">How to write a life story →</router-link>
        </div>

        <!-- Comparison -->
        <div class="mt-10 grid gap-4 sm:grid-cols-3">
          <div v-for="type in bookTypes" :key="type.title" class="rounded-2xl border border-stone-200 p-5 text-center">
            <p class="text-2xl">{{ type.icon }}</p>
            <p class="mt-3 text-sm font-semibold text-stone-900">{{ type.title }}</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">{{ type.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- What goes inside -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">What goes inside</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">The chapters of a life story book</h2>
        </div>
        <div class="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          <div v-for="chapter in chapters" :key="chapter.title" class="rounded-2xl bg-white p-5">
            <p class="text-xl">{{ chapter.icon }}</p>
            <p class="mt-3 text-sm font-semibold text-stone-900">{{ chapter.title }}</p>
            <p class="mt-1 text-xs leading-5 text-stone-500">{{ chapter.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Who they're for -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Who they're for</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Life story books are created for</h2>
        </div>
        <div class="mt-10 space-y-4">
          <div v-for="use in uses" :key="use.title" class="flex items-start gap-4 rounded-2xl border border-stone-200 p-5">
            <span class="text-2xl flex-shrink-0">{{ use.icon }}</span>
            <div>
              <p class="text-sm font-semibold text-stone-900">{{ use.title }}</p>
              <p class="mt-1 text-xs leading-5 text-stone-500">{{ use.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- How to create one -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">How to create one</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Three ways to create a life story book</h2>
        </div>
        <div class="mt-10 space-y-5">
          <div v-for="method in methods" :key="method.title" class="rounded-2xl bg-white p-6">
            <div class="flex items-start gap-4">
              <span class="text-2xl flex-shrink-0">{{ method.icon }}</span>
              <div>
                <div class="flex items-center gap-3 flex-wrap">
                  <p class="text-sm font-semibold text-stone-900">{{ method.title }}</p>
                  <span class="text-xs px-2 py-0.5 rounded-full" :class="method.tagClass">{{ method.tag }}</span>
                </div>
                <p class="mt-2 text-xs leading-5 text-stone-500">{{ method.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Quote -->
    <section class="px-5 py-16 sm:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <p class="font-display text-xl italic leading-relaxed text-stone-700 sm:text-2xl">"He told me about a motorbike he saved up for two years to buy. I never knew that about him."</p>
        <p class="mt-4 text-sm text-[#9C7C5C]">— From a Tell Me Your Story life story book</p>
      </div>
    </section>

    <!-- Related pages -->
    <section class="px-5 py-12 sm:px-8">
      <div class="mx-auto max-w-3xl">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C] mb-6">Related reading</p>
        <div class="grid gap-4 sm:grid-cols-3">
          <router-link to="/how-to-write-a-life-story" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">How to Write a Life Story</p>
            <p class="mt-1 text-xs text-stone-500">A complete guide from start to keepsake</p>
          </router-link>
          <router-link to="/life-story-questions" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">150 Life Story Questions</p>
            <p class="mt-1 text-xs text-stone-500">The questions that unlock real stories</p>
          </router-link>
          <router-link to="/keepsake-book" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Keepsake Book</p>
            <p class="mt-1 text-xs text-stone-500">Create a keepsake book from their story</p>
          </router-link>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-[#1C1917] px-5 py-16 text-center sm:px-8 sm:py-20">
      <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Create one today</p>
      <h2 class="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">Start a life story book for free</h2>
      <p class="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#A8A29E]">100 questions already written. Voice recordings built in. Beautifully printed hardcover delivered to your door. Free to start.</p>
      <router-link to="/register" class="mt-8 inline-block rounded-full bg-[#C4A882] px-8 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Create a life story book free →</router-link>
      <p class="mt-4 text-xs text-[#9C7C5C]">Free to start · One-time payment · Printed book from £34.98</p>
    </section>

  </main>
</template>

<script setup lang="ts">
import { useSeo } from '../composables/useSeo'

const bookTypes = [
  { icon: '📖', title: 'Life story book',  desc: 'Written by the person themselves, covering their whole life in structured chapters.' },
  { icon: '📝', title: 'Biography',        desc: 'Written by someone else about a person — requires research and interviewing.' },
  { icon: '📔', title: 'Diary or journal', desc: 'Daily entries capturing current events — not structured around a whole life.' },
]

const chapters = [
  { icon: '🌱', title: 'Childhood & origins',    desc: 'Where they grew up, early memories, family background.' },
  { icon: '🎒', title: 'School & teenage years', desc: 'Education, friendships, first loves, formative experiences.' },
  { icon: '💼', title: 'Work & career',          desc: 'Jobs, achievements, what they built over a working life.' },
  { icon: '❤️', title: 'Love & relationships',  desc: 'How they met their partner, their marriage, key relationships.' },
  { icon: '👨‍👩‍👧', title: 'Family life',       desc: 'Raising children, family traditions, the memories made at home.' },
  { icon: '💪', title: 'Hard times',            desc: 'Challenges, losses, and the resilience they developed.' },
  { icon: '🌟', title: 'Achievements',          desc: 'Proudest moments, milestones, what they built.' },
  { icon: '🤍', title: 'Legacy & wisdom',       desc: 'What they want to pass on and how they want to be remembered.' },
  { icon: '😄', title: 'Favourite things',      desc: 'Foods, places, songs — the small details that make a life.' },
]

const uses = [
  { icon: '👴', title: 'Elderly parents and grandparents', desc: 'The most common use — capturing a parent or grandparent\'s story before their memories fade or they pass away.' },
  { icon: '🏥', title: 'People in care homes',             desc: 'Life story books are used in dementia care to help carers provide person-centred support.' },
  { icon: '🕯️', title: 'People approaching end of life',  desc: 'A way for someone to share their story and leave something lasting for the people they love.' },
  { icon: '📚', title: 'Family historians',                desc: 'Part of a wider family history project — capturing living memory to go alongside genealogy research.' },
  { icon: '🎁', title: 'As a gift',                       desc: 'Given as a birthday, anniversary, or Christmas gift — giving someone the chance to capture their own story.' },
]

const methods = [
  { icon: '💻', title: 'Use a guided platform like Tell Me Your Story', tag: 'Easiest', tagClass: 'bg-green-100 text-green-700', desc: 'Questions already written, answers saved automatically, beautifully designed book generated at the end. No blank page, no formatting, no effort.' },
  { icon: '🎙️', title: 'Record interviews yourself',                    tag: 'Personal', tagClass: 'bg-blue-100 text-blue-700', desc: 'Sit with your loved one, record the conversation on your phone, then transcribe and format the answers into a document yourself.' },
  { icon: '✍️', title: 'Written questionnaire',                         tag: 'Simple', tagClass: 'bg-amber-100 text-amber-700', desc: 'Send a list of questions by post or email and ask them to write their answers. Works for people who prefer to write at their own pace.' },
]

useSeo({
  title: 'What Is a Life Story Book? A Complete Guide | Tell Me Your Story',
  description: 'What is a life story book? Everything you need to know — what goes inside, who they\'re for, how to create one, and why families are making them before it\'s too late.',
  canonical: 'https://tellmeyourstory.uk/what-is-a-life-story-book',
})
</script>

<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
</style>