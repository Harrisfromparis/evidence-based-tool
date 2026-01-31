import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Lightbulb, Plus, Trash, Download, Printer, Envelope } from '@phosphor-icons/react'
import { toast } from 'sonner'

interface EBPReflection {
  ebpName: string
  howItWorks: string
  whyItWorks: string
  examples: string
}

interface SavedReflection {
  id: string
  childName: string
  reflections: EBPReflection[]
  createdAt: string
  updatedAt: string
}

const EBP_OPTIONS = [
  'Antecedent-Based Intervention',
  'Augmentative and Alternative Communication',
  'Cognitive Behavioural Intervention',
  'Differential Reinforcement',
  'Discrete Trial Teaching',
  'Exercise and Movement',
  'Extinction',
  'Functional Behaviour Assessment',
  'Functional Communication Training',
  'Modelling',
  'Music-Mediated Intervention',
  'Naturalistic Intervention',
  'Parent-Implemented Intervention',
  'Peer-Mediated Instruction',
  'Picture Exchange Communication System',
  'Pivotal Response Treatment',
  'Prompting',
  'Reinforcement',
  'Response Interruption/Redirection',
  'Scripting',
  'Self-Management',
  'Social Narratives',
  'Social Skills Training',
  'Structured Work Systems',
  'Task Analysis',
  'Technology-Aided Instruction',
  'Time Delay',
  'Video Modelling',
  'Visual Supports'
]

export function ParentEBPReflection() {
  const [savedReflections, setSavedReflections] = useKV<SavedReflection[]>('parent-ebp-reflections', [])
  const [childName, setChildName] = useState('')
  const [reflections, setReflections] = useState<EBPReflection[]>([
    { ebpName: '', howItWorks: '', whyItWorks: '', examples: '' }
  ])
  const [viewingReflection, setViewingReflection] = useState<SavedReflection | null>(null)

  const addReflection = () => {
    setReflections(current => [...current, { ebpName: '', howItWorks: '', whyItWorks: '', examples: '' }])
  }

  const removeReflection = (index: number) => {
    setReflections(current => current.filter((_, i) => i !== index))
  }

  const updateReflection = (index: number, field: keyof EBPReflection, value: string) => {
    setReflections(current => 
      current.map((reflection, i) => 
        i === index ? { ...reflection, [field]: value } : reflection
      )
    )
  }

  const handleSave = () => {
    if (!childName.trim()) {
      toast.error('Please enter your child\'s name')
      return
    }

    const validReflections = reflections.filter(r => r.ebpName && r.howItWorks)
    
    if (validReflections.length === 0) {
      toast.error('Please complete at least one EBP reflection')
      return
    }

    const newReflection: SavedReflection = {
      id: Date.now().toString(),
      childName,
      reflections: validReflections,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    setSavedReflections(current => [...(current || []), newReflection])
    toast.success('EBP reflections saved successfully')
    
    setChildName('')
    setReflections([{ ebpName: '', howItWorks: '', whyItWorks: '', examples: '' }])
  }

  const handleDelete = (id: string) => {
    setSavedReflections(current => (current || []).filter(r => r.id !== id))
    toast.success('Reflection deleted')
    setViewingReflection(null)
  }

  const handlePrint = (reflection: SavedReflection) => {
    const printWindow = window.open('', '_blank')
    if (!printWindow) return

    const content = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${reflection.childName} - EBP Reflections</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            max-width: 900px;
            margin: 40px auto;
            padding: 20px;
            line-height: 1.6;
          }
          h1 {
            color: #2ECC71;
            border-bottom: 3px solid #F39C12;
            padding-bottom: 10px;
          }
          h2 {
            color: #F39C12;
            margin-top: 24px;
            font-size: 20px;
          }
          .section {
            margin-bottom: 30px;
            padding: 20px;
            border: 2px solid #FFD3B6;
            border-radius: 12px;
            background: #FAFAFA;
          }
          .label {
            font-weight: 600;
            color: #666;
            margin-bottom: 8px;
            display: block;
          }
          .value {
            color: #000;
            white-space: pre-wrap;
            margin-bottom: 16px;
          }
          @media print {
            body {
              margin: 0;
              padding: 20px;
            }
          }
        </style>
      </head>
      <body>
        <h1>${reflection.childName} - What Works for Us: Parent Reflections on EBPs</h1>
        <p><strong>Created:</strong> ${new Date(reflection.createdAt).toLocaleDateString('en-GB')}</p>
        <p><strong>Updated:</strong> ${new Date(reflection.updatedAt).toLocaleDateString('en-GB')}</p>
        
        ${reflection.reflections.map((r, index) => `
          <div class="section">
            <h2>${index + 1}. ${r.ebpName}</h2>
            
            ${r.howItWorks ? `
              <div>
                <span class="label">How we use this EBP:</span>
                <div class="value">${r.howItWorks}</div>
              </div>
            ` : ''}
            
            ${r.whyItWorks ? `
              <div>
                <span class="label">Why it works for us:</span>
                <div class="value">${r.whyItWorks}</div>
              </div>
            ` : ''}
            
            ${r.examples ? `
              <div>
                <span class="label">Examples from home:</span>
                <div class="value">${r.examples}</div>
              </div>
            ` : ''}
          </div>
        `).join('')}
        
        <p style="margin-top: 40px; text-align: center; color: #666; font-size: 12px;">
          Generated by Autism & Me - www.autismandme.ie Ltd.<br>
          Evidence-Based Practice Navigator for Parents and Caregivers
        </p>
      </body>
      </html>
    `

    printWindow.document.write(content)
    printWindow.document.close()
    printWindow.print()
    toast.success('Opening print dialogue')
  }

  const handleDownload = (reflection: SavedReflection) => {
    let content = `${reflection.childName} - What Works for Us: Parent Reflections on EBPs\n${'='.repeat(70)}\n\n`
    content += `Created: ${new Date(reflection.createdAt).toLocaleDateString('en-GB')}\n`
    content += `Updated: ${new Date(reflection.updatedAt).toLocaleDateString('en-GB')}\n\n`

    reflection.reflections.forEach((r, index) => {
      content += `\n${index + 1}. ${r.ebpName}\n${'-'.repeat(50)}\n\n`
      if (r.howItWorks) content += `How we use this EBP:\n${r.howItWorks}\n\n`
      if (r.whyItWorks) content += `Why it works for us:\n${r.whyItWorks}\n\n`
      if (r.examples) content += `Examples from home:\n${r.examples}\n\n`
    })

    content += `\n${'='.repeat(70)}\nGenerated by Autism & Me - www.autismandme.ie Ltd.\n`
    content += `Evidence-Based Practice Navigator for Parents and Caregivers\n`

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${reflection.childName.replace(/\s+/g, '-')}-ebp-reflections.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('Reflections downloaded')
  }

  const handleEmail = (reflection: SavedReflection) => {
    let body = `${reflection.childName} - What Works for Us: Parent Reflections on EBPs\n\n`
    body += `Created: ${new Date(reflection.createdAt).toLocaleDateString('en-GB')}\n\n`

    reflection.reflections.forEach((r, index) => {
      body += `\n${index + 1}. ${r.ebpName}\n\n`
      if (r.howItWorks) body += `How we use this EBP:\n${r.howItWorks}\n\n`
      if (r.whyItWorks) body += `Why it works for us:\n${r.whyItWorks}\n\n`
      if (r.examples) body += `Examples from home:\n${r.examples}\n\n`
    })

    body += `\nGenerated by Autism & Me - www.autismandme.ie Ltd.\n`

    const subject = encodeURIComponent(`EBP Reflections - ${reflection.childName}`)
    const encodedBody = encodeURIComponent(body)

    window.location.href = `mailto:?subject=${subject}&body=${encodedBody}`
    toast.success('Opening email client')
  }

  if (viewingReflection) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={() => setViewingReflection(null)} className="rounded-xl">
            Back to List
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => handlePrint(viewingReflection)} className="gap-2 rounded-xl">
              <Printer size={18} />
              Print
            </Button>
            <Button variant="outline" onClick={() => handleDownload(viewingReflection)} className="gap-2 rounded-xl">
              <Download size={18} />
              Download
            </Button>
            <Button variant="outline" onClick={() => handleEmail(viewingReflection)} className="gap-2 rounded-xl">
              <Envelope size={18} />
              Email
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => handleDelete(viewingReflection.id)}
              className="gap-2 rounded-xl"
            >
              <Trash size={18} />
              Delete
            </Button>
          </div>
        </div>

        <Card className="border-2 border-accent/20 rounded-xl">
          <CardHeader className="bg-soft-orange/20 rounded-t-xl">
            <CardTitle className="handwritten text-2xl">{viewingReflection.childName} - What Works for Us</CardTitle>
            <CardDescription>
              Created {new Date(viewingReflection.createdAt).toLocaleDateString('en-GB')} • 
              {viewingReflection.reflections.length} EBP{viewingReflection.reflections.length !== 1 ? 's' : ''}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            {viewingReflection.reflections.map((reflection, index) => (
              <div key={index} className="p-6 bg-soft-green/10 rounded-xl border-2 border-border">
                <h3 className="handwritten text-xl text-accent mb-4">{index + 1}. {reflection.ebpName}</h3>
                
                {reflection.howItWorks && (
                  <div className="mb-4">
                    <Label className="font-semibold">How we use this EBP:</Label>
                    <p className="text-muted-foreground mt-1 whitespace-pre-wrap">{reflection.howItWorks}</p>
                  </div>
                )}
                
                {reflection.whyItWorks && (
                  <div className="mb-4">
                    <Label className="font-semibold">Why it works for us:</Label>
                    <p className="text-muted-foreground mt-1 whitespace-pre-wrap">{reflection.whyItWorks}</p>
                  </div>
                )}
                
                {reflection.examples && (
                  <div>
                    <Label className="font-semibold">Examples from home:</Label>
                    <p className="text-muted-foreground mt-1 whitespace-pre-wrap">{reflection.examples}</p>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card className="bg-soft-orange/20 border-accent/30 border-2 rounded-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl handwritten">
            <Lightbulb size={28} className="text-accent" />
            What Works for Your Child: EBP Reflections
          </CardTitle>
          <CardDescription>
            Share your experience with evidence-based practices. Choose 3 or more EBPs that work well for your child, 
            and explain how you use them at home and why they're effective. This reflection can be shared with teachers, 
            therapists, or support teams to help them understand what truly works for your family.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className="rounded-xl border-2">
        <CardHeader>
          <CardTitle className="handwritten text-xl">Create New Reflection</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="child-name">Child's Name</Label>
            <input
              id="child-name"
              type="text"
              className="w-full px-4 py-2 border-2 border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent"
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              placeholder="Enter your child's name"
            />
          </div>

          {reflections.map((reflection, index) => (
            <div key={index} className="p-6 bg-soft-green/10 rounded-xl border-2 border-border space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="handwritten text-lg">EBP #{index + 1}</h3>
                {reflections.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeReflection(index)}
                    className="text-destructive rounded-xl"
                  >
                    <Trash size={18} />
                  </Button>
                )}
              </div>

              <div className="space-y-2">
                <Label>Choose an EBP</Label>
                <Select
                  value={reflection.ebpName}
                  onValueChange={(value) => updateReflection(index, 'ebpName', value)}
                >
                  <SelectTrigger className="rounded-xl border-2">
                    <SelectValue placeholder="Select an evidence-based practice" />
                  </SelectTrigger>
                  <SelectContent>
                    {EBP_OPTIONS.map(ebp => (
                      <SelectItem key={ebp} value={ebp}>{ebp}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>How do you use this EBP at home?</Label>
                <Textarea
                  className="rounded-xl border-2 min-h-[100px]"
                  value={reflection.howItWorks}
                  onChange={(e) => updateReflection(index, 'howItWorks', e.target.value)}
                  placeholder="Describe how you implement this practice in your daily routine..."
                />
              </div>

              <div className="space-y-2">
                <Label>Why does it work for your child?</Label>
                <Textarea
                  className="rounded-xl border-2 min-h-[100px]"
                  value={reflection.whyItWorks}
                  onChange={(e) => updateReflection(index, 'whyItWorks', e.target.value)}
                  placeholder="Explain what makes this practice effective for your family..."
                />
              </div>

              <div className="space-y-2">
                <Label>Examples or specific moments (optional)</Label>
                <Textarea
                  className="rounded-xl border-2 min-h-[100px]"
                  value={reflection.examples}
                  onChange={(e) => updateReflection(index, 'examples', e.target.value)}
                  placeholder="Share specific examples or success stories..."
                />
              </div>
            </div>
          ))}

          <div className="flex gap-3">
            <Button onClick={addReflection} variant="outline" className="gap-2 rounded-xl">
              <Plus size={20} />
              Add Another EBP
            </Button>
            <Button onClick={handleSave} className="gap-2 rounded-xl bg-accent hover:bg-accent/90">
              Save Reflections
            </Button>
          </div>
        </CardContent>
      </Card>

      {savedReflections && savedReflections.length > 0 && (
        <Card className="rounded-xl border-2">
          <CardHeader>
            <CardTitle className="handwritten text-xl">Saved Reflections</CardTitle>
            <CardDescription>View and manage your EBP reflections</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {(savedReflections || []).map(reflection => (
                <div
                  key={reflection.id}
                  className="flex items-center justify-between p-4 rounded-xl border-2 bg-card hover:bg-accent/5 transition-colors cursor-pointer"
                  onClick={() => setViewingReflection(reflection)}
                >
                  <div>
                    <h3 className="font-semibold handwritten text-lg">{reflection.childName}</h3>
                    <p className="text-sm text-muted-foreground">
                      {reflection.reflections.length} EBP{reflection.reflections.length !== 1 ? 's' : ''} • 
                      Created {new Date(reflection.createdAt).toLocaleDateString('en-GB')}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-xl">
                    View Details
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
