<template>
  <!-- Success state -->
  <div v-if="route.query.success" class="min-h-screen bg-[#F5F0E8] flex items-center justify-center px-5">
    <div class="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-sm">
      <p class="text-5xl">🎁</p>
      <h1 class="mt-4 font-display text-2xl font-bold text-stone-900">Gift purchased</h1>
      <p class="mt-3 text-sm leading-6 text-stone-600">
        We're sending your gift link to your email now. Share it with them whenever you're ready.
      </p>
      <p class="mt-4 text-xs text-stone-400">
        Can't find the email? Check your spam folder or contact
        <a href="mailto:hello@tellmeyourstory.uk" class="text-[#7C5C3B] hover:underline">hello@tellmeyourstory.uk</a>
      </p>
      <router-link to="/" class="mt-6 inline-block rounded-full bg-[#7C5C3B] px-6 py-2.5 text-sm font-medium text-white transition hover:opacity-90">
        Back to home
      </router-link>
    </div>
  </div>

  <div v-else class="min-h-screen bg-[#F5F0E8]">

    <!-- Hero -->
    <section class="relative overflow-hidden bg-[#1C1917] px-5 py-16 sm:px-8 sm:py-24">
      <div class="relative mx-auto max-w-4xl">
        <div class="grid items-center gap-12 md:grid-cols-2">

          <!-- Left — copy -->
          <div class="text-center md:text-left">
            <p class="text-[11px] font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">
              A gift that lasts forever
            </p>
            <h1 class="mt-4 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-[2.75rem]">
              Give them the gift of<br/>
              <em class="italic text-[#C4A882]">telling their story</em>
            </h1>
            <p class="mt-5 text-sm leading-7 text-[#A8A29E] sm:text-base">
              For the parent, grandparent, or person whose memories deserve to be kept. They answer thoughtful questions in their own words — and record their voice, so family can hear them tell it.
            </p>
            <div class="mt-7 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-[#8C847E] md:justify-start">
              <span>✦ One-time payment</span>
              <span>✦ No subscription</span>
              <span>✦ Instant gift link</span>
            </div>
          </div>

          <!-- Right — gift card mockup -->
          <div class="flex justify-center">
            <div class="w-full max-w-[280px]">
              <div class="rounded-2xl bg-[#2C2420] p-6 shadow-2xl">
                <p class="text-[10px] font-medium uppercase tracking-widest text-[#9C7C5C]">Tell Me Your Story</p>
                <p class="mt-3 font-display text-lg font-medium text-white">🎁 A gift for Mum</p>
                <div class="mt-4 rounded-xl border-l-2 border-[#7C5C3B] bg-[#3C3430] p-4">
                  <p class="font-serif text-xs italic leading-relaxed text-[#C4A882]">
                    "Your stories matter more than you know. I want the kids to hear your voice telling them, years from now."
                  </p>
                </div>
                <div class="mt-4 flex items-center justify-between border-t border-[#3C3430] pt-4">
                  <p class="text-xs text-stone-400">Story + Photos</p>
                  <p class="font-display text-lg font-bold text-white">£7.99</p>
                </div>
              </div>
              <div class="mx-5 h-2.5 rounded-b-xl bg-black/25"></div>
            </div>
          </div>

        </div>
      </div>
      <ChristmasDeadlineBanner />
    </section>

    <!-- Gift cards -->
    <section class="mx-auto max-w-5xl px-5 py-14 sm:px-8 sm:py-16">

      <div class="text-center">
        <p class="text-[11px] font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Choose a gift</p>
        <h2 class="mt-3 font-display text-2xl font-bold text-stone-900 sm:text-3xl">
          Pick what feels right
        </h2>
        <p class="mx-auto mt-3 max-w-lg text-sm leading-6 text-stone-500">
          Every gift includes 100+ guided questions, voice recording, and QR codes printed in the book.
        </p>
      </div>

      <div class="mt-10 grid gap-4 sm:grid-cols-2">

        <div
          v-for="product in products"
          :key="product.key"
          class="relative flex flex-col rounded-3xl border bg-white p-6 transition hover:shadow-lg sm:p-7"
          :class="product.featured
            ? 'border-[#7C5C3B] shadow-md ring-1 ring-[#7C5C3B]/20'
            : 'border-stone-200'"
        >
          <div
            v-if="product.featured"
            class="absolute -top-3 left-6 rounded-full bg-[#7C5C3B] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white"
          >
            Most popular
          </div>

          <p class="text-xs font-medium uppercase tracking-wider text-stone-400">{{ product.label }}</p>

          <div class="mt-3 flex items-baseline gap-2">
            <span class="font-display text-3xl font-bold text-stone-900">£{{ product.displayPrice }}</span>
            <span v-if="product.originalPrice" class="text-sm text-stone-400 line-through">£{{ product.originalPrice }}</span>
            <span
              v-if="product.saving"
              class="rounded-full bg-green-50 px-2 py-0.5 text-[11px] font-medium text-green-700"
            >Save {{ product.saving }}</span>
          </div>

          <p class="mt-2 text-sm leading-6 text-stone-600">{{ product.description }}</p>

          <ul class="mt-5 flex-1 space-y-2.5">
            <li
              v-for="feature in product.features"
              :key="feature"
              class="flex items-start gap-2.5 text-[13px] leading-5 text-stone-600"
            >
              <span class="mt-0.5 flex-shrink-0 text-[#7C5C3B]">✓</span>{{ feature }}
            </li>
          </ul>

          <button
            @click="selectProduct(product)"
            class="mt-6 w-full rounded-full py-3 text-sm font-semibold transition"
            :class="product.featured
              ? 'bg-[#7C5C3B] text-white hover:opacity-90'
              : 'border border-stone-300 bg-white text-stone-900 hover:bg-stone-50'"
          >
            Gift this
          </button>
        </div>

      </div>
    </section>

    <!-- How it works -->
    <section class="bg-white px-5 py-14 sm:px-8 sm:py-16">
      <div class="mx-auto max-w-4xl">
        <h2 class="text-center font-display text-2xl font-bold text-stone-900 sm:text-3xl">
          How gifting works
        </h2>

        <div class="mt-10 grid gap-8 sm:grid-cols-3">
          <div class="text-center">
            <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#1C1917] font-display text-lg font-bold text-white">1</div>
            <p class="mt-4 text-sm font-semibold text-stone-900">You buy the gift</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">
              Choose a tier, add a personal message, and pay securely. You'll receive a unique gift link by email straight away.
            </p>
          </div>
          <div class="text-center">
            <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#1C1917] font-display text-lg font-bold text-white">2</div>
            <p class="mt-4 text-sm font-semibold text-stone-900">Share it whenever</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">
              Forward the email, copy the link into a card, or send it by WhatsApp. There's no expiry — share it when the moment feels right.
            </p>
          </div>
          <div class="text-center">
            <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#1C1917] font-display text-lg font-bold text-white">3</div>
            <p class="mt-4 text-sm font-semibold text-stone-900">They start their story</p>
            <p class="mt-2 text-xs leading-5 text-stone-500">
              They open the link, create a free account, and their access unlocks automatically. Your message is waiting for them.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Occasions -->
    <section class="px-5 py-14 sm:px-8">
      <div class="mx-auto max-w-4xl text-center">
        <p class="text-[11px] font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Perfect for</p>
        <h2 class="mt-3 font-display text-2xl font-bold text-stone-900">
          Any moment worth marking
        </h2>
        <div class="mt-8 flex flex-wrap justify-center gap-2.5">
          <span
            v-for="occasion in occasions"
            :key="occasion"
            class="rounded-full border border-[#E8DDD0] bg-white px-4 py-2 text-sm text-stone-600"
          >{{ occasion }}</span>
        </div>
      </div>
    </section>
<!-- Internal link — Christmas -->
<section class="px-5 pb-14 sm:px-8">
  <div class="mx-auto max-w-3xl text-center">
    <p class="text-[15px] leading-[1.8] text-[#5C534E]">
      Buying for Christmas? Read our guide to
      <router-link
        to="/christmas-gifts-for-grandparents"
        class="font-medium text-[#7C5C3B] underline underline-offset-2"
      >Christmas gifts for grandparents</router-link>,
      including the last order date for printed books.
    </p>
  </div>
</section>
    <!-- Gift form modal -->
    <Transition name="fade">
      <div
        v-if="selectedProduct"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
        @click.self="selectedProduct = null"
      >
        <div class="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">

          <!-- Modal header -->
          <div class="bg-[#F5F0E8] px-6 py-5">
            <h2 class="font-display text-lg font-bold text-stone-900">🎁 Send your gift</h2>
            <p class="mt-1 text-sm text-stone-500">
              {{ selectedProduct.label }} — <strong class="text-[#7C5C3B]">£{{ selectedProduct.displayPrice }}</strong>
            </p>
          </div>

          <div class="px-6 py-5">
            <div class="space-y-4">
              <div>
                <label class="text-xs font-medium text-stone-700">Who's it for?</label>
                <input
                  v-model="form.recipientName"
                  type="text"
                  placeholder="Mum, Dad, Grandad…"
                  class="mt-1.5 w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-3 text-sm focus:border-[#7C5C3B] focus:outline-none focus:ring-1 focus:ring-[#7C5C3B]/30"
                />
              </div>
              <div>
                <label class="text-xs font-medium text-stone-700">Your email</label>
                <input
                  v-model="form.buyerEmail"
                  type="email"
                  placeholder="you@email.com"
                  class="mt-1.5 w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-3 text-sm focus:border-[#7C5C3B] focus:outline-none focus:ring-1 focus:ring-[#7C5C3B]/30"
                />
                <p class="mt-1 text-[11px] text-stone-400">We'll send the gift link here</p>
              </div>
              <div>
                <label class="text-xs font-medium text-stone-700">A personal message <span class="text-stone-400">(optional)</span></label>
                <textarea
                  v-model="form.giftMessage"
                  rows="3"
                  placeholder="Your stories deserve to be kept forever 🤍"
                  class="mt-1.5 w-full resize-none rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-3 text-sm focus:border-[#7C5C3B] focus:outline-none focus:ring-1 focus:ring-[#7C5C3B]/30"
                />
                <p class="mt-1 text-[11px] text-stone-400">They'll see this when they open the gift</p>
              </div>
            </div>

            <p v-if="formError" class="mt-3 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">{{ formError }}</p>

            <div class="mt-5 flex gap-3">
              <button
                @click="selectedProduct = null"
                class="flex-1 rounded-full border border-stone-200 py-3 text-sm text-stone-600 transition hover:bg-stone-50"
              >Cancel</button>
              <button
                @click="handleGiftCheckout"
                :disabled="loading"
                class="flex-1 rounded-full bg-[#7C5C3B] py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
              >
                {{ loading ? 'Preparing…' : 'Continue to payment' }}
              </button>
            </div>

            <p class="mt-3 text-center text-[11px] text-stone-400">
              Secure payment via Stripe · No subscription
            </p>
          </div>

        </div>
      </div>
    </Transition>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// Campaign discounts — add new campaigns here
const CAMPAIGNS: Record<string, number> = {
  'mothers-day': 25,
  'fathers-day': 25,
  'christmas': 20,
}

const campaignKey = route.query.campaign as string | undefined
const campaignDiscount = campaignKey ? (CAMPAIGNS[campaignKey] || 0) : 0

const occasions = [
  'Birthdays',
  "Mother's Day",
  "Father's Day",
  'Christmas',
  'Anniversaries',
  'Retirement',
  'New grandchild',
  'Just because',
]

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

function price(base: number): string {
  return campaignDiscount
    ? (base * (1 - campaignDiscount / 100)).toFixed(2)
    : base.toFixed(2)
}

const products: GiftProduct[] = [
  {
    key: 'single-story',
    label: 'Keepsake Book',
    description: 'One story type, beautifully designed as a PDF keepsake',
    displayPrice: price(3.99),
    originalPrice: campaignDiscount ? '3.99' : undefined,
    saving: campaignDiscount ? `${campaignDiscount}%` : undefined,
    features: [
      '100+ guided questions',
      'Voice recording with QR codes',
      'Beautifully typeset PDF keepsake',
      'Download and keep forever',
    ],
    featured: false,
    discountPercent: campaignDiscount,
  },
  {
    key: 'single-story-images',
    label: 'Story + Photos',
    description: 'One story type with photos woven into the keepsake',
    displayPrice: price(7.99),
    originalPrice: campaignDiscount ? '7.99' : undefined,
    saving: campaignDiscount ? `${campaignDiscount}%` : undefined,
    features: [
      'Everything in Keepsake Book',
      'Add photos to any answer',
      'Custom cover image',
      'Richer, more personal keepsake',
    ],
    featured: true,
    discountPercent: campaignDiscount,
  },
  {
    key: 'all-stories',
    label: 'All Stories',
    description: 'Every story type — Mum, Dad, Grandparents, and more',
    displayPrice: price(11.99),
    originalPrice: campaignDiscount ? '11.99' : undefined,
    saving: campaignDiscount ? `${campaignDiscount}%` : undefined,
    features: [
      'All 7 story types unlocked',
      'Unlimited stories',
      'Voice recording with QR codes',
      'Perfect for the whole family',
    ],
    featured: false,
    discountPercent: campaignDiscount,
  },
  {
    key: 'premium',
    label: 'Premium Keepsake',
    description: 'The complete experience — everything included',
    displayPrice: price(17.99),
    originalPrice: campaignDiscount ? '17.99' : undefined,
    saving: campaignDiscount ? `${campaignDiscount}%` : undefined,
    features: [
      'All story types and photos',
      'Premium layouts and cover design',
      'Tribute video creator',
      'Print-ready layouts for hardback',
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
  if (!form.value.recipientName.trim()) {
    formError.value = 'Please enter who the gift is for'
    return
  }
  if (!form.value.buyerEmail.trim()) {
    formError.value = 'Please enter your email so we can send you the gift link'
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