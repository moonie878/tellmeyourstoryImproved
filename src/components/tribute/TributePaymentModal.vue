<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="open" class="modal-overlay" @click.self="$emit('close')">
        <div class="modal-box">

          <div class="modal-header">
            <div>
              <p class="modal-eyebrow">✦ Secure Checkout</p>
              <h3 class="modal-title">Download your tribute</h3>
              <p class="modal-sub">
                Full HD tribute video for <strong>{{ name }}</strong> —
                no watermark, yours to keep forever.
              </p>
            </div>
            <button @click="$emit('close')" class="close-btn">✕</button>
          </div>

          <div class="modal-body">
            <div class="included-card">
              <p class="included-title">What you get</p>
              <ul class="included-list">
                <li v-for="item in included" :key="item">
                  <span class="check">✦</span> {{ item }}
                </li>
              </ul>
            </div>

            <div class="price-row">
              <span class="price-label">Tribute video — full HD</span>
              <span class="price-amount">£9.99</span>
            </div>

            <p v-if="error" class="error-text">{{ error }}</p>

            <div v-if="isLoading" class="loading-row">
              <div class="spinner"></div>
              <span>Connecting to payment…</span>
            </div>
          </div>

          <div class="modal-footer">
            <button
              @click="handleCheckout"
              :disabled="isLoading"
              class="pay-btn"
            >
              <span v-if="isLoading">Opening checkout…</span>
              <span v-else>Pay £9.99 — download tribute</span>
            </button>
            <div class="security-row">
              <span>🔒 Secured by Stripe</span>
              <span>·</span>
              <span>Instant access after payment</span>
            </div>
          </div>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  open: boolean
  name: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'paid'): void
  (e: 'save-state'): void
}>()

const isLoading = ref(false)
const error = ref('')
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

const included = [
  'Full HD 1920×1080 MP4 video',
  'No watermark',
  'All photos, music and transitions',
  'Download immediately after payment',
  'Keep and share forever',
]

async function handleCheckout() {
  isLoading.value = true
  error.value = ''

  try {
    const response = await fetch(`${apiBaseUrl}/create-tribute-checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: props.name,
        successUrl: `${window.location.origin}/tribute?payment=success`,
        cancelUrl: `${window.location.origin}/tribute?payment=cancelled`,
      }),
    })

    if (!response.ok) throw new Error('Failed to create checkout session')

    const { url } = await response.json()
    if (!url) throw new Error('No checkout URL returned')

    // Save form state to sessionStorage before redirecting
    emit('save-state')

    window.location.href = url

  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Something went wrong.'
    isLoading.value = false
  }
}
</script>