<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
        v-if="open"
        class="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm px-3 py-4 sm:px-4 sm:py-6"
        @click.self="$emit('close')"
      >
        <div class="mx-auto flex max-h-[94vh] w-full max-w-lg flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">

          <!-- Header -->
          <div class="shrink-0 border-b border-stone-100 px-6 py-5 sm:px-8 sm:py-6">
            <div class="flex items-start justify-between gap-4">
              <div>
                <p class="text-[11px] font-medium uppercase tracking-[0.25em] text-[#9C7C5C]">
                  ✦ Premium Export
                </p>
                <h3 class="mt-2 font-display text-2xl font-bold text-stone-900">
                  True Book Export
                </h3>
                <p class="mt-2 text-sm leading-6 text-stone-500">
                  A properly typeset 6×9 book — recto/verso margins, running headers,
                  chapter pages, drop caps, and photos throughout. Ready to print.
                </p>
              </div>
              <button
                @click="$emit('close')"
                class="shrink-0 rounded-full p-2 text-stone-400 hover:bg-stone-100 transition"
              >
                ✕
              </button>
            </div>
          </div>

          <!-- Body -->
          <div class="min-h-0 flex-1 overflow-y-auto px-6 py-6 sm:px-8">

            <!-- What's included -->
            <div class="rounded-2xl border border-[#E8DDD4] bg-[#FAF7F4] p-5">
              <p class="text-xs font-medium uppercase tracking-[0.18em] text-[#9C7C5C]">
                What's included
              </p>
              <ul class="mt-3 space-y-2">
                <li v-for="feature in features" :key="feature" class="flex items-start gap-2 text-sm text-stone-700">
                  <span class="mt-0.5 text-[#9C7C5C] flex-shrink-0">✦</span>
                  {{ feature }}
                </li>
              </ul>
            </div>

            <!-- Format info -->
            <div class="mt-4 grid grid-cols-2 gap-3">
              <div class="rounded-2xl border border-stone-200 bg-stone-50 p-4 text-center">
                <p class="text-lg font-bold text-stone-900">6 × 9"</p>
                <p class="mt-1 text-xs text-stone-500">Standard book size</p>
              </div>
              <div class="rounded-2xl border border-stone-200 bg-stone-50 p-4 text-center">
                <p class="text-lg font-bold text-stone-900">PDF</p>
                <p class="mt-1 text-xs text-stone-500">Print-ready download</p>
              </div>
            </div>

            <!-- Print teaser -->
            <div class="mt-4 rounded-2xl border border-stone-200 bg-white p-4">
              <div class="flex items-start gap-3">
                <span class="text-2xl flex-shrink-0">📦</span>
                <div>
                  <p class="text-sm font-semibold text-stone-900">
                    Order a printed copy — coming soon
                  </p>
                  <p class="mt-1 text-xs leading-5 text-stone-500">
                    We're integrating with a print partner so you'll be able to order
                    a professionally printed and bound hardcover or softcover book
                    delivered to your door — directly from this screen.
                  </p>
                </div>
              </div>
            </div>

            <!-- Progress -->
            <div v-if="isExporting" class="mt-5">
              <div class="flex items-center justify-between text-sm">
                <span class="text-stone-600">{{ progressLabel }}</span>
                <span class="font-medium text-stone-900">{{ progress }}%</span>
              </div>
              <div class="mt-2 h-2 w-full overflow-hidden rounded-full bg-stone-200">
                <div
                  class="h-2 rounded-full bg-[#7C5C3B] transition-all duration-500"
                  :style="{ width: `${progress}%` }"
                ></div>
              </div>
              <p class="mt-2 text-xs text-stone-400">
                Please keep this window open while your book is being typeset.
              </p>
            </div>

            <!-- Error -->
            <p
              v-if="error"
              class="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {{ error }}
            </p>

          </div>

          <!-- Footer -->
          <div class="shrink-0 border-t border-stone-100 px-6 py-4 sm:px-8 sm:py-5">
            <div class="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                @click="$emit('close')"
                :disabled="isExporting"
                class="rounded-full border border-stone-300 px-5 py-2.5 text-sm text-stone-700 transition hover:bg-stone-50 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                @click="$emit('export')"
                :disabled="isExporting"
                class="rounded-full bg-[#7C5C3B] px-6 py-2.5 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-50"
              >
                <span v-if="isExporting">Typesetting your book…</span>
                <span v-else>Download True Book PDF</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{
  open: boolean
  isExporting: boolean
  progress: number
  progressLabel: string
  error: string
}>()

defineEmits<{
  (e: 'close'): void
  (e: 'export'): void
}>()

const features = [
  'Proper 6×9 inch book format — recto and verso margins for binding',
  'Running headers — chapter name and book title on alternate pages',
  'Front matter — half title, full title page, dedication, and table of contents',
  'Chapter pages — each chapter starts on a right-hand page',
  'Drop caps on the first answer of every chapter',
  'Quote pages woven throughout from highlighted answers',
  'Colour photos alongside answers',
  'Page numbers in the outside margin',
  'Closing page — ready to print or take to a printer',
]
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap');
.font-display { font-family: 'Playfair Display', Georgia, serif; }
h3 { font-family: 'Playfair Display', Georgia, serif; }

.modal-fade-enter-active,
.modal-fade-leave-active { transition: opacity 0.2s ease; }
.modal-fade-enter-from,
.modal-fade-leave-to { opacity: 0; }
</style>