<template>
  <main class="bg-white">

    <!-- Hero -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="eyebrow">Tell Me Your Story · Guide</p>
        <h1 class="mt-4 font-display text-3xl font-bold leading-tight tracking-[-0.02em] text-[#1C1917] sm:text-4xl md:text-5xl">
          Questions to Ask Your Grandma Before It's Too Late
        </h1>
        <p class="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#5C534E] sm:text-lg">
          She has lived through more history than you can imagine. Here's how to hear it — in her own words, before those words are gone.
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
            Grandmothers carry more history than almost anyone else in our lives. They were born into a different world — one without the internet, often without much money, sometimes without peace. They lived through things we've only read about.
          </p>
          <p class="founder-text mt-4">
            And yet most of us have never really asked. We sit with them at Christmas, we call on birthdays, we visit when we can. But we rarely sit down and say: tell me your story. Tell me about the girl you were before you were anyone's grandmother.
          </p>
          <p class="founder-text mt-4">
            I built Tell Me Your Story because I almost ran out of time to ask. I don't want that to happen to you.
          </p>
          <p class="founder-text mt-4 font-medium text-[#1C1917]">
            Here are 80 questions to ask your grandma — across every chapter of her long and remarkable life.
          </p>
        </div>

        <!-- Why section -->
        <h2 class="article-h2 mt-10">Why grandmothers are the most important people to ask</h2>
        <p class="article-p">
          Your grandma is likely the oldest person in your family — and the one whose story reaches furthest back in time. The world she grew up in barely resembles the one you know. The things she has seen, survived, and built are extraordinary by any measure.
        </p>
        <p class="article-p mt-4">
          But grandmothers are also often the quietest about their own lives. They tend to deflect — to say "oh, there's nothing interesting about me" — when in fact their stories are the most interesting of all. They need to be asked. They need to feel that someone genuinely wants to know.
        </p>
        <p class="article-p mt-4">
          When you ask, most grandmothers light up. They remember things they haven't thought about in decades. They tell you things your parents have never heard. They are, it turns out, waiting to be asked.
        </p>
        <p class="article-p mt-4 font-medium text-[#1C1917]">
          Don't wait. Start with one question today.
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
        <h2 class="article-h2 mt-14">How to ask your grandma these questions</h2>
        <p class="article-p">
          Grandmothers often need a slightly different approach to parents. Here's what works.
        </p>

        <div class="mt-6 space-y-4">
          <div class="tip-card">
            <p class="tip-title">Reassure her that her story matters</p>
            <p class="tip-desc">Many grandmothers genuinely don't believe their lives are interesting enough to talk about. Tell her directly: "I want to know about your life. I want to write it down." That changes everything.</p>
          </div>
          <div class="tip-card">
            <p class="tip-title">Start with the sensory details</p>
            <p class="tip-desc">"What did your childhood home smell like?" or "What did you eat for breakfast when you were little?" These specific, sensory questions unlock memories that abstract questions can't reach.</p>
          </div>
          <div class="tip-card">
            <p class="tip-title">Ask about objects and places</p>
            <p class="tip-desc">Show her an old photo if you have one, or ask about a specific place she's mentioned before. Tangible anchors help older people access memories more naturally.</p>
          </div>
          <div class="tip-card">
            <p class="tip-title">Go slowly and visit often</p>
            <p class="tip-desc">Don't try to capture everything in one sitting. A few questions per visit, over many visits, gives you a richer picture — and gives her something to look forward to.</p>
          </div>
          <div class="tip-card">
            <p class="tip-title">Record it — even just audio</p>
            <p class="tip-desc">Her voice, her laugh, the way she tells a story — those are irreplaceable. A voice memo on your phone is enough. You'll be grateful for it later.</p>
          </div>
        </div>

        <!-- Quote -->
        <div class="mt-12 rounded-3xl border border-[#E8DDD0] bg-[#FAF7F4] px-6 py-8 sm:px-8 sm:py-10 text-center">
          <p class="font-display text-xl italic leading-relaxed text-[#5C534E] sm:text-2xl">
            "She told me she once danced all night at a village hall with a boy she never saw again. She was 17. I never knew that version of her existed."
          </p>
          <p class="mt-4 text-sm text-[#9C7C5C]">
            — From a real Tell Me Your Story keepsake
          </p>
          <p class="mt-3 text-sm text-[#8C847E]">
            Every grandmother has a story like that. One question is all it takes to find it.
          </p>
        </div>

        <!-- Internal links -->
        <div class="mt-10 rounded-2xl border border-[#E8DDD0] bg-[#FAF7F4] px-6 py-5">
          <p class="text-sm font-medium text-[#1C1917]">More guides</p>
          <div class="mt-3 flex flex-col gap-2 text-sm">
            <router-link to="/questions-to-ask-your-grandparents" class="text-[#7C5C3B] hover:underline">
              → Questions to ask your grandparents
            </router-link>
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
            Turn your grandma's story into a keepsake
          </h3>
          <p class="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#A8A29E]">
            These questions are built into a guided app that makes capturing your grandma's story feel natural and achievable. Every answer saves automatically — then turns into a beautifully designed keepsake book or video your family can hold onto for generations.
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
            Start Grandma's Story — it's free
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
  title: 'Questions to Ask Your Grandma Before It\'s Too Late | Tell Me Your Story',
  description: '80 meaningful questions to ask your grandma about her childhood, wartime memories, family traditions, values, and legacy. Preserve her story before it\'s lost.',
  schema: {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: 'Questions to Ask Your Grandma Before It\'s Too Late',
        description: '80 meaningful questions to ask your grandma about her childhood, wartime memories, family traditions, values, and legacy.',
        author: { '@type': 'Person', name: 'Mark', url: 'https://tellmeyourstory.uk' },
        publisher: {
          '@type': 'Organization',
          name: 'Tell Me Your Story',
          url: 'https://tellmeyourstory.uk',
          logo: { '@type': 'ImageObject', url: 'https://tellmeyourstory.uk/logo/logo-full-new.png' },
        },
        datePublished: '2026-05-05',
        dateModified: '2026-05-05',
        url: 'https://tellmeyourstory.uk/questions-to-ask-your-grandma',
        mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://tellmeyourstory.uk/questions-to-ask-your-grandma' },
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What are good questions to ask your grandma?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Good questions to ask your grandma include asking about her childhood home, what the world was like when she was young, how she met your grandfather, what she sacrificed for the family, her favourite memories, and what she most wants future generations to know about her life.',
            },
          },
          {
            '@type': 'Question',
            name: 'What questions should I ask my grandma about her life?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The most meaningful questions to ask your grandma are: What was your childhood like? What was the world like when you were young? How did you meet grandad? What was the hardest thing you ever went through? What family traditions do you most want passed down? What do you want your grandchildren to know about you?',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I get my grandma to share her life story?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Many grandmothers don\'t think their story is interesting enough to share. Reassure her that you genuinely want to know. Start with sensory questions like "what did your childhood home smell like?" or show her an old photo. Go slowly, visit often, and record what she says — even just on your phone.',
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
    title: 'The World She Was Born Into',
    start: 1,
    intro: 'Your grandma was born into a world that barely resembles the one you know. These questions help you understand where she came from — and what shaped her from the very start.',
    questions: [
      'Where and when were you born — and what have you been told about that day?',
      'What was the world like when you were growing up?',
      'What was your childhood home like — what did it look and feel like?',
      'What did home smell like when you were little?',
      'Did your family have much money when you were young?',
      'What did you eat — what were the family meals like?',
      'What was your street or village or town like back then?',
      'What is the earliest memory you have?',
      'What were you like as a little girl?',
      'Who were the most important people in your early life?',
    ],
  },
  {
    number: 'Chapter Two',
    title: 'Her Family and Childhood',
    start: 11,
    intro: 'The family she grew up in — who they were, what they were like, the traditions and memories that shaped her.',
    questions: [
      'What were your parents like?',
      'What was your relationship with your own mother like?',
      'What was your relationship with your father like?',
      'Did you have brothers or sisters — what were they like?',
      'What were your grandparents like?',
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
    intro: 'School in her day was a different world — the teachers, the rules, the friendships that formed her.',
    questions: [
      'What was school like for you?',
      'Were you a good student — what did you enjoy?',
      'Who was your best friend growing up and what were they like?',
      'Was there a teacher who made a real difference to you?',
      'What did you do after school and in the holidays?',
      'What did you want to be when you grew up?',
      'What was the most rebellious thing you ever did as a girl?',
      'What was the most important lesson you learned growing up — not from school, but from life?',
      'What did the future look like to you back then?',
      'What do you wish someone had told you when you were young?',
    ],
  },
  {
    number: 'Chapter Four',
    title: 'History She Lived Through',
    start: 31,
    intro: 'Your grandma has lived through more history than most books cover. These questions help you understand the world through her eyes.',
    questions: [
      'What world events do you remember most vividly from your childhood?',
      'What was it like growing up during wartime — or in the years just after?',
      'How did major historical events affect your family directly?',
      'What was rationing like — or what did going without feel like?',
      'How did the world change most dramatically during your lifetime?',
      'What invention or change has made the biggest difference to your life?',
      'What do you think people today don\'t understand about what life was really like back then?',
      'What are you most glad has changed since you were young?',
      'What do you miss about the way things used to be?',
    ],
  },
  {
    number: 'Chapter Five',
    title: 'Love, Marriage and Family',
    start: 40,
    intro: 'How she found love, built a family, and became the grandmother you know.',
    questions: [
      'How did you meet grandad — what was the story?',
      'What did you think of him when you first met?',
      'When did you know he was the one?',
      'What was your wedding day like?',
      'What has love taught you that nothing else could?',
      'What has been the hardest part of a long relationship?',
      'What is the secret to a happy marriage?',
      'What do you remember about becoming a mother for the first time?',
      'What was the proudest moment of your life as a parent?',
      'What do you most want your grandchildren to know about you?',
    ],
  },
  {
    number: 'Chapter Six',
    title: 'Work and Purpose',
    start: 50,
    intro: 'The working life she built — often in an era when women\'s choices were far more limited than today.',
    questions: [
      'Did you work outside the home — what did you do?',
      'What was your first job and what was it like?',
      'What work are you most proud of in your life?',
      'Were there things you wanted to do professionally that weren\'t possible at the time?',
      'What did work mean to you beyond just earning money?',
      'What did you learn about people through your working life?',
      'What would you have done differently if you\'d had more choices?',
      'What advice would you give a young woman starting out today?',
    ],
  },
  {
    number: 'Chapter Seven',
    title: 'Memories She Treasures',
    start: 58,
    intro: 'The moments she carries with her — the ones that have meant the most across a long and full life.',
    questions: [
      'What is the happiest moment of your life?',
      'What is the proudest moment of your life?',
      'What is the hardest thing you have ever been through?',
      'What place in the world has meant the most to you?',
      'What is a memory you return to again and again?',
      'What was a moment of pure joy that you never want to forget?',
      'Is there something you lost that you still think about?',
      'What moment do you wish you could go back and live again?',
    ],
  },
  {
    number: 'Chapter Eight',
    title: 'Family Traditions and Recipes',
    start: 66,
    intro: 'The things she has always done — the recipes, the rituals, the ways of living that should never be lost.',
    questions: [
      'What recipes do you most want to pass down to us?',
      'Are there family dishes that came from your own parents or grandparents?',
      'What family traditions do you most want us to keep going?',
      'What did your family always do at Christmas, Easter, or other celebrations?',
      'Are there family stories you feel should never be forgotten?',
      'What do you know about our family history that you\'re worried might be lost?',
    ],
  },
  {
    number: 'Chapter Nine',
    title: 'Wisdom and Legacy',
    start: 72,
    intro: 'What she has learned across a long life — and what she most wants to leave behind.',
    questions: [
      'What do you believe in most deeply?',
      'Has your faith or sense of meaning changed over your life?',
      'What is the most important lesson life has taught you?',
      'What do you know now that you wish you had known at 25?',
      'What would you tell your younger self?',
      'What has brought you the most peace?',
      'What does a good life look like to you?',
      'What are you most grateful for?',
      'What do you want to be remembered for?',
      'What is the one thing you most want your grandchildren to carry forward?',
      'Is there anything you want to say that you have never found the right moment for?',
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