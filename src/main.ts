import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'
import { initPostHog, posthog } from './lib/posthog'
import { getCurrentUtmData } from './lib/utm'
import { supabase } from './lib/supabase'
import { installSeo, isNoindexPath } from './composables/useSeo'

// scripts/prerender.mjs sets window.__TMYS_PRERENDER__ before the app loads.
// (navigator.webdriver alone isn't reliable — @sparticuz/chromium can hide it.)
// Skip analytics and server pings so builds don't pollute PostHog or wake servers.
const isPrerender =
  (window as unknown as { __TMYS_PRERENDER__?: boolean }).__TMYS_PRERENDER__ === true ||
  navigator.webdriver === true

// ─── Stale chunk recovery ────────────────────────────────────────────────────
// After a deploy, old tabs request chunk files that no longer exist.
// Reload at most once every 30s so a genuinely missing chunk can't loop forever.
const RELOAD_KEY = 'tmys-chunk-reload-at'

function isChunkLoadError(message: string): boolean {
  return (
    message.includes('Failed to fetch dynamically imported module') ||
    message.includes('Importing a module script failed') ||
    message.includes('dynamically imported module') ||
    message.includes('Loading chunk')
  )
}

function reloadOnce(targetUrl?: string) {
  const last = Number(sessionStorage.getItem(RELOAD_KEY) || 0)
  if (Date.now() - last < 30_000) return
  sessionStorage.setItem(RELOAD_KEY, String(Date.now()))
  if (targetUrl) window.location.assign(targetUrl)
  else window.location.reload()
}

window.addEventListener(
  'error',
  (event) => {
    const target = event.target as HTMLElement | null
    if (target instanceof HTMLScriptElement && target.src.includes('/assets/')) {
      reloadOnce()
    }
  },
  true,
)

window.addEventListener('unhandledrejection', (event) => {
  if (isChunkLoadError(String(event.reason || ''))) reloadOnce()
})

// Lazy route failed to load → reload straight into the page the user wanted.
router.onError((error, to) => {
  if (isChunkLoadError(String(error?.message || error))) {
    reloadOnce(to?.fullPath)
  }
})

// ─── SEO: per-route title, description, canonical, OG tags ──────────────────
installSeo(router)

// ─── Analytics ───────────────────────────────────────────────────────────────
if (!isPrerender) {
  initPostHog()

  const utmData = getCurrentUtmData()
  if (utmData) {
    posthog.capture('landing_with_utm', {
      ...utmData,
      landing_path: window.location.pathname,
      landing_url: window.location.href,
    })
  }
}

// ─── Warm-up pings ───────────────────────────────────────────────────────────
// Wake Supabase and Render so login/save is fast. Deferred to idle time so they
// don't compete with the first paint. Errors are intentionally swallowed.
function warmUpBackends() {
  supabase
    .from('story_projects')
    .select('id')
    .limit(1)
    .maybeSingle()
    .then(
      () => {},
      () => {},
    )

  const serverUrl = import.meta.env.VITE_SERVER_URL
  if (serverUrl) {
    fetch(`${serverUrl}/health`).catch(() => {})
  }
}

if (!isPrerender) {
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(warmUpBackends, { timeout: 3000 })
  } else {
    setTimeout(warmUpBackends, 1500)
  }
}

// ─── Prerender route list ────────────────────────────────────────────────────
// scripts/prerender.mjs reads this to know which pages to render and put in
// the sitemap, so the router is the single source of truth.
if (isPrerender) {
  const paths = router
    .getRoutes()
    .filter(
      (r) =>
        !r.redirect &&
        !r.path.includes(':') &&
        !r.meta.requiresAuth &&
        r.meta.prerender !== false &&
        !isNoindexPath(r.path),
    )
    .map((r) => r.path)
  ;(window as unknown as { __TMYS_PRERENDER_ROUTES__: string[] }).__TMYS_PRERENDER_ROUTES__ = [
    ...new Set(paths),
  ]
}

// ─── Mount ───────────────────────────────────────────────────────────────────
const app = createApp(App)
app.use(router)
router.isReady().then(() => app.mount('#app'))