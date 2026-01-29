import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, ArrowRight, Check, Download, FloppyDisk, Info, EnvelopeSimple } from '@phosphor-icons/react'
import { useKV } from '@github/spark/hooks'
import { toast } from 'sonner'
import { openEmailClient } from '@/lib/email-export'

interface SensoryChecklistProps {
  onBack: () => void
}

interface SensoryResponse {
  response: 'seeks' | 'avoids' | 'neutral' | ''
  notes: string
}

interface SensoryProfile {
  id: string
  timestamp: number
  studentName: string
  studentAge: string
  observationPeriod: string
  observers: string
  contexts: string
  visual: {
    lightSensitivity: SensoryResponse
    visualComplexity: SensoryResponse
    movementTracking: SensoryResponse
    colorPreferences: SensoryResponse
  }
  auditory: {
    noiseSensitivity: SensoryResponse
    backgroundNoise: SensoryResponse
    specificSounds: SensoryResponse
    musicRhythm: SensoryResponse
  }
  tactile: {
    textureSensitivity: SensoryResponse
    touchTolerance: SensoryResponse
    temperature: SensoryResponse
    seekingInput: SensoryResponse
  }
  proprioceptive: {
    deepPressure: SensoryResponse
    heavyWork: SensoryResponse
    bodyAwareness: SensoryResponse
    resistiveInput: SensoryResponse
  }
  vestibular: {
    movementPreferences: SensoryResponse
    balanceCoordination: SensoryResponse
    headPosition: SensoryResponse
    motionSensitivity: SensoryResponse
  }
  olfactoryGustatory: {
    smellSensitivity: SensoryResponse
    tasteTexture: SensoryResponse
    foodRepertoire: SensoryResponse
    seekingSmells: SensoryResponse
  }
  patterns: string
  accommodations: string
  studentVoice: string
  familyInput: string
}

const SENSORY_CATEGORIES = [
  {
    id: 'visual',
    title: 'Visual',
    items: [
      { id: 'lightSensitivity', label: 'Light Sensitivity', description: 'Bright lights, fluorescent lighting, natural light' },
      { id: 'visualComplexity', label: 'Visual Complexity', description: 'Busy displays, patterns, visual clutter' },
      { id: 'movementTracking', label: 'Movement & Visual Tracking', description: 'Following moving objects, shifting attention visually' },
      { id: 'colorPreferences', label: 'Color Preferences', description: 'Specific color attractions or aversions' }
    ]
  },
  {
    id: 'auditory',
    title: 'Auditory',
    items: [
      { id: 'noiseSensitivity', label: 'Noise Sensitivity', description: 'Loud sounds, sudden noises, volume tolerance' },
      { id: 'backgroundNoise', label: 'Background Noise', description: 'Tolerance for ambient classroom sounds' },
      { id: 'specificSounds', label: 'Specific Sound Triggers', description: 'Bells, scraping chairs, humming, whistling' },
      { id: 'musicRhythm', label: 'Music & Rhythm', description: 'Response to music, rhythmic patterns, singing' }
    ]
  },
  {
    id: 'tactile',
    title: 'Tactile',
    items: [
      { id: 'textureSensitivity', label: 'Texture Sensitivity', description: 'Clothing tags, fabric types, textures on hands' },
      { id: 'touchTolerance', label: 'Touch Tolerance', description: 'Unexpected touch, light touch, personal space' },
      { id: 'temperature', label: 'Temperature', description: 'Hot/cold sensitivity, room temperature preferences' },
      { id: 'seekingInput', label: 'Seeking Tactile Input', description: 'Fidget items, textures, touching objects' }
    ]
  },
  {
    id: 'proprioceptive',
    title: 'Proprioceptive',
    items: [
      { id: 'deepPressure', label: 'Deep Pressure', description: 'Tight hugs, weighted items, compression' },
      { id: 'heavyWork', label: 'Heavy Work Activities', description: 'Pushing, pulling, carrying, lifting' },
      { id: 'bodyAwareness', label: 'Body Awareness', description: 'Spatial awareness, body positioning' },
      { id: 'resistiveInput', label: 'Resistive Input', description: 'Activities requiring muscle engagement' }
    ]
  },
  {
    id: 'vestibular',
    title: 'Vestibular',
    items: [
      { id: 'movementPreferences', label: 'Movement Preferences', description: 'Spinning, swinging, rocking, bouncing' },
      { id: 'balanceCoordination', label: 'Balance & Coordination', description: 'Stability, motor planning, coordination' },
      { id: 'headPosition', label: 'Head Position Changes', description: 'Bending down, looking up, inversions' },
      { id: 'motionSensitivity', label: 'Motion Sensitivity', description: 'Car sickness, dizziness, fear of heights' }
    ]
  },
  {
    id: 'olfactoryGustatory',
    title: 'Olfactory / Gustatory',
    items: [
      { id: 'smellSensitivity', label: 'Smell Sensitivity', description: 'Perfumes, cleaning products, food smells' },
      { id: 'tasteTexture', label: 'Taste & Texture', description: 'Food textures, taste preferences, temperature' },
      { id: 'foodRepertoire', label: 'Food Repertoire', description: 'Variety of foods accepted, willingness to try new foods' },
      { id: 'seekingSmells', label: 'Seeking/Avoiding Smells', description: 'Sniffing objects, seeking or avoiding odors' }
    ]
  }
]

export function SensoryChecklist({ onBack }: SensoryChecklistProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [savedProfiles, setSavedProfiles] = useKV<SensoryProfile[]>('sensory-profiles', [])
  
  const [studentName, setStudentName] = useState('')
  const [studentAge, setStudentAge] = useState('')
  const [observationPeriod, setObservationPeriod] = useState('')
  const [observers, setObservers] = useState('')
  const [contexts, setContexts] = useState('')
  
  const [visual, setVisual] = useState({
    lightSensitivity: { response: '' as 'seeks' | 'avoids' | 'neutral' | '', notes: '' },
    visualComplexity: { response: '' as 'seeks' | 'avoids' | 'neutral' | '', notes: '' },
    movementTracking: { response: '' as 'seeks' | 'avoids' | 'neutral' | '', notes: '' },
    colorPreferences: { response: '' as 'seeks' | 'avoids' | 'neutral' | '', notes: '' }
  })
  
  const [auditory, setAuditory] = useState({
    noiseSensitivity: { response: '' as 'seeks' | 'avoids' | 'neutral' | '', notes: '' },
    backgroundNoise: { response: '' as 'seeks' | 'avoids' | 'neutral' | '', notes: '' },
    specificSounds: { response: '' as 'seeks' | 'avoids' | 'neutral' | '', notes: '' },
    musicRhythm: { response: '' as 'seeks' | 'avoids' | 'neutral' | '', notes: '' }
  })
  
  const [tactile, setTactile] = useState({
    textureSensitivity: { response: '' as 'seeks' | 'avoids' | 'neutral' | '', notes: '' },
    touchTolerance: { response: '' as 'seeks' | 'avoids' | 'neutral' | '', notes: '' },
    temperature: { response: '' as 'seeks' | 'avoids' | 'neutral' | '', notes: '' },
    seekingInput: { response: '' as 'seeks' | 'avoids' | 'neutral' | '', notes: '' }
  })
  
  const [proprioceptive, setProprioceptive] = useState({
    deepPressure: { response: '' as 'seeks' | 'avoids' | 'neutral' | '', notes: '' },
    heavyWork: { response: '' as 'seeks' | 'avoids' | 'neutral' | '', notes: '' },
    bodyAwareness: { response: '' as 'seeks' | 'avoids' | 'neutral' | '', notes: '' },
    resistiveInput: { response: '' as 'seeks' | 'avoids' | 'neutral' | '', notes: '' }
  })
  
  const [vestibular, setVestibular] = useState({
    movementPreferences: { response: '' as 'seeks' | 'avoids' | 'neutral' | '', notes: '' },
    balanceCoordination: { response: '' as 'seeks' | 'avoids' | 'neutral' | '', notes: '' },
    headPosition: { response: '' as 'seeks' | 'avoids' | 'neutral' | '', notes: '' },
    motionSensitivity: { response: '' as 'seeks' | 'avoids' | 'neutral' | '', notes: '' }
  })
  
  const [olfactoryGustatory, setOlfactoryGustatory] = useState({
    smellSensitivity: { response: '' as 'seeks' | 'avoids' | 'neutral' | '', notes: '' },
    tasteTexture: { response: '' as 'seeks' | 'avoids' | 'neutral' | '', notes: '' },
    foodRepertoire: { response: '' as 'seeks' | 'avoids' | 'neutral' | '', notes: '' },
    seekingSmells: { response: '' as 'seeks' | 'avoids' | 'neutral' | '', notes: '' }
  })
  
  const [patterns, setPatterns] = useState('')
  const [accommodations, setAccommodations] = useState('')
  const [studentVoice, setStudentVoice] = useState('')
  const [familyInput, setFamilyInput] = useState('')
  
  const [currentCategory, setCurrentCategory] = useState(0)
  const [showSaved, setShowSaved] = useState(false)

  const getCategoryState = (categoryId: string) => {
    switch (categoryId) {
      case 'visual': return visual
      case 'auditory': return auditory
      case 'tactile': return tactile
      case 'proprioceptive': return proprioceptive
      case 'vestibular': return vestibular
      case 'olfactoryGustatory': return olfactoryGustatory
      default: return {}
    }
  }

  const setCategoryState = (categoryId: string, itemId: string, field: 'response' | 'notes', value: string) => {
    const updateState = (prev: any) => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        [field]: value
      }
    })
    
    switch (categoryId) {
      case 'visual': setVisual(updateState); break
      case 'auditory': setAuditory(updateState); break
      case 'tactile': setTactile(updateState); break
      case 'proprioceptive': setProprioceptive(updateState); break
      case 'vestibular': setVestibular(updateState); break
      case 'olfactoryGustatory': setOlfactoryGustatory(updateState); break
    }
  }

  const canProgressStep1 = studentName && studentAge && observationPeriod && observers && contexts
  const canProgressStep2 = currentCategory < SENSORY_CATEGORIES.length
  const canProgressStep3 = patterns && accommodations

  const savePlan = () => {
    const newProfile: SensoryProfile = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      studentName,
      studentAge,
      observationPeriod,
      observers,
      contexts,
      visual,
      auditory,
      tactile,
      proprioceptive,
      vestibular,
      olfactoryGustatory,
      patterns,
      accommodations,
      studentVoice,
      familyInput
    }
    
    setSavedProfiles(prev => [newProfile, ...(prev || [])])
    toast.success('Sensory profile saved successfully')
  }

  const generatePlanText = () => {
    const formatCategory = (categoryTitle: string, categoryData: any, items: any[]) => {
      return `=== ${categoryTitle.toUpperCase()} ===\n` + 
        items.map(item => {
          const data = categoryData[item.id]
          if (!data || !data.response) return ''
          return `${item.label}:\n  Response: ${data.response.toUpperCase()}\n  Notes: ${data.notes || 'None'}\n`
        }).filter(Boolean).join('\n')
    }

    return `SENSORY NEEDS PROFILE
Generated: ${new Date().toLocaleDateString('en-IE')}

=== STUDENT & OBSERVATION CONTEXT ===
Student: ${studentName}
Age: ${studentAge}
Observation Period: ${observationPeriod}
Observers: ${observers}
Contexts: ${contexts}

${formatCategory('Visual', visual, SENSORY_CATEGORIES[0].items)}

${formatCategory('Auditory', auditory, SENSORY_CATEGORIES[1].items)}

${formatCategory('Tactile', tactile, SENSORY_CATEGORIES[2].items)}

${formatCategory('Proprioceptive', proprioceptive, SENSORY_CATEGORIES[3].items)}

${formatCategory('Vestibular', vestibular, SENSORY_CATEGORIES[4].items)}

${formatCategory('Olfactory/Gustatory', olfactoryGustatory, SENSORY_CATEGORIES[5].items)}

=== PATTERNS & THEMES ===
${patterns}

=== RECOMMENDED ACCOMMODATIONS ===
${accommodations}

=== STUDENT VOICE ===
${studentVoice || 'Not collected'}

=== FAMILY INPUT ===
${familyInput || 'Not collected'}
`
  }

  const exportPlan = () => {
    const planText = generatePlanText()
    const blob = new Blob([planText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `sensory-profile-${Date.now()}.txt`
    a.click()
    URL.revokeObjectURL(url)
    toast.success('Profile exported successfully')
  }

  const emailPlan = () => {
    const planText = generatePlanText()
    const subject = `Sensory Needs Profile: ${studentName}`
    openEmailClient(subject, planText)
    toast.success('Opening email client...')
  }

  const resetForm = () => {
    setCurrentStep(1)
    setStudentName('')
    setStudentAge('')
    setObservationPeriod('')
    setObservers('')
    setContexts('')
    setVisual({
      lightSensitivity: { response: '', notes: '' },
      visualComplexity: { response: '', notes: '' },
      movementTracking: { response: '', notes: '' },
      colorPreferences: { response: '', notes: '' }
    })
    setAuditory({
      noiseSensitivity: { response: '', notes: '' },
      backgroundNoise: { response: '', notes: '' },
      specificSounds: { response: '', notes: '' },
      musicRhythm: { response: '', notes: '' }
    })
    setTactile({
      textureSensitivity: { response: '', notes: '' },
      touchTolerance: { response: '', notes: '' },
      temperature: { response: '', notes: '' },
      seekingInput: { response: '', notes: '' }
    })
    setProprioceptive({
      deepPressure: { response: '', notes: '' },
      heavyWork: { response: '', notes: '' },
      bodyAwareness: { response: '', notes: '' },
      resistiveInput: { response: '', notes: '' }
    })
    setVestibular({
      movementPreferences: { response: '', notes: '' },
      balanceCoordination: { response: '', notes: '' },
      headPosition: { response: '', notes: '' },
      motionSensitivity: { response: '', notes: '' }
    })
    setOlfactoryGustatory({
      smellSensitivity: { response: '', notes: '' },
      tasteTexture: { response: '', notes: '' },
      foodRepertoire: { response: '', notes: '' },
      seekingSmells: { response: '', notes: '' }
    })
    setPatterns('')
    setAccommodations('')
    setStudentVoice('')
    setFamilyInput('')
    setCurrentCategory(0)
  }

  const loadProfile = (profile: SensoryProfile) => {
    setStudentName(profile.studentName)
    setStudentAge(profile.studentAge)
    setObservationPeriod(profile.observationPeriod)
    setObservers(profile.observers)
    setContexts(profile.contexts)
    setVisual(profile.visual)
    setAuditory(profile.auditory)
    setTactile(profile.tactile)
    setProprioceptive(profile.proprioceptive)
    setVestibular(profile.vestibular)
    setOlfactoryGustatory(profile.olfactoryGustatory)
    setPatterns(profile.patterns)
    setAccommodations(profile.accommodations)
    setStudentVoice(profile.studentVoice)
    setFamilyInput(profile.familyInput)
    setCurrentStep(1)
    setCurrentCategory(0)
    setShowSaved(false)
    toast.success('Profile loaded')
  }

  const deleteProfile = (id: string) => {
    setSavedProfiles(prev => (prev || []).filter(p => p.id !== id))
    toast.success('Profile deleted')
  }

  if (showSaved) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setShowSaved(false)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Checklist
          </Button>
          <div className="flex-1">
            <h2 className="text-foreground">Saved Sensory Profiles</h2>
            <p className="text-sm text-muted-foreground mt-1">
              View and manage your saved sensory profiles
            </p>
          </div>
        </div>

        {!savedProfiles || savedProfiles.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground text-center">
                No saved profiles yet. Create a profile to save it for future reference.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {savedProfiles.map(profile => (
              <Card key={profile.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{profile.studentName}</CardTitle>
                      <CardDescription>
                        {profile.studentAge} • {new Date(profile.timestamp).toLocaleDateString('en-IE')}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => loadProfile(profile)}>
                        View
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => deleteProfile(profile.id)}>
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p><strong className="text-foreground">Observation Period:</strong> {profile.observationPeriod}</p>
                    <p><strong className="text-foreground">Observers:</strong> {profile.observers}</p>
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
          <h2 className="text-foreground">Sensory Needs Checklist</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Step-by-step observation tool to identify sensory preferences and sensitivities
          </p>
        </div>
        {savedProfiles && savedProfiles.length > 0 && (
          <Button variant="outline" onClick={() => setShowSaved(true)}>
            View Saved Profiles ({savedProfiles.length})
          </Button>
        )}
      </div>

      <Card className="bg-muted">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3].map(step => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${
                  currentStep === step ? 'bg-accent text-accent-foreground' :
                  currentStep > step ? 'bg-primary text-primary-foreground' :
                  'bg-muted-foreground/20 text-muted-foreground'
                }`}>
                  {currentStep > step ? <Check /> : step}
                </div>
                {step < 3 && (
                  <div className={`w-12 h-0.5 mx-2 ${
                    currentStep > step ? 'bg-primary' : 'bg-muted-foreground/20'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <p className="text-sm text-foreground text-center">
            {currentStep === 1 && 'Step 1: Define Context'}
            {currentStep === 2 && `Step 2: Observe (${currentCategory + 1}/${SENSORY_CATEGORIES.length} Categories)`}
            {currentStep === 3 && 'Step 3: Analysis & Recommendations'}
          </p>
        </CardContent>
      </Card>

      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Step 1: Define Observation Context</CardTitle>
            <CardDescription>
              Provide background information about the student and observation process
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="student-name">Student Name / Identifier</Label>
              <Input
                id="student-name"
                placeholder="e.g., Liam, Student B, 5th class student"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="student-age">Age / Year Group</Label>
              <Input
                id="student-age"
                placeholder="e.g., 8 years old, 5th class, 1st year"
                value={studentAge}
                onChange={(e) => setStudentAge(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="observation-period">Observation Period</Label>
              <Input
                id="observation-period"
                placeholder="e.g., Two weeks (3rd-17th March), During November, Five school days"
                value={observationPeriod}
                onChange={(e) => setObservationPeriod(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Sensory observations are most reliable when conducted over multiple days and contexts
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="observers">Who Observed?</Label>
              <Input
                id="observers"
                placeholder="e.g., Classroom teacher, SNA, Learning Support teacher, Family"
                value={observers}
                onChange={(e) => setObservers(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contexts">Observation Contexts</Label>
              <Textarea
                id="contexts"
                placeholder="Describe where and when observations occurred (e.g., Classroom during instruction, playground during break, resource room, lunch hall, PE class)"
                value={contexts}
                onChange={(e) => setContexts(e.target.value)}
                rows={4}
              />
            </div>

            <Card className="bg-accent/5 border-accent/20">
              <CardContent className="pt-6 flex items-start gap-3">
                <Info className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <div className="text-sm text-muted-foreground space-y-2">
                  <p><strong className="text-foreground">Important:</strong> This checklist documents observed patterns, not diagnoses. It should inform environmental adjustments and support strategies.</p>
                  <p>Gather input from multiple people who interact with the student in different contexts for the most complete picture.</p>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button onClick={() => setCurrentStep(2)} disabled={!canProgressStep1}>
                Begin Observations
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === 2 && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Step 2: Record Observations - {SENSORY_CATEGORIES[currentCategory].title}</CardTitle>
              <CardDescription>
                For each item, select whether the student seeks, avoids, or shows neutral response. Add specific examples in notes.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                {SENSORY_CATEGORIES.map((cat, idx) => (
                  <Badge 
                    key={cat.id} 
                    variant={idx === currentCategory ? 'default' : 'outline'}
                    className={idx === currentCategory ? 'bg-accent text-accent-foreground' : ''}
                  >
                    {cat.title}
                  </Badge>
                ))}
              </div>

              {SENSORY_CATEGORIES[currentCategory].items.map((item) => {
                const categoryState = getCategoryState(SENSORY_CATEGORIES[currentCategory].id)
                const itemData = categoryState[item.id as keyof typeof categoryState] as SensoryResponse
                
                return (
                  <Card key={item.id} className="border-2">
                    <CardHeader>
                      <CardTitle className="text-base">{item.label}</CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>Observed Response</Label>
                        <RadioGroup 
                          value={itemData?.response || ''} 
                          onValueChange={(value) => setCategoryState(SENSORY_CATEGORIES[currentCategory].id, item.id, 'response', value)}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="seeks" id={`${item.id}-seeks`} />
                            <Label htmlFor={`${item.id}-seeks`} className="font-normal cursor-pointer">
                              <strong className="text-foreground">Seeks:</strong> Actively pursues or shows preference for this sensory input
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="avoids" id={`${item.id}-avoids`} />
                            <Label htmlFor={`${item.id}-avoids`} className="font-normal cursor-pointer">
                              <strong className="text-foreground">Avoids:</strong> Shows distress, withdrawal, or discomfort with this input
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="neutral" id={`${item.id}-neutral`} />
                            <Label htmlFor={`${item.id}-neutral`} className="font-normal cursor-pointer">
                              <strong className="text-foreground">Neutral:</strong> No strong reaction observed, typical response
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`${item.id}-notes`}>Specific Observations (optional)</Label>
                        <Textarea
                          id={`${item.id}-notes`}
                          placeholder="Describe specific behaviors, contexts, or patterns you observed..."
                          value={itemData?.notes || ''}
                          onChange={(e) => setCategoryState(SENSORY_CATEGORIES[currentCategory].id, item.id, 'notes', e.target.value)}
                          rows={2}
                        />
                      </div>
                    </CardContent>
                  </Card>
                )
              })}

              <div className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    if (currentCategory > 0) {
                      setCurrentCategory(currentCategory - 1)
                    } else {
                      setCurrentStep(1)
                    }
                  }}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                <Button 
                  onClick={() => {
                    if (currentCategory < SENSORY_CATEGORIES.length - 1) {
                      setCurrentCategory(currentCategory + 1)
                    } else {
                      setCurrentStep(3)
                    }
                  }}
                >
                  {currentCategory < SENSORY_CATEGORIES.length - 1 ? 'Next Category' : 'Complete Observations'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {currentStep === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Step 3: Patterns & Recommendations</CardTitle>
            <CardDescription>
              Synthesize observations into actionable insights and accommodations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="patterns">Overall Patterns & Themes</Label>
              <Textarea
                id="patterns"
                placeholder="What patterns emerged across sensory domains? Are there particular contexts where sensory needs are more pronounced? Any surprising findings?"
                value={patterns}
                onChange={(e) => setPatterns(e.target.value)}
                rows={5}
              />
              <p className="text-xs text-muted-foreground">
                Example: "Strong proprioceptive seeking alongside auditory avoidance. Most regulated during structured activities with movement breaks. Lunch hall is consistently challenging."
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="accommodations">Recommended Accommodations</Label>
              <Textarea
                id="accommodations"
                placeholder="Based on observations, what specific environmental adjustments, supports, or strategies would you recommend?"
                value={accommodations}
                onChange={(e) => setAccommodations(e.target.value)}
                rows={6}
              />
              <p className="text-xs text-muted-foreground">
                Example: "Provide noise-cancelling headphones for transitions. Schedule heavy work activities before demanding tasks. Allow access to fidget tools. Reduce visual clutter at desk area."
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="student-voice">Student Voice (optional)</Label>
              <Textarea
                id="student-voice"
                placeholder="If appropriate, what has the student shared about their sensory experiences? Their preferences? What helps them feel comfortable?"
                value={studentVoice}
                onChange={(e) => setStudentVoice(e.target.value)}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="family-input">Family Input (optional)</Label>
              <Textarea
                id="family-input"
                placeholder="What insights has the family shared about sensory patterns at home? Strategies that work? Different contexts?"
                value={familyInput}
                onChange={(e) => setFamilyInput(e.target.value)}
                rows={4}
              />
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(2)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Observations
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" onClick={savePlan} disabled={!canProgressStep3}>
                  <FloppyDisk className="w-4 h-4 mr-2" />
                  Save Profile
                </Button>
                <Button variant="outline" onClick={emailPlan} disabled={!canProgressStep3}>
                  <EnvelopeSimple className="w-4 h-4 mr-2" />
                  Email Profile
                </Button>
                <Button onClick={exportPlan} disabled={!canProgressStep3}>
                  <Download className="w-4 h-4 mr-2" />
                  Export Profile
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === 3 && canProgressStep3 && (
        <Card className="bg-accent/5 border-accent">
          <CardHeader>
            <CardTitle>Profile Complete</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Your sensory profile is complete. You can save it to access later, or export it to share with colleagues, occupational therapists, and family.
            </p>
            <Button onClick={resetForm} variant="outline" className="w-full">
              Create Another Profile
            </Button>
          </CardContent>
        </Card>
      )}

      <Card className="bg-accent/5 border-2 border-accent/20">
        <CardHeader>
          <CardTitle>Understanding Sensory Responses</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            <strong className="text-foreground">Seeks:</strong> The student actively pursues this type of sensory input. They may appear to crave it and show improved regulation when they receive it.
          </p>
          <p>
            <strong className="text-foreground">Avoids:</strong> The student shows distress or withdrawal from this input. They may have heightened sensitivity in this area.
          </p>
          <p>
            <strong className="text-foreground">Neutral:</strong> The student shows typical responses without strong seeking or avoiding patterns.
          </p>
          <p className="pt-2 border-t">
            <strong className="text-foreground">Important:</strong> Sensory patterns can vary by context, time of day, and stress level. This profile captures observed patterns but is not exhaustive. Consider consultation with an occupational therapist for complex sensory needs.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Using This Tool Effectively</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• <strong className="text-foreground">Observe, don't test:</strong> Watch student in natural contexts over several days</p>
          <p>• <strong className="text-foreground">Collaborate:</strong> Gather input from family, SNAs, and student themselves where appropriate</p>
          <p>• <strong className="text-foreground">Be specific:</strong> Note particular contexts, times of day, or triggering factors</p>
          <p>• <strong className="text-foreground">Focus on patterns:</strong> One-off reactions are less informative than repeated responses</p>
          <p>• <strong className="text-foreground">Use results to inform accommodations:</strong> Checklist should lead to environmental adjustments and support planning</p>
          <p>• <strong className="text-foreground">Review regularly:</strong> Sensory needs can change over time, especially during transitions or developmental stages</p>
        </CardContent>
      </Card>
    </div>
  )
}
