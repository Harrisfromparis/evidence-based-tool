import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  ListChecks, Eye, ChatCircle, HandHeart, ArrowsLeftRight, FileText, UserCircle, CalendarCheck, Smiley,
  Image, Book, ListNumbers, ChatsCircle, Star, ArrowBendDownRight, ChartLine, Folders,
  UsersThree, Presentation, Video, DeviceMobile, Lightning, Brain, PersonSimpleRun,
  MusicNotes, Laptop, Target, Leaf, MagnifyingGlass
} from '@phosphor-icons/react'
import { tools } from '@/lib/data'
import { LessonScriptGenerator } from '@/components/LessonScriptGenerator'
import { Choose3EBPsPlanner } from '@/components/Choose3EBPsPlanner'
import { SensoryChecklist } from '@/components/SensoryChecklist'
import { BehaviorCommunicationAnalyzer } from '@/components/BehaviorCommunicationAnalyzer'
import { CoRegulationStrategies } from '@/components/CoRegulationStrategies'
import { TransitionSupportBuilder } from '@/components/TransitionSupportBuilder'
import { ParentEBPAssessment } from '@/components/ParentEBPAssessment'
import { SchoolPlanner } from '@/components/SchoolPlanner'
import { StudentInput } from '@/components/StudentInput'

const iconMap = {
  ListChecks,
  Eye,
  ChatCircle,
  HandHeart,
  ArrowsLeftRight,
  FileText,
  UserCircle,
  CalendarCheck,
  Smiley,
  Image,
  Book,
  ListNumbers,
  ChatsCircle,
  Star,
  ArrowBendDownRight,
  ChartLine,
  Folders,
  UsersThree,
  Presentation,
  Video,
  DeviceMobile,
  Lightning,
  Brain,
  PersonSimpleRun,
  MusicNotes,
  Laptop,
  Target,
  Leaf
}

export function ToolsView() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')

  const filteredTools = tools.filter(tool => {
    const matchesSearch = 
      tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.ebpCategories.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesCategory = categoryFilter === 'all' || tool.category === categoryFilter
    
    return matchesSearch && matchesCategory
  })

  const categories = ['all', ...Array.from(new Set(tools.map(t => t.category)))]

  if (selectedTool === 'lesson-script-generator') {
    return <LessonScriptGenerator onBack={() => setSelectedTool(null)} />
  }

  if (selectedTool === 'choose-3-ebps') {
    return <Choose3EBPsPlanner onBack={() => setSelectedTool(null)} />
  }

  if (selectedTool === 'sensory-checklist') {
    return <SensoryChecklist onBack={() => setSelectedTool(null)} />
  }

  if (selectedTool === 'behavior-communication') {
    return <BehaviorCommunicationAnalyzer onBack={() => setSelectedTool(null)} />
  }

  if (selectedTool === 'co-regulation') {
    return <CoRegulationStrategies onBack={() => setSelectedTool(null)} />
  }

  if (selectedTool === 'transition-support') {
    return <TransitionSupportBuilder onBack={() => setSelectedTool(null)} />
  }

  if (selectedTool === 'parent-ebp-assessment') {
    return <ParentEBPAssessment onBack={() => setSelectedTool(null)} />
  }

  if (selectedTool === 'school-planner') {
    return <SchoolPlanner onBack={() => setSelectedTool(null)} />
  }

  if (selectedTool === 'student-input') {
    return <StudentInput onBack={() => setSelectedTool(null)} />
  }

  const implementedTools = [
    'lesson-script-generator', 
    'transition-support', 
    'co-regulation', 
    'choose-3-ebps', 
    'sensory-checklist', 
    'behavior-communication', 
    'parent-ebp-assessment', 
    'school-planner', 
    'student-input'
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-foreground mb-2">Implementation Tools for All 28 EBPs</h2>
        <p className="text-muted-foreground">
          Practical tools to implement evidence-based practices. Each tool provides structured guidance
          for planning, assessment, and action across all 28 NCAEP evidence-based practices.
        </p>
      </div>

      <Card className="bg-muted">
        <CardContent className="pt-6">
          <p className="text-muted-foreground">
            <strong className="text-foreground">Note:</strong> These tools are designed for collaborative use 
            with colleagues, families, and where appropriate, with autistic students themselves. They support 
            reflective practice and evidence-based decision-making across all domains.
          </p>
        </CardContent>
      </Card>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            id="tool-search"
            type="text"
            placeholder="Search tools by name, description, or EBP category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(cat => (
              <SelectItem key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {filteredTools.map((tool) => {
          const IconComponent = iconMap[tool.icon as keyof typeof iconMap] || FileText
          const isInteractive = implementedTools.includes(tool.id)
          
          return (
            <Card 
              key={tool.id}
              className={`border-2 transition-colors ${isInteractive ? 'cursor-pointer hover:bg-secondary' : 'opacity-75'}`}
              onClick={() => isInteractive && setSelectedTool(tool.id)}
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-accent/10 rounded">
                      <IconComponent className="w-6 h-6 text-accent" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl">{tool.title}</CardTitle>
                    </div>
                  </div>
                  <Badge variant="outline" className="flex-shrink-0">{tool.category}</Badge>
                </div>
                <CardDescription className="text-base">
                  {tool.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {tool.ebpCategories.map(cat => (
                    <Badge key={cat} variant="secondary" className="text-xs">
                      {cat}
                    </Badge>
                  ))}
                </div>
                {isInteractive ? (
                  <div className="bg-accent/5 p-4 border border-accent/20">
                    <p className="text-sm text-foreground font-medium">
                      ✓ Interactive tool ready - Click to open
                    </p>
                  </div>
                ) : (
                  <div className="bg-background p-4 border border-border">
                    <p className="text-sm text-muted-foreground italic">
                      Tool interface coming soon. This will provide structured guidance for implementing {tool.title.toLowerCase()}.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredTools.length === 0 && (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">
            No tools match your search or filter. Try adjusting your criteria.
          </p>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Tool Development Principles</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-muted-foreground">
          <p>All tools in this section follow these design principles:</p>
          <ul className="space-y-2 ml-4">
            <li>• <strong className="text-foreground">Evidence-based:</strong> Grounded in research and aligned with the 28 NCAEP EBPs</li>
            <li>• <strong className="text-foreground">Practical:</strong> Completable in 5-15 minutes with actionable outcomes</li>
            <li>• <strong className="text-foreground">Collaborative:</strong> Designed for team-based reflection, not solo decision-making</li>
            <li>• <strong className="text-foreground">Student-centered:</strong> Prioritize student perspective, wellbeing, and autonomy</li>
            <li>• <strong className="text-foreground">Context-aware:</strong> Acknowledge Irish educational context and constraints</li>
            <li>• <strong className="text-foreground">Comprehensive:</strong> Cover all domains from communication to behavioral support to technology</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
