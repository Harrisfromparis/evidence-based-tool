import { GenericPlanner } from './GenericPlanner'

interface VRTransitionPrepProps {
  onBack: () => void
}

export function VRTransitionPrep({ onBack }: VRTransitionPrepProps) {
  return (
    <GenericPlanner
      onBack={onBack}
      title="VR Transition Preparation"
      description="Create virtual reality experiences to help students explore and familiarise themselves with new environments before transitions, reducing anxiety and building confidence."
      storageKey="vr-transition-plans"
      fields={[
        {
          id: 'transitionType',
          label: 'Type of Transition',
          placeholder: 'e.g., Primary to Secondary, New classroom, Different school building, Work experience location',
          type: 'text',
          required: true
        },
        {
          id: 'newEnvironment',
          label: 'Description of New Environment',
          placeholder: 'Physical layout, size, noise level, key locations, typical schedule',
          type: 'textarea',
          required: true
        },
        {
          id: 'studentConcerns',
          label: 'Student\'s Specific Concerns or Anxieties',
          placeholder: 'What is the student worried about? What questions have they asked? What has caused difficulty in past transitions?',
          type: 'textarea',
          required: true
        },
        {
          id: 'timeframe',
          label: 'Timeframe Until Transition',
          placeholder: 'e.g., 3 months, 6 weeks, Starting in September',
          type: 'text'
        }
      ]}
      promptGenerator={(inputs) => `You are an expert in using Virtual Reality for transition support for autistic students.

Transition Type: ${inputs.transitionType}
New Environment: ${inputs.newEnvironment}
Student Concerns: ${inputs.studentConcerns}
${inputs.timeframe ? `Timeframe: ${inputs.timeframe}` : ''}

Create a comprehensive VR transition preparation plan that includes:

1. **VR Environment Design**:
   - What specific areas of the new environment should be included in the VR experience
   - Level of detail needed (realistic vs. simplified)
   - Key landmarks and reference points to highlight

2. **Virtual Tours Structure**:
   - Recommended number of VR sessions before the transition
   - Progression plan (e.g., Start with single room, build to full building)
   - Order of locations to explore (prioritising most important/frequently used spaces)

3. **Interactive Elements**:
   - What the student should be able to do in the VR environment (navigate, open doors, locate key places)
   - Decision-making opportunities within the VR experience
   - Simulated activities (e.g., walking to classes, finding the canteen, locating toilets)

4. **Addressing Specific Concerns**:
   - How the VR experience addresses each of the student's identified anxieties
   - Practice scenarios for challenging moments
   - Alternative routes or options to explore

5. **Supporting Materials**:
   - Printed maps that correspond to VR layout
   - Photo references for comparison
   - Written guides or social narratives to pair with VR experience

6. **Real-World Connection**:
   - How to transition from VR exploration to actual visits
   - Recommended number of in-person visits
   - What to do during in-person visits to reinforce VR learning

7. **Key People Introduction**:
   - How to incorporate photos and information about key staff members
   - Scripts for initial interactions
   - "Safe people" identification within the VR or supporting materials

8. **Session Structure**:
   - Recommended VR session length and frequency
   - Pre-session discussion (what to expect, questions to explore)
   - Post-session debrief (what student noticed, questions that arose, concerns addressed)

9. **Student Agency**:
   - How student can control the pace of exploration
   - Ability to revisit areas multiple times
   - Option to explore with or without adult narration

10. **Progress Monitoring**:
    - Signs that student is becoming comfortable with the new environment
    - When to increase complexity or add new elements
    - When to move from VR to real-world visits

11. **Backup Plans**:
    - What to do if VR causes discomfort or anxiety
    - Alternative transition preparation methods (360° photos, video tours, in-person visits)

12. **Ethical Considerations**:
    - Ensuring VR is a support tool, not a replacement for proper transition planning
    - Student's right to stop VR experience at any time
    - Involving student in deciding what aspects of environment to explore first

Format as a detailed, practical plan with specific timelines and activities. Include example dialogue for introducing the VR experience and discussion prompts for each session.`}
    />
  )
}
