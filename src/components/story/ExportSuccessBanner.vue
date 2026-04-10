<template>
  <div class="mb-6 rounded-[2rem] border border-green-200 bg-green-50 p-5 text-center sm:p-6">
    <p class="text-xs font-semibold uppercase tracking-[0.18em] text-green-700 sm:text-sm">
      Export complete
    </p>

    <h3 class="mt-3 text-xl font-semibold text-green-900 sm:text-2xl">
      You’ve created something worth keeping ✨
    </h3>

    <p class="mx-auto mt-3 max-w-2xl text-sm leading-6 text-green-800">
      Your story is now a finished keepsake to save, print, share with family, or treasure for years to come.
    </p>

    <div class="mt-5 grid gap-3 sm:grid-cols-3">
      <div class="rounded-2xl border border-green-200 bg-white/70 p-4">
        <p class="text-sm font-semibold text-green-900">Save it safely</p>
        <p class="mt-1 text-xs leading-5 text-green-800">
          Keep a copy somewhere special so you always have it.
        </p>
      </div>

      <div class="rounded-2xl border border-green-200 bg-white/70 p-4">
        <p class="text-sm font-semibold text-green-900">Print or gift it</p>
        <p class="mt-1 text-xs leading-5 text-green-800">
          Turn it into something physical to share with family.
        </p>
      </div>

      <div class="rounded-2xl border border-green-200 bg-white/70 p-4">
        <p class="text-sm font-semibold text-green-900">Keep building stories</p>
        <p class="mt-1 text-xs leading-5 text-green-800">
          Capture more memories over time and create more keepsakes.
        </p>
      </div>
    </div>

    <div class="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
      <button
        v-if="!hasImageExportAccess"
        @click="$emit('upgrade-premium')"
        class="w-full rounded-full bg-[#7C5C3B] px-5 py-3 text-sm font-medium text-white transition hover:opacity-90 sm:w-auto"
      >
        Add Photos & Premium Design
      </button>

      <button
        v-if="hasTier4Access"
        @click="$emit('open-customiser')"
        class="w-full rounded-full border border-stone-900 px-5 py-3 text-sm font-medium text-stone-900 transition hover:bg-stone-100 sm:w-auto"
      >
        Refine My Keepsake Design
      </button>
    </div>

    <p
      v-if="!hasImageExportAccess"
      class="mt-4 text-xs leading-5 text-green-800"
    >
      Premium makes it feel even more personal with photos, richer layouts, and a more beautifully finished design.
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  hasImageExportAccess: boolean
  hasTier4Access: boolean
}>()

defineEmits<{
  (e: 'upgrade-premium'): void
  (e: 'open-customiser'): void
}>()
</script>