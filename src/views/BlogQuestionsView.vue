<template>
  <main class="bg-white">

    <!-- ── Hero ─────────────────────────────────── -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="eyebrow">Tell Me Your Story · Guide</p>
        <h1 class="mt-4 font-display text-3xl font-bold leading-tight tracking-[-0.02em] text-[#1C1917] sm:text-4xl md:text-5xl">
          100 Questions to Ask Your Parents Before It's Too Late
        </h1>
        <p class="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#5C534E] sm:text-lg">
          The conversations most families never have — and how to start them today.
        </p>
        <div class="mt-5 flex flex-wrap items-center justify-center gap-4 text-sm text-[#8C847E]">
          <span>By Mark, Founder of Tell Me Your Story</span>
          <span>·</span>
          <span>10 min read</span>
        </div>
      </div>
    </section>

    <!-- ── Article ───────────────────────────────── -->
    <article class="px-5 py-12 sm:px-8 sm:py-16">
      <div class="mx-auto max-w-2xl">

        <!-- Founder intro -->
        <div class="founder-note">
          <p class="founder-text">
            I nearly ran out of time. At 39, I had open heart surgery. Lying in a hospital bed, I had a thought that hasn't left me since: I have never properly asked my parents about their lives.
          </p>
          <p class="founder-text mt-4">
            Not the surface stuff. The real things. What their childhood home felt like. What they sacrificed that they never talked about. What they most want me to remember about them when they're gone.
          </p>
          <p class="founder-text mt-4">
            I got through the surgery. But that feeling — that quiet panic of nearly having run out of time — is what made me build Tell Me Your Story. And it's why I'm writing this post.
          </p>
          <p class="founder-text mt-4 font-medium text-[#1C1917]">
            If you're reading this, you still have time. Here are 100 of the most meaningful questions you can ask your parents today.
          </p>
        </div>

        <!-- Why section -->
        <h2 class="article-h2 mt-10">Why most families never ask these questions</h2>
        <p class="article-p">
          We assume there's more time. We assume our parents will always be there to ask. We get busy, life moves fast, and the conversations we mean to have get pushed to later.
        </p>
        <p class="article-p mt-4">
          The questions below aren't just conversation starters. They're a way of truly knowing someone — of understanding the full person behind the role of mum or dad. Most parents have never been asked these things. When someone finally does ask, the response is almost always the same: relief, gratitude, and memories that come flooding back.
        </p>
        <p class="article-p mt-4 font-medium text-[#1C1917]">
          Don't wait for the right moment. There isn't one. Just start with one question.
        </p>

        <!-- Each chapter -->
        <div v-for="chapter in chapters" :key="chapter.title" class="mt-12">
          <div class="chapter-header">
            <span class="chapter-number">{{ chapter.number }}</span>
            <h2 class="chapter-title">{{ chapter.title }}</h2>
          </div>
          <ol class="question-list" :start="chapter.start">
            <li
              v-for="question in chapter.questions"
              :key="question"
              class="question-item"
            >
              {{ question }}
            </li>
          </ol>
        </div>

        <!-- How to section -->
        <h2 class="article-h2 mt-14">How to actually have these conversations</h2>
        <p class="article-p">
          Reading a list of 100 questions is easy. Having the conversations is harder — but not as hard as you might think.
        </p>

        <div class="mt-6 space-y-4">
          <div class="tip-card">
            <p class="tip-title">Start with one</p>
            <p class="tip-desc">Not ten. Not a sit-down interview. Just one question, asked naturally, the next time you're together or on the phone.</p>
          </div>
          <div class="tip-card">
            <p class="tip-title">Write down the answers</p>
            <p class="tip-desc">Or record them on your phone. The words your parents use, the specific details they remember — those are the things that will matter most later.</p>
          </div>
          <div class="tip-card">
            <p class="tip-title">Don't rush</p>
            <p class="tip-desc">Some answers come slowly. Let there be silence. The best memories often surface after a pause.</p>
          </div>
          <div class="tip-card">
            <p class="tip-title">Ask follow-up questions</p>
            <p class="tip-desc">"Tell me more about that." "What happened next?" "How did that make you feel?" These unlock more than any question on this list.</p>
          </div>
          <div class="tip-card">
            <p class="tip-title">Let them go off on tangents</p>
            <p class="tip-desc">The unplanned stories are usually the best ones. Follow the thread wherever it leads.</p>
          </div>
        </div>

        <!-- Quote -->
        <div class="mt-12 rounded-3xl border border-[#E8DDD0] bg-[#FAF7F4] px-6 py-8 sm:px-8 sm:py-10 text-center">
          <p class="font-display text-xl italic leading-relaxed text-[#5C534E] sm:text-2xl">
            "It smelled of cooking, washing drying near the fire, and sometimes something sweet baking in the oven."
          </p>
          <p class="mt-4 text-sm text-[#9C7C5C]">
            — From a real keepsake created with Tell Me Your Story
          </p>
          <p class="mt-3 text-sm text-[#8C847E]">
            One question, asked at the right moment, unlocked a memory that had been sitting quietly for decades. Your parents have answers like that too.
          </p>
        </div>

        <!-- CTA -->
        <div class="mt-12 rounded-3xl bg-[#1C1917] px-6 py-10 sm:px-8 sm:py-12 text-center">
          <p class="text-[11px] font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Tell Me Your Story</p>
          <h3 class="mt-3 font-display text-2xl font-bold text-white sm:text-3xl">
            A better way to capture their story
          </h3>
          <p class="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#A8A29E]">
            These 100 questions are built into a guided app that makes capturing a parent's story feel natural and achievable. Every answer saves automatically — then turns into a beautifully designed keepsake book or video your family can hold onto forever.
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
            Start capturing their story — it's free
          </router-link>
        </div>

        <!-- Back to blog -->
        <div class="mt-10 border-t border-stone-100 pt-8">
          <router-link to="/" class="text-sm text-[#7C5C3B] hover:underline">
            ← Back to Tell Me Your Story
          </router-link>
        </div>

      </div>
    </article>

  </main>
</template>

<script setup lang="ts">
import { useSeo } from '../composables/useSeo'

useSeo({
  title: '100 Questions to Ask Your Parents Before It\'s Too Late | Tell Me Your Story',
  description: 'The questions most families never think to ask — until it\'s too late. 100 meaningful questions to ask your parents or grandparents, across 10 chapters of their life. Free to start capturing their story today.',
})

const chapters = [
  {
    number: 'Chapter One',
    title: 'Beginnings',
    start: 1,
    questions: [
      'Where and when were you born — and what have you been told about that day?',
      'What was the world like when you were born?',
      'Is there a story behind your name?',
      'What was your family home like when you were little?',
      'What did home smell like when you were growing up?',
      'Who were the most important people in your early life?',
      'What was your relationship like with your parents?',
      'Did you have brothers and sisters — and what was your relationship like?',
      'What were your grandparents like?',
      'What is the earliest memory you have?',
    ],
  },
  {
    number: 'Chapter Two',
    title: 'Childhood',
    start: 11,
    questions: [
      'What did you love doing as a child?',
      'What were you afraid of?',
      'What was school like for you?',
      'Who was your best friend and what were they like?',
      'What was the neighbourhood or town you grew up in like?',
      'What did you do in the summers?',
      'What family traditions did you grow up with?',
      'What did your family do at Christmas or birthdays?',
      'Was there a teacher who changed your life?',
      'What childhood memory stays with you most?',
    ],
  },
  {
    number: 'Chapter Three',
    title: 'Teenage Years',
    start: 21,
    questions: [
      'What were you like as a teenager?',
      'What music did you love?',
      'What did you dream of becoming?',
      'What was the biggest challenge you faced growing up?',
      'Did you have a part-time job — and what was it like?',
      'What was the most rebellious thing you ever did?',
      'Who did you look up to when you were young?',
      'What did you worry about?',
      'What were you most proud of as a teenager?',
      'Was there a moment that changed the direction of your life?',
    ],
  },
  {
    number: 'Chapter Four',
    title: 'Early Adulthood',
    start: 31,
    questions: [
      'How did you find your way after school — did you know what you wanted?',
      'What was your first job?',
      'Where did you live when you first left home?',
      'What was the hardest thing about becoming an adult?',
      'Did you travel — and where did you go?',
      'What mistakes did you make that you learned the most from?',
      'Was there something you almost did but didn\'t?',
      'What were you most passionate about in your twenties?',
      'Who were the most important friendships of your early adult life?',
      'What did you believe about the world then that you don\'t believe now?',
    ],
  },
  {
    number: 'Chapter Five',
    title: 'Love and Relationships',
    start: 41,
    questions: [
      'How did you meet the person you chose to spend your life with?',
      'What did you think of them when you first met?',
      'When did you know they were the one?',
      'What was your favourite memory of falling in love?',
      'What has love taught you that nothing else could?',
      'What has been the hardest part of a long relationship?',
      'What\'s the secret to making it work?',
      'Were there other people who mattered to you before?',
      'What do you wish you\'d known about love when you were young?',
      'What would you want us to know about building a life together?',
    ],
  },
  {
    number: 'Chapter Six',
    title: 'Family Life',
    start: 51,
    questions: [
      'What was it like when you first became a parent?',
      'What were you most worried about as a new parent?',
      'What surprised you most about parenthood?',
      'What values did you most want to pass down?',
      'What do you wish you\'d done differently as a parent?',
      'What are you most proud of in your children?',
      'What does family mean to you?',
      'What family stories do you most want passed down?',
      'Were there sacrifices you made for the family that you never talked about?',
      'What do you hope your family remembers about you?',
    ],
  },
  {
    number: 'Chapter Seven',
    title: 'Work and Purpose',
    start: 61,
    questions: [
      'What work have you done in your life that you\'re most proud of?',
      'Was there a dream career you had that never happened?',
      'What did work mean to you — was it just a job or something more?',
      'What was the hardest professional challenge you ever faced?',
      'Did you ever take a risk that paid off?',
      'Did you ever take a risk that didn\'t?',
      'What did you learn about people through your working life?',
      'If you could go back, would you choose the same path?',
      'What advice would you give someone starting out today?',
      'What are you most proud of achieving professionally?',
    ],
  },
  {
    number: 'Chapter Eight',
    title: 'Memories and Milestones',
    start: 71,
    questions: [
      'What is the happiest moment of your life?',
      'What is the proudest moment of your life?',
      'What is the hardest thing you have ever been through?',
      'Was there a moment that completely changed everything?',
      'What world event affected you most personally?',
      'What is a memory you return to again and again?',
      'What place in the world has meant the most to you?',
      'Is there something you lost that you still think about?',
      'What was a moment of pure joy that you want to hold onto?',
      'What moment do you wish you could go back and live again?',
    ],
  },
  {
    number: 'Chapter Nine',
    title: 'Values and Lessons',
    start: 81,
    questions: [
      'What do you believe in most deeply?',
      'Has your faith or spirituality changed over your life?',
      'What is the most important lesson life has taught you?',
      'What do you know now that you wish you\'d known at 25?',
      'What would you tell your younger self?',
      'What has made you the most angry in life?',
      'What has brought you the most peace?',
      'What does a good life look like to you?',
      'What is the kindest thing anyone has ever done for you?',
      'What is the kindest thing you have ever done for someone else?',
    ],
  },
  {
    number: 'Chapter Ten',
    title: 'Reflections and Legacy',
    start: 91,
    questions: [
      'What do you want to be remembered for?',
      'What are you most grateful for?',
      'Is there anything you want to say that you\'ve never found the right moment for?',
      'What has been the greatest gift of your life?',
      'What do you still want to do or experience?',
      'What do you hope for your children and grandchildren?',
      'What has surprised you most about getting older?',
      'What gives your life meaning today?',
      'What words do you want to leave behind for the people you love?',
      'What is the one thing you most want us to know about your life?',
    ],
  },
]
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

main { font-family: 'DM Sans', sans-serif; }
.font-display { font-family: 'Playfair Display', Georgia, serif; }

.eyebrow {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #8C847E;
}

/* Founder note */
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

/* Article typography */
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

/* Chapter styling */
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

/* Tips */
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