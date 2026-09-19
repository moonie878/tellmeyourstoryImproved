<template>
  <main class="bg-white">

    <!-- Hero -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#86664A]">Guides</p>
        <h1 class="mt-4 font-display text-3xl font-bold leading-tight text-stone-900 sm:text-4xl md:text-5xl">
          Helping you capture a life story
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-base leading-7 text-stone-600">
          Questions to ask, how to record them, gift ideas, and honest comparisons —
          everything we've written for families keeping a loved one's story.
        </p>

        <!-- Jump to a section -->
        <nav class="mt-8 flex flex-wrap justify-center gap-2" aria-label="Guide topics">
          <a
            v-for="group in groups"
            :key="group.id"
            :href="`#${group.id}`"
            class="inline-flex min-h-[44px] items-center rounded-full border border-[#E8DDD0] bg-white px-4 text-sm font-medium text-stone-700 transition hover:border-[#7C5C3B] hover:text-[#7C5C3B]"
          >
            {{ group.title }}
          </a>
        </nav>
      </div>
    </section>

    <!-- Groups -->
    <div class="px-5 py-14 sm:px-8 sm:py-16">
      <div class="mx-auto max-w-5xl space-y-16">
        <section v-for="group in groups" :id="group.id" :key="group.id" class="scroll-mt-24" :aria-labelledby="`${group.id}-title`">
          <h2 :id="`${group.id}-title`" class="font-display text-2xl font-bold text-stone-900 sm:text-3xl">{{ group.title }}</h2>
          <p class="mt-2 max-w-2xl text-base text-stone-600">{{ group.intro }}</p>

          <ul class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <li v-for="guide in group.guides" :key="guide.to">
              <router-link
                :to="guide.to"
                class="group flex h-full flex-col rounded-2xl border border-stone-200 p-5 transition hover:border-[#7C5C3B] hover:shadow-sm"
              >
                <span class="text-base font-semibold text-stone-900 group-hover:text-[#7C5C3B]">{{ guide.title }}</span>
                <span class="mt-2 text-sm leading-6 text-stone-600">{{ guide.summary }}</span>
                <span class="mt-auto pt-3 text-sm font-medium text-[#7C5C3B]" aria-hidden="true">Read →</span>
              </router-link>
            </li>
          </ul>
        </section>
      </div>
    </div>

    <!-- Lead magnet + CTA -->
    <section class="bg-[#1C1917] px-5 py-16 text-center sm:px-8 sm:py-20">
      <h2 class="font-display text-2xl font-bold text-white sm:text-3xl">Ready to start their story?</h2>
      <p class="mx-auto mt-4 max-w-lg text-base leading-7 text-stone-300">
        Answer 5 guided questions free — type or speak — and see how it feels. No card needed.
      </p>
      <div class="mt-8 flex flex-wrap justify-center gap-3">
        <router-link to="/register" class="inline-flex min-h-[48px] items-center rounded-full bg-[#C4A882] px-7 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">
          Try 5 questions free →
        </router-link>
        <router-link to="/resources/50-questions-printable" class="inline-flex min-h-[48px] items-center rounded-full border border-white/25 px-7 text-sm font-medium text-white transition hover:bg-white/10">
          Get the free 50-question printable
        </router-link>
      </div>
    </section>

  </main>
</template>

<script setup lang="ts">
import { useSeo } from '../composables/useSeo'

// Every link must be a real route — keep in sync with src/router/index.ts.
const groups = [
  {
    id: 'questions',
    title: 'Questions to ask',
    intro: 'The right question unlocks the story. Start with these.',
    guides: [
      { to: '/blog/questions-to-ask-your-parents', title: 'Questions to ask your parents', summary: 'The questions that get past "it was fine" — childhood, love, work and what they learned.' },
      { to: '/questions-to-ask-your-mum', title: 'Questions to ask your mum', summary: 'Prompts about her childhood, becoming a mum, and the things she has never said out loud.' },
      { to: '/questions-to-ask-your-dad', title: 'Questions to ask your dad', summary: 'Easy ways into the stories dads rarely tell unless someone asks.' },
      { to: '/questions-to-ask-your-grandma', title: 'Questions to ask your grandma', summary: 'Growing up, family life and the world she remembers.' },
      { to: '/questions-to-ask-your-grandad', title: 'Questions to ask your grandad', summary: 'Work, service, first loves and the lessons he would pass on.' },
      { to: '/questions-to-ask-your-grandparents', title: 'Questions to ask your grandparents', summary: 'A set that works for either grandparent — or both together.' },
      { to: '/questions-to-ask-elderly-parents', title: 'Questions for elderly parents', summary: 'Gentle questions for later life, when there is more to look back on.' },
      { to: '/questions-about-childhood', title: 'Questions about childhood', summary: 'Homes, schools, games and the smells and sounds of growing up.' },
      { to: '/questions-about-family-history', title: 'Questions about family history', summary: 'Where the family came from, and the people before them.' },
      { to: '/life-story-questions', title: 'Life story questions', summary: 'A full set covering every chapter of a life.' },
      { to: '/life-story-interview-questions', title: 'Life story interview questions', summary: 'For sitting down together and recording a longer conversation.' },
      { to: '/oral-history-questions', title: 'Oral history questions', summary: 'Questions shaped for recording a spoken history.' },
      { to: '/questions-to-ask-dying-parent', title: 'Questions to ask a dying parent', summary: 'Tender questions for the time that is left, and how to ask them.' },
      { to: '/end-of-life-questions-to-ask-parents', title: 'End of life questions', summary: 'What matters most, what they want remembered, and what they wish for you.' },
      { to: '/resources/50-questions-printable', title: 'Free 50-question printable', summary: 'Our favourite questions on one page — print it or keep it on your phone.' },
    ],
  },
  {
    id: 'how-to',
    title: 'How to capture their story',
    intro: 'Practical guides for getting the stories down — in words or in their own voice.',
    guides: [
      { to: '/blog/how-to-record-your-parents-life-story', title: "How to record your parents' life story", summary: 'A step-by-step approach, from the first question to a finished book.' },
      { to: '/how-to-capture-parents-life-story', title: "How to capture a parent's life story", summary: 'Choosing an approach that suits them — writing, talking, or both.' },
      { to: '/how-to-record-grandparents-story', title: "How to record a grandparent's story", summary: 'Recording their voice so the family can hear them for years to come.' },
      { to: '/blog/what-to-do-when-a-parent-wont-open-up', title: "When a parent won't open up", summary: 'What to try when the answers are short, or the subject is hard.' },
      { to: '/how-to-write-a-life-story', title: 'How to write a life story', summary: 'Turning memories into chapters that read well.' },
      { to: '/write-your-own-life-story', title: 'Write your own life story', summary: 'For anyone who wants to leave their own story for the family.' },
      { to: '/legacy-letter-to-children', title: 'Writing a legacy letter', summary: 'How to write a letter your children will keep.' },
      { to: '/what-is-a-life-story-book', title: 'What is a life story book?', summary: 'What goes in one, and the different ways to make one.' },
    ],
  },
  {
    id: 'gifts',
    title: 'Gift ideas',
    intro: 'Meaningful gifts for the people who say they don\'t want anything.',
    guides: [
      { to: '/christmas-gifts-for-grandparents', title: 'Christmas gifts for grandparents', summary: 'Their life story in their own voice — and other gifts they will keep.' },
      { to: '/meaningful-christmas-gifts', title: 'Meaningful Christmas gifts', summary: 'Ideas that get kept long after the wrapping paper is gone.' },
      { to: '/christmas-gift-for-parents-who-have-everything', title: 'Christmas gifts for parents who have everything', summary: 'When they really don\'t need more things.' },
      { to: '/gifts-for-parents-who-have-everything', title: 'Gifts for parents who have everything', summary: 'Year-round ideas built around time and memories.' },
      { to: '/personalised-gift-for-grandparents', title: 'Personalised gifts for grandparents', summary: 'Gifts that could only be for them.' },
      { to: '/mothers-day-gift-ideas', title: "Mother's Day gift ideas", summary: 'For Mothering Sunday — something more lasting than flowers.' },
      { to: '/fathers-day-gift-for-grandad', title: "Father's Day gifts for grandad", summary: 'Ideas for grandads who are hard to buy for.' },
      { to: '/60th-birthday-gift-ideas', title: '60th birthday gift ideas', summary: 'Marking six decades with something personal.' },
      { to: '/70th-birthday-gift-ideas', title: '70th birthday gift ideas', summary: 'Gifts that celebrate a life well lived.' },
      { to: '/80th-birthday-gift-ideas', title: '80th birthday gift ideas', summary: 'Meaningful ideas for a big milestone.' },
      { to: '/90th-birthday-gift-ideas', title: '90th birthday gift ideas', summary: 'Capturing ninety years of stories.' },
      { to: '/anniversary-gift-ideas', title: 'Anniversary gift ideas', summary: 'The story of a marriage, told by the people in it.' },
      { to: '/unique-gift-for-elderly-parents', title: 'Unique gifts for elderly parents', summary: 'Thoughtful ideas for parents in later life.' },
    ],
  },
  {
    id: 'compare',
    title: 'Compare options',
    intro: 'Honest, fact-checked comparisons — including when another option suits you better.',
    guides: [
      { to: '/best-memory-book-apps-uk', title: 'Best memory book apps (UK)', summary: 'Five options compared on price, voice recording and printed books.' },
      { to: '/storyworth-alternative', title: 'Storyworth alternative (UK)', summary: 'How a one-time payment with voice compares with an annual plan.' },
      { to: '/storyworth-review', title: 'Storyworth review', summary: 'What Storyworth does well, where it falls short, and what it costs in pounds.' },
      { to: '/storyworth-vs-remento', title: 'Storyworth vs Remento', summary: 'Email-first versus voice-first, compared for UK families.' },
      { to: '/storykeeper-vs-storyworth', title: 'StoryKeeper vs Storyworth', summary: 'One-time versus annual, side by side.' },
      { to: '/storykeeper-review', title: 'StoryKeeper review', summary: 'What £79 or £99 gets you, and who it suits.' },
      { to: '/remento-review', title: 'Remento review', summary: 'How the voice recording and AI writing work, and the real costs from the UK.' },
      { to: '/tell-me-your-story-journal-alternative', title: '"Tell Me Your Story" journals', summary: 'Paper guided journals compared with a version that keeps their voice.' },
      { to: '/memory-book-vs-memory-box', title: 'Memory book vs memory box', summary: 'Which keeps the stories better — and when to have both.' },
    ],
  },
  {
    id: 'care',
    title: 'Care and later life',
    intro: 'For families, carers and professionals supporting someone in later life.',
    guides: [
      { to: '/life-story-work-in-care-homes', title: 'Life story work in care homes', summary: 'How life stories help staff know the person, not just the care plan.' },
      { to: '/dementia-life-story-book', title: 'Dementia life story book', summary: 'Making a book that supports memory, conversation and good care.' },
      { to: '/reminiscence-therapy-life-story', title: 'Reminiscence therapy', summary: 'Using life story work for connection and wellbeing.' },
      { to: '/end-of-life-gift', title: 'End of life gifts', summary: 'Gentle, meaningful ideas for the time that matters most.' },
    ],
  },
  {
    id: 'memorial',
    title: 'Remembering someone',
    intro: 'For celebrating a life, and keeping someone close after they have gone.',
    guides: [
      { to: '/blog/how-to-make-a-memorial-tribute-video', title: 'How to make a tribute video', summary: 'A step-by-step guide to a memorial video with photos and music.' },
      { to: '/blog/celebration-of-life-video', title: 'Celebration of life video', summary: 'Ideas for a video that celebrates who they were.' },
      { to: '/blog/free-memorial-slideshow-maker', title: 'Free memorial slideshow maker', summary: 'How to make a memorial slideshow without paying for software.' },
      { to: '/blog/funeral-slideshow-ideas', title: 'Funeral slideshow ideas', summary: 'Photo choices, music and structure for a funeral slideshow.' },
      { to: '/how-to-write-an-obituary', title: 'How to write an obituary', summary: 'What to include, and examples to help you start.' },
      { to: '/memorial-book', title: 'Memorial book', summary: 'Gathering stories and memories into a book to keep.' },
      { to: '/bereavement-gift-ideas', title: 'Bereavement gift ideas', summary: 'Thoughtful ways to support someone who is grieving.' },
    ],
  },
]

useSeo({
  title: 'Life Story Guides — Questions, How-Tos and Gift Ideas | Tell Me Your Story',
  description: 'Every guide in one place: questions to ask your parents and grandparents, how to record their stories, gift ideas, honest comparisons, and guides for later life and remembrance.',
  schema: {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Life story guides',
    url: 'https://tellmeyourstory.uk/guides',
    hasPart: groups.flatMap((g) =>
      g.guides.map((guide) => ({ '@type': 'WebPage', name: guide.title, url: `https://tellmeyourstory.uk${guide.to}` })),
    ),
  },
})
</script>

<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
</style>