import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowSquareOut, GameController, Info, Check, GraduationCap, PuzzlePiece, Calculator, MapTrifold, Books } from '@phosphor-icons/react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { NarrationControls } from '@/components/NarrationControls'

interface GComprisIntegrationProps {
  onBack: () => void
}

export function GComprisIntegration({ onBack }: GComprisIntegrationProps) {
  const [showIframe, setShowIframe] = useState(false)

  const introText = `GCompris is a free, open-source educational software suite containing over 190 activities designed for children aged 2 to 10. It offers engaging, game-based learning across multiple subjects including maths, science, geography, reading, and computer skills. All activities are designed with a consistent, accessible interface that reduces cognitive load and supports independent exploration.`

  const features = [
    'Over 190 educational activities across multiple subject areas',
    'Consistent, predictable interface reduces learning curve',
    'Visual and audio feedback for every action',
    'Self-paced learning with no time pressure',
    'Adjustable difficulty levels for differentiation',
    'Works offline once installed',
    'Available in multiple languages including English',
    'Completely free and open-source'
  ]

  const activityCategories = [
    {
      title: 'Computer Discovery',
      description: 'Learn keyboard, mouse, and basic computer skills through engaging activities.',
      icon: <GameController className="w-6 h-6 text-accent" weight="fill" />
    },
    {
      title: 'Mathematics',
      description: 'Number recognition, counting, basic operations, money, measurement, and problem-solving.',
      icon: <Calculator className="w-6 h-6 text-accent" weight="fill" />
    },
    {
      title: 'Science',
      description: 'Electricity, water cycle, renewable energy, and scientific exploration activities.',
      icon: <GraduationCap className="w-6 h-6 text-accent" weight="fill" />
    },
    {
      title: 'Geography',
      description: 'Maps, countries, landmarks, and spatial awareness activities.',
      icon: <MapTrifold className="w-6 h-6 text-accent" weight="fill" />
    },
    {
      title: 'Reading & Language',
      description: 'Letter recognition, phonics, vocabulary building, and reading comprehension.',
      icon: <Books className="w-6 h-6 text-accent" weight="fill" />
    },
    {
      title: 'Logic & Memory',
      description: 'Pattern recognition, sequencing, memory games, and problem-solving challenges.',
      icon: <PuzzlePiece className="w-6 h-6 text-accent" weight="fill" />
    }
  ]

  const useCases = [
    {
      title: 'Visual-Spatial Learners',
      description: 'Activities use clear graphics, consistent layouts, and visual feedback that support students who learn best through visual information.',
      icon: <GameController className="w-6 h-6 text-accent" weight="fill" />
    },
    {
      title: 'Self-Paced Learning',
      description: 'No timers or external pressure. Students work at their own pace with immediate, non-judgmental feedback.',
      icon: <Check className="w-6 h-6 text-accent" weight="fill" />
    },
    {
      title: 'Predictable Structure',
      description: 'Consistent interface across all activities reduces anxiety and supports independent navigation.',
      icon: <GraduationCap className="w-6 h-6 text-accent" weight="fill" />
    }
  ]

  const ebpConnections = [
    {
      ebp: 'Technology-Aided Instruction',
      connection: 'GCompris provides computer-based instruction across multiple academic domains with built-in differentiation.'
    },
    {
      ebp: 'Task Analysis',
      connection: 'Activities break complex skills into manageable steps with clear progression and visual scaffolding.'
    },
    {
      ebp: 'Visual Supports',
      connection: 'Every activity uses clear visual cues, icons, and graphics to support understanding and navigation.'
    },
    {
      ebp: 'Reinforcement',
      connection: 'Immediate positive feedback (sounds, animations, stars) reinforces correct responses and effort.'
    },
    {
      ebp: 'Self-Management',
      connection: 'Students can independently select activities, monitor their progress, and work at their own pace.'
    }
  ]

  const setupSteps = [
    {
      step: '1',
      title: 'Access GCompris',
      description: 'Download and install GCompris from gcompris.net for Windows, Mac, Linux, or use on Android/iOS tablets. Installation is free and straightforward.'
    },
    {
      step: '2',
      title: 'Explore Activity Categories',
      description: 'Start with the main menu showing activity categories by subject and skill level. Let students browse with support to find areas of interest.'
    },
    {
      step: '3',
      title: 'Start with Familiar Topics',
      description: 'Begin with activities matching student\'s current interests or curriculum topics. The consistent interface means once they learn one activity, others become easier.'
    },
    {
      step: '4',
      title: 'Adjust Difficulty',
      description: 'Most activities have multiple levels. Start at easier levels to build confidence, then gradually increase challenge as skills develop.'
    },
    {
      step: '5',
      title: 'Create Routine Use',
      description: 'Schedule regular GCompris time (e.g., 15 minutes daily) as part of learning routine. Predictability supports engagement and skill development.'
    }
  ]

  const autismSpecificBenefits = [
    {
      title: 'Sensory-Friendly Design',
      description: 'Clean visual design without overwhelming animations or distracting elements. Sound can be adjusted or muted.'
    },
    {
      title: 'No Social Pressure',
      description: 'Students can learn without peer comparison, judgment, or social demands. Perfect for building skills in a low-stress environment.'
    },
    {
      title: 'Special Interest Integration',
      description: 'Wide variety of topics means students can often find activities matching their special interests (geography, numbers, patterns, etc.).'
    },
    {
      title: 'Predictable Feedback',
      description: 'Consistent, non-judgmental feedback for both correct and incorrect responses. No surprise reactions or punishments.'
    },
    {
      title: 'Executive Function Support',
      description: 'Clear menus, consistent navigation, and structured progression support planning and task completion.'
    },
    {
      title: 'Motor Skill Options',
      description: 'Activities accommodate different motor abilities. Simple click/tap interactions work for students with coordination difficulties.'
    }
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2">GCompris Educational Software</h1>
          <p className="text-muted-foreground">
            Free educational software with 190+ activities for accessible, self-paced learning
          </p>
        </div>
        <Button onClick={onBack} variant="outline">
          Back to Tools
        </Button>
      </div>

      <Alert className="bg-soft-green/30 border-primary">
        <Info className="w-5 h-5 text-primary" weight="fill" />
        <AlertDescription>
          <div className="flex items-start justify-between gap-4">
            <span className="flex-1">
              <strong>Free and Open Source:</strong> GCompris is completely free with no subscriptions, in-app purchases, 
              or data collection. Download once and use forever across all your devices.
            </span>
            <NarrationControls 
              text="GCompris is completely free with no subscriptions, in-app purchases, or data collection. Download once and use forever across all your devices." 
              variant="minimal" 
            />
          </div>
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="autism-benefits">Autism Support</TabsTrigger>
          <TabsTrigger value="setup">Setup Guide</TabsTrigger>
          <TabsTrigger value="ebp">EBP Connections</TabsTrigger>
          <TabsTrigger value="access">Access GCompris</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="handwritten text-2xl mb-2">What is GCompris?</CardTitle>
                  <CardDescription>
                    {introText}
                  </CardDescription>
                </div>
                <NarrationControls text={introText} variant="minimal" />
              </div>
            </CardHeader>
            <CardContent>
              <h3 className="text-lg font-semibold mb-4 handwritten">Key Features</h3>
              <ul className="grid gap-3 md:grid-cols-2">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" weight="bold" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <div>
            <h2 className="text-2xl mb-4 handwritten">Activity Categories</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {activityCategories.map((category, index) => (
                <Card key={index} className="border-2">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      {category.icon}
                      <CardTitle className="text-lg handwritten">{category.title}</CardTitle>
                    </div>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl mb-4 handwritten">Why GCompris for Diverse Learners</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {useCases.map((useCase, index) => (
                <Card key={index} className="border-2 bg-soft-orange/10">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      {useCase.icon}
                      <CardTitle className="text-lg handwritten">{useCase.title}</CardTitle>
                    </div>
                    <CardDescription>{useCase.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="autism-benefits" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="handwritten text-2xl">Autism-Specific Benefits</CardTitle>
              <CardDescription>
                Why GCompris works particularly well for autistic learners
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {autismSpecificBenefits.map((benefit, index) => (
                  <div key={index} className="border-l-4 border-accent pl-4 py-2">
                    <h3 className="font-semibold text-lg mb-1 handwritten">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-soft-orange/20 border-2 border-accent/30">
            <CardHeader>
              <CardTitle className="handwritten text-xl">Implementation Tips for Autistic Students</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-3">
                <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" weight="bold" />
                <p><strong>Introduce Gradually:</strong> Show students how to navigate the main menu first. Practice returning to the menu from activities. Build confidence before exploring independently.</p>
              </div>
              <div className="flex gap-3">
                <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" weight="bold" />
                <p><strong>Respect Preferences:</strong> Some students may want to do the same activities repeatedly. This is valid learning and building mastery. Don't force variety.</p>
              </div>
              <div className="flex gap-3">
                <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" weight="bold" />
                <p><strong>Adjust Sensory Settings:</strong> Turn down or off sound effects if needed. Adjust screen brightness. Create a comfortable sensory environment around the device.</p>
              </div>
              <div className="flex gap-3">
                <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" weight="bold" />
                <p><strong>No Time Pressure:</strong> Never add external timers or pressure. The beauty of GCompris is students can work at their own pace.</p>
              </div>
              <div className="flex gap-3">
                <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" weight="bold" />
                <p><strong>Celebrate Engagement:</strong> Focus on engagement and enjoyment, not completion or "getting it right." Learning happens through exploration.</p>
              </div>
              <div className="flex gap-3">
                <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" weight="bold" />
                <p><strong>Link to Special Interests:</strong> If student loves maps, start with geography activities. If they love numbers, explore maths activities. Use interests as entry points.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="setup" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="handwritten text-2xl">Quick Start Guide</CardTitle>
              <CardDescription>
                How to get started with GCompris in your classroom
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {setupSteps.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-xl">
                      {item.step}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1 handwritten">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-soft-green/20 border-2 border-primary/30">
            <CardHeader>
              <CardTitle className="handwritten text-xl">Platform Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">💻 Desktop (Windows, Mac, Linux)</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Best for classroom computers. Full access to all 190+ activities. Download from gcompris.net.
                </p>
                <ul className="text-sm space-y-1 ml-4">
                  <li>✓ All activities included</li>
                  <li>✓ Works completely offline</li>
                  <li>✓ Large screen for better visibility</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">📱 Tablets (Android, iOS)</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Great for individual student use. Touch interface works well for most activities. Available on app stores.
                </p>
                <ul className="text-sm space-y-1 ml-4">
                  <li>✓ Touch-friendly interface</li>
                  <li>✓ Portable for flexible learning spaces</li>
                  <li>✓ Some activities free, full version available for small one-time fee</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">🌐 Web Demo (Limited)</h4>
                <p className="text-sm text-muted-foreground">
                  A small selection of activities can be tried online at gcompris.net without installation. Good for exploration before downloading.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ebp" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="handwritten text-2xl">Evidence-Based Practice Connections</CardTitle>
              <CardDescription>
                How GCompris supports implementation of evidence-based practices from our EBP Library
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {ebpConnections.map((item, index) => (
                  <div key={index} className="border-l-4 border-accent pl-4 py-2">
                    <h3 className="font-semibold text-lg mb-1 handwritten">{item.ebp}</h3>
                    <p className="text-muted-foreground">{item.connection}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Alert>
            <Info className="w-5 h-5" />
            <AlertDescription>
              Technology-aided instruction is most effective when paired with other evidence-based practices. 
              Use GCompris as part of a comprehensive support plan that includes visual supports, 
              reinforcement, and opportunities for naturalistic learning and social interaction.
            </AlertDescription>
          </Alert>
        </TabsContent>

        <TabsContent value="access" className="space-y-6 mt-6">
          <div className="flex flex-col items-center gap-6">
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="handwritten text-2xl">Access GCompris</CardTitle>
                <CardDescription>
                  Visit the GCompris website to download or learn more
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    onClick={() => window.open('https://gcompris.net/', '_blank')}
                    className="flex-1"
                    size="lg"
                  >
                    <ArrowSquareOut className="w-5 h-5 mr-2" weight="bold" />
                    Visit GCompris Website
                  </Button>
                  <Button 
                    onClick={() => window.open('https://gcompris.net/downloads-en.html', '_blank')}
                    variant="secondary"
                    className="flex-1"
                    size="lg"
                  >
                    <ArrowSquareOut className="w-5 h-5 mr-2" weight="bold" />
                    Download GCompris
                  </Button>
                </div>

                <div className="text-sm text-muted-foreground space-y-2">
                  <p>
                    <strong>Website:</strong> Visit gcompris.net to learn about all features, see screenshots, and access documentation.
                  </p>
                  <p>
                    <strong>Downloads:</strong> Free installers available for Windows, Mac, Linux, and links to app stores for mobile versions.
                  </p>
                </div>
              </CardContent>
            </Card>

            {showIframe && (
              <Card className="w-full">
                <CardContent className="p-0">
                  <div className="aspect-[16/10] w-full">
                    <iframe
                      src="https://gcompris.net/"
                      className="w-full h-full border-0 rounded-b-lg"
                      title="GCompris Educational Software Website"
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="w-full bg-soft-green/30 border-2 border-primary">
              <CardHeader>
                <CardTitle className="handwritten text-xl">Important Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p>
                  <strong>Privacy & Safety:</strong> GCompris runs entirely on your device with no internet connection required 
                  after installation. No data collection, no ads, no tracking. Completely safe for children.
                </p>
                <p>
                  <strong>Desktop vs Mobile:</strong> Desktop versions (Windows, Mac, Linux) include all 190+ activities for free. 
                  Mobile versions (Android, iOS) have some free activities with option to unlock full version for a small one-time fee.
                </p>
                <p>
                  <strong>Language Support:</strong> GCompris is available in over 50 languages. Change language in settings to match 
                  student needs or support multilingual learners.
                </p>
                <p>
                  <strong>System Requirements:</strong> Very modest. Works on older computers and budget tablets. See website for specific details.
                </p>
                <p>
                  <strong>Updates:</strong> GCompris is actively maintained with regular updates adding new activities and improvements. 
                  All updates are free.
                </p>
                <p>
                  <strong>Support & Documentation:</strong> Comprehensive documentation, activity guides, and community support available at{' '}
                  <a 
                    href="https://gcompris.net/wiki/Manual" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    gcompris.net/wiki/Manual
                  </a>
                </p>
              </CardContent>
            </Card>

            <Card className="w-full border-2 border-accent/30">
              <CardHeader>
                <CardTitle className="handwritten text-xl">Related Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Combine GCompris with other tools from Autism and Me for comprehensive support:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" weight="bold" />
                    <span><strong>Visual Supports Builder:</strong> Create visual schedules showing when GCompris time happens in daily routine</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" weight="bold" />
                    <span><strong>Technology Integration Planner:</strong> Plan how to incorporate GCompris into your curriculum and IEP goals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" weight="bold" />
                    <span><strong>Reinforcement Menu Builder:</strong> Use GCompris time as positive reinforcement for effort and engagement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" weight="bold" />
                    <span><strong>Self-Management System Designer:</strong> Support students in self-monitoring their learning with GCompris activities</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
