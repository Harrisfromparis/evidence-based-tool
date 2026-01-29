import { GenericPlanner } from './GenericPlanner'

interface MusicInterventionPlannerProps {
  onBack: () => void
}

export function MusicInterventionPlanner({ onBack }: MusicInterventionPlannerProps) {
  return (
    <GenericPlanner
      onBack={onBack}
      title="Music Intervention Planner"
      description="Design music-based activities for transitions, engagement, or regulation. Music can support communication, social interaction, emotional regulation, and learning."
      storageKey="music-intervention-plans"
      fields={[
        {
          id: 'goal',
          label: 'Goal',
          placeholder: 'e.g., Smoother transitions, Teaching sequence, Emotional regulation, Social engagement',
          type: 'text',
          required: true
        },
        {
          id: 'context',
          label: 'Context',
          placeholder: 'e.g., During clean-up time, Independent work period, Morning arrival, Group activity',
          type: 'textarea',
          required: true
        },
        {
          id: 'studentPreferences',
          label: 'Student Musical Preferences',
          placeholder: 'What music does the student enjoy? Any sensitivities to sound?',
          type: 'textarea'
        }
      ]}
      promptGenerator={(inputs) => `You are an expert in music-mediated interventions for autistic students.

Goal: ${inputs.goal}
Context: ${inputs.context}
${inputs.studentPreferences ? `Student Preferences: ${inputs.studentPreferences}` : ''}

Create a music intervention plan that includes:
1. How music will support the identified goal
2. Specific music selection or creation (songs, rhythms, instrumental music)
3. When and how to introduce music consistently
4. How to observe student response
5. Fading or maintenance plan
6. Ethical considerations (respect musical preferences and sensitivities, avoid overwhelming volume, don't use to mask distress or force compliance, ensure culturally appropriate)

Format as practical implementation steps suitable for Irish classrooms.`}
    />
  )
}
