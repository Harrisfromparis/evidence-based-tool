export interface EBP {
  id: string
  title: string
  category: string
  description: string
  overview: string
  quickStart: string[]
  irishExamples: string[]
  ethicalConsiderations: string[]
  whenToUse: string
  relatedEBPs: string[]
}

export interface CaseStudy {
  id: string
  title: string
  ageGroup: string
  setting: string
  challenge: string
  theme: string
  context: string
  approach: string
  ebpsUsed: string[]
  outcome: string
}

export interface Tool {
  id: string
  title: string
  description: string
  category: string
  icon: string
  ebpCategories: string[]
}

export interface RightsContent {
  id: string
  title: string
  content: string
  category: 'uncrpd' | 'irish-law' | 'masking' | 'red-flags'
}

export interface EmailTemplateData {
  studentName?: string
  timestamp: number
  [key: string]: any
}

export interface ExportFormat {
  type: 'text' | 'html'
  available: boolean
  description: string
}

export interface ExportAction {
  type: 'email' | 'copy' | 'download'
  label: string
  icon: string
}
