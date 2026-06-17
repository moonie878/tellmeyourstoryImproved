<template>
  <div class="min-h-screen bg-stone-50 px-4 py-8 sm:px-6 md:py-12">
    <div class="mx-auto max-w-4xl space-y-6 sm:space-y-8">

      <!-- Header -->
      <div class="flex items-center justify-between">
        <div>
          <p class="text-xs font-medium uppercase tracking-[0.25em] text-stone-500">Account</p>
          <h1 class="mt-1 text-2xl font-bold text-stone-900 sm:text-3xl">Your profile</h1>
        </div>
        <button
          @click="router.push('/dashboard')"
          class="rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-100"
        >
          ← Dashboard
        </button>
      </div>

      <!-- Profile card -->
      <section class="overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-sm">
        <div class="grid gap-6 px-5 py-6 sm:px-8 sm:py-8 md:grid-cols-[auto_1fr_auto]">

          <!-- Avatar -->
          <div class="flex items-center justify-center md:justify-start">
            <div class="flex h-16 w-16 items-center justify-center rounded-full bg-[#7C5C3B] text-xl font-bold text-white">
              {{ userInitials }}
            </div>
          </div>

          <!-- Name + email -->
          <div class="text-center md:text-left">
            <h2 class="text-xl font-semibold text-stone-900">{{ userEmail }}</h2>
            <p class="mt-1 text-sm text-stone-500">Member since {{ memberSince }}</p>
            <div class="mt-3 inline-flex items-center gap-2 rounded-full px-3 py-1" :class="tierBadgeClass">
              <span class="text-xs font-semibold">{{ tierLabel }}</span>
            </div>
          </div>

          <!-- Sign out -->
          <div class="flex items-start justify-center md:justify-end">
            <button
              @click="signOut"
              class="rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-medium text-stone-600 transition hover:bg-stone-100"
            >
              Sign out
            </button>
          </div>
        </div>
      </section>

      <!-- Stats -->
      <section class="rounded-[2rem] border border-stone-200 bg-white p-5 shadow-sm sm:p-6 md:p-8">
        <p class="text-xs font-medium uppercase tracking-[0.25em] text-stone-500">Your activity</p>
        <h2 class="mt-2 text-xl font-bold text-stone-900">What you've created</h2>

        <div v-if="statsLoading" class="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          <div v-for="i in 6" :key="i" class="h-20 animate-pulse rounded-2xl bg-stone-100" />
        </div>

        <div v-else class="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          <div class="rounded-2xl bg-stone-50 p-5">
            <p class="text-3xl font-bold text-stone-900">{{ stats.stories }}</p>
            <p class="mt-1 text-sm text-stone-500">Stories created</p>
          </div>
          <div class="rounded-2xl bg-stone-50 p-5">
            <p class="text-3xl font-bold text-stone-900">{{ stats.questions }}</p>
            <p class="mt-1 text-sm text-stone-500">Questions answered</p>
          </div>
          <div class="rounded-2xl bg-stone-50 p-5">
            <p class="text-3xl font-bold text-stone-900">{{ stats.images }}</p>
            <p class="mt-1 text-sm text-stone-500">Images added</p>
          </div>
          <div class="rounded-2xl bg-stone-50 p-5">
            <p class="text-3xl font-bold text-stone-900">{{ stats.voices }}</p>
            <p class="mt-1 text-sm text-stone-500">Voice recordings</p>
          </div>
          <div class="rounded-2xl bg-stone-50 p-5">
            <p class="text-3xl font-bold text-stone-900">{{ stats.orders }}</p>
            <p class="mt-1 text-sm text-stone-500">Books ordered</p>
          </div>
          <div class="rounded-2xl bg-[#F5F0E8] p-5">
            <p class="text-3xl font-bold text-[#7C5C3B]">{{ stats.avgProgress }}%</p>
            <p class="mt-1 text-sm text-stone-500">Average story progress</p>
          </div>
        </div>
      </section>

      <!-- Orders -->
      <section class="rounded-[2rem] border border-stone-200 bg-white p-5 shadow-sm sm:p-6 md:p-8">
        <p class="text-xs font-medium uppercase tracking-[0.25em] text-stone-500">Orders</p>
        <h2 class="mt-2 text-xl font-bold text-stone-900">Print order history</h2>

        <div v-if="ordersLoading" class="mt-6 space-y-3">
          <div v-for="i in 2" :key="i" class="h-16 animate-pulse rounded-2xl bg-stone-100" />
        </div>

        <div v-else-if="orders.length === 0" class="mt-6 rounded-2xl border border-dashed border-stone-200 p-8 text-center">
          <p class="text-sm text-stone-500">No print orders yet.</p>
          <p class="mt-1 text-xs text-stone-400">When you order a printed book it will appear here.</p>
        </div>

        <div v-else class="mt-6 space-y-3">
          <div
            v-for="order in orders"
            :key="order.id"
            class="flex flex-col gap-3 rounded-2xl border border-stone-100 bg-stone-50 p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p class="text-sm font-semibold text-stone-900">{{ order.shipping_name }}</p>
              <p class="mt-0.5 text-xs text-stone-500">Ordered {{ formatDate(order.created_at) }} · £{{ order.amount_charged }}</p>
              <p v-if="order.estimated_ship_date" class="mt-0.5 text-xs text-stone-400">
                Est. ship date: {{ formatDate(order.estimated_ship_date) }}
              </p>
            </div>
            <div class="flex items-center gap-3">
              <span class="rounded-full px-3 py-1 text-xs font-medium" :class="orderStatusClass(order.status)">
                {{ formatOrderStatus(order.status) }}
              </span>
              <a
                v-if="order.tracking_url"
                :href="order.tracking_url"
                target="_blank"
                class="text-xs font-medium text-[#7C5C3B] hover:underline"
              >
                Track →
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Subscription -->
      <section class="rounded-[2rem] border border-stone-200 bg-white p-5 shadow-sm sm:p-6 md:p-8">
        <p class="text-xs font-medium uppercase tracking-[0.25em] text-stone-500">Subscription</p>
        <h2 class="mt-2 text-xl font-bold text-stone-900">Your plan</h2>

        <div class="mt-6 rounded-2xl border border-stone-100 bg-stone-50 p-5">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-base font-semibold text-stone-900">{{ tierLabel }}</p>
              <p class="mt-1 text-sm text-stone-500">{{ tierDescription }}</p>
            </div>
            <div class="rounded-full px-3 py-1 text-xs font-semibold" :class="tierBadgeClass">
              {{ tierLabel }}
            </div>
          </div>

          <div class="mt-5 space-y-2">
            <div
              v-for="feature in tierFeatures"
              :key="feature.label"
              class="flex items-center gap-2.5"
            >
              <span class="text-sm" :class="feature.included ? 'text-green-600' : 'text-stone-300'">
                {{ feature.included ? '✓' : '✗' }}
              </span>
              <span class="text-sm" :class="feature.included ? 'text-stone-700' : 'text-stone-400'">
                {{ feature.label }}
              </span>
            </div>
          </div>
        </div>

        <div v-if="!hasFullAccess" class="mt-4">
          <button
            @click="handleUpgradeClick"
            class="rounded-full bg-[#7C5C3B] px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
          >
            Upgrade your plan →
          </button>
        </div>
      </section>

      <!-- Danger zone -->
      <section class="rounded-[2rem] border border-red-100 bg-white p-5 shadow-sm sm:p-6 md:p-8">
        <p class="text-xs font-medium uppercase tracking-[0.25em] text-red-400">Account</p>
        <h2 class="mt-2 text-xl font-bold text-stone-900">Manage account</h2>
        <p class="mt-2 text-sm text-stone-500">Need to delete your account or have a question? Get in touch and we'll sort it out.</p>
        <a
          href="mailto:hello@tellmeyourstory.uk"
          class="mt-4 inline-block text-sm font-medium text-[#7C5C3B] hover:underline"
        >
          hello@tellmeyourstory.uk →
        </a>
      </section>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../lib/supabase'

const router = useRouter()

// ─── State ────────────────────────────────────────────────────────────────────

const userEmail    = ref('')
const userCreatedAt = ref('')
const userAccess   = ref<any[]>([])
const userProjects = ref<Array<{ id: string; title: string | null }>>([])
const orders       = ref<any[]>([])
const ordersLoading = ref(true)
const statsLoading  = ref(true)

const stats = ref({
  stories: 0,
  questions: 0,
  images: 0,
  voices: 0,
  orders: 0,
  avgProgress: 0,
})

// ─── Computed ─────────────────────────────────────────────────────────────────

const userInitials = computed(() => {
  if (!userEmail.value) return '?'
  return userEmail.value.slice(0, 2).toUpperCase()
})

const memberSince = computed(() => {
  if (!userCreatedAt.value) return ''
  return new Date(userCreatedAt.value).toLocaleDateString('en-GB', {
    month: 'long',
    year: 'numeric',
  })
})

const hasFullAccess = computed(() =>
  userAccess.value.some(a => a.access_type === 'story' && a.story_type === 'all')
)

const hasPrintAccess = computed(() =>
  userAccess.value.some(a => a.access_type === 'print' || a.variant === 'with_images')
)

const hasExportAccess = computed(() =>
  userAccess.value.some(a => a.access_type === 'export')
)

const tierLabel = computed(() => {
  if (hasFullAccess.value && hasPrintAccess.value) return 'Premium'
  if (hasFullAccess.value) return 'All Stories'
  if (hasExportAccess.value) return 'Export'
  return 'Free'
})

const tierDescription = computed(() => {
  if (hasFullAccess.value && hasPrintAccess.value)
    return 'Full access to all stories, exports, and printed books.'
  if (hasFullAccess.value)
    return 'Access to all story types and PDF exports.'
  if (hasExportAccess.value)
    return 'Access to export your story as a PDF.'
  return 'Free draft access. Upgrade to unlock exports and full stories.'
})

const tierBadgeClass = computed(() => {
  if (hasFullAccess.value && hasPrintAccess.value)
    return 'bg-stone-900 text-white'
  if (hasFullAccess.value)
    return 'bg-[#7C5C3B] text-white'
  if (hasExportAccess.value)
    return 'bg-amber-100 text-amber-700'
  return 'bg-stone-100 text-stone-600'
})

const tierFeatures = computed(() => [
  { label: 'Start and draft a story',         included: true },
  { label: 'Full story access (all chapters)', included: hasFullAccess.value },
  { label: 'PDF export',                       included: hasExportAccess.value || hasFullAccess.value },
  { label: 'Image export',                     included: hasPrintAccess.value || hasFullAccess.value },
  { label: 'Voice recordings',                 included: hasExportAccess.value || hasFullAccess.value },
  { label: 'Printed hardcover book',           included: hasPrintAccess.value },
  { label: 'True Book premium export',         included: hasPrintAccess.value },
])

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(value: string) {
  return new Date(value).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function formatOrderStatus(status: string) {
  const map: Record<string, string> = {
    CREATED:    'Order placed',
    ACCEPTED:   'Accepted',
    IN_PRODUCTION: 'In production',
    SHIPPED:    'Shipped',
    DELIVERED:  'Delivered',
    CANCELLED:  'Cancelled',
    ERROR:      'Error',
  }
  return map[status] || status
}

function orderStatusClass(status: string) {
  if (status === 'SHIPPED' || status === 'DELIVERED')
    return 'bg-green-100 text-green-700'
  if (status === 'CANCELLED' || status === 'ERROR')
    return 'bg-red-100 text-red-600'
  return 'bg-amber-100 text-amber-700'
}

// ─── Data fetching ────────────────────────────────────────────────────────────

function handleUpgradeClick() {
  if (userProjects.value.length === 0) {
    router.push('/dashboard')
    return
  }
  if (userProjects.value.length === 1) {
    router.push(`/story/${userProjects.value[0].id}`)
    return
  }
  // Multiple projects — let the pricing page's picker handle it
  router.push('/pricing')
}

async function loadAccount() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) { router.push('/login'); return }

  userEmail.value     = user.email || ''
  userCreatedAt.value = user.created_at || ''

  // User access
  const { data: access } = await supabase
    .from('user_access')
    .select('*')
    .eq('user_id', user.id)
  userAccess.value = access || []

  // Stories
  const { data: storiesData } = await supabase
    .from('story_projects')
    .select('id, title')
    .eq('user_id', user.id)

  userProjects.value = storiesData || []
  const storyIds = (storiesData || []).map((s: any) => s.id)

  // Everything that needs story IDs
  let answeredCount = 0
  let avgProgress   = 0
  let imagesCount   = 0
  let voicesCount   = 0

  if (storyIds.length > 0) {
    const [
      { data: answersData },
      { data: imagesData },
      { data: voicesData },
    ] = await Promise.all([
      supabase.from('story_answers').select('project_id, answer').in('project_id', storyIds),
      supabase.from('story_images').select('id').in('project_id', storyIds),
      supabase.from('voice_recordings').select('id').in('project_id', storyIds),
    ])

    answeredCount = (answersData || []).filter((a: any) => a.answer?.trim()).length
    imagesCount   = (imagesData || []).length
    voicesCount   = (voicesData || []).length

    // Average progress across stories
    const progressMap: Record<string, number> = {}
    for (const a of answersData || []) {
      if (a.answer?.trim()) {
        progressMap[a.project_id] = (progressMap[a.project_id] || 0) + 1
      }
    }
    const totals = Object.values(progressMap)
    avgProgress = totals.length
      ? Math.round(totals.reduce((a, b) => a + b, 0) / totals.length)
      : 0
  }

  // Orders — doesn't need story IDs
  const { data: ordersData } = await supabase
    .from('print_orders')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  stats.value = {
    stories:     storyIds.length,
    questions:   answeredCount,
    images:      imagesCount,
    voices:      voicesCount,
    orders:      (ordersData || []).length,
    avgProgress,
  }

  orders.value = ordersData || []

  statsLoading.value  = false
  ordersLoading.value = false
}

async function signOut() {
  await supabase.auth.signOut()
  router.push('/')
}

// ─── Lifecycle ────────────────────────────────────────────────────────────────

onMounted(loadAccount)
</script>