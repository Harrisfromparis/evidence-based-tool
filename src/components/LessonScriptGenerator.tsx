import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ArrowLeft, FileText, Check, Circle, BookmarkSimple, Clock, Trash } from '@phosphor-icons/react'
import { teachingApproaches } from '@/lib/data'
import { toast } from 'sonner'
import { useKV } from '@github/spark/hooks'
import { ExportActions } from '@/components/ExportActions'

interface LessonScriptGeneratorProps {
  onBack: () => void
}

interface LessonScript {
  id: string
  title: string
  approaches: string[]
  learningObjectives: string[]
  activities: Array<{
    name: string
    duration: string
    description: string
  }>
  differentiation: string[]
  assessment: string[]
  teacherPrompts: string[]
  createdAt: string
}

export function LessonScriptGenerator({ onBack }: LessonScriptGeneratorProps) {
  const [lessonTitle, setLessonTitle] = useState('')
  const [selectedApproaches, setSelectedApproaches] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedScript, setGeneratedScript] = useState<LessonScript | null>(null)
  const [selectAll, setSelectAll] = useState(false)
  const [viewMode, setViewMode] = useState<'generator' | 'saved' | 'viewing'>('generator')
  const [savedScripts, setSavedScripts] = useKV<LessonScript[]>('lesson-scripts', [])

  const toggleApproach = (approach: string) => {
    setSelectedApproaches(prev =>
      prev.includes(approach)
        ? prev.filter(a => a !== approach)
        : [...prev, approach]
    )
  }

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedApproaches([])
      setSelectAll(false)
    } else {
      setSelectedApproaches([...teachingApproaches])
      setSelectAll(true)
    }
  }

  const generateScript = async () => {
    if (!lessonTitle.trim()) {
      toast.error('Please enter a lesson title')
      return
    }

    if (selectedApproaches.length === 0) {
      toast.error('Please select at least one teaching approach')
      return
    }

    setIsGenerating(true)

    try {
      const approachesList = selectedApproaches.join(', ')
      
      const promptText = `You are an expert Irish educator specializing in neuro-affirming, evidence-based autism support.

Generate a complete, classroom-ready lesson script for the following:

Lesson Title: ${lessonTitle}
Teaching Approaches to Integrate: ${approachesList}

Create a comprehensive lesson script that includes:
1. 3-5 clear learning objectives aligned with the Irish curriculum where appropriate
2. 4-6 structured activities with specific durations and detailed descriptions showing how the selected approaches are integrated
3. 4-6 differentiation strategies for supporting autistic students
4. 3-5 assessment methods (formative and summative)
5. 5-8 specific teacher prompts and questions to use during the lesson

The lesson should:
- Be neuro-affirming and respectful of autistic identity
- Integrate the selected teaching approaches naturally and explicitly
- Be practical and immediately usable in an Irish classroom
- Include specific timings (total lesson 40-60 minutes)
- Balance structure with flexibility
- Support both autistic and neurotypical students

Return ONLY valid JSON with this exact structure (no markdown, no code blocks):
{
  "learningObjectives": ["objective 1", "objective 2", "objective 3"],
  "activities": [
    {
      "name": "Activity Name",
      "duration": "10 minutes",
      "description": "Detailed description explaining what happens and which teaching approach is being used"
    }
  ],
  "differentiation": ["strategy 1", "strategy 2"],
  "assessment": ["method 1", "method 2"],
  "teacherPrompts": ["prompt 1", "prompt 2"]
}`

      const response = await window.spark.llm(promptText, 'gpt-4o', true)
      const parsedScript = JSON.parse(response)

      const script: LessonScript = {
        id: `script-${Date.now()}`,
        title: lessonTitle,
        approaches: selectedApproaches,
        learningObjectives: parsedScript.learningObjectives,
        activities: parsedScript.activities,
        differentiation: parsedScript.differentiation,
        assessment: parsedScript.assessment,
        teacherPrompts: parsedScript.teacherPrompts,
        createdAt: new Date().toISOString()
      }

      setGeneratedScript(script)
      setViewMode('viewing')
      toast.success('Lesson script generated successfully')
    } catch (error) {
      console.error('Error generating script:', error)
      toast.error('Failed to generate lesson script. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const saveScript = () => {
    if (!generatedScript) return

    setSavedScripts((currentScripts) => {
      const scripts = currentScripts || []
      const exists = scripts.some(s => s.id === generatedScript.id)
      if (exists) {
        toast.info('Script already saved')
        return scripts
      }
      toast.success('Lesson script saved')
      return [...scripts, generatedScript]
    })
  }

  const deleteScript = (scriptId: string) => {
    setSavedScripts((currentScripts) => 
      (currentScripts || []).filter(s => s.id !== scriptId)
    )
    toast.success('Script deleted')
  }

  const viewScript = (script: LessonScript) => {
    setGeneratedScript(script)
    setViewMode('viewing')
  }

  const resetGenerator = () => {
    setGeneratedScript(null)
    setLessonTitle('')
    setSelectedApproaches([])
    setSelectAll(false)
    setViewMode('generator')
  }

  const exportScript = () => {
    if (!generatedScript) return

    const scriptText = `
LESSON SCRIPT: ${generatedScript.title}

Selected Teaching Approaches:
${generatedScript.approaches.map(a => `• ${a}`).join('\n')}

═══════════════════════════════════════

LEARNING OBJECTIVES:
${generatedScript.learningObjectives.map((obj, i) => `${i + 1}. ${obj}`).join('\n')}

═══════════════════════════════════════

LESSON ACTIVITIES:
${generatedScript.activities.map((act, i) => `
${i + 1}. ${act.name} (${act.duration})
${act.description}
`).join('\n')}

═══════════════════════════════════════

DIFFERENTIATION STRATEGIES:
${generatedScript.differentiation.map((diff, i) => `${i + 1}. ${diff}`).join('\n')}

═══════════════════════════════════════

ASSESSMENT METHODS:
${generatedScript.assessment.map((assess, i) => `${i + 1}. ${assess}`).join('\n')}

═══════════════════════════════════════

TEACHER PROMPTS & QUESTIONS:
${generatedScript.teacherPrompts.map((prompt, i) => `${i + 1}. ${prompt}`).join('\n')}

═══════════════════════════════════════
Generated by Irish EBP Navigator
Neuro-Affirming Practice Resource
Created: ${new Date(generatedScript.createdAt).toLocaleDateString('en-IE', { 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
})}
    `.trim()

    const blob = new Blob([scriptText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${generatedScript.title.replace(/\s+/g, '-').toLowerCase()}-lesson-script.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    toast.success('Lesson script exported')
  }

  if (viewMode === 'saved') {
    const scripts = savedScripts || []
    
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setViewMode('generator')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Generator
          </Button>
          <div className="flex-1">
            <h2 className="text-foreground">Saved Lesson Scripts</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {scripts.length} saved script{scripts.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {scripts.length === 0 ? (
          <Card className="bg-muted">
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <BookmarkSimple className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-foreground mb-2">No Saved Scripts</h3>
                <p className="text-muted-foreground mb-6">
                  Generate and save lesson scripts to access them later
                </p>
                <Button onClick={() => setViewMode('generator')}>
                  Create Your First Script
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {scripts.map((script) => (
              <Card key={script.id} className="border-2 hover:bg-secondary transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-xl">{script.title}</CardTitle>
                      <CardDescription className="mt-2 flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {new Date(script.createdAt).toLocaleDateString('en-IE', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => viewScript(script)}>
                        View
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => deleteScript(script.id)}
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {script.approaches.slice(0, 3).map(approach => (
                      <span 
                        key={approach} 
                        className="px-2 py-1 bg-accent/10 text-accent text-xs border border-accent/20"
                      >
                        {approach}
                      </span>
                    ))}
                    {script.approaches.length > 3 && (
                      <span className="px-2 py-1 bg-muted text-muted-foreground text-xs border border-border">
                        +{script.approaches.length - 3} more
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    )
  }

  if (viewMode === 'viewing' && generatedScript) {
    const isScriptSaved = (savedScripts || []).some(s => s.id === generatedScript.id)
    
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={resetGenerator}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Generate Another
          </Button>
          <div className="flex-1">
            <h2 className="text-foreground">{generatedScript.title}</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {generatedScript.approaches.length} teaching approach{generatedScript.approaches.length !== 1 ? 'es' : ''} integrated
            </p>
          </div>
          <Button 
            variant={isScriptSaved ? "secondary" : "outline"}
            onClick={saveScript}
            disabled={isScriptSaved}
          >
            <BookmarkSimple className="w-4 h-4 mr-2" />
            {isScriptSaved ? 'Saved' : 'Save Script'}
          </Button>
        </div>

        <Card className="bg-muted/50 border-2">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {generatedScript.approaches.map(approach => (
                  <span 
                    key={approach} 
                    className="px-3 py-1 bg-accent/10 text-accent text-sm border border-accent/20"
                  >
                    {approach}
                  </span>
                ))}
              </div>
              <Separator />
              <div>
                <Label className="text-sm text-muted-foreground mb-2 block">Export Options</Label>
                <ExportActions 
                  data={{
                    studentProfile: "General lesson script - adapt for specific students/groups",
                    learningGoal: generatedScript.title,
                    selectedEBPs: generatedScript.approaches,
                    sensorySupports: "As per student needs and sensory checklist",
                    communicationSupports: "Adjust based on communication preferences",
                    assessmentApproach: generatedScript.assessment.join('. '),
                    script: `LEARNING OBJECTIVES:\n${generatedScript.learningObjectives.map((obj, i) => `${i + 1}. ${obj}`).join('\n')}\n\nACTIVITIES:\n${generatedScript.activities.map((act, i) => `${i + 1}. ${act.name} (${act.duration})\n${act.description}`).join('\n\n')}\n\nDIFFERENTIATION:\n${generatedScript.differentiation.map((diff, i) => `${i + 1}. ${diff}`).join('\n')}\n\nTEACHER PROMPTS:\n${generatedScript.teacherPrompts.map((prompt, i) => `${i + 1}. ${prompt}`).join('\n')}`,
                    timestamp: new Date(generatedScript.createdAt).getTime()
                  }}
                  templateType="lesson"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-8">
            <section>
              <h3 className="text-foreground mb-4 flex items-center gap-2">
                <Check className="w-5 h-5 text-accent" />
                Learning Objectives
              </h3>
              <ul className="space-y-2">
                {generatedScript.learningObjectives.map((objective, index) => (
                  <li key={index} className="text-muted-foreground">
                    <strong className="text-foreground">{index + 1}.</strong> {objective}
                  </li>
                ))}
              </ul>
            </section>

            <Separator />

            <section>
              <h3 className="text-foreground mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-accent" />
                Lesson Activities
              </h3>
              <div className="space-y-6">
                {generatedScript.activities.map((activity, index) => (
                  <Card key={index} className="border-2">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <CardTitle className="text-lg">
                          {index + 1}. {activity.name}
                        </CardTitle>
                        <span className="text-sm text-muted-foreground bg-secondary px-3 py-1 whitespace-nowrap">
                          {activity.duration}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">{activity.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <Separator />

            <section>
              <h3 className="text-foreground mb-4">Differentiation Strategies</h3>
              <ul className="space-y-3">
                {generatedScript.differentiation.map((strategy, index) => (
                  <li key={index} className="flex gap-3">
                    <Circle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{strategy}</span>
                  </li>
                ))}
              </ul>
            </section>

            <Separator />

            <section>
              <h3 className="text-foreground mb-4">Assessment Methods</h3>
              <ul className="space-y-3">
                {generatedScript.assessment.map((method, index) => (
                  <li key={index} className="flex gap-3">
                    <Circle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{method}</span>
                  </li>
                ))}
              </ul>
            </section>

            <Separator />

            <section>
              <h3 className="text-foreground mb-4">Teacher Prompts & Questions</h3>
              <div className="bg-secondary p-6 border border-border space-y-2">
                {generatedScript.teacherPrompts.map((prompt, index) => (
                  <p key={index} className="text-muted-foreground italic">
                    "{prompt}"
                  </p>
                ))}
              </div>
            </section>
          </div>
        </ScrollArea>
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
          <h2 className="text-foreground">Lesson Script Generator</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Generate complete lesson scripts based on evidence-based teaching approaches
          </p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => setViewMode('saved')}
        >
          <BookmarkSimple className="w-4 h-4 mr-2" />
          Saved Scripts ({(savedScripts || []).length})
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lesson Details</CardTitle>
          <CardDescription>
            Provide a lesson title and select the teaching approaches you want to integrate
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="lesson-title">Lesson Title</Label>
            <Input
              id="lesson-title"
              placeholder="e.g., Understanding Fractions, The Water Cycle, Irish Folklore"
              value={lessonTitle}
              onChange={(e) => setLessonTitle(e.target.value)}
            />
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Select Teaching Approaches</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSelectAll}
              >
                {selectAll ? 'Deselect All' : 'Select All'}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Choose one or more evidence-based practices to integrate into your lesson
            </p>

            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-3">
                {teachingApproaches.map((approach) => (
                  <div key={approach} className="flex items-center space-x-3 p-3 bg-secondary border border-border hover:bg-accent/5 transition-colors">
                    <Checkbox
                      id={approach}
                      checked={selectedApproaches.includes(approach)}
                      onCheckedChange={() => toggleApproach(approach)}
                    />
                    <label
                      htmlFor={approach}
                      className="text-sm text-foreground cursor-pointer flex-1"
                    >
                      {approach}
                    </label>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="bg-muted p-4 border border-border">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">{selectedApproaches.length}</strong> approach{selectedApproaches.length !== 1 ? 'es' : ''} selected
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button
          onClick={generateScript}
          disabled={isGenerating || !lessonTitle.trim() || selectedApproaches.length === 0}
          className="min-w-[200px]"
        >
          {isGenerating ? 'Generating Script...' : 'Generate Lesson Script'}
        </Button>
      </div>

      <Card className="bg-muted">
        <CardContent className="pt-6">
          <p className="text-muted-foreground text-sm">
            <strong className="text-foreground">Note:</strong> Generated scripts integrate your selected 
            approaches with neuro-affirming principles. Scripts include learning objectives, detailed activities, 
            differentiation strategies, assessment methods, and teacher prompts for immediate classroom use.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
