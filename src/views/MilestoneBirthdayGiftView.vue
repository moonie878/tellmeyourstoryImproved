<template>
  <main class="bg-white">

    <!-- Hero -->
    <section class="bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Milestone Birthday Gift Ideas</p>
        <h1 class="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          The most meaningful gift for a<br>
          <em class="text-[#C4A882] italic">60th, 70th, 80th or 90th birthday</em>
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#A8A29E]">
          A milestone birthday deserves more than flowers or another experience day. Give them the chance to capture their life story — decades of memories, in their own words, turned into a beautiful keepsake book.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <router-link to="/gift" class="rounded-full bg-[#C4A882] px-7 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Gift a life story →</router-link>
          <router-link to="/example" class="rounded-full border border-white/20 px-7 py-3 text-sm font-medium text-white transition hover:bg-white/10">See an example</router-link>
        </div>
        <div class="mt-8 flex flex-wrap justify-center gap-2">
          <a
            v-for="decade in decades"
            :key="decade.slug"
            :href="`#${decade.slug}`"
            class="rounded-full border border-white/20 px-4 py-2 text-xs text-[#E8E0D8] transition hover:bg-white/10"
          >{{ decade.age }}</a>
        </div>
      </div>
    </section>

    <!-- Why a milestone birthday -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Why this birthday is different</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">A round number makes people look back</h2>
        </div>
        <div class="mt-8 space-y-4 text-sm leading-7 text-stone-600">
          <p>
            Milestone birthdays do something ordinary ones don't: they make the person reflect, and they gather the family in one room. That combination is the reason a life story makes a better gift at 70 than at 68 — there is a natural prompt to look back, and there are people around to hear it.
          </p>
          <p>
            It is also the practical moment. Most families assume the stories will always be there — the ones told at dinner tables for years, about the first job, the motorbike, the house they could barely afford. They won't be, unless somebody thinks to ask and writes it down.
          </p>
          <p>
            Below is what each decade tends to bring up, and an honest look at how a life story book compares with the other things people buy for a milestone birthday.
          </p>
        </div>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <router-link to="/questions-to-ask-elderly-parents" class="text-xs text-[#7C5C3B] underline hover:no-underline">100 questions to ask elderly parents →</router-link>
          <span class="text-xs text-stone-300">·</span>
          <router-link to="/gifts-for-parents-who-have-everything" class="text-xs text-[#7C5C3B] underline hover:no-underline">Gifts for parents who have everything →</router-link>
        </div>
      </div>
    </section>

    <!-- Per-decade sections -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center mb-12">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">By decade</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">What each milestone brings up</h2>
        </div>
        <div v-for="decade in decades" :key="decade.slug" :id="decade.slug" class="mb-10 scroll-mt-8 rounded-2xl bg-white p-6 sm:p-8">
          <h3 class="font-display text-xl font-bold text-stone-900">{{ decade.heading }}</h3>
          <p class="mt-1 text-xs font-medium uppercase tracking-wider text-[#9C7C5C]">{{ decade.strapline }}</p>
          <div class="mt-4 space-y-3 text-sm leading-7 text-stone-600">
            <p v-for="para in decade.paragraphs" :key="para">{{ para }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- What a long life holds -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">What a long life holds</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Stories from a lifetime worth capturing</h2>
        </div>
        <div class="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          <div v-for="memory in memories" :key="memory.title" class="rounded-2xl border border-stone-200 p-5">
            <p class="text-xl" aria-hidden="true">{{ memory.icon }}</p>
            <p class="mt-3 text-sm font-semibold text-stone-900">{{ memory.title }}</p>
            <p class="mt-1 text-xs leading-5 text-stone-500">{{ memory.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Gift comparison -->
    <section class="bg-[#FAF7F4] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Milestone birthday gift ideas</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">What actually lasts</h2>
          <p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-600">
            An honest comparison, including the gifts we don't sell. Most of these are lovely — they just don't survive the year.
          </p>
        </div>
        <div class="mt-10 space-y-4">
          <div v-for="gift in gifts" :key="gift.title" class="rounded-2xl bg-white p-5">
            <div class="flex items-start gap-4">
              <span class="flex-shrink-0 text-2xl" aria-hidden="true">{{ gift.icon }}</span>
              <div class="flex-1">
                <div class="flex flex-wrap items-center justify-between gap-4">
                  <p class="text-sm font-semibold text-stone-900">{{ gift.title }}</p>
                  <span
                    class="flex-shrink-0 rounded-full px-3 py-1 text-xs font-medium"
                    :class="gift.highlight ? 'bg-[#7C5C3B] text-white' : 'bg-stone-100 text-stone-500'"
                  >{{ gift.tag }}</span>
                </div>
                <p class="mt-2 text-xs leading-5 text-stone-500">{{ gift.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- What they get -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">What they get</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">A life story book — in their own words</h2>
        </div>
        <div class="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          <div v-for="feature in features" :key="feature.title" class="rounded-2xl border border-stone-200 p-6">
            <p class="text-2xl" aria-hidden="true">{{ feature.icon }}</p>
            <p class="mt-3 text-sm font-semibold text-stone-900">{{ feature.title }}</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">{{ feature.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- How gifting works -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">How it works</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Simple to give, simple to receive</h2>
        </div>
        <div class="mt-10 space-y-6">
          <div v-for="step in steps" :key="step.number" class="flex items-start gap-5">
            <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#1C1917] text-sm font-bold text-white">{{ step.number }}</div>
            <div>
              <p class="text-sm font-semibold text-stone-900">{{ step.title }}</p>
              <p class="mt-1 text-xs leading-5 text-stone-500">{{ step.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Quote -->
    <section class="px-5 py-16 sm:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <p class="font-display text-xl italic leading-relaxed text-stone-700 sm:text-2xl">"He told me about a motorbike he saved up for two years to buy. I never knew that about him."</p>
        <p class="mt-4 text-sm text-[#9C7C5C]">— From a Tell Me Your Story keepsake</p>
      </div>
    </section>

    <!-- Pricing -->
    <section class="bg-[#FAF7F4] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Pricing</p>
        <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Choose the right gift</h2>
        <p class="mt-3 text-sm text-stone-500">One-time payment. Gift link sent instantly. No subscription.</p>
        <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="tier in tiers"
            :key="tier.name"
            class="rounded-3xl border p-5 text-center"
            :class="tier.featured ? 'border-[#7C5C3B] bg-white' : 'border-stone-200 bg-white'"
          >
            <p v-if="tier.featured" class="mb-2 text-[10px] font-semibold uppercase tracking-wider text-[#7C5C3B]">Recommended</p>
            <p class="text-xs font-medium text-stone-500">{{ tier.name }}</p>
            <p class="mt-2 text-2xl font-bold text-stone-900">£{{ tier.price }}</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">{{ tier.desc }}</p>
            <router-link
              to="/gift"
              class="mt-4 block rounded-full py-2 text-xs font-medium transition"
              :class="tier.featured ? 'bg-[#7C5C3B] text-white hover:opacity-90' : 'border border-stone-300 text-stone-700 hover:bg-stone-50'"
            >Gift this →</router-link>
          </div>
        </div>
        <p class="mt-4 text-xs text-stone-400">Add a printed book from {{ printFrom }} including UK delivery</p>
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
        <p class="mb-6 text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Related reading</p>
        <div class="grid gap-4 sm:grid-cols-3">
          <router-link
            v-for="link in relatedLinks"
            :key="link.to"
            :to="link.to"
            class="group rounded-2xl border border-stone-200 bg-white p-4 transition hover:border-[#7C5C3B]"
          >
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">{{ link.title }}</p>
            <p class="mt-1 text-xs text-stone-500">{{ link.desc }}</p>
          </router-link>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-[#1C1917] px-5 py-16 text-center sm:px-8 sm:py-20">
      <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">The birthday gift they'll never forget</p>
      <h2 class="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">Decades of stories. Captured forever.</h2>
      <p class="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#A8A29E]">
        Give them the gift of being heard — and give the whole family something they'll treasure for generations.
      </p>
      <router-link to="/gift" class="mt-8 inline-block rounded-full bg-[#C4A882] px-8 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Gift a life story today →</router-link>
      <p class="mt-4 text-xs text-[#9C7C5C]">Gift link sent instantly · One-time payment · Printed book from {{ printFrom }} including UK delivery</p>
    </section>

  </main>
</template>

<script setup lang="ts">
import { useSeo, SITE_URL } from '../composables/useSeo'
import { PRINTED_BOOK_FROM_PRICE } from '../lib/printPricing'

const printFrom = `£${PRINTED_BOOK_FROM_PRICE.toFixed(2)}`

/**
 * One section per decade, each with its own heading and anchor, so the page
 * still answers "70th birthday gift ideas" specifically. Replaces the four
 * separate pages at /60th-, /70th-, /80th- and /90th-birthday-gift-ideas,
 * which were ~50% identical to each other and earned nothing between them.
 */
const decades = [
  {
    age: '60th',
    slug: '60th-birthday',
    heading: '60th birthday gift ideas',
    strapline: 'The decade people start thinking about legacy',
    paragraphs: [
      "A 60th birthday is often the moment people start thinking seriously about legacy — what they've built, who they've loved, what they want to be remembered for. It's also the perfect moment for their family to make sure those stories are properly captured.",
      "The best 60th birthday gift isn't another experience or a trip. It's something that lasts — a record of a remarkable life, in their own words.",
    ],
  },
  {
    age: '70th',
    slug: '70th-birthday',
    heading: '70th birthday gift ideas',
    strapline: 'The decade the dinner-table stories should be written down',
    paragraphs: [
      "A 70th birthday is a milestone that makes people reflect. For the person turning 70, it's a natural moment to look back at everything they've lived through. For their family, it's a reminder that those stories — the ones they've told at dinner tables for years — should be properly captured before they're lost.",
      "The best 70th birthday gift isn't something they'll put in a drawer. It's something that lasts for generations.",
    ],
  },
  {
    age: '80th',
    slug: '80th-birthday',
    heading: '80th birthday gift ideas',
    strapline: 'Eight decades of change, lived first-hand',
    paragraphs: [
      "Someone turning 80 has lived through more change than almost any generation in history. They've seen the world transform around them. They carry memories of people, places, and moments that exist nowhere else.",
      "Most families assume these stories will always be there. They won't — unless someone thinks to ask. An 80th birthday is the moment to do that.",
    ],
  },
  {
    age: '90th',
    slug: '90th-birthday',
    heading: '90th birthday gift ideas',
    strapline: 'Living history, and the last chance to record it',
    paragraphs: [
      'Someone turning 90 was born in the 1930s or earlier. They have lived through the Second World War, the birth of the NHS, the moon landing, the internet, and everything in between. Their personal memories of those events are irreplaceable.',
      "A 90th birthday is not the time for another bouquet of flowers. It's the moment to capture something that will outlast all of you.",
    ],
  },
]

const memories = [
  { icon: '✈️', title: 'A world transformed', desc: "They've watched the world change beyond recognition — from black and white TVs to smartphones, from rationing to abundance." },
  { icon: '💑', title: 'Decades of love', desc: 'Marriages, losses, friendships spanning half a century. The people who shaped them and the relationships that defined their life.' },
  { icon: '👨‍👩‍👧', title: 'A family built', desc: 'Children raised, grandchildren watched grow up. The quiet sacrifices and the proudest moments of a parent and grandparent.' },
  { icon: '💪', title: 'Hardships survived', desc: "Things they've been through that the family may never fully know — and wisdom earned the hard way that deserves to be passed on." },
  { icon: '🌍', title: 'History lived', desc: "They've lived through events that are now in history books. Their personal memories of those moments are irreplaceable." },
  { icon: '🤍', title: 'Wisdom accumulated', desc: 'Decades of lessons, regrets, joys, and hard-won perspective. Things children and grandchildren need to hear.' },
]

const gifts = [
  { icon: '📖', title: 'A life story book — Tell Me Your Story', tag: 'Most meaningful', highlight: true, desc: 'Guide them through 100 questions covering every chapter of their life. Their answers become a beautifully designed keepsake book, printed and delivered to their door, with QR codes that play their voice. A gift that lasts for generations.' },
  { icon: '📸', title: 'Family photo album', tag: 'Sentimental', highlight: false, desc: 'Meaningful, but it captures moments without the stories behind them. Pairs well with a life story book, which gives those photos context.' },
  { icon: '🍽️', title: 'Family dinner or party', tag: 'Memorable', highlight: false, desc: "A celebration they'll remember, and the best possible occasion to hand over a keepsake in front of everyone." },
  { icon: '✈️', title: 'Trip or experience day', tag: 'Adventurous', highlight: false, desc: 'Great for someone still travelling. A memory in the moment — though the story behind it deserves capturing too.' },
  { icon: '💆', title: 'Spa or pamper day', tag: 'Treat', highlight: false, desc: 'A lovely treat, but not personal. Better as an accompanying gift than the main one.' },
  { icon: '🌸', title: 'Flowers or a plant', tag: 'Classic', highlight: false, desc: 'A thoughtful gesture, but gone within a week. Better alongside something that lasts.' },
]

const features = [
  { icon: '📖', title: '100+ guided questions', desc: 'Written for their life — childhood, work, family, love, and legacy. No blank page, no pressure.' },
  { icon: '🎙️', title: 'Voice recordings', desc: 'Answer by speaking. A QR code in the printed book lets family hear their voice any time — forever.' },
  { icon: '📚', title: 'Printed keepsake book', desc: `Professionally printed and bound, delivered to their door. Softcover from ${printFrom} including UK delivery.` },
  { icon: '⏱️', title: 'Answer at their pace', desc: 'One question a day or ten at once. Everything saves automatically, and nothing expires.' },
  { icon: '✨', title: 'Easy to use', desc: 'Works on phone, tablet, or computer. Simple enough for anyone at any age.' },
  { icon: '🤍', title: 'Share with family', desc: 'Children, grandchildren and great-grandchildren can all read along as the story grows.' },
]

const steps = [
  { number: '1', title: 'Choose a gift', desc: 'Pick from Story, Story + Photos, All Stories, or Premium. One-time payment, no subscription.' },
  { number: '2', title: 'Get your gift link instantly', desc: 'A unique gift link is emailed to you immediately. Share it on their birthday — or before.' },
  { number: '3', title: 'They start their story', desc: 'They open the link, create a free account, and start answering questions whenever they feel like it.' },
  { number: '4', title: 'Order the printed book', desc: "When they're ready, order a professionally printed book delivered to the door." },
]

const tiers = [
  { name: 'Story Gift',     price: '3.99',  desc: 'PDF keepsake for one story',           featured: false },
  { name: 'Story + Photos', price: '7.99',  desc: 'PDF with photos included',             featured: true  },
  { name: 'All Stories',    price: '11.99', desc: 'All 7 story types unlocked',           featured: false },
  { name: 'Premium',        price: '17.99', desc: 'Photos, premium layouts, all stories', featured: false },
]

const relatedLinks = [
  { to: '/gifts-for-parents-who-have-everything', title: 'Gifts for Parents Who Have Everything', desc: 'The gift no one else can give' },
  { to: '/questions-to-ask-elderly-parents',      title: 'Questions to Ask Elderly Parents',      desc: '100 questions to draw out their stories' },
  { to: '/anniversary-gift-ideas',                title: 'Anniversary Gift Ideas',                desc: 'A love story captured forever' },
]

// Shown on the page AND used for the FAQPage schema, so they always match.
const faqs = [
  {
    q: 'What do you buy someone turning 70 or 80 who has everything?',
    a: 'Something they cannot buy themselves. By that age most people have all the objects they need, and the thing missing from the family is a proper record of their life — in their own voice, not summarised by somebody else. That is the one gift that gets more valuable rather than less.',
  },
  {
    q: 'Will an older person actually manage it?',
    a: 'Most do, and the ones who struggle with typing use the voice option instead — they speak the answer and it is saved as audio. It works on a phone, tablet or computer, asks one question at a time, and saves as it goes, so there is no pressure to finish anything in one sitting.',
  },
  {
    q: 'How far in advance should I give it?',
    a: 'The gift link arrives immediately, so you can buy it the night before. If you want a printed book in their hands on the day, allow about three weeks for them to answer enough questions plus ten to fourteen days for printing and UK delivery.',
  },
  {
    q: 'Can the whole family chip in?',
    a: 'Yes. One person buys the gift, and the storyteller can then invite relatives by link so a brother in Australia and a grandchild down the road can both add to the same book. It is a common way to handle a milestone birthday present between several people.',
  },
  {
    q: 'What if they never finish it?',
    a: 'Nothing expires and there is no subscription running down, so a half-finished story stays exactly where it is until they come back to it. Ten good answers already make a book worth printing — you do not need all hundred.',
  },
]

useSeo({
  title: 'Milestone Birthday Gift Ideas — 60th, 70th, 80th & 90th',
  description: 'The most meaningful gift for a 60th, 70th, 80th or 90th birthday: their life story in a keepsake book, with their voice inside. Gift link sent instantly.',
  canonical: 'https://tellmeyourstory.uk/milestone-birthday-gift-ideas',
  schema: {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FAQPage',
        '@id': `${SITE_URL}/milestone-birthday-gift-ideas#faq`,
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${SITE_URL}/milestone-birthday-gift-ideas#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Milestone Birthday Gift Ideas', item: `${SITE_URL}/milestone-birthday-gift-ideas` },
        ],
      },
      {
        '@type': 'ItemList',
        '@id': `${SITE_URL}/milestone-birthday-gift-ideas#decades`,
        name: 'Milestone birthday gift ideas by decade',
        numberOfItems: decades.length,
        itemListElement: decades.map((decade, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: decade.heading,
          url: `${SITE_URL}/milestone-birthday-gift-ideas#${decade.slug}`,
        })),
      },
    ],
  },
})
</script>

<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
</style>
