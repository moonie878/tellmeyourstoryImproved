/**
 * useVoiceRecording.ts — Groq Whisper transcription
 *
 * Records audio with MediaRecorder, then sends to Express /transcribe
 * endpoint which uses Groq Whisper for accurate transcription.
 * Removes dependency on unreliable Web Speech API entirely.
 */

import { ref } from 'vue'
import { supabase } from './supabase'

const SERVER_URL = 'https://tellmeyourstoryimproved.onrender.com'

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

export function useVoiceRecording() {
  const isRecording     = ref(false)
  const isTranscribing  = ref(false)
  const isSaving        = ref(false)
  const liveTranscript  = ref('')
  const error           = ref('')

  // Whisper is server-side so always "supported"
  const speechSupported = true

  let mediaRecorder:  MediaRecorder | null = null
  let audioChunks:    Blob[] = []
  let recordingStart: number = 0
  let activeStream:   MediaStream | null = null

  // ── Start recording ─────────────────────────────────────────────────────────

  async function startRecording(existingAnswer: string = '') {
    error.value = ''
    liveTranscript.value = existingAnswer

    // Clean up any previous session
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

    return true
  }

  // ── Stop recording — returns blob + transcribes via Groq Whisper ─────────────

  async function stopRecording(): Promise<{ blob: Blob; transcript: string; durationSeconds: number } | null> {
    if (!mediaRecorder) return null

    isRecording.value    = false
    isTranscribing.value = true

    const durationSeconds = Math.round((Date.now() - recordingStart) / 1000)

    // Stop media recorder and collect blob
    const blob = await new Promise<Blob>((resolve) => {
      mediaRecorder!.onstop = () => {
        const mimeType = mediaRecorder?.mimeType || 'audio/webm'
        const b = new Blob(audioChunks, { type: mimeType })
        activeStream?.getTracks().forEach(t => t.stop())
        activeStream  = null
        mediaRecorder = null
        resolve(b)
      }
      mediaRecorder!.stop()
    })

    // Transcribe via Groq Whisper
    let transcript = liveTranscript.value // keep existing text as fallback
    try {
      const form = new FormData()
      const ext = blob.type.includes('webm') ? 'webm'
        : blob.type.includes('ogg') ? 'ogg'
        : 'mp4'
      form.append('audio', blob, `recording.${ext}`)

      const response = await fetch(`${SERVER_URL}/transcribe`, {
        method: 'POST',
        body: form,
      })

      if (response.ok) {
        const data = await response.json()
        if (data.transcript) {
          transcript = data.transcript
          liveTranscript.value = transcript
        }
      } else {
        console.error('Transcription failed:', await response.text())
      }
    } catch (err) {
      console.error('Transcription request failed:', err)
    } finally {
      isTranscribing.value = false
    }

    return { blob, transcript, durationSeconds }
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

  function cancelRecording() {
    if (mediaRecorder) {
      activeStream?.getTracks().forEach(t => t.stop())
      try { mediaRecorder.stop() } catch {}
      mediaRecorder = null
      activeStream  = null
    }
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
    speechSupported,
    startRecording,
    stopRecording,
    saveRecording,
    loadRecording,
    deleteRecording,
    cancelRecording,
  }
}