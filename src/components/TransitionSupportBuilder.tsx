import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from '@phosphor-icons/react'

interface TransitionSupportBuilderProps {
  onBack: () => void
}

export function TransitionSupportBuilder({ onBack }: TransitionSupportBuilderProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Tools
        </Button>
        <div className="flex-1">
          <h2 className="text-foreground">Transition Support Builder</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Step-by-step guide to planning successful transitions between activities, classes, or schools
          </p>
        </div>
      </div>

      <Card className="bg-muted">
        <CardContent className="pt-6">
          <p className="text-muted-foreground text-sm">
            <strong className="text-foreground">Interactive tool interface coming soon.</strong> This will provide a guided, step-by-step process for Transition Support Builder.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Transition Planning Process</CardTitle>
          <CardDescription>
            When implemented, this tool will guide you through comprehensive transition planning
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-accent/10 text-accent flex items-center justify-center font-semibold border border-accent/20">
                1
              </div>
              <div>
                <h3 className="text-foreground font-semibold mb-1">Define the Transition</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Clarify the specific transition being planned
                </p>
                <div className="text-sm text-muted-foreground ml-4 space-y-1">
                  <p>• <strong className="text-foreground">What:</strong> Activity-to-activity, class-to-class, or school-to-school</p>
                  <p>• <strong className="text-foreground">When:</strong> Time of day, frequency, duration</p>
                  <p>• <strong className="text-foreground">Where:</strong> Physical locations involved</p>
                  <p>• <strong className="text-foreground">Who:</strong> People involved (student, staff, peers, family)</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-accent/10 text-accent flex items-center justify-center font-semibold border border-accent/20">
                2
              </div>
              <div>
                <h3 className="text-foreground font-semibold mb-1">Identify Potential Stress Points</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Anticipate what might be challenging about this transition
                </p>
                <div className="text-sm text-muted-foreground ml-4 space-y-1">
                  <p>• Unpredictability or change in routine</p>
                  <p>• Sensory challenges (noise, crowds, lighting)</p>
                  <p>• Social demands (new people, peer interactions)</p>
                  <p>• Loss of control or autonomy</p>
                  <p>• Academic or task demands</p>
                  <p>• Physical environment changes</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-accent/10 text-accent flex items-center justify-center font-semibold border border-accent/20">
                3
              </div>
              <div>
                <h3 className="text-foreground font-semibold mb-1">Choose Transition Supports</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Select appropriate strategies from available options
                </p>
                <div className="text-sm text-muted-foreground ml-4 space-y-1">
                  <p>• <strong className="text-foreground">Visual supports:</strong> Schedules, maps, timelines, photo sequences</p>
                  <p>• <strong className="text-foreground">Rehearsal:</strong> Practice visits, walk-throughs, role-play</p>
                  <p>• <strong className="text-foreground">Social narratives:</strong> Stories describing what to expect</p>
                  <p>• <strong className="text-foreground">Co-regulation strategies:</strong> Adult support, safe person, break options</p>
                  <p>• <strong className="text-foreground">Timing adjustments:</strong> Early arrival, extended time, staggered transitions</p>
                  <p>• <strong className="text-foreground">Peer support:</strong> Buddy system, familiar peer accompaniment</p>
                  <p>• <strong className="text-foreground">Communication tools:</strong> "Help" card, choice board, exit strategy</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-accent/10 text-accent flex items-center justify-center font-semibold border border-accent/20">
                4
              </div>
              <div>
                <h3 className="text-foreground font-semibold mb-1">Plan Communication</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Ensure student and family are informed and involved
                </p>
                <div className="text-sm text-muted-foreground ml-4 space-y-1">
                  <p>• <strong className="text-foreground">With student:</strong> Explain transition, seek input, address concerns, co-create supports</p>
                  <p>• <strong className="text-foreground">With family:</strong> Share plan, gather home context, align approaches, establish communication method</p>
                  <p>• <strong className="text-foreground">With receiving staff:</strong> Brief new teachers/adults, share strategies that work, provide contact person</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-accent/10 text-accent flex items-center justify-center font-semibold border border-accent/20">
                5
              </div>
              <div>
                <h3 className="text-foreground font-semibold mb-1">Set Review & Adjustment Plan</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Build in opportunities to evaluate and adapt
                </p>
                <div className="text-sm text-muted-foreground ml-4 space-y-1">
                  <p>• When will you check in? (daily for first week, weekly thereafter, etc.)</p>
                  <p>• Who will monitor progress?</p>
                  <p>• What are signs of success?</p>
                  <p>• What are signs that adjustment is needed?</p>
                  <p>• How will student voice be included in review?</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Transition Types & Considerations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-base">Activity-to-Activity</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p className="mb-2"><strong className="text-foreground">Examples:</strong> Maths to break, carpet time to desk work</p>
                <p><strong className="text-foreground">Common challenges:</strong> Abrupt shifts, unclear expectations, sensory changes</p>
                <p className="mt-2"><strong className="text-foreground">Key supports:</strong> Visual schedules, transition warnings, "first-then" boards</p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-base">Class-to-Class</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p className="mb-2"><strong className="text-foreground">Examples:</strong> Moving between subject rooms, going to PE or library</p>
                <p><strong className="text-foreground">Common challenges:</strong> Hallway crowds, different teacher expectations, finding new location</p>
                <p className="mt-2"><strong className="text-foreground">Key supports:</strong> Visual maps, early dismissal, peer buddy, safe person in new location</p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-base">Grade-to-Grade</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p className="mb-2"><strong className="text-foreground">Examples:</strong> Moving to next year within same school</p>
                <p><strong className="text-foreground">Common challenges:</strong> New teacher relationship, new classroom layout, new peers</p>
                <p className="mt-2"><strong className="text-foreground">Key supports:</strong> Meet new teacher in advance, visit new classroom, photo book of new setting</p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-base">School-to-School</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p className="mb-2"><strong className="text-foreground">Examples:</strong> Primary to secondary, moving house/schools</p>
                <p><strong className="text-foreground">Common challenges:</strong> Significant unknowns, loss of established routines, multiple new relationships</p>
                <p className="mt-2"><strong className="text-foreground">Key supports:</strong> Extended transition visits, detailed visual information, social narrative, key contact person established early</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Transition Planning Principles</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• <strong className="text-foreground">Start early:</strong> More preparation time reduces anxiety</p>
          <p>• <strong className="text-foreground">Center the student:</strong> Their voice and preferences must guide planning</p>
          <p>• <strong className="text-foreground">Over-prepare, then fade:</strong> Better to provide too much support initially than too little</p>
          <p>• <strong className="text-foreground">Coordinate across settings:</strong> Consistency between environments supports success</p>
          <p>• <strong className="text-foreground">Celebrate strengths:</strong> Frame transitions as growth opportunities, not just challenges to manage</p>
          <p>• <strong className="text-foreground">Expect adjustment time:</strong> Transitions take time; patience is essential</p>
        </CardContent>
      </Card>
    </div>
  )
}
