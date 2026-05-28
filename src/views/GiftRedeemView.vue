<template>
  <div class="min-h-screen bg-[#F5F0E8] flex items-center justify-center px-5 py-12">
    <div class="w-full max-w-md">

      <!-- Loading -->
      <div v-if="loading" class="text-center">
        <div class="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-stone-200 border-t-[#7C5C3B]" />
        <p class="mt-4 text-sm text-stone-500">Loading your gift…</p>
      </div>

      <!-- Invalid / already redeemed -->
      <div v-else-if="error" class="rounded-3xl bg-white p-8 text-center shadow-sm">
        <p class="text-4xl">🎁</p>
        <h1 class="mt-4 text-xl font-bold text-stone-900">{{ error }}</h1>
        <p class="mt-2 text-sm text-stone-500">If you think this is a mistake, contact us at hello@tellmeyourstory.uk</p>
        <router-link to="/" class="mt-6 inline-block rounded-full bg-[#7C5C3B] px-6 py-3 text-sm font-medium text-white">
          Go to Tell Me Your Story
        </router-link>
      </div>

       <!-- Success -->
      <div v-else-if="redeemed" class="rounded-3xl bg-white p-8 text-center shadow-sm">
        <p class="text-5xl">🎉</p>
        <h1 class="mt-4 font-display text-2xl font-bold text-stone-900">Gift redeemed!</h1>
        <p class="mt-3 text-sm leading-6 text-stone-600">
          Your access has been unlocked. Head to the dashboard to start capturing your story.
        </p>
        <router-link to="/dashboard" class="mt-6 inline-block rounded-full bg-[#7C5C3B] px-6 py-3 text-sm font-medium text-white transition hover:opacity-90">
          Start your story →
        </router-link>
      </div>

      <!-- Gift ready to redeem -->
      <div v-else-if="gift" class="rounded-3xl bg-white p-8 shadow-sm">
        <div class="text-center">
          <p class="text-5xl">🎁</p>
          <h1 class="mt-4 font-display text-2xl font-bold text-stone-900">
            You have a gift!
          </h1>
          <p v-if="gift.recipientName" class="mt-2 text-stone-600">
            For <strong>{{ gift.recipientName }}</strong>
          </p>
          <div v-if="gift.giftMessage" class="mt-4 rounded-2xl bg-[#F5F0E8] px-5 py-4 text-sm italic leading-6 text-stone-700">
            "{{ gift.giftMessage }}"
          </div>
          <p class="mt-4 text-sm text-stone-500">
            Someone special has given you access to Tell Me Your Story — a beautiful way to capture your life story in your own words.
          </p>
        </div>

        <div class="mt-8">
          <div v-if="!user">
            <p class="text-center text-sm font-medium text-stone-700 mb-4">Create a free account to redeem your gift</p>
            <a
              :href="`/register?gift=${token}`"
              class="block w-full rounded-full bg-[#7C5C3B] py-3 text-center text-sm font-medium text-white transition hover:opacity-90"
            >
              Create account & redeem →
            </a>
            <p class="mt-3 text-center text-xs text-stone-400">
              Already have an account?
              <a :href="`/login?gift=${token}`" class="text-[#7C5C3B] hover:underline">Sign in to redeem</a>
            </p>
          </div>

          <div v-else>
            <p class="text-center text-sm text-stone-600 mb-4">Signed in as <strong>{{ user.email }}</strong></p>
            <button
              @click="redeemGift"
              :disabled="redeeming"
              class="w-full rounded-full bg-[#7C5C3B] py-3 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-50"
            >
              {{ redeeming ? 'Redeeming…' : 'Redeem your gift →' }}
            </button>
          </div>

          <p v-if="redeemError" class="mt-3 text-center text-xs text-red-500">{{ redeemError }}</p>
        </div>
      </div>

     

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { supabase } from '../lib/supabase'

const route = useRoute()
const token = route.params.token as string

const loading   = ref(true)
const redeeming = ref(false)
const redeemed  = ref(false)
const error     = ref('')
const redeemError = ref('')
const gift      = ref<any>(null)
const user      = ref<any>(null)

onMounted(async () => {
  // Check auth state
  const { data: { session } } = await supabase.auth.getSession()
  user.value = session?.user || null

  // Validate gift token
  try {
    const response = await fetch(`https://tellmeyourstoryimproved.onrender.com/gift/${token}`)
    const data = await response.json()

    if (!response.ok) {
      error.value = data.error === 'Gift already redeemed'
        ? 'This gift has already been redeemed.'
        : 'This gift link is invalid or has expired.'
    } else {
      gift.value = data
    }
  } catch {
    error.value = 'Could not load gift. Please try again.'
  } finally {
    loading.value = false
  }
})

async function redeemGift() {
  if (!user.value) return
  redeeming.value = true
  redeemError.value = ''

  try {
    const response = await fetch('https://tellmeyourstoryimproved.onrender.com/redeem-gift', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, userId: user.value.id }),
    })

    const data = await response.json()

    if (data.success) {
        gift.value = null  // ← add this
      redeemed.value = true
    } else {
      redeemError.value = data.error || 'Redemption failed. Please try again.'
    }
  } catch {
    redeemError.value = 'Could not connect. Please try again.'
  } finally {
    redeeming.value = false
  }
}
</script>

<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
</style>