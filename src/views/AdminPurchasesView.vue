<template>
  <main class="admin-page">
    <div class="admin-inner">

      <header class="admin-head">
        <p class="eyebrow">Tell Me Your Story</p>
        <h1 class="title">Purchases</h1>
        <p class="sub" v-if="data">
          Figures exclude zero-value and test orders.
          <button class="link-btn" @click="toggleTests">
            {{ includeTests ? 'Hide' : 'Show' }} {{ data.testOrders }} test order{{ data.testOrders === 1 ? '' : 's' }}
          </button>
        </p>
      </header>

      <p v-if="loading" class="state">Loading…</p>
      <p v-else-if="error" class="state state-error">{{ error }}</p>

      <template v-else-if="data">
        <!-- Headline numbers -->
        <section class="tiles">
          <div class="tile tile-lead">
            <p class="tile-label">All time</p>
            <p class="tile-value">{{ gbp(data.allTime.gross) }}</p>
            <p class="tile-note">{{ data.allTime.orders }} order{{ data.allTime.orders === 1 ? '' : 's' }}</p>
          </div>
          <div class="tile">
            <p class="tile-label">Last 30 days</p>
            <p class="tile-value">{{ gbp(data.last30.gross) }}</p>
            <p class="tile-note">{{ data.last30.orders }} order{{ data.last30.orders === 1 ? '' : 's' }}</p>
          </div>
          <div class="tile">
            <p class="tile-label">Last 7 days</p>
            <p class="tile-value">{{ gbp(data.last7.gross) }}</p>
            <p class="tile-note">{{ data.last7.orders }} order{{ data.last7.orders === 1 ? '' : 's' }}</p>
          </div>
          <div class="tile">
            <p class="tile-label">Average order</p>
            <p class="tile-value">{{ gbp(averageOrder) }}</p>
            <p class="tile-note">across all time</p>
          </div>
        </section>

        <!-- By product -->
        <section class="panel">
          <h2 class="panel-title">By product</h2>
          <div class="scroller">
            <table class="grid">
              <thead>
                <tr>
                  <th class="fill">Product</th>
                  <th class="num">Orders</th>
                  <th class="num">Gross</th>
                  <th class="num">Share</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="p in data.byProduct" :key="p.product">
                  <td class="fill">{{ label(p.product) }}</td>
                  <td class="num">{{ p.orders }}</td>
                  <td class="num">{{ gbp(p.gross) }}</td>
                  <td class="num muted">{{ share(p.gross) }}</td>
                </tr>
                <tr v-if="!data.byProduct.length"><td colspan="4" class="muted">Nothing yet.</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- By month -->
        <section class="panel">
          <h2 class="panel-title">By month</h2>
          <div class="scroller">
            <table class="grid">
              <thead>
                <tr>
                  <th class="fill">Month</th>
                  <th class="num">Orders</th>
                  <th class="num">Gross</th>
                  <th class="bar-col"><span class="sr-only">Relative</span></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="m in data.byMonth" :key="m.month">
                  <td class="fill nowrap">{{ monthLabel(m.month) }}</td>
                  <td class="num">{{ m.orders }}</td>
                  <td class="num">{{ gbp(m.gross) }}</td>
                  <td class="bar-col">
                    <span class="bar" :style="{ width: barWidth(m.gross) }" />
                  </td>
                </tr>
                <tr v-if="!data.byMonth.length"><td colspan="4" class="muted">Nothing yet.</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- Recent -->
        <section class="panel">
          <h2 class="panel-title">Recent orders</h2>
          <div class="scroller">
            <table class="grid">
              <thead>
                <tr>
                  <th class="nowrap">When</th>
                  <th class="fill">Product</th>
                  <th>Who</th>
                  <th class="num">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="r in data.recent" :key="r.session">
                  <td class="nowrap muted">{{ dateLabel(r.paid_at) }}</td>
                  <td class="fill">
                    {{ label(r.product) }}
                    <span v-if="r.detail" class="muted"> · {{ r.detail }}</span>
                  </td>
                  <td class="muted email">{{ r.email || '—' }}</td>
                  <td class="num">
                    {{ gbp(r.amount) }}
                    <span v-if="r.discount > 0" class="muted discount">−{{ gbp(r.discount) }}</span>
                  </td>
                </tr>
                <tr v-if="!data.recent.length"><td colspan="4" class="muted">Nothing yet.</td></tr>
              </tbody>
            </table>
          </div>
        </section>
      </template>

    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { supabase } from '../lib/supabase'
import { useSeo } from '../composables/useSeo'

useSeo({
  title: 'Purchases | Tell Me Your Story',
  description: 'Internal.',
})

interface Summary {
  allTime: { orders: number; gross: number }
  last30:  { orders: number; gross: number }
  last7:   { orders: number; gross: number }
  byMonth:   { month: string; orders: number; gross: number }[]
  byProduct: { product: string; orders: number; gross: number }[]
  recent: {
    paid_at: string; product: string; amount: number; discount: number
    email: string | null; detail: string | null; session: string
  }[]
  testOrders: number
  includeTests: boolean
}

const data = ref<Summary | null>(null)
const loading = ref(true)
const error = ref('')
const includeTests = ref(false)

const PRODUCT_LABELS: Record<string, string> = {
  tribute_video: 'Tribute video',
  gift:          'Gift',
  single_text:   'Single story',
  single_images: 'Single story + photos',
  all_text:      'All stories',
  all_images:    'All stories + photos',
  other:         'Other',
}

const label = (p: string) => PRODUCT_LABELS[p] || p
const gbp = (n: number) =>
  new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(n || 0)

const dateLabel = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' })

const monthLabel = (ym: string) =>
  new Date(`${ym}-01T00:00:00Z`).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })

const averageOrder = computed(() => {
  const d = data.value
  if (!d || !d.allTime.orders) return 0
  return d.allTime.gross / d.allTime.orders
})

const share = (gross: number) => {
  const total = data.value?.allTime.gross || 0
  if (!total) return '—'
  return `${Math.round((gross / total) * 100)}%`
}

const barWidth = (gross: number) => {
  const peak = Math.max(...(data.value?.byMonth.map((m) => m.gross) || [0]), 0)
  if (!peak) return '0%'
  return `${Math.max(2, Math.round((gross / peak) * 100))}%`
}

async function load() {
  loading.value = true
  error.value = ''
  try {
    const { data: sessionData } = await supabase.auth.getSession()
    const token = sessionData.session?.access_token
    if (!token) { error.value = 'Please sign in.'; return }

    const url = `${import.meta.env.VITE_API_BASE_URL}/admin/purchases` +
                (includeTests.value ? '?includeTests=1' : '')
    const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } })

    if (res.status === 401 || res.status === 403) { error.value = 'Not available.'; return }
    if (!res.ok) throw new Error(`Request failed (${res.status})`)

    data.value = await res.json()
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Could not load purchases.'
  } finally {
    loading.value = false
  }
}

function toggleTests() {
  includeTests.value = !includeTests.value
  load()
}

onMounted(load)
</script>

<style scoped>
/* overflow-x:hidden here, and max-width on .scroller below, keep a wide table
   scrolling INSIDE its panel instead of stretching the whole page sideways
   and clipping the tiles on a phone. */
.admin-page  { background: #F5F0E8; min-height: 100vh; font-family: 'DM Sans', system-ui, sans-serif; padding: 48px 20px 80px; overflow-x: hidden; }
.admin-inner { max-width: 880px; width: 100%; margin: 0 auto; }

.admin-head { margin-bottom: 28px; }
.eyebrow { font-size: 11px; font-weight: 500; letter-spacing: 0.22em; text-transform: uppercase; color: #9C7C5C; margin: 0 0 10px; }
.title   { font-family: 'Playfair Display', Georgia, serif; font-size: 2rem; font-weight: 700; color: #1C1917; margin: 0 0 6px; }
.sub     { font-size: 13px; color: #78716C; margin: 0; }

.link-btn { background: none; border: none; padding: 0; font: inherit; color: #7C5C3B; text-decoration: underline; cursor: pointer; }
.link-btn:hover { text-decoration: none; }

.state { font-size: 14px; color: #78716C; padding: 32px 0; }
.state-error { color: #DC2626; }

.tiles { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 28px; }
@media (min-width: 720px) { .tiles { grid-template-columns: repeat(4, 1fr); } }

.tile { background: white; border: 1px solid #E8DDD0; border-radius: 18px; padding: 18px; }
.tile-lead { background: #1C1917; border-color: #1C1917; }
.tile-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.12em; color: #A8A29E; margin: 0 0 8px; }
.tile-lead .tile-label { color: #9C7C5C; }
.tile-value { font-family: 'Playfair Display', Georgia, serif; font-size: 1.6rem; font-weight: 700; color: #1C1917; margin: 0; line-height: 1.1; }
.tile-lead .tile-value { color: #F5F0E8; }
.tile-note { font-size: 12px; color: #78716C; margin: 6px 0 0; }
.tile-lead .tile-note { color: #8C847E; }

.panel { background: white; border: 1px solid #E8DDD0; border-radius: 22px; padding: 22px; margin-bottom: 20px; }
.panel-title { font-family: 'Playfair Display', Georgia, serif; font-size: 1.1rem; font-weight: 700; color: #1C1917; margin: 0 0 10px; }

/* Narrow screens scroll the table rather than crushing the columns. */
.scroller { overflow-x: auto; max-width: 100%; -webkit-overflow-scrolling: touch; }

/*
  Every cell gets padding on BOTH sides. The first version zeroed padding-right
  on numeric cells and gave nothing any padding-left, so right-aligned columns
  ran straight into each other — the headers read "ORDERSGROSSSHARE".
*/
.grid { width: 100%; border-collapse: collapse; font-size: 13px; }
.grid th,
.grid td { padding: 11px 16px; }
.grid th:first-child,
.grid td:first-child { padding-left: 0; }
.grid th:last-child,
.grid td:last-child { padding-right: 0; }

.grid th {
  text-align: left; font-weight: 500; font-size: 11px;
  text-transform: uppercase; letter-spacing: 0.1em; color: #A8A29E;
  white-space: nowrap; padding-top: 0; border-bottom: 1px solid #F0EBE3;
}
.grid td { border-bottom: 1px solid #FAF7F4; color: #3C3530; vertical-align: top; }
.grid tbody tr:last-child td { border-bottom: none; }

/*
  width:99% on one column makes it absorb all the slack in an auto-layout
  table, which pushes the number columns hard to the right instead of leaving
  everything bunched against the left edge.
*/
.fill { width: 99%; }

.num { text-align: right; white-space: nowrap; font-variant-numeric: tabular-nums; }
.muted { color: #A8A29E; }
.nowrap { white-space: nowrap; }
/* Never break an address mid-domain — it reads as a typo. The .scroller
   handles narrow screens instead. */
.email { white-space: nowrap; min-width: 230px; }
.discount { margin-left: 6px; font-size: 11px; }

.bar-col { width: 160px; min-width: 120px; vertical-align: middle !important; }
.bar { display: block; height: 6px; border-radius: 100px; background: #C4A882; }

.sr-only {
  position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
  overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0;
}

@media (max-width: 640px) {
  .admin-page { padding: 32px 14px 64px; }
  .panel { padding: 18px 16px; border-radius: 18px; }
  .grid { font-size: 12.5px; }
  .grid th, .grid td { padding: 10px 12px; }
  .bar-col { display: none; }
}
</style>