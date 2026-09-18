/**
 * scripts/prerender.mjs
 *
 * After `vite build`, renders every public page to static HTML and writes
 * dist/sitemap.xml.
 *
 * - The page list comes from the router itself (window.__TMYS_PRERENDER_ROUTES__,
 *   set in main.ts), so there is no list to maintain here.
 * - The untouched Vite index.html is saved as dist/spa-shell.html. Vercel serves
 *   it for every route that isn't prerendered (dashboard, story editor, /listen…),
 *   so those never receive the homepage's HTML.
 * - Each page is checked: the head must have been updated for that path, and the
 *   canonical should point at itself.
 *
 * Usage:  vite build && node scripts/prerender.mjs
 * Env:    PRERENDER_ALLOW_FAILURES=1  → don't fail the build if a page errors
 */

import { readFile, writeFile, mkdir, copyFile } from 'fs/promises'
import { existsSync } from 'fs'
import { resolve, join, extname } from 'path'
import { createServer } from 'http'
import puppeteer from 'puppeteer-core'
import chromium from '@sparticuz/chromium'

// ─── Config ───────────────────────────────────────────────────────────────────

const SITE_URL = 'https://tellmeyourstory.uk'
const DIST_DIR = resolve('dist')
const SHELL_FILE = join(DIST_DIR, 'spa-shell.html')
const PORT = 4173
const BASE_URL = `http://localhost:${PORT}`
const CONCURRENCY = 4
const NAV_TIMEOUT = 30_000
const SEO_TIMEOUT = 10_000

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript',
  '.mjs': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.mp3': 'audio/mpeg',
  '.pdf': 'application/pdf',
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function normalisePath(path) {
  const clean = path.split('?')[0].split('#')[0]
  if (clean === '/' || clean === '') return '/'
  return clean.replace(/\/+$/, '')
}

function canonicalUrl(path) {
  const p = normalisePath(path)
  return p === '/' ? `${SITE_URL}/` : `${SITE_URL}${p}`
}

/**
 * Keep an untouched copy of Vite's index.html. On a rebuild without
 * `vite build`, dist/index.html is already the prerendered homepage, so reuse
 * the saved shell instead of copying the wrong file.
 */
async function prepareShell() {
  const indexPath = join(DIST_DIR, 'index.html')
  const indexHtml = await readFile(indexPath, 'utf-8')
  const alreadyPrerendered = indexHtml.includes('data-prerendered')

  if (!alreadyPrerendered) {
    await copyFile(indexPath, SHELL_FILE)
  } else if (!existsSync(SHELL_FILE)) {
    throw new Error('dist/index.html is already prerendered and no spa-shell.html exists — run `vite build` first')
  }

  return readFile(SHELL_FILE)
}

// ─── Static server ────────────────────────────────────────────────────────────
// Real files are served as-is. Every page URL gets the clean SPA shell —
// never a prerendered page — so one page's HTML can't leak into another.

function startServer(shell) {
  return new Promise((res) => {
    const server = createServer(async (req, reply) => {
      const urlPath = decodeURIComponent(req.url.split('?')[0])
      const ext = extname(urlPath)

      if (!ext) {
        reply.writeHead(200, { 'Content-Type': MIME_TYPES['.html'] })
        reply.end(shell)
        return
      }

      try {
        const data = await readFile(join(DIST_DIR, urlPath))
        reply.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' })
        reply.end(data)
      } catch {
        reply.writeHead(404)
        reply.end()
      }
    })

    server.listen(PORT, () => {
      console.log(`  Preview server on ${BASE_URL}`)
      res(server)
    })
  })
}

// ─── Page setup ───────────────────────────────────────────────────────────────

async function newPage(browser) {
  const page = await browser.newPage()
  await page.setRequestInterception(true)
  page.on('request', (req) => {
    if (['image', 'font', 'media'].includes(req.resourceType())) req.abort()
    else req.continue()
  })
  return page
}

async function getRoutes(browser) {
  const page = await newPage(browser)
  await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle0', timeout: NAV_TIMEOUT })
  await page.waitForFunction(() => Array.isArray(window.__TMYS_PRERENDER_ROUTES__), { timeout: SEO_TIMEOUT })
  const routes = await page.evaluate(() => window.__TMYS_PRERENDER_ROUTES__)
  await page.close()
  return routes.map(normalisePath)
}

// ─── Render one route ─────────────────────────────────────────────────────────

async function renderRoute(browser, route) {
  const page = await newPage(browser)
  const errors = []
  page.on('pageerror', (err) => errors.push(err.message))

  try {
    await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle0', timeout: NAV_TIMEOUT })

    // Wait until useSeo/installSeo has written this route's head tags.
    await page.waitForFunction(
      (expected) => document.documentElement.getAttribute('data-seo-path') === expected,
      { timeout: SEO_TIMEOUT },
      route,
    )

    // Let late view-level useSeo() calls and lazy CSS settle.
    await new Promise((r) => setTimeout(r, 300))

    const head = await page.evaluate(() => {
      document.documentElement.setAttribute('data-prerendered', 'true')
      return {
        title: document.title,
        canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? null,
        robots: document.querySelector('meta[name="robots"]')?.getAttribute('content') ?? '',
        h1: document.querySelector('h1')?.textContent?.trim() ?? '',
      }
    })

    const html = await page.content()
    const outputDir = route === '/' ? DIST_DIR : join(DIST_DIR, route)
    await mkdir(outputDir, { recursive: true })
    await writeFile(join(outputDir, 'index.html'), html, 'utf-8')

    const warnings = []
    if (head.canonical !== canonicalUrl(route)) {
      warnings.push(`canonical is ${head.canonical} (expected ${canonicalUrl(route)}) — remove the canonical: option from this view's useSeo()`)
    }
    if (head.robots.includes('noindex')) warnings.push('page is noindex but is being prerendered')
    if (!head.h1) warnings.push('no <h1> on the page')
    if (errors.length) warnings.push(`JS errors: ${errors.slice(0, 2).join(' | ')}`)

    return { route, ok: true, title: head.title, warnings }
  } catch (err) {
    return { route, ok: false, error: err.message }
  } finally {
    await page.close()
  }
}

// ─── Sitemap ──────────────────────────────────────────────────────────────────

async function writeSitemap(routes) {
  const today = new Date().toISOString().slice(0, 10)
  const urls = routes
    .sort((a, b) => (a === '/' ? -1 : b === '/' ? 1 : a.localeCompare(b)))
    .map(
      (r) => `  <url>\n    <loc>${canonicalUrl(r)}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`,
    )
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
  await writeFile(join(DIST_DIR, 'sitemap.xml'), xml, 'utf-8')
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function prerender() {
  console.log('\n🔨 Prerendering public pages...\n')

  if (!existsSync(join(DIST_DIR, 'index.html'))) {
    console.error('  ✗ dist/index.html not found — run `vite build` first')
    process.exit(1)
  }

  const shell = await prepareShell()
  const server = await startServer(shell)
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
  })

  let results = []

  try {
    const routes = await getRoutes(browser)
    console.log(`  Found ${routes.length} public routes in the router\n`)

    // Simple worker pool
    const queue = [...routes]
    const workers = Array.from({ length: CONCURRENCY }, async () => {
      while (queue.length) {
        const route = queue.shift()
        const result = await renderRoute(browser, route)
        results.push(result)
        if (result.ok) {
          console.log(`  ✓ ${route}${result.warnings.length ? '  ⚠' : ''}`)
        } else {
          console.error(`  ✗ ${route} — ${result.error}`)
        }
      }
    })
    await Promise.all(workers)

    const rendered = results.filter((r) => r.ok)
    await writeSitemap(rendered.map((r) => r.route))

    // Warnings summary
    const warned = rendered.filter((r) => r.warnings.length)
    if (warned.length) {
      console.log('\n  ⚠ Warnings:')
      for (const r of warned) {
        for (const w of r.warnings) console.log(`    ${r.route}: ${w}`)
      }
    }

    // Duplicate titles
    const byTitle = new Map()
    for (const r of rendered) byTitle.set(r.title, [...(byTitle.get(r.title) ?? []), r.route])
    const dupes = [...byTitle.entries()].filter(([, rs]) => rs.length > 1)
    if (dupes.length) {
      console.log('\n  ⚠ Duplicate titles (give each page its own useSeo title):')
      for (const [title, rs] of dupes) console.log(`    "${title}" → ${rs.join(', ')}`)
    }

    const failed = results.filter((r) => !r.ok)
    console.log(`\n  Done: ${rendered.length} rendered, ${failed.length} failed, sitemap has ${rendered.length} URLs\n`)

    if (failed.length && process.env.PRERENDER_ALLOW_FAILURES !== '1') {
      process.exitCode = 1
    }
  } finally {
    await browser.close()
    server.close()
  }
}

prerender().catch((err) => {
  console.error(err)
  process.exit(1)
})
