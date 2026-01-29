import { GenericPlanner } from './GenericPlanner'

interface ExerciseMovementScheduleProps {
  onBack: () => void
}

export function ExerciseMovementSchedule({ onBack }: ExerciseMovementScheduleProps) {
  return (
    <GenericPlanner
      onBack={onBack}
      title="Exercise & Movement Schedule"
      description="Plan movement breaks, sensory activities, and exercise for regulation. Regular exercise and movement can reduce anxiety, improve attention, and support sensory regulation."
      storageKey="exercise-movement-schedules"
      fields={[
        {
          id: 'studentName',
          label: 'Student Name',
          placeholder: 'Student name',
          type: 'text'
        },
        {
          id: 'regulationNeeds',
          label: 'Regulation Needs',
          placeholder: 'e.g., Difficulty focusing in afternoon, High anxiety before tests, Sensory seeking behaviors',
          type: 'textarea',
          required: true
        },
        {
          id: 'schedule',
          label: 'Daily Schedule',
          placeholder: 'Describe student\'s typical school day to identify best times for movement',
          type: 'textarea'
        }
      ]}
      promptGenerator={(inputs) => `You are an expert in using exercise and movement to support autistic students' regulation.

Student: ${inputs.studentName || 'Student'}
Regulation Needs: ${inputs.regulationNeeds}
${inputs.schedule ? `Daily Schedule: ${inputs.schedule}` : ''}

Create a movement and exercise plan that includes:
1. Identification of best times for movement (when student struggles with focus or regulation)
2. Specific movement activities (jumping jacks, walks, stretching, yoga, sensory activities, outdoor time)
3. Duration and frequency of each activity
4. How to make movement predictable (scheduled, not random)
5. Observation plan (impact on subsequent attention or mood)
6. Ethical considerations (movement as support not reward/punishment, respect preferences, avoid forced participation or competition causing distress, ensure accessibility)

Activities should be practical for Irish school settings. Format as a daily or weekly schedule with specific activities.`}
    />
  )
}
