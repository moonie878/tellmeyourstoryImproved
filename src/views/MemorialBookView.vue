<template>
  <main class="bg-white">

    <!-- Hero -->
    <section class="bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Memorial Book</p>
        <h1 class="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          Create a memorial book<br>
          <em class="text-[#C4A882] italic">that keeps their story alive</em>
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#A8A29E]">
          A memorial book preserves the life, memories, and voice of someone you've lost — or someone you want to capture while you still can. Tell Me Your Story turns their answers into a beautiful keepsake book your family will treasure for generations.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <router-link
            to="/register"
            class="rounded-full bg-[#C4A882] px-7 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90"
          >
            Start a memorial book free →
          </router-link>
          <router-link
            to="/example"
            class="rounded-full border border-white/20 px-7 py-3 text-sm font-medium text-white transition hover:bg-white/10"
          >
            See an example
          </router-link>
        </div>
      </div>
    </section>

    <!-- Two uses -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Two ways to use it</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Whether they're still here or already gone</h2>
        </div>
        <div class="mt-10 grid gap-5 sm:grid-cols-2">
          <div class="rounded-2xl border border-stone-200 p-6">
            <p class="text-2xl">🌱</p>
            <p class="mt-3 text-sm font-semibold text-stone-900">While they're still here</p>
            <p class="mt-3 text-xs leading-6 text-stone-500">The most meaningful memorial books are made while someone can still tell their own story. Guided questions draw out memories, moments, and wisdom they've never thought to share. Their voice, recorded. Their words, preserved. Given as a gift or kept for the family.</p>
          </div>
          <div class="rounded-2xl border border-stone-200 p-6">
            <p class="text-2xl">🕯️</p>
            <p class="mt-3 text-sm font-semibold text-stone-900">After they've gone</p>
            <p class="mt-3 text-xs leading-6 text-stone-500">If you've lost someone, a memorial book can gather what the family still remembers — stories, photos, and tributes from those who loved them. A way to honour a life and ensure it isn't forgotten. Created collaboratively by the people who knew them best.</p>
          </div>
        </div>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <router-link to="/end-of-life-gift" class="text-xs text-[#7C5C3B] underline hover:no-underline">End of life gift ideas →</router-link>
          <span class="text-xs text-stone-300">·</span>
          <router-link to="/dementia-life-story-book" class="text-xs text-[#7C5C3B] underline hover:no-underline">Life story books for dementia →</router-link>
        </div>
      </div>
    </section>

    <!-- What goes inside -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">What goes inside</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">A life captured in full</h2>
        </div>
        <div class="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          <div v-for="item in contents" :key="item.title" class="rounded-2xl bg-white p-5 shadow-sm">
            <p class="text-xl">{{ item.icon }}</p>
            <p class="mt-3 text-sm font-semibold text-stone-900">{{ item.title }}</p>
            <p class="mt-1 text-xs leading-5 text-stone-500">{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Voice recordings feature -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">The most powerful feature</p>
        <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Hear their voice in the printed book</h2>
        <p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-500">
          If your loved one is still with you, they can record their voice answering each question. A QR code is printed in the memorial book — family can scan it and hear them speak, any time, forever.
        </p>
        <div class="mt-8 grid gap-5 sm:grid-cols-3">
          <div class="rounded-2xl bg-stone-50 p-5 text-center">
            <p class="text-2xl">🎙️</p>
            <p class="mt-3 text-sm font-semibold text-stone-900">Record by voice</p>
            <p class="mt-1 text-xs text-stone-500">Answer questions by speaking naturally</p>
          </div>
          <div class="rounded-2xl bg-stone-50 p-5 text-center">
            <p class="text-2xl">📖</p>
            <p class="mt-3 text-sm font-semibold text-stone-900">QR code in the book</p>
            <p class="mt-1 text-xs text-stone-500">Every answer links to the original recording</p>
          </div>
          <div class="rounded-2xl bg-stone-50 p-5 text-center">
            <p class="text-2xl">♾️</p>
            <p class="mt-3 text-sm font-semibold text-stone-900">Preserved forever</p>
            <p class="mt-1 text-xs text-stone-500">Scan and hear them speak for generations</p>
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
        <p class="mt-4 text-sm text-[#9C7C5C]">— From a Tell Me Your Story memorial book</p>
      </div>
    </section>

    <!-- Printed book -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">The finished book</p>
        <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">A real book, printed and bound in the UK</h2>
        <p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-500">
          Once the memorial book is written, order a professionally printed and bound hardcover copy delivered to your door. Something physical to hold, share, and pass down through the family.
        </p>
        <div class="mt-8 grid gap-4 sm:grid-cols-3">
          <div class="rounded-2xl border border-stone-200 p-5 text-center">
            <p class="text-sm font-semibold text-stone-900">Softcover</p>
            <p class="mt-1 text-2xl font-bold text-stone-900">£34.98</p>
            <p class="mt-1 text-xs text-stone-500">UK shipping included</p>
          </div>
          <div class="rounded-2xl border border-[#7C5C3B] bg-[#FAF7F4] p-5 text-center">
            <p class="text-[10px] font-semibold uppercase tracking-wider text-[#7C5C3B]">Popular</p>
            <p class="text-sm font-semibold text-stone-900">Hardcover</p>
            <p class="mt-1 text-2xl font-bold text-stone-900">£44.98</p>
            <p class="mt-1 text-xs text-stone-500">UK shipping included</p>
          </div>
          <div class="rounded-2xl border border-stone-200 p-5 text-center">
            <p class="text-sm font-semibold text-stone-900">Dust Jacket</p>
            <p class="mt-1 text-2xl font-bold text-stone-900">£49.98</p>
            <p class="mt-1 text-xs text-stone-500">UK shipping included</p>
          </div>
        </div>
        <p class="mt-4 text-xs text-stone-400">Printed in the UK · 10–14 day delivery · No international shipping fees</p>
      </div>
    </section>

    <!-- Related pages -->
    <section class="px-5 py-12 sm:px-8">
      <div class="mx-auto max-w-3xl">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C] mb-6">Related reading</p>
        <div class="grid gap-4 sm:grid-cols-3">
          <router-link to="/end-of-life-gift" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">End of Life Gift</p>
            <p class="mt-1 text-xs text-stone-500">A meaningful gift for someone nearing end of life</p>
          </router-link>
          <router-link to="/dementia-life-story-book" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Dementia Life Story Book</p>
            <p class="mt-1 text-xs text-stone-500">Capture memories before they fade</p>
          </router-link>
          <router-link to="/questions-to-ask-elderly-parents" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Questions to Ask Elderly Parents</p>
            <p class="mt-1 text-xs text-stone-500">100 questions to capture their memories</p>
          </router-link>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-[#1C1917] px-5 py-16 text-center sm:px-8 sm:py-20">
      <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Don't wait</p>
      <h2 class="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">Their story won't tell itself</h2>
      <p class="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#A8A29E]">
        The best time to start a memorial book is while they're still here. The second best time is now.
      </p>
      <router-link to="/register" class="mt-8 inline-block rounded-full bg-[#C4A882] px-8 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">
        Start a memorial book free →
      </router-link>
      <p class="mt-4 text-xs text-[#9C7C5C]">Free to start · One-time payment · Printed books from £34.98</p>
    </section>

  </main>
</template>

<script setup lang="ts">
import { useSeo } from '../composables/useSeo'

const contents = [
  { icon: '🌱', title: 'Childhood memories',      desc: 'Where they grew up, their earliest memories, and the world they were born into.' },
  { icon: '❤️', title: 'Love & relationships',    desc: 'How they met their partner, their marriage, and the people who mattered most.' },
  { icon: '💼', title: 'Work & achievements',     desc: 'Their career, proudest moments, and what they built over a lifetime.' },
  { icon: '👨‍👩‍👧', title: 'Family life',        desc: 'Raising children, family traditions, and the memories made at home.' },
  { icon: '📚', title: 'Values & lessons',        desc: 'What they believed in and the wisdom they want to pass on.' },
  { icon: '📸', title: 'Photos & moments',        desc: 'Images alongside answers to bring every memory to life on the page.' },
  { icon: '🎙️', title: 'Voice recordings',       desc: 'Their actual voice, preserved. Scan the QR code in the book to hear them speak.' },
  { icon: '🌟', title: 'Legacy & reflections',   desc: 'What they\'re proudest of and how they want to be remembered.' },
  { icon: '🤍', title: 'Tributes from family',   desc: 'Invite family to contribute their own memories and messages.' },
]

useSeo({
  title: 'Memorial Book UK — Preserve a Loved One\'s Life Story | Tell Me Your Story',
  description: 'Create a memorial book that captures a loved one\'s life, memories, and voice. Guided questions, voice recordings, and a beautifully printed hardcover. UK printed and shipped.',
  canonical: 'https://tellmeyourstory.uk/memorial-book',
})
</script>

<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
</style>