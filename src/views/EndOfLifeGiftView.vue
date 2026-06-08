<template>
  <main class="bg-white">

    <!-- Hero -->
    <section class="bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">End of Life Gift</p>
        <h1 class="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          A gift for someone<br>
          <em class="text-[#C4A882] italic">nearing the end of their life</em>
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#A8A29E]">
          When someone you love is nearing the end of their life, the most meaningful thing you can do is help them capture their story. Their memories, their voice, their wisdom — preserved forever in a beautiful keepsake book.
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

    <!-- The gift -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">What this gift does</p>
        <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Give their story somewhere to live</h2>
        <p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-500">
          When someone is approaching the end of their life, there is often a deep human desire to be remembered — to feel that their life mattered and their stories will outlast them.
        </p>
        <p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-500">
          Tell Me Your Story gives them a structured, gentle way to share those stories. 100 guided questions, answered at their own pace, in their own words — turned into a beautifully printed keepsake book their family will treasure forever.
        </p>
      </div>
    </section>

    <!-- What's included -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">What's included</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Everything needed to capture a life story</h2>
        </div>
        <div class="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          <div v-for="feature in features" :key="feature.title" class="rounded-2xl bg-white p-6">
            <p class="text-2xl">{{ feature.icon }}</p>
            <p class="mt-3 text-sm font-semibold text-stone-900">{{ feature.title }}</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">{{ feature.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- How to approach it -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">How to approach it</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Gently, at their pace</h2>
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

    <!-- CTA -->
    <section class="bg-[#1C1917] px-5 py-16 text-center sm:px-8 sm:py-20">
      <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">There is still time</p>
      <h2 class="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">Their story deserves to be kept</h2>
      <p class="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#A8A29E]">
        Free to start. No commitment. Begin capturing their life story today — in their own words, with their own voice.
      </p>
      <router-link to="/register" class="mt-8 inline-block rounded-full bg-[#C4A882] px-8 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">
        Start a life story book free →
      </router-link>
      <p class="mt-4 text-xs text-[#9C7C5C]">Free to start · One-time payment · Printed book from £34.98</p>
    </section>

  </main>
</template>

<script setup lang="ts">
import { useSeo } from '../composables/useSeo'

const features = [
  { icon: '📖', title: '100 guided questions', desc: 'Covering every chapter of life — from earliest memories to the legacy they want to leave. Gentle, open-ended questions that draw out the stories that matter most.' },
  { icon: '🎙️', title: 'Voice recordings', desc: 'They can answer by speaking naturally. A QR code in the printed book lets family hear their actual voice telling the story — forever.' },
  { icon: '📚', title: 'UK printed hardcover', desc: 'A professionally printed and bound hardcover book delivered to the door. Something physical to hold, share, and pass down.' },
  { icon: '⏱️', title: 'No pressure or deadline', desc: 'Answer one question at a time, over as many sessions as needed. Everything saves automatically. No subscription running down.' },
  { icon: '📸', title: 'Photos alongside answers', desc: 'Add photos next to the memories they relate to — bringing each story to life on the page.' },
  { icon: '🤍', title: 'Share with family', desc: 'A link lets the whole family read along as the story grows — connecting people across distances at a time when that matters most.' },
]

const tips = [
  { icon: '🕯️', title: 'Let them lead', desc: 'Some people approaching the end of life are ready and willing to talk about their legacy. Others aren\'t. Follow their lead — the questions are there when they\'re ready.' },
  { icon: '☕', title: 'Keep sessions short', desc: 'One or two questions at a time is enough. The goal isn\'t to complete the book — it\'s to capture whatever they feel like sharing.' },
  { icon: '🎙️', title: 'Record if you can', desc: 'If they\'re willing, voice recordings capture not just the words but the tone, the pauses, the laughter. Something no written transcription can replicate.' },
  { icon: '🤍', title: 'Make it about them', desc: 'These questions are a way of saying: your life mattered, your stories matter, and we want to remember everything. That alone is a profound gift.' },
]

useSeo({
  title: 'End of Life Gift UK — Capture Their Life Story | Tell Me Your Story',
  description: 'A meaningful end of life gift — help someone capture their memories, voice, and stories in a beautiful keepsake book. Guided questions, voice recordings, UK printed hardcover.',
  canonical: 'https://tellmeyourstory.uk/end-of-life-gift',
})
</script>

<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
</style>