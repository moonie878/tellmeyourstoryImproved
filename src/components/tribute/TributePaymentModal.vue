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

          <!-- Loading state -->
          <div v-if="isLoading" class="loading-section">
            <div class="spinner"></div>
            <p>Loading secure checkout…</p>
          </div>

          <!-- Stripe embedded checkout mounts here -->
          <div ref="stripeContainer" class="stripe-container"></div>

          <p v-if="error" class="error-text">{{ error }}</p>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

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
const stripeContainer = ref<HTMLElement | null>(null)
let stripeCheckout: any = null

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

watch(() => props.open, async (isOpen) => {
  if (!isOpen) {
    // Clean up when modal closes
    if (stripeCheckout) {
      stripeCheckout.destroy()
      stripeCheckout = null
    }
    return
  }

  isLoading.value = true
  error.value = ''

  try {
    // Load Stripe.js
    const stripe = await loadStripe()

    // Get client secret from your server
    const response = await fetch(`${apiBaseUrl}/create-tribute-checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: props.name }),
    })

    if (!response.ok) throw new Error('Failed to create checkout session')

    const { clientSecret } = await response.json()

    isLoading.value = false

    // Mount embedded checkout
    stripeCheckout = await stripe.initEmbeddedCheckout({
      clientSecret,
      onComplete: () => {
        // Payment successful — close modal and trigger download
        if (stripeCheckout) {
          stripeCheckout.destroy()
          stripeCheckout = null
        }
        emit('paid')
      },
    })

    if (stripeContainer.value) {
      stripeCheckout.mount(stripeContainer.value)
    }

  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Something went wrong.'
    isLoading.value = false
  }
})

async function loadStripe() {
  if ((window as any).Stripe) {
    return (window as any).Stripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = 'https://js.stripe.com/v3/'
    script.onload = () => resolve((window as any).Stripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY))
    script.onerror = () => reject(new Error('Failed to load Stripe'))
    document.head.appendChild(script)
  })
}
</script>

<style scoped>
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
  max-width: 520px;
  max-height: 90vh;
  overflow-y: auto;
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
  font-size: 1.4rem;
  font-weight: 700;
  color: #1C1917;
  margin: 0 0 6px;
}

.modal-sub {
  font-size: 13px;
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
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.close-btn:hover { background: #F5F0E8; color: #1C1917; }

.loading-section {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 32px 28px;
  font-size: 14px;
  color: #78716C;
}

.spinner {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #F0EBE3;
  border-top-color: #7C5C3B;
  animation: spin 0.8s linear infinite;
  flex-shrink: 0;
}

@keyframes spin { to { transform: rotate(360deg); } }

.stripe-container {
  padding: 0 28px 28px;
}

.error-text {
  font-size: 13px;
  color: #DC2626;
  background: #FEF2F2;
  border: 1px solid #FECACA;
  border-radius: 10px;
  padding: 10px 14px;
  margin: 0 28px 20px;
}

.modal-fade-enter-active,
.modal-fade-leave-active { transition: opacity 0.2s ease; }
.modal-fade-enter-from,
.modal-fade-leave-to { opacity: 0; }
</style>