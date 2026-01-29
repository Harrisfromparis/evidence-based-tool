import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ArrowLeft, ArrowRight, Check, Download, FloppyDisk } from '@phosphor-icons/react'
import { useKV } from '@github/spark/hooks'
import { toast } from 'sonner'

interface TransitionSupportBuilderProps {
  onBack: () => void
}

interface TransitionPlan {
  id: string
  timestamp: number
  transitionType: string
  what: string
  when: string
  where: string
  who: string
  stressPoints: string[]
  customStressPoint: string
  supports: string[]
  customSupport: string
  studentCommunication: string
  familyCommunication: string
  receivingStaffInfo: string
  reviewSchedule: string
  reviewPerson: string
  successSigns: string
  adjustmentSigns: string
  studentVoiceMethod: string
}

const STRESS_POINTS = [
  'Unpredictability or change in routine',
  'Sensory challenges (noise, crowds, lighting)',
  'Social demands (new people, peer interactions)',
  'Loss of control or autonomy',
  'Academic or task demands',
  'Physical environment changes'
]

const SUPPORT_OPTIONS = [
  'Visual supports: Schedules, maps, timelines, photo sequences',
  'Rehearsal: Practice visits, walk-throughs, role-play',
  'Social narratives: Stories describing what to expect',
  'Co-regulation strategies: Adult support, safe person, break options',
  'Timing adjustments: Early arrival, extended time, staggered transitions',
  'Peer support: Buddy system, familiar peer accompaniment',
  'Communication tools: "Help" card, choice board, exit strategy'
]

export function TransitionSupportBuilder({ onBack }: TransitionSupportBuilderProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [savedPlans, setSavedPlans] = useKV<TransitionPlan[]>('transition-plans', [])
  
  const [transitionType, setTransitionType] = useState('')
  const [what, setWhat] = useState('')
  const [when, setWhen] = useState('')
  const [where, setWhere] = useState('')
  const [who, setWho] = useState('')
  
  const [stressPoints, setStressPoints] = useState<string[]>([])
  const [customStressPoint, setCustomStressPoint] = useState('')
  
  const [supports, setSupports] = useState<string[]>([])
  const [customSupport, setCustomSupport] = useState('')
  
  const [studentCommunication, setStudentCommunication] = useState('')
  const [familyCommunication, setFamilyCommunication] = useState('')
  const [receivingStaffInfo, setReceivingStaffInfo] = useState('')
  
  const [reviewSchedule, setReviewSchedule] = useState('')
  const [reviewPerson, setReviewPerson] = useState('')
  const [successSigns, setSuccessSigns] = useState('')
  const [adjustmentSigns, setAdjustmentSigns] = useState('')
  const [studentVoiceMethod, setStudentVoiceMethod] = useState('')

  const [showSaved, setShowSaved] = useState(false)

  const toggleStressPoint = (point: string) => {
    setStressPoints(prev => 
      prev.includes(point) 
        ? prev.filter(p => p !== point)
        : [...prev, point]
    )
  }

  const toggleSupport = (support: string) => {
    setSupports(prev => 
      prev.includes(support) 
        ? prev.filter(s => s !== support)
        : [...prev, support]
    )
  }

  const canProgressStep1 = transitionType && what && when && where && who
  const canProgressStep2 = stressPoints.length > 0 || customStressPoint
  const canProgressStep3 = supports.length > 0 || customSupport
  const canProgressStep4 = studentCommunication && familyCommunication
  const canProgressStep5 = reviewSchedule && reviewPerson && successSigns && adjustmentSigns && studentVoiceMethod

  const savePlan = () => {
    const newPlan: TransitionPlan = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      transitionType,
      what,
      when,
      where,
      who,
      stressPoints,
      customStressPoint,
      supports,
      customSupport,
      studentCommunication,
      familyCommunication,
      receivingStaffInfo,
      reviewSchedule,
      reviewPerson,
      successSigns,
      adjustmentSigns,
      studentVoiceMethod
    }
    
    setSavedPlans(prev => [newPlan, ...(prev || [])])
    toast.success('Transition plan saved successfully')
  }

  const exportPlan = () => {
    const planText = `TRANSITION SUPPORT PLAN
Generated: ${new Date().toLocaleDateString('en-IE')}

=== TRANSITION DEFINITION ===
Type: ${transitionType}
What: ${what}
When: ${when}
Where: ${where}
Who: ${who}

=== IDENTIFIED STRESS POINTS ===
${stressPoints.map(p => `• ${p}`).join('\n')}
${customStressPoint ? `• ${customStressPoint}` : ''}

=== CHOSEN SUPPORTS ===
${supports.map(s => `• ${s}`).join('\n')}
${customSupport ? `• ${customSupport}` : ''}

=== COMMUNICATION PLAN ===
With Student: ${studentCommunication}
With Family: ${familyCommunication}
${receivingStaffInfo ? `With Receiving Staff: ${receivingStaffInfo}` : ''}

=== REVIEW & ADJUSTMENT PLAN ===
Review Schedule: ${reviewSchedule}
Monitor Person: ${reviewPerson}
Signs of Success: ${successSigns}
Signs Adjustment Needed: ${adjustmentSigns}
Student Voice Method: ${studentVoiceMethod}
`
    
    const blob = new Blob([planText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `transition-plan-${Date.now()}.txt`
    a.click()
    URL.revokeObjectURL(url)
    toast.success('Plan exported successfully')
  }

  const resetForm = () => {
    setCurrentStep(1)
    setTransitionType('')
    setWhat('')
    setWhen('')
    setWhere('')
    setWho('')
    setStressPoints([])
    setCustomStressPoint('')
    setSupports([])
    setCustomSupport('')
    setStudentCommunication('')
    setFamilyCommunication('')
    setReceivingStaffInfo('')
    setReviewSchedule('')
    setReviewPerson('')
    setSuccessSigns('')
    setAdjustmentSigns('')
    setStudentVoiceMethod('')
  }

  const loadPlan = (plan: TransitionPlan) => {
    setTransitionType(plan.transitionType)
    setWhat(plan.what)
    setWhen(plan.when)
    setWhere(plan.where)
    setWho(plan.who)
    setStressPoints(plan.stressPoints)
    setCustomStressPoint(plan.customStressPoint)
    setSupports(plan.supports)
    setCustomSupport(plan.customSupport)
    setStudentCommunication(plan.studentCommunication)
    setFamilyCommunication(plan.familyCommunication)
    setReceivingStaffInfo(plan.receivingStaffInfo)
    setReviewSchedule(plan.reviewSchedule)
    setReviewPerson(plan.reviewPerson)
    setSuccessSigns(plan.successSigns)
    setAdjustmentSigns(plan.adjustmentSigns)
    setStudentVoiceMethod(plan.studentVoiceMethod)
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
            Back to Builder
          </Button>
          <div className="flex-1">
            <h2 className="text-foreground">Saved Transition Plans</h2>
            <p className="text-sm text-muted-foreground mt-1">
              View and manage your saved transition support plans
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
                      <CardTitle className="text-lg">{plan.what}</CardTitle>
                      <CardDescription>
                        {plan.transitionType} • {new Date(plan.timestamp).toLocaleDateString('en-IE')}
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
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p><strong className="text-foreground">When:</strong> {plan.when}</p>
                    <p><strong className="text-foreground">Where:</strong> {plan.where}</p>
                    <p><strong className="text-foreground">Supports:</strong> {plan.supports.length} selected</p>
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
          <h2 className="text-foreground">Transition Support Builder</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Step-by-step guide to planning successful transitions
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
            {[1, 2, 3, 4, 5].map(step => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${
                  currentStep === step ? 'bg-accent text-accent-foreground' :
                  currentStep > step ? 'bg-primary text-primary-foreground' :
                  'bg-muted-foreground/20 text-muted-foreground'
                }`}>
                  {currentStep > step ? <Check /> : step}
                </div>
                {step < 5 && (
                  <div className={`w-12 h-0.5 mx-2 ${
                    currentStep > step ? 'bg-primary' : 'bg-muted-foreground/20'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <p className="text-sm text-foreground text-center">
            Step {currentStep} of 5
          </p>
        </CardContent>
      </Card>

      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Step 1: Define the Transition</CardTitle>
            <CardDescription>
              Clarify the specific transition being planned
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="transition-type">Transition Type</Label>
              <RadioGroup value={transitionType} onValueChange={setTransitionType}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Activity-to-Activity" id="activity" />
                  <Label htmlFor="activity" className="font-normal cursor-pointer">Activity-to-Activity (e.g., maths to break, desk work to PE)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Class-to-Class" id="class" />
                  <Label htmlFor="class" className="font-normal cursor-pointer">Class-to-Class (e.g., moving between subject rooms)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Grade-to-Grade" id="grade" />
                  <Label htmlFor="grade" className="font-normal cursor-pointer">Grade-to-Grade (e.g., moving to next year within same school)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="School-to-School" id="school" />
                  <Label htmlFor="school" className="font-normal cursor-pointer">School-to-School (e.g., primary to secondary)</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="what">What is the transition?</Label>
              <Input
                id="what"
                placeholder="e.g., Moving from mainstream class to learning support room"
                value={what}
                onChange={(e) => setWhat(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="when">When does it happen?</Label>
              <Input
                id="when"
                placeholder="e.g., Every Tuesday and Thursday at 10:00am, lasts 45 minutes"
                value={when}
                onChange={(e) => setWhen(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="where">Where are the physical locations?</Label>
              <Input
                id="where"
                placeholder="e.g., From Room 12 (upstairs) to Room 3 (ground floor)"
                value={where}
                onChange={(e) => setWhere(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="who">Who is involved?</Label>
              <Textarea
                id="who"
                placeholder="e.g., Student (Aoife, 3rd class), classroom teacher (Ms. Murphy), learning support teacher (Mr. O'Brien), 2-3 peers who also attend support"
                value={who}
                onChange={(e) => setWho(e.target.value)}
                rows={3}
              />
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
            <CardTitle>Step 2: Identify Potential Stress Points</CardTitle>
            <CardDescription>
              Anticipate what might be challenging about this transition
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label>Select all that may apply:</Label>
              {STRESS_POINTS.map(point => (
                <div key={point} className="flex items-start space-x-2">
                  <Checkbox
                    id={point}
                    checked={stressPoints.includes(point)}
                    onCheckedChange={() => toggleStressPoint(point)}
                  />
                  <Label htmlFor={point} className="font-normal cursor-pointer leading-relaxed">
                    {point}
                  </Label>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <Label htmlFor="custom-stress">Other stress points (optional)</Label>
              <Textarea
                id="custom-stress"
                placeholder="Describe any other specific challenges or concerns..."
                value={customStressPoint}
                onChange={(e) => setCustomStressPoint(e.target.value)}
                rows={3}
              />
            </div>

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
            <CardTitle>Step 3: Choose Transition Supports</CardTitle>
            <CardDescription>
              Select appropriate strategies from available options
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label>Select all supports you plan to use:</Label>
              {SUPPORT_OPTIONS.map(support => (
                <div key={support} className="flex items-start space-x-2">
                  <Checkbox
                    id={support}
                    checked={supports.includes(support)}
                    onCheckedChange={() => toggleSupport(support)}
                  />
                  <Label htmlFor={support} className="font-normal cursor-pointer leading-relaxed">
                    {support}
                  </Label>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <Label htmlFor="custom-support">Other supports (optional)</Label>
              <Textarea
                id="custom-support"
                placeholder="Describe any other specific supports you plan to implement..."
                value={customSupport}
                onChange={(e) => setCustomSupport(e.target.value)}
                rows={3}
              />
            </div>

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
            <CardTitle>Step 4: Plan Communication</CardTitle>
            <CardDescription>
              Ensure student and family are informed and involved
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="student-comm">Communication with student</Label>
              <Textarea
                id="student-comm"
                placeholder="How will you explain the transition, seek input, address concerns, and co-create supports with the student?"
                value={studentCommunication}
                onChange={(e) => setStudentCommunication(e.target.value)}
                rows={4}
              />
              <p className="text-xs text-muted-foreground">
                Consider: Explain transition, seek input, address concerns, co-create supports
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="family-comm">Communication with family</Label>
              <Textarea
                id="family-comm"
                placeholder="How will you share the plan, gather home context, align approaches, and establish communication methods with family?"
                value={familyCommunication}
                onChange={(e) => setFamilyCommunication(e.target.value)}
                rows={4}
              />
              <p className="text-xs text-muted-foreground">
                Consider: Share plan, gather home context, align approaches, establish communication method
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="staff-comm">Communication with receiving staff (optional)</Label>
              <Textarea
                id="staff-comm"
                placeholder="If applicable, how will you brief new teachers/adults, share strategies that work, and provide contact information?"
                value={receivingStaffInfo}
                onChange={(e) => setReceivingStaffInfo(e.target.value)}
                rows={3}
              />
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(3)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              <Button onClick={() => setCurrentStep(5)} disabled={!canProgressStep4}>
                Next Step
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === 5 && (
        <Card>
          <CardHeader>
            <CardTitle>Step 5: Set Review & Adjustment Plan</CardTitle>
            <CardDescription>
              Build in opportunities to evaluate and adapt
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="review-schedule">When will you check in?</Label>
              <Input
                id="review-schedule"
                placeholder="e.g., Daily for first week, then weekly for a month"
                value={reviewSchedule}
                onChange={(e) => setReviewSchedule(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="review-person">Who will monitor progress?</Label>
              <Input
                id="review-person"
                placeholder="e.g., Classroom teacher and SEN coordinator"
                value={reviewPerson}
                onChange={(e) => setReviewPerson(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="success-signs">What are signs of success?</Label>
              <Textarea
                id="success-signs"
                placeholder="e.g., Student transitions independently, appears calm, engages in next activity"
                value={successSigns}
                onChange={(e) => setSuccessSigns(e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="adjustment-signs">What are signs that adjustment is needed?</Label>
              <Textarea
                id="adjustment-signs"
                placeholder="e.g., Increased anxiety before transition, refusal to move, difficulty settling in new location"
                value={adjustmentSigns}
                onChange={(e) => setAdjustmentSigns(e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="student-voice">How will student voice be included in review?</Label>
              <Textarea
                id="student-voice"
                placeholder="e.g., Weekly check-in conversation, visual rating scale, written reflection form"
                value={studentVoiceMethod}
                onChange={(e) => setStudentVoiceMethod(e.target.value)}
                rows={3}
              />
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(4)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" onClick={savePlan} disabled={!canProgressStep5}>
                  <FloppyDisk className="w-4 h-4 mr-2" />
                  Save Plan
                </Button>
                <Button onClick={exportPlan} disabled={!canProgressStep5}>
                  <Download className="w-4 h-4 mr-2" />
                  Export Plan
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === 5 && canProgressStep5 && (
        <Card className="bg-accent/5 border-accent">
          <CardHeader>
            <CardTitle>Plan Complete</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Your transition support plan is complete. You can save it to access later, or export it to share with colleagues and family.
            </p>
            <Button onClick={resetForm} variant="outline" className="w-full">
              Create Another Plan
            </Button>
          </CardContent>
        </Card>
      )}

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
