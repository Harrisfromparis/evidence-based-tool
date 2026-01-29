import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { SpeakerHigh } from '@phosphor-icons/react'
import { useAudioNarration } from '@/hooks/use-audio-narration'

export function NarrationSettings() {
  const { settings, updateSettings, availableVoices, speak } = useAudioNarration()
  const [open, setOpen] = useState(false)

  if (!settings) return null

  const testNarration = () => {
    speak("This is a sample of the audio narration. You can adjust the speed, pitch, volume, and voice to suit your preferences.")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <SpeakerHigh className="w-5 h-5" />
          <span className="hidden sm:inline">Audio Narration</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Audio Narration Settings</DialogTitle>
          <DialogDescription>
            Configure text-to-speech narration for improved accessibility. When enabled, you can listen to content throughout the application.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="narration-enabled" className="text-base">
                Enable Audio Narration
              </Label>
              <p className="text-sm text-muted-foreground">
                Turn on text-to-speech throughout the app
              </p>
            </div>
            <Switch
              id="narration-enabled"
              checked={settings.enabled}
              onCheckedChange={(checked) => updateSettings({ enabled: checked })}
            />
          </div>

          {settings.enabled && (
            <>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="highlight-enabled" className="text-base">
                    Highlight Narrated Text
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Visually highlight words as they are spoken
                  </p>
                </div>
                <Switch
                  id="highlight-enabled"
                  checked={settings.highlightText}
                  onCheckedChange={(checked) => updateSettings({ highlightText: checked })}
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="voice-select">Voice</Label>
                <Select
                  value={settings.voice || 'default'}
                  onValueChange={(value) => updateSettings({ voice: value === 'default' ? null : value })}
                >
                  <SelectTrigger id="voice-select">
                    <SelectValue placeholder="Select a voice" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default Voice</SelectItem>
                    {availableVoices.map((voice) => (
                      <SelectItem key={voice.name} value={voice.name}>
                        {voice.name} ({voice.lang})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="rate-slider">Speed</Label>
                  <span className="text-sm text-muted-foreground">{settings.rate.toFixed(1)}x</span>
                </div>
                <Slider
                  id="rate-slider"
                  min={0.5}
                  max={2.0}
                  step={0.1}
                  value={[settings.rate]}
                  onValueChange={([value]) => updateSettings({ rate: value })}
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="pitch-slider">Pitch</Label>
                  <span className="text-sm text-muted-foreground">{settings.pitch.toFixed(1)}</span>
                </div>
                <Slider
                  id="pitch-slider"
                  min={0.5}
                  max={2.0}
                  step={0.1}
                  value={[settings.pitch]}
                  onValueChange={([value]) => updateSettings({ pitch: value })}
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="volume-slider">Volume</Label>
                  <span className="text-sm text-muted-foreground">{Math.round(settings.volume * 100)}%</span>
                </div>
                <Slider
                  id="volume-slider"
                  min={0}
                  max={1}
                  step={0.1}
                  value={[settings.volume]}
                  onValueChange={([value]) => updateSettings({ volume: value })}
                />
              </div>

              <Button 
                onClick={testNarration} 
                variant="secondary" 
                className="w-full"
              >
                Test Narration
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
