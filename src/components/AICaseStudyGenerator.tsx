import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ArrowLeft, Sparkle, Trash, BookmarkSimple, Copy, Download, EnvelopeSimple } from '@phosphor-icons/react'
import { toast } from 'sonner'
interface AICaseStudyGeneratorProps {
  onBack: () => void
}

interface GeneratedCaseStudy {
  id: string
  title: string
  ageRange: string
  setting: string
  challengeType: string
  studentBackground: string
  specificChallenges: string[]
  ebpsUsed: string[]
  implementation: string
  outcomes: string
  reflections: string
  createdAt: string
}

export function AICaseStudyGenerator({ onBack }: AICaseStudyGeneratorProps) {
  const [ageRange, setAgeRange] = useState('')
  const [setting, setSetting] = useState('')
  const [challengeType, setChallengeType] = useState('')
  const [specificSituation, setSpecificSituation] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedCaseStudy, setGeneratedCaseStudy] = useState<GeneratedCaseStudy | null>(null)
  const [savedCaseStudies, setSavedCaseStudies] = useKV<GeneratedCaseStudy[]>('ai-case-studies', [])
  const [viewMode, setViewMode] = useState<'generator' | 'saved' | 'viewing'>('generator')

  const generateCaseStudy = async () => {
    if (!ageRange || !setting || !challengeType) {
      toast.error('Please select age range, setting, and challenge type')
      return
    }

    setIsGenerating(true)

    try {
      const situationContext = specificSituation ? `\n\nSpecific context provided by teacher: ${specificSituation}` : ''
      
      const promptText = `You are an expert Irish educator specializing in autism support and evidence-based practices.

Generate a realistic, detailed case study based on these parameters:
- Age Range: ${ageRange}
- Setting: ${setting}
- Challenge Type: ${challengeType}${situationContext}

The case study should include:
1. A brief student background (anonymised, use pseudonym)
2. Specific challenges the student faces (3-5 bullet points)
3. Which Evidence-Based Practices (EBPs) were used (select 2-4 from the 29 approved autism EBPs - you may reference: Antecedent-Based Interventions, Augmentative and Alternative Communication, Cognitive Behavioral Strategies, Differential Reinforcement, Discrete Trial Teaching, Exercise and Movement, Extinction, Functional Behavior Assessment, Functional Communication Training, Modeling, Music Therapy, Naturalistic Intervention, Parent-Implemented Intervention, Peer-Mediated Instruction, Pivotal Response Training, Prompting, Reinforcement, Response Interruption/Redirection, Scripting, Self-Management, Social Narratives, Social Skills Training, Structured Work Systems, Task Analysis, Technology-Aided Instruction, Time Delay, Video Modeling, Virtual Reality, Visual Supports)
4. How the EBPs were implemented in practice (detailed paragraph)
5. Outcomes observed (paragraph)
6. Teacher reflections (paragraph)

Use Irish educational context (mention SNAs, mainstream/special schools, NCSE, etc. as appropriate).
Use respectful, neuro-affirming language throughout.
Use UK English spelling.
Format as JSON with these exact keys: title, studentBackground, specificChallenges (array), ebpsUsed (array), implementation, outcomes, reflections`

      const result = await window.spark.llm(promptText, 'gpt-4o', true)
      const parsed = JSON.parse(result)

      const caseStudy: GeneratedCaseStudy = {
        id: Date.now().toString(),
        title: parsed.title,
        ageRange,
        setting,
        challengeType,
        studentBackground: parsed.studentBackground,
        specificChallenges: parsed.specificChallenges,
        ebpsUsed: parsed.ebpsUsed,
        implementation: parsed.implementation,
        outcomes: parsed.outcomes,
        reflections: parsed.reflections,
        createdAt: new Date().toISOString()
      }

      setGeneratedCaseStudy(caseStudy)
      toast.success('Case study generated successfully!')
    } catch (error) {
      console.error('Generation error:', error)
      toast.error('Failed to generate case study. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const saveCaseStudy = () => {
    if (!generatedCaseStudy) return

    setSavedCaseStudies((current) => [generatedCaseStudy, ...(current || [])])
    toast.success('Case study saved!')
  }

  const deleteCaseStudy = (id: string) => {
    setSavedCaseStudies((current) => (current || []).filter(cs => cs.id !== id))
    toast.success('Case study deleted')
    if (generatedCaseStudy?.id === id) {
      setGeneratedCaseStudy(null)
      setViewMode('saved')
    }
  }

  const viewSavedCaseStudy = (caseStudy: GeneratedCaseStudy) => {
    setGeneratedCaseStudy(caseStudy)
    setViewMode('viewing')
  }

  const resetForm = () => {
    setAgeRange('')
    setSetting('')
    setChallengeType('')
    setSpecificSituation('')
    setGeneratedCaseStudy(null)
    setViewMode('generator')
  }

  const exportContent = `${generatedCaseStudy?.title || 'Case Study'}

AGE RANGE: ${generatedCaseStudy?.ageRange}
SETTING: ${generatedCaseStudy?.setting}
CHALLENGE TYPE: ${generatedCaseStudy?.challengeType}

STUDENT BACKGROUND:
${generatedCaseStudy?.studentBackground}

SPECIFIC CHALLENGES:
${generatedCaseStudy?.specificChallenges.map((c, i) => `${i + 1}. ${c}`).join('\n')}

EVIDENCE-BASED PRACTICES USED:
${generatedCaseStudy?.ebpsUsed.map((e, i) => `${i + 1}. ${e}`).join('\n')}

IMPLEMENTATION:
${generatedCaseStudy?.implementation}

OUTCOMES:
${generatedCaseStudy?.outcomes}

TEACHER REFLECTIONS:
${generatedCaseStudy?.reflections}

---
Generated: ${generatedCaseStudy?.createdAt ? new Date(generatedCaseStudy.createdAt).toLocaleDateString('en-IE') : ''}
AI-Generated Case Study | Autism and Me`

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(exportContent)
    toast.success('Case study copied to clipboard!')
  }

  const handleDownload = () => {
    const blob = new Blob([exportContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `case-study-${generatedCaseStudy?.title.toLowerCase().replace(/\s+/g, '-') || 'generated'}.txt`
    a.click()
    URL.revokeObjectURL(url)
    toast.success('Case study downloaded!')
  }

  const handleEmail = () => {
    const subject = `Case Study: ${generatedCaseStudy?.title || 'Generated'}`
    const body = encodeURIComponent(exportContent)
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${body}`
  }

  if (viewMode === 'saved') {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <Button
            onClick={() => setViewMode('generator')}
            variant="ghost"
            className="mb-6"
          >
            <ArrowLeft className="mr-2" />
            Back to Generator
          </Button>

          <Card>
            <CardHeader>
              <CardTitle>Saved AI-Generated Case Studies</CardTitle>
              <CardDescription>
                View and manage your custom case studies
              </CardDescription>
            </CardHeader>
            <CardContent>
              {(savedCaseStudies || []).length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No saved case studies yet. Generate your first one!
                </p>
              ) : (
                <ScrollArea className="h-[600px]">
                  <div className="space-y-4">
                    {(savedCaseStudies || []).map((cs) => (
                      <Card key={cs.id} className="hover:bg-muted/50 transition-colors">
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-semibold">{cs.title}</h3>
                                <Badge variant="secondary">AI-Generated</Badge>
                              </div>
                              <div className="flex flex-wrap gap-2 mb-2">
                                <Badge variant="outline">{cs.ageRange}</Badge>
                                <Badge variant="outline">{cs.setting}</Badge>
                                <Badge variant="outline">{cs.challengeType}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {cs.studentBackground}
                              </p>
                              <p className="text-xs text-muted-foreground mt-2">
                                Generated {new Date(cs.createdAt).toLocaleDateString('en-IE')}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => viewSavedCaseStudy(cs)}
                              >
                                View
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => deleteCaseStudy(cs.id)}
                              >
                                <Trash />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (generatedCaseStudy) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Button onClick={viewMode === 'viewing' ? () => setViewMode('saved') : resetForm} variant="ghost">
              <ArrowLeft className="mr-2" />
              {viewMode === 'viewing' ? 'Back to Saved' : 'Generate Another'}
            </Button>
            <Button onClick={() => setViewMode('saved')} variant="outline">
              View Saved ({(savedCaseStudies || []).length})
            </Button>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle>{generatedCaseStudy.title}</CardTitle>
                    <Badge variant="secondary">AI-Generated</Badge>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">{generatedCaseStudy.ageRange}</Badge>
                    <Badge variant="outline">{generatedCaseStudy.setting}</Badge>
                    <Badge variant="outline">{generatedCaseStudy.challengeType}</Badge>
                  </div>
                </div>
                {!(savedCaseStudies || []).find(cs => cs.id === generatedCaseStudy.id) && (
                  <Button onClick={saveCaseStudy} variant="outline">
                    <BookmarkSimple className="mr-2" />
                    Save
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">Student Background</h3>
                <p className="text-foreground leading-relaxed">{generatedCaseStudy.studentBackground}</p>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold text-lg mb-2">Specific Challenges</h3>
                <ul className="list-disc list-inside space-y-1">
                  {generatedCaseStudy.specificChallenges.map((challenge, index) => (
                    <li key={index} className="text-foreground">{challenge}</li>
                  ))}
                </ul>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold text-lg mb-2">Evidence-Based Practices Used</h3>
                <div className="flex flex-wrap gap-2">
                  {generatedCaseStudy.ebpsUsed.map((ebp, index) => (
                    <Badge key={index} variant="default">{ebp}</Badge>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold text-lg mb-2">Implementation</h3>
                <p className="text-foreground leading-relaxed">{generatedCaseStudy.implementation}</p>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold text-lg mb-2">Outcomes</h3>
                <p className="text-foreground leading-relaxed">{generatedCaseStudy.outcomes}</p>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold text-lg mb-2">Teacher Reflections</h3>
                <p className="text-foreground leading-relaxed">{generatedCaseStudy.reflections}</p>
              </div>

              <Separator />

              <div className="flex gap-2">
                <Button onClick={handleEmail}>
                  <EnvelopeSimple className="mr-2" />
                  Email
                </Button>
                <Button onClick={handleCopyToClipboard} variant="outline">
                  <Copy className="mr-2" />
                  Copy
                </Button>
                <Button onClick={handleDownload} variant="outline">
                  <Download className="mr-2" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Button onClick={onBack} variant="ghost">
            <ArrowLeft className="mr-2" />
            Back to Tools
          </Button>
          {(savedCaseStudies || []).length > 0 && (
            <Button onClick={() => setViewMode('saved')} variant="outline">
              View Saved ({(savedCaseStudies || []).length})
            </Button>
          )}
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sparkle className="text-accent" size={24} />
              <CardTitle>AI Case Study Generator</CardTitle>
            </div>
            <CardDescription>
              Generate custom, contextually relevant case studies that demonstrate evidence-based practices in specific situations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="age-range">Age Range</Label>
                <Select value={ageRange} onValueChange={setAgeRange}>
                  <SelectTrigger id="age-range">
                    <SelectValue placeholder="Select age range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Early Years (3-5)">Early Years (3-5)</SelectItem>
                    <SelectItem value="Primary School (5-12)">Primary School (5-12)</SelectItem>
                    <SelectItem value="Post-Primary (12-18)">Post-Primary (12-18)</SelectItem>
                    <SelectItem value="Young Adult (18+)">Young Adult (18+)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="setting">Setting</Label>
                <Select value={setting} onValueChange={setSetting}>
                  <SelectTrigger id="setting">
                    <SelectValue placeholder="Select setting" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mainstream School">Mainstream School</SelectItem>
                    <SelectItem value="Special School">Special School</SelectItem>
                    <SelectItem value="Special Class in Mainstream">Special Class in Mainstream</SelectItem>
                    <SelectItem value="Home Environment">Home Environment</SelectItem>
                    <SelectItem value="Community Setting">Community Setting</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="challenge-type">Challenge Type</Label>
                <Select value={challengeType} onValueChange={setChallengeType}>
                  <SelectTrigger id="challenge-type">
                    <SelectValue placeholder="Select challenge type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Communication">Communication</SelectItem>
                    <SelectItem value="Social Interaction">Social Interaction</SelectItem>
                    <SelectItem value="Sensory Processing">Sensory Processing</SelectItem>
                    <SelectItem value="Behaviour">Behaviour</SelectItem>
                    <SelectItem value="Executive Function">Executive Function</SelectItem>
                    <SelectItem value="Emotional Regulation">Emotional Regulation</SelectItem>
                    <SelectItem value="Learning & Attention">Learning & Attention</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="situation">Specific Situation (Optional)</Label>
                <Textarea
                  id="situation"
                  value={specificSituation}
                  onChange={(e) => setSpecificSituation(e.target.value)}
                  placeholder="Describe any specific context or concerns you'd like the case study to address..."
                  className="min-h-24"
                />
              </div>
            </div>

            <Button
              onClick={generateCaseStudy}
              disabled={isGenerating || !ageRange || !setting || !challengeType}
              className="w-full"
            >
              {isGenerating ? (
                <>Generating Case Study...</>
              ) : (
                <>
                  <Sparkle className="mr-2" />
                  Generate Case Study
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
