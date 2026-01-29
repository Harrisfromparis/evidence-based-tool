import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { ArrowLeft, FloppyDisk, Info, Plus, Trash, Clock, UserCircle, EnvelopeSimple, Download, Printer } from '@phosphor-icons/react'
import { useKV } from '@github/spark/hooks'
import { toast } from 'sonner'
import { ebps } from '@/lib/data'
import { openEmailClient } from '@/lib/email-export'
import { openPrintPreview, type PrintSection } from '@/lib/print-export'

interface SchoolPlannerProps {
  onBack: () => void
}

interface ParentAssessment {
  id: string
  timestamp: number
  childName: string
  childAge: string
  parentName: string
  relationship: string
  completedBy: string
  ratings: EBPRating[]
}

interface EBPRating {
  ebpId: string
  effectiveness: 'very-effective' | 'somewhat-effective' | 'not-effective' | 'never-tried' | ''
  context: string
  notes: string
}

interface ScheduleActivity {
  id: string
  time: string
  activity: string
  duration: string
  selectedEBPs: string[]
  accommodations: string
  materials: string
  staffNotes: string
}

interface DailyPlan {
  id: string
  timestamp: number
  studentName: string
  date: string
  plannerName: string
  plannerRole: string
  assessmentId: string
  activities: ScheduleActivity[]
  generalNotes: string
}

export function SchoolPlanner({ onBack }: SchoolPlannerProps) {
  const [parentAssessments] = useKV<ParentAssessment[]>('parent-ebp-assessments', [])
  const [savedPlans, setSavedPlans] = useKV<DailyPlan[]>('daily-school-plans', [])
  const [viewMode, setViewMode] = useState<'select' | 'plan' | 'view-plans'>('select')
  const [selectedAssessment, setSelectedAssessment] = useState<ParentAssessment | null>(null)
  const [viewingPlan, setViewingPlan] = useState<DailyPlan | null>(null)

  const [studentName, setStudentName] = useState('')
  const [planDate, setPlanDate] = useState('')
  const [plannerName, setPlannerName] = useState('')
  const [plannerRole, setPlannerRole] = useState('')
  const [activities, setActivities] = useState<ScheduleActivity[]>([])
  const [generalNotes, setGeneralNotes] = useState('')

  const resetForm = () => {
    setStudentName('')
    setPlanDate('')
    setPlannerName('')
    setPlannerRole('')
    setActivities([])
    setGeneralNotes('')
    setSelectedAssessment(null)
  }

  const handleSelectAssessment = (assessment: ParentAssessment) => {
    setSelectedAssessment(assessment)
    setStudentName(assessment.childName)
    setViewMode('plan')
  }

  const addActivity = () => {
    const newActivity: ScheduleActivity = {
      id: `activity-${Date.now()}`,
      time: '',
      activity: '',
      duration: '',
      selectedEBPs: [],
      accommodations: '',
      materials: '',
      staffNotes: ''
    }
    setActivities(current => [...current, newActivity])
  }

  const removeActivity = (id: string) => {
    setActivities(current => current.filter(a => a.id !== id))
  }

  const updateActivity = (id: string, field: keyof ScheduleActivity, value: string | string[]) => {
    setActivities(current =>
      current.map(a => a.id === id ? { ...a, [field]: value } : a)
    )
  }

  const toggleEBP = (activityId: string, ebpId: string) => {
    setActivities(current =>
      current.map(a => {
        if (a.id !== activityId) return a
        const ebps = a.selectedEBPs.includes(ebpId)
          ? a.selectedEBPs.filter(id => id !== ebpId)
          : [...a.selectedEBPs, ebpId]
        return { ...a, selectedEBPs: ebps }
      })
    )
  }

  const handleSavePlan = () => {
    if (!studentName.trim() || !planDate || !plannerName.trim()) {
      toast.error('Please fill in student name, date, and planner name')
      return
    }

    if (activities.length === 0) {
      toast.error('Please add at least one activity to the schedule')
      return
    }

    const newPlan: DailyPlan = {
      id: `plan-${Date.now()}`,
      timestamp: Date.now(),
      studentName,
      date: planDate,
      plannerName,
      plannerRole,
      assessmentId: selectedAssessment?.id || '',
      activities,
      generalNotes
    }

    setSavedPlans(current => [...(current || []), newPlan])
    toast.success('Daily plan saved successfully')
    setViewMode('select')
    resetForm()
  }

  const handleDeletePlan = (id: string) => {
    setSavedPlans(current => (current || []).filter(p => p.id !== id))
    toast.success('Plan deleted')
    if (viewingPlan?.id === id) {
      setViewMode('view-plans')
      setViewingPlan(null)
    }
  }

  const generatePlanText = (plan: DailyPlan) => {
    let text = `DAILY SCHOOL PLAN
Generated: ${new Date().toLocaleDateString('en-IE')}

=== PLAN INFORMATION ===
Student: ${plan.studentName}
Date: ${new Date(plan.date).toLocaleDateString()}
Created By: ${plan.plannerName} (${plan.plannerRole})

=== DAILY SCHEDULE ===

`

    plan.activities.forEach((activity, idx) => {
      text += `\n${idx + 1}. ${activity.time} - ${activity.activity}\n`
      text += `   Duration: ${activity.duration}\n`
      
      if (activity.selectedEBPs.length > 0) {
        text += `   EBPs: ${activity.selectedEBPs.map(id => {
          const ebp = ebps.find(e => e.id === id)
          return ebp?.title || id
        }).join(', ')}\n`
      }
      
      if (activity.accommodations) {
        text += `   Accommodations: ${activity.accommodations}\n`
      }
      
      if (activity.materials) {
        text += `   Materials: ${activity.materials}\n`
      }
      
      if (activity.staffNotes) {
        text += `   Staff Notes: ${activity.staffNotes}\n`
      }
    })

    if (plan.generalNotes) {
      text += `\n\n=== GENERAL NOTES ===\n${plan.generalNotes}`
    }

    return text
  }

  const exportPlan = (plan: DailyPlan) => {
    const planText = generatePlanText(plan)
    const blob = new Blob([planText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `daily-plan-${plan.studentName}-${Date.now()}.txt`
    a.click()
    URL.revokeObjectURL(url)
    toast.success('Plan exported successfully')
  }

  const emailPlan = (plan: DailyPlan) => {
    const planText = generatePlanText(plan)
    const subject = `Daily School Plan: ${plan.studentName} (${new Date(plan.date).toLocaleDateString()})`
    openEmailClient(subject, planText)
    toast.success('Opening email client...')
  }

  const printPlan = (plan: DailyPlan) => {
    const sections: PrintSection[] = [
      {
        title: 'Plan Information',
        content: [
          { label: 'Student', value: plan.studentName },
          { label: 'Date', value: new Date(plan.date).toLocaleDateString('en-IE', { day: 'numeric', month: 'long', year: 'numeric' }) },
          { label: 'Created By', value: `${plan.plannerName}${plan.plannerRole ? ` (${plan.plannerRole})` : ''}` },
          { label: 'Created On', value: new Date(plan.timestamp).toLocaleDateString('en-IE', { day: 'numeric', month: 'long', year: 'numeric' }) }
        ]
      }
    ]

    let scheduleContent = ''
    plan.activities.forEach((activity, idx) => {
      const ebpList = activity.selectedEBPs.length > 0
        ? activity.selectedEBPs.map(id => {
            const ebp = ebps.find(e => e.id === id)
            return ebp?.title || id
          }).map(title => `<span class="badge">${title}</span>`).join(' ')
        : '<em>No EBPs selected</em>'

      scheduleContent += `<div class="list-item">
        <div class="list-item-title">${activity.time} - ${activity.activity}</div>
        <div class="list-item-content">
          <strong>Duration:</strong> ${activity.duration}<br>
          <strong>Evidence-Based Practices:</strong><br>${ebpList}<br>
          ${activity.accommodations ? `<strong>Accommodations:</strong> ${activity.accommodations}<br>` : ''}
          ${activity.materials ? `<strong>Materials:</strong> ${activity.materials}<br>` : ''}
          ${activity.staffNotes ? `<strong>Staff Notes:</strong> ${activity.staffNotes}` : ''}
        </div>
      </div>`
    })

    sections.push({
      title: 'Daily Schedule',
      content: scheduleContent
    })

    if (plan.generalNotes) {
      sections.push({
        title: 'General Notes',
        content: plan.generalNotes
      })
    }

    openPrintPreview({
      title: 'Daily School Plan',
      subtitle: `${plan.studentName} • ${new Date(plan.date).toLocaleDateString('en-IE')}`,
      sections,
      footer: 'Irish EBP Navigator • Daily School Plan'
    })
    toast.success('Opening print preview...')
  }

  const getEffectiveEBPs = (assessment: ParentAssessment | null) => {
    if (!assessment) return []
    return assessment.ratings
      .filter(r => r.effectiveness === 'very-effective' || r.effectiveness === 'somewhat-effective')
      .map(r => {
        const ebp = ebps.find(e => e.id === r.ebpId)
        return { rating: r, ebp }
      })
      .filter(item => item.ebp !== undefined)
  }

  if (viewMode === 'view-plans') {
    if (viewingPlan) {
      const linkedAssessment = parentAssessments?.find(a => a.id === viewingPlan.assessmentId)
      
      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <Button variant="outline" onClick={() => {
              setViewingPlan(null)
              setViewMode('view-plans')
            }}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Plans
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => printPlan(viewingPlan)}>
                <Printer className="w-4 h-4 mr-2" />
                Print
              </Button>
              <Button variant="outline" onClick={() => emailPlan(viewingPlan)}>
                <EnvelopeSimple className="w-4 h-4 mr-2" />
                Email
              </Button>
              <Button variant="outline" onClick={() => exportPlan(viewingPlan)}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Daily Plan for {viewingPlan.studentName}</CardTitle>
              <CardDescription>
                Date: {new Date(viewingPlan.date).toLocaleDateString()} • Created by {viewingPlan.plannerName}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Planner Role</Label>
                  <p className="font-medium">{viewingPlan.plannerRole || 'Not specified'}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Created On</Label>
                  <p className="font-medium">{new Date(viewingPlan.timestamp).toLocaleDateString()}</p>
                </div>
              </div>

              {linkedAssessment && (
                <div className="bg-accent/5 p-4 rounded border border-accent/20">
                  <div className="flex gap-3">
                    <Info className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <div className="space-y-1 text-sm">
                      <p className="font-medium">Based on Parent Assessment</p>
                      <p className="text-muted-foreground">
                        From {linkedAssessment.parentName} • Completed {new Date(linkedAssessment.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {viewingPlan.generalNotes && (
                <div>
                  <Label className="text-muted-foreground">General Notes</Label>
                  <p className="mt-1 text-sm">{viewingPlan.generalNotes}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h3 className="font-semibold">Daily Schedule</h3>
            {viewingPlan.activities.map((activity, index) => (
              <Card key={activity.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <CardTitle className="text-lg">
                          {activity.time || 'No time set'} - {activity.activity || 'Unnamed activity'}
                        </CardTitle>
                        <CardDescription>
                          Duration: {activity.duration || 'Not specified'}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline">Activity {index + 1}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {activity.selectedEBPs.length > 0 && (
                    <div>
                      <Label className="text-muted-foreground mb-2 block">Strategies to Use:</Label>
                      <div className="flex flex-wrap gap-2">
                        {activity.selectedEBPs.map(ebpId => {
                          const ebp = ebps.find(e => e.id === ebpId)
                          if (!ebp) return null
                          return (
                            <Badge key={ebpId} className="bg-accent/10 text-accent border-accent/20">
                              {ebp.title}
                            </Badge>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {activity.accommodations && (
                    <div>
                      <Label className="text-muted-foreground">Accommodations:</Label>
                      <p className="text-sm mt-1">{activity.accommodations}</p>
                    </div>
                  )}

                  {activity.materials && (
                    <div>
                      <Label className="text-muted-foreground">Materials Needed:</Label>
                      <p className="text-sm mt-1">{activity.materials}</p>
                    </div>
                  )}

                  {activity.staffNotes && (
                    <div>
                      <Label className="text-muted-foreground">Staff Notes:</Label>
                      <p className="text-sm mt-1">{activity.staffNotes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setViewMode('select')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Assessment Selection
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Saved Daily Plans</CardTitle>
            <CardDescription>
              {savedPlans && savedPlans.length > 0 
                ? `${savedPlans.length} plan${savedPlans.length !== 1 ? 's' : ''} created`
                : 'No plans created yet'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {savedPlans && savedPlans.length > 0 ? (
              savedPlans.map(plan => (
                <div
                  key={plan.id}
                  className="border-2 border-border p-4 rounded hover:bg-secondary transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="font-medium">{plan.studentName}</h4>
                      <p className="text-sm text-muted-foreground">
                        Date: {new Date(plan.date).toLocaleDateString()} • {plan.activities.length} activities
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Created by {plan.plannerName} ({plan.plannerRole || 'Staff'})
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setViewingPlan(plan)
                        }}
                      >
                        View Details
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeletePlan(plan.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground py-8">
                No daily plans created yet. Select a parent assessment to create a plan.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  if (viewMode === 'plan' && selectedAssessment) {
    const effectiveEBPs = getEffectiveEBPs(selectedAssessment)

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={() => {
            setViewMode('select')
            resetForm()
          }}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Selection
          </Button>
          <Button variant="outline" onClick={() => setViewMode('view-plans')}>
            View Saved Plans
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Create Daily Plan</CardTitle>
            <CardDescription>
              Building a plan for {selectedAssessment.childName} based on parent assessment
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-accent/5 p-4 rounded border border-accent/20">
              <div className="flex gap-3">
                <UserCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <div className="space-y-2 text-sm">
                  <p className="font-medium">Parent Assessment Summary</p>
                  <p className="text-muted-foreground">
                    {selectedAssessment.parentName} identified {effectiveEBPs.length} practices as 
                    effective for {selectedAssessment.childName}. These strategies will be available 
                    when planning activities below.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="plan-student-name">Student Name *</Label>
                <Input
                  id="plan-student-name"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Student name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="plan-date">Date *</Label>
                <Input
                  id="plan-date"
                  type="date"
                  value={planDate}
                  onChange={(e) => setPlanDate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="planner-name">Your Name *</Label>
                <Input
                  id="planner-name"
                  value={plannerName}
                  onChange={(e) => setPlannerName(e.target.value)}
                  placeholder="Your name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="planner-role">Your Role</Label>
                <Select value={plannerRole} onValueChange={setPlannerRole}>
                  <SelectTrigger id="planner-role">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sna">SNA (Special Needs Assistant)</SelectItem>
                    <SelectItem value="teacher">Teacher</SelectItem>
                    <SelectItem value="senco">SENCO</SelectItem>
                    <SelectItem value="liaison">School Liaison</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="general-notes">General Notes (Optional)</Label>
              <Textarea
                id="general-notes"
                value={generalNotes}
                onChange={(e) => setGeneralNotes(e.target.value)}
                placeholder="Overall goals, considerations, or context for today's plan"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Daily Schedule Activities</CardTitle>
                <CardDescription>
                  Add activities and select effective strategies from parent input
                </CardDescription>
              </div>
              <Button onClick={addActivity} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Activity
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {activities.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No activities added yet. Click "Add Activity" to start building the schedule.
              </p>
            ) : (
              activities.map((activity, index) => (
                <div key={activity.id} className="border-2 border-border p-4 rounded space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">Activity {index + 1}</Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeActivity(activity.id)}
                    >
                      <Trash className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Time</Label>
                      <Input
                        type="time"
                        value={activity.time}
                        onChange={(e) => updateActivity(activity.id, 'time', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Duration</Label>
                      <Input
                        value={activity.duration}
                        onChange={(e) => updateActivity(activity.id, 'duration', e.target.value)}
                        placeholder="e.g., 30 mins"
                      />
                    </div>
                    <div className="space-y-2 col-span-1">
                      <Label>Activity</Label>
                      <Input
                        value={activity.activity}
                        onChange={(e) => updateActivity(activity.id, 'activity', e.target.value)}
                        placeholder="e.g., Maths lesson"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Strategies to Use (from parent assessment)</Label>
                    {effectiveEBPs.length > 0 ? (
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {effectiveEBPs.map(({ rating, ebp }) => {
                          if (!ebp) return null
                          const isSelected = activity.selectedEBPs.includes(ebp.id)
                          
                          return (
                            <div
                              key={ebp.id}
                              className="flex items-start gap-3 p-3 border rounded hover:bg-secondary transition-colors"
                            >
                              <Checkbox
                                id={`${activity.id}-${ebp.id}`}
                                checked={isSelected}
                                onCheckedChange={() => toggleEBP(activity.id, ebp.id)}
                              />
                              <div className="flex-1">
                                <Label
                                  htmlFor={`${activity.id}-${ebp.id}`}
                                  className="cursor-pointer font-medium"
                                >
                                  {ebp.title}
                                </Label>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {rating.effectiveness === 'very-effective' ? '⭐ Very effective' : '✓ Somewhat effective'}
                                  {rating.context && ` • ${rating.context}`}
                                </p>
                                {rating.notes && (
                                  <p className="text-xs text-muted-foreground mt-1 italic">
                                    Parent note: {rating.notes}
                                  </p>
                                )}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground italic">
                        No effective strategies identified in parent assessment
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Accommodations</Label>
                    <Textarea
                      value={activity.accommodations}
                      onChange={(e) => updateActivity(activity.id, 'accommodations', e.target.value)}
                      placeholder="Specific accommodations for this activity"
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Materials Needed</Label>
                    <Input
                      value={activity.materials}
                      onChange={(e) => updateActivity(activity.id, 'materials', e.target.value)}
                      placeholder="e.g., Visual timer, fidget tools, noise-cancelling headphones"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Staff Notes</Label>
                    <Textarea
                      value={activity.staffNotes}
                      onChange={(e) => updateActivity(activity.id, 'staffNotes', e.target.value)}
                      placeholder="Notes for staff supporting this activity"
                      rows={2}
                    />
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <Button onClick={handleSavePlan} className="w-full">
              <FloppyDisk className="w-4 h-4 mr-2" />
              Save Daily Plan
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Tools
        </Button>
        <Button variant="outline" onClick={() => setViewMode('view-plans')}>
          View Saved Plans ({savedPlans?.length || 0})
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>School Daily Planner</CardTitle>
          <CardDescription>
            Create personalized daily schedules using insights from parent/caregiver assessments
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-4 rounded border border-border">
            <div className="flex gap-3">
              <Info className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <div className="space-y-2 text-sm">
                <p className="font-medium">How This Works</p>
                <p className="text-muted-foreground">
                  Parents and caregivers complete assessments rating all 28 evidence-based practices based 
                  on their experiences at home. As a teacher, SNA, or school liaison, you can select a 
                  student's assessment and use their parent's insights to create effective daily schedules 
                  and support plans.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Available Parent Assessments</CardTitle>
          <CardDescription>
            {parentAssessments && parentAssessments.length > 0
              ? `${parentAssessments.length} assessment${parentAssessments.length !== 1 ? 's' : ''} available`
              : 'No parent assessments available yet'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {parentAssessments && parentAssessments.length > 0 ? (
            parentAssessments.map(assessment => {
              const effectiveCount = assessment.ratings.filter(
                r => r.effectiveness === 'very-effective' || r.effectiveness === 'somewhat-effective'
              ).length

              return (
                <div
                  key={assessment.id}
                  className="border-2 border-border p-4 rounded hover:bg-secondary transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h4 className="font-medium">{assessment.childName}</h4>
                      <p className="text-sm text-muted-foreground">
                        Age: {assessment.childAge || 'Not specified'} • Assessment by {assessment.parentName}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {effectiveCount} effective strategies identified • 
                        Completed {new Date(assessment.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                    <Button onClick={() => handleSelectAssessment(assessment)}>
                      Create Plan
                    </Button>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="text-center py-8 space-y-4">
              <p className="text-muted-foreground">
                No parent assessments have been completed yet. Parents and caregivers need to complete 
                the EBP assessment first before you can create daily plans.
              </p>
              <p className="text-sm text-muted-foreground">
                Ask parents to access the "Parent/Caregiver EBP Assessment" tool to share their insights.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
