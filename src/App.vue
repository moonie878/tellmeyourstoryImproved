<template>
  <div class="min-h-screen bg-stone-50 text-stone-900">
    <header class="sticky top-0 z-40 border-b border-stone-200 bg-stone-50/90 backdrop-blur">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <router-link
          to="/"
          class="shrink-0"
          @click="mobileMenuOpen = false"
        >
          <img
            src="/logo/logo-full-new.png"
            alt="Tell Me Your Story"
            class="h-10 w-auto object-contain transition hover:opacity-90 md:h-12"
          />
        </router-link>

        <!-- Desktop nav -->
        <nav class="hidden items-center gap-6 text-sm font-medium md:flex">
          <template v-if="user">
            <router-link to="/dashboard" class="text-stone-600 transition hover:text-stone-900">
              Dashboard
            </router-link>

            <router-link to="/contact" class="text-stone-600 transition hover:text-stone-900">
              Contact
            </router-link>

            <button
              @click="handleLogout"
              class="rounded-full border border-stone-300 bg-white px-4 py-2 text-stone-900 transition hover:bg-stone-100"
            >
              Logout
            </button>
          </template>

          <template v-else>
            <router-link to="/example" class="text-stone-600 transition hover:text-stone-900">
              Example story
            </router-link>

            <a href="/#pricing" class="text-stone-600 transition hover:text-stone-900">
              Pricing
            </a>

            <router-link to="/contact" class="text-stone-600 transition hover:text-stone-900">
              Contact
            </router-link>

            <router-link to="/login" class="text-stone-600 transition hover:text-stone-900">
              Login
            </router-link>

            <router-link
              to="/register"
              class="rounded-full bg-stone-900 px-4 py-2 text-white transition hover:opacity-90"
            >
              Get started free
            </router-link>
          </template>
        </nav>

        <!-- Mobile burger -->
        <button
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="flex h-11 w-11 items-center justify-center rounded-full border border-stone-300 bg-white md:hidden"
          :aria-label="mobileMenuOpen ? 'Close menu' : 'Open menu'"
          :aria-expanded="mobileMenuOpen"
        >
          <svg
            v-if="!mobileMenuOpen"
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-stone-900"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1.8"
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
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 6l12 12M18 6l-12 12" />
          </svg>
        </button>
      </div>

      <!-- Mobile menu -->
      <div
        v-if="mobileMenuOpen"
        class="border-t border-stone-200 bg-white px-4 pb-5 pt-4 shadow-sm md:hidden"
      >
        <nav class="flex flex-col gap-2 text-sm font-medium">
          <template v-if="user">
            <router-link
              to="/dashboard"
              class="rounded-2xl px-4 py-3 text-stone-700 transition hover:bg-stone-100"
              @click="mobileMenuOpen = false"
            >
              Dashboard
            </router-link>

            <router-link
              to="/contact"
              class="rounded-2xl px-4 py-3 text-stone-700 transition hover:bg-stone-100"
              @click="mobileMenuOpen = false"
            >
              Contact
            </router-link>

            <button
              @click="handleMobileLogout"
              class="mt-2 rounded-2xl border border-stone-300 bg-white px-4 py-3 text-left text-stone-900 transition hover:bg-stone-100"
            >
              Logout
            </button>
          </template>

          <template v-else>
            <router-link
              to="/example"
              class="rounded-2xl px-4 py-3 text-stone-700 transition hover:bg-stone-100"
              @click="mobileMenuOpen = false"
            >
              Example story
            </router-link>

            <router-link :to="{ path: '/', hash: '#pricing' }">
              Pricing
            </router-link>

            <router-link
              to="/contact"
              class="rounded-2xl px-4 py-3 text-stone-700 transition hover:bg-stone-100"
              @click="mobileMenuOpen = false"
            >
              Contact
            </router-link>

            <router-link
              to="/login"
              class="rounded-2xl px-4 py-3 text-stone-700 transition hover:bg-stone-100"
              @click="mobileMenuOpen = false"
            >
              Login
            </router-link>

            <router-link
              to="/register"
              class="mt-2 rounded-2xl bg-stone-900 px-4 py-3 text-center text-white transition hover:opacity-90"
              @click="mobileMenuOpen = false"
            >
              Get started free
            </router-link>
          </template>
        </nav>
      </div>
    </header>

    <router-view />
    <SiteFooter />
    <CookieBanner />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from './lib/supabase'
import { useRouter } from 'vue-router'
import SiteFooter from './components/layout/SiteFooter.vue'
import CookieBanner from './components/legal/CookieBanner.vue'

const router = useRouter()
const user = ref<any>(null)
const mobileMenuOpen = ref(false)

async function getUser() {
  const {
    data: { user: currentUser },
  } = await supabase.auth.getUser()

  user.value = currentUser
}

async function handleLogout() {
  await supabase.auth.signOut()
  user.value = null
  mobileMenuOpen.value = false
  router.push('/login')
}

async function handleMobileLogout() {
  mobileMenuOpen.value = false
  await handleLogout()
}

onMounted(() => {
  getUser()

  supabase.auth.onAuthStateChange((_event, session) => {
    user.value = session?.user || null
  })
})
</script>