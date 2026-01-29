import { useState, useEffect, useCallback, useRef } from 'react'
import { useKV } from '@github/spark/hooks'

interface NarrationSettings {
  enabled: boolean
  rate: number
  pitch: number
  volume: number
  voice: string | null
}

export function useAudioNarration() {
  const [settings, setSettings] = useKV<NarrationSettings>('audio-narration-settings', {
    enabled: false,
    rate: 1.0,
    pitch: 1.0,
    volume: 1.0,
    voice: null
  })

  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([])
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices()
      setAvailableVoices(voices)
    }

    loadVoices()
    window.speechSynthesis.onvoiceschanged = loadVoices

    return () => {
      window.speechSynthesis.cancel()
    }
  }, [])

  const speak = useCallback((text: string) => {
    if (!text || !settings) return

    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = settings.rate
    utterance.pitch = settings.pitch
    utterance.volume = settings.volume

    if (settings.voice && availableVoices.length > 0) {
      const selectedVoice = availableVoices.find(v => v.name === settings.voice)
      if (selectedVoice) {
        utterance.voice = selectedVoice
      }
    }

    utterance.onstart = () => {
      setIsPlaying(true)
      setIsPaused(false)
    }

    utterance.onend = () => {
      setIsPlaying(false)
      setIsPaused(false)
      utteranceRef.current = null
    }

    utterance.onerror = () => {
      setIsPlaying(false)
      setIsPaused(false)
      utteranceRef.current = null
    }

    utteranceRef.current = utterance
    window.speechSynthesis.speak(utterance)
  }, [settings, availableVoices])

  const pause = useCallback(() => {
    if (isPlaying && !isPaused) {
      window.speechSynthesis.pause()
      setIsPaused(true)
    }
  }, [isPlaying, isPaused])

  const resume = useCallback(() => {
    if (isPaused) {
      window.speechSynthesis.resume()
      setIsPaused(false)
    }
  }, [isPaused])

  const stop = useCallback(() => {
    window.speechSynthesis.cancel()
    setIsPlaying(false)
    setIsPaused(false)
    utteranceRef.current = null
  }, [])

  const updateSettings = useCallback((newSettings: Partial<NarrationSettings>) => {
    setSettings(current => {
      if (!current) return {
        enabled: false,
        rate: 1.0,
        pitch: 1.0,
        volume: 1.0,
        voice: null,
        ...newSettings
      }
      return { ...current, ...newSettings }
    })
  }, [setSettings])

  return {
    settings,
    updateSettings,
    speak,
    pause,
    resume,
    stop,
    isPlaying,
    isPaused,
    availableVoices
  }
}
