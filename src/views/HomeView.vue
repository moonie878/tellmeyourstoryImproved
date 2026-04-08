<template>
  <main class="bg-stone-50 text-stone-900">
    <!-- Hero -->
    <section class="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <div
        class="overflow-hidden rounded-[2rem] border border-stone-200/80 bg-gradient-to-br from-[#f8f2eb] via-white to-stone-50 shadow-sm"
      >
        <div class="grid items-center gap-12 px-8 py-10 md:grid-cols-2 md:px-12 md:py-14">
          <div>
            <p class="text-sm font-medium uppercase tracking-[0.25em] text-stone-500">
              Preserve precious memories
            </p>

            <h1 class="mt-4 max-w-2xl text-4xl font-bold leading-tight text-stone-900 md:text-6xl">
              Preserve the stories you never want to lose
            </h1>

            <p class="mt-5 max-w-xl text-lg leading-8 text-stone-600">
              Answer thoughtful questions and turn memories into a beautifully written keepsake
              you can save, print, and share with the people who matter most.
            </p>

            <p class="mt-3 text-sm text-stone-500">
              Made for parents, grandparents, couples, and full life stories.
            </p>

            <div class="mt-8 flex flex-wrap gap-4">
              <router-link
                to="/register"
                @click="trackStart"
                class="rounded-full bg-[#7C5C3B] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Get started free
              </router-link>

              <router-link
                to="/login"
                @click="trackHeroLogin"
                class="rounded-full border border-stone-300 bg-white px-6 py-3 text-sm font-semibold text-stone-900 transition hover:bg-stone-100"
              >
                Login
              </router-link>
            </div>

            <div class="mt-8 grid max-w-xl gap-3 sm:grid-cols-3">
              <div class="rounded-2xl bg-white/80 px-4 py-3 shadow-sm">
                <p class="text-sm font-semibold text-stone-900">Start free</p>
                <p class="mt-1 text-xs leading-5 text-stone-600">
                  Begin writing before you decide to upgrade.
                </p>
              </div>

              <div class="rounded-2xl bg-white/80 px-4 py-3 shadow-sm">
                <p class="text-sm font-semibold text-stone-900">Save as you go</p>
                <p class="mt-1 text-xs leading-5 text-stone-600">
                  Build stories slowly, one memory at a time.
                </p>
              </div>

              <div class="rounded-2xl bg-white/80 px-4 py-3 shadow-sm">
                <p class="text-sm font-semibold text-stone-900">Create a keepsake</p>
                <p class="mt-1 text-xs leading-5 text-stone-600">
                  Export when you’re ready for the finished version.
                </p>
              </div>
            </div>
          </div>

          <div class="rounded-[1.75rem] border border-white/70 bg-white/80 p-6 shadow-sm md:p-8">
            <p class="text-xs font-medium uppercase tracking-[0.2em] text-stone-500">
              Example story flow
            </p>

            <div class="mt-5 space-y-4">
              <div class="rounded-2xl bg-stone-50 p-4">
                <p class="text-sm text-stone-500">Chapter 1</p>
                <h3 class="mt-1 text-lg font-semibold text-stone-900">Beginnings</h3>
                <p class="mt-2 leading-6 text-stone-600">
                  Where does your story begin, and what have you been told about those early years?
                </p>
              </div>

              <div class="rounded-2xl bg-stone-50 p-4">
                <p class="text-sm text-stone-500">Chapter 5</p>
                <h3 class="mt-1 text-lg font-semibold text-stone-900">Family Life</h3>
                <p class="mt-2 leading-6 text-stone-600">
                  What moments with family shaped you most, and what do they mean to you now?
                </p>
              </div>

              <div class="rounded-2xl bg-stone-50 p-4">
                <p class="text-sm text-stone-500">Chapter 10</p>
                <h3 class="mt-1 text-lg font-semibold text-stone-900">Legacy</h3>
                <p class="mt-2 leading-6 text-stone-600">
                  What wisdom, memories, or messages would you want future generations to keep?
                </p>
              </div>
            </div>

            <p class="mt-5 text-sm leading-6 text-stone-500">
              Most people begin with just one memory — then slowly build something truly worth keeping.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Story types -->
    <section class="mx-auto max-w-6xl px-6 pb-20">
      <div class="max-w-2xl">
        <p class="text-sm font-medium uppercase tracking-[0.25em] text-stone-500">
          Story types
        </p>
        <h2 class="mt-4 text-3xl font-bold md:text-4xl">
          Choose the story you want to preserve
        </h2>
        <p class="mt-4 text-lg leading-7 text-stone-600">
          Start with the story that matters most now, then come back for more when you’re ready.
        </p>
      </div>

      <div class="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <div
          v-for="story in storyTypes"
          :key="story.title"
          class="rounded-[1.75rem] border border-stone-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
        >
          <p v-if="story.label" class="text-xs font-medium uppercase tracking-[0.2em] text-[#7C5C3B]">
            {{ story.label }}
          </p>

          <h3 class="mt-3 text-xl font-semibold text-stone-900">
            {{ story.title }}
          </h3>

          <p class="mt-3 text-sm leading-6 text-stone-600">
            {{ story.description }}
          </p>
        </div>
      </div>
    </section>

    <!-- How it works -->
    <section class="border-y border-stone-200 bg-white">
      <div class="mx-auto max-w-6xl px-6 py-20">
        <div class="max-w-2xl">
          <p class="text-sm font-medium uppercase tracking-[0.25em] text-stone-500">
            How it works
          </p>
          <h2 class="mt-4 text-3xl font-bold md:text-4xl">
            A simple way to turn memories into something lasting
          </h2>
          <p class="mt-4 text-lg leading-7 text-stone-600">
            Guide a loved one through thoughtful prompts, save their story over time, and turn it
            into a finished keepsake when you’re ready.
          </p>
        </div>

        <div class="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div class="rounded-3xl border border-stone-200 bg-stone-50 p-6">
            <h3 class="text-xl font-semibold text-stone-900">Choose a story</h3>
            <p class="mt-3 leading-6 text-stone-600">
              Start with a story for Mum, Dad, Grandparents, a Couple, or a full Life Story.
            </p>
          </div>

          <div class="rounded-3xl border border-stone-200 bg-stone-50 p-6">
            <h3 class="text-xl font-semibold text-stone-900">Answer slowly</h3>
            <p class="mt-3 leading-6 text-stone-600">
              Write one memory at a time with automatic saving, so nothing feels rushed.
            </p>
          </div>

          <div class="rounded-3xl border border-stone-200 bg-stone-50 p-6">
            <h3 class="text-xl font-semibold text-stone-900">Add treasured photos</h3>
            <p class="mt-3 leading-6 text-stone-600">
              Upload meaningful images to make the story feel even more personal and complete.
            </p>
          </div>

          <div class="rounded-3xl border border-stone-200 bg-stone-50 p-6">
            <h3 class="text-xl font-semibold text-stone-900">Create the keepsake</h3>
            <p class="mt-3 leading-6 text-stone-600">
              Export the finished story into a polished keepsake you can save, print, and share.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Why people use it -->
    <section class="bg-stone-50">
      <div class="mx-auto max-w-6xl px-6 py-20">
        <div class="max-w-2xl">
          <p class="text-sm font-medium uppercase tracking-[0.25em] text-stone-500">
            Who it’s for
          </p>
          <h2 class="mt-4 text-3xl font-bold md:text-4xl">
            Made for families who want to keep stories, not lose them
          </h2>
          <p class="mt-4 text-lg leading-7 text-stone-600">
            Tell Me Your Story is designed for people who want to capture memories thoughtfully and
            turn them into something lasting.
          </p>
        </div>

        <div class="mt-12 grid gap-6 md:grid-cols-3">
          <div class="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
            <h3 class="text-xl font-semibold text-stone-900">For daughters and sons</h3>
            <p class="mt-3 leading-6 text-stone-600">
              Ask thoughtful questions and preserve the stories of a parent while you still can.
            </p>
          </div>

          <div class="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
            <h3 class="text-xl font-semibold text-stone-900">For meaningful gifts</h3>
            <p class="mt-3 leading-6 text-stone-600">
              Create something personal and heartfelt that feels far more special than a generic gift.
            </p>
          </div>

          <div class="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
            <h3 class="text-xl font-semibold text-stone-900">For memory keeping</h3>
            <p class="mt-3 leading-6 text-stone-600">
              Turn everyday memories, milestones, and life lessons into something you can revisit for years.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing -->
    <section class="border-y border-stone-200 bg-white">
      <div class="mx-auto max-w-6xl px-6 py-20">
        <div class="text-center">
          <p class="text-sm font-medium uppercase tracking-[0.25em] text-stone-500">
            Pricing
          </p>
          <h2 class="mt-4 text-3xl font-bold md:text-4xl">
            Start free, upgrade when you’re ready
          </h2>
          <p class="mt-4 mx-auto max-w-2xl text-lg leading-7 text-stone-600">
            Begin writing for free, then choose the keepsake option that fits when you’re ready to
            create the finished version.
          </p>
        </div>

        <div class="mt-12 grid gap-6 md:grid-cols-3">
          <div class="flex h-full flex-col rounded-3xl border border-stone-200 bg-stone-50 p-8">
            <h3 class="text-xl font-semibold text-stone-900">Free</h3>
            <p class="mt-2 text-stone-600">Start capturing memories</p>

            <p class="mt-6 text-3xl font-bold text-stone-900">£0</p>
            <p class="mt-2 text-sm leading-6 text-stone-500">
              Best for trying the experience before deciding on your finished keepsake.
            </p>

            <ul class="mt-6 space-y-2 text-sm text-stone-600">
              <li>✔ Start a story</li>
              <li>✔ Save progress</li>
              <li>✔ Explore the experience</li>
              <li>✖ No exports yet</li>
            </ul>

            <router-link
              to="/register"
              @click="trackPricingFree"
              class="mt-auto inline-block w-full rounded-full bg-[#7C5C3B] px-4 py-2.5 text-center text-white transition hover:opacity-90"
            >
              Start for free
            </router-link>
          </div>

          <div class="flex h-full flex-col rounded-3xl border-2 border-[#7C5C3B] bg-white p-8 shadow-sm">
            <p class="text-xs font-medium uppercase tracking-[0.2em] text-[#7C5C3B]">
              Most popular
            </p>

            <h3 class="mt-3 text-xl font-semibold text-stone-900">Single Story</h3>
            <p class="mt-2 text-stone-600">For one meaningful keepsake</p>

            <p class="mt-6 text-3xl font-bold text-stone-900">£3.99</p>
            <p class="mt-2 text-sm leading-6 text-stone-500">
              Best for turning one story into a finished keepsake to save, print, or gift.
            </p>

            <ul class="mt-6 space-y-2 text-sm text-stone-600">
              <li>✔ Full access to one story</li>
              <li>✔ 100 guided prompts</li>
              <li>✔ Export available</li>
            </ul>

            <button
              @click="trackPricingSingle"
              class="mt-auto cursor-pointer rounded-full bg-[#7C5C3B] px-4 py-2.5 text-white transition hover:opacity-90"
            >
              Choose single story
            </button>
          </div>

          <div class="flex h-full flex-col rounded-3xl border border-stone-200 bg-stone-50 p-8">
            <h3 class="text-xl font-semibold text-stone-900">All Stories</h3>
            <p class="mt-2 text-stone-600">For multiple keepsakes</p>

            <p class="mt-6 text-3xl font-bold text-stone-900">£11.99</p>
            <p class="mt-2 text-sm leading-6 text-stone-500">
              Best for families creating multiple keepsakes across parents, grandparents, couples,
              and life stories.
            </p>

            <ul class="mt-6 space-y-2 text-sm text-stone-600">
              <li>✔ All story types</li>
              <li>✔ Future story templates</li>
              <li>✔ Export included</li>
            </ul>

            <button
              @click="trackPricingAll"
              class="mt-auto cursor-pointer rounded-full bg-[#7C5C3B] px-4 py-2.5 text-white transition hover:opacity-90"
            >
              Choose all stories
            </button>
          </div>
        </div>

        <p class="mt-8 text-center text-sm text-stone-500">
          Most people start for free, then upgrade when they’re ready to create the finished keepsake.
        </p>
      </div>
    </section>

    <!-- Why it feels different -->
    <section class="bg-stone-50">
      <div class="mx-auto max-w-6xl px-6 py-20">
        <div class="max-w-2xl">
          <p class="text-sm font-medium uppercase tracking-[0.25em] text-stone-500">
            Why it feels different
          </p>
          <h2 class="mt-4 text-3xl font-bold md:text-4xl">
            More thoughtful than a form. More personal than a document.
          </h2>
          <p class="mt-4 text-lg leading-7 text-stone-600">
            Tell Me Your Story is built to help families preserve memories with more care, more beauty,
            and more meaning.
          </p>
        </div>

        <div class="mt-12 grid gap-6 md:grid-cols-3">
          <div class="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
            <h3 class="text-xl font-semibold text-stone-900">Guided, not overwhelming</h3>
            <p class="mt-3 leading-6 text-stone-600">
              Thoughtful prompts help stories emerge naturally, one memory at a time.
            </p>
          </div>

          <div class="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
            <h3 class="text-xl font-semibold text-stone-900">Made to become a keepsake</h3>
            <p class="mt-3 leading-6 text-stone-600">
              The experience is designed around the final emotional outcome, not just the writing process.
            </p>
          </div>

          <div class="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
            <h3 class="text-xl font-semibold text-stone-900">Personal and lasting</h3>
            <p class="mt-3 leading-6 text-stone-600">
              What you create can become something to keep, revisit, and share with future generations.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Final CTA -->
    <section class="border-t border-stone-200 bg-white">
      <div class="mx-auto max-w-4xl px-6 py-20 text-center">
        <p class="text-sm font-medium uppercase tracking-[0.25em] text-stone-500">
          Start today
        </p>
        <h2 class="mt-4 text-3xl font-bold md:text-4xl">
          Start preserving a story that matters
        </h2>
        <p class="mt-4 text-lg leading-7 text-stone-600">
          Begin for free, write at your own pace, and turn memories into something worth keeping.
        </p>

        <div class="mt-8 flex flex-wrap justify-center gap-4">
          <router-link
            to="/register"
            @click="trackStart"
            class="rounded-full bg-[#7C5C3B] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Get started free
          </router-link>

          <router-link
            to="/login"
            @click="trackHeroLogin"
            class="rounded-full border border-stone-300 bg-white px-6 py-3 text-sm font-semibold text-stone-900 transition hover:bg-stone-100"
          >
            Login
          </router-link>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { track } from '../lib/analytics'
import { useSeo } from '../composables/useSeo'

useSeo({
  title: 'Tell Me Your Story | Preserve the stories you never want to lose',
  description:
    'Answer thoughtful questions and turn memories into a beautifully written keepsake you can save, print, and share.',
})

const storyTypes = [
  {
    title: "Mum's Story",
    label: 'Most meaningful',
    description: 'A keepsake filled with love, memories, and the moments that shaped her life.',
  },
  {
    title: "Dad's Story",
    label: '',
    description: 'Capture his stories, lessons, humour, and the memories you’ll always want to keep.',
  },
  {
    title: "Grandma's Story",
    label: '',
    description: 'Preserve family traditions, stories, and the memories passed down through generations.',
  },
  {
    title: "Grandad's Story",
    label: '',
    description: 'Keep his experiences, stories, and life lessons alive for future generations.',
  },
  {
    title: 'Life Story',
    label: 'Full life story',
    description: 'Tell the full story of a life — from early memories to defining moments and reflections.',
  },
  {
    title: 'Couple Story',
    label: 'Perfect gift',
    description: 'Capture how your story began and the life you built together over the years.',
  },
]

function trackStart() {
  track('upgrade_clicked', {
    source: 'homepage',
  })
}

function trackHeroLogin() {
  track('upgrade_clicked', {
    source: 'home_hero_login',
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