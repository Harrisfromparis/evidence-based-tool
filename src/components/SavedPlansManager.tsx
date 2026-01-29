import { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, FilePdf, Trash } from '@phosphor-icons/react'
import { toast } from 'sonner'
import { Alert, AlertDescription } from '@/components/ui/alert'

interface SavedPlan {
  id: string
  inputs: Record<string, string>
  generatedContent: string
  createdAt: string
}

interface PlanWithContext {
  plan: SavedPlan
  toolName: string
  storageKey: string
}

const TOOL_STORAGE_KEYS = [
  { key: 'lesson-script-plans', name: 'Lesson Script' },
  { key: 'choose-3-ebps-plans', name: 'Choose 3 EBPs' },
  { key: 'sensory-checklist-plans', name: 'Sensory Checklist' },
  { key: 'behavior-communication-plans', name: 'Behavior Communication' },
  { key: 'co-regulation-plans', name: 'Co-Regulation' },
  { key: 'transition-support-plans', name: 'Transition Support' },
  { key: 'parent-ebp-assessment-plans', name: 'Parent EBP Assessment' },
  { key: 'school-planner-plans', name: 'School Planner' },
  { key: 'student-input-plans', name: 'Student Input' },
  { key: 'visual-supports-plans', name: 'Visual Supports' },
  { key: 'social-narrative-plans', name: 'Social Narrative' },
  { key: 'task-analysis-plans', name: 'Task Analysis' },
  { key: 'fct-plans', name: 'FCT' },
  { key: 'reinforcement-menu-plans', name: 'Reinforcement Menu' },
  { key: 'prompting-hierarchy-plans', name: 'Prompting Hierarchy' },
  { key: 'self-management-plans', name: 'Self-Management' },
  { key: 'structured-work-plans', name: 'Structured Work' },
  { key: 'peer-mediation-plans', name: 'Peer Mediation' },
  { key: 'parent-training-plans', name: 'Parent Training' },
  { key: 'social-skills-plans', name: 'Social Skills' },
  { key: 'video-modeling-plans', name: 'Video Modeling' },
  { key: 'aac-implementation-plans', name: 'AAC Implementation' },
  { key: 'antecedent-modification-plans', name: 'Antecedent Modification' },
  { key: 'cbt-activity-plans', name: 'CBT Activity' },
  { key: 'exercise-movement-plans', name: 'Exercise Movement' },
  { key: 'music-intervention-plans', name: 'Music Intervention' },
  { key: 'technology-integration-plans', name: 'Technology Integration' },
  { key: 'dtt-session-plans', name: 'DTT Session' },
  { key: 'naturalistic-teaching-plans', name: 'Naturalistic Teaching' },
]

interface SavedPlansManagerProps {
  onBack: () => void
}

export function SavedPlansManager({ onBack }: SavedPlansManagerProps) {
  const [allPlans, setAllPlans] = useState<PlanWithContext[]>([])
  const [selectedPlans, setSelectedPlans] = useState<Set<string>>(new Set())
  const [isExporting, setIsExporting] = useState(false)

  const lessonScriptPlans = useKV<SavedPlan[]>('lesson-script-plans', [])
  const choose3EbpsPlans = useKV<SavedPlan[]>('choose-3-ebps-plans', [])
  const sensoryChecklistPlans = useKV<SavedPlan[]>('sensory-checklist-plans', [])
  const behaviorCommunicationPlans = useKV<SavedPlan[]>('behavior-communication-plans', [])
  const coRegulationPlans = useKV<SavedPlan[]>('co-regulation-plans', [])
  const transitionSupportPlans = useKV<SavedPlan[]>('transition-support-plans', [])
  const parentEbpAssessmentPlans = useKV<SavedPlan[]>('parent-ebp-assessment-plans', [])
  const schoolPlannerPlans = useKV<SavedPlan[]>('school-planner-plans', [])
  const studentInputPlans = useKV<SavedPlan[]>('student-input-plans', [])
  const visualSupportsPlans = useKV<SavedPlan[]>('visual-supports-plans', [])
  const socialNarrativePlans = useKV<SavedPlan[]>('social-narrative-plans', [])
  const taskAnalysisPlans = useKV<SavedPlan[]>('task-analysis-plans', [])
  const fctPlans = useKV<SavedPlan[]>('fct-plans', [])
  const reinforcementMenuPlans = useKV<SavedPlan[]>('reinforcement-menu-plans', [])
  const promptingHierarchyPlans = useKV<SavedPlan[]>('prompting-hierarchy-plans', [])
  const selfManagementPlans = useKV<SavedPlan[]>('self-management-plans', [])
  const structuredWorkPlans = useKV<SavedPlan[]>('structured-work-plans', [])
  const peerMediationPlans = useKV<SavedPlan[]>('peer-mediation-plans', [])
  const parentTrainingPlans = useKV<SavedPlan[]>('parent-training-plans', [])
  const socialSkillsPlans = useKV<SavedPlan[]>('social-skills-plans', [])
  const videoModelingPlans = useKV<SavedPlan[]>('video-modeling-plans', [])
  const aacImplementationPlans = useKV<SavedPlan[]>('aac-implementation-plans', [])
  const antecedentModificationPlans = useKV<SavedPlan[]>('antecedent-modification-plans', [])
  const cbtActivityPlans = useKV<SavedPlan[]>('cbt-activity-plans', [])
  const exerciseMovementPlans = useKV<SavedPlan[]>('exercise-movement-plans', [])
  const musicInterventionPlans = useKV<SavedPlan[]>('music-intervention-plans', [])
  const technologyIntegrationPlans = useKV<SavedPlan[]>('technology-integration-plans', [])
  const dttSessionPlans = useKV<SavedPlan[]>('dtt-session-plans', [])
  const naturalisticTeachingPlans = useKV<SavedPlan[]>('naturalistic-teaching-plans', [])

  const planStores = [
    { key: 'lesson-script-plans', name: 'Lesson Script', hook: lessonScriptPlans },
    { key: 'choose-3-ebps-plans', name: 'Choose 3 EBPs', hook: choose3EbpsPlans },
    { key: 'sensory-checklist-plans', name: 'Sensory Checklist', hook: sensoryChecklistPlans },
    { key: 'behavior-communication-plans', name: 'Behavior Communication', hook: behaviorCommunicationPlans },
    { key: 'co-regulation-plans', name: 'Co-Regulation', hook: coRegulationPlans },
    { key: 'transition-support-plans', name: 'Transition Support', hook: transitionSupportPlans },
    { key: 'parent-ebp-assessment-plans', name: 'Parent EBP Assessment', hook: parentEbpAssessmentPlans },
    { key: 'school-planner-plans', name: 'School Planner', hook: schoolPlannerPlans },
    { key: 'student-input-plans', name: 'Student Input', hook: studentInputPlans },
    { key: 'visual-supports-plans', name: 'Visual Supports', hook: visualSupportsPlans },
    { key: 'social-narrative-plans', name: 'Social Narrative', hook: socialNarrativePlans },
    { key: 'task-analysis-plans', name: 'Task Analysis', hook: taskAnalysisPlans },
    { key: 'fct-plans', name: 'FCT', hook: fctPlans },
    { key: 'reinforcement-menu-plans', name: 'Reinforcement Menu', hook: reinforcementMenuPlans },
    { key: 'prompting-hierarchy-plans', name: 'Prompting Hierarchy', hook: promptingHierarchyPlans },
    { key: 'self-management-plans', name: 'Self-Management', hook: selfManagementPlans },
    { key: 'structured-work-plans', name: 'Structured Work', hook: structuredWorkPlans },
    { key: 'peer-mediation-plans', name: 'Peer Mediation', hook: peerMediationPlans },
    { key: 'parent-training-plans', name: 'Parent Training', hook: parentTrainingPlans },
    { key: 'social-skills-plans', name: 'Social Skills', hook: socialSkillsPlans },
    { key: 'video-modeling-plans', name: 'Video Modeling', hook: videoModelingPlans },
    { key: 'aac-implementation-plans', name: 'AAC Implementation', hook: aacImplementationPlans },
    { key: 'antecedent-modification-plans', name: 'Antecedent Modification', hook: antecedentModificationPlans },
    { key: 'cbt-activity-plans', name: 'CBT Activity', hook: cbtActivityPlans },
    { key: 'exercise-movement-plans', name: 'Exercise Movement', hook: exerciseMovementPlans },
    { key: 'music-intervention-plans', name: 'Music Intervention', hook: musicInterventionPlans },
    { key: 'technology-integration-plans', name: 'Technology Integration', hook: technologyIntegrationPlans },
    { key: 'dtt-session-plans', name: 'DTT Session', hook: dttSessionPlans },
    { key: 'naturalistic-teaching-plans', name: 'Naturalistic Teaching', hook: naturalisticTeachingPlans },
  ]

  useEffect(() => {
    const plans: PlanWithContext[] = []
    
    planStores.forEach(({ key, name, hook }) => {
      const [savedPlans] = hook
      if (savedPlans && savedPlans.length > 0) {
        savedPlans.forEach(plan => {
          plans.push({
            plan,
            toolName: name,
            storageKey: key
          })
        })
      }
    })

    plans.sort((a, b) => 
      new Date(b.plan.createdAt).getTime() - new Date(a.plan.createdAt).getTime()
    )

    setAllPlans(plans)
  }, [
    lessonScriptPlans[0],
    choose3EbpsPlans[0],
    sensoryChecklistPlans[0],
    behaviorCommunicationPlans[0],
    coRegulationPlans[0],
    transitionSupportPlans[0],
    parentEbpAssessmentPlans[0],
    schoolPlannerPlans[0],
    studentInputPlans[0],
    visualSupportsPlans[0],
    socialNarrativePlans[0],
    taskAnalysisPlans[0],
    fctPlans[0],
    reinforcementMenuPlans[0],
    promptingHierarchyPlans[0],
    selfManagementPlans[0],
    structuredWorkPlans[0],
    peerMediationPlans[0],
    parentTrainingPlans[0],
    socialSkillsPlans[0],
    videoModelingPlans[0],
    aacImplementationPlans[0],
    antecedentModificationPlans[0],
    cbtActivityPlans[0],
    exerciseMovementPlans[0],
    musicInterventionPlans[0],
    technologyIntegrationPlans[0],
    dttSessionPlans[0],
    naturalisticTeachingPlans[0],
  ])

  const togglePlanSelection = (planId: string) => {
    setSelectedPlans(current => {
      const newSet = new Set(current)
      if (newSet.has(planId)) {
        newSet.delete(planId)
      } else {
        newSet.add(planId)
      }
      return newSet
    })
  }

  const selectAll = () => {
    setSelectedPlans(new Set(allPlans.map(p => p.plan.id)))
  }

  const deselectAll = () => {
    setSelectedPlans(new Set())
  }

  const deletePlan = (planWithContext: PlanWithContext) => {
    const storeData = planStores.find(s => s.key === planWithContext.storageKey)
    if (!storeData) return

    const [, setPlans] = storeData.hook
    setPlans((current) => (current || []).filter(p => p.id !== planWithContext.plan.id))
    
    setSelectedPlans(current => {
      const newSet = new Set(current)
      newSet.delete(planWithContext.plan.id)
      return newSet
    })

    toast.success('Plan deleted')
  }

  const exportToPDF = async () => {
    if (selectedPlans.size === 0) {
      toast.error('Please select at least one plan to export')
      return
    }

    setIsExporting(true)

    try {
      const selectedPlanData = allPlans.filter(p => selectedPlans.has(p.plan.id))
      
      const printWindow = window.open('', '_blank')
      if (!printWindow) {
        toast.error('Please allow pop-ups to export PDF')
        return
      }

      let htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Combined Plans Export - Autism and Me</title>
            <style>
              body {
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                line-height: 1.6;
                max-width: 800px;
                margin: 40px auto;
                padding: 20px;
                color: #1a1a1a;
              }
              h1 {
                font-family: 'Merriweather', Georgia, serif;
                font-size: 28px;
                margin-bottom: 10px;
                border-bottom: 3px solid #333;
                padding-bottom: 15px;
              }
              h2 {
                font-family: 'Merriweather', Georgia, serif;
                font-size: 22px;
                margin-top: 40px;
                margin-bottom: 15px;
                color: #333;
                border-bottom: 2px solid #666;
                padding-bottom: 10px;
              }
              h3 {
                font-family: 'Inter', sans-serif;
                font-size: 16px;
                font-weight: 600;
                margin-top: 20px;
                margin-bottom: 8px;
                color: #555;
              }
              .plan-section {
                margin-bottom: 50px;
                page-break-inside: avoid;
              }
              .plan-header {
                background: #f5f5f5;
                padding: 15px;
                border-left: 4px solid oklch(0.65 0.18 55);
                margin-bottom: 20px;
              }
              .tool-name {
                font-weight: 600;
                color: oklch(0.55 0.15 150);
                font-size: 14px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
              }
              .plan-date {
                font-size: 14px;
                color: #666;
                margin-top: 5px;
              }
              .input-section {
                margin-bottom: 15px;
              }
              .input-label {
                font-weight: 600;
                color: #666;
                font-size: 14px;
                margin-bottom: 5px;
              }
              .input-value {
                color: #333;
                margin-bottom: 10px;
              }
              .generated-content {
                background: #fafafa;
                padding: 20px;
                border: 1px solid #e0e0e0;
                border-radius: 4px;
                white-space: pre-wrap;
                word-wrap: break-word;
              }
              .export-footer {
                margin-top: 60px;
                padding-top: 20px;
                border-top: 1px solid #ddd;
                font-size: 12px;
                color: #888;
                text-align: center;
              }
              @media print {
                body { 
                  margin: 0; 
                  padding: 20px;
                }
                .plan-section {
                  page-break-after: always;
                }
                .plan-section:last-child {
                  page-break-after: auto;
                }
              }
            </style>
          </head>
          <body>
            <h1>Combined Plans Export</h1>
            <p style="color: #666; margin-bottom: 30px;">
              Exported on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}
              <br>
              Total plans: ${selectedPlanData.length}
            </p>
      `

      selectedPlanData.forEach((planData, index) => {
        const { plan, toolName } = planData
        const planTitle = Object.values(plan.inputs)[0] || 'Plan'

        htmlContent += `
          <div class="plan-section">
            <div class="plan-header">
              <div class="tool-name">${toolName}</div>
              <h2 style="margin: 5px 0;">${planTitle}</h2>
              <div class="plan-date">Created: ${new Date(plan.createdAt).toLocaleDateString()} at ${new Date(plan.createdAt).toLocaleTimeString()}</div>
            </div>
        `

        const inputEntries = Object.entries(plan.inputs).filter(([_, value]) => value)
        if (inputEntries.length > 0) {
          htmlContent += '<div class="input-section">'
          inputEntries.forEach(([key, value]) => {
            htmlContent += `
              <div style="margin-bottom: 15px;">
                <div class="input-label">${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</div>
                <div class="input-value">${value}</div>
              </div>
            `
          })
          htmlContent += '</div>'
        }

        htmlContent += `
            <h3>Generated Plan</h3>
            <div class="generated-content">${plan.generatedContent}</div>
          </div>
        `
      })

      htmlContent += `
            <div class="export-footer">
              <p>Generated by Autism and Me - Evidence Based Practice for Autism Support</p>
              <p>A Universal Learning Toolkit with Evidence Based Practices for Schools</p>
            </div>
          </body>
        </html>
      `

      printWindow.document.write(htmlContent)
      printWindow.document.close()
      printWindow.focus()

      setTimeout(() => {
        printWindow.print()
        toast.success('Opening print dialog...')
      }, 250)
    } catch (error) {
      toast.error('Failed to export plans')
      console.error(error)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
      </div>

      <div>
        <h2 className="text-foreground mb-2">Saved Plans Manager</h2>
        <p className="text-muted-foreground">
          View, manage, and export all your saved plans from across all tools. Select multiple plans to export them as a combined PDF.
        </p>
      </div>

      {allPlans.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground mb-4">
            No saved plans yet. Create plans using any of the tools to see them here.
          </p>
        </Card>
      ) : (
        <>
          <Card className="bg-accent/5">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <p className="font-semibold text-foreground">
                    {selectedPlans.size} of {allPlans.length} plans selected
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Select plans to export them as a combined PDF
                  </p>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={selectAll}
                    disabled={selectedPlans.size === allPlans.length}
                  >
                    Select All
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={deselectAll}
                    disabled={selectedPlans.size === 0}
                  >
                    Deselect All
                  </Button>
                  <Button
                    onClick={exportToPDF}
                    disabled={selectedPlans.size === 0 || isExporting}
                    className="gap-2"
                  >
                    <FilePdf className="w-4 h-4" />
                    {isExporting ? 'Exporting...' : 'Export Selected as PDF'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Alert>
            <AlertDescription>
              Tip: Use the print dialog's "Save as PDF" option to save the combined document to your device.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            {allPlans.map((planWithContext) => {
              const { plan, toolName } = planWithContext
              const isSelected = selectedPlans.has(plan.id)
              const planTitle = Object.values(plan.inputs)[0] || 'Untitled Plan'

              return (
                <Card 
                  key={`${planWithContext.storageKey}-${plan.id}`}
                  className={`transition-colors ${isSelected ? 'border-accent border-2 bg-accent/5' : ''}`}
                >
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id={`plan-${plan.id}`}
                        checked={isSelected}
                        onCheckedChange={() => togglePlanSelection(plan.id)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary">{toolName}</Badge>
                          <span className="text-xs text-muted-foreground">
                            {new Date(plan.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <CardTitle className="text-lg">{planTitle}</CardTitle>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deletePlan(planWithContext)}
                      >
                        <Trash className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {Object.entries(plan.inputs).filter(([_, value]) => value).slice(0, 2).map(([key, value]) => (
                        <div key={key}>
                          <h4 className="text-xs font-semibold text-muted-foreground mb-1">
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:
                          </h4>
                          <p className="text-sm text-foreground line-clamp-2">{value}</p>
                        </div>
                      ))}
                      <div>
                        <h4 className="text-xs font-semibold text-muted-foreground mb-1">Generated Content Preview:</h4>
                        <p className="text-sm text-foreground line-clamp-3 whitespace-pre-wrap">
                          {plan.generatedContent}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
