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
} from './email-templates'

import {
  createLessonScriptHTML,
  createSensoryChecklistHTML,
  createBehaviourCommunicationHTML,
  createSchoolPlanHTML,
  createCombinedReportHTML,
  downloadHTMLEmail
} from './html-email-templates'

export type TemplateType = 
  | 'lesson' 
  | 'choose3' 
  | 'sensory' 
  | 'behaviour' 
  | 'coregulation' 
  | 'transition' 
  | 'studentAssessment' 
  | 'parentAssessment' 
  | 'schoolPlan' 
  | 'combined' 
  | 'vrTransition'

export interface ExportOptions {
  data: any
  templateType: TemplateType
  format: 'text' | 'html'
  action: 'email' | 'copy' | 'download'
}

export const exportPlan = async (options: ExportOptions): Promise<boolean> => {
  const { data, templateType, format, action } = options
  const timestamp = data.timestamp || Date.now()
  const dataWithTimestamp = { ...data, timestamp }

  try {
    if (format === 'text') {
      return await handleTextExport(dataWithTimestamp, templateType, action)
    } else {
      return await handleHTMLExport(dataWithTimestamp, templateType, action)
    }
  } catch (error) {
    console.error('Export failed:', error)
    toast.error('Export failed', {
      description: error instanceof Error ? error.message : 'Unknown error occurred'
    })
    return false
  }
}

const handleTextExport = async (
  data: any,
  templateType: TemplateType,
  action: 'email' | 'copy' | 'download'
): Promise<boolean> => {
  let template: EmailTemplate | null = null

  switch (templateType) {
    case 'lesson':
      template = createLessonScriptEmail(data)
      break
    case 'choose3':
      template = createChoose3EBPsEmail(data)
      break
    case 'sensory':
      template = createSensoryChecklistEmail(data)
      break
    case 'behaviour':
      template = createBehaviourCommunicationEmail(data)
      break
    case 'coregulation':
      template = createCoRegulationEmail(data)
      break
    case 'transition':
      template = createTransitionSupportEmail(data)
      break
    case 'studentAssessment':
      template = createStudentAssessmentEmail(data)
      break
    case 'parentAssessment':
      template = createParentAssessmentEmail(data)
      break
    case 'schoolPlan':
      template = createSchoolPlanEmail(data)
      break
    case 'combined':
      template = createCombinedReportEmail(data)
      break
    case 'vrTransition':
      template = createVRTransitionEmail(data)
      break
    default:
      toast.error('Invalid template type')
      return false
  }

  if (!template) {
    toast.error('Failed to generate template')
    return false
  }

  switch (action) {
    case 'email':
      sendEmailWithTemplate(template)
      toast.success('Email client opened')
      return true

    case 'copy':
      await navigator.clipboard.writeText(template.body)
      toast.success('Copied to clipboard')
      return true

    case 'download':
      const textBlob = new Blob([template.body], { type: 'text/plain' })
      const textUrl = URL.createObjectURL(textBlob)
      const textLink = document.createElement('a')
      textLink.href = textUrl
      textLink.download = `${template.subject.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`
      document.body.appendChild(textLink)
      textLink.click()
      document.body.removeChild(textLink)
      URL.revokeObjectURL(textUrl)
      toast.success('Text file downloaded')
      return true

    default:
      return false
  }
}

const handleHTMLExport = async (
  data: any,
  templateType: TemplateType,
  action: 'email' | 'copy' | 'download'
): Promise<boolean> => {
  let html: string | null = null

  switch (templateType) {
    case 'lesson':
      html = createLessonScriptHTML(data)
      break
    case 'sensory':
      html = createSensoryChecklistHTML(data)
      break
    case 'behaviour':
      html = createBehaviourCommunicationHTML(data)
      break
    case 'schoolPlan':
      html = createSchoolPlanHTML(data)
      break
    case 'combined':
      html = createCombinedReportHTML(data)
      break
    default:
      toast.error('HTML template not available for this type')
      return false
  }

  if (!html) {
    toast.error('Failed to generate HTML template')
    return false
  }

  const subject = getSubjectForType(templateType, data)

  switch (action) {
    case 'email':
      const textTemplate = await handleTextExport(data, templateType, 'email')
      return textTemplate

    case 'copy':
      await navigator.clipboard.writeText(html)
      toast.success('HTML copied to clipboard')
      return true

    case 'download':
      const filename = `${subject.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.html`
      downloadHTMLEmail(html, filename)
      toast.success('HTML file downloaded')
      return true

    default:
      return false
  }
}

const getSubjectForType = (templateType: TemplateType, data: any): string => {
  switch (templateType) {
    case 'lesson':
      return `Lesson Script - ${data.learningGoal?.substring(0, 50) || 'Untitled'}`
    case 'choose3':
      return `Choose 3 EBPs Plan - ${data.studentName || 'Student'}`
    case 'sensory':
      return `Sensory Needs Checklist - ${data.studentName || 'Student'}`
    case 'behaviour':
      return `Behaviour Communication Analysis - ${data.studentName || 'Student'}`
    case 'coregulation':
      return `Co-Regulation Strategies - ${data.studentName || 'Student'}`
    case 'transition':
      return `Transition Support Plan - ${data.studentName || 'Student'}`
    case 'studentAssessment':
      return `Student Self-Assessment - ${data.studentName || 'Student'}`
    case 'parentAssessment':
      return `Parent Assessment - ${data.studentName || 'Student'}`
    case 'schoolPlan':
      return `School Support Plan - ${data.studentName || 'Student'}`
    case 'combined':
      return `Comprehensive Support Report - ${data.studentName || 'Student'}`
    case 'vrTransition':
      return `VR Transition Preparation - ${data.studentName || 'Student'}`
    default:
      return 'Untitled Document'
  }
}

export const getAvailableFormats = (templateType: TemplateType): ('text' | 'html')[] => {
  const htmlAvailable: TemplateType[] = ['lesson', 'sensory', 'behaviour', 'schoolPlan', 'combined']
  
  if (htmlAvailable.includes(templateType)) {
    return ['text', 'html']
  }
  
  return ['text']
}

export const getTemplateDescription = (templateType: TemplateType): string => {
  switch (templateType) {
    case 'lesson':
      return 'Complete lesson script with EBPs, supports, and assessment'
    case 'choose3':
      return 'Guided selection of 3 evidence-based practices'
    case 'sensory':
      return 'Comprehensive sensory needs observation checklist'
    case 'behaviour':
      return 'ABC analysis with communication interpretation'
    case 'coregulation':
      return 'Strategies for supporting student regulation'
    case 'transition':
      return 'Support plan for transitions between activities or settings'
    case 'studentAssessment':
      return 'Student self-assessment of supports and preferences'
    case 'parentAssessment':
      return 'Parent/carer input on what works at home'
    case 'schoolPlan':
      return 'Comprehensive daily school support plan'
    case 'combined':
      return 'Combined report from multiple assessments'
    case 'vrTransition':
      return 'VR-based transition preparation plan'
    default:
      return 'Template document'
  }
}
