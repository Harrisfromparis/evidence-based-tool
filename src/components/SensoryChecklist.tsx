import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from '@phosphor-icons/react'

interface SensoryChecklistProps {
  onBack: () => void
}

export function SensoryChecklist({ onBack }: SensoryChecklistProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Tools
        </Button>
        <div className="flex-1">
          <h2 className="text-foreground">Sensory Needs Checklist</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Structured observation tool to identify sensory preferences and sensitivities
          </p>
        </div>
      </div>

      <Card className="bg-muted">
        <CardContent className="pt-6">
          <p className="text-muted-foreground text-sm">
            <strong className="text-foreground">Interactive tool interface coming soon.</strong> This will provide a guided, step-by-step process for Sensory Needs Checklist.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sensory Categories</CardTitle>
          <CardDescription>
            When implemented, this tool will allow observation-based assessment across all sensory domains
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-lg">Visual</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p className="mb-2"><strong className="text-foreground">Observing for:</strong></p>
                <p>• Light sensitivity (bright lights, fluorescent lighting)</p>
                <p>• Visual complexity (busy displays, patterns)</p>
                <p>• Movement and visual tracking</p>
                <p>• Color preferences or aversions</p>
                <p className="mt-3 italic">Options: Seeks / Avoids / Neutral + notes</p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-lg">Auditory</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p className="mb-2"><strong className="text-foreground">Observing for:</strong></p>
                <p>• Noise sensitivity (loud sounds, sudden sounds)</p>
                <p>• Background noise tolerance</p>
                <p>• Specific sound triggers (bells, scraping chairs)</p>
                <p>• Music or rhythmic sound preferences</p>
                <p className="mt-3 italic">Options: Seeks / Avoids / Neutral + notes</p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-lg">Tactile</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p className="mb-2"><strong className="text-foreground">Observing for:</strong></p>
                <p>• Texture sensitivity (clothing tags, fabrics)</p>
                <p>• Touch tolerance (unexpected touch, light touch)</p>
                <p>• Temperature preferences</p>
                <p>• Seeking tactile input (fidget items, textures)</p>
                <p className="mt-3 italic">Options: Seeks / Avoids / Neutral + notes</p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-lg">Proprioceptive</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p className="mb-2"><strong className="text-foreground">Observing for:</strong></p>
                <p>• Need for deep pressure (tight hugs, weighted items)</p>
                <p>• Heavy work activities (pushing, pulling, carrying)</p>
                <p>• Body awareness in space</p>
                <p>• Seeking resistive or compressive input</p>
                <p className="mt-3 italic">Options: Seeks / Avoids / Neutral + notes</p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-lg">Vestibular</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p className="mb-2"><strong className="text-foreground">Observing for:</strong></p>
                <p>• Movement preferences (spinning, swinging, rocking)</p>
                <p>• Balance and coordination</p>
                <p>• Response to changes in head position</p>
                <p>• Motion sensitivity (car sickness, dizziness)</p>
                <p className="mt-3 italic">Options: Seeks / Avoids / Neutral + notes</p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-lg">Olfactory / Gustatory</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p className="mb-2"><strong className="text-foreground">Observing for:</strong></p>
                <p>• Smell sensitivity (perfumes, cleaning products, food)</p>
                <p>• Taste and texture preferences in food</p>
                <p>• Limited food repertoire</p>
                <p>• Seeking or avoiding certain smells</p>
                <p className="mt-3 italic">Options: Seeks / Avoids / Neutral + notes</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How to Use This Tool</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• <strong className="text-foreground">Observe, don't test:</strong> Watch student in natural contexts over several days</p>
          <p>• <strong className="text-foreground">Collaborate:</strong> Gather input from family, SNAs, and student themselves where appropriate</p>
          <p>• <strong className="text-foreground">Be specific:</strong> Note particular contexts, times of day, or triggering factors</p>
          <p>• <strong className="text-foreground">Focus on patterns:</strong> One-off reactions are less informative than repeated responses</p>
          <p>• <strong className="text-foreground">Use results to inform accommodations:</strong> Checklist should lead to environmental adjustments and support planning</p>
        </CardContent>
      </Card>
    </div>
  )
}
