import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowSquareOut, SpeakerHigh, Info, Check, GridNine } from '@phosphor-icons/react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { NarrationControls } from '@/components/NarrationControls'

interface CboardIntegrationProps {
  onBack: () => void
}

export function CboardIntegration({ onBack }: CboardIntegrationProps) {
  const [showIframe, setShowIframe] = useState(false)

  const introText = `Cboard is a free and open-source AAC (Augmentative and Alternative Communication) web application that supports communication for children and adults with speech and language impairments. It provides a customizable communication board system with symbols, text-to-speech, and multi-language support including Irish and UK English.`

  const features = [
    'Symbol-based communication boards with text-to-speech',
    'Customizable boards for individual needs',
    'Multi-language support including Irish and UK English',
    'Works offline once loaded',
    'Free and open-source',
    'No registration required to use',
    'GDPR compliant',
    'Cross-platform (works on tablets, computers, phones)'
  ]

  const useCases = [
    {
      title: 'Non-verbal Students',
      description: 'Provide a voice for students who are non-verbal or minimally verbal through symbol-based communication.',
      icon: <SpeakerHigh className="w-6 h-6 text-accent" weight="fill" />
    },
    {
      title: 'Language Development',
      description: 'Support language learning and vocabulary building through visual symbols paired with speech output.',
      icon: <GridNine className="w-6 h-6 text-accent" weight="fill" />
    },
    {
      title: 'Routine Communication',
      description: 'Create custom boards for daily routines (morning routine, lunch, transitions) to support predictability.',
      icon: <Check className="w-6 h-6 text-accent" weight="fill" />
    }
  ]

  const ebpConnections = [
    {
      ebp: 'Functional Communication Training (FCT)',
      connection: 'Cboard provides the tools for teaching functional communication skills through AAC symbols.'
    },
    {
      ebp: 'Augmentative and Alternative Communication',
      connection: 'Cboard is a comprehensive AAC system designed specifically for this evidence-based practice.'
    },
    {
      ebp: 'Visual Supports',
      connection: 'Communication boards serve as powerful visual supports for expression and comprehension.'
    },
    {
      ebp: 'Naturalistic Intervention',
      connection: 'Use Cboard during natural activities and routines to teach communication in context.'
    }
  ]

  const setupSteps = [
    {
      step: '1',
      title: 'Open Cboard',
      description: 'Click "Launch Cboard" button to open the application in a new window or use the embedded version below.'
    },
    {
      step: '2',
      title: 'Explore Default Boards',
      description: 'Start with pre-built communication boards. Navigate by clicking symbols. Use back button to return.'
    },
    {
      step: '3',
      title: 'Customize (Optional)',
      description: 'Create an account (free) to customize boards, add your own symbols, organize categories for your students.'
    },
    {
      step: '4',
      title: 'Practice Together',
      description: 'Model using the board. Point to symbols while speaking. Give wait time. Celebrate all communication attempts.'
    },
    {
      step: '5',
      title: 'Add to Routine',
      description: 'Make Cboard available during natural activities. Bookmark on devices. Support consistent access throughout day.'
    }
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="mb-2">Cboard AAC Integration</h1>
          <p className="text-muted-foreground">
            Free augmentative and alternative communication app for non-verbal students
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
              <strong>Free and Open Source:</strong> Cboard is completely free to use with no registration required. 
              All data stays on your device. GDPR compliant and privacy-respecting.
            </span>
            <NarrationControls 
              text="Cboard is completely free to use with no registration required. All data stays on your device. GDPR compliant and privacy-respecting." 
              variant="minimal" 
            />
          </div>
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="setup">Setup Guide</TabsTrigger>
          <TabsTrigger value="ebp">EBP Connections</TabsTrigger>
          <TabsTrigger value="app">Launch App</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="handwritten text-2xl mb-2">What is Cboard?</CardTitle>
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
            <h2 className="text-2xl mb-4 handwritten">Use Cases in Education</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {useCases.map((useCase, index) => (
                <Card key={index} className="border-2">
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

        <TabsContent value="setup" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="handwritten text-2xl">Quick Start Guide</CardTitle>
              <CardDescription>
                Follow these steps to start using Cboard with your students
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

          <Card className="bg-soft-orange/20 border-2 border-accent/30">
            <CardHeader>
              <CardTitle className="handwritten text-xl">Best Practice Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-3">
                <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" weight="bold" />
                <p><strong>Model First:</strong> Always model using the board before expecting the student to use it. Point and speak.</p>
              </div>
              <div className="flex gap-3">
                <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" weight="bold" />
                <p><strong>Wait Time:</strong> Give students ample time to process and select symbols. Resist the urge to jump in too quickly.</p>
              </div>
              <div className="flex gap-3">
                <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" weight="bold" />
                <p><strong>Honour All Attempts:</strong> Celebrate pointing, looking, approximations. All communication attempts are valid.</p>
              </div>
              <div className="flex gap-3">
                <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" weight="bold" />
                <p><strong>Consistent Access:</strong> Keep AAC available at all times. Communication is a right, not something to be earned.</p>
              </div>
              <div className="flex gap-3">
                <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" weight="bold" />
                <p><strong>Presume Competence:</strong> Assume the student has things to say. Never limit vocabulary based on perceived ability.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ebp" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="handwritten text-2xl">Evidence-Based Practice Connections</CardTitle>
              <CardDescription>
                How Cboard supports implementation of evidence-based practices from our EBP Library
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
              AAC is an evidence-based practice that can be combined with many other EBPs. Visit our EBP Library 
              to explore how communication supports integrate with visual supports, naturalistic intervention, 
              prompting, and reinforcement strategies.
            </AlertDescription>
          </Alert>
        </TabsContent>

        <TabsContent value="app" className="space-y-6 mt-6">
          <div className="flex flex-col items-center gap-6">
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="handwritten text-2xl">Launch Cboard</CardTitle>
                <CardDescription>
                  Choose how you'd like to access Cboard
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    onClick={() => window.open('https://www.cboard.io/app/', '_blank')}
                    className="flex-1"
                    size="lg"
                  >
                    <ArrowSquareOut className="w-5 h-5 mr-2" weight="bold" />
                    Open in New Window
                  </Button>
                  <Button 
                    onClick={() => setShowIframe(!showIframe)}
                    variant="outline"
                    className="flex-1"
                    size="lg"
                  >
                    {showIframe ? 'Hide' : 'Show'} Embedded Version
                  </Button>
                </div>

                <div className="text-sm text-muted-foreground space-y-2">
                  <p>
                    <strong>New Window:</strong> Opens Cboard in a separate tab for full-screen use. Recommended for classroom use on tablets.
                  </p>
                  <p>
                    <strong>Embedded:</strong> Shows Cboard within this page. Good for quick exploration and demonstration.
                  </p>
                </div>
              </CardContent>
            </Card>

            {showIframe && (
              <Card className="w-full">
                <CardContent className="p-0">
                  <div className="aspect-[16/10] w-full">
                    <iframe
                      src="https://www.cboard.io/app/"
                      className="w-full h-full border-0 rounded-b-lg"
                      title="Cboard AAC Application"
                      allow="microphone; camera"
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
                  <strong>Privacy & Data:</strong> Cboard stores all data locally on your device. No data is sent to external servers 
                  unless you choose to create an account and sync across devices.
                </p>
                <p>
                  <strong>Language Settings:</strong> Cboard supports multiple languages including Irish (Gaeilge) and UK English. 
                  Change language in the app settings (gear icon).
                </p>
                <p>
                  <strong>Offline Use:</strong> Once loaded, Cboard works offline. Bookmark it on tablets for reliable access without internet.
                </p>
                <p>
                  <strong>Customization:</strong> Create a free account to customize boards, add photos, organize categories for specific students. 
                  Registration is optional.
                </p>
                <p>
                  <strong>Support:</strong> For technical help with Cboard, visit their documentation at{' '}
                  <a 
                    href="https://www.cboard.io/help/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    cboard.io/help
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
                  Combine Cboard with other tools from Autism and Me for comprehensive support:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" weight="bold" />
                    <span><strong>Visual Supports Builder:</strong> Create schedules and choice boards to complement AAC</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" weight="bold" />
                    <span><strong>Behaviour Communication Analyser:</strong> Understand what student is trying to communicate</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" weight="bold" />
                    <span><strong>Transition Support Builder:</strong> Plan transitions with AAC as part of support strategy</span>
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
