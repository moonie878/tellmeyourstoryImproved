<template>
  <div class="rounded-3xl border border-[#E8DDD0] bg-white px-6 py-8 sm:px-10 sm:py-10">
    <div class="grid items-center gap-8 md:grid-cols-[1.2fr_1fr]">

      <!-- Copy -->
      <div>
        <p class="text-[11px] font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">
          Free download
        </p>
        <h2 class="mt-3 font-display text-xl font-bold leading-tight text-stone-900 sm:text-2xl">
          Not ready yet? Take the questions with you.
        </h2>
        <p class="mt-3 text-[15px] leading-[1.75] text-[#5C534E]">
          A printable PDF of 50 questions to ask your parents or grandparents about their life. Use it over Sunday lunch, or keep it for when the moment's right.
        </p>

        <!-- Success -->
        <div v-if="status === 'success'" class="mt-6 rounded-2xl bg-[#F0F5F1] px-5 py-4">
          <p class="text-sm font-semibold text-[#2F5D3F]">Check your inbox</p>
          <p class="mt-1 text-[13px] leading-relaxed text-[#4A7C59]">
            The PDF is on its way to {{ submittedEmail }}. If it doesn't arrive in a minute or two, have a look in your spam folder.
          </p>
        </div>

        <!-- Form -->
        <form v-else class="mt-6" @submit.prevent="handleSubmit">
          <div class="flex flex-col gap-2.5 sm:flex-row">
            <input
              v-model="email"
              type="email"
              autocomplete="email"
              placeholder="your@email.com"
              :disabled="status === 'loading'"
              class="flex-1 rounded-full border px-5 py-3 text-sm text-stone-800 placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-[#7C5C3B]/25 disabled:opacity-60"
              :class="error ? 'border-red-300' : 'border-stone-200'"
            />
            <button
              type="submit"
              :disabled="status === 'loading'"
              class="flex-shrink-0 rounded-full bg-[#7C5C3B] px-7 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
            >
              {{ status === 'loading' ? 'Sending…' : 'Send it to me' }}
            </button>
          </div>

          <p v-if="error" class="mt-2.5 text-xs text-red-600">{{ error }}</p>

          <p class="mt-3 text-[11px] leading-relaxed text-stone-400">
            I'll send you the PDF and occasionally something useful about capturing family stories. Unsubscribe any time. See our
            <router-link to="/privacy" class="underline hover:text-stone-600">privacy policy</router-link>.
          </p>
        </form>
      </div>

      <!-- Visual — PDF mockup -->
      <div class="hidden justify-center md:flex">
        <div class="relative">
          <div
            class="w-[170px] rounded-sm bg-white p-5 shadow-[0_8px_30px_-8px_rgba(0,0,0,0.18)]"
            style="aspect-ratio: 210/297;"
          >
            <p class="text-[7px] font-semibold uppercase tracking-[0.15em] text-[#9C7C5C]">
              Tell Me Your Story
            </p>
            <p class="mt-2 font-display text-[11px] font-bold leading-tight text-stone-900">
              50 Questions<br />to Ask Your Parents
            </p>
            <div class="mt-3 space-y-[5px]">
              <div v-for="n in 14" :key="n" class="flex items-start gap-1">
                <span class="mt-[3px] h-[3px] w-[3px] flex-shrink-0 rounded-full bg-[#C4A882]" />
                <span
                  class="h-[3px] rounded-full bg-stone-200"
                  :style="{ width: `${52 + ((n * 13) % 38)}%` }"
                />
              </div>
            </div>
          </div>
          <div class="mx-4 h-2 rounded-b-lg bg-stone-100"></div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { track } from '../../lib/analytics'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const email = ref('')
const submittedEmail = ref('')
const status = ref<'idle' | 'loading' | 'success'>('idle')
const error = ref('')

const props = withDefaults(
  defineProps<{
    /** Where on the site this form was submitted from — shows up in PostHog */
    source?: string
  }>(),
  { source: 'homepage' }
)

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

async function handleSubmit() {
  error.value = ''

  const trimmed = email.value.trim()

  if (!trimmed) {
    error.value = 'Please enter your email address.'
    return
  }
  if (!isValidEmail(trimmed)) {
    error.value = 'That email address doesn\'t look quite right.'
    return
  }

  status.value = 'loading'

  try {
    const response = await fetch(`${API_BASE_URL}/subscribe-questions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: trimmed, source: props.source }),
    })

    if (!response.ok) throw new Error('Request failed')

    submittedEmail.value = trimmed
    status.value = 'success'
    email.value = ''

    track('lead_magnet_signup', { source: props.source })
  } catch {
    status.value = 'idle'
    error.value = 'Something went wrong. Please try again, or email hello@tellmeyourstory.uk.'
  }
}
</script>

<style scoped>
.font-display {
  font-family: 'Playfair Display', Georgia, serif;
}
</style>