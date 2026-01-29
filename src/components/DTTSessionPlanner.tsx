import { GenericPlanner } from './GenericPlanner'

interface DTTSessionPlannerProps {
  onBack: () => void
}

export function DTTSessionPlanner({ onBack }: DTTSessionPlannerProps) {
  return (
    <GenericPlanner
      onBack={onBack}
      title="DTT Session Planner"
      description="Design discrete trial teaching sessions with data collection and errorless learning. DTT involves repeated practice of specific skills in a controlled format."
      storageKey="dtt-session-plans"
      fields={[
        {
          id: 'targetSkill',
          label: 'Target Skill',
          placeholder: 'e.g., Color identification, Responding to name, Coin recognition, Sound pronunciation',
          type: 'text',
          required: true
        },
        {
          id: 'currentLevel',
          label: 'Current Performance',
          placeholder: 'What can the student currently do related to this skill?',
          type: 'textarea',
          required: true
        },
        {
          id: 'sessionLength',
          label: 'Session Length',
          placeholder: 'e.g., 5 minutes, 10 minutes, 15 minutes',
          type: 'text'
        }
      ]}
      promptGenerator={(inputs) => `You are an expert in Discrete Trial Training (DTT) for autistic students.

Target Skill: ${inputs.targetSkill}
Current Performance: ${inputs.currentLevel}
${inputs.sessionLength ? `Session Length: ${inputs.sessionLength}` : ''}

Create a DTT session plan that includes:
1. Skill broken into smallest possible steps
2. Clear, consistent instruction to use
3. Materials needed
4. Response expectations
5. Immediate feedback plan (reinforcement for correct, gentle correction for incorrect)
6. Number of trials
7. Data collection method (% correct)
8. Errorless learning techniques if appropriate
9. Ethical considerations (avoid overly long or aversive sessions, balance with naturalistic learning, ensure skills are meaningful and generalizable, respect frustration signals, avoid compliance training that erodes autonomy)

Format as a practical session plan with example trials.`}
    />
  )
}
