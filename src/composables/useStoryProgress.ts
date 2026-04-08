import type { Ref } from 'vue'
import { computed } from 'vue'
import type { StorySection } from '../types/story'

export function useStoryProgress(
  sections: Ref<StorySection[]>,
  currentSectionIndex: Ref<number>,
  lastSavedAt: Ref<Date | null>
) {
  const editorProgress = computed(() => {
    if (!sections.value.length) return 0
    return Math.round(
      ((currentSectionIndex.value + 1) / sections.value.length) * 100
    )
  })

  function getProgressMessage() {
    const progress = editorProgress.value

    if (progress < 20) return 'A great start — just keep going.'
    if (progress < 50) return 'You’re building something meaningful.'
    if (progress < 80) return 'This is coming together beautifully.'
    if (progress < 100) return 'Nearly there — your keepsake is taking shape.'
    return 'Your story is complete — ready to become a keepsake.'
  }

  function formatLastSavedTime(date: Date | null) {
    if (!date) return ''

    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  function getSavedLabel() {
    if (!lastSavedAt.value) return ''

    const diff = Date.now() - lastSavedAt.value.getTime()

    if (diff < 10000) return 'Saved just now'

    return `Saved at ${formatLastSavedTime(lastSavedAt.value)}`
  }

  return {
    editorProgress,
    getProgressMessage,
    getSavedLabel,
  }
}