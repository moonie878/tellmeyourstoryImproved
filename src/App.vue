<template>
  <div class="min-h-screen bg-stone-50 text-stone-900">
    <header class="sticky top-0 z-40 border-b border-stone-200 bg-stone-50/90 backdrop-blur">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <router-link to="/" class="shrink-0" aria-label="Tell Me Your Story home">
          <img
            src="/logo/logo-full-new.png"
            alt="Tell Me Your Story"
            width="180"
            height="48"
            class="h-10 w-auto object-contain transition hover:opacity-90 md:h-12"
          />
        </router-link>

        <!-- Desktop nav -->
        <nav class="hidden items-center gap-6 text-sm font-medium md:flex" aria-label="Main">
          <router-link
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="rounded text-stone-600 transition hover:text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-2"
            active-class="text-stone-900"
          >
            {{ link.label }}
          </router-link>

          <button
            v-if="user"
            type="button"
            class="rounded-full border border-stone-300 bg-white px-4 py-2 text-stone-900 transition hover:bg-stone-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-2"
            @click="handleLogout"
          >
            Logout
          </button>

          <router-link
            v-else
            to="/register"
            class="rounded-full bg-stone-900 px-4 py-2 text-white transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-2"
          >
            Get started free
          </router-link>
        </nav>

        <!-- Mobile: primary CTA stays visible next to the burger -->
        <div class="flex items-center gap-2 md:hidden">
          <router-link
            v-if="!user"
            to="/register"
            class="rounded-full bg-stone-900 px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
          >
            Start free
          </router-link>

          <button
            type="button"
            class="flex h-11 w-11 items-center justify-center rounded-full border border-stone-300 bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900"
            :aria-label="mobileMenuOpen ? 'Close menu' : 'Open menu'"
            :aria-expanded="mobileMenuOpen"
            aria-controls="mobile-menu"
            @click="mobileMenuOpen = !mobileMenuOpen"
          >
            <svg
              v-if="!mobileMenuOpen"
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-stone-900"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1.8"
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-stone-900"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1.8"
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 6l12 12M18 6l-12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile menu -->
      <div
        v-if="mobileMenuOpen"
        id="mobile-menu"
        class="border-t border-stone-200 bg-white px-4 pb-5 pt-4 shadow-sm md:hidden"
      >
        <nav class="flex flex-col gap-1 text-base font-medium" aria-label="Mobile">
          <router-link
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="rounded-2xl px-4 py-3 text-stone-700 transition hover:bg-stone-100"
            active-class="bg-stone-100 text-stone-900"
          >
            {{ link.label }}
          </router-link>

          <button
            v-if="user"
            type="button"
            class="mt-2 rounded-2xl border border-stone-300 bg-white px-4 py-3 text-left text-stone-900 transition hover:bg-stone-100"
            @click="handleLogout"
          >
            Logout
          </button>

          <router-link
            v-else
            to="/register"
            class="mt-2 rounded-2xl bg-stone-900 px-4 py-3 text-center text-white transition hover:opacity-90"
          >
            Get started free
          </router-link>
        </nav>
      </div>
    </header>

    <ChristmasBanner />
    <router-view />
    <SiteFooter />
    <CookieBanner />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import type { User } from '@supabase/supabase-js'
import { supabase } from './lib/supabase'
import { posthog } from './lib/posthog'
import SiteFooter from './components/layout/SiteFooter.vue'
import CookieBanner from './components/legal/CookieBanner.vue'
import ChristmasBanner from './components/christmas/ChristmasDeadlineBanner.vue'

interface NavLink {
  to: string
  label: string
}

const router = useRouter()
const route = useRoute()
const user = ref<User | null>(null)
const mobileMenuOpen = ref(false)

const loggedInLinks: NavLink[] = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/account', label: 'Account' },
  { to: '/gift', label: 'Gift' },
  { to: '/tribute', label: 'Tribute Video' },
  { to: '/my-story', label: 'Our Story' },
  { to: '/help', label: 'Help & Guides' },
  { to: '/contact', label: 'Contact' },
]

const loggedOutLinks: NavLink[] = [
  { to: '/example', label: 'Example story' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/gift', label: 'Gift' },
  { to: '/tribute', label: 'Tribute Video' },
  { to: '/my-story', label: 'Our Story' },
  { to: '/help', label: 'Help & Guides' },
  { to: '/contact', label: 'Contact' },
  { to: '/login', label: 'Login' },
]

const navLinks = computed(() => (user.value ? loggedInLinks : loggedOutLinks))

// Close the mobile menu on any navigation
watch(
  () => route.fullPath,
  () => {
    mobileMenuOpen.value = false
  },
)

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') mobileMenuOpen.value = false
}

function identify(currentUser: User) {
  // Only identify when the ID actually changes (not on every token refresh)
  if (posthog.get_distinct_id?.() === currentUser.id) return
  posthog.identify(currentUser.id, { email: currentUser.email })
}

function registerGoogleContactOnce(currentUser: User) {
  const key = `tmys-contact-registered-${currentUser.id}`
  if (localStorage.getItem(key)) return
  localStorage.setItem(key, '1')

  fetch(`${import.meta.env.VITE_API_BASE_URL}/register-contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: currentUser.email, firstName: '' }),
  }).catch(() => {
    // Non-critical — allow a retry next session
    localStorage.removeItem(key)
  })
}

async function handleLogout() {
  mobileMenuOpen.value = false
  await supabase.auth.signOut()
  // posthog.reset() runs in the SIGNED_OUT handler below
  user.value = null
  router.push('/login')
}

let unsubscribeAuth: (() => void) | null = null

onMounted(() => {
  window.addEventListener('keydown', onKeydown)

  // Fires INITIAL_SESSION immediately, so no separate getUser() call is needed.
  // The callback is deliberately synchronous: awaiting inside it holds the
  // Supabase auth lock and blocks other auth calls.
  const { data } = supabase.auth.onAuthStateChange((event, session) => {
    const currentUser = session?.user ?? null
    user.value = currentUser

    if (currentUser) {
      identify(currentUser)

      if (event === 'SIGNED_IN' && currentUser.app_metadata?.provider === 'google') {
        setTimeout(() => registerGoogleContactOnce(currentUser), 0)
      }
    } else if (event === 'SIGNED_OUT') {
      // Only reset on a real sign-out. Resetting on INITIAL_SESSION would give
      // every anonymous visitor a new PostHog ID on each full page load,
      // breaking UTM attribution and funnels.
      posthog.reset()
    }
  })

  unsubscribeAuth = () => data.subscription.unsubscribe()
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  unsubscribeAuth?.()
})
</script>