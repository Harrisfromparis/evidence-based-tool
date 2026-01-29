import { GenericPlanner } from './GenericPlanner'

interface AACImplementationPlannerProps {
  onBack: () => void
}

export function AACImplementationPlanner({ onBack }: AACImplementationPlannerProps) {
  return (
    <GenericPlanner
      onBack={onBack}
      title="AAC Implementation Planner"
      description="Plan AAC system introduction, partner training, and vocabulary expansion. AAC supports students who are minimally verbal or non-speaking to communicate wants, needs, thoughts, and feelings."
      storageKey="aac-implementation-plans"
      fields={[
        {
          id: 'studentName',
          label: 'Student Name',
          placeholder: 'Student name',
          type: 'text',
          required: true
        },
        {
          id: 'currentCommunication',
          label: 'Current Communication',
          placeholder: 'Describe how the student currently communicates (gestures, sounds, single words, etc.)',
          type: 'textarea',
          required: true
        },
        {
          id: 'aacSystem',
          label: 'AAC System',
          placeholder: 'e.g., PECS, iPad with Proloquo2Go, Communication book, Sign language (Lámh), Low-tech picture board',
          type: 'text',
          required: true
        }
      ]}
      promptGenerator={(inputs) => `You are an expert in AAC (Augmentative and Alternative Communication) implementation for autistic students.

Student: ${inputs.studentName}
Current Communication: ${inputs.currentCommunication}
AAC System: ${inputs.aacSystem}

Create an AAC implementation plan that includes:
1. Assessment of student's communication needs and contexts
2. Rationale for chosen AAC system
3. Initial core vocabulary (functional words for immediate communication)
4. Modeling plan (how adults will use AAC throughout the day)
5. Partner training (teaching communication partners to recognize and respond to AAC)
6. Vocabulary expansion timeline
7. Ethical considerations (presume competence, never withhold AAC as punishment, provide robust vocabulary not just requests, support autonomy by giving access at all times)

Emphasize that AAC users have thoughts and feelings to express beyond basic needs. Format as step-by-step implementation guidance.`}
    />
  )
}
