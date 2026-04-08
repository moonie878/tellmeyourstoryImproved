<template>
  <div class="min-h-screen bg-stone-50 text-stone-900">
    <header class="sticky top-0 z-40 border-b border-stone-200/80 bg-stone-50/90 backdrop-blur">
      <div class="mx-auto max-w-6xl px-6 py-4">
        <div
          class="flex flex-col gap-4 rounded-full border border-stone-200/80 bg-white/80 px-5 py-3 shadow-sm md:flex-row md:items-center md:justify-between"
        >
          <router-link to="/" class="shrink-0">
            <img
              src="/logo/logo-full-horizontal.png"
              alt="Tell Me Your Story"
              class="h-10 w-auto object-contain transition hover:opacity-90 md:h-11"
            />
          </router-link>

          <nav class="flex flex-wrap items-center gap-2 md:gap-3 text-sm font-medium">
            <router-link
              to="/"
              class="rounded-full px-4 py-2 text-stone-600 transition hover:bg-stone-100 hover:text-stone-900"
              active-class="bg-stone-100 text-stone-900"
            >
              Home
            </router-link>

            <template v-if="user">
              <router-link
                to="/dashboard"
                class="rounded-full px-4 py-2 text-stone-600 transition hover:bg-stone-100 hover:text-stone-900"
                active-class="bg-stone-100 text-stone-900"
              >
                Dashboard
              </router-link>

              <button
                @click="handleLogout"
                class="rounded-full border border-stone-300 bg-white px-4 py-2 text-stone-900 transition hover:bg-stone-100"
              >
                Logout
              </button>
            </template>

            <template v-else>
              <router-link
                to="/login"
                class="rounded-full px-4 py-2 text-stone-600 transition hover:bg-stone-100 hover:text-stone-900"
                active-class="bg-stone-100 text-stone-900"
              >
                Login
              </router-link>

              <router-link
                to="/register"
                class="rounded-full bg-[#7C5C3B] px-5 py-2 text-white shadow-sm transition hover:opacity-90"
              >
                Get started
              </router-link>
            </template>
          </nav>
        </div>
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

onMounted(() => {
  getUser()

  supabase.auth.onAuthStateChange((_event, session) => {
    user.value = session?.user || null
  })
})
</script>