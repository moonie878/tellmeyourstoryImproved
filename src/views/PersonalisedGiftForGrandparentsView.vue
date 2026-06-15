<template>
  <main class="bg-white">

    <!-- Hero -->
    <section class="bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Personalised Gifts for Grandparents</p>
        <h1 class="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          Personalised gifts for grandparents<br>
          <em class="text-[#C4A882] italic">that actually mean something</em>
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#A8A29E]">
          The best personalised gifts for grandparents go beyond a name on a mug. They capture a moment, honour a relationship, or preserve something that matters. Here are the ideas worth considering — from simple to significant.
        </p>
      </div>
    </section>

    <!-- Intro -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">What makes a good personalised gift</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">It's not the personalisation — it's the thought behind it</h2>
        </div>
        <div class="mt-8 text-sm leading-7 text-stone-600 max-w-xl mx-auto space-y-4">
          <p>Truly personalised gifts aren't just objects with a name on them. They show that you paid attention — that you noticed something specific about this person, their life, or what matters to them, and you found a way to reflect that back.</p>
          <p>For grandparents, the most meaningful gifts tend to do one of three things: they capture memories that might otherwise be lost, they honour the relationship in a way that feels genuine, or they give the grandparent something beautiful to share with the rest of the family.</p>
          <p>The gifts below range from the simple and affordable to the significant and lasting. The best one depends on your grandparent, your budget, and the occasion — but all of them are more personal than a box of chocolates.</p>
        </div>
        <div class="mt-6 flex flex-wrap justify-center gap-3">
          <router-link to="/70th-birthday-gift-ideas" class="text-xs text-[#7C5C3B] underline hover:no-underline">70th birthday gifts →</router-link>
          <span class="text-xs text-stone-300">·</span>
          <router-link to="/80th-birthday-gift-ideas" class="text-xs text-[#7C5C3B] underline hover:no-underline">80th birthday gifts →</router-link>
          <span class="text-xs text-stone-300">·</span>
          <router-link to="/gifts-for-parents-who-have-everything" class="text-xs text-[#7C5C3B] underline hover:no-underline">Gifts for people who have everything →</router-link>
        </div>
      </div>
    </section>

    <!-- Gift ideas -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Gift ideas</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Personalised gifts for grandparents by category</h2>
        </div>
        <div class="mt-10 space-y-10">
          <div v-for="category in categories" :key="category.title">
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

    <!-- Life story as gift -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">The most personal gift of all</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">A life story book — in their own words</h2>
        </div>
        <div class="mt-8 text-sm leading-7 text-stone-600 max-w-xl mx-auto space-y-4">
          <p>The most personal gift you can give a grandparent isn't something you buy — it's something you create together. A life story book captures their memories, their voice, and the stories they've been carrying their whole lives — and turns them into something the whole family can hold and hear.</p>
          <p>Tell Me Your Story guides them through 100 questions covering every chapter of their life — childhood, school, work, love, family, hard times, and legacy. They answer by typing or speaking. Their voice is recorded and preserved with QR codes in the printed book, so family can hear them tell the stories in their own words, even years from now.</p>
          <p>It's the most meaningful gift many families ever make. And it's free to start — no card needed, no subscription. The printed hardcover book is from £34.98 including UK delivery.</p>
        </div>
        <div class="mt-8 rounded-2xl bg-[#1C1917] p-8 text-center">
          <p class="font-display text-lg font-bold text-white">Create a life story book for your grandparent</p>
          <p class="mt-2 text-sm text-stone-400">Free to start. 100 guided questions. Printed book from £34.98.</p>
          <router-link to="/register" class="mt-6 inline-block rounded-full bg-[#C4A882] px-7 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Start free →</router-link>
        </div>
      </div>
    </section>

    <!-- Occasions -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">By occasion</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">What to give for each occasion</h2>
        </div>
        <div class="mt-10 grid gap-5 sm:grid-cols-2">
          <div v-for="occasion in occasions" :key="occasion.title" class="rounded-2xl bg-white p-6">
            <p class="text-sm font-semibold text-stone-900">{{ occasion.title }}</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">{{ occasion.desc }}</p>
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
          <router-link to="/70th-birthday-gift-ideas" class="rounded-2xl border border-stone-200 bg-white p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">70th Birthday Gift Ideas</p>
            <p class="mt-1 text-xs text-stone-500">Meaningful gifts for a 70th birthday</p>
          </router-link>
          <router-link to="/christmas-gift-ideas-for-grandparents" class="rounded-2xl border border-stone-200 bg-white p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Christmas Gifts for Grandparents</p>
            <p class="mt-1 text-xs text-stone-500">Ideas for Christmas giving</p>
          </router-link>
          <router-link to="/gifts-for-parents-who-have-everything" class="rounded-2xl border border-stone-200 bg-white p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Gifts for People Who Have Everything</p>
            <p class="mt-1 text-xs text-stone-500">When nothing obvious comes to mind</p>
          </router-link>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-[#1C1917] px-5 py-16 text-center sm:px-8 sm:py-20">
      <h2 class="font-display text-2xl font-bold text-white sm:text-3xl">Give them something that lasts</h2>
      <p class="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#A8A29E]">Start a life story book for your grandparent today — free to start, no card needed.</p>
      <router-link to="/register" class="mt-8 inline-block rounded-full bg-[#C4A882] px-8 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Start free →</router-link>
      <p class="mt-4 text-xs text-[#9C7C5C]">Free to start · One-time payment · Printed book from £34.98</p>
    </section>

  </main>
</template>

<script setup lang="ts">
import { useSeo } from '../composables/useSeo'

const categories = [
  {
    icon: '📖', title: 'Memory and story gifts',
    gifts: [
      { title: 'A life story book', desc: 'The most personal gift you can give — a beautifully printed book capturing their memories, voice, and stories in their own words. Tell Me Your Story guides them through 100 questions and produces a printed hardcover with voice QR codes. Free to start.', price: 'Free to start · Printed book from £34.98' },
      { title: 'A personalised photo book', desc: 'A printed photo book with captions telling the story behind each image. Services like Photobox, Snapfish, and Cheerz let you design one online. The key is the captions — a photo without context is just a photo.', price: '£15–£40' },
      { title: 'A family recipe book', desc: 'Collect family recipes — from the grandparent and from other family members — and compile them into a printed book. Add photos and the stories behind each recipe. A lasting record of the family\'s food culture.', price: '£20–£60 to produce' },
      { title: 'A commissioned family portrait', desc: 'A hand-drawn or painted family portrait based on a favourite photograph. Several UK illustrators offer this service. Choose a style that suits the recipient — from realistic watercolour to charming illustration.', price: '£50–£200' },
    ]
  },
  {
    icon: '🌟', title: 'Personalised keepsakes',
    gifts: [
      { title: 'A star map', desc: 'A printed map of the night sky on a significant date — their birthday, wedding anniversary, or the date a grandchild was born. Several UK services offer high-quality prints. A genuinely beautiful and personal gift.', price: '£20–£60' },
      { title: 'A personalised book of reasons', desc: 'A small book filled with reasons you love them — specific, honest, and handwritten. The most meaningful version is entirely personal rather than bought from a template. Start with 30 reasons and see where it leads.', price: 'Cost of materials only' },
      { title: 'An engraved keepsake', desc: 'A quality object — a watch, a piece of jewellery, a pen, a hip flask — engraved with a meaningful date, initials, or a short message. Lasting, personal, and usable. Choose something they\'ll actually use rather than display.', price: '£30–£150' },
      { title: 'A personalised map print', desc: 'A beautifully designed map of a place that matters to them — where they grew up, where they met their partner, where they spent their happiest years. UK services like Mapiful or Mappy let you design these online.', price: '£20–£50' },
    ]
  },
  {
    icon: '🌱', title: 'Living and lasting gifts',
    gifts: [
      { title: 'A named star', desc: 'Register a star in their name — symbolic rather than official, but a beautiful gesture. Several services provide framed certificates with star coordinates. Particularly meaningful for grandparents who love astronomy or the night sky.', price: '£20–£50' },
      { title: 'A tree planted in their honour', desc: 'Plant a tree in their garden or through a UK woodland charity in their name. A living memorial that grows with time. Several UK charities offer tree dedication services with a certificate.', price: '£15–£60' },
      { title: 'A heritage rose', desc: 'A named heritage rose planted in their garden — particularly meaningful if they\'re a gardener. UK nurseries like David Austin Roses offer a huge range of heritage varieties with beautiful names and histories.', price: '£15–£30' },
      { title: 'A charitable donation in their name', desc: 'A donation to a cause they care about, with a personalised card explaining the gift and why you chose that charity. Particularly meaningful for grandparents who already have everything they need.', price: 'Any amount' },
    ]
  },
  {
    icon: '🤍', title: 'Experience gifts',
    gifts: [
      { title: 'A professional family photoshoot', desc: 'A session with a family photographer — ideally including multiple generations. The prints become personalised gifts in themselves. Many photographers offer packages that include framed prints or a photo book.', price: '£150–£400' },
      { title: 'An afternoon tea for two', desc: 'Book afternoon tea at a hotel or tearoom they\'ve always wanted to visit, or one with special meaning — where they went on a first date, where they got married, somewhere they loved visiting when the children were young.', price: '£40–£100' },
      { title: 'A heritage day out', desc: 'A visit to a place connected to their history — the town they grew up in, a museum covering their era, a National Trust property they\'ve always wanted to visit. Make a day of it: research beforehand, visit together, then ask them to tell you about what they see.', price: '£0–£50' },
      { title: 'A curated day of favourite things', desc: 'A day built entirely around them — their favourite breakfast, their favourite walk, their favourite film in the evening, their favourite meal. No compromise. Entirely theirs. Often the most appreciated gift of all.', price: 'Cost of materials only' },
    ]
  },
]

const occasions = [
  { title: 'Birthday (70th, 80th, 90th)', desc: 'A life story book is the standout choice for milestone birthdays — it marks the occasion with something permanent and meaningful. Photo books and family portraits also work well. Avoid generic keepsakes.' },
  { title: 'Christmas', desc: 'Experience gifts work well at Christmas — afternoon tea, a family photoshoot, a heritage day out. For something to unwrap, a personalised photo book of the year that\'s passing is always appreciated.' },
  { title: 'Mother\'s Day / Father\'s Day', desc: 'A handmade book of reasons, a star map on their wedding anniversary date, or starting a life story book together on the day — all of these are more meaningful than flowers or chocolates.' },
  { title: 'Anniversary', desc: 'A star map of the night sky on their wedding day, a photo book of their life together, or a life story book with a focus on their relationship. The most personal anniversary gifts always reference the relationship itself.' },
  { title: 'No occasion at all', desc: 'Often the most meaningful gifts aren\'t for any occasion — they\'re just because. A handwritten letter, a book of reasons you love them, or starting to capture their life story any ordinary Tuesday.' },
  { title: 'When they\'re ill or facing end of life', desc: 'A life story book is the most meaningful gift for someone who is ill. It gives them a project, a legacy, and a way to feel heard. Start it with them while they can still contribute — the process is as meaningful as the finished book.' },
]

const faqs = [
  { q: 'What is the best personalised gift for a grandparent?', a: 'The best personalised gifts for grandparents capture something specific about them — their history, their relationship with the family, or the memories they want to preserve. A life story book, a family portrait, a recipe book, or a personalised photo book all do this well. The key is specificity — something that could only be given to them.' },
  { q: 'What can you get a grandparent who has everything?', a: 'For grandparents who have everything they need materially, the most meaningful gifts are experiences, memories, or something that captures their story. A life story book, an afternoon tea at somewhere special, a day built entirely around them, or a charitable donation in their name.' },
  { q: 'What is a good gift for a grandparent\'s 80th birthday?', a: 'An 80th birthday deserves something significant. A life story book — capturing 80 years of memories in a beautifully printed hardcover — is the most meaningful option. A family photoshoot, a commissioned portrait, or a personalised map of somewhere significant in their life also work well for milestone birthdays.' },
  { q: 'What personalised gifts do grandparents actually like?', a: 'Grandparents tend to appreciate gifts that involve the family — photos, family history, experiences shared together — over novelty items. The gifts that get used and treasured are ones that feel personal, not generic. A photo book with captions, a recipe collection, or a life story book all score highly.' },
]

useSeo({
  title: 'Personalised Gifts for Grandparents — Ideas That Actually Mean Something | Tell Me Your Story',
  description: 'Personalised gift ideas for grandparents that go beyond a name on a mug — memory gifts, keepsakes, experiences, and how to capture their life story in a printed book. Free to start.',
  canonical: 'https://tellmeyourstory.uk/personalised-gift-for-grandparents',
  schema: {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'What is the best personalised gift for a grandparent?', acceptedAnswer: { '@type': 'Answer', text: 'The best personalised gifts capture something specific about them. A life story book, a family portrait, a recipe book, or a personalised photo book all work well. The key is specificity — something that could only be given to them.' } },
          { '@type': 'Question', name: 'What can you get a grandparent who has everything?', acceptedAnswer: { '@type': 'Answer', text: 'For grandparents who have everything materially, the most meaningful gifts are experiences, memories, or something that captures their story. A life story book, an afternoon tea, or a charitable donation in their name.' } },
          { '@type': 'Question', name: 'What is a good gift for a grandparent\'s 80th birthday?', acceptedAnswer: { '@type': 'Answer', text: 'A life story book capturing 80 years of memories in a beautifully printed hardcover is the most meaningful option. A family photoshoot, commissioned portrait, or personalised map also work well for milestone birthdays.' } },
        ]
      }
    ]
  }
})
</script>

<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
</style>