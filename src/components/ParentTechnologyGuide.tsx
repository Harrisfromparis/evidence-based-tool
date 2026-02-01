import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Desktop, Lightbulb, ShieldCheck, CheckCircle } from '@phosphor-icons/react'

interface ParentTechnologyGuideProps {
  onBack: () => void
}

const toolGuides = [
  {
    id: 'gcompris',
    name: 'GCompris',
    url: 'https://gcompris.net',
    type: 'Learning Suite',
    ageRange: '2-10 years',
    description: 'Free educational software with 100+ activities covering maths, science, reading, and life skills',
    whyItHelps: 'GCompris provides structured, predictable learning activities with clear visual feedback. Perfect for autistic children who thrive with routine and visual learning. Activities can be repeated as many times as needed without pressure.',
    gettingStarted: [
      {
        step: 'Download and Install',
        details: 'Visit gcompris.net and download the version for your device (Windows, Mac, Linux, Android, or iPad). Installation takes about 5 minutes.'
      },
      {
        step: 'Start with Easy Activities',
        details: 'Open GCompris and explore the main menu. Start with simple activities like "Click on the Animals" or "Colours" to build confidence.'
      },
      {
        step: 'Let Your Child Lead',
        details: 'Allow your child to choose activities that interest them. GCompris has no time limits or scoring pressure - it\'s about exploration and learning at their pace.'
      },
      {
        step: 'Build a Routine',
        details: 'Use GCompris at the same time each day for 10-15 minutes. Predictable routines help autistic children feel safe and engaged.'
      }
    ],
    homeUse: [
      'Use GCompris activities as part of homework time or learning routines',
      'Let your child repeat favourite activities - repetition builds mastery and confidence',
      'Sit together for the first few sessions to provide support and celebrate successes',
      'Use activities to teach life skills: money, time, sequencing',
      'No ads, no in-app purchases, no surprises - safe and predictable'
    ],
    bestFor: [
      'Visual learners who respond well to pictures and colours',
      'Children who need clear, immediate feedback',
      'Building maths and literacy skills at home',
      'Children who benefit from self-paced, pressure-free learning',
      'Families wanting screen time that\'s educational and calm'
    ],
    safetyTips: [
      'GCompris is completely offline once installed - no internet worries',
      'No chat features or social elements - your child learns independently',
      'You can disable activities that don\'t suit your child',
      'Free and open source - no hidden costs or data collection'
    ]
  },
  {
    id: 'cboard',
    name: 'Cboard',
    url: 'https://www.cboard.io',
    type: 'AAC Communication Tool',
    ageRange: 'All ages',
    description: 'Free AAC (communication) board app with symbols, text-to-speech, and customizable boards',
    whyItHelps: 'Cboard gives non-verbal or minimally verbal autistic children a voice. Using symbols and text-to-speech, children can express needs, feelings, and ideas when spoken words are difficult or unavailable.',
    gettingStarted: [
      {
        step: 'Open Cboard Online',
        details: 'Visit www.cboard.io and click "Use Cboard". No download required - it works in your web browser on any device.'
      },
      {
        step: 'Explore Pre-Made Boards',
        details: 'Cboard comes with ready-made communication boards covering common needs: "I want", "I feel", "help", food, activities. Start with these.'
      },
      {
        step: 'Model Communication',
        details: 'The most important step: Use Cboard yourself. Point to symbols when you speak. "I want [point to symbol] a drink [point to symbol]". This shows your child how it works.'
      },
      {
        step: 'Wait and Honour All Attempts',
        details: 'Give your child time to respond - 10-15 seconds. Honour every communication attempt, even if it\'s not perfect. Approximations count.'
      }
    ],
    homeUse: [
      'Keep Cboard accessible at all times - phone, tablet, or computer',
      'Model using it during daily activities: mealtimes, play, bedtime',
      'Presume competence - your child understands more than they can say',
      'Start with high-motivation words: favourite foods, activities, people',
      'Be patient - AAC takes time. Some children need weeks or months to start using it confidently',
      'Celebrate all communication: pointing, looking, any attempt is valid'
    ],
    bestFor: [
      'Non-verbal or minimally verbal children',
      'Children whose speech is unreliable during stress',
      'Children learning to express complex ideas',
      'Families wanting a free, professional AAC tool',
      'Children who respond well to visual supports'
    ],
    safetyTips: [
      'Cboard respects privacy - you can use it without creating an account',
      'Works offline once loaded in browser',
      'No social features or chat - purely a communication tool',
      'You control what symbols appear on boards',
      'Free forever - no premium features or paywalls'
    ]
  },
  {
    id: 'scratch',
    name: 'Scratch',
    url: 'https://scratch.mit.edu',
    type: 'Creative Coding Platform',
    ageRange: '8+ years',
    description: 'Visual programming platform where children create interactive stories, games, and animations',
    whyItHelps: 'Scratch supports visual thinking, sequencing, cause-and-effect learning, and creative expression. Autistic children often thrive with Scratch\'s predictable block-based coding and clear visual feedback.',
    gettingStarted: [
      {
        step: 'Visit Scratch Website',
        details: 'Go to scratch.mit.edu and click "Create" to start immediately - no account needed for basic use.'
      },
      {
        step: 'Try a Tutorial',
        details: 'Click "Tutorials" and choose "Getting Started". These step-by-step guides teach the basics in 5-10 minutes.'
      },
      {
        step: 'Explore Sample Projects',
        details: 'Browse existing projects your child can "remix" (copy and change). This reduces pressure to start from scratch.'
      },
      {
        step: 'Start Small',
        details: 'First project idea: Make a character move across the screen when you press keys. Celebrate small wins.'
      }
    ],
    homeUse: [
      'Use Scratch for creative screen time instead of passive watching',
      'Link to your child\'s special interests: create projects about trains, dinosaurs, space, etc.',
      'Work together: parent and child co-creating reduces frustration',
      'No right or wrong - focus on experimentation and creativity',
      'Share projects privately with family, or keep them private'
    ],
    bestFor: [
      'Visual thinkers who like patterns and logic',
      'Children interested in computers, games, or animation',
      'Building sequencing and planning skills',
      'Creative expression without pressure to "get it right"',
      'Children who need cause-and-effect learning (if this, then that)'
    ],
    safetyTips: [
      'Scratch community is moderated, but you can disable sharing',
      'Create a family account to monitor projects',
      'No direct messaging between users',
      'Free and open source - no ads or purchases',
      'Works best with adult support for children under 10'
    ]
  },
  {
    id: 'khan-academy',
    name: 'Khan Academy',
    url: 'https://www.khanacademy.org',
    type: 'Educational Learning Platform',
    ageRange: '4+ years (Khan Kids), 11+ (main platform)',
    description: 'Free online learning platform with video lessons, practice exercises, and personalised learning for maths, science, and more',
    whyItHelps: 'Khan Academy provides clear, structured lessons that can be paused, rewatched, and completed at the child\'s pace. No social pressure, no time limits. Excellent for autistic learners who need to process information slowly or repeatedly.',
    gettingStarted: [
      {
        step: 'Choose the Right Version',
        details: 'For ages 4-8, download "Khan Academy Kids" app. For ages 11+, visit khanacademy.org and create a free account.'
      },
      {
        step: 'Set Up a Learning Path',
        details: 'Khan Academy suggests lessons based on age and ability. Start with topics your child is already confident in to build success.'
      },
      {
        step: 'Watch Together First',
        details: 'Watch the first few video lessons together. Pause frequently to check understanding. Model note-taking or pausing to think.'
      },
      {
        step: 'Use Practice Exercises',
        details: 'After watching a video, try practice questions. Khan Academy provides hints and breaks problems into steps - very autism-friendly.'
      }
    ],
    homeUse: [
      'Use Khan Academy for homework support or additional practice',
      'Let your child rewatch videos as many times as needed - no shame in repetition',
      'Khan Academy tracks progress - celebrate mastery of topics',
      'Use for summer learning to prevent skill regression',
      'Parent account lets you monitor progress without hovering',
      'Works on computer, tablet, or phone'
    ],
    bestFor: [
      'Children who learn better from videos than live instruction',
      'Building maths and science skills at home',
      'Children who need information presented slowly and clearly',
      'Learners who benefit from step-by-step scaffolding',
      'Families needing free, high-quality educational content'
    ],
    safetyTips: [
      'Khan Academy is ad-free and non-commercial',
      'No social features or chat',
      'Privacy-focused - minimal data collection',
      'Parent/teacher accounts let you monitor without intruding',
      'Completely free forever - no hidden costs'
    ]
  }
]

export function ParentTechnologyGuide({ onBack }: ParentTechnologyGuideProps) {
  const [selectedTool, setSelectedTool] = useState<string | null>(null)

  if (selectedTool) {
    const tool = toolGuides.find(t => t.id === selectedTool)
    if (!tool) return null

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button onClick={() => setSelectedTool(null)} variant="outline" size="sm">
            <ArrowLeft className="mr-2" />
            Back to Tools
          </Button>
        </div>

        <div>
          <h1 className="text-4xl font-bold mb-2">{tool.name} Parent Guide</h1>
          <p className="text-lg text-muted-foreground">{tool.description}</p>
        </div>

        <Card className="warm-card">
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="font-semibold text-foreground">Type</p>
                <p className="text-muted-foreground">{tool.type}</p>
              </div>
              <div>
                <p className="font-semibold text-foreground">Age Range</p>
                <p className="text-muted-foreground">{tool.ageRange}</p>
              </div>
              <div className="col-span-2">
                <p className="font-semibold text-foreground">Website</p>
                <a href={tool.url} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                  {tool.url}
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="why" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="why">Why It Helps</TabsTrigger>
            <TabsTrigger value="start">Getting Started</TabsTrigger>
            <TabsTrigger value="home">Using at Home</TabsTrigger>
            <TabsTrigger value="safety">Safety & Privacy</TabsTrigger>
          </TabsList>

          <TabsContent value="why" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="text-accent" />
                  Why {tool.name} Works for Autistic Children
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-foreground leading-relaxed">{tool.whyItHelps}</p>
                <div>
                  <h4 className="font-semibold mb-3 text-lg">Best For:</h4>
                  <ul className="space-y-2">
                    {tool.bestFor.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="text-primary shrink-0 mt-1" size={20} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="start" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Desktop className="text-accent" />
                  Getting Started with {tool.name}
                </CardTitle>
                <CardDescription>Follow these steps to introduce {tool.name} to your child at home</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {tool.gettingStarted.map((step, idx) => (
                    <AccordionItem key={idx} value={`step-${idx}`}>
                      <AccordionTrigger className="text-left">
                        <span className="font-semibold">Step {idx + 1}: {step.step}</span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-foreground leading-relaxed pl-4">{step.details}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="home" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Using {tool.name} at Home</CardTitle>
                <CardDescription>Practical tips for integrating {tool.name} into daily routines</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {tool.homeUse.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                      <CheckCircle className="text-primary shrink-0 mt-0.5" size={20} />
                      <span className="text-foreground">{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="safety" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldCheck className="text-primary" />
                  Safety and Privacy
                </CardTitle>
                <CardDescription>What you need to know about {tool.name} security and privacy</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {tool.safetyTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
                      <ShieldCheck className="text-primary shrink-0 mt-0.5" size={20} />
                      <span className="text-foreground">{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="bg-accent/10 border-accent/30">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <Lightbulb className="text-accent shrink-0 mt-1" size={32} />
              <div>
                <h4 className="font-semibold text-lg mb-2">Remember</h4>
                <p className="text-foreground leading-relaxed">
                  All technology should support your child, not replace human connection. Use {tool.name} as a tool for learning and growth, but always prioritize face-to-face interaction, play, and relationship-building. Technology works best when used together with your child, not as a substitute for your presence.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button onClick={onBack} variant="outline" size="sm">
          <ArrowLeft className="mr-2" />
          Back
        </Button>
      </div>

      <div>
        <h1 className="text-4xl font-bold mb-2">Free Technology Tools for Home</h1>
        <p className="text-lg text-muted-foreground">
          Open-source, evidence-based tools to support your child's learning and communication at home
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {toolGuides.map((tool) => (
          <Card key={tool.id} className="card-hover cursor-pointer" onClick={() => setSelectedTool(tool.id)}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-2xl mb-1">{tool.name}</CardTitle>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                      {tool.type}
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent font-medium">
                      {tool.ageRange}
                    </span>
                  </div>
                </div>
                <Desktop className="text-accent" size={32} />
              </div>
              <CardDescription className="text-base">{tool.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                View Parent Guide
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="text-accent" />
            Why These Tools?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-foreground">
          <p>
            All tools featured here are <strong>completely free, open-source, and privacy-respecting</strong>. No hidden costs, no data harvesting, no ads.
          </p>
          <p>
            These tools have been selected specifically because they support autistic children's strengths: visual learning, predictable interfaces, self-paced exploration, and clear feedback.
          </p>
          <p>
            Each guide explains not just <em>how</em> to use the tool, but <em>why</em> it works for autistic learners and <em>how</em> to introduce it respectfully at home.
          </p>
        </CardContent>
      </Card>

      <Card className="warm-card">
        <CardHeader>
          <CardTitle className="handwritten text-2xl">Learn and Thrive</CardTitle>
          <CardDescription className="text-base">
            Essential life skills resources for young people with learning disabilities
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="aspect-video w-full rounded-lg overflow-hidden bg-black">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/WjVjPNw6Pgw"
              title="Learn and Thrive Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
          <div className="space-y-3 text-foreground leading-relaxed">
            <p>
              Learn and Thrive aims to provide every young person with learning disabilities the chance to dream big, make their own choices, and shape their own future. Their simple, engaging video lessons and activity packs give families and professionals the tools to teach essential life skills - helping young people grow in confidence, build safe relationships, and live more independent lives.
            </p>
            <p>
              With over 170 videos and over 1000 ready-to-use resources, they're already used to support over 35,000 children and young people at home, in school, and in support groups.
            </p>
            <p>
              Learn more about their work and resources on their website:{' '}
              <a
                href="https://www.learnandthrive.org.uk/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline font-medium"
              >
                https://www.learnandthrive.org.uk/
              </a>
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="handwritten text-2xl">Irish Organisations - YouTube Resources</CardTitle>
          <CardDescription className="text-base">
            Official YouTube channels from major Irish organisations providing communication, social skills, mental health, and disability support resources
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-3 text-foreground">HSE (Health Service Executive)</h3>
              <div className="space-y-3 ml-4">
                <div>
                  <h4 className="font-medium text-foreground mb-1">HSE Ireland - Main Channel</h4>
                  <p className="text-sm text-muted-foreground mb-2">General health information, mental health campaigns, disability awareness</p>
                  <a href="https://www.youtube.com/user/HSEIreland" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline text-sm">
                    youtube.com/user/HSEIreland
                  </a>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">HSE Mental Health</h4>
                  <p className="text-sm text-muted-foreground mb-2">Youth mental health, wellbeing, coping skills, CAMHS information</p>
                  <a href="https://www.youtube.com/@HSEMentalHealth" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline text-sm">
                    youtube.com/@HSEMentalHealth
                  </a>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">HSE Health & Wellbeing</h4>
                  <p className="text-sm text-muted-foreground mb-2">Parenting, child development, emotional wellbeing</p>
                  <a href="https://www.youtube.com/@HSEHealthWellbeing" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline text-sm">
                    youtube.com/@HSEHealthWellbeing
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3 text-foreground">Early Childhood (0-6 years)</h3>
              <div className="space-y-3 ml-4">
                <div>
                  <h4 className="font-medium text-foreground mb-1">Lámh - Irish Sign System</h4>
                  <p className="text-sm text-muted-foreground mb-2">Communication, early language, AAC, and inclusive practice</p>
                  <a href="https://www.youtube.com/@LamhSigns" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline text-sm">
                    youtube.com/@LamhSigns
                  </a>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">Aistear / NCCA</h4>
                  <p className="text-sm text-muted-foreground mb-2">Play, early learning, communication, social development</p>
                  <a href="https://www.youtube.com/@NCCAIE" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline text-sm">
                    youtube.com/@NCCAIE
                  </a>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">Barnardos Ireland</h4>
                  <p className="text-sm text-muted-foreground mb-2">Parenting, early childhood development, emotional regulation</p>
                  <a href="https://www.youtube.com/@BarnardosIreland" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline text-sm">
                    youtube.com/@BarnardosIreland
                  </a>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">Tusla - Parenting 24/7</h4>
                  <p className="text-sm text-muted-foreground mb-2">Parenting guidance, routines, behaviour, relationships</p>
                  <a href="https://www.youtube.com/@TuslaIreland" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline text-sm">
                    youtube.com/@TuslaIreland
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3 text-foreground">Primary School Age (6-12 years)</h3>
              <div className="space-y-3 ml-4">
                <div>
                  <h4 className="font-medium text-foreground mb-1">NCSE - National Council for Special Education</h4>
                  <p className="text-sm text-muted-foreground mb-2">Supports for teachers, SNAs, parents; autism, language, social skills, behaviour</p>
                  <a href="https://www.youtube.com/@ncseireland" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline text-sm">
                    youtube.com/@ncseireland
                  </a>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">NEPS - National Educational Psychological Service</h4>
                  <p className="text-sm text-muted-foreground mb-2">Wellbeing, anxiety, study skills, behaviour support</p>
                  <a href="https://www.youtube.com/@Education_Ireland/search?query=NEPS" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline text-sm">
                    youtube.com/@Education_Ireland (search NEPS)
                  </a>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">AsIAm - Autism Supports</h4>
                  <p className="text-sm text-muted-foreground mb-2">Communication, sensory needs, social skills, school inclusion</p>
                  <a href="https://www.youtube.com/@AsIAmIreland" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline text-sm">
                    youtube.com/@AsIAmIreland
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3 text-foreground">Teens (12-18 years)</h3>
              <div className="space-y-3 ml-4">
                <div>
                  <h4 className="font-medium text-foreground mb-1">Jigsaw - Youth Mental Health (12-25)</h4>
                  <p className="text-sm text-muted-foreground mb-2">Anxiety, friendships, communication, coping skills, school stress</p>
                  <a href="https://www.youtube.com/@JigsawYMH" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline text-sm">
                    youtube.com/@JigsawYMH
                  </a>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">SpunOut - Youth Information</h4>
                  <p className="text-sm text-muted-foreground mb-2">Relationships, mental health, communication, identity, safety</p>
                  <a href="https://www.youtube.com/@spunout" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline text-sm">
                    youtube.com/@spunout
                  </a>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">BelongTo - LGBTQ+ Youth</h4>
                  <p className="text-sm text-muted-foreground mb-2">Identity, belonging, communication, relationships</p>
                  <a href="https://www.youtube.com/@BeLonGToYouthServices" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline text-sm">
                    youtube.com/@BeLonGToYouthServices
                  </a>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">Webwise - Online Safety</h4>
                  <p className="text-sm text-muted-foreground mb-2">Digital communication, cyberbullying, social skills online</p>
                  <a href="https://www.youtube.com/@WebwiseIreland" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline text-sm">
                    youtube.com/@WebwiseIreland
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3 text-foreground">Older Teens & Young Adults (16-25 years)</h3>
              <div className="space-y-3 ml-4">
                <div>
                  <h4 className="font-medium text-foreground mb-1">National Learning Network (NLN)</h4>
                  <p className="text-sm text-muted-foreground mb-2">Life skills, employment skills, communication, independence</p>
                  <a href="https://www.youtube.com/@NationalLearningNetwork" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline text-sm">
                    youtube.com/@NationalLearningNetwork
                  </a>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">EmployAbility Service</h4>
                  <p className="text-sm text-muted-foreground mb-2">Workplace communication, job skills, inclusion</p>
                  <a href="https://www.youtube.com/@EmployAbilityService" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline text-sm">
                    youtube.com/@EmployAbilityService
                  </a>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">MyMind - Low-Cost Counselling</h4>
                  <p className="text-sm text-muted-foreground mb-2">Mental health, communication, emotional wellbeing</p>
                  <a href="https://www.youtube.com/@MyMindOrg" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline text-sm">
                    youtube.com/@MyMindOrg
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3 text-foreground">Disability, Neurodiversity & Inclusion (All Ages)</h3>
              <div className="space-y-3 ml-4">
                <div>
                  <h4 className="font-medium text-foreground mb-1">Inclusion Ireland</h4>
                  <p className="text-sm text-muted-foreground mb-2">Rights, communication supports, accessible information</p>
                  <a href="https://www.youtube.com/@InclusionIreland" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline text-sm">
                    youtube.com/@InclusionIreland
                  </a>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">Down Syndrome Ireland</h4>
                  <p className="text-sm text-muted-foreground mb-2">Communication, language, social development</p>
                  <a href="https://www.youtube.com/@DownSyndromeIreland" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline text-sm">
                    youtube.com/@DownSyndromeIreland
                  </a>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">Irish Deaf Society</h4>
                  <p className="text-sm text-muted-foreground mb-2">Communication, sign language, accessibility</p>
                  <a href="https://www.youtube.com/@IrishDeafSociety" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline text-sm">
                    youtube.com/@IrishDeafSociety
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-3 text-foreground">Parent & Family Supports</h3>
              <div className="space-y-3 ml-4">
                <div>
                  <h4 className="font-medium text-foreground mb-1">Parentline</h4>
                  <p className="text-sm text-muted-foreground mb-2">Parenting challenges, communication, behaviour</p>
                  <a href="https://www.youtube.com/@ParentlineIreland" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline text-sm">
                    youtube.com/@ParentlineIreland
                  </a>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">Family Resource Centres (FRCs)</h4>
                  <p className="text-sm text-muted-foreground mb-2">Community supports, parenting, wellbeing</p>
                  <a href="https://www.youtube.com/@familyresourcecentres" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline text-sm">
                    youtube.com/@familyresourcecentres
                  </a>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
