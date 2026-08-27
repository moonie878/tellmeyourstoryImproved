<template>
  <main class="bg-white">

    <!-- Hero -->
    <section class="bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Questions to Ask Elderly Parents</p>
        <h1 class="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          100 questions to ask your<br>
          <em class="text-[#C4A882] italic">elderly parents about their life</em>
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#A8A29E]">
          The stories your elderly parents carry are irreplaceable. These 100 questions help you draw them out — gently, naturally, and before it's too late.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <router-link to="/register" class="rounded-full bg-[#C4A882] px-7 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Start capturing their story free →</router-link>
          <router-link to="/example" class="rounded-full border border-white/20 px-7 py-3 text-sm font-medium text-white transition hover:bg-white/10">See an example</router-link>
        </div>
      </div>
    </section>

    <!-- Why ask -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Why these questions matter</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Every family has stories that will be lost</h2>
        </div>
        <div class="mt-8 text-sm leading-7 text-stone-600 max-w-xl mx-auto space-y-4">
          <p>Most elderly parents have lived through extraordinary things — wartime childhoods, hard choices, quiet sacrifices, a world that no longer exists. But they rarely volunteer these stories unprompted. The right question, asked at the right moment, can unlock a lifetime of memories your family would never otherwise hear.</p>
          <p>The problem is most of us don't know what to ask. We assume they'll bring it up, or that there'll be time, or that they wouldn't want to talk about it. Usually none of these things are true.</p>
          <p>What is true is that these conversations don't happen by accident. You have to start them. And the questions below are designed to do exactly that — gently, naturally, without pressure.</p>
          <p>Once you've had these conversations, capture the answers. Write them down, record them on your phone, or use Tell Me Your Story to turn them into a beautifully printed keepsake book. The stories themselves are precious — but they become priceless when they're preserved.</p>
        </div>
        <div class="mt-6 flex flex-wrap justify-center gap-3">
          <router-link to="/how-to-capture-parents-life-story" class="text-xs text-[#7C5C3B] underline hover:no-underline">How to capture your parents' life story →</router-link>
          <span class="text-xs text-stone-300">·</span>
          <router-link to="/life-story-questions" class="text-xs text-[#7C5C3B] underline hover:no-underline">150 life story questions →</router-link>
          <span class="text-xs text-stone-300">·</span>
          <router-link to="/dementia-life-story-book" class="text-xs text-[#7C5C3B] underline hover:no-underline">Life story books for dementia →</router-link>
          <span class="text-xs text-stone-300">·</span>
          <router-link to="/questions-to-ask-dying-parent" class="text-xs text-[#7C5C3B] underline hover:no-underline">Questions for a dying parent →</router-link>
          <span class="text-xs text-stone-300">·</span>
          <router-link to="/life-story-work-in-care-homes" class="text-xs text-[#7C5C3B] underline hover:no-underline">Life story work in care homes →</router-link>
        </div>
      </div>
    </section>

    <!-- How to use these questions -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Before you start</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">How to use these questions</h2>
        </div>
        <div class="mt-10 space-y-4">
          <div v-for="tip in howToTips" :key="tip.title" class="rounded-2xl bg-white p-6">
            <div class="flex items-start gap-4">
              <span class="text-xl flex-shrink-0">{{ tip.icon }}</span>
              <div>
                <p class="text-sm font-semibold text-stone-900">{{ tip.title }}</p>
                <p class="mt-2 text-xs leading-6 text-stone-500">{{ tip.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Questions -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="text-center mb-12">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">100 questions</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Questions to ask elderly parents about their life</h2>
          <p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-500">Grouped by chapter — you don't need to work through them in order. Start wherever feels natural.</p>
        </div>

        <div v-for="chapter in chapters" :key="chapter.title" class="mb-10">
          <div class="mb-4 flex items-center gap-3">
            <span class="text-2xl">{{ chapter.icon }}</span>
            <h3 class="font-display text-xl font-bold text-stone-900">{{ chapter.title }}</h3>
          </div>
          <div class="grid gap-2 sm:grid-cols-2">
            <div
              v-for="q in chapter.questions"
              :key="q"
              class="rounded-xl bg-[#F5F0E8] px-4 py-3 text-sm text-stone-700 leading-5"
            >
              {{ q }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- What if they struggle -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Common situations</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">What if they struggle to remember?</h2>
        </div>
        <div class="mt-8 text-sm leading-7 text-stone-600 max-w-xl mx-auto space-y-4">
          <p>Memory loss is common in older age, and it can make life story conversations feel difficult. But even with significant memory loss, long-term memories often remain far stronger than short-term ones — people who can't recall what they had for breakfast can often describe their childhood home in vivid detail.</p>
          <p>A few things that help: use old photos as conversation starters, ask about senses (what did your childhood home smell like?), and focus on feelings rather than facts (what did summers feel like as a child?). These approaches bypass the factual memory system and access emotional memory, which tends to be more resilient.</p>
          <p>If they're living with dementia, our <router-link to="/dementia-life-story-book" class="text-[#7C5C3B] underline hover:no-underline">dementia life story book guide</router-link> has specific advice for capturing stories at different stages of the illness.</p>
        </div>
        <div class="mt-10 grid gap-4 sm:grid-cols-2">
          <div v-for="s in struggles" :key="s.title" class="rounded-2xl bg-white p-5">
            <p class="text-sm font-semibold text-stone-900">{{ s.title }}</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">{{ s.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- How to record and preserve -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Don't lose what they share</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">How to capture and keep their answers</h2>
        </div>
        <div class="mt-10 space-y-4">
          <div v-for="tip in captureTips" :key="tip.title" class="rounded-2xl border border-stone-200 p-5">
            <div class="flex items-start gap-4">
              <span class="text-xl flex-shrink-0">{{ tip.icon }}</span>
              <div>
                <p class="text-sm font-semibold text-stone-900">{{ tip.title }}</p>
                <p class="mt-1 text-xs leading-5 text-stone-500">{{ tip.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">FAQ</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Common questions</h2>
        </div>
        <div class="mt-10 space-y-4">
          <div v-for="faq in faqs" :key="faq.q" class="rounded-2xl border border-stone-200 bg-white p-6">
            <p class="text-sm font-semibold text-stone-900">{{ faq.q }}</p>
            <p class="mt-2 text-xs leading-6 text-stone-500">{{ faq.a }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Related pages -->
    <section class="px-5 py-12 sm:px-8">
      <div class="mx-auto max-w-3xl">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C] mb-6">Related reading</p>
        <div class="grid gap-4 sm:grid-cols-3">
          <router-link to="/questions-to-ask-dying-parent" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Questions for a Dying Parent</p>
            <p class="mt-1 text-xs text-stone-500">A gentle guide to final conversations</p>
          </router-link>
          <router-link to="/dementia-life-story-book" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Dementia Life Story Book</p>
            <p class="mt-1 text-xs text-stone-500">Capturing stories when memory is fading</p>
          </router-link>
          <router-link to="/keepsake-book" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Keepsake Book</p>
            <p class="mt-1 text-xs text-stone-500">Turn their answers into a printed keepsake</p>
          </router-link>
        </div>
      </div>
    </section>
<!-- Internal link — Christmas gifts -->
<section class="px-5 pb-12 sm:px-8">
  <div class="mx-auto max-w-2xl text-center">
    <p class="text-[15px] leading-[1.8] text-[#5C534E]">
      If you're looking for a way to ask these questions properly, a keepsake book
      makes a good excuse — and a good present. See our guide to
      <router-link
        to="/christmas-gifts-for-grandparents"
        class="font-medium text-[#7C5C3B] underline underline-offset-2"
      >Christmas gifts for grandparents</router-link>.
    </p>
  </div>
</section>
    <!-- CTA -->
    <section class="bg-[#1C1917] px-5 py-16 text-center sm:px-8 sm:py-20">
      <h2 class="font-display text-2xl font-bold text-white sm:text-3xl">Their stories won't keep themselves</h2>
      <p class="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#A8A29E]">Tell Me Your Story guides your parent through 100 questions by voice or text — and turns their answers into a beautifully printed keepsake book. Free to start, no card needed.</p>
      <router-link to="/register" class="mt-8 inline-block rounded-full bg-[#C4A882] px-8 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Start capturing their story free →</router-link>
      <p class="mt-4 text-xs text-[#9C7C5C]">Free to start · One-time payment · Printed book from £{{ PRINTED_BOOK_FROM_PRICE.toFixed(2) }}</p>
    </section>

  </main>
</template>

<script setup lang="ts">
import { useSeo } from '../composables/useSeo'
import { PRINTED_BOOK_FROM_PRICE } from '../lib/printPricing'

const howToTips = [
  { icon: '☕', title: 'Don\'t read from a list', desc: 'Pick two or three questions and let the conversation flow naturally from there. The best questions are the follow-up ones — "what happened next?" and "how did that feel?" — that you ask in the moment.' },
  { icon: '📱', title: 'Record if you can', desc: 'Ask permission to record on your phone. Their voice — the accent, the rhythm, the laugh — is worth more than any transcript. Tell Me Your Story has built-in voice recording that saves directly into their keepsake book.' },
  { icon: '⏱️', title: 'Keep it short', desc: 'One good question over a cup of tea is worth more than an hour-long interview. Come back to it over several visits. Memory works in layers — some stories surface days after the conversation that triggered them.' },
  { icon: '🤫', title: 'Let silence do its work', desc: 'Don\'t rush to fill pauses. Older people sometimes take longer to retrieve memories. The silence is almost always worth waiting through.' },
  { icon: '📸', title: 'Use photos as prompts', desc: 'Old photographs are powerful memory triggers. Show them a photo from their past and ask: who are these people? What was happening? What do you remember about that day?' },
  { icon: '✍️', title: 'Capture it properly', desc: 'Don\'t let what they share live only in your memory. Write it down, record it, or use Tell Me Your Story to turn their answers into a beautifully printed keepsake book their whole family can keep.' },
]

const chapters = [
  {
    icon: '🌱', title: 'Childhood & early life',
    questions: [
      'Where were you born and what was it like growing up there?',
      'What\'s your very earliest memory?',
      'What did your childhood home look like?',
      'What did your parents do for work?',
      'What was your relationship with your brothers and sisters like?',
      'Who were your closest friends as a child?',
      'What games did you play when you were young?',
      'What did a perfect summer day look like when you were small?',
      'Is there a place from your childhood you still think about?',
      'What did your family do for fun?',
    ]
  },
  {
    icon: '🎒', title: 'School years',
    questions: [
      'What was school like for you?',
      'What subjects did you enjoy most?',
      'Was there a teacher who made a real difference to you?',
      'Who was your best friend at school?',
      'What were you good at that surprised your teachers?',
      'What did you struggle with?',
      'What did you want to be when you grew up?',
      'What\'s the most mischief you ever got into at school?',
      'What do you remember about leaving school?',
      'Were there things you wished school had taught you?',
    ]
  },
  {
    icon: '💙', title: 'Teenage years',
    questions: [
      'What music did you love as a teenager?',
      'How would you describe yourself as a teenager?',
      'What did you and your friends get up to?',
      'Was there a moment that changed how you saw the world?',
      'What were you most passionate about?',
      'Who influenced you most during those years?',
      'What was the fashion like when you were young?',
      'What did Saturday nights look like for you?',
      'Did you have a first love? What were they like?',
      'What were your dreams for the future?',
    ]
  },
  {
    icon: '💼', title: 'Work and career',
    questions: [
      'What was your very first job?',
      'How did you end up doing the work you did?',
      'What\'s the job you\'re most proud of?',
      'Was there a moment in your working life that changed everything?',
      'What did you learn from work that you\'ve never forgotten?',
      'Who was the best boss you ever had?',
      'What was the hardest working period of your life?',
      'Did your work ever take you somewhere unexpected?',
      'What would you have done if you could have done anything?',
      'What does retirement feel like compared to what you expected?',
    ]
  },
  {
    icon: '❤️', title: 'Love and relationships',
    questions: [
      'How did you meet your partner?',
      'What did you first notice about them?',
      'What made you sure they were the one?',
      'What\'s your favourite memory of the two of you together?',
      'What\'s the secret to a long and happy relationship?',
      'What have you learned about love over the years?',
      'Is there something about your relationship you\'ve never told anyone?',
      'What do you want people to know about your partner?',
      'What have been the hardest times in your relationship?',
      'What are you most grateful for in your marriage?',
    ]
  },
  {
    icon: '👨‍👩‍👧', title: 'Family life',
    questions: [
      'What do you remember about becoming a parent?',
      'What kind of parent did you hope to be?',
      'What\'s your proudest moment as a parent?',
      'What\'s the funniest thing your children ever did?',
      'What traditions did your family build together?',
      'What did your children teach you?',
      'What do you wish you\'d done differently as a parent?',
      'What do you hope your children know about how you feel about them?',
      'What family memories do you return to most?',
      'What do you want your grandchildren to know about you?',
    ]
  },
  {
    icon: '💪', title: 'Hard times',
    questions: [
      'What\'s the hardest thing you\'ve ever been through?',
      'How did you get through it?',
      'Who helped you most when things were difficult?',
      'Is there a loss you\'ve never fully got over?',
      'What did you learn about yourself from difficult times?',
      'What would you tell someone going through something similar?',
      'What\'s something you survived that surprised you?',
      'Have you ever had to make a very difficult choice?',
      'What kept you going when things felt impossible?',
      'What would you do differently if you faced it again?',
    ]
  },
  {
    icon: '🌟', title: 'Proudest moments',
    questions: [
      'What achievement are you most proud of?',
      'Is there something you did that surprised even you?',
      'What\'s something you made or built that you\'re proud of?',
      'Was there a moment when you felt at your best?',
      'What risk paid off better than you expected?',
      'What have you contributed to the world?',
      'Is there something you did for someone that meant a lot to you?',
      'What talent do you have that people might not know about?',
      'What\'s something you did that was harder than people realised?',
      'What do you feel you got right?',
    ]
  },
  {
    icon: '🤍', title: 'Values and wisdom',
    questions: [
      'What values have guided your life?',
      'What do you know now that you wish you\'d known at 30?',
      'What would you tell your younger self?',
      'What truly matters in life?',
      'What\'s the best advice you ever received?',
      'What lesson did you learn the hard way?',
      'What do you believe about happiness?',
      'What does being a good person mean to you?',
      'What would you do differently?',
      'What are you most at peace with?',
    ]
  },
  {
    icon: '📖', title: 'Legacy',
    questions: [
      'How would you like to be remembered?',
      'What do you want your family to know about you?',
      'What stories do you hope get told about you?',
      'What do you want to pass on to your children and grandchildren?',
      'Is there anything you\'ve never said that you\'d like to say now?',
      'What are you most grateful for in your life?',
      'What do you hope for future generations?',
      'If your life were a book, how would you describe it?',
      'What would make you feel your life had mattered?',
      'What final advice would you give the people you love?',
    ]
  },
]

const struggles = [
  { title: 'They say "I can\'t remember"', desc: 'Try a sensory prompt instead — what did their childhood home smell like? What did summers sound like? Sensory memory often unlocks stories that direct factual questions can\'t reach.' },
  { title: 'They keep telling the same story', desc: 'That\'s the story that matters most to them. Ask questions about it you\'ve never asked before — who else was there, what happened before, what happened after.' },
  { title: 'They live with dementia', desc: 'Long-term memories often remain stronger than short-term ones. Use photos and familiar objects as conversation starters. Our dementia life story guide has specific advice for each stage.' },
  { title: 'They seem reluctant to talk', desc: 'Start with lighter topics — funny memories, favourite foods, the music they loved. Once the conversation is flowing, it often moves naturally into deeper territory.' },
]

const captureTips = [
  { icon: '📱', title: 'Record on your phone', desc: 'A voice memo app captures their voice — the accent, the rhythm, the pauses. Ask permission first. Most people are happy to be recorded when they understand it\'s just for the family.' },
  { icon: '✍️', title: 'Write it down immediately', desc: 'Even if you record, write down what you remember as soon as you can after the conversation. Memory fades faster than you think — and the details matter most.' },
  { icon: '📖', title: 'Use Tell Me Your Story', desc: 'Our platform guides them through 100 questions by voice or text, saves every answer automatically, and turns the whole thing into a beautifully printed keepsake book. Free to start, no card needed.' },
  { icon: '📸', title: 'Photograph the photos', desc: 'If they have old photos, photograph them on your phone while you\'re together and ask them to identify the people and the moments. You\'ll end up with a visual archive alongside the stories.' },
]

const faqs = [
  { q: 'What questions should I ask my elderly parents?', a: 'Start with childhood — where they grew up, their earliest memories, what their home was like. These tend to be the easiest questions to answer and the most vivid memories. From there, follow the conversation wherever it goes naturally.' },
  { q: 'How do I get my parents to talk about their life?', a: 'Don\'t present a list. Ask one question and follow where it leads. Use old photos as conversation starters. Ask about senses — what things smelled or sounded like — rather than facts. And be genuinely curious rather than conducting an interview.' },
  { q: 'What if my parent has memory loss or dementia?', a: 'Long-term memories often remain stronger than short-term ones in older age. Use photos, sensory prompts, and emotional questions rather than factual ones. Our dementia life story guide has specific advice for capturing stories at different stages.' },
  { q: 'How do I capture what they tell me?', a: 'Ask permission to record on your phone — even a voice memo is precious. Or use Tell Me Your Story, which guides them through questions by voice or text and turns their answers into a beautifully printed keepsake book automatically.' },
  { q: 'How many questions should I ask at once?', a: 'One or two per conversation is enough. The best conversations follow a single question wherever it leads. Come back over multiple visits — some stories surface days after the question that triggered them.' },
  { q: 'Can I use these questions if my parent is very ill?', a: 'Yes, with sensitivity. Start with lighter memories — funny stories, happy times. Let them lead the conversation. Our guide to questions for a dying parent has specific advice for these conversations.' },
]

useSeo({
  title: '100 Questions to Ask Elderly Parents About Their Life | Tell Me Your Story',
  description: 'The questions most families never think to ask elderly parents — until it\'s too late. 100 meaningful questions across 10 chapters of their life, with advice on how to have the conversations and capture what they share.',
  canonical: 'https://tellmeyourstory.uk/questions-to-ask-elderly-parents',
  schema: {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'What questions should I ask my elderly parents?', acceptedAnswer: { '@type': 'Answer', text: 'Start with childhood — where they grew up, their earliest memories, what their home was like. These tend to be the easiest questions to answer and the most vivid memories. From there, follow the conversation wherever it goes naturally.' } },
          { '@type': 'Question', name: 'How do I get my parents to talk about their life?', acceptedAnswer: { '@type': 'Answer', text: 'Don\'t present a list. Ask one question and follow where it leads. Use old photos as conversation starters. Ask about senses rather than facts. And be genuinely curious rather than conducting an interview.' } },
          { '@type': 'Question', name: 'What if my parent has memory loss or dementia?', acceptedAnswer: { '@type': 'Answer', text: 'Long-term memories often remain stronger than short-term ones in older age. Use photos, sensory prompts, and emotional questions rather than factual ones.' } },
          { '@type': 'Question', name: 'How do I capture what they tell me?', acceptedAnswer: { '@type': 'Answer', text: 'Ask permission to record on your phone — even a voice memo is precious. Or use Tell Me Your Story, which guides them through questions by voice or text and turns their answers into a beautifully printed keepsake book automatically.' } },
          { '@type': 'Question', name: 'How many questions should I ask at once?', acceptedAnswer: { '@type': 'Answer', text: 'One or two per conversation is enough. The best conversations follow a single question wherever it leads. Come back over multiple visits.' } },
        ]
      }
    ]
  }
})
</script>

<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
</style>