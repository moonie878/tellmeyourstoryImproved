<template>
  <div class="min-h-screen bg-[#F5F0E8]">

    <!-- Hero -->
    <section class="bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-20 text-center">
      <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Tell Me Your Story</p>
      <h1 class="mt-4 font-display text-3xl font-bold text-white sm:text-4xl md:text-5xl">
        Give the gift of <em class="text-[#C4A882] italic">their story</em>
      </h1>
      <p class="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#A8A29E]">
        A meaningful gift that captures a life in their own words — with voice recordings they can hear forever.
      </p>
    </section>

    <!-- Gift cards -->
    <section class="mx-auto max-w-4xl px-5 py-12 sm:px-8">
      <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-2">

        <div
          v-for="product in products"
          :key="product.key"
          class="rounded-3xl border bg-white p-6 transition hover:shadow-md"
          :class="product.featured ? 'border-[#7C5C3B] shadow-sm' : 'border-stone-200'"
        >
          <div v-if="product.featured" class="mb-3 inline-block rounded-full bg-[#7C5C3B] px-3 py-0.5 text-xs font-medium text-white">
            Most popular
          </div>
          <p class="text-xs font-medium uppercase tracking-wider text-stone-400">{{ product.label }}</p>
          <div class="mt-2 flex items-baseline gap-2">
            <span class="text-3xl font-bold text-stone-900">£{{ product.displayPrice }}</span>
            <span v-if="product.originalPrice" class="text-sm text-stone-400 line-through">£{{ product.originalPrice }}</span>
            <span v-if="product.saving" class="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">Save {{ product.saving }}</span>
          </div>
          <p class="mt-2 text-sm leading-6 text-stone-600">{{ product.description }}</p>
          <ul class="mt-4 space-y-2">
            <li v-for="feature in product.features" :key="feature" class="flex items-start gap-2 text-xs text-stone-600">
              <span class="mt-0.5 text-[#7C5C3B]">✓</span>{{ feature }}
            </li>
          </ul>
          <button
            @click="selectProduct(product)"
            class="mt-6 w-full rounded-full py-3 text-sm font-medium transition"
            :class="product.featured ? 'bg-[#7C5C3B] text-white hover:opacity-90' : 'border border-stone-300 bg-white text-stone-900 hover:bg-stone-50'"
          >
            Gift this →
          </button>
        </div>

      </div>
    </section>

    <!-- Gift form modal -->
    <Transition name="fade">
      <div v-if="selectedProduct" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
        <div class="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
          <h2 class="text-lg font-semibold text-stone-900">🎁 Send your gift</h2>
          <p class="mt-1 text-sm text-stone-500">{{ selectedProduct.label }} — £{{ selectedProduct.displayPrice }}</p>

          <div class="mt-5 space-y-3">
            <div>
              <label class="text-xs font-medium text-stone-700">Recipient's name</label>
              <input v-model="form.recipientName" type="text" placeholder="Dad" class="mt-1 w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#7C5C3B]" />
            </div>
            <div>
              <label class="text-xs font-medium text-stone-700">Your email (we'll send the gift link here)</label>
              <input v-model="form.buyerEmail" type="email" placeholder="you@email.com" class="mt-1 w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#7C5C3B]" />
            </div>
            <div>
              <label class="text-xs font-medium text-stone-700">A personal message (optional)</label>
              <textarea v-model="form.giftMessage" rows="3" placeholder="I thought you'd love this — your stories deserve to be kept forever 🤍" class="mt-1 w-full resize-none rounded-xl border border-stone-200 bg-stone-50 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#7C5C3B]" />
            </div>
          </div>

          <p v-if="formError" class="mt-3 text-xs text-red-500">{{ formError }}</p>

          <div class="mt-5 flex gap-3">
            <button @click="selectedProduct = null" class="flex-1 rounded-full border border-stone-200 py-2.5 text-sm text-stone-600 hover:bg-stone-50">Cancel</button>
            <button @click="handleGiftCheckout" :disabled="loading" class="flex-1 rounded-full bg-[#7C5C3B] py-2.5 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-50">
              {{ loading ? 'Preparing…' : 'Proceed to payment →' }}
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- How it works -->
    <section class="mx-auto max-w-4xl px-5 pb-16 sm:px-8">
      <h2 class="text-center font-display text-2xl font-bold text-stone-900">How gifting works</h2>
      <div class="mt-8 grid gap-5 sm:grid-cols-3">
        <div class="text-center">
          <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#1C1917] text-white text-lg font-bold">1</div>
          <p class="mt-3 text-sm font-semibold text-stone-900">You purchase the gift</p>
          <p class="mt-1 text-xs leading-5 text-stone-500">Choose a tier and pay securely. You'll receive a unique gift link by email.</p>
        </div>
        <div class="text-center">
          <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#1C1917] text-white text-lg font-bold">2</div>
          <p class="mt-3 text-sm font-semibold text-stone-900">Share the gift link</p>
          <p class="mt-1 text-xs leading-5 text-stone-500">Forward the email or copy the link and send it however feels right — WhatsApp, text, or card.</p>
        </div>
        <div class="text-center">
          <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#1C1917] text-white text-lg font-bold">3</div>
          <p class="mt-3 text-sm font-semibold text-stone-900">They start their story</p>
          <p class="mt-1 text-xs leading-5 text-stone-500">They create an account, click redeem, and their access is unlocked automatically.</p>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// Check for campaign-specific discounts
const campaignDiscount = route.query.campaign === 'fathers-day' ? 50 : 0

interface GiftProduct {
  key: string
  label: string
  description: string
  displayPrice: string
  originalPrice?: string
  saving?: string
  features: string[]
  featured: boolean
  discountPercent: number
}

const products: GiftProduct[] = [
  {
    key: 'single-story',
    label: "Dad's Story — Keepsake Book",
    description: 'One story type, beautifully designed PDF keepsake',
    displayPrice: campaignDiscount ? (3.99 * (1 - campaignDiscount / 100)).toFixed(2) : '3.99',
    originalPrice: campaignDiscount ? '3.99' : undefined,
    saving: campaignDiscount ? `${campaignDiscount}%` : undefined,
    features: [
      '100 guided questions about Dad\'s life',
      'Beautifully designed PDF keepsake',
      'Voice recording with QR codes',
      'Download any time',
    ],
    featured: false,
    discountPercent: campaignDiscount,
  },
  {
    key: 'single-story-images',
    label: "Dad's Story — With Photos",
    description: 'One story type with photos included in the keepsake',
    displayPrice: campaignDiscount ? (7.99 * (1 - campaignDiscount / 100)).toFixed(2) : '7.99',
    originalPrice: campaignDiscount ? '7.99' : undefined,
    saving: campaignDiscount ? `${campaignDiscount}%` : undefined,
    features: [
      'Everything in Keepsake Book',
      'Photos included in the PDF',
      'Richer, more personal keepsake',
      'Voice recording with QR codes',
    ],
    featured: true,
    discountPercent: campaignDiscount,
  },
  {
    key: 'all-stories',
    label: 'All Stories',
    description: 'All story types — Mum, Dad, Grandma, Grandad, and more',
    displayPrice: campaignDiscount ? (11.99 * (1 - campaignDiscount / 100)).toFixed(2) : '11.99',
    originalPrice: campaignDiscount ? '11.99' : undefined,
    saving: campaignDiscount ? `${campaignDiscount}%` : undefined,
    features: [
      'All 7 story types unlocked',
      'Beautifully designed PDF keepsakes',
      'Voice recording with QR codes',
      'Perfect for the whole family',
    ],
    featured: false,
    discountPercent: campaignDiscount,
  },
  {
    key: 'premium',
    label: 'Premium Keepsake',
    description: 'The complete experience — photos, premium layouts, all stories',
    displayPrice: campaignDiscount ? (17.99 * (1 - campaignDiscount / 100)).toFixed(2) : '17.99',
    originalPrice: campaignDiscount ? '17.99' : undefined,
    saving: campaignDiscount ? `${campaignDiscount}%` : undefined,
    features: [
      'All story types',
      'Photos in every keepsake',
      'Premium layouts and cover design',
      'Voice recording with QR codes',
    ],
    featured: false,
    discountPercent: campaignDiscount,
  },
]

const selectedProduct = ref<GiftProduct | null>(null)
const loading = ref(false)
const formError = ref('')

const form = ref({
  recipientName: '',
  buyerEmail: '',
  giftMessage: '',
})

function selectProduct(product: GiftProduct) {
  selectedProduct.value = product
  formError.value = ''
}

async function handleGiftCheckout() {
  if (!form.value.buyerEmail.trim()) {
    formError.value = 'Please enter your email so we can send you the gift link'
    return
  }
  if (!form.value.recipientName.trim()) {
    formError.value = 'Please enter the recipient\'s name'
    return
  }

  loading.value = true
  formError.value = ''

  try {
    const response = await fetch('https://tellmeyourstoryimproved.onrender.com/create-gift-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productKey:      selectedProduct.value!.key,
        buyerEmail:      form.value.buyerEmail,
        recipientName:   form.value.recipientName,
        giftMessage:     form.value.giftMessage,
        discountPercent: selectedProduct.value!.discountPercent,
      }),
    })

    const data = await response.json()
    if (data.url) {
      window.location.href = data.url
    } else {
      formError.value = 'Something went wrong. Please try again.'
    }
  } catch {
    formError.value = 'Could not connect. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>