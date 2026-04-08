<template>
  <div
    v-if="showBanner"
    class="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-3xl rounded-3xl border border-stone-200 bg-white p-5 shadow-2xl"
  >
    <p class="text-sm font-semibold text-stone-900">
      We use cookies to keep the site working and, with your consent, to understand how people use it.
    </p>

    <p class="mt-2 text-sm leading-6 text-stone-600">
      Essential cookies are always used. You can accept analytics cookies, reject non-essential cookies,
      or read more in our
      <router-link to="/cookies" class="text-[#7C5C3B] underline">
        Cookies Policy
      </router-link>.
    </p>

    <div class="mt-4 flex flex-wrap gap-3">
      <button
        @click="acceptAll"
        class="rounded-full bg-[#7C5C3B] px-5 py-2 text-sm font-medium text-white transition hover:opacity-90"
      >
        Accept all
      </button>

      <button
        @click="rejectNonEssential"
        class="rounded-full border border-stone-300 px-5 py-2 text-sm font-medium text-stone-900 transition hover:bg-stone-50"
      >
        Reject non-essential
      </button>

      <router-link
        to="/cookies"
        class="rounded-full border border-stone-300 px-5 py-2 text-sm font-medium text-stone-900 transition hover:bg-stone-50"
      >
        Read policy
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const showBanner = ref(false)

onMounted(() => {
  const saved = localStorage.getItem('cookie-consent')
  if (!saved) {
    showBanner.value = true
  }
})

function acceptAll() {
  localStorage.setItem(
    'cookie-consent',
    JSON.stringify({
      necessary: true,
      analytics: true,
      savedAt: new Date().toISOString(),
    })
  )

  showBanner.value = false
}

function rejectNonEssential() {
  localStorage.setItem(
    'cookie-consent',
    JSON.stringify({
      necessary: true,
      analytics: false,
      savedAt: new Date().toISOString(),
    })
  )

  showBanner.value = false
}
</script>