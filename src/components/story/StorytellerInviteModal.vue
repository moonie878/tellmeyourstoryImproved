<template>
  <div
    v-if="open"
    class="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-4"
    role="dialog"
    aria-modal="true"
    aria-labelledby="storyteller-modal-title"
    @click.self="$emit('close')"
  >
    <div class="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-white p-6 shadow-xl sm:rounded-3xl sm:p-8">
      <div class="flex items-start justify-between gap-4">
        <div>
          <p class="text-xs font-medium uppercase tracking-[0.2em] text-[#86664A]">{{ storyTitle }}</p>
          <h2 id="storyteller-modal-title" class="mt-1 font-display text-2xl font-bold text-stone-900">
            {{ link ? `${link.storyteller_name}'s questions` : 'Send them their questions' }}
          </h2>
        </div>
        <button type="button" class="flex h-10 w-10 items-center justify-center rounded-full text-stone-500 hover:bg-stone-100" aria-label="Close" @click="$emit('close')">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>
        </button>
      </div>

      <div v-if="loading" class="py-10 text-center text-stone-500" role="status">Loading…</div>

      <!-- ── Set up a new link ───────────────────────────── -->
      <form v-else-if="!link" class="mt-5 space-y-5" @submit.prevent="createLink">
        <p class="text-base leading-relaxed text-stone-600">
          They'll get a simple page with one question at a time. They can talk or type — no app, no password —
          and every answer goes straight into this story.
        </p>

        <div>
          <label for="st-name" class="text-sm font-medium text-stone-800">What do you call them?</label>
          <input id="st-name" v-model.trim="form.storytellerName" required maxlength="40" placeholder="Mum, Grandad, Auntie Pat…"
                 class="mt-1 w-full rounded-xl border border-stone-300 px-4 py-3 text-base focus:border-[#7C5C3B] focus:outline-none" />
        </div>

        <div>
          <label for="st-from" class="text-sm font-medium text-stone-800">Your name, as they know you</label>
          <input id="st-from" v-model.trim="form.fromName" required maxlength="40" placeholder="Sarah"
                 class="mt-1 w-full rounded-xl border border-stone-300 px-4 py-3 text-base focus:border-[#7C5C3B] focus:outline-none" />
        </div>

        <div>
          <label for="st-email" class="text-sm font-medium text-stone-800">Their email <span class="font-normal text-stone-500">(optional)</span></label>
          <input id="st-email" v-model.trim="form.email" type="email" maxlength="200" placeholder="For a question each week"
                 class="mt-1 w-full rounded-xl border border-stone-300 px-4 py-3 text-base focus:border-[#7C5C3B] focus:outline-none" />
        </div>

        <div v-if="form.email">
          <label for="st-day" class="text-sm font-medium text-stone-800">Send them a question every</label>
          <select id="st-day" v-model.number="form.promptDay"
                  class="mt-1 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-base focus:border-[#7C5C3B] focus:outline-none">
            <option :value="null">Don't email weekly — I'll share the link myself</option>
            <option v-for="(d, i) in DAYS" :key="d" :value="i">{{ d }}</option>
          </select>
          <p class="mt-1 text-xs text-stone-500">We'll also send the first question straight away. They can stop the emails at any time.</p>
        </div>

        <p v-if="error" class="text-sm text-red-700" role="alert">{{ error }}</p>

        <button type="submit" :disabled="saving"
                class="min-h-[52px] w-full rounded-full bg-[#7C5C3B] text-base font-semibold text-white transition hover:opacity-90 disabled:opacity-50">
          {{ saving ? 'Setting up…' : 'Create their link' }}
        </button>
      </form>

      <!-- ── Existing link ───────────────────────────────── -->
      <div v-else class="mt-5 space-y-5">
        <p v-if="sentMessage" class="rounded-xl bg-green-50 p-3 text-sm text-green-800" role="status">{{ sentMessage }}</p>

        <div>
          <p class="text-sm font-medium text-stone-800">Their link</p>
          <div class="mt-1 flex items-center gap-2 rounded-xl border border-stone-200 bg-stone-50 px-3 py-2">
            <p class="min-w-0 flex-1 truncate text-sm text-stone-600">{{ linkUrl }}</p>
            <button type="button" class="min-h-[40px] flex-shrink-0 rounded-full px-3 text-sm font-semibold text-[#7C5C3B] hover:bg-white" @click="copyLink">
              {{ copied ? '✓ Copied' : 'Copy' }}
            </button>
          </div>
        </div>

        <div class="grid gap-2 sm:grid-cols-2">
          <a :href="whatsAppUrl" target="_blank" rel="noopener noreferrer"
             class="flex min-h-[48px] items-center justify-center rounded-full border border-stone-300 text-sm font-medium text-stone-800 hover:bg-stone-50">
            Send on WhatsApp
          </a>
          <button v-if="link.storyteller_email" type="button" :disabled="sending"
                  class="min-h-[48px] rounded-full border border-stone-300 text-sm font-medium text-stone-800 hover:bg-stone-50 disabled:opacity-50"
                  @click="sendInvite">
            {{ sending ? 'Sending…' : `Email ${link.storyteller_name} now` }}
          </button>
        </div>

        <div v-if="link.storyteller_email" class="rounded-2xl bg-[#FAF7F4] p-4 text-sm leading-relaxed text-stone-700">
          <template v-if="link.paused">
            Weekly emails are <strong>paused</strong>.
            <button type="button" class="font-semibold text-[#7C5C3B] underline" @click="setPaused(false)">Turn back on</button>
          </template>
          <template v-else-if="link.prompt_day !== null">
            {{ link.storyteller_name }} gets a new question every <strong>{{ DAYS[link.prompt_day] }}</strong> at {{ link.storyteller_email }}.
            <button type="button" class="font-semibold text-[#7C5C3B] underline" @click="setPaused(true)">Pause</button>
          </template>
          <template v-else>No weekly emails — share the link whenever you like.</template>
        </div>

        <p v-if="error" class="text-sm text-red-700" role="alert">{{ error }}</p>

        <button type="button" class="text-sm text-stone-500 underline hover:text-red-600" @click="removeLink">
          Remove this link (their answers stay in the story)
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { supabase } from '../../lib/supabase'
import { track } from '../../lib/analytics'

const SERVER_URL = import.meta.env.VITE_SERVER_URL || 'https://tellmeyourstoryimproved.onrender.com'
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const props = defineProps<{ open: boolean; projectId: string; storyTitle: string; suggestedName?: string }>()
defineEmits<{ (e: 'close'): void }>()

interface StorytellerLink {
  id: string
  token: string
  storyteller_name: string
  storyteller_email: string | null
  from_name: string
  prompt_day: number | null
  paused: boolean
}

const loading = ref(false)
const saving = ref(false)
const sending = ref(false)
const copied = ref(false)
const error = ref('')
const sentMessage = ref('')
const link = ref<StorytellerLink | null>(null)
const form = ref({ storytellerName: '', fromName: '', email: '', promptDay: 0 as number | null })

const linkUrl = computed(() => (link.value ? `${window.location.origin}/tell/${link.value.token}` : ''))
const whatsAppUrl = computed(() => {
  if (!link.value) return '#'
  const text = `Hi ${link.value.storyteller_name}, I've set up some questions about your life — I'd love to hear your stories. You can talk or type your answers here: ${linkUrl.value}`
  return `https://wa.me/?text=${encodeURIComponent(text)}`
})

async function loadLink() {
  loading.value = true
  error.value = ''
  sentMessage.value = ''
  const { data } = await supabase.from('storyteller_links').select('*').eq('project_id', props.projectId).maybeSingle()
  link.value = (data as StorytellerLink) || null
  if (!link.value) {
    const { data: { user } } = await supabase.auth.getUser()
    const fullName = (user?.user_metadata?.full_name || user?.user_metadata?.name || '') as string
    form.value = {
      storytellerName: props.suggestedName || '',
      fromName: fullName.split(' ')[0] || '',
      email: '',
      promptDay: new Date().getDay(),
    }
  }
  loading.value = false
}

watch(() => props.open, (isOpen) => { if (isOpen) loadLink() })

function newToken() {
  const bytes = new Uint8Array(24)
  crypto.getRandomValues(bytes)
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('')
}

async function createLink() {
  error.value = ''
  saving.value = true
  try {
    const email = form.value.email.trim()
    const { data, error: dbErr } = await supabase
      .from('storyteller_links')
      .insert({
        project_id: props.projectId,
        token: newToken(),
        storyteller_name: form.value.storytellerName,
        from_name: form.value.fromName,
        storyteller_email: email || null,
        prompt_day: email ? form.value.promptDay : null,
      })
      .select()
      .single()
    if (dbErr) throw dbErr
    link.value = data as StorytellerLink
    track('storyteller_link_created', { withEmail: !!email, weekly: email ? form.value.promptDay !== null : false })
    if (email) await sendInvite()
  } catch (err) {
    console.error(err)
    error.value = "Couldn't create the link. Please try again."
  } finally {
    saving.value = false
  }
}

async function sendInvite() {
  if (!link.value) return
  sending.value = true
  error.value = ''
  try {
    const { data: { session } } = await supabase.auth.getSession()
    const r = await fetch(`${SERVER_URL}/storyteller-links/${link.value.id}/invite`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${session?.access_token}` },
    })
    const body = await r.json().catch(() => ({}))
    if (!r.ok) throw new Error(body.error || 'send')
    sentMessage.value = `Sent! ${link.value.storyteller_name} will get their first question by email in a minute or two.`
    link.value.paused = false
    track('storyteller_invite_sent')
  } catch (err) {
    error.value = err instanceof Error && err.message !== 'send' ? err.message : "Couldn't send the email. Please try again."
  } finally {
    sending.value = false
  }
}

async function copyLink() {
  try {
    await navigator.clipboard.writeText(linkUrl.value)
    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
  } catch { /* clipboard blocked — the link is visible to copy by hand */ }
}

async function setPaused(paused: boolean) {
  if (!link.value) return
  const { error: dbErr } = await supabase.from('storyteller_links').update({ paused }).eq('id', link.value.id)
  if (!dbErr) link.value.paused = paused
}

async function removeLink() {
  if (!link.value) return
  if (!confirm(`Remove ${link.value.storyteller_name}'s link? It will stop working, but their answers stay in the story.`)) return
  const { error: dbErr } = await supabase.from('storyteller_links').delete().eq('id', link.value.id)
  if (!dbErr) link.value = null
  await loadLink()
}
</script>

<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
</style>
