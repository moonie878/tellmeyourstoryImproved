<template>
  <main class="bg-white">

    <!-- Hero -->
    <section class="bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Oral History Questions</p>
        <h1 class="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          100 oral history questions<br>
          <em class="text-[#C4A882] italic">to capture a life in their own words</em>
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#A8A29E]">
          Oral history is the practice of recording personal memories and first-hand accounts before they're lost. These questions are designed to draw out the stories that matter — from childhood memories to the wisdom earned over a lifetime.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <router-link to="/register" class="rounded-full bg-[#C4A882] px-7 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Start capturing their story free →</router-link>
          <router-link to="/resources/50-questions-printable" class="rounded-full border border-white/20 px-7 py-3 text-sm font-medium text-white transition hover:bg-white/10">Free printable questions →</router-link>
        </div>
      </div>
    </section>

    <!-- What is oral history -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">What is oral history?</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Stories that would otherwise be lost</h2>
        </div>
        <div class="mt-8 text-sm leading-7 text-stone-600 max-w-xl mx-auto space-y-4">
          <p>Oral history is the collection and study of personal memories — first-hand accounts of experiences, events, and ways of life passed down through spoken word. It's one of the oldest forms of record-keeping in human history, and one of the most personal.</p>
          <p>Unlike formal history, oral history captures the texture of ordinary life — what it felt like to grow up in a particular place and time, how people navigated hard times, what they loved, what they feared, and what they hope will be remembered about them.</p>
          <p>The British Library, the Imperial War Museum, and countless universities and community archives have dedicated oral history programmes — recognising that the stories of ordinary people are as historically significant as the stories of the famous.</p>
          <p>But you don't need an archive or a professional interviewer to do oral history. You need a person with stories to tell, someone willing to listen, and the right questions to get them started. The questions below are designed to do exactly that.</p>
        </div>
        <div class="mt-6 flex flex-wrap justify-center gap-3">
          <router-link to="/life-story-interview-questions" class="text-xs text-[#7C5C3B] underline hover:no-underline">Life story interview questions →</router-link>
          <span class="text-xs text-stone-300">·</span>
          <router-link to="/how-to-record-grandparents-story" class="text-xs text-[#7C5C3B] underline hover:no-underline">How to record a grandparent's story →</router-link>
          <span class="text-xs text-stone-300">·</span>
          <router-link to="/questions-about-family-history" class="text-xs text-[#7C5C3B] underline hover:no-underline">Family history questions →</router-link>
        </div>
      </div>
    </section>

    <!-- Questions -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="text-center mb-12">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">100 oral history questions</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Questions across every chapter of life</h2>
          <p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-500">Don't work through these in order — start where the energy is and follow the conversation wherever it leads.</p>
        </div>
        <div v-for="chapter in chapters" :key="chapter.title" class="mb-10">
          <div class="mb-4 flex items-center gap-3">
            <span class="text-2xl">{{ chapter.icon }}</span>
            <h3 class="font-display text-xl font-bold text-stone-900">{{ chapter.title }}</h3>
          </div>
          <div class="grid gap-2 sm:grid-cols-2">
            <div v-for="q in chapter.questions" :key="q" class="rounded-xl bg-white px-4 py-3 text-sm text-stone-700 leading-5">{{ q }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- How to conduct an oral history interview -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">How to do it well</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">How to conduct an oral history interview</h2>
        </div>
        <div class="mt-10 space-y-4">
          <div v-for="tip in tips" :key="tip.title" class="rounded-2xl border border-stone-200 p-5">
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

    <!-- Preserve it -->
    <section class="bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Don't let it disappear</p>
        <h2 class="mt-3 font-display text-2xl font-bold text-white sm:text-3xl">Turn your oral history into a keepsake</h2>
        <p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#A8A29E]">Tell Me Your Story is built specifically for oral history — guided questions, voice recording, and a beautifully printed book that preserves everything your family shares. Free to start, no card needed.</p>
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

    <!-- Related -->
    <section class="bg-[#F5F0E8] px-5 py-12 sm:px-8">
      <div class="mx-auto max-w-3xl">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C] mb-6">Related reading</p>
        <div class="grid gap-4 sm:grid-cols-3">
          <router-link to="/how-to-record-grandparents-story" class="rounded-2xl border border-stone-200 bg-white p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">How to Record a Grandparent's Story</p>
            <p class="mt-1 text-xs text-stone-500">Practical guide to capturing their memories</p>
          </router-link>
          <router-link to="/questions-about-family-history" class="rounded-2xl border border-stone-200 bg-white p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Family History Questions</p>
            <p class="mt-1 text-xs text-stone-500">Questions about ancestry and heritage</p>
          </router-link>
          <router-link to="/life-story-interview-questions" class="rounded-2xl border border-stone-200 bg-white p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Life Story Interview Questions</p>
            <p class="mt-1 text-xs text-stone-500">How to run a proper life story interview</p>
          </router-link>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-[#1C1917] px-5 py-16 text-center sm:px-8 sm:py-20">
      <h2 class="font-display text-2xl font-bold text-white sm:text-3xl">Their stories won't tell themselves</h2>
      <p class="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#A8A29E]">Start capturing their oral history today — free, in their own words, preserved forever.</p>
      <router-link to="/register" class="mt-8 inline-block rounded-full bg-[#C4A882] px-8 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Start capturing their story free →</router-link>
      <p class="mt-4 text-xs text-[#9C7C5C]">Free to start · One-time payment · Printed book from £34.98</p>
    </section>

  </main>
</template>

<script setup lang="ts">
import { useSeo } from '../composables/useSeo'

const chapters = [
  {
    icon: '🌍', title: 'The world they were born into',
    questions: [
      'What year were you born and what was the world like then?',
      'What have you been told about the day you arrived?',
      'What kind of community did you grow up in?',
      'What was the political climate like when you were growing up?',
      'How did major historical events affect your family?',
      'What did people worry about when you were young?',
      'What did the future look like when you were a child?',
      'How has the world changed most dramatically in your lifetime?',
      'What do you remember about significant national or world events?',
      'What aspects of life then would surprise people today?',
    ]
  },
  {
    icon: '🏠', title: 'Home and family',
    questions: [
      'Where did you grow up and what was it like?',
      'What did your childhood home look like?',
      'Who else lived with you or nearby?',
      'What was daily life like in your household?',
      'What did your parents do for work?',
      'How did your family spend time together?',
      'What were the unspoken rules in your family?',
      'What role did religion or faith play in family life?',
      'How did your family handle hard times?',
      'What do you know about your grandparents and their lives?',
    ]
  },
  {
    icon: '🌱', title: 'Childhood memories',
    questions: [
      'What is your earliest memory?',
      'What games and activities filled your childhood days?',
      'Who were your closest friends growing up?',
      'What was school like for you?',
      'Was there a teacher who changed your life?',
      'What did summers look and feel like?',
      'What did you eat growing up that you\'ve never forgotten?',
      'What sounds and smells take you straight back to childhood?',
      'What was the most trouble you ever got into as a child?',
      'What did you dream of being when you grew up?',
    ]
  },
  {
    icon: '💼', title: 'Work and livelihood',
    questions: [
      'What was your first job and how did you get it?',
      'What work have you done over your lifetime?',
      'What was the hardest job you ever did?',
      'What work are you most proud of?',
      'How did working life change over the course of your career?',
      'Who was the best colleague or boss you ever had?',
      'What skills did you develop that surprised you?',
      'How did you balance work and family life?',
      'What would you do differently in your working life?',
      'What did your work teach you about people?',
    ]
  },
  {
    icon: '❤️', title: 'Love and relationships',
    questions: [
      'How did you meet the most important person in your life?',
      'What did courtship look like when you were young?',
      'What do you know now about love that you didn\'t know then?',
      'Who has had the biggest influence on your life?',
      'What friendships have meant the most to you?',
      'How did you navigate disagreements in relationships?',
      'What do you wish you\'d said to someone you\'ve lost?',
      'What have your relationships taught you about yourself?',
      'What makes a marriage or partnership last?',
      'Who would you most like to thank, and why?',
    ]
  },
  {
    icon: '💪', title: 'Hard times and resilience',
    questions: [
      'What was the hardest period of your life?',
      'How did you get through it?',
      'What losses have shaped you most deeply?',
      'Was there a moment you thought you wouldn\'t make it through?',
      'Who helped you most when things were difficult?',
      'What did adversity teach you about yourself?',
      'How did your generation deal with difficulty differently?',
      'Is there something you survived that you\'ve never fully talked about?',
      'What would you tell someone going through something similar?',
      'What are you most glad you got through?',
    ]
  },
  {
    icon: '🌟', title: 'Proudest moments',
    questions: [
      'What achievement are you most proud of?',
      'What risk paid off that you almost didn\'t take?',
      'What did you do that surprised even you?',
      'What have you built, made, or created that you\'re proud of?',
      'What moment in your life made you feel most alive?',
      'What do you feel you got right?',
      'What have you contributed to your community?',
      'Is there something you did that you\'ve never been properly thanked for?',
      'What would you do again exactly as you did it?',
      'When did you feel at your very best?',
    ]
  },
  {
    icon: '🤍', title: 'Values and wisdom',
    questions: [
      'What values have guided your life?',
      'What do you know now that you wish you\'d known at 25?',
      'What has life taught you about what matters?',
      'What beliefs have you changed your mind about?',
      'What mistakes taught you the most?',
      'What would you do differently?',
      'What advice would you give to the next generation?',
      'What do you believe about happiness?',
      'What does a good life look like to you?',
      'What would you want your grandchildren to know about how to live?',
    ]
  },
  {
    icon: '📖', title: 'Legacy',
    questions: [
      'How would you like to be remembered?',
      'What do you hope people say about you?',
      'What stories do you most want to make sure get told?',
      'What traditions do you hope will continue?',
      'What do you want the people you love to know?',
      'Is there anything you\'ve never said that you\'d like to say now?',
      'What does your life mean to you, looking back?',
      'What are you most grateful for?',
      'What hopes do you have for the people you\'re leaving behind?',
      'If your life were a story, how would you describe it?',
    ]
  },
  {
    icon: '😄', title: 'The lighter side',
    questions: [
      'What\'s the funniest thing that ever happened to you?',
      'What story does your family always tell about you?',
      'What\'s something about you that would surprise people?',
      'What made you laugh more than anything?',
      'What was your greatest extravagance?',
      'What song always takes you back somewhere specific?',
      'What\'s a place you loved that no longer exists?',
      'What food do you associate with pure happiness?',
      'What was your most embarrassing moment?',
      'If you could relive one ordinary day, which would it be?',
    ]
  },
]

const tips = [
  { icon: '📱', title: 'Record from the start', desc: 'Always record — even a phone voice memo captures tone, accent, and emotion that transcripts can\'t. Ask permission first. Almost everyone says yes when they understand it\'s for the family.' },
  { icon: '🎯', title: 'One question at a time', desc: 'Don\'t present a list. Ask one question and follow where it leads. The best oral history interviews are conversations, not questionnaires. The most interesting material usually surfaces in the tangents.' },
  { icon: '🤫', title: 'Let silence work', desc: 'Don\'t rush to fill pauses. Some memories take time to surface. The silence is almost always worth waiting through — some of the best answers come after the longest pauses.' },
  { icon: '📸', title: 'Use photographs as prompts', desc: 'Old photographs are the most reliable triggers for oral history. Show them a photo and ask: who are these people, where was this taken, what do you remember about that time?' },
  { icon: '🔄', title: 'Return to it', desc: 'One session is never enough. Some memories surface days after a conversation has started. Keep notes of things they mention wanting to return to, and follow up on them.' },
  { icon: '✍️', title: 'Write up afterwards', desc: 'Even with a recording, write up what you remember as soon as you can. Context, atmosphere, the things said between the answers — these details matter and fade quickly.' },
]

const faqs = [
  { q: 'What is oral history?', a: 'Oral history is the collection and recording of personal memories and first-hand accounts. It captures the stories, experiences, and perspectives of individuals — particularly ordinary people whose lives might not be recorded in formal historical documents. It\'s one of the most powerful ways to preserve family history and community heritage.' },
  { q: 'What questions should I ask in an oral history interview?', a: 'The best oral history questions are open-ended and specific rather than general. "What did your childhood home smell like?" works better than "What was your childhood like?" Start with the world they were born into, move through childhood, work, relationships, and hard times, and end with legacy and wisdom.' },
  { q: 'How do I record an oral history interview?', a: 'A smartphone voice memo app is enough for a basic recording. For better quality, use a dedicated voice recorder or an app like Otter.ai which records and transcribes simultaneously. Tell Me Your Story has built-in voice recording that saves answers directly to a keepsake book.' },
  { q: 'How long should an oral history interview be?', a: 'Keep sessions to 30-60 minutes. Oral history works best across multiple sessions rather than one long interview. Some memories surface days after the session that triggered them — plan to return to it.' },
  { q: 'How do I preserve an oral history?', a: 'Record it, transcribe it, and create a permanent physical copy. Digital files get lost or become inaccessible over time. A printed book is the most durable format. Tell Me Your Story turns oral history answers into a beautifully designed printed keepsake book with voice recording QR codes.' },
]

useSeo({
  title: '100 Oral History Questions — Capture a Life in Their Own Words | Tell Me Your Story',
  description: '100 oral history questions across every chapter of life — from childhood memories to legacy and wisdom. With advice on how to conduct an oral history interview and preserve what you capture.',
  canonical: 'https://tellmeyourstory.uk/oral-history-questions',
  schema: {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'What is oral history?', acceptedAnswer: { '@type': 'Answer', text: 'Oral history is the collection and recording of personal memories and first-hand accounts — capturing the stories and perspectives of individuals whose lives might not otherwise be recorded.' } },
          { '@type': 'Question', name: 'What questions should I ask in an oral history interview?', acceptedAnswer: { '@type': 'Answer', text: 'The best oral history questions are open-ended and specific. Start with the world they were born into, move through childhood, work, relationships, and hard times, and end with legacy and wisdom.' } },
          { '@type': 'Question', name: 'How do I preserve an oral history?', acceptedAnswer: { '@type': 'Answer', text: 'Record it, transcribe it, and create a permanent physical copy. Digital files get lost over time. A printed book is the most durable format.' } },
        ]
      }
    ]
  }
})
</script>

<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
</style>