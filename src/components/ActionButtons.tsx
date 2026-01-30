import { Button } from '@/components/ui/button'
import { Printer, FloppyDisk, EnvelopeSimple, Copy } from '@phosphor-icons/react'
import { toast } from 'sonner'
import { sendEmail } from '@/lib/email'

interface ActionButtonsProps {
  content: string
  title: string
  emailSubject?: string
}

export function ActionButtons({ content, title, emailSubject }: ActionButtonsProps) {
  const handlePrint = () => {
    const printWindow = window.open('', '_blank')
    if (!printWindow) {
      toast.error('Please allow pop-ups to print')
      return
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${title}</title>
          <style>
            body {
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              line-height: 1.6;
              max-width: 800px;
              margin: 40px auto;
              padding: 20px;
              color: #1a1a1a;
            }
            h1 {
              font-family: 'Merriweather', Georgia, serif;
              font-size: 24px;
              margin-bottom: 20px;
              border-bottom: 2px solid #333;
              padding-bottom: 10px;
            }
            pre {
              white-space: pre-wrap;
              word-wrap: break-word;
              font-family: inherit;
            }
            @media print {
              body { margin: 0; }
            }
          </style>
        </head>
        <body>
          <h1>${title}</h1>
          <pre>${content}</pre>
        </body>
      </html>
    `)
    printWindow.document.close()
    printWindow.focus()
    
    setTimeout(() => {
      printWindow.print()
    }, 250)
  }

  const handleSave = () => {
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('File downloaded!')
  }

  const handleEmail = async () => {
    const result = await sendEmail({
      to: '',
      subject: emailSubject || title,
      body: content
    })
    
    if (result.success) {
      toast.success('Opening email client...')
    } else {
      toast.error(result.message)
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content)
      toast.success('Copied to clipboard!')
    } catch (err) {
      toast.error('Failed to copy to clipboard')
    }
  }

  return (
    <div className="flex gap-2 flex-wrap">
      <Button onClick={handleCopy} variant="default" className="gap-2">
        <Copy className="w-4 h-4" />
        Copy
      </Button>
      <Button onClick={handlePrint} variant="outline" className="gap-2">
        <Printer className="w-4 h-4" />
        Print
      </Button>
      <Button onClick={handleSave} variant="outline" className="gap-2">
        <FloppyDisk className="w-4 h-4" />
        Save
      </Button>
      <Button onClick={handleEmail} variant="outline" className="gap-2">
        <EnvelopeSimple className="w-4 h-4" />
        Email
      </Button>
    </div>
  )
}
