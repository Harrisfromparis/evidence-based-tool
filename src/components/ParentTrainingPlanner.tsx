import { GenericPlanner } from './GenericPlanner'

interface ParentTrainingPlannerProps {
  onBack: () => void
}

export function ParentTrainingPlanner({ onBack }: ParentTrainingPlannerProps) {
  return (
    <GenericPlanner
      onBack={onBack}
      title="Parent Training Session Planner"
      description="Design parent workshops or one-on-one coaching sessions for home implementation. Parent-implemented interventions promote consistency, generalization, and empower families as partners."
      storageKey="parent-training-plans"
      fields={[
        {
          id: 'strategy',
          label: 'Strategy/EBP to Teach',
          placeholder: 'e.g., Visual schedules, AAC modeling, Naturalistic teaching, Reinforcement',
          type: 'text',
          required: true
        },
        {
          id: 'format',
          label: 'Format',
          placeholder: 'e.g., Workshop for multiple families, One-on-one home visit, Online session',
          type: 'text',
          required: true
        },
        {
          id: 'familyContext',
          label: 'Family Context/Priorities',
          placeholder: 'What are the family\'s priorities, values, and capacity?',
          type: 'textarea'
        }
      ]}
      promptGenerator={(inputs) => `You are an expert in parent training for families of autistic children.

Strategy to Teach: ${inputs.strategy}
Format: ${inputs.format}
${inputs.familyContext ? `Family Context: ${inputs.familyContext}` : ''}

Design a parent training session plan that includes:
1. Session objectives (what parents will learn)
2. Clear explanation of the strategy with examples
3. Demonstration/modeling plan
4. Parent practice opportunities with feedback
5. Home implementation guidance
6. Follow-up and problem-solving plan
7. Resources to share with families

Respect family priorities, values, and capacity. Avoid overwhelming families. Support, don't blame. Ensure strategies align with family culture and home environment. Format as a session outline with timing.`}
    />
  )
}
