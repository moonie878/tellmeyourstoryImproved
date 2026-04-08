const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

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