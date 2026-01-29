import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowLeft, ArrowRight, Check, FloppyDisk, Smiley, SmileyMeh, SmileySad, Heart, Warning } from '@phosphor-icons/react'
import { useKV } from '@github/spark/hooks'
import { toast } from 'sonner'
import { teachingApproaches } from '@/lib/data'

interface StudentInputProps {
  onBack: () => void
}

interface EBPFeedback {
  ebpName: string
  feeling: 'helpful' | 'neutral' | 'unhelpful' | ''
  triggers: string
  supports: string
  notes: string
}

interface StudentProfile {
  id: string
  timestamp: number
  studentName: string
  age: string
  class: string
  completedWith: string
  feedback: EBPFeedback[]
}

export function StudentInput({ onBack }: StudentInputProps) {
  const [savedProfiles, setSavedProfiles] = useKV<StudentProfile[]>('student-input-profiles', [])
  const [viewMode, setViewMode] = useState<'list' | 'form' | 'view'>('list')
  const [viewingProfile, setViewingProfile] = useState<StudentProfile | null>(null)
  const [currentStep, setCurrentStep] = useState(0)

  const [studentName, setStudentName] = useState('')
  const [age, setAge] = useState('')
  const [studentClass, setStudentClass] = useState('')
  const [completedWith, setCompletedWith] = useState('')

  const [feedback, setFeedback] = useState<EBPFeedback[]>(
    teachingApproaches.map(ebp => ({
      ebpName: ebp,
      feeling: '',
      triggers: '',
      supports: '',
      notes: ''
    }))
  )

  const [currentEBPIndex, setCurrentEBPIndex] = useState(0)

  const totalSteps = 2 + teachingApproaches.length
  const progress = ((currentStep + 1) / totalSteps) * 100

  const handleSave = () => {
    if (!studentName.trim()) {
      toast.error('Please enter student name')
      return
    }

    const newProfile: StudentProfile = {
      id: `student-${Date.now()}`,
      timestamp: Date.now(),
      studentName,
      age,
      class: studentClass,
      completedWith,
      feedback
    }

    setSavedProfiles(current => [...(current || []), newProfile])
    toast.success('Student input saved successfully')
    setViewMode('list')
    resetForm()
  }

  const resetForm = () => {
    setStudentName('')
    setAge('')
    setStudentClass('')
    setCompletedWith('')
    setFeedback(
      teachingApproaches.map(ebp => ({
        ebpName: ebp,
        feeling: '',
        triggers: '',
        supports: '',
        notes: ''
      }))
    )
    setCurrentStep(0)
    setCurrentEBPIndex(0)
  }

  const updateFeedback = (index: number, field: keyof EBPFeedback, value: string) => {
    setFeedback(current =>
      current.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    )
  }

  const handleNext = () => {
    if (currentStep === 0) {
      if (!studentName.trim()) {
        toast.error('Please enter student name')
        return
      }
    }
    
    if (currentStep >= 1 && currentStep < 1 + teachingApproaches.length) {
      setCurrentEBPIndex(prev => prev + 1)
    }
    
    setCurrentStep(prev => prev + 1)
  }

  const handlePrevious = () => {
    if (currentStep > 1 && currentStep <= 1 + teachingApproaches.length) {
      setCurrentEBPIndex(prev => prev - 1)
    }
    setCurrentStep(prev => prev - 1)
  }

  const handleViewProfile = (profile: StudentProfile) => {
    setViewingProfile(profile)
    setViewMode('view')
  }

  const handleDeleteProfile = (id: string) => {
    setSavedProfiles(current => (current || []).filter(p => p.id !== id))
    toast.success('Profile deleted')
  }

  if (viewMode === 'view' && viewingProfile) {
    const helpfulEBPs = viewingProfile.feedback.filter(f => f.feeling === 'helpful')
    const unhelpfulEBPs = viewingProfile.feedback.filter(f => f.feeling === 'unhelpful')
    const neutralEBPs = viewingProfile.feedback.filter(f => f.feeling === 'neutral')

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setViewMode('list')}>
            <ArrowLeft className="mr-2" />
            Back to List
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{viewingProfile.studentName}'s Voice</CardTitle>
            <CardDescription>
              Completed on {new Date(viewingProfile.timestamp).toLocaleDateString()}
              {viewingProfile.completedWith && ` with ${viewingProfile.completedWith}`}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Age:</span>
                <span className="ml-2 text-foreground">{viewingProfile.age || 'Not specified'}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Class:</span>
                <span className="ml-2 text-foreground">{viewingProfile.class || 'Not specified'}</span>
              </div>
            </div>

            <Tabs defaultValue="helpful" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="helpful">
                  <Heart className="mr-2 w-4 h-4" />
                  Helpful ({helpfulEBPs.length})
                </TabsTrigger>
                <TabsTrigger value="unhelpful">
                  <Warning className="mr-2 w-4 h-4" />
                  Unhelpful ({unhelpfulEBPs.length})
                </TabsTrigger>
                <TabsTrigger value="neutral">
                  <SmileyMeh className="mr-2 w-4 h-4" />
                  Neutral ({neutralEBPs.length})
                </TabsTrigger>
                <TabsTrigger value="all">
                  All ({viewingProfile.feedback.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="helpful" className="space-y-4 mt-6">
                {helpfulEBPs.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No helpful strategies marked</p>
                ) : (
                  helpfulEBPs.map((item, idx) => (
                    <Card key={idx} className="bg-green-50 border-green-200">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Heart className="w-5 h-5 text-green-600" />
                          {item.ebpName}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {item.triggers && (
                          <div>
                            <Label className="text-foreground font-semibold">What makes this challenging:</Label>
                            <p className="text-sm mt-1">{item.triggers}</p>
                          </div>
                        )}
                        {item.supports && (
                          <div>
                            <Label className="text-foreground font-semibold">What helps me:</Label>
                            <p className="text-sm mt-1">{item.supports}</p>
                          </div>
                        )}
                        {item.notes && (
                          <div>
                            <Label className="text-foreground font-semibold">My thoughts:</Label>
                            <p className="text-sm mt-1">{item.notes}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>

              <TabsContent value="unhelpful" className="space-y-4 mt-6">
                {unhelpfulEBPs.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No unhelpful strategies marked</p>
                ) : (
                  unhelpfulEBPs.map((item, idx) => (
                    <Card key={idx} className="bg-red-50 border-red-200">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Warning className="w-5 h-5 text-red-600" />
                          {item.ebpName}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {item.triggers && (
                          <div>
                            <Label className="text-foreground font-semibold">What makes this hard:</Label>
                            <p className="text-sm mt-1">{item.triggers}</p>
                          </div>
                        )}
                        {item.supports && (
                          <div>
                            <Label className="text-foreground font-semibold">What might help instead:</Label>
                            <p className="text-sm mt-1">{item.supports}</p>
                          </div>
                        )}
                        {item.notes && (
                          <div>
                            <Label className="text-foreground font-semibold">My thoughts:</Label>
                            <p className="text-sm mt-1">{item.notes}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>

              <TabsContent value="neutral" className="space-y-4 mt-6">
                {neutralEBPs.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No neutral strategies marked</p>
                ) : (
                  neutralEBPs.map((item, idx) => (
                    <Card key={idx}>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <SmileyMeh className="w-5 h-5" />
                          {item.ebpName}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {item.triggers && (
                          <div>
                            <Label className="text-foreground font-semibold">Challenges:</Label>
                            <p className="text-sm mt-1">{item.triggers}</p>
                          </div>
                        )}
                        {item.supports && (
                          <div>
                            <Label className="text-foreground font-semibold">Supports:</Label>
                            <p className="text-sm mt-1">{item.supports}</p>
                          </div>
                        )}
                        {item.notes && (
                          <div>
                            <Label className="text-foreground font-semibold">Notes:</Label>
                            <p className="text-sm mt-1">{item.notes}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>

              <TabsContent value="all" className="space-y-4 mt-6">
                {viewingProfile.feedback.map((item, idx) => {
                  const bgColor = item.feeling === 'helpful' ? 'bg-green-50 border-green-200' : 
                                  item.feeling === 'unhelpful' ? 'bg-red-50 border-red-200' : 
                                  item.feeling === 'neutral' ? 'bg-gray-50' : 'bg-background'
                  
                  const icon = item.feeling === 'helpful' ? <Heart className="w-5 h-5 text-green-600" /> :
                               item.feeling === 'unhelpful' ? <Warning className="w-5 h-5 text-red-600" /> :
                               item.feeling === 'neutral' ? <SmileyMeh className="w-5 h-5" /> :
                               null

                  return (
                    <Card key={idx} className={bgColor}>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          {icon}
                          {item.ebpName}
                        </CardTitle>
                      </CardHeader>
                      {(item.triggers || item.supports || item.notes) && (
                        <CardContent className="space-y-3">
                          {item.triggers && (
                            <div>
                              <Label className="text-foreground font-semibold">Challenges/Triggers:</Label>
                              <p className="text-sm mt-1">{item.triggers}</p>
                            </div>
                          )}
                          {item.supports && (
                            <div>
                              <Label className="text-foreground font-semibold">Supports:</Label>
                              <p className="text-sm mt-1">{item.supports}</p>
                            </div>
                          )}
                          {item.notes && (
                            <div>
                              <Label className="text-foreground font-semibold">Notes:</Label>
                              <p className="text-sm mt-1">{item.notes}</p>
                            </div>
                          )}
                        </CardContent>
                      )}
                    </Card>
                  )
                })}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (viewMode === 'form') {
    const currentEBP = currentStep >= 2 ? feedback[currentEBPIndex] : null

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={() => { setViewMode('list'); resetForm(); }}>
            <ArrowLeft className="mr-2" />
            Cancel
          </Button>
          <div className="text-sm text-muted-foreground">
            Step {currentStep + 1} of {totalSteps}
          </div>
        </div>

        <Progress value={progress} className="h-2" />

        <Card>
          <CardHeader>
            <CardTitle>
              {currentStep === 0 && 'About You'}
              {currentStep === 1 && 'How to Use This Tool'}
              {currentStep >= 2 && currentStep < totalSteps - 1 && `Strategy ${currentEBPIndex + 1} of ${teachingApproaches.length}: ${currentEBP?.ebpName}`}
              {currentStep === totalSteps - 1 && 'Review & Save'}
            </CardTitle>
            <CardDescription>
              {currentStep === 0 && 'Tell us a little about yourself'}
              {currentStep === 1 && 'Understanding your experience'}
              {currentStep >= 2 && currentStep < totalSteps - 1 && 'Share your experience with this teaching approach'}
              {currentStep === totalSteps - 1 && 'Review your responses before saving'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {currentStep === 0 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="student-name">Your Name *</Label>
                  <Input
                    id="student-name"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Enter your name"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="age">Age (optional)</Label>
                    <Input
                      id="age"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="12"
                    />
                  </div>
                  <div>
                    <Label htmlFor="class">Class (optional)</Label>
                    <Input
                      id="class"
                      value={studentClass}
                      onChange={(e) => setStudentClass(e.target.value)}
                      placeholder="e.g., 6th Class"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="completed-with">Completed with (optional)</Label>
                  <Input
                    id="completed-with"
                    value={completedWith}
                    onChange={(e) => setCompletedWith(e.target.value)}
                    placeholder="e.g., Ms. Smith, Parent, SNA"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    If someone is helping you complete this, you can add their name here
                  </p>
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-4">
                <Card className="bg-accent/5 border-accent/20">
                  <CardContent className="pt-6 space-y-4">
                    <p className="text-foreground">
                      This tool helps you share your voice about different teaching strategies and supports 
                      used in school. Your teachers want to know what works for you and what doesn't.
                    </p>
                    <p className="text-foreground">
                      For each teaching approach, you'll be asked:
                    </p>
                    <ul className="space-y-2 ml-4 text-foreground">
                      <li className="flex items-start gap-2">
                        <Heart className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>How does this feel? (Helpful, Neutral, or Unhelpful)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Warning className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                        <span>What makes it challenging or stressful?</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Smiley className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span>What helps it work better for you?</span>
                      </li>
                    </ul>
                    <p className="text-sm text-muted-foreground italic">
                      You don't have to answer everything. Share what feels comfortable. You can skip any 
                      strategy by clicking "Next" without filling it in.
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}

            {currentStep >= 2 && currentStep < totalSteps - 1 && currentEBP && (
              <div className="space-y-6">
                <div className="bg-muted p-4 border border-border">
                  <h3 className="font-semibold mb-2">{currentEBP.ebpName}</h3>
                  <p className="text-sm text-muted-foreground">
                    This is a teaching or support strategy your teachers might use. How does this approach feel for you?
                  </p>
                </div>

                <div>
                  <Label className="text-base mb-3 block">How does this strategy feel?</Label>
                  <div className="grid grid-cols-3 gap-3">
                    <Button
                      variant={currentEBP.feeling === 'helpful' ? 'default' : 'outline'}
                      className="h-20 flex-col gap-2"
                      onClick={() => updateFeedback(currentEBPIndex, 'feeling', 'helpful')}
                    >
                      <Heart className="w-6 h-6" />
                      <span>Helpful</span>
                    </Button>
                    <Button
                      variant={currentEBP.feeling === 'neutral' ? 'default' : 'outline'}
                      className="h-20 flex-col gap-2"
                      onClick={() => updateFeedback(currentEBPIndex, 'feeling', 'neutral')}
                    >
                      <SmileyMeh className="w-6 h-6" />
                      <span>Neutral</span>
                    </Button>
                    <Button
                      variant={currentEBP.feeling === 'unhelpful' ? 'default' : 'outline'}
                      className="h-20 flex-col gap-2"
                      onClick={() => updateFeedback(currentEBPIndex, 'feeling', 'unhelpful')}
                    >
                      <SmileySad className="w-6 h-6" />
                      <span>Unhelpful</span>
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="triggers">What makes this challenging or causes stress? (optional)</Label>
                  <Textarea
                    id="triggers"
                    value={currentEBP.triggers}
                    onChange={(e) => updateFeedback(currentEBPIndex, 'triggers', e.target.value)}
                    placeholder="e.g., It's too loud, I don't understand what to do, It takes too long..."
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="supports">What would help this work better? (optional)</Label>
                  <Textarea
                    id="supports"
                    value={currentEBP.supports}
                    onChange={(e) => updateFeedback(currentEBPIndex, 'supports', e.target.value)}
                    placeholder="e.g., I need more time, Show me a picture first, Let me take a break..."
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="notes">Any other thoughts? (optional)</Label>
                  <Textarea
                    id="notes"
                    value={currentEBP.notes}
                    onChange={(e) => updateFeedback(currentEBPIndex, 'notes', e.target.value)}
                    placeholder="Anything else you want to share about this strategy..."
                    rows={2}
                  />
                </div>
              </div>
            )}

            {currentStep === totalSteps - 1 && (
              <div className="space-y-6">
                <Card className="bg-accent/5 border-accent/20">
                  <CardContent className="pt-6">
                    <p className="text-foreground">
                      Thank you for sharing your voice! Your responses will help your teachers understand 
                      what works best for you. Review your responses below, then click "Save" to finish.
                    </p>
                  </CardContent>
                </Card>

                <div className="space-y-4">
                  <div>
                    <Label className="text-base">Responses Summary</Label>
                    <div className="grid grid-cols-3 gap-3 mt-3">
                      <Card className="bg-green-50 border-green-200">
                        <CardContent className="pt-4 text-center">
                          <Heart className="w-8 h-8 text-green-600 mx-auto mb-2" />
                          <div className="text-2xl font-bold text-green-700">
                            {feedback.filter(f => f.feeling === 'helpful').length}
                          </div>
                          <div className="text-sm text-green-700">Helpful</div>
                        </CardContent>
                      </Card>
                      <Card className="bg-gray-50">
                        <CardContent className="pt-4 text-center">
                          <SmileyMeh className="w-8 h-8 mx-auto mb-2" />
                          <div className="text-2xl font-bold">
                            {feedback.filter(f => f.feeling === 'neutral').length}
                          </div>
                          <div className="text-sm">Neutral</div>
                        </CardContent>
                      </Card>
                      <Card className="bg-red-50 border-red-200">
                        <CardContent className="pt-4 text-center">
                          <SmileySad className="w-8 h-8 text-red-600 mx-auto mb-2" />
                          <div className="text-2xl font-bold text-red-700">
                            {feedback.filter(f => f.feeling === 'unhelpful').length}
                          </div>
                          <div className="text-sm text-red-700">Unhelpful</div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            <ArrowLeft className="mr-2" />
            Previous
          </Button>

          {currentStep < totalSteps - 1 ? (
            <Button onClick={handleNext}>
              Next
              <ArrowRight className="ml-2" />
            </Button>
          ) : (
            <Button onClick={handleSave}>
              <FloppyDisk className="mr-2" />
              Save
            </Button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="mr-2" />
          Back to Tools
        </Button>
      </div>

      <div>
        <h2 className="text-foreground mb-2">Student Voice: My Triggers & Supports</h2>
        <p className="text-muted-foreground">
          This tool allows students to share their own experiences with the 28 evidence-based practices. 
          Students can express what helps them, what causes stress, and what supports they need.
        </p>
      </div>

      <Card className="bg-accent/5 border-accent/20">
        <CardContent className="pt-6 space-y-3">
          <p className="text-foreground">
            <strong>Purpose:</strong> Center the student's voice in planning and decision-making. Students 
            are experts in their own experience and can provide valuable insights about what works and 
            what doesn't.
          </p>
          <p className="text-sm text-muted-foreground">
            This tool can be completed independently by older students, or with support from a trusted 
            adult (teacher, SNA, parent, counselor). The focus is on authentic student perspective, not 
            adult interpretation.
          </p>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Saved Student Profiles</h3>
        <Button onClick={() => setViewMode('form')}>
          <Smiley className="mr-2" />
          Start New Profile
        </Button>
      </div>

      {(!savedProfiles || savedProfiles.length === 0) ? (
        <Card>
          <CardContent className="pt-6 text-center py-12">
            <Smiley className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">
              No student profiles yet. Click "Start New Profile" to begin collecting student input.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {savedProfiles.map((profile) => {
            const helpfulCount = profile.feedback.filter(f => f.feeling === 'helpful').length
            const unhelpfulCount = profile.feedback.filter(f => f.feeling === 'unhelpful').length
            const neutralCount = profile.feedback.filter(f => f.feeling === 'neutral').length

            return (
              <Card key={profile.id} className="hover:bg-secondary transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl">{profile.studentName}</CardTitle>
                      <CardDescription>
                        Completed {new Date(profile.timestamp).toLocaleDateString()}
                        {profile.age && ` • Age ${profile.age}`}
                        {profile.class && ` • ${profile.class}`}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewProfile(profile)}
                      >
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteProfile(profile.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4 text-sm">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      <Heart className="w-3 h-3 mr-1" />
                      {helpfulCount} Helpful
                    </Badge>
                    <Badge variant="outline">
                      <SmileyMeh className="w-3 h-3 mr-1" />
                      {neutralCount} Neutral
                    </Badge>
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                      <SmileySad className="w-3 h-3 mr-1" />
                      {unhelpfulCount} Unhelpful
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
