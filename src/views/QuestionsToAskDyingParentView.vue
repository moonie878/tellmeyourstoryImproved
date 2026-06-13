<template>
  <main class="bg-white">

    <!-- Hero -->
    <section class="bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Questions to Ask a Dying Parent</p>
        <h1 class="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          What to ask a parent<br>
          <em class="text-[#C4A882] italic">nearing the end of their life</em>
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#A8A29E]">
          If your parent is approaching the end of their life, time is precious — and the conversations you have now are ones you'll treasure forever. This gentle guide helps you have those conversations and capture what matters most.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <router-link to="/register" class="rounded-full bg-[#C4A882] px-7 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Start capturing their story free →</router-link>
          <router-link to="/end-of-life-gift" class="rounded-full border border-white/20 px-7 py-3 text-sm font-medium text-white transition hover:bg-white/10">End of life gift ideas</router-link>
        </div>
      </div>
    </section>

    <!-- Gentle intro -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">A gentle note</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">These conversations are a gift — for both of you</h2>
        </div>
        <div class="mt-8 text-sm leading-7 text-stone-600 max-w-xl mx-auto space-y-4">
          <p>Many people who are nearing the end of their life want to be asked about it. They want to share what they've learned, what they're proud of, who they've loved. But they rarely volunteer it — because they don't want to be a burden.</p>
          <p>Asking the question is the gift. It says: your life mattered. Your story matters. I want to know it. I want to keep it.</p>
          <p>Go gently. Let them lead. Not every question needs to be asked — but some will unlock something they've been waiting to say for years. The conversations you have now are the ones you'll return to for the rest of your life.</p>
          <p>Research in palliative care consistently shows that people at the end of life often find great comfort in life review — in being asked to reflect on what they've lived. You're not opening a wound. You're offering an opportunity.</p>
        </div>
        <div class="mt-6 flex flex-wrap justify-center gap-3">
          <router-link to="/end-of-life-gift" class="text-xs text-[#7C5C3B] underline hover:no-underline">End of life gift ideas →</router-link>
          <span class="text-xs text-stone-300">·</span>
          <router-link to="/dementia-life-story-book" class="text-xs text-[#7C5C3B] underline hover:no-underline">Life story books for dementia →</router-link>
          <span class="text-xs text-stone-300">·</span>
          <router-link to="/questions-to-ask-elderly-parents" class="text-xs text-[#7C5C3B] underline hover:no-underline">Questions for elderly parents →</router-link>
        </div>
      </div>
    </section>

    <!-- How to have these conversations -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Before you begin</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">How to have these conversations</h2>
        </div>
        <div class="mt-10 space-y-4">
          <div v-for="tip in conversationTips" :key="tip.title" class="rounded-2xl bg-white p-6">
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
        <div class="text-center mb-10">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Gentle questions</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">What to ask — and how to ask it</h2>
          <p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-500">These questions are grouped by theme. You don't need to work through them in order — follow the conversation wherever it wants to go.</p>
        </div>
        <div class="grid gap-5 sm:grid-cols-2">
          <div v-for="category in categories" :key="category.title" class="rounded-2xl bg-[#F5F0E8] p-6">
            <p class="text-lg mb-1">{{ category.icon }}</p>
            <p class="text-sm font-semibold text-stone-900 mb-4">{{ category.title }}</p>
            <ul class="space-y-2">
              <li v-for="q in category.questions" :key="q" class="text-xs leading-5 text-stone-600 flex gap-2">
                <span class="text-[#9C7C5C] flex-shrink-0 mt-0.5">◦</span>
                <span>{{ q }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- What if they don't want to talk -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Common concerns</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">What if they don't want to talk?</h2>
        </div>
        <div class="mt-8 text-sm leading-7 text-stone-600 max-w-xl mx-auto space-y-4">
          <p>Some people find it difficult to talk about their life — especially their feelings about dying. This is completely normal and should always be respected. Never push. If they change the subject, follow them there.</p>
          <p>Often, it's easier to start with less emotionally charged questions — childhood memories, early jobs, funny stories from the past. Once someone is talking, they often move naturally into deeper territory themselves.</p>
          <p>If they become upset, don't rush to reassure or change the subject. Sometimes emotion is part of the story. Sitting with them in it is more comforting than steering away from it.</p>
          <p>And if they don't want to talk at all — that's okay too. Your presence matters more than any question.</p>
        </div>
        <div class="mt-10 grid gap-4 sm:grid-cols-2">
          <div v-for="concern in concerns" :key="concern.title" class="rounded-2xl bg-white p-5">
            <p class="text-sm font-semibold text-stone-900">{{ concern.title }}</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">{{ concern.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Tips -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Practical advice</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">How to capture what they share</h2>
        </div>
        <div class="mt-10 space-y-4">
          <div v-for="tip in tips" :key="tip.title" class="rounded-2xl border border-stone-200 bg-white p-5">
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

    <!-- TMYS CTA -->
    <section class="bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">The easier way</p>
        <h2 class="mt-3 font-display text-2xl font-bold text-white sm:text-3xl">Let Tell Me Your Story do the heavy lifting</h2>
        <p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#A8A29E]">Tell Me Your Story guides your parent through 100 questions — by typing or speaking — and turns their answers into a beautifully printed keepsake book with QR codes that let family hear their voice forever. Free to start, no card needed.</p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <router-link to="/register" class="rounded-full bg-[#C4A882] px-7 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Start capturing their story free →</router-link>
          <router-link to="/example" class="rounded-full border border-white/20 px-7 py-3 text-sm font-medium text-white transition hover:bg-white/10">See an example</router-link>
        </div>
        <p class="mt-5 text-xs text-[#9C7C5C]">Free to start · No subscription · Printed book from £34.98</p>
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

    <!-- Related pages -->
    <section class="bg-[#F5F0E8] px-5 py-12 sm:px-8">
      <div class="mx-auto max-w-3xl">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C] mb-6">Related reading</p>
        <div class="grid gap-4 sm:grid-cols-3">
          <router-link to="/dementia-life-story-book" class="rounded-2xl border border-stone-200 bg-white p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Dementia Life Story Book</p>
            <p class="mt-1 text-xs text-stone-500">Capturing stories when memory is fading</p>
          </router-link>
          <router-link to="/end-of-life-gift" class="rounded-2xl border border-stone-200 bg-white p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">End of Life Gift Ideas</p>
            <p class="mt-1 text-xs text-stone-500">Meaningful gifts for someone nearing end of life</p>
          </router-link>
          <router-link to="/questions-to-ask-elderly-parents" class="rounded-2xl border border-stone-200 bg-white p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Questions for Elderly Parents</p>
            <p class="mt-1 text-xs text-stone-500">100 questions to ask before it's too late</p>
          </router-link>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-[#1C1917] px-5 py-16 text-center sm:px-8 sm:py-20">
      <h2 class="font-display text-2xl font-bold text-white sm:text-3xl">Don't wait for the right moment</h2>
      <p class="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#A8A29E]">The right moment is now. Start capturing their story today — free, in their own words, at their own pace.</p>
      <router-link to="/register" class="mt-8 inline-block rounded-full bg-[#C4A882] px-8 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Start capturing their story free →</router-link>
      <p class="mt-4 text-xs text-[#9C7C5C]">Free to start · One-time payment · Printed book from £34.98</p>
    </section>

  </main>
</template>

<script setup lang="ts">
import { useSeo } from '../composables/useSeo'

const conversationTips = [
  { icon: '☕', title: 'Choose the right moment', desc: 'Side-by-side works better than face-to-face. A quiet cup of tea, a gentle walk, or a car journey — somewhere they feel relaxed and unhurried. Mornings are often better than evenings when energy is lower.' },
  { icon: '📱', title: 'Ask permission to record', desc: 'A voice recording captures something written notes never can — their accent, their pauses, the way they laugh. Ask if you can record on your phone. Most people say yes when they understand it\'s just for the family.' },
  { icon: '🤫', title: 'Embrace the silence', desc: 'Don\'t rush to fill pauses. Older people, and people who are unwell, sometimes take longer to retrieve memories. The silence is almost always worth waiting through. Some of the best answers come after a long pause.' },
  { icon: '🔄', title: 'Keep sessions short', desc: 'Twenty minutes on a good day is worth more than two hours on a difficult one. Come back to it. Some memories surface days after a conversation started — keep a note of anything they mention wanting to return to.' },
  { icon: '📸', title: 'Use old photos as prompts', desc: 'Old photographs are powerful triggers. Show them a photo from their past and ask what was happening at the time, who the people are, what they remember about that day. The stories that follow are often the best ones.' },
  { icon: '✍️', title: 'Write it down afterwards', desc: 'Even if you\'re recording, write down what you remember as soon as you can after the conversation. Capture the things around the answers — the expressions, the hesitations, the things they almost said.' },
]

const categories = [
  {
    icon: '🌱', title: 'Their early life',
    questions: [
      'What\'s the earliest memory you have?',
      'What was your childhood home like?',
      'What did your parents do for a living?',
      'What was your relationship with your brothers and sisters like?',
      'What did you love doing as a child?',
      'Who was your best friend growing up?',
      'What was school like for you?',
      'Is there a place from your childhood you still think about?',
    ]
  },
  {
    icon: '❤️', title: 'Love and family',
    questions: [
      'How did you meet [partner\'s name]?',
      'What did you love most about them?',
      'What\'s your favourite memory of the two of you together?',
      'What do you want us to know about them?',
      'What has being a parent meant to you?',
      'What are you most proud of in your children?',
      'What do you hope we know about how much we\'ve meant to you?',
      'Is there something you\'ve always wanted to say to us?',
    ]
  },
  {
    icon: '💼', title: 'Work and life',
    questions: [
      'What was your first job?',
      'What work are you most proud of?',
      'Was there a moment in your career that changed everything?',
      'What did you learn from working that you\'ve never forgotten?',
      'If you could have done any job in the world, what would it have been?',
      'What\'s something you achieved that surprised even you?',
      'What did you sacrifice that you\'re glad you sacrificed?',
    ]
  },
  {
    icon: '🌟', title: 'Wisdom and legacy',
    questions: [
      'What matters most in life?',
      'What do you know now that you wish you\'d known at 30?',
      'What would you do differently?',
      'What are you most at peace with?',
      'What beliefs have guided your life?',
      'What do you want to be remembered for?',
      'What advice would you give to the people you\'re leaving behind?',
      'What has your life meant to you?',
    ]
  },
  {
    icon: '🕯️', title: 'Practical and meaningful',
    questions: [
      'Is there anything you want us to make sure happens?',
      'Is there a story you want to make sure gets told?',
      'Is there anyone you want me to reach out to on your behalf?',
      'Are there things or objects that are important to you?',
      'What traditions do you hope we keep?',
      'What do you want your funeral or memorial to feel like?',
      'Is there anything left unsaid that you want to say?',
      'What would make you feel at peace?',
    ]
  },
  {
    icon: '😄', title: 'The lighter questions',
    questions: [
      'What\'s the funniest thing that ever happened to you?',
      'What\'s a story the family always tells about you?',
      'What\'s something about you that would surprise people?',
      'What was your favourite meal that someone made for you?',
      'What song takes you straight back to a particular moment?',
      'What\'s a place you loved that you\'d go back to?',
      'What made you laugh more than anything else?',
    ]
  },
]

const concerns = [
  { title: 'They get upset', desc: 'Sit with them. Don\'t rush to reassure or change the subject. Sometimes emotion is part of the story. You can say "we don\'t have to talk about this" — but let them decide.' },
  { title: 'They say they can\'t remember', desc: 'Start with something sensory — a smell, a sound, a food from childhood. Sensory memory often unlocks narrative memory. Or try photos.' },
  { title: 'They don\'t want to be recorded', desc: 'Respect it. Write down what you can afterwards. The conversation matters more than the recording.' },
  { title: 'You find it hard too', desc: 'That\'s completely natural. You don\'t have to hold it together. Sometimes shared emotion deepens a conversation rather than ending it.' },
]

const tips = [
  { icon: '📱', title: 'Record on your phone', desc: 'Even a voice memo is precious. Their voice answering these questions — the accent, the pauses, the laughter — is something you\'ll be grateful for forever. Ask permission first.' },
  { icon: '⏱️', title: 'Keep it short', desc: 'Don\'t try to cover everything at once. A 20-minute conversation on a good day is worth more than a long session on a difficult one. Come back to it.' },
  { icon: '🤫', title: 'Silence is okay', desc: 'You don\'t need to fill every pause. Some questions need time to surface. Let it come in its own time — the best answers often come after the longest pauses.' },
  { icon: '✍️', title: 'Write down what you remember afterwards', desc: 'Even if you can\'t record, write down what they said as soon as possible. Memory fades faster than you think — and the details matter most.' },
  { icon: '📖', title: 'Turn it into a keepsake', desc: 'Tell Me Your Story lets you capture their answers by voice or text and turns them into a beautifully printed keepsake book — with QR codes so family can hear their voice in the pages, forever.' },
]

const faqs = [
  { q: 'Is it okay to ask a dying person about their life?', a: 'Yes — research in palliative care shows that life review is deeply meaningful for most people nearing the end of their life. It helps them feel seen, valued, and at peace. Most people want to be asked. The key is to go gently and follow their lead.' },
  { q: 'What if they don\'t want to talk?', a: 'Always respect their wishes. Never push. Try lighter, more nostalgic questions first — funny memories, favourite things — and see where the conversation naturally goes. If they don\'t want to talk, your presence matters more than any question.' },
  { q: 'How do I start the conversation?', a: 'The easiest way is to start with something you\'re genuinely curious about — a story you\'ve heard before and want to hear again, or a question about their childhood. "Tell me about where you grew up" is often enough to open the door.' },
  { q: 'Should I record the conversation?', a: 'If they\'re comfortable with it, yes. A voice recording captures things written notes can\'t — their accent, the way they laugh, the pauses before they answer. Even a simple phone voice memo is precious. Tell Me Your Story has built-in voice recording that saves directly to their keepsake book.' },
  { q: 'How do I capture what they share?', a: 'You can write notes, record on your phone, or use Tell Me Your Story — which guides them through questions by voice or text and automatically saves their answers into a beautifully designed keepsake book you can print and keep forever.' },
  { q: 'What if I get emotional during the conversation?', a: 'That\'s completely normal and nothing to be ashamed of. Shared emotion often deepens a conversation. You don\'t need to hold it together. Sometimes the most meaningful exchanges happen when both of you are moved.' },
]

useSeo({
  title: 'Questions to Ask a Dying Parent — Gentle Guide to Final Conversations | Tell Me Your Story',
  description: 'A gentle guide to the questions worth asking a parent nearing the end of their life. What to ask, how to have the conversation, and how to capture what they share. Free to start.',
  canonical: 'https://tellmeyourstory.uk/questions-to-ask-dying-parent',
  schema: {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'Is it okay to ask a dying person about their life?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — research in palliative care shows that life review is deeply meaningful for most people nearing the end of their life. It helps them feel seen, valued, and at peace. Most people want to be asked. The key is to go gently and follow their lead.' } },
          { '@type': 'Question', name: 'What if they don\'t want to talk?', acceptedAnswer: { '@type': 'Answer', text: 'Always respect their wishes. Never push. Try lighter, more nostalgic questions first — funny memories, favourite things — and see where the conversation naturally goes. If they don\'t want to talk, your presence matters more than any question.' } },
          { '@type': 'Question', name: 'How do I start the conversation?', acceptedAnswer: { '@type': 'Answer', text: 'The easiest way is to start with something you\'re genuinely curious about. "Tell me about where you grew up" is often enough to open the door.' } },
          { '@type': 'Question', name: 'Should I record the conversation?', acceptedAnswer: { '@type': 'Answer', text: 'If they\'re comfortable with it, yes. A voice recording captures things written notes can\'t — their accent, the way they laugh, the pauses before they answer. Tell Me Your Story has built-in voice recording that saves directly to their keepsake book.' } },
          { '@type': 'Question', name: 'What if I get emotional during the conversation?', acceptedAnswer: { '@type': 'Answer', text: 'That\'s completely normal. Shared emotion often deepens a conversation. You don\'t need to hold it together. Sometimes the most meaningful exchanges happen when both of you are moved.' } },
        ]
      }
    ]
  }
})
</script>

<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
</style>