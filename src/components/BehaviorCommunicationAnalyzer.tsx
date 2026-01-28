import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from '@phosphor-icons/react'

interface BehaviorCommunicationAnalyzerProps {
  onBack: () => void
}

export function BehaviorCommunicationAnalyzer({ onBack }: BehaviorCommunicationAnalyzerProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Tools
        </Button>
        <div className="flex-1">
          <h2 className="text-foreground">Behaviour = Communication Analyser</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Framework for understanding behaviour as communication rather than as a problem to eliminate
          </p>
        </div>
      </div>

      <Card className="bg-muted">
        <CardContent className="pt-6">
          <p className="text-muted-foreground text-sm">
            <strong className="text-foreground">Interactive tool interface coming soon.</strong> This will provide a guided, step-by-step process for Behaviour = Communication Analyser.
          </p>
        </CardContent>
      </Card>

      <Card className="bg-accent/5 border-2 border-accent/20">
        <CardHeader>
          <CardTitle>Core Principle</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          <p className="text-base leading-relaxed">
            All behaviour is communication. When we observe behaviour that challenges us, our role is not to eliminate it, 
            but to understand what the student is communicating and address the underlying need.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>ABC Analysis Framework</CardTitle>
          <CardDescription>
            When implemented, this tool will guide you through structured observation and reflection
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-lg">A — Antecedent (What Happened Before?)</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p><strong className="text-foreground">Questions to consider:</strong></p>
              <p>• What was happening in the environment?</p>
              <p>• What activity or demand was presented?</p>
              <p>• Who was present?</p>
              <p>• What time of day was it?</p>
              <p>• Were there any sensory factors (noise, lighting, smells)?</p>
              <p>• Had there been any changes to routine?</p>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-lg">B — Behavior (What Did the Student Do?)</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p><strong className="text-foreground">Describe objectively:</strong></p>
              <p>• What specific actions did you observe?</p>
              <p>• How long did it last?</p>
              <p>• What did it look like? (avoid interpretive language like "tantrum" or "meltdown")</p>
              <p>• Were there warning signs beforehand?</p>
              <p className="mt-3 italic text-xs">
                Example: "Student covered ears, said 'too loud,' and left the classroom" rather than "Student had a meltdown"
              </p>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-lg">C — Consequence (What Happened After?)</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p><strong className="text-foreground">Questions to consider:</strong></p>
              <p>• How did adults respond?</p>
              <p>• How did peers respond?</p>
              <p>• What changed in the environment?</p>
              <p>• Did the student get access to something or escape from something?</p>
              <p>• How long before the situation resolved?</p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Interpretation & Response</CardTitle>
          <CardDescription>
            After documenting the ABC, the tool will guide reflection on meaning and appropriate support
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div>
              <h3 className="text-foreground font-semibold mb-2">What Might the Student Be Communicating?</h3>
              <div className="text-sm text-muted-foreground space-y-1 ml-4">
                <p>• "This is too hard / I don't understand"</p>
                <p>• "I need a break / I'm overwhelmed"</p>
                <p>• "This sensory input is painful"</p>
                <p>• "I need attention / connection"</p>
                <p>• "I want to do something else"</p>
                <p>• "I don't know what to do / I need more clarity"</p>
              </div>
            </div>

            <div>
              <h3 className="text-foreground font-semibold mb-2">What Unmet Need Might Be Present?</h3>
              <div className="text-sm text-muted-foreground space-y-1 ml-4">
                <p>• Sensory regulation</p>
                <p>• Predictability and structure</p>
                <p>• Communication support</p>
                <p>• Skill development (task too complex)</p>
                <p>• Autonomy and choice</p>
                <p>• Social connection</p>
              </div>
            </div>

            <div>
              <h3 className="text-foreground font-semibold mb-2">Relevant EBPs to Consider</h3>
              <p className="text-sm text-muted-foreground">
                Based on your analysis, the tool will suggest appropriate evidence-based practices such as:
                Visual Supports, Antecedent-Based Intervention, Functional Communication Training, 
                Self-Management, Structured Work Systems, or Sensory Supports.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ethical Reminders</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• <strong className="text-foreground">Behavior is not manipulation:</strong> Students are communicating genuine needs</p>
          <p>• <strong className="text-foreground">Our discomfort is not the student's problem:</strong> Adults must regulate themselves first</p>
          <p>• <strong className="text-foreground">Compliance is not the goal:</strong> Understanding and meeting needs is the goal</p>
          <p>• <strong className="text-foreground">Punishing communication is harmful:</strong> Never punish a student for expressing distress</p>
          <p>• <strong className="text-foreground">Context matters:</strong> A student who "can" do something in one context may genuinely struggle in another</p>
        </CardContent>
      </Card>
    </div>
  )
}
