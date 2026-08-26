<template>
  <div class="min-h-screen bg-[#FAF9F7]">

    <!-- ═══════════════════════════════════════════════════════════ -->
    <!-- HEADER — personal, with real stats                          -->
    <!-- ═══════════════════════════════════════════════════════════ -->
    <header class="border-b border-stone-200/80 bg-white">
      <div class="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">

        <div class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

          <div>
            <p class="text-[11px] font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">
              {{ greeting }}
            </p>
            <h1 class="mt-2 font-display text-2xl font-bold tracking-[-0.02em] text-stone-900 sm:text-3xl">
              <template v-if="stories.length">Your stories</template>
              <template v-else>Let's begin</template>
            </h1>
            <p class="mt-2 max-w-md text-sm leading-relaxed text-stone-500">
              <template v-if="stories.length">
                Pick up where you left off, or start capturing someone new.
              </template>
              <template v-else>
                Choose who you'd like to capture first. You can start with just one question.
              </template>
            </p>
          </div>

          <!-- Stats -->
          <div v-if="stories.length" class="flex items-center gap-6 sm:gap-8">
            <div>
              <p class="font-display text-2xl font-bold text-stone-900">{{ stories.length }}</p>
              <p class="mt-0.5 text-[11px] uppercase tracking-wider text-stone-400">
                {{ stories.length === 1 ? 'Story' : 'Stories' }}
              </p>
            </div>
            <div class="h-8 w-px bg-stone-200"></div>
            <div>
              <p class="font-display text-2xl font-bold text-stone-900">{{ averageProgress }}%</p>
              <p class="mt-0.5 text-[11px] uppercase tracking-wider text-stone-400">Complete</p>
            </div>
            <div class="h-8 w-px bg-stone-200"></div>
            <div>
              <p class="font-display text-2xl font-bold text-[#7C5C3B]">{{ planLabel }}</p>
              <p class="mt-0.5 text-[11px] uppercase tracking-wider text-stone-400">Plan</p>
            </div>
          </div>

        </div>
      </div>
    </header>

    <div class="mx-auto max-w-6xl space-y-10 px-4 py-8 sm:px-6 sm:py-10">

      <!-- ═══════════════════════════════════════════════════════════ -->
      <!-- UPGRADE BANNER — free users only                            -->
      <!-- ═══════════════════════════════════════════════════════════ -->
      <section
        v-if="!hasAnyAccess"
        class="overflow-hidden rounded-2xl border border-[#E8DDD0] bg-gradient-to-br from-[#FDFBF8] to-[#F5F0E8]"
      >
        <div class="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div class="flex items-start gap-4">
            <div class="hidden h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-[#7C5C3B] sm:flex">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="11" width="18" height="11" rx="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
            <div>
              <p class="text-sm font-semibold text-stone-900">Unlock the full story</p>
              <p class="mt-1 text-sm leading-relaxed text-stone-600">
                You have 5 free questions. Upgrade for all 100+, voice recording, export and printing.
              </p>
            </div>
          </div>
          <router-link
            to="/pricing"
            class="flex-shrink-0 rounded-full bg-[#7C5C3B] px-5 py-2.5 text-center text-sm font-semibold text-white transition hover:opacity-90"
          >
            View plans — from £3.99
          </router-link>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════════════════════ -->
      <!-- STORIES — existing work comes first                         -->
      <!-- ═══════════════════════════════════════════════════════════ -->
      <section v-if="stories.length" class="space-y-4">

        <div class="grid gap-4 lg:grid-cols-2">
          <article
            v-for="story in stories"
            :key="story.id"
            class="group overflow-hidden rounded-2xl border border-stone-200 bg-white transition duration-300 hover:border-stone-300 hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.15)]"
          >
            <div class="flex">

              <!-- Cover -->
              <div class="relative hidden w-[120px] flex-shrink-0 overflow-hidden bg-gradient-to-br from-stone-100 to-stone-200 sm:block">
                <img
                  v-if="story.cover_image_url"
                  :src="story.cover_image_url"
                  alt=""
                  class="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div v-else class="flex h-full w-full items-center justify-center p-3">
                  <div class="w-full rounded-lg bg-white/70 px-2 py-6 text-center backdrop-blur-sm">
                    <p class="font-display text-[10px] font-semibold uppercase tracking-widest text-stone-400">
                      {{ formatStoryType(story.story_type) }}
                    </p>
                  </div>
                </div>
                <!-- Progress rail on the cover edge -->
                <div class="absolute inset-x-0 bottom-0 h-1 bg-black/10">
                  <div class="h-full bg-[#7C5C3B] transition-all duration-500" :style="{ width: `${story.progress}%` }"></div>
                </div>
              </div>

              <!-- Body -->
              <div class="min-w-0 flex-1 p-5">

                <!-- Title row -->
                <div class="flex items-start justify-between gap-3">
                  <div class="min-w-0">
                    <h3 class="truncate font-display text-lg font-semibold text-stone-900">
                      {{ story.title }}
                    </h3>
                    <p class="mt-0.5 text-xs text-stone-400">
                      {{ formatStoryType(story.story_type) }} · {{ formatDate(story.created_at) }}
                    </p>
                  </div>

                  <span
                    v-if="hasStoryAccess(story.story_type)"
                    class="flex-shrink-0 rounded-full bg-[#F0F5F1] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#4A7C59]"
                  >Unlocked</span>
                  <span
                    v-else
                    class="flex-shrink-0 rounded-full bg-[#FDF6EC] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#B07D3A]"
                  >Free draft</span>
                </div>

                <!-- Progress -->
                <div class="mt-4">
                  <div class="flex items-baseline justify-between">
                    <p class="text-xs text-stone-400">Progress</p>
                    <p class="font-display text-sm font-semibold text-stone-700">{{ story.progress }}%</p>
                  </div>
                  <div class="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-stone-100">
                    <div
                      class="h-full rounded-full bg-[#7C5C3B] transition-all duration-700"
                      :style="{ width: `${story.progress}%` }"
                    />
                  </div>
                </div>

                <!-- Actions -->
                <div class="mt-5 flex flex-wrap items-center gap-2">
                  <button
                    @click="openStory(story.id)"
                    class="rounded-full bg-[#7C5C3B] px-5 py-2 text-sm font-semibold text-white transition hover:opacity-90"
                  >
                    {{ story.progress > 0 ? 'Continue' : 'Start writing' }}
                  </button>
<p v-if="hasPrintAccess()" class="mt-2 text-xs text-stone-400">
  Printed and shipped from £{{ PRINTED_BOOK_FROM_PRICE.toFixed(2) }}, UK delivery included
</p>
                  <button
                    v-if="hasPrintAccess()"
                    @click="openBindingModal(story)"
                    :disabled="generatingPrintId === story.id"
                    class="rounded-full border border-stone-200 px-4 py-2 text-sm font-medium text-stone-700 transition hover:border-[#7C5C3B] hover:text-[#7C5C3B] disabled:opacity-50"
                  >
                    {{ generatingPrintId === story.id ? 'Preparing…' : 'Order print' }}
                  </button>
                </div>

                <p v-if="generatingPrintId === story.id" class="mt-2 text-xs text-stone-400">
                  Building your book for print — about 30 seconds…
                </p>

                <!-- Footer: share + delete -->
                <div class="mt-5 flex items-center gap-3 border-t border-stone-100 pt-4">
                  <div class="min-w-0 flex-1">
                    <button
                      v-if="!shareLinks[story.id]"
                      @click="generateShareLink(story.id)"
                      :disabled="sharingStoryId === story.id"
                      class="inline-flex items-center gap-1.5 text-xs font-medium text-stone-500 transition hover:text-[#7C5C3B] disabled:opacity-50"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                        <polyline points="16 6 12 2 8 6"/>
                        <line x1="12" y1="2" x2="12" y2="15"/>
                      </svg>
                      {{ sharingStoryId === story.id ? 'Generating…' : 'Share with family' }}
                    </button>

                    <div v-else class="space-y-2">
                      <div class="flex items-center gap-2 overflow-hidden rounded-lg border border-stone-200 bg-stone-50 px-2.5 py-1.5">
                        <p class="min-w-0 flex-1 truncate text-[11px] text-stone-500">{{ shareLinks[story.id] }}</p>
                        <button
                          @click="copyShareLink(story.id)"
                          class="flex-shrink-0 text-[11px] font-semibold text-[#7C5C3B] hover:underline"
                        >
                          {{ shareCopied === story.id ? '✓ Copied' : 'Copy' }}
                        </button>
                      </div>
                      <button
                        @click="shareStoryWhatsApp(story.id, story.title)"
                        class="inline-flex items-center gap-1 rounded-full border border-stone-200 px-3 py-1 text-[11px] font-medium text-stone-600 transition hover:bg-stone-50"
                      >
                        Send on WhatsApp
                      </button>
                    </div>
                  </div>

                  <button
                    @click.stop="deleteStory(story.id)"
                    :disabled="deletingStoryId === story.id"
                    class="flex-shrink-0 text-xs text-stone-300 transition hover:text-red-500 disabled:opacity-50"
                  >
                    {{ deletingStoryId === story.id ? 'Deleting…' : 'Delete' }}
                  </button>
                </div>

              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════════════════════ -->
      <!-- START A NEW STORY                                           -->
      <!-- ═══════════════════════════════════════════════════════════ -->
      <section>
        <div class="flex items-end justify-between">
          <div>
            <h2 class="font-display text-xl font-bold text-stone-900">
              {{ stories.length ? 'Start another story' : 'Choose a story to begin' }}
            </h2>
            <p class="mt-1 text-sm text-stone-500">
              Each story type has its own set of questions written for that person.
            </p>
          </div>
        </div>

        <div class="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <button
            v-for="type in storyTypes"
            :key="type.id"
            @click="createStory(type.id)"
            class="group relative overflow-hidden rounded-2xl border border-stone-200 bg-white p-5 text-left transition duration-300 hover:-translate-y-0.5 hover:border-[#7C5C3B]/40 hover:shadow-[0_8px_24px_-12px_rgba(124,92,59,0.25)]"
          >
            <!-- Hover wash -->
            <div class="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#FDFBF8] to-transparent opacity-0 transition duration-300 group-hover:opacity-100"></div>

            <div class="relative">
              <p v-if="type.label" class="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9C7C5C]">
                {{ type.label }}
              </p>
              <h3 class="mt-2 font-display text-base font-semibold text-stone-900">{{ type.title }}</h3>
              <p class="mt-1.5 text-[13px] leading-relaxed text-stone-500">{{ type.description }}</p>
              <p class="mt-4 inline-flex items-center gap-1 text-[13px] font-semibold text-[#7C5C3B]">
                Start
                <span class="transition duration-300 group-hover:translate-x-0.5">→</span>
              </p>
            </div>
          </button>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════════════════════ -->
      <!-- FIRST-TIME HELP                                             -->
      <!-- ═══════════════════════════════════════════════════════════ -->
      <section
        v-if="isFirstTimeUser"
        class="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8"
      >
        <h2 class="font-display text-lg font-bold text-stone-900">How it works</h2>
        <div class="mt-6 grid gap-6 sm:grid-cols-3">
          <div v-for="(step, i) in howItWorks" :key="step.title" class="flex gap-3">
            <span class="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#F5F0E8] font-display text-xs font-bold text-[#7C5C3B]">
              {{ i + 1 }}
            </span>
            <div>
              <p class="text-sm font-semibold text-stone-900">{{ step.title }}</p>
              <p class="mt-1 text-[13px] leading-relaxed text-stone-500">{{ step.body }}</p>
            </div>
          </div>
        </div>
        <router-link
          to="/help"
          class="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-[#7C5C3B] hover:underline"
        >
          Watch the short how-to videos →
        </router-link>
      </section>

      <!-- ═══════════════════════════════════════════════════════════ -->
      <!-- SHARE                                                       -->
      <!-- ═══════════════════════════════════════════════════════════ -->
      <section class="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
        <div class="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 class="font-display text-lg font-bold text-stone-900">
              Know someone who'd love this?
            </h2>
            <p class="mt-2 max-w-lg text-sm leading-relaxed text-stone-500">
              If this means something to you, sharing it with one person who has an elderly parent or grandparent is the kindest thing you can do.
            </p>
          </div>
          <div class="flex flex-shrink-0 flex-col gap-2 sm:items-end">
            <button
              @click="handleShare"
              class="rounded-full bg-[#7C5C3B] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Share Tell Me Your Story
            </button>
            <div class="flex gap-2">
              <button
                @click="shareWhatsApp('dashboard')"
                class="rounded-full border border-stone-200 px-4 py-1.5 text-xs font-medium text-stone-600 transition hover:bg-stone-50"
              >WhatsApp</button>
              <button
                @click="shareEmail('dashboard')"
                class="rounded-full border border-stone-200 px-4 py-1.5 text-xs font-medium text-stone-600 transition hover:bg-stone-50"
              >Email</button>
            </div>
            <p v-if="shareResult" class="text-xs text-[#4A7C59]">{{ shareResult }}</p>
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
    <Transition name="fade">
      <div v-if="bindingModalOpen && bindingModalStory" class="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div class="absolute inset-0 bg-black/50" @click="bindingModalOpen = false" />
        <div class="relative w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-2xl">

          <div class="border-b border-stone-100 px-6 py-5">
            <h2 class="font-display text-lg font-bold text-stone-900">Choose your book type</h2>
            <p class="mt-1 text-sm text-stone-500">Price includes UK shipping.</p>
          </div>

          <div class="px-6 py-5">
            <div v-if="!bindingModalPricesReady" class="flex flex-col items-center gap-3 py-8">
              <svg class="h-6 w-6 animate-spin text-[#7C5C3B]" viewBox="0 0 24 24" fill="none">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
              </svg>
              <p class="text-xs text-stone-500">Calculating pricing for your book…</p>
            </div>

            <div v-else class="space-y-2">
              <button
                v-for="b in bindingOptions"
                :key="b.id"
                @click="selectedBindingId = b.id"
                class="w-full rounded-xl border p-4 text-left transition"
                :class="selectedBindingId === b.id
                  ? 'border-[#7C5C3B] bg-[#FAF7F4] ring-1 ring-[#7C5C3B]/20'
                  : 'border-stone-200 hover:bg-stone-50'"
              >
                <div class="flex items-center justify-between">
                  <p class="text-sm font-semibold text-stone-900">{{ b.label }}</p>
                  <p class="font-display text-sm font-bold text-stone-900">
                    £{{ getPrintPrice(b.id, bindingModalPageCount || 0).toFixed(2) }}
                  </p>
                </div>
                <p class="mt-0.5 text-xs text-stone-500">{{ b.desc }}</p>
              </button>
              <p class="pt-1 text-center text-[11px] text-stone-400">
                {{ bindingModalPageCount }} pages · UK shipping included
              </p>
            </div>

            <div class="mt-5 flex gap-3">
              <button
                @click="bindingModalOpen = false"
                class="flex-1 rounded-full border border-stone-200 py-2.5 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
              >Cancel</button>
              <button
                @click="startPrintOrder(bindingModalStory)"
                :disabled="!bindingModalPricesReady"
                class="flex-1 rounded-full bg-[#7C5C3B] py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
              >Continue to payment</button>
            </div>
          </div>

        </div>
      </div>
    </Transition>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, computed } from 'vue'
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
const hasAnyAccess = computed(() => userAccess.value.length > 0)
// ─── Dashboard header ─────────────────────────────────────────────────────────

const greeting = computed(() => {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 18) return 'Good afternoon'
  return 'Good evening'
})

const averageProgress = computed(() => {
  if (!stories.value.length) return 0
  const total = stories.value.reduce((sum, s) => sum + (s.progress || 0), 0)
  return Math.round(total / stories.value.length)
})

const planLabel = computed(() => {
  if (!hasAnyAccess.value) return 'Free'
  if (hasAllStoriesAccess() && hasPrintAccess()) return 'Premium'
  if (hasAllStoriesAccess()) return 'All'
  return 'Paid'
})

const howItWorks = [
  {
    title: 'Choose a story',
    body: 'Pick who you want to capture. Each type has its own questions.',
  },
  {
    title: 'Answer at your own pace',
    body: 'Type or record your voice. Everything autosaves as you go.',
  },
  {
    title: 'Turn it into a keepsake',
    body: 'Export a PDF or order a printed book with QR codes inside.',
  },
]


const API_BASE = import.meta.env.VITE_API_BASE_URL as string
const POD_PACKAGE_ID = '0600X0900.FC.STD.PB.060UW444.MXX'



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

  // ─── Auto-checkout from register-as-premium flow ──────────────────────────
  const planFromRegister = params.get('plan')

  if (planFromRegister && ['tier1', 'tier2', 'tier3', 'tier4'].includes(planFromRegister)) {
    // Clear the param so refresh doesn't re-trigger
    window.history.replaceState({}, '', '/dashboard')

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    // If user has no stories yet, create a default one
    let targetStoryId = stories.value[0]?.id

    if (!targetStoryId) {
      const { data: newStory, error: storyErr } = await supabase
        .from('story_projects')
        .insert([{ user_id: user.id, title: "Mum's Story", story_type: 'mum' }])
        .select()
        .single()

      if (storyErr || !newStory) {
        console.error('Auto-create story failed:', storyErr?.message)
        return
      }
      targetStoryId = newStory.id
      track('story_auto_created', { source: 'register_premium', plan: planFromRegister })
    }

    track('checkout_from_register', { plan: planFromRegister })

    // Forward to editor with plan param — editor triggers checkout
    router.push(`/story/${targetStoryId}?plan=${planFromRegister}`)
  }

})
</script>
<style scoped>
.font-display {
  font-family: 'Playfair Display', Georgia, serif;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>