import { GenericPlanner } from './GenericPlanner'

interface StructuredWorkPlannerProps {
  onBack: () => void
}

export function StructuredWorkPlanner({ onBack }: StructuredWorkPlannerProps) {
  return (
    <GenericPlanner
      onBack={onBack}
      title="Structured Work System Planner"
      description="Design work systems answering: What work? How much? When finished? What next? Structured work systems provide clarity, reduce uncertainty, and support independence."
      storageKey="structured-work-systems"
      fields={[
        {
          id: 'studentName',
          label: 'Student Name',
          placeholder: 'Student name',
          type: 'text'
        },
        {
          id: 'workActivity',
          label: 'Work Activity or Period',
          placeholder: 'e.g., Morning independent work, Maths station, Literacy tasks',
          type: 'text',
          required: true
        },
        {
          id: 'currentChallenges',
          label: 'Current Challenges',
          placeholder: 'What difficulties does the student face during this work time?',
          type: 'textarea',
          required: true
        }
      ]}
      promptGenerator={(inputs) => `You are an expert in structured work systems (TEACCH approach) for autistic students.

Student: ${inputs.studentName || 'Student'}
Work Activity: ${inputs.workActivity}
Current Challenges: ${inputs.currentChallenges}

Design a structured work system that addresses the four key questions:
1. What work? (How to communicate what tasks to complete)
2. How much? (How to show quantity/duration)
3. When finished? (How student knows they're done)
4. What next? (What happens after completion)

Include:
- Visual organization strategies (left-to-right, top-to-bottom, numbered systems)
- Materials placement and setup
- Completion signals
- Reinforcement or next activity
- How to teach the system
- Adaptations for different ages and abilities

Balance structure with opportunities for choice. Format as practical implementation steps.`}
    />
  )
}
