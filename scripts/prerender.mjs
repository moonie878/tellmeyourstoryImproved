/**
 * scripts/prerender.mjs
 *
 * Prerenders SEO pages to static HTML after `vite build`.
 * Zero external dependencies beyond puppeteer.
 *
 * Usage:  vite build && node scripts/prerender.mjs
 */

import { readFile, writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import { resolve, join, extname } from 'path'
import { createServer } from 'http'
import puppeteer from 'puppeteer-core'
import chromium from '@sparticuz/chromium'

// ─── Config ───────────────────────────────────────────────────────────────────

const DIST_DIR = resolve('dist')
const PORT = 4173
const BASE_URL = `http://localhost:${PORT}`

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
  '/my-story',
  '/how-it-works',
]

// ─── Minimal static server (no dependencies) ─────────────────────────────────

const MIME_TYPES = {
  '.html': 'text/html',
  '.js':   'application/javascript',
  '.css':  'text/css',
  '.json': 'application/json',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.svg':  'image/svg+xml',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
}

function startServer() {
  return new Promise((res) => {
    const server = createServer(async (req, reply) => {
      let filePath = join(DIST_DIR, req.url === '/' ? 'index.html' : req.url)

      // If path has no extension and isn't a file, serve index.html (SPA fallback)
      if (!extname(filePath)) {
        const withHtml = filePath + '.html'
        const withIndex = join(filePath, 'index.html')
        if (existsSync(withHtml)) filePath = withHtml
        else if (existsSync(withIndex)) filePath = withIndex
        else filePath = join(DIST_DIR, 'index.html')
      }

      try {
        const data = await readFile(filePath)
        const ext = extname(filePath)
        reply.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' })
        reply.end(data)
      } catch {
        // Fallback to index.html for SPA routes
        const fallback = await readFile(join(DIST_DIR, 'index.html'))
        reply.writeHead(200, { 'Content-Type': 'text/html' })
        reply.end(fallback)
      }
    })
    server.listen(PORT, () => {
      console.log(`  Preview server on ${BASE_URL}`)
      res(server)
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
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
  })

  let rendered = 0
  let failed = 0

  for (const route of SEO_ROUTES) {
    try {
      const page = await browser.newPage()

      await page.setRequestInterception(true)
      page.on('request', (req) => {
        if (['image', 'font', 'media'].includes(req.resourceType())) req.abort()
        else req.continue()
      })

      await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle0', timeout: 15000 })
      await page.waitForSelector('#app', { timeout: 5000 })
      await page.evaluate(() => new Promise(r => setTimeout(r, 500)))

      const html = await page.content()

      const outputDir = route === '/' ? DIST_DIR : join(DIST_DIR, route)
      if (route !== '/') await mkdir(outputDir, { recursive: true })

      await writeFile(join(outputDir, 'index.html'), html, 'utf-8')
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

  console.log(`\n  Done: ${rendered} rendered, ${failed} failed\n`)
}

prerender()
