<template>
  <div
    v-if="show"
    class="inline-flex items-center gap-2 rounded-full border border-[#E8DDD0] bg-white px-4 py-2"
  >
    <span class="inline-block h-1.5 w-1.5 rounded-full bg-[#B07D3A]"></span>
    <p class="text-xs font-medium text-stone-600">
      <template v-if="days > 0 && days <= 14">
        Only <strong class="text-stone-900">{{ days }} days</strong> left to order
        printed books for Christmas
      </template>
      <template v-else>
        Order printed books by
        <strong class="text-stone-900">{{ PRINT_CUTOFF_LABEL }}</strong>
        for Christmas delivery
      </template>
    </p>
  </div>
</template>

<script setup lang="ts">
import { PRINT_CUTOFF_LABEL, isChristmasSeason, daysUntilCutoff } from '../../lib/christmas'

const show = isChristmasSeason()
const days = daysUntilCutoff()
</script>