<template>
  <main class="bg-[#f7f5f2] text-stone-900">
    <!-- HERO -->
    <section class="px-4 py-14 sm:px-6 sm:py-18 md:py-24">
      <div class="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-14">
        <div class="text-center md:text-left">
          <p class="text-xs font-medium uppercase tracking-[0.25em] text-stone-500 sm:text-sm">
            Preserve a loved one’s story
          </p>

          <h1 class="mt-4 text-3xl font-bold leading-tight sm:text-4xl md:text-6xl">
            Turn memories into a keepsake book you can hold onto forever
          </h1>

          <p class="mx-auto mt-5 max-w-xl text-base leading-7 text-stone-600 sm:text-lg sm:leading-8 md:mx-0">
            Answer guided questions about someone you love, add meaningful photos, and turn their memories into a beautifully designed story you can keep, print, and share.
          </p>

          <p class="mx-auto mt-4 max-w-lg text-sm text-stone-500 md:mx-0">
            Made for mums, dads, grandparents, family stories, and the moments you never want to lose.
          </p>

          <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center md:justify-start">
            <router-link
              to="/register"
              @click="trackStart"
              class="rounded-full bg-[#7C5C3B] px-6 py-3 text-center text-sm font-semibold text-white transition hover:opacity-90"
            >
              Start your story free
            </router-link>

            <router-link
              to="/example"
              @click="trackExampleStory"
              class="rounded-full border border-stone-300 bg-white px-6 py-3 text-center text-sm font-semibold text-stone-900 transition hover:bg-stone-100"
            >
              View example story
            </router-link>
          </div>

          <div class="mt-6 flex flex-col gap-2 text-xs text-stone-500 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4 md:justify-start">
            <span>✔ No subscription</span>
            <span>✔ Start for free</span>
            <span>✔ Download when you're ready</span>
          </div>
        </div>

        <div class="flex justify-center md:justify-end">
          <img
            src="/images/example-story-hero-cover.png"
            alt="Tell Me Your Story keepsake preview"
            class="w-full max-w-sm sm:max-w-md md:max-w-2xl"
          />
        </div>
      </div>
    </section>

    <!-- SOCIAL PROOF / OUTCOME -->
    <section class="border-t border-stone-200 bg-white px-4 py-14 sm:px-6 sm:py-16">
      <div class="mx-auto max-w-5xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.25em] text-stone-500 sm:text-sm">
          More than a writing tool
        </p>

        <h2 class="mt-4 text-3xl font-bold md:text-4xl">
          This helps you create something worth keeping
        </h2>

        <p class="mx-auto mt-5 max-w-3xl text-base leading-7 text-stone-600 sm:text-lg sm:leading-8">
          Not just answers on a screen — a finished keepsake with thoughtful structure, beautiful pages, personal photos, and memories your family can come back to for years.
        </p>
      </div>
    </section>

    <!-- EXAMPLE STORY -->
    <section class="border-t border-stone-200 bg-[#f7f5f2] px-4 py-16 sm:px-6 sm:py-20">
      <div class="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-12">
        <div class="text-center md:text-left">
          <p class="text-xs font-medium uppercase tracking-[0.25em] text-stone-500 sm:text-sm">
            Example story
          </p>

          <h2 class="mt-4 text-3xl font-bold md:text-4xl">
            See how simple answers become a finished keepsake
          </h2>

          <p class="mt-5 text-base leading-7 text-stone-600 sm:text-lg sm:leading-8">
            Explore a real example of a completed story — from guided questions and personal memories to a keepsake book filled with chapters, quotes, and photos.
          </p>

          <div class="mt-6 space-y-3 text-left text-sm text-stone-600 md:max-w-lg">
            <p>✔ Real answers turned into a structured story</p>
            <p>✔ Highlighted quote pages and chapter moments</p>
            <p>✔ Designed layouts ready to print, save, or share</p>
          </div>

          <router-link
            to="/example"
            @click="trackExampleStory"
            class="mt-8 inline-block rounded-full bg-[#7C5C3B] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Explore example story
          </router-link>
        </div>

        <div class="flex justify-center">
          <img
            src="/images/example-story-memory-page.png"
            alt="Example story preview"
            class="w-full max-w-md rounded-[2rem] shadow-lg md:max-w-xl"
          />
        </div>
      </div>
    </section>

    <!-- TRANSFORMATION / GALLERY -->
    <section class="border-t border-stone-200 bg-white px-4 py-16 sm:px-6 sm:py-20">
      <div class="mx-auto max-w-6xl">
        <div class="max-w-2xl text-center md:text-left">
          <p class="text-xs font-medium uppercase tracking-[0.25em] text-stone-500 sm:text-sm">
            The finished result
          </p>

          <h2 class="mt-4 text-3xl font-bold md:text-4xl">
            From guided answers to beautifully designed pages
          </h2>

          <p class="mt-4 text-base leading-7 text-stone-600 sm:text-lg">
            Chapters, quotes, elegant layouts, and personal images all come together to make your story feel like a real keepsake book.
          </p>
        </div>

        <div class="mt-10 grid gap-5 md:mt-12 md:grid-cols-3 md:gap-6">
          <div class="rounded-[2rem] border border-stone-200 bg-stone-50 p-3 shadow-sm">
            <img
              src="/images/example-story-chapter.png"
              alt="Chapter page preview"
              class="w-full rounded-[1.5rem]"
            />
          </div>

          <div class="rounded-[2rem] border border-stone-200 bg-stone-50 p-3 shadow-sm">
            <img
              src="/images/example-story-quote.png"
              alt="Quote page preview"
              class="w-full rounded-[1.5rem]"
            />
          </div>

          <div class="rounded-[2rem] border border-stone-200 bg-stone-50 p-3 shadow-sm">
            <img
              src="/images/example-story-cover.png"
              alt="Cover page preview"
              class="w-full rounded-[1.5rem]"
            />
          </div>
        </div>

        <div class="mt-5 grid gap-5 md:mt-6 md:grid-cols-2 md:gap-6">
          <div class="rounded-[2rem] border border-stone-200 bg-stone-50 p-3 shadow-sm">
            <img
              src="/images/example-story-memory-page.png"
              alt="Story page preview"
              class="w-full rounded-[1.5rem]"
            />
          </div>

          <div class="rounded-[2rem] border border-stone-200 bg-stone-50 p-3 shadow-sm">
            <img
              src="/images/example-story-closing.png"
              alt="Closing page preview"
              class="w-full rounded-[1.5rem]"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- HOW IT WORKS -->
    <section class="border-t border-stone-200 bg-[#f7f5f2] px-4 py-16 sm:px-6 sm:py-20">
      <div class="mx-auto max-w-6xl">
        <div class="max-w-2xl text-center md:text-left">
          <p class="text-xs font-medium uppercase tracking-[0.25em] text-stone-500 sm:text-sm">
            How it works
          </p>

          <h2 class="mt-4 text-3xl font-bold md:text-4xl">
            A simple way to create something lasting
          </h2>
        </div>

        <div class="mt-10 grid gap-5 md:mt-12 md:grid-cols-3 md:gap-6">
          <div class="rounded-3xl border border-stone-200 bg-white p-6">
            <h3 class="text-xl font-semibold">1. Choose a story</h3>
            <p class="mt-3 text-stone-600">
              Start with a Mum, Dad, Grandparent, Life Story, Couple Story, or another meaningful keepsake.
            </p>
          </div>

          <div class="rounded-3xl border border-stone-200 bg-white p-6">
            <h3 class="text-xl font-semibold">2. Answer guided prompts</h3>
            <p class="mt-3 text-stone-600">
              Capture memories one answer at a time with automatic saving, highlighted moments, and optional photos.
            </p>
          </div>

          <div class="rounded-3xl border border-stone-200 bg-white p-6">
            <h3 class="text-xl font-semibold">3. Create your keepsake</h3>
            <p class="mt-3 text-stone-600">
              Turn it into a beautifully designed book you can keep, print, share, or give as a meaningful gift.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- STORY TYPES -->
    <section class="border-t border-stone-200 bg-white px-4 py-16 sm:px-6 sm:py-20">
      <div class="mx-auto max-w-6xl">
        <div class="max-w-2xl text-center md:text-left">
          <p class="text-xs font-medium uppercase tracking-[0.25em] text-stone-500 sm:text-sm">
            Story types
          </p>

          <h2 class="mt-4 text-3xl font-bold md:text-4xl">
            Choose the story you want to preserve
          </h2>
        </div>

        <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 md:mt-12 md:gap-6">
          <div class="rounded-3xl border border-stone-200 bg-stone-50 p-6">
            <h3 class="text-xl font-semibold text-stone-900">Mum’s Story</h3>
            <p class="mt-3 text-stone-600">
              Preserve memories, family moments, and everything that made her who she is.
            </p>
          </div>

          <div class="rounded-3xl border border-stone-200 bg-stone-50 p-6">
            <h3 class="text-xl font-semibold text-stone-900">Dad’s Story</h3>
            <p class="mt-3 text-stone-600">
              Capture his memories, lessons, humour, milestones, and life story in one place.
            </p>
          </div>

          <div class="rounded-3xl border border-stone-200 bg-stone-50 p-6">
            <h3 class="text-xl font-semibold text-stone-900">Grandparent Stories</h3>
            <p class="mt-3 text-stone-600">
              Keep family history, traditions, and stories that future generations will treasure.
            </p>
          </div>

          <div class="rounded-3xl border border-stone-200 bg-stone-50 p-6">
            <h3 class="text-xl font-semibold text-stone-900">Life Story</h3>
            <p class="mt-3 text-stone-600">
              Tell a full personal story through memories, milestones, values, and reflections.
            </p>
          </div>

          <div class="rounded-3xl border border-stone-200 bg-stone-50 p-6">
            <h3 class="text-xl font-semibold text-stone-900">Couple Story</h3>
            <p class="mt-3 text-stone-600">
              Capture the story of your relationship, your memories together, and the life you built.
            </p>
          </div>

          <div class="rounded-3xl border border-stone-200 bg-stone-50 p-6">
            <h3 class="text-xl font-semibold text-stone-900">More to come</h3>
            <p class="mt-3 text-stone-600">
              Build more keepsakes over time and preserve more family stories in one place.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- WHY IT MATTERS -->
    <section class="border-t border-stone-200 bg-[#f7f5f2] px-4 py-16 sm:px-6 sm:py-20">
      <div class="mx-auto max-w-4xl text-center">
        <p class="text-xs font-medium uppercase tracking-[0.25em] text-stone-500 sm:text-sm">
          Why it matters
        </p>

        <h2 class="mt-4 text-3xl font-bold md:text-4xl">
          The stories that matter most are often the easiest to lose
        </h2>

        <p class="mt-6 text-base leading-7 text-stone-600 sm:text-lg sm:leading-8">
          The questions we mean to ask, the memories we assume we will remember, and the moments that feel ordinary now can become the ones we miss most later. This helps you preserve them before they fade.
        </p>
      </div>
    </section>

    <!-- WHO IT'S FOR -->
    <section class="border-t border-stone-200 bg-white px-4 py-16 sm:px-6 sm:py-20">
      <div class="mx-auto max-w-6xl">
        <div class="max-w-2xl text-center md:text-left">
          <p class="text-xs font-medium uppercase tracking-[0.25em] text-stone-500 sm:text-sm">
            Who it’s for
          </p>

          <h2 class="mt-4 text-3xl font-bold md:text-4xl">
            Made for families, meaningful gifts, and memories worth holding onto
          </h2>
        </div>

        <div class="mt-10 grid gap-5 md:mt-12 md:grid-cols-3 md:gap-6">
          <div class="rounded-3xl border border-stone-200 bg-stone-50 p-6">
            <h3 class="text-xl font-semibold text-stone-900">For daughters and sons</h3>
            <p class="mt-3 text-stone-600">
              Preserve the story of a parent while there is still time to ask the questions that matter.
            </p>
          </div>

          <div class="rounded-3xl border border-stone-200 bg-stone-50 p-6">
            <h3 class="text-xl font-semibold text-stone-900">For meaningful gifts</h3>
            <p class="mt-3 text-stone-600">
              Create something deeply personal and lasting instead of a gift that will be forgotten.
            </p>
          </div>

          <div class="rounded-3xl border border-stone-200 bg-stone-50 p-6">
            <h3 class="text-xl font-semibold text-stone-900">For family history</h3>
            <p class="mt-3 text-stone-600">
              Capture stories, values, and memories that future generations can revisit and treasure.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- PRICING -->
    <section id="pricing" class="border-t border-stone-200 bg-white px-4 py-16 sm:px-6 sm:py-20">
      <div class="mx-auto max-w-6xl">
        <div class="text-center">
          <p class="text-xs font-medium uppercase tracking-[0.25em] text-stone-500 sm:text-sm">
            Pricing
          </p>

          <h2 class="mt-4 text-3xl font-bold md:text-4xl">
            Start free, upgrade when you’re ready
          </h2>

          <p class="mt-4 text-base leading-7 text-stone-600 sm:text-lg">
            Begin writing for free, then unlock the finished keepsake experience when you want to export, print, or gift it.
          </p>
        </div>

        <div class="mt-10 grid gap-5 md:mt-12 md:grid-cols-3 md:gap-6">
          <div class="flex h-full flex-col rounded-3xl border border-stone-200 bg-stone-50 p-6 sm:p-8">
            <h3 class="text-xl font-semibold">Free</h3>
            <p class="mt-2 text-stone-600">Start capturing memories</p>
            <p class="mt-6 text-3xl font-bold">£0</p>
            <ul class="mt-6 space-y-2 text-sm text-stone-600">
              <li>✔ Start a story</li>
              <li>✔ Save progress</li>
              <li>✔ Preview your keepsake</li>
              <li>✖ No downloads</li>
            </ul>

            <router-link
              to="/register"
              @click="trackPricingFree"
              class="mt-8 inline-block w-full rounded-full bg-[#7C5C3B] px-4 py-3 text-center text-white transition hover:opacity-90"
            >
              Start for free
            </router-link>
          </div>

          <div class="flex h-full flex-col rounded-3xl border-2 border-stone-900 bg-white p-6 sm:p-8 shadow-sm">
            <h3 class="text-xl font-semibold">Single Story</h3>
            <p class="mt-2 text-stone-600">For one meaningful keepsake</p>
            <p class="mt-6 text-3xl font-bold">£3.99</p>
            <ul class="mt-6 space-y-2 text-sm text-stone-600">
              <li>✔ Full guided story experience</li>
              <li>✔ Beautiful keepsake export</li>
              <li>✔ Ready to print, share, or gift</li>
            </ul>

            <button
              @click="trackPricingSingle"
              class="mt-8 w-full rounded-full bg-[#7C5C3B] px-4 py-3 text-white transition hover:opacity-90"
            >
              Create my story
            </button>
          </div>

          <div class="flex h-full flex-col rounded-3xl border border-stone-200 bg-stone-50 p-6 sm:p-8">
            <h3 class="text-xl font-semibold">All Stories</h3>
            <p class="mt-2 text-stone-600">For multiple family keepsakes</p>
            <p class="mt-6 text-3xl font-bold">£11.99</p>
            <ul class="mt-6 space-y-2 text-sm text-stone-600">
              <li>✔ All story types</li>
              <li>✔ Future templates</li>
              <li>✔ Export included</li>
            </ul>

            <button
              @click="trackPricingAll"
              class="mt-8 w-full rounded-full bg-[#7C5C3B] px-4 py-3 text-white transition hover:opacity-90"
            >
              Create more stories
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- FINAL CTA -->
    <section class="border-t border-stone-200 bg-stone-900 px-4 py-16 text-white sm:px-6 sm:py-20">
      <div class="mx-auto max-w-3xl text-center">
        <h2 class="text-3xl font-bold md:text-4xl">
          Start creating a keepsake your family can treasure
        </h2>

        <p class="mt-4 text-base leading-7 text-stone-300 sm:text-lg">
          Start free, answer at your own pace, and turn meaningful memories into something you can keep forever.
        </p>

        <router-link
          to="/register"
          @click="trackStart"
          class="mt-8 inline-block rounded-full bg-white px-6 py-3 text-sm font-semibold text-stone-900 transition hover:bg-stone-100"
        >
          Start your story free
        </router-link>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { track } from '../lib/analytics'
import { useSeo } from '../composables/useSeo'

useSeo({
  title: 'Tell Me Your Story | Turn memories into a beautiful keepsake book',
  description:
    'Answer guided questions about someone you love, add photos, and turn their memories into a beautifully designed keepsake book you can keep, print, and share.',
})

function trackStart() {
  track('upgrade_clicked', {
    source: 'homepage',
  })
}

function trackExampleStory() {
  track('example_story_clicked', {
    source: 'homepage',
  })
}

function trackPricingFree() {
  track('upgrade_clicked', {
    source: 'home_pricing_free',
    plan: 'free',
  })
}

function trackPricingSingle() {
  track('upgrade_clicked', {
    source: 'home_pricing_single',
    plan: 'single',
  })
}

function trackPricingAll() {
  track('upgrade_clicked', {
    source: 'home_pricing_all',
    plan: 'all',
  })
}
</script>