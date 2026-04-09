<template>
  <main class="bg-[#f7f5f2] text-stone-900">
    <!-- HERO -->
    <section class="px-6 py-20 md:py-28">
      <div class="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2">
        <div>
          <p class="text-sm font-medium uppercase tracking-[0.25em] text-stone-500">
            Preserve precious memories
          </p>

          <h1 class="mt-4 text-4xl font-bold leading-tight md:text-6xl">
            Turn life stories into a beautiful keepsake
          </h1>

          <p class="mt-6 max-w-xl text-lg leading-8 text-stone-600">
            Capture memories, moments, and life lessons through thoughtful questions, then turn them into a beautifully designed book you can keep, print, and share.
          </p>

          <p class="mt-4 text-sm text-stone-500">
            A meaningful gift for mums, dads, grandparents, and the people you never want to forget.
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
        </div>

        <div class="flex justify-center md:justify-end">
          <img
            src="/images/homepage/hero-keepsake.png"
            alt="Tell Me Your Story keepsake preview"
            class="w-full max-w-2xl"
          />
        </div>
      </div>
    </section>

    <!-- EMOTIONAL TRUST SECTION -->
    <section class="border-t border-stone-200 bg-white px-6 py-20">
      <div class="mx-auto max-w-4xl text-center">
        <p class="text-sm font-medium uppercase tracking-[0.25em] text-stone-500">
          Why it matters
        </p>

        <h2 class="mt-4 text-3xl font-bold md:text-4xl">
          The stories that matter most are often the easiest to lose
        </h2>

        <p class="mt-6 text-lg leading-8 text-stone-600">
          Tell Me Your Story helps you capture a loved one’s memories slowly and meaningfully, then turn them into something beautiful enough to keep for years.
        </p>
      </div>
    </section>

    <!-- PREVIEW GALLERY -->
    <section class="px-6 py-20">
      <div class="mx-auto max-w-6xl">
        <div class="max-w-2xl">
          <p class="text-sm font-medium uppercase tracking-[0.25em] text-stone-500">
            See the finished keepsake
          </p>

          <h2 class="mt-4 text-3xl font-bold md:text-4xl">
            Designed to feel like a real book, not just an export
          </h2>

          <p class="mt-4 text-lg text-stone-600">
            Elegant chapter pages, meaningful quotes, personal photos, and beautifully laid out memories.
          </p>
        </div>

        <div class="mt-12 grid gap-6 md:grid-cols-3">
          <img
            src="/images/homepage/chapter-preview.png"
            alt="Chapter page preview"
            class="w-full rounded-[2rem]"
          />

          <img
            src="/images/homepage/quote-preview.png"
            alt="Quote page preview"
            class="w-full rounded-[2rem]"
          />

          <img
            src="/images/homepage/spread-preview.png"
            alt="Story spread preview"
            class="w-full rounded-[2rem]"
          />
        </div>

        <div class="mt-6 grid gap-6 md:grid-cols-2">
          <img
            src="/images/homepage/detail-preview-one.png"
            alt="Story page preview"
            class="w-full rounded-[2rem]"
          />

          <img
            src="/images/homepage/detail-preview-two.png"
            alt="Story page preview"
            class="w-full rounded-[2rem]"
          />
        </div>
      </div>
    </section>

    <!-- HOW IT WORKS -->
    <section class="border-t border-stone-200 bg-white px-6 py-20">
      <div class="mx-auto max-w-6xl">
        <div class="max-w-2xl">
          <p class="text-sm font-medium uppercase tracking-[0.25em] text-stone-500">
            How it works
          </p>

          <h2 class="mt-4 text-3xl font-bold md:text-4xl">
            A simple way to create something lasting
          </h2>
        </div>

        <div class="mt-12 grid gap-6 md:grid-cols-3">
          <div class="rounded-3xl border border-stone-200 bg-stone-50 p-6">
            <h3 class="text-xl font-semibold">1. Choose a story</h3>
            <p class="mt-3 text-stone-600">
              Start with a Mum, Dad, Grandparent, Life Story, or another meaningful keepsake.
            </p>
          </div>

          <div class="rounded-3xl border border-stone-200 bg-stone-50 p-6">
            <h3 class="text-xl font-semibold">2. Answer thoughtful prompts</h3>
            <p class="mt-3 text-stone-600">
              Capture memories one answer at a time, with automatic saving and optional photo uploads.
            </p>
          </div>

          <div class="rounded-3xl border border-stone-200 bg-stone-50 p-6">
            <h3 class="text-xl font-semibold">3. Export the finished keepsake</h3>
            <p class="mt-3 text-stone-600">
              Turn the story into a beautifully designed PDF or document ready to keep, print, or gift.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- WHO IT'S FOR -->
    <section class="border-t border-stone-200 bg-[#f7f5f2] px-6 py-20">
      <div class="mx-auto max-w-6xl">
        <div class="max-w-2xl">
          <p class="text-sm font-medium uppercase tracking-[0.25em] text-stone-500">
            Who it’s for
          </p>

          <h2 class="mt-4 text-3xl font-bold md:text-4xl">
            Made for families, memory keepers, and meaningful gifts
          </h2>
        </div>

        <div class="mt-12 grid gap-6 md:grid-cols-3">
          <div class="rounded-3xl border border-stone-200 bg-white p-6">
            <h3 class="text-xl font-semibold text-stone-900">For daughters and sons</h3>
            <p class="mt-3 text-stone-600">
              Preserve the story of a parent while there is still time to ask the questions that matter.
            </p>
          </div>

          <div class="rounded-3xl border border-stone-200 bg-white p-6">
            <h3 class="text-xl font-semibold text-stone-900">For meaningful gifts</h3>
            <p class="mt-3 text-stone-600">
              Create something more personal and lasting than a generic present.
            </p>
          </div>

          <div class="rounded-3xl border border-stone-200 bg-white p-6">
            <h3 class="text-xl font-semibold text-stone-900">For family history</h3>
            <p class="mt-3 text-stone-600">
              Capture stories, values, memories, and life lessons that future generations can revisit.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- PRICING -->
    <section class="border-t border-stone-200 bg-white px-6 py-20">
      <div class="mx-auto max-w-6xl">
        <div class="text-center">
          <p class="text-sm font-medium uppercase tracking-[0.25em] text-stone-500">
            Pricing
          </p>

          <h2 class="mt-4 text-3xl font-bold md:text-4xl">
            Start free, upgrade when you’re ready
          </h2>

          <p class="mt-4 text-lg text-stone-600">
            Begin writing for free, then unlock the finished keepsake experience when you want to export.
          </p>
        </div>

        <div class="mt-12 grid gap-6 md:grid-cols-3">
          <div class="flex h-full flex-col rounded-3xl border border-stone-200 bg-stone-50 p-8">
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
              class="mt-auto inline-block w-full rounded-full bg-[#7C5C3B] px-4 py-2 text-center text-white transition hover:opacity-90"
            >
              Start for free
            </router-link>
          </div>

          <div class="flex h-full flex-col rounded-3xl border-2 border-stone-900 bg-white p-8">
            <h3 class="text-xl font-semibold">Single Story</h3>
            <p class="mt-2 text-stone-600">For one meaningful keepsake</p>
            <p class="mt-6 text-3xl font-bold">£3.99</p>
            <ul class="mt-6 space-y-2 text-sm text-stone-600">
              <li>✔ Full story access</li>
              <li>✔ Guided questions</li>
              <li>✔ Export your story</li>
            </ul>

            <button
              @click="trackPricingSingle"
              class="mt-auto w-full rounded-full bg-[#7C5C3B] px-4 py-2 text-white transition hover:opacity-90"
            >
              Create my story
            </button>
          </div>

          <div class="flex h-full flex-col rounded-3xl border border-stone-200 bg-stone-50 p-8">
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
              class="mt-auto w-full rounded-full bg-[#7C5C3B] px-4 py-2 text-white transition hover:opacity-90"
            >
              Create more stories
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- FINAL CTA -->
    <section class="border-t border-stone-200 bg-stone-900 px-6 py-20 text-white">
      <div class="mx-auto max-w-3xl text-center">
        <h2 class="text-3xl font-bold md:text-4xl">
          Start capturing a story worth keeping
        </h2>

        <p class="mt-4 text-lg text-stone-300">
          Create something meaningful for yourself or someone you love.
        </p>

        <router-link
          to="/register"
          @click="trackStart"
          class="mt-8 inline-block rounded-full bg-white px-6 py-3 text-sm font-semibold text-stone-900 transition hover:bg-stone-100"
        >
          Get started free
        </router-link>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { track } from '../lib/analytics'
import { useSeo } from '../composables/useSeo'

useSeo({
  title: 'Tell Me Your Story | Turn life stories into a beautiful keepsake',
  description:
    'Capture memories, moments, and life lessons through thoughtful questions, then turn them into a beautifully designed book you can keep, print, and share.',
})

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