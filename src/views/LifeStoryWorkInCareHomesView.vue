<template>
  <main class="bg-white">

    <!-- Hero -->
    <section class="bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Life Story Work in Care Homes</p>
        <h1 class="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          Life story work in care homes<br>
          <em class="text-[#C4A882] italic">why it matters and how to do it</em>
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#A8A29E]">
          Life story work helps care home residents feel seen, valued, and understood — not just as patients, but as people with rich histories. This guide explains what it is, why it matters, and how families and care teams can do it effectively.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <router-link to="/register" class="rounded-full bg-[#C4A882] px-7 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Create a life story book free →</router-link>
          <router-link to="/example" class="rounded-full border border-white/20 px-7 py-3 text-sm font-medium text-white transition hover:bg-white/10">See an example</router-link>
        </div>
      </div>
    </section>

    <!-- What is life story work -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">What is life story work?</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">More than a care record — a whole person</h2>
        </div>
        <div class="mt-8 text-sm leading-7 text-stone-600 max-w-xl mx-auto space-y-4">
          <p>Life story work is the process of capturing a person's history, memories, values, and personality — and using that understanding to provide better, more human care. In a care home context, it means helping staff see beyond a diagnosis or a care plan to the whole person in the room.</p>
          <p>A care home resident might have been a teacher, a mother of five, a keen gardener, someone who played piano every Sunday. Without that context, carers can only respond to the person in front of them. With it, they can connect — through shared reference points, conversation starters, and an understanding of what genuinely matters to that individual.</p>
          <p>Life story work is endorsed by the Alzheimer's Society, NHS England, and the Social Care Institute for Excellence (SCIE) as a key component of person-centred care — particularly for residents living with dementia. The Care Quality Commission (CQC) specifically looks for evidence of personalised care that reflects residents' histories and preferences.</p>
          <p>For families, it's also something much simpler: a way to make sure the person they love isn't reduced to a medical record. A way to say — this person has a story. Here it is.</p>
        </div>
        <div class="mt-6 flex flex-wrap justify-center gap-3">
          <router-link to="/dementia-life-story-book" class="text-xs text-[#7C5C3B] underline hover:no-underline">Dementia life story books →</router-link>
          <span class="text-xs text-stone-300">·</span>
          <router-link to="/reminiscence-therapy-life-story" class="text-xs text-[#7C5C3B] underline hover:no-underline">Reminiscence therapy →</router-link>
          <span class="text-xs text-stone-300">·</span>
          <router-link to="/questions-to-ask-elderly-parents" class="text-xs text-[#7C5C3B] underline hover:no-underline">Questions to ask elderly parents →</router-link>
        </div>
      </div>
    </section>

    <!-- Why it matters -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">The evidence</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Why life story work improves care</h2>
        </div>
        <div class="mt-10 grid gap-5 sm:grid-cols-2 md:grid-cols-3">
          <div v-for="benefit in benefits" :key="benefit.title" class="rounded-2xl bg-white p-6">
            <p class="text-2xl">{{ benefit.icon }}</p>
            <p class="mt-3 text-sm font-semibold text-stone-900">{{ benefit.title }}</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">{{ benefit.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- What to include -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">What to capture</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">What a care home life story should include</h2>
        </div>
        <div class="mt-8 text-sm leading-7 text-stone-600 max-w-xl mx-auto space-y-4">
          <p>A life story document for care home use serves two purposes — immediate practical care and long-term preservation. What care staff need day-to-day is slightly different from what the family wants to keep as a keepsake, though the two overlap significantly.</p>
          <p>For day-to-day care, the most useful information tends to be practical and specific: preferred name, daily routines, foods they love and hate, music that comforts them, things that cause distress, and the names of family members they're most likely to ask about.</p>
          <p>For the wider life story — the keepsake the family will treasure — the focus shifts to narrative: childhood memories, working life, love and marriage, family, proudest moments, and what they want to be remembered for.</p>
          <p>A good life story document does both. Tell Me Your Story's 100 questions cover every chapter of life and produce content that works in both contexts — immediately useful for care staff and deeply meaningful for family.</p>
        </div>
        <div class="mt-10 grid gap-4 sm:grid-cols-2">
          <div class="rounded-2xl bg-[#F5F0E8] p-6">
            <p class="text-sm font-semibold text-stone-900 mb-4">For daily care use</p>
            <ul class="space-y-2">
              <li v-for="item in careItems" :key="item" class="flex gap-2 text-xs leading-5 text-stone-600">
                <span class="text-[#9C7C5C] flex-shrink-0">◦</span>{{ item }}
              </li>
            </ul>
          </div>
          <div class="rounded-2xl bg-[#1C1917] p-6">
            <p class="text-sm font-semibold text-white mb-4">For the family keepsake</p>
            <ul class="space-y-2">
              <li v-for="item in keepsakItems" :key="item" class="flex gap-2 text-xs leading-5 text-stone-400">
                <span class="text-[#9C7C5C] flex-shrink-0">◦</span>{{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- How to do it -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">How to do it</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Starting life story work with a care home resident</h2>
        </div>
        <div class="mt-10 space-y-4">
          <div v-for="step in steps" :key="step.title" class="rounded-2xl bg-white p-6">
            <div class="flex items-start gap-4">
              <div class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#1C1917] text-xs font-bold text-white">{{ step.number }}</div>
              <div>
                <p class="text-sm font-semibold text-stone-900">{{ step.title }}</p>
                <p class="mt-2 text-xs leading-6 text-stone-500">{{ step.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- For families -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">For families</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">What families can do right now</h2>
        </div>
        <div class="mt-8 text-sm leading-7 text-stone-600 max-w-xl mx-auto space-y-4">
          <p>You don't need to wait for a care home to initiate life story work. Families can start the process themselves — and often produce something far richer than what a care home's standard admission paperwork captures.</p>
          <p>Tell Me Your Story guides your loved one through 100 questions — by typing or speaking — and turns their answers into a beautifully designed document that works both as a care home resource and as a family keepsake. You can share a private link with care staff or order a professionally printed hardcover to keep at the home.</p>
          <p>The best time to start is before they move into care, while they can still contribute in their own words. But it's never too late — family members can fill in answers from their own memories at any stage.</p>
        </div>
        <div class="mt-8 rounded-2xl bg-[#1C1917] p-8 text-center">
          <p class="font-display text-lg font-bold text-white">Start a life story book today</p>
          <p class="mt-2 text-sm text-stone-400">Free to start. 100 guided questions. Printed book from £34.98.</p>
          <router-link to="/register" class="mt-6 inline-block rounded-full bg-[#C4A882] px-7 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Create a life story book free →</router-link>
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

    <!-- Related -->
    <section class="px-5 py-12 sm:px-8">
      <div class="mx-auto max-w-3xl">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C] mb-6">Related reading</p>
        <div class="grid gap-4 sm:grid-cols-3">
          <router-link to="/dementia-life-story-book" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Dementia Life Story Book</p>
            <p class="mt-1 text-xs text-stone-500">Capturing stories when memory is fading</p>
          </router-link>
          <router-link to="/reminiscence-therapy-life-story" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Reminiscence Therapy</p>
            <p class="mt-1 text-xs text-stone-500">How life stories support reminiscence work</p>
          </router-link>
          <router-link to="/questions-to-ask-elderly-parents" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Questions for Elderly Parents</p>
            <p class="mt-1 text-xs text-stone-500">100 questions to start the conversation</p>
          </router-link>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-[#1C1917] px-5 py-16 text-center sm:px-8 sm:py-20">
      <h2 class="font-display text-2xl font-bold text-white sm:text-3xl">Their story belongs in their care</h2>
      <p class="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#A8A29E]">Start capturing their life story today — free, in their own words, at their own pace. Share it with their care team and keep it for the family forever.</p>
      <router-link to="/register" class="mt-8 inline-block rounded-full bg-[#C4A882] px-8 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Create a life story book free →</router-link>
      <p class="mt-4 text-xs text-[#9C7C5C]">Free to start · One-time payment · Printed book from £34.98</p>
    </section>

  </main>
</template>

<script setup lang="ts">
import { useSeo } from '../composables/useSeo'

const benefits = [
  { icon: '🧠', title: 'Reduces anxiety and distress', desc: 'Carers who know a resident\'s history can anticipate what might cause distress and what might comfort them — reducing anxiety-driven behaviours, particularly in dementia.' },
  { icon: '🤝', title: 'Builds trust faster', desc: 'Knowing someone\'s story gives carers genuine conversation starters and connection points — making relationships feel human rather than clinical.' },
  { icon: '🌟', title: 'Maintains identity and dignity', desc: 'A person\'s sense of who they are doesn\'t disappear when they move into care. Life story work helps staff recognise and reinforce that identity.' },
  { icon: '👨‍👩‍👧', title: 'Supports family involvement', desc: 'A shared life story document helps families feel their loved one\'s history is being honoured and communicated to the care team.' },
  { icon: '📋', title: 'Improves CQC outcomes', desc: 'The Care Quality Commission looks for evidence of personalised care. Life story documentation directly supports strong outcomes in the "responsive" and "caring" domains.' },
  { icon: '😊', title: 'Improves wellbeing', desc: 'Research consistently shows that residents who feel known and understood report higher wellbeing. Life story work is one of the most accessible ways to achieve this.' },
]

const careItems = [
  'Preferred name and any nicknames',
  'Daily routine and sleep preferences',
  'Food they love — and strongly dislike',
  'Music that comforts or upsets them',
  'Names of family members they ask for',
  'Things that cause anxiety or distress',
  'Comforting objects or rituals',
  'Religious or spiritual beliefs',
  'How they like to be addressed',
  'Favourite topics of conversation',
]

const keepsakItems = [
  'Childhood memories and early life',
  'School, friends, and teenage years',
  'Working life and proudest achievements',
  'How they met their partner',
  'Family life and raising children',
  'Hard times and how they got through',
  'What they want to be remembered for',
  'Wisdom they want to pass on',
  'Voice recordings of their stories',
  'Photos alongside their answers',
]

const steps = [
  { number: '1', title: 'Start before they move in if possible', desc: 'The richest life story documents are created while the person can still contribute in their own words. If they\'re moving into care soon, start now. Even a few hours of conversation produces something valuable.' },
  { number: '2', title: 'Involve the person themselves', desc: 'Where possible, let them lead. Their own words matter more than a family summary. Use guided questions to draw out their story — Tell Me Your Story\'s 100 questions are designed to do exactly this, and they can answer by speaking rather than typing.' },
  { number: '3', title: 'Ask family to contribute', desc: 'Family members hold parts of the story the person might not volunteer themselves — early memories, stories about their working life, the way they used to laugh at particular things. Gather these alongside the person\'s own account.' },
  { number: '4', title: 'Share it with the care team', desc: 'Give a copy to the care home — both a printed copy for the room and a digital version for the care file. Tell Me Your Story lets you share a private link so any authorised staff member can read it. Ask specifically that it\'s shared with everyone who provides regular care, not just the senior team.' },
  { number: '5', title: 'Update it over time', desc: 'A life story isn\'t finished when the document is created. Preferences change, new memories surface, the family dynamic evolves. Return to it — add to it when something new comes up, and make sure the care team has the updated version.' },
]

const faqs = [
  { q: 'What is life story work in care homes?', a: 'Life story work in care homes is the process of capturing a resident\'s history, memories, preferences, and personality — and using that information to provide more personalised, person-centred care. It helps carers see beyond a diagnosis to the whole person, and is particularly valuable for residents living with dementia.' },
  { q: 'Is life story work evidence-based?', a: 'Yes. Life story work is endorsed by the Alzheimer\'s Society, NHS England, and the Social Care Institute for Excellence (SCIE) as a component of good dementia care. The Care Quality Commission also looks for evidence of personalised care that reflects residents\' histories and preferences.' },
  { q: 'Who should create a life story document for a care home resident?', a: 'Ideally the person themselves, supported by family members. The most meaningful life story documents combine the resident\'s own words with family contributions. A guided platform like Tell Me Your Story makes the process straightforward — the questions are already written and residents can answer by speaking.' },
  { q: 'What should a care home life story document include?', a: 'For daily care use: preferred name, routines, food preferences, music, things that comfort or cause distress, and key family members. For the wider keepsake: childhood memories, working life, family history, values, and what they want to be remembered for.' },
  { q: 'When is the right time to create a life story for someone moving into care?', a: 'As early as possible — ideally before they move in, while they can still contribute in their own words. But it\'s never too late. Family members can create a life story at any stage using their own memories and knowledge of the person.' },
  { q: 'How do I share a life story with a care home?', a: 'Tell Me Your Story lets you share a private link with care staff so they can read the story online. You can also order a professionally printed copy to keep at the home — a physical book that sits in the resident\'s room and can be read by any member of the care team.' },
]

useSeo({
  title: 'Life Story Work in Care Homes — A Guide for Families and Care Teams | Tell Me Your Story',
  description: 'Life story work helps care home residents feel seen, valued and understood. A guide to what it is, why it matters, what to include, and how to create a life story for someone in care. Free to start.',
  canonical: 'https://tellmeyourstory.uk/life-story-work-in-care-homes',
  schema: {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'What is life story work in care homes?', acceptedAnswer: { '@type': 'Answer', text: 'Life story work in care homes is the process of capturing a resident\'s history, memories, preferences, and personality — and using that information to provide more personalised, person-centred care.' } },
          { '@type': 'Question', name: 'Is life story work evidence-based?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Life story work is endorsed by the Alzheimer\'s Society, NHS England, and the Social Care Institute for Excellence (SCIE) as a component of good dementia care.' } },
          { '@type': 'Question', name: 'What should a care home life story document include?', acceptedAnswer: { '@type': 'Answer', text: 'For daily care: preferred name, routines, food preferences, music, and things that comfort or cause distress. For the keepsake: childhood memories, working life, family history, values, and what they want to be remembered for.' } },
          { '@type': 'Question', name: 'When is the right time to create a life story for someone moving into care?', acceptedAnswer: { '@type': 'Answer', text: 'As early as possible — ideally before they move in, while they can still contribute in their own words. But it\'s never too late.' } },
        ]
      }
    ]
  }
})
</script>

<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
</style>