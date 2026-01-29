import { GenericPlanner } from './GenericPlanner'

interface VRScenarioPlannerProps {
  onBack: () => void
}

export function VRScenarioPlanner({ onBack }: VRScenarioPlannerProps) {
  return (
    <GenericPlanner
      onBack={onBack}
      title="VR Scenario Planner"
      description="Design immersive virtual reality learning experiences for practising social skills, preparing for transitions, managing anxiety, and building confidence in a safe, controlled environment."
      storageKey="vr-scenario-plans"
      fields={[
        {
          id: 'goalArea',
          label: 'Learning Goal Area',
          placeholder: 'e.g., Social skills practice, Transition preparation, Anxiety management, Job skills',
          type: 'text',
          required: true
        },
        {
          id: 'specificSkill',
          label: 'Specific Skill or Situation',
          placeholder: 'e.g., Ordering food in a café, Navigating new school building, Using public transport, Job interview',
          type: 'text',
          required: true
        },
        {
          id: 'studentInfo',
          label: 'Student Information',
          placeholder: 'Age, current abilities, specific anxieties or challenges, VR experience level',
          type: 'textarea',
          required: true
        },
        {
          id: 'sensoryConsiderations',
          label: 'Sensory Considerations',
          placeholder: 'Any known sensory sensitivities, motion sickness history, visual or auditory preferences',
          type: 'textarea'
        }
      ]}
      promptGenerator={(inputs) => `You are an expert in using Virtual Reality (VR) technology for autism support and education.

Learning Goal: ${inputs.goalArea}
Specific Skill/Situation: ${inputs.specificSkill}
Student Information: ${inputs.studentInfo}
${inputs.sensoryConsiderations ? `Sensory Considerations: ${inputs.sensoryConsiderations}` : ''}

Create a comprehensive VR scenario plan that includes:

1. **Scenario Description**: Detailed description of the virtual environment and what the student will experience

2. **Learning Objectives**: 3-5 specific, measurable objectives for this VR experience

3. **Preparation Steps**:
   - How to introduce the VR equipment to the student
   - Pre-VR discussion points
   - Initial familiarisation activities
   - Safety and comfort checks

4. **VR Session Structure**:
   - Recommended session length (starting short, e.g., 5-10 minutes)
   - Step-by-step progression through the scenario
   - Decision points where student has control
   - Pause points for discussion or breaks

5. **Scaffolding and Support**:
   - Initial support level (e.g., adult voice-over guidance)
   - How to gradually fade support
   - Student control options (pause, skip, replay)

6. **Generalisation to Real World**:
   - How to connect VR practice to real-world situations
   - Follow-up activities
   - Real-world practice opportunities with support

7. **Sensory and Accessibility Modifications**:
   - Visual adjustments (brightness, contrast, movement speed)
   - Audio modifications
   - Alternative interaction methods if needed
   - Signs of sensory overwhelm to watch for

8. **Progress Monitoring**:
   - What to observe during VR sessions
   - How to measure skill development
   - When to increase complexity or move to real-world practice

9. **Ethical Considerations**:
   - Ensuring student has full control to stop at any time
   - Avoiding use as "exposure therapy" for distressing situations
   - Respecting student's pace and comfort level
   - Student consent and ongoing check-ins

10. **Equipment and Resources Needed**:
    - VR hardware recommendations
    - Specific apps or software (if applicable)
    - Alternative low-tech options if VR not available

Format as a practical, step-by-step plan with specific examples and scripts for introducing and facilitating the VR experience.`}
    />
  )
}
