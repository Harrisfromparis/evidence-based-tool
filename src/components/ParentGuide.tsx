import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Input } from '@/components/ui/input'
import { MagnifyingGlass, House, Lightbulb, ShieldCheck } from '@phosphor-icons/react'

const ebpHomeGuides = [
  {
    id: 'antecedent',
    name: 'Antecedent-Based Interventions',
    category: 'Environment & Planning',
    homeExamples: [
      'Set up a visual schedule on the fridge showing the day\'s routine',
      'Give a 5-minute warning before transitions (e.g., "In 5 minutes, we\'ll clean up for dinner")',
      'Create a calm-down corner with favourite sensory items',
      'Use timers to show how long an activity will last'
    ],
    safetyNotes: 'Focus on preventing overwhelm rather than reacting to distress. The goal is to make the day more predictable.',
    stepByStep: [
      'Identify which transitions or activities are most challenging',
      'Choose one antecedent strategy to try (e.g., visual timer)',
      'Use it consistently for one week',
      'Notice what improves and adjust as needed'
    ]
  },
  {
    id: 'cbt',
    name: 'Cognitive Behavioural Intervention',
    category: 'Thinking & Emotions',
    homeExamples: [
      'Talk through worries using a simple thought record (What happened? How did it feel? What could we think instead?)',
      'Practice recognising emotions using feelings charts or emotion cards',
      'Create coping cards together (e.g., "When I feel worried, I can take deep breaths")',
      'Use "thinking traps" language: "Is that a helpful thought or an unhelpful one?"'
    ],
    safetyNotes: 'Never force emotional discussions. This works best when your child feels safe and regulated. Keep it simple and collaborative.',
    stepByStep: [
      'Start with naming emotions in everyday moments',
      'Introduce one coping strategy your child chooses',
      'Practice when things are calm, not during distress',
      'Celebrate noticing emotions, not just managing them'
    ]
  },
  {
    id: 'dtt',
    name: 'Discrete Trial Training',
    category: 'Learning & Skills',
    homeExamples: [
      'Teach specific skills in short, clear steps (e.g., putting on shoes: first step, second step)',
      'Use clear instructions: "Touch the red cup" then immediate praise when done',
      'Break tasks into tiny steps and practice one at a time',
      'Keep sessions short (2-5 minutes) and end on success'
    ],
    safetyNotes: 'DTT should never feel like drilling or compliance training. Keep it playful, respectful, and focused on skills your child wants to learn.',
    stepByStep: [
      'Choose one skill your child is motivated to learn',
      'Break it into 3-5 small steps',
      'Practice one step at a time with clear instructions',
      'Celebrate effort, not just correct responses'
    ]
  },
  {
    id: 'exercise',
    name: 'Exercise and Movement',
    category: 'Body & Regulation',
    homeExamples: [
      'Go for a walk or bike ride together',
      'Create a simple movement routine (jumping jacks, stretches, dancing)',
      'Use a trampoline or sensory swing if you have one',
      'Build movement into the day: walk to the shop, play in the garden'
    ],
    safetyNotes: 'Movement should feel good, not like a chore. Let your child choose activities they enjoy. Exercise supports regulation and mood.',
    stepByStep: [
      'Notice which movements your child naturally seeks out',
      'Offer movement breaks before difficult tasks',
      'Make it routine: same time each day if possible',
      'Join in - it\'s more motivating together'
    ]
  },
  {
    id: 'extinction',
    name: 'Extinction',
    category: 'Behaviour & Communication',
    homeExamples: [
      'If your child whines for a snack right before dinner, calmly hold the boundary without extra attention to the whining',
      'Planned ignoring of attention-seeking behaviours (but never ignore distress or communication attempts)',
      'Stay neutral and consistent - don\'t react emotionally'
    ],
    safetyNotes: 'Extinction means withdrawing attention from behaviour that was previously reinforced. Use only for minor behaviours, never for genuine needs or communication. Always teach an alternative behaviour.',
    stepByStep: [
      'Identify what the behaviour is trying to communicate',
      'Teach an appropriate alternative (e.g., asking with words or gestures)',
      'When the old behaviour happens, stay calm and neutral',
      'Immediately reinforce the new, appropriate behaviour'
    ]
  },
  {
    id: 'fct',
    name: 'Functional Communication Training',
    category: 'Behaviour & Communication',
    homeExamples: [
      'Teach "I need a break" instead of running away',
      'Use a "help" card or sign when your child is frustrated',
      'Model asking for things: "Can I have juice, please?"',
      'Replace hitting/grabbing with pointing or using words/pictures'
    ],
    safetyNotes: 'All behaviour is communication. The goal is to give your child a clearer, more effective way to express needs.',
    stepByStep: [
      'Identify what the behaviour is trying to communicate (escape, attention, access to item)',
      'Teach a simple, functional alternative (word, sign, picture)',
      'Honour the communication immediately when they use it',
      'Gradually fade prompts as the new skill strengthens'
    ]
  },
  {
    id: 'modelling',
    name: 'Modelling',
    category: 'Learning & Skills',
    homeExamples: [
      'Show your child how to do something rather than just telling them',
      'Narrate what you\'re doing: "I\'m putting my shoes on. First, I open the velcro..."',
      'Use video modelling: record yourself doing a task and watch it together',
      'Model social language: "When I greet my friend, I say, \'Hi! How are you?\'"'
    ],
    safetyNotes: 'Modelling shows rather than tells. It\'s especially helpful for visual learners. Keep it simple and exaggerate key steps.',
    stepByStep: [
      'Choose a skill your child is learning',
      'Demonstrate it slowly and clearly',
      'Let your child try (with support if needed)',
      'Repeat as many times as needed without pressure'
    ]
  },
  {
    id: 'naturalistic',
    name: 'Naturalistic Intervention',
    category: 'Learning & Skills',
    homeExamples: [
      'Teach during play: if your child loves cars, practice colours by sorting toy cars',
      'Follow your child\'s interests and build learning into those moments',
      'Use everyday routines: count steps while climbing stairs, name foods while cooking',
      'Let your child lead, then join in and gently expand'
    ],
    safetyNotes: 'This is learning through life, not through formal teaching. It respects your child\'s interests and pace.',
    stepByStep: [
      'Notice what your child is interested in right now',
      'Join them in that activity',
      'Add language, concepts, or skills naturally within the play',
      'Follow their lead - if they move on, you move on too'
    ]
  },
  {
    id: 'parent-training',
    name: 'Parent-Implemented Intervention',
    category: 'Family & Connection',
    homeExamples: [
      'This is you! You\'re already doing it by learning these strategies',
      'Practice one new strategy at a time in your daily routine',
      'Notice what works and celebrate small wins',
      'Connect with other parents or seek support when needed'
    ],
    safetyNotes: 'You are the expert on your child. Trust your instincts and adapt strategies to fit your family. You don\'t have to do everything perfectly.',
    stepByStep: [
      'Choose one strategy from this guide to focus on',
      'Try it consistently for a week',
      'Reflect: What worked? What didn\'t?',
      'Adjust and try again - or choose a different strategy'
    ]
  },
  {
    id: 'peer-mediation',
    name: 'Peer-Mediated Instruction',
    category: 'Social & Relationships',
    homeExamples: [
      'Arrange playdates with understanding peers or siblings',
      'Coach the peer: "Can you show them how to build the tower?"',
      'Praise peers for being patient, inclusive, and supportive',
      'Use structured activities with clear roles (e.g., board games, cooking together)'
    ],
    safetyNotes: 'Choose peers who are kind and patient. Prepare peers in advance: "Remember, they might need extra time to answer."',
    stepByStep: [
      'Choose a peer who is naturally supportive',
      'Plan a structured, preferred activity',
      'Give the peer simple coaching before or during',
      'Supervise gently and support both children'
    ]
  },
  {
    id: 'pecs',
    name: 'Picture Exchange Communication System',
    category: 'Behaviour & Communication',
    homeExamples: [
      'Use picture cards for requests: your child gives you a picture of "juice" to ask for juice',
      'Start with highly motivating items',
      'Build a picture book of frequently requested items',
      'Gradually expand to comments and descriptions'
    ],
    safetyNotes: 'PECS is a structured system. Consider consulting a professional for training. The key is immediate reinforcement when your child communicates.',
    stepByStep: [
      'Start with 2-3 pictures of favourite items',
      'Teach: child picks picture, gives it to you, gets item',
      'Build up to more pictures and spontaneous requests',
      'Celebrate every communication attempt'
    ]
  },
  {
    id: 'pivotal-response',
    name: 'Pivotal Response Training',
    category: 'Learning & Skills',
    homeExamples: [
      'Follow your child\'s lead and motivation',
      'Offer choices: "Do you want apple or banana?"',
      'Reinforce attempts, not just success',
      'Keep interactions natural and playful'
    ],
    safetyNotes: 'PRT focuses on motivation and child choice. It should never feel forced. The reinforcement is natural (e.g., if they ask for a toy, they get the toy).',
    stepByStep: [
      'Let your child choose the activity',
      'Join them and follow their lead',
      'Create opportunities for communication (e.g., put favourite toy out of reach)',
      'Immediately reinforce any communication attempt'
    ]
  },
  {
    id: 'prompting',
    name: 'Prompting',
    category: 'Learning & Skills',
    homeExamples: [
      'Verbal prompt: "Remember to say thank you"',
      'Visual prompt: Point to the step they need to do next',
      'Physical prompt: Gently guide their hand to complete a task',
      'Gestural prompt: Model the action or point'
    ],
    safetyNotes: 'Always use the least intrusive prompt possible. Fade prompts as soon as you can so your child builds independence.',
    stepByStep: [
      'Wait a moment to see if your child will do it independently',
      'If not, give the gentlest prompt that will work',
      'Gradually reduce the prompt over time',
      'Celebrate when they do it with less help'
    ]
  },
  {
    id: 'reinforcement',
    name: 'Reinforcement',
    category: 'Behaviour & Communication',
    homeExamples: [
      'Catch your child doing something helpful and praise it immediately',
      'Use specific praise: "I love how you shared your toys with your sibling"',
      'Offer preferred activities as reinforcement: "After we tidy up, we can play outside"',
      'Create a simple reward chart for specific goals'
    ],
    safetyNotes: 'Reinforcement increases behaviour. Make sure you\'re reinforcing the behaviours you want to see more of. Be immediate, specific, and genuine.',
    stepByStep: [
      'Identify a behaviour you want to encourage',
      'Notice when it happens and praise immediately',
      'Use natural reinforcers when possible',
      'Be consistent - every time at first, then intermittently'
    ]
  },
  {
    id: 'response-interruption',
    name: 'Response Interruption/Redirection',
    category: 'Behaviour & Communication',
    homeExamples: [
      'If your child is engaging in repetitive behaviour that could be harmful, gently redirect to a similar but safer activity',
      'Offer an alternative: if they\'re biting their hand, offer a chewy necklace',
      'Redirect without shaming: "Let\'s try this instead"'
    ],
    safetyNotes: 'Only use this for behaviours that are unsafe or significantly interfere with learning. Never interrupt behaviours that are calming or regulatory (like stimming).',
    stepByStep: [
      'Determine if the behaviour truly needs interrupting',
      'Gently block or interrupt the behaviour',
      'Immediately redirect to a safe alternative',
      'Reinforce use of the alternative'
    ]
  },
  {
    id: 'scripting',
    name: 'Scripting',
    category: 'Social & Relationships',
    homeExamples: [
      'Practice greetings: "When someone says hello, you can say hello back"',
      'Teach phone scripts: "Hi, this is [name]. May I speak to [person]?"',
      'Practice asking for help: "Can you help me, please?"',
      'Write social scripts together for specific situations'
    ],
    safetyNotes: 'Scripts give your child the words when they\'re not sure what to say. Keep them simple and practice when calm. Allow flexibility.',
    stepByStep: [
      'Identify a social situation your child finds challenging',
      'Write a simple script together (2-4 sentences)',
      'Practice at home through role-play',
      'Use the script in real situations with support'
    ]
  },
  {
    id: 'self-management',
    name: 'Self-Management',
    category: 'Thinking & Emotions',
    homeExamples: [
      'Create a checklist for morning routine and let your child tick off each step',
      'Teach self-monitoring: "How calm do you feel right now? 1-5?"',
      'Use a visual timer so your child can track their own time',
      'Encourage self-reward: "You finished your homework - you can choose what we do next"'
    ],
    safetyNotes: 'Self-management builds independence and agency. Start with simple, achievable tasks and celebrate self-awareness.',
    stepByStep: [
      'Choose one routine or task to focus on',
      'Create a visual checklist or self-monitoring tool',
      'Teach your child to use it with support',
      'Gradually reduce your involvement as they gain confidence'
    ]
  },
  {
    id: 'sensory-integration',
    name: 'Sensory Integration',
    category: 'Body & Regulation',
    homeExamples: [
      'Provide sensory breaks: jumping, swinging, squeezing playdough',
      'Create a sensory toolkit: fidgets, noise-cancelling headphones, weighted lap pad',
      'Respect sensory needs: dim lights, reduce noise, offer preferred textures',
      'Build sensory input into the day: chewy snacks, movement breaks, quiet time'
    ],
    safetyNotes: 'Sensory needs are real and valid. Work with an occupational therapist if possible. Never force sensory input your child finds distressing.',
    stepByStep: [
      'Observe which sensory inputs your child seeks or avoids',
      'Provide access to preferred sensory experiences',
      'Reduce or accommodate challenging sensory input',
      'Adjust the environment to support regulation'
    ]
  },
  {
    id: 'social-narratives',
    name: 'Social Narratives',
    category: 'Social & Relationships',
    homeExamples: [
      'Write a short story together about an upcoming event: "Tomorrow we\'re going to the dentist. The dentist will look at my teeth..."',
      'Use photos and simple sentences',
      'Read the narrative together multiple times before the event',
      'Create narratives for routines, changes, or social situations'
    ],
    safetyNotes: 'Social narratives prepare your child for what to expect. Keep language simple, positive, and accurate. Never use them to manipulate or coerce.',
    stepByStep: [
      'Identify a situation your child finds confusing or stressful',
      'Write a simple narrative (5-10 sentences) with clear, concrete language',
      'Include what will happen, why, and what your child can do',
      'Read it together multiple times in advance'
    ]
  },
  {
    id: 'social-skills',
    name: 'Social Skills Training',
    category: 'Social & Relationships',
    homeExamples: [
      'Role-play social situations: taking turns, greeting someone, asking to join a game',
      'Watch videos together and discuss social cues',
      'Practice one skill at a time: eye contact, tone of voice, body space',
      'Use social stories and visual supports to teach expectations'
    ],
    safetyNotes: 'Social skills teaching should be respectful and neurodiversity-affirming. Never force eye contact or masking. Focus on skills your child wants to learn.',
    stepByStep: [
      'Choose one social skill your child is working on',
      'Break it into simple, observable steps',
      'Practice through role-play at home',
      'Use real-life opportunities with support and coaching'
    ]
  },
  {
    id: 'structured-work',
    name: 'Structured Work Systems',
    category: 'Environment & Planning',
    homeExamples: [
      'Set up a homework station with clear organisation: pencil cup, paper tray, visual schedule',
      'Use trays or bins to show "work to do" and "work finished"',
      'Create visual task lists for chores',
      'Establish clear start and end points for activities'
    ],
    safetyNotes: 'Structure reduces anxiety and increases independence. Visual organisation shows your child what to do and how much is left.',
    stepByStep: [
      'Choose one activity that needs more structure (homework, chores)',
      'Set up a physical system: bins, trays, or visual list',
      'Teach your child how to use the system',
      'Gradually reduce your support as they learn the routine'
    ]
  },
  {
    id: 'task-analysis',
    name: 'Task Analysis',
    category: 'Learning & Skills',
    homeExamples: [
      'Break tasks into tiny steps: brushing teeth (1. Pick up toothbrush, 2. Put toothpaste on brush, 3. Turn on tap...)',
      'Create visual step-by-step guides with photos or pictures',
      'Teach one step at a time, backwards or forwards',
      'Celebrate each step completed'
    ],
    safetyNotes: 'Task analysis makes complex tasks manageable. Start with tasks your child is motivated to learn.',
    stepByStep: [
      'Choose a task to teach',
      'Break it into small, observable steps (5-10 steps)',
      'Create a visual guide if helpful',
      'Teach using forward chaining (step 1 first) or backward chaining (last step first)'
    ]
  },
  {
    id: 'teacch',
    name: 'TEACCH',
    category: 'Environment & Planning',
    homeExamples: [
      'Create visual structure: schedule on the wall, labelled storage, clear routines',
      'Use visual supports everywhere: pictures, written lists, colour coding',
      'Organise spaces by function: homework area, play area, calm-down corner',
      'Predictable routines with visual reminders'
    ],
    safetyNotes: 'TEACCH is about making the environment work for your child. Visual structure reduces anxiety and builds independence.',
    stepByStep: [
      'Start with one area of the home (e.g., bedroom)',
      'Add visual organisation: labels, pictures, clear storage',
      'Create visual schedules for daily routines',
      'Expand to other areas as your child benefits'
    ]
  },
  {
    id: 'technology',
    name: 'Technology-Aided Instruction',
    category: 'Learning & Skills',
    homeExamples: [
      'Use apps for communication (e.g., speech-generating apps)',
      'Educational apps for practicing skills: maths, reading, social stories',
      'Visual timers and schedule apps',
      'Video modelling recorded on a tablet'
    ],
    safetyNotes: 'Technology can be a powerful tool. Choose high-quality, evidence-based apps. Monitor screen time and balance with other activities.',
    stepByStep: [
      'Identify a specific goal (communication, learning, organisation)',
      'Research and choose one high-quality app or tool',
      'Introduce it with support and structure',
      'Use consistently and monitor progress'
    ]
  },
  {
    id: 'time-delay',
    name: 'Time Delay',
    category: 'Learning & Skills',
    homeExamples: [
      'Ask a question and wait 5 seconds before prompting',
      'Give your child time to process and respond',
      'Pause after giving an instruction to allow them to initiate',
      'Gradually increase the wait time as independence grows'
    ],
    safetyNotes: 'Time delay respects processing time. It builds independence by giving your child the chance to respond without immediate prompts.',
    stepByStep: [
      'Give an instruction or ask a question',
      'Wait 3-5 seconds (count silently)',
      'If no response, give a prompt',
      'Over time, increase the delay before prompting'
    ]
  },
  {
    id: 'video-modelling',
    name: 'Video Modelling',
    category: 'Learning & Skills',
    homeExamples: [
      'Record yourself or your child doing a task successfully',
      'Watch the video together before attempting the task',
      'Use for social skills, self-care tasks, or routines',
      'Keep videos short (30 seconds to 2 minutes)'
    ],
    safetyNotes: 'Video modelling is powerful for visual learners. Keep videos positive, clear, and focused on one skill at a time.',
    stepByStep: [
      'Identify a skill your child is learning',
      'Record a clear video showing the skill done correctly',
      'Watch the video together 2-3 times',
      'Support your child to try the skill in real life'
    ]
  },
  {
    id: 'visual-supports',
    name: 'Visual Supports',
    category: 'Environment & Planning',
    homeExamples: [
      'Use pictures, symbols, or written words to support understanding',
      'Visual schedules for daily routines',
      'First-Then boards: "First homework, then iPad"',
      'Choice boards with pictures of activities',
      'Emotion charts, social scripts, step-by-step task lists'
    ],
    safetyNotes: 'Visual supports reduce anxiety and increase understanding. Use them everywhere: schedules, instructions, expectations, choices.',
    stepByStep: [
      'Identify where your child struggles with understanding or transitions',
      'Create a simple visual support (schedule, first-then, choice board)',
      'Introduce it and use it consistently',
      'Expand visual supports as you see benefits'
    ]
  },
  {
    id: 'vr',
    name: 'Virtual Reality',
    category: 'Learning & Skills',
    homeExamples: [
      'If you have access to VR, use it to practice social situations safely',
      'Virtual tours of new places before visiting in real life',
      'Practice job interviews or public speaking',
      'Explore calming environments for regulation'
    ],
    safetyNotes: 'VR is an emerging tool. Ensure your child is comfortable with the headset. Start with short sessions. Always prioritise their comfort and agency.',
    stepByStep: [
      'Introduce the VR headset when your child is calm and curious',
      'Start with very short sessions (2-5 minutes)',
      'Choose age-appropriate, calming or educational content',
      'Always allow your child to remove the headset at any time'
    ]
  }
]

export function ParentGuide() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredEBPs = ebpHomeGuides.filter(ebp =>
    ebp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ebp.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ebp.homeExamples.some(ex => ex.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const categories = Array.from(new Set(ebpHomeGuides.map(ebp => ebp.category)))

  return (
    <div className="space-y-6">
      <Card className="bg-soft-green/30 border-secondary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <House size={24} className="text-secondary" />
            Implementing EBPs at Home
          </CardTitle>
          <CardDescription>
            A complete guide to using all 28 evidence-based practices in your home environment. 
            Each EBP includes plain-language explanations, home examples, safety notes, and step-by-step adaptations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              placeholder="Search EBPs by name or example..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {categories.map(category => {
        const categoryEBPs = filteredEBPs.filter(ebp => ebp.category === category)
        if (categoryEBPs.length === 0) return null

        return (
          <div key={category} className="space-y-4">
            <h2 className="text-xl font-bold handwritten text-secondary flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-secondary"></span>
              {category}
            </h2>
            
            <Accordion type="single" collapsible className="space-y-3">
              {categoryEBPs.map(ebp => (
                <AccordionItem key={ebp.id} value={ebp.id} className="border rounded-lg px-4 bg-card">
                  <AccordionTrigger className="hover:no-underline">
                    <span className="text-left font-semibold">{ebp.name}</span>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <House className="text-accent shrink-0 mt-1" size={20} />
                        <div>
                          <h4 className="font-semibold text-sm mb-2">Home Examples</h4>
                          <ul className="space-y-1.5 text-sm">
                            {ebp.homeExamples.map((example, idx) => (
                              <li key={idx} className="pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-accent">
                                {example}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="flex items-start gap-2 bg-soft-orange/40 p-3 rounded-lg">
                        <ShieldCheck className="text-accent shrink-0 mt-0.5" size={20} />
                        <div>
                          <h4 className="font-semibold text-sm mb-1">Safety & Regulation Notes</h4>
                          <p className="text-sm">{ebp.safetyNotes}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <Lightbulb className="text-secondary shrink-0 mt-1" size={20} />
                        <div>
                          <h4 className="font-semibold text-sm mb-2">Step-by-Step Home Adaptation</h4>
                          <ol className="space-y-1.5 text-sm">
                            {ebp.stepByStep.map((step, idx) => (
                              <li key={idx} className="pl-6 relative">
                                <span className="absolute left-0 font-bold text-secondary">{idx + 1}.</span>
                                {step}
                              </li>
                            ))}
                          </ol>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        )
      })}

      {filteredEBPs.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No EBPs found matching "{searchQuery}"</p>
            <p className="text-sm text-muted-foreground mt-2">Try a different search term or browse by category</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
