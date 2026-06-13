<template>
  <main class="bg-white">

    <!-- Hero -->
    <section class="bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Life Story Keepsake Book</p>
        <h1 class="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          Create a life story keepsake book<br>
          <em class="text-[#C4A882] italic">in their own words</em>
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#A8A29E]">
          A life story keepsake book captures the memories, moments, and stories of someone you love — by typing or speaking — and turns them into a beautifully printed book that lasts for generations. Not a photo album. Their actual story, in their own words.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <router-link to="/register" class="rounded-full bg-[#C4A882] px-7 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Create a keepsake book free →</router-link>
          <router-link to="/example" class="rounded-full border border-white/20 px-7 py-3 text-sm font-medium text-white transition hover:bg-white/10">See an example</router-link>
        </div>
        <p class="mt-5 text-xs text-[#9C7C5C]">Free to start · No subscription · Printed book from £34.98</p>
      </div>
    </section>

    <!-- What is a life story keepsake book -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">What is a life story keepsake book?</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">More than a photo album — their actual story</h2>
        </div>
        <div class="mt-8 text-sm leading-7 text-stone-600 max-w-xl mx-auto space-y-4">
          <p>A photo album shows what someone looked like. A life story keepsake book tells you who they actually were — what they thought about, what they loved, what they struggled with, what they want to pass on.</p>
          <p>It's a structured record of a person's life, told in their own words, organised into chapters — from childhood and teenage years through to love, family, work, and legacy. Beautifully designed, professionally printed, and built to last for generations.</p>
          <p>A grandchild reading it in thirty years should feel like they actually knew their grandparent. Not just what they looked like in photos — but what made them laugh, what they believed, what they'd been through, and what they wanted their family to know.</p>
          <p>That's what a life story keepsake book is. And Tell Me Your Story makes it simple to create one — guided questions, voice recording, photos, and professional printing all in one place.</p>
        </div>
        <div class="mt-6 flex flex-wrap justify-center gap-3">
          <router-link to="/what-is-a-life-story-book" class="text-xs text-[#7C5C3B] underline hover:no-underline">What is a life story book? →</router-link>
          <span class="text-xs text-stone-300">·</span>
          <router-link to="/life-story-questions" class="text-xs text-[#7C5C3B] underline hover:no-underline">See the questions inside →</router-link>
          <span class="text-xs text-stone-300">·</span>
          <router-link to="/how-to-write-a-life-story" class="text-xs text-[#7C5C3B] underline hover:no-underline">How to write a life story →</router-link>
        </div>
      </div>
    </section>

    <!-- What makes ours different -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">What makes ours different</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">The keepsake book that speaks</h2>
          <p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-500">Most keepsake books are photo albums or fill-in-the-blanks journals. Tell Me Your Story is different — it's the only keepsake book that captures their actual voice alongside their written answers.</p>
        </div>
        <div class="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          <div v-for="feature in features" :key="feature.title" class="rounded-2xl bg-white border border-stone-200 p-6">
            <p class="text-2xl">{{ feature.icon }}</p>
            <p class="mt-3 text-sm font-semibold text-stone-900">{{ feature.title }}</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">{{ feature.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Types -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Story types</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">A keepsake book for every person</h2>
          <p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-500">Each story type has its own set of guided questions — written specifically for that person and their life.</p>
        </div>
        <div class="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          <div v-for="type in storyTypes" :key="type.title" class="rounded-2xl bg-[#F5F0E8] p-5 text-center">
            <p class="text-2xl">{{ type.icon }}</p>
            <p class="mt-3 text-sm font-semibold text-stone-900">{{ type.title }}</p>
            <p class="mt-1 text-xs leading-5 text-stone-500">{{ type.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- How long does it take -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">How it works</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">How long does a keepsake book take to create?</h2>
        </div>
        <div class="mt-8 text-sm leading-7 text-stone-600 max-w-xl mx-auto space-y-4">
          <p>There's no deadline and no pressure. You can answer as many or as few questions as you like — every answer adds to the book. Some people complete their story in a single afternoon. Others return to it over weeks or months, answering a question or two at a time.</p>
          <p>The questions are already written — 100 across 10 chapters of life. You answer them by typing or speaking. Your answers save automatically, so you can pick it up and put it down whenever suits you.</p>
          <p>Once you're ready to export, your book is generated instantly as a beautifully designed PDF. Ordering a printed hardcover or softcover takes a few clicks, and the book is printed and delivered within 10-14 days.</p>
        </div>
        <div class="mt-10 grid gap-4 sm:grid-cols-3">
          <div v-for="step in steps" :key="step.title" class="rounded-2xl bg-white p-5 text-center">
            <p class="font-display text-2xl font-bold text-[#C4A882]">{{ step.number }}</p>
            <p class="mt-3 text-sm font-semibold text-stone-900">{{ step.title }}</p>
            <p class="mt-1 text-xs leading-5 text-stone-500">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Quote -->
    <section class="px-5 py-16 sm:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <p class="font-display text-xl italic leading-relaxed text-stone-700 sm:text-2xl">"He told me about a motorbike he saved up for two years to buy. I never knew that about him."</p>
        <p class="mt-4 text-sm text-[#9C7C5C]">— From a Tell Me Your Story keepsake book</p>
      </div>
    </section>

    <!-- Pricing -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Pricing</p>
        <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Start free, pay once when you're ready</h2>
        <p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-500">No subscription. No annual fee. Answer as many questions as you like for free — pay once when you're ready to export or print.</p>
        <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="tier in tiers" :key="tier.name" class="rounded-3xl border p-5 text-center"
            :class="tier.featured ? 'border-[#7C5C3B] bg-white' : 'border-stone-200 bg-white'">
            <p v-if="tier.featured" class="mb-2 text-[10px] font-semibold uppercase tracking-wider text-[#7C5C3B]">Most popular</p>
            <p class="text-xs font-medium text-stone-500">{{ tier.name }}</p>
            <p class="mt-2 text-2xl font-bold text-stone-900">£{{ tier.price }}</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">{{ tier.desc }}</p>
            <router-link to="/register" class="mt-4 block rounded-full py-2 text-xs font-medium transition"
              :class="tier.featured ? 'bg-[#7C5C3B] text-white hover:opacity-90' : 'border border-stone-300 text-stone-700 hover:bg-stone-50'">Get started →</router-link>
          </div>
        </div>
        <p class="mt-4 text-xs text-stone-400">One-time payment · No subscription · Printed book from £34.98</p>
      </div>
    </section>

    <!-- FAQ -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">FAQ</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Common questions about keepsake books</h2>
        </div>
        <div class="mt-10 space-y-4">
          <div v-for="faq in faqs" :key="faq.q" class="rounded-2xl border border-stone-200 p-6">
            <p class="text-sm font-semibold text-stone-900">{{ faq.q }}</p>
            <p class="mt-2 text-xs leading-6 text-stone-500">{{ faq.a }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Related pages -->
    <section class="bg-[#F5F0E8] px-5 py-12 sm:px-8">
      <div class="mx-auto max-w-3xl">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C] mb-6">Related reading</p>
        <div class="grid gap-4 sm:grid-cols-3">
          <router-link to="/what-is-a-life-story-book" class="rounded-2xl border border-stone-200 bg-white p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">What Is a Life Story Book?</p>
            <p class="mt-1 text-xs text-stone-500">Everything you need to know</p>
          </router-link>
          <router-link to="/questions-to-ask-elderly-parents" class="rounded-2xl border border-stone-200 bg-white p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Questions to Ask Elderly Parents</p>
            <p class="mt-1 text-xs text-stone-500">100 questions to start the conversation</p>
          </router-link>
          <router-link to="/gifts-for-parents-who-have-everything" class="rounded-2xl border border-stone-200 bg-white p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Gifts for Parents Who Have Everything</p>
            <p class="mt-1 text-xs text-stone-500">The most meaningful gift you can give</p>
          </router-link>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-[#1C1917] px-5 py-16 text-center sm:px-8 sm:py-20">
      <h2 class="font-display text-2xl font-bold text-white sm:text-3xl">Their story deserves to be kept</h2>
      <p class="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#A8A29E]">Free to start, no commitment. Create a life story keepsake book today — in their own words, with their own voice.</p>
      <router-link to="/register" class="mt-8 inline-block rounded-full bg-[#C4A882] px-8 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Create a keepsake book free →</router-link>
      <p class="mt-4 text-xs text-[#9C7C5C]">Free to start · One-time payment · Printed book from £34.98</p>
    </section>

  </main>
</template>

<script setup lang="ts">
import { useSeo } from '../composables/useSeo'

const storyTypes = [
  { icon: '👩', title: "Mum's Story",      desc: 'Her life, her love, and the stories she\'s never thought to tell.' },
  { icon: '👨', title: "Dad's Story",      desc: 'His life, his work, his adventures, and everything he wants the family to know.' },
  { icon: '👵', title: "Grandma's Story",  desc: 'Her childhood, her family, and the memories she holds for the whole family.' },
  { icon: '👴', title: "Grandad's Story",  desc: 'His working life, his passions, and the wisdom he\'s gathered over a lifetime.' },
  { icon: '📖', title: 'Life Story',       desc: 'A complete life story covering all chapters of a remarkable life.' },
  { icon: '🌟', title: 'All Stories',      desc: 'All story types — for the family that wants to capture everyone.' },
]

const features = [
  { icon: '📖', title: '100 guided questions', desc: 'Covering every chapter of life — from earliest memories to legacy. No blank page, no pressure. The questions do the hard work.' },
  { icon: '🎙️', title: 'Voice recordings with QR codes', desc: 'Record answers by speaking. A QR code is printed in the physical book next to each memory — family scan it to hear them speak, years from now.' },
  { icon: '📸', title: 'Photos alongside answers', desc: 'Add photos to bring every memory to life on the page. Photos sit alongside the answers they belong to — not in a separate album.' },
  { icon: '📚', title: 'Professionally printed hardcover', desc: 'A beautifully bound hardcover or softcover book printed in the UK and delivered to your door. From £34.98 including delivery.' },
  { icon: '💷', title: 'One-time payment, no subscription', desc: 'Pay once when you\'re ready to export or print. No annual fee, no monthly charge. Yours to keep forever.' },
  { icon: '🤍', title: 'Family collaboration', desc: 'Share a link with family so everyone can read along and add comments as the story grows.' },
]

const steps = [
  { number: '01', title: 'Answer the questions', desc: 'Type or speak your answers across 100 guided questions and 10 chapters of life.' },
  { number: '02', title: 'Add photos and voice', desc: 'Add photos to answers and record voice so family can hear them in the book.' },
  { number: '03', title: 'Export or print', desc: 'Download a beautiful PDF or order a printed hardcover delivered to your door.' },
]

const tiers = [
  { name: 'Story only',     price: '3.99',  desc: 'PDF keepsake for one story',           featured: false },
  { name: 'Story + Photos', price: '7.99',  desc: 'PDF with photos included',             featured: true  },
  { name: 'All Stories',    price: '11.99', desc: 'All story types unlocked',             featured: false },
  { name: 'Premium',        price: '17.99', desc: 'Photos, premium layouts, all stories', featured: false },
]

const faqs = [
  { q: 'What is a life story keepsake book?', a: 'A life story keepsake book is a structured record of someone\'s life, told in their own words, organised into chapters — from childhood and teenage years through to love, family, work, and legacy. It\'s more than a photo album — it captures who they actually were, what they thought, what they loved, and what they want to pass on.' },
  { q: 'How long does it take to create a keepsake book?', a: 'There\'s no deadline. You answer as many or as few questions as you like — every answer adds to the book. Some people complete their story in an afternoon. Others return to it over weeks or months. Everything saves automatically.' },
  { q: 'Can elderly parents use it if they\'re not good with technology?', a: 'Yes. The platform is designed to be simple. They can answer by speaking rather than typing — just tap the microphone and talk. Family members often sit with them and help with the typing while they speak their answers.' },
  { q: 'What does the printed book look like?', a: 'A professionally printed 6×9 book with chapters, elegant typography, photos alongside answers, and QR codes that play voice recordings. Available as a softcover or hardcover. You can see a full example at tellmeyourstory.uk/example.' },
  { q: 'How much does a printed keepsake book cost?', a: 'The printed book starts from £34.98 for a softcover including UK delivery. Hardcover options are available from £44.98. You also need a digital tier (from £3.99) to export the content. Free to start — no payment needed to begin.' },
  { q: 'Can I order multiple copies?', a: 'Yes. Once your book is created you can order as many printed copies as you like. Many families order copies for each child or sibling.' },
  { q: 'What makes Tell Me Your Story different from other keepsake book services?', a: 'Three things: voice recordings with QR codes printed in the book so family can hear them speak; 100 guided questions that cover every chapter of life so you\'re never staring at a blank page; and professional UK printing delivered to your door. No other service combines all three.' },
]

useSeo({
  title: 'Life Story Keepsake Book UK — In Their Own Words | Tell Me Your Story',
  description: 'Create a life story keepsake book for a parent or grandparent — 100 guided questions, voice recordings, photos, and a professionally printed hardcover delivered to your door. Free to start.',
  canonical: 'https://tellmeyourstory.uk/keepsake-book',
  schema: {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'What is a life story keepsake book?', acceptedAnswer: { '@type': 'Answer', text: 'A life story keepsake book is a structured record of someone\'s life, told in their own words, organised into chapters — from childhood and teenage years through to love, family, work, and legacy.' } },
          { '@type': 'Question', name: 'How long does it take to create a keepsake book?', acceptedAnswer: { '@type': 'Answer', text: 'There\'s no deadline. You answer as many or as few questions as you like — every answer adds to the book. Some people complete their story in an afternoon. Others return to it over weeks or months.' } },
          { '@type': 'Question', name: 'How much does a printed keepsake book cost?', acceptedAnswer: { '@type': 'Answer', text: 'The printed book starts from £34.98 for a softcover including UK delivery. Hardcover options are available from £44.98. Free to start — no payment needed to begin.' } },
          { '@type': 'Question', name: 'Can elderly parents use it if they\'re not good with technology?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. They can answer by speaking rather than typing — just tap the microphone and talk. Family members often sit with them and help with the typing while they speak their answers.' } },
          { '@type': 'Question', name: 'What makes Tell Me Your Story different?', acceptedAnswer: { '@type': 'Answer', text: 'Voice recordings with QR codes printed in the book, 100 guided questions across 10 chapters, and professional UK printing. No other service combines all three.' } },
        ]
      }
    ]
  }
})
</script>

<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
</style>