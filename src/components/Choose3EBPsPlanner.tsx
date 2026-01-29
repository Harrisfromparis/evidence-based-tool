import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, ArrowRight, Check, Download, FloppyDisk, Info, EnvelopeSimple, Printer } from '@phosphor-icons/react'
import { useKV } from '@github/spark/hooks'
import { toast } from 'sonner'
import { ebps } from '@/lib/data'
import { openEmailClient } from '@/lib/email-export'
import { openPrintPreview, type PrintSection } from '@/lib/print-export'

interface Choose3EBPsPlannerProps {
  onBack: () => void
}

interface EBPPlan {
  id: string
  timestamp: number
  studentName: string
  studentAge: string
  setting: string
  currentChallenges: string
  supportGoals: string
  focusAreas: string[]
  selectedEBPs: string[]
  implementationWho: string
  implementationWhen: string
  implementationHow: string
  successMeasures: string
  reviewSchedule: string
}

const FOCUS_AREAS = [
  {
    id: 'communication',
    label: 'Communication & Language',
    description: 'Supporting expression, understanding, or interaction'
  },
  {
    id: 'social',
    label: 'Social Engagement',
    description: 'Building peer relationships, social understanding'
  },
  {
    id: 'organization',
    label: 'Organization & Independence',
    description: 'Task completion, self-management, routines'
  },
  {
    id: 'regulation',
    label: 'Emotional & Sensory Regulation',
    description: 'Managing emotions, sensory needs, co-regulation'
  },
  {
    id: 'environment',
    label: 'Environment & Structure',
    description: 'Physical space, predictability, reducing demands'
  },
  {
    id: 'transitions',
    label: 'Transitions & Change',
    description: 'Moving between activities, classes, or settings'
  }
]

const CATEGORY_EBP_MAP: Record<string, string[]> = {
  communication: ['visual-supports', 'social-narratives', 'naturalistic-intervention', 'augmentative-alternative-communication'],
  social: ['peer-mediated-instruction', 'naturalistic-intervention', 'social-narratives', 'social-skills-training'],
  organization: ['structured-work-systems', 'visual-supports', 'self-management', 'task-analysis'],
  regulation: ['antecedent-based-intervention', 'self-management', 'visual-supports', 'reinforcement'],
  environment: ['antecedent-based-intervention', 'visual-supports', 'structured-work-systems'],
  transitions: ['visual-supports', 'social-narratives', 'structured-work-systems', 'peer-mediated-instruction']
}

export function Choose3EBPsPlanner({ onBack }: Choose3EBPsPlannerProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [savedPlans, setSavedPlans] = useKV<EBPPlan[]>('ebp-plans', [])
  
  const [studentName, setStudentName] = useState('')
  const [studentAge, setStudentAge] = useState('')
  const [setting, setSetting] = useState('')
  const [currentChallenges, setCurrentChallenges] = useState('')
  const [supportGoals, setSupportGoals] = useState('')
  
  const [focusAreas, setFocusAreas] = useState<string[]>([])
  
  const [selectedEBPs, setSelectedEBPs] = useState<string[]>([])
  
  const [implementationWho, setImplementationWho] = useState('')
  const [implementationWhen, setImplementationWhen] = useState('')
  const [implementationHow, setImplementationHow] = useState('')
  const [successMeasures, setSuccessMeasures] = useState('')
  const [reviewSchedule, setReviewSchedule] = useState('')

  const [showSaved, setShowSaved] = useState(false)

  const toggleFocusArea = (areaId: string) => {
    setFocusAreas(prev => 
      prev.includes(areaId) 
        ? prev.filter(a => a !== areaId)
        : [...prev, areaId]
    )
  }

  const toggleEBP = (ebpId: string) => {
    if (selectedEBPs.includes(ebpId)) {
      setSelectedEBPs(prev => prev.filter(id => id !== ebpId))
    } else {
      if (selectedEBPs.length >= 3) {
        toast.error('You can select a maximum of 3 EBPs')
        return
      }
      setSelectedEBPs(prev => [...prev, ebpId])
    }
  }

  const getSuggestedEBPs = () => {
    const suggested = new Set<string>()
    focusAreas.forEach(area => {
      const ebpIds = CATEGORY_EBP_MAP[area] || []
      ebpIds.forEach(id => suggested.add(id))
    })
    return Array.from(suggested)
  }

  const canProgressStep1 = studentName && studentAge && setting && currentChallenges && supportGoals
  const canProgressStep2 = focusAreas.length > 0
  const canProgressStep3 = selectedEBPs.length === 3
  const canProgressStep4 = implementationWho && implementationWhen && implementationHow && successMeasures && reviewSchedule

  const savePlan = () => {
    const newPlan: EBPPlan = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      studentName,
      studentAge,
      setting,
      currentChallenges,
      supportGoals,
      focusAreas,
      selectedEBPs,
      implementationWho,
      implementationWhen,
      implementationHow,
      successMeasures,
      reviewSchedule
    }
    
    setSavedPlans(prev => [newPlan, ...(prev || [])])
    toast.success('EBP plan saved successfully')
  }

  const generatePlanText = () => {
    const selectedEBPDetails = selectedEBPs.map(id => ebps.find(e => e.id === id)).filter(Boolean)
    
    return `CHOOSE 3 EBPs IMPLEMENTATION PLAN
Generated: ${new Date().toLocaleDateString('en-IE')}

=== STUDENT & CONTEXT ===
Student: ${studentName}
Age: ${studentAge}
Setting: ${setting}

Current Challenges:
${currentChallenges}

Support Goals:
${supportGoals}

=== FOCUS AREAS ===
${focusAreas.map(id => {
  const area = FOCUS_AREAS.find(a => a.id === id)
  return `• ${area?.label}`
}).join('\n')}

=== SELECTED EBPs ===
${selectedEBPDetails.map((ebp, idx) => `
${idx + 1}. ${ebp?.title}
   Category: ${ebp?.category}
   Description: ${ebp?.description}
   
   When to Use: ${ebp?.whenToUse}
   
   Quick Start Steps:
${ebp?.quickStart.map(step => `   • ${step}`).join('\n')}

`).join('\n')}

=== IMPLEMENTATION PLAN ===
Who will implement: ${implementationWho}

When we will start: ${implementationWhen}

How we will approach it: ${implementationHow}

=== MONITORING & REVIEW ===
Success Measures:
${successMeasures}

Review Schedule:
${reviewSchedule}
`
  }

  const exportPlan = () => {
    const planText = generatePlanText()
    const blob = new Blob([planText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ebp-plan-${Date.now()}.txt`
    a.click()
    URL.revokeObjectURL(url)
    toast.success('Plan exported successfully')
  }

  const emailPlan = () => {
    const planText = generatePlanText()
    const subject = `Choose 3 EBPs Implementation Plan: ${studentName}`
    openEmailClient(subject, planText)
    toast.success('Opening email client...')
  }

  const printPlan = () => {
    const selectedFocusDetails = focusAreas.map(id => {
      const area = FOCUS_AREAS.find(a => a.id === id)
      return area ? `<span class="badge">${area.label}</span>` : ''
    }).join(' ')

    const selectedEBPDetails = selectedEBPs.map(id => {
      const ebp = ebps.find(e => e.id === id)
      return ebp ? `<div class="list-item">
        <div class="list-item-title">${ebp.title}</div>
        <div class="list-item-content">${ebp.description}</div>
      </div>` : ''
    }).join('')

    const sections: PrintSection[] = [
      {
        title: 'Student Information',
        content: [
          { label: 'Student Name', value: studentName },
          { label: 'Age', value: studentAge || 'Not specified' },
          { label: 'Setting', value: setting || 'Not specified' },
          { label: 'Plan Date', value: new Date().toLocaleDateString('en-IE', { day: 'numeric', month: 'long', year: 'numeric' }) }
        ]
      },
      {
        title: 'Current Context',
        content: `
          <h3>Current Challenges</h3>
          <div class="list-item">${currentChallenges.replace(/\n/g, '<br>')}</div>
          <h3>Support Goals</h3>
          <div class="list-item">${supportGoals.replace(/\n/g, '<br>')}</div>
        `
      },
      {
        title: 'Focus Areas',
        content: selectedFocusDetails || '<em>No focus areas selected</em>'
      },
      {
        title: 'Selected Evidence-Based Practices',
        content: selectedEBPDetails || '<em>No EBPs selected</em>'
      },
      {
        title: 'Implementation Plan',
        content: `
          <h3>Who Will Implement?</h3>
          <div class="list-item">${implementationWho.replace(/\n/g, '<br>')}</div>
          <h3>When?</h3>
          <div class="list-item">${implementationWhen.replace(/\n/g, '<br>')}</div>
          <h3>How?</h3>
          <div class="list-item">${implementationHow.replace(/\n/g, '<br>')}</div>
        `
      },
      {
        title: 'Success Measures',
        content: successMeasures
      },
      {
        title: 'Review Schedule',
        content: reviewSchedule
      }
    ]

    openPrintPreview({
      title: 'Choose 3 EBPs Implementation Plan',
      subtitle: `${studentName} • ${new Date().toLocaleDateString('en-IE')}`,
      sections,
      footer: 'Irish EBP Navigator • EBP Implementation Planning Tool'
    })
    toast.success('Opening print preview...')
  }

  const resetForm = () => {
    setCurrentStep(1)
    setStudentName('')
    setStudentAge('')
    setSetting('')
    setCurrentChallenges('')
    setSupportGoals('')
    setFocusAreas([])
    setSelectedEBPs([])
    setImplementationWho('')
    setImplementationWhen('')
    setImplementationHow('')
    setSuccessMeasures('')
    setReviewSchedule('')
  }

  const loadPlan = (plan: EBPPlan) => {
    setStudentName(plan.studentName)
    setStudentAge(plan.studentAge)
    setSetting(plan.setting)
    setCurrentChallenges(plan.currentChallenges)
    setSupportGoals(plan.supportGoals)
    setFocusAreas(plan.focusAreas)
    setSelectedEBPs(plan.selectedEBPs)
    setImplementationWho(plan.implementationWho)
    setImplementationWhen(plan.implementationWhen)
    setImplementationHow(plan.implementationHow)
    setSuccessMeasures(plan.successMeasures)
    setReviewSchedule(plan.reviewSchedule)
    setCurrentStep(1)
    setShowSaved(false)
    toast.success('Plan loaded')
  }

  const deletePlan = (id: string) => {
    setSavedPlans(prev => (prev || []).filter(p => p.id !== id))
    toast.success('Plan deleted')
  }

  if (showSaved) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setShowSaved(false)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Planner
          </Button>
          <div className="flex-1">
            <h2 className="text-foreground">Saved EBP Plans</h2>
            <p className="text-sm text-muted-foreground mt-1">
              View and manage your saved implementation plans
            </p>
          </div>
        </div>

        {!savedPlans || savedPlans.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground text-center">
                No saved plans yet. Create a plan to save it for future reference.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {savedPlans.map(plan => (
              <Card key={plan.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{plan.studentName}</CardTitle>
                      <CardDescription>
                        {plan.studentAge} • {plan.setting} • {new Date(plan.timestamp).toLocaleDateString('en-IE')}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => loadPlan(plan)}>
                        View
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => deletePlan(plan.id)}>
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground space-y-2">
                    <div>
                      <strong className="text-foreground">Selected EBPs:</strong>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {plan.selectedEBPs.map(ebpId => {
                          const ebp = ebps.find(e => e.id === ebpId)
                          return ebp ? (
                            <Badge key={ebpId} variant="secondary">{ebp.title}</Badge>
                          ) : null
                        })}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    )
  }

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
            Step-by-step guide to selecting three evidence-based practices
          </p>
        </div>
        {savedPlans && savedPlans.length > 0 && (
          <Button variant="outline" onClick={() => setShowSaved(true)}>
            View Saved Plans ({savedPlans.length})
          </Button>
        )}
      </div>

      <Card className="bg-muted">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4].map(step => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${
                  currentStep === step ? 'bg-accent text-accent-foreground' :
                  currentStep > step ? 'bg-primary text-primary-foreground' :
                  'bg-muted-foreground/20 text-muted-foreground'
                }`}>
                  {currentStep > step ? <Check /> : step}
                </div>
                {step < 4 && (
                  <div className={`w-12 h-0.5 mx-2 ${
                    currentStep > step ? 'bg-primary' : 'bg-muted-foreground/20'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <p className="text-sm text-foreground text-center">
            Step {currentStep} of 4
          </p>
        </CardContent>
      </Card>

      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Step 1: Define Student & Context</CardTitle>
            <CardDescription>
              Describe who you are planning for and what you hope to support
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="student-name">Student Name / Identifier</Label>
              <Input
                id="student-name"
                placeholder="e.g., Sarah, Student A, 3rd class student"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="student-age">Age / Year Group</Label>
              <Input
                id="student-age"
                placeholder="e.g., 9 years old, 4th class, 2nd year"
                value={studentAge}
                onChange={(e) => setStudentAge(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="setting">Setting</Label>
              <Input
                id="setting"
                placeholder="e.g., Mainstream class with SET support, ASD unit, Resource room"
                value={setting}
                onChange={(e) => setSetting(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="current-challenges">Current Challenges</Label>
              <Textarea
                id="current-challenges"
                placeholder="What difficulties or barriers is the student experiencing? Be specific about contexts and patterns."
                value={currentChallenges}
                onChange={(e) => setCurrentChallenges(e.target.value)}
                rows={4}
              />
              <p className="text-xs text-muted-foreground">
                Example: "Has difficulty following multi-step instructions, especially during transitions. Often appears overwhelmed during unstructured times."
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="support-goals">Support Goals</Label>
              <Textarea
                id="support-goals"
                placeholder="What do you hope to achieve with EBP support? What would success look like?"
                value={supportGoals}
                onChange={(e) => setSupportGoals(e.target.value)}
                rows={4}
              />
              <p className="text-xs text-muted-foreground">
                Example: "Increase independence in following classroom routines. Reduce anxiety during transitions. Build confidence in asking for help."
              </p>
            </div>

            <div className="flex justify-end">
              <Button onClick={() => setCurrentStep(2)} disabled={!canProgressStep1}>
                Next Step
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Step 2: Identify Focus Areas</CardTitle>
            <CardDescription>
              Select the primary areas where support is needed (select all that apply)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              {FOCUS_AREAS.map(area => (
                <div key={area.id} className="flex items-start space-x-3 p-4 border rounded hover:bg-accent/5 transition-colors">
                  <Checkbox
                    id={area.id}
                    checked={focusAreas.includes(area.id)}
                    onCheckedChange={() => toggleFocusArea(area.id)}
                  />
                  <div className="flex-1">
                    <Label htmlFor={area.id} className="font-semibold cursor-pointer text-base">
                      {area.label}
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">{area.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Card className="bg-accent/5 border-accent/20">
              <CardContent className="pt-6 flex items-start gap-3">
                <Info className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  Selecting multiple areas will provide a broader range of suggested EBPs. You'll narrow down to three specific practices in the next step.
                </p>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(1)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              <Button onClick={() => setCurrentStep(3)} disabled={!canProgressStep2}>
                Next Step
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Step 3: Select Your 3 EBPs</CardTitle>
            <CardDescription>
              Based on your focus areas, these EBPs are suggested. Choose exactly 3 that feel most appropriate and achievable.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-accent/10 border border-accent/20">
              <p className="text-sm font-medium">
                Selected: {selectedEBPs.length} / 3 EBPs
              </p>
              {selectedEBPs.length === 3 && (
                <Badge variant="default" className="bg-accent text-accent-foreground">
                  <Check className="w-3 h-3 mr-1" />
                  Complete
                </Badge>
              )}
            </div>

            <div className="space-y-4">
              {getSuggestedEBPs().map(ebpId => {
                const ebp = ebps.find(e => e.id === ebpId)
                if (!ebp) return null
                
                const isSelected = selectedEBPs.includes(ebpId)
                
                return (
                  <Card 
                    key={ebpId} 
                    className={`cursor-pointer transition-all ${
                      isSelected 
                        ? 'border-2 border-accent bg-accent/5' 
                        : 'border-2 hover:border-accent/50'
                    }`}
                    onClick={() => toggleEBP(ebpId)}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Checkbox checked={isSelected} />
                            <CardTitle className="text-lg">{ebp.title}</CardTitle>
                            <Badge variant="outline">{ebp.category}</Badge>
                          </div>
                          <CardDescription className="text-base">
                            {ebp.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <p className="text-muted-foreground">
                          <strong className="text-foreground">When to use:</strong> {ebp.whenToUse}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {getSuggestedEBPs().length === 0 && (
              <Card className="bg-muted">
                <CardContent className="pt-6">
                  <p className="text-muted-foreground text-center">
                    Please select focus areas in the previous step to see suggested EBPs.
                  </p>
                </CardContent>
              </Card>
            )}

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(2)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              <Button onClick={() => setCurrentStep(4)} disabled={!canProgressStep3}>
                Next Step
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === 4 && (
        <Card>
          <CardHeader>
            <CardTitle>Step 4: Plan Implementation</CardTitle>
            <CardDescription>
              Define how you will implement these EBPs and monitor progress
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Card className="bg-accent/5 border-accent/20">
              <CardHeader>
                <CardTitle className="text-base">Your Selected EBPs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {selectedEBPs.map((ebpId, idx) => {
                    const ebp = ebps.find(e => e.id === ebpId)
                    return ebp ? (
                      <div key={ebpId} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                          {idx + 1}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{ebp.title}</p>
                          <p className="text-sm text-muted-foreground">{ebp.description}</p>
                        </div>
                      </div>
                    ) : null
                  })}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-2">
              <Label htmlFor="implementation-who">Who will implement these practices?</Label>
              <Textarea
                id="implementation-who"
                placeholder="e.g., Classroom teacher (primary), SET (support), SNA (visual supports during transitions)"
                value={implementationWho}
                onChange={(e) => setImplementationWho(e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="implementation-when">When will you start?</Label>
              <Input
                id="implementation-when"
                placeholder="e.g., Beginning of next week, after mid-term break, Monday 3rd March"
                value={implementationWhen}
                onChange={(e) => setImplementationWhen(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="implementation-how">How will you approach implementation?</Label>
              <Textarea
                id="implementation-how"
                placeholder="Describe your approach: Will you introduce all three at once or stagger them? What preparation is needed? How will you explain to the student?"
                value={implementationHow}
                onChange={(e) => setImplementationHow(e.target.value)}
                rows={5}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="success-measures">How will you measure success?</Label>
              <Textarea
                id="success-measures"
                placeholder="What observable changes would indicate these EBPs are working? Be specific and realistic."
                value={successMeasures}
                onChange={(e) => setSuccessMeasures(e.target.value)}
                rows={4}
              />
              <p className="text-xs text-muted-foreground">
                Example: "Student follows visual schedule independently 4 out of 5 times, transitions without adult prompting, reports feeling 'less worried' about changes"
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="review-schedule">Review Schedule</Label>
              <Textarea
                id="review-schedule"
                placeholder="When and how will you review progress? How will you involve the student and family?"
                value={reviewSchedule}
                onChange={(e) => setReviewSchedule(e.target.value)}
                rows={4}
              />
              <p className="text-xs text-muted-foreground">
                Example: "Daily observation for first week, formal team review after 3 weeks, student check-in using simple rating scale every Friday"
              </p>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(3)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" onClick={savePlan} disabled={!canProgressStep4}>
                  <FloppyDisk className="w-4 h-4 mr-2" />
                  Save Plan
                </Button>
                <Button variant="outline" onClick={printPlan} disabled={!canProgressStep4}>
                  <Printer className="w-4 h-4 mr-2" />
                  Print
                </Button>
                <Button variant="outline" onClick={emailPlan} disabled={!canProgressStep4}>
                  <EnvelopeSimple className="w-4 h-4 mr-2" />
                  Email Plan
                </Button>
                <Button onClick={exportPlan} disabled={!canProgressStep4}>
                  <Download className="w-4 h-4 mr-2" />
                  Export Plan
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === 4 && canProgressStep4 && (
        <Card className="bg-accent/5 border-accent">
          <CardHeader>
            <CardTitle>Plan Complete</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Your EBP implementation plan is complete. You can save it to access later, or export it to share with your team and family.
            </p>
            <Button onClick={resetForm} variant="outline" className="w-full">
              Create Another Plan
            </Button>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Why Choose 3 EBPs?</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground space-y-3 text-sm">
          <p>
            <strong className="text-foreground">Focused Implementation:</strong> Three practices allow for depth rather than superficial breadth. You can learn each practice properly and implement with fidelity.
          </p>
          <p>
            <strong className="text-foreground">Manageable Scope:</strong> Trying too many practices at once leads to overwhelm and inconsistent use. Three is achievable within typical resource constraints.
          </p>
          <p>
            <strong className="text-foreground">Complementary Approaches:</strong> Three EBPs can work together synergistically (e.g., Visual Supports + Social Narratives + Peer-Mediated Instruction for social inclusion).
          </p>
          <p>
            <strong className="text-foreground">Evaluation Clarity:</strong> With three practices, you can identify which strategies are working and which need adjustment.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Implementation Principles</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• <strong className="text-foreground">Student-centered:</strong> All decisions begin with the student's needs and context</p>
          <p>• <strong className="text-foreground">Evidence-guided:</strong> Suggestions based on research-practice alignment</p>
          <p>• <strong className="text-foreground">Collaborative:</strong> Designed for team discussion, not individual decision-making</p>
          <p>• <strong className="text-foreground">Flexible:</strong> EBPs should be adapted to student and context, not rigidly scripted</p>
          <p>• <strong className="text-foreground">Monitored:</strong> Regular review ensures practices are helpful and adjusted as needed</p>
          <p>• <strong className="text-foreground">Additive, not exclusive:</strong> These 3 EBPs complement other supports already in place</p>
        </CardContent>
      </Card>
    </div>
  )
}
