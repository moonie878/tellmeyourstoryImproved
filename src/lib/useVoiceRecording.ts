/**
 * useVoiceRecording.ts
 *
 * Records voice answers and saves them to Supabase storage.
 * Runs MediaRecorder (audio capture) alongside Web Speech API (transcription)
 * simultaneously so you get both the audio file and the text transcript.
 *
 * Uses a module-level singleton for SpeechRecognition so Chrome never has
 * two instances competing — fixes the "network" error on re-record.
 *
 * Storage: Supabase bucket 'voice-recordings' (public)
 * Table:   voice_recordings (id, section_id, project_id, audio_url, transcript, duration_seconds)
 */

import { ref } from 'vue'
import { supabase } from './supabase'

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

// ── Module-level singleton ─────────────────────────────────────────────────────
// Chrome allows only one SpeechRecognition instance at a time.
// Keeping it at module level means it survives component remounts
// and can be properly killed before a new session starts.
const SpeechRecognitionAPI =
  (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition

let globalRecognition: any = null

function killRecognition(): Promise<void> {
  return new Promise((resolve) => {
    if (!globalRecognition) {
      resolve()
      return
    }
    const r = globalRecognition
    globalRecognition = null

    // onend fires after abort — wait for it before resolving
    const prev = r.onend
    r.onend = () => {
      if (prev) prev()
      resolve()
    }

    try { r.abort() } catch { resolve() }

    // Safety timeout — if onend never fires, resolve anyway
    setTimeout(resolve, 500)
  })
}

// ── Composable ────────────────────────────────────────────────────────────────

export function useVoiceRecording() {
  const isRecording     = ref(false)
  const isTranscribing  = ref(false)
  const isSaving        = ref(false)
  const liveTranscript  = ref('')
  const error           = ref('')
  const speechSupported = !!SpeechRecognitionAPI

  let mediaRecorder:  MediaRecorder | null = null
  let audioChunks:    Blob[] = []
  let recordingStart: number = 0
  let baseText:       string = ''
  let activeStream:   MediaStream | null = null

  // ── Start recording ─────────────────────────────────────────────────────────

  async function startRecording(existingAnswer: string = '') {
    error.value = ''
    liveTranscript.value = existingAnswer
    baseText = existingAnswer

    // Kill any existing recognition and wait for it to fully close
    await killRecognition()

    // Stop any existing media recorder
    if (mediaRecorder) {
      try { mediaRecorder.stop() } catch {}
      activeStream?.getTracks().forEach(t => t.stop())
      mediaRecorder = null
      activeStream = null
      audioChunks = []
    }

    // Request microphone
    try {
      activeStream = await navigator.mediaDevices.getUserMedia({ audio: true })
    } catch {
      error.value = 'Microphone access denied. Please allow microphone access and try again.'
      return false
    }

    // ── MediaRecorder — captures audio blob ──────────────────────────────────
    audioChunks = []
    const mimeType = MediaRecorder.isTypeSupported('audio/webm')
      ? 'audio/webm'
      : MediaRecorder.isTypeSupported('audio/ogg')
      ? 'audio/ogg'
      : 'audio/mp4'

    mediaRecorder = new MediaRecorder(activeStream, { mimeType })
    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) audioChunks.push(e.data)
    }
    mediaRecorder.start(100)
    recordingStart = Date.now()
    isRecording.value = true

    // ── Web Speech API — live transcription ──────────────────────────────────
    if (SpeechRecognitionAPI) {
      startSpeechRecognition()
    }

    return true
  }

  function startSpeechRecognition() {
    if (!SpeechRecognitionAPI) return

    globalRecognition = new SpeechRecognitionAPI()
    globalRecognition.continuous     = true
    globalRecognition.interimResults = true
    globalRecognition.lang           = 'en-GB'

    globalRecognition.onresult = (event: any) => {
      let interim = ''
      let final   = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const text = event.results[i][0].transcript
        if (event.results[i].isFinal) {
          final += text + ' '
        } else {
          interim += text
        }
      }
      if (final) baseText = baseText + final
      liveTranscript.value = baseText + interim
    }

    globalRecognition.onerror = (e: any) => {
      // network errors are usually transient — don't show to user
      if (e.error === 'network') {
        console.warn('Speech recognition network error — will retry')
        return
      }
      console.error('Speech recognition error:', e.error)
    }

    globalRecognition.onend = () => {
      // Auto-restart if still recording (handles Chrome/iOS timeout)
      if (isRecording.value && globalRecognition) {
        try { globalRecognition.start() } catch {}
      }
    }

    try {
      globalRecognition.start()
    } catch (err) {
      console.error('Could not start speech recognition:', err)
    }
  }

  // ── Stop recording ───────────────────────────────────────────────────────────

  async function stopRecording(): Promise<{ blob: Blob; transcript: string; durationSeconds: number } | null> {
    if (!mediaRecorder) return null

    isRecording.value    = false
    isTranscribing.value = true

    // Stop speech recognition
    await killRecognition()

    const durationSeconds = Math.round((Date.now() - recordingStart) / 1000)
    const finalTranscript = liveTranscript.value

    // Stop media recorder and collect blob
    return new Promise((resolve) => {
      if (!mediaRecorder) { isTranscribing.value = false; resolve(null); return }

      mediaRecorder.onstop = () => {
        const mimeType = mediaRecorder?.mimeType || 'audio/webm'
        const blob = new Blob(audioChunks, { type: mimeType })
        activeStream?.getTracks().forEach(t => t.stop())
        activeStream  = null
        mediaRecorder = null
        isTranscribing.value = false
        resolve({ blob, transcript: finalTranscript, durationSeconds })
      }

      mediaRecorder.stop()
    })
  }

  // ── Save recording to Supabase ───────────────────────────────────────────────

  async function saveRecording(
    blob: Blob,
    transcript: string,
    durationSeconds: number,
    sectionId: string,
    projectId: string
  ): Promise<VoiceRecording | null> {
    isSaving.value = true
    error.value    = ''

    try {
      const ext      = blob.type.includes('webm') ? 'webm' : blob.type.includes('ogg') ? 'ogg' : 'mp4'
      const filename = `${projectId}/${sectionId}-${Date.now()}.${ext}`

      const { error: uploadError } = await supabase.storage
        .from('voice-recordings')
        .upload(filename, blob, { contentType: blob.type, upsert: true })

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
          { onConflict: 'section_id,project_id' }
        )
        .select()
        .single()

      if (dbError) throw new Error(`Save failed: ${dbError.message}`)
      return data

    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Could not save recording'
      console.error('Voice recording save error:', err)
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
      if (path) await supabase.storage.from('voice-recordings').remove([path])
    }
    await supabase
      .from('voice_recordings')
      .delete()
      .eq('section_id', sectionId)
      .eq('project_id', projectId)
  }

  // ── Cancel without saving ────────────────────────────────────────────────────

  async function cancelRecording() {
    isRecording.value    = false
    isTranscribing.value = false
    await killRecognition()
    if (mediaRecorder) {
      activeStream?.getTracks().forEach(t => t.stop())
      try { mediaRecorder.stop() } catch {}
      mediaRecorder = null
      activeStream  = null
    }
    audioChunks = []
  }

  return {
    isRecording,
    isTranscribing,
    isSaving,
    liveTranscript,
    error,
    speechSupported,
    startRecording,
    stopRecording,
    saveRecording,
    loadRecording,
    deleteRecording,
    cancelRecording,
  }
}