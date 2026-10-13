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
 *   so those never receive the homepage's HTML. The copy written to disk gets a
 *   noindex meta, so those routes stop showing up in Search Console as
 *   duplicates of the homepage.
 * - Each page is CHECKED, and a page that fails its checks FAILS THE BUILD.
 *   This is the important part: a Vue component that throws during setup still
 *   produces a page with a header and footer, a canonical, and a correct
 *   data-seo-path. It looks fine to a naive check and is worthless to Google.
 *   That is exactly how /questions-to-ask-your-grandparents shipped broken.
 *
 * Usage:  vite build && node scripts/prerender.mjs
 * Env:    PRERENDER_ALLOW_FAILURES=1  → report problems but exit 0 anyway
 *         PRERENDER_MIN_WORDS=120     → word floor below which a page warns
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

const ALLOW_FAILURES = process.env.PRERENDER_ALLOW_FAILURES === '1'
const MIN_WORDS = Number(process.env.PRERENDER_MIN_WORDS || 120)

const NOINDEX_META = '<meta name="robots" content="noindex, follow">'

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

function titleOf(html) {
  return (String(html).match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? '').trim()
}

/** The shell must never carry noindex while we render real pages from it. */
function stripNoindex(html) {
  return String(html).replace(/\s*<meta\s+name=["']robots["'][^>]*noindex[^>]*>/gi, '')
}

/** The copy Vercel serves for unmatched routes should not be indexable. */
function addNoindex(html) {
  const clean = stripNoindex(html)
  return clean.includes('<head>')
    ? clean.replace('<head>', `<head>\n    ${NOINDEX_META}`)
    : clean
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

  // A previous run may have written the noindex copy over it; serve it clean.
  return stripNoindex(await readFile(SHELL_FILE, 'utf-8'))
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

/**
 * We deliberately abort image/font/media requests to keep rendering fast. A
 * page with a <video> or <audio> element then throws a NetworkError that has
 * nothing to do with the page being broken — /help does exactly this. So the
 * aborts are counted, and network-shaped errors are only treated as noise when
 * we actually caused some.
 */
const NETWORK_ERROR = /NetworkError|Failed to fetch|Load failed|ERR_ABORTED|ERR_FAILED|net::/i

async function newPage(browser) {
  const page = await browser.newPage()
  const aborted = []
  // Tell the app it's being prerendered (read in src/main.ts).
  await page.evaluateOnNewDocument(() => {
    window.__TMYS_PRERENDER__ = true
  })
  await page.setRequestInterception(true)
  page.on('request', (req) => {
    if (['image', 'font', 'media'].includes(req.resourceType())) {
      aborted.push(req.url())
      req.abort()
    } else {
      req.continue()
    }
  })
  page.__abortedRequests = aborted
  return page
}

async function getRoutes(browser) {
  const page = await newPage(browser)
  const problems = []
  page.on('pageerror', (err) => problems.push(`JS error: ${err.message}`))
  page.on('console', (msg) => {
    if (msg.type() === 'error') problems.push(`console: ${msg.text()}`)
  })
  page.on('requestfailed', (req) => {
    if (!['image', 'font', 'media'].includes(req.resourceType())) {
      problems.push(`request failed: ${req.url()} (${req.failure()?.errorText})`)
    }
  })

  try {
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle0', timeout: NAV_TIMEOUT })
    await page.waitForFunction(() => Array.isArray(window.__TMYS_PRERENDER_ROUTES__), {
      timeout: SEO_TIMEOUT,
    })
    const routes = await page.evaluate(() => window.__TMYS_PRERENDER_ROUTES__)
    return routes.map((r) => normalisePath(r))
  } catch (err) {
    const state = await page
      .evaluate(() => ({
        prerenderFlag: window.__TMYS_PRERENDER__ === true,
        appMounted: !!document.querySelector('#app')?.children.length,
      }))
      .catch(() => ({}))
    console.error('\n  ✗ Could not read the route list from the app.')
    console.error(`    prerender flag set: ${state.prerenderFlag}, app mounted: ${state.appMounted}`)
    if (problems.length) {
      console.error('    Problems on the page:')
      for (const p of problems.slice(0, 10)) console.error(`      - ${p}`)
    } else {
      console.error('    No page errors — check src/main.ts is the new version (it sets __TMYS_PRERENDER_ROUTES__).')
    }
    throw err
  } finally {
    await page.close()
  }
}

// ─── Render one route ─────────────────────────────────────────────────────────

async function renderRoute(browser, route, shellTitle) {
  const page = await newPage(browser)
  const jsErrors = []
  page.on('pageerror', (err) => jsErrors.push(err.message))

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
      const text = (document.body?.innerText || '').trim()
      return {
        title: document.title,
        canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? null,
        robots: document.querySelector('meta[name="robots"]')?.getAttribute('content') ?? '',
        description: document.querySelector('meta[name="description"]')?.getAttribute('content') ?? '',
        h1: document.querySelector('h1')?.textContent?.trim() ?? '',
        h1Count: document.querySelectorAll('h1').length,
        words: text ? text.split(/\s+/).length : 0,
      }
    })

    const html = await page.content()
    const outputDir = route === '/' ? DIST_DIR : join(DIST_DIR, route)
    await mkdir(outputDir, { recursive: true })
    await writeFile(join(outputDir, 'index.html'), html, 'utf-8')

    // ── Checks ───────────────────────────────────────────────────────────────
    // Fatal = the page is not fit to be indexed. These stop the build.
    const fatal = []
    const warnings = []

    // Errors we provoked by aborting media don't count against the page.
    const selfInflicted = page.__abortedRequests.length > 0
    const realErrors = jsErrors.filter((e) => !(selfInflicted && NETWORK_ERROR.test(e)))
    const noiseErrors = jsErrors.filter((e) => !realErrors.includes(e))

    if (realErrors.length) {
      // The one that matters most. A component that throws during setup leaves
      // the layout standing, so every other signal still looks healthy.
      fatal.push(`JS error during render: ${realErrors.slice(0, 2).join(' | ')}`)
    }
    if (noiseErrors.length) {
      warnings.push(`${noiseErrors.length} network error(s) from aborted media — expected on pages with video or audio`)
    }
    if (!head.h1) {
      fatal.push('no <h1> — the view almost certainly failed to mount')
    }
    if (route !== '/' && shellTitle && head.title === shellTitle) {
      fatal.push(`title is still the shell's ("${shellTitle}") — this view's useSeo() never ran`)
    }
    if (head.canonical !== canonicalUrl(route)) {
      fatal.push(`canonical is ${head.canonical} (expected ${canonicalUrl(route)}) — remove the canonical: option from this view's useSeo()`)
    }
    if (head.robots.includes('noindex')) {
      fatal.push('page is noindex but is being prerendered')
    }

    if (head.h1Count > 1) warnings.push(`${head.h1Count} <h1> elements`)
    if (head.words < MIN_WORDS) warnings.push(`only ${head.words} words of text`)
    if (!head.description) warnings.push('no meta description')
    if (head.title.length > 60) warnings.push(`title is ${head.title.length} chars — Google truncates past ~60`)
    if (head.description.length > 160) warnings.push(`meta description is ${head.description.length} chars`)

    return { route, ok: true, title: head.title, description: head.description, words: head.words, fatal, warnings }
  } catch (err) {
    return { route, ok: false, error: err.message, fatal: [err.message], warnings: [] }
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
  const shellTitle = titleOf(shell)
  const server = await startServer(shell)
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
  })

  const results = []

  try {
    const routes = await getRoutes(browser)
    console.log(`  Found ${routes.length} public routes in the router\n`)

    // Simple worker pool
    const queue = [...routes]
    const workers = Array.from({ length: CONCURRENCY }, async () => {
      while (queue.length) {
        const route = queue.shift()
        const result = await renderRoute(browser, route, shellTitle)
        results.push(result)
        if (!result.ok) {
          console.error(`  ✗ ${route} — ${result.error}`)
        } else if (result.fatal.length) {
          console.error(`  ✗ ${route}`)
        } else {
          console.log(`  ✓ ${route}${result.warnings.length ? '  ⚠' : ''}`)
        }
      }
    })
    await Promise.all(workers)

    // Duplicate titles and descriptions are cross-page problems, so they're
    // judged after everything has rendered.
    const healthy = results.filter((r) => r.ok && !r.fatal.length)
    const byTitle = new Map()
    for (const r of healthy) byTitle.set(r.title, [...(byTitle.get(r.title) ?? []), r.route])
    for (const [title, rs] of byTitle) {
      if (rs.length > 1) {
        for (const r of healthy.filter((x) => rs.includes(x.route))) {
          r.fatal.push(`duplicate title "${title}" — also on ${rs.filter((p) => p !== r.route).join(', ')}`)
        }
      }
    }

    const byDesc = new Map()
    for (const r of healthy) {
      if (!r.description) continue
      byDesc.set(r.description, [...(byDesc.get(r.description) ?? []), r.route])
    }
    for (const [, rs] of byDesc) {
      if (rs.length > 1) {
        for (const r of healthy.filter((x) => rs.includes(x.route))) {
          r.warnings.push(`duplicate meta description — also on ${rs.filter((p) => p !== r.route).join(', ')}`)
        }
      }
    }

    // Only pages that passed every fatal check belong in the sitemap.
    const indexable = results.filter((r) => r.ok && !r.fatal.length)
    await writeSitemap(indexable.map((r) => r.route))

    // Vercel serves this for routes we didn't prerender. Keep it out of the index.
    await writeFile(SHELL_FILE, addNoindex(shell), 'utf-8')

    const warned = indexable.filter((r) => r.warnings.length)
    if (warned.length) {
      console.log('\n  ⚠ Warnings (not blocking):')
      for (const r of warned) {
        for (const w of r.warnings) console.log(`    ${r.route}: ${w}`)
      }
    }

    const broken = results.filter((r) => r.fatal.length)
    if (broken.length) {
      console.error('\n  ✗ BROKEN PAGES — these are excluded from the sitemap:')
      for (const r of broken) {
        for (const f of r.fatal) console.error(`    ${r.route}: ${f}`)
      }
    }

    console.log(
      `\n  Done: ${indexable.length} indexable, ${broken.length} broken, sitemap has ${indexable.length} URLs\n`,
    )

    if (broken.length) {
      if (ALLOW_FAILURES) {
        console.warn('  PRERENDER_ALLOW_FAILURES=1 — continuing despite the above.\n')
      } else {
        console.error('  Build failed. Fix the pages above, or set PRERENDER_ALLOW_FAILURES=1 to ship anyway.\n')
        process.exitCode = 1
      }
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
