import { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Heart, Plus, Eye, Trash, Download, Printer, Envelope } from '@phosphor-icons/react'
import { toast } from 'sonner'

interface ChildProfile {
  id: string
  name: string
  age: string
  strengths: string
  interests: string
  sensoryPreferences: string
  communicationMethods: string
  supportsWork: string
  supportsDontWork: string
  notes: string
  createdAt: string
}

export function ChildProfileCreator() {
  const [profiles, setProfiles] = useKV<ChildProfile[]>('child-profiles', [])
  const [isCreating, setIsCreating] = useState(false)
  const [viewingProfile, setViewingProfile] = useState<ChildProfile | null>(null)
  
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    strengths: '',
    interests: '',
    sensoryPreferences: '',
    communicationMethods: '',
    supportsWork: '',
    supportsDontWork: '',
    notes: ''
  })

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleCreateProfile = () => {
    if (!formData.name || !formData.age) {
      toast.error('Please enter at least name and age')
      return
    }

    const newProfile: ChildProfile = {
      id: Date.now().toString(),
      ...formData,
      createdAt: new Date().toISOString()
    }

    setProfiles(current => [...(current || []), newProfile])
    toast.success('Child profile created successfully')
    
    setFormData({
      name: '',
      age: '',
      strengths: '',
      interests: '',
      sensoryPreferences: '',
      communicationMethods: '',
      supportsWork: '',
      supportsDontWork: '',
      notes: ''
    })
    setIsCreating(false)
  }

  const handleDeleteProfile = (id: string) => {
    setProfiles(current => (current || []).filter(p => p.id !== id))
    toast.success('Profile deleted')
    setViewingProfile(null)
  }

  const handlePrint = (profile: ChildProfile) => {
    const printWindow = window.open('', '_blank')
    if (!printWindow) return

    const content = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${profile.name} - Child Profile</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            max-width: 800px;
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
            color: #000;
            margin-top: 24px;
            font-size: 18px;
          }
          .section {
            margin-bottom: 20px;
          }
          .label {
            font-weight: 600;
            color: #666;
            margin-bottom: 4px;
          }
          .value {
            color: #000;
            white-space: pre-wrap;
          }
          .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 2px solid #F39C12;
            text-align: center;
            color: #666;
            font-size: 12px;
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
        <h1>${profile.name} - Child Profile</h1>
        <p><strong>Age:</strong> ${profile.age}</p>
        <p><strong>Created:</strong> ${new Date(profile.createdAt).toLocaleDateString('en-GB')}</p>
        
        ${profile.strengths ? `<div class="section"><h2>Strengths</h2><div class="value">${profile.strengths}</div></div>` : ''}
        ${profile.interests ? `<div class="section"><h2>Interests</h2><div class="value">${profile.interests}</div></div>` : ''}
        ${profile.sensoryPreferences ? `<div class="section"><h2>Sensory Preferences</h2><div class="value">${profile.sensoryPreferences}</div></div>` : ''}
        ${profile.communicationMethods ? `<div class="section"><h2>Communication Methods</h2><div class="value">${profile.communicationMethods}</div></div>` : ''}
        ${profile.supportsWork ? `<div class="section"><h2>Supports That Work Well</h2><div class="value">${profile.supportsWork}</div></div>` : ''}
        ${profile.supportsDontWork ? `<div class="section"><h2>Supports That Do Not Work Well</h2><div class="value">${profile.supportsDontWork}</div></div>` : ''}
        ${profile.notes ? `<div class="section"><h2>Additional Notes</h2><div class="value">${profile.notes}</div></div>` : ''}
        
        <div class="footer">
          Generated by Autism & Me - www.autismandme.ie Ltd.<br>
          Evidence-Based Practice Navigator for Parents and Caregivers
        </div>
      </body>
      </html>
    `

    printWindow.document.write(content)
    printWindow.document.close()
    printWindow.print()
    toast.success('Opening print dialogue')
  }

  const handleDownload = (profile: ChildProfile) => {
    const content = `
${profile.name} - Child Profile
${'='.repeat(50)}

Age: ${profile.age}
Created: ${new Date(profile.createdAt).toLocaleDateString('en-GB')}

${profile.strengths ? `STRENGTHS\n${profile.strengths}\n\n` : ''}
${profile.interests ? `INTERESTS\n${profile.interests}\n\n` : ''}
${profile.sensoryPreferences ? `SENSORY PREFERENCES\n${profile.sensoryPreferences}\n\n` : ''}
${profile.communicationMethods ? `COMMUNICATION METHODS\n${profile.communicationMethods}\n\n` : ''}
${profile.supportsWork ? `SUPPORTS THAT WORK WELL\n${profile.supportsWork}\n\n` : ''}
${profile.supportsDontWork ? `SUPPORTS THAT DO NOT WORK WELL\n${profile.supportsDontWork}\n\n` : ''}
${profile.notes ? `ADDITIONAL NOTES\n${profile.notes}\n\n` : ''}

${'='.repeat(50)}
Generated by Autism & Me - www.autismandme.ie Ltd.
Evidence-Based Practice Navigator for Parents and Caregivers
    `.trim()

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${profile.name.replace(/\s+/g, '-')}-profile.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('Profile downloaded')
  }

  const handleEmail = (profile: ChildProfile) => {
    const subject = encodeURIComponent(`Child Profile - ${profile.name}`)
    const body = encodeURIComponent(`
${profile.name} - Child Profile

Age: ${profile.age}
Created: ${new Date(profile.createdAt).toLocaleDateString('en-GB')}

${profile.strengths ? `STRENGTHS\n${profile.strengths}\n\n` : ''}
${profile.interests ? `INTERESTS\n${profile.interests}\n\n` : ''}
${profile.sensoryPreferences ? `SENSORY PREFERENCES\n${profile.sensoryPreferences}\n\n` : ''}
${profile.communicationMethods ? `COMMUNICATION METHODS\n${profile.communicationMethods}\n\n` : ''}
${profile.supportsWork ? `SUPPORTS THAT WORK WELL\n${profile.supportsWork}\n\n` : ''}
${profile.supportsDontWork ? `SUPPORTS THAT DO NOT WORK WELL\n${profile.supportsDontWork}\n\n` : ''}
${profile.notes ? `ADDITIONAL NOTES\n${profile.notes}\n\n` : ''}

Generated by Autism & Me - www.autismandme.ie Ltd.
Evidence-Based Practice Navigator for Parents and Caregivers
    `.trim())

    window.location.href = `mailto:?subject=${subject}&body=${body}`
    toast.success('Opening email client')
  }

  return (
    <div className="space-y-6">
      <Card className="bg-soft-orange/30 border-accent/20 border-2 rounded-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl handwritten">
            <Heart size={28} className="text-accent" />
            Child Profile Creator
          </CardTitle>
          <CardDescription>
            Create a comprehensive profile for your child to share with teachers, therapists, and support staff. 
            Export as a clean, professional document that highlights your child's strengths, needs, and what works.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => setIsCreating(true)} className="gap-2">
            <Plus size={20} />
            Create New Profile
          </Button>
        </CardContent>
      </Card>

      {profiles && profiles.length > 0 && (
        <Card className="rounded-xl border-2">
          <CardHeader>
            <CardTitle className="handwritten text-xl">Saved Profiles</CardTitle>
            <CardDescription>View and manage your child profiles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {(profiles || []).map(profile => (
                <div
                  key={profile.id}
                  className="flex items-center justify-between p-4 rounded-xl border-2 bg-card hover:bg-accent/5 transition-colors"
                >
                  <div>
                    <h3 className="font-semibold handwritten text-lg">{profile.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Age {profile.age} • Created {new Date(profile.createdAt).toLocaleDateString('en-GB')}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setViewingProfile(profile)}
                    className="gap-2"
                  >
                    <Eye size={16} />
                    View
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Dialog open={isCreating} onOpenChange={setIsCreating}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="handwritten text-2xl">Create Child Profile</DialogTitle>
            <DialogDescription>
              Fill in the information below. All fields are optional except name and age.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Child's Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Age *</Label>
                <Input
                  id="age"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  placeholder="e.g. 8 years"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="strengths">Strengths</Label>
              <Textarea
                id="strengths"
                value={formData.strengths}
                onChange={(e) => handleInputChange('strengths', e.target.value)}
                placeholder="What does your child do well? What are their talents and abilities?"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="interests">Interests</Label>
              <Textarea
                id="interests"
                value={formData.interests}
                onChange={(e) => handleInputChange('interests', e.target.value)}
                placeholder="What does your child love? Special interests, hobbies, favourite activities?"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sensoryPreferences">Sensory Preferences</Label>
              <Textarea
                id="sensoryPreferences"
                value={formData.sensoryPreferences}
                onChange={(e) => handleInputChange('sensoryPreferences', e.target.value)}
                placeholder="What sensory input does your child seek or avoid? (noise, texture, movement, etc.)"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="communicationMethods">Communication Methods</Label>
              <Textarea
                id="communicationMethods"
                value={formData.communicationMethods}
                onChange={(e) => handleInputChange('communicationMethods', e.target.value)}
                placeholder="How does your child communicate? (words, signs, pictures, gestures, AAC device, etc.)"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="supportsWork">Supports That Work Well</Label>
              <Textarea
                id="supportsWork"
                value={formData.supportsWork}
                onChange={(e) => handleInputChange('supportsWork', e.target.value)}
                placeholder="What strategies, accommodations, or approaches help your child succeed?"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="supportsDontWork">Supports That Do Not Work Well</Label>
              <Textarea
                id="supportsDontWork"
                value={formData.supportsDontWork}
                onChange={(e) => handleInputChange('supportsDontWork', e.target.value)}
                placeholder="What approaches have not been helpful or have made things harder?"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Any other information you'd like to share"
                rows={3}
              />
            </div>

            <div className="flex gap-2 justify-end pt-4">
              <Button variant="outline" onClick={() => setIsCreating(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateProfile} className="gap-2">
                <Heart size={18} />
                Create Profile
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={!!viewingProfile} onOpenChange={() => setViewingProfile(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {viewingProfile && (
            <>
              <DialogHeader>
                <DialogTitle className="handwritten text-2xl">{viewingProfile.name}</DialogTitle>
                <DialogDescription>
                  Age {viewingProfile.age} • Created {new Date(viewingProfile.createdAt).toLocaleDateString('en-GB')}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                {viewingProfile.strengths && (
                  <div>
                    <h3 className="font-semibold mb-2 handwritten">Strengths</h3>
                    <p className="text-sm whitespace-pre-wrap bg-soft-green/20 p-3 rounded-xl border-2 border-soft-green/40">{viewingProfile.strengths}</p>
                  </div>
                )}
                
                {viewingProfile.interests && (
                  <div>
                    <h3 className="font-semibold mb-2 handwritten">Interests</h3>
                    <p className="text-sm whitespace-pre-wrap bg-soft-orange/20 p-3 rounded-xl border-2 border-soft-orange/40">{viewingProfile.interests}</p>
                  </div>
                )}
                
                {viewingProfile.sensoryPreferences && (
                  <div>
                    <h3 className="font-semibold mb-2 handwritten">Sensory Preferences</h3>
                    <p className="text-sm whitespace-pre-wrap bg-muted p-3 rounded-xl border-2 border-border">{viewingProfile.sensoryPreferences}</p>
                  </div>
                )}
                
                {viewingProfile.communicationMethods && (
                  <div>
                    <h3 className="font-semibold mb-2 handwritten">Communication Methods</h3>
                    <p className="text-sm whitespace-pre-wrap bg-muted p-3 rounded-xl border-2 border-border">{viewingProfile.communicationMethods}</p>
                  </div>
                )}
                
                {viewingProfile.supportsWork && (
                  <div>
                    <h3 className="font-semibold mb-2 handwritten">Supports That Work Well</h3>
                    <p className="text-sm whitespace-pre-wrap bg-soft-green/20 p-3 rounded-xl border-2 border-soft-green/40">{viewingProfile.supportsWork}</p>
                  </div>
                )}
                
                {viewingProfile.supportsDontWork && (
                  <div>
                    <h3 className="font-semibold mb-2 handwritten">Supports That Do Not Work Well</h3>
                    <p className="text-sm whitespace-pre-wrap bg-destructive/10 p-3 rounded-xl border-2 border-destructive/30">{viewingProfile.supportsDontWork}</p>
                  </div>
                )}
                
                {viewingProfile.notes && (
                  <div>
                    <h3 className="font-semibold mb-2 handwritten">Additional Notes</h3>
                    <p className="text-sm whitespace-pre-wrap bg-muted p-3 rounded-xl border-2 border-border">{viewingProfile.notes}</p>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t">
                <Button onClick={() => handlePrint(viewingProfile)} variant="outline" className="gap-2 flex-1">
                  <Printer size={18} />
                  Print
                </Button>
                <Button onClick={() => handleDownload(viewingProfile)} variant="outline" className="gap-2 flex-1">
                  <Download size={18} />
                  Download
                </Button>
                <Button onClick={() => handleEmail(viewingProfile)} variant="outline" className="gap-2 flex-1">
                  <Envelope size={18} />
                  Email
                </Button>
                <Button
                  onClick={() => handleDeleteProfile(viewingProfile.id)}
                  variant="destructive"
                  className="gap-2"
                >
                  <Trash size={18} />
                  Delete
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
