import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { ArrowLeft, ArrowRight, Check, Download, FloppyDisk } from '@phosphor-icons/react'
import { useKV } from '@github/spark/hooks'
import { toast } from 'sonner'

interface CoRegulationStrategiesProps {
  onBack: () => void
}

interface CoRegulationPlan {
  id: string
  timestamp: number
  studentName: string
  situation: string
  triggers: string[]
  customTrigger: string
  environmentStrategies: string[]
  customEnvironment: string
  adultPresenceStrategies: string[]
  customAdultPresence: string
  sensoryStrategies: string[]
  customSensory: string
  predictabilityStrategies: string[]
  customPredictability: string
  languageScripts: string
  successMeasures: string
  implementationNotes: string
  reviewPlan: string
}

const TRIGGERS = [
  'Sensory overload (noise, crowds, lighting)',
  'Unpredictability or change in routine',
  'Social demands or conflicts',
  'Task demands (too difficult, unclear expectations)',
  'Fatigue or hunger',
  'Transition between activities'
]

const ENVIRONMENT_STRATEGIES = [
  'Dim overhead lights, use natural light or desk lamp',
  'Reduce background noise, provide quiet workspace',
  'Provide physical space to move',
  'Create defined personal space boundaries',
  'Reduce visual clutter',
  'Allow access to calm corner or sensory area',
  'Minimize overstimulating displays'
]

const ADULT_PRESENCE_STRATEGIES = [
  'Speak in calm, even tone; avoid urgent voice',
  'Lower body to student level with open posture',
  'Respect personal space; allow student to approach',
  'Maintain calm, neutral facial expression',
  'Regulate yourself first; breathe slowly',
  'Match student energy level downward',
  'Avoid looming, blocking, or intense eye contact'
]

const SENSORY_STRATEGIES = [
  'Heavy work tasks (push/pull activities, wall pushes)',
  'Weighted items (lap pad, vest)',
  'Fidget tools (stress balls, putty, textured items)',
  'Movement breaks (walks, stretching, yoga poses)',
  'Deep pressure (tight hug if requested, hand squeeze)',
  'Rocking chair or therapy ball',
  'Access to water or calming drink'
]

const PREDICTABILITY_STRATEGIES = [
  'Use visual schedules and timelines',
  'Preview upcoming activities',
  'Provide warnings before transitions',
  'Maintain consistent routines',
  'Reduce time pressure; allow processing time',
  'Break tasks into smaller chunks',
  'Offer choices within structure',
  'Build in regular breaks'
]

export function CoRegulationStrategies({ onBack }: CoRegulationStrategiesProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [savedPlans, setSavedPlans] = useKV<CoRegulationPlan[]>('coregulation-plans', [])
  
  const [studentName, setStudentName] = useState('')
  const [situation, setSituation] = useState('')
  
  const [triggers, setTriggers] = useState<string[]>([])
  const [customTrigger, setCustomTrigger] = useState('')
  
  const [environmentStrategies, setEnvironmentStrategies] = useState<string[]>([])
  const [customEnvironment, setCustomEnvironment] = useState('')
  
  const [adultPresenceStrategies, setAdultPresenceStrategies] = useState<string[]>([])
  const [customAdultPresence, setCustomAdultPresence] = useState('')
  
  const [sensoryStrategies, setSensoryStrategies] = useState<string[]>([])
  const [customSensory, setCustomSensory] = useState('')
  
  const [predictabilityStrategies, setPredictabilityStrategies] = useState<string[]>([])
  const [customPredictability, setCustomPredictability] = useState('')
  
  const [languageScripts, setLanguageScripts] = useState('')
  const [successMeasures, setSuccessMeasures] = useState('')
  const [implementationNotes, setImplementationNotes] = useState('')
  const [reviewPlan, setReviewPlan] = useState('')

  const [showSaved, setShowSaved] = useState(false)

  const toggleTrigger = (trigger: string) => {
    setTriggers(prev => 
      prev.includes(trigger) 
        ? prev.filter(t => t !== trigger)
        : [...prev, trigger]
    )
  }

  const toggleEnvironmentStrategy = (strategy: string) => {
    setEnvironmentStrategies(prev => 
      prev.includes(strategy) 
        ? prev.filter(s => s !== strategy)
        : [...prev, strategy]
    )
  }

  const toggleAdultPresenceStrategy = (strategy: string) => {
    setAdultPresenceStrategies(prev => 
      prev.includes(strategy) 
        ? prev.filter(s => s !== strategy)
        : [...prev, strategy]
    )
  }

  const toggleSensoryStrategy = (strategy: string) => {
    setSensoryStrategies(prev => 
      prev.includes(strategy) 
        ? prev.filter(s => s !== strategy)
        : [...prev, strategy]
    )
  }

  const togglePredictabilityStrategy = (strategy: string) => {
    setPredictabilityStrategies(prev => 
      prev.includes(strategy) 
        ? prev.filter(s => s !== strategy)
        : [...prev, strategy]
    )
  }

  const canProgressStep1 = studentName && situation
  const canProgressStep2 = triggers.length > 0 || customTrigger
  const canProgressStep3 = (
    environmentStrategies.length > 0 || customEnvironment ||
    adultPresenceStrategies.length > 0 || customAdultPresence
  )
  const canProgressStep4 = (
    sensoryStrategies.length > 0 || customSensory ||
    predictabilityStrategies.length > 0 || customPredictability
  )
  const canProgressStep5 = languageScripts && successMeasures && implementationNotes && reviewPlan

  const savePlan = () => {
    const newPlan: CoRegulationPlan = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      studentName,
      situation,
      triggers,
      customTrigger,
      environmentStrategies,
      customEnvironment,
      adultPresenceStrategies,
      customAdultPresence,
      sensoryStrategies,
      customSensory,
      predictabilityStrategies,
      customPredictability,
      languageScripts,
      successMeasures,
      implementationNotes,
      reviewPlan
    }
    
    setSavedPlans(prev => [newPlan, ...(prev || [])])
    toast.success('Co-regulation plan saved successfully')
  }

  const exportPlan = () => {
    const planText = `CO-REGULATION SUPPORT PLAN
Generated: ${new Date().toLocaleDateString('en-IE')}

=== STUDENT & SITUATION ===
Student: ${studentName}
Situation: ${situation}

=== IDENTIFIED TRIGGERS ===
${triggers.map(t => `• ${t}`).join('\n')}
${customTrigger ? `• ${customTrigger}` : ''}

=== ENVIRONMENT STRATEGIES ===
${environmentStrategies.map(s => `• ${s}`).join('\n')}
${customEnvironment ? `• ${customEnvironment}` : ''}

=== ADULT PRESENCE STRATEGIES ===
${adultPresenceStrategies.map(s => `• ${s}`).join('\n')}
${customAdultPresence ? `• ${customAdultPresence}` : ''}

=== SENSORY STRATEGIES ===
${sensoryStrategies.map(s => `• ${s}`).join('\n')}
${customSensory ? `• ${customSensory}` : ''}

=== PREDICTABILITY & PACING STRATEGIES ===
${predictabilityStrategies.map(s => `• ${s}`).join('\n')}
${customPredictability ? `• ${customPredictability}` : ''}

=== LANGUAGE SCRIPTS ===
${languageScripts}

=== SUCCESS MEASURES ===
${successMeasures}

=== IMPLEMENTATION NOTES ===
${implementationNotes}

=== REVIEW PLAN ===
${reviewPlan}
`
    
    const blob = new Blob([planText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `coregulation-plan-${Date.now()}.txt`
    a.click()
    URL.revokeObjectURL(url)
    toast.success('Plan exported successfully')
  }

  const resetForm = () => {
    setCurrentStep(1)
    setStudentName('')
    setSituation('')
    setTriggers([])
    setCustomTrigger('')
    setEnvironmentStrategies([])
    setCustomEnvironment('')
    setAdultPresenceStrategies([])
    setCustomAdultPresence('')
    setSensoryStrategies([])
    setCustomSensory('')
    setPredictabilityStrategies([])
    setCustomPredictability('')
    setLanguageScripts('')
    setSuccessMeasures('')
    setImplementationNotes('')
    setReviewPlan('')
  }

  const loadPlan = (plan: CoRegulationPlan) => {
    setStudentName(plan.studentName)
    setSituation(plan.situation)
    setTriggers(plan.triggers)
    setCustomTrigger(plan.customTrigger)
    setEnvironmentStrategies(plan.environmentStrategies)
    setCustomEnvironment(plan.customEnvironment)
    setAdultPresenceStrategies(plan.adultPresenceStrategies)
    setCustomAdultPresence(plan.customAdultPresence)
    setSensoryStrategies(plan.sensoryStrategies)
    setCustomSensory(plan.customSensory)
    setPredictabilityStrategies(plan.predictabilityStrategies)
    setCustomPredictability(plan.customPredictability)
    setLanguageScripts(plan.languageScripts)
    setSuccessMeasures(plan.successMeasures)
    setImplementationNotes(plan.implementationNotes)
    setReviewPlan(plan.reviewPlan)
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
            <h2 className="text-foreground">Saved Co-Regulation Plans</h2>
            <p className="text-sm text-muted-foreground mt-1">
              View and manage your saved co-regulation support plans
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
                        {plan.situation} • {new Date(plan.timestamp).toLocaleDateString('en-IE')}
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
                    <p><strong className="text-foreground">Triggers:</strong> {plan.triggers.length} identified</p>
                    <p><strong className="text-foreground">Strategies:</strong> {
                      plan.environmentStrategies.length + 
                      plan.adultPresenceStrategies.length + 
                      plan.sensoryStrategies.length + 
                      plan.predictabilityStrategies.length
                    } selected</p>
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
          <h2 className="text-foreground">Co-Regulation Strategies</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Step-by-step guide to planning co-regulation support
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
            <CardTitle>Step 1: Define Student & Situation</CardTitle>
            <CardDescription>
              Identify who this plan is for and what regulation challenge you are addressing
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="student-name">Student Name / Identifier</Label>
              <Input
                id="student-name"
                placeholder="e.g., Cian, 4th class, or initials for privacy"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Use whatever identifier feels appropriate for your context
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="situation">Situation / Context</Label>
              <Textarea
                id="situation"
                placeholder="Describe when regulation challenges occur (e.g., During unstructured times like lunch and break, when the classroom gets noisy, during transitions between activities)"
                value={situation}
                onChange={(e) => setSituation(e.target.value)}
                rows={4}
              />
            </div>

            <Card className="bg-accent/5 border-accent/20">
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Remember:</strong> Co-regulation is about supporting the student, 
                  not controlling behavior. The goal is to help them feel safe and regulated enough to engage meaningfully.
                </p>
              </CardContent>
            </Card>

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
            <CardTitle>Step 2: Identify Dysregulation Triggers</CardTitle>
            <CardDescription>
              What tends to lead to dysregulation for this student?
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label>Select all that apply:</Label>
              {TRIGGERS.map(trigger => (
                <div key={trigger} className="flex items-start space-x-2">
                  <Checkbox
                    id={trigger}
                    checked={triggers.includes(trigger)}
                    onCheckedChange={() => toggleTrigger(trigger)}
                  />
                  <Label htmlFor={trigger} className="font-normal cursor-pointer leading-relaxed">
                    {trigger}
                  </Label>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <Label htmlFor="custom-trigger">Other triggers specific to this student</Label>
              <Textarea
                id="custom-trigger"
                placeholder="Describe any other triggers you've noticed..."
                value={customTrigger}
                onChange={(e) => setCustomTrigger(e.target.value)}
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
            <CardTitle>Step 3: Environment & Adult Presence</CardTitle>
            <CardDescription>
              Select strategies to adjust the environment and your presence
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label className="text-base">Environment Adjustments</Label>
              {ENVIRONMENT_STRATEGIES.map(strategy => (
                <div key={strategy} className="flex items-start space-x-2">
                  <Checkbox
                    id={strategy}
                    checked={environmentStrategies.includes(strategy)}
                    onCheckedChange={() => toggleEnvironmentStrategy(strategy)}
                  />
                  <Label htmlFor={strategy} className="font-normal cursor-pointer leading-relaxed">
                    {strategy}
                  </Label>
                </div>
              ))}
              <div className="space-y-2 mt-4">
                <Label htmlFor="custom-environment">Other environment adjustments</Label>
                <Textarea
                  id="custom-environment"
                  placeholder="Describe any other environmental changes..."
                  value={customEnvironment}
                  onChange={(e) => setCustomEnvironment(e.target.value)}
                  rows={2}
                />
              </div>
            </div>

            <div className="border-t pt-6 space-y-3">
              <Label className="text-base">Adult Presence & Approach</Label>
              {ADULT_PRESENCE_STRATEGIES.map(strategy => (
                <div key={strategy} className="flex items-start space-x-2">
                  <Checkbox
                    id={strategy}
                    checked={adultPresenceStrategies.includes(strategy)}
                    onCheckedChange={() => toggleAdultPresenceStrategy(strategy)}
                  />
                  <Label htmlFor={strategy} className="font-normal cursor-pointer leading-relaxed">
                    {strategy}
                  </Label>
                </div>
              ))}
              <div className="space-y-2 mt-4">
                <Label htmlFor="custom-adult">Other adult presence strategies</Label>
                <Textarea
                  id="custom-adult"
                  placeholder="Describe any other approaches to your presence..."
                  value={customAdultPresence}
                  onChange={(e) => setCustomAdultPresence(e.target.value)}
                  rows={2}
                />
              </div>
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
            <CardTitle>Step 4: Sensory & Predictability Supports</CardTitle>
            <CardDescription>
              Select sensory input and structure strategies
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label className="text-base">Sensory Supports</Label>
              {SENSORY_STRATEGIES.map(strategy => (
                <div key={strategy} className="flex items-start space-x-2">
                  <Checkbox
                    id={strategy}
                    checked={sensoryStrategies.includes(strategy)}
                    onCheckedChange={() => toggleSensoryStrategy(strategy)}
                  />
                  <Label htmlFor={strategy} className="font-normal cursor-pointer leading-relaxed">
                    {strategy}
                  </Label>
                </div>
              ))}
              <div className="space-y-2 mt-4">
                <Label htmlFor="custom-sensory">Other sensory supports</Label>
                <Textarea
                  id="custom-sensory"
                  placeholder="Describe any other sensory strategies..."
                  value={customSensory}
                  onChange={(e) => setCustomSensory(e.target.value)}
                  rows={2}
                />
              </div>
            </div>

            <div className="border-t pt-6 space-y-3">
              <Label className="text-base">Predictability & Pacing</Label>
              {PREDICTABILITY_STRATEGIES.map(strategy => (
                <div key={strategy} className="flex items-start space-x-2">
                  <Checkbox
                    id={strategy}
                    checked={predictabilityStrategies.includes(strategy)}
                    onCheckedChange={() => togglePredictabilityStrategy(strategy)}
                  />
                  <Label htmlFor={strategy} className="font-normal cursor-pointer leading-relaxed">
                    {strategy}
                  </Label>
                </div>
              ))}
              <div className="space-y-2 mt-4">
                <Label htmlFor="custom-predictability">Other predictability strategies</Label>
                <Textarea
                  id="custom-predictability"
                  placeholder="Describe any other structure or pacing adjustments..."
                  value={customPredictability}
                  onChange={(e) => setCustomPredictability(e.target.value)}
                  rows={2}
                />
              </div>
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
            <CardTitle>Step 5: Language, Implementation & Review</CardTitle>
            <CardDescription>
              Plan what you will say, how you will implement, and how you will monitor success
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="language-scripts">Language Scripts</Label>
              <Textarea
                id="language-scripts"
                placeholder="Write down specific phrases you'll use to validate feelings, offer support, and provide clarity. Examples: 'I can see this is hard right now', 'What would help?', 'In three minutes, we'll be...' Avoid: 'Calm down', 'You're fine', 'Stop that'"
                value={languageScripts}
                onChange={(e) => setLanguageScripts(e.target.value)}
                rows={5}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="success-measures">How will you measure success?</Label>
              <Textarea
                id="success-measures"
                placeholder="What signs will indicate that co-regulation strategies are working? (e.g., Decreased dysregulation episodes, quicker recovery time, student seeking support independently)"
                value={successMeasures}
                onChange={(e) => setSuccessMeasures(e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="implementation-notes">Implementation Notes</Label>
              <Textarea
                id="implementation-notes"
                placeholder="When will you start? Who else needs to know? What do you need to prepare? (e.g., Brief SNA and principal, create calm corner with weighted items, start using visual schedule Monday)"
                value={implementationNotes}
                onChange={(e) => setImplementationNotes(e.target.value)}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="review-plan">Review Plan</Label>
              <Textarea
                id="review-plan"
                placeholder="When and how will you review this plan? How will you include the student's voice in the review? (e.g., Check-in with student weekly using simple rating scale, team review after two weeks, adjust strategies based on what student says helps)"
                value={reviewPlan}
                onChange={(e) => setReviewPlan(e.target.value)}
                rows={4}
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
              Your co-regulation support plan is complete. You can save it to access later, or export it to share with colleagues and family.
            </p>
            <Button onClick={resetForm} variant="outline" className="w-full">
              Create Another Plan
            </Button>
          </CardContent>
        </Card>
      )}

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
          <CardTitle>Using Co-Regulation Effectively</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• <strong className="text-foreground">Proactive, not reactive:</strong> Use strategies before dysregulation occurs</p>
          <p>• <strong className="text-foreground">Follow the student lead:</strong> What works for one student may not work for another</p>
          <p>• <strong className="text-foreground">Build a regulation toolkit together:</strong> Ask student what helps them feel calm</p>
          <p>• <strong className="text-foreground">Model regulation:</strong> Students learn from watching adults regulate themselves</p>
          <p>• <strong className="text-foreground">Understand escalation cycles:</strong> Early intervention is most effective</p>
          <p>• <strong className="text-foreground">Prioritize safety and relationship:</strong> Academic demands can wait until regulation is restored</p>
        </CardContent>
      </Card>
    </div>
  )
}
