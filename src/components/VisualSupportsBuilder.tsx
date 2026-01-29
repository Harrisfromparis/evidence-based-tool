import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowLeft, Plus, X, Download } from '@phosphor-icons/react'
import { toast } from 'sonner'
import { ActionButtons } from '@/components/ActionButtons'

interface VisualSupportsBuilderProps {
  onBack: () => void
}

type SupportType = 'schedule' | 'choice-board' | 'first-then' | 'task-list'

interface VisualItem {
  id: string
  text: string
}

export function VisualSupportsBuilder({ onBack }: VisualSupportsBuilderProps) {
  const [supportType, setSupportType] = useState<SupportType>('schedule')
  const [title, setTitle] = useState('')
  const [items, setItems] = useState<VisualItem[]>([])
  const [newItemText, setNewItemText] = useState('')
  const [savedSupports, setSavedSupports] = useKV<any[]>('visual-supports', [])

  const addItem = () => {
    if (!newItemText.trim()) return
    setItems((current) => [...current, { id: Date.now().toString(), text: newItemText }])
    setNewItemText('')
  }

  const removeItem = (id: string) => {
    setItems((current) => current.filter(item => item.id !== id))
  }

  const moveItemUp = (index: number) => {
    if (index === 0) return
    const newItems = [...items]
    ;[newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]]
    setItems(newItems)
  }

  const moveItemDown = (index: number) => {
    if (index === items.length - 1) return
    const newItems = [...items]
    ;[newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]]
    setItems(newItems)
  }

  const saveSupport = () => {
    if (!title.trim() || items.length === 0) {
      toast.error('Please add a title and at least one item')
      return
    }

    const newSupport = {
      id: Date.now().toString(),
      type: supportType,
      title,
      items,
      createdAt: new Date().toISOString()
    }

    setSavedSupports((current) => [...(current || []), newSupport])
    toast.success('Visual support saved!')
    
    setTitle('')
    setItems([])
  }

  const deleteSupport = (id: string) => {
    setSavedSupports((current) => (current || []).filter(s => s.id !== id))
    toast.success('Visual support deleted')
  }

  const getSupportTypeLabel = (type: SupportType) => {
    switch (type) {
      case 'schedule': return 'Visual Schedule'
      case 'choice-board': return 'Choice Board'
      case 'first-then': return 'First-Then Board'
      case 'task-list': return 'Task List'
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
        <h2 className="text-foreground mb-2">Visual Supports Builder</h2>
        <p className="text-muted-foreground">
          Create custom visual schedules, choice boards, first-then boards, and task lists to support
          understanding, communication, and independence.
        </p>
      </div>

      <Tabs value="create" className="w-full">
        <TabsList>
          <TabsTrigger value="create">Create New</TabsTrigger>
          <TabsTrigger value="saved">Saved Supports ({(savedSupports || []).length})</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Support Type</CardTitle>
              <CardDescription>Choose the type of visual support you want to create</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="support-type">Type</Label>
                <Select value={supportType} onValueChange={(v) => setSupportType(v as SupportType)}>
                  <SelectTrigger id="support-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="schedule">Visual Schedule</SelectItem>
                    <SelectItem value="choice-board">Choice Board</SelectItem>
                    <SelectItem value="first-then">First-Then Board</SelectItem>
                    <SelectItem value="task-list">Task List</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Morning Routine, Snack Choices, Getting Ready for PE"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Add Items</CardTitle>
              <CardDescription>
                {supportType === 'schedule' && 'Add activities in the order they will occur'}
                {supportType === 'choice-board' && 'Add available choices or options'}
                {supportType === 'first-then' && 'Add exactly two items: First (activity to do) and Then (reward/next activity)'}
                {supportType === 'task-list' && 'Add steps or tasks to complete'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newItemText}
                  onChange={(e) => setNewItemText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addItem()}
                  placeholder="Type item text and press Enter"
                  className="flex-1"
                />
                <Button onClick={addItem} size="icon">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              {items.length > 0 && (
                <div className="space-y-2">
                  {items.map((item, index) => (
                    <div key={item.id} className="flex items-center gap-2 p-3 bg-muted rounded border">
                      <span className="flex-shrink-0 w-8 text-center text-muted-foreground font-medium">
                        {index + 1}
                      </span>
                      <span className="flex-1">{item.text}</span>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => moveItemUp(index)}
                          disabled={index === 0}
                        >
                          ↑
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => moveItemDown(index)}
                          disabled={index === items.length - 1}
                        >
                          ↓
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {supportType === 'first-then' && items.length >= 2 && (
                <p className="text-sm text-muted-foreground">
                  Note: First-Then boards typically have only 2 items. Consider removing extras.
                </p>
              )}
            </CardContent>
          </Card>

          {items.length > 0 && (
            <div className="flex flex-col gap-3">
              <ActionButtons
                content={`${title}\n${getSupportTypeLabel(supportType)}\n\n${items.map((item, i) => `${i + 1}. ${item.text}`).join('\n')}`}
                title={title}
                emailSubject={`${getSupportTypeLabel(supportType)} - ${title}`}
              />
            </div>
          )}

          <div className="flex justify-end">
            <Button onClick={saveSupport} disabled={!title || items.length === 0}>
              Save Visual Support
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="saved" className="space-y-4 mt-6">
          {(savedSupports || []).length === 0 ? (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground">
                No saved visual supports yet. Create one using the "Create New" tab.
              </p>
            </Card>
          ) : (
            <div className="grid gap-4">
              {(savedSupports || []).map((support) => (
                <Card key={support.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle>{support.title}</CardTitle>
                        <CardDescription>{getSupportTypeLabel(support.type)}</CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteSupport(support.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ol className="space-y-2">
                      {support.items.map((item: VisualItem, index: number) => (
                        <li key={item.id} className="flex gap-3">
                          <span className="flex-shrink-0 w-6 text-muted-foreground">
                            {index + 1}.
                          </span>
                          <span>{item.text}</span>
                        </li>
                      ))}
                    </ol>
                    <div className="pt-4">
                      <ActionButtons
                        content={`${support.title}\n${getSupportTypeLabel(support.type)}\n\n${support.items.map((item: VisualItem, i: number) => `${i + 1}. ${item.text}`).join('\n')}`}
                        title={support.title}
                        emailSubject={`${getSupportTypeLabel(support.type)} - ${support.title}`}
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
