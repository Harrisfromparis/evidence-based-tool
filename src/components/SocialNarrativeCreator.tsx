import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowLeft, X, Sparkle } from '@phosphor-icons/react'
import { toast } from 'sonner'

interface SocialNarrativeCreatorProps {
  onBack: () => void
}

interface SavedNarrative {
  id: string
  title: string
  situation: string
  narrative: string
  createdAt: string
}

export function SocialNarrativeCreator({ onBack }: SocialNarrativeCreatorProps) {
  const [situation, setSituation] = useState('')
  const [studentName, setStudentName] = useState('')
  const [narrative, setNarrative] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [savedNarratives, setSavedNarratives] = useKV<SavedNarrative[]>('social-narratives', [])

  const generateNarrative = async () => {
    if (!situation.trim()) {
      toast.error('Please describe the situation')
      return
    }

    setIsGenerating(true)
    try {
      const promptText = `You are an expert in creating social narratives (social stories) for autistic students following evidence-based practices.

Create a social narrative for this situation: ${situation}

${studentName ? `The student's name is: ${studentName}` : 'Use "I" statements from the student\'s perspective'}

Follow these guidelines:
- Write from the student's perspective using "I" statements
- Keep it brief (5-10 sentences)
- Include what happens, why it happens, and what the student can do
- Use clear, concrete language
- Be factually accurate and supportive
- Avoid pressuring conformity or masking distress
- Include coping strategies if appropriate

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
          Generate personalized social narratives (social stories) for challenging situations using evidence-based format.
          Social narratives help students understand what to expect and how to respond.
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
                What situation or challenge do you want to create a social narrative for?
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
                    <CardTitle>Generated Social Narrative</CardTitle>
                    <CardDescription>Review and edit as needed before saving</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" onClick={resetForm}>
                    Start Over
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={narrative}
                  onChange={(e) => setNarrative(e.target.value)}
                  rows={12}
                  className="font-serif text-base leading-relaxed"
                />

                <div className="flex gap-2">
                  <Button onClick={saveNarrative}>Save Narrative</Button>
                  <Button variant="outline" onClick={generateNarrative} disabled={isGenerating}>
                    Regenerate
                  </Button>
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
                          Created {new Date(item.createdAt).toLocaleDateString()}
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
                      <div>
                        <h4 className="font-semibold text-sm text-muted-foreground mb-2">Narrative:</h4>
                        <p className="text-foreground whitespace-pre-wrap font-serif leading-relaxed">
                          {item.narrative}
                        </p>
                      </div>
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
                <h4 className="font-semibold mb-2">Ethical Considerations</h4>
                <ul className="space-y-2 text-muted-foreground ml-4">
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
