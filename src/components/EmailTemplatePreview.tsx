import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { 
  EnvelopeSimple, 
  FileHtml, 
  Copy, 
  Check,
  Download
} from '@phosphor-icons/react'
import { toast } from 'sonner'
import {
  createLessonScriptEmail,
  createChoose3EBPsEmail,
  createSensoryChecklistEmail,
  createBehaviourCommunicationEmail,
  createCoRegulationEmail,
  createTransitionSupportEmail,
  createStudentAssessmentEmail,
  createParentAssessmentEmail,
  createSchoolPlanEmail,
  createCombinedReportEmail,
  createVRTransitionEmail,
  sendEmailWithTemplate,
  EmailTemplate
} from '@/lib/email-templates'
import {
  createLessonScriptHTML,
  createSensoryChecklistHTML,
  createBehaviourCommunicationHTML,
  createSchoolPlanHTML,
  createCombinedReportHTML,
  downloadHTMLEmail
} from '@/lib/html-email-templates'

interface EmailTemplatePreviewProps {
  data: any
  templateType: 'lesson' | 'choose3' | 'sensory' | 'behaviour' | 'coregulation' | 'transition' | 'studentAssessment' | 'parentAssessment' | 'schoolPlan' | 'combined' | 'vrTransition'
  onClose?: () => void
}

export function EmailTemplatePreview({ data, templateType, onClose }: EmailTemplatePreviewProps) {
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState<'text' | 'html'>('text')

  const getTemplate = (): EmailTemplate | null => {
    const timestamp = data.timestamp || Date.now()
    const dataWithTimestamp = { ...data, timestamp }

    switch (templateType) {
      case 'lesson':
        return createLessonScriptEmail(dataWithTimestamp)
      case 'choose3':
        return createChoose3EBPsEmail(dataWithTimestamp)
      case 'sensory':
        return createSensoryChecklistEmail(dataWithTimestamp)
      case 'behaviour':
        return createBehaviourCommunicationEmail(dataWithTimestamp)
      case 'coregulation':
        return createCoRegulationEmail(dataWithTimestamp)
      case 'transition':
        return createTransitionSupportEmail(dataWithTimestamp)
      case 'studentAssessment':
        return createStudentAssessmentEmail(dataWithTimestamp)
      case 'parentAssessment':
        return createParentAssessmentEmail(dataWithTimestamp)
      case 'schoolPlan':
        return createSchoolPlanEmail(dataWithTimestamp)
      case 'combined':
        return createCombinedReportEmail(dataWithTimestamp)
      case 'vrTransition':
        return createVRTransitionEmail(dataWithTimestamp)
      default:
        return null
    }
  }

  const getHTMLTemplate = (): string | null => {
    const timestamp = data.timestamp || Date.now()
    const dataWithTimestamp = { ...data, timestamp }

    switch (templateType) {
      case 'lesson':
        return createLessonScriptHTML(dataWithTimestamp)
      case 'sensory':
        return createSensoryChecklistHTML(dataWithTimestamp)
      case 'behaviour':
        return createBehaviourCommunicationHTML(dataWithTimestamp)
      case 'schoolPlan':
        return createSchoolPlanHTML(dataWithTimestamp)
      case 'combined':
        return createCombinedReportHTML(dataWithTimestamp)
      default:
        return null
    }
  }

  const template = getTemplate()
  const htmlTemplate = getHTMLTemplate()

  if (!template) {
    return (
      <Card className="p-6">
        <p className="text-muted-foreground">Unable to generate email template</p>
      </Card>
    )
  }

  const handleSendEmail = () => {
    sendEmailWithTemplate(template)
    toast.success('Email client opened', {
      description: 'Your default email application should open with the template'
    })
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(template.body)
      setCopied(true)
      toast.success('Copied to clipboard')
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast.error('Failed to copy to clipboard')
    }
  }

  const handleDownloadHTML = () => {
    if (!htmlTemplate) {
      toast.error('HTML template not available for this type')
      return
    }
    
    const filename = `${template.subject.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.html`
    downloadHTMLEmail(htmlTemplate, filename)
    toast.success('HTML template downloaded')
  }

  const handlePreviewHTML = () => {
    if (!htmlTemplate) {
      toast.error('HTML template not available for this type')
      return
    }
    
    const previewWindow = window.open('', '_blank')
    if (previewWindow) {
      previewWindow.document.write(htmlTemplate)
      previewWindow.document.close()
    } else {
      toast.error('Please allow popups to preview HTML template')
    }
  }

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold mb-1">Email Template</h3>
          <p className="text-sm text-muted-foreground">Preview and send your template</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'text' | 'html')}>
        <TabsList className="mb-4">
          <TabsTrigger value="text">
            <EnvelopeSimple className="mr-2" />
            Plain Text
          </TabsTrigger>
          {htmlTemplate && (
            <TabsTrigger value="html">
              <FileHtml className="mr-2" />
              HTML
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="text" className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Subject</label>
            <div className="p-3 bg-muted rounded border">
              <p className="text-sm">{template.subject}</p>
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <label className="text-sm font-medium">Body</label>
            <ScrollArea className="h-[400px] w-full rounded border">
              <div className="p-4">
                <pre className="text-sm whitespace-pre-wrap font-mono">{template.body}</pre>
              </div>
            </ScrollArea>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button onClick={handleSendEmail} className="gap-2">
              <EnvelopeSimple />
              Send Email
            </Button>
            <Button onClick={handleCopy} variant="outline" className="gap-2">
              {copied ? <Check className="text-secondary" /> : <Copy />}
              {copied ? 'Copied' : 'Copy Text'}
            </Button>
          </div>
        </TabsContent>

        {htmlTemplate && (
          <TabsContent value="html" className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">HTML Preview</label>
              <div className="p-4 bg-muted rounded border">
                <p className="text-sm text-muted-foreground mb-4">
                  The HTML version includes formatted styling with your brand colours (black, green, and orange) and is optimised for printing.
                </p>
                <iframe
                  srcDoc={htmlTemplate}
                  className="w-full h-[400px] bg-white rounded border"
                  title="HTML Email Preview"
                  sandbox="allow-same-origin"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button onClick={handlePreviewHTML} className="gap-2">
                <FileHtml />
                Open in New Window
              </Button>
              <Button onClick={handleDownloadHTML} variant="outline" className="gap-2">
                <Download />
                Download HTML
              </Button>
              <Button onClick={handleSendEmail} variant="outline" className="gap-2">
                <EnvelopeSimple />
                Send via Email
              </Button>
            </div>
          </TabsContent>
        )}
      </Tabs>

      <div className="mt-6 p-4 bg-muted/50 rounded border">
        <p className="text-xs text-muted-foreground">
          <strong>Note:</strong> The "Send Email" button will open your default email client with the template pre-filled. 
          You can then add recipients and make any final adjustments before sending.
          {htmlTemplate && ' For HTML templates, download and attach to your email, or copy the content into an HTML-compatible email client.'}
        </p>
      </div>
    </Card>
  )
}
