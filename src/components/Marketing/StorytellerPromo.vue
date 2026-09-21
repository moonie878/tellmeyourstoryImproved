<template>
  <!-- "Send them their questions" — reusable promo for gift and Christmas pages -->
  <section class="px-5 py-14 sm:px-8 sm:py-16">
    <div class="mx-auto max-w-4xl rounded-[2rem] bg-[#F5F0E8] p-8 text-center sm:p-12">
      <p class="text-xs font-medium uppercase tracking-[0.22em] text-[#86664A]">No app. No account. No password.</p>
      <h2 class="mt-3 font-display text-2xl font-bold leading-snug text-stone-900 sm:text-3xl">
        A new question for {{ who }} every week
      </h2>
      <p class="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-stone-600">
        Start the story yourself and we'll email {{ who }} one question a week. {{ capitalised }} just {{ plural ? 'tap' : 'taps' }} the link and {{ plural ? 'talk' : 'talks' }} —
        we type it up, keep the recording, and it goes straight into the book. You get an email every time an answer comes in.
      </p>
      <div class="mx-auto mt-8 grid max-w-3xl gap-4 text-left sm:grid-cols-3">
        <div v-for="(step, i) in steps" :key="step" class="rounded-2xl bg-white p-5">
          <span class="flex h-8 w-8 items-center justify-center rounded-full bg-[#7C5C3B] text-sm font-bold text-white">{{ i + 1 }}</span>
          <p class="mt-3 text-sm leading-relaxed text-stone-700">{{ step }}</p>
        </div>
      </div>
      <router-link
        :to="registerLink"
        class="mt-8 inline-flex min-h-[48px] items-center rounded-full bg-[#7C5C3B] px-7 text-sm font-semibold text-white transition hover:opacity-90"
      >
        Start {{ possessive }} story — 5 questions free
      </router-link>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    /** How the storyteller is referred to: "Mum", "Nan", "them" */
    who?: string
    /** Story type to pre-select on sign-up (must match storyTypes.ts), optional */
    storyType?: string
  }>(),
  { who: 'them', storyType: '' },
)

const plural = computed(() => props.who === 'them')
const capitalised = computed(() => (props.who === 'them' ? 'They' : props.who))
const possessive = computed(() => (props.who === 'them' ? 'their' : `${props.who}'s`))
const registerLink = computed(() => (props.storyType ? `/register?type=${props.storyType}` : '/register'))

const steps = computed(() => [
  `Start ${possessive.value} story free, then tap "Send the questions".`,
  `${capitalised.value} ${plural.value ? 'get' : 'gets'} one question a week by email — and can talk or type the answer.`,
  'Order a printed book with a QR code by every recorded story.',
])
</script>

<style scoped>
.font-display { font-family: 'Playfair Display', Georgia, serif; }
</style>
