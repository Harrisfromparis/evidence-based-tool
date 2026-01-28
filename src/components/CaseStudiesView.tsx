import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { BookmarkSimple, ArrowLeft } from '@phosphor-icons/react'
import { caseStudies } from '@/lib/data'
import type { CaseStudy } from '@/lib/types'

export function CaseStudiesView() {
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null)
  const [ageFilter, setAgeFilter] = useState<string>('all')
  const [settingFilter, setSettingFilter] = useState<string>('all')
  const [themeFilter, setThemeFilter] = useState<string>('all')
  const [bookmarkedCases, setBookmarkedCases] = useKV<string[]>('bookmarked-cases', [])

  const filteredCases = caseStudies.filter(cs => {
    if (ageFilter !== 'all' && !cs.ageGroup.includes(ageFilter)) return false
    if (settingFilter !== 'all' && !cs.setting.toLowerCase().includes(settingFilter.toLowerCase())) return false
    if (themeFilter !== 'all' && cs.theme !== themeFilter) return false
    return true
  })

  const toggleBookmark = (id: string) => {
    setBookmarkedCases((current) => {
      const currentList = current || []
      if (currentList.includes(id)) {
        return currentList.filter(caseId => caseId !== id)
      }
      return [...currentList, id]
    })
  }

  const isBookmarked = (id: string) => (bookmarkedCases || []).includes(id)

  const clearFilters = () => {
    setAgeFilter('all')
    setSettingFilter('all')
    setThemeFilter('all')
  }

  if (selectedCase) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button 
            variant="outline" 
            onClick={() => setSelectedCase(null)}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Case Studies
          </Button>
          <Button
            variant={isBookmarked(selectedCase.id) ? 'default' : 'outline'}
            onClick={() => toggleBookmark(selectedCase.id)}
            className="gap-2"
          >
            <BookmarkSimple className="w-5 h-5" weight={isBookmarked(selectedCase.id) ? 'fill' : 'regular'} />
            {isBookmarked(selectedCase.id) ? 'Bookmarked' : 'Bookmark'}
          </Button>
        </div>

        <div>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge>{selectedCase.ageGroup}</Badge>
            <Badge variant="outline">{selectedCase.theme}</Badge>
          </div>
          <h2 className="text-foreground mb-3">{selectedCase.title}</h2>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Setting & Challenge</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-foreground mb-1">Setting</p>
                <p className="text-muted-foreground">{selectedCase.setting}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground mb-1">Challenge</p>
                <p className="text-muted-foreground">{selectedCase.challenge}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Context</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{selectedCase.context}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Approach</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{selectedCase.approach}</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-accent">
            <CardHeader>
              <CardTitle>Evidence-Based Practices Used</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {selectedCase.ebpsUsed.map((ebp) => (
                  <Badge key={ebp} className="bg-accent text-accent-foreground">
                    {ebp}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-muted">
            <CardHeader>
              <CardTitle>Outcome</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{selectedCase.outcome}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-foreground mb-2">Case Studies</h2>
        <p className="text-muted-foreground">
          Real-world examples from Irish schools showing how evidence-based practices are implemented.
        </p>
      </div>

      <Card className="bg-muted">
        <CardHeader>
          <CardTitle className="text-lg">Filter Case Studies</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label htmlFor="age-filter" className="text-sm font-semibold text-foreground mb-2 block">
                Age Group
              </label>
              <Select value={ageFilter} onValueChange={setAgeFilter}>
                <SelectTrigger id="age-filter">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ages</SelectItem>
                  <SelectItem value="6">6-8 years</SelectItem>
                  <SelectItem value="8">8-12 years</SelectItem>
                  <SelectItem value="12">12+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="setting-filter" className="text-sm font-semibold text-foreground mb-2 block">
                Setting
              </label>
              <Select value={settingFilter} onValueChange={setSettingFilter}>
                <SelectTrigger id="setting-filter">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Settings</SelectItem>
                  <SelectItem value="primary">Primary</SelectItem>
                  <SelectItem value="secondary">Secondary</SelectItem>
                  <SelectItem value="ASD">ASD Unit</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="theme-filter" className="text-sm font-semibold text-foreground mb-2 block">
                Theme
              </label>
              <Select value={themeFilter} onValueChange={setThemeFilter}>
                <SelectTrigger id="theme-filter">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Themes</SelectItem>
                  <SelectItem value="Communication">Communication</SelectItem>
                  <SelectItem value="Transitions">Transitions</SelectItem>
                  <SelectItem value="Self-Regulation">Self-Regulation</SelectItem>
                  <SelectItem value="Inclusion">Inclusion</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {(ageFilter !== 'all' || settingFilter !== 'all' || themeFilter !== 'all') && (
            <Button variant="outline" onClick={clearFilters} size="sm">
              Clear All Filters
            </Button>
          )}
        </CardContent>
      </Card>

      {filteredCases.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground mb-4">
            No case studies match your current filters.
          </p>
          <Button variant="outline" onClick={clearFilters}>
            Clear Filters
          </Button>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredCases.map((cs) => (
            <Card 
              key={cs.id}
              className="cursor-pointer transition-colors hover:bg-secondary border-2"
              onClick={() => setSelectedCase(cs)}
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-wrap gap-2">
                      <Badge>{cs.ageGroup}</Badge>
                      <Badge variant="outline">{cs.theme}</Badge>
                    </div>
                    <CardTitle className="text-xl">{cs.title}</CardTitle>
                    <CardDescription className="text-base">
                      <span className="font-semibold">Challenge:</span> {cs.challenge}
                    </CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleBookmark(cs.id)
                    }}
                    className="flex-shrink-0"
                  >
                    <BookmarkSimple 
                      className="w-5 h-5" 
                      weight={isBookmarked(cs.id) ? 'fill' : 'regular'}
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
