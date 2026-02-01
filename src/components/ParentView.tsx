import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ParentGuide } from '@/components/ParentGuide'
import { ChildProfileCreator } from '@/components/ChildProfileCreator'
import { ParentTools } from '@/components/ParentTools'
import { ParentEBPReflection } from '@/components/ParentEBPReflection'
import { ParentTechnologyGuide } from '@/components/ParentTechnologyGuide'
import { Heart, BookOpen, Users, Lightbulb, Desktop } from '@phosphor-icons/react'
import { SectionHeader } from '@/components/SectionHeader'

export function ParentView() {
  const [activeTab, setActiveTab] = useState('guide')
  const [showTechGuide, setShowTechGuide] = useState(false)

  if (showTechGuide) {
    return <ParentTechnologyGuide onBack={() => setShowTechGuide(false)} />
  }

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2 handwritten text-foreground">
          Parent & Caregiver Hub
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          Create a profile for your child, explore practical home adaptations, and access family support tools.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-5 mb-6">
          <TabsTrigger value="guide" className="gap-2 rounded-xl">
            <BookOpen size={20} />
            Home Guide
          </TabsTrigger>
          <TabsTrigger value="profile" className="gap-2 rounded-xl">
            <Heart size={20} />
            Child Profile
          </TabsTrigger>
          <TabsTrigger value="ebp-reflection" className="gap-2 rounded-xl">
            <Lightbulb size={20} />
            What Works
          </TabsTrigger>
          <TabsTrigger value="tools" className="gap-2 rounded-xl">
            <Users size={20} />
            Parent Tools
          </TabsTrigger>
          <TabsTrigger value="tech" className="gap-2 rounded-xl" onClick={() => setShowTechGuide(true)}>
            <Desktop size={20} />
            Tech Guide
          </TabsTrigger>
        </TabsList>

        <TabsContent value="guide" className="flex-1">
          <ParentGuide />
        </TabsContent>

        <TabsContent value="profile" className="flex-1">
          <ChildProfileCreator />
        </TabsContent>

        <TabsContent value="ebp-reflection" className="flex-1">
          <ParentEBPReflection />
        </TabsContent>

        <TabsContent value="tools" className="flex-1">
          <ParentTools />
        </TabsContent>
      </Tabs>
    </div>
  )
}
