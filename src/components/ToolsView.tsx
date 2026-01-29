import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ListChecks, Eye, ChatCircle, HandHeart, ArrowsLeftRight, FileText } from '@phosphor-icons/react'
import { tools } from '@/lib/data'
import { LessonScriptGenerator } from '@/components/LessonScriptGenerator'
import { Choose3EBPsPlanner } from '@/components/Choose3EBPsPlanner'
import { SensoryChecklist } from '@/components/SensoryChecklist'
import { BehaviorCommunicationAnalyzer } from '@/components/BehaviorCommunicationAnalyzer'
import { CoRegulationStrategies } from '@/components/CoRegulationStrategies'
import { TransitionSupportBuilder } from '@/components/TransitionSupportBuilder'

const iconMap = {
  ListChecks,
  Eye,
  ChatCircle,
  HandHeart,
  ArrowsLeftRight,
  FileText
}

export function ToolsView() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null)

  if (selectedTool === 'lesson-script-generator') {
    return <LessonScriptGenerator onBack={() => setSelectedTool(null)} />
  }

  if (selectedTool === 'choose-3-ebps') {
    return <Choose3EBPsPlanner onBack={() => setSelectedTool(null)} />
  }

  if (selectedTool === 'sensory-checklist') {
    return <SensoryChecklist onBack={() => setSelectedTool(null)} />
  }

  if (selectedTool === 'behavior-communication') {
    return <BehaviorCommunicationAnalyzer onBack={() => setSelectedTool(null)} />
  }

  if (selectedTool === 'co-regulation') {
    return <CoRegulationStrategies onBack={() => setSelectedTool(null)} />
  }

  if (selectedTool === 'transition-support') {
    return <TransitionSupportBuilder onBack={() => setSelectedTool(null)} />
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-foreground mb-2">Quick-Access Tools</h2>
        <p className="text-muted-foreground">
          Practical planning and assessment tools to move from information to action. Each tool provides 
          structured guidance for decision-making and implementation.
        </p>
      </div>

      <Card className="bg-muted">
        <CardContent className="pt-6">
          <p className="text-muted-foreground">
            <strong className="text-foreground">Note:</strong> These tools are designed for collaborative use 
            with colleagues, families, and where appropriate, with autistic students themselves. They support 
            reflective practice and evidence-based decision-making.
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {tools.map((tool) => {
          const IconComponent = iconMap[tool.icon as keyof typeof iconMap]
          const isInteractive = tool.id === 'lesson-script-generator' || tool.id === 'transition-support'
          
          return (
            <Card 
              key={tool.id}
              className="border-2 cursor-pointer hover:bg-secondary transition-colors"
              onClick={() => setSelectedTool(tool.id)}
            >
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-accent/10 rounded">
                    <IconComponent className="w-6 h-6 text-accent" />
                  </div>
                  <CardTitle className="text-xl">{tool.title}</CardTitle>
                </div>
                <CardDescription className="text-base">
                  {tool.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isInteractive ? (
                  <div className="bg-accent/5 p-4 border border-accent/20">
                    <p className="text-sm text-foreground font-medium">
                      Click to open the interactive {tool.title.toLowerCase()}
                    </p>
                  </div>
                ) : (
                  <div className="bg-background p-4 border border-border">
                    <p className="text-sm text-muted-foreground italic">
                      Interactive tool interface coming soon. This will provide a guided, step-by-step process 
                      for {tool.title.toLowerCase()}.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tool Development Principles</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-muted-foreground">
          <p>All tools in this section follow these design principles:</p>
          <ul className="space-y-2 ml-4">
            <li>• <strong className="text-foreground">Evidence-based:</strong> Grounded in research and aligned with the 28 EBPs</li>
            <li>• <strong className="text-foreground">Practical:</strong> Completable in 5-15 minutes with actionable outcomes</li>
            <li>• <strong className="text-foreground">Collaborative:</strong> Designed for team-based reflection, not solo decision-making</li>
            <li>• <strong className="text-foreground">Student-centered:</strong> Prioritize student perspective, wellbeing, and autonomy</li>
            <li>• <strong className="text-foreground">Context-aware:</strong> Acknowledge Irish educational context and constraints</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
