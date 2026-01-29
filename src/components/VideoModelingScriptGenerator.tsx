import { GenericPlanner } from './GenericPlanner'

interface VideoModelingScriptGeneratorProps {
  onBack: () => void
}

export function VideoModelingScriptGenerator({ onBack }: VideoModelingScriptGeneratorProps) {
  return (
    <GenericPlanner
      onBack={onBack}
      title="Video Modeling Script Generator"
      description="Create scripts and shot lists for video modeling or video self-modeling. Video modeling shows students what to do through recorded demonstrations that can be viewed repeatedly."
      storageKey="video-modeling-scripts"
      fields={[
        {
          id: 'targetSkill',
          label: 'Target Skill or Behavior',
          placeholder: 'e.g., Putting on coat, Asking to join a game, Following morning routine, Giving a presentation',
          type: 'textarea',
          required: true
        },
        {
          id: 'videoType',
          label: 'Video Type',
          placeholder: 'e.g., Peer modeling, Adult modeling, Video self-modeling, Point-of-view video',
          type: 'text',
          required: true
        },
        {
          id: 'setting',
          label: 'Setting/Location',
          placeholder: 'e.g., Classroom, PE hall, School entrance, Home',
          type: 'text'
        }
      ]}
      promptGenerator={(inputs) => `You are an expert in video modeling interventions for autistic students.

Target Skill: ${inputs.targetSkill}
Video Type: ${inputs.videoType}
${inputs.setting ? `Setting: ${inputs.setting}` : ''}

Create a video modeling plan that includes:
1. Video objectives and target audience
2. Model selection (who should be in the video and why)
3. Detailed shot list with specific actions to film
4. Script or narration (if needed)
5. Filming tips (lighting, angles, length - keep under 3 minutes)
6. How to use the video with the student (watch multiple times, discuss, then practice)
7. Ethical considerations (obtain consent, show respectful authentic behavior, age-appropriate models)

Format as a practical filming guide with step-by-step instructions.`}
    />
  )
}
