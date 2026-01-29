import { GenericPlanner } from './GenericPlanner'

interface NaturalisticTeachingPlannerProps {
  onBack: () => void
}

export function NaturalisticTeachingPlanner({ onBack }: NaturalisticTeachingPlannerProps) {
  return (
    <GenericPlanner
      onBack={onBack}
      title="Naturalistic Teaching Planner"
      description="Plan child-led teaching opportunities in play, routines, and natural contexts. Naturalistic intervention follows the student's lead, embedding learning in meaningful activities."
      storageKey="naturalistic-teaching-plans"
      fields={[
        {
          id: 'targetSkill',
          label: 'Target Skill',
          placeholder: 'e.g., Communication, Social interaction, Following directions, Turn-taking',
          type: 'text',
          required: true
        },
        {
          id: 'studentInterests',
          label: 'Student Interests',
          placeholder: 'What activities, toys, or topics does the student naturally engage with?',
          type: 'textarea',
          required: true
        },
        {
          id: 'routineContext',
          label: 'Routine or Activity Context',
          placeholder: 'e.g., Play time, Snack, Break, Outdoor time, Preferred activity',
          type: 'textarea'
        }
      ]}
      promptGenerator={(inputs) => `You are an expert in naturalistic intervention approaches for autistic students.

Target Skill: ${inputs.targetSkill}
Student Interests: ${inputs.studentInterests}
${inputs.routineContext ? `Context: ${inputs.routineContext}` : ''}

Create a naturalistic teaching plan that includes:
1. How to observe and join student's preferred activity without redirecting
2. How to create opportunities for skill use within that activity
3. How to respond naturally and meaningfully to student's attempts
4. How to build on interactions rather than controlling them
5. Examples of teaching moments within the natural activity
6. Ethical considerations (respect solitary activity preferences, prioritize authentic communication over scripted responses, avoid manipulating access to items, ensure goals are meaningful to student)

Emphasize following the child's lead and intrinsic motivation. Format as practical guidance for Irish educators.`}
    />
  )
}
