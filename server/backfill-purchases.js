/*
 * backfill-purchases.js — import historical Stripe checkouts into `purchases`.
 *
 * Without this the admin page starts empty and only shows sales from the day
 * you deploy. Everything before that is sitting in Stripe.
 *
 * Run from the server directory, with the same .env the server uses:
 *
 *   node backfill-purchases.js --dry     # print what it would write
 *   node backfill-purchases.js           # actually write
 *
 * Safe to run more than once: rows are upserted on stripe_session_id, so a
 * second run updates rather than duplicates.
 */

const Stripe = require('stripe')
const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()

const DRY = process.argv.includes('--dry')

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
)

/** Orders from these addresses are ours, not sales. */
const TEST_EMAILS = (process.env.TEST_EMAILS || 'mark.b.griffiths@hotmail.com')
  .split(',').map((s) => s.trim().toLowerCase()).filter(Boolean)

function isTestOrder(session, amount) {
  const email = (session.customer_details?.email || session.metadata?.buyerEmail || '').toLowerCase()
  return amount === 0 || TEST_EMAILS.includes(email)
}

function classifyProduct(session) {
  const m = session.metadata || {}
  if (m.product === 'tribute-video') return 'tribute_video'
  if (m.purchaseType === 'gift')     return 'gift'
  if (m.purchaseType)                return m.purchaseType
  return 'other'
}

async function main() {
  const rows = []
  let scanned = 0

  // auto-pagination walks the whole history
  for await (const session of stripe.checkout.sessions.list({ limit: 100 })) {
    scanned++
    if (session.payment_status !== 'paid') continue

    const m = session.metadata || {}
    const amount = session.amount_total || 0

    rows.push({
      // Stripe's session `created` is close enough for historical rows; live
      // ones use the event time instead.
      paid_at: new Date(session.created * 1000).toISOString(),
      stripe_session_id: session.id,
      stripe_payment_intent:
        typeof session.payment_intent === 'string'
          ? session.payment_intent
          : session.payment_intent?.id || null,
      user_id: m.userId || null,
      email: session.customer_details?.email || m.buyerEmail || null,
      product:       classifyProduct(session),
      purchase_type: m.purchaseType || null,
      story_type:    m.storyType || null,
      variant:       m.variant || null,
      product_key:   m.productKey || null,
      subject_name:  m.subject_name || null,
      amount_minor:   amount,
      discount_minor: session.total_details?.amount_discount || 0,
      currency:       session.currency || 'gbp',
      is_test:        isTestOrder(session, amount),
      status:         'paid',
      raw:            m,
    })
  }

  const real = rows.filter((r) => !r.is_test)
  const gross = real.reduce((t, r) => t + r.amount_minor, 0) / 100

  console.log(`\nScanned ${scanned} Stripe sessions`)
  console.log(`Paid:    ${rows.length}  (${rows.length - real.length} zero-value tests)`)
  console.log(`Gross:   £${gross.toFixed(2)} across ${real.length} real sales\n`)

  const byProduct = {}
  for (const r of real) {
    byProduct[r.product] = byProduct[r.product] || { orders: 0, gross: 0 }
    byProduct[r.product].orders++
    byProduct[r.product].gross += r.amount_minor / 100
  }
  for (const [p, v] of Object.entries(byProduct)) {
    console.log(`  ${p.padEnd(18)} ${String(v.orders).padStart(4)} orders   £${v.gross.toFixed(2)}`)
  }

  if (DRY) {
    console.log('\n--dry: nothing written.\n')
    return
  }

  // Chunked so a large history doesn't go up as one enormous request.
  let written = 0
  for (let i = 0; i < rows.length; i += 200) {
    const batch = rows.slice(i, i + 200)
    const { error } = await supabaseAdmin
      .from('purchases')
      .upsert(batch, { onConflict: 'stripe_session_id' })
    if (error) {
      console.error('Batch failed:', error.message)
      process.exitCode = 1
      return
    }
    written += batch.length
    console.log(`  written ${written}/${rows.length}`)
  }
  console.log('\nDone.\n')
}

main().catch((err) => {
  console.error(err)
  process.exitCode = 1
})
