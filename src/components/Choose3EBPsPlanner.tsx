import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from '@phosphor-icons/react'

interface Choose3EBPsPlannerProps {
  onBack: () => void
}

export function Choose3EBPsPlanner({ onBack }: Choose3EBPsPlannerProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Tools
        </Button>
        <div className="flex-1">
          <h2 className="text-foreground">Choose 3 EBPs Planner</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Guided process to select three evidence-based practices for a specific student or situation
          </p>
        </div>
      </div>

      <Card className="bg-muted">
        <CardContent className="pt-6">
          <p className="text-muted-foreground text-sm">
            <strong className="text-foreground">Interactive tool interface coming soon.</strong> This will provide a guided, step-by-step process for Choose 3 EBPs Planner.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Planned Process Flow</CardTitle>
          <CardDescription>
            When implemented, this tool will guide you through selecting the most appropriate EBPs
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-accent/10 text-accent flex items-center justify-center font-semibold border border-accent/20">
                1
              </div>
              <div>
                <h3 className="text-foreground font-semibold mb-1">Define the Student/Situation</h3>
                <p className="text-sm text-muted-foreground">
                  Describe the student's context, current challenges, and what you hope to support
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-accent/10 text-accent flex items-center justify-center font-semibold border border-accent/20">
                2
              </div>
              <div>
                <h3 className="text-foreground font-semibold mb-1">Identify Key Needs</h3>
                <p className="text-sm text-muted-foreground">
                  Select primary areas of focus: Communication, Environment, Engagement, Emotional Safety
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-accent/10 text-accent flex items-center justify-center font-semibold border border-accent/20">
                3
              </div>
              <div>
                <h3 className="text-foreground font-semibold mb-1">Review Suggested EBPs</h3>
                <p className="text-sm text-muted-foreground">
                  Based on your identified needs, relevant EBPs from the library will be suggested with brief rationales
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-accent/10 text-accent flex items-center justify-center font-semibold border border-accent/20">
                4
              </div>
              <div>
                <h3 className="text-foreground font-semibold mb-1">Select 3 EBPs</h3>
                <p className="text-sm text-muted-foreground">
                  Choose three practices that feel most appropriate and achievable for your context
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-accent/10 text-accent flex items-center justify-center font-semibold border border-accent/20">
                5
              </div>
              <div>
                <h3 className="text-foreground font-semibold mb-1">Plan Next Steps</h3>
                <p className="text-sm text-muted-foreground">
                  Define who will implement, when you'll start, how you'll approach it, and how you'll review progress
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Design Principles</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• <strong className="text-foreground">Student-centered:</strong> All decisions begin with the student's needs and context</p>
          <p>• <strong className="text-foreground">Manageable scope:</strong> Three practices prevent overwhelm and support focused implementation</p>
          <p>• <strong className="text-foreground">Evidence-guided:</strong> Suggestions based on research-practice alignment</p>
          <p>• <strong className="text-foreground">Collaborative:</strong> Designed for team discussion, not individual decision-making</p>
          <p>• <strong className="text-foreground">Actionable:</strong> Output includes clear next steps and review mechanisms</p>
        </CardContent>
      </Card>
    </div>
  )
}
