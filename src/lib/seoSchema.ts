/**
 * src/lib/seoSchema.ts
 *
 * One place that builds the JSON-LD blocks pages hand to useSeo().
 *
 * WHY A HELPER RATHER THAN SCHEMA IN EACH VIEW
 *
 * There are 30 pages with no page-level schema and about 25 of them are real
 * content. Pasting a literal block into each one means 25 copies of the same
 * shape, and the first time a price changes they all drift. Prices here come
 * from printPricing, so a schema can never advertise a figure you no longer
 * charge — which matters more than it sounds, because Google puts that figure
 * in the search result where a customer reads it before they reach the site.
 *
 * useSeo() writes exactly ONE <script type="application/ld+json"> per page
 * (SCHEMA_ID in useSeo.ts), so a page needing two types passes graph(...)
 * rather than calling useSeo twice.
 *
 * Only ever describe what is genuinely on the page. FAQPage for FAQs the
 * visitor can actually read; Product on pages that actually present the
 * product and its prices. Schema that describes content a human cannot find
 * is what manual actions are for.
 */

import { BINDING_CONFIGS } from './printPricing'

const SITE_URL = 'https://tellmeyourstory.uk'

/**
 * Cheapest digital tier. Keep in step with PricingView's tier1 — there is no
 * single constant for it yet, and inventing one here would just move the
 * drift rather than remove it.
 */
export const DIGITAL_FROM_PRICE = 3.99

export interface Faq {
  q: string
  a: string
}

/**
 * FAQPage.
 *
 * Pass the same array the template renders. If a page has no visible FAQs it
 * does not get FAQPage schema — write the FAQs first, which is worth doing
 * anyway because they answer the objections that stop people buying.
 */
export function faqPageSchema(faqs: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

/** Highest price anywhere in the print brackets, read rather than remembered. */
function highestPrintPrice(): number {
  return BINDING_CONFIGS.reduce((max, binding) => {
    const bindingMax = binding.brackets.reduce((m, b) => Math.max(m, b.price), 0)
    return Math.max(max, bindingMax)
  }, 0)
}

/** How many distinct things somebody could actually buy. */
function offerCount(): number {
  const digitalTiers = 4 // £3.99, £7.99, £11.99, £17.99 — see PricingView
  const printOptions = BINDING_CONFIGS.reduce((n, b) => n + b.brackets.length, 0)
  return digitalTiers + printOptions
}

/**
 * Product with an AggregateOffer, for the commercial landing pages.
 *
 * Deliberately carries NO aggregateRating. Review stars in search results are
 * tempting and the penalty for self-declared ones you cannot evidence is a
 * manual action. The real reviews are on Trustpilot where they belong.
 */
export function productSchema(opts: { path: string; description: string; name?: string }) {
  const url = `${SITE_URL}${opts.path}`

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: opts.name ?? 'Tell Me Your Story — life story keepsake book',
    description: opts.description,
    url,
    brand: { '@type': 'Brand', name: 'Tell Me Your Story' },
    offers: {
      '@type': 'AggregateOffer',
      url,
      priceCurrency: 'GBP',
      lowPrice: DIGITAL_FROM_PRICE.toFixed(2),
      highPrice: highestPrintPrice().toFixed(2),
      offerCount: offerCount(),
      availability: 'https://schema.org/InStock',
    },
  }
}

/**
 * Several types on one page.
 *
 * useSeo writes a single script tag, so two schemas go in one @graph rather
 * than two calls — the second call would simply overwrite the first.
 */
export function graph(...nodes: Array<Record<string, unknown>>) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes.map(({ '@context': _context, ...rest }) => rest),
  }
}
