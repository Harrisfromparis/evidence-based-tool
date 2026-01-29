import { useEffect, useRef } from 'react'
import { useAudioNarration } from '@/hooks/use-audio-narration'

interface NarrationTextProps {
  text: string
  className?: string
  highlightClassName?: string
  as?: 'p' | 'div' | 'span'
}

export function NarrationText({ 
  text, 
  className = '',
  highlightClassName = '',
  as: Component = 'p'
}: NarrationTextProps) {
  const { currentWordIndex, settings } = useAudioNarration()
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (currentWordIndex >= 0 && containerRef.current && settings?.highlightText) {
      const wordElements = containerRef.current.querySelectorAll('[data-word-index]')
      wordElements.forEach((el, index) => {
        if (index === currentWordIndex) {
          el.classList.add('narration-highlight')
          el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' })
        } else {
          el.classList.remove('narration-highlight')
        }
      })
    } else if (containerRef.current) {
      const wordElements = containerRef.current.querySelectorAll('[data-word-index]')
      wordElements.forEach(el => el.classList.remove('narration-highlight'))
    }
  }, [currentWordIndex, settings?.highlightText])

  const words = text.split(/(\s+)/)
  let wordIndex = 0

  return (
    <Component 
      ref={containerRef as any}
      className={className}
    >
      {words.map((segment, i) => {
        if (/^\s+$/.test(segment)) {
          return <span key={i}>{segment}</span>
        }
        
        const currentIndex = wordIndex++
        return (
          <span
            key={i}
            data-word-index={currentIndex}
            className={`inline-block transition-all duration-200 ${highlightClassName}`}
          >
            {segment}
          </span>
        )
      })}
    </Component>
  )
}
