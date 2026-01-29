import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowLeft, Plus, X } from '@phosphor-icons/react'
import { toast } from 'sonner'

interface TaskAnalysisBuilderProps {
  onBack: () => void
}

interface TaskStep {
  id: string
  stepNumber: number
  description: string
}

interface SavedTask {
  id: string
  taskName: string
  steps: TaskStep[]
  createdAt: string
}

export function TaskAnalysisBuilder({ onBack }: TaskAnalysisBuilderProps) {
  const [taskName, setTaskName] = useState('')
  const [steps, setSteps] = useState<TaskStep[]>([])
  const [newStepText, setNewStepText] = useState('')
  const [savedTasks, setSavedTasks] = useKV<SavedTask[]>('task-analyses', [])

  const addStep = () => {
    if (!newStepText.trim()) return
    
    const newStep: TaskStep = {
      id: Date.now().toString(),
      stepNumber: steps.length + 1,
      description: newStepText
    }
    
    setSteps((current) => [...current, newStep])
    setNewStepText('')
  }

  const removeStep = (id: string) => {
    setSteps((current) => {
      const filtered = current.filter(s => s.id !== id)
      return filtered.map((step, index) => ({ ...step, stepNumber: index + 1 }))
    })
  }

  const moveStepUp = (index: number) => {
    if (index === 0) return
    const newSteps = [...steps]
    ;[newSteps[index - 1], newSteps[index]] = [newSteps[index], newSteps[index - 1]]
    setSteps(newSteps.map((step, i) => ({ ...step, stepNumber: i + 1 })))
  }

  const moveStepDown = (index: number) => {
    if (index === steps.length - 1) return
    const newSteps = [...steps]
    ;[newSteps[index], newSteps[index + 1]] = [newSteps[index + 1], newSteps[index]]
    setSteps(newSteps.map((step, i) => ({ ...step, stepNumber: i + 1 })))
  }

  const saveTask = () => {
    if (!taskName.trim() || steps.length === 0) {
      toast.error('Please add a task name and at least one step')
      return
    }

    const newTask: SavedTask = {
      id: Date.now().toString(),
      taskName,
      steps,
      createdAt: new Date().toISOString()
    }

    setSavedTasks((current) => [...(current || []), newTask])
    toast.success('Task analysis saved!')
    
    setTaskName('')
    setSteps([])
  }

  const deleteTask = (id: string) => {
    setSavedTasks((current) => (current || []).filter(t => t.id !== id))
    toast.success('Task analysis deleted')
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
        <h2 className="text-foreground mb-2">Task Analysis Builder</h2>
        <p className="text-muted-foreground">
          Break down complex tasks into small, sequential steps to support teaching and learning.
          Task analysis makes multi-step activities manageable and clarifies expectations.
        </p>
      </div>

      <Tabs defaultValue="create" className="w-full">
        <TabsList>
          <TabsTrigger value="create">Create New</TabsTrigger>
          <TabsTrigger value="saved">Saved Tasks ({(savedTasks || []).length})</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Task Information</CardTitle>
              <CardDescription>What task do you want to break down into steps?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="task-name">Task Name</Label>
                <Input
                  id="task-name"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  placeholder="e.g., Hand-washing, Getting ready for PE, Making a sandwich"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Break Down Into Steps</CardTitle>
              <CardDescription>
                Add each step in order. Be specific and observable.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newStepText}
                  onChange={(e) => setNewStepText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addStep()}
                  placeholder="Type step description and press Enter"
                  className="flex-1"
                />
                <Button onClick={addStep} size="icon">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              {steps.length > 0 && (
                <div className="space-y-2">
                  {steps.map((step, index) => (
                    <div key={step.id} className="flex items-start gap-3 p-3 bg-muted rounded border">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-semibold">
                        {step.stepNumber}
                      </div>
                      <p className="flex-1 pt-2">{step.description}</p>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => moveStepUp(index)}
                          disabled={index === 0}
                        >
                          ↑
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => moveStepDown(index)}
                          disabled={index === steps.length - 1}
                        >
                          ↓
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeStep(step.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={saveTask} disabled={!taskName || steps.length === 0}>
              Save Task Analysis
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="saved" className="space-y-4 mt-6">
          {(savedTasks || []).length === 0 ? (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground">
                No saved task analyses yet. Create one using the "Create New" tab.
              </p>
            </Card>
          ) : (
            <div className="space-y-4">
              {(savedTasks || []).map((task) => (
                <Card key={task.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle>{task.taskName}</CardTitle>
                        <CardDescription>
                          {task.steps.length} steps • Created {new Date(task.createdAt).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteTask(task.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {task.steps.map((step) => (
                        <div key={step.id} className="flex gap-3">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 text-accent flex items-center justify-center font-semibold text-sm">
                            {step.stepNumber}
                          </div>
                          <p className="flex-1 pt-1">{step.description}</p>
                        </div>
                      ))}
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
