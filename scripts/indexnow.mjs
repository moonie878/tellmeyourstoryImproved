/**
 * scripts/indexnow.mjs
 *
 * Tells Bing (and DuckDuckGo, Ecosia, Yandex and the rest of the IndexNow
 * network) that pages have changed, instead of waiting to be crawled. Bing
 * last crawled some of your pages in July, so this is the difference between
 * days and months.
 *
 * Setup, once:
 *   1. Get a key from Bing Webmaster Tools -> IndexNow.
 *   2. Put it in public/<key>.txt, containing only the key.
 *   3. Deploy, and check https://tellmeyourstory.uk/<key>.txt loads.
 *   4. Put the key in .env as INDEXNOW_KEY (and in Vercel's env vars if you
 *      ever wire this into the build).
 *
 * Usage, AFTER a deploy has gone live:
 *   node scripts/indexnow.mjs            # only pages whose content changed
 *   node scripts/indexnow.mjs --all      # every URL in the sitemap
 *   node scripts/indexnow.mjs --dry      # print what it would send
 *
 * Run it after deploying, never during the build: submitting a URL before the
 * new version is live just gets the old one re-crawled.
 */

import { readFile } from 'fs/promises'
import { existsSync } from 'fs'
import { resolve, join } from 'path'

const SITE = 'https://tellmeyourstory.uk'
const HOST = 'tellmeyourstory.uk'
const ENDPOINT = 'https://api.indexnow.org/IndexNow'

const DIST = resolve('dist')
const SITEMAP = join(DIST, 'sitemap.xml')
const MANIFEST = resolve('scripts/sitemap-manifest.json')
const STATE = resolve('scripts/indexnow-state.json')

const ALL = process.argv.includes('--all')
const DRY = process.argv.includes('--dry')

const KEY = process.env.INDEXNOW_KEY
if (!KEY) {
  console.error('\n  INDEXNOW_KEY is not set. Put it in .env first.\n')
  process.exit(1)
}

const readJson = async (p, fallback) => {
  try {
    return JSON.parse(await readFile(p, 'utf-8'))
  } catch {
    return fallback
  }
}

async function sitemapUrls() {
  if (!existsSync(SITEMAP)) {
    console.error('  dist/sitemap.xml not found - run the build first.')
    process.exit(1)
  }
  const xml = await readFile(SITEMAP, 'utf-8')
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
}

/**
 * Only submit what actually changed. The prerender script's manifest already
 * knows this - it hashes each page's visible text. If you aren't using the
 * manifest, this falls back to a local record of what was last submitted.
 */
async function changedUrls(all) {
  const manifest = await readJson(MANIFEST, null)
  const state = await readJson(STATE, {})

  if (manifest) {
    const changed = all.filter((url) => {
      const path = url.replace(SITE, '') || '/'
      const entry = manifest[path]
      if (!entry) return true
      return state[path] !== entry.hash
    })
    const next = {}
    for (const [path, entry] of Object.entries(manifest)) next[path] = entry.hash
    return { urls: changed, nextState: next }
  }

  // No manifest: fall back to lastmod dates in the sitemap.
  const xml = await readFile(SITEMAP, 'utf-8')
  const entries = [...xml.matchAll(/<loc>([^<]+)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>/g)]
  if (!entries.length) return { urls: all, nextState: null }

  const changed = []
  const next = {}
  for (const [, url, lastmod] of entries) {
    const path = url.replace(SITE, '') || '/'
    next[path] = lastmod
    if (state[path] !== lastmod) changed.push(url)
  }
  return { urls: changed, nextState: next }
}

async function main() {
  const all = await sitemapUrls()
  let urls = all
  let nextState = null

  if (!ALL) {
    const result = await changedUrls(all)
    urls = result.urls
    nextState = result.nextState
  }

  if (!urls.length) {
    console.log('\n  Nothing has changed since the last submission.\n')
    return
  }

  console.log(`\n  Submitting ${urls.length} of ${all.length} URLs to IndexNow`)
  for (const u of urls.slice(0, 12)) console.log(`    ${u.replace(SITE, '') || '/'}`)
  if (urls.length > 12) console.log(`    ... and ${urls.length - 12} more`)

  if (DRY) {
    console.log('\n  --dry: nothing sent.\n')
    return
  }

  const body = {
    host: HOST,
    key: KEY,
    keyLocation: `${SITE}/${KEY}.txt`,
    urlList: urls.slice(0, 10000), // IndexNow caps a request at 10,000
  }

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  })

  // IndexNow answers with a status code and no useful body.
  const meaning = {
    200: 'Accepted. The URLs are queued.',
    202: 'Accepted, but the key is still being validated. Check the key file is live.',
    400: 'Bad request - the JSON or the key format is wrong.',
    403: 'Key rejected. The file at keyLocation does not match the key you sent.',
    422: 'URLs rejected - they do not all belong to the host you declared.',
    429: 'Too many requests. You are submitting too often; submit only what changed.',
  }
  console.log(`\n  HTTP ${res.status} - ${meaning[res.status] || 'Unexpected response.'}`)

  if (res.status === 200 || res.status === 202) {
    if (nextState) {
      const { writeFile } = await import('fs/promises')
      await writeFile(STATE, `${JSON.stringify(nextState, null, 2)}\n`, 'utf-8')
      console.log('  Recorded what was submitted in scripts/indexnow-state.json - commit it.\n')
    } else {
      console.log('')
    }
  } else {
    process.exitCode = 1
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
