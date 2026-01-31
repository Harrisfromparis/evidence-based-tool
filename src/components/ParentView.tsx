import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ParentGuide } from '@/components/ParentGuide'
import { ChildProfileCreator } from '@/components/ChildProfileCreator'
import { ParentTools } from '@/components/ParentTools'
import { Heart, BookOpen, Users } from '@phosphor-icons/react'

export function ParentView() {
  const [activeTab, setActiveTab] = useState('guide')

  return (
    <div className="h-full flex flex-col">
      <div className="bg-gradient-to-br from-soft-green to-soft-orange p-8 rounded-xl mb-6 shadow-sm border-2 border-border">
        <h1 className="text-3xl font-bold mb-3 handwritten text-foreground">
          Parent & Caregiver Hub
        </h1>
        <p className="text-base text-foreground/80 max-w-3xl leading-relaxed">
          Welcome! This space is designed to help you understand and use evidence-based practices at home. 
          Create a profile for your child, explore practical home adaptations of the 28 EBPs, and access tools 
          to support your family's journey.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="guide" className="gap-2">
            <BookOpen size={20} />
            Home Guide
          </TabsTrigger>
          <TabsTrigger value="profile" className="gap-2">
            <Heart size={20} />
            Child Profile
          </TabsTrigger>
          <TabsTrigger value="tools" className="gap-2">
            <Users size={20} />
            Parent Tools
          </TabsTrigger>
        </TabsList>

        <TabsContent value="guide" className="flex-1">
          <ParentGuide />
        </TabsContent>

        <TabsContent value="profile" className="flex-1">
          <ChildProfileCreator />
        </TabsContent>

        <TabsContent value="tools" className="flex-1">
          <ParentTools />
        </TabsContent>
      </Tabs>
    </div>
  )
}
