import { ref, watch, type Ref } from 'vue'

export function usePremiumPreview(showModal: Ref<boolean>) {
  const premiumPreviewRef = ref<HTMLElement | null>(null)
  const premiumPreviewSlider = ref(50)
  const isDraggingPremiumPreview = ref(false)
  const hasInteractedWithPremiumPreview = ref(false)
  const showPremiumPreviewHint = ref(false)

  function clamp(value: number, min: number, max: number) {
    return Math.min(max, Math.max(min, value))
  }

  function updatePremiumPreviewPosition(clientX: number) {
    const container = premiumPreviewRef.value
    if (!container) return

    const rect = container.getBoundingClientRect()
    const raw = ((clientX - rect.left) / rect.width) * 100
    premiumPreviewSlider.value = clamp(raw, 0, 100)
  }

  function markPremiumPreviewInteracted() {
    hasInteractedWithPremiumPreview.value = true
    showPremiumPreviewHint.value = false
  }

  function onPremiumPreviewPointerDown(event: PointerEvent) {
    isDraggingPremiumPreview.value = true
    markPremiumPreviewInteracted()
    premiumPreviewRef.value?.setPointerCapture?.(event.pointerId)
    updatePremiumPreviewPosition(event.clientX)
  }

  function onPremiumPreviewPointerMove(event: PointerEvent) {
    if (!isDraggingPremiumPreview.value) return
    updatePremiumPreviewPosition(event.clientX)
  }

  function onPremiumPreviewPointerUp(event: PointerEvent) {
    isDraggingPremiumPreview.value = false
    premiumPreviewRef.value?.releasePointerCapture?.(event.pointerId)
  }

  watch(showModal, (open) => {
    if (!open) return

    premiumPreviewSlider.value = 50
    hasInteractedWithPremiumPreview.value = false
    showPremiumPreviewHint.value = false

    setTimeout(() => {
      if (!hasInteractedWithPremiumPreview.value) {
        premiumPreviewSlider.value = 64
        showPremiumPreviewHint.value = true

        setTimeout(() => {
          premiumPreviewSlider.value = 50
        }, 700)

        setTimeout(() => {
          showPremiumPreviewHint.value = false
        }, 2200)
      }
    }, 500)
  })

  return {
    premiumPreviewRef,
    premiumPreviewSlider,
    isDraggingPremiumPreview,
    showPremiumPreviewHint,
    onPremiumPreviewPointerDown,
    onPremiumPreviewPointerMove,
    onPremiumPreviewPointerUp,
  }
}