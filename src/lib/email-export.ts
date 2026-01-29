export function generateEmailBody(content: string): string {
  return encodeURIComponent(content)
}

export function generateEmailSubject(subject: string): string {
  return encodeURIComponent(subject)
}

export function openEmailClient(subject: string, body: string): void {
  const mailtoLink = `mailto:?subject=${generateEmailSubject(subject)}&body=${generateEmailBody(body)}`
  window.location.href = mailtoLink
}

export function formatDateForEmail(timestamp: number): string {
  return new Date(timestamp).toLocaleString('en-IE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export function createTextDivider(char: string = '='): string {
  return char.repeat(60)
}

export function createSectionHeader(title: string): string {
  return `\n${createTextDivider()}\n${title.toUpperCase()}\n${createTextDivider()}\n`
}
