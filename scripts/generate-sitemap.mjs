// scripts/generate-sitemap.mjs
//
// Auto-generates public/sitemap.xml from src/router/index.ts so the sitemap
// can never drift out of sync with the actual routes again (no more manual
// copy-paste duplicates or stray slashes).
//
// Usage: node scripts/generate-sitemap.mjs
// Wired into `npm run build` via the "build" script in package.json.

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const ROUTER_FILE = path.join(ROOT, 'src/router/index.ts')
const OUTPUT_FILE = path.join(ROOT, 'public/sitemap.xml')
const SITE_URL = 'https://tellmeyourstory.uk'

// Routes that should never appear in the sitemap: anything dynamic
// (contains a ":" param), auth-gated app pages, utility/account flows,
// and redirects (Google should discover the redirect target directly,
// not the redirect path itself).
const EXCLUDE_EXACT = new Set([
  '/login',
  '/register',
  '/dashboard',
  '/account',
  '/forgot-password',
  '/reset-password',
  '/price',
  '/plan',
  '/plans',
  '/subscriptions',
  '/billing',
  '/questions-to-ask-your-parents', // redirect -> /blog/questions-to-ask-your-parents
])

// Trailing slash matters here: '/story/' must NOT match '/storykeeper-...'
// or '/storyworth-...' — those are real marketing pages, not the dynamic
// /story/:id editor route.
const EXCLUDE_PREFIXES = ['/story/', '/listen/', '/gift/redeem']

// Rough priority tiers — adjust freely, Google treats this as a weak hint
// at best, but it's still useful internal signal for "what matters most".
function priorityFor(routePath) {
  if (routePath === '/') return '1.0'
  if (routePath === '/pricing') return '0.9'
  if (/vs-|-alternative|-review/.test(routePath)) return '0.8' // comparison/review pages
  if (/gift|birthday|anniversary|christmas|fathers-day|mothers-day/.test(routePath)) return '0.7'
  if (/^\/blog\//.test(routePath)) return '0.6'
  if (/privacy|terms|cookies|contact|example/.test(routePath)) return '0.3'
  return '0.7'
}

function extractRoutePaths(source) {
  // Matches: path: '/something'   or   path: "/something"
  const matches = source.matchAll(/path:\s*['"]([^'"]+)['"]/g)
  const paths = new Set()
  for (const match of matches) {
    const routePath = match[1]
    if (routePath.includes(':')) continue // dynamic segment
    if (EXCLUDE_EXACT.has(routePath)) continue
    if (EXCLUDE_PREFIXES.some((prefix) => routePath.startsWith(prefix))) continue
    paths.add(routePath)
  }
  return [...paths].sort()
}

function buildSitemap(paths) {
  const today = new Date().toISOString().split('T')[0]
  const urlEntries = paths
    .map((routePath) => {
      const loc = `${SITE_URL}${routePath === '/' ? '/' : routePath}`
      return [
        '  <url>',
        `    <loc>${loc}</loc>`,
        `    <lastmod>${today}</lastmod>`,
        `    <priority>${priorityFor(routePath)}</priority>`,
        '  </url>',
      ].join('\n')
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>\n`
}

function main() {
  const source = fs.readFileSync(ROUTER_FILE, 'utf-8')
  const paths = extractRoutePaths(source)

  if (paths.length === 0) {
    console.error('No routes found — aborting sitemap generation (refusing to overwrite with an empty file).')
    process.exit(1)
  }

  const xml = buildSitemap(paths)
  fs.writeFileSync(OUTPUT_FILE, xml, 'utf-8')
  console.log(`Generated ${OUTPUT_FILE} with ${paths.length} URLs.`)
}

main()