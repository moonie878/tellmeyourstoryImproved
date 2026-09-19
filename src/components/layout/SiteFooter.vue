<template>
  <footer class="mt-16 border-t border-stone-200 bg-white">
    <div class="mx-auto max-w-6xl px-6 py-12">

      <!-- Brand + link columns -->
      <div class="grid gap-10 lg:grid-cols-[1.2fr_repeat(5,1fr)]">
        <div>
          <router-link to="/" aria-label="Tell Me Your Story home">
            <img
              src="/logo/logo-full.png"
              alt="Tell Me Your Story"
              class="h-16 max-w-[180px] object-contain transition hover:opacity-90"
              loading="lazy"
            />
          </router-link>
          <p class="mt-3 max-w-xs text-sm leading-6 text-stone-600">
            Their stories, in their own voice. Built in Southampton.
          </p>
          <router-link
            to="/register"
            class="mt-4 inline-block rounded-full bg-[#7C5C3B] px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
          >
            Try 5 questions free
          </router-link>
        </div>

        <nav
          v-for="column in columns"
          :key="column.title"
          :aria-label="column.title"
          class="text-sm"
        >
          <h2 class="text-xs font-semibold uppercase tracking-[0.15em] text-stone-400">{{ column.title }}</h2>
          <ul class="mt-4 space-y-2.5">
            <li v-for="link in column.links" :key="link.to">
              <router-link :to="link.to" class="text-stone-600 transition hover:text-stone-900">
                {{ link.label }}
              </router-link>
            </li>
          </ul>
        </nav>
      </div>

      <!-- Bottom bar -->
      <div class="mt-12 flex flex-col gap-4 border-t border-stone-200 pt-6 text-sm text-stone-500 md:flex-row md:items-center md:justify-between">
        <div class="flex flex-wrap items-center gap-x-5 gap-y-2">
          <span>© {{ year }} Tell Me Your Story</span>
          <router-link to="/privacy" class="hover:text-stone-900">Privacy</router-link>
          <router-link to="/terms" class="hover:text-stone-900">Terms</router-link>
          <router-link to="/cookies" class="hover:text-stone-900">Cookies</router-link>
          <button type="button" class="hover:text-stone-900" @click="openCookieSettings">
            Cookie settings
          </button>
        </div>

        <div class="flex flex-wrap items-center gap-x-5 gap-y-2">
          <a
            v-for="social in socials"
            :key="social.href"
            :href="social.href"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-stone-900"
          >
            {{ social.label }}
          </a>
        </div>
      </div>

    </div>
  </footer>
</template>

<script setup lang="ts">
import { openCookieSettings } from '../../lib/consent'

const year = new Date().getFullYear()

// Every link here is a real route — keep in sync with src/router/index.ts.
const columns = [
  {
    title: 'Tell Me Your Story',
    links: [
      { to: '/example', label: 'See an example' },
      { to: '/pricing', label: 'Pricing' },
      { to: '/gift', label: 'Give as a gift' },
      { to: '/tribute', label: 'Tribute video' },
      { to: '/my-story', label: 'Our story' },
      { to: '/help', label: 'Help & guides' },
      { to: '/contact', label: 'Contact' },
    ],
  },
  {
    title: 'Guides',
    links: [
      { to: '/blog/questions-to-ask-your-parents', label: 'Questions to ask your parents' },
      { to: '/life-story-questions', label: 'Life story questions' },
      { to: '/how-to-record-grandparents-story', label: "Record a grandparent's story" },
      { to: '/how-to-write-a-life-story', label: 'How to write a life story' },
      { to: '/legacy-letter-to-children', label: 'Writing a legacy letter' },
      { to: '/resources/50-questions-printable', label: 'Free 50-question printable' },
      { to: '/guides', label: 'All guides →' },
    ],
  },
  {
    title: 'Gift ideas',
    links: [
      { to: '/christmas-gifts-for-grandparents', label: 'Christmas gifts for grandparents' },
      { to: '/meaningful-christmas-gifts', label: 'Meaningful Christmas gifts' },
      { to: '/mothers-day-gift-ideas', label: "Mother's Day gifts" },
      { to: '/70th-birthday-gift-ideas', label: '70th birthday gifts' },
      { to: '/gifts-for-parents-who-have-everything', label: 'For parents who have everything' },
      { to: '/bereavement-gift-ideas', label: 'Bereavement gifts' },
    ],
  },
  {
    title: 'Compare',
    links: [
      { to: '/best-memory-book-apps-uk', label: 'Best memory book apps (UK)' },
      { to: '/storyworth-alternative', label: 'Storyworth alternative' },
      { to: '/storykeeper-vs-storyworth', label: 'StoryKeeper vs Storyworth' },
      { to: '/remento-alternative', label: 'Remento alternative' },
      { to: '/storyworth-vs-remento', label: 'Storyworth vs Remento' },
      { to: '/tell-me-your-story-journal-alternative', label: '"Tell Me Your Story" journals' },
    ],
  },
  {
    title: 'Care & later life',
    links: [
      { to: '/life-story-work-in-care-homes', label: 'Life story work in care homes' },
      { to: '/dementia-life-story-book', label: 'Dementia life story book' },
      { to: '/reminiscence-therapy-life-story', label: 'Reminiscence therapy' },
      { to: '/end-of-life-gift', label: 'End of life gifts' },
      { to: '/end-of-life-questions-to-ask-parents', label: 'End of life questions' },
    ],
  },
]

const socials = [
  { href: 'https://www.tiktok.com/@tellmeyourstoryuk', label: 'TikTok' },
  { href: 'https://www.instagram.com/tellemyourstory_uk/', label: 'Instagram' },
  { href: 'https://www.facebook.com/profile.php?id=61563166074344', label: 'Facebook' },
  { href: 'https://uk.trustpilot.com/review/tellmeyourstory.uk', label: 'Trustpilot' },
]
</script>