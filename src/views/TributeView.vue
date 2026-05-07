<template>
  <main class="tribute-page">

    <!-- ── Hero ─────────────────────────────────────────────────────────── -->
    <section class="tribute-hero">
      <div class="tribute-hero-inner">
        <div class="hero-badge">Tell Me Your Story</div>
        <h1 class="hero-title">
          Create a tribute<br />
          <em>they'll carry forever</em>
        </h1>
        <p class="hero-sub">
          Upload photos, add music, and create a beautiful memorial video
          in minutes — free to preview, £9.99 to download.
        </p>
        <div class="hero-trust">
          <span>✦ No account needed</span>
          <span>✦ Preview free</span>
          <span>✦ Download for £9.99</span>
        </div>
      </div>
    </section>

    <!-- ── Builder ───────────────────────────────────────────────────────── -->
    <section class="builder-section">
      <div class="builder-inner">

        <!-- Step indicators -->
        <div class="steps-bar">
          <div
            v-for="(s, i) in steps"
            :key="s.id"
            class="step-item"
            :class="{
              'step-active': currentStep === i,
              'step-done': currentStep > i,
              'step-idle': currentStep < i,
            }"
            @click="currentStep > i ? currentStep = i : null"
          >
            <div class="step-dot">
              <span v-if="currentStep > i">✓</span>
              <span v-else>{{ i + 1 }}</span>
            </div>
            <span class="step-label">{{ s.label }}</span>
          </div>
        </div>

        <!-- ── Step 0 — Details ─────────────────────────────────────────── -->
        <div v-if="currentStep === 0" class="builder-card">
          <h2 class="card-title">About them</h2>
          <p class="card-sub">Tell us who this tribute is for.</p>

          <div class="field-group">
            <label class="field-label">Their full name <span class="required">*</span></label>
            <input v-model="form.name" type="text" placeholder="e.g. Margaret Eleanor Griffiths" class="field-input" maxlength="80" />
          </div>

          <div class="field-row">
            <div class="field-group">
              <label class="field-label">Year of birth</label>
              <input v-model="form.birthYear" type="text" placeholder="e.g. 1942" class="field-input" maxlength="4" />
            </div>
            <div class="field-group">
              <label class="field-label">Year of passing</label>
              <input v-model="form.deathYear" type="text" placeholder="e.g. 2024" class="field-input" maxlength="4" />
            </div>
          </div>

          <div class="field-group">
            <label class="field-label">
              A tribute in their memory
              <span class="field-optional">(optional — up to 200 words)</span>
            </label>
            <textarea v-model="form.tribute" rows="4" placeholder="A short tribute that will appear as a beautiful quote slide in the video…" class="field-input field-textarea" maxlength="1200"></textarea>
            <p class="field-count">{{ wordCount }} / 200 words</p>
          </div>

          <button @click="nextStep" :disabled="!form.name.trim()" class="btn-primary">
            Continue — add photos →
          </button>
        </div>

        <!-- ── Step 1 — Photos ──────────────────────────────────────────── -->
        <div v-else-if="currentStep === 1" class="builder-card">
          <h2 class="card-title">Their photos</h2>
          <p class="card-sub">Upload up to 30 photos. The first photo will be used as the opening frame.</p>

          <div class="upload-zone" :class="{ 'upload-zone-hover': isDragging }" @dragover.prevent="isDragging = true" @dragleave="isDragging = false" @drop.prevent="onDrop" @click="triggerFileInput">
            <input ref="fileInputRef" type="file" accept="image/*" multiple class="hidden" @change="onFileSelect" />
            <div class="upload-zone-content">
              <span class="upload-icon">📷</span>
              <p class="upload-text">Drop photos here or <span class="upload-link">browse files</span></p>
              <p class="upload-hint">JPG, PNG, WebP — up to 30 photos</p>
            </div>
          </div>

          <div v-if="form.photos.length > 0" class="photo-grid">
            <div v-for="(photo, i) in form.photos" :key="i" class="photo-thumb" :class="{ 'photo-thumb-first': i === 0 }">
              <img :src="photo" :alt="`Photo ${i + 1}`" class="photo-img" />
              <div class="photo-overlay">
                <button v-if="i > 0" @click="movePhoto(i, -1)" class="photo-btn">←</button>
                <button @click="removePhoto(i)" class="photo-btn photo-btn-remove">✕</button>
                <button v-if="i < form.photos.length - 1" @click="movePhoto(i, 1)" class="photo-btn">→</button>
              </div>
              <div v-if="i === 0" class="photo-first-badge">Cover</div>
            </div>
          </div>

          <p v-if="form.photos.length === 0" class="photo-empty">No photos added yet — upload at least one to continue.</p>

          <div class="btn-row">
            <button @click="currentStep--" class="btn-secondary">← Back</button>
            <button @click="nextStep" :disabled="form.photos.length === 0" class="btn-primary">Continue — choose music →</button>
          </div>
        </div>

        <!-- ── Step 2 — Music & Style ────────────────────────────────────── -->
        <div v-else-if="currentStep === 2" class="builder-card">
          <h2 class="card-title">Music & style</h2>
          <p class="card-sub">Choose the mood and pace of your tribute.</p>

          <div class="field-group">
            <label class="field-label">Background music</label>
            <p class="field-hint">Click a track to select it. Hit the play button to preview.</p>
            <div class="option-grid">
              <div
                v-for="(track, key) in MUSIC_TRACKS"
                :key="key"
                class="option-card"
                :class="form.musicTrack === key ? 'option-active' : 'option-idle'"
                @click="selectTrack(key as TributeMusicTrack)"
              >
                <div class="option-top">
                  <span class="option-emoji">{{ track.emoji }}</span>
                  <button v-if="key !== 'silent' && key !== 'custom'" @click.stop="togglePreview(key as TributeMusicTrack)" class="preview-btn" :class="playingTrack === key ? 'preview-btn-playing' : ''">
                    <span v-if="playingTrack === key">■</span>
                    <span v-else>▶</span>
                  </button>
                </div>
                <p class="option-label">{{ track.label }}</p>
                <p class="option-desc">{{ track.description }}</p>
                <div v-if="playingTrack === key" class="playing-bar">
                  <span></span><span></span><span></span><span></span>
                </div>
              </div>
            </div>
          </div>

          <div v-if="form.musicTrack === 'custom'" class="field-group">
            <label class="field-label">Upload your music (MP3)</label>
            <label class="music-upload-btn">
              <input type="file" accept="audio/mp3,audio/*" class="hidden" @change="onMusicUpload" />
              {{ form.musicFile ? `✓ ${form.musicFile.name}` : '+ Upload MP3' }}
            </label>
          </div>

          <div class="field-group">
            <label class="field-label">Time per photo</label>
            <div class="duration-row">
              <button v-for="d in durations" :key="d.value" @click="form.slideDuration = d.value as TributeSlideDuration" class="duration-btn" :class="form.slideDuration === d.value ? 'duration-active' : 'duration-idle'">
                <span class="duration-num">{{ d.label }}</span>
                <span class="duration-hint">{{ d.hint }}</span>
              </button>
            </div>
          </div>

          <div class="field-group">
            <label class="field-label">Transition between photos</label>
            <div class="transition-row">
              <button v-for="t in transitions" :key="t.value" @click="form.transition = t.value as TributeTransition" class="transition-btn" :class="form.transition === t.value ? 'transition-active' : 'transition-idle'">
                <div class="transition-preview">
                  <div v-if="t.value === 'cut'" class="t-cut"><div class="t-half-l"></div><div class="t-half-r"></div></div>
                  <div v-else-if="t.value === 'fade'" class="t-fade"></div>
                  <div v-else class="t-slow-fade"></div>
                </div>
                <p class="transition-label">{{ t.label }}</p>
                <p class="transition-hint">{{ t.hint }}</p>
              </button>
            </div>
          </div>

          <div class="estimate-bar">
            <span>🎬 Estimated video length:</span>
            <span class="estimate-value">{{ estimatedLength }}</span>
          </div>

          <div class="btn-row">
            <button @click="currentStep--" class="btn-secondary">← Back</button>
            <button @click="nextStep" class="btn-primary">Preview my tribute →</button>
          </div>
        </div>

        <!-- ── Step 3 — Preview & Export ─────────────────────────────────── -->
        <div v-else-if="currentStep === 3" class="builder-card">
          <h2 class="card-title">Your tribute is ready</h2>
          <p class="card-sub">
            Preview your tribute with a watermark for free, or download
            the full clean version for £9.99.
          </p>

          <!-- Summary -->
          <div class="summary-card">
            <div class="summary-row"><span class="summary-label">Name</span><span class="summary-value">{{ form.name }}</span></div>
            <div v-if="form.birthYear || form.deathYear" class="summary-row">
              <span class="summary-label">Dates</span>
              <span class="summary-value">{{ [form.birthYear, form.deathYear].filter(Boolean).join(' — ') }}</span>
            </div>
            <div class="summary-row"><span class="summary-label">Photos</span><span class="summary-value">{{ form.photos.length }} photos</span></div>
            <div class="summary-row"><span class="summary-label">Music</span><span class="summary-value">{{ MUSIC_TRACKS[form.musicTrack].label }}</span></div>
            <div class="summary-row"><span class="summary-label">Duration</span><span class="summary-value">~{{ estimatedLength }}</span></div>
          </div>

          <!-- Turnstile -->
          <div ref="turnstileRef" class="turnstile-wrap"></div>
          <p v-if="turnstileError" class="error-text">Please complete the security check before continuing.</p>

          <!-- Progress -->
          <div v-if="isGenerating" class="progress-section">
            <div class="progress-bar-wrap">
              <div class="progress-bar-fill" :style="{ width: `${progress}%` }"></div>
            </div>
            <div class="progress-row">
              <span class="progress-label">{{ progressLabel }}</span>
              <span class="progress-pct">{{ progress }}%</span>
            </div>
            <p class="progress-note">This takes a few minutes — please keep this window open 💛</p>
          </div>

          <p v-if="error" class="error-text">{{ error }}</p>

          <!-- Payment pending state -->
          <div v-if="showingPaymentPending && !isGenerating" class="payment-pending-card">
  <div class="payment-pending-icon">💳</div>
  <h3 class="payment-pending-title">Complete your payment</h3>
  <p class="payment-pending-desc">
    Your payment page is open in another tab. Once you've completed
    payment, come back here and click the button below.
  </p>

  <div v-if="isVerifying" class="verifying-row">
    <div class="spinner"></div>
    <span>Verifying your payment…</span>
  </div>

  <button
    v-if="!isVerifying"
    @click="handlePaid"
    class="btn-primary"
    style="margin-top: 16px;"
  >
    ✓ I've paid — generate my tribute
  </button>

  <button @click="reopenPayment" class="btn-back-link" style="margin-top: 12px; display: block;">
    ← Reopen payment tab
  </button>
</div>

          <!-- Normal action buttons -->
          <div v-if="!isGenerating && !showingPaymentPending" class="export-buttons">
            <button @click="handlePreview" class="btn-preview">
              <span class="btn-icon">👁</span>
              <div>
                <p class="btn-main-label">Preview (free)</p>
                <p class="btn-sub-label">Watermarked · Downloads instantly</p>
              </div>
            </button>

            <button @click="isTier4 ? handleTier4Download() : handlePurchase()" class="btn-purchase">
              <span class="btn-icon">⬇</span>
              <div>
                <p class="btn-main-label">{{ isTier4 ? 'Download full video — free for you' : 'Download full video — £9.99' }}</p>
                <p class="btn-sub-label">{{ isTier4 ? 'Included in your Full Collection plan ✦' : 'No watermark · Full HD · Keep forever' }}</p>
              </div>
            </button>
          </div>

          <div v-if="!showingPaymentPending" class="trust-row">
            <span>🔒 Secure payment via Stripe</span>
            <span>·</span>
            <span>No account required</span>
            <span>·</span>
            <span>Instant download after payment</span>
          </div>

          <button @click="currentStep--" class="btn-back-link">← Edit your tribute</button>
        </div>

      </div>
    </section>

    <!-- ── Why section ───────────────────────────────────────────────────── -->
    <section class="why-section">
      <div class="why-inner">
        <p class="why-eyebrow">Tell Me Your Story</p>
        <h2 class="why-title">A beautiful way to honour a life</h2>
        <div class="why-grid">
          <div class="why-card"><span class="why-icon">📸</span><p class="why-card-title">Up to 30 photos</p><p class="why-card-desc">Every photo flows beautifully with elegant transitions and a cinematic style.</p></div>
          <div class="why-card"><span class="why-icon">🎵</span><p class="why-card-title">Music that fits</p><p class="why-card-desc">Choose from curated gentle tracks or upload your own music that was meaningful to them.</p></div>
          <div class="why-card"><span class="why-icon">💛</span><p class="why-card-title">Their words</p><p class="why-card-desc">Add a tribute that becomes a beautiful quote slide woven through the video.</p></div>
          <div class="why-card"><span class="why-icon">🎬</span><p class="why-card-title">Full HD MP4</p><p class="why-card-desc">Download and share with family, play at a memorial service, or keep it forever.</p></div>
        </div>
        <div class="upsell-card">
          <p class="upsell-eyebrow">Want more than a tribute video?</p>
          <h3 class="upsell-title">Capture their full life story with Tell Me Your Story</h3>
          <p class="upsell-desc">100 guided questions across 10 chapters. Every answer turns into a beautifully designed keepsake book — a complete record of their life, in their own words.</p>
          <router-link to="/register" class="upsell-btn">Start capturing their story — it's free →</router-link>
        </div>
      </div>
    </section>

    <!-- ── Payment modal ─────────────────────────────────────────────────── -->
    <TributePaymentModal
      :open="showPaymentModal"
      :name="form.name"
      @close="showPaymentModal = false"
      @payment-opened="onPaymentOpened"
    />

  </main>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted } from 'vue'
import { useTributeVideo, MUSIC_TRACKS } from '../composables/useTributeVideo'
import TributePaymentModal from '../components/tribute/TributePaymentModal.vue'
import type { TributeMusicTrack, TributeTransition, TributeSlideDuration, TributeOptions } from '../composables/useTributeVideo'
import { supabase } from '../lib/supabase'


// ── State ─────────────────────────────────────────────────────────────────────
const currentStep           = ref(0)
const isDragging            = ref(false)
const fileInputRef          = ref<HTMLInputElement | null>(null)
const turnstileRef          = ref<HTMLElement | null>(null)
const turnstileToken        = ref('')
const turnstileError        = ref(false)
const showPaymentModal      = ref(false)
const showingPaymentPending = ref(false)
const lastPaymentUrl        = ref('')
const isTier4               = ref(false)
const isVerifying = ref(false)
const verifiedSessionId = ref('')

// ── Audio preview ─────────────────────────────────────────────────────────────
const playingTrack = ref<TributeMusicTrack | null>(null)
let previewAudio: HTMLAudioElement | null = null
let previewTimeout: ReturnType<typeof setTimeout> | null = null

function selectTrack(key: TributeMusicTrack) {
  form.value.musicTrack = key
  if (playingTrack.value && playingTrack.value !== key) stopPreview()
}

function togglePreview(key: TributeMusicTrack) {
  if (playingTrack.value === key) { stopPreview(); return }
  stopPreview()
  playingTrack.value = key
  previewAudio = new Audio(`/audio/${key}.mp3`)
  previewAudio.volume = 0
  previewAudio.play().catch(() => { playingTrack.value = null })
  let vol = 0
  const fadeIn = setInterval(() => {
    vol = Math.min(vol + 0.1, 0.7)
    if (previewAudio) previewAudio.volume = vol
    if (vol >= 0.7) clearInterval(fadeIn)
  }, 80)
  previewTimeout = setTimeout(() => fadeOutAndStop(), 12000)
}

function fadeOutAndStop() {
  if (!previewAudio) return
  const audio = previewAudio
  let vol = audio.volume
  const fadeOut = setInterval(() => {
    vol = Math.max(vol - 0.08, 0)
    audio.volume = vol
    if (vol <= 0) { clearInterval(fadeOut); audio.pause(); audio.src = ''; playingTrack.value = null }
  }, 80)
}

function stopPreview() {
  if (previewTimeout) { clearTimeout(previewTimeout); previewTimeout = null }
  if (previewAudio) { previewAudio.pause(); previewAudio.src = ''; previewAudio = null }
  playingTrack.value = null
}

// ── Form ──────────────────────────────────────────────────────────────────────
const form = ref({
  name:          '',
  birthYear:     '',
  deathYear:     '',
  tribute:       '',
  photos:        [] as string[],
  musicTrack:    'gentle-piano' as TributeMusicTrack,
  musicFile:     null as File | null,
  slideDuration: 5 as TributeSlideDuration,
  transition:    'fade' as TributeTransition,
})

const steps = [
  { id: 'details', label: 'Details' },
  { id: 'photos',  label: 'Photos' },
  { id: 'style',   label: 'Music & style' },
  { id: 'export',  label: 'Preview & export' },
]

const durations = [
  { value: 3, label: '3s', hint: 'Lively' },
  { value: 5, label: '5s', hint: 'Balanced' },
  { value: 8, label: '8s', hint: 'Gentle' },
]

const transitions = [
  { value: 'cut',       label: 'Cut',       hint: 'Instant switch' },
  { value: 'fade',      label: 'Fade',      hint: '1 second blend' },
  { value: 'slow-fade', label: 'Slow fade', hint: '2 second blend' },
]

// ── Composable ────────────────────────────────────────────────────────────────
const { isGenerating, progress, progressLabel, error, generateTribute } = useTributeVideo()

// ── Computed ─────────────────────────────────────────────────────────────────
const wordCount = computed(() => {
  const words = form.value.tribute.trim().split(/\s+/).filter(Boolean)
  return Math.min(words.length, 200)
})

const estimatedLength = computed(() => {
  const slides = form.value.photos.length + 2 + (form.value.tribute.trim() ? 1 : 0)
  const transitionSecs = form.value.transition === 'cut' ? 0 : form.value.transition === 'fade' ? 1 : 2
  const totalSecs = slides * form.value.slideDuration + (slides - 1) * transitionSecs
  const mins = Math.floor(totalSecs / 60)
  const secs = totalSecs % 60
  return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`
})

// ── Lifecycle ─────────────────────────────────────────────────────────────────
onMounted(async () => {
  if (!document.querySelector('script[src*="turnstile"]')) {
    const script = document.createElement('script')
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
    script.async = true
    script.defer = true
    document.head.appendChild(script)
  }

  const params = new URLSearchParams(window.location.search)
  if (params.get('payment') === 'success') {
    const sessionId = params.get('session_id')
    if (sessionId) {
      verifiedSessionId.value = sessionId
      currentStep.value = 3
      showingPaymentPending.value = true
      window.history.replaceState({}, '', '/tribute')
    }
  }

  const { data: { user } } = await supabase.auth.getUser()
  if (user) {
    const { data } = await supabase.from('user_access').select('*').eq('user_id', user.id)
    if (data) {
      const hasAllStories  = data.some((i) => i.access_type === 'story' && i.story_type === 'all')
      const hasImageExport = data.some((i) => i.access_type === 'export' && i.variant === 'with_images')
      isTier4.value = hasAllStories && hasImageExport
    }
  }
})

// ── Turnstile ─────────────────────────────────────────────────────────────────
watch(currentStep, async (step) => {
  if (step !== 3) return
  await nextTick()
  const renderWidget = () => {
    if (window.turnstile && turnstileRef.value) {
      window.turnstile.render(turnstileRef.value, {
        sitekey: import.meta.env.VITE_TURNSTILE_SITE_KEY,
        callback: (token: string) => { turnstileToken.value = token; turnstileError.value = false },
      })
    } else {
      setTimeout(renderWidget, 500)
    }
  }
  renderWidget()
})

// ── Navigation ────────────────────────────────────────────────────────────────
function nextStep() {
  stopPreview()
  if (currentStep.value < steps.length - 1) {
    currentStep.value++
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

// ── Photos ────────────────────────────────────────────────────────────────────
function triggerFileInput() { fileInputRef.value?.click() }

async function onFileSelect(event: Event) {
  const target = event.target as HTMLInputElement
  await addFiles(Array.from(target.files || []))
}

async function onDrop(event: DragEvent) {
  isDragging.value = false
  await addFiles(Array.from(event.dataTransfer?.files || []).filter((f) => f.type.startsWith('image/')))
}

async function addFiles(files: File[]) {
  const toAdd = files.slice(0, 30 - form.value.photos.length)
  for (const file of toAdd) {
    const dataUrl = await new Promise<string>((resolve) => {
      const reader = new FileReader()
      reader.onload = (e) => resolve(e.target?.result as string)
      reader.readAsDataURL(file)
    })
    form.value.photos.push(dataUrl)
  }
}

function removePhoto(index: number) { form.value.photos.splice(index, 1) }

function movePhoto(index: number, direction: -1 | 1) {
  const photos = form.value.photos
  const target = index + direction
  if (target < 0 || target >= photos.length) return;
  [photos[index], photos[target]] = [photos[target], photos[index]]
}

function onMusicUpload(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) form.value.musicFile = file
}

// ── Build options ─────────────────────────────────────────────────────────────
function buildOptions(watermark: boolean): TributeOptions {
  return {
    photos:        form.value.photos,
    name:          form.value.name,
    birthYear:     form.value.birthYear || undefined,
    deathYear:     form.value.deathYear || undefined,
    tribute:       form.value.tribute,
    musicTrack:    form.value.musicTrack,
    musicFile:     form.value.musicFile,
    transition:    form.value.transition,
    slideDuration: form.value.slideDuration,
    watermark,
  }
}

// ── Payment flow ──────────────────────────────────────────────────────────────
async function handlePreview() {
  if (!turnstileToken.value) { turnstileError.value = true; return }
  await generateTribute(buildOptions(true))
}

function handlePurchase() {
  if (!turnstileToken.value) { turnstileError.value = true; return }
  showPaymentModal.value = true
}

// Modal emits this when it successfully gets a Stripe URL — opens in new tab
function onPaymentOpened(url: string) {
  lastPaymentUrl.value = url
  showPaymentModal.value = false
  showingPaymentPending.value = true
}

function reopenPayment() {
  if (lastPaymentUrl.value) window.open(lastPaymentUrl.value, '_blank')
}

async function handlePaid() {
  showPaymentModal.value = false

  // If we have a verified session ID from the URL, verify it first
  if (verifiedSessionId.value) {
    await verifyAndGenerate(verifiedSessionId.value)
    return
  }

  // Otherwise ask them to enter the session ID or check manually
  // Prompt for session ID as a simple anti-fraud measure
  const sessionId = prompt(
    'Please paste the payment confirmation ID from your Stripe receipt email, or the URL you were redirected to after payment:'
  )

  if (!sessionId) return

  // Extract session ID if they pasted a full URL
  const match = sessionId.match(/cs_[a-zA-Z0-9_]+/)
  const extracted = match ? match[0] : sessionId.trim()

  await verifyAndGenerate(extracted)
}

async function verifyAndGenerate(sessionId: string) {
  isVerifying.value = true
  error.value = ''

  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/verify-tribute-payment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId }),
    })

    const { verified } = await response.json()

    if (!verified) {
      error.value = 'Payment could not be verified. Please check your payment was completed and try again.'
      isVerifying.value = false
      return
    }

    isVerifying.value = false
    showingPaymentPending.value = false
    await generateTribute(buildOptions(false))

  } catch {
    error.value = 'Could not verify payment. Please try again.'
    isVerifying.value = false
  }
}

async function handleTier4Download() {
  if (!turnstileToken.value) { turnstileError.value = true; return }
  await generateTribute(buildOptions(false))
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

.tribute-page { font-family: 'DM Sans', sans-serif; background: #F5F0E8; min-height: 100vh; }

/* Hero */
.tribute-hero { background: #1C1917; padding: 80px 24px 72px; text-align: center; position: relative; overflow: hidden; }
.tribute-hero::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse at 50% 0%, rgba(148,116,74,0.15) 0%, transparent 70%); pointer-events: none; }
.tribute-hero-inner { position: relative; max-width: 640px; margin: 0 auto; }
.hero-badge { display: inline-block; font-size: 11px; font-weight: 500; letter-spacing: 0.22em; text-transform: uppercase; color: #9C7C5C; margin-bottom: 20px; }
.hero-title { font-family: 'Playfair Display', Georgia, serif; font-size: clamp(2.2rem, 5vw, 3.5rem); font-weight: 700; color: #F5F0E8; line-height: 1.15; letter-spacing: -0.02em; margin: 0 0 16px; }
.hero-title em { font-style: italic; color: #C4A882; }
.hero-sub { font-size: 16px; line-height: 1.7; color: #A8A29E; margin: 0 0 24px; }
.hero-trust { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px 20px; font-size: 12px; color: #6C6460; }

/* Builder */
.builder-section { padding: 48px 20px 80px; }
.builder-inner { max-width: 680px; margin: 0 auto; }

/* Steps */
.steps-bar { display: flex; align-items: center; margin-bottom: 28px; background: white; border: 1px solid #E8DDD0; border-radius: 100px; padding: 6px; }
.step-item { flex: 1; display: flex; align-items: center; gap: 6px; justify-content: center; padding: 8px 12px; border-radius: 100px; cursor: default; transition: all 0.2s; }
.step-active { background: #1C1917; }
.step-done { cursor: pointer; opacity: 0.7; }
.step-dot { width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 600; flex-shrink: 0; }
.step-active .step-dot { background: #9C7C5C; color: white; }
.step-done .step-dot { background: #7C5C3B; color: white; }
.step-idle .step-dot { background: #F0EBE3; color: #A8A29E; }
.step-label { font-size: 12px; font-weight: 500; color: #1C1917; display: none; }
.step-active .step-label { display: block; color: white; }
@media (min-width: 500px) { .step-label { display: block; } .step-idle .step-label { color: #A8A29E; } .step-done .step-label { color: #7C5C3B; } }

/* Card */
.builder-card { background: white; border: 1px solid #E8DDD0; border-radius: 28px; padding: 32px; }
.card-title { font-family: 'Playfair Display', Georgia, serif; font-size: 1.6rem; font-weight: 700; color: #1C1917; margin: 0 0 6px; }
.card-sub { font-size: 14px; line-height: 1.6; color: #78716C; margin: 0 0 28px; }

/* Fields */
.field-group { margin-bottom: 20px; }
.field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px; }
.field-label { display: block; font-size: 13px; font-weight: 500; color: #1C1917; margin-bottom: 6px; }
.field-hint { font-size: 11px; color: #A8A29E; margin-top: 2px; margin-bottom: 8px; }
.required { color: #9C7C5C; }
.field-optional { font-weight: 400; color: #A8A29E; }
.field-input { display: block; width: 100%; border: 1.5px solid #E7E5E4; border-radius: 14px; padding: 10px 14px; font-size: 14px; font-family: 'DM Sans', sans-serif; color: #1C1917; background: white; outline: none; transition: border-color 0.15s; box-sizing: border-box; }
.field-input:focus { border-color: #7C5C3B; }
.field-input::placeholder { color: #D6D3D1; }
.field-textarea { resize: vertical; min-height: 100px; }
.field-count { font-size: 11px; color: #A8A29E; text-align: right; margin-top: 4px; }

/* Upload */
.upload-zone { border: 2px dashed #E8DDD0; border-radius: 20px; padding: 40px 24px; text-align: center; cursor: pointer; transition: all 0.15s; margin-bottom: 20px; background: #FAFAF9; }
.upload-zone:hover, .upload-zone-hover { border-color: #7C5C3B; background: #FAF7F4; }
.upload-icon { font-size: 32px; display: block; margin-bottom: 10px; }
.upload-text { font-size: 14px; color: #5C534E; margin: 0 0 4px; }
.upload-link { color: #7C5C3B; text-decoration: underline; }
.upload-hint { font-size: 12px; color: #A8A29E; margin: 0; }

/* Photos */
.photo-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 10px; margin-bottom: 24px; }
.photo-thumb { position: relative; border-radius: 12px; overflow: hidden; aspect-ratio: 1; border: 1.5px solid #E8DDD0; }
.photo-thumb-first { border-color: #7C5C3B; }
.photo-img { width: 100%; height: 100%; object-fit: cover; display: block; }
.photo-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; gap: 6px; opacity: 0; transition: opacity 0.15s; }
.photo-thumb:hover .photo-overlay { opacity: 1; }
.photo-btn { background: rgba(255,255,255,0.9); border: none; border-radius: 50%; width: 26px; height: 26px; font-size: 12px; cursor: pointer; color: #1C1917; }
.photo-btn-remove { background: rgba(220,38,38,0.85); color: white; }
.photo-first-badge { position: absolute; bottom: 4px; left: 4px; background: #7C5C3B; color: white; font-size: 9px; font-weight: 600; padding: 2px 6px; border-radius: 100px; text-transform: uppercase; }
.photo-empty { font-size: 13px; color: #A8A29E; text-align: center; padding: 20px; }

/* Music */
.option-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 8px; }
.option-card { border: 1.5px solid; border-radius: 16px; padding: 14px 10px; text-align: center; cursor: pointer; transition: all 0.15s; }
.option-active { border-color: #1C1917; background: #1C1917; }
.option-idle { border-color: #E7E5E4; background: white; }
.option-idle:hover { border-color: #A8A29E; }
.option-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; }
.option-emoji { font-size: 20px; }
.option-label { font-size: 12px; font-weight: 600; color: #1C1917; margin: 0 0 2px; }
.option-active .option-label { color: white; }
.option-desc { font-size: 10px; color: #78716C; margin: 0; }
.option-active .option-desc { color: #9C8C7C; }
.preview-btn { width: 26px; height: 26px; border-radius: 50%; border: 1.5px solid #E7E5E4; background: white; font-size: 9px; cursor: pointer; display: flex; align-items: center; justify-content: center; color: #7C5C3B; transition: all 0.15s; flex-shrink: 0; }
.preview-btn:hover { background: #F5F0E8; border-color: #7C5C3B; }
.preview-btn-playing { background: #7C5C3B; border-color: #7C5C3B; color: white; }
.option-active .preview-btn { border-color: rgba(255,255,255,0.3); color: white; background: rgba(255,255,255,0.15); }
.option-active .preview-btn-playing { background: rgba(255,255,255,0.3); }
.playing-bar { display: flex; align-items: flex-end; gap: 2px; height: 14px; margin-top: 6px; justify-content: center; }
.playing-bar span { display: block; width: 3px; border-radius: 2px; background: currentColor; opacity: 0.6; animation: bar-bounce 0.8s ease-in-out infinite; }
.playing-bar span:nth-child(1) { height: 6px; animation-delay: 0s; }
.playing-bar span:nth-child(2) { height: 12px; animation-delay: 0.15s; }
.playing-bar span:nth-child(3) { height: 8px; animation-delay: 0.3s; }
.playing-bar span:nth-child(4) { height: 10px; animation-delay: 0.45s; }
.option-active .playing-bar span { background: white; opacity: 0.8; }
@keyframes bar-bounce { 0%, 100% { transform: scaleY(0.4); } 50% { transform: scaleY(1); } }
.music-upload-btn { display: inline-block; margin-top: 8px; padding: 10px 18px; border: 1.5px dashed #E7E5E4; border-radius: 12px; font-size: 13px; color: #7C5C3B; cursor: pointer; }

/* Duration */
.duration-row { display: flex; gap: 10px; margin-top: 8px; }
.duration-btn { flex: 1; padding: 12px; border: 1.5px solid; border-radius: 14px; text-align: center; cursor: pointer; transition: all 0.15s; }
.duration-active { border-color: #1C1917; background: #1C1917; }
.duration-idle { border-color: #E7E5E4; background: white; }
.duration-idle:hover { border-color: #A8A29E; }
.duration-num { display: block; font-size: 20px; font-weight: 700; color: #1C1917; }
.duration-active .duration-num { color: white; }
.duration-hint { display: block; font-size: 11px; color: #A8A29E; margin-top: 2px; }
.duration-active .duration-hint { color: #9C8C7C; }

/* Transitions */
.transition-row { display: flex; gap: 10px; margin-top: 8px; }
.transition-btn { flex: 1; padding: 14px 10px; border: 1.5px solid; border-radius: 14px; text-align: center; cursor: pointer; transition: all 0.15s; }
.transition-active { border-color: #1C1917; background: #FAFAF9; }
.transition-idle { border-color: #E7E5E4; background: white; }
.transition-idle:hover { border-color: #A8A29E; }
.transition-preview { height: 28px; border-radius: 6px; overflow: hidden; margin: 0 auto 8px; width: 56px; border: 1px solid #E7E5E4; }
.t-cut { display: flex; height: 100%; }
.t-half-l { flex: 1; background: #C4B8AC; }
.t-half-r { flex: 1; background: #7C5C3B; }
.t-fade { height: 100%; background: linear-gradient(to right, #C4B8AC, #7C5C3B); }
.t-slow-fade { height: 100%; background: linear-gradient(to right, #C4B8AC 20%, #A89880, #7C5C3B 80%); }
.transition-label { font-size: 12px; font-weight: 600; color: #1C1917; margin: 0 0 2px; }
.transition-hint { font-size: 10px; color: #A8A29E; margin: 0; }

/* Estimate */
.estimate-bar { display: flex; align-items: center; justify-content: space-between; background: #F5F0E8; border: 1px solid #E8DDD0; border-radius: 14px; padding: 12px 16px; font-size: 13px; color: #5C534E; margin-top: 20px; }
.estimate-value { font-weight: 600; color: #1C1917; }

/* Summary */
.summary-card { background: #FAFAF9; border: 1px solid #E8DDD0; border-radius: 16px; padding: 16px 20px; margin-bottom: 24px; }
.summary-row { display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #F0EBE3; font-size: 13px; }
.summary-row:last-child { border-bottom: none; }
.summary-label { color: #78716C; }
.summary-value { font-weight: 500; color: #1C1917; }

/* Turnstile */
.turnstile-wrap { margin-bottom: 16px; min-height: 65px; }

/* Progress */
.progress-section { margin: 20px 0; }
.progress-bar-wrap { height: 6px; background: #F0EBE3; border-radius: 100px; overflow: hidden; margin-bottom: 10px; }
.progress-bar-fill { height: 100%; background: #7C5C3B; border-radius: 100px; transition: width 0.5s ease; }
.progress-row { display: flex; justify-content: space-between; font-size: 13px; color: #5C534E; }
.progress-pct { font-weight: 600; color: #1C1917; }
.progress-note { font-size: 12px; color: #A8A29E; margin-top: 8px; }

/* Payment pending */
.payment-pending-card { background: #F5F0E8; border: 1px solid #E8DDD0; border-radius: 20px; padding: 28px; text-align: center; margin-bottom: 16px; }
.payment-pending-icon { font-size: 36px; margin-bottom: 12px; }
.payment-pending-title { font-family: 'Playfair Display', Georgia, serif; font-size: 1.2rem; font-weight: 700; color: #1C1917; margin: 0 0 8px; }
.payment-pending-desc { font-size: 14px; line-height: 1.7; color: #5C534E; margin: 0; }

/* Export buttons */
.export-buttons { display: flex; flex-direction: column; gap: 12px; margin-bottom: 16px; }
.btn-preview, .btn-purchase { display: flex; align-items: center; gap: 14px; width: 100%; padding: 16px 20px; border-radius: 20px; border: 1.5px solid; cursor: pointer; text-align: left; transition: all 0.15s; }
.btn-preview { border-color: #E7E5E4; background: white; }
.btn-preview:hover { border-color: #A8A29E; }
.btn-purchase { border-color: #1C1917; background: #1C1917; }
.btn-purchase:hover { opacity: 0.9; }
.btn-icon { font-size: 22px; flex-shrink: 0; }
.btn-main-label { font-size: 14px; font-weight: 600; color: #1C1917; margin: 0 0 2px; }
.btn-purchase .btn-main-label { color: white; }
.btn-sub-label { font-size: 12px; color: #78716C; margin: 0; }
.btn-purchase .btn-sub-label { color: #9C8C7C; }
.trust-row { display: flex; flex-wrap: wrap; gap: 6px 10px; justify-content: center; font-size: 11px; color: #A8A29E; margin-bottom: 16px; }

/* Shared buttons */
.btn-primary { display: inline-block; background: #7C5C3B; color: white; font-size: 14px; font-weight: 500; padding: 13px 26px; border-radius: 100px; border: none; cursor: pointer; transition: opacity 0.2s; width: 100%; text-align: center; }
.btn-primary:hover { opacity: 0.88; }
.btn-primary:disabled { opacity: 0.4; cursor: not-allowed; }
.btn-secondary { display: inline-block; background: white; color: #1C1917; font-size: 14px; font-weight: 500; padding: 12px 22px; border-radius: 100px; border: 1.5px solid #E7E5E4; cursor: pointer; transition: all 0.15s; }
.btn-secondary:hover { border-color: #A8A29E; }
.btn-row { display: flex; gap: 10px; margin-top: 24px; }
.btn-row .btn-primary { flex: 2; }
.btn-row .btn-secondary { flex: 1; }
.btn-back-link { background: none; border: none; font-size: 13px; color: #A8A29E; cursor: pointer; padding: 0; }
.btn-back-link:hover { color: #5C534E; }
.error-text { font-size: 13px; color: #DC2626; background: #FEF2F2; border: 1px solid #FECACA; border-radius: 12px; padding: 10px 14px; margin-bottom: 16px; }

/* Why section */
.why-section { background: #1C1917; padding: 64px 24px 80px; }
.why-inner { max-width: 800px; margin: 0 auto; text-align: center; }
.why-eyebrow { font-size: 11px; font-weight: 500; letter-spacing: 0.22em; text-transform: uppercase; color: #9C7C5C; margin: 0 0 12px; }
.why-title { font-family: 'Playfair Display', Georgia, serif; font-size: clamp(1.6rem, 3vw, 2.2rem); font-weight: 700; color: #F5F0E8; margin: 0 0 32px; }
.why-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 40px; }
@media (min-width: 600px) { .why-grid { grid-template-columns: repeat(4, 1fr); } }
.why-card { background: #2C2420; border: 1px solid #3C3430; border-radius: 20px; padding: 20px 16px; }
.why-icon { font-size: 24px; display: block; margin-bottom: 10px; }
.why-card-title { font-size: 13px; font-weight: 600; color: #E8DDD0; margin: 0 0 6px; }
.why-card-desc { font-size: 12px; line-height: 1.6; color: #6C6460; margin: 0; }
.upsell-card { background: #2C2420; border: 1px solid #3C3430; border-radius: 24px; padding: 32px; text-align: left; }
.upsell-eyebrow { font-size: 11px; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; color: #9C7C5C; margin: 0 0 10px; }
.upsell-title { font-family: 'Playfair Display', Georgia, serif; font-size: 1.4rem; font-weight: 700; color: #F5F0E8; margin: 0 0 12px; line-height: 1.25; }
.upsell-desc { font-size: 14px; line-height: 1.7; color: #8C847E; margin: 0 0 20px; }
.upsell-btn { display: inline-block; background: #7C5C3B; color: white; font-size: 13px; font-weight: 500; padding: 11px 22px; border-radius: 100px; text-decoration: none; transition: opacity 0.2s; }
.upsell-btn:hover { opacity: 0.88; }
.hidden { display: none; }

.verifying-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 16px;
  font-size: 14px;
  color: #5C534E;
}

.spinner {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid #E8DDD0;
  border-top-color: #7C5C3B;
  animation: spin 0.8s linear infinite;
  flex-shrink: 0;
}

@keyframes spin { to { transform: rotate(360deg); } }

</style>