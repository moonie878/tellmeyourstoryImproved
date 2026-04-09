import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'

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


createApp(App).use(router).mount('#app')

sessionStorage.removeItem('tmys-chunk-reload')