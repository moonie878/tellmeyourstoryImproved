<template>
  <div class="rounded-3xl border border-stone-200 bg-white p-6">
    <div class="mb-6 text-center">
      <h3 class="text-2xl font-bold text-stone-900">
        Turn your story into something worth keeping
      </h3>

      <p class="mx-auto mt-3 max-w-xl text-sm leading-6 text-stone-600">
        You’ve already written something meaningful — now choose how you want it to be experienced, saved, and shared.
      </p>
    </div>

    <div class="max-w-3xl">
      <p class="text-xs font-medium uppercase tracking-[0.25em] text-stone-500">
        Upgrade options
      </p>
      <h3 class="mt-3 text-3xl font-bold text-stone-900">
        Choose how beautifully you want to preserve this story
      </h3>
      <p class="mt-3 text-base text-stone-600">
        {{ upgradeMessage }}
      </p>
    </div>

    <div
      v-if="recommendedText"
      class="mt-6 rounded-2xl border border-stone-200 bg-stone-50 p-4"
    >
      <p class="text-sm font-medium text-stone-900">
        Recommended next step
      </p>
      <p class="mt-1 text-sm text-stone-600">
        {{ recommendedText }}
      </p>
    </div>

    <div class="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <div
        v-if="showTier1"
        class="flex h-full flex-col rounded-3xl border border-stone-200 bg-stone-50 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
      >
        <p class="text-xs font-medium uppercase tracking-[0.2em] text-stone-500">
          Tier 1
        </p>
        <h4 class="mt-3 text-2xl font-semibold text-stone-900">
          Single Story
        </h4>
        <p class="mt-2 text-sm leading-6 text-stone-600">
          A simple written version of your story — clean, readable, and easy to keep digitally.
        </p>
        <p class="mt-3 text-xs text-stone-500">
          Best for: keeping a simple written memory
        </p>

        <div class="mt-6 flex items-end gap-1">
          <span class="text-4xl font-bold text-stone-900">£3.99</span>
        </div>

        <ul class="mt-6 space-y-3 text-sm text-stone-600">
          <li>• Unlock one story</li>
          <li>• PDF export included</li>
          <li>• Clean text-only format</li>
        </ul>

        <button
          class="cursor-pointer mt-auto w-full rounded-full bg-[#7C5C3B] hover:opacity-90 transition px-4 py-3 text-sm font-medium text-white transition hover:opacity-90"
          @click="$emit('tier1')"
        >
          Unlock my story
        </button>
      </div>

      <div
        v-if="showTier2"
        class="relative flex h-full flex-col rounded-3xl border-2 border-stone-900 bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
      >
        <div class="absolute -top-3 left-6 rounded-full bg-stone-900 px-3 py-1 text-xs font-medium text-white">
          Most popular
        </div>

        <p class="text-xs font-medium uppercase tracking-[0.2em] text-stone-500">
          Tier 2
        </p>
        <h4 class="mt-3 text-2xl font-semibold text-stone-900">
          Single Story + Images
        </h4>
        <p class="mt-2 text-sm leading-6 text-stone-600">
          Add photos to your story and bring your memories to life with visual moments.
        </p>
        <p class="mt-3 text-xs text-stone-500">
          Best for: adding photos to your story
        </p>

        <div class="mt-6 flex items-end gap-1">
          <span class="text-4xl font-bold text-stone-900">£7.99</span>
        </div>

        <p class="mt-2 text-sm leading-6 text-stone-600">
          Best for turning one meaningful story into a more emotional, photo-rich keepsake.
        </p>

        <ul class="mt-6 space-y-3 text-sm text-stone-600">
          <li>• Unlock one story</li>
          <li>• PDF export with images</li>
          <li>• More personal and emotional</li>
        </ul>

        <button
          class="cursor-pointer mt-auto w-full rounded-full bg-[#7C5C3B] hover:opacity-90 transition px-4 py-3 text-sm font-medium text-white transition hover:opacity-90"
          @click="$emit('tier2')"
        >
          {{ tier2ButtonText }}
        </button>
      </div>

      <div
        v-if="showTier3"
        class="flex h-full flex-col rounded-3xl border border-stone-200 bg-stone-50 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
      >
        <p class="text-xs font-medium uppercase tracking-[0.2em] text-stone-500">
          Tier 3
        </p>
        <h4 class="mt-3 text-2xl font-semibold text-stone-900">
          All Stories
        </h4>
        <p class="mt-2 text-sm leading-6 text-stone-600">
          Create multiple stories for different people — perfect for families and gifts.
        </p>
        <p class="mt-3 text-xs text-stone-500">
          Best for: creating multiple stories
        </p>

        <div class="mt-6 flex items-end gap-1">
          <span class="text-4xl font-bold text-stone-900">£11.99</span>
        </div>

        <ul class="mt-6 space-y-3 text-sm text-stone-600">
          <li>• Unlock all story types</li>
          <li>• Text-only PDF exports</li>
          <li>• Ideal for multiple books</li>
        </ul>

        <button
          class="cursor-pointer mt-auto w-full rounded-full bg-[#7C5C3B] hover:opacity-90 transition px-4 py-3 text-sm font-medium text-white transition hover:opacity-90"
          @click="$emit('tier3')"
        >
          {{ tier3ButtonText }}
        </button>
      </div>

      <div
        v-if="showTier4"
        class="flex h-full flex-col rounded-3xl border border-stone-200 bg-stone-50 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
      >
        <div class="absolute -top-3 left-6 rounded-full bg-stone-900 px-3 py-1 text-xs font-medium text-white">
          Best Value
        </div>

        <p class="text-xs font-medium uppercase tracking-[0.2em] text-stone-500">
          Tier 4
        </p>
        <h4 class="mt-3 text-2xl font-semibold text-stone-900">
          Premium Keepsake
        </h4>
        <p class="mt-2 text-sm leading-6 text-stone-600">
          Transform your story into a beautifully designed keepsake with premium layouts, cover design, and a finished book feel.
        </p>
        <p class="mt-3 text-xs text-stone-500">
          Best for: creating a meaningful keepsake or gift
        </p>

        <div class="mt-6 flex items-end gap-1">
          <span class="text-4xl font-bold text-stone-900">£17.99</span>
        </div>

        <p class="mt-2 text-sm leading-6 text-stone-600">
          Designed for stories that deserve a more polished, gift-worthy, keepsake-style finish.
        </p>

        <ul class="mt-6 space-y-3 text-sm text-stone-600">
          <li>• Unlock all story types</li>
          <li>• Designed keepsake exports with images</li>
          <li>• Portrait Book and Open Spread formats</li>
          <li>• Premium layouts, cover design, and styling</li>
        </ul>

        <button
          class="cursor-pointer mt-auto w-full rounded-full bg-[#7C5C3B] hover:opacity-90 transition px-4 py-3 text-sm font-medium text-white transition hover:opacity-90"
          @click="$emit('tier4')"
        >
          {{ tier4ButtonText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
    const props = defineProps<{
    upgradeMessage: string
    recommendedText: string
    showTier1: boolean
    showTier2: boolean
    showTier3: boolean
    showTier4: boolean
    tier2ButtonText: string
    tier3ButtonText: string
    tier4ButtonText: string
    }>()

    defineEmits<{
    (e: 'tier1'): void
    (e: 'tier2'): void
    (e: 'tier3'): void
    (e: 'tier4'): void
    }>()
</script>