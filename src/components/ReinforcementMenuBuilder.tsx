import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowLeft, X, Plus } from '@phosphor-icons/react'
import { toast } from 'sonner'

interface ReinforcementMenuBuilderProps {
  onBack: () => void
}

interface Reinforcer {
  id: string
  name: string
  type: 'social' | 'tangible' | 'activity' | 'sensory'
  effectiveness: number
}

interface ReinforcementMenu {
  id: string
  studentName: string
  reinforcers: Reinforcer[]
  fadingPlan: string
  createdAt: string
}

export function ReinforcementMenuBuilder({ onBack }: ReinforcementMenuBuilderProps) {
  const [studentName, setStudentName] = useState('')
  const [reinforcers, setReinforcers] = useState<Reinforcer[]>([])
  const [newReinforcer, setNewReinforcer] = useState('')
  const [newType, setNewType] = useState<Reinforcer['type']>('activity')
  const [fadingPlan, setFadingPlan] = useState('')
  const [savedMenus, setSavedMenus] = useKV<ReinforcementMenu[]>('reinforcement-menus', [])

  const addReinforcer = () => {
    if (!newReinforcer.trim()) return

    const reinforcer: Reinforcer = {
      id: Date.now().toString(),
      name: newReinforcer,
      type: newType,
      effectiveness: 5
    }

    setReinforcers((current) => [...current, reinforcer])
    setNewReinforcer('')
  }

  const removeReinforcer = (id: string) => {
    setReinforcers((current) => current.filter(r => r.id !== id))
  }

  const updateEffectiveness = (id: string, value: number) => {
    setReinforcers((current) =>
      current.map(r => r.id === id ? { ...r, effectiveness: value } : r)
    )
  }

  const saveMenu = () => {
    if (!studentName.trim() || reinforcers.length === 0) {
      toast.error('Please add student name and at least one reinforcer')
      return
    }

    const newMenu: ReinforcementMenu = {
      id: Date.now().toString(),
      studentName,
      reinforcers,
      fadingPlan,
      createdAt: new Date().toISOString()
    }

    setSavedMenus((current) => [...(current || []), newMenu])
    toast.success('Reinforcement menu saved!')
    
    setStudentName('')
    setReinforcers([])
    setFadingPlan('')
  }

  const deleteMenu = (id: string) => {
    setSavedMenus((current) => (current || []).filter(m => m.id !== id))
    toast.success('Menu deleted')
  }

  const getTypeColor = (type: Reinforcer['type']) => {
    switch (type) {
      case 'social': return 'bg-blue-100 text-blue-800'
      case 'tangible': return 'bg-green-100 text-green-800'
      case 'activity': return 'bg-orange-100 text-orange-800'
      case 'sensory': return 'bg-purple-100 text-purple-800'
    }
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
        <h2 className="text-foreground mb-2">Reinforcement Menu Builder</h2>
        <p className="text-muted-foreground">
          Identify effective reinforcers and create reinforcement systems with fading plans.
          Good reinforcement is individualized, immediate, and meaningful to the student.
        </p>
      </div>

      <Tabs defaultValue="create" className="w-full">
        <TabsList>
          <TabsTrigger value="create">Create New</TabsTrigger>
          <TabsTrigger value="saved">Saved Menus ({(savedMenus || []).length})</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Student Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="student">Student Name</Label>
                <Input
                  id="student"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Student name"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Add Reinforcers</CardTitle>
              <CardDescription>
                Identify what is genuinely reinforcing for this specific student
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newReinforcer}
                  onChange={(e) => setNewReinforcer(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addReinforcer()}
                  placeholder="e.g., Computer time, Praise, Preferred toy"
                  className="flex-1"
                />
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as Reinforcer['type'])}
                  className="px-3 rounded border"
                >
                  <option value="social">Social</option>
                  <option value="tangible">Tangible</option>
                  <option value="activity">Activity</option>
                  <option value="sensory">Sensory</option>
                </select>
                <Button onClick={addReinforcer} size="icon">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              {reinforcers.length > 0 && (
                <div className="space-y-2">
                  {reinforcers.map((reinforcer) => (
                    <div key={reinforcer.id} className="flex items-center gap-3 p-3 bg-muted rounded border">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium">{reinforcer.name}</span>
                          <span className={`text-xs px-2 py-1 rounded ${getTypeColor(reinforcer.type)}`}>
                            {reinforcer.type}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">Effectiveness:</span>
                          <input
                            type="range"
                            min="1"
                            max="10"
                            value={reinforcer.effectiveness}
                            onChange={(e) => updateEffectiveness(reinforcer.id, parseInt(e.target.value))}
                            className="flex-1"
                          />
                          <span className="text-sm font-medium w-8">{reinforcer.effectiveness}/10</span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeReinforcer(reinforcer.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Fading Plan</CardTitle>
              <CardDescription>
                How will you gradually move toward more natural reinforcement?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={fadingPlan}
                onChange={(e) => setFadingPlan(e.target.value)}
                placeholder="e.g., Start with token every 5 minutes, then 10, then 15. Gradually shift from tokens to verbal praise."
                rows={4}
              />
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={saveMenu} disabled={!studentName || reinforcers.length === 0}>
              Save Reinforcement Menu
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="saved" className="space-y-4 mt-6">
          {(savedMenus || []).length === 0 ? (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground">
                No saved reinforcement menus yet. Create one using the "Create New" tab.
              </p>
            </Card>
          ) : (
            <div className="space-y-4">
              {(savedMenus || []).map((menu) => (
                <Card key={menu.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle>{menu.studentName}</CardTitle>
                        <CardDescription>
                          {menu.reinforcers.length} reinforcers • Created {new Date(menu.createdAt).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteMenu(menu.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Reinforcers:</h4>
                      <div className="space-y-2">
                        {menu.reinforcers.map((r) => (
                          <div key={r.id} className="flex items-center justify-between p-2 bg-muted rounded">
                            <div className="flex items-center gap-2">
                              <span>{r.name}</span>
                              <span className={`text-xs px-2 py-1 rounded ${getTypeColor(r.type)}`}>
                                {r.type}
                              </span>
                            </div>
                            <span className="text-sm text-muted-foreground">{r.effectiveness}/10</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    {menu.fadingPlan && (
                      <div>
                        <h4 className="font-semibold mb-2">Fading Plan:</h4>
                        <p className="text-muted-foreground">{menu.fadingPlan}</p>
                      </div>
                    )}
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
