export interface PrintSection {
  title: string
  content: string | { label: string; value: string }[]
}

export interface PrintOptions {
  title: string
  subtitle?: string
  sections: PrintSection[]
  footer?: string
}

export function generatePrintableHTML(options: PrintOptions): string {
  const { title, subtitle, sections, footer } = options
  
  const renderSection = (section: PrintSection) => {
    if (typeof section.content === 'string') {
      return `
        <div class="section">
          <h2>${section.title}</h2>
          <div class="content">${section.content.replace(/\n/g, '<br>')}</div>
        </div>
      `
    } else {
      const rows = section.content
        .map(
          item => `
          <tr>
            <td class="field-label">${item.label}</td>
            <td class="field-value">${item.value}</td>
          </tr>
        `
        )
        .join('')
      
      return `
        <div class="section">
          <h2>${section.title}</h2>
          <table class="info-table">
            <tbody>${rows}</tbody>
          </table>
        </div>
      `
    }
  }

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    @page {
      size: A4;
      margin: 2cm;
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      font-size: 11pt;
      line-height: 1.6;
      color: #1a1a1a;
      background: #ffffff;
      padding: 0;
      margin: 0;
    }

    .container {
      max-width: 21cm;
      margin: 0 auto;
      padding: 1cm;
      background: white;
    }

    .header {
      margin-bottom: 2em;
      padding-bottom: 1em;
      border-bottom: 2px solid #2c3e50;
    }

    .header h1 {
      font-family: 'Merriweather', Georgia, serif;
      font-size: 24pt;
      font-weight: 700;
      color: #2c3e50;
      margin-bottom: 0.25em;
    }

    .header .subtitle {
      font-size: 10pt;
      color: #64748b;
      font-weight: 400;
    }

    .section {
      margin-bottom: 1.5em;
      page-break-inside: avoid;
    }

    .section h2 {
      font-family: 'Merriweather', Georgia, serif;
      font-size: 14pt;
      font-weight: 700;
      color: #2c3e50;
      margin-bottom: 0.5em;
      padding-bottom: 0.25em;
      border-bottom: 1px solid #cbd5e1;
    }

    .section h3 {
      font-family: 'Inter', sans-serif;
      font-size: 12pt;
      font-weight: 600;
      color: #475569;
      margin-top: 1em;
      margin-bottom: 0.5em;
    }

    .content {
      margin-left: 0.5em;
      color: #334155;
    }

    .info-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 0.5em;
    }

    .info-table td {
      padding: 0.4em 0.5em;
      border-bottom: 1px solid #e2e8f0;
      vertical-align: top;
    }

    .info-table tr:last-child td {
      border-bottom: none;
    }

    .field-label {
      font-weight: 600;
      color: #64748b;
      width: 35%;
    }

    .field-value {
      color: #1e293b;
    }

    .list-item {
      margin-bottom: 1em;
      padding: 0.75em;
      background: #f8fafc;
      border-left: 3px solid #3b82f6;
      page-break-inside: avoid;
    }

    .list-item-title {
      font-weight: 600;
      color: #1e293b;
      margin-bottom: 0.25em;
    }

    .list-item-content {
      color: #475569;
      font-size: 10pt;
    }

    .badge {
      display: inline-block;
      padding: 0.2em 0.6em;
      background: #e0f2fe;
      color: #0369a1;
      border-radius: 3px;
      font-size: 9pt;
      font-weight: 500;
      margin-right: 0.5em;
    }

    .badge.success {
      background: #dcfce7;
      color: #166534;
    }

    .badge.warning {
      background: #fef3c7;
      color: #92400e;
    }

    .badge.danger {
      background: #fee2e2;
      color: #991b1b;
    }

    .footer {
      margin-top: 3em;
      padding-top: 1em;
      border-top: 1px solid #cbd5e1;
      font-size: 9pt;
      color: #64748b;
      text-align: center;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1em;
      margin-bottom: 1em;
    }

    .grid-item {
      padding: 0.5em;
    }

    .grid-item-label {
      font-size: 9pt;
      color: #64748b;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 0.25em;
    }

    .grid-item-value {
      color: #1e293b;
      font-weight: 500;
    }

    .note-box {
      background: #fef9e7;
      border: 1px solid #f4d03f;
      border-radius: 4px;
      padding: 1em;
      margin: 1em 0;
      page-break-inside: avoid;
    }

    .note-box-title {
      font-weight: 600;
      color: #7d6608;
      margin-bottom: 0.5em;
    }

    .note-box-content {
      color: #6b5416;
      font-size: 10pt;
    }

    @media print {
      body {
        background: white;
      }

      .container {
        padding: 0;
        max-width: 100%;
      }

      .section {
        page-break-inside: avoid;
      }

      .list-item {
        page-break-inside: avoid;
      }

      a {
        text-decoration: none;
        color: inherit;
      }

      .no-print {
        display: none !important;
      }
    }

    @media screen {
      body {
        background: #f1f5f9;
        padding: 2em 1em;
      }

      .container {
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      }

      .print-button {
        position: fixed;
        bottom: 2em;
        right: 2em;
        padding: 1em 2em;
        background: #3b82f6;
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 11pt;
        font-weight: 600;
        cursor: pointer;
        box-shadow: 0 4px 6px rgba(59, 130, 246, 0.3);
        transition: all 0.2s;
      }

      .print-button:hover {
        background: #2563eb;
        transform: translateY(-2px);
        box-shadow: 0 6px 8px rgba(59, 130, 246, 0.4);
      }

      .print-button:active {
        transform: translateY(0);
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${title}</h1>
      ${subtitle ? `<div class="subtitle">${subtitle}</div>` : ''}
    </div>
    ${sections.map(renderSection).join('\n')}
    ${footer ? `<div class="footer">${footer}</div>` : ''}
  </div>
  <button class="print-button no-print" onclick="window.print()">🖨️ Print Document</button>
</body>
</html>`

  return html
}

export function exportAsPrintableHTML(options: PrintOptions, filename: string): void {
  const html = generatePrintableHTML(options)
  const blob = new Blob([html], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export function openPrintPreview(options: PrintOptions): void {
  const html = generatePrintableHTML(options)
  const blob = new Blob([html], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  window.open(url, '_blank')
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
