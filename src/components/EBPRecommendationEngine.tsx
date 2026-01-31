import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Progress } from '@/components/ui/progress'
import { ArrowLeft, Sparkle, Lightbulb, BookmarkSimple, Trash, Copy, Download, EnvelopeSimple } from '@phosphor-icons/react'
import { toast } from 'sonner'

interface EBPRecommendationEngineProps {
  onBack: () => void
}

interface EBPRecommendation {
  ebpName: string
  confidenceScore: number
  rationale: string
  priority: 'Immediate' | 'Short-term' | 'Long-term'
  considerations: string
}

interface RecommendationReport {
  id: string
  situation: string
  needAreas: string[]
  challenges: string
  desiredOutcomes: string
  recommendations: EBPRecommendation[]
  createdAt: string
}

const needAreaOptions = [
  'Communication',
  'Social Skills',
  'Sensory Processing',
  'Behaviour Management',
  'Learning & Attention',
  'Environment & Structure',
  'Emotional Regulation'
]

export function EBPRecommendationEngine({ onBack }: EBPRecommendationEngineProps) {
  const [situation, setSituation] = useState('')
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>([])
  const [challenges, setChallenges] = useState('')
  const [desiredOutcomes, setDesiredOutcomes] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [currentReport, setCurrentReport] = useState<RecommendationReport | null>(null)
  const [savedReports, setSavedReports] = useKV<RecommendationReport[]>('ebp-recommendations', [])
  const [viewMode, setViewMode] = useState<'generator' | 'saved' | 'viewing'>('generator')

  const toggleNeed = (need: string) => {
    setSelectedNeeds(prev =>
      prev.includes(need) ? prev.filter(n => n !== need) : [...prev, need]
    )
  }

  const generateRecommendations = async () => {
    if (!situation.trim() || selectedNeeds.length === 0 || !challenges.trim()) {
      toast.error('Please fill in situation, select at least one need area, and describe challenges')
      return
    }

    setIsGenerating(true)

    try {
      const promptText = `You are an expert in evidence-based practices for autism support. Analyze the following situation and recommend 3-5 most appropriate Evidence-Based Practices from the 29 approved autism EBPs.

Available EBPs: Antecedent-Based Interventions, Augmentative and Alternative Communication, Cognitive Behavioral Strategies, Differential Reinforcement, Discrete Trial Teaching, Exercise and Movement, Extinction, Functional Behavior Assessment, Functional Communication Training, Modeling, Music Therapy, Naturalistic Intervention, Parent-Implemented Intervention, Peer-Mediated Instruction, Pivotal Response Training, Prompting, Reinforcement, Response Interruption/Redirection, Scripting, Self-Management, Social Narratives, Social Skills Training, Structured Work Systems, Task Analysis, Technology-Aided Instruction, Time Delay, Video Modeling, Virtual Reality, Visual Supports

SITUATION DETAILS:
Student Situation: ${situation}
Primary Need Areas: ${selectedNeeds.join(', ')}
Current Challenges: ${challenges}
Desired Outcomes: ${desiredOutcomes || 'Not specified'}

For each recommended EBP, provide:
1. EBP name (from the list above)
2. Confidence score (1-100) indicating how well this EBP fits the situation
3. Specific rationale explaining why this EBP is relevant to THIS situation
4. Implementation priority: Immediate, Short-term, or Long-term
5. Key considerations for this specific situation

Provide 3-5 recommendations, ordered by confidence score (highest first).

Format as JSON with key "recommendations" containing an array of objects with keys: ebpName, confidenceScore, rationale, priority, considerations`

      const result = await window.spark.llm(promptText, 'gpt-4o', true)
      const parsed = JSON.parse(result)

      const report: RecommendationReport = {
        id: Date.now().toString(),
        situation,
        needAreas: selectedNeeds,
        challenges,
        desiredOutcomes,
        recommendations: parsed.recommendations,
        createdAt: new Date().toISOString()
      }

      setCurrentReport(report)
      toast.success('Recommendations generated successfully!')
    } catch (error) {
      console.error('Generation error:', error)
      toast.error('Failed to generate recommendations. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const saveReport = () => {
    if (!currentReport) return
    setSavedReports((current) => [currentReport, ...(current || [])])
    toast.success('Recommendation report saved!')
  }

  const deleteReport = (id: string) => {
    setSavedReports((current) => (current || []).filter(r => r.id !== id))
    toast.success('Report deleted')
    if (currentReport?.id === id) {
      setCurrentReport(null)
      setViewMode('saved')
    }
  }

  const viewSavedReport = (report: RecommendationReport) => {
    setCurrentReport(report)
    setViewMode('viewing')
  }

  const resetForm = () => {
    setSituation('')
    setSelectedNeeds([])
    setChallenges('')
    setDesiredOutcomes('')
    setCurrentReport(null)
    setViewMode('generator')
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Immediate': return 'destructive'
      case 'Short-term': return 'default'
      case 'Long-term': return 'secondary'
      default: return 'outline'
    }
  }

  const exportContent = currentReport ? `EBP RECOMMENDATION REPORT

SITUATION:
${currentReport.situation}

PRIMARY NEED AREAS:
${currentReport.needAreas.join(', ')}

CURRENT CHALLENGES:
${currentReport.challenges}

DESIRED OUTCOMES:
${currentReport.desiredOutcomes || 'Not specified'}

RECOMMENDATIONS:

${currentReport.recommendations.map((rec, idx) => `
${idx + 1}. ${rec.ebpName}
   Confidence: ${rec.confidenceScore}%
   Priority: ${rec.priority}
   
   Rationale:
   ${rec.rationale}
   
   Considerations:
   ${rec.considerations}
`).join('\n')}

---
Generated: ${new Date(currentReport.createdAt).toLocaleDateString('en-IE')}
AI-Powered EBP Recommendations | Autism and Me` : ''

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(exportContent)
    toast.success('Report copied to clipboard!')
  }

  const handleDownload = () => {
    const blob = new Blob([exportContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ebp-recommendations-${currentReport?.id || 'report'}.txt`
    a.click()
    URL.revokeObjectURL(url)
    toast.success('Report downloaded!')
  }

  const handleEmail = () => {
    const subject = 'EBP Recommendation Report'
    const body = encodeURIComponent(exportContent)
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${body}`
  }

  if (viewMode === 'saved') {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <Button onClick={() => setViewMode('generator')} variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2" />
            Back to Generator
          </Button>

          <Card>
            <CardHeader>
              <CardTitle>Saved Recommendation Reports</CardTitle>
              <CardDescription>View and manage your EBP recommendation reports</CardDescription>
            </CardHeader>
            <CardContent>
              {(savedReports || []).length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No saved reports yet. Generate your first one!
                </p>
              ) : (
                <ScrollArea className="h-[600px]">
                  <div className="space-y-4">
                    {(savedReports || []).map((report) => (
                      <Card key={report.id} className="hover:bg-muted/50 transition-colors">
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <p className="font-semibold line-clamp-2 mb-2">{report.situation}</p>
                              <div className="flex flex-wrap gap-2 mb-2">
                                {report.needAreas.map(need => (
                                  <Badge key={need} variant="outline">{need}</Badge>
                                ))}
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {report.recommendations.length} recommendations
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                Generated {new Date(report.createdAt).toLocaleDateString('en-IE')}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" onClick={() => viewSavedReport(report)}>
                                View
                              </Button>
                              <Button size="sm" variant="ghost" onClick={() => deleteReport(report.id)}>
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

  if (currentReport) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Button onClick={viewMode === 'viewing' ? () => setViewMode('saved') : resetForm} variant="ghost">
              <ArrowLeft className="mr-2" />
              {viewMode === 'viewing' ? 'Back to Saved' : 'Generate Another'}
            </Button>
            <Button onClick={() => setViewMode('saved')} variant="outline">
              View Saved ({(savedReports || []).length})
            </Button>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle>EBP Recommendations</CardTitle>
                  <CardDescription className="mt-2">{currentReport.situation}</CardDescription>
                </div>
                {!(savedReports || []).find(r => r.id === currentReport.id) && (
                  <Button onClick={saveReport} variant="outline">
                    <BookmarkSimple className="mr-2" />
                    Save
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-sm mb-2">Primary Need Areas</h3>
                <div className="flex flex-wrap gap-2">
                  {currentReport.needAreas.map(need => (
                    <Badge key={need} variant="outline">{need}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-sm mb-2">Current Challenges</h3>
                <p className="text-foreground">{currentReport.challenges}</p>
              </div>

              {currentReport.desiredOutcomes && (
                <div>
                  <h3 className="font-semibold text-sm mb-2">Desired Outcomes</h3>
                  <p className="text-foreground">{currentReport.desiredOutcomes}</p>
                </div>
              )}

              <Separator />

              <div>
                <h3 className="font-semibold text-lg mb-4">Recommended Evidence-Based Practices</h3>
                <div className="space-y-6">
                  {currentReport.recommendations.map((rec, idx) => (
                    <Card key={idx}>
                      <CardHeader>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Lightbulb className="text-accent" />
                              <CardTitle className="text-lg">{rec.ebpName}</CardTitle>
                            </div>
                            <div className="flex gap-2">
                              <Badge variant={getPriorityColor(rec.priority) as any}>
                                {rec.priority}
                              </Badge>
                              <Badge variant="secondary">{rec.confidenceScore}% match</Badge>
                            </div>
                          </div>
                        </div>
                        <Progress value={rec.confidenceScore} className="mt-2" />
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-sm mb-1">Why this EBP is relevant:</h4>
                          <p className="text-foreground">{rec.rationale}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-1">Key considerations:</h4>
                          <p className="text-foreground">{rec.considerations}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
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
          {(savedReports || []).length > 0 && (
            <Button onClick={() => setViewMode('saved')} variant="outline">
              View Saved ({(savedReports || []).length})
            </Button>
          )}
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sparkle className="text-accent" size={24} />
              <CardTitle>EBP Recommendation Engine</CardTitle>
            </div>
            <CardDescription>
              Get AI-powered recommendations for the most relevant evidence-based practices for your specific situation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="situation">Describe the Student Situation</Label>
              <Textarea
                id="situation"
                value={situation}
                onChange={(e) => setSituation(e.target.value)}
                placeholder="Describe the student, their current environment, and the context you're working within..."
                className="min-h-24"
              />
            </div>

            <div>
              <Label className="mb-3 block">Primary Need Areas (select all that apply)</Label>
              <div className="grid grid-cols-2 gap-3">
                {needAreaOptions.map(need => (
                  <div key={need} className="flex items-center space-x-2">
                    <Checkbox
                      id={need}
                      checked={selectedNeeds.includes(need)}
                      onCheckedChange={() => toggleNeed(need)}
                    />
                    <label
                      htmlFor={need}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {need}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="challenges">Current Challenges</Label>
              <Textarea
                id="challenges"
                value={challenges}
                onChange={(e) => setChallenges(e.target.value)}
                placeholder="What specific challenges are you trying to address? What's not working currently?"
                className="min-h-24"
              />
            </div>

            <div>
              <Label htmlFor="outcomes">Desired Outcomes (Optional)</Label>
              <Textarea
                id="outcomes"
                value={desiredOutcomes}
                onChange={(e) => setDesiredOutcomes(e.target.value)}
                placeholder="What would success look like? What skills or behaviors would you like to see develop?"
                className="min-h-20"
              />
            </div>

            <Button
              onClick={generateRecommendations}
              disabled={isGenerating || !situation.trim() || selectedNeeds.length === 0 || !challenges.trim()}
              className="w-full"
            >
              {isGenerating ? (
                <>Analyzing Situation and Generating Recommendations...</>
              ) : (
                <>
                  <Sparkle className="mr-2" />
                  Generate Recommendations
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
