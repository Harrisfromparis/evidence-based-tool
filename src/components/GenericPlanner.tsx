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
import { ActionButtons } from '@/components/ActionButtons'

interface GenericPlannerProps {
  onBack: () => void
  title: string
  description: string
  storageKey: string
  promptGenerator: (inputs: Record<string, string>) => string
  fields: Array<{
    id: string
    label: string
    placeholder: string
    type: 'text' | 'textarea'
    required?: boolean
  }>
}

interface SavedPlan {
  id: string
  inputs: Record<string, string>
  generatedContent: string
  createdAt: string
}

export function GenericPlanner({ 
  onBack, 
  title, 
  description, 
  storageKey,
  promptGenerator,
  fields 
}: GenericPlannerProps) {
  const [inputs, setInputs] = useState<Record<string, string>>({})
  const [generatedContent, setGeneratedContent] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [savedPlans, setSavedPlans] = useKV<SavedPlan[]>(storageKey, [])

  const updateInput = (fieldId: string, value: string) => {
    setInputs((current) => ({ ...current, [fieldId]: value }))
  }

  const generate = async () => {
    const requiredFields = fields.filter(f => f.required)
    const missingFields = requiredFields.filter(f => !inputs[f.id]?.trim())
    
    if (missingFields.length > 0) {
      toast.error('Please fill in all required fields')
      return
    }

    setIsGenerating(true)
    try {
      const promptText = promptGenerator(inputs)
      const result = await window.spark.llm(promptText, 'gpt-4o')
      setGeneratedContent(result)
      toast.success('Plan generated!')
    } catch (error) {
      toast.error('Failed to generate plan')
    } finally {
      setIsGenerating(false)
    }
  }

  const savePlan = () => {
    if (!generatedContent.trim()) {
      toast.error('Please generate content first')
      return
    }

    const newPlan: SavedPlan = {
      id: Date.now().toString(),
      inputs,
      generatedContent,
      createdAt: new Date().toISOString()
    }

    setSavedPlans((current) => [...(current || []), newPlan])
    toast.success('Plan saved!')
  }

  const deletePlan = (id: string) => {
    setSavedPlans((current) => (current || []).filter(p => p.id !== id))
    toast.success('Plan deleted')
  }

  const resetForm = () => {
    setInputs({})
    setGeneratedContent('')
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
        <h2 className="text-foreground mb-2">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>

      <Tabs defaultValue="create" className="w-full">
        <TabsList>
          <TabsTrigger value="create">Create New</TabsTrigger>
          <TabsTrigger value="saved">Saved Plans ({(savedPlans || []).length})</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {fields.map((field) => (
                <div key={field.id} className="space-y-2">
                  <Label htmlFor={field.id}>
                    {field.label} {field.required && <span className="text-destructive">*</span>}
                  </Label>
                  {field.type === 'textarea' ? (
                    <Textarea
                      id={field.id}
                      value={inputs[field.id] || ''}
                      onChange={(e) => updateInput(field.id, e.target.value)}
                      placeholder={field.placeholder}
                      rows={3}
                    />
                  ) : (
                    <Input
                      id={field.id}
                      value={inputs[field.id] || ''}
                      onChange={(e) => updateInput(field.id, e.target.value)}
                      placeholder={field.placeholder}
                    />
                  )}
                </div>
              ))}

              <Button onClick={generate} disabled={isGenerating} className="gap-2">
                <Sparkle className="w-4 h-4" />
                {isGenerating ? 'Generating...' : 'Generate Plan'}
              </Button>
            </CardContent>
          </Card>

          {generatedContent && (
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>Generated Plan</CardTitle>
                    <CardDescription>Review and edit as needed before saving</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm" onClick={resetForm}>
                    Start Over
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  value={generatedContent}
                  onChange={(e) => setGeneratedContent(e.target.value)}
                  rows={16}
                />

                <div className="flex flex-col gap-3">
                  <ActionButtons
                    content={generatedContent}
                    title={title}
                    emailSubject={`${title} - ${Object.values(inputs)[0] || 'Plan'}`}
                  />
                  <div className="flex gap-2">
                    <Button onClick={savePlan}>Save Plan</Button>
                    <Button variant="outline" onClick={generate} disabled={isGenerating}>
                      Regenerate
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="saved" className="space-y-4 mt-6">
          {(savedPlans || []).length === 0 ? (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground">
                No saved plans yet. Create one using the "Create New" tab.
              </p>
            </Card>
          ) : (
            <div className="space-y-4">
              {(savedPlans || []).map((plan) => (
                <Card key={plan.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">
                          {Object.values(plan.inputs)[0] || 'Plan'}
                        </CardTitle>
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
                  <CardContent>
                    <div className="space-y-4">
                      {fields.map((field) => (
                        plan.inputs[field.id] && (
                          <div key={field.id}>
                            <h4 className="font-semibold text-sm text-muted-foreground mb-1">
                              {field.label}:
                            </h4>
                            <p className="text-foreground">{plan.inputs[field.id]}</p>
                          </div>
                        )
                      ))}
                      <div>
                        <h4 className="font-semibold text-sm text-muted-foreground mb-1">Generated Plan:</h4>
                        <p className="text-foreground whitespace-pre-wrap">{plan.generatedContent}</p>
                      </div>
                      <ActionButtons
                        content={plan.generatedContent}
                        title={title}
                        emailSubject={`${title} - ${Object.values(plan.inputs)[0] || 'Plan'}`}
                      />
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
