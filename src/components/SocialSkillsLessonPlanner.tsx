import { GenericPlanner } from './GenericPlanner'

interface SocialSkillsLessonPlannerProps {
  onBack: () => void
}

export function SocialSkillsLessonPlanner({ onBack }: SocialSkillsLessonPlannerProps) {
  return (
    <GenericPlanner
      onBack={onBack}
      title="Social Skills Lesson Planner"
      description="Design structured social skills lessons with modeling, practice, and generalization. Explicit teaching of social skills supports students who want to improve social connections."
      storageKey="social-skills-lessons"
      fields={[
        {
          id: 'targetSkill',
          label: 'Target Social Skill',
          placeholder: 'e.g., Joining a conversation, Giving compliments, Reading facial expressions, Turn-taking',
          type: 'text',
          required: true
        },
        {
          id: 'ageGroup',
          label: 'Age/Year Group',
          placeholder: 'e.g., Junior Infants, Third Class, First Year',
          type: 'text',
          required: true
        },
        {
          id: 'lessonFormat',
          label: 'Lesson Format',
          placeholder: 'e.g., Small group, One-on-one, Whole class SPHE lesson',
          type: 'text'
        }
      ]}
      promptGenerator={(inputs) => `You are an expert in social skills training for autistic students.

Target Skill: ${inputs.targetSkill}
Age Group: ${inputs.ageGroup}
${inputs.lessonFormat ? `Format: ${inputs.lessonFormat}` : ''}

Create a social skills lesson plan that includes:
1. Lesson objective (what students will learn/practice)
2. Explicit instruction (explain the skill, why it matters, when to use it)
3. Modeling activities (demonstrate the skill)
4. Guided practice with role-play
5. Specific feedback strategies
6. Generalization plan (opportunities to practice in natural settings)
7. Ethical considerations (respect neurodivergent communication styles, balance teaching skills with creating accepting environments, avoid forced masking)

Respect that not all neurotypical social norms are necessary. Format as a 20-30 minute lesson plan suitable for Irish classrooms.`}
    />
  )
}
