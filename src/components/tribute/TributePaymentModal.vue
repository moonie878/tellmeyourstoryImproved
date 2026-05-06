<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
        v-if="open"
        class="modal-overlay"
        @click.self="$emit('close')"
      >
        <div class="modal-box">

          <!-- Header -->
          <div class="modal-header">
            <div>
              <p class="modal-eyebrow">✦ Secure Checkout</p>
              <h3 class="modal-title">Download your tribute</h3>
              <p class="modal-sub">
                A full HD tribute video for <strong>{{ name }}</strong> —
                no watermark, yours to keep forever.
              </p>
            </div>
            <button @click="$emit('close')" class="close-btn">✕</button>
          </div>

          <!-- Body -->
          <div class="modal-body">

            <!-- What's included -->
            <div class="included-card">
              <p class="included-title">What you get</p>
              <ul class="included-list">
                <li v-for="item in included" :key="item">
                  <span class="check">✦</span> {{ item }}
                </li>
              </ul>
            </div>

            <!-- Price -->
            <div class="price-row">
              <span class="price-label">Tribute video — full HD</span>
              <span class="price-amount">£9.99</span>
            </div>

            <!-- Error -->
            <p v-if="error" class="error-text">{{ error }}</p>

            <!-- Loading -->
            <div v-if="isLoading" class="loading-row">
              <div class="spinner"></div>
              <span>Connecting to payment…</span>
            </div>

          </div>

          <!-- Footer -->
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
              <span>No account required</span>
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
}>()

const isLoading = ref(false)
const error = ref('')

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
    // Create Stripe Checkout session via your Vercel serverless function
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL
if (!apiBaseUrl) {
  error.value = 'Checkout is not configured yet.'
  isLoading.value = false
  return
}

const response = await fetch(`${apiBaseUrl}/create-tribute-checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: props.name,
        successUrl: `${window.location.origin}/tribute?payment=success`,
        cancelUrl: `${window.location.origin}/tribute?payment=cancelled`,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to create checkout session')
    }

    const { url } = await response.json()

    if (!url) throw new Error('No checkout URL returned')

    // Redirect to Stripe Checkout
    window.location.href = url

  } catch (err) {
    error.value = err instanceof Error
      ? err.message
      : 'Something went wrong. Please try again.'
    isLoading.value = false
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500&display=swap');

.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 50;
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.modal-box {
  background: white;
  border-radius: 28px;
  width: 100%;
  max-width: 460px;
  overflow: hidden;
  box-shadow: 0 24px 64px rgba(0,0,0,0.2);
}

.modal-header {
  padding: 28px 28px 20px;
  border-bottom: 1px solid #F0EBE3;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.modal-eyebrow {
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #9C7C5C;
  margin: 0 0 6px;
}

.modal-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 1.4rem;
  font-weight: 700;
  color: #1C1917;
  margin: 0 0 6px;
}

.modal-sub {
  font-size: 13px;
  line-height: 1.6;
  color: #78716C;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  color: #A8A29E;
  font-size: 16px;
  cursor: pointer;
  padding: 4px;
  flex-shrink: 0;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover { background: #F5F0E8; color: #1C1917; }

.modal-body {
  padding: 20px 28px;
}

.included-card {
  background: #FAFAF9;
  border: 1px solid #F0EBE3;
  border-radius: 16px;
  padding: 16px 18px;
  margin-bottom: 20px;
}

.included-title {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #A8A29E;
  margin: 0 0 10px;
}

.included-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.included-list li {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #3C3530;
}

.check {
  color: #9C7C5C;
  font-size: 10px;
  flex-shrink: 0;
}

.price-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 0;
  border-top: 1px solid #F0EBE3;
  border-bottom: 1px solid #F0EBE3;
}

.price-label {
  font-size: 14px;
  font-weight: 500;
  color: #1C1917;
}

.price-amount {
  font-size: 20px;
  font-weight: 700;
  color: #1C1917;
}

.error-text {
  font-size: 13px;
  color: #DC2626;
  background: #FEF2F2;
  border: 1px solid #FECACA;
  border-radius: 10px;
  padding: 10px 14px;
  margin-top: 14px;
}

.loading-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 14px;
  font-size: 13px;
  color: #78716C;
}

.spinner {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid #F0EBE3;
  border-top-color: #7C5C3B;
  animation: spin 0.8s linear infinite;
  flex-shrink: 0;
}

@keyframes spin { to { transform: rotate(360deg); } }

.modal-footer {
  padding: 16px 28px 24px;
  border-top: 1px solid #F0EBE3;
}

.pay-btn {
  width: 100%;
  background: #1C1917;
  color: white;
  font-size: 15px;
  font-weight: 600;
  padding: 15px;
  border-radius: 100px;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s;
  font-family: 'DM Sans', sans-serif;
}

.pay-btn:hover { opacity: 0.88; }
.pay-btn:disabled { opacity: 0.5; cursor: not-allowed; }

.security-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 6px 10px;
  margin-top: 12px;
  font-size: 11px;
  color: #A8A29E;
}

.modal-fade-enter-active,
.modal-fade-leave-active { transition: opacity 0.2s ease; }
.modal-fade-enter-from,
.modal-fade-leave-to { opacity: 0; }
</style>