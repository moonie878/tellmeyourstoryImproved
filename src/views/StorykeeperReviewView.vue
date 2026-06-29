<template>
  <main class="bg-white">

    <!-- Hero -->
    <section class="bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">StoryKeeper Review 2026</p>
        <h1 class="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
          StoryKeeper review —<br>
          <em class="text-[#C4A882] italic">is it worth it for UK families?</em>
        </h1>
        <p class="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#A8A29E]">
          An honest look at StoryKeeper — how it works, what it costs, what UK families need to know, and how it compares to the alternatives.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <router-link to="/storykeeper-alternative" class="rounded-full bg-[#C4A882] px-7 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">See the best StoryKeeper alternatives →</router-link>
          <router-link to="/example" class="rounded-full border border-white/20 px-7 py-3 text-sm font-medium text-white transition hover:bg-white/10">See a Tell Me Your Story example</router-link>
        </div>
      </div>
    </section>

    <!-- Quick verdict -->
    <section class="px-5 py-12 sm:px-8">
      <div class="mx-auto max-w-3xl">
        <div class="rounded-2xl border border-stone-200 p-6 sm:p-8">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C] mb-4">Quick verdict</p>
          <div class="grid gap-4 sm:grid-cols-2">
            <div>
              <p class="text-xs font-semibold text-green-600 uppercase tracking-wider mb-2">What's good</p>
              <ul class="space-y-2 text-xs text-stone-600">
                <li class="flex gap-2"><span class="text-green-500 flex-shrink-0">✓</span>Voice and video recording built in</li>
                <li class="flex gap-2"><span class="text-green-500 flex-shrink-0">✓</span>QR codes in the printed book</li>
                <li class="flex gap-2"><span class="text-green-500 flex-shrink-0">✓</span>One-time payment, no subscription</li>
                <li class="flex gap-2"><span class="text-green-500 flex-shrink-0">✓</span>Two hardcover books included</li>
                <li class="flex gap-2"><span class="text-green-500 flex-shrink-0">✓</span>No deadline — answer at your own pace</li>
              </ul>
            </div>
            <div>
              <p class="text-xs font-semibold text-red-500 uppercase tracking-wider mb-2">What to consider</p>
              <ul class="space-y-2 text-xs text-stone-600">
                <li class="flex gap-2"><span class="text-red-400 flex-shrink-0">✗</span>$99 upfront — no free tier to try first</li>
                <li class="flex gap-2"><span class="text-red-400 flex-shrink-0">✗</span>AI rewrites your loved one's words</li>
                <li class="flex gap-2"><span class="text-red-400 flex-shrink-0">✗</span>US-based company — prints and ships from abroad</li>
                <li class="flex gap-2"><span class="text-red-400 flex-shrink-0">✗</span>QR codes depend on their servers existing</li>
                <li class="flex gap-2"><span class="text-red-400 flex-shrink-0">✗</span>Very limited UK SEO presence — newer to UK market</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- What is StoryKeeper -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">What is StoryKeeper?</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">How StoryKeeper works</h2>
        </div>
        <div class="mt-8 text-sm leading-7 text-stone-600 max-w-xl mx-auto">
          <p>StoryKeeper is a memoir creation service that sends guided question prompts to a storyteller — usually a parent or grandparent — who can respond by typing, using voice-to-text, or recording audio and video. Over time the responses are collected and turned into a printed hardcover book.</p>
          <p class="mt-4">The company is based in Ireland and has a UK subdirectory (storykeeper.com/uk), though it operates globally across the US, Australia, and Europe. Their distinguishing feature — like Tell Me Your Story — is QR codes printed in the book that link to voice and video recordings.</p>
          <p class="mt-4">The key difference from competitors like Storyworth is the multimedia approach. Where Storyworth is purely text-based, StoryKeeper captures voice and video alongside written answers. For many families this is a significant advantage.</p>
        </div>
      </div>
    </section>

    <!-- Pricing -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Pricing</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">What StoryKeeper costs</h2>
        </div>
        <div class="mt-8 space-y-4">
          <div v-for="item in pricing" :key="item.title" class="rounded-2xl border border-stone-200 p-5 flex items-start gap-4">
            <span class="text-xl flex-shrink-0">{{ item.icon }}</span>
            <div>
              <p class="text-sm font-semibold text-stone-900">{{ item.title }}</p>
              <p class="mt-1 text-xs leading-5 text-stone-500">{{ item.desc }}</p>
            </div>
          </div>
        </div>
        <div class="mt-6 rounded-2xl bg-amber-50 border border-amber-200 p-5">
          <p class="text-xs font-semibold text-amber-700 mb-2">The key pricing difference for UK families</p>
          <p class="text-xs leading-5 text-stone-600">StoryKeeper charges $99 upfront before you've tried anything. Tell Me Your Story is free to start — you only pay when you're ready to export or print. For a family unsure whether their parent will engage with the platform, that's a meaningful difference.</p>
        </div>
      </div>
    </section>

    <!-- The AI rewriting issue -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">The important question</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Does StoryKeeper change your loved one's words?</h2>
        </div>
        <div class="mt-8 text-sm leading-7 text-stone-600 max-w-xl mx-auto">
          <p>This is the most important question to ask about any life story platform. StoryKeeper uses AI to transcribe and shape spoken narratives, with a professional editor polishing each chapter before print. For some families, this produces a cleaner, more readable result. For others, it raises a concern: is the book they're reading their parent's actual words — or an AI's version of them?</p>
          <p class="mt-4">Some reviewers have praised the editing as "brilliant." Others note that the specific phrases, digressions, and personality that make a person's voice unique can get smoothed away in the editing process.</p>
        </div>
        <div class="mt-6 rounded-2xl border border-[#7C5C3B] bg-[#FAF7F4] p-6">
          <p class="text-xs font-semibold uppercase tracking-wider text-[#7C5C3B] mb-3">Why this matters</p>
          <p class="text-xs leading-6 text-stone-600">In 20 years, when your grandchildren read the book, they'll want to hear their great-grandparent's actual voice — the specific words they chose, the way they told a story. Tell Me Your Story preserves answers exactly as given, with no AI rewriting. The words in the book are always theirs.</p>
        </div>
      </div>
    </section>

    <!-- Comparison table -->
    <section class="px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-4xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Side by side</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">StoryKeeper vs Tell Me Your Story</h2>
        </div>
        <div class="mt-10 overflow-x-auto">
          <table class="w-full text-xs">
            <thead>
              <tr>
                <th class="text-left py-3 px-4 text-stone-400 font-medium w-1/3"></th>
                <th class="py-3 px-4 text-center font-semibold text-stone-900 bg-stone-50 rounded-t-xl">StoryKeeper</th>
                <th class="py-3 px-4 text-center font-semibold text-white bg-[#1C1917] rounded-t-xl">Tell Me Your Story</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, i) in comparisonRows" :key="row.feature" :class="i % 2 === 0 ? 'bg-stone-50' : 'bg-white'">
                <td class="py-3 px-4 text-stone-600 font-medium">{{ row.feature }}</td>
                <td class="py-3 px-4 text-center text-stone-600">{{ row.them }}</td>
                <td class="py-3 px-4 text-center text-stone-900 font-medium bg-[#FAF7F4]">{{ row.us }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- Who should use StoryKeeper -->
    <section class="bg-[#F5F0E8] px-5 py-16 sm:px-8 sm:py-20">
      <div class="mx-auto max-w-3xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Honest verdict</p>
          <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">Who should use StoryKeeper?</h2>
        </div>
        <div class="mt-8 grid gap-4 sm:grid-cols-2">
          <div class="rounded-2xl bg-white p-5">
            <p class="text-xs font-semibold text-green-600 uppercase tracking-wider mb-3">StoryKeeper works well if you…</p>
            <ul class="space-y-2 text-xs text-stone-600">
              <li class="flex gap-2"><span class="text-green-500 flex-shrink-0">✓</span>Are comfortable paying $99 upfront</li>
              <li class="flex gap-2"><span class="text-green-500 flex-shrink-0">✓</span>Want a professionally edited, polished memoir</li>
              <li class="flex gap-2"><span class="text-green-500 flex-shrink-0">✓</span>Want two hardcover copies included in the price</li>
              <li class="flex gap-2"><span class="text-green-500 flex-shrink-0">✓</span>Are happy with AI-shaped narratives</li>
            </ul>
          </div>
          <div class="rounded-2xl bg-white p-5">
            <p class="text-xs font-semibold text-[#7C5C3B] uppercase tracking-wider mb-3">Consider Tell Me Your Story if you…</p>
            <ul class="space-y-2 text-xs text-stone-600">
              <li class="flex gap-2"><span class="text-[#7C5C3B] flex-shrink-0">✓</span>Want to try before you pay anything</li>
              <li class="flex gap-2"><span class="text-[#7C5C3B] flex-shrink-0">✓</span>Want their exact words preserved — no AI rewriting</li>
              <li class="flex gap-2"><span class="text-[#7C5C3B] flex-shrink-0">✓</span>Are based in the UK and want UK printing</li>
              <li class="flex gap-2"><span class="text-[#7C5C3B] flex-shrink-0">✓</span>Want a lower entry price with one-time payment options</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Related pages -->
    <section class="px-5 py-12 sm:px-8">
      <div class="mx-auto max-w-3xl">
        <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C] mb-6">Related reading</p>
        <div class="grid gap-4 sm:grid-cols-3">
          <router-link to="/storykeeper-alternative" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">StoryKeeper Alternatives</p>
            <p class="mt-1 text-xs text-stone-500">The best UK alternatives to StoryKeeper</p>
          </router-link>
          <router-link to="/storyworth-review" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Storyworth Review 2026</p>
            <p class="mt-1 text-xs text-stone-500">Is Storyworth worth it for UK families?</p>
          </router-link>
          <router-link to="/remento-review" class="rounded-2xl border border-stone-200 p-4 hover:border-[#7C5C3B] transition group">
            <p class="text-sm font-semibold text-stone-900 group-hover:text-[#7C5C3B]">Remento Review 2026</p>
            <p class="mt-1 text-xs text-stone-500">Does Remento's AI rewriting work?</p>
          </router-link>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-[#1C1917] px-5 py-16 text-center sm:px-8 sm:py-20">
      <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">The UK alternative</p>
      <h2 class="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">Try Tell Me Your Story — free</h2>
      <p class="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#A8A29E]">Built for UK families. Free to start. Their exact words, their own voice, preserved forever — with a printed hardcover book shipped in the UK.</p>
      <router-link to="/register" class="mt-8 inline-block rounded-full bg-[#C4A882] px-8 py-3 text-sm font-semibold text-[#1C1917] transition hover:opacity-90">Start free today →</router-link>
      <p class="mt-4 text-xs text-[#9C7C5C]">Free to start · One-time payment · UK printed book from £34.98</p>
    </section>

  </main>
</template>

<script setup lang="ts">
import { useSeo } from '../composables/useSeo'

const pricing = [
  { icon: '💵', title: '$99 one-time fee', desc: 'StoryKeeper charges $99 upfront — approximately £78 at current rates. This includes two hardcover books, AI and human editing, and lifetime access to the platform.' },
  { icon: '📚', title: 'Two hardcover books included', desc: 'Unlike most competitors, StoryKeeper includes two full-colour hardcover books in the base price. Additional copies are available at around $25-30 each.' },
  { icon: '🚢', title: 'International shipping for UK orders', desc: 'StoryKeeper is based in Ireland but prints and ships internationally. UK families should factor in shipping time and any additional costs.' },
  { icon: '🔒', title: 'No free trial', desc: 'There is no free tier. You pay $99 before experiencing the platform. If your parent doesn\'t engage or the platform doesn\'t suit them, refunds depend on their policy at the time.' },
]

const comparisonRows = [
  { feature: 'Free to start',         them: '✗ $99 upfront',         us: '✓ Free tier available' },
  { feature: 'UK-based',              them: '✗ Ireland / global',    us: '✓ Southampton, UK' },
  { feature: 'UK printing',           them: '✗ International',       us: '✓ UK printed' },
  { feature: 'Voice recordings',      them: '✓ Yes',                 us: '✓ Yes' },
  { feature: 'QR codes in book',      them: '✓ Yes',                 us: '✓ Yes' },
  { feature: 'Preserves exact words', them: '✗ AI rewrites answers', us: '✓ Words unchanged' },
  { feature: 'One-time payment',      them: '✓ Yes ($99)',           us: '✓ Yes (from £3.99)' },
  { feature: 'Photos in book',        them: '✓ Unlimited',           us: '✓ Included' },
  { feature: 'Gift purchase',         them: '✓ Yes',                 us: '✓ Yes' },
  { feature: 'Entry price',           them: '$99 (~£78)',             us: 'Free / from £3.99' },
]

useSeo({
  title: 'StoryKeeper Review: Is the $99 Fee Worth It? (UK 2026)',
  description: 'Honest StoryKeeper review: what £78 actually gets you, real complaints to know before buying, and a free UK alternative — no upfront cost.',
  canonical: 'https://tellmeyourstory.uk/storykeeper-review',
})
</script>

<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
</style>