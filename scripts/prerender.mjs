/**
 * scripts/prerender.mjs
 *
 * Prerenders SEO pages to static HTML after `vite build`.
 * Vercel serves these as static HTML — no JS execution needed by crawlers.
 *
 * Usage:  vite build && node scripts/prerender.mjs
 *
 * How it works:
 *   1. Starts a local static server from dist/
 *   2. Puppeteer visits each SEO route
 *   3. Waits for Vue to render, extracts the HTML
 *   4. Writes it to dist/<route>/index.html
 *   5. Vercel serves these static files first, SPA handles the rest
 */

import { readdir, writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import { resolve, join } from 'path'
import { createServer } from 'http'
import handler from 'serve-handler'
import puppeteer from 'puppeteer'

// ─── Config ───────────────────────────────────────────────────────────────────

const DIST_DIR = resolve('dist')
const PORT = 4173
const BASE_URL = `http://localhost:${PORT}`

// All your SEO routes — add new ones here as you publish them
const SEO_ROUTES = [
  '/',
  '/pricing',
  '/example-story',
  '/life-story-questions',
  '/life-story-journal',
  '/questions-about-childhood',
  '/questions-to-ask-elderly-parents',
  '/questions-to-ask-your-mum',
  '/questions-to-ask-your-dad',
  '/blog-questions',
  '/fathers-day',
  '/fathers-day-gift-grandad',
  '/christmas',
  '/legacy-letter-to-children',
  '/storykeeper-review',
  '/storykeeper-alternative',
  '/storykeeper-vs-storyworth',
  '/storyworth-alternative',
  '/storyworth-vs-tellmeyourstory',
  '/remento-review',
  '/remento-vs-tellmeyourstory',
  '/memory-book-vs-memory-box',
  '/end-of-life-questions-to-ask-parents',
  '/how-to-write-an-obituary',
  '/write-your-own-life-story',
  '/about',
  '/gift',
  '/how-it-works',
  // Add new SEO pages here as you create them
]

// ─── Static server ────────────────────────────────────────────────────────────

function startServer() {
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      return handler(req, res, {
        public: DIST_DIR,
        rewrites: [{ source: '**', destination: '/index.html' }],
      })
    })
    server.listen(PORT, () => {
      console.log(`  Preview server running on ${BASE_URL}`)
      resolve(server)
    })
  })
}

// ─── Prerender ────────────────────────────────────────────────────────────────

async function prerender() {
  console.log('\n🔨 Prerendering SEO pages...\n')

  if (!existsSync(DIST_DIR)) {
    console.error('  ✗ dist/ not found — run `vite build` first')
    process.exit(1)
  }

  const server = await startServer()
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  let rendered = 0
  let failed = 0

  for (const route of SEO_ROUTES) {
    try {
      const page = await browser.newPage()

      // Block unnecessary resources to speed up rendering
      await page.setRequestInterception(true)
      page.on('request', (req) => {
        const type = req.resourceType()
        if (['image', 'font', 'media'].includes(type)) {
          req.abort()
        } else {
          req.continue()
        }
      })

      const url = `${BASE_URL}${route}`
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 15000 })

      // Wait for Vue to finish rendering
      await page.waitForSelector('#app', { timeout: 5000 })
      // Small extra wait for any async component transitions
      await page.evaluate(() => new Promise(r => setTimeout(r, 500)))

      // Get the full rendered HTML
      const html = await page.content()

      // Write to dist/<route>/index.html
      const outputDir = route === '/'
        ? DIST_DIR
        : join(DIST_DIR, route)

      if (route !== '/') {
        await mkdir(outputDir, { recursive: true })
      }

      const outputFile = join(outputDir, 'index.html')
      await writeFile(outputFile, html, 'utf-8')

      console.log(`  ✓ ${route}`)
      rendered++
      await page.close()
    } catch (err) {
      console.error(`  ✗ ${route} — ${err.message}`)
      failed++
    }
  }

  await browser.close()
  server.close()

  console.log(`\n  Done: ${rendered} rendered, ${failed} failed`)
  console.log(`  Static HTML written to dist/\n`)
}

prerender()
