import { House, BookBookmark, FolderOpen, Scales, Wrench, FloppyDisk, Users } from '@phosphor-icons/react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { NarrationSettings } from '@/components/NarrationSettings'

interface LayoutProps {
  children: React.ReactNode
  activeTab: string
  onTabChange: (tab: string) => void
}

export function Layout({ children, activeTab, onTabChange }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="relative">
        <div className="absolute inset-0 bg-primary py-4 px-6 opacity-20 -z-10">
          <div className="mx-auto max-w-5xl">
            <h1 className="text-primary text-2xl font-bold text-center handwritten">
              Autism and Me Ltd
            </h1>
          </div>
        </div>

        <header className="border-b border-border bg-white/80 backdrop-blur-sm py-4 px-6 relative z-10">
          <div className="mx-auto max-w-5xl flex justify-end">
            <NarrationSettings />
          </div>
        </header>
      </div>

      <nav className="border-b border-border bg-white sticky top-0 z-10">
        <div className="mx-auto max-w-5xl px-6">
          <Tabs value={activeTab} onValueChange={onTabChange}>
            <TabsList className="w-full justify-start bg-transparent border-0 p-0 h-auto overflow-x-auto">
              <TabsTrigger 
                value="home" 
                className="gap-2 data-[state=active]:bg-accent/10 data-[state=active]:text-accent rounded-t-lg border-b-2 border-transparent data-[state=active]:border-accent"
              >
                <House className="w-4 h-4" />
                <span className="hidden sm:inline">Home</span>
              </TabsTrigger>
              <TabsTrigger 
                value="ebps"
                className="gap-2 data-[state=active]:bg-accent/10 data-[state=active]:text-accent rounded-t-lg border-b-2 border-transparent data-[state=active]:border-accent"
              >
                <BookBookmark className="w-4 h-4" />
                <span className="hidden sm:inline">EBP Library</span>
              </TabsTrigger>
              <TabsTrigger 
                value="cases"
                className="gap-2 data-[state=active]:bg-accent/10 data-[state=active]:text-accent rounded-t-lg border-b-2 border-transparent data-[state=active]:border-accent"
              >
                <FolderOpen className="w-4 h-4" />
                <span className="hidden sm:inline">Case Studies</span>
              </TabsTrigger>
              <TabsTrigger 
                value="rights"
                className="gap-2 data-[state=active]:bg-accent/10 data-[state=active]:text-accent rounded-t-lg border-b-2 border-transparent data-[state=active]:border-accent"
              >
                <Scales className="w-4 h-4" />
                <span className="hidden sm:inline">Rights & Ethics</span>
              </TabsTrigger>
              <TabsTrigger 
                value="tools"
                className="gap-2 data-[state=active]:bg-accent/10 data-[state=active]:text-accent rounded-t-lg border-b-2 border-transparent data-[state=active]:border-accent"
              >
                <Wrench className="w-4 h-4" />
                <span className="hidden sm:inline">Tools</span>
              </TabsTrigger>
              <TabsTrigger 
                value="parents"
                className="gap-2 data-[state=active]:bg-accent/10 data-[state=active]:text-accent rounded-t-lg border-b-2 border-transparent data-[state=active]:border-accent"
              >
                <Users className="w-4 h-4" />
                <span className="hidden sm:inline">Parents</span>
              </TabsTrigger>
              <TabsTrigger 
                value="saved-plans"
                className="gap-2 data-[state=active]:bg-accent/10 data-[state=active]:text-accent rounded-t-lg border-b-2 border-transparent data-[state=active]:border-accent"
              >
                <FloppyDisk className="w-4 h-4" />
                <span className="hidden sm:inline">Saved Plans</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </nav>

      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-6 py-12">
          {children}
        </div>
      </main>

      <footer className="border-t border-border bg-background mt-auto">
        <div className="mx-auto max-w-5xl px-6 py-8">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              This resource supports neuro-affirming practice in schools. All practices are grounded in the UNCRPD Article 24 and educational legislation.
            </p>
            <button
              onClick={() => onTabChange('admin')}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors opacity-50 hover:opacity-100"
            >
              Admin
            </button>
          </div>
          <div className="mt-4 text-center">
            <p className="text-xs text-muted-foreground">
              © 2024 www.autismandme.ie Ltd. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
