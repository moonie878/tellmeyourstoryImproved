<template>
  <Transition name="banner">
    <div
      v-if="visible"
      class="relative overflow-hidden"
      :class="variantClasses"
      role="region"
      aria-label="Christmas ordering dates"
    >
      <!-- pr-10 keeps the text and button clear of the close (X) on small screens -->
      <div class="mx-auto flex max-w-6xl items-center justify-center gap-3 py-2.5 pl-4 pr-10 sm:px-12 sm:py-3">

        <p class="text-center text-[13px] leading-snug sm:text-sm">
          <!-- Site-wide sale (SITE_SALE in server.js) beats every other message -->
          <template v-if="salePercent > 0">
            <strong class="font-semibold">{{ saleLabel }}: {{ salePercent }}% off everything</strong>
            <span class="sm:hidden"> · ends {{ saleEndsShort }}</span>
            <span class="hidden sm:inline">
              — plans, the Keepsake, printed books and gifts. Taken off at checkout, ends {{ saleEndsLong }}.
            </span>
          </template>

          <!-- Early season -->
          <template v-else-if="phase === 'early'">
            <span class="mr-1" aria-hidden="true">🎄</span>
            <strong class="font-semibold">For Christmas?</strong>
            <!-- Mobile: short date so the deadline is always visible -->
            <span class="sm:hidden"> Print by {{ PRINT_CUTOFF_SHORT_LABEL }}.</span>
            <span class="hidden sm:inline"> Order printed books by {{ PRINT_CUTOFF_LABEL }}, or give a digital gift any time.</span>
          </template>

          <!-- Final fortnight -->
          <template v-else-if="phase === 'countdown'">
            <span class="mr-1" aria-hidden="true">⏳</span>
            <template v-if="showDiscount">
              <strong class="font-semibold">{{ discountPercent }}% off Christmas gifts</strong>
              <span class="sm:hidden"> · print by {{ PRINT_CUTOFF_SHORT_LABEL }}</span>
              <span class="hidden sm:inline">
                — {{ printDays }} {{ printDays === 1 ? 'day' : 'days' }} left to order printed books
              </span>
            </template>
            <template v-else>
              <strong class="font-semibold">
                {{ printDays }} {{ printDays === 1 ? 'day' : 'days' }} left
              </strong>
              to order printed books for Christmas
            </template>
          </template>

          <!-- Print cutoff passed -->
          <template v-else>
            <span class="mr-1" aria-hidden="true">✨</span>
            <strong v-if="showDiscount" class="font-semibold">{{ discountPercent }}% off digital gifts —</strong>
            <strong v-else class="font-semibold">Missed the print date?</strong>
            <span class="sm:hidden"> Give it digitally.</span>
            <span class="hidden sm:inline"> Give it digitally — they get their personal link instantly, and you can print it together in the new year.</span>
          </template>
        </p>

        <router-link
          :to="ctaTarget"
          class="flex-shrink-0 whitespace-nowrap rounded-full px-3.5 py-1.5 text-[12px] font-semibold transition sm:text-[13px]"
          :class="ctaClasses"
          @click="trackClick"
        >
          {{ ctaLabel }}
        </router-link>

        <button
          type="button"
          class="absolute right-1 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full opacity-60 transition hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-3"
          aria-label="Dismiss Christmas banner"
          @click="dismiss"
        >
          <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import {
  CHRISTMAS_YEAR,
  PRINT_CUTOFF_LABEL,
  PRINT_CUTOFF_SHORT_LABEL,
  christmasPhase,
  daysUntilPrintCutoff,
  isDiscountWindow,
  type ChristmasPhase,
} from '../../lib/christmas'
import { track } from '../../lib/analytics'

/**
 * Dismissal is remembered per phase in localStorage, so:
 *  - once closed, it stays closed across page loads and visits, but
 *  - it comes back once when the message changes (countdown, then digital).
 */
const dismissKey = (p: ChristmasPhase) => `tmys_xmas_banner_dismissed_${CHRISTMAS_YEAR}_${p}`

const phase = ref<ChristmasPhase>('off')
const printDays = ref(0)
const dismissed = ref(true) // hidden until storage is checked — avoids a flash

/**
 * The discount is a quiet reward for arriving on a campaign link for most of
 * the season — the banner sells the DEADLINE, which motivates harder and costs
 * nothing. From 27 November it is worth saying out loud, so the banner shouts
 * it for the last fortnight and links straight to the discounted gift page.
 *
 * The percentage is read from the server, never hardcoded, so the banner can
 * only ever advertise a discount that checkout will actually apply. If the
 * request fails the banner simply falls back to the deadline message.
 */
const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'https://tellmeyourstoryimproved.onrender.com'
const discountPercent = ref(0)
const showDiscount = computed(() => discountPercent.value > 0 && phase.value !== 'off')

// Black Friday etc. Read from the server so the banner only promises what
// checkout applies. Runs whatever the Christmas phase is.
const salePercent = ref(0)
const saleLabel = ref('Sale')
const saleEndsAt = ref<Date | null>(null)
const fmtEnds = (opts: Intl.DateTimeFormatOptions) =>
  saleEndsAt.value ? saleEndsAt.value.toLocaleDateString('en-GB', { timeZone: 'Europe/London', ...opts }) : ''
const saleEndsShort = computed(() => fmtEnds({ weekday: 'short' }))                                 // "Mon"
const saleEndsLong  = computed(() => fmtEnds({ weekday: 'long', day: 'numeric', month: 'long' }))   // "Monday 30 November"
const onSale = computed(() => salePercent.value > 0)

/** Dismissing the sale banner is remembered separately from the Christmas ones. */
const dismissPhase = computed(() => (onSale.value ? 'sale' : phase.value))

const visible = computed(() => (onSale.value || phase.value !== 'off') && !dismissed.value)

const variantClasses = computed(() => {
  if (onSale.value) return 'bg-[#1C1917] text-white'
  return phase.value === 'countdown' ? 'bg-[#8C3A2B] text-white' : 'bg-[#2C2420] text-white'
})

const ctaClasses = computed(() => {
  if (onSale.value) return 'bg-[#E8C79A] text-[#1C1917] hover:opacity-90'
  return phase.value === 'countdown'
    ? 'bg-white text-[#8C3A2B] hover:opacity-90'
    : 'bg-[#7C5C3B] text-white hover:opacity-90'
})

const ctaLabel = computed(() => {
  if (onSale.value) return 'Shop the sale'
  if (showDiscount.value) return `Get ${discountPercent.value}% off`
  return phase.value === 'digital' ? 'Buy a digital gift' : 'Christmas gifts'
})

// While the discount is being advertised, send people straight to the gift page
// with the campaign on it — the offer in the banner has to be the offer they land on.
const ctaTarget = computed(() =>
  onSale.value
    ? '/pricing'
    : showDiscount.value || phase.value === 'digital'
    ? '/gift?campaign=christmas'
    : '/christmas-gifts-for-grandparents',
)

function dismiss() {
  dismissed.value = true
  track('christmas_banner_dismissed', { phase: dismissPhase.value })
  try {
    localStorage.setItem(dismissKey(dismissPhase.value as ChristmasPhase), '1')
  } catch {
    // Private browsing — it'll just show again next visit
  }
}

function trackClick() {
  track('christmas_banner_clicked', { phase: dismissPhase.value })
}

onMounted(async () => {
  // Never bake the banner into prerendered HTML — a countdown frozen at
  // build time ("12 days left") would be wrong for visitors and for Google.
  if ((window as unknown as { __TMYS_PRERENDER__?: boolean }).__TMYS_PRERENDER__) return

  phase.value = christmasPhase()
  printDays.value = daysUntilPrintCutoff()

  try {
    dismissed.value = localStorage.getItem(dismissKey(phase.value)) === '1'
  } catch {
    dismissed.value = false
  }

  // Site-wide sale. Asked separately so a slow server (Render waking up) never
  // holds back the Christmas message; the banner switches over when it answers.
  fetch(`${SERVER_URL}/site-sale`)
    .then((r) => (r.ok ? r.json() : null))
    .then((sale) => {
      if (!sale || !(Number(sale.percent) > 0)) return
      salePercent.value = Number(sale.percent)
      saleLabel.value = sale.label || 'Sale'
      saleEndsAt.value = sale.endsAt ? new Date(sale.endsAt) : null
      try {
        dismissed.value = localStorage.getItem(dismissKey('sale' as ChristmasPhase)) === '1'
      } catch {
        dismissed.value = false
      }
    })
    .catch(() => { /* no sale shown; checkout decides the price anyway */ })

  // Only ask about the discount inside the window it would be shown in.
  if (!isDiscountWindow()) return
  try {
    const r = await fetch(`${SERVER_URL}/gift-campaign/christmas`)
    if (r.ok) discountPercent.value = Number((await r.json()).percent) || 0
  } catch {
    // Unreachable — the banner keeps its deadline message and promises nothing
  }
})
</script>

<style scoped>
.banner-enter-active,
.banner-leave-active {
  transition: opacity 0.3s ease, max-height 0.3s ease;
  max-height: 100px;
}
.banner-enter-from,
.banner-leave-to {
  opacity: 0;
  max-height: 0;
}

@media (prefers-reduced-motion: reduce) {
  .banner-enter-active,
  .banner-leave-active {
    transition: none;
  }
}
</style>