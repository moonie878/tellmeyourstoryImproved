<template>
  <main class="bg-[#f7f5f2] text-stone-900">
    <!-- HERO -->
    <section class="px-6 py-20 md:py-24">
      <div class="mx-auto max-w-5xl text-center">
        <p class="text-sm font-medium uppercase tracking-[0.25em] text-stone-500">
          Example story
        </p>

        <h1 class="mt-4 text-4xl font-bold leading-tight md:text-6xl">
          See how a story becomes a keepsake
        </h1>

        <p class="mx-auto mt-6 max-w-3xl text-lg leading-8 text-stone-600">
          This example shows how guided answers, personal photos, and thoughtful design
          come together in a finished book you can keep, print, and share.
        </p>

        <div class="mt-8 flex flex-wrap justify-center gap-4">
          <router-link
            to="/register"
            class="rounded-full bg-[#7C5C3B] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Create your own story
          </router-link>

          <router-link
            to="/"
            class="rounded-full border border-stone-300 bg-white px-6 py-3 text-sm font-semibold text-stone-900 transition hover:bg-stone-100"
          >
            Back to home
          </router-link>
        </div>
      </div>
    </section>

    <!-- STORY INTRO -->
    <section class="border-t border-stone-200 bg-white px-6 py-16">
      <div class="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p class="text-sm font-medium uppercase tracking-[0.25em] text-stone-500">
            Featured keepsake
          </p>

          <h2 class="mt-4 text-3xl font-bold md:text-4xl">
            Mum’s Story
          </h2>

          <p class="mt-5 max-w-2xl text-lg leading-8 text-stone-600">
            A warm, personal example of how everyday memories, childhood moments,
            family stories, and meaningful reflections can be turned into something
            beautiful enough to keep for years.
          </p>

          <div class="mt-8 grid gap-4 sm:grid-cols-3">
            <div class="rounded-2xl border border-stone-200 bg-stone-50 p-4">
              <p class="text-sm font-semibold text-stone-900">Guided answers</p>
              <p class="mt-2 text-sm text-stone-600">
                Thoughtful prompts help shape the story naturally.
              </p>
            </div>

            <div class="rounded-2xl border border-stone-200 bg-stone-50 p-4">
              <p class="text-sm font-semibold text-stone-900">Personal photos</p>
              <p class="mt-2 text-sm text-stone-600">
                Images make the final keepsake feel even more personal.
              </p>
            </div>

            <div class="rounded-2xl border border-stone-200 bg-stone-50 p-4">
              <p class="text-sm font-semibold text-stone-900">Finished layout</p>
              <p class="mt-2 text-sm text-stone-600">
                Beautiful pages designed to feel like a real book.
              </p>
            </div>
          </div>
        </div>

        <div class="flex justify-center md:justify-end">
          <img
            src="/images/example-story/example-hero-book.png"
            alt="Example story book preview"
            class="w-full max-w-md rounded-[2rem] shadow-lg"
          />
        </div>
      </div>
    </section>

    <!-- PAGE PREVIEW GALLERY -->
    <section class="px-6 py-20">
      <div class="mx-auto max-w-6xl">
        <div class="max-w-2xl">
          <p class="text-sm font-medium uppercase tracking-[0.25em] text-stone-500">
            Inside the story
          </p>

          <h2 class="mt-4 text-3xl font-bold md:text-4xl">
            A look inside the finished keepsake
          </h2>

          <p class="mt-4 text-lg text-stone-600">
            From elegant chapter openers and highlighted quotes to personal memories
            and image-led pages.
          </p>
        </div>

        <div class="mt-12 grid gap-6 md:grid-cols-2">
          <div class="rounded-[2rem] border border-stone-200 bg-white p-4 shadow-sm">
            <img
              src="/images/example-story/example-cover.png"
              alt="Example story cover page"
              class="w-full rounded-[1.5rem]"
            />
            <p class="mt-4 text-sm font-semibold text-stone-900">Cover page</p>
            <p class="mt-1 text-sm text-stone-600">
              A polished opening page that makes the story feel gift-worthy from the start.
            </p>
          </div>

          <div class="rounded-[2rem] border border-stone-200 bg-white p-4 shadow-sm">
            <img
              src="/images/example-story/example-chapter.png"
              alt="Example chapter page"
              class="w-full rounded-[1.5rem]"
            />
            <p class="mt-4 text-sm font-semibold text-stone-900">Chapter opener</p>
            <p class="mt-1 text-sm text-stone-600">
              Gentle chapter pages create rhythm and help the story feel structured.
            </p>
          </div>

          <div class="rounded-[2rem] border border-stone-200 bg-white p-4 shadow-sm">
            <img
              src="/images/example-story/example-story-page-one.png"
              alt="Example question and answer page"
              class="w-full rounded-[1.5rem]"
            />
            <p class="mt-4 text-sm font-semibold text-stone-900">Memory pages</p>
            <p class="mt-1 text-sm text-stone-600">
              Guided answers are turned into calm, readable, beautifully laid out pages.
            </p>
          </div>

          <div class="rounded-[2rem] border border-stone-200 bg-white p-4 shadow-sm">
            <img
              src="/images/example-story/example-quote-page.png"
              alt="Example quote page"
              class="w-full rounded-[1.5rem]"
            />
            <p class="mt-4 text-sm font-semibold text-stone-900">Quote highlights</p>
            <p class="mt-1 text-sm text-stone-600">
              Meaningful moments are pulled out and turned into elegant highlight pages.
            </p>
          </div>

          <div class="rounded-[2rem] border border-stone-200 bg-white p-4 shadow-sm">
            <img
              src="/images/example-story/example-photo-page.png"
              alt="Example image page"
              class="w-full rounded-[1.5rem]"
            />
            <p class="mt-4 text-sm font-semibold text-stone-900">Photo-led pages</p>
            <p class="mt-1 text-sm text-stone-600">
              Personal images help the finished keepsake feel even more special.
            </p>
          </div>

          <div class="rounded-[2rem] border border-stone-200 bg-white p-4 shadow-sm">
            <img
              src="/images/example-story/example-closing-page.png"
              alt="Example closing page"
              class="w-full rounded-[1.5rem]"
            />
            <p class="mt-4 text-sm font-semibold text-stone-900">Closing page</p>
            <p class="mt-1 text-sm text-stone-600">
              A gentle ending that makes the whole book feel complete and worth holding onto.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- REASSURANCE -->
    <section class="border-t border-stone-200 bg-white px-6 py-20">
      <div class="mx-auto max-w-4xl text-center">
        <p class="text-sm font-medium uppercase tracking-[0.25em] text-stone-500">
          Your story, your pace
        </p>

        <h2 class="mt-4 text-3xl font-bold md:text-4xl">
          You don’t need to do it all at once
        </h2>

        <p class="mt-6 text-lg leading-8 text-stone-600">
          Start with one memory, one answer, or one photo. Save as you go, come back anytime,
          and slowly build something meaningful over time.
        </p>
      </div>
    </section>

    <!-- FINAL CTA -->
    <section class="border-t border-stone-200 bg-stone-900 px-6 py-20 text-white">
      <div class="mx-auto max-w-3xl text-center">
        <h2 class="text-3xl font-bold md:text-4xl">
          Ready to create one of your own?
        </h2>

        <p class="mt-4 text-lg text-stone-300">
          Start with guided questions and turn memories into something your family can treasure.
        </p>

        <router-link
          to="/register"
          class="mt-8 inline-block rounded-full bg-white px-6 py-3 text-sm font-semibold text-stone-900 transition hover:bg-stone-100"
        >
          Get started free
        </router-link>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { useSeo } from '../composables/useSeo'

useSeo({
  title: 'Example Story | Tell Me Your Story',
  description:
    'See how guided answers, personal photos, and thoughtful design come together in a finished keepsake book.',
})
</script>