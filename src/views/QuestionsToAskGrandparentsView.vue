<template>
  <main class="bg-white">

    <!-- Hero -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="eyebrow">Tell Me Your Story · Guide</p>
        <h1 class="mt-4 font-display text-3xl font-bold leading-tight tracking-[-0.02em] text-[#1C1917] sm:text-4xl md:text-5xl">
          Questions to Ask Your Grandparents Before It's Too Late
        </h1>
        <p class="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#5C534E] sm:text-lg">
          Between them, your grandparents hold more history, more wisdom, and more stories than anyone else in your life. Here's how to capture them.
        </p>
        <div class="mt-5 flex flex-wrap items-center justify-center gap-4 text-sm text-[#8C847E]">
          <span>By Mark, Founder of Tell Me Your Story</span>
          <span>·</span>
          <span>9 min read</span>
        </div>
      </div>
    </section>

    <!-- Article -->
    <article class="px-5 py-12 sm:px-8 sm:py-16">
      <div class="mx-auto max-w-2xl">

        <!-- Founder intro -->
        <div class="founder-note">
          <p class="founder-text">
            There is a particular kind of grief that comes after a grandparent dies. Not just the grief of losing them — but the grief of realising how little you knew about them. The stories they never told. The questions you never asked.
          </p>
          <p class="founder-text mt-4">
            I've heard this from so many people. "I wish I'd asked her about the war." "I never knew what he did before he had children." "I have no idea what her childhood was actually like."
          </p>
          <p class="founder-text mt-4">
            Your grandparents have lived through more history than almost anyone else in your life. They grew up in a different world. They survived things. They built things. They fell in love, raised families, made sacrifices — all before you existed.
          </p>
          <p class="founder-text mt-4 font-medium text-[#1C1917]">
            These questions are your chance to find out. Start today, while you still can.
          </p>
        </div>

        <!-- Why section -->
        <h2 class="article-h2 mt-10">What grandparents carry that no one else does</h2>
        <p class="article-p">
          Your grandparents are a living connection to a world that no longer exists. They remember things that aren't in any history book — the texture of everyday life in a different era, the small details that make the past feel real rather than abstract.
        </p>
        <p class="article-p mt-4">
          They also carry your family history in a way no one else does. The stories of their parents, their grandparents, the places the family came from, the sacrifices that were made. When they go, that knowledge goes with them — unless someone asks.
        </p>
        <p class="article-p mt-4">
          Most grandparents don't volunteer these stories. They assume nobody is interested. Or they don't want to burden you. Or they've simply never been asked. The questions below are designed to change that.
        </p>
        <p class="article-p mt-4 font-medium text-[#1C1917]">
          Ask them separately if you can — grandparents often have very different memories of the same events, and both versions are worth hearing.
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
        <h2 class="article-h2 mt-14">How to ask your grandparents these questions</h2>
        <p class="article-p">
          Grandparents need a slightly different approach. Here's what tends to work best.
        </p>

        <div class="mt-6 space-y-4">
          <div class="tip-card">
            <p class="tip-title">Ask them separately</p>
            <p class="tip-desc">Each grandparent has their own perspective, their own memories, their own version of events. One-to-one conversations go deeper than group ones — and you'll often get very different stories.</p>
          </div>
          <div class="tip-card">
            <p class="tip-title">Use photos as a starting point</p>
            <p class="tip-desc">An old family photo is one of the most powerful memory triggers there is. "Who's this?" or "What was happening here?" can open up a conversation that runs for hours.</p>
          </div>
          <div class="tip-card">
            <p class="tip-title">Ask about sensory details</p>
            <p class="tip-desc">"What did your house smell like?" or "What did you have for breakfast?" unlock memories that bigger questions can't reach. The specific details are the ones that make stories come alive.</p>
          </div>
          <div class="tip-card">
            <p class="tip-title">Don't rush — spread it over visits</p>
            <p class="tip-desc">A few questions per visit is better than an overwhelming session. It gives them time to think, and often they'll come back to you next time having remembered something new.</p>
          </div>
          <div class="tip-card">
            <p class="tip-title">Record everything you can</p>
            <p class="tip-desc">Their voice. Their laugh. The way they tell a story. A simple voice memo on your phone is enough — and you'll treasure it more than any notes you take.</p>
          </div>
        </div>

        <!-- Quote -->
        <div class="mt-12 rounded-3xl border border-[#E8DDD0] bg-[#FAF7F4] px-6 py-8 sm:px-8 sm:py-10 text-center">
          <p class="font-display text-xl italic leading-relaxed text-[#5C534E] sm:text-2xl">
            "My grandad talked for three hours. My mum sat there crying — she'd never heard any of it before."
          </p>
          <p class="mt-4 text-sm text-[#9C7C5C]">
            — From a real Tell Me Your Story keepsake
          </p>
          <p class="mt-3 text-sm text-[#8C847E]">
            The stories are there. They just need to be asked for.
          </p>
        </div>

        <!-- Internal links -->
        <div class="mt-10 rounded-2xl border border-[#E8DDD0] bg-[#FAF7F4] px-6 py-5">
          <p class="text-sm font-medium text-[#1C1917]">More guides</p>
          <div class="mt-3 flex flex-col gap-2 text-sm">
            <router-link to="/questions-to-ask-your-grandma" class="text-[#7C5C3B] hover:underline">
              → Questions to ask your grandma specifically
            </router-link>
            <router-link to="/blog/questions-to-ask-your-parents" class="text-[#7C5C3B] hover:underline">
              → 100 questions to ask your parents before it's too late
            </router-link>
            <router-link to="/questions-to-ask-your-mum" class="text-[#7C5C3B] hover:underline">
              → Questions to ask your mum about her life
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
            Preserve their stories — before they're gone
          </h3>
          <p class="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#A8A29E]">
            Tell Me Your Story guides your grandparent through 100 meaningful questions across their whole life — saving every answer automatically and turning their story into a beautifully designed keepsake book or video your family can hold onto for generations.
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
            Start their story — it's free
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
  title: 'Questions to Ask Your Grandparents Before It\'s Too Late | Tell Me Your Story',
  description: '80 meaningful questions to ask your grandparents about their childhood, history, family traditions, values, and legacy. Preserve their stories before they\'re lost.',
  schema: {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: 'Questions to Ask Your Grandparents Before It\'s Too Late',
        description: '80 meaningful questions to ask your grandparents about their childhood, history, family traditions, values, and legacy.',
        author: { '@type': 'Person', name: 'Mark', url: 'https://tellmeyourstory.uk' },
        publisher: {
          '@type': 'Organization',
          name: 'Tell Me Your Story',
          url: 'https://tellmeyourstory.uk',
          logo: { '@type': 'ImageObject', url: 'https://tellmeyourstory.uk/logo/logo-full-new.png' },
        },
        datePublished: '2026-05-05',
        dateModified: '2026-05-05',
        url: 'https://tellmeyourstory.uk/questions-to-ask-your-grandparents',
        mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://tellmeyourstory.uk/questions-to-ask-your-grandparents' },
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What are good questions to ask your grandparents?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Good questions to ask your grandparents include asking about their childhood home, what the world was like when they were young, how they met, what they lived through historically, family traditions they want passed down, and what they most want their grandchildren to know about them.',
            },
          },
          {
            '@type': 'Question',
            name: 'What questions should I ask my grandparents about their life?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The most meaningful questions to ask your grandparents are: What was your childhood like? What world events do you remember most vividly? How did you meet each other? What was the hardest thing you ever went through? What family stories do you most want passed down? What do you want your grandchildren to remember about you?',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I get my grandparents to share their stories?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Use old photos as conversation starters, ask specific sensory questions like "what did your home smell like?", and ask them separately so each gets to tell their own version. Spread questions across multiple visits rather than one session, and record what they say — even just on your phone.',
            },
          },
          {
            '@type': 'Question',
            name: 'Why is it important to ask your grandparents about their life?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Your grandparents carry family history, lived experience of historical events, and personal stories that exist nowhere else. When they are gone, that knowledge is gone too unless someone asks. Recording their stories preserves family identity across generations and gives grandchildren a sense of where they came from.',
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
    title: 'The World They Were Born Into',
    start: 1,
    intro: 'Your grandparents were born into a world that has largely vanished. These questions help you understand where they came from — and the era that shaped everything about them.',
    questions: [
      'Where and when were you born — and what has the family told you about that time?',
      'What was the world like when you were growing up?',
      'What was your childhood home like — what did it look and feel like?',
      'What did home smell like when you were little?',
      'Did your family have much money when you were young?',
      'What did everyday life look like — what did you eat, wear, do?',
      'What was your street or village or town like back then?',
      'What is the earliest memory you have?',
      'What were you like as a child?',
      'Who were the most important people in your early life?',
    ],
  },
  {
    number: 'Chapter Two',
    title: 'Their Families and Childhood',
    start: 11,
    intro: 'The families that raised them — who they were, the relationships that formed, the memories that have lasted a lifetime.',
    questions: [
      'What were your own parents like?',
      'What was your relationship with your mother like?',
      'What was your relationship with your father like?',
      'Did you have brothers or sisters — what were they like?',
      'What were your grandparents like — do you remember them?',
      'What did you love doing as a child?',
      'What were you afraid of when you were young?',
      'What family traditions did you grow up with?',
      'What did your family do at Christmas or on special occasions?',
      'What childhood memory do you return to most often?',
    ],
  },
  {
    number: 'Chapter Three',
    title: 'School and Growing Up',
    start: 21,
    intro: 'Their schooldays — in an era when education, opportunity, and expectations were very different.',
    questions: [
      'What was school like for you?',
      'Were you a good student — what did you enjoy or struggle with?',
      'Who was your best friend growing up?',
      'Was there a teacher who made a real difference to you?',
      'What did you do after school and in the holidays?',
      'What did you want to be when you grew up?',
      'What opportunities did you have — or wish you\'d had?',
      'What was the most important thing you learned outside of school?',
      'What did the future look like from where you were standing?',
      'What do you wish someone had told you when you were young?',
    ],
  },
  {
    number: 'Chapter Four',
    title: 'History They Lived Through',
    start: 31,
    intro: 'Your grandparents didn\'t just read about history — they lived it. These are the questions that connect the past to a real person.',
    questions: [
      'What historical events do you remember most vividly from your childhood or youth?',
      'How did major world events affect your family directly?',
      'What was wartime like — or the years just after?',
      'What was rationing or going without really like day to day?',
      'How did the world change most dramatically during your lifetime?',
      'What invention or change has made the biggest difference to your life?',
      'What do you think people today misunderstand about what life was really like back then?',
      'What are you most glad has changed since you were young?',
      'What do you miss about the way things used to be?',
      'What moment in history affected you most personally?',
    ],
  },
  {
    number: 'Chapter Five',
    title: 'Love and Marriage',
    start: 41,
    intro: 'How they found each other — and what they\'ve learned about love across a lifetime together.',
    questions: [
      'How did you meet — what was the full story?',
      'What did you think of each other when you first met?',
      'When did you know this was the person you wanted to spend your life with?',
      'What was your wedding day like?',
      'Where did you live when you first got married?',
      'What has been the secret to a long relationship?',
      'What has been the hardest part?',
      'What has love taught you that nothing else could?',
      'What do you wish you had known about marriage when you were starting out?',
      'What would you want your grandchildren to know about building a life with someone?',
    ],
  },
  {
    number: 'Chapter Six',
    title: 'Becoming Parents and Grandparents',
    start: 51,
    intro: 'The family they built — and what it meant to become the people they are to you now.',
    questions: [
      'What do you remember about becoming a parent for the first time?',
      'What were you most worried about as a new parent?',
      'What surprised you most about parenthood?',
      'What were your hopes for your children?',
      'What are you most proud of in your children?',
      'What do you remember about becoming a grandparent?',
      'What do you love most about being a grandparent?',
      'What do you most want your grandchildren to know about you?',
      'What family values do you most want passed down?',
      'What do you hope your family remembers about you?',
    ],
  },
  {
    number: 'Chapter Seven',
    title: 'Work and Purpose',
    start: 61,
    intro: 'The working lives they built — across an era of very different opportunities and expectations.',
    questions: [
      'What was your first job — and what was it like?',
      'What work are you most proud of across your whole life?',
      'What did work mean to you beyond just earning money?',
      'What was the hardest professional challenge you ever faced?',
      'Did you ever take a risk that paid off — or one that didn\'t?',
      'If you could go back, would you choose the same path?',
      'What advice would you give someone starting out in life today?',
    ],
  },
  {
    number: 'Chapter Eight',
    title: 'Family Stories and Traditions',
    start: 68,
    intro: 'The history, the recipes, the rituals — the things that should never be lost.',
    questions: [
      'What family stories do you most want passed down?',
      'What do you know about the family\'s history that might otherwise be forgotten?',
      'Are there family recipes that came from your own parents or grandparents?',
      'What traditions do you most want us to keep going?',
      'Are there relatives from the past you think we should know more about?',
      'What would you most like to leave behind for future generations?',
    ],
  },
  {
    number: 'Chapter Nine',
    title: 'Wisdom and Legacy',
    start: 74,
    intro: 'What a long life has taught them — and what they most want to leave behind.',
    questions: [
      'What do you believe in most deeply?',
      'What is the most important lesson life has taught you?',
      'What do you know now that you wish you\'d known at 25?',
      'What would you tell your younger self?',
      'What has brought you the most peace in life?',
      'What does a good life look like to you?',
      'What are you most grateful for?',
      'What is the proudest moment of your life?',
      'What do you want to be remembered for?',
      'What is the one thing you most want your grandchildren to carry forward?',
      'Is there anything you want to say that you\'ve never found the right moment for?',
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