<template>
  <!--
    Cover test panel — dev only.

    The cover PDF is normally generated inside the paid print flow, so the only
    way to see one was to buy a book. This generates a cover on its own, for any
    binding and page count, and downloads it — so a cover can be checked against
    scripts/check-cover.mjs and Lulu's previewer without spending anything.

    Shown only when the URL has ?covertest=1 — invisible to customers otherwise.
  -->
  <div
    v-if="visible"
    class="fixed bottom-4 right-4 z-50 w-[340px] rounded-2xl border border-stone-300 bg-[#F8F4EF] p-4 shadow-xl"
    style="font-family: Georgia, serif"
  >
    <div class="flex items-start justify-between gap-2">
      <h2 class="text-sm font-bold text-stone-900">Cover test</h2>
      <button class="text-xs text-stone-500 hover:text-stone-800" @click="visible = false">close</button>
    </div>

    <label class="mt-3 block text-xs text-stone-600">
      Title
      <input v-model="title" class="mt-1 w-full rounded-lg border border-stone-300 px-2 py-1.5 text-sm" />
    </label>

    <label class="mt-2 block text-xs text-stone-600">
      Subtitle
      <input v-model="subtitle" class="mt-1 w-full rounded-lg border border-stone-300 px-2 py-1.5 text-sm" />
    </label>

    <div class="mt-2 flex gap-2">
      <label class="flex-1 text-xs text-stone-600">
        Binding
        <select v-model="binding" class="mt-1 w-full rounded-lg border border-stone-300 px-2 py-1.5 text-sm">
          <option value="softcover">Softcover</option>
          <option value="hardcover">Hardcover</option>
          <option value="dustjacket">Dust jacket</option>
        </select>
      </label>
      <label class="w-[90px] text-xs text-stone-600">
        Pages
        <input
          v-model.number="pageCount"
          type="number"
          min="4"
          max="800"
          class="mt-1 w-full rounded-lg border border-stone-300 px-2 py-1.5 text-sm"
        />
      </label>
    </div>

    <label class="mt-2 block text-xs text-stone-600">
      Cover image URL (optional)
      <input
        v-model="coverImageUrl"
        placeholder="/images/example-story-hero-cover.jpg"
        class="mt-1 w-full rounded-lg border border-stone-300 px-2 py-1.5 text-sm"
      />
    </label>

    <button
      :disabled="busy"
      class="mt-3 w-full rounded-full bg-[#7C5C3B] px-4 py-2 text-sm text-white transition hover:opacity-90 disabled:opacity-50"
      @click="run"
    >
      {{ busy ? 'Generating…' : 'Generate & download cover' }}
    </button>

    <p v-if="error" class="mt-2 text-xs text-red-600">{{ error }}</p>

    <div v-if="result" class="mt-3 rounded-xl bg-white/70 p-3 text-[11px] leading-relaxed text-stone-700">
      <p><strong>Sheet</strong> {{ result.width.toFixed(2) }} × {{ result.height.toFixed(2) }} mm</p>
      <p><strong>Spine</strong> {{ result.spine.toFixed(2) }} mm</p>
      <p class="mt-2 text-stone-500">Check it with:</p>
      <code class="mt-1 block break-all rounded bg-stone-100 p-1.5 text-[10px]">
        node scripts/check-cover.mjs {{ fileName }} {{ binding }} {{ result.spine.toFixed(2) }}
      </code>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { generateCoverPDF, type BindingType } from '../../lib/generateCoverPDF'

const POD_IDS: Record<BindingType, string> = {
  softcover:  '0600X0900.FC.STD.PB.060UW444.MXX',
  hardcover:  '0600X0900.FC.PRE.CW.080CW444.GXX',
  dustjacket: '0600X0900.FC.PRE.LW.080CW444.GNG',
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string

const route = useRoute()
const visible = ref(route.query.covertest === '1')

const title         = ref("Dorothy's Story")
const subtitle      = ref('A life told through memories, moments, and love')
const binding       = ref<BindingType>('hardcover')
const pageCount     = ref(142)
const coverImageUrl = ref('')

const busy   = ref(false)
const error  = ref('')
const result = ref<{ width: number; height: number; spine: number } | null>(null)

const fileName = computed(
  () => `cover-${binding.value}-${pageCount.value}p.pdf`,
)

/** Same loader the print flow uses — reads an image URL into a data URL. */
async function loadImageAsBase64(url: string): Promise<string> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Could not load cover image (${res.status})`)
  const blob = await res.blob()
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload  = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

async function run() {
  busy.value  = true
  error.value = ''
  result.value = null

  try {
    const podId = POD_IDS[binding.value]

    // Same endpoint the real print flow uses, so this tests the real numbers.
    const res = await fetch(`${API_BASE_URL}/lulu-cover-dimensions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        pod_package_id: podId,
        interior_page_count: pageCount.value,
      }),
    })

    const text = await res.text()
    if (!res.ok) throw new Error(`Lulu cover dimensions failed (${res.status}): ${text.slice(0, 160)}`)

    const dims = JSON.parse(text)
    const width  = parseFloat(dims.width  ?? dims.width_mm)
    const height = parseFloat(dims.height ?? dims.height_mm)
    const spine  = parseFloat(dims.spine ?? dims.spine_mm ?? dims.spine_width ?? '0')

    if (!width || !height) throw new Error(`Unexpected dimensions response: ${text.slice(0, 160)}`)

    const blob = await generateCoverPDF({
      title:    title.value,
      subtitle: subtitle.value,
      pageCount: pageCount.value,
      coverImageUrl: coverImageUrl.value || undefined,
      loadImageAsBase64: coverImageUrl.value ? loadImageAsBase64 : undefined,
      luluWidth:  width,
      luluHeight: height,
      luluSpine:  spine,
      bindingType: binding.value,
    })

    result.value = { width, height, spine }

    const url = URL.createObjectURL(blob)
    const a   = document.createElement('a')
    a.href     = url
    a.download = fileName.value
    a.click()
    setTimeout(() => URL.revokeObjectURL(url), 10_000)
  } catch (err: any) {
    error.value = err?.message || 'Something went wrong generating the cover.'
    console.error('[CoverTestPanel]', err)
  } finally {
    busy.value = false
  }
}
</script>