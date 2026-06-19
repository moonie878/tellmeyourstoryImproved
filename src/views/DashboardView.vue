<template>
  <div class="min-h-screen bg-stone-50 px-4 py-8 sm:px-6 md:py-12">
    <div class="mx-auto max-w-6xl space-y-6 sm:space-y-8">

      <!-- Hero -->
      <section class="overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-sm">
        <div class="grid gap-6 px-5 py-6 sm:px-6 sm:py-8 md:grid-cols-[1.2fr_0.8fr] md:gap-8 md:px-8 md:py-10">
          <div class="text-center md:text-left">
            <p class="text-xs font-medium uppercase tracking-[0.25em] text-stone-500">Dashboard</p>
            <h1 class="mt-3 text-2xl font-bold text-stone-900 sm:text-3xl md:text-4xl">
              Welcome to Tell Me Your Story
            </h1>
            <p class="mt-4 max-w-2xl text-sm leading-7 text-stone-600 sm:text-base">
              Create meaningful keepsakes, return to them whenever you like, and turn treasured
              memories into something beautifully finished.
            </p>
            <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center md:justify-start">
              <button @click="createStory('mum')" class="rounded-full bg-[#7C5C3B] px-5 py-3 text-sm font-medium text-white transition hover:opacity-90">
                Start Mum Story
              </button>
              <button @click="createStory('dad')" class="rounded-full border border-stone-300 bg-white px-5 py-3 text-sm font-medium text-stone-900 transition hover:bg-stone-100">
                Start Dad Story
              </button>
              <button @click="createStory('child_story')" class="rounded-full bg-[#7C5C3B] px-5 py-3 text-sm font-medium text-white transition hover:opacity-90">
                Start Child Story
              </button>
            </div>
            <p v-if="isFirstTimeUser" class="mt-5 inline-block rounded-full bg-stone-100 px-3 py-1 text-sm text-stone-700">
              Your first keepsake can be started in under a minute — answer as many or as few questions as you like 💛
            </p>
          </div>

          <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-1">
            <div class="rounded-3xl bg-stone-50 p-5">
              <p class="text-sm font-semibold text-stone-900">Your library</p>
              <p class="mt-2 text-sm leading-6 text-stone-600">Keep all your stories in one place and return whenever inspiration comes.</p>
            </div>
            <div class="rounded-3xl bg-stone-50 p-5">
              <p class="text-sm font-semibold text-stone-900">Finished keepsakes</p>
              <p class="mt-2 text-sm leading-6 text-stone-600">Export polished PDFs and documents when you're ready to preserve the story.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Story starters -->
      <section class="rounded-[2rem] border border-stone-200 bg-white p-5 shadow-sm sm:p-6 md:p-8">
        <div class="text-center md:text-left">
          <p class="text-xs font-medium uppercase tracking-[0.25em] text-stone-500">Start a new story</p>
          <h2 class="mt-2 text-2xl font-bold text-stone-900">Choose the keepsake you want to create</h2>
          <p class="mt-2 text-sm text-stone-500">Answer as many or as few questions as feel right — there's no pressure to complete them all.</p>
        </div>
        <div class="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <button
            v-for="type in storyTypes"
            :key="type.id"
            @click="createStory(type.id)"
            class="group rounded-[1.75rem] border border-stone-200 bg-stone-50 p-5 text-left transition hover:-translate-y-1 hover:border-stone-300 hover:bg-white hover:shadow-md"
          >
            <p v-if="type.label" class="text-xs font-medium uppercase tracking-[0.2em] text-stone-500">{{ type.label }}</p>
            <h3 class="mt-3 text-lg font-semibold text-stone-900">{{ type.title }}</h3>
            <p class="mt-2 text-sm leading-6 text-stone-600">{{ type.description }}</p>
            <p class="mt-4 text-sm font-medium text-[#7C5C3B]">Start story →</p>
          </button>
        </div>
      </section>

      <!-- Empty state -->
      <section v-if="isFirstTimeUser" class="rounded-[2rem] border border-stone-200 bg-white p-5 shadow-sm sm:p-6 md:p-8">
        <div class="max-w-3xl text-center md:text-left">
          <p class="text-xs font-medium uppercase tracking-[0.25em] text-stone-500">Welcome</p>
          <h2 class="mt-3 text-2xl font-bold text-stone-900">Start your first keepsake in a few simple steps</h2>
          <p class="mt-3 text-sm leading-7 text-stone-600 sm:text-base">
            Choose a story, answer one memory at a time, and slowly turn it into something you can save, print, and share.
          </p>
        </div>
        <div class="mt-8 grid gap-4 md:grid-cols-3">
          <div class="rounded-2xl bg-stone-50 p-5">
            <p class="text-sm font-semibold text-stone-900">1. Choose a story</p>
            <p class="mt-2 text-sm leading-6 text-stone-600">Start with a meaningful story type and begin capturing memories straight away.</p>
          </div>
          <div class="rounded-2xl bg-stone-50 p-5">
            <p class="text-sm font-semibold text-stone-900">2. Answer at your own pace</p>
            <p class="mt-2 text-sm leading-6 text-stone-600">Write one answer at a time with autosave, so nothing feels rushed.</p>
          </div>
          <div class="rounded-2xl bg-stone-50 p-5">
            <p class="text-sm font-semibold text-stone-900">3. Turn it into a keepsake</p>
            <p class="mt-2 text-sm leading-6 text-stone-600">Export the finished story as a beautifully preserved PDF or printed book.</p>
          </div>
        </div>
      </section>

      <!-- Stories -->
      <section v-if="stories.length" class="space-y-5">
        <div class="text-center md:text-left">
          <p class="text-xs font-medium uppercase tracking-[0.25em] text-stone-500">Your stories</p>
          <h2 class="mt-2 text-2xl font-bold text-stone-900">Continue where you left off</h2>
        </div>

        <div class="grid gap-5 lg:grid-cols-2">
          <article
            v-for="story in stories"
            :key="story.id"
            class="overflow-hidden rounded-[2rem] border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div class="grid gap-0 sm:grid-cols-[140px_1fr]">

              <!-- Thumbnail -->
              <div class="flex min-h-[160px] items-center justify-center bg-stone-100 p-4">
                <img
                  v-if="story.cover_image_url"
                  :src="story.cover_image_url"
                  alt="Story cover"
                  class="h-full max-h-[180px] w-auto rounded-xl object-cover shadow-sm"
                  loading="lazy"
                />
                <div v-else class="flex h-full w-full items-center justify-center rounded-2xl border border-dashed border-stone-300 bg-white px-4 text-center">
                  <div>
                    <p class="text-xs font-medium uppercase tracking-[0.18em] text-stone-500">{{ story.story_type }}</p>
                    <p class="mt-2 text-sm text-stone-600">Keepsake preview</p>
                  </div>
                </div>
              </div>

              <!-- Content -->
<div class="flex flex-col p-5 sm:p-6 min-w-0 overflow-hidden">

  <!-- Title + badge -->
  <div class="flex flex-wrap items-center gap-2">
    <h3 class="text-xl font-semibold text-stone-900">{{ story.title }}</h3>
    <span v-if="hasAllStoriesAccess()" class="rounded-full bg-stone-900 px-2.5 py-0.5 text-xs font-medium text-white">All Stories</span>
    <span v-else-if="hasStoryAccess(story.story_type)" class="rounded-full bg-stone-200 px-2.5 py-0.5 text-xs font-medium text-stone-700">Unlocked</span>
    <span v-else class="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700">Free Draft</span>
  </div>

  <!-- Meta -->
  <p class="mt-1.5 text-sm text-stone-500">{{ formatStoryType(story.story_type) }} • {{ formatDate(story.created_at) }}</p>

  <!-- Progress -->
  <div class="mt-4">
    <div class="flex items-center justify-between text-xs text-stone-500">
      <span>Progress</span>
      <span class="font-medium text-stone-700">{{ story.progress }}%</span>
    </div>
    <div class="mt-1.5 h-1.5 w-full rounded-full bg-stone-200">
      <div class="h-1.5 rounded-full bg-[#7C5C3B] transition-all" :style="{ width: `${story.progress}%` }" />
    </div>
  </div>

  <!-- Access status -->
  <div class="mt-3 flex gap-4 text-xs text-stone-500">
    <span>
      Story:
      <span v-if="hasStoryAccess(story.story_type)" class="font-medium text-green-600">Unlocked</span>
      <span v-else class="font-medium text-amber-600">Free draft</span>
    </span>
    <span>
      Export:
      <span v-if="canExportStory(story.story_type)" class="font-medium text-green-600">Unlocked</span>
      <span v-else class="font-medium text-amber-600">Locked</span>
    </span>
  </div>

  <!-- Primary actions -->
  <div class="mt-5 flex flex-wrap gap-2">
    <button
      @click="openStory(story.id)"
      class="rounded-full bg-[#7C5C3B] px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
    >
      {{ hasStoryAccess(story.story_type) ? 'Continue' : 'Edit Draft' }}
    </button>

    <button
  v-if="hasPrintAccess()"
  @click="openBindingModal(story)"
  :disabled="generatingPrintId === story.id"
  class="rounded-full border border-[#7C5C3B] bg-white px-5 py-2.5 text-sm font-medium text-[#7C5C3B] transition hover:bg-[#F5F0E8] disabled:opacity-50"
>
  {{ generatingPrintId === story.id ? 'Preparing…' : '📖 Order Printed Book' }}
</button>

  <!-- TEMP — remove once hardcover dimensions are confirmed working -->
  <button
    v-if="hasPrintAccess()"
    @click="previewCover(story, '0600X0900.FC.PRE.CW.080CW444.GXX', 142)"
    class="rounded-full border border-stone-300 bg-white px-4 py-2.5 text-xs font-medium text-stone-500 transition hover:bg-stone-50"
  >
    🔍 Preview hardcover
  </button>
  </div>

  <p v-if="hasPrintAccess()" class="mt-1.5 text-xs text-stone-400">
    Printed & shipped to your door — from £{{ PRINTED_BOOK_FROM_PRICE.toFixed(2) }}, UK shipping included
  </p>

  <p v-if="generatingPrintId === story.id" class="mt-1.5 text-xs text-stone-500">
    Building your book for print — this takes about 30 seconds…
  </p>

  <!-- Secondary actions — share + delete -->
  <div class="mt-5 flex items-center gap-3 border-t border-stone-100 pt-4">

    <!-- Share with family -->
    <div class="flex-1 min-w-0 overflow-hidden">
      <div v-if="!shareLinks[story.id]">
        <button
          @click="generateShareLink(story.id)"
          :disabled="sharingStoryId === story.id"
          class="inline-flex items-center gap-1.5 text-xs text-stone-500 transition hover:text-stone-800 disabled:opacity-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
            <polyline points="16 6 12 2 8 6"/>
            <line x1="12" y1="2" x2="12" y2="15"/>
          </svg>
          {{ sharingStoryId === story.id ? 'Generating…' : 'Share with family' }}
        </button>
      </div>

      <div v-else class="space-y-2">
        <p class="text-xs font-medium text-stone-700">🤍 Family link</p>
       <div class="flex items-center gap-2 rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 overflow-hidden">
  <p class="flex-1 truncate text-xs text-stone-500 min-w-0 overflow-hidden">{{ shareLinks[story.id] }}</p>
          <button
            @click="copyShareLink(story.id)"
            class="flex-shrink-0 text-xs font-medium text-[#7C5C3B] hover:underline"
          >
            {{ shareCopied === story.id ? '✓ Copied' : 'Copy' }}
          </button>
        </div>
        <div class="flex items-center gap-2">
          <button
            @click="shareStoryWhatsApp(story.id, story.title)"
            class="inline-flex items-center gap-1 rounded-full border border-stone-200 bg-white px-3 py-1.5 text-xs font-medium text-stone-700 transition hover:bg-stone-50"
          >
            💬 WhatsApp
          </button>
          <p class="text-[10px] text-stone-400">Family can view & comment</p>
        </div>
      </div>
    </div>

    <!-- Delete — tucked to the right, small and unobtrusive -->
    <button
      @click.stop="deleteStory(story.id)"
      :disabled="deletingStoryId === story.id"
      class="flex-shrink-0 text-xs text-stone-400 transition hover:text-red-500 disabled:opacity-50"
    >
      {{ deletingStoryId === story.id ? 'Deleting…' : 'Delete' }}
    </button>

  </div>

</div>
            </div>
          </article>
        </div>
      </section>

      <!-- Bottom info cards -->
      <section class="grid gap-5 md:grid-cols-3 md:gap-6">
        <div class="rounded-[1.75rem] border border-stone-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 class="text-lg font-semibold text-stone-900">Your stories</h2>
          <p class="mt-2 text-sm leading-6 text-stone-600">Start and continue keepsakes for parents, grandparents, couples, and more.</p>
        </div>
        <div class="rounded-[1.75rem] border border-stone-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 class="text-lg font-semibold text-stone-900">Your progress</h2>
          <p class="mt-2 text-sm leading-6 text-stone-600">Return any time and keep building each story at your own pace.</p>
        </div>
        <div class="rounded-[1.75rem] border border-stone-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 class="text-lg font-semibold text-stone-900">Your keepsakes</h2>
          <p class="mt-2 text-sm leading-6 text-stone-600">Turn completed stories into polished keepsakes you can save, print, and share.</p>
        </div>
      </section>
      <!-- ── Share section ── -->
<section class="rounded-[2rem] border border-stone-200 bg-white p-5 shadow-sm sm:p-6 md:p-8">
  <div class="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
    <div>
      <p class="text-xs font-medium uppercase tracking-[0.25em] text-stone-500">Share</p>
      <h2 class="mt-2 text-xl font-bold text-stone-900">Know someone who'd love this?</h2>
      <p class="mt-2 max-w-lg text-sm leading-6 text-stone-600">
        If Tell Me Your Story means something to you, sharing it with one person who has an elderly parent or grandparent is the kindest thing you can do.
      </p>
    </div>
    <div class="flex flex-shrink-0 flex-col gap-2 sm:items-end">
      <button
        @click="handleShare"
        class="inline-flex items-center gap-2 rounded-full bg-[#7C5C3B] px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
      >
        <span>🤍</span>
        <span>Share Tell Me Your Story</span>
      </button>
      <div class="flex gap-2">
        <button
          @click="shareWhatsApp('dashboard')"
          class="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-4 py-2 text-xs font-medium text-stone-700 transition hover:bg-stone-50"
        >
          <span>💬</span> WhatsApp
        </button>
        <button
          @click="shareEmail('dashboard')"
          class="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-4 py-2 text-xs font-medium text-stone-700 transition hover:bg-stone-50"
        >
          <span>✉️</span> Email
        </button>
      </div>
      <p v-if="shareResult" class="text-xs text-green-600">{{ shareResult }}</p>
    </div>
  </div>
</section>
    </div>

    <!-- Print Order Modal -->
  <PrintOrderModal
  v-if="printModalOpen && printModalData"
  :interior-pdf-blob="printModalData.interiorBlob"
  :cover-pdf-blob="printModalData.coverBlob"
  :photo-book-blob="printModalData.photoBookBlob"
  :photo-book-cover-blob="printModalData.photoBookCoverBlob"
  :page-count="printModalData.pageCount"
  :story-title="printModalData.storyTitle"
  :story-id="printModalData.storyId"
  :user-id="printModalData.userId"
  :user-email="printModalData.userEmail"
  :print-cost="printModalData.printCost"
  :stripe-payment-id="printModalData.stripePaymentId"
  :pod-id="printModalData.podId"
  :binding-label="printModalData.bindingLabel"
  @close="printModalOpen = false"
  @ordered="onOrdered"
/>

    <!-- Binding select modal -->
<div v-if="bindingModalOpen && bindingModalStory" class="fixed inset-0 z-50 flex items-center justify-center px-4">
  <div class="absolute inset-0 bg-black/50" @click="bindingModalOpen = false" />
  <div class="relative w-full max-w-sm rounded-3xl bg-white px-8 py-8 shadow-2xl">
    <h2 class="text-xl font-bold text-stone-900">Choose your book type</h2>
    <p class="mt-2 text-sm text-stone-500">Select a binding before checkout. Price includes UK shipping.</p>

    <div v-if="!bindingModalPricesReady" class="mt-6 flex flex-col items-center gap-3 py-8">
      <svg class="h-6 w-6 animate-spin text-[#7C5C3B]" viewBox="0 0 24 24" fill="none">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
      </svg>
      <p class="text-xs text-stone-500">Calculating pricing for your book…</p>
    </div>

    <div v-else class="mt-5 space-y-2">
      <button
        v-for="b in bindingOptions"
        :key="b.id"
        @click="selectedBindingId = b.id"
        class="w-full rounded-2xl border p-4 text-left transition"
        :class="selectedBindingId === b.id ? 'border-[#7C5C3B] bg-[#FAF7F4]' : 'border-stone-200 hover:bg-stone-50'"
      >
        <div class="flex items-center justify-between">
          <p class="text-sm font-semibold text-stone-900">{{ b.label }}</p>
          <p class="text-sm font-bold text-stone-900">£{{ getPrintPrice(b.id, bindingModalPageCount || 0).toFixed(2) }}</p>
        </div>
        <p class="mt-0.5 text-xs text-stone-500">{{ b.desc }}</p>
      </button>
      <p class="pt-1 text-center text-[11px] text-stone-400">{{ bindingModalPageCount }} pages · price includes UK shipping</p>
    </div>

    <div class="mt-6 flex gap-3">
      <button
        @click="bindingModalOpen = false"
        class="flex-1 rounded-full border border-stone-300 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-50"
      >
        Cancel
      </button>
      <button
        @click="startPrintOrder(bindingModalStory)"
        :disabled="!bindingModalPricesReady"
        class="flex-1 rounded-full bg-[#7C5C3B] py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50"
      >
        Continue to payment →
      </button>
    </div>
  </div>
</div>


  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../lib/supabase'
import { track } from '../lib/analytics'
import { STORY_TYPES } from '../data/storyTypes'
import { useStoryTrueBookExport } from '../composables/useTrueBookExport'
import { generateCoverPDF } from '../lib/generateCoverPDF'
import PrintOrderModal from '../components/print/PrintOrderModal.vue'
import { useShare } from '../composables/useShare'
import { PRINTED_BOOK_FROM_PRICE } from '../lib/printPricing'
import { usePhotoBookExport } from '../composables/usePhotoBookExport'

// ─── State ────────────────────────────────────────────────────────────────────

const stories           = ref<any[]>([])
const userAccess        = ref<any[]>([])
const isFirstTimeUser   = ref(false)
const deletingStoryId   = ref<string | null>(null)
const generatingPrintId = ref<string | null>(null)
const printModalOpen    = ref(false)
const printModalData    = ref<{
  interiorBlob: Blob
  coverBlob: Blob
  photoBookCoverBlob: Blob | null  // ← add
  photoBookBlob: Blob | null   // ← add this
  pageCount: number
  storyTitle: string
  storyId: string
  userId: string
  userEmail: string
  stripePaymentId: string
  printCost: number
   podId: string        // ← add
  bindingLabel: string // ← add
} | null>(null)

const router     = useRouter()
const storyTypes = STORY_TYPES
const { exportTrueBookAsBlob } = useStoryTrueBookExport()
const { exportPhotoBookAsBlob } = usePhotoBookExport()

const API_BASE = import.meta.env.VITE_API_BASE_URL as string
const POD_PACKAGE_ID = '0600X0900.FC.STD.PB.060UW444.MXX'

// ─── TEMP: cover preview for testing Lulu dimensions before ordering ───────────
// Remove once hardcover/dust jacket cover dimensions are confirmed working.
async function previewCover(story: any, podId: string, pageCount: number) {
  try {
    const dimsResponse = await fetch(`${API_BASE}/lulu-cover-dimensions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        pod_package_id: podId,
        interior_page_count: pageCount,
        unit: 'mm',
      }),
    })

    if (!dimsResponse.ok) {
      alert('Could not fetch dimensions from Lulu — check console.')
      console.error(await dimsResponse.text())
      return
    }

    const dims = await dimsResponse.json()
    const luluWidth = parseFloat(dims.width)
    const luluHeight = parseFloat(dims.height)
    console.log('Preview — Lulu dimensions for', podId, ':', luluWidth, luluHeight)

    const bindingType =
      podId === '0600X0900.FC.PRE.LW.080CW444.GNG' ? 'dustjacket' :
      podId === '0600X0900.FC.PRE.CW.080CW444.GXX' ? 'hardcover' :
      'softcover'

    const coverBlob = await generateCoverPDF({
      title: story.title || 'Untitled Story',
      subtitle: 'A life told through memories, moments, and love',
      pageCount,
      coverImageUrl: story.cover_image_url || '',
      loadImageAsBase64,
      luluWidth,
      luluHeight,
      bindingType,
    })

    const url = URL.createObjectURL(coverBlob)
    const a = document.createElement('a')
    a.href = url
    a.download = `cover-preview-${bindingType}-${luluWidth.toFixed(2)}x${luluHeight.toFixed(2)}mm.pdf`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    setTimeout(() => URL.revokeObjectURL(url), 5000)
  } catch (err) {
    console.error('Cover preview error:', err)
    alert('Something went wrong generating the preview — check console.')
  }
}

const shareResult    = ref<string>('')

const sharingStoryId   = ref<string | null>(null)
const shareLinks       = ref<Record<string, string>>({})
const shareCopied      = ref<string | null>(null)

const { share, shareWhatsApp, shareEmail } = useShare()

const bindingModalOpen  = ref(false)
const bindingModalStory = ref<any>(null)
const selectedBindingId = ref<BindingId>('softcover')
const bindingModalPricesReady  = ref(false)
const bindingModalPageCount    = ref<number | null>(null)
const bindingModalInteriorBlob = ref<Blob | null>(null)

import { BINDING_CONFIGS, getPrintPrice, type BindingId } from '../lib/printPricing'

const bindingOptions = BINDING_CONFIGS

async function handleShare() {
  const result = await share('dashboard')
  if (result === 'copied') {
    shareResult.value = 'Link copied to clipboard!'
    setTimeout(() => shareResult.value = '', 3000)
  }
}

function openBindingModal(story: any) {
  selectedBindingId.value = 'softcover'
  bindingModalStory.value = story
  bindingModalOpen.value  = true
  bindingModalPricesReady.value = false
  bindingModalPageCount.value = null
  bindingModalInteriorBlob.value = null

  // Generate the interior PDF immediately so we know the REAL page count
  // before showing any price. Previously, a flat price was shown here and
  // the actual page count (which drives Lulu's real cost) was only
  // discovered AFTER payment — meaning long books were being sold at a
  // loss. See printPricing.ts for the bracket pricing this now uses.
  prepareInteriorForPricing(story)
}

async function prepareInteriorForPricing(story: any) {
  try {
    const { data: sections } = await supabase
      .from('story_sections')
      .select('*')
      .eq('story_type', story.story_type)
      .order('order_index')

    const { data: answers } = await supabase
      .from('story_answers')
      .select('*')
      .eq('project_id', story.id)

    const mergedSections = (sections || []).map((s: any) => {
      const answer = answers?.find((a: any) => a.section_id === s.id)
      return { ...s, answer: answer?.answer || '', is_highlighted: answer?.is_highlighted || false }
    })

    async function getAllImagesForExport() {
      const { data } = await supabase.from('story_images').select('*').eq('project_id', story.id)
      return data || []
    }

    const { blob: interiorBlob, pageCount: actualPageCount } = await exportTrueBookAsBlob(
      story, mergedSections, getAllImagesForExport, loadImageAsBase64, story.cover_image_url || ''
    )

    // Only apply if the modal is still open for this same story — guards
    // against a stale result landing after the user closed/changed stories.
    if (bindingModalStory.value?.id !== story.id) return

    bindingModalInteriorBlob.value = interiorBlob
    bindingModalPageCount.value    = actualPageCount
    bindingModalPricesReady.value  = true
  } catch (err) {
    console.error('Failed to prepare interior for pricing:', err)
    bindingModalPricesReady.value = false
    alert('Could not calculate pricing for this book. Please try again.')
    bindingModalOpen.value = false
  }
}

async function generateShareLink(storyId: string) {
  sharingStoryId.value = storyId

  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    // Check if a share already exists for this story
    const { data: existing } = await supabase
      .from('story_shares')
      .select('token')
      .eq('project_id', storyId)
      .eq('created_by', user.id)
      .maybeSingle()

    if (existing?.token) {
      shareLinks.value[storyId] = `${window.location.origin}/story/share/${existing.token}`
      return
    }

    // Create a new share
    const { data, error } = await supabase
      .from('story_shares')
      .insert({ project_id: storyId, created_by: user.id })
      .select('token')
      .single()

    if (error) throw error
    shareLinks.value[storyId] = `${window.location.origin}/story/share/${data.token}`

  } catch (err) {
    console.error('Share link error:', err)
  } finally {
    sharingStoryId.value = null
  }
}

async function copyShareLink(storyId: string) {
  const link = shareLinks.value[storyId]
  if (!link) return
  await navigator.clipboard.writeText(link)
  shareCopied.value = storyId
  setTimeout(() => shareCopied.value = null, 2000)
}

async function shareStoryWhatsApp(storyId: string, storyTitle: string) {
  const link = shareLinks.value[storyId]
  if (!link) return
  const text = encodeURIComponent(`Come and read ${storyTitle} — a keepsake story being written on Tell Me Your Story 🤍\n\n${link}`)
  window.open(`https://wa.me/?text=${text}`, '_blank')
}



// ─── Helpers ──────────────────────────────────────────────────────────────────

function getStoryTitle(type: string) {
  return STORY_TYPES.find(s => s.id === type)?.projectTitle || 'New Story'
}

function formatStoryType(type: string) {
  const labels: Record<string, string> = {
    mum: "Mum's Story", dad: "Dad's Story", grandma: "Grandma's Story",
    grandad: "Grandad's Story", life: 'Life Story', couple: 'Couple Story',
    child_story: "Your Child's Story",
  }
  return labels[type] || type
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString()
}

// ─── Access helpers ───────────────────────────────────────────────────────────

function hasStoryAccess(storyType: string) {
  return userAccess.value.some(
    item => item.access_type === 'story' &&
      (item.story_type === storyType || item.story_type === 'all')
  )
}

function hasExportAccess() {
  return userAccess.value.some(
    item => item.access_type === 'export' &&
      (item.variant === 'text_only' || item.variant === 'with_images')
  )
}

function canExportStory(storyType: string) {
  return hasStoryAccess(storyType) && hasExportAccess()
}

function hasAllStoriesAccess() {
  return userAccess.value.some(
    item => item.access_type === 'story' && item.story_type === 'all'
  )
}

function hasPrintAccess() {
  return userAccess.value.some(
    item => item.access_type === 'print' ||
      item.variant === 'premium' ||
      item.variant === 'with_images'
  )
}

// ─── Image helpers ────────────────────────────────────────────────────────────

async function loadImageAsBase64(url: string): Promise<string> {
  const response = await fetch(url)
  const blob     = await response.blob()
  return new Promise((resolve, reject) => {
    const reader   = new FileReader()
    reader.onload  = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

// ─── Print order flow ─────────────────────────────────────────────────────────

// Step 1 — redirect to Stripe checkout
async function startPrintOrder(story: any) {
  generatingPrintId.value = story.id
  bindingModalOpen.value  = false

  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const binding = bindingOptions.find((b) => b.id === selectedBindingId.value)!
    const pageCount = bindingModalPageCount.value || 0
    const price = getPrintPrice(binding.id, pageCount)

    console.log('Sending to checkout:', {
      amount: Math.round(price * 100),
      podId: binding.podId,
      binding: binding.label,
      pageCount,
    })

    const response = await fetch(`${API_BASE}/create-print-checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId:     user.id,
        storyId:    story.id,
        storyTitle: story.title || 'My Story',
        amount:     Math.round(price * 100), // pence — now correctly bracketed by real page count
        podId:      binding.podId,
        binding:    binding.label,
        includesPhotoBook:  binding.includesPhotoBook,
        pageCount,
      }),
    })

    const { url, error } = await response.json()
    if (error) throw new Error(error)
    window.location.href = url

  } catch (err) {
    console.error('Print checkout error:', err)
    alert('Something went wrong. Please try again.')
  } finally {
    generatingPrintId.value = null
  }
}

// Step 2 — generate PDFs and open modal (called after Stripe payment success)
async function openPrintModal(story: any, sessionId: string) {
  generatingPrintId.value = story.id
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const storyTitle = story.title || 'My Story'
    const subtitle   = 'A life told through memories, moments, and love'

    async function getAllImagesForExport() {
      const { data } = await supabase.from('story_images').select('*').eq('project_id', story.id)
      return data || []
    }

    // Reuse the interior PDF generated earlier in prepareInteriorForPricing
    // (before checkout) if it's still available for this story — avoids
    // regenerating the same PDF twice. Falls back to regenerating if the
    // page was refreshed or the cached blob isn't for this story.
    let interiorBlob: Blob
    let actualPageCount: number

    if (bindingModalInteriorBlob.value && bindingModalStory.value?.id === story.id) {
      interiorBlob = bindingModalInteriorBlob.value
      actualPageCount = bindingModalPageCount.value!
      console.log('Reusing pre-generated interior PDF, page count:', actualPageCount)
    } else {
      const { data: sections } = await supabase
        .from('story_sections')
        .select('*')
        .eq('story_type', story.story_type)
        .order('order_index')

      const { data: answers } = await supabase
        .from('story_answers')
        .select('*')
        .eq('project_id', story.id)

      const mergedSections = (sections || []).map((s: any) => {
        const answer = answers?.find((a: any) => a.section_id === s.id)
        return { ...s, answer: answer?.answer || '', is_highlighted: answer?.is_highlighted || false }
      })

      const result = await exportTrueBookAsBlob(
        story, mergedSections, getAllImagesForExport, loadImageAsBase64, story.cover_image_url || ''
      )
      interiorBlob = result.blob
      actualPageCount = result.pageCount
      console.log('Regenerated interior PDF (no cached version available), page count:', actualPageCount)
    }

    // Get session metadata to retrieve selected binding
const sessionResponse = await fetch(`${API_BASE}/stripe-session/${sessionId}`)
const sessionData     = await sessionResponse.json()
const podId           = sessionData.metadata?.podId || POD_PACKAGE_ID
const amountCharged   = parseInt(sessionData.metadata?.amount || '2998') / 100

console.log('Session metadata:', JSON.stringify(sessionData.metadata))

// Only generate photo book if they purchased the bundle
const includesPhotoBook = sessionData.metadata?.includesPhotoBook === 'true'
const photoBookBlob = includesPhotoBook
  ? await exportPhotoBookAsBlob(story.story_type, story.cover_image_url || '', getAllImagesForExport)
  : null
// Get exact cover dimensions from Lulu for this page count and binding —
// ALWAYS call the real API, for every binding type. Hardcoding case wrap
// and dust jacket dimensions here previously caused Lulu order rejections
// once page count or Lulu's own spec drifted from the hardcoded values
// (incident June 2026 — case wrap order rejected, dimensions outside
// Lulu's accepted tolerance).
let luluWidth: number
let luluHeight: number

const dimsResponse = await fetch(`${API_BASE}/lulu-cover-dimensions`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    pod_package_id:      podId,
    interior_page_count: actualPageCount,
    unit:                'mm',
  }),
})

if (!dimsResponse.ok) {
  const errText = await dimsResponse.text()
  console.error('Lulu cover dimensions request failed:', errText)
  throw new Error('Could not get cover dimensions from Lulu. Please try again or contact support.')
}

const dims = await dimsResponse.json()
console.log('Raw dims response:', JSON.stringify(dims))
luluWidth  = parseFloat(dims.width)
luluHeight = parseFloat(dims.height)
console.log('Cover dims from Lulu for', podId, ':', luluWidth, luluHeight)

console.log('Converted dims mm:', luluWidth, luluHeight)

    // Generate cover PDF using Lulu's exact dimensions
    const coverBlob = await generateCoverPDF({
      title:         storyTitle,
      subtitle,
      pageCount:     actualPageCount,
      coverImageUrl: story.cover_image_url || '',
      loadImageAsBase64,
      luluWidth:     luluWidth,
      luluHeight:    luluHeight,
      bindingType: podId === '0600X0900.FC.PRE.LW.080CW444.GNG' ? 'dustjacket' 
             : podId === '0600X0900.FC.PRE.CW.080CW444.GXX' ? 'hardcover' 
             : 'softcover',
    })

    // Generate separate cover for photo book — premium softcover dimensions
let photoBookCoverBlob: Blob | null = null
if (includesPhotoBook) {
  photoBookCoverBlob = await generateCoverPDF({
    title:         `${storyTitle} — Photo Book`,
    subtitle:      'A collection of memories and moments',
    pageCount:     32,
    coverImageUrl: story.cover_image_url || '',
    loadImageAsBase64,
    luluWidth:     314.5,
    luluHeight:    234.95,
    bindingType:   'softcover',
  })
}


    printModalData.value = {
      interiorBlob,
      coverBlob,
      photoBookBlob,        // ← add this
       photoBookCoverBlob,   // ← add
      pageCount:       actualPageCount,
      storyTitle,
      storyId:         story.id,
      userId:          user.id,
      userEmail:       user.email || '',
      stripePaymentId: sessionId,
      printCost:  amountCharged,
      podId:           podId,                                    // ← add
  bindingLabel:    sessionData.metadata?.binding || 'Softcover', // ← add
    }
    printModalOpen.value = true

  } catch (err) {
    console.error('Print modal error:', err)
    alert('Something went wrong preparing your book. Please try again.')
  } finally {
    generatingPrintId.value = null
  }
}

function onOrdered(printJobId: string) {
  printModalOpen.value = false
  track('print_book_ordered', { print_job_id: printJobId })
}

// ─── CRUD ─────────────────────────────────────────────────────────────────────

async function createStory(type: string) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  const { data, error } = await supabase
    .from('story_projects')
    .insert([{ user_id: user.id, title: getStoryTitle(type), story_type: type }])
    .select()
    .single()

  if (!error && data) {
    track('story_started', { source: 'dashboard', story_type: type })
    router.push(`/story/${data.id}`)
  }
}

async function fetchStories() {
  const { data, error } = await supabase
    .from('story_projects')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) { console.error('Fetch stories error:', error.message); return }

  if (data) {
    const storiesWithProgress = await Promise.all(
      data.map(async story => ({ ...story, progress: await getProgress(story) }))
    )
    stories.value = storiesWithProgress
    isFirstTimeUser.value = storiesWithProgress.length === 0
  }
}

function openStory(id: string) { router.push(`/story/${id}`) }

async function deleteStory(id: string) {
  if (deletingStoryId.value) return
  if (!window.confirm('Are you sure you want to delete this story?')) return

  deletingStoryId.value = id
  const { error } = await supabase.from('story_projects').delete().eq('id', id)
  if (error) { console.error('Delete error:', error.message); alert(error.message) }
  deletingStoryId.value = null
  await fetchStories()
}

async function getProgress(story: any) {
  const { data: answers, error: answersError } = await supabase
    .from('story_answers').select('*').eq('project_id', story.id)
  if (answersError) { console.error('Answers error:', answersError.message); return 0 }

  const { data: sections, error: sectionsError } = await supabase
    .from('story_sections').select('*').eq('story_type', story.story_type)
  if (sectionsError) { console.error('Sections error:', sectionsError.message); return 0 }

  const total     = sections?.length || 0
  const completed = answers?.filter(a => a.answer?.trim() !== '').length || 0
  return total === 0 ? 0 : Math.round((completed / total) * 100)
}

async function loadUserAccess() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) { userAccess.value = []; return }

  const { data, error } = await supabase
    .from('user_access').select('*').eq('user_id', user.id)
  if (error) { console.error('User access error:', error.message); userAccess.value = []; return }
  userAccess.value = data || []
}

// ─── Lifecycle ────────────────────────────────────────────────────────────────

onMounted(async () => {
  await loadUserAccess()
  await fetchStories()

  // Detect return from Stripe print payment
  const params      = new URLSearchParams(window.location.search)
  const printStatus = params.get('print')
  const storyId     = params.get('story')
  const sessionId   = params.get('session_id')

  if (printStatus === 'success' && storyId && sessionId) {
    window.history.replaceState({}, '', '/dashboard')
    await nextTick()
    const story = stories.value.find((s: any) => s.id === storyId)
    if (story) await openPrintModal(story, sessionId)
  }
})
</script>