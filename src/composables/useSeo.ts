import { onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import type { Router, RouteLocationNormalized } from 'vue-router'

// All SEO for the site lives in this one file:
//  - installSeo(router): call once in main.ts — sets correct tags on EVERY page
//  - useSeo({...}):      call in a view to override title/description/schema

export const SITE_URL = 'https://tellmeyourstory.uk'
const DEFAULT_IMAGE = `${SITE_URL}/images/example-story-hero-cover.jpg`
const DEFAULT_IMAGE_ALT = "Tell Me Your Story — capture a loved one's life story"

export interface SeoInput {
  title?: string
  description?: string
  image?: string
  imageAlt?: string
  /** Override the canonical path (e.g. '/pricing'). Defaults to the current route path. */
  canonicalPath?: string
  noindex?: boolean
  type?: 'website' | 'article'
}

declare module 'vue-router' {
  interface RouteMeta {
    seo?: SeoInput
    requiresAuth?: boolean
    /** Hide the site header, banner and footer (storyteller page) */
    bare?: boolean
    /** Set false to exclude a public route from prerender + sitemap. */
    prerender?: boolean
  }
}

const DEFAULTS = {
  title: 'Memory Book That Plays Their Voice | Tell Me Your Story UK',
  description:
    'A memory book with their voice inside. Answer guided questions by speaking or typing, then print a book with QR codes that play each story. No subscription.',
}

/**
 * Per-page defaults. Priority (lowest → highest):
 * DEFAULTS → PAGE_SEO → route.meta.seo → useSeo() in the view.
 */
const PAGE_SEO: Record<string, SeoInput> = {
  '/': {
    title: DEFAULTS.title,
    description: DEFAULTS.description,
  },
  '/pricing': {
    title: 'Pricing — Memory Book With Voice Recordings | Tell Me Your Story',
    description:
      'Start free with 5 questions. One-time payment, no subscription. Printed keepsake books with QR codes that play their voice.',
  },
  '/example': {
    title: 'Example Memory Book — Read and Hear a Real Story | Tell Me Your Story',
    description:
      'See a finished Tell Me Your Story keepsake: guided questions, answers, photos, and QR codes that play the storyteller’s voice.',
  },
  '/gift': {
    title: 'Give a Memory Book as a Gift | Tell Me Your Story',
    description:
      'Gift a parent or grandparent the chance to tell their story. They get a personal link, answer by speaking or typing, and you get a book with their voice inside.',
  },
  '/tribute': {
    title: 'Tribute Video Maker — Memorial Video With Music | Tell Me Your Story',
    description:
      'Create a memorial tribute video from up to 30 photos with music and a personal message. Preview free, download in full HD. No account needed.',
  },
  '/my-story': {
    title: 'Why I Built Tell Me Your Story | Our Story',
    description:
      'Tell Me Your Story was built by a Southampton dad who wanted his children to have a record of his voice and his stories.',
  },
  '/contact': {
    title: 'Contact | Tell Me Your Story',
    description: 'Get in touch with Tell Me Your Story — questions, printing, gifts or partnerships.',
  },
  '/help': {
    title: 'Help & Guides | Tell Me Your Story',
    description:
      'How to record answers, add photos, invite family, export your PDF and order a printed memory book.',
  },
  '/christmas-gifts-for-grandparents': {
    title: 'Christmas Gifts for Grandparents: A Book With Their Voice | Tell Me Your Story',
    description:
      'A Christmas gift grandparents will treasure: their life story in a printed book, with QR codes that play their voice. Order printed books by 3 December.',
  },
  '/blog/questions-to-ask-your-parents': {
    title: '100 Questions to Ask Your Parents Before It’s Too Late | Tell Me Your Story',
    description:
      'The questions to ask your mum and dad about childhood, love, work and life lessons — plus how to record their answers in their own voice.',
    type: 'article',
  },
}

/**
 * Private or thin routes that must never be indexed.
 * Adjust to match your real route paths.
 */
const NOINDEX_PREFIXES = [
  '/dashboard',
  '/account',
  '/login',
  '/register',
  '/reset-password',
  '/forgot-password',
  '/gift/redeem',
  '/auth',
  '/story',
  '/editor',
  '/listen',
  '/tell',
  '/checkout',
  '/success',
]

export function isNoindexPath(path: string): boolean {
  const p = normalisePath(path)
  return NOINDEX_PREFIXES.some((prefix) => p === prefix || p.startsWith(`${prefix}/`))
}

export function normalisePath(path: string): string {
  const clean = path.split('?')[0].split('#')[0]
  if (clean === '/' || clean === '') return '/'
  return clean.replace(/\/+$/, '')
}

export function canonicalUrl(path: string): string {
  const p = normalisePath(path)
  return p === '/' ? `${SITE_URL}/` : `${SITE_URL}${p}`
}

export function getPageSeo(path: string): SeoInput {
  return PAGE_SEO[normalisePath(path)] ?? {}
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string | undefined) {
  const all = document.head.querySelectorAll<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  all.forEach((el, i) => {
    if (i > 0) el.remove()
  })
  let el = all[0]
  if (!content) {
    el?.remove()
    return
  }
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel: string, href: string) {
  const all = document.head.querySelectorAll<HTMLLinkElement>(`link[rel="${rel}"]`)
  all.forEach((el, i) => {
    if (i > 0) el.remove()
  })
  let el = all[0]
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export function applySeo(input: SeoInput, routePath: string) {
  const path = normalisePath(input.canonicalPath ?? routePath)
  const title = input.title ?? DEFAULTS.title
  const description = input.description ?? DEFAULTS.description
  const image = input.image ?? DEFAULT_IMAGE
  const imageAlt = input.imageAlt ?? DEFAULT_IMAGE_ALT
  const url = canonicalUrl(path)
  const noindex =
    input.noindex ?? isNoindexPath(path)

  document.title = title

  upsertMeta('name', 'description', description)
  upsertMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow')

  upsertLink('canonical', url)

  upsertMeta('property', 'og:title', title)
  upsertMeta('property', 'og:description', description)
  upsertMeta('property', 'og:url', url)
  upsertMeta('property', 'og:type', input.type ?? 'website')
  upsertMeta('property', 'og:image', image)
  upsertMeta('property', 'og:image:alt', imageAlt)

  upsertMeta('name', 'twitter:card', 'summary_large_image')
  upsertMeta('name', 'twitter:title', title)
  upsertMeta('name', 'twitter:description', description)
  upsertMeta('name', 'twitter:image', image)
  upsertMeta('name', 'twitter:image:alt', imageAlt)

  // Signal for the prerender script: head tags now match this path.
  // Uses the route path (not the canonical) so a page with a custom canonical
  // still signals it's ready.
  document.documentElement.setAttribute('data-seo-path', normalisePath(routePath))
}

function resolveRouteSeo(to: RouteLocationNormalized): SeoInput {
  return { ...getPageSeo(to.path), ...(to.meta.seo ?? {}) }
}

/**
 * Call once in main.ts before mounting. Runs on every navigation, before the
 * new view's setup(), so a view's useSeo() always wins.
 */
export function installSeo(router: Router) {
  router.afterEach((to, _from, failure) => {
    if (failure) return
    applySeo(resolveRouteSeo(to), to.path)
  })
}

// ─── useSeo: per-view overrides ─────────────────────────────────────────────

/**
 * Same options as before, so existing views keep working unchanged.
 * `canonical` is now optional — it defaults to the current page's own URL.
 * Only pass it to point a page somewhere else (e.g. a duplicate page).
 */
type SeoOptions = {
  title?: string
  description?: string
  canonical?: string
  ogImage?: string
  ogImageAlt?: string
  schema?: object
  noindex?: boolean
  type?: 'website' | 'article'
}

const SCHEMA_ID = 'seo-page-schema'

/** Accepts 'https://tellmeyourstory.uk/pricing', '/pricing' or undefined. */
function toCanonicalPath(canonical?: string): string | undefined {
  if (!canonical) return undefined
  if (canonical.startsWith(SITE_URL)) return canonical.slice(SITE_URL.length) || '/'
  if (canonical.startsWith('/')) return canonical
  return undefined
}

function withoutUndefined<T extends object>(obj: T): Partial<T> {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined)) as Partial<T>
}

export function useSeo(options: SeoOptions) {
  // Must be called during setup — never inside a callback.
  const route = useRoute()
  const path = route.path

  const input: SeoInput = {
    ...getPageSeo(path),
    ...withoutUndefined({
      title: options.title,
      description: options.description,
      image: options.ogImage,
      imageAlt: options.ogImageAlt,
      canonicalPath: toCanonicalPath(options.canonical),
      noindex: options.noindex,
      type: options.type,
    }),
  }

  // Apply synchronously during setup so tags are correct before first render
  // (and before the prerender snapshot).
  applySeo(input, path)

  // Page-level JSON-LD. Reuse an existing tag (e.g. one baked in by the
  // prerender) instead of adding a duplicate on load.
  let schemaTag = document.getElementById(SCHEMA_ID) as HTMLScriptElement | null

  if (options.schema) {
    if (!schemaTag) {
      schemaTag = document.createElement('script')
      schemaTag.type = 'application/ld+json'
      schemaTag.id = SCHEMA_ID
      document.head.appendChild(schemaTag)
    }
    schemaTag.textContent = JSON.stringify(options.schema)
  } else {
    // Arriving on a page with no schema: clear any left over from a prerender.
    schemaTag?.remove()
    schemaTag = null
  }

  onUnmounted(() => {
    schemaTag?.remove()
    schemaTag = null
  })
}