<template>
  <div class="min-h-screen bg-[#FAF9F7]">

    <!-- Header -->
    <header class="border-b border-stone-200/80 bg-white">
      <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        <div class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p class="text-[11px] font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">Admin</p>
            <h1 class="mt-2 font-display text-2xl font-bold tracking-[-0.02em] text-stone-900 sm:text-3xl">
              People
            </h1>
            <p class="mt-2 max-w-md text-sm leading-relaxed text-stone-500">
              Everyone who has signed up, what stage they're at, and what to do about it.
            </p>
          </div>

          <div v-if="board" class="flex flex-wrap items-end gap-5 sm:gap-7">
            <div v-for="t in totalTiles" :key="t.label">
              <p class="font-display text-2xl font-bold" :class="t.accent ? 'text-[#7C5C3B]' : 'text-stone-900'">
                {{ t.value }}
              </p>
              <p class="mt-0.5 text-[11px] uppercase tracking-wider text-stone-400">{{ t.label }}</p>
            </div>
            <p v-if="board.testAccountsExcluded" class="max-w-[9rem] text-[11px] leading-tight text-stone-400">
              {{ board.testAccountsExcluded }} test
              {{ board.testAccountsExcluded === 1 ? 'account' : 'accounts' }} left out of these
            </p>
          </div>
        </div>
      </div>
    </header>

    <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">

      <!-- Loading / errors -->
      <div v-if="loading" class="flex items-center gap-3 rounded-2xl border border-stone-200 bg-white px-5 py-4">
        <svg class="h-5 w-5 animate-spin text-[#7C5C3B]" viewBox="0 0 24 24" fill="none">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
        </svg>
        <p class="text-sm text-stone-600">Building the board…</p>
      </div>

      <div v-else-if="loadError" class="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4">
        <p class="text-sm font-semibold text-stone-900">{{ loadError }}</p>
        <p v-if="loadError.includes('Not allowed')" class="mt-1 text-sm text-stone-600">
          Your user id isn't in <code class="rounded bg-white px-1 py-0.5 text-xs">ADMIN_USER_IDS</code> on Render.
        </p>
      </div>

      <template v-else-if="board">

        <!-- Something didn't read properly. Say so loudly — a number that is
             wrong looks exactly like a number that is right. -->
        <div v-if="board.warnings?.length" class="mb-5 rounded-2xl border border-red-200 bg-red-50 px-5 py-4">
          <p class="text-sm font-semibold text-red-900">Some of these numbers are not trustworthy</p>
          <ul class="mt-2 space-y-1">
            <li v-for="(w, i) in board.warnings" :key="i" class="text-sm leading-relaxed text-red-800">{{ w }}</li>
          </ul>
        </div>

        <!-- Stage filters -->
        <div class="flex flex-wrap gap-2">
          <button
            type="button"
            @click="stageFilter = ''"
            class="rounded-full border px-4 py-2 text-xs font-medium transition"
            :class="stageFilter === '' ? 'border-[#7C5C3B] bg-[#7C5C3B] text-white' : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'"
          >
            Everyone · {{ board.users.length }}
          </button>
          <button
            v-for="s in board.stages"
            :key="s.id"
            type="button"
            @click="stageFilter = stageFilter === s.id ? '' : s.id"
            :title="s.note"
            class="rounded-full border px-4 py-2 text-xs font-medium transition"
            :class="stageFilter === s.id
              ? 'border-[#7C5C3B] bg-[#7C5C3B] text-white'
              : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'"
          >
            {{ s.label }} · {{ board.counts[s.id] || 0 }}
          </button>
        </div>

        <!-- Why this stage matters -->
        <p v-if="activeStageNote" class="mt-3 rounded-xl bg-[#F5F0E8] px-4 py-3 text-sm leading-relaxed text-stone-700">
          {{ activeStageNote }}
        </p>

        <!-- Flags + search -->
        <div class="mt-4 flex flex-wrap items-center gap-2">
          <button
            v-for="f in FLAGS"
            :key="f.id"
            type="button"
            @click="toggleFlag(f.id)"
            class="rounded-full border px-3 py-1.5 text-[11px] font-medium transition"
            :class="flagFilters.includes(f.id)
              ? 'border-stone-900 bg-stone-900 text-white'
              : 'border-stone-200 bg-white text-stone-500 hover:bg-stone-50'"
          >
            {{ f.label }}
          </button>

          <div class="ml-auto flex items-center gap-2">
            <input
              v-model="search"
              type="search"
              placeholder="Search email…"
              class="w-48 rounded-full border border-stone-200 bg-white px-4 py-2 text-xs text-stone-700 focus:border-[#7C5C3B] focus:outline-none"
            />
            <button
              type="button"
              @click="maskEmails = !maskEmails"
              :title="maskEmails ? 'Emails are hidden — safe to screenshot' : 'Hide email addresses before screenshotting'"
              class="rounded-full border px-3 py-2 text-xs font-medium transition"
              :class="maskEmails
                ? 'border-stone-900 bg-stone-900 text-white'
                : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'"
            >
              {{ maskEmails ? 'Emails hidden' : 'Hide emails' }}
            </button>
            <button
              type="button"
              @click="load"
              class="rounded-full border border-stone-200 bg-white px-3 py-2 text-xs font-medium text-stone-600 transition hover:bg-stone-50"
            >
              Refresh
            </button>
          </div>
        </div>

        <!-- Table -->
        <div class="mt-5 overflow-hidden rounded-2xl border border-stone-200 bg-white">
          <div class="overflow-x-auto">
            <table class="w-full text-left text-sm">
              <thead class="border-b border-stone-100 bg-stone-50/60">
                <tr class="text-[11px] uppercase tracking-wider text-stone-400">
                  <th class="px-4 py-3 font-medium">Person</th>
                  <th class="px-4 py-3 font-medium">Stage</th>
                  <th class="px-3 py-3 text-right font-medium">Answers</th>
                  <th class="px-3 py-3 text-right font-medium">Voice</th>
                  <th class="px-3 py-3 font-medium">Paid</th>
                  <th class="px-3 py-3 font-medium">Invited</th>
                  <th class="px-3 py-3 text-right font-medium">Last seen</th>
                  <th class="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="u in filtered"
                  :key="u.id"
                  class="cursor-pointer border-b border-stone-50 transition last:border-0 hover:bg-[#FDFBF8]"
                  :class="selected?.id === u.id ? 'bg-[#FDFBF8]' : ''"
                  @click="select(u)"
                >
                  <td class="max-w-[220px] px-4 py-3">
                    <p class="truncate font-medium text-stone-800">{{ shownEmail(u.email) }}</p>
                    <p class="truncate text-[11px] text-stone-400">
                      {{ u.projectCount }} {{ u.projectCount === 1 ? 'story' : 'stories' }}
                      <span v-if="u.flags.length"> · {{ u.flags.map(flagLabel).join(' · ') }}</span>
                    </p>
                  </td>
                  <td class="px-4 py-3">
                    <span class="rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide" :class="stageClass(u.stage)">
                      {{ stageLabel(u.stage) }}
                    </span>
                  </td>
                  <td class="px-3 py-3 text-right font-display font-semibold text-stone-700">{{ u.answers }}</td>
                  <td class="px-3 py-3 text-right" :class="u.voiceCount ? 'text-stone-700' : 'text-stone-300'">{{ u.voiceCount }}</td>
                  <td class="px-3 py-3">
                    <span v-if="u.paid" class="text-[#4A7C59]">✓</span>
                    <span v-else class="text-stone-300">—</span>
                  </td>
                  <td class="px-3 py-3">
                    <span v-if="u.invited" class="text-[#4A7C59]">✓</span>
                    <span v-else class="text-stone-300">—</span>
                  </td>
                  <td class="px-3 py-3 text-right text-[11px] text-stone-400">{{ agoLabel(u.daysSinceSignIn) }}</td>
                  <td class="px-4 py-3 text-right text-stone-300">›</td>
                </tr>
                <tr v-if="!filtered.length">
                  <td colspan="8" class="px-4 py-10 text-center text-sm text-stone-400">Nobody matches that.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- What's automatic vs what I send by hand -->
        <section class="mt-8 rounded-2xl border border-stone-200 bg-white p-6">
          <button
            type="button"
            class="flex w-full items-center justify-between text-left"
            @click="showPolicy = !showPolicy"
          >
            <div>
              <h2 class="font-display text-lg font-bold text-stone-900">What sends itself, and what I send</h2>
              <p class="mt-1 text-sm text-stone-500">The rule: if it needs judgement, or they've paid, I write it myself.</p>
            </div>
            <span class="text-stone-400">{{ showPolicy ? '▲' : '▼' }}</span>
          </button>

          <div v-if="showPolicy" class="mt-5 grid gap-6 sm:grid-cols-2">
            <div>
              <p class="text-[11px] font-semibold uppercase tracking-wider text-[#9C7C5C]">Automatic</p>
              <ul class="mt-3 space-y-2 text-sm leading-relaxed text-stone-600">
                <li v-for="a in AUTOMATIC" :key="a.name">
                  <span class="font-medium text-stone-800">{{ a.name }}</span> — {{ a.when }}
                </li>
              </ul>
            </div>
            <div>
              <p class="text-[11px] font-semibold uppercase tracking-wider text-[#9C7C5C]">By hand, from this page</p>
              <ul class="mt-3 space-y-2 text-sm leading-relaxed text-stone-600">
                <li v-for="m in MANUAL" :key="m.name">
                  <span class="font-medium text-stone-800">{{ m.name }}</span> — {{ m.why }}
                </li>
              </ul>
            </div>
          </div>
        </section>
      </template>
    </div>

    <!-- Detail panel -->
    <Transition name="slide">
      <aside
        v-if="selected"
        class="fixed inset-y-0 right-0 z-50 w-full max-w-md overflow-y-auto border-l border-stone-200 bg-white shadow-2xl"
      >
        <div class="sticky top-0 border-b border-stone-100 bg-white px-6 py-5">
          <div class="flex items-start justify-between gap-4">
            <div class="min-w-0">
              <p class="truncate font-display text-lg font-semibold text-stone-900">{{ shownEmail(selected.email) }}</p>
              <p class="mt-0.5 text-xs text-stone-400">
                Joined {{ dateLabel(selected.createdAt) }} · last seen {{ agoLabel(selected.daysSinceSignIn) }}
              </p>
            </div>
            <button @click="selected = null" class="flex-shrink-0 text-stone-400 hover:text-stone-700">✕</button>
          </div>
          <span class="mt-3 inline-block rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide" :class="stageClass(selected.stage)">
            {{ stageLabel(selected.stage) }}
          </span>
        </div>

        <div class="px-6 py-5">

          <!-- Facts -->
          <dl class="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
            <div><dt class="text-[11px] uppercase tracking-wider text-stone-400">Answers</dt><dd class="mt-0.5 font-display font-semibold text-stone-800">{{ selected.answers }}</dd></div>
            <div><dt class="text-[11px] uppercase tracking-wider text-stone-400">Recordings</dt><dd class="mt-0.5 font-display font-semibold text-stone-800">{{ selected.voiceCount }}</dd></div>
            <div><dt class="text-[11px] uppercase tracking-wider text-stone-400">Last answer</dt><dd class="mt-0.5 text-stone-700">{{ agoLabel(selected.daysSinceAnswer) }}</dd></div>
            <div><dt class="text-[11px] uppercase tracking-wider text-stone-400">Paid</dt><dd class="mt-0.5 text-stone-700">{{ selected.paid ? (selected.accessTypes.join(', ') || 'yes') : 'no' }}</dd></div>
          </dl>

          <p v-if="selected.creditsUnused > 0" class="mt-4 rounded-xl bg-[#F0F5F1] px-4 py-3 text-sm font-medium text-[#3B6D11]">
            Has {{ selected.creditsUnused }} unclaimed printed book{{ selected.creditsUnused === 1 ? '' : 's' }}.
          </p>

          <!-- Stories -->
          <div v-if="selected.projects.length" class="mt-5">
            <p class="text-[11px] font-semibold uppercase tracking-wider text-stone-400">Stories</p>
            <ul class="mt-2 space-y-1.5">
              <li v-for="p in selected.projects" :key="p.id" class="flex items-center justify-between gap-3 text-sm">
                <span class="min-w-0 truncate text-stone-700">{{ p.title || 'Untitled' }}</span>
                <span class="flex-shrink-0 text-[11px] text-stone-400">{{ p.storyType }}</span>
              </li>
            </ul>
          </div>

          <!-- Already sent -->
          <div v-if="selected.emailsSent.length" class="mt-5">
            <p class="text-[11px] font-semibold uppercase tracking-wider text-stone-400">Already had</p>
            <div class="mt-2 flex flex-wrap gap-1.5">
              <span v-for="(e, i) in selected.emailsSent" :key="i" class="rounded-full bg-stone-100 px-2.5 py-1 text-[10px] text-stone-500">{{ e }}</span>
            </div>
          </div>

          <!-- Send -->
          <div class="mt-6 border-t border-stone-100 pt-5">
            <p class="text-[11px] font-semibold uppercase tracking-wider text-stone-400">Send something</p>

            <p v-if="!selected.emailOptIn" class="mt-3 rounded-xl bg-amber-50 px-4 py-3 text-sm text-stone-700">
              They opted out of email when they signed up. Nothing can be sent to them from here.
            </p>

            <template v-else>
              <select
                v-model="templateId"
                @change="loadPreview"
                class="mt-3 w-full rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm text-stone-700 focus:border-[#7C5C3B] focus:outline-none"
              >
                <option value="">Choose a template…</option>
                <option v-for="t in sortedTemplates" :key="t.id" :value="t.id">
                  {{ t.label }}{{ t.appliesTo.includes(selected.stage) ? ' — fits this stage' : '' }}
                </option>
              </select>

              <div v-if="previewLoading" class="mt-3 text-xs text-stone-400">Rendering…</div>

              <div v-else-if="preview" class="mt-3">
                <p class="text-xs text-stone-400">Subject</p>
                <p class="mt-0.5 text-sm font-medium text-stone-800">{{ preview.subject }}</p>

                <div class="mt-3 max-h-64 overflow-y-auto rounded-xl border border-stone-200 bg-[#FAFAF8] p-3">
                  <div class="crm-preview text-xs" v-html="preview.html"></div>
                </div>

                <p v-if="!preview.sendable" class="mt-3 rounded-xl bg-amber-50 px-4 py-3 text-sm text-stone-700">
                  {{ preview.blockedReason }} — send is blocked.
                </p>

                <div class="mt-4 flex gap-2">
                  <button
                    type="button"
                    @click="send(true)"
                    :disabled="sending"
                    class="flex-1 rounded-full border border-stone-200 py-2.5 text-sm font-medium text-stone-700 transition hover:bg-stone-50 disabled:opacity-50"
                  >
                    Send test to me
                  </button>
                  <button
                    type="button"
                    @click="send(false)"
                    :disabled="sending || !preview.sendable"
                    class="flex-1 rounded-full bg-[#7C5C3B] py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-40"
                  >
                    {{ sending ? 'Sending…' : 'Send to them' }}
                  </button>
                </div>

                <p v-if="sendResult" class="mt-3 text-sm" :class="sendOk ? 'text-[#4A7C59]' : 'text-red-700'">
                  {{ sendResult }}
                </p>
              </div>
            </template>
          </div>
        </div>
      </aside>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { supabase } from '../lib/supabase'

const API_BASE = import.meta.env.VITE_API_BASE_URL as string

const board         = ref<any>(null)
const loading       = ref(true)
const loadError     = ref('')
const stageFilter   = ref('')
const flagFilters   = ref<string[]>([])
const search        = ref('')
const selected      = ref<any>(null)
const templateId    = ref('')
const preview       = ref<any>(null)
const previewLoading = ref(false)
const sending       = ref(false)
const sendResult    = ref('')
const sendOk        = ref(false)
const showPolicy    = ref(false)
// On for screenshots. Real addresses are other people's data, not mine to post.
const maskEmails    = ref(false)

const FLAGS = [
  { id: 'never_invited',  label: 'Never invited anyone' },
  { id: 'no_voice',       label: 'No recordings' },
  { id: 'book_unclaimed', label: 'Unclaimed book' },
  { id: 'opted_out',      label: 'Opted out' },
  { id: 'test_account',   label: 'Test account' },
]

// Step 4 of the brief, written down where it can't get lost.
const AUTOMATIC = [
  { name: 'Activation nudge',     when: 'story created, nothing answered after a few days' },
  { name: 'Milestone emails',     when: 'they cross 10, 25, 50 answers' },
  { name: 'Gate email',           when: '5 answers and no purchase' },
  { name: 'Storyteller prompts',  when: 'one question a week to an invited storyteller' },
  { name: 'Gift progress',        when: 'a gift recipient starts answering' },
  { name: 'Dormant warning',      when: 'nothing for weeks, before anything is deleted' },
  { name: 'Trustpilot ask',       when: 'after enough answers to have an opinion' },
]

const MANUAL = [
  { name: 'Paid, not started',  why: 'they spent money. A template would be insulting, and there are few enough to write properly.' },
  { name: 'Ready to print',     why: 'needs me to have actually looked at the story first.' },
  { name: 'Never invited',      why: 'depends who the story is about.' },
  { name: 'The voice bit',      why: 'only worth sending to someone already writing.' },
  { name: 'Welcome',            why: 'kept manual on purpose while I work out if it helps.' },
]

const STAGE_CLASSES: Record<string, string> = {
  paid_idle:      'bg-[#FDECEC] text-[#9B3B3B]',
  ready_to_print: 'bg-[#F0F5F1] text-[#4A7C59]',
  printed:        'bg-[#EEF2F7] text-[#4A6382]',
  engaged:        'bg-[#F0F5F1] text-[#4A7C59]',
  writing:        'bg-[#FDF6EC] text-[#B07D3A]',
  dormant:        'bg-stone-100 text-stone-500',
  empty:          'bg-[#FDF6EC] text-[#B07D3A]',
  new:            'bg-stone-100 text-stone-500',
}

const totalTiles = computed(() => {
  const t = board.value?.totals
  if (!t) return []
  return [
    { label: 'People',    value: t.users },
    { label: 'Paid',      value: t.paid, accent: true },
    { label: 'Writing',   value: t.withAnswers },
    { label: 'Recorded',  value: t.withVoice },
    { label: 'Invited',   value: t.everInvited },
  ]
})

const activeStageNote = computed(() => {
  if (!stageFilter.value || !board.value) return ''
  return board.value.stages.find((s: any) => s.id === stageFilter.value)?.note || ''
})

/** Templates that fit the selected person's stage float to the top. */
const sortedTemplates = computed(() => {
  const list = [...(board.value?.templates || [])]
  const stage = selected.value?.stage
  return list.sort((a, b) => {
    const af = a.appliesTo.includes(stage) ? 0 : 1
    const bf = b.appliesTo.includes(stage) ? 0 : 1
    return af - bf
  })
})

const filtered = computed(() => {
  let rows = board.value?.users || []
  if (stageFilter.value) rows = rows.filter((u: any) => u.stage === stageFilter.value)
  for (const f of flagFilters.value) rows = rows.filter((u: any) => u.flags.includes(f))
  const q = search.value.trim().toLowerCase()
  if (q) rows = rows.filter((u: any) => u.email.toLowerCase().includes(q))
  return rows
})

function stageLabel(id: string) {
  return board.value?.stages.find((s: any) => s.id === id)?.label || id
}
function stageClass(id: string) {
  return STAGE_CLASSES[id] || 'bg-stone-100 text-stone-500'
}
function flagLabel(id: string) {
  return FLAGS.find((f) => f.id === id)?.label || id
}
function toggleFlag(id: string) {
  flagFilters.value = flagFilters.value.includes(id)
    ? flagFilters.value.filter((f) => f !== id)
    : [...flagFilters.value, id]
}

/** First letter, then dots. Enough to tell rows apart, not enough to identify. */
function shownEmail(email: string) {
  if (!maskEmails.value) return email
  const [name = '', domain = ''] = email.split('@')
  const tld = domain.includes('.') ? domain.slice(domain.indexOf('.')) : ''
  return `${name.slice(0, 1)}•••@•••${tld}`
}

function agoLabel(days: number | null) {
  if (days === null || days === undefined) return 'never'
  if (days === 0) return 'today'
  if (days === 1) return 'yesterday'
  if (days < 30) return `${days} days ago`
  const months = Math.floor(days / 30)
  return `${months} month${months === 1 ? '' : 's'} ago`
}

function dateLabel(value: string) {
  if (!value) return '—'
  return new Date(value).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

async function authHeaders() {
  const { data: { session } } = await supabase.auth.getSession()
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${session?.access_token || ''}`,
  }
}

async function load() {
  loading.value = true
  loadError.value = ''
  try {
    const res = await fetch(`${API_BASE}/admin/crm`, { headers: await authHeaders() })
    const json = await res.json().catch(() => ({}))
    if (!res.ok) throw new Error(json.error || `Failed (${res.status})`)
    board.value = json
  } catch (err: any) {
    loadError.value = err.message || 'Could not load'
  } finally {
    loading.value = false
  }
}

function select(u: any) {
  selected.value = u
  templateId.value = ''
  preview.value = null
  sendResult.value = ''
}

async function loadPreview() {
  preview.value = null
  sendResult.value = ''
  if (!templateId.value || !selected.value) return

  previewLoading.value = true
  try {
    const url = `${API_BASE}/admin/crm/preview?userId=${encodeURIComponent(selected.value.id)}&templateId=${encodeURIComponent(templateId.value)}`
    const res = await fetch(url, { headers: await authHeaders() })
    const json = await res.json().catch(() => ({}))
    if (!res.ok) throw new Error(json.error || 'Could not render it')
    preview.value = json
  } catch (err: any) {
    sendOk.value = false
    sendResult.value = err.message
  } finally {
    previewLoading.value = false
  }
}

async function send(test: boolean) {
  if (!selected.value || !templateId.value) return
  if (!test && !window.confirm(`Send "${preview.value?.subject}" to ${selected.value.email}?`)) return

  sending.value = true
  sendResult.value = ''
  try {
    const res = await fetch(`${API_BASE}/admin/crm/email`, {
      method: 'POST',
      headers: await authHeaders(),
      body: JSON.stringify({ userId: selected.value.id, templateId: templateId.value, test }),
    })
    const json = await res.json().catch(() => ({}))
    if (!res.ok) throw new Error(json.error || 'Could not send it')

    sendOk.value = true
    sendResult.value = test ? `Test sent to ${json.to}` : `Sent to ${json.to}`
    if (!test) await load()
  } catch (err: any) {
    sendOk.value = false
    sendResult.value = err.message
  } finally {
    sending.value = false
  }
}

onMounted(load)
</script>

<style scoped>
.font-display {
  font-family: 'Playfair Display', Georgia, serif;
}

.slide-enter-active,
.slide-leave-active { transition: transform 0.25s ease; }
.slide-enter-from,
.slide-leave-to { transform: translateX(100%); }

/* The preview is raw email HTML — keep its own styling but shrink it to fit */
.crm-preview :deep(div) { padding: 0 !important; max-width: none !important; }
.crm-preview :deep(h1) { font-size: 15px !important; }
.crm-preview :deep(p) { font-size: 12px !important; }
.crm-preview :deep(a) { font-size: 12px !important; }
</style>