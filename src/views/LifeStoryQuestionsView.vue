<template>
  <main class="bg-white">

    <!-- Hero -->
    <section class="bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Life Story Questions</p>
        <h1 class="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          {{ totalQuestions }} life story questions<br>
          <em class="text-[#C4A882] italic">to ask someone you love</em>
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#A8A29E]">
          The best life story questions don't just get answers — they unlock memories, invite reflection, and reveal the person behind the facts. These {{ totalQuestions }} questions cover every chapter of a life, free to use and free to print.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <router-link to="/register" class="rounded-full bg-[#C4A882] px-7 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Start capturing their story free →</router-link>
          <router-link to="/example" class="rounded-full border border-white/20 px-7 py-3 text-sm font-medium text-white transition hover:bg-white/10">See an example</router-link>
        </div>
        <p class="mt-5 text-xs text-[#9C7C5C]">
          {{ chapters.length }} chapters · {{ totalQuestions }} questions · no sign-up needed to read them
        </p>
      </div>
    </section>

    <!-- Jump to a chapter -->
    <section class="border-b border-stone-200 px-5 py-8 sm:px-8">
      <div class="mx-auto max-w-4xl">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C] text-center">Jump to a chapter</p>
        <div class="mt-5 flex flex-wrap justify-center gap-2">
          <a
            v-for="chapter in chapters"
            :key="chapter.slug"
            :href="`#${chapter.slug}`"
            class="rounded-full border border-stone-200 px-4 py-2 text-xs text-stone-600 transition hover:border-[#7C5C3B] hover:text-[#7C5C3B]"
          >
            <span aria-hidden="true">{{ chapter.icon }}</span>
            {{ chapter.short }}
          </a>
        </div>
      </div>
    </section>

    <!-- What makes a good question -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">What makes a good question</p>
        <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Questions that unlock stories</h2>
        <div class="mt-6 space-y-4 text-left text-sm leading-7 text-stone-600">
          <p>
            Most people asked "so what was your life like?" will say "oh, nothing special". It isn't modesty — it's that the question is too big to answer. A whole life has no shape until you break it into moments, and a moment is something anyone can describe.
          </p>
          <p>
            So the questions below are deliberately small. Not "did you have a happy childhood" but "what did your bedroom look like". Not "what was work like" but "what did you spend your first proper wages on". Specific questions get specific answers, and specific answers are the ones a family actually wants to keep.
          </p>
        </div>
        <div class="mt-8 grid gap-5 sm:grid-cols-2 text-left">
          <div class="rounded-2xl bg-red-50 p-5">
            <p class="text-xs font-semibold uppercase tracking-wider text-red-400">Avoid</p>
            <ul class="mt-3 space-y-2 text-xs text-stone-500">
              <li>✗ "Did you have a happy childhood?" — yes/no</li>
              <li>✗ "What did you do for work?" — too broad</li>
              <li>✗ "Do you have any regrets?" — too heavy</li>
              <li>✗ "What was your life like?" — too vague</li>
            </ul>
          </div>
          <div class="rounded-2xl bg-green-50 p-5">
            <p class="text-xs font-semibold uppercase tracking-wider text-green-500">Use instead</p>
            <ul class="mt-3 space-y-2 text-xs text-stone-500">
              <li>✓ "What is your earliest memory?" — specific</li>
              <li>✓ "What was your first day at work like?" — vivid</li>
              <li>✓ "Is there something you'd do differently?" — gentler</li>
              <li>✓ "What did a typical Sunday look like?" — concrete</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- How to ask -->
    <section class="bg-[#FAF7F4] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">How to ask them</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Six things that make the difference</h2>
        </div>
        <ol class="mt-10 space-y-6">
          <li v-for="(tip, i) in askingTips" :key="tip.title" class="flex gap-4">
            <span class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#7C5C3B] text-xs font-semibold text-white">{{ i + 1 }}</span>
            <div>
              <p class="text-sm font-semibold text-stone-900">{{ tip.title }}</p>
              <p class="mt-1 text-sm leading-7 text-stone-600">{{ tip.body }}</p>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <!-- Questions -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="text-center mb-12">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">{{ totalQuestions }} questions</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Life story questions by chapter</h2>
          <p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-600">
            Work through them in order, or pick the chapter that suits the mood. Nobody needs to answer all {{ totalQuestions }} — ten good answers make a book worth keeping.
          </p>
        </div>
        <div v-for="chapter in chapters" :key="chapter.title" :id="chapter.slug" class="mb-12 scroll-mt-8">
          <h3 class="font-display text-lg font-bold text-stone-900 mb-2 flex items-center gap-2">
            <span aria-hidden="true">{{ chapter.icon }}</span>
            <span>{{ chapter.title }}</span>
          </h3>
          <p class="mb-4 text-xs text-stone-500">{{ chapter.questions.length }} questions — {{ chapter.note }}</p>
          <div class="grid gap-3 sm:grid-cols-2">
            <div v-for="q in chapter.questions" :key="q" class="rounded-2xl bg-white p-4 text-sm text-stone-700 leading-5">{{ q }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════ -->
    <!-- EMAIL CAPTURE                           -->
    <!-- ═══════════════════════════════════════ -->
    <section class="reveal px-5 py-14 sm:px-8 sm:py-16">
      <div class="mx-auto max-w-5xl">
        <EmailCaptureForm source="Life-story-questions" />
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

    <!-- Related reading -->
    <section class="bg-[#F5F0E8] px-5 py-12 sm:px-8">
      <div class="mx-auto max-w-3xl">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C] mb-6">Related reading</p>
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <router-link
            v-for="link in relatedLinks"
            :key="link.to"
            :to="link.to"
            class="rounded-2xl border border-stone-200 bg-white p-4 transition hover:border-[#7C5C3B] group"
          >
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">{{ link.title }}</p>
            <p class="mt-1 text-xs text-stone-500">{{ link.desc }}</p>
          </router-link>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-[#1C1917] px-5 py-16 text-center sm:px-8 sm:py-20">
      <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Make it easy</p>
      <h2 class="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">Or let the questions come to them</h2>
      <p class="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#A8A29E]">
        Reading a list is the easy part — getting the answers written down is the hard part. Tell Me Your Story guides your loved one through 100 questions built into the app, one at a time, and turns every answer into a beautifully printed keepsake book. They can type, or simply speak.
      </p>
      <router-link to="/register" class="mt-8 inline-block rounded-full bg-[#C4A882] px-8 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Start free today →</router-link>
      <p class="mt-4 text-xs text-[#9C7C5C]">5 questions free · One-time payment · Printed book from {{ printFrom }} including UK delivery</p>
    </section>

  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useSeo, SITE_URL } from '../composables/useSeo'
import { PRINTED_BOOK_FROM_PRICE } from '../lib/printPricing'
import EmailCaptureForm from '../components/Marketing/EmailCaptureForm.vue'

const printFrom = `£${PRINTED_BOOK_FROM_PRICE.toFixed(2)}`

const askingTips = [
  {
    title: 'Ask one question, then stop talking',
    body: 'The useful part of an answer almost always arrives after the first pause. Most people fill that silence with a second question and lose the story. Count to five in your head instead.',
  },
  {
    title: 'Start somewhere safe',
    body: 'Childhood, food, and first jobs are easy to talk about and nobody feels examined. Save the harder chapters — grief, regret, what they want to be remembered for — until they are warmed up, or for a second sitting.',
  },
  {
    title: 'Record it rather than writing it down',
    body: 'Scribbling notes turns a conversation into an interview. A phone on the table between you, or a voice recording in the app, lets you listen properly — and the voice itself turns out to be the thing families treasure most.',
  },
  {
    title: 'Follow the detail, not the list',
    body: 'If they mention a motorbike, ask about the motorbike. A list is there to rescue you when the conversation stalls, not to be worked through in order.',
  },
  {
    title: 'Keep the sittings short',
    body: 'Forty minutes is plenty. Six short conversations will get you far more than one long afternoon that leaves everyone tired, and it gives them time to remember things between visits.',
  },
  {
    title: 'Ask the same question twice, years apart',
    body: 'Answers change. Someone will tell you something at eighty they would never have said at seventy, and having both versions is a gift rather than a contradiction.',
  },
]

const chapters = [
  {
    icon: '🌱', short: 'Childhood', slug: 'childhood',
    title: 'Childhood & early memories',
    note: 'the easiest place to start, and usually the richest',
    questions: [
      'What is your earliest memory?', 'Where did you grow up?',
      'What was your childhood home like?', 'What did your parents do for work?',
      'What did you love doing as a child?', 'What was school like for you?',
      'Who was your best friend growing up?', 'What games did you play as a child?',
      'What family traditions do you remember from childhood?', 'What is a memory from childhood that still makes you smile?',
      'What did your bedroom look like?', 'What was your favourite food growing up?',
      'What did you get into trouble for?', 'What world events do you remember from your childhood?',
      'What did you want to be when you grew up?',
    ],
  },
  {
    icon: '🎒', short: 'Teenage years', slug: 'teenage-years',
    title: 'School & teenage years',
    note: 'first jobs, first crushes, and the music that stuck',
    questions: [
      'What was secondary school like for you?', 'Who was your favourite teacher and why?',
      'What subject were you best at?', 'What music did you love as a teenager?',
      'Who did you have a crush on?', 'What was your first job?',
      'What did your parents think you would do with your life?', 'What were you most passionate about as a teenager?',
      'Did you ever get into serious trouble?', 'What was the biggest thing happening in the world when you were a teenager?',
      'What did you do at weekends?', 'What was the first thing you ever saved up to buy?',
      'Who influenced you most at that age?', 'What do you wish you had known then?',
      'What was the most adventurous thing you did as a teenager?',
    ],
  },
  {
    icon: '💑', short: 'Love', slug: 'love-and-relationships',
    title: 'Love & relationships',
    note: 'how they met, and what kept them going',
    questions: [
      'How did you meet your partner?', 'What was your first date like?',
      'When did you know they were the one?', 'How did you get engaged?',
      'What was your wedding day like?', 'What has kept your relationship strong?',
      "What do you know now about love that you didn't know then?", 'Have you ever had your heart broken?',
      'Who has been the most important person in your life?', 'What is the kindest thing anyone has ever done for you?',
      'What is the kindest thing you have ever done for someone else?', 'Is there anyone you wish you had stayed closer to?',
      'What does love mean to you?', 'What would you tell a young person about relationships?',
      'What is your best piece of marriage advice?',
    ],
  },
  {
    icon: '💼', short: 'Work', slug: 'work-and-career',
    title: 'Work & career',
    note: 'good for anyone who says they have nothing to tell',
    questions: [
      'What was your first proper job?', 'What was the hardest job you ever had?',
      'What work are you most proud of?', 'Did you ever have a boss who changed the way you thought?',
      'What did you learn from your working life?', 'Was there a job you always wanted but never had?',
      'What was the best decision you made in your career?', 'Did you ever take a risk professionally?',
      'How did the world of work change over your lifetime?', 'What would you do differently if you started over?',
      'What did your job mean to you beyond the money?', 'Did you ever work away from home?',
      'What sacrifices did you make for your career?', 'What do you think makes a good worker?',
      'If you could give one piece of career advice, what would it be?',
    ],
  },
  {
    icon: '👨‍👩‍👧', short: 'Family', slug: 'family-and-parenting',
    title: 'Family & parenting',
    note: 'the chapter grandchildren tend to read first',
    questions: [
      'What was it like becoming a parent for the first time?', 'What are your proudest moments as a parent?',
      'What was the hardest part of raising a family?', 'What family traditions matter most to you?',
      'What do you most want your children to remember about their childhood?', 'What was a typical day like when the children were young?',
      'What is the most important lesson you tried to teach your children?', 'What do you hope your grandchildren know about you?',
      'Is there anything you wish you had done differently as a parent?', 'What does family mean to you?',
      'What family story do you hope is never forgotten?', 'What did your parents teach you that you passed on?',
      'What surprised you most about parenthood?', 'What made you laugh most as a family?',
      'What was the happiest time in your family life?',
    ],
  },
  {
    icon: '🌍', short: 'Adventures', slug: 'adventures-and-travel',
    title: 'Adventures & travel',
    note: 'journeys, far and not so far',
    questions: [
      'Where is the furthest you have ever travelled?', 'What was your first time abroad like?',
      'Did you ever go somewhere that changed how you saw the world?', 'What was the best holiday you ever had?',
      'How did people travel when you were young?', 'Did you ever set off somewhere on a whim?',
      'What is the most beautiful place you have ever seen?', 'Did you ever get properly lost?',
      'What is a journey you will never forget?', 'Is there somewhere you always wanted to go and never did?',
      'What did you bring home from your travels?', 'Who did you travel with most?',
      'What is the longest you were ever away from home?', 'Did you ever live somewhere other than where you grew up?',
      'If you could go anywhere tomorrow, where would it be?',
    ],
  },
  {
    icon: '🏡', short: 'Everyday life', slug: 'home-and-everyday-life',
    title: 'Home, food & everyday life',
    note: 'the small details that date a memory better than anything',
    questions: [
      'What did Sunday lunch look like in your house?', 'What did your mother or father cook best?',
      'What is a smell that takes you straight back?', 'What was the first home you had of your own?',
      'What did you listen to on the radio, or watch on television?', 'What did a normal week look like for you at thirty?',
      'What did you spend your first proper wages on?', 'Which jobs around the house were yours?',
      'What did a night out cost when you were young?', 'What did you grow, make, or mend yourself?',
      'Which neighbours do you still remember?', 'What was your favourite chair, room, or corner of the house?',
      'What meal would you choose above all others?', 'What everyday thing from back then do you miss most?',
      'What was always in your pocket or handbag?',
    ],
  },
  {
    icon: '💪', short: 'Hard times', slug: 'hard-times',
    title: 'Hard times & resilience',
    note: 'ask these gently, and never first',
    questions: [
      'What is the hardest thing you have ever been through?', 'How did you get through the toughest times in your life?',
      'Was there a time when everything seemed to fall apart?', 'What gave you strength when things were hard?',
      'Have you ever lost someone who changed you?', 'Is there something you have had to forgive?',
      'What has grief taught you?', 'Have you ever felt truly lost?',
      'What is something you regret, and what did it teach you?', 'What are you most proud of surviving?',
      'Has there been a moment when you surprised yourself with your own strength?', 'What would you tell your younger self about hard times?',
      'What has life taught you about resilience?', "Was there a time you nearly gave up but didn't?",
      'What is the most difficult decision you have ever had to make?',
    ],
  },
  {
    icon: '😄', short: 'Lighter ones', slug: 'lighter-questions',
    title: 'Lighter questions',
    note: 'for when the mood needs lifting, or the recorder has just gone on',
    questions: [
      'What is the funniest thing that ever happened to you?', 'What were you absolutely hopeless at?',
      'What is the worst haircut you ever had?', "Did you ever get caught doing something you shouldn't?",
      'What was your worst fashion decision?', 'What is a story the family always tells about you?',
      'What nickname did you have, and who gave it to you?', 'What is the daftest thing you ever spent money on?',
      'Did you ever have a lucky escape?', 'What song can you still sing all the way through?',
      'What is your party trick?', 'Who in the family makes you laugh most?',
      'What was your first car like?', 'What is the best joke you know?',
      'What would surprise people about you?',
    ],
  },
  {
    icon: '🤍', short: 'Legacy', slug: 'legacy-and-wisdom',
    title: 'Legacy & wisdom',
    note: 'the chapter worth recording in their own voice',
    questions: [
      'What do you believe in most deeply?', 'What values do you most want to pass on?',
      'What do you think the secret to a happy life is?', 'What has brought you the most joy?',
      'What do you wish you had spent more time on?', 'What do you wish you had worried less about?',
      'What is the most important lesson life has taught you?', 'What do you want to be remembered for?',
      'Is there anything you want to say to the people you love?', 'What story do you most want to make sure is never forgotten?',
      'If you could live your life again, what would you keep the same?', 'What do you think happens after we die?',
      'What does a good life look like to you?', 'What advice would you give someone just starting out?',
      'What are you most grateful for?',
    ],
  },
]

/** Single source of truth — the headline can never drift from the list again. */
const totalQuestions = computed(() =>
  chapters.reduce((sum, chapter) => sum + chapter.questions.length, 0),
)

const relatedLinks = [
  { to: '/life-story-journal',            title: 'Life Story Journal',       desc: 'Where these questions live, chapter by chapter' },
  { to: '/life-story-interview-questions', title: 'Interview Questions',      desc: 'For recording a longer sit-down conversation' },
  { to: '/questions-to-ask-your-mum',     title: 'Questions for Your Mum',   desc: 'A shorter list for one afternoon' },
  { to: '/storyworth-alternative',        title: 'Compared to Storyworth',   desc: 'How the UK options stack up on price' },
]

// Shown on the page AND used for the FAQPage schema, so they always match.
const faqs = [
  {
    q: 'What are the best life story questions to start with?',
    a: 'Start with childhood, food, or first jobs. "What is your earliest memory?", "What did your childhood home look like?" and "What was your first job?" are easy to answer, feel nothing like an interview, and almost always lead somewhere unexpected. Leave grief, regret and legacy for later in the conversation, or for a second sitting.',
  },
  {
    q: 'How many life story questions should I ask?',
    a: `There are ${totalQuestions.value} on this page, but nobody needs to answer them all. Ten good answers already make a book worth keeping, and most families find forty to sixty is the natural length. It is far better to get ten detailed answers than ${totalQuestions.value} one-line ones.`,
  },
  {
    q: 'Should I write the answers down or record them?',
    a: 'Record them if you possibly can. Writing notes turns a conversation into an interview, and you will miss the phrasing — the turns of speech that make it sound like them. A phone on the table works fine. Tell Me Your Story records each answer as audio and puts a QR code beside that story in the printed book, so family can scan the page and hear it.',
  },
  {
    q: 'What if they say they have nothing interesting to tell?',
    a: 'Almost everyone says this, and it is nearly always the question that is at fault rather than the life. "What was your life like?" is unanswerable; "what did you spend your first proper wages on?" is not. Switch to the work chapter or the everyday-life chapter — the small specifics are the ones that unlock the bigger stories.',
  },
  {
    q: 'Are these questions free to use?',
    a: 'Yes. Read them, copy them, print them, take them to a care home or a family gathering — no sign-up needed. Tell Me Your Story is the paid-for part: it asks 100 questions inside the app one at a time, saves every answer, records their voice, and turns the lot into a printed keepsake book.',
  },
  {
    q: 'Can someone else answer the questions on their behalf?',
    a: 'They can, and sometimes that is the only way — if writing is difficult, or if you are putting a book together after someone has died. You can type up the answers from a recording or from memory. If the storyteller is able to speak, though, record their voice while you can; it is the part families say they are most glad of later.',
  },
]

useSeo({
  title: `${totalQuestions.value} Life Story Questions to Ask Someone You Love (Free List)`,
  description: `${totalQuestions.value} free life story questions across ${chapters.length} chapters — childhood, love, work, family, hard times and legacy — plus how to ask them so you get real answers.`,
  canonical: 'https://tellmeyourstory.uk/life-story-questions',
  type: 'article',
  schema: {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FAQPage',
        '@id': `${SITE_URL}/life-story-questions#faq`,
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${SITE_URL}/life-story-questions#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Life Story Questions', item: `${SITE_URL}/life-story-questions` },
        ],
      },
      {
        '@type': 'ItemList',
        '@id': `${SITE_URL}/life-story-questions#chapters`,
        name: `Life story questions by chapter`,
        numberOfItems: chapters.length,
        itemListElement: chapters.map((chapter, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: chapter.title,
          url: `${SITE_URL}/life-story-questions#${chapter.slug}`,
        })),
      },
    ],
  },
})
</script>

<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
</style>
