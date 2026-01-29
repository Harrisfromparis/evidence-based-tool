import { GenericPlanner } from './GenericPlanner'

interface SelfManagementSystemDesignerProps {
  onBack: () => void
}

export function SelfManagementSystemDesigner({ onBack }: SelfManagementSystemDesignerProps) {
  return (
    <GenericPlanner
      onBack={onBack}
      title="Self-Management System Designer"
      description="Create self-monitoring tools with visual tracking and student-selected goals. Self-management promotes autonomy, self-awareness, and reduces reliance on adult monitoring."
      storageKey="self-management-systems"
      fields={[
        {
          id: 'studentName',
          label: 'Student Name',
          placeholder: 'Student name',
          type: 'text',
          required: true
        },
        {
          id: 'targetBehavior',
          label: 'Target Behavior',
          placeholder: 'e.g., Staying on task, Using appropriate volume, Completing homework',
          type: 'textarea',
          required: true
        },
        {
          id: 'studentGoals',
          label: 'Student Input on Goals',
          placeholder: 'What does the student want to work on? What matters to them?',
          type: 'textarea'
        }
      ]}
      promptGenerator={(inputs) => `You are an expert in self-management strategies for autistic students.

Student: ${inputs.studentName}
Target Behavior: ${inputs.targetBehavior}
${inputs.studentGoals ? `Student's Goals: ${inputs.studentGoals}` : ''}

Design a self-management system that includes:
1. A simple, observable definition of the target behavior
2. A developmentally appropriate tracking system (checklist, rating scale, tally, visual tracker)
3. Self-monitoring intervals (how often student checks in)
4. Self-evaluation criteria
5. Self-reinforcement plan
6. Plan to gradually fade adult involvement

Ensure goals are meaningful to the student, not just adult priorities. Format as step-by-step implementation guidance.`}
    />
  )
}
