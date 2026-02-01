import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  ArrowLeft, 
  Desktop, 
  ChatCircle, 
  GameController, 
  GraduationCap,
  Code,
  BookOpen,
  ChalkboardTeacher,
  Palette,
  Globe
} from '@phosphor-icons/react'
import { trackToolUsage } from '@/lib/analytics'

interface OpenSourceToolsLibraryProps {
  onBack: () => void
}

const educationalTools = [
  {
    id: 'gcompris',
    name: 'GCompris',
    url: 'https://gcompris.net',
    icon: GraduationCap,
    category: 'Learning Suite',
    ageRange: '2-10 years',
    description: 'Comprehensive educational software with 100+ activities covering maths, science, reading, memory, logic, and computer skills.',
    features: [
      '100+ educational activities across multiple subjects',
      'Visual and auditory feedback for every action',
      'Offline access - works without internet',
      'Available in 40+ languages including English',
      'Self-paced learning with no time pressure',
      'Safe, ad-free, no data collection'
    ],
    autismSupport: [
      'Predictable, consistent interface reduces anxiety',
      'Clear visual feedback for all interactions',
      'No social pressure or competition',
      'Activities can be repeated unlimited times',
      'Supports visual and hands-on learning styles',
      'Structured activities with clear objectives'
    ],
    ebpConnections: ['Visual Supports', 'Computer-Aided Instruction', 'Task Analysis', 'Reinforcement'],
    setup: 'Download from gcompris.net for Windows, Mac, Linux, Android, or iOS. Free and open source.',
    launched: false
  },
  {
    id: 'khan-academy',
    name: 'Khan Academy',
    url: 'https://www.khanacademy.org',
    icon: ChalkboardTeacher,
    category: 'Structured Learning',
    ageRange: '4+ years',
    description: 'Free online learning platform with video lessons, practice exercises, and personalised learning paths for maths, science, and humanities.',
    features: [
      'Thousands of video lessons across all subjects',
      'Practice exercises with step-by-step hints',
      'Personalised learning dashboard',
      'Can pause, rewatch, and repeat indefinitely',
      'Progress tracking and mastery-based progression',
      'Khan Academy Kids for ages 4-8 with engaging activities'
    ],
    autismSupport: [
      'Self-paced learning with no time limits',
      'Videos can be paused and rewatched endlessly',
      'Clear, structured lessons with logical progression',
      'No social interaction required',
      'Predictable format across all lessons',
      'Visual and auditory learning options'
    ],
    ebpConnections: ['Computer-Aided Instruction', 'Visual Supports', 'Task Analysis', 'Prompting', 'Self-Management'],
    setup: 'Visit khanacademy.org and create a free account. Download Khan Academy Kids app for younger children.',
    launched: false
  },
  {
    id: 'scratch',
    name: 'Scratch',
    url: 'https://scratch.mit.edu',
    icon: Code,
    category: 'Creative Coding',
    ageRange: '8+ years',
    description: 'Visual programming platform where children create interactive stories, games, and animations using drag-and-drop code blocks.',
    features: [
      'Block-based coding - no typing required',
      'Create games, animations, and interactive stories',
      'Massive library of tutorials and starter projects',
      'Can "remix" existing projects to learn',
      'Save projects and build portfolio',
      'Active moderated community (can be disabled)'
    ],
    autismSupport: [
      'Visual, pattern-based programming appeals to autistic thinking',
      'Clear cause-and-effect learning',
      'Connects to special interests (create projects about trains, space, etc.)',
      'No wrong answers - experimentation encouraged',
      'Predictable block syntax reduces cognitive load',
      'Can work independently or with adult support'
    ],
    ebpConnections: ['Visual Supports', 'Computer-Aided Instruction', 'Task Analysis', 'Special Interests', 'Self-Management'],
    setup: 'Visit scratch.mit.edu and click "Create" to start immediately. Optional account for saving projects.',
    launched: false
  },
  {
    id: 'code-org',
    name: 'Code.org',
    url: 'https://code.org',
    icon: Code,
    category: 'Coding Education',
    ageRange: '4+ years',
    description: 'Structured computer science curriculum with themed coding courses featuring popular characters like Minecraft, Star Wars, and Frozen.',
    features: [
      'Age-appropriate coding courses from pre-readers to teens',
      'Themed activities featuring familiar characters',
      'Clear progression from beginner to advanced',
      'Visual block-based coding interface',
      'Immediate feedback on every action',
      'Free certificates of completion'
    ],
    autismSupport: [
      'Highly structured lessons with clear objectives',
      'Leverages special interests through themed courses',
      'Predictable interface and progression',
      'Visual feedback for every step',
      'Self-paced with unlimited attempts',
      'Logical, rule-based thinking matches autistic strengths'
    ],
    ebpConnections: ['Computer-Aided Instruction', 'Visual Supports', 'Task Analysis', 'Special Interests', 'Prompting'],
    setup: 'Visit code.org and explore courses. No account needed to start. Create account to save progress.',
    launched: false
  }
]

const communicationTools = [
  {
    id: 'cboard',
    name: 'Cboard',
    url: 'https://www.cboard.io',
    icon: ChatCircle,
    category: 'AAC Communication',
    ageRange: 'All ages',
    description: 'Free AAC (Augmentative and Alternative Communication) board with symbol-based communication and text-to-speech.',
    features: [
      'Symbol-based communication boards',
      'Text-to-speech in multiple languages',
      'Pre-made boards for common needs',
      'Fully customizable boards and symbols',
      'Works online and offline',
      'No account required for basic use'
    ],
    autismSupport: [
      'Provides communication for non-verbal individuals',
      'Reduces frustration by enabling expression',
      'Visual symbols match autism communication strengths',
      'Predictable, consistent interface',
      'Can be personalized to individual needs',
      'Honors all communication attempts'
    ],
    ebpConnections: ['AAC', 'Functional Communication Training', 'Visual Supports', 'Augmentative Communication'],
    setup: 'Visit www.cboard.io and click "Use Cboard" - works immediately in browser. Optional account to save custom boards.',
    launched: false
  }
]

const creativeTools = [
  {
    id: 'tux-paint',
    name: 'Tux Paint',
    url: 'http://www.tuxpaint.org',
    icon: Palette,
    category: 'Creative Expression',
    ageRange: '3+ years',
    description: 'Simple, sensory-friendly drawing program designed for young children. Widely used in special education settings.',
    features: [
      'Large, clear interface designed for children',
      'Fun sound effects and visual feedback',
      'Stamps, brushes, and special effects',
      'Automatic save - no lost work',
      'No complex menus or overwhelming options',
      'Gallery of saved artwork'
    ],
    autismSupport: [
      'Calming, predictable creative outlet',
      'Clear feedback for every action',
      'No pressure to create "correctly"',
      'Supports fine motor development',
      'Can be used independently',
      'Sensory-friendly sounds and visuals'
    ],
    ebpConnections: ['Visual Supports', 'Reinforcement', 'Self-Management'],
    setup: 'Download from tuxpaint.org for Windows, Mac, or Linux. Free and open source.',
    launched: false
  }
]

const gamingTools = [
  {
    id: 'minetest',
    name: 'Minetest',
    url: 'https://www.minetest.net',
    icon: GameController,
    category: 'Creative Gaming',
    ageRange: '7+ years',
    description: 'Open-source alternative to Minecraft. Build, explore, and create in a blocky 3D world. Safe, ad-free, and highly customizable.',
    features: [
      'Similar to Minecraft but completely free',
      'Single-player or multiplayer modes',
      'Thousands of mods and customizations',
      'No ads, no in-app purchases',
      'Creative and survival modes',
      'Active supportive community'
    ],
    autismSupport: [
      'Predictable block-based world appeals to pattern thinking',
      'Supports special interests in building and systems',
      'Can be used for social skills practice in controlled setting',
      'Reduces anxiety of unpredictable gameplay',
      'Creative mode offers no-pressure exploration',
      'Parent can control multiplayer access'
    ],
    ebpConnections: ['Peer-Mediated Instruction', 'Special Interests', 'Social Narratives', 'Video Modeling'],
    setup: 'Download from minetest.net for Windows, Mac, Linux, or Android. Free and open source.',
    launched: false
  }
]

const allTools = [...educationalTools, ...communicationTools, ...creativeTools, ...gamingTools]

export function OpenSourceToolsLibrary({ onBack }: OpenSourceToolsLibraryProps) {
  const [selectedTool, setSelectedTool] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState('all')

  const handleOpenTool = (toolId: string) => {
    trackToolUsage(`open-source-${toolId}`)
    setSelectedTool(toolId)
  }

  const filteredTools = activeCategory === 'all' 
    ? allTools 
    : allTools.filter(tool => {
        if (activeCategory === 'education') return educationalTools.includes(tool)
        if (activeCategory === 'communication') return communicationTools.includes(tool)
        if (activeCategory === 'creative') return creativeTools.includes(tool)
        if (activeCategory === 'gaming') return gamingTools.includes(tool)
        return true
      })

  if (selectedTool) {
    const tool = allTools.find(t => t.id === selectedTool)
    if (!tool) return null

    const Icon = tool.icon

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button onClick={() => setSelectedTool(null)} variant="outline" size="sm">
            <ArrowLeft className="mr-2" />
            Back to Tools
          </Button>
        </div>

        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-2">{tool.name}</h1>
            <p className="text-lg text-muted-foreground mb-4">{tool.description}</p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{tool.category}</Badge>
              <Badge variant="outline">{tool.ageRange}</Badge>
              <Badge className="bg-primary text-primary-foreground">Free & Open Source</Badge>
            </div>
          </div>
          <Icon size={64} className="text-accent" />
        </div>

        <Card className="bg-accent/10 border-accent/30">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <Globe className="text-accent" size={32} />
              <div className="flex-1">
                <p className="font-semibold mb-1">Access {tool.name}</p>
                <a 
                  href={tool.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-accent hover:underline text-lg"
                >
                  {tool.url}
                </a>
              </div>
              <Button asChild>
                <a href={tool.url} target="_blank" rel="noopener noreferrer">
                  Open {tool.name}
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="features" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="autism">Autism Support</TabsTrigger>
            <TabsTrigger value="ebp">EBP Connections</TabsTrigger>
            <TabsTrigger value="setup">Setup Guide</TabsTrigger>
          </TabsList>

          <TabsContent value="features" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Key Features</CardTitle>
                <CardDescription>What {tool.name} offers</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {tool.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-accent mt-1">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="autism" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Why This Works for Autistic Learners</CardTitle>
                <CardDescription>How {tool.name} supports autistic children and adults</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {tool.autismSupport.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-primary/5">
                      <span className="text-primary font-bold mt-0.5">→</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ebp" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Evidence-Based Practice Connections</CardTitle>
                <CardDescription>How {tool.name} implements EBPs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {tool.ebpConnections.map((ebp, idx) => (
                    <Badge key={idx} variant="outline" className="text-sm py-1 px-3">
                      {ebp}
                    </Badge>
                  ))}
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  These evidence-based practices are naturally embedded in {tool.name}'s design and usage.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="setup" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Setup and Getting Started</CardTitle>
                <CardDescription>How to access and begin using {tool.name}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-muted/50 border">
                  <p className="text-foreground">{tool.setup}</p>
                </div>
                <div className="flex gap-3">
                  <Button asChild className="flex-1">
                    <a href={tool.url} target="_blank" rel="noopener noreferrer">
                      <Globe className="mr-2" />
                      Visit {tool.name}
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <h4 className="font-semibold mb-3">Important Notes</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• {tool.name} is completely free and open source - no hidden costs or premium features</li>
              <li>• Privacy-respecting - minimal or no data collection</li>
              <li>• Works best with adult support, especially for children under 10</li>
              <li>• Technology should supplement, not replace, human interaction and relationship-building</li>
            </ul>
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
        <h1 className="text-4xl font-bold mb-2">Open-Source Tools Library</h1>
        <p className="text-lg text-muted-foreground">
          Free, evidence-based software tools supporting autistic individuals across learning, communication, and creativity
        </p>
      </div>

      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <Desktop className="text-primary shrink-0" size={32} />
            <div>
              <h3 className="font-semibold text-lg mb-2">Why Open Source?</h3>
              <p className="text-foreground mb-2">
                All tools featured here are <strong>completely free, open-source, and privacy-respecting</strong>. 
                No paywalls, no geographic restrictions, no data harvesting.
              </p>
              <p className="text-muted-foreground text-sm">
                These tools are freely available worldwide and have been selected specifically for their 
                alignment with evidence-based practices and support for autistic learners.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All Tools</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="communication">Communication</TabsTrigger>
          <TabsTrigger value="creative">Creative</TabsTrigger>
          <TabsTrigger value="gaming">Gaming</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid gap-6 md:grid-cols-2">
        {filteredTools.map((tool) => {
          const Icon = tool.icon
          return (
            <Card key={tool.id} className="card-hover cursor-pointer" onClick={() => handleOpenTool(tool.id)}>
              <CardHeader>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-2">{tool.name}</CardTitle>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs">{tool.category}</Badge>
                      <Badge variant="outline" className="text-xs">{tool.ageRange}</Badge>
                    </div>
                  </div>
                  <Icon size={40} className="text-accent" />
                </div>
                <CardDescription className="text-sm leading-relaxed">{tool.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1 mb-4">
                  {tool.ebpConnections.slice(0, 3).map((ebp, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {ebp}
                    </Badge>
                  ))}
                  {tool.ebpConnections.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{tool.ebpConnections.length - 3} more
                    </Badge>
                  )}
                </div>
                <Button variant="outline" className="w-full">
                  View Details
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredTools.length === 0 && (
        <Card>
          <CardContent className="pt-6 text-center text-muted-foreground">
            <p>No tools found in this category.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
