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
import { ArrowLeft, Sparkle, Lightbulb, BookmarkSimple, Trash, Copy, Download, EnvelopeSimple, BookOpen } from '@phosphor-icons/react'
import { toast } from 'sonner'
import { ebps } from '@/lib/data'
import { trackEmailSent } from '@/lib/analytics'

interface EBPRecommendationEngineProps {
  onBack: () => void
  onNavigateToEBP?: (ebpId: string) => void
}

interface EBPRecommendation {
  ebpId: string
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

export function EBPRecommendationEngine({ onBack, onNavigateToEBP }: EBPRecommendationEngineProps) {
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
      const ebpLibraryInfo = ebps.map(ebp => `
${ebp.title} (ID: ${ebp.id})
Category: ${ebp.category}
Description: ${ebp.description}
When to use: ${ebp.whenToUse}
Related to: ${ebp.relatedEBPs.join(', ')}`).join('\n')

      const promptContent = `You are an expert in evidence-based practices for autism support. Analyze the following situation and recommend 3-5 most appropriate Evidence-Based Practices from the comprehensive 29-EBP library.

COMPREHENSIVE EBP LIBRARY:
${ebpLibraryInfo}

SITUATION DETAILS:
Student Situation: ${situation}
Primary Need Areas: ${selectedNeeds.join(', ')}
Current Challenges: ${challenges}
Desired Outcomes: ${desiredOutcomes || 'Not specified'}

For each recommended EBP, provide:
1. ebpId (use the exact ID from the library above, e.g., "antecedent-based-intervention")
2. ebpName (use the exact title from the library)
3. confidenceScore (1-100) indicating how well this EBP fits the situation
4. rationale (specific explanation of why this EBP is relevant to THIS situation, referencing the student's specific needs and challenges)
5. priority (choose: "Immediate", "Short-term", or "Long-term")
6. considerations (key points to keep in mind for this specific situation, including ethical considerations and practical implementation tips)

Provide 3-5 recommendations, ordered by confidence score (highest first).
Consider the EBP categories, relationships between EBPs, and when each should be used.
Prioritise EBPs that address the primary need areas and current challenges.

Format as JSON with key "recommendations" containing an array of objects with keys: ebpId, ebpName, confidenceScore, rationale, priority, considerations`

      const result = await spark.llm(promptContent, 'gpt-4o', true)
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
    trackEmailSent()
  }

  const viewEBPDetails = (ebpId: string) => {
    if (onNavigateToEBP) {
      onNavigateToEBP(ebpId)
    } else {
      toast.info('Enable EBP navigation to view full details')
    }
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
              <Card className="bg-accent/10 border-accent/20">
                <CardContent className="pt-4">
                  <div className="flex items-start gap-3">
                    <Sparkle className="text-accent mt-0.5" size={20} />
                    <div className="flex-1">
                      <p className="text-sm text-foreground">
                        These recommendations are generated from our comprehensive library of 29 evidence-based practices, 
                        considering each practice's category, purpose, relationships, and ethical considerations to provide 
                        context-specific guidance.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

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
                  {currentReport.recommendations.map((rec, idx) => {
                    const ebpDetails = ebps.find(e => e.id === rec.ebpId)
                    return (
                      <Card key={idx}>
                        <CardHeader>
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Lightbulb className="text-accent" />
                                <CardTitle className="text-lg">{rec.ebpName}</CardTitle>
                              </div>
                              <div className="flex flex-wrap gap-2 mb-2">
                                <Badge variant={getPriorityColor(rec.priority) as any}>
                                  {rec.priority}
                                </Badge>
                                <Badge variant="secondary">{rec.confidenceScore}% match</Badge>
                                {ebpDetails && (
                                  <Badge variant="outline">{ebpDetails.category}</Badge>
                                )}
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
                          {ebpDetails && ebpDetails.relatedEBPs.length > 0 && (
                            <div>
                              <h4 className="font-semibold text-sm mb-2">Related EBPs to consider:</h4>
                              <div className="flex flex-wrap gap-2">
                                {ebpDetails.relatedEBPs.slice(0, 3).map(relatedId => {
                                  const related = ebps.find(e => e.id === relatedId)
                                  return related ? (
                                    <Badge key={relatedId} variant="outline" className="text-xs">
                                      {related.title}
                                    </Badge>
                                  ) : null
                                })}
                              </div>
                            </div>
                          )}
                          {rec.ebpId && (
                            <div className="pt-2">
                              <Button 
                                onClick={() => viewEBPDetails(rec.ebpId)} 
                                variant="outline" 
                                size="sm"
                              >
                                <BookOpen className="mr-2" />
                                View Full EBP Details
                              </Button>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    )
                  })}
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
              Get AI-powered recommendations from our comprehensive library of 29 evidence-based practices, tailored to your specific situation. Each recommendation includes detailed rationale, implementation priorities, and ethical considerations.
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
