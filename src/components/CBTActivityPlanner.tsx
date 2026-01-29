import { GenericPlanner } from './GenericPlanner'

interface CBTActivityPlannerProps {
  onBack: () => void
}

export function CBTActivityPlanner({ onBack }: CBTActivityPlannerProps) {
  return (
    <GenericPlanner
      onBack={onBack}
      title="CBT Activity Planner"
      description="Design cognitive behavioral activities for anxiety, emotions, and problem-solving. CBT-based approaches help students identify emotions, understand connections between thoughts and reactions, and practice coping strategies."
      storageKey="cbt-activity-plans"
      fields={[
        {
          id: 'studentName',
          label: 'Student Name',
          placeholder: 'Student name',
          type: 'text'
        },
        {
          id: 'targetArea',
          label: 'Target Area',
          placeholder: 'e.g., Test anxiety, Social anxiety, Emotional regulation, Worry management',
          type: 'text',
          required: true
        },
        {
          id: 'currentChallenges',
          label: 'Current Challenges',
          placeholder: 'Describe specific situations where the student struggles',
          type: 'textarea',
          required: true
        }
      ]}
      promptGenerator={(inputs) => `You are an expert in cognitive-behavioral interventions adapted for autistic students.

Student: ${inputs.studentName || 'Student'}
Target Area: ${inputs.targetArea}
Current Challenges: ${inputs.currentChallenges}

Design a CBT activity plan that includes:
1. Emotion identification activities using visuals or scales
2. Thought-feeling-behavior connection exercises
3. Simple coping strategies matched to student's abilities (deep breathing, taking space, using self-talk, sensory strategies)
4. Practice activities when calm (not during distress)
5. Review and reinforcement plan
6. Ethical considerations (don't use CBT to force conformity, respect that some behaviors are protective not irrational, avoid gaslighting experiences, ensure genuine choice about participating)

Emphasize understanding and support, not suppressing valid responses. Respect student's pace. Format as practical activities suitable for Irish school settings.`}
    />
  )
}
