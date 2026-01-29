import { useState } from 'react'
import { Layout } from '@/components/Layout'
import { HomeView } from '@/components/HomeView'
import { EBPLibraryView } from '@/components/EBPLibraryView'
import { CaseStudiesView } from '@/components/CaseStudiesView'
import { RightsEthicsView } from '@/components/RightsEthicsView'
import { ToolsView } from '@/components/ToolsView'
import { SavedPlansManager } from '@/components/SavedPlansManager'
import { Toaster } from '@/components/ui/sonner'

function App() {
  const [activeTab, setActiveTab] = useState('home')

  const renderView = () => {
    switch (activeTab) {
      case 'home':
        return <HomeView onNavigate={setActiveTab} />
      case 'ebps':
        return <EBPLibraryView />
      case 'cases':
        return <CaseStudiesView />
      case 'rights':
        return <RightsEthicsView />
      case 'tools':
        return <ToolsView />
      case 'saved-plans':
        return <SavedPlansManager onBack={() => setActiveTab('tools')} />
      default:
        return <HomeView onNavigate={setActiveTab} />
    }
  }

  return (
    <>
      <Layout activeTab={activeTab} onTabChange={setActiveTab}>
        {renderView()}
      </Layout>
      <Toaster />
    </>
  )
}

export default App