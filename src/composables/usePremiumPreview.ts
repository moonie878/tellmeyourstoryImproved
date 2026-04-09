import { ref, watch, type Ref } from 'vue'

export function usePremiumPreview(
  open: Ref<boolean>,
  premiumPreviewRef: Ref<HTMLElement | null>
) {
  const premiumPreviewSlider = ref(50)
  const isDraggingPremiumPreview = ref(false)
  const showPremiumPreviewHint = ref(true)

  function updateSliderFromEvent(event: PointerEvent) {
    if (!premiumPreviewRef.value) return

    const rect = premiumPreviewRef.value.getBoundingClientRect()
    const position = ((event.clientX - rect.left) / rect.width) * 100
    premiumPreviewSlider.value = Math.max(0, Math.min(100, position))
  }

  function onPremiumPreviewPointerDown(event: PointerEvent) {
    if (!premiumPreviewRef.value) return

    isDraggingPremiumPreview.value = true
    showPremiumPreviewHint.value = false
    premiumPreviewRef.value.setPointerCapture?.(event.pointerId)
    updateSliderFromEvent(event)
  }

  function onPremiumPreviewPointerMove(event: PointerEvent) {
    if (!isDraggingPremiumPreview.value) return
    updateSliderFromEvent(event)
  }

  function onPremiumPreviewPointerUp(event?: PointerEvent) {
    if (premiumPreviewRef.value && event) {
      try {
        premiumPreviewRef.value.releasePointerCapture?.(event.pointerId)
      } catch {
        // ignore release errors
      }
    }

    isDraggingPremiumPreview.value = false
  }

  watch(
    () => open.value,
    (isOpen) => {
      if (isOpen) {
        premiumPreviewSlider.value = 50
        isDraggingPremiumPreview.value = false
        showPremiumPreviewHint.value = true
      }
    }
  )

  return {
    premiumPreviewSlider,
    isDraggingPremiumPreview,
    showPremiumPreviewHint,
    onPremiumPreviewPointerDown,
    onPremiumPreviewPointerMove,
    onPremiumPreviewPointerUp,
  }
}