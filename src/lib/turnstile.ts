const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

/**
 * Waits for the Turnstile token to be populated, polling every 200ms up to maxWaitMs.
 * Returns the token string or null if it times out.
 */
function waitForToken(
  getToken: () => string,
  maxWaitMs = 8000,
  intervalMs = 200
): Promise<string | null> {
  return new Promise((resolve) => {
    const token = getToken()
    if (token) {
      resolve(token)
      return
    }

    let elapsed = 0
    const interval = setInterval(() => {
      elapsed += intervalMs
      const t = getToken()
      if (t) {
        clearInterval(interval)
        resolve(t)
      } else if (elapsed >= maxWaitMs) {
        clearInterval(interval)
        resolve(null)
      }
    }, intervalMs)
  })
}

export async function verifyTurnstile(token: string): Promise<boolean> {
  if (!API_BASE_URL) {
    console.error('Missing VITE_API_BASE_URL')
    return false
  }

  if (!token) {
    console.error('Missing Turnstile token')
    return false
  }

  try {
    const response = await fetch(`${API_BASE_URL}/verify-turnstile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    })

    const data = await response.json().catch(() => null)

    if (!response.ok) {
      console.error('Turnstile verification failed:', data)
      return false
    }

    return !!data?.success
  } catch (error) {
    console.error('Turnstile request error:', error)
    return false
  }
}

/**
 * Use this in RegisterView instead of verifyTurnstile directly.
 * Waits up to 8 seconds for the token to resolve before verifying.
 * Handles slow mobile Turnstile initialisation gracefully.
 */
export async function verifyTurnstileWithRetry(
  getToken: () => string
): Promise<{ success: boolean; timedOut: boolean }> {
  if (!API_BASE_URL) {
    console.error('Missing VITE_API_BASE_URL')
    return { success: false, timedOut: false }
  }

  const token = await waitForToken(getToken)

  if (!token) {
    console.error('Turnstile token did not resolve in time')
    return { success: false, timedOut: true }
  }

  const success = await verifyTurnstile(token)
  return { success, timedOut: false }
}