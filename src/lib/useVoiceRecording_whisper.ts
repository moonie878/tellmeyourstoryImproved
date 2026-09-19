/**
 * useVoiceRecording.ts — Groq Whisper transcription
 *
 * Records audio with MediaRecorder, then sends to the Express /transcribe
 * endpoint, which uses Groq Whisper.
 *
 * Hardened for real phones:
 *  - Clear error codes (denied / no mic / mic in use / unsupported) so the UI
 *    can show the right help, not a generic message.
 *  - Keeps the screen awake while recording (Wake Lock), so iPhones don't
 *    lock and cut the recording off.
 *  - Picks a format the browser actually supports (Safari = audio/mp4).
 *  - Tells the UI when transcription failed, instead of silently keeping
 *    the old text.
 */

import { ref } from 'vue'
import { supabase } from './supabase'

const SERVER_URL =
  import.meta.env.VITE_SERVER_URL || 'https://tellmeyourstoryimproved.onrender.com'

export interface VoiceRecording {
  id: string
  section_id: string
  project_id: string
  audio_url: string
  transcript: string
  duration_seconds: number
  created_at: string
  show_qr: boolean
}

export type RecordingErrorCode =
  | ''
  | 'denied'        // user or browser blocked the microphone
  | 'no-mic'        // no microphone found
  | 'in-use'        // another app is using the microphone
  | 'unsupported'   // browser can't record audio (very old, or in-app browser)
  | 'insecure'      // page not on https
  | 'save'          // upload or database save failed
  | 'unknown'

export interface StopResult {
  blob: Blob
  transcript: string
  durationSeconds: number
  /** True when the recording worked but it couldn't be typed up. */
  transcriptionFailed: boolean
}

/** Best format this browser can record. Safari/iOS only does audio/mp4. */
function pickMimeType(): string | undefined {
  if (typeof MediaRecorder === 'undefined' || typeof MediaRecorder.isTypeSupported !== 'function') {
    return undefined
  }
  const candidates = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/ogg;codecs=opus', 'audio/ogg']
  return candidates.find((t) => MediaRecorder.isTypeSupported(t))
}

function extensionFor(type: string): string {
  if (type.includes('webm')) return 'webm'
  if (type.includes('ogg')) return 'ogg'
  return 'mp4'
}

const MESSAGES: Record<Exclude<RecordingErrorCode, ''>, string> = {
  denied: 'Your browser has blocked the microphone.',
  'no-mic': "We couldn't find a microphone on this device.",
  'in-use': 'Your microphone is being used by another app. Close it and try again.',
  unsupported: "This browser can't record audio. Try Safari on iPhone or Chrome on Android — or type instead.",
  insecure: 'Recording needs a secure (https) connection.',
  save: "We couldn't save your recording. Please check your connection and try again.",
  unknown: 'Something went wrong with the microphone. Please try again.',
}

export function useVoiceRecording() {
  const isRecording     = ref(false)
  const isTranscribing  = ref(false)
  const isSaving        = ref(false)
  const liveTranscript  = ref('')
  const error           = ref('')
  const errorCode       = ref<RecordingErrorCode>('')
  const elapsedSeconds  = ref(0)

  // Whisper is server-side; recording itself still needs MediaRecorder.
  const speechSupported =
    typeof window !== 'undefined' &&
    !!navigator.mediaDevices?.getUserMedia &&
    typeof MediaRecorder !== 'undefined'

  let mediaRecorder:  MediaRecorder | null = null
  let audioChunks:    Blob[] = []
  let recordingStart = 0
  let activeStream:   MediaStream | null = null
  let timer:          ReturnType<typeof setInterval> | null = null
  let wakeLock:       { release: () => Promise<void> } | null = null

  function setError(code: Exclude<RecordingErrorCode, ''>, detail?: string) {
    errorCode.value = code
    error.value = detail || MESSAGES[code]
  }

  function clearError() {
    errorCode.value = ''
    error.value = ''
  }

  // ── Wake lock: stop the screen locking mid-story ────────────────────────────

  async function acquireWakeLock() {
    try {
      const nav = navigator as Navigator & { wakeLock?: { request: (t: 'screen') => Promise<{ release: () => Promise<void> }> } }
      if (nav.wakeLock && !wakeLock) wakeLock = await nav.wakeLock.request('screen')
    } catch {
      // Not supported or refused — recording still works, the screen may just dim.
    }
  }

  async function releaseWakeLock() {
    try { await wakeLock?.release() } catch {}
    wakeLock = null
  }

  // The browser drops the wake lock when the tab is hidden; take it back on return.
  function onVisibilityChange() {
    if (document.visibilityState === 'visible' && isRecording.value) {
      wakeLock = null
      acquireWakeLock()
    }
  }

  function startTimer() {
    elapsedSeconds.value = 0
    timer = setInterval(() => {
      elapsedSeconds.value = Math.round((Date.now() - recordingStart) / 1000)
    }, 500)
  }

  function stopTimer() {
    if (timer) clearInterval(timer)
    timer = null
  }

  function teardown() {
    activeStream?.getTracks().forEach((t) => t.stop())
    activeStream = null
    mediaRecorder = null
    stopTimer()
    releaseWakeLock()
    document.removeEventListener('visibilitychange', onVisibilityChange)
  }

  // ── Start recording ─────────────────────────────────────────────────────────

  async function startRecording(existingAnswer: string = ''): Promise<boolean> {
    clearError()
    liveTranscript.value = existingAnswer

    if (mediaRecorder) {
      try { mediaRecorder.stop() } catch {}
      teardown()
      audioChunks = []
    }

    if (!window.isSecureContext) { setError('insecure'); return false }
    if (!speechSupported) { setError('unsupported'); return false }

    try {
      activeStream = await navigator.mediaDevices.getUserMedia({ audio: true })
    } catch (err) {
      const name = (err as DOMException)?.name
      if (name === 'NotAllowedError' || name === 'SecurityError') setError('denied')
      else if (name === 'NotFoundError' || name === 'OverconstrainedError') setError('no-mic')
      else if (name === 'NotReadableError' || name === 'AbortError') setError('in-use')
      else setError('unknown')
      return false
    }

    audioChunks = []
    const mimeType = pickMimeType()

    try {
      mediaRecorder = mimeType ? new MediaRecorder(activeStream, { mimeType }) : new MediaRecorder(activeStream)
    } catch {
      teardown()
      setError('unsupported')
      return false
    }

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) audioChunks.push(e.data)
    }
    mediaRecorder.start(1000)
    recordingStart = Date.now()
    isRecording.value = true
    startTimer()

    await acquireWakeLock()
    document.addEventListener('visibilitychange', onVisibilityChange)

    return true
  }

  // ── Stop recording — returns blob + transcribes via Groq Whisper ─────────────

  async function stopRecording(): Promise<StopResult | null> {
    if (!mediaRecorder) return null

    isRecording.value    = false
    isTranscribing.value = true

    const durationSeconds = Math.max(1, Math.round((Date.now() - recordingStart) / 1000))
    const recorder = mediaRecorder

    const blob = await new Promise<Blob>((resolve) => {
      recorder.onstop = () => {
        const type = recorder.mimeType || audioChunks[0]?.type || 'audio/mp4'
        resolve(new Blob(audioChunks, { type }))
      }
      try { recorder.stop() } catch { resolve(new Blob(audioChunks, { type: recorder.mimeType || 'audio/mp4' })) }
    })
    teardown()

    let transcript = ''
    let transcriptionFailed = true
    try {
      const form = new FormData()
      form.append('audio', blob, `recording.${extensionFor(blob.type)}`)

      const response = await fetch(`${SERVER_URL}/transcribe`, { method: 'POST', body: form })

      if (response.ok) {
        const data = await response.json()
        if (typeof data.transcript === 'string' && data.transcript.trim()) {
          transcript = data.transcript.trim()
          liveTranscript.value = transcript
          transcriptionFailed = false
        }
      } else {
        console.error('Transcription failed:', await response.text())
      }
    } catch (err) {
      console.error('Transcription request failed:', err)
    } finally {
      isTranscribing.value = false
    }

    return { blob, transcript, durationSeconds, transcriptionFailed }
  }

  // ── Save recording to Supabase ───────────────────────────────────────────────

  async function saveRecording(
    blob: Blob,
    transcript: string,
    durationSeconds: number,
    sectionId: string,
    projectId: string,
  ): Promise<VoiceRecording | null> {
    isSaving.value = true
    clearError()

    try {
      const filename = `${projectId}/${sectionId}-${Date.now()}.${extensionFor(blob.type)}`

      const { error: uploadError } = await supabase.storage
        .from('voice-recordings')
        .upload(filename, blob, { contentType: blob.type || 'audio/mp4', upsert: true })

      if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`)

      const { data: { publicUrl } } = supabase.storage
        .from('voice-recordings')
        .getPublicUrl(filename)

      const { data, error: dbError } = await supabase
        .from('voice_recordings')
        .upsert(
          {
            section_id:       sectionId,
            project_id:       projectId,
            audio_url:        publicUrl,
            transcript,
            duration_seconds: durationSeconds,
          },
          { onConflict: 'section_id,project_id' },
        )
        .select()
        .single()

      if (dbError) throw new Error(`Save failed: ${dbError.message}`)
      return data
    } catch (err) {
      console.error('Voice recording save error:', err)
      setError('save')
      return null
    } finally {
      isSaving.value = false
    }
  }

  // ── Load existing recording ──────────────────────────────────────────────────

  async function loadRecording(sectionId: string, projectId: string): Promise<VoiceRecording | null> {
    const { data } = await supabase
      .from('voice_recordings')
      .select('*')
      .eq('section_id', sectionId)
      .eq('project_id', projectId)
      .maybeSingle()

    return data || null
  }

  // ── Delete a recording ───────────────────────────────────────────────────────

  async function deleteRecording(sectionId: string, projectId: string): Promise<void> {
    const existing = await loadRecording(sectionId, projectId)
    if (existing?.audio_url) {
      const path = existing.audio_url.split('/voice-recordings/')[1]
      if (path) await supabase.storage.from('voice-recordings').remove([decodeURIComponent(path)])
    }
    await supabase
      .from('voice_recordings')
      .delete()
      .eq('section_id', sectionId)
      .eq('project_id', projectId)
  }

  // ── Cancel without saving ────────────────────────────────────────────────────

  function cancelRecording() {
    if (mediaRecorder) {
      try { mediaRecorder.stop() } catch {}
    }
    teardown()
    isRecording.value    = false
    isTranscribing.value = false
    audioChunks          = []
  }

  return {
    isRecording,
    isTranscribing,
    isSaving,
    liveTranscript,
    error,
    errorCode,
    elapsedSeconds,
    speechSupported,
    clearError,
    startRecording,
    stopRecording,
    saveRecording,
    loadRecording,
    deleteRecording,
    cancelRecording,
  }
}