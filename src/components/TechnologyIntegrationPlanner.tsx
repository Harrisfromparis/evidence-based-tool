import { GenericPlanner } from './GenericPlanner'

interface TechnologyIntegrationPlannerProps {
  onBack: () => void
}

export function TechnologyIntegrationPlanner({ onBack }: TechnologyIntegrationPlannerProps) {
  return (
    <GenericPlanner
      onBack={onBack}
      title="Technology Integration Planner"
      description="Select and plan implementation of technology tools for learning or support. Technology can increase engagement, provide immediate feedback, and support accessibility."
      storageKey="technology-integration-plans"
      fields={[
        {
          id: 'goal',
          label: 'Learning or Support Goal',
          placeholder: 'e.g., Task completion tracking, Organization, Communication support, Writing support, Subject learning',
          type: 'textarea',
          required: true
        },
        {
          id: 'studentAbilities',
          label: 'Student Abilities',
          placeholder: 'What are the student\'s current tech skills and comfort level?',
          type: 'textarea'
        },
        {
          id: 'availableTools',
          label: 'Available Technology',
          placeholder: 'e.g., iPad, Chromebook, Interactive whiteboard, Specific apps',
          type: 'textarea'
        }
      ]}
      promptGenerator={(inputs) => `You are an expert in technology-aided instruction for autistic students.

Goal: ${inputs.goal}
${inputs.studentAbilities ? `Student Abilities: ${inputs.studentAbilities}` : ''}
${inputs.availableTools ? `Available Tools: ${inputs.availableTools}` : ''}

Create a technology integration plan that includes:
1. Recommended technology tool matched to goal and student ability
2. How to teach the student to use the tool
3. Integration into regular routines
4. Monitoring effectiveness plan
5. Adjustments as needed
6. Ethical considerations (technology should enable not replace human connection, ensure equitable access, avoid technology as babysitting, teach responsible safe use)

Focus on practical tools available in Irish schools. Format as implementation steps.`}
    />
  )
}
