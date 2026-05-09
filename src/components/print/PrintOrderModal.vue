<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center px-4">
    <div class="absolute inset-0 bg-black/50" @click="$emit('close')" />
    <div class="relative w-full max-w-lg rounded-3xl bg-white px-8 py-8 shadow-2xl">

      <div v-if="success" class="py-4 text-center">
        <div class="text-4xl mb-4">📦</div>
        <h2 class="font-display text-2xl font-bold text-[#1C1917]">Order placed!</h2>
        <p class="mt-3 text-sm leading-relaxed text-[#5C534E]">Your keepsake book is being printed and will be shipped to <strong>{{ form.name }}</strong> within 5–7 business days.</p>
        <p v-if="trackingRef" class="mt-2 text-xs text-[#8C847E]">Order ref: {{ trackingRef }}</p>
        <button @click="$emit('close')" class="mt-6 rounded-full bg-[#1C1917] px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90">Done</button>
      </div>

      <template v-else>
        <h2 class="font-display text-2xl font-bold text-[#1C1917]">Order your printed book</h2>
        <p class="mt-2 text-sm text-[#5C534E]">A beautifully printed 6×9 softcover — shipped directly to your door.</p>

        <div class="mt-4 rounded-2xl bg-[#F5F0E8] px-5 py-4">
          <div class="flex justify-between text-sm"><span class="text-[#5C534E]">Printed keepsake book (× {{ quantity }})</span><span class="font-medium text-[#1C1917]">£{{ (printCost * quantity).toFixed(2) }}</span></div>
          <div class="flex justify-between text-sm mt-1"><span class="text-[#5C534E]">UK shipping</span><span class="font-medium text-[#1C1917]">{{ shippingCost !== null ? `£${shippingCost.toFixed(2)}` : 'Enter postcode →' }}</span></div>
          <div v-if="shippingCost !== null" class="mt-2 border-t border-[#E8DDD0] pt-2 flex justify-between text-sm font-semibold"><span class="text-[#1C1917]">Total</span><span class="text-[#1C1917]">£{{ totalCost }}</span></div>
        </div>

        <div class="mt-5 space-y-3">
          <div><label class="label">Full name</label><input v-model="form.name" type="text" placeholder="Margaret Griffiths" class="input" /></div>
          <div><label class="label">Address line 1</label><input v-model="form.street1" type="text" placeholder="12 Oak Street" class="input" /></div>
          <div><label class="label">Address line 2 <span class="text-[#8C847E] font-normal">(optional)</span></label><input v-model="form.street2" type="text" placeholder="Flat 2" class="input" /></div>
          <div class="grid grid-cols-2 gap-3">
            <div><label class="label">City</label><input v-model="form.city" type="text" placeholder="Southampton" class="input" /></div>
            <div><label class="label">Postcode</label><input v-model="form.postcode" type="text" placeholder="SO14 1AA" class="input" @blur="fetchShipping" /></div>
          </div>
          <div><label class="label">Phone number</label><input v-model="form.phone" type="tel" placeholder="07700 900000" class="input" /></div>
        </div>

        <div class="mt-4 flex items-center gap-3">
          <span class="label mb-0">Copies</span>
          <div class="flex items-center gap-2">
            <button @click="quantity = Math.max(1, quantity - 1)" class="qty-btn">−</button>
            <span class="w-6 text-center text-sm font-medium text-[#1C1917]">{{ quantity }}</span>
            <button @click="quantity = Math.min(10, quantity + 1)" class="qty-btn">+</button>
          </div>
        </div>

        <p v-if="errorMsg" class="mt-3 text-sm text-red-600">{{ errorMsg }}</p>

        <div v-if="isOrdering" class="mt-4">
          <div class="h-1.5 w-full rounded-full bg-[#E8DDD0] overflow-hidden"><div class="h-full rounded-full bg-[#7C5C3B] animate-pulse" style="width:60%" /></div>
          <p class="mt-2 text-center text-xs text-[#8C847E]">{{ orderStatus }}</p>
        </div>

        <div class="mt-6 flex gap-3">
          <button @click="$emit('close')" class="flex-1 rounded-full border border-[#D6CFC8] py-2.5 text-sm font-medium text-[#1C1917] transition hover:bg-[#F5F0E8]">Cancel</button>
          <button @click="handleOrder" :disabled="isOrdering || !isFormValid || shippingCost === null" class="flex-1 rounded-full bg-[#7C5C3B] py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50">
            {{ isOrdering ? 'Placing order…' : shippingCost === null ? 'Enter postcode first' : `Order — £${totalCost}` }}
          </button>
        </div>
        <p class="mt-3 text-center text-xs text-[#8C847E]">Printed by Lulu Press · 5–7 business days · Tracked delivery</p>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useLuluPrint, getLuluShippingCost } from '../../lib/useLuluPrint'
import type { ShippingAddress } from '../../lib/useLuluPrint'

const props = defineProps<{
  interiorPdfBlob: Blob
  coverPdfBlob: Blob
  pageCount: number
  storyTitle: string
  storyId: string
  userId: string
  userEmail: string
  printCost: number
  stripePaymentId: string
}>()

const emit = defineEmits<{ close: []; ordered: [printJobId: string] }>()

const { isOrdering, orderStatus, orderPrintedBook } = useLuluPrint()

const form = ref({ name: '', street1: '', street2: '', city: '', postcode: '', phone: '' })
const quantity     = ref(1)
const shippingCost = ref<number | null>(null)
const success      = ref(false)
const trackingRef  = ref('')
const errorMsg     = ref('')

const isFormValid = computed(() =>
  form.value.name.trim() && form.value.street1.trim() &&
  form.value.city.trim() && form.value.postcode.trim() && form.value.phone.trim()
)

const totalCost = computed(() => {
  if (shippingCost.value === null) return '…'
  return (props.printCost * quantity.value + shippingCost.value).toFixed(2)
})

async function fetchShipping() {
  if (!form.value.postcode || !form.value.city) return
  try {
    const costs = await getLuluShippingCost(props.pageCount, {
      name: form.value.name || 'Customer',
      street1: form.value.street1 || '1 Test St',
      city: form.value.city,
      postcode: form.value.postcode,
      country_code: 'GB',
      phone_number: form.value.phone || '07000000000',
      email: props.userEmail,
    }, quantity.value)
    shippingCost.value = costs.shipping_cost
  } catch {
    shippingCost.value = 4.99
  }
}

watch(quantity, fetchShipping)

async function handleOrder() {
  errorMsg.value = ''
  if (!isFormValid.value) { errorMsg.value = 'Please fill in all required fields.'; return }

  const address: ShippingAddress = {
    name: form.value.name, street1: form.value.street1,
    street2: form.value.street2 || undefined, city: form.value.city,
    postcode: form.value.postcode, country_code: 'GB',
    phone_number: form.value.phone, email: props.userEmail,
  }

  const result = await orderPrintedBook(
    props.interiorPdfBlob, props.coverPdfBlob, props.pageCount,
    props.storyTitle, props.storyId, props.userId, address,
    props.stripePaymentId, quantity.value,
    props.printCost * quantity.value + (shippingCost.value || 0)
  )

  if (result.success && result.lulu_print_job_id) {
    success.value = true
    trackingRef.value = result.lulu_print_job_id
    emit('ordered', result.lulu_print_job_id)
  } else {
    errorMsg.value = result.error || 'Something went wrong. Please try again.'
  }
}
</script>

<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
.label { display: block; font-size: 13px; font-weight: 500; color: #1C1917; margin-bottom: 4px; }
.input { width: 100%; border-radius: 12px; border: 1px solid #E8DDD0; padding: 10px 14px; font-size: 13px; color: #1C1917; outline: none; transition: border-color 0.15s; }
.input:focus { border-color: #7C5C3B; box-shadow: 0 0 0 2px rgba(124,92,59,0.15); }
.input::placeholder { color: #C4B8B0; }
.qty-btn { display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 50%; border: 1px solid #D6CFC8; color: #1C1917; transition: background 0.15s; }
.qty-btn:hover { background: #F5F0E8; }
</style>