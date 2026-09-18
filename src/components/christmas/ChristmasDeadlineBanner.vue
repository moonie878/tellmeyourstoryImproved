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
          <!-- Early season -->
          <template v-if="phase === 'early'">
            <span class="mr-1" aria-hidden="true">🎄</span>
            <strong class="font-semibold">For Christmas?</strong>
            <!-- Mobile: short date so the deadline is always visible -->
            <span class="sm:hidden"> Print by {{ PRINT_CUTOFF_SHORT_LABEL }}.</span>
            <span class="hidden sm:inline"> Order printed books by {{ PRINT_CUTOFF_LABEL }}, or give a digital gift any time.</span>
          </template>

          <!-- Final fortnight -->
          <template v-else-if="phase === 'countdown'">
            <span class="mr-1" aria-hidden="true">⏳</span>
            <strong class="font-semibold">
              {{ printDays }} {{ printDays === 1 ? 'day' : 'days' }} left
            </strong>
            to order printed books for Christmas
          </template>

          <!-- Print cutoff passed -->
          <template v-else>
            <span class="mr-1" aria-hidden="true">✨</span>
            <strong class="font-semibold">Missed the print date?</strong>
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

const visible = computed(() => phase.value !== 'off' && !dismissed.value)

const variantClasses = computed(() =>
  phase.value === 'countdown' ? 'bg-[#8C3A2B] text-white' : 'bg-[#2C2420] text-white',
)

const ctaClasses = computed(() =>
  phase.value === 'countdown'
    ? 'bg-white text-[#8C3A2B] hover:opacity-90'
    : 'bg-[#7C5C3B] text-white hover:opacity-90',
)

const ctaLabel = computed(() => (phase.value === 'digital' ? 'Buy a digital gift' : 'Christmas gifts'))

const ctaTarget = computed(() =>
  phase.value === 'digital' ? '/gift?campaign=christmas' : '/christmas-gifts-for-grandparents',
)

function dismiss() {
  dismissed.value = true
  track('christmas_banner_dismissed', { phase: phase.value })
  try {
    localStorage.setItem(dismissKey(phase.value), '1')
  } catch {
    // Private browsing — it'll just show again next visit
  }
}

function trackClick() {
  track('christmas_banner_clicked', { phase: phase.value })
}

onMounted(() => {
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