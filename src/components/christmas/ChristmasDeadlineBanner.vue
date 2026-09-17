<template>
  <Transition name="banner">
    <div
      v-if="visible"
      class="relative overflow-hidden"
      :class="variantClasses"
    >
      <div class="mx-auto flex max-w-6xl items-center justify-center gap-3 px-4 py-2.5 sm:px-6 sm:py-3">

        <p class="text-center text-[13px] leading-snug sm:text-sm">
          <!-- Early season -->
          <template v-if="phase === 'early'">
            <span class="mr-1">🎄</span>
            <strong class="font-semibold">Capturing their story for Christmas?</strong>
            <span class="hidden sm:inline"> Order printed books by {{ PRINT_CUTOFF_LABEL }}.</span>
          </template>

          <!-- Final fortnight -->
          <template v-else-if="phase === 'countdown'">
            <span class="mr-1">⏳</span>
            <strong class="font-semibold">
              {{ printDays }} {{ printDays === 1 ? 'day' : 'days' }} left
            </strong>
            to order printed books for Christmas
          </template>

          <!-- Print cutoff passed -->
          <template v-else>
            <span class="mr-1">✨</span>
            <strong class="font-semibold">Still time for a digital gift.</strong>
            <span class="hidden sm:inline"> Arrives instantly — print it together in the new year.</span>
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
          @click="dismiss"
          class="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 opacity-40 transition hover:opacity-80 sm:right-4"
          aria-label="Dismiss"
        >
          <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
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
  PRINT_CUTOFF_LABEL,
  christmasPhase,
  daysUntilPrintCutoff,
  type ChristmasPhase,
} from '../../lib/christmas'
import { track } from '../../lib/analytics'

const DISMISS_KEY = 'tmys_christmas_banner_dismissed'

const phase = ref<ChristmasPhase>('off')
const printDays = ref(0)
const dismissed = ref(false)

const visible = computed(() => phase.value !== 'off' && !dismissed.value)

const variantClasses = computed(() => {
  if (phase.value === 'countdown') return 'bg-[#8C3A2B] text-white'
  if (phase.value === 'digital') return 'bg-[#2C2420] text-white'
  return 'bg-[#2C2420] text-white'
})

const ctaClasses = computed(() =>
  phase.value === 'countdown'
    ? 'bg-white text-[#8C3A2B] hover:opacity-90'
    : 'bg-[#7C5C3B] text-white hover:opacity-90'
)

const ctaLabel = computed(() =>
  phase.value === 'digital' ? 'Buy a digital gift' : 'Christmas gifts'
)

const ctaTarget = computed(() =>
  phase.value === 'digital'
    ? '/gift?campaign=christmas'
    : '/christmas-gifts-for-grandparents'
)

function dismiss() {
  dismissed.value = true
  try {
    sessionStorage.setItem(DISMISS_KEY, '1')
  } catch {
    // Private browsing — fine, it'll just show again
  }
}

function trackClick() {
  track('christmas_banner_clicked', { phase: phase.value })
}

onMounted(() => {
  phase.value = christmasPhase()
  printDays.value = daysUntilPrintCutoff()

  try {
    dismissed.value = sessionStorage.getItem(DISMISS_KEY) === '1'
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
</style>