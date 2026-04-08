<template>
  <div ref="containerRef"></div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch } from 'vue'

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string
          callback?: (token: string) => void
          'expired-callback'?: () => void
          'error-callback'?: () => void
          theme?: 'light' | 'dark' | 'auto'
        }
      ) => string
      reset: (widgetId?: string) => void
      remove: (widgetId?: string) => void
    }
  }
}

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const containerRef = ref<HTMLElement | null>(null)
const widgetId = ref<string | null>(null)

const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY

function loadScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.turnstile) {
      resolve()
      return
    }

    const existing = document.querySelector(
      'script[src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"]'
    ) as HTMLScriptElement | null

    if (existing) {
      existing.addEventListener('load', () => resolve(), { once: true })
      existing.addEventListener('error', () => reject(new Error('Turnstile failed to load')), {
        once: true,
      })
      return
    }

    const script = document.createElement('script')
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
    script.async = true
    script.defer = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Turnstile failed to load'))
    document.head.appendChild(script)
  })
}

async function renderWidget() {
  if (!siteKey || !containerRef.value) return

  await loadScript()

  if (!window.turnstile || !containerRef.value) return

  widgetId.value = window.turnstile.render(containerRef.value, {
    sitekey: siteKey,
    theme: 'light',
    callback: (token: string) => {
      emit('update:modelValue', token)
    },
    'expired-callback': () => {
      emit('update:modelValue', '')
    },
    'error-callback': () => {
      emit('update:modelValue', '')
    },
  })
}

onMounted(() => {
  renderWidget()
})

onBeforeUnmount(() => {
  if (widgetId.value && window.turnstile) {
    window.turnstile.remove(widgetId.value)
  }
})

watch(
  () => props.modelValue,
  (value) => {
    if (!value && widgetId.value && window.turnstile) {
      window.turnstile.reset(widgetId.value)
    }
  }
)
</script>