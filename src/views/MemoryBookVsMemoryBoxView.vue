<template>
  <main class="bg-white">

    <!-- Hero -->
    <section class="bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Memory Book vs Memory Box</p>
        <h1 class="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          Memory book or memory box<br>
          <em class="text-[#C4A882] italic">which is right for your family?</em>
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#A8A29E]">
          Both can help someone with dementia feel connected to their past. Here's the real difference, what each is best for, and how to choose — or combine both.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <router-link to="/register" class="rounded-full bg-[#C4A882] px-7 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Start a memory book free →</router-link>
          <router-link to="/dementia-life-story-book" class="rounded-full border border-white/20 px-7 py-3 text-sm font-medium text-white transition hover:bg-white/10">Dementia life story books</router-link>
        </div>
      </div>
    </section>

    <!-- Quick summary -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Quick summary</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">What's the difference?</h2>
        </div>
        <div class="mt-10 grid gap-5 sm:grid-cols-2">
          <div class="rounded-2xl border border-stone-200 p-6 text-center">
            <p class="font-display text-lg font-bold text-stone-900">Memory Box</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">A physical box of trinkets, photos, and small souvenirs from someone's life — things to hold, touch, and look through together.</p>
            <p class="mt-3 text-xs font-semibold text-stone-700">Tactile · sensory · no writing needed</p>
          </div>
          <div class="rounded-2xl border border-[#7C5C3B] bg-[#FAF7F4] p-6 text-center">
            <p class="text-[10px] font-semibold uppercase tracking-wider text-[#7C5C3B] mb-2">Goes further</p>
            <p class="font-display text-lg font-bold text-stone-900">Memory Book</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">A structured collection of photos, captions, and stories — organised so anyone can pick it up and use it to spark conversation.</p>
            <p class="mt-3 text-xs font-semibold text-stone-700">Structured · shareable · captures their words too</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Deep dive -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl space-y-12">
        <div>
          <div class="text-center">
            <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">About memory boxes</p>
            <h2 class="mt-3 font-display text-2xl font-bold text-stone-900">Memory boxes — touch and trigger</h2>
          </div>
          <div class="mt-6 text-sm leading-7 text-stone-600 space-y-4">
            <p>A memory box is exactly what it sounds like — a physical box containing trinkets, photographs, and small souvenirs from someone's life. It might hold a wedding ring, a seaside postcard, a child's first shoe, or a favourite scarf.</p>
            <p>The appeal is sensory. Holding an object can trigger a memory in a way a description on a page sometimes can't. For someone with dementia, the physical act of touching something familiar can be deeply grounding, even when words are harder to find.</p>
            <p>Memory boxes work well alongside other dementia activities — a favourite music playlist, familiar objects on display, or a memory box kept by the bed. They need very little preparation, which makes them a good starting point for families who want to do something simple straight away.</p>
            <p>The limitation is that a memory box doesn't capture words, context, or stories on its own. The objects can trigger a memory, but unless someone is there to ask the right question and write down what comes back, the story attached to that object can still be lost.</p>
          </div>
        </div>
        <div>
          <div class="text-center">
            <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">About memory books</p>
            <h2 class="mt-3 font-display text-2xl font-bold text-stone-900">Memory books — structure and story</h2>
          </div>
          <div class="mt-6 text-sm leading-7 text-stone-600 space-y-4">
            <p>A memory book takes the same idea — photos, mementos, familiar faces — and organises it into something structured enough for anyone to pick up and use, even a carer or visitor who's never met the person before their diagnosis.</p>
            <p>Research into life story and memory work in dementia care has found real value in this approach — it can trigger memories, improve mood, and strengthen relationships between the person and the people caring for them. Because a memory book has captions and structure, it gives a carer or visitor an easy way in: a page about their wedding, a page about their job, a page about their children — each one a doorway into conversation.</p>
            <p>Done well, a memory book also captures the words and stories themselves, not just the prompts for them. That's the gap a memory box can't close on its own — and it's where Tell Me Your Story is built to help. Guided questions help structure the book, and the person (or a family member on their behalf) can type or record voice answers, so the actual stories behind the photos are preserved too, not just the photos themselves.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Doing it well -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Doing it well</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">A few things worth knowing</h2>
        </div>
        <div class="mt-10 space-y-4">
          <div v-for="tip in tips" :key="tip.title" class="rounded-2xl bg-[#F5F0E8] p-6">
            <div class="flex items-start gap-4">
              <span class="text-xl flex-shrink-0">{{ tip.icon }}</span>
              <div>
                <p class="text-sm font-semibold text-stone-900">{{ tip.title }}</p>
                <p class="mt-2 text-xs leading-6 text-stone-500">{{ tip.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Verdict -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Our take</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">You don't have to choose just one</h2>
        </div>
        <div class="mt-8 text-sm leading-7 text-stone-600 max-w-xl mx-auto space-y-4 text-center">
          <p>The two genuinely complement each other. A memory box is a wonderful, low-effort starting point — something tactile to keep by the bed or bring out during a visit. A memory book builds on that by giving structure and capturing the stories themselves, in their own words, so the meaning behind each object or photo isn't lost.</p>
          <p>Many families start with a small memory box, then build a memory book alongside it — using objects from the box as prompts for questions, and recording the stories that come up as they go.</p>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Get started</p>
        <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Build a memory book that captures more than photos</h2>
        <p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-500">Tell Me Your Story guides you through structured questions, lets you type or record voice answers, and turns it all into a beautifully printed keepsake — with QR codes so family can hear their actual voice.</p>
        <div class="mt-8 grid gap-5 sm:grid-cols-3">
          <div v-for="feature in features" :key="feature.title" class="rounded-2xl bg-[#F5F0E8] p-5 text-center">
            <p class="text-2xl">{{ feature.icon }}</p>
            <p class="mt-3 text-xs font-semibold text-stone-900">{{ feature.title }}</p>
            <p class="mt-1 text-xs leading-5 text-stone-500">{{ feature.desc }}</p>
          </div>
        </div>
        <router-link to="/register" class="mt-8 inline-block rounded-full bg-[#7C5C3B] px-8 py-3 text-sm font-semibold text-white transition hover:opacity-90">
          Start free →
        </router-link>
        <p class="mt-3 text-xs text-stone-400">Free to start · One-time payment · Printed book from £{{ PRINTED_BOOK_FROM_PRICE.toFixed(2) }}</p>
      </div>
    </section>

    <!-- FAQ -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">FAQ</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Common questions</h2>
        </div>
        <div class="mt-10 space-y-4">
          <div v-for="faq in faqs" :key="faq.q" class="rounded-2xl bg-white p-6">
            <p class="text-sm font-semibold text-stone-900">{{ faq.q }}</p>
            <p class="mt-2 text-xs leading-6 text-stone-500">{{ faq.a }}</p>
          </div>
        </div>
      </div>
    </section>
<p class="mt-4 text-[15px] leading-[1.8] text-[#5C534E]">
  If you're buying for Christmas, we've also written up
  <router-link
    to="/meaningful-christmas-gifts"
    class="font-medium text-[#7C5C3B] underline underline-offset-2"
  >eight meaningful Christmas gift ideas</router-link>
  that get kept rather than recycled.
</p>
    <!-- Related -->
    <section class="px-5 py-12 sm:px-8">
      <div class="mx-auto max-w-3xl">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C] mb-6">Related reading</p>
        <div class="grid gap-4 sm:grid-cols-3">
          <router-link to="/dementia-life-story-book" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Dementia Life Story Book</p>
            <p class="mt-1 text-xs text-stone-500">Creating a life story book for someone with dementia</p>
          </router-link>
          <router-link to="/reminiscence-therapy-life-story" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Reminiscence Therapy</p>
            <p class="mt-1 text-xs text-stone-500">How reminiscence work helps people with dementia</p>
          </router-link>
          <router-link to="/life-story-work-in-care-homes" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Life Story Work in Care Homes</p>
            <p class="mt-1 text-xs text-stone-500">A guide for families and care teams</p>
          </router-link>
        </div>
      </div>
    </section>

  </main>
</template>

<script setup lang="ts">
import { useSeo } from '../composables/useSeo'
import { PRINTED_BOOK_FROM_PRICE } from '../lib/printPricing'

const tips = [
  { icon: '🖼️', title: 'Use large, clear photos', desc: 'Bigger photos with good contrast are easier to recognise, especially as eyesight and visual processing can both be affected by dementia.' },
  { icon: '💬', title: 'Avoid "do you remember?"', desc: 'Asking someone to remember can cause distress if they realise they cannot. Instead, share the memory yourself and let them respond naturally — "I remember when we..." invites them in without testing them.' },
  { icon: '🕰️', title: 'Think carefully about photos of people who have died', desc: 'If the person is not aware of a loss, including a photo of someone who has since died can cause confusion or repeated grief. If they are aware, including them can be comforting rather than upsetting — it depends on the individual.' },
  { icon: '👋', title: 'Let them lead the conversation', desc: 'Do not correct or argue if details come out differently to how you remember them. The goal is connection and comfort, not factual accuracy.' },
  { icon: '🤝', title: 'Involve the wider family', desc: 'Memory books are often richer when several people contribute photos and memories, not just one person working alone.' },
]

const features = [
  { icon: '🎙️', title: 'Capture their voice', desc: 'Record answers aloud — their actual voice, preserved via QR codes in the printed book.' },
  { icon: '📸', title: 'Photos with structure', desc: 'Add photos alongside guided questions, organised into clear chapters.' },
  { icon: '📚', title: 'A real keepsake', desc: 'Professionally printed and delivered — something the whole family can hold and keep.' },
]

const faqs = [
  { q: 'What is the main difference between a memory box and a memory book?', a: 'A memory box is a physical collection of objects and trinkets, used mainly as sensory prompts. A memory book is a structured collection of photos and stories, organised so anyone can use it to start a conversation — and can capture the actual words and stories behind each memory, not just the trigger for it.' },
  { q: 'Can I use a memory box and a memory book together?', a: 'Yes, and many families find this works best. Objects from a memory box can become prompts for questions in a memory book, so the story behind each item gets captured rather than only the object itself.' },
  { q: 'How do I make a memory book for someone with dementia?', a: 'Start with familiar, large, clear photos and organise them by theme or life stage. Add simple captions, and where possible, capture the stories behind each photo in the person\'s own words — written or recorded. Tell Me Your Story provides guided questions to help structure this process.' },
  { q: 'Should I avoid asking "do you remember" questions?', a: 'It is often gentler to share the memory yourself first — "I remember when we went to..." — rather than directly asking "do you remember?", which can cause distress if the person realises they cannot recall it.' },
]

useSeo({
  title: 'Memory Book vs Memory Box for Dementia — Which Is Right?',
  description: 'Memory book vs memory box for someone with dementia — the real difference, what each is best for, and practical tips for doing either well. A gentle, honest guide.',
  canonical: 'https://tellmeyourstory.uk/memory-book-vs-memory-box',
  schema: {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'What is the main difference between a memory box and a memory book?', acceptedAnswer: { '@type': 'Answer', text: 'A memory box is a physical collection of objects used as sensory prompts. A memory book is a structured collection of photos and stories that can capture the actual words behind each memory.' } },
          { '@type': 'Question', name: 'Can I use a memory box and a memory book together?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Objects from a memory box can become prompts for questions in a memory book, capturing the story behind each item.' } },
          { '@type': 'Question', name: 'Should I avoid asking do you remember questions?', acceptedAnswer: { '@type': 'Answer', text: 'It is often gentler to share the memory yourself first, rather than directly asking do you remember, which can cause distress.' } },
        ]
      }
    ]
  }
})
</script>

<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
</style>