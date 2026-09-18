<template>
  <div
    v-if="showBanner"
    class="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-3xl rounded-2xl border border-stone-200 bg-white p-4 shadow-2xl sm:inset-x-4 sm:bottom-4 sm:rounded-3xl sm:p-5"
    style="padding-bottom: max(1rem, env(safe-area-inset-bottom));"
    role="dialog"
    aria-live="polite"
    aria-label="Cookie choices"
  >
    <!-- Mobile: one short line so it doesn't cover the page -->
    <p class="text-sm leading-6 text-stone-700 sm:hidden">
      We use essential cookies, and analytics cookies if you allow them.
      <router-link to="/cookies" class="text-[#7C5C3B] underline">Details</router-link>
    </p>

    <!-- Desktop: full wording -->
    <div class="hidden sm:block">
      <p class="text-sm font-semibold text-stone-900">
        We use cookies to keep the site working and, with your consent, to understand how people use it.
      </p>
      <p class="mt-2 text-sm leading-6 text-stone-600">
        Essential cookies are always used. You can accept analytics cookies, reject non-essential cookies,
        or read more in our
        <router-link to="/cookies" class="text-[#7C5C3B] underline">Cookies Policy</router-link>.
      </p>
    </div>

    <!-- Accept and Reject are equally easy to find (ICO guidance) -->
    <div class="mt-3 flex gap-2 sm:mt-4 sm:gap-3">
      <button
        type="button"
        class="min-h-[44px] flex-1 rounded-full bg-[#7C5C3B] px-5 py-2 text-sm font-medium text-white transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1917] focus-visible:ring-offset-2 sm:flex-none"
        @click="choose(true)"
      >
        Accept all
      </button>

      <button
        type="button"
        class="min-h-[44px] flex-1 rounded-full border border-stone-300 px-5 py-2 text-sm font-medium text-stone-900 transition hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1C1917] focus-visible:ring-offset-2 sm:flex-none"
        @click="choose(false)"
      >
        Reject non-essential
      </button>

      <router-link
        to="/cookies"
        class="hidden min-h-[44px] items-center rounded-full border border-stone-300 px-5 py-2 text-sm font-medium text-stone-900 transition hover:bg-stone-50 sm:inline-flex"
      >
        Read policy
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { getConsent, saveConsent, OPEN_COOKIE_SETTINGS_EVENT } from '../../lib/consent'
import { applyAnalyticsConsent } from '../../lib/posthog'

const showBanner = ref(false)

function choose(analytics: boolean) {
  saveConsent(analytics)
  applyAnalyticsConsent(analytics)
  showBanner.value = false
}

function openSettings() {
  showBanner.value = true
}

onMounted(() => {
  // Don't bake the banner into prerendered HTML — people who already chose
  // would see it flash before the app loads.
  if ((window as unknown as { __TMYS_PRERENDER__?: boolean }).__TMYS_PRERENDER__) return

  if (!getConsent()) showBanner.value = true
  window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, openSettings)
})

onBeforeUnmount(() => {
  window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, openSettings)
})
</script>