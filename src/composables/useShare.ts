// src/composables/useShare.ts

export function useShare() {
  const shareUrl  = 'https://tellmeyourstory.uk'
  const shareText = "I'm preserving a loved one's life story with this — voice recordings, QR codes in the printed book, the lot. Free to start 🤍"

  async function share(source: string = 'unknown') {
    // Use native Web Share API on mobile (shows native share sheet)
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Tell Me Your Story',
          text:  shareText,
          url:   `${shareUrl}?utm_source=share&utm_medium=${source}`,
        })
        return 'shared'
      } catch {
        // User cancelled — not an error
        return 'cancelled'
      }
    }

    // Fallback — copy to clipboard on desktop
    try {
      await navigator.clipboard.writeText(
        `${shareText}\n\n${shareUrl}?utm_source=share&utm_medium=${source}`
      )
      return 'copied'
    } catch {
      return 'failed'
    }
  }

  function shareWhatsApp(source: string = 'unknown') {
    const text = encodeURIComponent(
      `${shareText}\n\n${shareUrl}?utm_source=share&utm_medium=${source}_whatsapp`
    )
    window.open(`https://wa.me/?text=${text}`, '_blank')
  }

  function shareEmail(source: string = 'unknown') {
    const subject = encodeURIComponent('Preserve a loved one\'s story — Tell Me Your Story')
    const body    = encodeURIComponent(
      `${shareText}\n\n${shareUrl}?utm_source=share&utm_medium=${source}_email`
    )
    window.location.href = `mailto:?subject=${subject}&body=${body}`
  }

  return { share, shareWhatsApp, shareEmail }
}