<template>
  <div class="min-h-screen flex items-center justify-center bg-[#F5F0E8] px-6 py-12">
    <div class="w-full max-w-md">

      <!-- Header — changes based on whether a plan is selected -->
      <div class="text-center mb-6">
        <template v-if="selectedPlan">
          <p class="text-[11px] font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">One-time payment · No subscription</p>
          <h1 class="mt-2 font-display text-2xl font-bold text-[#1C1917]">Create your account</h1>
          <p class="mt-2 text-sm text-[#5C534E]">Then you'll be taken to checkout for <strong>{{ selectedPlan.name }}</strong></p>
        </template>
        <template v-else>
          <p class="text-[11px] font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Free to start · No credit card needed</p>
          <h1 class="mt-2 font-display text-2xl font-bold text-[#1C1917]">Create your account</h1>
          <p class="mt-2 text-sm text-[#5C534E]">Start capturing their story today</p>
        </template>
      </div>

      <!-- Plan summary card (only shown when plan selected) -->
      <div v-if="selectedPlan" class="mb-5 rounded-2xl border border-[#E8DDD0] bg-white px-5 py-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-semibold text-[#1C1917]">{{ selectedPlan.name }}</p>
            <p class="text-xs text-[#5C534E]">{{ selectedPlan.desc }}</p>
          </div>
          <p class="text-lg font-bold text-[#7C5C3B]">{{ selectedPlan.price }}</p>
        </div>
        <button
          @click="clearPlan"
          class="mt-2 text-xs text-stone-400 hover:text-stone-600 hover:underline"
        >Start free instead</button>
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

        <p class="mt-2 text-center text-xs text-stone-400">
          By continuing you agree to our
          <router-link to="/privacy" class="underline hover:text-stone-600">privacy policy</router-link>
          and may receive occasional product updates.
        </p>

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
              autocomplete="email"
              placeholder="your@email.com"
              @blur="validateEmail"
              class="mt-1 w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#7C5C3B]"
              :class="fieldErrors.email ? 'border-red-400' : 'border-stone-200'"
            />
            <p v-if="fieldErrors.email" class="mt-1 text-xs text-red-500">{{ fieldErrors.email }}</p>
          </div>

          <div>
            <label class="text-sm font-medium text-[#1C1917]">Password</label>
            <div class="relative mt-1">
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="new-password"
                placeholder="At least 8 characters"
                @blur="validatePassword"
                class="w-full rounded-xl border px-4 py-3 pr-11 text-sm focus:outline-none focus:ring-2 focus:ring-[#7C5C3B]"
                :class="fieldErrors.password ? 'border-red-400' : 'border-stone-200'"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                tabindex="-1"
              >
                <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.956 9.956 0 012.293-3.95M6.634 6.634A9.956 9.956 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.97 9.97 0 01-4.177 5.191M3 3l18 18" />
                </svg>
              </button>
            </div>
            <p v-if="fieldErrors.password" class="mt-1 text-xs text-red-500">{{ fieldErrors.password }}</p>
          </div>

          <label class="flex items-start gap-3 text-sm text-stone-500 cursor-pointer">
            <input type="checkbox" v-model="emailOptIn" class="mt-0.5 accent-[#7C5C3B]" />
            <span>Send me story prompts and reminders so I don't forget to capture these moments (optional)</span>
          </label>

          <!-- Turnstile hidden -->
          <div class="invisible h-0 overflow-hidden">
            <TurnstileWidget v-model="turnstileToken" />
          </div>

          <!-- Errors -->
          <p v-if="turnstileError" class="text-sm text-red-600">{{ turnstileError }}</p>
          <p v-if="errorMessage" class="text-sm text-red-600">{{ errorMessage }}</p>

          <!-- Success state -->
          <div v-if="success" class="rounded-2xl bg-[#F5F0E8] px-5 py-4 text-center">
            <p class="text-sm font-medium text-[#1C1917]">✓ Account created</p>
            <p v-if="giftToken" class="mt-1 text-xs text-[#5C534E]">
              Redirecting you to redeem your gift…
            </p>
            <p v-else-if="planKey" class="mt-1 text-xs text-[#5C534E]">
              Redirecting you to checkout…
            </p>
            <p v-else class="mt-1 text-xs text-[#5C534E]">
              Check your email to confirm your account, then you're good to go.
            </p>
          </div>

          <!-- Submit button -->
          <button
            v-if="!success"
            @click="handleRegister"
            :disabled="loading"
            class="w-full rounded-full bg-[#7C5C3B] px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <span v-if="loading" class="flex items-center justify-center gap-2">
              <svg class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
              </svg>
              Creating your account…
            </span>
            <span v-else-if="selectedPlan">Create account & continue to checkout</span>
            <span v-else>Create account — it's free</span>
          </button>

        </div>
      </div>

      <p class="mt-6 text-center text-sm text-[#5C534E]">
        Already have an account?
        <router-link
          :to="loginRoute"
          class="font-medium text-[#1C1917] hover:underline"
        >Log in</router-link>
      </p>

      <div class="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-[#A89880]">
        <template v-if="selectedPlan">
          <span>✦ One-time payment</span>
          <span>✦ No subscription</span>
          <span>✦ Instant access</span>
        </template>
        <template v-else>
          <span>✦ No subscription</span>
          <span>✦ Free to start</span>
          <span>✦ Download when ready</span>
        </template>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { supabase } from '../lib/supabase'
import TurnstileWidget from '../components/legal/TurnstileWidget.vue'
import { verifyTurnstileWithRetry } from '../lib/turnstile'
import { track } from '../lib/analytics'
import { getCurrentUtmData } from '../lib/utm'
import { useRoute, useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const loading = ref(false)
const googleLoading = ref(false)
const errorMessage = ref('')
const emailOptIn = ref(false)
const success = ref(false)
const showPassword = ref(false)
const turnstileToken = ref('')
const turnstileReady = ref(false)
const turnstileError = ref('')
const utmData = getCurrentUtmData()
const route = useRoute()
const router = useRouter()
const giftToken = route.query.gift as string | undefined
const planKey = route.query.plan as string | undefined

const fieldErrors = ref<{ email: string; password: string }>({
  email: '',
  password: '',
})

const turnstileTimedOut = ref(false)

// ─── Plan config ──────────────────────────────────────────────────────────────

const PLANS: Record<string, { name: string; price: string; desc: string }> = {
  tier1: { name: 'Keepsake Book',    price: '£3.99',  desc: 'All questions + PDF export' },
  tier2: { name: 'Book + Photos',    price: '£7.99',  desc: 'Photos, cover image & premium design' },
  tier3: { name: 'All Stories',       price: '£11.99', desc: 'Unlimited stories & story types' },
  tier4: { name: 'Premium Keepsake', price: '£17.99', desc: 'Everything — video, print layouts & more' },
}

const selectedPlan = computed(() => planKey ? PLANS[planKey] || null : null)

const loginRoute = computed(() => {
  const params: string[] = []
  if (giftToken) params.push(`gift=${giftToken}`)
  if (planKey)   params.push(`plan=${planKey}`)
  return params.length ? `/login?${params.join('&')}` : '/login'
})

function clearPlan() {
  router.replace({ query: { ...route.query, plan: undefined } })
}

// ─── Turnstile ────────────────────────────────────────────────────────────────

watch(turnstileToken, (val) => {
  if (val) turnstileReady.value = true
})

setTimeout(() => {
  if (!turnstileReady.value) {
    turnstileTimedOut.value = true
  }
}, 6000)

// ─── Validation ───────────────────────────────────────────────────────────────

function validateEmail() {
  if (!email.value) {
    fieldErrors.value.email = 'Email is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    fieldErrors.value.email = 'Please enter a valid email address.'
  } else {
    fieldErrors.value.email = ''
  }
}

function validatePassword() {
  if (!password.value) {
    fieldErrors.value.password = 'Password is required.'
  } else if (password.value.length < 8) {
    fieldErrors.value.password = 'Password must be at least 8 characters.'
  } else {
    fieldErrors.value.password = ''
  }
}

function validateAll(): boolean {
  validateEmail()
  validatePassword()
  return !fieldErrors.value.email && !fieldErrors.value.password
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

// Build the post-login redirect based on context
function getRedirectPath() {
  if (giftToken) return `/gift/redeem/${giftToken}`
  if (planKey)   return `/dashboard?plan=${planKey}`
  return '/dashboard'
}

async function handleGoogleLogin() {
  googleLoading.value = true
  const redirectTo = `https://tellmeyourstory.uk${getRedirectPath()}`

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
  errorMessage.value = ''
  turnstileError.value = ''

  if (!validateAll()) return

  loading.value = true

  try {
    const { success: isHuman, timedOut } = await verifyTurnstileWithRetry(
      () => turnstileToken.value
    )

    if (!isHuman) {
      console.warn(
        `Turnstile did not verify (timedOut: ${timedOut}) — proceeding with registration anyway.`
      )
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
        plan: planKey || 'free',
        ...utmData,
      })

      if (emailOptIn.value) {
        try {
          await fetch(`${import.meta.env.VITE_API_BASE_URL}/register-contact`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email.value, firstName: '' }),
          })
        } catch {
          // Non-critical
        }
      }

      // Redirect based on context
      setTimeout(() => {
        router.push(getRedirectPath())
      }, 2000)
    }
  } catch (err) {
    console.error(err)
    errorMessage.value = 'Something went wrong. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>