<template>
  <div class="min-h-screen flex items-center justify-center bg-[#F5F0E8] px-6 py-12">
    <div class="w-full max-w-md">

      <!-- Header -->
      <div class="text-center mb-6">
        <p class="text-[11px] font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Free to start · No credit card needed</p>
        <h1 class="mt-2 font-display text-2xl font-bold text-[#1C1917]">Create your account</h1>
        <p class="mt-2 text-sm text-[#5C534E]">Start capturing their story today</p>
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
              placeholder="At least 8 characters"
              class="mt-1 w-full rounded-xl border border-stone-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#7C5C3B]"
            />
          </div>

          <label class="flex items-start gap-3 text-sm text-stone-500 cursor-pointer">
            <input type="checkbox" v-model="emailOptIn" class="mt-0.5 accent-[#7C5C3B]" />
            <span>Send me story prompts and reminders so I don't forget to capture these moments (optional)</span>
          </label>

          <div class="invisible h-0 overflow-hidden">
            <TurnstileWidget v-model="turnstileToken" />
          </div>

          <p v-if="turnstileError" class="text-sm text-red-600">{{ turnstileError }}</p>
          <p v-if="errorMessage" class="text-sm text-red-600">{{ errorMessage }}</p>

          <div v-if="success" class="rounded-2xl bg-[#F5F0E8] px-5 py-4 text-center">
  <p class="text-sm font-medium text-[#1C1917]">✓ Account created</p>
  <p v-if="giftToken" class="mt-1 text-xs text-[#5C534E]">
    Redirecting you to redeem your gift…
  </p>
  <p v-else class="mt-1 text-xs text-[#5C534E]">
    Check your email to confirm your account, then you're good to go.
  </p>
</div>

          <button
            v-if="!success"
            @click="handleRegister"
            :disabled="loading"
            class="w-full rounded-full bg-[#7C5C3B] px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
          >
            {{ loading ? 'Creating your account...' : 'Create account — it\'s free' }}
          </button>
        </div>
      </div>

      <p class="mt-6 text-center text-sm text-[#5C534E]">
  Already have an account?
  <router-link
    :to="giftToken ? `/login?gift=${giftToken}` : '/login'"
    class="font-medium text-[#1C1917] hover:underline"
  >Log in</router-link>
</p>

      <div class="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-[#A89880]">
        <span>✦ No subscription</span>
        <span>✦ Free to start</span>
        <span>✦ Download when ready</span>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { supabase } from '../lib/supabase'
import TurnstileWidget from '../components/legal/TurnstileWidget.vue'
import { verifyTurnstile } from '../lib/turnstile'
import { track } from '../lib/analytics'
import { getCurrentUtmData } from '../lib/utm'
import { useRoute, useRouter } from 'vue-router'  // add useRoute and useRouter

const email = ref('')
const password = ref('')
const loading = ref(false)
const googleLoading = ref(false)
const errorMessage = ref('')
const emailOptIn = ref(false)
const success = ref(false)
const turnstileToken = ref('')
const turnstileError = ref('')
const utmData = getCurrentUtmData()
const route  = useRoute()
const router = useRouter()
const giftToken = route.query.gift as string | undefined


async function handleGoogleLogin() {
  googleLoading.value = true
  const redirectTo = giftToken
    ? `https://tellmeyourstory.uk/gift/redeem/${giftToken}`
    : 'https://tellmeyourstory.uk/dashboard'

  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo },
  })
  if (error) {
    errorMessage.value = error.message
    googleLoading.value = false
  }
}

async function handleRegister() {
  loading.value = true
  errorMessage.value = ''
  turnstileError.value = ''

  try {
    const isHuman = await verifyTurnstile(turnstileToken.value)

    if (!isHuman) {
      turnstileError.value = 'Please try again — verification failed.'
      loading.value = false
      return
    }

    const { error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        data: {
          email_opt_in: emailOptIn.value,
        },
      },
    })

    if (error) {
  errorMessage.value = error.message
} else {
  success.value = true
  track('signup_completed', { source: 'register_page', ...utmData })

  // If registering via a gift link, redirect to redemption page after short delay
  if (giftToken) {
    setTimeout(() => {
      router.push(`/gift/redeem/${giftToken}`)
    }, 2000)
  }
}
  } catch (err) {
    console.error(err)
    errorMessage.value = 'Something went wrong. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>