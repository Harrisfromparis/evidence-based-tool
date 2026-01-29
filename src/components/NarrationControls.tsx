import { useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { SpeakerHigh, SpeakerSlash, Pause, Play, Stop } from '@phosphor-icons/react'
import { useAudioNarration } from '@/hooks/use-audio-narration'

interface NarrationControlsProps {
  text: string
  autoPlay?: boolean
  className?: string
  variant?: 'default' | 'minimal'
}

export function NarrationControls({ 
  text, 
  autoPlay = false, 
  className = '',
  variant = 'default'
}: NarrationControlsProps) {
  const { speak, pause, resume, stop, isPlaying, isPaused, settings } = useAudioNarration()
  const hasAutoPlayed = useRef(false)

  useEffect(() => {
    if (autoPlay && settings?.enabled && !hasAutoPlayed.current && text) {
      hasAutoPlayed.current = true
      speak(text)
    }
  }, [autoPlay, settings?.enabled, text, speak])

  if (!settings?.enabled) {
    return null
  }

  const handlePlayPause = () => {
    if (!isPlaying) {
      speak(text)
    } else if (isPaused) {
      resume()
    } else {
      pause()
    }
  }

  const handleStop = () => {
    stop()
    hasAutoPlayed.current = false
  }

  if (variant === 'minimal') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <Button
          variant="ghost"
          size="sm"
          onClick={handlePlayPause}
          aria-label={isPlaying ? (isPaused ? 'Resume narration' : 'Pause narration') : 'Play narration'}
        >
          {!isPlaying ? (
            <SpeakerHigh className="w-5 h-5" />
          ) : isPaused ? (
            <Play className="w-5 h-5" />
          ) : (
            <Pause className="w-5 h-5" />
          )}
        </Button>
        {isPlaying && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleStop}
            aria-label="Stop narration"
          >
            <Stop className="w-5 h-5" />
          </Button>
        )}
      </div>
    )
  }

  return (
    <div className={`flex items-center gap-2 p-3 bg-muted rounded border border-border ${className}`}>
      <SpeakerHigh className="w-5 h-5 text-muted-foreground" />
      <div className="flex items-center gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={handlePlayPause}
        >
          {!isPlaying ? (
            <>
              <Play className="w-4 h-4" />
              <span>Listen</span>
            </>
          ) : isPaused ? (
            <>
              <Play className="w-4 h-4" />
              <span>Resume</span>
            </>
          ) : (
            <>
              <Pause className="w-4 h-4" />
              <span>Pause</span>
            </>
          )}
        </Button>
        {isPlaying && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleStop}
          >
            <Stop className="w-4 h-4" />
            <span>Stop</span>
          </Button>
        )}
      </div>
    </div>
  )
}
