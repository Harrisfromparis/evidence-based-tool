import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { ArrowLeft, ArrowRight, Check, FloppyDisk, Info, EnvelopeSimple, Download, Printer } from '@phosphor-icons/react'
import { useKV } from '@github/spark/hooks'
import { toast } from 'sonner'
import { ebps } from '@/lib/data'
import { openEmailClient } from '@/lib/email-export'
import { openPrintPreview, type PrintSection } from '@/lib/print-export'

interface ParentEBPAssessmentProps {
  onBack: () => void
}

interface EBPRating {
  ebpId: string
  effectiveness: 'very-effective' | 'somewhat-effective' | 'not-effective' | 'never-tried' | ''
  context: string
  notes: string
}

interface ParentAssessment {
  id: string
  timestamp: number
  childName: string
  childAge: string
  parentName: string
  relationship: string
  completedBy: string
  ratings: EBPRating[]
}

export function ParentEBPAssessment({ onBack }: ParentEBPAssessmentProps) {
  const [savedAssessments, setSavedAssessments] = useKV<ParentAssessment[]>('parent-ebp-assessments', [])
  const [viewMode, setViewMode] = useState<'list' | 'form' | 'view'>('list')
  const [viewingAssessment, setViewingAssessment] = useState<ParentAssessment | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [currentCategory, setCurrentCategory] = useState(0)

  const [childName, setChildName] = useState('')
  const [childAge, setChildAge] = useState('')
  const [parentName, setParentName] = useState('')
  const [relationship, setRelationship] = useState('')
  const [completedBy, setCompletedBy] = useState('')

  const [ratings, setRatings] = useState<EBPRating[]>(
    ebps.map(ebp => ({
      ebpId: ebp.id,
      effectiveness: '',
      context: '',
      notes: ''
    }))
  )

  const categories = [
    { name: 'Communication', color: 'bg-blue-100 text-blue-800' },
    { name: 'Organization', color: 'bg-green-100 text-green-800' },
    { name: 'Social & Communication', color: 'bg-purple-100 text-purple-800' },
    { name: 'Engagement', color: 'bg-orange-100 text-orange-800' },
    { name: 'Sensory & Environment', color: 'bg-teal-100 text-teal-800' },
    { name: 'Behavioral Support', color: 'bg-red-100 text-red-800' }
  ]

  const ebpsByCategory = categories.map(cat => ({
    category: cat.name,
    color: cat.color,
    ebps: ebps.filter(e => e.category === cat.name)
  }))

  const handleSave = () => {
    if (!childName.trim() || !parentName.trim()) {
      toast.error('Please fill in child and parent/caregiver name')
      return
    }

    const newAssessment: ParentAssessment = {
      id: `assessment-${Date.now()}`,
      timestamp: Date.now(),
      childName,
      childAge,
      parentName,
      relationship,
      completedBy,
      ratings
    }

    setSavedAssessments(current => [...(current || []), newAssessment])
    toast.success('Assessment saved successfully')
    setViewMode('list')
    resetForm()
  }

  const resetForm = () => {
    setChildName('')
    setChildAge('')
    setParentName('')
    setRelationship('')
    setCompletedBy('')
    setCurrentStep(0)
    setCurrentCategory(0)
    setRatings(ebps.map(ebp => ({
      ebpId: ebp.id,
      effectiveness: '',
      context: '',
      notes: ''
    })))
  }

  const handleRatingChange = (ebpId: string, field: keyof EBPRating, value: string) => {
    setRatings(current =>
      current.map(r =>
        r.ebpId === ebpId ? { ...r, [field]: value } : r
      )
    )
  }

  const handleDeleteAssessment = (id: string) => {
    setSavedAssessments(current => (current || []).filter(a => a.id !== id))
    toast.success('Assessment deleted')
    if (viewingAssessment?.id === id) {
      setViewMode('list')
      setViewingAssessment(null)
    }
  }

  const generateAssessmentText = (assessment: ParentAssessment) => {
    const effectivenessLabels = {
      'very-effective': 'Very Effective',
      'somewhat-effective': 'Somewhat Effective',
      'not-effective': 'Not Effective',
      'never-tried': 'Never Tried'
    }

    let text = `PARENT/CAREGIVER EBP ASSESSMENT
Generated: ${new Date().toLocaleDateString('en-IE')}

=== CHILD INFORMATION ===
Child Name: ${assessment.childName}
Age: ${assessment.childAge || 'Not specified'}
Completed By: ${assessment.parentName}
Relationship: ${assessment.relationship || 'Not specified'}

=== EBP RATINGS & FEEDBACK ===

`

    ebpsByCategory.forEach(catGroup => {
      const categoryRatings = assessment.ratings.filter(r =>
        catGroup.ebps.some(e => e.id === r.ebpId) && r.effectiveness
      )
      
      if (categoryRatings.length > 0) {
        text += `\n${catGroup.category.toUpperCase()} PRACTICES:\n${'='.repeat(50)}\n`
        
        categoryRatings.forEach(rating => {
          const ebp = ebps.find(e => e.id === rating.ebpId)
          if (!ebp) return
          
          text += `\n${ebp.title}\n`
          text += `Effectiveness: ${effectivenessLabels[rating.effectiveness]}\n`
          if (rating.context) text += `Context: ${rating.context}\n`
          if (rating.notes) text += `Notes: ${rating.notes}\n`
        })
      }
    })

    return text
  }

  const exportAssessment = (assessment: ParentAssessment) => {
    const assessmentText = generateAssessmentText(assessment)
    const blob = new Blob([assessmentText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `parent-assessment-${assessment.childName}-${Date.now()}.txt`
    a.click()
    URL.revokeObjectURL(url)
    toast.success('Assessment exported successfully')
  }

  const emailAssessment = (assessment: ParentAssessment) => {
    const assessmentText = generateAssessmentText(assessment)
    const subject = `Parent/Caregiver EBP Assessment: ${assessment.childName}`
    openEmailClient(subject, assessmentText)
    toast.success('Opening email client...')
  }

  const printAssessment = (assessment: ParentAssessment) => {
    const effectivenessLabels = {
      'very-effective': 'Very Effective',
      'somewhat-effective': 'Somewhat Effective',
      'not-effective': 'Not Effective',
      'never-tried': 'Never Tried'
    }

    const sections: PrintSection[] = [
      {
        title: 'Child Information',
        content: [
          { label: 'Child Name', value: assessment.childName },
          { label: 'Age', value: assessment.childAge || 'Not specified' },
          { label: 'Completed By', value: assessment.parentName },
          { label: 'Relationship', value: assessment.relationship || 'Not specified' },
          { label: 'Assessment Date', value: new Date(assessment.timestamp).toLocaleDateString('en-IE', { day: 'numeric', month: 'long', year: 'numeric' }) }
        ]
      }
    ]

    ebpsByCategory.forEach(catGroup => {
      const categoryRatings = assessment.ratings.filter(r =>
        catGroup.ebps.some(e => e.id === r.ebpId) && r.effectiveness
      )
      
      if (categoryRatings.length > 0) {
        let categoryContent = ''
        
        categoryRatings.forEach(rating => {
          const ebp = ebps.find(e => e.id === rating.ebpId)
          if (!ebp) return
          
          categoryContent += `<div class="list-item">
            <div class="list-item-title">${ebp.title}</div>
            <div class="list-item-content">
              <strong>Effectiveness:</strong> <span class="badge ${rating.effectiveness === 'very-effective' ? 'success' : rating.effectiveness === 'somewhat-effective' ? 'warning' : ''}">${effectivenessLabels[rating.effectiveness]}</span><br>
              ${rating.context ? `<strong>Context:</strong> ${rating.context}<br>` : ''}
              ${rating.notes ? `<strong>Notes:</strong> ${rating.notes}` : ''}
            </div>
          </div>`
        })
        
        sections.push({
          title: `${catGroup.category} Practices`,
          content: categoryContent
        })
      }
    })

    openPrintPreview({
      title: 'Parent/Caregiver EBP Assessment',
      subtitle: `${assessment.childName} • Generated ${new Date().toLocaleDateString('en-IE')}`,
      sections,
      footer: 'Irish EBP Navigator • Parent/Caregiver Assessment Report'
    })
    toast.success('Opening print preview...')
  }

  const progressPercentage = currentStep === 0 
    ? 0 
    : ((currentCategory + 1) / ebpsByCategory.length) * 100

  if (viewMode === 'view' && viewingAssessment) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <Button variant="outline" onClick={() => {
            setViewMode('list')
            setViewingAssessment(null)
          }}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to List
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => printAssessment(viewingAssessment)}>
              <Printer className="w-4 h-4 mr-2" />
              Print
            </Button>
            <Button variant="outline" onClick={() => emailAssessment(viewingAssessment)}>
              <EnvelopeSimple className="w-4 h-4 mr-2" />
              Email
            </Button>
            <Button variant="outline" onClick={() => exportAssessment(viewingAssessment)}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Assessment Overview</CardTitle>
            <CardDescription>
              Completed on {new Date(viewingAssessment.timestamp).toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-muted-foreground">Child Name</Label>
                <p className="font-medium">{viewingAssessment.childName}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Age</Label>
                <p className="font-medium">{viewingAssessment.childAge || 'Not specified'}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Parent/Caregiver</Label>
                <p className="font-medium">{viewingAssessment.parentName}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Relationship</Label>
                <p className="font-medium">{viewingAssessment.relationship || 'Not specified'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h3 className="font-semibold">EBP Ratings by Category</h3>
          {ebpsByCategory.map(catGroup => {
            const categoryRatings = viewingAssessment.ratings.filter(r =>
              catGroup.ebps.some(e => e.id === r.ebpId)
            )
            
            if (categoryRatings.length === 0) return null

            return (
              <Card key={catGroup.category}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Badge className={catGroup.color}>{catGroup.category}</Badge>
                    <CardTitle className="text-lg">{catGroup.category} Practices</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {categoryRatings.map(rating => {
                    const ebp = ebps.find(e => e.id === rating.ebpId)
                    if (!ebp) return null

                    const effectivenessLabels = {
                      'very-effective': { label: 'Very Effective', color: 'bg-green-100 text-green-800' },
                      'somewhat-effective': { label: 'Somewhat Effective', color: 'bg-yellow-100 text-yellow-800' },
                      'not-effective': { label: 'Not Effective', color: 'bg-red-100 text-red-800' },
                      'never-tried': { label: 'Never Tried', color: 'bg-gray-100 text-gray-800' }
                    }

                    const effectivenessInfo = rating.effectiveness 
                      ? effectivenessLabels[rating.effectiveness]
                      : null

                    return (
                      <div key={rating.ebpId} className="border-l-4 border-accent/20 pl-4 space-y-2">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h4 className="font-medium">{ebp.title}</h4>
                            <p className="text-sm text-muted-foreground">{ebp.description}</p>
                          </div>
                          {effectivenessInfo && (
                            <Badge className={effectivenessInfo.color}>
                              {effectivenessInfo.label}
                            </Badge>
                          )}
                        </div>
                        {rating.context && (
                          <div>
                            <Label className="text-xs text-muted-foreground">Where/When Used:</Label>
                            <p className="text-sm">{rating.context}</p>
                          </div>
                        )}
                        {rating.notes && (
                          <div>
                            <Label className="text-xs text-muted-foreground">Additional Notes:</Label>
                            <p className="text-sm">{rating.notes}</p>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    )
  }

  if (viewMode === 'list') {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Tools
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Parent/Caregiver EBP Assessment</CardTitle>
            <CardDescription>
              Help school staff understand what works for your child by sharing your experiences with the 28 evidence-based practices
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted p-4 rounded border border-border">
              <div className="flex gap-3">
                <Info className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <div className="space-y-2 text-sm">
                  <p className="font-medium">About This Assessment</p>
                  <p className="text-muted-foreground">
                    This tool allows parents and caregivers to share valuable insights about what strategies work 
                    (or don't work) for their child at home and in other settings. Your input helps teachers and 
                    SNAs create more effective, personalized support plans.
                  </p>
                  <p className="text-muted-foreground">
                    The assessment covers all 28 evidence-based practices. You can complete it all at once or save 
                    progress and return later. Once completed, school staff can access your insights when planning 
                    daily schedules and supports.
                  </p>
                </div>
              </div>
            </div>

            <Button onClick={() => setViewMode('form')} className="w-full">
              Start New Assessment
            </Button>
          </CardContent>
        </Card>

        {savedAssessments && savedAssessments.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Saved Assessments</CardTitle>
              <CardDescription>
                {savedAssessments.length} assessment{savedAssessments.length !== 1 ? 's' : ''} completed
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {savedAssessments.map(assessment => (
                <div
                  key={assessment.id}
                  className="border-2 border-border p-4 rounded hover:bg-secondary transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="font-medium">{assessment.childName}</h4>
                      <p className="text-sm text-muted-foreground">
                        By {assessment.parentName} • {new Date(assessment.timestamp).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {assessment.ratings.filter(r => r.effectiveness).length} of {assessment.ratings.length} EBPs rated
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setViewingAssessment(assessment)
                          setViewMode('view')
                        }}
                      >
                        View Details
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteAssessment(assessment.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={() => {
          setViewMode('list')
          resetForm()
        }}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Cancel
        </Button>
        <div className="text-sm text-muted-foreground">
          Step {currentStep + 1} of {ebpsByCategory.length + 2}
        </div>
      </div>

      <div className="space-y-2">
        <Progress value={progressPercentage} />
        <p className="text-xs text-muted-foreground text-center">
          {Math.round(progressPercentage)}% complete
        </p>
      </div>

      {currentStep === 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Assessment Information</CardTitle>
            <CardDescription>
              Let's start with some basic information about your child and who is completing this assessment
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="child-name">Child's Name *</Label>
              <Input
                id="child-name"
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                placeholder="Enter child's name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="child-age">Child's Age (Optional)</Label>
              <Input
                id="child-age"
                value={childAge}
                onChange={(e) => setChildAge(e.target.value)}
                placeholder="e.g., 7 years"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="parent-name">Your Name *</Label>
              <Input
                id="parent-name"
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="relationship">Relationship to Child (Optional)</Label>
              <Input
                id="relationship"
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
                placeholder="e.g., Mother, Father, Guardian, Grandparent"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="completed-by">Completed By (Optional)</Label>
              <Input
                id="completed-by"
                value={completedBy}
                onChange={(e) => setCompletedBy(e.target.value)}
                placeholder="e.g., Both parents together, With support from teacher"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                onClick={() => setCurrentStep(1)}
                disabled={!childName.trim() || !parentName.trim()}
                className="w-full"
              >
                Continue to Assessment
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep > 0 && currentStep <= ebpsByCategory.length && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Badge className={ebpsByCategory[currentCategory].color}>
                {ebpsByCategory[currentCategory].category}
              </Badge>
              <CardTitle>{ebpsByCategory[currentCategory].category} Practices</CardTitle>
            </div>
            <CardDescription>
              Rate your experience with these {ebpsByCategory[currentCategory].ebps.length} practices. 
              It's okay if you haven't tried some of them.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {ebpsByCategory[currentCategory].ebps.map(ebp => {
              const rating = ratings.find(r => r.ebpId === ebp.id)
              if (!rating) return null

              return (
                <div key={ebp.id} className="border-2 border-border p-4 rounded space-y-4">
                  <div>
                    <h4 className="font-medium mb-1">{ebp.title}</h4>
                    <p className="text-sm text-muted-foreground">{ebp.description}</p>
                  </div>

                  <div className="space-y-3">
                    <Label>How effective is this practice for your child?</Label>
                    <RadioGroup
                      value={rating.effectiveness}
                      onValueChange={(value) => handleRatingChange(ebp.id, 'effectiveness', value)}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="very-effective" id={`${ebp.id}-very`} />
                        <Label htmlFor={`${ebp.id}-very`} className="font-normal cursor-pointer">
                          Very Effective - Works really well for my child
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="somewhat-effective" id={`${ebp.id}-some`} />
                        <Label htmlFor={`${ebp.id}-some`} className="font-normal cursor-pointer">
                          Somewhat Effective - Sometimes works, depends on situation
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="not-effective" id={`${ebp.id}-not`} />
                        <Label htmlFor={`${ebp.id}-not`} className="font-normal cursor-pointer">
                          Not Effective - Doesn't work well for my child
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="never-tried" id={`${ebp.id}-never`} />
                        <Label htmlFor={`${ebp.id}-never`} className="font-normal cursor-pointer">
                          Never Tried - Haven't used this practice
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {rating.effectiveness && rating.effectiveness !== 'never-tried' && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor={`${ebp.id}-context`}>Where or when do you use this? (Optional)</Label>
                        <Input
                          id={`${ebp.id}-context`}
                          value={rating.context}
                          onChange={(e) => handleRatingChange(ebp.id, 'context', e.target.value)}
                          placeholder="e.g., At bedtime, During homework, When out shopping"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`${ebp.id}-notes`}>Additional notes (Optional)</Label>
                        <Textarea
                          id={`${ebp.id}-notes`}
                          value={rating.notes}
                          onChange={(e) => handleRatingChange(ebp.id, 'notes', e.target.value)}
                          placeholder="What specifically works well or doesn't work? Any tips for teachers?"
                          rows={3}
                        />
                      </div>
                    </>
                  )}
                </div>
              )
            })}

            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  if (currentStep > 1) {
                    setCurrentStep(prev => prev - 1)
                    setCurrentCategory(prev => prev - 1)
                  } else {
                    setCurrentStep(0)
                  }
                }}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              <Button
                onClick={() => {
                  if (currentStep < ebpsByCategory.length) {
                    setCurrentStep(prev => prev + 1)
                    setCurrentCategory(prev => prev + 1)
                  } else {
                    setCurrentStep(prev => prev + 1)
                  }
                }}
                className="flex-1"
              >
                {currentStep < ebpsByCategory.length ? 'Next Category' : 'Review & Save'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === ebpsByCategory.length + 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Review & Save Assessment</CardTitle>
            <CardDescription>
              Review your responses and save the assessment for school staff to access
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-muted p-4 rounded space-y-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Child Name</Label>
                  <p className="font-medium">{childName}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Age</Label>
                  <p className="font-medium">{childAge || 'Not specified'}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Your Name</Label>
                  <p className="font-medium">{parentName}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Relationship</Label>
                  <p className="font-medium">{relationship || 'Not specified'}</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Assessment Summary</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-green-50 rounded">
                  <p className="text-2xl font-bold text-green-800">
                    {ratings.filter(r => r.effectiveness === 'very-effective').length}
                  </p>
                  <p className="text-xs text-green-700">Very Effective</p>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded">
                  <p className="text-2xl font-bold text-yellow-800">
                    {ratings.filter(r => r.effectiveness === 'somewhat-effective').length}
                  </p>
                  <p className="text-xs text-yellow-700">Somewhat Effective</p>
                </div>
                <div className="text-center p-4 bg-red-50 rounded">
                  <p className="text-2xl font-bold text-red-800">
                    {ratings.filter(r => r.effectiveness === 'not-effective').length}
                  </p>
                  <p className="text-xs text-red-700">Not Effective</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded">
                  <p className="text-2xl font-bold text-gray-800">
                    {ratings.filter(r => r.effectiveness === 'never-tried').length}
                  </p>
                  <p className="text-xs text-gray-700">Never Tried</p>
                </div>
              </div>
            </div>

            <div className="bg-accent/5 p-4 rounded border border-accent/20">
              <div className="flex gap-3">
                <Info className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <div className="space-y-2 text-sm">
                  <p className="font-medium">Sharing with School Staff</p>
                  <p className="text-muted-foreground">
                    Once saved, this assessment will be available to authorized school staff (teachers, SNAs, 
                    school liaison) to help them create personalized daily schedules and support plans for 
                    your child. They will be able to see what strategies you've found effective.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setCurrentStep(ebpsByCategory.length)
                  setCurrentCategory(ebpsByCategory.length - 1)
                }}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              <Button onClick={handleSave} className="flex-1">
                <FloppyDisk className="w-4 h-4 mr-2" />
                Save Assessment
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
