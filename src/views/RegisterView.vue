<template>
  <div class="min-h-screen flex items-center justify-center bg-[#F5F0E8] px-6 py-12">
    <div class="w-full max-w-md">

      <!-- Header above card -->
      <div class="text-center mb-6">
        <p class="text-[11px] font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Free to start · No credit card needed</p>
        <h1 class="mt-2 font-display text-2xl font-bold text-[#1C1917]">Create your account</h1>
        <p class="mt-2 text-sm text-[#5C534E]">Start capturing their story today</p>
      </div>

      <!-- Card -->
      <div class="rounded-3xl border border-stone-200 bg-white px-8 py-8 shadow-sm">

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

          <!-- Email opt-in -->
          <label class="flex items-start gap-3 text-sm text-stone-500 cursor-pointer">
            <input type="checkbox" v-model="emailOptIn" class="mt-0.5 accent-[#7C5C3B]" />
            <span>Send me story prompts and reminders so I don't forget to capture these moments (optional)</span>
          </label>

          <!-- Turnstile — hidden visually, triggers on submit -->
          <div class="invisible h-0 overflow-hidden">
            <TurnstileWidget v-model="turnstileToken" />
          </div>

          <p v-if="turnstileError" class="text-sm text-red-600">{{ turnstileError }}</p>
          <p v-if="errorMessage" class="text-sm text-red-600">{{ errorMessage }}</p>

          <!-- Success state -->
          <div v-if="success" class="rounded-2xl bg-[#F5F0E8] px-5 py-4 text-center">
            <p class="text-sm font-medium text-[#1C1917]">✓ Account created</p>
            <p class="mt-1 text-xs text-[#5C534E]">Check your email to confirm your account, then you're good to go.</p>
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

      <!-- Below card -->
      <p class="mt-5 text-center text-sm text-[#8C847E]">
        Already have an account?
        <router-link to="/login" class="font-medium text-[#1C1917] hover:underline">Log in</router-link>
      </p>

      <!-- Trust signals -->
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

const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')
const emailOptIn = ref(false)
const success = ref(false)
const turnstileToken = ref('')
const turnstileError = ref('')
const utmData = getCurrentUtmData()

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
      track('signup_completed', {
        source: 'register_page',
        ...utmData,
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