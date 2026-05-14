<template>
  <main class="bg-white">

    <!-- Hero -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="eyebrow">Tell Me Your Story · Guide</p>
        <h1 class="mt-4 font-display text-3xl font-bold leading-tight tracking-[-0.02em] text-[#1C1917] sm:text-4xl md:text-5xl">
          Questions to Ask Your Mum Before It's Too Late
        </h1>
        <p class="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#5C534E] sm:text-lg">
          The conversations most daughters and sons never have — and how to start them today.
        </p>
        <div class="mt-5 flex flex-wrap items-center justify-center gap-4 text-sm text-[#8C847E]">
          <span>By Mark, Founder of Tell Me Your Story</span>
          <span>·</span>
          <span>8 min read</span>
        </div>
      </div>
    </section>

    <!-- Article -->
    <article class="px-5 py-12 sm:px-8 sm:py-16">
      <div class="mx-auto max-w-2xl">

        <!-- Founder intro -->
        <div class="founder-note">
          <p class="founder-text">
            We all have a version of our mum in our heads — the person who was always there, who always knew what to say, who made the house feel like home. But behind that role is a whole person with a whole life that began long before we existed.
          </p>
          <p class="founder-text mt-4">
            A childhood home. A first heartbreak. Dreams she had before she became your mum. Fears she never talked about. Sacrifices she made without ever mentioning them.
          </p>
          <p class="founder-text mt-4">
            These questions are a way to meet her — not just as your mum, but as a person. Most mums, when someone finally asks, are overwhelmed that anyone thought to.
          </p>
          <p class="founder-text mt-4 font-medium text-[#1C1917]">
            Here are 80 of the most meaningful questions you can ask your mum — across every chapter of her life.
          </p>
        </div>

        <!-- Why section -->
        <h2 class="article-h2 mt-10">Why we never ask</h2>
        <p class="article-p">
          There's a quiet assumption most of us carry: that there's more time. That the conversations we mean to have can happen later — at Christmas, on a visit, when things slow down.
        </p>
        <p class="article-p mt-4">
          But the truth is, our parents are getting older every day. Their memories — their earliest ones especially — are vivid now in ways they won't always be. The window to capture a life story is open. It won't always be.
        </p>
        <p class="article-p mt-4 font-medium text-[#1C1917]">
          You don't need a special occasion. You just need one question and the willingness to listen.
        </p>

        <!-- Chapters -->
        <div v-for="chapter in chapters" :key="chapter.title" class="mt-12">
          <div class="chapter-header">
            <span class="chapter-number">{{ chapter.number }}</span>
            <h2 class="chapter-title">{{ chapter.title }}</h2>
          </div>
          <p v-if="chapter.intro" class="article-p mb-4">{{ chapter.intro }}</p>
          <ol class="question-list" :start="chapter.start">
            <li v-for="q in chapter.questions" :key="q" class="question-item">{{ q }}</li>
          </ol>
        </div>

        <!-- How to section -->
        <h2 class="article-h2 mt-14">How to actually have these conversations</h2>
        <p class="article-p">
          The hardest part isn't the questions — it's starting. Here's how to make it feel natural.
        </p>

        <div class="mt-6 space-y-4">
          <div class="tip-card">
            <p class="tip-title">Don't make it an interview</p>
            <p class="tip-desc">The best conversations happen side by side — on a walk, over a cup of tea, in the car. Not face to face across a table with a list in your hand.</p>
          </div>
          <div class="tip-card">
            <p class="tip-title">Start with happy memories</p>
            <p class="tip-desc">Begin with questions about her childhood, her favourite things, the people she loved. Once she's talking, the deeper questions come naturally.</p>
          </div>
          <div class="tip-card">
            <p class="tip-title">Let her go off on tangents</p>
            <p class="tip-desc">The unplanned stories are usually the best ones. If she starts telling you about something you didn't ask about, follow it. That's the real conversation.</p>
          </div>
          <div class="tip-card">
            <p class="tip-title">Write it down — or record it</p>
            <p class="tip-desc">The specific words she uses, the details she remembers — those are the things that will matter most later. Voice memos on your phone are enough.</p>
          </div>
          <div class="tip-card">
            <p class="tip-title">Ask just one question today</p>
            <p class="tip-desc">Not ten. Not a sit-down session. Just one question, the next time you speak. "Mum, what was your mum like?" That's enough to start.</p>
          </div>
        </div>

        <!-- Quote -->
        <div class="mt-12 rounded-3xl border border-[#E8DDD0] bg-[#FAF7F4] px-6 py-8 sm:px-8 sm:py-10 text-center">
          <p class="font-display text-xl italic leading-relaxed text-[#5C534E] sm:text-2xl">
            "She told me about a dress she saved up for three months to buy. I never knew that about her."
          </p>
          <p class="mt-4 text-sm text-[#9C7C5C]">
            — From a real keepsake created with Tell Me Your Story
          </p>
          <p class="mt-3 text-sm text-[#8C847E]">
            One question unlocked a memory that had been waiting decades to be told. Your mum has stories like that too.
          </p>
        </div>

        <!-- Internal links -->
        <div class="mt-10 rounded-2xl border border-[#E8DDD0] bg-[#FAF7F4] px-6 py-5">
          <p class="text-sm font-medium text-[#1C1917]">More guides</p>
          <div class="mt-3 flex flex-col gap-2 text-sm">
            <router-link to="/blog/questions-to-ask-your-parents" class="text-[#7C5C3B] hover:underline">
              → 100 questions to ask your parents before it's too late
            </router-link>
            <router-link to="/questions-to-ask-your-dad" class="text-[#7C5C3B] hover:underline">
              → Questions to ask your dad about his life
            </router-link>
          </div>
        </div>

        <!-- CTA -->
        <div class="mt-12 rounded-3xl bg-[#1C1917] px-6 py-10 sm:px-8 sm:py-12 text-center">
          <p class="text-[11px] font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Tell Me Your Story</p>
          <h3 class="mt-3 font-display text-2xl font-bold text-white sm:text-3xl">
            Preserve your mum's story beautifully
          </h3>
          <p class="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#A8A29E]">
            These questions are built into a guided app that makes capturing your mum's story feel natural and achievable. Every answer saves automatically — then turns into a beautifully designed keepsake book or video your family can hold onto forever.
          </p>
          <div class="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-[#9C7C5C]">
            <span>✦ Free to start</span>
            <span>✦ No subscription</span>
            <span>✦ Answer at your own pace</span>
          </div>
          <router-link
            to="/register"
            class="mt-8 inline-block rounded-full bg-white px-7 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90"
          >
            Start Mum's Story — it's free
          </router-link>
        </div>

        <!-- Back -->
        <div class="mt-10 border-t border-stone-100 pt-8">
          <router-link to="/" class="text-sm text-[#7C5C3B] hover:underline">← Back to Tell Me Your Story</router-link>
                <router-link to="/tribute" class="text-[#7C5C3B] hover:underline">
  → Create a free memorial tribute video
</router-link>
        </div>

      </div>
    </article>
  </main>
</template>

<script setup lang="ts">
import { useSeo } from '../composables/useSeo'

useSeo({
  title: 'Questions to Ask Your Mum Before It\'s Too Late | Tell Me Your Story',
  description: '80 meaningful questions to ask your mum about her childhood, memories, motherhood, values, and legacy — across every chapter of her life. Start the conversation today.',
  canonical: 'https://tellmeyourstory.uk/questions-to-ask-your-mum',
  schema: {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: 'Questions to Ask Your Mum Before It\'s Too Late',
        description: '80 meaningful questions to ask your mum about her childhood, memories, motherhood, values, and legacy.',
        author: { '@type': 'Person', name: 'Mark', url: 'https://tellmeyourstory.uk' },
        publisher: {
          '@type': 'Organization',
          name: 'Tell Me Your Story',
          url: 'https://tellmeyourstory.uk',
          logo: { '@type': 'ImageObject', url: 'https://tellmeyourstory.uk/logo/logo-full-new.png' },
        },
        datePublished: '2026-04-14',
        dateModified: '2026-05-05',
        url: 'https://tellmeyourstory.uk/questions-to-ask-your-mum',
        mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://tellmeyourstory.uk/questions-to-ask-your-mum' },
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What are good questions to ask your mum about her life?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Good questions to ask your mum include asking about her childhood home, her happiest memories growing up, what she dreamed of becoming, how she felt when she became a mother, what she sacrificed for the family, and what she most wants you to remember about her.',
            },
          },
          {
            '@type': 'Question',
            name: 'What questions should I ask my mum before it\'s too late?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The most important questions to ask your mum are: What was your childhood like? What was the hardest thing you ever went through? How did you feel when you first held me? What do you most want to be remembered for? What advice would you give your younger self?',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I get my mum to open up about her past?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Start with one gentle question during a relaxed moment — over a cup of tea, on a walk, or during a car journey. Avoid making it feel like a formal interview. Ask about happy memories first, like her favourite childhood memories or how she met your dad. Once she starts talking, follow the thread naturally.',
            },
          },
        ],
      },
    ],
  },
})

const chapters = [
  {
    number: 'Chapter One',
    title: 'Her Early Years',
    start: 1,
    intro: 'Before she was your mum, she was a child with her own world — her own fears, joys, and sense of wonder. These questions take you back to the beginning.',
    questions: [
      'Where were you born and what have you been told about that day?',
      'What was your childhood home like — what did it look and feel like?',
      'What did home smell like when you were growing up?',
      'What was your family like when you were little?',
      'What was your relationship with your own mum like?',
      'What was your relationship with your dad like?',
      'Did you have siblings — and what was your relationship with them?',
      'What were your grandparents like?',
      'What is the earliest memory you have?',
      'What were you like as a little girl?',
    ],
  },
  {
    number: 'Chapter Two',
    title: 'Childhood and School',
    start: 11,
    intro: 'The years that shaped who she became — her friendships, her passions, the things she discovered about herself.',
    questions: [
      'What did you love doing as a child?',
      'What were you afraid of when you were young?',
      'What was school like for you?',
      'Who was your best friend growing up and what were they like?',
      'What was the neighbourhood or town you grew up in like?',
      'What did you do in the school holidays?',
      'What family traditions did you grow up with?',
      'What did your family do at Christmas or on birthdays?',
      'Was there a teacher who made a real difference to you?',
      'What childhood memory do you return to most often?',
    ],
  },
  {
    number: 'Chapter Three',
    title: 'Teenage Years and Young Womanhood',
    start: 21,
    intro: 'The years when she was figuring out who she was — what she wanted, what she believed, who she loved.',
    questions: [
      'What were you like as a teenager?',
      'What music did you love?',
      'What did you dream of becoming when you grew up?',
      'What was the most rebellious thing you ever did?',
      'Who did you look up to when you were young?',
      'What was the biggest challenge you faced growing up?',
      'What did the future look like from where you were standing back then?',
      'What was the most important friendship of your teenage years?',
      'Did you have a part-time job — and what was it like?',
      'What do you wish someone had told you back then?',
    ],
  },
  {
    number: 'Chapter Four',
    title: 'Love and Relationships',
    start: 31,
    intro: 'The people who shaped her heart — long before she became your mum.',
    questions: [
      'How did you meet the person you built your life with?',
      'What did you think of them when you first met?',
      'When did you know they were the one?',
      'What was your favourite memory from falling in love?',
      'What has love taught you that nothing else could?',
      'What has been the hardest part of a long relationship?',
      'What is the secret to making it work?',
      'Were there other people who mattered to you before?',
      'What do you wish you had known about love when you were young?',
      'What would you want your children to know about building a life with someone?',
    ],
  },
  {
    number: 'Chapter Five',
    title: 'Becoming a Mother',
    start: 41,
    intro: 'The chapter that changed everything — and the one she may never have been fully asked about.',
    questions: [
      'What do you remember about the day I was born?',
      'How did you feel when you first held me?',
      'What were your biggest hopes for me when I was little?',
      'What worried you most when you became a parent?',
      'What surprised you most about motherhood?',
      'What did you love most about when I was small?',
      'What moments from my childhood stay with you most?',
      'What values did you most want to pass down?',
      'What do you wish you had done differently as a parent?',
      'What are you most proud of in your children?',
    ],
  },
  {
    number: 'Chapter Six',
    title: 'Work and Purpose',
    start: 51,
    intro: 'Her working life — the ambitions, the challenges, the pride that came from building something.',
    questions: [
      'What work have you done in your life that you are most proud of?',
      'Was there a dream career you had that never happened?',
      'What did work mean to you — was it just a job or something more?',
      'What was the hardest professional challenge you ever faced?',
      'Did you ever take a risk that paid off?',
      'Did you ever take a risk that did not work out?',
      'What did you learn about people through your working life?',
      'If you could go back, would you choose the same path?',
      'What advice would you give a young woman starting out today?',
    ],
  },
  {
    number: 'Chapter Seven',
    title: 'Memories and Milestones',
    start: 60,
    intro: 'The moments she carries with her — the ones that defined a life.',
    questions: [
      'What is the happiest moment of your life?',
      'What is the proudest moment of your life?',
      'What is the hardest thing you have ever been through?',
      'Was there a moment that completely changed everything for you?',
      'What world event affected you most personally?',
      'What place in the world has meant the most to you?',
      'What is a memory you return to again and again?',
      'What was a moment of pure joy that you never want to forget?',
      'What moment do you wish you could go back and live again?',
    ],
  },
  {
    number: 'Chapter Eight',
    title: 'Values, Wisdom and Legacy',
    start: 69,
    intro: 'The things she has learned — about life, about love, about what really matters.',
    questions: [
      'What do you believe in most deeply?',
      'Has your faith or spirituality changed over your life?',
      'What is the most important lesson life has taught you?',
      'What do you know now that you wish you had known at 25?',
      'What would you tell your younger self?',
      'What has brought you the most peace in life?',
      'What does a good life look like to you?',
      'What is the kindest thing anyone has ever done for you?',
      'What do you want to be remembered for?',
      'What is the one thing you most want us to know about your life?',
      'Is there anything you want to say that you have never found the right moment for?',
    ],
  },
]
</script>

<style scoped>


main { font-family: 'DM Sans', sans-serif; }
.font-display { font-family: 'Playfair Display', Georgia, serif; }

.eyebrow {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #8C847E;
}

.founder-note {
  border-left: 3px solid #7C5C3B;
  padding: 20px 24px;
  background: #FAF7F4;
  border-radius: 0 16px 16px 0;
}
.founder-text {
  font-size: 15px;
  line-height: 1.8;
  color: #3C3530;
}

.article-h2 {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #1C1917;
  line-height: 1.3;
}

.article-p {
  font-size: 15px;
  line-height: 1.8;
  color: #3C3530;
}

.chapter-header {
  display: flex;
  align-items: baseline;
  gap: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid #E8DDD0;
  margin-bottom: 16px;
}

.chapter-number {
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #9C7C5C;
  flex-shrink: 0;
}

.chapter-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 1.3rem;
  font-weight: 700;
  color: #1C1917;
}

.question-list {
  list-style: decimal;
  padding-left: 20px;
}

.question-item {
  font-size: 14px;
  line-height: 1.7;
  color: #3C3530;
  padding: 5px 0;
  padding-left: 8px;
}

.tip-card {
  border: 1px solid #E8DDD0;
  border-radius: 16px;
  padding: 16px 20px;
  background: white;
}

.tip-title {
  font-size: 14px;
  font-weight: 600;
  color: #1C1917;
}

.tip-desc {
  font-size: 13px;
  line-height: 1.6;
  color: #78716C;
  margin-top: 4px;
}
</style>