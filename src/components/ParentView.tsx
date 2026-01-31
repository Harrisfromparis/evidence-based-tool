import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ParentGuide } from '@/components/ParentGuide'
import { ChildProfileCreator } from '@/components/ChildProfileCreator'
import { ParentTools } from '@/components/ParentTools'
import { ParentEBPReflection } from '@/components/ParentEBPReflection'
import { Heart, BookOpen, Users, Lightbulb } from '@phosphor-icons/react'
import { SectionHeader } from '@/components/SectionHeader'
import brandingImage from '@/assets/images/logo_for_wix_Steffen.png'

export function ParentView() {
  const [activeTab, setActiveTab] = useState('guide')

  return (
    <div className="h-full flex flex-col">
      <div className="relative rounded-xl mb-6 shadow-md border-2 border-border overflow-hidden">
        <img 
          src={brandingImage} 
          alt="" 
          className="w-full h-36 object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-1 handwritten text-white drop-shadow-lg">
              Parent & Caregiver Hub
            </h1>
            <p className="text-sm text-white/90 max-w-2xl leading-relaxed drop-shadow-md">
              Create a profile for your child, explore practical home adaptations, and access family support tools.
            </p>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-4 mb-6">
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
