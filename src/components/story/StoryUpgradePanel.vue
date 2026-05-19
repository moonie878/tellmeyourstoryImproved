<template>
  <div class="rounded-2xl border border-stone-200 bg-white overflow-hidden">

    <!-- Collapsed state — always visible -->
    <div class="flex items-center justify-between px-5 py-4">
      <div class="flex items-center gap-3">
        <div class="flex h-8 w-8 items-center justify-center rounded-full bg-[#F5F0E8]">
          <span class="text-sm">⭐</span>
        </div>
        <div>
          <p class="text-sm font-medium text-stone-900">Turn your story into a keepsake</p>
          <p class="text-xs text-stone-500">From £3.99 · one-time payment · no subscription</p>
        </div>
      </div>
      <button
        @click="expanded = !expanded"
        class="flex-shrink-0 rounded-full border border-stone-200 px-3 py-1.5 text-xs font-medium text-stone-600 transition hover:bg-stone-50"
      >
        {{ expanded ? 'Hide' : 'See options' }}
      </button>
    </div>

    <!-- Expanded pricing cards -->
    <div v-if="expanded" class="border-t border-stone-100 px-5 pb-5">
      <div class="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">

        <!-- Tier 1 -->
        <div
          v-if="showTier1"
          class="flex flex-col rounded-2xl border border-stone-200 bg-stone-50 p-4 transition hover:border-stone-300"
        >
          <p class="text-[10px] font-medium uppercase tracking-wider text-stone-400">Single Story</p>
          <p class="mt-1 text-2xl font-bold text-stone-900">£3.99</p>
          <p class="mt-1.5 text-xs leading-5 text-stone-600">Text-only PDF · one story · clean and readable</p>
          <button
            @click="$emit('tier1')"
            class="mt-4 w-full rounded-full bg-stone-900 px-4 py-2 text-xs font-medium text-white transition hover:opacity-80"
          >
            Unlock my story
          </button>
        </div>

        <!-- Tier 2 -->
        <div
          v-if="showTier2"
          class="flex flex-col rounded-2xl border-2 border-stone-900 bg-white p-4 shadow-sm"
        >
          <div class="flex items-center justify-between">
            <p class="text-[10px] font-medium uppercase tracking-wider text-stone-400">Story + Images</p>
            <span class="rounded-full bg-stone-900 px-2 py-0.5 text-[10px] font-medium text-white">Popular</span>
          </div>
          <p class="mt-1 text-2xl font-bold text-stone-900">£7.99</p>
          <p class="mt-1.5 text-xs leading-5 text-stone-600">PDF with photos · one story · more personal</p>
          <button
            @click="$emit('tier2')"
            class="mt-4 w-full rounded-full bg-[#7C5C3B] px-4 py-2 text-xs font-medium text-white transition hover:opacity-90"
          >
            {{ tier2ButtonText }}
          </button>
        </div>

        <!-- Tier 3 -->
        <div
          v-if="showTier3"
          class="flex flex-col rounded-2xl border border-stone-200 bg-stone-50 p-4 transition hover:border-stone-300"
        >
          <p class="text-[10px] font-medium uppercase tracking-wider text-stone-400">All Stories</p>
          <p class="mt-1 text-2xl font-bold text-stone-900">£11.99</p>
          <p class="mt-1.5 text-xs leading-5 text-stone-600">Text PDFs · all story types · ideal for families</p>
          <button
            @click="$emit('tier3')"
            class="mt-4 w-full rounded-full bg-stone-900 px-4 py-2 text-xs font-medium text-white transition hover:opacity-80"
          >
            {{ tier3ButtonText }}
          </button>
        </div>

        <!-- Tier 4 -->
        <div
          v-if="showTier4"
          class="flex flex-col rounded-2xl border border-[#C4A882] bg-[#FAF7F4] p-4 transition hover:border-[#7C5C3B]"
        >
          <div class="flex items-center justify-between">
            <p class="text-[10px] font-medium uppercase tracking-wider text-[#9C7C5C]">Premium Keepsake</p>
            <span class="rounded-full bg-[#7C5C3B] px-2 py-0.5 text-[10px] font-medium text-white">Best value</span>
          </div>
          <p class="mt-1 text-2xl font-bold text-stone-900">£17.99</p>
          <p class="mt-1.5 text-xs leading-5 text-stone-600">Photos · premium layouts · cover design · all stories</p>
          <button
            @click="$emit('tier4')"
            class="mt-4 w-full rounded-full bg-[#7C5C3B] px-4 py-2 text-xs font-medium text-white transition hover:opacity-90"
          >
            {{ tier4ButtonText }}
          </button>
        </div>

      </div>
      <p class="mt-3 text-center text-[10px] text-stone-400">One-time payment · no subscription · download instantly</p>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

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

const expanded = ref(false)
</script>