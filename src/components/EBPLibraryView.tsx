import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { MagnifyingGlass, BookmarkSimple, ArrowLeft } from '@phosphor-icons/react'
import { ebps } from '@/lib/data'
import type { EBP } from '@/lib/types'
import { NarrationControls } from '@/components/NarrationControls'

export function EBPLibraryView() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedEBP, setSelectedEBP] = useState<EBP | null>(null)
  const [bookmarkedEBPs, setBookmarkedEBPs] = useKV<string[]>('bookmarked-ebps', [])

  const filteredEBPs = ebps.filter(ebp => {
    const query = searchQuery.toLowerCase()
    return (
      ebp.title.toLowerCase().includes(query) ||
      ebp.description.toLowerCase().includes(query) ||
      ebp.category.toLowerCase().includes(query)
    )
  })

  const toggleBookmark = (id: string) => {
    setBookmarkedEBPs((current) => {
      const currentList = current || []
      if (currentList.includes(id)) {
        return currentList.filter(ebpId => ebpId !== id)
      }
      return [...currentList, id]
    })
  }

  const isBookmarked = (id: string) => (bookmarkedEBPs || []).includes(id)

  if (selectedEBP) {
    const overviewText = `${selectedEBP.title}. ${selectedEBP.description}. What It Is: ${selectedEBP.overview}. When to Use: ${selectedEBP.whenToUse}`
    const quickStartText = `Quick Start Steps for ${selectedEBP.title}. ${selectedEBP.quickStart.map((step, i) => `Step ${i + 1}: ${step}`).join('. ')}`
    const examplesText = `Irish Classroom Examples for ${selectedEBP.title}. ${selectedEBP.irishExamples.join('. ')}`
    const ethicsText = `Ethical Considerations for ${selectedEBP.title}. ${selectedEBP.ethicalConsiderations.join('. ')}`

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button 
            variant="outline" 
            onClick={() => setSelectedEBP(null)}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Library
          </Button>
          <Button
            variant={isBookmarked(selectedEBP.id) ? 'default' : 'outline'}
            onClick={() => toggleBookmark(selectedEBP.id)}
            className="gap-2"
          >
            <BookmarkSimple className="w-4 h-4" weight={isBookmarked(selectedEBP.id) ? 'fill' : 'regular'} />
            {isBookmarked(selectedEBP.id) ? 'Bookmarked' : 'Bookmark'}
          </Button>
        </div>

        <div>
          <Badge className="mb-3">{selectedEBP.category}</Badge>
          <div className="flex items-start justify-between mb-2">
            <h2 className="text-foreground">{selectedEBP.title}</h2>
          </div>
          <p className="text-lg text-muted-foreground">{selectedEBP.description}</p>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="quick-start">Quick Start</TabsTrigger>
            <TabsTrigger value="examples">Irish Examples</TabsTrigger>
            <TabsTrigger value="ethics">Ethics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 mt-6">
            <div className="flex items-start justify-between mb-4">
              <h3>Overview</h3>
              <NarrationControls text={overviewText} variant="minimal" />
            </div>
            <div>
              <h3 className="mb-3">What It Is</h3>
              <p className="text-muted-foreground leading-relaxed">{selectedEBP.overview}</p>
            </div>
            <div>
              <h3 className="mb-3">When to Use</h3>
              <p className="text-muted-foreground leading-relaxed">{selectedEBP.whenToUse}</p>
            </div>
          </TabsContent>

          <TabsContent value="quick-start" className="space-y-4 mt-6">
            <div className="flex items-start justify-between mb-4">
              <h3>Quick Start Steps</h3>
              <NarrationControls text={quickStartText} variant="minimal" />
            </div>
            <ol className="space-y-3">
              {selectedEBP.quickStart.map((step, index) => (
                <li key={index} className="flex gap-4">
                  <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded bg-accent text-accent-foreground font-semibold">
                    {index + 1}
                  </span>
                  <p className="text-muted-foreground leading-relaxed pt-1">{step}</p>
                </li>
              ))}
            </ol>
          </TabsContent>

          <TabsContent value="examples" className="space-y-4 mt-6">
            <div className="flex items-start justify-between mb-4">
              <h3>Irish Classroom Examples</h3>
              <NarrationControls text={examplesText} variant="minimal" />
            </div>
            <div className="space-y-4">
              {selectedEBP.irishExamples.map((example, index) => (
                <Card key={index} className="border-l-4 border-l-accent">
                  <CardContent className="pt-6">
                    <p className="text-muted-foreground leading-relaxed">{example}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="ethics" className="space-y-4 mt-6">
            <div className="flex items-start justify-between mb-4">
              <h3>Ethical Considerations</h3>
              <NarrationControls text={ethicsText} variant="minimal" />
            </div>
            <div className="bg-muted p-6 border border-border">
              <ul className="space-y-3">
                {selectedEBP.ethicalConsiderations.map((consideration, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="text-accent mt-1">•</span>
                    <p className="text-muted-foreground leading-relaxed">{consideration}</p>
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-foreground mb-2">Evidence-Based Practices</h2>
        <p className="text-muted-foreground">
          Browse {ebps.length} evidence-based practices with practical guidance for Irish classrooms.
        </p>
      </div>

      <div className="relative">
        <MagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          id="ebp-search"
          type="text"
          placeholder="Search by title, description, or category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {filteredEBPs.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">
            No practices match your search. Try broadening your search terms or browse all practices.
          </p>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredEBPs.map((ebp) => (
            <Card 
              key={ebp.id}
              className="cursor-pointer transition-colors hover:bg-secondary border-2"
              onClick={() => setSelectedEBP(ebp)}
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <CardTitle className="text-xl">{ebp.title}</CardTitle>
                      <Badge variant="outline">{ebp.category}</Badge>
                    </div>
                    <CardDescription className="text-base">
                      {ebp.description}
                    </CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleBookmark(ebp.id)
                    }}
                    className="flex-shrink-0"
                  >
                    <BookmarkSimple 
                      className="w-5 h-5" 
                      weight={isBookmarked(ebp.id) ? 'fill' : 'regular'}
                    />
                  </Button>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
