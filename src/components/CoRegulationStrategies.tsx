import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from '@phosphor-icons/react'

interface CoRegulationStrategiesProps {
  onBack: () => void
}

export function CoRegulationStrategies({ onBack }: CoRegulationStrategiesProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Tools
        </Button>
        <div className="flex-1">
          <h2 className="text-foreground">Co-Regulation Strategies</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Practical approaches for supporting student regulation through adult presence and support
          </p>
        </div>
      </div>

      <Card className="bg-muted">
        <CardContent className="pt-6">
          <p className="text-muted-foreground text-sm">
            <strong className="text-foreground">Interactive tool interface coming soon.</strong> This will provide a guided, step-by-step process for Co-Regulation Strategies.
          </p>
        </CardContent>
      </Card>

      <Card className="bg-accent/5 border-2 border-accent/20">
        <CardHeader>
          <CardTitle>What is Co-Regulation?</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground space-y-3">
          <p className="leading-relaxed">
            Co-regulation is the process where adults support students in managing their emotional and sensory 
            states through calm presence, environmental adjustments, and responsive support. It recognizes that 
            regulation is not something students do alone—it develops through supportive relationships.
          </p>
          <p className="leading-relaxed">
            <strong className="text-foreground">Key principle:</strong> We cannot demand that students self-regulate. 
            We must first co-regulate with them, creating the safety and support needed for regulation to occur.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Strategy Categories</CardTitle>
          <CardDescription>
            When implemented, this tool will provide selectable strategies across these categories
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-lg">Environment</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p><strong className="text-foreground">Lighting:</strong> Dim overhead lights, use natural light, provide desk lamp, reduce fluorescent lighting</p>
              <p><strong className="text-foreground">Noise:</strong> Reduce background noise, provide quiet work space, use sound-absorbing materials, allow ear defenders or headphones</p>
              <p><strong className="text-foreground">Space:</strong> Provide physical space to move, create defined personal space, reduce crowding, allow access to calm corner</p>
              <p><strong className="text-foreground">Visual:</strong> Reduce visual clutter, provide visual boundaries, use calming colors, minimize overstimulating displays</p>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-lg">Adult Presence</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p><strong className="text-foreground">Tone:</strong> Speak in calm, even tone; avoid excited or urgent voice; match student's energy level downward</p>
              <p><strong className="text-foreground">Posture:</strong> Lower your body to student's level; open, non-threatening posture; avoid looming or blocking</p>
              <p><strong className="text-foreground">Proximity:</strong> Respect personal space; don't force closeness; allow student to approach you</p>
              <p><strong className="text-foreground">Facial expression:</strong> Calm, neutral face; gentle eye contact only if student initiates; avoid intense or expectant expressions</p>
              <p><strong className="text-foreground">Adult regulation:</strong> Regulate yourself first; breathe slowly; manage your own emotional response before intervening</p>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-lg">Sensory Supports</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p><strong className="text-foreground">Proprioceptive input:</strong> Heavy work tasks (push/pull activities), weighted items, resistance activities, wall pushes</p>
              <p><strong className="text-foreground">Vestibular input:</strong> Rocking chair, therapy ball, gentle swinging or spinning</p>
              <p><strong className="text-foreground">Tactile input:</strong> Fidget tools, textured items, stress balls, play-doh or putty</p>
              <p><strong className="text-foreground">Movement:</strong> Movement breaks, walks, stretching, yoga poses, dance or rhythmic movement</p>
              <p><strong className="text-foreground">Deep pressure:</strong> Weighted lap pad, compression vest, tight hug (if student requests), hand squeeze</p>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-lg">Predictability & Pacing</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p><strong className="text-foreground">Structure:</strong> Use visual schedules, preview upcoming activities, provide warnings before transitions</p>
              <p><strong className="text-foreground">Routine:</strong> Maintain consistent routines, explain changes in advance, use familiar language and cues</p>
              <p><strong className="text-foreground">Time:</strong> Reduce time pressure, allow processing time, break tasks into smaller chunks, provide timers for clarity</p>
              <p><strong className="text-foreground">Choice:</strong> Offer choices within structure, allow student control where possible, respect "no" or "wait"</p>
              <p><strong className="text-foreground">Breaks:</strong> Build in regular breaks, allow student-initiated breaks, make break space available without asking permission</p>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-lg">Language Scripts</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-3">
              <p><strong className="text-foreground">Validating:</strong></p>
              <div className="ml-4 space-y-1 italic">
                <p>"I can see this is hard right now"</p>
                <p>"That makes sense—it's very loud in here"</p>
                <p>"You're doing your best"</p>
              </div>

              <p><strong className="text-foreground">Offering support:</strong></p>
              <div className="ml-4 space-y-1 italic">
                <p>"What would help right now?"</p>
                <p>"Would you like some space, or would you like me to stay nearby?"</p>
                <p>"I'm here when you're ready"</p>
              </div>

              <p><strong className="text-foreground">Providing clarity:</strong></p>
              <div className="ml-4 space-y-1 italic">
                <p>"In three minutes, we'll be lining up for lunch"</p>
                <p>"First maths, then break"</p>
                <p>"You can choose: stay here and work, or take a walk and come back"</p>
              </div>

              <p><strong className="text-foreground">Avoiding:</strong></p>
              <div className="ml-4 space-y-1">
                <p>❌ "Calm down"</p>
                <p>❌ "You're fine"</p>
                <p>❌ "Stop that"</p>
                <p>❌ "Everyone else is managing"</p>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Using Co-Regulation Effectively</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• <strong className="text-foreground">Proactive, not reactive:</strong> Use strategies before dysregulation occurs</p>
          <p>• <strong className="text-foreground">Follow the student's lead:</strong> What works for one student may not work for another</p>
          <p>• <strong className="text-foreground">Build a regulation toolkit together:</strong> Ask student what helps them feel calm</p>
          <p>• <strong className="text-foreground">Model regulation:</strong> Students learn from watching adults regulate themselves</p>
          <p>• <strong className="text-foreground">Understand escalation cycles:</strong> Early intervention is most effective</p>
          <p>• <strong className="text-foreground">Prioritize safety and relationship:</strong> Academic demands can wait until regulation is restored</p>
        </CardContent>
      </Card>
    </div>
  )
}
