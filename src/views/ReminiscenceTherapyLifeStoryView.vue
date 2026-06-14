<template>
  <main class="bg-white">

    <!-- Hero -->
    <section class="bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Reminiscence Therapy & Life Story</p>
        <h1 class="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          Reminiscence therapy<br>
          <em class="text-[#C4A882] italic">and the power of life story work</em>
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#A8A29E]">
          Reminiscence therapy uses memories and life history to improve wellbeing — particularly for older people and those living with dementia. A life story book is one of the most effective tools to support it. This guide explains how and why.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <router-link to="/register" class="rounded-full bg-[#C4A882] px-7 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Start a life story free →</router-link>
          <router-link to="/example" class="rounded-full border border-white/20 px-7 py-3 text-sm font-medium text-white transition hover:bg-white/10">See an example</router-link>
        </div>
      </div>
    </section>

    <!-- What is reminiscence therapy -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">What is reminiscence therapy?</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Using memories to improve wellbeing</h2>
        </div>
        <div class="mt-8 text-sm leading-7 text-stone-600 max-w-xl mx-auto space-y-4">
          <p>Reminiscence therapy is a structured approach that uses the recall of past experiences — people, places, events, and feelings — to improve psychological wellbeing. It's widely used in care settings, particularly with older adults and people living with dementia.</p>
          <p>The underlying principle is straightforward: reflecting on positive memories reinforces a sense of identity, continuity, and meaning. It helps people feel that their life has had purpose and value — which is particularly important for those facing illness, loss of independence, or cognitive decline.</p>
          <p>Reminiscence work can take many forms — structured group sessions using objects and photos from the past, one-to-one conversations, music, film, and oral history projects. Life story books are one of the most effective tools, because they create a permanent, portable record that can be returned to at any time.</p>
          <p>The approach is endorsed by the British Psychological Society, the Alzheimer's Society, and NHS England. A growing body of research suggests it can reduce depression and anxiety in older adults, improve mood and engagement in dementia care, and strengthen relationships between residents and care staff.</p>
        </div>
        <div class="mt-6 flex flex-wrap justify-center gap-3">
          <router-link to="/life-story-work-in-care-homes" class="text-xs text-[#7C5C3B] underline hover:no-underline">Life story work in care homes →</router-link>
          <span class="text-xs text-stone-300">·</span>
          <router-link to="/dementia-life-story-book" class="text-xs text-[#7C5C3B] underline hover:no-underline">Dementia life story books →</router-link>
          <span class="text-xs text-stone-300">·</span>
          <router-link to="/questions-to-ask-elderly-parents" class="text-xs text-[#7C5C3B] underline hover:no-underline">Questions to ask elderly parents →</router-link>
        </div>
      </div>
    </section>

    <!-- Types -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Types of reminiscence work</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Different approaches and when to use them</h2>
        </div>
        <div class="mt-10 grid gap-5 sm:grid-cols-2 md:grid-cols-3">
          <div v-for="type in types" :key="type.title" class="rounded-2xl bg-white p-6">
            <p class="text-2xl">{{ type.icon }}</p>
            <p class="mt-3 text-sm font-semibold text-stone-900">{{ type.title }}</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">{{ type.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Life story as a tool -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Life story as a tool</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">How a life story book supports reminiscence therapy</h2>
        </div>
        <div class="mt-8 text-sm leading-7 text-stone-600 max-w-xl mx-auto space-y-4">
          <p>A life story book is the most versatile and durable tool available for reminiscence work. Unlike a one-off session, it creates a permanent record that can be used in multiple ways — by the person themselves, by family, by care staff, and by therapists.</p>
          <p>In a reminiscence therapy context, a life story book serves as both the process and the outcome. The act of creating it — recalling memories, answering questions, selecting photos — is itself therapeutic. The finished book then becomes a resource that supports ongoing reminiscence work over months and years.</p>
          <p>For people with dementia, the physical book provides consistency and continuity. Looking through it can orient someone to their own history and identity — particularly comforting during periods of confusion. With Tell Me Your Story, voice recordings are also embedded via QR codes, so the book literally speaks — hearing their own voice, or the voice of a family member reading an answer, can be deeply grounding.</p>
          <p>For care staff, a life story book is an invaluable conversation guide — providing prompts that can turn a routine care interaction into a meaningful connection.</p>
        </div>
      </div>
    </section>

    <!-- Benefits -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">The evidence</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Benefits of reminiscence therapy</h2>
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

    <!-- For families -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">For families</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">How families can support reminiscence work</h2>
        </div>
        <div class="mt-8 text-sm leading-7 text-stone-600 max-w-xl mx-auto space-y-4">
          <p>You don't need a professional therapist to do reminiscence work with a loved one. Simple conversations about the past — prompted by the right questions, a photo, or a familiar song — can have many of the same benefits.</p>
          <p>The most powerful thing a family member can do is ask, listen, and preserve. Ask about their life. Listen without rushing to fill the silence. And preserve what they share — because the stories that come up in these conversations are often ones the family has never heard before.</p>
          <p>Tell Me Your Story is built specifically for this. The 100 guided questions across 10 chapters of life provide a natural structure for reminiscence conversations — and the finished book becomes both a therapeutic resource and a family heirloom.</p>
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

    <!-- TMYS CTA -->
    <section class="bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">The easier way</p>
        <h2 class="mt-3 font-display text-2xl font-bold text-white sm:text-3xl">Create a life story book for reminiscence</h2>
        <p class="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#A8A29E]">Tell Me Your Story guides your loved one through 100 questions — by typing or speaking — and turns their answers into a beautifully printed keepsake book with QR voice codes. A resource for reminiscence therapy and a family heirloom. Free to start.</p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <router-link to="/register" class="rounded-full bg-[#C4A882] px-7 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Start a life story free →</router-link>
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
          <router-link to="/life-story-work-in-care-homes" class="rounded-2xl border border-stone-200 bg-white p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Life Story Work in Care Homes</p>
            <p class="mt-1 text-xs text-stone-500">A guide for families and care teams</p>
          </router-link>
          <router-link to="/dementia-life-story-book" class="rounded-2xl border border-stone-200 bg-white p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Dementia Life Story Book</p>
            <p class="mt-1 text-xs text-stone-500">Capturing stories when memory is fading</p>
          </router-link>
          <router-link to="/keepsake-book" class="rounded-2xl border border-stone-200 bg-white p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Keepsake Book</p>
            <p class="mt-1 text-xs text-stone-500">Turn a life story into a printed keepsake</p>
          </router-link>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-[#1C1917] px-5 py-16 text-center sm:px-8 sm:py-20">
      <h2 class="font-display text-2xl font-bold text-white sm:text-3xl">Their memories are worth preserving</h2>
      <p class="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#A8A29E]">Start capturing their life story today — free, in their own words, at their own pace.</p>
      <router-link to="/register" class="mt-8 inline-block rounded-full bg-[#C4A882] px-8 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Start a life story free →</router-link>
      <p class="mt-4 text-xs text-[#9C7C5C]">Free to start · One-time payment · Printed book from £34.98</p>
    </section>

  </main>
</template>

<script setup lang="ts">
import { useSeo } from '../composables/useSeo'

const types = [
  { icon: '💬', title: 'Simple reminiscence', desc: 'Informal conversation about past memories — the most accessible form. Can happen anywhere, at any time, prompted by a photo, a song, or a question.' },
  { icon: '👥', title: 'Group reminiscence', desc: 'Structured sessions in care homes or day centres where residents share memories together. Builds community and reduces isolation.' },
  { icon: '🎯', title: 'Specific reminiscence', desc: 'Focused sessions exploring a particular theme — a decade, a place, a type of work. Often used in professional therapy contexts.' },
  { icon: '📖', title: 'Life review therapy', desc: 'A more structured form that reviews the whole arc of a life — often used to help people process and find meaning in their experiences.' },
  { icon: '🎨', title: 'Creative reminiscence', desc: 'Using art, music, objects, or writing to trigger and express memories. Particularly effective for people who find direct conversation difficult.' },
  { icon: '📚', title: 'Life story books', desc: 'A permanent, structured record of a person\'s life — memories, photos, voice recordings. The most versatile and durable reminiscence tool available.' },
]

const benefits = [
  { icon: '😊', title: 'Reduces depression and anxiety', desc: 'Multiple studies show reminiscence therapy reduces depressive symptoms in older adults — particularly those in residential care settings.' },
  { icon: '🧠', title: 'Supports cognitive function', desc: 'Engaging long-term memory through reminiscence work can support cognitive function and orientation in people with mild to moderate dementia.' },
  { icon: '🌟', title: 'Reinforces identity and self-worth', desc: 'Revisiting a life lived with purpose and meaning helps maintain a positive sense of self — particularly important during periods of dependency or illness.' },
  { icon: '🤝', title: 'Improves relationships with carers', desc: 'Carers who know a person\'s story connect with them as a whole human being rather than just a patient — improving the quality of every interaction.' },
  { icon: '👨‍👩‍👧', title: 'Strengthens family bonds', desc: 'Life story conversations often surface stories families have never heard — creating new points of connection and shared understanding.' },
  { icon: '📋', title: 'Provides practical care information', desc: 'A life story document gives care teams practical information about preferences, routines, and triggers — improving day-to-day care quality.' },
]

const tips = [
  { icon: '📸', title: 'Start with old photographs', desc: 'Photos are the most reliable trigger for reminiscence. Show them a photo from their past and ask who the people are and what they remember about that time.' },
  { icon: '🎵', title: 'Use music from their era', desc: 'Music is particularly powerful for people with dementia — musical memory often remains intact long after other memory systems are affected. Play songs from their teenage years and watch what surfaces.' },
  { icon: '🤫', title: 'Ask and listen — don\'t quiz', desc: 'Reminiscence is not a memory test. There are no right or wrong answers. The goal is connection and recall, not accuracy. Follow where the memory leads.' },
  { icon: '✍️', title: 'Capture what they share', desc: 'Write it down, record it on your phone, or use Tell Me Your Story to preserve their answers in a beautiful, permanent book.' },
  { icon: '🔄', title: 'Come back to it regularly', desc: 'Reminiscence work is most effective when it\'s regular rather than occasional. Even a short conversation once a week builds connection and supports wellbeing over time.' },
]

const faqs = [
  { q: 'What is reminiscence therapy?', a: 'Reminiscence therapy is a structured approach that uses the recall of past experiences — people, places, events, and feelings — to improve psychological wellbeing. It\'s widely used with older adults and people living with dementia, and is endorsed by the British Psychological Society and the Alzheimer\'s Society.' },
  { q: 'Does reminiscence therapy work for dementia?', a: 'Yes. Research shows reminiscence therapy can reduce depression and anxiety in people with dementia, improve mood and engagement, and strengthen relationships between residents and care staff. Life story books are particularly effective because they provide a permanent record that can be returned to at any time.' },
  { q: 'What is the difference between reminiscence therapy and life story work?', a: 'Reminiscence therapy uses memory recall to improve wellbeing in the moment. Life story work captures those memories in a permanent document — creating something that can support ongoing reminiscence work over time. A life story book is one of the most effective tools available for reminiscence therapy.' },
  { q: 'Can families do reminiscence work at home?', a: 'Yes. You don\'t need a professional therapist. Simple conversations about the past — prompted by photos, questions, or familiar music — can have many of the same benefits. Tell Me Your Story provides 100 guided questions that naturally structure these conversations and preserve what comes up.' },
  { q: 'How does a life story book support reminiscence therapy?', a: 'A life story book serves as both the process and the outcome of reminiscence work. Creating it — recalling memories, answering questions, selecting photos — is itself therapeutic. The finished book then becomes a resource for ongoing reminiscence work: a portable, personal record that can be used by the person, their family, and their care team.' },
]

useSeo({
  title: 'Reminiscence Therapy & Life Story Work — A Guide | Tell Me Your Story',
  description: 'Reminiscence therapy uses memories to improve wellbeing — particularly for older people and those with dementia. A guide to how it works, the evidence behind it, and how a life story book supports it.',
  canonical: 'https://tellmeyourstory.uk/reminiscence-therapy-life-story',
  schema: {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'What is reminiscence therapy?', acceptedAnswer: { '@type': 'Answer', text: 'Reminiscence therapy is a structured approach that uses the recall of past experiences to improve psychological wellbeing. It\'s widely used with older adults and people living with dementia.' } },
          { '@type': 'Question', name: 'Does reminiscence therapy work for dementia?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Research shows reminiscence therapy can reduce depression and anxiety in people with dementia, improve mood and engagement, and strengthen relationships between residents and care staff.' } },
          { '@type': 'Question', name: 'How does a life story book support reminiscence therapy?', acceptedAnswer: { '@type': 'Answer', text: 'A life story book serves as both the process and the outcome of reminiscence work. Creating it is itself therapeutic. The finished book then becomes a resource for ongoing reminiscence work.' } },
        ]
      }
    ]
  }
})
</script>

<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
</style>