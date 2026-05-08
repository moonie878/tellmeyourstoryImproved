<template>
  <main class="bg-white">

    <!-- Hero -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="eyebrow">Tell Me Your Story · Guide</p>
        <h1 class="mt-4 font-display text-3xl font-bold leading-tight tracking-[-0.02em] text-[#1C1917] sm:text-4xl md:text-5xl">
          Questions to Ask Your Dad Before It's Too Late
        </h1>
        <p class="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#5C534E] sm:text-lg">
          Most dads never get asked about their life. Here's how to change that.
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
            There's a particular kind of silence around dads. They tend not to volunteer stories about their younger selves. They don't often bring up the hard things, the sacrifices, the moments that shaped them. And so we go years — sometimes decades — without really knowing them.
          </p>
          <p class="founder-text mt-4">
            Not because they don't have stories. They do. A childhood with its own texture and colour. A young man's ambitions. The weight of responsibility that came with having a family. Things they've never been asked about because nobody thought to ask.
          </p>
          <p class="founder-text mt-4">
            My own dad is the same. He says little, reveals less. But the few times I've asked him a real question — something specific, something that showed I was genuinely curious — he's talked in a way I've never forgotten.
          </p>
          <p class="founder-text mt-4 font-medium text-[#1C1917]">
            Here are 80 questions to ask your dad — across every chapter of his life.
          </p>
        </div>

        <!-- Why section -->
        <h2 class="article-h2 mt-10">Why dads are harder to ask</h2>
        <p class="article-p">
          There's a generational thing at play. Many dads — especially older ones — grew up in a time when men didn't talk about their feelings, their fears, or their inner lives. Vulnerability wasn't encouraged. Stoicism was.
        </p>
        <p class="article-p mt-4">
          But that doesn't mean the stories aren't there. It means they need a different kind of invitation. Not "tell me about your feelings" but "tell me about the first car you ever owned." Not "what were your regrets?" but "what's the biggest risk you ever took?" Specific questions unlock specific memories.
        </p>
        <p class="article-p mt-4 font-medium text-[#1C1917]">
          The questions below are written with that in mind. Start anywhere. Start with one.
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
        <h2 class="article-h2 mt-14">How to get your dad talking</h2>
        <p class="article-p">
          Dads often open up differently to mums. Here's what tends to work.
        </p>

        <div class="mt-6 space-y-4">
          <div class="tip-card">
            <p class="tip-title">Side by side, not face to face</p>
            <p class="tip-desc">Dads often find it easier to talk when you're doing something together — driving, walking, watching a game. The lack of eye contact removes pressure.</p>
          </div>
          <div class="tip-card">
            <p class="tip-title">Start with work or achievement</p>
            <p class="tip-desc">Many dads find it natural to talk about what they've done and built. Start there, and the more personal stories often follow.</p>
          </div>
          <div class="tip-card">
            <p class="tip-title">Ask about specific things, not general feelings</p>
            <p class="tip-desc">"What was the best car you ever owned?" opens more doors than "What made you happy?" Concrete questions are easier to answer.</p>
          </div>
          <div class="tip-card">
            <p class="tip-title">Let silence sit</p>
            <p class="tip-desc">Dads often take longer to answer. Don't fill the silence. The best answers sometimes come after a long pause.</p>
          </div>
          <div class="tip-card">
            <p class="tip-title">Record it — even just on your phone</p>
            <p class="tip-desc">You don't need anything fancy. A voice memo while you're driving is enough to capture something you'll treasure later.</p>
          </div>
        </div>

        <!-- Quote -->
        <div class="mt-12 rounded-3xl border border-[#E8DDD0] bg-[#FAF7F4] px-6 py-8 sm:px-8 sm:py-10 text-center">
          <p class="font-display text-xl italic leading-relaxed text-[#5C534E] sm:text-2xl">
            "He talked for two hours. I'd never heard any of it before."
          </p>
          <p class="mt-4 text-sm text-[#9C7C5C]">
            — From a real Tell Me Your Story keepsake
          </p>
          <p class="mt-3 text-sm text-[#8C847E]">
            All it took was one question asked at the right moment.
          </p>
        </div>

        <!-- Internal links -->
        <div class="mt-10 rounded-2xl border border-[#E8DDD0] bg-[#FAF7F4] px-6 py-5">
          <p class="text-sm font-medium text-[#1C1917]">More guides</p>
          <div class="mt-3 flex flex-col gap-2 text-sm">
            <router-link to="/blog/questions-to-ask-your-parents" class="text-[#7C5C3B] hover:underline">
              → 100 questions to ask your parents before it's too late
            </router-link>
            <router-link to="/questions-to-ask-your-mum" class="text-[#7C5C3B] hover:underline">
              → Questions to ask your mum about her life
            </router-link>
          </div>
        </div>

        <!-- CTA -->
        <div class="mt-12 rounded-3xl bg-[#1C1917] px-6 py-10 sm:px-8 sm:py-12 text-center">
          <p class="text-[11px] font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Tell Me Your Story</p>
          <h3 class="mt-3 font-display text-2xl font-bold text-white sm:text-3xl">
            Preserve your dad's story beautifully
          </h3>
          <p class="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#A8A29E]">
            These questions are built into a guided app that makes capturing your dad's story feel natural and achievable. Every answer saves automatically — then turns into a beautifully designed keepsake book or video your family can hold onto forever.
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
            Start Dad's Story — it's free
          </router-link>
        </div>

        <!-- Back -->
        <div class="mt-10 border-t border-stone-100 pt-8">
          <router-link to="/" class="text-sm text-[#7C5C3B] hover:underline">← Back to Tell Me Your Story</router-link>
        </div>

      </div>
    </article>
  </main>
</template>

<script setup lang="ts">
import { useSeo } from '../composables/useSeo'

useSeo({
  title: 'Questions to Ask Your Dad Before It\'s Too Late | Tell Me Your Story',
  description: '80 meaningful questions to ask your dad about his childhood, work, fatherhood, values, and legacy — across every chapter of his life. Start the conversation today.',
  schema: {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: 'Questions to Ask Your Dad Before It\'s Too Late',
        description: '80 meaningful questions to ask your dad about his childhood, work, fatherhood, values, and legacy.',
        author: { '@type': 'Person', name: 'Mark', url: 'https://tellmeyourstory.uk' },
        publisher: {
          '@type': 'Organization',
          name: 'Tell Me Your Story',
          url: 'https://tellmeyourstory.uk',
          logo: { '@type': 'ImageObject', url: 'https://tellmeyourstory.uk/logo/logo-full-new.png' },
        },
        datePublished: '2026-04-14',
        dateModified: '2026-05-05',
        url: 'https://tellmeyourstory.uk/questions-to-ask-your-dad',
        mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://tellmeyourstory.uk/questions-to-ask-your-dad' },
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What are good questions to ask your dad about his life?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Good questions to ask your dad include asking about his childhood, his first job, what he was like as a young man, how he felt when he became a father, what he sacrificed for the family, what risks he took in life, and what he most wants you to remember about him.',
            },
          },
          {
            '@type': 'Question',
            name: 'What questions should I ask my dad before it\'s too late?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The most meaningful questions to ask your dad are: What was your childhood like? What is the proudest moment of your life? How did you feel when you became a dad? What was the hardest thing you ever went through? What do you wish you had done differently? What do you most want to be remembered for?',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I get my dad to open up and share his stories?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Dads often open up more in side-by-side settings than face-to-face — try asking during a drive, a walk, or watching sport together. Start with questions about his work or achievements, which many dads find easier to talk about, then gently move toward more personal memories.',
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
    title: 'His Early Years',
    start: 1,
    intro: 'The childhood that made him who he is — before work, before fatherhood, before all of it.',
    questions: [
      'Where were you born and what have you been told about that day?',
      'What was your childhood home like — what did it look and feel like?',
      'What did your house smell like when you were growing up?',
      'What was your family like when you were little?',
      'What was your relationship with your own dad like?',
      'What was your relationship with your mum like?',
      'Did you have brothers and sisters — and what were they like?',
      'What were your grandparents like?',
      'What is the earliest memory you have?',
      'What were you like as a boy?',
    ],
  },
  {
    number: 'Chapter Two',
    title: 'Childhood and School',
    start: 11,
    intro: 'The games he played, the trouble he got into, the things he discovered he was good at.',
    questions: [
      'What did you love doing as a child?',
      'What were you afraid of when you were young?',
      'What was school like for you?',
      'Who was your best friend growing up and what were they like?',
      'What was the neighbourhood or town you grew up in like?',
      'What did you do in the school holidays?',
      'What family traditions did you grow up with?',
      'Was there a teacher who made a real difference to you?',
      'What was the naughtiest thing you ever did as a child?',
      'What childhood memory do you return to most often?',
    ],
  },
  {
    number: 'Chapter Three',
    title: 'Teenage Years and Young Manhood',
    start: 21,
    intro: 'The years when he was figuring out who he was — what he wanted, what he believed, who he was becoming.',
    questions: [
      'What were you like as a teenager?',
      'What music did you love?',
      'What did you dream of becoming when you grew up?',
      'What was the most rebellious thing you ever did?',
      'Who did you look up to when you were young?',
      'What was the biggest challenge you faced growing up?',
      'Did you have a part-time job — and what was it like?',
      'What was the most important friendship of your teenage years?',
      'What did the future look like from where you were standing back then?',
      'What do you wish someone had told you back then?',
    ],
  },
  {
    number: 'Chapter Four',
    title: 'Love and Relationships',
    start: 31,
    intro: 'The people who shaped his heart — and what he learned about love.',
    questions: [
      'How did you meet the person you built your life with?',
      'What did you think of them when you first met?',
      'When did you know they were the one?',
      'What was your favourite memory from falling in love?',
      'What has love taught you that nothing else could?',
      'What has been the hardest part of a long relationship?',
      'What is the secret to making it work?',
      'What do you wish you had known about love when you were young?',
      'What would you want your children to know about building a life with someone?',
    ],
  },
  {
    number: 'Chapter Five',
    title: 'Becoming a Father',
    start: 40,
    intro: 'The role he may never have been fully asked about — what it meant, what it cost, what it gave him.',
    questions: [
      'What do you remember about the day I was born?',
      'How did you feel when you first held me?',
      'What were your biggest hopes for me when I was little?',
      'What worried you most when you became a parent?',
      'What surprised you most about fatherhood?',
      'What moments from my childhood stay with you most?',
      'What values did you most want to pass down?',
      'What do you wish you had done differently as a dad?',
      'What are you most proud of in your children?',
      'What do you hope your children carry forward from you?',
    ],
  },
  {
    number: 'Chapter Six',
    title: 'Work and Ambition',
    start: 50,
    intro: 'The working life — the graft, the risks, the things he built and what it cost him.',
    questions: [
      'What was your first proper job — and what was it like?',
      'What work have you done in your life that you are most proud of?',
      'Was there a dream career you had that never happened?',
      'What did work mean to you — was it just a job or something more?',
      'What was the hardest professional challenge you ever faced?',
      'Did you ever take a risk that paid off?',
      'Did you ever take a risk that did not work out?',
      'What did you learn about people through your working life?',
      'If you could go back, would you choose the same path?',
      'What advice would you give a young man starting out today?',
    ],
  },
  {
    number: 'Chapter Seven',
    title: 'Memories and Milestones',
    start: 60,
    intro: 'The moments he carries — the ones that defined who he became.',
    questions: [
      'What is the happiest moment of your life?',
      'What is the proudest moment of your life?',
      'What is the hardest thing you have ever been through?',
      'Was there a moment that completely changed everything for you?',
      'What world event affected you most personally?',
      'What place in the world has meant the most to you?',
      'What is a memory you return to again and again?',
      'What was a moment of pure joy you never want to forget?',
      'What moment do you wish you could go back and live again?',
    ],
  },
  {
    number: 'Chapter Eight',
    title: 'Values, Wisdom and Legacy',
    start: 69,
    intro: 'What he has learned — about life, about what matters, about what he wants to leave behind.',
    questions: [
      'What do you believe in most deeply?',
      'What is the most important lesson life has taught you?',
      'What do you know now that you wish you had known at 25?',
      'What would you tell your younger self?',
      'What has brought you the most peace in life?',
      'What does a good life look like to you?',
      'What is the kindest thing anyone has ever done for you?',
      'What do you want to be remembered for?',
      'What do you hope your children never forget about you?',
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