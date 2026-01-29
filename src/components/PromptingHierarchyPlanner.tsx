import { GenericPlanner } from './GenericPlanner'

interface PromptingHierarchyPlannerProps {
  onBack: () => void
}

export function PromptingHierarchyPlanner({ onBack }: PromptingHierarchyPlannerProps) {
  return (
    <GenericPlanner
      onBack={onBack}
      title="Prompting Hierarchy Planner"
      description="Design least-to-most prompting strategies with systematic fading procedures. Effective prompting uses the least intrusive prompt necessary and gradually fades to promote independence."
      storageKey="prompting-hierarchies"
      fields={[
        {
          id: 'studentName',
          label: 'Student Name',
          placeholder: 'Student name (optional)',
          type: 'text'
        },
        {
          id: 'skill',
          label: 'Target Skill',
          placeholder: 'e.g., Putting on coat, Following multi-step directions, Transitioning between activities',
          type: 'textarea',
          required: true
        },
        {
          id: 'currentLevel',
          label: 'Current Performance Level',
          placeholder: 'Describe what the student can currently do and where they need support',
          type: 'textarea',
          required: true
        }
      ]}
      promptGenerator={(inputs) => `You are an expert in prompting strategies for autistic students.

Student: ${inputs.studentName || 'Student'}
Target Skill: ${inputs.skill}
Current Performance: ${inputs.currentLevel}

Create a detailed prompting hierarchy plan that includes:
1. A clear hierarchy from least to most intrusive prompts (e.g., natural cue → verbal → gestural → model → physical)
2. Specific examples of each prompt level for this skill
3. Criteria for when to move between prompt levels
4. A systematic fading plan to promote independence
5. Data collection recommendations

Format as clear, actionable guidance for teachers.`}
    />
  )
}
