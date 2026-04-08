<template>
    <div class="min-h-screen flex items-center justify-center bg-stone-50 px-6">
        <div class="w-full max-w-md rounded-3xl border border-stone-200 bg-white p-8 shadow-sm">
            <h1 class="text-2xl font-semibold text-center">Welcome back</h1>
            <p class="mt-2 text-center text-sm text-stone-600">
                Login to continue your story
            </p>

            <form class="mt-6 space-y-4" @submit.prevent="handleLogin">
                <div>
                    <label class="text-sm font-medium">Email</label>
                    <input v-model="email"
                           type="email"
                           required
                           class="mt-1 w-full rounded-xl border border-stone-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-stone-900" />
                </div>

                <div>
                    <label class="text-sm font-medium">Password</label>
                    <input v-model="password"
                           type="password"
                           required
                           class="mt-1 w-full rounded-xl border border-stone-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-stone-900" />
                </div>
                <TurnstileWidget v-model="turnstileToken" />

<p v-if="turnstileError" class="mt-2 text-sm text-red-600">
  {{ turnstileError }}
</p>
                <button type="submit"
                        :disabled="loading"
                        class="w-full rounded-full bg-[#7C5C3B] hover:opacity-90 transition px-4 py-2 font-semibold text-white hover:opacity-90 disabled:opacity-60">
                    {{ loading ? 'Logging in...' : 'Login' }}
                </button>
            </form>

            <p v-if="errorMessage" class="mt-4 text-center text-sm text-red-600">
                {{ errorMessage }}
            </p>

            <p class="mt-6 text-center text-sm text-stone-600">
                Don’t have an account?
                <router-link to="/register" class="font-medium text-stone-900">
                    Register
                </router-link>
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    import { supabase } from '../lib/supabase'
    import { useRouter } from 'vue-router'
    import TurnstileWidget from '../components/legal/TurnstileWidget.vue'
import { verifyTurnstile } from '../lib/turnstile'

    const email = ref('')
    const password = ref('')
    const loading = ref(false)
    const errorMessage = ref('')
    const router = useRouter()

    const turnstileToken = ref('')
const turnstileError = ref('')

    async function handleLogin() {
    loading.value = true
    errorMessage.value = ''

turnstileError.value = ''

const isHuman = await verifyTurnstile(turnstileToken.value)

if (!isHuman) {
  turnstileError.value = 'Please complete the verification and try again.'
  return
}

    const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
    })

      if (error) {
    errorMessage.value = error.message
  } else {
    email.value = ''
    password.value = ''
    router.push('/dashboard')
  }

    loading.value = false
    }
</script>