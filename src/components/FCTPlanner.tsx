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

interface FCTPlannerProps {
  onBack: () => void
}

interface FCTPlan {
  id: string
  studentName: string
  challengingBehavior: string
  function: string
  newCommunication: string
  teachingPlan: string
  createdAt: string
}

export function FCTPlanner({ onBack }: FCTPlannerProps) {
  const [studentName, setStudentName] = useState('')
  const [challengingBehavior, setChallengingBehavior] = useState('')
  const [behaviorFunction, setBehaviorFunction] = useState('')
  const [newCommunication, setNewCommunication] = useState('')
  const [teachingPlan, setTeachingPlan] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [savedPlans, setSavedPlans] = useKV<FCTPlan[]>('fct-plans', [])

  const generatePlan = async () => {
    if (!challengingBehavior.trim() || !behaviorFunction.trim()) {
      toast.error('Please describe the behavior and its function')
      return
    }

    setIsGenerating(true)
    try {
      const promptText = `You are an expert in Functional Communication Training (FCT) for autistic students.

Student: ${studentName || 'Student'}
Challenging Behavior: ${challengingBehavior}
Function of Behavior: ${behaviorFunction}

Generate an FCT plan that includes:
1. An appropriate replacement communication method (simpler and more effective than the behavior)
2. A detailed teaching plan for how to teach the new communication
3. How to immediately honor the new communication every time
4. How to gradually reduce reinforcement for the challenging behavior
5. Ethical considerations

Format your response as clear, actionable text.`

      const result = await window.spark.llm(promptText, 'gpt-4o')
      const lines = result.split('\n\n')
      
      if (lines.length >= 2) {
        setNewCommunication(lines[0])
        setTeachingPlan(lines.slice(1).join('\n\n'))
      } else {
        setTeachingPlan(result)
      }
      
      toast.success('FCT plan generated!')
    } catch (error) {
      toast.error('Failed to generate plan')
    } finally {
      setIsGenerating(false)
    }
  }

  const savePlan = () => {
    if (!challengingBehavior || !behaviorFunction || !teachingPlan) {
      toast.error('Please generate a plan first')
      return
    }

    const newPlan: FCTPlan = {
      id: Date.now().toString(),
      studentName: studentName || 'Student',
      challengingBehavior,
      function: behaviorFunction,
      newCommunication,
      teachingPlan,
      createdAt: new Date().toISOString()
    }

    setSavedPlans((current) => [...(current || []), newPlan])
    toast.success('FCT plan saved!')
  }

  const deletePlan = (id: string) => {
    setSavedPlans((current) => (current || []).filter(p => p.id !== id))
    toast.success('Plan deleted')
  }

  const resetForm = () => {
    setStudentName('')
    setChallengingBehavior('')
    setBehaviorFunction('')
    setNewCommunication('')
    setTeachingPlan('')
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
        <h2 className="text-foreground mb-2">Functional Communication Training Planner</h2>
        <p className="text-muted-foreground">
          Design FCT interventions that teach appropriate communication to replace challenging behavior.
          FCT identifies what a behavior is communicating and teaches a better way to express that need.
        </p>
      </div>

      <Tabs defaultValue="create" className="w-full">
        <TabsList>
          <TabsTrigger value="create">Create New</TabsTrigger>
          <TabsTrigger value="saved">Saved Plans ({(savedPlans || []).length})</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Behavior Information</CardTitle>
              <CardDescription>
                Describe the challenging behavior and what it's communicating
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="student-name">Student Name (optional)</Label>
                <Input
                  id="student-name"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Optional"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="behavior">Challenging Behavior</Label>
                <Textarea
                  id="behavior"
                  value={challengingBehavior}
                  onChange={(e) => setChallengingBehavior(e.target.value)}
                  placeholder="e.g., Student screams when work is difficult, Student hits peers to get attention"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="function">Function of Behavior</Label>
                <Textarea
                  id="function"
                  value={behaviorFunction}
                  onChange={(e) => setBehaviorFunction(e.target.value)}
                  placeholder="e.g., Escape from difficult task, Access to peer attention, Request for break"
                  rows={3}
                />
                <p className="text-sm text-muted-foreground">
                  What is the behavior trying to communicate? What does the student get or avoid?
                </p>
              </div>

              <Button 
                onClick={generatePlan} 
                disabled={isGenerating || !challengingBehavior || !behaviorFunction}
                className="gap-2"
              >
                <Sparkle className="w-4 h-4" />
                {isGenerating ? 'Generating...' : 'Generate FCT Plan'}
              </Button>
            </CardContent>
          </Card>

          {teachingPlan && (
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>Generated FCT Plan</CardTitle>
                    <CardDescription>Review and edit as needed before saving</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" onClick={resetForm}>
                    Start Over
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {newCommunication && (
                  <div className="space-y-2">
                    <Label htmlFor="new-comm">Replacement Communication</Label>
                    <Textarea
                      id="new-comm"
                      value={newCommunication}
                      onChange={(e) => setNewCommunication(e.target.value)}
                      rows={2}
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="teaching">Teaching Plan</Label>
                  <Textarea
                    id="teaching"
                    value={teachingPlan}
                    onChange={(e) => setTeachingPlan(e.target.value)}
                    rows={12}
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={savePlan}>Save FCT Plan</Button>
                  <Button variant="outline" onClick={generatePlan} disabled={isGenerating}>
                    Regenerate
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="saved" className="space-y-4 mt-6">
          {(savedPlans || []).length === 0 ? (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground">
                No saved FCT plans yet. Create one using the "Create New" tab.
              </p>
            </Card>
          ) : (
            <div className="space-y-4">
              {(savedPlans || []).map((plan) => (
                <Card key={plan.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle>{plan.studentName}</CardTitle>
                        <CardDescription>
                          Created {new Date(plan.createdAt).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deletePlan(plan.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm text-muted-foreground mb-1">Challenging Behavior:</h4>
                      <p className="text-foreground">{plan.challengingBehavior}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-muted-foreground mb-1">Function:</h4>
                      <p className="text-foreground">{plan.function}</p>
                    </div>
                    {plan.newCommunication && (
                      <div>
                        <h4 className="font-semibold text-sm text-muted-foreground mb-1">Replacement Communication:</h4>
                        <p className="text-foreground">{plan.newCommunication}</p>
                      </div>
                    )}
                    <div>
                      <h4 className="font-semibold text-sm text-muted-foreground mb-1">Teaching Plan:</h4>
                      <p className="text-foreground whitespace-pre-wrap">{plan.teachingPlan}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
