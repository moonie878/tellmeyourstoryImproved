<template>
  <div class="mb-6 rounded-[2rem] border border-green-200 bg-green-50 p-6 text-center">
    <p class="text-sm font-semibold uppercase tracking-[0.18em] text-green-700">
      Export complete
    </p>

    <h3 class="mt-3 text-2xl font-semibold text-green-900">
      You’ve created something worth keeping ✨
    </h3>

    <p class="mx-auto mt-3 max-w-2xl text-sm leading-6 text-green-800">
      You’ve turned this story into something lasting — a finished keepsake to save, print, share with family, or treasure for years to come.
    </p>

    <div class="mt-6 grid gap-3 sm:grid-cols-3">
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

    <div class="mt-6 flex flex-wrap items-center justify-center gap-3">
      <button
        v-if="!hasImageExportAccess"
        @click="$emit('upgrade-premium')"
        class="rounded-full bg-[#7C5C3B] hover:opacity-90 transition px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
      >
        Add Photos & Premium Design
      </button>

      <button
        v-if="hasTier4Access"
        @click="$emit('open-customiser')"
        class="rounded-full border border-stone-900 px-5 py-2.5 text-sm font-medium text-stone-900 transition hover:bg-stone-100"
      >
        Refine My Keepsake Design
      </button>
    </div>

    <p
      v-if="!hasImageExportAccess"
      class="mt-4 text-xs text-green-800"
    >
      Premium helps this feel even more personal with photos, richer layouts, and a more beautifully finished design.
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