import { useState, useEffect, useCallback, useRef } from 'react'
import { useKV } from '@github/spark/hooks'

interface NarrationSettings {
  enabled: boolean
  rate: number
  pitch: number
  volume: number
  voice: string | null
  highlightText: boolean
}

export function useAudioNarration() {
  const [settings, setSettings] = useKV<NarrationSettings>('audio-narration-settings', {
    enabled: false,
    rate: 1.0,
    pitch: 1.0,
    volume: 1.0,
    voice: null,
    highlightText: true
  })

  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(-1)
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
    setCurrentWordIndex(-1)

    const words = text.split(/\s+/)
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
      setCurrentWordIndex(0)
    }

    if (settings.highlightText) {
      utterance.onboundary = (event) => {
        if (event.name === 'word') {
          const charIndex = event.charIndex
          let wordCount = 0
          let currentIndex = 0
          
          for (let i = 0; i < words.length; i++) {
            currentIndex = text.indexOf(words[i], currentIndex)
            if (currentIndex <= charIndex && charIndex < currentIndex + words[i].length) {
              wordCount = i
              break
            }
            currentIndex += words[i].length
          }
          
          setCurrentWordIndex(wordCount)
        }
      }
    }

    utterance.onend = () => {
      setIsPlaying(false)
      setIsPaused(false)
      setCurrentWordIndex(-1)
      utteranceRef.current = null
    }

    utterance.onerror = () => {
      setIsPlaying(false)
      setIsPaused(false)
      setCurrentWordIndex(-1)
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
    setCurrentWordIndex(-1)
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
        highlightText: true,
        ...newSettings
      }
      return { ...current, ...newSettings } as NarrationSettings
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
    currentWordIndex,
    availableVoices
  }
}
