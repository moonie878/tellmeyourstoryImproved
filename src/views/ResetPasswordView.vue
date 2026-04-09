<template>
  <div class="min-h-screen flex items-center justify-center bg-stone-50 px-6">
    <div class="w-full max-w-md rounded-3xl border border-stone-200 bg-white p-8 shadow-sm">
      <h1 class="text-2xl font-semibold text-center">Choose a new password</h1>
      <p class="mt-2 text-center text-sm text-stone-600">
        Enter your new password below.
      </p>

      <form class="mt-6 space-y-4" @submit.prevent="handleResetPassword">
        <div>
          <label class="text-sm font-medium">New password</label>
          <input
            v-model="password"
            type="password"
            required
            minlength="6"
            class="mt-1 w-full rounded-xl border border-stone-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-stone-900"
          />
        </div>

        <div>
          <label class="text-sm font-medium">Confirm password</label>
          <input
            v-model="confirmPassword"
            type="password"
            required
            minlength="6"
            class="mt-1 w-full rounded-xl border border-stone-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-stone-900"
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full rounded-full bg-[#7C5C3B] px-4 py-2 font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
        >
          {{ loading ? 'Updating password...' : 'Update password' }}
        </button>
      </form>

      <p v-if="successMessage" class="mt-4 text-center text-sm text-green-600">
        {{ successMessage }}
      </p>

      <p v-if="errorMessage" class="mt-4 text-center text-sm text-red-600">
        {{ errorMessage }}
      </p>

      <p class="mt-6 text-center text-sm text-stone-600">
        <router-link to="/login" class="font-medium text-stone-900">
          Back to login
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '../lib/supabase'
import { useRouter } from 'vue-router'

const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const router = useRouter()

onMounted(async () => {
  const hash = window.location.hash
  if (!hash.includes('access_token')) {
    errorMessage.value = 'This password reset link is invalid or has expired.'
  }
})

async function handleResetPassword() {
  errorMessage.value = ''
  successMessage.value = ''

  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match.'
    return
  }

  loading.value = true

  try {
    const { error } = await supabase.auth.updateUser({
      password: password.value,
    })

    if (error) {
      errorMessage.value = error.message
    } else {
      successMessage.value = 'Your password has been updated. Redirecting to login...'
      password.value = ''
      confirmPassword.value = ''

      setTimeout(() => {
        router.push('/login')
      }, 1500)
    }
  } catch (err) {
    console.error(err)
    errorMessage.value = 'Something went wrong. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>