import { formatDateForEmail } from './email-export'

const EMAIL_STYLES = `
  <style>
    body {
      font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      line-height: 1.6;
      color: #262626;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      background-color: #fafafa;
    }
    .header {
      background-color: #262626;
      color: #fafafa;
      padding: 30px;
      text-align: center;
      border-radius: 2px;
    }
    .header h1 {
      margin: 0;
      font-family: Merriweather, Georgia, serif;
      font-size: 28px;
    }
    .header .subtitle {
      margin-top: 10px;
      font-size: 14px;
      opacity: 0.9;
    }
    .content {
      background-color: #ffffff;
      padding: 30px;
      margin-top: 20px;
      border-radius: 2px;
      border: 1px solid #e5e5e5;
    }
    .section {
      margin-bottom: 30px;
    }
    .section-title {
      font-family: Merriweather, Georgia, serif;
      font-size: 20px;
      color: #262626;
      margin-bottom: 15px;
      padding-bottom: 10px;
      border-bottom: 3px solid #7ca982;
    }
    .subsection-title {
      font-weight: 600;
      font-size: 16px;
      color: #262626;
      margin-top: 20px;
      margin-bottom: 10px;
    }
    .highlight-box {
      background-color: #f5f5f5;
      border-left: 4px solid #7ca982;
      padding: 15px;
      margin: 15px 0;
    }
    .warning-box {
      background-color: #fff5f0;
      border-left: 4px solid #d97706;
      padding: 15px;
      margin: 15px 0;
    }
    .info-box {
      background-color: #f0f9f4;
      border-left: 4px solid #7ca982;
      padding: 15px;
      margin: 15px 0;
    }
    .list-item {
      margin-bottom: 10px;
      padding-left: 10px;
    }
    .footer {
      background-color: #262626;
      color: #fafafa;
      padding: 20px;
      text-align: center;
      margin-top: 20px;
      border-radius: 2px;
      font-size: 14px;
    }
    .footer a {
      color: #7ca982;
      text-decoration: none;
    }
    .accent {
      color: #7ca982;
    }
    .orange-accent {
      color: #d97706;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 15px 0;
    }
    th {
      background-color: #f5f5f5;
      padding: 12px;
      text-align: left;
      font-weight: 600;
      border-bottom: 2px solid #7ca982;
    }
    td {
      padding: 12px;
      border-bottom: 1px solid #e5e5e5;
    }
    .metadata {
      color: #737373;
      font-size: 14px;
      margin-bottom: 20px;
    }
    @media print {
      body {
        background-color: white;
      }
      .header, .footer {
        background-color: #262626;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
    }
  </style>
`

const createHeader = (title: string, subtitle?: string) => `
  <div class="header">
    <h1>${title}</h1>
    ${subtitle ? `<div class="subtitle">${subtitle}</div>` : ''}
  </div>
`

const createFooter = () => `
  <div class="footer">
    <p><strong>Autism and Me</strong></p>
    <p>Evidence Based Practice for Autism Support</p>
    <p><a href="https://www.autismandme.com">www.autismandme.com</a></p>
    <p style="margin-top: 15px; opacity: 0.8;">Generated on ${formatDateForEmail(Date.now())}</p>
  </div>
`

export const createLessonScriptHTML = (data: {
  studentProfile: string
  learningGoal: string
  selectedEBPs: string[]
  sensorySupports: string
  communicationSupports: string
  assessmentApproach: string
  script: string
  timestamp: number
}): string => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lesson Script - ${data.learningGoal}</title>
  ${EMAIL_STYLES}
</head>
<body>
  ${createHeader('Lesson Script', 'Evidence-Based Practice Plan')}
  
  <div class="content">
    <div class="metadata">Generated: ${formatDateForEmail(data.timestamp)}</div>
    
    <div class="section">
      <div class="section-title">Student/Group Profile</div>
      <p>${data.studentProfile}</p>
    </div>
    
    <div class="section">
      <div class="section-title">Learning Goal</div>
      <div class="highlight-box">
        <strong>${data.learningGoal}</strong>
      </div>
    </div>
    
    <div class="section">
      <div class="section-title">Evidence-Based Practices Used</div>
      ${data.selectedEBPs.map(ebp => `<div class="list-item"><span class="accent">●</span> ${ebp}</div>`).join('')}
    </div>
    
    <div class="section">
      <div class="section-title">Sensory Supports</div>
      <p>${data.sensorySupports}</p>
    </div>
    
    <div class="section">
      <div class="section-title">Communication Supports</div>
      <p>${data.communicationSupports}</p>
    </div>
    
    <div class="section">
      <div class="section-title">Assessment Approach</div>
      <p>${data.assessmentApproach}</p>
    </div>
    
    <div class="section">
      <div class="section-title">Lesson Script</div>
      <div style="white-space: pre-wrap;">${data.script}</div>
    </div>
  </div>
  
  ${createFooter()}
</body>
</html>
  `
}

export const createSensoryChecklistHTML = (data: {
  studentName: string
  completedBy: string
  observations: {
    visual: { seeks: string[]; avoids: string[]; notes: string }
    auditory: { seeks: string[]; avoids: string[]; notes: string }
    tactile: { seeks: string[]; avoids: string[]; notes: string }
    proprioceptive: { seeks: string[]; avoids: string[]; notes: string }
    vestibular: { seeks: string[]; avoids: string[]; notes: string }
    olfactoryGustatory: { seeks: string[]; avoids: string[]; notes: string }
  }
  recommendations: string
  timestamp: number
}): string => {
  const createSensoryTable = (category: string, data: { seeks: string[]; avoids: string[]; notes: string }) => `
    <div class="subsection-title">${category}</div>
    <table>
      <tr>
        <th style="width: 30%">Seeks</th>
        <th style="width: 30%">Avoids</th>
        <th style="width: 40%">Notes</th>
      </tr>
      <tr>
        <td>${data.seeks.length > 0 ? data.seeks.map(s => `<div class="list-item">● ${s}</div>`).join('') : '<em>None noted</em>'}</td>
        <td>${data.avoids.length > 0 ? data.avoids.map(s => `<div class="list-item">● ${s}</div>`).join('') : '<em>None noted</em>'}</td>
        <td>${data.notes || '<em>None</em>'}</td>
      </tr>
    </table>
  `
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sensory Needs Checklist - ${data.studentName}</title>
  ${EMAIL_STYLES}
</head>
<body>
  ${createHeader('Sensory Needs Checklist', data.studentName)}
  
  <div class="content">
    <div class="metadata">
      Generated: ${formatDateForEmail(data.timestamp)}<br>
      Completed by: ${data.completedBy}
    </div>
    
    <div class="section">
      <div class="section-title">Sensory Observations</div>
      
      ${createSensoryTable('Visual', data.observations.visual)}
      ${createSensoryTable('Auditory', data.observations.auditory)}
      ${createSensoryTable('Tactile', data.observations.tactile)}
      ${createSensoryTable('Proprioceptive', data.observations.proprioceptive)}
      ${createSensoryTable('Vestibular', data.observations.vestibular)}
      ${createSensoryTable('Olfactory/Gustatory', data.observations.olfactoryGustatory)}
    </div>
    
    <div class="section">
      <div class="section-title">Recommendations</div>
      <div class="info-box">
        ${data.recommendations}
      </div>
    </div>
  </div>
  
  ${createFooter()}
</body>
</html>
  `
}

export const createBehaviourCommunicationHTML = (data: {
  studentName: string
  observedBehaviour: string
  antecedent: string
  consequence: string
  possibleMessage: string
  unmetNeed: string
  relevantEBPs: string[]
  proposedSupports: string
  timestamp: number
}): string => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Behaviour as Communication Analysis - ${data.studentName}</title>
  ${EMAIL_STYLES}
</head>
<body>
  ${createHeader('Behaviour as Communication Analysis', data.studentName)}
  
  <div class="content">
    <div class="metadata">Generated: ${formatDateForEmail(data.timestamp)}</div>
    
    <div class="warning-box">
      <strong>Core Principle:</strong> All behaviour is communication. Our role is to understand the message and respond with appropriate supports.
    </div>
    
    <div class="section">
      <div class="section-title">ABC Analysis</div>
      
      <div class="subsection-title">Antecedent (What happened before?)</div>
      <p>${data.antecedent}</p>
      
      <div class="subsection-title">Behaviour (What did the student do?)</div>
      <div class="highlight-box">${data.observedBehaviour}</div>
      
      <div class="subsection-title">Consequence (What happened after?)</div>
      <p>${data.consequence}</p>
    </div>
    
    <div class="section">
      <div class="section-title">Understanding the Communication</div>
      
      <div class="subsection-title">Possible Communication Message</div>
      <div class="info-box">${data.possibleMessage}</div>
      
      <div class="subsection-title">Possible Unmet Need</div>
      <div class="info-box">${data.unmetNeed}</div>
    </div>
    
    <div class="section">
      <div class="section-title">Relevant Evidence-Based Practices</div>
      ${data.relevantEBPs.map(ebp => `<div class="list-item"><span class="accent">●</span> ${ebp}</div>`).join('')}
    </div>
    
    <div class="section">
      <div class="section-title">Proposed Supports</div>
      <p>${data.proposedSupports}</p>
    </div>
  </div>
  
  ${createFooter()}
</body>
</html>
  `
}

export const createSchoolPlanHTML = (data: {
  studentName: string
  planType: string
  createdBy: string
  dailySchedule: string
  environmentalAdaptations: string[]
  communicationSupports: string[]
  sensoryBreaks: string[]
  socialSupports: string[]
  academicAccommodations: string[]
  emergencyProtocol: string
  teamMembers: string[]
  reviewDate: string
  timestamp: number
}): string => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>School Support Plan - ${data.studentName}</title>
  ${EMAIL_STYLES}
</head>
<body>
  ${createHeader('School Support Plan', data.studentName)}
  
  <div class="content">
    <div class="metadata">
      Generated: ${formatDateForEmail(data.timestamp)}<br>
      Plan Type: ${data.planType}<br>
      Created by: ${data.createdBy}
    </div>
    
    <div class="section">
      <div class="section-title">Daily Schedule</div>
      <div style="white-space: pre-wrap;">${data.dailySchedule}</div>
    </div>
    
    <div class="section">
      <div class="section-title">Environmental Adaptations</div>
      ${data.environmentalAdaptations.map(item => `<div class="list-item"><span class="accent">●</span> ${item}</div>`).join('')}
    </div>
    
    <div class="section">
      <div class="section-title">Communication Supports</div>
      ${data.communicationSupports.map(item => `<div class="list-item"><span class="accent">●</span> ${item}</div>`).join('')}
    </div>
    
    <div class="section">
      <div class="section-title">Sensory Breaks</div>
      ${data.sensoryBreaks.map(item => `<div class="list-item"><span class="accent">●</span> ${item}</div>`).join('')}
    </div>
    
    <div class="section">
      <div class="section-title">Social Supports</div>
      ${data.socialSupports.map(item => `<div class="list-item"><span class="accent">●</span> ${item}</div>`).join('')}
    </div>
    
    <div class="section">
      <div class="section-title">Academic Accommodations</div>
      ${data.academicAccommodations.map(item => `<div class="list-item"><span class="accent">●</span> ${item}</div>`).join('')}
    </div>
    
    <div class="section">
      <div class="section-title">Emergency Protocol</div>
      <div class="warning-box">${data.emergencyProtocol}</div>
    </div>
    
    <div class="section">
      <div class="section-title">Team Members</div>
      ${data.teamMembers.map(member => `<div class="list-item"><span class="accent">●</span> ${member}</div>`).join('')}
    </div>
    
    <div class="section">
      <div class="section-title">Review Schedule</div>
      <div class="highlight-box">
        <strong>Review Date:</strong> ${data.reviewDate}
      </div>
    </div>
  </div>
  
  ${createFooter()}
</body>
</html>
  `
}

export const createCombinedReportHTML = (data: {
  studentName: string
  parentAssessment?: any
  studentAssessment?: any
  schoolPlan?: any
  sensoryChecklist?: any
  behaviourAnalyses?: any[]
  timestamp: number
}): string => {
  let sections = ''
  
  if (data.parentAssessment) {
    sections += `
      <div class="section">
        <div class="section-title">Parent/Carer Perspective</div>
        <div class="subsection-title">Completed by: ${data.parentAssessment.parentName}</div>
        <div class="subsection-title">Key Priorities:</div>
        ${data.parentAssessment.priorities.map((p: string) => `<div class="list-item"><span class="accent">●</span> ${p}</div>`).join('')}
      </div>
    `
  }
  
  if (data.studentAssessment) {
    sections += `
      <div class="section">
        <div class="section-title">Student Perspective</div>
        <div class="subsection-title">Preferred Supports:</div>
        ${data.studentAssessment.preferredSupports.map((s: string) => `<div class="list-item"><span class="accent">●</span> ${s}</div>`).join('')}
        <div class="subsection-title">Overall Feedback:</div>
        <div class="info-box">${data.studentAssessment.overallFeedback}</div>
      </div>
    `
  }
  
  if (data.sensoryChecklist) {
    sections += `
      <div class="section">
        <div class="section-title">Sensory Profile Summary</div>
        <p>Key sensory needs have been identified across multiple domains. Detailed sensory checklist available in separate document.</p>
      </div>
    `
  }
  
  if (data.schoolPlan) {
    sections += `
      <div class="section">
        <div class="section-title">Current School Support Plan</div>
        <div class="list-item"><strong>Plan Type:</strong> ${data.schoolPlan.planType}</div>
        <div class="list-item"><strong>Review Date:</strong> ${data.schoolPlan.reviewDate}</div>
        <div class="list-item"><strong>Team Members:</strong> ${data.schoolPlan.teamMembers.length}</div>
      </div>
    `
  }
  
  if (data.behaviourAnalyses && data.behaviourAnalyses.length > 0) {
    sections += `
      <div class="section">
        <div class="section-title">Behaviour Communication Analyses</div>
        <p>${data.behaviourAnalyses.length} behaviour analysis/analyses completed. Key themes identified in separate documents.</p>
      </div>
    `
  }
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Comprehensive Support Report - ${data.studentName}</title>
  ${EMAIL_STYLES}
</head>
<body>
  ${createHeader('Comprehensive Support Report', data.studentName)}
  
  <div class="content">
    <div class="metadata">Generated: ${formatDateForEmail(data.timestamp)}</div>
    
    <div class="info-box">
      <strong>About this report:</strong> This report combines multiple assessments and plans to provide a holistic view of support needs and strategies.
    </div>
    
    ${sections}
    
    <div class="section">
      <div class="section-title">Recommendations</div>
      <div class="warning-box">
        <p>This combined report should be reviewed collaboratively by the full support team, including the student and family where appropriate.</p>
        <p><strong>All supports should be:</strong></p>
        <ul>
          <li>Evidence-based</li>
          <li>Student-centred</li>
          <li>Regularly reviewed and adjusted</li>
          <li>Implemented with dignity and autonomy</li>
        </ul>
      </div>
    </div>
  </div>
  
  ${createFooter()}
</body>
</html>
  `
}

export const downloadHTMLEmail = (html: string, filename: string) => {
  const blob = new Blob([html], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
