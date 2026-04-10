<template>
    <div class="min-h-screen flex items-center justify-center bg-stone-50 px-6">
        <div class="w-full max-w-md rounded-3xl border border-stone-200 bg-white p-8 shadow-sm">
            <h1 class="text-2xl font-semibold text-center">Create your account</h1>
            <p class="mt-2 text-center text-stone-600 text-sm">
                Start capturing meaningful memories today
            </p>

            <form class="mt-6 space-y-4" @submit.prevent="handleRegister">
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
                        class="w-full rounded-full bg-[#7C5C3B] hover:opacity-90 transition px-4 py-2 text-white font-semibold hover:opacity-90 disabled:opacity-60">
                    {{ loading ? 'Creating account...' : 'Create account' }}
                </button>
            </form>

            <p v-if="errorMessage" class="mt-4 text-center text-sm text-red-600">
                {{ errorMessage }}
            </p>

            <p class="mt-6 text-center text-sm text-stone-600">
                Already have an account?
                <router-link to="/login" class="font-medium text-stone-900">
                    Login
                </router-link>
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue'
    import { supabase } from '../lib/supabase'
    import TurnstileWidget from '../components/legal/TurnstileWidget.vue'
import { verifyTurnstile } from '../lib/turnstile'
import { track } from '../lib/analytics'

    const email = ref('')
    const password = ref('')
    const loading = ref(false)
    const errorMessage = ref('')

    const turnstileToken = ref('')
const turnstileError = ref('')

    async function handleRegister() {
  loading.value = true
  errorMessage.value = ''
  turnstileError.value = ''

  try {
    const isHuman = await verifyTurnstile(turnstileToken.value)

    if (!isHuman) {
      turnstileError.value = 'Please complete the verification and try again.'
      loading.value = false
      return
    }

    const { error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
    })

    if (error) {
      errorMessage.value = error.message
    } else {
      alert('Check your email to confirm your account!')
      email.value = ''
      password.value = ''
      turnstileToken.value = ''
      track('signup_completed', {
  source: 'register_page',
})
    }
  } catch (err) {
    console.error(err)
    errorMessage.value = 'Something went wrong. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>