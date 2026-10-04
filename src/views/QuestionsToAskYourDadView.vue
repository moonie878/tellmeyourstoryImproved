<template>
  <main class="bg-white">

    <!-- Hero -->
    <section class="bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Questions to Ask Your Dad</p>
        <h1 class="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          {{ totalQuestions }} questions to ask your dad<br>
          <em class="text-[#C4A882] italic">while you still can</em>
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#A8A29E]">
          Dads rarely volunteer their stories. These questions are designed to draw them out — gently, naturally, in a way that doesn't feel like an interrogation. Capture his answers. Keep them forever.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <router-link to="/register" class="rounded-full bg-[#C4A882] px-7 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Start capturing Dad's story free →</router-link>
          <router-link to="/example" class="rounded-full border border-white/20 px-7 py-3 text-sm font-medium text-white transition hover:bg-white/10">See an example</router-link>
        </div>
        <p class="mt-5 text-xs text-[#9C7C5C]">{{ categories.length }} chapters · {{ totalQuestions }} questions · free to read, free to print</p>
      </div>
    </section>

    <!-- Why ask -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Why these questions matter</p>
        <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Dads don't often talk about their lives unprompted</h2>
        <p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-500">Most dads grew up in a generation that didn't talk about feelings or share personal stories easily. The right question — asked at the right moment, in the right way — changes everything. You might be surprised how much he wants to be asked.</p>
        <div class="mt-6 flex flex-wrap justify-center gap-3">
          <router-link to="/questions-to-ask-your-grandad" class="text-xs text-[#7C5C3B] underline hover:no-underline">Questions to ask your grandad →</router-link>
          <span class="text-xs text-stone-300">·</span>
          <router-link to="/fathers-day-gift-for-grandad" class="text-xs text-[#7C5C3B] underline hover:no-underline">Father's Day gift ideas →</router-link>
        </div>
      </div>
    </section>

    <!-- Questions -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="text-center mb-10">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">The questions</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">{{ totalQuestions }} questions to ask your dad</h2>
          <p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-600">
            Nobody needs to get through all {{ totalQuestions }}. Pick the chapter that suits the moment — ten good answers already make something worth keeping.
          </p>
        </div>
        <div class="grid gap-5 sm:grid-cols-2">
          <div v-for="category in categories" :key="category.title" class="rounded-2xl bg-white p-6">
            <p class="text-lg mb-1" aria-hidden="true">{{ category.icon }}</p>
            <p class="text-sm font-semibold text-stone-900">{{ category.title }}</p>
            <p class="mb-4 mt-1 text-xs text-stone-400">{{ category.questions.length }} questions</p>
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
        <h2 class="mt-3 font-display text-2xl font-bold text-white">Turn his answers into a keepsake book</h2>
        <p class="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#A8A29E]">Tell Me Your Story guides your dad through 100 questions — he can type or speak his answers — and turns them into a beautifully printed book with his voice recorded inside.</p>
        <router-link to="/register" class="mt-6 inline-block rounded-full bg-[#C4A882] px-7 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Start free →</router-link>
      </div>
    </section>

    <!-- Tips -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">How to ask</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Getting a dad to open up</h2>
        </div>
        <div class="mt-8 space-y-4">
          <div v-for="tip in tips" :key="tip.title" class="rounded-2xl border border-stone-200 p-5 flex gap-4">
            <span class="text-xl flex-shrink-0" aria-hidden="true">{{ tip.icon }}</span>
            <div>
              <p class="text-sm font-semibold text-stone-900">{{ tip.title }}</p>
              <p class="mt-1 text-xs leading-5 text-stone-500">{{ tip.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="bg-[#FAF7F4] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">FAQ</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Common questions</h2>
        </div>
        <div class="mt-10 space-y-4">
          <div v-for="faq in faqs" :key="faq.q" class="rounded-2xl border border-stone-200 bg-white p-6">
            <p class="text-sm font-semibold text-stone-900">{{ faq.q }}</p>
            <p class="mt-2 text-xs leading-6 text-stone-500">{{ faq.a }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Printable CTA -->
    <section class="px-5 pb-4 pt-12 sm:px-8">
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
    <section class="bg-[#F5F0E8] px-5 py-12 sm:px-8">
      <div class="mx-auto max-w-3xl">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C] mb-6">Related reading</p>
        <div class="grid gap-4 sm:grid-cols-3">
          <router-link to="/questions-to-ask-your-mum" class="rounded-2xl border border-stone-200 bg-white p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Questions to Ask Your Mum</p>
            <p class="mt-1 text-xs text-stone-500">The same conversation, for her</p>
          </router-link>
          <router-link to="/questions-to-ask-your-grandad" class="rounded-2xl border border-stone-200 bg-white p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Questions to Ask Your Grandad</p>
            <p class="mt-1 text-xs text-stone-500">A generation further back</p>
          </router-link>
          <router-link to="/fathers-day-gift-for-grandad" class="rounded-2xl border border-stone-200 bg-white p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Father's Day Gift Ideas</p>
            <p class="mt-1 text-xs text-stone-500">The most meaningful Father's Day gift</p>
          </router-link>
        </div>
        <p class="mt-6 text-center text-xs leading-6 text-stone-500">
          Looking for a present rather than a conversation? See our guide to
          <router-link
            to="/christmas-gift-for-parents-who-have-everything"
            class="font-medium text-[#7C5C3B] underline underline-offset-2"
          >Christmas gifts for parents who have everything</router-link>.
        </p>
      </div>
    </section>

    <!-- Free printable: for readers not ready to start yet -->
    <section class="px-5 py-14 sm:px-8 sm:py-16">
      <div class="mx-auto max-w-5xl">
        <EmailCaptureForm source="Questions-dad" />
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-[#1C1917] px-5 py-16 text-center sm:px-8 sm:py-20">
      <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Don't wait</p>
      <h2 class="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">His story is worth keeping</h2>
      <p class="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#A8A29E]">Start capturing your dad's life story today — free, no commitment, in his own words and his own voice.</p>
      <router-link to="/register" class="mt-8 inline-block rounded-full bg-[#C4A882] px-8 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Start Dad's story free →</router-link>
      <p class="mt-4 text-xs text-[#9C7C5C]">Free to start · One-time payment · Printed book from {{ printFrom }} including UK delivery</p>
    </section>

  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import EmailCaptureForm from '../components/Marketing/EmailCaptureForm.vue'
import { useSeo, SITE_URL } from '../composables/useSeo'
import { PRINTED_BOOK_FROM_PRICE } from '../lib/printPricing'

const printFrom = `£${PRINTED_BOOK_FROM_PRICE.toFixed(2)}`

const categories = [
  {
    icon: '🌱', title: 'His childhood',
    questions: [
      'What is your earliest memory?',
      'What was the house you grew up in like?',
      'What did you get up to after school?',
      'Who were your closest friends as a child?',
      'What was your relationship with your own dad like?',
      'What did you want to be when you grew up?',
      'What did a typical weekend look like?',
      'What was the hardest thing about your childhood?',
      'What did your mum always say to you?',
      'What were you told off for most often?',
    ],
  },
  {
    icon: '🎒', title: 'School and teenage years',
    questions: [
      'What were you like at school?',
      'What subjects did you enjoy?',
      'What did you do for fun as a teenager?',
      'What music were you into?',
      'What was your first car?',
      'What was your first job?',
      'Who did you look up to when you were young?',
      'What trouble did you ever get into?',
      'What did you spend your first wages on?',
      'Who was the first girl you liked?',
    ],
  },
  {
    icon: '💼', title: 'Work and career',
    questions: [
      'How did you end up in your career?',
      "What's the proudest moment of your working life?",
      "What's the hardest job you've ever done?",
      "Who did you work with that you'll never forget?",
      'What sacrifices did you make for the family?',
      "Is there a career you wish you'd pursued?",
      'What did work mean to you?',
      'What would you tell your younger self about work?',
      'Were you ever out of work, and what was that like?',
      'What did you learn about people from working?',
    ],
  },
  {
    icon: '❤️', title: 'Love and family',
    questions: [
      'How did you meet Mum?',
      'When did you know she was the one?',
      'What was the best day of your life?',
      'What did it feel like to become a dad?',
      "What's your proudest moment as a father?",
      "What do you wish you'd done more of?",
      'What values were most important to you as a parent?',
      'What do you hope your children remember about you?',
      'What was the hardest part of being a dad?',
      'What did becoming a grandad change for you?',
    ],
  },
  {
    icon: '⚽', title: 'Sport, hobbies and what he did for himself',
    questions: [
      'What sport or team did you follow, and how did that start?',
      'Did you ever play seriously?',
      'What did you make, build or mend yourself?',
      'What did you do just for you, when nobody needed anything?',
      'What were you better at than people realised?',
      'What did you collect or hoard?',
      'What did you watch or listen to religiously?',
      'Did you ever win anything?',
      'What hobby did you give up and wish you had not?',
      'What would you do with a free Saturday now?',
    ],
  },
  {
    icon: '🌍', title: 'Adventures and experiences',
    questions: [
      "What's the best place you've ever been?",
      "What's the most adventurous thing you've ever done?",
      'What experience changed how you see the world?',
      'Is there somewhere you always wanted to go?',
      "What's your favourite memory of a family holiday?",
      'What risk are you glad you took?',
      'What did you do that surprised people?',
      'What would you do if you could do it all again?',
      'What is the furthest you have ever been from home?',
      'Did you ever get properly lost, or stranded?',
    ],
  },
  {
    icon: '🏠', title: 'Home, money and making it work',
    questions: [
      'What was the first place you lived in on your own?',
      'How did you afford your first home?',
      'What was money like when we were small?',
      'What did you go without so we did not have to?',
      'What was the most you ever worried about money?',
      'What did a weekly shop cost when you were starting out?',
      'What job around the house were you proudest of doing yourself?',
      'What did you always mean to fix and never did?',
      'What would you tell a young couple about money?',
      'What do you think we take for granted?',
    ],
  },
  {
    icon: '💪', title: 'Hard times',
    questions: [
      "What's the hardest thing you've been through?",
      'How did you get through it?',
      'Who helped you most when things were difficult?',
      'Is there a loss you have never really got over?',
      'Was there a time you thought you would not manage?',
      'What did you keep to yourself that you wish you had not?',
      'What did going through that teach you?',
      'Have you ever had to make a decision you still think about?',
      'What are you proudest of surviving?',
      'What would you say to someone going through the same thing?',
    ],
  },
  {
    icon: '🤍', title: 'Legacy and wisdom',
    questions: [
      'What are you most grateful for?',
      "What's the best advice you've ever been given?",
      "What do you know now that you wish you'd known at 20?",
      'What are you most proud of in your whole life?',
      'What do you want to be remembered for?',
      'What message would you leave for your grandchildren?',
      'What has your life taught you?',
      'What do you believe in most deeply?',
      'What would you want said about you?',
      'Is there anything you have never said that you would like to say now?',
    ],
  },
  {
    icon: '😄', title: 'The lighter side',
    questions: [
      'What is the funniest thing that ever happened to you?',
      'What is the daftest thing you ever spent money on?',
      'What were you absolutely hopeless at?',
      'What is the story the family always tells about you?',
      'What is your party trick?',
      'What did you wear that you now regret?',
      'Who makes you laugh most?',
      'What is the best joke you know?',
      'Did you ever have a lucky escape?',
      'What would surprise people about you?',
    ],
  },
]

/** Single source of truth — the headline can never drift from the list again. */
const totalQuestions = computed(() =>
  categories.reduce((sum, category) => sum + category.questions.length, 0),
)

const tips = [
  { icon: '🚗', title: 'Ask in the car', desc: 'Side-by-side conversations are easier for dads than face-to-face. A long drive is one of the best places to ask these questions.' },
  { icon: '🎙️', title: 'Record on your phone', desc: 'Put your phone on the table and hit record. Tell him you want to keep his voice. Most dads are touched by that.' },
  { icon: '🍺', title: 'Pick a relaxed setting', desc: 'A pint, a walk, a Sunday afternoon. Relaxed and unhurried is when the real stories come out.' },
  { icon: '👂', title: "Don't interrupt", desc: 'Let him finish his thought. Let him go off on tangents. The tangents are often the best bits.' },
  { icon: '🔧', title: 'Ask while he is doing something', desc: 'Many dads talk far more freely with their hands busy — in the garage, in the garden, washing up. The task takes the pressure off the conversation.' },
]

// Shown on the page AND used for the FAQPage schema, so they always match.
const faqs = [
  {
    q: 'What should I ask my dad about his life?',
    a: 'Start with his first job or his first car. Both are easy to answer, neither feels personal, and they almost always lead somewhere — the people he worked with, what he spent the money on, who he was trying to impress. Leave the harder chapters until he is warmed up.',
  },
  {
    q: 'How do I get my dad to open up?',
    a: 'Do not sit him down opposite you with a list. Ask in the car, on a walk, or while he is busy with something — side by side rather than face to face. Ask one question, then stop talking. The useful part of the answer almost always arrives after the pause.',
  },
  {
    q: 'What if he gives one-word answers?',
    a: 'That usually means the question was too big. Swap "what was work like?" for "what did you spend your first wages on?" — the specific question gets a specific answer, and the specific answer is where the story is. Follow it with "what happened next?" rather than moving to the next question on the list.',
  },
  {
    q: 'Should I record him or write it down?',
    a: 'Record if you can. Notes lose his phrasing, and the phrasing is the part your family will treasure. Ask first — most dads are quietly pleased to be asked. Tell Me Your Story saves each answer as audio and puts a QR code beside that story in the printed book, so anyone can scan the page and hear him.',
  },
]

useSeo({
  title: `${totalQuestions.value} Questions to Ask Your Dad About His Life`,
  description: `${totalQuestions.value} questions to ask your dad across ${categories.length} chapters — childhood, work, love, hard times and legacy — plus how to ask so you get more than one-word answers.`,
  canonical: 'https://tellmeyourstory.uk/questions-to-ask-your-dad',
  type: 'article',
  schema: {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FAQPage',
        '@id': `${SITE_URL}/questions-to-ask-your-dad#faq`,
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${SITE_URL}/questions-to-ask-your-dad#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Questions to Ask Your Dad', item: `${SITE_URL}/questions-to-ask-your-dad` },
        ],
      },
    ],
  },
})
</script>

<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
</style>
