import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Wrench, Calendar, Heart, Chalkboard, Users } from '@phosphor-icons/react'

const toolExamples = [
  {
    icon: Calendar,
    title: 'Visual Schedules at Home',
    description: 'Create picture or written schedules for morning routine, after-school routine, bedtime routine',
    examples: [
      'Use photos of your child doing each step',
      'Stick schedule on fridge or bedroom wall',
      'Let your child tick off or remove each step as completed',
      'Start with 3-5 steps and build up gradually'
    ]
  },
  {
    icon: Heart,
    title: 'First-Then Boards',
    description: 'Simple visual showing "First [less preferred], Then [preferred]"',
    examples: [
      'First homework, Then iPad time',
      'First tidy toys, Then snack',
      'First bath, Then story',
      'Use pictures or words depending on your child\'s needs'
    ]
  },
  {
    icon: Wrench,
    title: 'Home Sensory Toolkit',
    description: 'Gather sensory items your child finds calming or regulating',
    examples: [
      'Fidget toys, stress balls, textured items',
      'Noise-cancelling headphones for loud environments',
      'Weighted lap pad or cushion',
      'Chewy necklace or snacks',
      'Calming scents or music'
    ]
  },
  {
    icon: Chalkboard,
    title: 'Emotion Charts',
    description: 'Help your child recognise and name emotions',
    examples: [
      'Use faces showing different emotions',
      'Create a scale: 1 (calm) to 5 (very upset)',
      'Ask "How are you feeling?" and point to the chart',
      'Model using it yourself: "I\'m feeling frustrated right now"'
    ]
  },
  {
    icon: Users,
    title: 'Home-School Communication',
    description: 'Keep communication flowing between home and school',
    examples: [
      'Use a notebook or app to share daily updates',
      'Note what went well and any challenges',
      'Share sensory or behaviour patterns',
      'Celebrate successes together',
      'Coordinate strategies so they\'re consistent'
    ]
  }
]

const routineAdaptations = [
  {
    routine: 'Morning Routine',
    adaptations: [
      'Visual schedule on bathroom mirror',
      'Timers for each step (5 minutes to brush teeth)',
      'Lay out clothes the night before',
      'Reduce sensory overload: soft lighting, calm music',
      'Build in buffer time - never rush',
      'Offer choice where possible: "Blue shirt or red shirt?"'
    ]
  },
  {
    routine: 'Homework Time',
    adaptations: [
      'Same time and place every day',
      'Visual timer showing work time and break time',
      'Break work into small chunks',
      'Sensory supports: fidget, chewy, movement breaks',
      'Use First-Then: "First maths, then 5-minute break"',
      'Celebrate effort, not just completion'
    ]
  },
  {
    routine: 'Bedtime',
    adaptations: [
      'Predictable sequence: bath, pyjamas, story, bed',
      'Visual countdown: "3 more stories, then lights out"',
      'Reduce screen time 1 hour before bed',
      'Calming sensory input: dim lights, weighted blanket, soft music',
      'Social narrative about bedtime routine',
      'Consistent time every night'
    ]
  },
  {
    routine: 'Outings and Transitions',
    adaptations: [
      'Prepare in advance: show photos of where you\'re going',
      'Social narrative about the outing',
      'Bring comfort items: favourite toy, snack, headphones',
      'Give warnings before leaving: "5 minutes until we go"',
      'Allow time to transition - don\'t rush',
      'Have a plan for if things get overwhelming'
    ]
  }
]

export function ParentTools() {
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-soft-green/40 to-soft-orange/40 border-2 border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Wrench size={24} className="text-secondary" />
            Parent Tools & Home Adaptations
          </CardTitle>
          <CardDescription>
            Practical tools and strategies you can use at home. These complement the evidence-based practices 
            and help you support your child in everyday routines.
          </CardDescription>
        </CardHeader>
      </Card>

      <div>
        <h2 className="text-xl font-bold mb-4 handwritten text-secondary">Quick-Start Home Tools</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {toolExamples.map((tool, idx) => {
            const Icon = tool.icon
            return (
              <Card key={idx} className="organic-shape hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Icon size={22} className="text-accent" />
                    {tool.title}
                  </CardTitle>
                  <CardDescription>{tool.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    {tool.examples.map((example, exIdx) => (
                      <li key={exIdx} className="pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-accent">
                        {example}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4 handwritten text-secondary">Adapting Daily Routines</h2>
        <div className="space-y-4">
          {routineAdaptations.map((routine, idx) => (
            <Card key={idx} className="border-l-4 border-l-accent">
              <CardHeader>
                <CardTitle className="text-lg">{routine.routine}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  {routine.adaptations.map((adaptation, adIdx) => (
                    <li key={adIdx} className="pl-4 relative before:content-['→'] before:absolute before:left-0 before:text-secondary before:font-bold">
                      {adaptation}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card className="bg-soft-green/20 border-secondary/20">
        <CardHeader>
          <CardTitle className="handwritten text-xl text-secondary">Remember</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p>
            <strong>You are the expert on your child.</strong> These tools are suggestions - adapt them to fit your family's unique needs and context.
          </p>
          <p>
            <strong>Start small.</strong> Choose one tool or routine to work on. Once that feels manageable, add another.
          </p>
          <p>
            <strong>Celebrate progress.</strong> Every small step forward matters. Notice what's working and build on it.
          </p>
          <p>
            <strong>Be kind to yourself.</strong> Supporting a child with additional needs is challenging. You're doing your best, and that's enough.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
