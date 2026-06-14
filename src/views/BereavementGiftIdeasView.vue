<template>
  <main class="bg-white">

    <!-- Hero -->
    <section class="bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Bereavement Gift Ideas</p>
        <h1 class="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          Meaningful bereavement gifts<br>
          <em class="text-[#C4A882] italic">for someone who has lost a loved one</em>
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#A8A29E]">
          When someone is grieving, the right gift can feel like a hand held in the dark. These ideas go beyond flowers and food — thoughtful, lasting gifts that honour the person who has died and support the person who is mourning.
        </p>
      </div>
    </section>

    <!-- Intro -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Before you choose</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">What makes a good bereavement gift</h2>
        </div>
        <div class="mt-8 text-sm leading-7 text-stone-600 max-w-xl mx-auto space-y-4">
          <p>There's no perfect gift for grief. But there are gifts that say the right things — that the person who died mattered, that you're thinking of them, that you'll be there over the long weeks and months ahead, not just in the immediate aftermath.</p>
          <p>The most meaningful bereavement gifts tend to do one of three things: they preserve the memory of the person who has died, they provide practical support during a difficult time, or they offer something to look forward to when the grief begins to lift.</p>
          <p>Avoid gifts that feel like they're encouraging the person to move on — grief doesn't work on a timetable and anything that implies it does can feel dismissive. Instead, choose something that sits alongside the grief rather than trying to fix it.</p>
          <p>And don't be afraid of the personal. A handwritten letter, a specific memory of the person who has died, a photo you've printed and framed — these often mean more than anything you could order online.</p>
        </div>
        <div class="mt-6 flex flex-wrap justify-center gap-3">
          <router-link to="/end-of-life-gift" class="text-xs text-[#7C5C3B] underline hover:no-underline">End of life gifts →</router-link>
          <span class="text-xs text-stone-300">·</span>
          <router-link to="/questions-to-ask-dying-parent" class="text-xs text-[#7C5C3B] underline hover:no-underline">Questions to ask a dying parent →</router-link>
          <span class="text-xs text-stone-300">·</span>
          <router-link to="/keepsake-book" class="text-xs text-[#7C5C3B] underline hover:no-underline">Life story keepsake books →</router-link>
        </div>
      </div>
    </section>

    <!-- Gift ideas -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Gift ideas</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Meaningful bereavement gifts by category</h2>
        </div>
        <div class="mt-10 space-y-8">
          <div v-for="category in giftCategories" :key="category.title">
            <div class="flex items-center gap-3 mb-5">
              <span class="text-2xl">{{ category.icon }}</span>
              <h3 class="font-display text-xl font-bold text-stone-900">{{ category.title }}</h3>
            </div>
            <div class="grid gap-4 sm:grid-cols-2">
              <div v-for="gift in category.gifts" :key="gift.title" class="rounded-2xl bg-white p-5">
                <p class="text-sm font-semibold text-stone-900">{{ gift.title }}</p>
                <p class="mt-2 text-xs leading-5 text-stone-500">{{ gift.desc }}</p>
                <p v-if="gift.price" class="mt-2 text-xs text-[#9C7C5C]">{{ gift.price }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Memorial life story -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">The most meaningful gift</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">A tribute book that preserves their story</h2>
        </div>
        <div class="mt-8 text-sm leading-7 text-stone-600 max-w-xl mx-auto space-y-4">
          <p>One of the most profound bereavement gifts you can give — or create for yourself — is a life story book that captures who the person was. Not just dates and facts, but stories, memories, their way of telling things, what they believed, what made them laugh.</p>
          <p>Tell Me Your Story can be used to create a tribute book after a loss, drawing on family memories, old letters, recordings, and stories shared at the funeral. The result is something the whole family can return to — a permanent record of a life that meant something.</p>
          <p>If the person died before their story was fully captured, family members can contribute what they remember — filling in chapters from their own knowledge and experience. The result is still deeply meaningful. Still a gift. Still something worth keeping.</p>
          <p>Many families find the process of creating it together — sharing memories, deciding what to include, reading each other's contributions — is itself part of the grieving process. A way of saying goodbye that also says: we remember. We'll keep remembering.</p>
        </div>
        <div class="mt-8 rounded-2xl bg-[#1C1917] p-8 text-center">
          <p class="font-display text-lg font-bold text-white">Create a tribute life story book</p>
          <p class="mt-2 text-sm text-stone-400">Free to start. Capture their story in their family's words. Printed book from £34.98.</p>
          <router-link to="/register" class="mt-6 inline-block rounded-full bg-[#C4A882] px-7 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Start a tribute book free →</router-link>
        </div>
      </div>
    </section>

    <!-- What to say -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">What to say</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">What to write in a bereavement card</h2>
        </div>
        <div class="mt-8 text-sm leading-7 text-stone-600 max-w-xl mx-auto space-y-4">
          <p>The hardest part of sending a bereavement gift is often knowing what to write. Many people say nothing for fear of saying the wrong thing — but silence can feel worse than an imperfect message.</p>
          <p>The most comforting messages tend to be specific. Not "I'm so sorry for your loss" but "I'm so sorry about [name]. I remember the time they [specific memory]." A specific memory of the person who has died is one of the most precious things you can offer someone who is grieving.</p>
        </div>
        <div class="mt-10 space-y-4">
          <div v-for="msg in messages" :key="msg.context" class="rounded-2xl bg-white p-6">
            <p class="text-xs font-semibold uppercase tracking-wider text-[#9C7C5C] mb-3">{{ msg.context }}</p>
            <p class="text-sm italic leading-6 text-stone-700">"{{ msg.example }}"</p>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">FAQ</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Common questions</h2>
        </div>
        <div class="mt-10 space-y-4">
          <div v-for="faq in faqs" :key="faq.q" class="rounded-2xl border border-stone-200 p-6">
            <p class="text-sm font-semibold text-stone-900">{{ faq.q }}</p>
            <p class="mt-2 text-xs leading-6 text-stone-500">{{ faq.a }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Related -->
    <section class="bg-[#F5F0E8] px-5 py-12 sm:px-8">
      <div class="mx-auto max-w-3xl">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C] mb-6">Related reading</p>
        <div class="grid gap-4 sm:grid-cols-3">
          <router-link to="/end-of-life-gift" class="rounded-2xl border border-stone-200 bg-white p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">End of Life Gift Ideas</p>
            <p class="mt-1 text-xs text-stone-500">For someone nearing the end of their life</p>
          </router-link>
          <router-link to="/keepsake-book" class="rounded-2xl border border-stone-200 bg-white p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Life Story Keepsake Book</p>
            <p class="mt-1 text-xs text-stone-500">Capture and preserve a life story</p>
          </router-link>
          <router-link to="/questions-to-ask-dying-parent" class="rounded-2xl border border-stone-200 bg-white p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Questions for a Dying Parent</p>
            <p class="mt-1 text-xs text-stone-500">A gentle guide to final conversations</p>
          </router-link>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-[#1C1917] px-5 py-16 text-center sm:px-8 sm:py-20">
      <h2 class="font-display text-2xl font-bold text-white sm:text-3xl">A gift that honours their story</h2>
      <p class="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#A8A29E]">Create a life story book that preserves who they were — in their family's words, for every generation that follows.</p>
      <router-link to="/register" class="mt-8 inline-block rounded-full bg-[#C4A882] px-8 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Start a tribute book free →</router-link>
      <p class="mt-4 text-xs text-[#9C7C5C]">Free to start · One-time payment · Printed book from £34.98</p>
    </section>

  </main>
</template>

<script setup lang="ts">
import { useSeo } from '../composables/useSeo'

const giftCategories = [
  {
    icon: '📖', title: 'Memory and tribute gifts',
    gifts: [
      { title: 'A life story or tribute book', desc: 'A beautifully printed book capturing who they were — their memories, their voice, their stories. Created by family, kept forever. Tell Me Your Story makes this straightforward — free to start, printed book from £34.98.', price: 'From £34.98' },
      { title: 'A framed photo with a handwritten memory', desc: 'Print a favourite photo of the person who has died, frame it beautifully, and write a specific memory of them on the back. Simple, personal, and lasting.', price: '£20–£60' },
      { title: 'A memory box', desc: 'A keepsake box filled with meaningful objects — a letter, a photo, something that belonged to the person. Many online retailers offer personalised versions, or assemble your own.', price: '£30–£80' },
      { title: 'A commissioned illustration or portrait', desc: 'A hand-painted or illustrated portrait of the person who has died, based on a favourite photo. A truly personal and lasting tribute.', price: '£80–£300' },
    ]
  },
  {
    icon: '🌱', title: 'Living memorials',
    gifts: [
      { title: 'A memorial tree or plant', desc: 'A tree or plant dedicated to the person who has died — either planted in the recipient\'s garden or in a woodland memorial. Several UK charities offer this service.', price: '£15–£80' },
      { title: 'A star naming certificate', desc: 'Name a star after the person who has died. Symbolic rather than official, but a beautiful gesture that many people find comfort in.', price: '£20–£50' },
      { title: 'A charitable donation in their name', desc: 'A donation to a cause the person cared about, with a card explaining the gift. Particularly meaningful if the charity reflects something specific about who they were.', price: 'Any amount' },
      { title: 'A memorial bench', desc: 'Many parks and gardens in the UK offer memorial bench plaques. A place to sit and remember — and a lasting presence in a place they loved.', price: '£200–£600' },
    ]
  },
  {
    icon: '🤝', title: 'Practical support gifts',
    gifts: [
      { title: 'Meal deliveries or a food hamper', desc: 'Grief is exhausting and cooking is one of the first things to fall away. A food hamper, restaurant vouchers, or a few weeks of meal kit deliveries is genuinely practical and caring.', price: '£30–£100' },
      { title: 'A cleaning or housekeeping session', desc: 'In the immediate aftermath of a bereavement, practical tasks can feel overwhelming. A voucher for a cleaning service or professional organiser is a quietly useful gift.', price: '£50–£150' },
      { title: 'A bereavement journal', desc: 'A beautiful notebook specifically for grief journalling — some include prompts, others are blank. Particularly meaningful for someone who processes things through writing.', price: '£15–£40' },
      { title: 'A session with a grief counsellor', desc: 'A voucher for professional bereavement counselling. More meaningful than it might sound — it normalises seeking support and removes the financial barrier that puts many people off.', price: '£50–£100' },
    ]
  },
  {
    icon: '💛', title: 'Comfort gifts',
    gifts: [
      { title: 'A weighted blanket or luxury throw', desc: 'Something warm, soft, and comforting for the long evenings ahead. Choose something beautiful — in a colour they love, with a quality that says this was chosen carefully.', price: '£40–£120' },
      { title: 'A scented candle with a personal note', desc: 'A high-quality candle with a handwritten note explaining why you chose it — a scent that reminds you of the person, or simply something you know they\'ll love.', price: '£20–£60' },
      { title: 'A book about grief', desc: 'Books like The Year of Magical Thinking (Joan Didion) or Grief Works (Julia Samuel) can be deeply comforting for people who find solace in reading. Choose something that fits who they are.', price: '£10–£20' },
      { title: 'A subscription or experience to look forward to', desc: 'A theatre ticket, a spa day, a cooking class — something a few months ahead that gives them something to look forward to when the worst of the grief has begun to lift.', price: '£30–£150' },
    ]
  },
]

const messages = [
  { context: 'For a parent who has lost a child', example: 'There are no words that feel adequate. I\'m just so sorry. [Name] was loved by so many people and I\'ll always remember [specific memory]. I\'m here for you — for as long as you need.' },
  { context: 'For a spouse who has lost a partner', example: 'I keep thinking about [name] and the way they [specific quality or memory]. What a person they were. I\'m thinking of you every day and I\'ll be here for the long haul, not just right now.' },
  { context: 'For a friend who has lost a parent', example: 'I\'m so sorry about [name]. I only met them a few times but I remember [specific memory]. You clearly got your [quality] from them. Take all the time you need — I\'m not going anywhere.' },
  { context: 'For a colleague you don\'t know well', example: 'I was so sorry to hear about your loss. Please don\'t worry about anything here — we\'ll manage. Take the time you need and know that you\'re in our thoughts.' },
]

const faqs = [
  { q: 'What is an appropriate bereavement gift?', a: 'The most meaningful bereavement gifts either preserve the memory of the person who has died, provide practical support during a difficult time, or offer something to look forward to. Avoid gifts that feel like they\'re encouraging someone to move on — grief doesn\'t work on a timetable.' },
  { q: 'How much should you spend on a bereavement gift?', a: 'The amount matters much less than the thoughtfulness. A handwritten letter with a specific memory of the person who has died often means more than an expensive hamper. That said, for a close friend or family member, £30–£100 is a reasonable range for a meaningful gift.' },
  { q: 'When is it appropriate to give a bereavement gift?', a: 'There\'s no wrong time. Immediately after a death, practical gifts (food, help around the house) are often most useful. In the weeks and months that follow — when others have moved on but the grief hasn\'t — something thoughtful and personal often means most.' },
  { q: 'What should you not give as a bereavement gift?', a: 'Avoid anything that implies the person should be feeling better, moving on, or looking on the bright side. Also avoid gifts that are too impersonal — generic flowers or wine can feel like an obligation rather than a gesture. And avoid anything that requires effort from the grieving person.' },
  { q: 'What is a good bereavement gift for someone who has lost a parent?', a: 'Something that honours the parent who has died — a framed photo, a memory box, or a life story tribute book created from family memories. Or something that practically supports the person grieving — meals delivered, help around the house, a bereavement counselling session.' },
  { q: 'Can you create a life story book after someone has died?', a: 'Yes. Tell Me Your Story can be used to create a tribute book after a loss, drawing on family memories, stories shared at the funeral, and knowledge of the person. Family members contribute what they remember and the result is a permanent record of a life that mattered.' },
]

useSeo({
  title: 'Bereavement Gift Ideas — Meaningful Gifts for Someone Who Is Grieving | Tell Me Your Story',
  description: 'Thoughtful bereavement gift ideas that go beyond flowers and food. Memory tributes, practical support, comfort gifts, and how to create a life story book that honours the person who has died.',
  canonical: 'https://tellmeyourstory.uk/bereavement-gift-ideas',
  schema: {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'What is an appropriate bereavement gift?', acceptedAnswer: { '@type': 'Answer', text: 'The most meaningful bereavement gifts either preserve the memory of the person who has died, provide practical support during a difficult time, or offer something to look forward to.' } },
          { '@type': 'Question', name: 'How much should you spend on a bereavement gift?', acceptedAnswer: { '@type': 'Answer', text: 'The amount matters much less than the thoughtfulness. A handwritten letter with a specific memory often means more than an expensive hamper. For a close friend or family member, £30–£100 is a reasonable range.' } },
          { '@type': 'Question', name: 'What should you not give as a bereavement gift?', acceptedAnswer: { '@type': 'Answer', text: 'Avoid anything that implies the person should be feeling better or moving on. Also avoid gifts that are too impersonal or that require effort from the grieving person.' } },
          { '@type': 'Question', name: 'Can you create a life story book after someone has died?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Tell Me Your Story can be used to create a tribute book after a loss, drawing on family memories and stories. Family members contribute what they remember and the result is a permanent record of a life that mattered.' } },
        ]
      }
    ]
  }
})
</script>

<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
</style>