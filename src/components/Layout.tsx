import { House, BookBookmark, FolderOpen, Scales, Wrench } from '@phosphor-icons/react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface LayoutProps {
  children: React.ReactNode
  activeTab: string
  onTabChange: (tab: string) => void
}

export function Layout({ children, activeTab, onTabChange }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border bg-background">
        <div className="mx-auto max-w-5xl px-6 py-8">
          <h1 className="text-foreground">Autism and Me</h1>
          <p className="mt-2 text-muted-foreground text-sm">
            Evidence Based Practice for Autism Support
          </p>
        </div>
      </header>

      <nav className="border-b border-border bg-background sticky top-0 z-10">
        <div className="mx-auto max-w-5xl px-6">
          <Tabs value={activeTab} onValueChange={onTabChange}>
            <TabsList className="w-full justify-start bg-transparent border-0 p-0 h-auto">
              <TabsTrigger 
                value="home" 
                className="gap-2 data-[state=active]:bg-secondary rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
              >
                <House className="w-4 h-4" />
                <span className="hidden sm:inline">Home</span>
              </TabsTrigger>
              <TabsTrigger 
                value="ebps"
                className="gap-2 data-[state=active]:bg-secondary rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
              >
                <BookBookmark className="w-4 h-4" />
                <span className="hidden sm:inline">EBP Library</span>
              </TabsTrigger>
              <TabsTrigger 
                value="cases"
                className="gap-2 data-[state=active]:bg-secondary rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
              >
                <FolderOpen className="w-4 h-4" />
                <span className="hidden sm:inline">Case Studies</span>
              </TabsTrigger>
              <TabsTrigger 
                value="rights"
                className="gap-2 data-[state=active]:bg-secondary rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
              >
                <Scales className="w-4 h-4" />
                <span className="hidden sm:inline">Rights & Ethics</span>
              </TabsTrigger>
              <TabsTrigger 
                value="tools"
                className="gap-2 data-[state=active]:bg-secondary rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
              >
                <Wrench className="w-4 h-4" />
                <span className="hidden sm:inline">Tools</span>
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
          <p className="text-sm text-muted-foreground">
            This resource supports neuro-affirming practice in schools. All practices are grounded in the UNCRPD Article 24 and educational legislation.
          </p>
        </div>
      </footer>
    </div>
  )
}
