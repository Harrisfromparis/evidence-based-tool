import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, PlayCircle, GraduationCap, Users, MapPin, Briefcase } from '@phosphor-icons/react'
import { NarrationControls } from '@/components/NarrationControls'

interface VRDemonstrationsProps {
  onBack: () => void
}

interface VideoDemo {
  id: string
  title: string
  description: string
  url: string
  category: 'social' | 'transition' | 'vocational' | 'classroom'
  duration: string
  ageRange: string
  icon: typeof GraduationCap
}

const videoResources: VideoDemo[] = [
  {
    id: 'vr-social-skills',
    title: 'VR for Social Skills Training',
    description: 'Demonstration of virtual reality being used to teach social communication skills in safe, controlled environments. Shows students practising conversations, reading social cues, and navigating social situations.',
    url: 'https://www.youtube.com/watch?v=HW7rSY46AIY',
    category: 'social',
    duration: '5:23',
    ageRange: '8-18',
    icon: Users
  },
  {
    id: 'vr-job-interview',
    title: 'VR Job Interview Practice',
    description: 'Virtual reality simulation helping autistic young adults prepare for job interviews. Demonstrates how VR allows repeated practice in realistic settings without real-world stakes.',
    url: 'https://www.youtube.com/watch?v=kK3VJKs8Oe0',
    category: 'vocational',
    duration: '4:12',
    ageRange: '16+',
    icon: Briefcase
  },
  {
    id: 'vr-classroom-prep',
    title: 'Virtual Classroom Familiarisation',
    description: 'Using VR to help students explore and become comfortable with new classroom environments before transitions. Reduces anxiety by allowing students to virtually "visit" spaces multiple times.',
    url: 'https://www.youtube.com/watch?v=qKJfWwGS5W4',
    category: 'transition',
    duration: '6:45',
    ageRange: '5-18',
    icon: GraduationCap
  },
  {
    id: 'vr-public-spaces',
    title: 'Navigating Public Spaces with VR',
    description: 'VR simulations of busy public environments like shops, transport hubs, and cafés. Helps students build confidence in managing sensory-rich real-world locations.',
    url: 'https://www.youtube.com/watch?v=dVvckLzbJnA',
    category: 'social',
    duration: '7:18',
    ageRange: '12+',
    icon: MapPin
  },
  {
    id: 'vr-school-tour',
    title: 'Virtual School Tours for Transition',
    description: 'Comprehensive demonstration of how VR 360° tours support students transitioning to new schools. Shows how students can explore buildings, locate key rooms, and build mental maps at their own pace.',
    url: 'https://www.youtube.com/watch?v=_IUZSfYlR9Y',
    category: 'transition',
    duration: '5:56',
    ageRange: '11-15',
    icon: MapPin
  },
  {
    id: 'vr-classroom-behavior',
    title: 'VR for Classroom Behavior Skills',
    description: 'Using immersive VR to teach and reinforce appropriate classroom behaviours. Demonstrates how students can practice responding to typical classroom scenarios with immediate, supportive feedback.',
    url: 'https://www.youtube.com/watch?v=iFZUxCT5-_s',
    category: 'classroom',
    duration: '4:38',
    ageRange: '6-14',
    icon: GraduationCap
  }
]

const categoryLabels = {
  social: 'Social Skills',
  transition: 'Transitions',
  vocational: 'Vocational',
  classroom: 'Classroom'
}

const categoryColors = {
  social: 'bg-accent/20 text-accent-foreground',
  transition: 'bg-secondary/40 text-secondary-foreground',
  vocational: 'bg-primary/10 text-primary',
  classroom: 'bg-muted text-muted-foreground'
}

export function VRDemonstrations({ onBack }: VRDemonstrationsProps) {
  const introText = `Virtual Reality provides powerful opportunities for autistic students to practice skills, explore environments, and build confidence in safe, controlled settings. These video demonstrations show real-world applications of VR technology in autism support across education and vocational contexts. All approaches prioritise student agency, comfort, and dignity.`

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={onBack}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Tools
        </Button>
      </div>

      <div>
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-foreground mb-2">VR Demonstrations</h1>
            <p className="text-muted-foreground text-lg">Video examples of virtual reality in autism support</p>
          </div>
          <NarrationControls text={introText} variant="minimal" />
        </div>
        
        <div className="prose prose-slate max-w-none mb-8">
          <p className="text-muted-foreground leading-relaxed">
            Virtual Reality (VR) provides powerful opportunities for autistic students to practise skills, 
            explore environments, and build confidence in safe, controlled settings. These video demonstrations 
            show real-world applications of VR technology in autism support across education and vocational contexts.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            All approaches prioritise student agency, comfort, and dignity.
          </p>
        </div>
      </div>

      <div className="bg-muted/50 p-6 rounded-lg border-2 border-border">
        <h3 className="text-foreground mb-2">Important Considerations</h3>
        <ul className="space-y-2 text-muted-foreground">
          <li className="flex gap-2">
            <span className="text-accent font-bold">•</span>
            <span>Always prioritise student comfort and consent - VR should never be forced</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent font-bold">•</span>
            <span>Start with short sessions (5-10 minutes) and build up gradually</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent font-bold">•</span>
            <span>Be mindful of sensory sensitivities and motion sickness potential</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent font-bold">•</span>
            <span>Ensure students have full control to pause or stop at any time</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent font-bold">•</span>
            <span>VR is a support tool to complement, not replace, real-world practice</span>
          </li>
        </ul>
      </div>

      <div className="space-y-6">
        <h2 className="text-foreground">Video Demonstrations</h2>
        <div className="grid gap-6">
          {videoResources.map((video) => {
            const Icon = video.icon
            const videoDescription = `${video.title}. ${video.description}. Duration: ${video.duration}. Age range: ${video.ageRange}. Category: ${categoryLabels[video.category]}.`
            
            return (
              <Card key={video.id} className="border-2 hover:border-accent/50 transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-accent/10">
                        <Icon className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <CardTitle className="text-xl mb-1">{video.title}</CardTitle>
                        <div className="flex gap-2 flex-wrap">
                          <Badge variant="outline" className={categoryColors[video.category]}>
                            {categoryLabels[video.category]}
                          </Badge>
                          <Badge variant="outline" className="text-muted-foreground">
                            {video.duration}
                          </Badge>
                          <Badge variant="outline" className="text-muted-foreground">
                            Ages {video.ageRange}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <NarrationControls text={videoDescription} variant="minimal" />
                  </div>
                  <CardDescription className="text-base leading-relaxed">
                    {video.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video w-full rounded-lg overflow-hidden bg-muted border-2 border-border">
                    <iframe
                      width="100%"
                      height="100%"
                      src={video.url.replace('watch?v=', 'embed/')}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                  <div className="mt-4 flex gap-3">
                    <Button asChild variant="outline" className="gap-2">
                      <a href={video.url} target="_blank" rel="noopener noreferrer">
                        <PlayCircle className="w-4 h-4" />
                        Watch on YouTube
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      <div className="bg-secondary/30 p-6 rounded-lg border-2 border-secondary">
        <h3 className="text-foreground mb-3">Additional Resources</h3>
        <div className="space-y-3 text-muted-foreground">
          <p className="leading-relaxed">
            For more information on implementing VR in autism support, use the <strong>VR Scenario Planner</strong> and{' '}
            <strong>VR Transition Preparation</strong> tools available in the Tools section.
          </p>
          <p className="leading-relaxed">
            These planning tools will help you design appropriate VR experiences tailored to individual student needs, 
            with full consideration of sensory profiles, learning objectives, and ethical implementation.
          </p>
        </div>
      </div>
    </div>
  )
}
