import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'
import { initPostHog } from './lib/posthog'
import { getCurrentUtmData } from './lib/utm'

window.addEventListener('error', (event) => {
  const target = event.target as HTMLElement | null

  if (
    target instanceof HTMLScriptElement &&
    target.src &&
    target.src.includes('/assets/')
  ) {
    const hasReloaded = sessionStorage.getItem('tmys-chunk-reload')

    if (!hasReloaded) {
      sessionStorage.setItem('tmys-chunk-reload', 'true')
      window.location.reload()
    }
  }
}, true)

window.addEventListener('unhandledrejection', (event) => {
  const reason = String(event.reason || '')

  if (
    reason.includes('Failed to fetch dynamically imported module') ||
    reason.includes('Importing a module script failed') ||
    reason.includes('dynamically imported module')
  ) {
    const hasReloaded = sessionStorage.getItem('tmys-chunk-reload')

    if (!hasReloaded) {
      sessionStorage.setItem('tmys-chunk-reload', 'true')
      window.location.reload()
    }
  }
})

initPostHog()

const utmData = getCurrentUtmData()

if (utmData) {
  posthog.capture('landing_with_utm', {
    ...utmData,
    landing_path: window.location.pathname,
    landing_url: window.location.href,
  })
}

createApp(App).use(router).mount('#app')

sessionStorage.removeItem('tmys-chunk-reload')