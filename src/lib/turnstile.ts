const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export async function verifyTurnstile(token: string): Promise<boolean> {
  if (!API_BASE_URL) return false
  if (!token) return false

  const response = await fetch(`${API_BASE_URL}/verify-turnstile`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
  })

  if (!response.ok) {
    return false
  }

  const data = await response.json()
  return !!data.success
}