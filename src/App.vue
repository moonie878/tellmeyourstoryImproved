<template>
    <div class="min-h-screen bg-stone-50 text-stone-900">
        <header class="border-b border-stone-200 bg-stone-50/80 backdrop-blur">
            <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

                <router-link to="/" class="shrink-0">
  <img
    src="/logo/logo-full-horizontal.png"
    alt="Tell Me Your Story"
    class="h-10 w-auto object-contain transition hover:opacity-90 md:h-12"
  />
</router-link>

                <nav class="flex items-center gap-6 text-sm font-medium">
                    <router-link to="/" class="text-stone-600 hover:text-stone-900">
                        Home
                    </router-link>

                    <template v-if="user">
                        <router-link to="/dashboard" class="text-stone-600 hover:text-stone-900">
                            Dashboard
                        </router-link>

                        <button @click="handleLogout"
                                class="rounded-full bg-stone-900 px-4 py-2 text-white">
                            Logout
                        </button>
                    </template>

                    <template v-else>
                        <router-link to="/login" class="text-stone-600 hover:text-stone-900">
                            Login
                        </router-link>

                        <router-link to="/register"
                                     class="rounded-full bg-stone-900 px-4 py-2 text-white">
                            Get started
                        </router-link>
                    </template>
                </nav>

            </div>
        </header>

        <router-view />
        <SiteFooter/>
        <CookieBanner/>
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