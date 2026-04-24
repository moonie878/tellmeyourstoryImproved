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
          <input
            v-model="email"
            type="email"
            required
            class="mt-1 w-full rounded-xl border border-stone-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-stone-900"
          />
        </div>

        <div>
          <label class="text-sm font-medium">Password</label>
          <input
            v-model="password"
            type="password"
            required
            class="mt-1 w-full rounded-xl border border-stone-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-stone-900"
          />
        </div>

        <div class="text-right">
          <router-link
            to="/forgot-password"
            class="text-sm font-medium text-stone-700 hover:text-stone-900"
          >
            Forgot password?
          </router-link>
        </div>

        <TurnstileWidget v-model="turnstileToken" />

        <p v-if="turnstileError" class="mt-2 text-sm text-red-600">
          {{ turnstileError }}
        </p>

        <button
          type="submit"
          :disabled="loading"
          class="w-full rounded-full bg-[#7C5C3B] hover:opacity-90 transition px-4 py-2 font-semibold text-white disabled:opacity-60"
        >
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>
      </form>

      <!-- Loading state messages -->
      <Transition name="fade">
        <div v-if="loading" class="mt-4 text-center">
          <p v-if="!slowConnection" class="text-sm text-stone-500">
            Signing you in...
          </p>
          <div v-else class="rounded-2xl border border-stone-100 bg-stone-50 px-4 py-3">
            <p class="text-sm text-stone-600">
              Almost there — just waking up the server for you.
            </p>
            <p class="mt-1 text-xs text-stone-400">
              This can take a few seconds on first login. It won't happen again.
            </p>
          </div>
        </div>
      </Transition>

      <p v-if="errorMessage" class="mt-4 text-center text-sm text-red-600">
        {{ errorMessage }}
      </p>

      <p class="mt-6 text-center text-sm text-stone-600">
        Don't have an account?
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
import { track } from '../lib/analytics'
import { posthog } from '../lib/posthog'

const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')
const router = useRouter()
const turnstileToken = ref('')
const turnstileError = ref('')
const slowConnection = ref(false)

let slowTimer: ReturnType<typeof setTimeout> | null = null

async function handleLogin() {
  loading.value = true
  errorMessage.value = ''
  turnstileError.value = ''
  slowConnection.value = false

  // After 3 seconds show the reassuring slow connection message
  slowTimer = setTimeout(() => {
    slowConnection.value = true
  }, 3000)

  try {
    const isHuman = await verifyTurnstile(turnstileToken.value)

    if (!isHuman) {
      turnstileError.value = 'Please complete the verification and try again.'
      loading.value = false
      clearSlowTimer()
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
      turnstileToken.value = ''

      track('login_completed', { source: 'login_page' })

      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        posthog.identify(user.id, { email: user.email })
      }

      router.push('/dashboard')
    }
  } catch (err) {
    errorMessage.value = 'Something went wrong. Please try again.'
    console.error(err)
  } finally {
    loading.value = false
    clearSlowTimer()
  }
}

function clearSlowTimer() {
  if (slowTimer) {
    clearTimeout(slowTimer)
    slowTimer = null
  }
  slowConnection.value = false
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>