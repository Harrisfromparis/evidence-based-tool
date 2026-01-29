import { GenericPlanner } from './GenericPlanner'

interface PeerMediationGuideProps {
  onBack: () => void
}

export function PeerMediationGuide({ onBack }: PeerMediationGuideProps) {
  return (
    <GenericPlanner
      onBack={onBack}
      title="Peer-Mediated Support Guide"
      description="Plan peer buddy systems, peer tutoring, or play facilitation with training scripts. Peer-mediated strategies promote inclusion, build authentic relationships, and reduce reliance on adult facilitation."
      storageKey="peer-mediation-plans"
      fields={[
        {
          id: 'studentName',
          label: 'Autistic Student Name',
          placeholder: 'Student name',
          type: 'text',
          required: true
        },
        {
          id: 'goal',
          label: 'Social or Learning Goal',
          placeholder: 'e.g., Increase playground interactions, Support with reading, Join group games',
          type: 'textarea',
          required: true
        },
        {
          id: 'setting',
          label: 'Setting/Activity',
          placeholder: 'e.g., Break time, Paired reading, Lunchtime, Group work',
          type: 'text',
          required: true
        }
      ]}
      promptGenerator={(inputs) => `You are an expert in peer-mediated interventions for autistic students.

Autistic Student: ${inputs.studentName}
Goal: ${inputs.goal}
Setting: ${inputs.setting}

Create a peer-mediated support plan that includes:
1. How to select appropriate peer buddies/facilitators
2. Training script for peers (what to do, what to say, how to wait, how to offer choices)
3. Structured opportunities for peer interaction
4. Adult facilitation guidelines (support without hovering)
5. How to acknowledge and reinforce peers' efforts
6. Ethical considerations (ensuring autistic student isn't positioned as "project," monitoring power dynamics, prioritizing mutual relationships)

Emphasize respect, reciprocity, and authentic friendship rather than one-way helping. Format as step-by-step guidance with sample language.`}
    />
  )
}
