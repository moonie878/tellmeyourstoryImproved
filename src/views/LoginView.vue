<template>
  <div class="min-h-screen flex items-center justify-center bg-[#F5F0E8] px-6 py-12">
    <div class="w-full max-w-md">

      <!-- Header -->
      <div class="text-center mb-6">
        <h1 class="font-display text-2xl font-bold text-[#1C1917]">Welcome back</h1>
        <p class="mt-2 text-sm text-[#5C534E]">Continue capturing their story</p>
      </div>

      <!-- Card -->
      <div class="rounded-3xl border border-stone-200 bg-white px-8 py-8 shadow-sm">

        <!-- Google button -->
        <button
          @click="handleGoogleLogin"
          :disabled="googleLoading"
          class="w-full flex items-center justify-center gap-3 rounded-full border border-stone-200 bg-white px-4 py-3 text-sm font-medium text-[#1C1917] transition hover:bg-stone-50 disabled:opacity-60"
        >
          <svg class="h-4 w-4 flex-shrink-0" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          {{ googleLoading ? 'Redirecting...' : 'Continue with Google' }}
        </button>

        <!-- Divider -->
        <div class="my-5 flex items-center gap-3">
          <div class="flex-1 border-t border-stone-200"></div>
          <span class="text-xs text-stone-400">or</span>
          <div class="flex-1 border-t border-stone-200"></div>
        </div>

        <!-- Email/password form -->
        <div class="space-y-4">
          <div>
            <label class="text-sm font-medium text-[#1C1917]">Email</label>
            <input
              v-model="email"
              type="email"
              required
              placeholder="your@email.com"
              class="mt-1 w-full rounded-xl border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#7C5C3B]"
            />
          </div>

          <div>
            <label class="text-sm font-medium text-[#1C1917]">Password</label>
            <input
              v-model="password"
              type="password"
              required
              placeholder="Your password"
              class="mt-1 w-full rounded-xl border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#7C5C3B]"
            />
          </div>

          <div class="text-right">
            <router-link
              to="/forgot-password"
              class="text-sm text-[#7C5C3B] hover:underline"
            >
              Forgot password?
            </router-link>
          </div>

          <!-- Turnstile hidden -->
          <div class="invisible h-0 overflow-hidden">
            <TurnstileWidget v-model="turnstileToken" />
          </div>

          <p v-if="turnstileError" class="text-sm text-red-600">{{ turnstileError }}</p>
          <p v-if="errorMessage" class="text-sm text-red-600">{{ errorMessage }}</p>

          <button
            @click="handleLogin"
            :disabled="loading"
            class="w-full rounded-full bg-[#7C5C3B] px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
          >
            {{ loading ? 'Logging in...' : 'Log in' }}
          </button>

          <!-- Slow connection message -->
          <Transition name="fade">
            <div v-if="loading && slowConnection" class="rounded-2xl border border-stone-100 bg-stone-50 px-4 py-3 text-center">
              <p class="text-sm text-stone-600">Almost there — just waking up the server.</p>
              <p class="mt-1 text-xs text-stone-400">This can take a few seconds on first login. It won't happen again.</p>
            </div>
          </Transition>
        </div>
      </div>

      <p class="mt-5 text-center text-sm text-[#8C847E]">
        Don't have an account?
        <router-link to="/register" class="font-medium text-[#1C1917] hover:underline">Sign up free</router-link>
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
const googleLoading = ref(false)
const errorMessage = ref('')
const router = useRouter()
const turnstileToken = ref('')
const turnstileError = ref('')
const slowConnection = ref(false)

let slowTimer: ReturnType<typeof setTimeout> | null = null

async function handleGoogleLogin() {
  googleLoading.value = true
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: 'https://tellmeyourstory.uk/dashboard',
    },
  })
  if (error) {
    errorMessage.value = error.message
    googleLoading.value = false
  }
}

async function handleLogin() {
  loading.value = true
  errorMessage.value = ''
  turnstileError.value = ''
  slowConnection.value = false

  slowTimer = setTimeout(() => {
    slowConnection.value = true
  }, 3000)

  try {
    const isHuman = await verifyTurnstile(turnstileToken.value)

    if (!isHuman) {
      turnstileError.value = 'Please try again — verification failed.'
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

      const { data: { user } } = await supabase.auth.getUser()
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