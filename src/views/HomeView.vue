<template>
    <main class="bg-stone-50 text-stone-900">
        <section class="mx-auto max-w-6xl px-6 py-24 md:py-32">
            <div class="grid items-center gap-12 md:grid-cols-2">
                <div>
                    <p class="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-stone-500">
                        Preserve precious memories
                    </p>

                    <h1 class="text-4xl font-bold leading-tight text-stone-900 md:text-6xl">
  Turn life stories into something worth keeping
</h1>

<p class="mt-4 text-lg text-stone-600 max-w-xl">
  Answer thoughtful questions and transform memories into a beautifully finished keepsake you can save, print, and share.
</p>
<p class="mt-3 text-sm text-stone-500">
  A meaningful gift for parents, grandparents, or loved ones.
</p>

                    <div class="mt-8 flex flex-wrap justify-center gap-4 md:justify-start">
                        <router-link to="/register" @click="trackStart"
                                     class=" bg-[#7C5C3B] text-white rounded-full px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 transition transform hover:scale-[1.02] active:scale-[0.98]">
                            Get started free
                        </router-link>

                        <router-link to="/login" @click="trackHeroLogin"
                                     class=" bg-[#7C5C3B] text-white rounded-full border border-stone-300 px-6 py-3 text-sm font-semibold transition hover:opacity-90 transition transform hover:scale-[1.02] active:scale-[0.98]">
                            Login
                        </router-link>
                    </div>
                </div>

                <div class="rounded-3xl border border-stone-200 bg-white p-8 shadow-sm">
                    <div class="space-y-4">
                        <div class="rounded-2xl bg-stone-100 p-4">
                            <p class="text-sm text-stone-500">Chapter 1</p>
                            <h3 class="mt-1 text-lg font-semibold">Early Life</h3>
                            <p class="mt-2 text-stone-600">
                                Where were you born, and what do you know about your early years?
                            </p>
                        </div>

                        <div class="rounded-2xl bg-stone-100 p-4">
                            <p class="text-sm text-stone-500">Chapter 4</p>
                            <h3 class="mt-1 text-lg font-semibold">School Days</h3>
                            <p class="mt-2 text-stone-600">
                                What are your strongest memories from school?
                            </p>
                        </div>

                        <div class="rounded-2xl bg-stone-100 p-4">
                            <p class="text-sm text-stone-500">Chapter 9</p>
                            <h3 class="mt-1 text-lg font-semibold">Life Lessons</h3>
                            <p class="mt-2 text-stone-600">
                                What advice would you want future generations to remember?
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
<section class="bg-stone-50">
  <div class="mx-auto max-w-6xl px-6 pb-20">
    <div class="grid gap-6 md:grid-cols-3">
      <div>
        <h3 class="text-lg font-semibold text-stone-900">
          Capture meaningful memories
        </h3>
        <p class="mt-2 text-sm text-stone-600">
          Guided questions help you tell stories you might otherwise forget.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-stone-900">
          Build something personal
        </h3>
        <p class="mt-2 text-sm text-stone-600">
          Each answer becomes part of a story that reflects a real life.
        </p>
      </div>

      <div>
        <h3 class="text-lg font-semibold text-stone-900">
          Turn it into a keepsake
        </h3>
        <p class="mt-2 text-sm text-stone-600">
          Export a beautifully designed version to keep, print, or gift.
        </p>
      </div>
    </div>
  </div>
</section>
        <section class="border-t border-stone-200 bg-white">
            <div class="mx-auto max-w-6xl px-6 py-20">
                <div class="max-w-2xl">
                    <p class="text-sm font-medium uppercase tracking-[0.25em] text-stone-500">
                        How it works
                    </p>
                    <h2 class="mt-4 text-3xl font-bold md:text-4xl">
                        Everything needed to turn memories into a keepsake.
                    </h2>
                    <p class="mt-4 text-lg text-stone-600">
                        Guide a loved one through thoughtful prompts, save their story over time,
                        and turn it into a beautiful finished document.
                    </p>
                </div>

                <div class="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                    <div class="rounded-3xl border border-stone-200 bg-stone-50 p-6">
                        <h3 class="text-xl font-semibold">Guided questions</h3>
                        <p class="mt-3 text-stone-600">
                            Help users answer meaningful prompts across 100 story sections.
                        </p>
                    </div>

                    <div class="rounded-3xl border border-stone-200 bg-stone-50 p-6">
                        <h3 class="text-xl font-semibold">Save progress</h3>
                        <p class="mt-3 text-stone-600">
                            Stories can be completed slowly over time without losing anything.
                        </p>
                    </div>

                    <div class="rounded-3xl border border-stone-200 bg-stone-50 p-6">
                        <h3 class="text-xl font-semibold">Add photos</h3>
                        <p class="mt-3 text-stone-600">
                            Upload treasured images to make each story even more personal.
                        </p>
                    </div>

                    <div class="rounded-3xl border border-stone-200 bg-stone-50 p-6">
                        <h3 class="text-xl font-semibold">Export beautifully</h3>
                        <p class="mt-3 text-stone-600">
  Turn the finished story into a polished keepsake that feels more special than a simple document.
</p>
                    </div>
                </div>
            </div>
        </section>
        <section class="border-t border-stone-200 bg-white">
  <div class="mx-auto max-w-6xl px-6 py-20">
    <div class="max-w-2xl">
      <p class="text-sm font-medium uppercase tracking-[0.25em] text-stone-500">
        Who it’s for
      </p>
      <h2 class="mt-4 text-3xl font-bold md:text-4xl">
        Made for families who want to keep stories, not lose them
      </h2>
      <p class="mt-4 text-lg text-stone-600">
        Tell Me Your Story is designed for people who want to capture memories slowly, thoughtfully, and turn them into something lasting.
      </p>
    </div>

    <div class="mt-12 grid gap-6 md:grid-cols-3">
      <div class="rounded-3xl border border-stone-200 bg-stone-50 p-6">
        <h3 class="text-xl font-semibold text-stone-900">For daughters and sons</h3>
        <p class="mt-3 text-stone-600">
          Ask thoughtful questions and preserve the stories of a parent while you still can.
        </p>
      </div>

      <div class="rounded-3xl border border-stone-200 bg-stone-50 p-6">
        <h3 class="text-xl font-semibold text-stone-900">For meaningful gifts</h3>
        <p class="mt-3 text-stone-600">
          Create something personal and heartfelt that feels far more special than a generic present.
        </p>
      </div>

      <div class="rounded-3xl border border-stone-200 bg-stone-50 p-6">
        <h3 class="text-xl font-semibold text-stone-900">For memory keeping</h3>
        <p class="mt-3 text-stone-600">
          Turn everyday memories, milestones, and life lessons into something you can revisit for years.
        </p>
      </div>
    </div>
  </div>
</section>
<section class="border-t border-stone-200 bg-stone-50">
  <div class="mx-auto max-w-6xl px-6 py-12">
    <div class="grid gap-6 md:grid-cols-3">
      <div>
        <p class="text-sm font-semibold text-stone-900">Start for free</p>
        <p class="mt-2 text-sm text-stone-600">
          Begin writing before deciding whether to upgrade.
        </p>
      </div>

      <div>
        <p class="text-sm font-semibold text-stone-900">Save as you go</p>
        <p class="mt-2 text-sm text-stone-600">
          Stories can be completed slowly over time without losing progress.
        </p>
      </div>

      <div>
        <p class="text-sm font-semibold text-stone-900">Upgrade when ready</p>
        <p class="mt-2 text-sm text-stone-600">
          Premium is there when you want a more beautifully finished keepsake.
        </p>
      </div>
    </div>
  </div>
</section>
        <section class="border-t border-stone-200 bg-stone-50">
            <div class="mx-auto max-w-6xl px-6 py-20">
                <div class="text-center">
                    <p class="text-sm font-medium uppercase tracking-[0.25em] text-stone-500">
                        Pricing
                    </p>
                    <h2 class="mt-4 text-3xl font-bold md:text-4xl">
                        Simple, meaningful pricing
                    </h2>
                    <p class="mt-4 text-lg text-stone-600">
  Start for free, then upgrade when you’re ready to turn memories into a finished keepsake.
</p>

                </div>

                <div class="mt-12 grid gap-6 md:grid-cols-3">
                    <!-- Free -->
                    <div class="flex h-full flex-col rounded-3xl border border-stone-200 bg-white p-8">
                        <h3 class="text-xl font-semibold">Free</h3>
                        <p class="mt-2 text-stone-600">Start capturing memories</p>

                        <p class="mt-6 text-3xl font-bold">£0</p>
                        <p class="mt-2 text-sm text-stone-500">
  Best for trying the experience before committing.
</p>
                        <ul class="mt-6 space-y-2 text-sm text-stone-600">
                            <li>✔ Start a story</li>
                            <li>✔ Save progress</li>
                            <li>✔ Preview content</li>
                            <li>✖ No downloads</li>
                        </ul>

                        <router-link to="/register" @click="trackPricingFree"
                                     class="mt-auto inline-block w-full rounded-full bg-[#7C5C3B] px-4 py-2 text-center text-white transition transform hover:scale-[1.02] active:scale-[0.98]">
                           Start for free
                        </router-link>
                    </div>

                    <!-- Single -->
                    <div class="flex h-full flex-col rounded-3xl border-2 border-stone-900 bg-white p-8">
                        <h3 class="text-xl font-semibold">Single Story</h3>
                        <p class="mt-2 text-stone-600">For one meaningful story</p>

                        <p class="mt-6 text-3xl font-bold">£3.99</p>
                        <p class="mt-2 text-sm text-stone-500">
  Best for turning one story into a finished keepsake.
</p>
                        <ul class="mt-6 space-y-2 text-sm text-stone-600">
                            <li>✔ Full story access</li>
                            <li>✔ 100 guided sections</li>
                            <li>✔ Export available</li>
                        </ul>

                        <button @click="trackPricingSingle" class="cursor-pointer mt-auto w-full rounded-full bg-[#7C5C3B] px-4 py-2 text-white transition transform hover:scale-[1.02] active:scale-[0.98]">
                            Create my story
                        </button>
                    </div>

                    <!-- All -->
                    <div class="relative flex h-full flex-col rounded-3xl border border-stone-200 bg-white p-8">
                        <h3 class="text-xl font-semibold">All Stories</h3>
                        <p class="mt-2 text-stone-600">For multiple keepsakes</p>

                        <p class="mt-6 text-3xl font-bold">£11.99</p>
                        <p class="mt-2 text-sm text-stone-500">
  Best for families creating multiple memory books.
</p>
                        <ul class="mt-6 space-y-2 text-sm text-stone-600">
                            <li>✔ All story types</li>
                            <li>✔ Future templates</li>
                            <li>✔ Export included</li>
                        </ul>

                        <button @click="trackPricingAll" class="cursor-pointer mt-auto w-full rounded-full bg-[#7C5C3B] px-4 py-2 text-white transition transform hover:scale-[1.02] active:scale-[0.98]">
                            Create more stories
                        </button>
                    </div>
                </div>
            </div>
        </section>
        <section class="border-t border-stone-200 bg-white">
  <div class="mx-auto max-w-6xl px-6 py-20">
    <div class="max-w-2xl">
      <p class="text-sm font-medium uppercase tracking-[0.25em] text-stone-500">
        Why it feels different
      </p>
      <h2 class="mt-4 text-3xl font-bold md:text-4xl">
        More thoughtful than a form. More personal than a document.
      </h2>
      <p class="mt-4 text-lg text-stone-600">
        Tell Me Your Story is built to help families preserve memories with more care, more beauty, and more meaning.
      </p>
    </div>

    <div class="mt-12 grid gap-6 md:grid-cols-3">
      <div class="rounded-3xl border border-stone-200 bg-stone-50 p-6">
        <h3 class="text-xl font-semibold text-stone-900">Guided, not overwhelming</h3>
        <p class="mt-3 text-stone-600">
          Thoughtful prompts help stories emerge naturally, one memory at a time.
        </p>
      </div>

      <div class="rounded-3xl border border-stone-200 bg-stone-50 p-6">
        <h3 class="text-xl font-semibold text-stone-900">Made to become a keepsake</h3>
        <p class="mt-3 text-stone-600">
          The experience is designed around the final emotional outcome, not just the writing process.
        </p>
      </div>

      <div class="rounded-3xl border border-stone-200 bg-stone-50 p-6">
        <h3 class="text-xl font-semibold text-stone-900">Personal and lasting</h3>
        <p class="mt-3 text-stone-600">
          What you create can become something to keep, revisit, and share with future generations.
        </p>
      </div>
    </div>
  </div>
</section>
    </main>
</template>

<script setup lang="ts">
import { track } from '../lib/analytics'
import { useSeo } from '../composables/useSeo'

useSeo({
  title: 'Tell Me Your Story | Turn life stories into something worth keeping',
  description: 'Answer meaningful questions and transform memories into a beautifully finished keepsake you can save, print, and share.',
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