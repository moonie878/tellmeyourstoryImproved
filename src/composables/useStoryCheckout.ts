import type { Ref } from 'vue'
import type { StoryProject } from '../types/story'
import { track } from '../lib/analytics'

type SaveCurrentAnswerFn = () => Promise<void>

type StartCheckoutArgs = {
  priceId: string
  purchaseType: string
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export function useStoryCheckout(
  checkoutLoading: Ref<boolean>,
  projectId: string,
  project: Ref<StoryProject | null>,
  hasAllStoriesAccess: Ref<boolean>,
  saveCurrentAnswerBeforeCheckout: SaveCurrentAnswerFn
) {
  async function startCheckout({ priceId, purchaseType }: StartCheckoutArgs) {
    if (checkoutLoading.value) return

    if (!API_BASE_URL) {
      alert('Checkout is not configured yet.')
      return
    }

    checkoutLoading.value = true
    await saveCurrentAnswerBeforeCheckout()

    try {
      const {
        data: { user },
      } = await import('../lib/supabase').then(({ supabase }) =>
        supabase.auth.getUser()
      )

      if (!user) {
        checkoutLoading.value = false
        alert('You must be logged in to upgrade.')
        return
      }

      const response = await fetch(`${API_BASE_URL}/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          userId: user.id,
          storyType: project.value?.story_type || null,
          projectId,
          purchaseType,
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Checkout response error:', errorText)
        checkoutLoading.value = false
        alert('Could not start checkout.')
        return
      }

      const data = await response.json()

      if (data.url) {
        window.location.href = data.url
        return
      }

      checkoutLoading.value = false
      alert('Could not start checkout.')
    } catch (error) {
      console.error('Checkout error:', error)
      checkoutLoading.value = false
      alert('Could not start checkout.')
    }
  }

  async function upgradeSingleText() {
    track('upgrade_clicked', {
      type: 'tier1',
      projectId,
    })

    await startCheckout({
      priceId: 'price_1TJvcYR13CJL70CCXAigFPLP',
      purchaseType: 'single_text',
    })
  }

  async function upgradeSingleImages() {
    track('upgrade_clicked', {
      type: 'tier2',
      projectId,
    })

    await startCheckout({
      priceId: 'price_1TJvd3R13CJL70CCmOGoDDVT',
      purchaseType: 'single_images',
    })
  }

  async function upgradeAllText() {
    track('upgrade_clicked', {
      type: 'tier3',
      projectId,
    })

    await startCheckout({
      priceId: 'price_1TJvdJR13CJL70CCrdpt1bg0',
      purchaseType: 'all_text',
    })
  }

  async function upgradeAllImages() {
    track('upgrade_clicked', {
      type: 'tier4',
      projectId,
    })

    await startCheckout({
      priceId: 'price_1TJvdiR13CJL70CCqAqRBjZq',
      purchaseType: 'all_images',
    })
  }

  async function upgradeWithImages() {
    const purchaseType = hasAllStoriesAccess.value ? 'all_images' : 'single_images'
    const priceId = hasAllStoriesAccess.value
      ? 'price_1TJvdiR13CJL70CCqAqRBjZq'
      : 'price_1TJvd3R13CJL70CCmOGoDDVT'

    await startCheckout({
      priceId,
      purchaseType,
    })
  }

  return {
    startCheckout,
    upgradeSingleText,
    upgradeSingleImages,
    upgradeAllText,
    upgradeAllImages,
    upgradeWithImages,
  }
}