<template>
  <main class="bg-white">

    <!-- Hero -->
    <section class="bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Questions About Family History</p>
        <h1 class="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          Questions to ask about<br>
          <em class="text-[#C4A882] italic">your family history</em>
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#A8A29E]">
          Family history is more than dates and names in a family tree. It's the stories behind them — where your family came from, what they lived through, and how they got to where they are now. These questions help you uncover it.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <router-link to="/register" class="rounded-full bg-[#C4A882] px-7 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Start capturing your family history free →</router-link>
          <router-link to="/resources/50-questions-printable" class="rounded-full border border-white/20 px-7 py-3 text-sm font-medium text-white transition hover:bg-white/10">Free printable questions →</router-link>
        </div>
      </div>
    </section>

    <!-- Why -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Why family history matters</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">More than names on a family tree</h2>
        </div>
        <div class="mt-8 text-sm leading-7 text-stone-600 max-w-xl mx-auto space-y-4">
          <p>Genealogy can tell you that your great-grandmother was born in County Mayo in 1889. What it can't tell you is what she was like, what she believed, why she came to England, or what she hoped for her children. That's family history — the story behind the data.</p>
          <p>Research consistently shows that children who know their family history — who have a sense of where they came from and what their family has been through — have stronger self-esteem, greater resilience, and a clearer sense of identity. The stories aren't just interesting. They're formative.</p>
          <p>But family history disappears with the people who carry it. Every generation that passes takes its stories with it unless someone thought to ask. The questions below are designed to draw those stories out — from living relatives who still remember, before the window closes.</p>
        </div>
        <div class="mt-6 flex flex-wrap justify-center gap-3">
          <router-link to="/oral-history-questions" class="text-xs text-[#7C5C3B] underline hover:no-underline">100 oral history questions →</router-link>
          <span class="text-xs text-stone-300">·</span>
          <router-link to="/questions-to-ask-elderly-parents" class="text-xs text-[#7C5C3B] underline hover:no-underline">Questions for elderly parents →</router-link>
          <span class="text-xs text-stone-300">·</span>
          <router-link to="/how-to-record-grandparents-story" class="text-xs text-[#7C5C3B] underline hover:no-underline">How to record a grandparent's story →</router-link>
        </div>
      </div>
    </section>

    <!-- Questions -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="text-center mb-12">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">The questions</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Questions about family history to ask your relatives</h2>
          <p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-stone-500">Ask these of the oldest living relatives you have access to. Start with whichever feels most natural — you don't need to work through them in order.</p>
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

    <!-- How to go further -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Going further</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">How to research your family history beyond conversations</h2>
        </div>
        <div class="mt-10 space-y-4">
          <div v-for="resource in resources" :key="resource.title" class="rounded-2xl border border-stone-200 p-5">
            <div class="flex items-start gap-4">
              <span class="text-xl flex-shrink-0">{{ resource.icon }}</span>
              <div>
                <p class="text-sm font-semibold text-stone-900">{{ resource.title }}</p>
                <p class="mt-1 text-xs leading-5 text-stone-500">{{ resource.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Preserve it -->
    <section class="bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Preserve what you find</p>
        <h2 class="mt-3 font-display text-2xl font-bold text-white sm:text-3xl">Turn family history into a keepsake book</h2>
        <p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#A8A29E]">Tell Me Your Story turns your family history conversations into a beautifully printed keepsake book — 100 guided questions, voice recordings, photos, and professional UK printing. Free to start, no card needed.</p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <router-link to="/register" class="rounded-full bg-[#C4A882] px-7 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Start capturing family history free →</router-link>
          <router-link to="/example" class="rounded-full border border-white/20 px-7 py-3 text-sm font-medium text-white transition hover:bg-white/10">See an example</router-link>
        </div>
        <p class="mt-5 text-xs text-[#9C7C5C]">Free to start · No subscription · Printed book from £21.99</p>
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
          <router-link to="/oral-history-questions" class="rounded-2xl border border-stone-200 bg-white p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">100 Oral History Questions</p>
            <p class="mt-1 text-xs text-stone-500">Questions to capture a full life story</p>
          </router-link>
          <router-link to="/how-to-record-grandparents-story" class="rounded-2xl border border-stone-200 bg-white p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">How to Record a Grandparent's Story</p>
            <p class="mt-1 text-xs text-stone-500">A practical recording guide</p>
          </router-link>
          <router-link to="/family-history-book" class="rounded-2xl border border-stone-200 bg-white p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Family History Book</p>
            <p class="mt-1 text-xs text-stone-500">Turn family history into a printed book</p>
          </router-link>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-[#1C1917] px-5 py-16 text-center sm:px-8 sm:py-20">
      <h2 class="font-display text-2xl font-bold text-white sm:text-3xl">Your family history is waiting to be told</h2>
      <p class="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#A8A29E]">Start capturing it today — free, in their own words, preserved forever.</p>
      <router-link to="/register" class="mt-8 inline-block rounded-full bg-[#C4A882] px-8 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Start capturing family history free →</router-link>
      <p class="mt-4 text-xs text-[#9C7C5C]">Free to start · One-time payment · Printed book from £21.99</p>
    </section>

  </main>
</template>

<script setup lang="ts">
import { useSeo } from '../composables/useSeo'

const chapters = [
  {
    icon: '🌍', title: 'Where your family came from',
    questions: [
      'Where did your parents and grandparents come from originally?',
      'Why did they settle where they did?',
      'Did any family members emigrate or move significant distances?',
      'What do you know about your family\'s country or region of origin?',
      'Were there ever any family members who went abroad and didn\'t come back?',
      'What language did your grandparents speak?',
      'Do you know anything about your family\'s history before your grandparents\' generation?',
      'Were there any family members who came from very different backgrounds?',
      'Has anyone in the family ever traced the family tree?',
      'Is there family history that has been deliberately kept quiet?',
    ]
  },
  {
    icon: '🏠', title: 'How your family lived',
    questions: [
      'What did your grandparents do for work?',
      'What was their home like?',
      'Were they wealthy, poor, or somewhere in between?',
      'What did they eat? Were there family recipes passed down?',
      'How did they spend their leisure time?',
      'What were the family traditions when you were growing up?',
      'What were the roles of men and women in your family?',
      'How did the family handle disagreements or difficult times?',
      'Were there any family feuds or estrangements?',
      'Who was the family matriarch or patriarch?',
    ]
  },
  {
    icon: '⚔️', title: 'What your family lived through',
    questions: [
      'Did any family members serve in the World Wars?',
      'What did the family live through during wartime?',
      'Were there any family members who were affected by major historical events?',
      'How did rationing affect the family?',
      'Were there any family members who lived through particular hardship?',
      'How did the family cope with the Depression or economic hardship?',
      'Were there any family members who experienced discrimination or prejudice?',
      'How did major events — the NHS, the Welfare State, the internet — change family life?',
      'Is there a period in family history that was particularly difficult?',
      'Is there a family story of survival or resilience that stands out?',
    ]
  },
  {
    icon: '❤️', title: 'Family relationships and characters',
    questions: [
      'Who was the character of the family — the one everyone tells stories about?',
      'What was the family dynamic like between your parents and grandparents?',
      'Were there relatives who didn\'t get along? What happened?',
      'Who do you most take after, and in what way?',
      'Were there family secrets that only came out later?',
      'Who was the family\'s storyteller — the one who always had a tale to tell?',
      'Were there any remarkable friendships or love stories in the family?',
      'Who in the family had the biggest influence on you?',
      'Are there family members you never met but wish you had?',
      'What do you know about relatives who died before you were born?',
    ]
  },
  {
    icon: '🌱', title: 'Values and beliefs passed down',
    questions: [
      'What religion or faith, if any, was central to family life?',
      'What political views did the family tend to hold?',
      'What values were most important in the family you grew up in?',
      'What were you taught about money, work, and success?',
      'What were you taught about how to treat other people?',
      'Were there family sayings or mottos that got repeated?',
      'What did your parents want for you that their parents hadn\'t had?',
      'What do you think you absorbed from your family that you weren\'t aware of?',
      'What family values do you hope will be passed on to the next generation?',
      'What, if anything, do you want to leave behind that\'s different from what you inherited?',
    ]
  },
  {
    icon: '📸', title: 'Family objects and places',
    questions: [
      'Are there objects in the family that have been passed down?',
      'Is there furniture, jewellery, or other items with family significance?',
      'Are there family photographs that nobody has identified?',
      'Is there a family home or place that holds particular significance?',
      'Are there documents — letters, diaries, certificates — that have survived?',
      'Is there a grave or memorial that nobody visits any more?',
      'Are there objects that you\'d want specific people to have?',
      'Are there places connected to the family that have changed or disappeared?',
      'Is there a family recipe, song, or tradition that hasn\'t been written down?',
      'What would you most want to preserve for future generations?',
    ]
  },
]

const resources = [
  { icon: '🌳', title: 'Ancestry and FindMyPast', desc: 'The two largest genealogy databases, both with strong UK records. Ancestry (ancestry.co.uk) and FindMyPast (findmypast.co.uk) give access to census records, birth, marriage and death certificates, military records, and immigration records going back centuries.' },
  { icon: '📚', title: 'The British Library and county archives', desc: 'Local county archives hold records not available online — parish registers, local newspapers, estate records, and more. The British Library also has extensive collections. A visit can surface things digital databases miss.' },
  { icon: '🎖️', title: 'The Imperial War Museum', desc: 'The IWM holds records of service personnel from both World Wars and beyond. Their Lives of the First World War database is particularly comprehensive. If family members served, this is the place to start.' },
  { icon: '📜', title: 'GRO certificates', desc: 'The General Register Office holds UK birth, marriage, and death certificates from 1837 onwards. You can order certificates online at gro.gov.uk. These often contain more information than you expect — parents\' occupations, addresses, witnesses.' },
  { icon: '🧬', title: 'DNA testing', desc: 'Services like AncestryDNA and 23andMe can reveal ethnic heritage, find previously unknown relatives, and confirm or complicate family stories. Useful alongside documentary research rather than as a replacement for it.' },
  { icon: '💬', title: 'Talking to living relatives', desc: 'The most important and most overlooked source of family history. Census records can tell you where someone lived. Only a living relative can tell you what they were like. Ask before it\'s too late.' },
]

const faqs = [
  { q: 'What questions should I ask about family history?', a: 'Start with where the family came from, what your grandparents did for work, what major historical events they lived through, and the characters of the family. Then move into values, traditions, family objects, and what people want to be remembered. The questions that produce the best stories are usually the most specific ones.' },
  { q: 'How do I research my family history?', a: 'Start with conversations with living relatives — they\'re the most important source and the most time-limited. Alongside that, Ancestry and FindMyPast hold most UK genealogical records online. County archives, the British Library, and the Imperial War Museum hold records not available digitally. DNA testing can also reveal heritage and connect you with previously unknown relatives.' },
  { q: 'How do I preserve family history?', a: 'Conversations should be recorded — even a phone voice memo is valuable. Documents and photographs should be digitised and backed up in multiple places. A printed family history book is the most permanent format — Tell Me Your Story turns family history conversations into a beautifully printed keepsake.' },
  { q: 'What is the difference between genealogy and family history?', a: 'Genealogy is the study of family ancestry — building a family tree from birth, marriage, and death records. Family history goes further, capturing the stories, experiences, and personalities behind the names and dates. Both are valuable, but family history is what makes genealogy come alive.' },
  { q: 'Who should I ask about family history?', a: 'The oldest living relatives you have access to. Grandparents and great-aunts and uncles often hold knowledge that no younger person has. Start with whoever is oldest and work outwards. Don\'t assume family members you see less often don\'t have stories worth hearing.' },
]

useSeo({
  title: 'Questions to Ask About Family History — Discover Your Roots | Tell Me Your Story',
  description: '100 questions to ask relatives about family history — where your family came from, what they lived through, and the stories behind the names. With advice on how to research and preserve what you find.',
  canonical: 'https://tellmeyourstory.uk/questions-about-family-history',
  schema: {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'What questions should I ask about family history?', acceptedAnswer: { '@type': 'Answer', text: 'Start with where the family came from, what your grandparents did for work, what major historical events they lived through, and the family characters. The most specific questions produce the best stories.' } },
          { '@type': 'Question', name: 'How do I research my family history?', acceptedAnswer: { '@type': 'Answer', text: 'Start with conversations with living relatives. Then use Ancestry and FindMyPast for UK genealogical records. County archives and the Imperial War Museum hold records not available digitally.' } },
          { '@type': 'Question', name: 'What is the difference between genealogy and family history?', acceptedAnswer: { '@type': 'Answer', text: 'Genealogy builds a family tree from records. Family history captures the stories, experiences, and personalities behind the names and dates.' } },
        ]
      }
    ]
  }
})
</script>

<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
</style>