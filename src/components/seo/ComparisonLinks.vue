<template>
  <!--
    Related comparisons.

    These 14 pages are the only ones that have ever converted — /storyworth-alternative
    alone brings a quarter of UK search clicks at position 2.8. But several sat with no
    links to each other at all (/best-memory-book-apps-uk and /life-story-journal had
    none), so Google saw a scattering of separate pages rather than one cluster.

    Linking every page to every other is the cheapest way to move the weaker ones up:
    /storykeeper-vs-storyworth has the most impressions of any of them and sits at
    position 6 with no clicks, while the near-identical /storyworth-alternative gets
    20% CTR from position 2.8. The gap is position, and position responds to links.
  -->
  <section class="bg-[#F5F0E8] px-5 py-14 sm:px-8">
    <div class="mx-auto max-w-4xl">
      <h2
        class="text-center text-xl font-bold text-stone-900 sm:text-2xl"
        style="font-family: 'Playfair Display', Georgia, serif"
      >
        Still comparing?
      </h2>
      <p class="mx-auto mt-3 max-w-xl text-center text-sm leading-relaxed text-stone-600">
        Honest comparisons of every memory book service we know of — written for UK families,
        with pricing in pounds.
      </p>

      <div class="mt-9 grid gap-8 sm:grid-cols-2">
        <div v-for="group in visibleGroups" :key="group.title">
          <h3 class="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9C7C5C]">
            {{ group.title }}
          </h3>
          <ul class="mt-3 space-y-2">
            <li v-for="link in group.links" :key="link.to">
              <router-link
                :to="link.to"
                class="text-sm leading-relaxed text-stone-700 underline decoration-stone-300 underline-offset-4 transition hover:text-[#7C5C3B] hover:decoration-[#7C5C3B]"
              >
                {{ link.label }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-10 text-center">
        <router-link
          to="/pricing"
          class="inline-block rounded-full bg-[#7C5C3B] px-7 py-3 text-sm font-medium text-white transition hover:opacity-90"
        >
          See our pricing — try 5 questions free
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

interface Link { to: string; label: string }
interface Group { title: string; links: Link[] }

const GROUPS: Group[] = [
  {
    title: 'Compared with',
    links: [
      { to: '/storyworth-alternative',  label: 'Storyworth alternative for UK families' },
      { to: '/storyworth-review',       label: 'Storyworth review — what it costs in the UK' },
      { to: '/remento-alternative',     label: 'Remento alternative — pay once, not yearly' },
      { to: '/remento-review',          label: 'Remento review' },
      { to: '/storykeeper-alternative', label: 'StoryKeeper alternative' },
      { to: '/storykeeper-review',      label: 'StoryKeeper review' },
      { to: '/tell-me-your-story-journal-alternative', label: 'Better than a fill-in journal?' },
      { to: '/life-story-journal',      label: 'Life story journals compared' },
    ],
  },
  {
    title: 'Side by side',
    links: [
      { to: '/storykeeper-vs-storyworth',     label: 'StoryKeeper vs Storyworth' },
      { to: '/storyworth-vs-remento',         label: 'Storyworth vs Remento' },
      { to: '/storyworth-vs-tellmeyourstory', label: 'Storyworth vs Tell Me Your Story' },
      { to: '/remento-vs-tellmeyourstory',    label: 'Remento vs Tell Me Your Story' },
      { to: '/memory-book-vs-memory-box',     label: 'Memory book vs memory box' },
      { to: '/best-memory-book-apps-uk',      label: 'Best memory book apps in the UK' },
    ],
  },
]

const route = useRoute()

/** Never link a page to itself — an empty group is dropped rather than left bare. */
const visibleGroups = computed(() =>
  GROUPS
    .map((g) => ({ ...g, links: g.links.filter((l) => l.to !== route.path) }))
    .filter((g) => g.links.length > 0),
)
</script>
