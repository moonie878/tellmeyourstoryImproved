/**
 * useVoiceRecording.ts
 *
 * Records voice answers and saves them to Supabase storage.
 * Runs MediaRecorder (audio capture) alongside Web Speech API (transcription)
 * simultaneously so you get both the audio file and the text transcript.
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

export function useVoiceRecording() {
  const isRecording      = ref(false)
  const isTranscribing   = ref(false)
  const isSaving         = ref(false)
  const liveTranscript   = ref('')
  const error            = ref('')
  const speechSupported  = !!(
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
  )

  let mediaRecorder:  MediaRecorder | null = null
  let recognition:    any = null
  let audioChunks:    Blob[] = []
  let recordingStart: number = 0
  let baseText:       string = ''

  const SpeechRecognition =
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition

  // ── Start recording ───────────────────────────────────────────────────────

  async function startRecording(existingAnswer: string = '') {
    // Clean up any existing recognition instance before starting
  if (recognition) {
    try { recognition.abort() } catch {}
    recognition = null
    await new Promise(resolve => setTimeout(resolve, 500)) // let it fully close
  }
  if (mediaRecorder) {
    try { mediaRecorder.stop() } catch {}
    mediaRecorder?.stream?.getTracks().forEach(t => t.stop())
    mediaRecorder = null
    audioChunks = []
  }
  await new Promise(resolve => setTimeout(resolve, 500)) // let it fully close

    error.value = ''
    liveTranscript.value = existingAnswer
    baseText = existingAnswer

    // Request microphone
    let stream: MediaStream
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    } catch {
      error.value = 'Microphone access denied. Please allow microphone access and try again.'
      return false
    }

    // ── MediaRecorder — captures audio blob ────────────────────────────────
    audioChunks = []
    const mimeType = MediaRecorder.isTypeSupported('audio/webm')
      ? 'audio/webm'
      : MediaRecorder.isTypeSupported('audio/ogg')
      ? 'audio/ogg'
      : 'audio/mp4'

    mediaRecorder = new MediaRecorder(stream, { mimeType })

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) audioChunks.push(e.data)
    }

    mediaRecorder.start(100) // collect chunks every 100ms
    recordingStart = Date.now()

    // ── Web Speech API — live transcription ────────────────────────────────
    if (SpeechRecognition) {
      recognition = new SpeechRecognition()
      recognition.continuous     = true
      recognition.interimResults = true
      recognition.lang            = 'en-GB'

      recognition.onresult = (event: any) => {
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

      recognition.onerror = (e: any) => {
  console.error('Speech recognition error:', e.error)
  // Don't restart on network errors — it causes an infinite loop
  if (e.error === 'network') {
    recognition = null
  }
}

recognition.onend = () => {
  // Auto-restart only if still recording AND no network error
  if (isRecording.value && recognition) {
    try { recognition.start() } catch {}
  }
}

      try {
        recognition.start()
      } catch (err) {
        console.error('Could not start speech recognition:', err)
      }
    }

    isRecording.value = true
    return true
  }

  // ── Stop recording — returns audio blob + final transcript ────────────────

  async function stopRecording(): Promise<{ blob: Blob; transcript: string; durationSeconds: number } | null> {
    if (!mediaRecorder) return null

    isRecording.value    = false
    isTranscribing.value = true

    // Stop speech recognition
    if (recognition) {
      try { recognition.stop() } catch {}
      recognition = null
    }

    const durationSeconds = Math.round((Date.now() - recordingStart) / 1000)
    const finalTranscript = liveTranscript.value

    // Stop media recorder and collect blob
    return new Promise((resolve) => {
      if (!mediaRecorder) { isTranscribing.value = false; resolve(null); return }

      mediaRecorder.onstop = () => {
        const mimeType = mediaRecorder?.mimeType || 'audio/webm'
        const blob = new Blob(audioChunks, { type: mimeType })

        // Stop all tracks
        mediaRecorder?.stream?.getTracks().forEach(t => t.stop())
        mediaRecorder = null
        isTranscribing.value = false

        resolve({ blob, transcript: finalTranscript, durationSeconds })
      }

      mediaRecorder.stop()
    })
  }

  // ── Save recording to Supabase ────────────────────────────────────────────

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
      // Upload audio to Supabase storage
      const ext      = blob.type.includes('webm') ? 'webm' : blob.type.includes('ogg') ? 'ogg' : 'mp4'
      const filename = `${projectId}/${sectionId}-${Date.now()}.${ext}`

      const { error: uploadError } = await supabase.storage
        .from('voice-recordings')
        .upload(filename, blob, { contentType: blob.type, upsert: true })

      if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`)

      const { data: { publicUrl } } = supabase.storage
        .from('voice-recordings')
        .getPublicUrl(filename)

      // Save to database — upsert so re-recording replaces the old one
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

  // ── Load existing recording for a section ─────────────────────────────────

  async function loadRecording(sectionId: string, projectId: string): Promise<VoiceRecording | null> {
    const { data } = await supabase
      .from('voice_recordings')
      .select('*')
      .eq('section_id', sectionId)
      .eq('project_id', projectId)
      .maybeSingle()

    return data || null
  }

  // ── Delete a recording ────────────────────────────────────────────────────

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

  // ── Cancel without saving ─────────────────────────────────────────────────

  function cancelRecording() {
    if (recognition) {
      try { recognition.stop() } catch {}
      recognition = null
    }
    if (mediaRecorder) {
      mediaRecorder.stream?.getTracks().forEach(t => t.stop())
      try { mediaRecorder.stop() } catch {}
      mediaRecorder = null
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