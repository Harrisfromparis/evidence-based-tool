import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, X, Sparkle } from '@phosphor-icons/react'
import { toast } from 'sonner'
import { ActionButtons } from '@/components/ActionButtons'
import { NarrationControls } from '@/components/NarrationControls'

interface SocialNarrativeCreatorProps {
  onBack: () => void
}

interface SavedNarrative {
  id: string
  title: string
  situation: string
  narrative: string
  studentFriendlyNarrative?: string
  createdAt: string
}

export function SocialNarrativeCreator({ onBack }: SocialNarrativeCreatorProps) {
  const [situation, setSituation] = useState('')
  const [studentName, setStudentName] = useState('')
  const [narrative, setNarrative] = useState('')
  const [studentFriendlyNarrative, setStudentFriendlyNarrative] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isGeneratingStudentVersion, setIsGeneratingStudentVersion] = useState(false)
  const [savedNarratives, setSavedNarratives] = useKV<SavedNarrative[]>('social-narratives', [])

  const generateNarrative = async () => {
    if (!situation.trim()) {
      toast.error('Please describe the situation')
      return
    }

    setIsGenerating(true)
    try {
      const studentNameText = studentName ? `The student's name is: ${studentName}` : 'Use "I" statements from the student\'s perspective'
      
      const promptText = `You are an expert in creating social narratives (social stories) for autistic students following evidence-based practices.

Create a social narrative for this situation: ${situation}

${studentNameText}

Follow these guidelines:
- Write from the student's perspective using "I" statements
- Keep it brief (5-10 sentences)
- Include what happens, why it happens, and what the student can do
- Use clear, concrete language
- Be factually accurate and supportive
- Avoid pressuring conformity or masking distress
- Include coping strategies if appropriate
- Use UK English spelling
- If mentioning currency, use euros (€)

IMPORTANT ETHICAL PRINCIPLE: If an intervention would be considered unacceptable for a neurotypical student, it is unacceptable for a neurodivergent student. Dignity and autonomy are non-negotiable.

Format the narrative as readable text with line breaks between sentences.`

      const result = await window.spark.llm(promptText, 'gpt-4o')
      setNarrative(result)
      toast.success('Social narrative generated!')
    } catch (error) {
      toast.error('Failed to generate narrative')
    } finally {
      setIsGenerating(false)
    }
  }

  const generateStudentFriendlyVersion = async () => {
    if (!narrative.trim()) {
      toast.error('Please generate the educator version first')
      return
    }

    setIsGeneratingStudentVersion(true)
    try {
      const promptText = `You are an expert in creating student-friendly social narratives for autistic students.

Take this educator-focused social narrative and create a student-friendly version:

${narrative}

Create a simplified, student-friendly version following these guidelines:

STRUCTURE:
- Use very short sentences (5-10 words maximum per sentence)
- Use simple, concrete vocabulary appropriate for the student's reading level
- Break the narrative into clear sections with emoji headers:
  📍 What happens (describe the situation)
  ❓ Why it happens (simple explanation)
  💪 What I can do (student actions/coping strategies)
  ✅ It will be okay (affirmation)

LANGUAGE:
- Use present tense for current situations, future tense for upcoming events
- Avoid abstract concepts
- Use specific, concrete examples
- Include sensory details when helpful
- Keep each section to 2-4 sentences maximum
- Use UK English spelling
- If mentioning currency, use euros (€)

ETHICAL PRINCIPLES:
- If an intervention would be considered unacceptable for a neurotypical student, it is unacceptable for a neurodivergent student. Dignity and autonomy are non-negotiable.
- Validate feelings ("I might feel worried. That's okay.")
- Offer choices when possible
- Never demand emotional suppression
- Be truthful and factually accurate

Format with clear spacing between sections.`

      const result = await window.spark.llm(promptText, 'gpt-4o')
      setStudentFriendlyNarrative(result)
      toast.success('Student-friendly version generated!')
    } catch (error) {
      toast.error('Failed to generate student version')
    } finally {
      setIsGeneratingStudentVersion(false)
    }
  }

  const saveNarrative = () => {
    if (!narrative.trim() || !situation.trim()) {
      toast.error('Please generate a narrative first')
      return
    }

    const title = situation.length > 50 ? situation.substring(0, 50) + '...' : situation

    const newNarrative: SavedNarrative = {
      id: Date.now().toString(),
      title,
      situation,
      narrative,
      studentFriendlyNarrative: studentFriendlyNarrative || undefined,
      createdAt: new Date().toISOString()
    }

    setSavedNarratives((current) => [...(current || []), newNarrative])
    toast.success('Social narrative saved!')
  }

  const deleteNarrative = (id: string) => {
    setSavedNarratives((current) => (current || []).filter(n => n.id !== id))
    toast.success('Narrative deleted')
  }

  const resetForm = () => {
    setSituation('')
    setStudentName('')
    setNarrative('')
    setStudentFriendlyNarrative('')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Tools
        </Button>
      </div>

      <div>
        <h2 className="text-foreground mb-2">Social Narrative Creator</h2>
        <p className="text-muted-foreground">
          Generate personalised social narratives (social stories) for challenging situations using evidence-based format.
          Create both educator versions for planning and student-friendly versions with simplified language for direct student use.
        </p>
      </div>

      <Tabs defaultValue="create" className="w-full">
        <TabsList>
          <TabsTrigger value="create">Create New</TabsTrigger>
          <TabsTrigger value="saved">Saved Narratives ({(savedNarratives || []).length})</TabsTrigger>
          <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Describe the Situation</CardTitle>
              <CardDescription>
                What situation or challenge do you want to create a social narrative for? You'll be able to generate both educator and student-friendly versions.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="situation">Situation</Label>
                <Textarea
                  id="situation"
                  value={situation}
                  onChange={(e) => setSituation(e.target.value)}
                  placeholder="e.g., Going to assembly, Having a substitute teacher, Fire drill, Starting secondary school"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="student-name">Student Name (optional)</Label>
                <Input
                  id="student-name"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Leave blank to use 'I' statements"
                />
              </div>

              <Button 
                onClick={generateNarrative} 
                disabled={isGenerating || !situation}
                className="gap-2"
              >
                <Sparkle className="w-4 h-4" />
                {isGenerating ? 'Generating...' : 'Generate Social Narrative'}
              </Button>
            </CardContent>
          </Card>

          {narrative && (
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>Generated Social Narratives</CardTitle>
                    <CardDescription>Review and edit as needed before saving</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" onClick={resetForm}>
                    Start Over
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Tabs defaultValue="educator" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="educator">Educator Version</TabsTrigger>
                    <TabsTrigger value="student">Student-Friendly Version</TabsTrigger>
                  </TabsList>

                  <TabsContent value="educator" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>Educator Version</Label>
                        <NarrationControls text={narrative} variant="minimal" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Professional version for planning and coordination
                      </p>
                      <Textarea
                        value={narrative}
                        onChange={(e) => setNarrative(e.target.value)}
                        rows={12}
                        className="font-serif text-base leading-relaxed"
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="student" className="space-y-4 mt-4">
                    {studentFriendlyNarrative ? (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label>Student-Friendly Version</Label>
                          <NarrationControls 
                            text={studentFriendlyNarrative.replace(/📍|❓|💪|✅/g, '')} 
                            variant="minimal" 
                          />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Simplified version with clear structure and visuals for direct student use
                        </p>
                        <Textarea
                          value={studentFriendlyNarrative}
                          onChange={(e) => setStudentFriendlyNarrative(e.target.value)}
                          rows={16}
                          className="font-body text-lg leading-relaxed"
                        />
                      </div>
                    ) : (
                      <Card className="p-8 text-center">
                        <p className="text-muted-foreground mb-4">
                          Generate a student-friendly version with simplified language, clear structure, and emoji headers
                        </p>
                        <Button 
                          onClick={generateStudentFriendlyVersion}
                          disabled={isGeneratingStudentVersion}
                          className="gap-2"
                        >
                          <Sparkle className="w-4 h-4" />
                          {isGeneratingStudentVersion ? 'Generating...' : 'Generate Student Version'}
                        </Button>
                      </Card>
                    )}
                  </TabsContent>
                </Tabs>

                <Separator />

                <div className="flex flex-col gap-3">
                  <ActionButtons
                    content={`EDUCATOR VERSION:\n\n${narrative}${studentFriendlyNarrative ? `\n\n---\n\nSTUDENT-FRIENDLY VERSION:\n\n${studentFriendlyNarrative}` : ''}`}
                    title={`Social Narrative - ${situation.substring(0, 50)}`}
                    emailSubject={`Social Narrative - ${situation.substring(0, 50)}`}
                  />
                  <div className="flex gap-2">
                    <Button onClick={saveNarrative}>
                      Save {studentFriendlyNarrative ? 'Both Versions' : 'Narrative'}
                    </Button>
                    <Button variant="outline" onClick={generateNarrative} disabled={isGenerating}>
                      Regenerate Educator Version
                    </Button>
                    {studentFriendlyNarrative && (
                      <Button 
                        variant="outline" 
                        onClick={generateStudentFriendlyVersion} 
                        disabled={isGeneratingStudentVersion}
                      >
                        Regenerate Student Version
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="saved" className="space-y-4 mt-6">
          {(savedNarratives || []).length === 0 ? (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground">
                No saved narratives yet. Create one using the "Create New" tab.
              </p>
            </Card>
          ) : (
            <div className="space-y-4">
              {(savedNarratives || []).map((item) => (
                <Card key={item.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{item.title}</CardTitle>
                        <CardDescription>
                          Created {new Date(item.createdAt).toLocaleDateString('en-IE')}
                        </CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteNarrative(item.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-sm text-muted-foreground mb-2">Situation:</h4>
                        <p className="text-foreground">{item.situation}</p>
                      </div>

                      <Tabs defaultValue="educator" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger value="educator">Educator Version</TabsTrigger>
                          <TabsTrigger value="student" disabled={!item.studentFriendlyNarrative}>
                            Student Version {!item.studentFriendlyNarrative && '(Not Generated)'}
                          </TabsTrigger>
                        </TabsList>

                        <TabsContent value="educator" className="mt-4">
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-sm text-muted-foreground">Educator Narrative:</h4>
                              <NarrationControls text={item.narrative} variant="minimal" />
                            </div>
                            <p className="text-foreground whitespace-pre-wrap font-serif leading-relaxed">
                              {item.narrative}
                            </p>
                          </div>
                        </TabsContent>

                        <TabsContent value="student" className="mt-4">
                          {item.studentFriendlyNarrative ? (
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-semibold text-sm text-muted-foreground">Student-Friendly Narrative:</h4>
                                <NarrationControls 
                                  text={item.studentFriendlyNarrative.replace(/📍|❓|💪|✅/g, '')} 
                                  variant="minimal" 
                                />
                              </div>
                              <div className="text-foreground whitespace-pre-wrap font-body text-lg leading-relaxed bg-muted/30 p-4 rounded-md">
                                {item.studentFriendlyNarrative}
                              </div>
                            </div>
                          ) : (
                            <p className="text-muted-foreground text-center py-8">
                              No student-friendly version was generated for this narrative.
                            </p>
                          )}
                        </TabsContent>
                      </Tabs>

                      <ActionButtons
                        content={`EDUCATOR VERSION:\n\n${item.narrative}${item.studentFriendlyNarrative ? `\n\n---\n\nSTUDENT-FRIENDLY VERSION:\n\n${item.studentFriendlyNarrative}` : ''}`}
                        title={`Social Narrative - ${item.title}`}
                        emailSubject={`Social Narrative - ${item.title}`}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="guidelines" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Social Narrative Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Two Versions Available</h4>
                <ul className="space-y-2 text-muted-foreground ml-4">
                  <li>• <strong>Educator Version:</strong> Professional language for planning, coordination with staff, and parent communication</li>
                  <li>• <strong>Student-Friendly Version:</strong> Simplified language with emoji headers, shorter sentences, and clear structure designed for direct student use</li>
                  <li>• Generate both versions to support different communication contexts</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">When to Use Social Narratives</h4>
                <ul className="space-y-2 text-muted-foreground ml-4">
                  <li>• Preparing for new or challenging situations</li>
                  <li>• Clarifying social expectations or unwritten rules</li>
                  <li>• Reducing anxiety about upcoming events</li>
                  <li>• Teaching perspective-taking</li>
                  <li>• Supporting understanding of routines</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Key Elements</h4>
                <ul className="space-y-2 text-muted-foreground ml-4">
                  <li>• <strong>Descriptive:</strong> What happens, when, where, why</li>
                  <li>• <strong>Perspective:</strong> How others might think or feel</li>
                  <li>• <strong>Coaching:</strong> What the student can do or say</li>
                  <li>• <strong>Affirmative:</strong> Positive, supportive tone</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Student-Friendly Version Structure</h4>
                <ul className="space-y-2 text-muted-foreground ml-4">
                  <li>• <strong>📍 What happens:</strong> Clear description of the situation</li>
                  <li>• <strong>❓ Why it happens:</strong> Simple explanation without abstractions</li>
                  <li>• <strong>💪 What I can do:</strong> Concrete strategies and choices</li>
                  <li>• <strong>✅ It will be okay:</strong> Affirmation and reassurance</li>
                  <li>• Sentences limited to 5-10 words for maximum accessibility</li>
                  <li>• Sensory details included when helpful</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Ethical Considerations</h4>
                <ul className="space-y-2 text-muted-foreground ml-4">
                  <li>• <strong>Core principle:</strong> If an intervention would be considered unacceptable for a neurotypical student, it is unacceptable for a neurodivergent student. Dignity and autonomy are non-negotiable.</li>
                  <li>• Avoid narratives that pressure conformity ("I will be calm")</li>
                  <li>• Include student perspective and co-create when possible</li>
                  <li>• Be factually accurate - don't gaslight experiences</li>
                  <li>• Respect valid emotional responses</li>
                  <li>• Don't use to enforce adult convenience over wellbeing</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">How to Use</h4>
                <ul className="space-y-2 text-muted-foreground ml-4">
                  <li>• Read with student multiple times before the situation</li>
                  <li>• Use the student-friendly version for direct reading with students</li>
                  <li>• Share educator version with parents and support staff for context</li>
                  <li>• Make it available for student to reread independently</li>
                  <li>• Review together after the situation occurs</li>
                  <li>• Revise based on student feedback and effectiveness</li>
                  <li>• Fade use as student gains confidence</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
