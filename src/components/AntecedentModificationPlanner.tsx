import { GenericPlanner } from './GenericPlanner'

interface AntecedentModificationPlannerProps {
  onBack: () => void
}

export function AntecedentModificationPlanner({ onBack }: AntecedentModificationPlannerProps) {
  return (
    <GenericPlanner
      onBack={onBack}
      title="Antecedent Modification Planner"
      description="Identify triggers and design environmental modifications to prevent challenges. Antecedent-based interventions proactively adjust settings to reduce triggers and set students up for success."
      storageKey="antecedent-modification-plans"
      fields={[
        {
          id: 'studentName',
          label: 'Student Name',
          placeholder: 'Student name',
          type: 'text'
        },
        {
          id: 'challengingSituation',
          label: 'Challenging Situation',
          placeholder: 'e.g., Meltdowns during maths lessons, Refusal during transitions, Difficulty in loud assembly',
          type: 'textarea',
          required: true
        },
        {
          id: 'identifiedTriggers',
          label: 'Identified Triggers',
          placeholder: 'What happens right before difficulties occur? Environmental factors? Time of day? Specific demands?',
          type: 'textarea',
          required: true
        }
      ]}
      promptGenerator={(inputs) => `You are an expert in antecedent-based interventions for autistic students.

Student: ${inputs.studentName || 'Student'}
Challenging Situation: ${inputs.challengingSituation}
Identified Triggers: ${inputs.identifiedTriggers}

Create an antecedent modification plan that includes:
1. Analysis of antecedent patterns (when, where, with whom difficulties occur)
2. Specific environmental modifications (lighting, noise, seating, timing, materials)
3. Proactive strategies (choice-making, priming, incorporating interests, schedule changes)
4. Implementation steps (what to change and how)
5. How to observe whether changes reduce difficulties
6. Ethical considerations (modifications should support not segregate, include student input, avoid using as punishment/reward)

Ensure changes benefit student wellbeing, not just adult convenience. Format as actionable modification strategies.`}
    />
  )
}
