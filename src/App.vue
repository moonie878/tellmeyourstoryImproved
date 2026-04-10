<template>
  <div class="min-h-screen bg-stone-50 text-stone-900">
    <header class="sticky top-0 z-40 border-b border-stone-200 bg-stone-50/90 backdrop-blur">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <router-link to="/" class="shrink-0">
          <img
            src="/logo/logo-full.png"
            alt="Tell Me Your Story"
            class="h-10 w-auto object-contain transition hover:opacity-90 md:h-12"
          />
        </router-link>

        <!-- Desktop nav -->
        <nav class="hidden items-center gap-6 text-sm font-medium md:flex">
          <router-link to="/" class="text-stone-600 hover:text-stone-900">
            Home
          </router-link>

           <router-link to="/contact" class="text-stone-600 hover:text-stone-900">
            Contact
          </router-link>

          <template v-if="user">
            <router-link to="/dashboard" class="text-stone-600 hover:text-stone-900">
              Dashboard
            </router-link>

            <button
              @click="handleLogout"
              class="rounded-full bg-stone-900 px-4 py-2 text-white transition hover:opacity-90"
            >
              Logout
            </button>
          </template>

          <template v-else>
            <router-link to="/login" class="text-stone-600 hover:text-stone-900">
              Login
            </router-link>

            <router-link
              to="/register"
              class="rounded-full bg-stone-900 px-4 py-2 text-white transition hover:opacity-90"
            >
              Get started
            </router-link>
          </template>
        </nav>

        <!-- Mobile burger -->
        <button
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="flex h-11 w-11 items-center justify-center rounded-full border border-stone-300 bg-white md:hidden"
          aria-label="Open menu"
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
        class="border-t border-stone-200 bg-white px-6 py-4 md:hidden"
      >
        <nav class="flex flex-col gap-3 text-sm font-medium">
          <router-link
            to="/"
            class="rounded-2xl px-4 py-3 text-stone-700 hover:bg-stone-100"
            @click="mobileMenuOpen = false"
          >
            Home
          </router-link>

          <template v-if="user">
            <router-link
              to="/dashboard"
              class="rounded-2xl px-4 py-3 text-stone-700 hover:bg-stone-100"
              @click="mobileMenuOpen = false"
            >
              Dashboard
            </router-link>

            <button
              @click="handleMobileLogout"
              class="rounded-2xl bg-stone-900 px-4 py-3 text-left text-white"
            >
              Logout
            </button>
          </template>

          <template v-else>
            <router-link
              to="/login"
              class="rounded-2xl px-4 py-3 text-stone-700 hover:bg-stone-100"
              @click="mobileMenuOpen = false"
            >
              Login
            </router-link>

            <router-link
              to="/register"
              class="rounded-2xl bg-stone-900 px-4 py-3 text-white"
              @click="mobileMenuOpen = false"
            >
              Get started
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