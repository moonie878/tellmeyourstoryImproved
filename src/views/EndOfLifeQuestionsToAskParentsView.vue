<template>
  <main class="bg-white">

    <!-- Hero -->
    <section class="bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">End of Life Planning Conversations</p>
        <h1 class="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          The practical questions<br>
          <em class="text-[#C4A882] italic">families forget to ask</em>
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#A8A29E]">
          Not every end of life conversation is about memories. Some are about wishes, plans, and the practical things that bring real peace of mind — for them, and for you. Here's what's worth asking, and why it matters.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <router-link to="/questions-to-ask-dying-parent" class="rounded-full bg-[#C4A882] px-7 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Questions to capture their story →</router-link>
          <router-link to="/end-of-life-gift" class="rounded-full border border-white/20 px-7 py-3 text-sm font-medium text-white transition hover:bg-white/10">End of life gift ideas</router-link>
        </div>
      </div>
    </section>

    <!-- Gentle intro -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Two kinds of conversation</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Memories and wishes are both worth asking about</h2>
        </div>
        <div class="mt-8 text-sm leading-7 text-stone-600 max-w-xl mx-auto space-y-4">
          <p>When someone is nearing the end of their life, families often focus on one of two things — capturing memories, or sorting out practical arrangements. Both matter, and they're genuinely different conversations.</p>
          <p>The questions on this page are about the second kind: what they want for their funeral, who needs to know what, what's left unsaid, and the small practical things that bring real comfort once they're settled. None of these require a solicitor or a difficult sit-down meeting — most come up naturally over a cup of tea, a little at a time.</p>
          <p>If you're looking for the other kind of conversation — the one about their life, their memories, and who they were — our guide to <router-link to="/questions-to-ask-dying-parent" class="text-[#7C5C3B] underline hover:no-underline">questions to ask a dying parent</router-link> covers that ground gently.</p>
        </div>
      </div>
    </section>

    <!-- Why this matters -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Why it matters</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Most families never have this conversation</h2>
        </div>
        <div class="mt-10 space-y-4">
          <div v-for="point in whyPoints" :key="point.title" class="rounded-2xl bg-white p-6">
            <div class="flex items-start gap-4">
              <span class="text-xl flex-shrink-0">{{ point.icon }}</span>
              <div>
                <p class="text-sm font-semibold text-stone-900">{{ point.title }}</p>
                <p class="mt-2 text-xs leading-6 text-stone-500">{{ point.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Questions -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="text-center mb-10">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">What to ask</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Practical end of life questions, by category</h2>
          <p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-500">You don't need to ask all of these in one sitting. Pick whichever feels most pressing, and come back to the rest another day.</p>
        </div>
        <div class="grid gap-5 sm:grid-cols-2">
          <div v-for="category in categories" :key="category.title" class="rounded-2xl bg-[#F5F0E8] p-6">
            <p class="text-lg mb-1">{{ category.icon }}</p>
            <p class="text-sm font-semibold text-stone-900 mb-4">{{ category.title }}</p>
            <ul class="space-y-2">
              <li v-for="q in category.questions" :key="q" class="text-xs leading-5 text-stone-600 flex gap-2">
                <span class="text-[#9C7C5C] flex-shrink-0">—</span>{{ q }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- How to start -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Getting started</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">How to bring it up gently</h2>
        </div>
        <div class="mt-10 space-y-4">
          <div v-for="tip in howToTips" :key="tip.title" class="rounded-2xl bg-white p-6">
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

    <!-- Capture what's left unsaid -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Beyond the practical</p>
        <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Don't let the words go unrecorded</h2>
        <p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-500">Practical answers matter, but so does everything said alongside them — the reasons behind a wish, the story behind a request, the things they want you to know. Tell Me Your Story lets you capture all of it, typed or spoken in their own voice, and turn it into a keepsake your family can return to.</p>
        <div class="mt-8 grid gap-5 sm:grid-cols-3">
          <div v-for="feature in features" :key="feature.title" class="rounded-2xl bg-[#F5F0E8] p-5 text-center">
            <p class="text-2xl">{{ feature.icon }}</p>
            <p class="mt-3 text-xs font-semibold text-stone-900">{{ feature.title }}</p>
            <p class="mt-1 text-xs leading-5 text-stone-500">{{ feature.desc }}</p>
          </div>
        </div>
        <router-link to="/register" class="mt-8 inline-block rounded-full bg-[#7C5C3B] px-8 py-3 text-sm font-semibold text-white transition hover:opacity-90">
          Start capturing their story free →
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

    <!-- Related -->
    <section class="px-5 py-12 sm:px-8">
      <div class="mx-auto max-w-3xl">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C] mb-6">Related reading</p>
        <div class="grid gap-4 sm:grid-cols-3">
          <router-link to="/questions-to-ask-dying-parent" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Questions to Ask a Dying Parent</p>
            <p class="mt-1 text-xs text-stone-500">Gentle questions about their life and memories</p>
          </router-link>
          <router-link to="/end-of-life-gift" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">End of Life Gift Ideas</p>
            <p class="mt-1 text-xs text-stone-500">Meaningful gifts for someone nearing the end of life</p>
          </router-link>
          <router-link to="/bereavement-gift-ideas" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Bereavement Gift Ideas</p>
            <p class="mt-1 text-xs text-stone-500">Thoughtful gifts for someone who's grieving</p>
          </router-link>
        </div>
      </div>
    </section>

  </main>
</template>

<script setup lang="ts">
import { useSeo } from '../composables/useSeo'
import { PRINTED_BOOK_FROM_PRICE } from '../lib/printPricing'

const whyPoints = [
  { icon: '🤐', title: 'Most families avoid the conversation entirely', desc: 'Studies on end of life planning consistently find that most people have never discussed their wishes with family, often leaving difficult decisions to be guessed at during an already painful time.' },
  { icon: '💭', title: 'They often want to talk about it more than you think', desc: 'Many people who are nearing the end of their life have already thought carefully about what they want. Asking gives them permission to say it out loud, rather than carrying it alone.' },
  { icon: '🕊️', title: 'It removes guesswork later', desc: 'Knowing what someone wanted — for their funeral, their belongings, their unfinished business — spares the family from making those decisions alone, with no way to be sure they got it right.' },
  { icon: '📝', title: 'Some things genuinely need writing down', desc: 'Where documents are kept, who to contact, what accounts exist — these are practical facts that are easy to lose track of in the days following a death, when everyone is overwhelmed.' },
]

const categories = [
  {
    icon: '🕊️',
    title: 'Funeral and farewell',
    questions: [
      'Would you prefer a traditional funeral, a celebration of life, or something in between?',
      'Burial or cremation — and is there a place that matters to you?',
      'Are there particular songs, readings, or rituals you would want included?',
      'Who would you want to speak, and is there anyone you would specifically like there?',
      'Is there a dress code, tone, or feeling you would want the day to have?',
    ]
  },
  {
    icon: '📂',
    title: 'Practical matters',
    questions: [
      'Do you have a will, and do you know where it is kept?',
      'Is there a funeral plan already paid for, and who is the provider?',
      'Are there accounts, subscriptions, or memberships we should know about?',
      'Is there someone who already knows your wishes who we should speak to?',
      'Are there passwords or digital accounts that need a plan for after you are gone?',
    ]
  },
  {
    icon: '💛',
    title: 'Belongings and keepsakes',
    questions: [
      'Is there anything specific you would like a particular person to have?',
      'Are there items with a story behind them you would want passed on with that story attached?',
      'Is there anything you would like kept in the family, even if it has no monetary value?',
      'Are there photos, letters, or papers you would like kept safe?',
    ]
  },
  {
    icon: '💬',
    title: 'What is left unsaid',
    questions: [
      'Is there anything you have wanted to say to someone, but have not?',
      'Is there anyone you would like to make peace with, or hear from?',
      'Is there advice or a piece of wisdom you would want passed down?',
      'Is there anything you are proud of that you do not think we fully know about?',
      'What would you want us to remember, on the hardest days?',
    ]
  },
]

const howToTips = [
  { icon: '☕', title: 'Pick a calm, ordinary moment', desc: 'A quiet cup of tea or a walk works better than a formal sit-down. The more ordinary the moment feels, the less daunting the conversation becomes.' },
  { icon: '🪜', title: 'Start with the easiest question', desc: 'Begin with something practical and low-stakes — like where documents are kept — before moving toward more emotional ground like unfinished business.' },
  { icon: '🗓️', title: 'Spread it across several conversations', desc: 'You do not need to cover everything at once. A little at a time, over weeks, is far gentler than one long conversation that tries to cover it all.' },
  { icon: '✍️', title: 'Write it down as you go', desc: 'Practical details are easy to forget under stress. A simple note — even on your phone — means you will not have to rely on memory later.' },
  { icon: '🤲', title: 'Let them decline any question', desc: 'Not every question needs an answer today. If something feels too soon, it is fine to come back to it another time, or not at all.' },
]

const features = [
  { icon: '🎙️', title: 'Type or record voice', desc: 'Capture their answers however feels natural — written or spoken, question by question.' },
  { icon: '📚', title: 'UK printed keepsake', desc: 'Turn their wishes and words into a beautifully printed book the whole family can keep.' },
  { icon: '👨‍👩‍👧', title: 'Family can contribute too', desc: 'Invite other family members to add their own questions or memories to the same project.' },
]

const faqs = [
  { q: 'What is the difference between this and questions about their life story?', a: 'Life story questions focus on memories — childhood, relationships, what shaped them. This page focuses on practical end of life wishes — funeral preferences, where documents are kept, and things left unsaid. Many families find it helpful to have both conversations, just not necessarily at the same time.' },
  { q: 'When is the right time to ask these questions?', a: 'There is no single right moment, but earlier is generally easier than later. Many families find it more natural to bring these questions up gradually, over several quiet conversations, rather than all at once.' },
  { q: 'What if they do not want to talk about it?', a: 'That is completely normal, and it is worth respecting. Some people find it easier to talk about practical wishes than memories, and vice versa. Let them lead, and revisit gently another time if today is not the right day.' },
  { q: 'How do I keep track of everything they tell me?', a: 'Writing things down as you go is the simplest approach. Tell Me Your Story lets you capture answers — typed or spoken — and keep them all together in one place, with the option to turn them into a printed keepsake afterwards.' },
]

useSeo({
  title: 'End of Life Questions for Parents — The Practical Conversation Guide',
  description: 'Practical end of life questions to ask a parent — funeral wishes, important documents, and things left unsaid. A gentle guide to the conversation most families never have.',
  canonical: 'https://tellmeyourstory.uk/end-of-life-questions-to-ask-parents',
  schema: {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'What is the difference between this and questions about their life story?', acceptedAnswer: { '@type': 'Answer', text: 'Life story questions focus on memories. This page focuses on practical end of life wishes - funeral preferences, documents, and things left unsaid.' } },
          { '@type': 'Question', name: 'When is the right time to ask these questions?', acceptedAnswer: { '@type': 'Answer', text: 'Earlier is generally easier than later. Many families bring these questions up gradually, over several quiet conversations.' } },
          { '@type': 'Question', name: 'What if they do not want to talk about it?', acceptedAnswer: { '@type': 'Answer', text: 'That is normal and worth respecting. Let them lead, and revisit gently another time if today is not the right day.' } },
        ]
      }
    ]
  }
})
</script>

<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
</style>