<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 0 120 120">
    <rect x="4" y="4" width="112" height="112" rx="8" ry="8"
          fill="none" stroke="#C8A96A" stroke-width="3"/>
    <text x="50%" y="58%" dominant-baseline="middle" text-anchor="middle"
          font-family="Georgia, serif"
          font-size="72"
          fill="#C8A96A">
      {{ letter }}
    </text>
  </svg>
</template>

<script setup>
defineProps({
  letter: { type: String, default: 'A' },
  size: { type: Number, default: 120 }
})
</script>
