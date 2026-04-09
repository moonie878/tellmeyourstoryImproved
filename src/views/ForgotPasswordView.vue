<template>
  <div class="min-h-screen flex items-center justify-center bg-stone-50 px-6">
    <div class="w-full max-w-md rounded-3xl border border-stone-200 bg-white p-8 shadow-sm">
      <h1 class="text-2xl font-semibold text-center">Reset your password</h1>
      <p class="mt-2 text-center text-sm text-stone-600">
        Enter your email and we’ll send you a password reset link.
      </p>

      <form class="mt-6 space-y-4" @submit.prevent="handleForgotPassword">
        <div>
          <label class="text-sm font-medium">Email</label>
          <input
            v-model="email"
            type="email"
            required
            class="mt-1 w-full rounded-xl border border-stone-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-stone-900"
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full rounded-full bg-[#7C5C3B] px-4 py-2 font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
        >
          {{ loading ? 'Sending link...' : 'Send reset link' }}
        </button>
      </form>

      <p v-if="successMessage" class="mt-4 text-center text-sm text-green-600">
        {{ successMessage }}
      </p>

      <p v-if="errorMessage" class="mt-4 text-center text-sm text-red-600">
        {{ errorMessage }}
      </p>

      <p class="mt-6 text-center text-sm text-stone-600">
        Remembered your password?
        <router-link to="/login" class="font-medium text-stone-900">
          Back to login
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { supabase } from '../lib/supabase'

const email = ref('')
const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

async function handleForgotPassword() {
  loading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    const redirectTo = `${window.location.origin}/reset-password`

    const { error } = await supabase.auth.resetPasswordForEmail(email.value, {
      redirectTo,
    })

    if (error) {
      errorMessage.value = error.message
    } else {
      successMessage.value = 'Reset link sent. Please check your email.'
      email.value = ''
    }
  } catch (err) {
    console.error(err)
    errorMessage.value = 'Something went wrong. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>