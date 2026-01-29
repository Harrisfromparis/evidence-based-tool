import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, ArrowRight, Check, Download, FloppyDisk, Info, EnvelopeSimple } from '@phosphor-icons/react'
import { useKV } from '@github/spark/hooks'
import { toast } from 'sonner'
import { openEmailClient, formatDateForEmail, createSectionHeader } from '@/lib/email-export'

interface BehaviorCommunicationAnalyzerProps {
  onBack: () => void
}

interface BehaviorAnalysis {
  id: string
  timestamp: number
  studentName: string
  dateTime: string
  observers: string
  context: string
  antecedentEnvironment: string
  antecedentActivity: string
  antecedentPeople: string
  antecedentTime: string
  antecedentSensory: string
  antecedentChanges: string
  behaviorDescription: string
  behaviorDuration: string
  behaviorWarnings: string
  consequenceAdultResponse: string
  consequencePeerResponse: string
  consequenceEnvironmentalChange: string
  consequenceOutcome: string
  possibleMessages: string[]
  unmetNeeds: string[]
  hypothesizedFunction: string
  suggestedSupports: string
  preventativeStrategies: string
  teachingAlternatives: string
  collaborationNotes: string
}

const POSSIBLE_MESSAGES = [
  { id: 'too-hard', label: 'This is too hard / I don\'t understand' },
  { id: 'need-break', label: 'I need a break / I\'m overwhelmed' },
  { id: 'sensory-pain', label: 'This sensory input is painful or uncomfortable' },
  { id: 'need-attention', label: 'I need attention / connection / help' },
  { id: 'want-different', label: 'I want to do something else' },
  { id: 'need-clarity', label: 'I don\'t know what to do / I need more clarity' },
  { id: 'expressing-emotion', label: 'I am expressing a strong emotion (joy, frustration, fear)' },
  { id: 'asserting-control', label: 'I need to have some control or choice' }
]

const UNMET_NEEDS = [
  { id: 'sensory-regulation', label: 'Sensory regulation or accommodation' },
  { id: 'predictability', label: 'Predictability and structure' },
  { id: 'communication-support', label: 'Communication support or alternative method' },
  { id: 'skill-development', label: 'Skill development (task too complex)' },
  { id: 'autonomy', label: 'Autonomy and choice' },
  { id: 'social-connection', label: 'Social connection or belonging' },
  { id: 'physical-needs', label: 'Physical needs (hunger, tiredness, pain)' },
  { id: 'emotional-support', label: 'Emotional co-regulation or support' }
]

export function BehaviorCommunicationAnalyzer({ onBack }: BehaviorCommunicationAnalyzerProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [savedAnalyses, setSavedAnalyses] = useKV<BehaviorAnalysis[]>('behavior-analyses', [])
  
  const [studentName, setStudentName] = useState('')
  const [dateTime, setDateTime] = useState('')
  const [observers, setObservers] = useState('')
  const [context, setContext] = useState('')
  
  const [antecedentEnvironment, setAntecedentEnvironment] = useState('')
  const [antecedentActivity, setAntecedentActivity] = useState('')
  const [antecedentPeople, setAntecedentPeople] = useState('')
  const [antecedentTime, setAntecedentTime] = useState('')
  const [antecedentSensory, setAntecedentSensory] = useState('')
  const [antecedentChanges, setAntecedentChanges] = useState('')
  
  const [behaviorDescription, setBehaviorDescription] = useState('')
  const [behaviorDuration, setBehaviorDuration] = useState('')
  const [behaviorWarnings, setBehaviorWarnings] = useState('')
  
  const [consequenceAdultResponse, setConsequenceAdultResponse] = useState('')
  const [consequencePeerResponse, setConsequencePeerResponse] = useState('')
  const [consequenceEnvironmentalChange, setConsequenceEnvironmentalChange] = useState('')
  const [consequenceOutcome, setConsequenceOutcome] = useState('')
  
  const [possibleMessages, setPossibleMessages] = useState<string[]>([])
  const [unmetNeeds, setUnmetNeeds] = useState<string[]>([])
  const [hypothesizedFunction, setHypothesizedFunction] = useState('')
  const [suggestedSupports, setSuggestedSupports] = useState('')
  const [preventativeStrategies, setPreventativeStrategies] = useState('')
  const [teachingAlternatives, setTeachingAlternatives] = useState('')
  const [collaborationNotes, setCollaborationNotes] = useState('')

  const [showSaved, setShowSaved] = useState(false)

  const togglePossibleMessage = (messageId: string) => {
    setPossibleMessages(prev => 
      prev.includes(messageId) 
        ? prev.filter(m => m !== messageId)
        : [...prev, messageId]
    )
  }

  const toggleUnmetNeed = (needId: string) => {
    setUnmetNeeds(prev => 
      prev.includes(needId) 
        ? prev.filter(n => n !== needId)
        : [...prev, needId]
    )
  }

  const canProgressStep1 = studentName && dateTime && observers && context
  const canProgressStep2 = antecedentEnvironment && antecedentActivity
  const canProgressStep3 = behaviorDescription
  const canProgressStep4 = consequenceAdultResponse
  const canProgressStep5 = possibleMessages.length > 0 && unmetNeeds.length > 0 && hypothesizedFunction
  const canProgressStep6 = suggestedSupports && preventativeStrategies

  const saveAnalysis = () => {
    const newAnalysis: BehaviorAnalysis = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      studentName,
      dateTime,
      observers,
      context,
      antecedentEnvironment,
      antecedentActivity,
      antecedentPeople,
      antecedentTime,
      antecedentSensory,
      antecedentChanges,
      behaviorDescription,
      behaviorDuration,
      behaviorWarnings,
      consequenceAdultResponse,
      consequencePeerResponse,
      consequenceEnvironmentalChange,
      consequenceOutcome,
      possibleMessages,
      unmetNeeds,
      hypothesizedFunction,
      suggestedSupports,
      preventativeStrategies,
      teachingAlternatives,
      collaborationNotes
    }
    
    setSavedAnalyses(prev => [newAnalysis, ...(prev || [])])
    toast.success('Behavior analysis saved successfully')
  }

  const generateAnalysisText = () => {
    const selectedMessages = possibleMessages.map(id => {
      const msg = POSSIBLE_MESSAGES.find(m => m.id === id)
      return msg ? `• ${msg.label}` : ''
    }).filter(Boolean).join('\n')

    const selectedNeeds = unmetNeeds.map(id => {
      const need = UNMET_NEEDS.find(n => n.id === id)
      return need ? `• ${need.label}` : ''
    }).filter(Boolean).join('\n')

    return `BEHAVIOUR = COMMUNICATION ANALYSIS
Generated: ${new Date().toLocaleDateString('en-IE')}

=== OBSERVATION CONTEXT ===
Student: ${studentName}
Date/Time: ${dateTime}
Observers: ${observers}
Context: ${context}

=== ABC ANALYSIS ===

A — ANTECEDENT (What Happened Before?)
Environment: ${antecedentEnvironment}
Activity/Demand: ${antecedentActivity}
People Present: ${antecedentPeople || 'Not specified'}
Time of Day: ${antecedentTime || 'Not specified'}
Sensory Factors: ${antecedentSensory || 'Not specified'}
Changes to Routine: ${antecedentChanges || 'Not specified'}

B — BEHAVIOR (What Did the Student Do?)
Description: ${behaviorDescription}
Duration: ${behaviorDuration || 'Not specified'}
Warning Signs: ${behaviorWarnings || 'None observed'}

C — CONSEQUENCE (What Happened After?)
Adult Response: ${consequenceAdultResponse}
Peer Response: ${consequencePeerResponse || 'Not specified'}
Environmental Change: ${consequenceEnvironmentalChange || 'Not specified'}
Outcome/Resolution: ${consequenceOutcome || 'Not specified'}

=== INTERPRETATION ===

Possible Messages Being Communicated:
${selectedMessages}

Unmet Needs Identified:
${selectedNeeds}

Hypothesized Function:
${hypothesizedFunction}

=== SUPPORT PLAN ===

Suggested EBPs & Supports:
${suggestedSupports}

Preventative Strategies (Antecedent Modifications):
${preventativeStrategies}

Teaching Alternative Communication:
${teachingAlternatives || 'Not specified'}

=== COLLABORATION NOTES ===
${collaborationNotes || 'None'}

---
Ethical Reminder: This analysis prioritizes understanding and supporting the student's needs, not eliminating behavior that adults find inconvenient. All strategies must respect student dignity and autonomy.
`
  }

  const exportAnalysis = () => {
    const analysisText = generateAnalysisText()
    const blob = new Blob([analysisText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `behavior-analysis-${Date.now()}.txt`
    a.click()
    URL.revokeObjectURL(url)
    toast.success('Analysis exported successfully')
  }

  const emailAnalysis = () => {
    const analysisText = generateAnalysisText()
    const subject = `Behaviour = Communication Analysis: ${studentName} (${dateTime})`
    openEmailClient(subject, analysisText)
    toast.success('Opening email client...')
  }

  const resetForm = () => {
    setCurrentStep(1)
    setStudentName('')
    setDateTime('')
    setObservers('')
    setContext('')
    setAntecedentEnvironment('')
    setAntecedentActivity('')
    setAntecedentPeople('')
    setAntecedentTime('')
    setAntecedentSensory('')
    setAntecedentChanges('')
    setBehaviorDescription('')
    setBehaviorDuration('')
    setBehaviorWarnings('')
    setConsequenceAdultResponse('')
    setConsequencePeerResponse('')
    setConsequenceEnvironmentalChange('')
    setConsequenceOutcome('')
    setPossibleMessages([])
    setUnmetNeeds([])
    setHypothesizedFunction('')
    setSuggestedSupports('')
    setPreventativeStrategies('')
    setTeachingAlternatives('')
    setCollaborationNotes('')
  }

  const loadAnalysis = (analysis: BehaviorAnalysis) => {
    setStudentName(analysis.studentName)
    setDateTime(analysis.dateTime)
    setObservers(analysis.observers)
    setContext(analysis.context)
    setAntecedentEnvironment(analysis.antecedentEnvironment)
    setAntecedentActivity(analysis.antecedentActivity)
    setAntecedentPeople(analysis.antecedentPeople)
    setAntecedentTime(analysis.antecedentTime)
    setAntecedentSensory(analysis.antecedentSensory)
    setAntecedentChanges(analysis.antecedentChanges)
    setBehaviorDescription(analysis.behaviorDescription)
    setBehaviorDuration(analysis.behaviorDuration)
    setBehaviorWarnings(analysis.behaviorWarnings)
    setConsequenceAdultResponse(analysis.consequenceAdultResponse)
    setConsequencePeerResponse(analysis.consequencePeerResponse)
    setConsequenceEnvironmentalChange(analysis.consequenceEnvironmentalChange)
    setConsequenceOutcome(analysis.consequenceOutcome)
    setPossibleMessages(analysis.possibleMessages)
    setUnmetNeeds(analysis.unmetNeeds)
    setHypothesizedFunction(analysis.hypothesizedFunction)
    setSuggestedSupports(analysis.suggestedSupports)
    setPreventativeStrategies(analysis.preventativeStrategies)
    setTeachingAlternatives(analysis.teachingAlternatives)
    setCollaborationNotes(analysis.collaborationNotes)
    setCurrentStep(1)
    setShowSaved(false)
    toast.success('Analysis loaded')
  }

  const deleteAnalysis = (id: string) => {
    setSavedAnalyses(prev => (prev || []).filter(a => a.id !== id))
    toast.success('Analysis deleted')
  }

  if (showSaved) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setShowSaved(false)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Analyzer
          </Button>
          <div className="flex-1">
            <h2 className="text-foreground">Saved Behavior Analyses</h2>
            <p className="text-sm text-muted-foreground mt-1">
              View and manage your saved behavior analyses
            </p>
          </div>
        </div>

        {!savedAnalyses || savedAnalyses.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground text-center">
                No saved analyses yet. Complete an analysis to save it for future reference.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {savedAnalyses.map(analysis => (
              <Card key={analysis.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{analysis.studentName}</CardTitle>
                      <CardDescription>
                        {analysis.dateTime} • {new Date(analysis.timestamp).toLocaleDateString('en-IE')}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => loadAnalysis(analysis)}>
                        View
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => deleteAnalysis(analysis.id)}>
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p><strong className="text-foreground">Context:</strong> {analysis.context}</p>
                    <p><strong className="text-foreground">Observers:</strong> {analysis.observers}</p>
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
          <h2 className="text-foreground">Behaviour = Communication Analyser</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Step-by-step framework for understanding behavior as communication
          </p>
        </div>
        {savedAnalyses && savedAnalyses.length > 0 && (
          <Button variant="outline" onClick={() => setShowSaved(true)}>
            View Saved Analyses ({savedAnalyses.length})
          </Button>
        )}
      </div>

      <Card className="bg-muted">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4, 5, 6].map(step => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${
                  currentStep === step ? 'bg-accent text-accent-foreground' :
                  currentStep > step ? 'bg-primary text-primary-foreground' :
                  'bg-muted-foreground/20 text-muted-foreground'
                }`}>
                  {currentStep > step ? <Check /> : step}
                </div>
                {step < 6 && (
                  <div className={`w-8 h-0.5 mx-1 ${
                    currentStep > step ? 'bg-primary' : 'bg-muted-foreground/20'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <p className="text-sm text-foreground text-center">
            {currentStep === 1 && 'Step 1: Context'}
            {currentStep === 2 && 'Step 2: Antecedent (A)'}
            {currentStep === 3 && 'Step 3: Behavior (B)'}
            {currentStep === 4 && 'Step 4: Consequence (C)'}
            {currentStep === 5 && 'Step 5: Interpretation'}
            {currentStep === 6 && 'Step 6: Support Plan'}
          </p>
        </CardContent>
      </Card>

      <Card className="bg-accent/5 border-2 border-accent/20">
        <CardContent className="pt-6 flex items-start gap-3">
          <Info className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
          <div className="text-sm text-muted-foreground">
            <p className="font-semibold text-foreground mb-2">Core Principle: All Behavior is Communication</p>
            <p>When we observe behavior that challenges us, our role is not to eliminate it, but to understand what the student is communicating and address the underlying need.</p>
          </div>
        </CardContent>
      </Card>

      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Step 1: Define Observation Context</CardTitle>
            <CardDescription>
              Document when, where, and under what circumstances the observation occurred
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="student-name">Student Name / Identifier</Label>
              <Input
                id="student-name"
                placeholder="e.g., Emma, Student C, 3rd class student"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date-time">Date & Time of Observation</Label>
              <Input
                id="date-time"
                placeholder="e.g., Tuesday 12th March, 10:30am, During Maths lesson"
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="observers">Who Observed?</Label>
              <Input
                id="observers"
                placeholder="e.g., Classroom teacher, SNA, Principal"
                value={observers}
                onChange={(e) => setObservers(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="context">General Context / Setting</Label>
              <Textarea
                id="context"
                placeholder="Briefly describe the overall setting (e.g., Mainstream classroom during group work, Resource room during literacy session, Playground at break time)"
                value={context}
                onChange={(e) => setContext(e.target.value)}
                rows={3}
              />
            </div>

            <div className="flex justify-end">
              <Button onClick={() => setCurrentStep(2)} disabled={!canProgressStep1}>
                Next: Antecedent
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Step 2: A — Antecedent (What Happened Before?)</CardTitle>
            <CardDescription>
              Document environmental factors, activities, and conditions present immediately before the behavior
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="antecedent-environment">What was happening in the environment?</Label>
              <Textarea
                id="antecedent-environment"
                placeholder="Describe the physical and social environment (e.g., Classroom was busy with 4 different activities happening simultaneously, fluorescent lights on, windows closed)"
                value={antecedentEnvironment}
                onChange={(e) => setAntecedentEnvironment(e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="antecedent-activity">What activity or demand was presented?</Label>
              <Textarea
                id="antecedent-activity"
                placeholder="What was the student being asked to do? (e.g., Complete a worksheet with 20 questions, Transition from preferred activity to non-preferred, Join group discussion)"
                value={antecedentActivity}
                onChange={(e) => setAntecedentActivity(e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="antecedent-people">Who was present?</Label>
              <Input
                id="antecedent-people"
                placeholder="e.g., Full class, teacher, SNA, substitute teacher"
                value={antecedentPeople}
                onChange={(e) => setAntecedentPeople(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="antecedent-time">What time of day? (optional)</Label>
              <Input
                id="antecedent-time"
                placeholder="e.g., Late morning before lunch, First thing after break, End of school day"
                value={antecedentTime}
                onChange={(e) => setAntecedentTime(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="antecedent-sensory">Were there any notable sensory factors? (optional)</Label>
              <Textarea
                id="antecedent-sensory"
                placeholder="Noise level, lighting, smells, temperature, crowding, visual complexity"
                value={antecedentSensory}
                onChange={(e) => setAntecedentSensory(e.target.value)}
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="antecedent-changes">Had there been any changes to routine? (optional)</Label>
              <Textarea
                id="antecedent-changes"
                placeholder="e.g., Substitute teacher, schedule change, unexpected assembly, peer absent"
                value={antecedentChanges}
                onChange={(e) => setAntecedentChanges(e.target.value)}
                rows={2}
              />
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(1)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              <Button onClick={() => setCurrentStep(3)} disabled={!canProgressStep2}>
                Next: Behavior
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Step 3: B — Behavior (What Did the Student Do?)</CardTitle>
            <CardDescription>
              Describe the behavior objectively and specifically, without interpretation or judgment
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Card className="bg-accent/5 border-accent/20">
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Important:</strong> Use objective, descriptive language. Instead of "had a tantrum," describe what you actually observed: "Student pushed materials off desk, put head down, and said 'I can't do this.'"
                </p>
              </CardContent>
            </Card>

            <div className="space-y-2">
              <Label htmlFor="behavior-description">What specific actions did you observe?</Label>
              <Textarea
                id="behavior-description"
                placeholder="Describe observable actions: What did the student do? What did they say? Be specific and factual."
                value={behaviorDescription}
                onChange={(e) => setBehaviorDescription(e.target.value)}
                rows={5}
              />
              <p className="text-xs text-muted-foreground">
                Example: "Student covered ears with hands, stood up from desk, said 'it's too loud,' walked to the quiet corner, and sat facing the wall."
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="behavior-duration">How long did it last? (optional)</Label>
              <Input
                id="behavior-duration"
                placeholder="e.g., About 2 minutes, 10-15 minutes, Continued for remainder of class period"
                value={behaviorDuration}
                onChange={(e) => setBehaviorDuration(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="behavior-warnings">Were there warning signs beforehand? (optional)</Label>
              <Textarea
                id="behavior-warnings"
                placeholder="Any observable signs of escalation? (e.g., Student began fidgeting, looking away, breathing faster, making small vocal sounds)"
                value={behaviorWarnings}
                onChange={(e) => setBehaviorWarnings(e.target.value)}
                rows={3}
              />
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(2)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              <Button onClick={() => setCurrentStep(4)} disabled={!canProgressStep3}>
                Next: Consequence
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === 4 && (
        <Card>
          <CardHeader>
            <CardTitle>Step 4: C — Consequence (What Happened After?)</CardTitle>
            <CardDescription>
              Document responses from adults, peers, and any environmental changes that occurred after the behavior
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="consequence-adult">How did adults respond?</Label>
              <Textarea
                id="consequence-adult"
                placeholder="What did teachers, SNAs, or other adults do or say? (e.g., Teacher approached calmly, asked 'Do you need a break?', offered visual choice board)"
                value={consequenceAdultResponse}
                onChange={(e) => setConsequenceAdultResponse(e.target.value)}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="consequence-peer">How did peers respond? (optional)</Label>
              <Textarea
                id="consequence-peer"
                placeholder="Did classmates react? If so, how? (e.g., Some students looked over briefly, then returned to work; One peer asked 'Are you okay?')"
                value={consequencePeerResponse}
                onChange={(e) => setConsequencePeerResponse(e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="consequence-environment">What changed in the environment? (optional)</Label>
              <Textarea
                id="consequence-environment"
                placeholder="Any environmental modifications made? (e.g., Lights were dimmed, activity was paused, student moved to quieter space)"
                value={consequenceEnvironmentalChange}
                onChange={(e) => setConsequenceEnvironmentalChange(e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="consequence-outcome">What was the outcome or resolution? (optional)</Label>
              <Textarea
                id="consequence-outcome"
                placeholder="How did the situation resolve? (e.g., Student remained in quiet corner for 5 minutes, then returned to work; Student left classroom with SNA)"
                value={consequenceOutcome}
                onChange={(e) => setConsequenceOutcome(e.target.value)}
                rows={3}
              />
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(3)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              <Button onClick={() => setCurrentStep(5)} disabled={!canProgressStep4}>
                Next: Interpretation
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === 5 && (
        <Card>
          <CardHeader>
            <CardTitle>Step 5: Interpretation — What Was Being Communicated?</CardTitle>
            <CardDescription>
              Reflect on possible messages and unmet needs. This is a hypothesis, not a diagnosis.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label>What might the student have been communicating? (select all that apply)</Label>
              {POSSIBLE_MESSAGES.map(message => (
                <div key={message.id} className="flex items-start space-x-3 p-3 border rounded hover:bg-accent/5 transition-colors">
                  <Checkbox
                    id={message.id}
                    checked={possibleMessages.includes(message.id)}
                    onCheckedChange={() => togglePossibleMessage(message.id)}
                  />
                  <Label htmlFor={message.id} className="cursor-pointer font-normal flex-1">
                    {message.label}
                  </Label>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <Label>What unmet needs might be present? (select all that apply)</Label>
              {UNMET_NEEDS.map(need => (
                <div key={need.id} className="flex items-start space-x-3 p-3 border rounded hover:bg-accent/5 transition-colors">
                  <Checkbox
                    id={need.id}
                    checked={unmetNeeds.includes(need.id)}
                    onCheckedChange={() => toggleUnmetNeed(need.id)}
                  />
                  <Label htmlFor={need.id} className="cursor-pointer font-normal flex-1">
                    {need.label}
                  </Label>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <Label htmlFor="hypothesized-function">Hypothesized Function of Behavior</Label>
              <Textarea
                id="hypothesized-function"
                placeholder="Based on ABC analysis, what do you think the student was trying to achieve or communicate? Synthesize your observations."
                value={hypothesizedFunction}
                onChange={(e) => setHypothesizedFunction(e.target.value)}
                rows={5}
              />
              <p className="text-xs text-muted-foreground">
                Example: "Based on observations, it appears the student was communicating sensory overwhelm from classroom noise and needed to escape to a quieter space to regulate. The behavior effectively communicated this need."
              </p>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(4)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              <Button onClick={() => setCurrentStep(6)} disabled={!canProgressStep5}>
                Next: Support Plan
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === 6 && (
        <Card>
          <CardHeader>
            <CardTitle>Step 6: Support Plan — Responding to the Communication</CardTitle>
            <CardDescription>
              Design supports that address the underlying need, not just the surface behavior
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="suggested-supports">Suggested EBPs & Immediate Supports</Label>
              <Textarea
                id="suggested-supports"
                placeholder="Based on your interpretation, what evidence-based practices or immediate supports would address the underlying need? (e.g., Visual Supports for predictability, Antecedent-Based Intervention for sensory modifications, Functional Communication Training for alternative communication)"
                value={suggestedSupports}
                onChange={(e) => setSuggestedSupports(e.target.value)}
                rows={5}
              />
              <p className="text-xs text-muted-foreground">
                Consider: Visual Supports, Antecedent-Based Intervention, Functional Communication Training, Self-Management, Structured Work Systems, Sensory Accommodations
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="preventative-strategies">Preventative Strategies (Antecedent Modifications)</Label>
              <Textarea
                id="preventative-strategies"
                placeholder="What changes to the environment, activity, or approach could prevent this situation from arising? Focus on proactive modifications."
                value={preventativeStrategies}
                onChange={(e) => setPreventativeStrategies(e.target.value)}
                rows={5}
              />
              <p className="text-xs text-muted-foreground">
                Example: "Provide visual schedule showing when noisy activities occur. Offer noise-cancelling headphones proactively. Create designated quiet space student can access independently."
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="teaching-alternatives">Teaching Alternative Communication (optional)</Label>
              <Textarea
                id="teaching-alternatives"
                placeholder="How can we teach the student a more effective or sustainable way to communicate this same need?"
                value={teachingAlternatives}
                onChange={(e) => setTeachingAlternatives(e.target.value)}
                rows={4}
              />
              <p className="text-xs text-muted-foreground">
                Example: "Teach student to use 'break' card or signal when feeling overwhelmed, so they can communicate need before escalation."
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="collaboration-notes">Collaboration & Next Steps (optional)</Label>
              <Textarea
                id="collaboration-notes"
                placeholder="Who needs to be involved? Family input? Student voice? Team meeting needed? Review date?"
                value={collaborationNotes}
                onChange={(e) => setCollaborationNotes(e.target.value)}
                rows={4}
              />
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(5)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" onClick={saveAnalysis} disabled={!canProgressStep6}>
                  <FloppyDisk className="w-4 h-4 mr-2" />
                  Save Analysis
                </Button>
                <Button variant="outline" onClick={emailAnalysis} disabled={!canProgressStep6}>
                  <EnvelopeSimple className="w-4 h-4 mr-2" />
                  Email Analysis
                </Button>
                <Button onClick={exportAnalysis} disabled={!canProgressStep6}>
                  <Download className="w-4 h-4 mr-2" />
                  Export Analysis
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === 6 && canProgressStep6 && (
        <Card className="bg-accent/5 border-accent">
          <CardHeader>
            <CardTitle>Analysis Complete</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Your behavior analysis is complete. You can save it to access later, or export it to share with your team, family, or other professionals.
            </p>
            <Button onClick={resetForm} variant="outline" className="w-full">
              Create Another Analysis
            </Button>
          </CardContent>
        </Card>
      )}

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
          <p>• <strong className="text-foreground">Student dignity always:</strong> All strategies must respect student autonomy and humanity</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Using This Tool Effectively</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• <strong className="text-foreground">Complete soon after observation:</strong> Details fade quickly; document while fresh</p>
          <p>• <strong className="text-foreground">Multiple observations:</strong> Patterns emerge across situations; one incident is not a pattern</p>
          <p>• <strong className="text-foreground">Collaborate:</strong> Share with colleagues, family, and student where appropriate</p>
          <p>• <strong className="text-foreground">Focus on function, not form:</strong> Same behavior can serve different functions in different contexts</p>
          <p>• <strong className="text-foreground">Prioritize prevention:</strong> Best behavior support prevents situations rather than reacting to them</p>
          <p>• <strong className="text-foreground">Center student wellbeing:</strong> Goal is student thriving, not adult convenience</p>
        </CardContent>
      </Card>
    </div>
  )
}
