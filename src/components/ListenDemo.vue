<template>
  <!--
    A real page from a real book, with a real QR code. The whole product comes
    down to one moment — scan a page, hear the person who answered it — and
    until now a visitor had to sign up, answer questions, print a book and wait
    two weeks to find out what that feels like. This is that moment, on the
    homepage, in five seconds.

    A phone can't scan its own screen, so phones get a button to the same
    page; the QR code shows on larger screens, where a phone can scan it.
  -->
  <section class="px-5 py-16 sm:px-8 sm:py-20">
    <div class="mx-auto grid max-w-4xl items-center gap-10 md:grid-cols-2">

      <!-- Copy -->
      <div class="text-center md:text-left">
        <p class="text-[11px] font-medium uppercase tracking-[0.22em] text-[#9C7C5C]">
          Don't take our word for it
        </p>
        <h2 class="mt-3 font-display text-2xl font-bold leading-tight text-stone-900 sm:text-3xl">
          This is a real page.<br />
          <em class="italic text-[#7C5C3B]">Listen to it.</em>
        </h2>
        <p class="mt-4 text-[15px] leading-7 text-stone-600">
          Every answer recorded out loud gets a QR code printed beside it.
          Scan it, and you hear the person who answered — in their own voice,
          in their own words.
        </p>

        <!-- Phones: tap instead of scan -->
        <a
          :href="listenUrl"
          target="_blank"
          rel="noopener"
          @click="onOpened('button')"
          class="mt-6 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-[#1C1917] px-7 text-sm font-semibold text-white transition hover:opacity-90 sm:hidden"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>
          Tap to hear it
        </a>

        <p class="mt-6 hidden text-sm text-stone-500 sm:block">
          Point your phone's camera at the code
          <span class="md:hidden">below</span><span class="hidden md:inline">on the right</span>.
          <a
            :href="listenUrl"
            target="_blank"
            rel="noopener"
            @click="onOpened('link')"
            class="ml-1 font-medium text-[#7C5C3B] underline underline-offset-2"
          >Or play it here</a>
        </p>
      </div>

      <!-- The page -->
      <div class="flex justify-center">
        <div class="w-full max-w-[340px]">
          <div
            class="relative overflow-hidden rounded-sm bg-white shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
            style="aspect-ratio: 6/9;"
          >
            <div class="flex h-full flex-col p-7 sm:p-8">
              <p class="text-[10px] font-medium uppercase tracking-widest text-[#7C5C3B]/60">
                {{ chapter }}
              </p>
              <p class="mt-2 font-serif text-base font-medium italic leading-snug text-stone-700">
                "{{ question }}"
              </p>
              <p class="mt-4 flex-1 overflow-hidden font-serif text-[13px] leading-[1.85] text-stone-700">
                {{ excerpt }}
              </p>

              <div class="mt-4 flex items-end justify-between gap-3">
                <div>
                  <p class="text-[10px] font-medium text-stone-600">Scan to hear</p>
                  <p class="text-[10px] text-stone-400">this memory</p>
                </div>
                <div class="h-24 w-24 flex-shrink-0 bg-white">
                  <img
                    v-if="qrDataUrl"
                    :src="qrDataUrl"
                    alt="QR code — scan with your phone's camera to hear this answer"
                    class="h-full w-full"
                  />
                </div>
              </div>
            </div>
            <div class="absolute right-0 top-0 h-full w-[3px] bg-gradient-to-l from-stone-200/60 to-transparent"></div>
          </div>
          <div class="mx-4 h-2 rounded-b-lg bg-stone-100"></div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { generateQRDataUrl } from '../utils/qrUtils'
import { track } from '../lib/analytics'

const props = withDefaults(defineProps<{
  /** voice_recordings.id of a recording you own and are happy to make public */
  recordingId: string
  /** The question as it appears in the book */
  question: string
  /** The first couple of sentences of the answer, as printed */
  excerpt: string
  chapter?: string
}>(), {
  chapter: 'Chapter one',
})

// Always the live domain, never window.location: the homepage is prerendered,
// and a code generated during prerendering would otherwise point at localhost.
const listenUrl = computed(() => `https://tellmeyourstory.uk/listen/${props.recordingId}`)

const qrDataUrl = ref('')

onMounted(async () => {
  try {
    qrDataUrl.value = await generateQRDataUrl(listenUrl.value)
  } catch (err) {
    console.error('Homepage QR failed:', err)
  }
})

function onOpened(via: 'button' | 'link') {
  track('home_listen_opened', { via })
}
</script>

<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
</style>
