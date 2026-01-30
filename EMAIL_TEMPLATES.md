# Email Templates for Plans and Assessments

This document provides comprehensive guidance on using email templates throughout the Autism and Me application.

## Overview

The email template system provides professional, branded templates for sharing plans, assessments, and reports via email. All templates are available in both plain text and HTML formats (where applicable) and include the app branding in black, green, and orange.

## Available Templates

### 1. Lesson Script Template
**Template Type:** `lesson`  
**HTML Support:** ✅ Yes  
**Use Case:** Sharing complete lesson scripts with EBPs, supports, and assessment approaches

**Required Data:**
```typescript
{
  studentProfile: string
  learningGoal: string
  selectedEBPs: string[]
  sensorySupports: string
  communicationSupports: string
  assessmentApproach: string
  script: string
  timestamp: number
}
```

### 2. Choose 3 EBPs Template
**Template Type:** `choose3`  
**HTML Support:** ❌ Text only  
**Use Case:** Sharing the guided selection of 3 evidence-based practices

**Required Data:**
```typescript
{
  studentName: string
  situation: string
  keyNeeds: string[]
  selectedEBPs: Array<{ name: string; rationale: string }>
  nextSteps: string
  reviewPlan: string
  timestamp: number
}
```

### 3. Sensory Needs Checklist Template
**Template Type:** `sensory`  
**HTML Support:** ✅ Yes  
**Use Case:** Sharing comprehensive sensory observations

**Required Data:**
```typescript
{
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
}
```

### 4. Behaviour as Communication Template
**Template Type:** `behaviour`  
**HTML Support:** ✅ Yes  
**Use Case:** Sharing ABC analysis with communication interpretation

**Required Data:**
```typescript
{
  studentName: string
  observedBehaviour: string
  antecedent: string
  consequence: string
  possibleMessage: string
  unmetNeed: string
  relevantEBPs: string[]
  proposedSupports: string
  timestamp: number
}
```

### 5. Co-Regulation Strategies Template
**Template Type:** `coregulation`  
**HTML Support:** ❌ Text only  
**Use Case:** Sharing co-regulation strategies and approaches

**Required Data:**
```typescript
{
  studentName: string
  context: string
  environmentalSupports: string[]
  adultPresenceStrategies: string[]
  sensorySupports: string[]
  predictabilityStrategies: string[]
  languageScripts: string[]
  additionalNotes: string
  timestamp: number
}
```

### 6. Transition Support Template
**Template Type:** `transition`  
**HTML Support:** ❌ Text only  
**Use Case:** Sharing transition support plans

**Required Data:**
```typescript
{
  studentName: string
  transitionType: string
  transitionDetails: string
  stressPoints: string[]
  visualSupports: string[]
  rehearsalPlan: string
  socialNarrative: string
  communicationPlan: string
  reviewDate: string
  timestamp: number
}
```

### 7. Student Self-Assessment Template
**Template Type:** `studentAssessment`  
**HTML Support:** ❌ Text only  
**Use Case:** Sharing student input on supports and preferences

**Required Data:**
```typescript
{
  studentName: string
  completedBy: string
  responses: Array<{
    ebpName: string
    rating: string
    comments: string
  }>
  overallFeedback: string
  preferredSupports: string[]
  timestamp: number
}
```

### 8. Parent/Carer Assessment Template
**Template Type:** `parentAssessment`  
**HTML Support:** ❌ Text only  
**Use Case:** Sharing parent/carer input on what works at home

**Required Data:**
```typescript
{
  studentName: string
  parentName: string
  responses: Array<{
    ebpName: string
    worksWell: string
    doesntWork: string
    homeContext: string
  }>
  priorities: string[]
  additionalInformation: string
  timestamp: number
}
```

### 9. School Support Plan Template
**Template Type:** `schoolPlan`  
**HTML Support:** ✅ Yes  
**Use Case:** Sharing comprehensive daily school support plans

**Required Data:**
```typescript
{
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
}
```

### 10. Combined Report Template
**Template Type:** `combined`  
**HTML Support:** ✅ Yes  
**Use Case:** Sharing comprehensive reports combining multiple assessments

**Required Data:**
```typescript
{
  studentName: string
  parentAssessment?: any
  studentAssessment?: any
  schoolPlan?: any
  sensoryChecklist?: any
  behaviourAnalyses?: any[]
  timestamp: number
}
```

### 11. VR Transition Preparation Template
**Template Type:** `vrTransition`  
**HTML Support:** ❌ Text only  
**Use Case:** Sharing VR-based transition preparation plans

**Required Data:**
```typescript
{
  studentName: string
  scenario: string
  purpose: string
  duration: string
  successCriteria: string
  supportNeeded: string
  followUp: string
  timestamp: number
}
```

## Usage

### Using the ExportActions Component (Recommended)

The easiest way to add email templates to your component is to use the `ExportActions` component:

```typescript
import { ExportActions } from '@/components/ExportActions'

function MyPlanComponent() {
  const planData = {
    studentName: "Example Student",
    // ... other data
    timestamp: Date.now()
  }

  return (
    <div>
      {/* Your plan content */}
      
      <div className="mt-6">
        <ExportActions 
          data={planData}
          templateType="lesson"
          disabled={!planData.studentName}
        />
      </div>
    </div>
  )
}
```

### Using the Template Export Utils Directly

For more control, use the utilities directly:

```typescript
import { exportPlan, getAvailableFormats } from '@/lib/template-export-utils'

// Check available formats
const formats = getAvailableFormats('lesson') // ['text', 'html']

// Export as email
await exportPlan({
  data: myData,
  templateType: 'lesson',
  format: 'text',
  action: 'email'
})

// Copy to clipboard
await exportPlan({
  data: myData,
  templateType: 'lesson',
  format: 'text',
  action: 'copy'
})

// Download as file
await exportPlan({
  data: myData,
  templateType: 'lesson',
  format: 'html',
  action: 'download'
})
```

### Using Template Functions Directly

For advanced use cases, use the template generator functions:

```typescript
import { createLessonScriptEmail, sendEmailWithTemplate } from '@/lib/email-templates'
import { createLessonScriptHTML, downloadHTMLEmail } from '@/lib/html-email-templates'

// Create text email template
const emailTemplate = createLessonScriptEmail(myData)
console.log(emailTemplate.subject)
console.log(emailTemplate.body)

// Send via default email client
sendEmailWithTemplate(emailTemplate)

// Create HTML template
const html = createLessonScriptHTML(myData)

// Download HTML
downloadHTMLEmail(html, 'lesson-script.html')
```

### Using the EmailTemplatePreview Component

For showing a preview dialog:

```typescript
import { EmailTemplatePreview } from '@/components/EmailTemplatePreview'
import { Dialog, DialogContent } from '@/components/ui/dialog'

function MyComponent() {
  const [showPreview, setShowPreview] = useState(false)

  return (
    <>
      <Button onClick={() => setShowPreview(true)}>
        Preview Email
      </Button>

      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-4xl">
          <EmailTemplatePreview 
            data={myData}
            templateType="lesson"
            onClose={() => setShowPreview(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}
```

## HTML Template Features

HTML templates include:

- **Brand Colours:** Black (#262626), Green (#7ca982), Orange (#d97706)
- **Professional Typography:** Merriweather for headings, Inter for body
- **Print Optimisation:** Automatic page breaks and print-friendly styling
- **Responsive Design:** Works on all screen sizes
- **Accessibility:** High contrast, clear hierarchy
- **Visual Elements:** Info boxes, warning boxes, highlight boxes, tables

## Email Best Practices

1. **Always include timestamp:** Ensures the data includes when it was generated
2. **Validate data:** Check that required fields are present before generating templates
3. **Use descriptive student names:** "Student A" or "Example Student" if privacy is needed
4. **Test email clients:** Plain text works everywhere; HTML may need download/attach workflow
5. **Include review dates:** All plans should have clear review schedules
6. **Add team members:** Document who is involved in implementing the plan

## Customising Templates

To add a new template:

1. **Create text template** in `/src/lib/email-templates.ts`
2. **Create HTML template** (optional) in `/src/lib/html-email-templates.ts`
3. **Add template type** to `TemplateType` union in `/src/lib/template-export-utils.ts`
4. **Add cases** to switch statements in export utils
5. **Add description** to `getTemplateDescription()`

## Accessibility Considerations

- All templates use UK English spelling and Euro currency symbols
- Text templates work in all email clients, including accessibility-focused ones
- HTML templates use semantic HTML and ARIA where appropriate
- High contrast ratios throughout
- Clear heading hierarchy
- Print-friendly by default

## Technical Notes

- Templates use the mailto: protocol for email (opens default client)
- HTML templates can be downloaded and attached to emails manually
- Text templates are properly encoded for email transmission
- All timestamps are formatted for Irish locale (en-IE)
- Templates include app signature and branding

## Support

For issues or questions about email templates, check:
- Component source code for implementation examples
- Type definitions for required data structures
- Browser console for error messages
