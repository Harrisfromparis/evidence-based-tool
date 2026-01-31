import { useState, useEffect } from 'react'
import { Layout } from '@/components/Layout'
import { HomeView } from '@/components/HomeView'
import { EBPLibraryView } from '@/components/EBPLibraryView'
import { CaseStudiesView } from '@/components/CaseStudiesView'
import { RightsEthicsView } from '@/components/RightsEthicsView'
import { ToolsView } from '@/components/ToolsView'
import { SavedPlansManager } from '@/components/SavedPlansManager'
import { AdminDashboard } from '@/components/AdminDashboard'
import { Toaster } from '@/components/ui/sonner'
import { trackSession, trackUser } from '@/lib/analytics'

function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [selectedEBPId, setSelectedEBPId] = useState<string | undefined>(undefined)

  useEffect(() => {
    trackSession()
    trackUser()
  }, [])

  const navigateToEBP = (ebpId: string) => {
    setSelectedEBPId(ebpId)
    setActiveTab('ebps')
  }

  const renderView = () => {
    switch (activeTab) {
      case 'home':
        return <HomeView onNavigate={setActiveTab} />
      case 'ebps':
        return <EBPLibraryView initialEBPId={selectedEBPId} />
      case 'cases':
        return <CaseStudiesView />
      case 'rights':
        return <RightsEthicsView />
      case 'tools':
        return <ToolsView onNavigateToEBP={navigateToEBP} />
      case 'saved-plans':
        return <SavedPlansManager onBack={() => setActiveTab('tools')} />
      case 'admin':
        return <AdminDashboard onBack={() => setActiveTab('home')} />
      default:
        return <HomeView onNavigate={setActiveTab} />
    }
  }

  return (
    <>
      {activeTab === 'admin' ? (
        renderView()
      ) : (
        <Layout activeTab={activeTab} onTabChange={setActiveTab}>
          {renderView()}
        </Layout>
      )}
      <Toaster />
    </>
  )
}

export default App