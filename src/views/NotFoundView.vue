<template>
  <main class="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-5 py-20 text-center">
    <h1 class="font-display text-4xl font-bold text-stone-900" style="font-family: 'Playfair Display', Georgia, serif">
      This page has gone missing
    </h1>
    <p class="mt-4 text-lg leading-relaxed text-stone-600">
      The link may be old or mistyped. The stories are all still safe.
    </p>
    <div class="mt-8 flex flex-col gap-3 sm:flex-row">
      <router-link
        to="/"
        class="rounded-full bg-stone-900 px-6 py-3 text-white transition hover:opacity-90"
      >
        Go to the homepage
      </router-link>
      <router-link
        to="/help"
        class="rounded-full border border-stone-300 bg-white px-6 py-3 text-stone-900 transition hover:bg-stone-100"
      >
        Help &amp; guides
      </router-link>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useSeo } from '../composables/useSeo'

useSeo({
  title: 'Page not found | Tell Me Your Story',
  description: 'This page could not be found.',
  noindex: true,
})
</script>