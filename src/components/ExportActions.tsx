import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { 
  EnvelopeSimple, 
  Copy, 
  Download,
  FileText,
  FileHtml,
  CaretDown
} from '@phosphor-icons/react'
import { EmailTemplatePreview } from './EmailTemplatePreview'
import { 
  exportPlan, 
  getAvailableFormats, 
  getTemplateDescription,
  TemplateType 
} from '@/lib/template-export-utils'

interface ExportActionsProps {
  data: any
  templateType: TemplateType
  disabled?: boolean
}

export function ExportActions({ data, templateType, disabled = false }: ExportActionsProps) {
  const [showPreview, setShowPreview] = useState(false)
  const availableFormats = getAvailableFormats(templateType)
  const hasHTML = availableFormats.includes('html')

  const handleExport = async (format: 'text' | 'html', action: 'email' | 'copy' | 'download') => {
    await exportPlan({ data, templateType, format, action })
  }

  return (
    <>
      <div className="flex flex-wrap gap-2">
        <Button
          onClick={() => handleExport('text', 'email')}
          disabled={disabled}
          className="gap-2"
        >
          <EnvelopeSimple />
          Email
        </Button>

        <Button
          onClick={() => handleExport('text', 'copy')}
          disabled={disabled}
          variant="outline"
          className="gap-2"
        >
          <Copy />
          Copy
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              disabled={disabled}
              variant="outline"
              className="gap-2"
            >
              <Download />
              Download
              <CaretDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Download Format</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleExport('text', 'download')}>
              <FileText className="mr-2" />
              Plain Text (.txt)
            </DropdownMenuItem>
            {hasHTML && (
              <DropdownMenuItem onClick={() => handleExport('html', 'download')}>
                <FileHtml className="mr-2" />
                Formatted HTML (.html)
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          onClick={() => setShowPreview(true)}
          disabled={disabled}
          variant="secondary"
        >
          Preview Template
        </Button>
      </div>

      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Email Template Preview</DialogTitle>
            <DialogDescription>
              {getTemplateDescription(templateType)}
            </DialogDescription>
          </DialogHeader>
          <EmailTemplatePreview 
            data={data} 
            templateType={templateType}
            onClose={() => setShowPreview(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}
