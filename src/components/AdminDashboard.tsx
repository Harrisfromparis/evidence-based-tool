import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Lock, ChartBar, Envelope, Eye, EyeSlash } from '@phosphor-icons/react'
import { useKV } from '@github/spark/hooks'
import { toast } from 'sonner'
import brandingImage from '@/assets/images/logo_for_wix_Steffen.png'

interface AnalyticsData {
  toolUsage: { [key: string]: number }
  ebpViews: { [key: string]: number }
  totalSessions: number
  totalUsers: number
  emailsSent: number
  lastUpdated: string
}

interface Props {
  onBack: () => void
}

export function AdminDashboard({ onBack }: Props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [analytics, setAnalytics] = useKV<AnalyticsData>('admin-analytics', {
    toolUsage: {},
    ebpViews: {},
    totalSessions: 0,
    totalUsers: 0,
    emailsSent: 0,
    lastUpdated: new Date().toISOString()
  })

  const correctPassword = 'autismandme2024'

  const handleLogin = () => {
    if (password === correctPassword) {
      setIsAuthenticated(true)
      toast.success('Access granted')
    } else {
      toast.error('Incorrect password')
      setPassword('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin()
    }
  }

  const resetAnalytics = () => {
    if (window.confirm('Are you sure you want to reset all analytics data? This cannot be undone.')) {
      setAnalytics({
        toolUsage: {},
        ebpViews: {},
        totalSessions: 0,
        totalUsers: 0,
        emailsSent: 0,
        lastUpdated: new Date().toISOString()
      })
      toast.success('Analytics reset successfully')
    }
  }

  const sortedTools = Object.entries(analytics?.toolUsage || {}).sort((a, b) => b[1] - a[1])
  const sortedEBPs = Object.entries(analytics?.ebpViews || {}).sort((a, b) => b[1] - a[1])

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-3">
            <div className="flex justify-center">
              <div className="rounded-full bg-primary/10 p-4">
                <Lock className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-center text-2xl">Admin Dashboard</CardTitle>
            <CardDescription className="text-center">
              Enter the admin password to access analytics and system management
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="admin-password">Password</Label>
              <div className="relative">
                <Input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter admin password"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeSlash className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
            <div className="flex gap-3">
              <Button onClick={onBack} variant="outline" className="flex-1">
                Back
              </Button>
              <Button onClick={handleLogin} className="flex-1">
                Access Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="relative rounded-xl overflow-hidden shadow-lg border-2 border-border mb-8">
        <img 
          src={brandingImage} 
          alt="" 
          className="w-full h-32 object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center justify-between px-8">
          <div>
            <h1 className="text-3xl font-bold text-white drop-shadow-lg mb-1">Admin Dashboard</h1>
            <p className="text-white/90 drop-shadow-md">
              Monitor usage analytics and system activity
            </p>
          </div>
          <Button onClick={onBack} variant="outline" className="bg-white">
            Exit Dashboard
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tools">Tool Usage</TabsTrigger>
          <TabsTrigger value="ebps">EBP Views</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Total Sessions</CardDescription>
                <CardTitle className="text-4xl">{analytics?.totalSessions || 0}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Total Users</CardDescription>
                <CardTitle className="text-4xl">{analytics?.totalUsers || 0}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Emails Sent</CardDescription>
                <CardTitle className="text-4xl">{analytics?.emailsSent || 0}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Tool Interactions</CardDescription>
                <CardTitle className="text-4xl">
                  {Object.values(analytics?.toolUsage || {}).reduce((sum, count) => sum + count, 0)}
                </CardTitle>
              </CardHeader>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Top 5 Most Used Tools</CardTitle>
              <CardDescription>
                Tools ranked by number of interactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {sortedTools.slice(0, 5).map(([tool, count], index) => (
                  <div key={tool} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" className="w-8 h-8 rounded-full flex items-center justify-center">
                        {index + 1}
                      </Badge>
                      <span className="font-medium">{tool}</span>
                    </div>
                    <Badge>{count} uses</Badge>
                  </div>
                ))}
                {sortedTools.length === 0 && (
                  <p className="text-muted-foreground text-center py-8">No tool usage data yet</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top 5 Most Viewed EBPs</CardTitle>
              <CardDescription>
                Evidence-based practices ranked by views
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {sortedEBPs.slice(0, 5).map(([ebp, count], index) => (
                  <div key={ebp} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" className="w-8 h-8 rounded-full flex items-center justify-center">
                        {index + 1}
                      </Badge>
                      <span className="font-medium">{ebp}</span>
                    </div>
                    <Badge>{count} views</Badge>
                  </div>
                ))}
                {sortedEBPs.length === 0 && (
                  <p className="text-muted-foreground text-center py-8">No EBP view data yet</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Updated</span>
                <span className="font-medium">
                  {new Date(analytics?.lastUpdated || new Date()).toLocaleString('en-GB')}
                </span>
              </div>
              <div className="pt-4">
                <Button onClick={resetAnalytics} variant="destructive" className="w-full">
                  Reset All Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tools" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>All Tool Usage</CardTitle>
              <CardDescription>
                Complete breakdown of tool interactions across the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              {sortedTools.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px]">Rank</TableHead>
                      <TableHead>Tool Name</TableHead>
                      <TableHead className="text-right">Usage Count</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedTools.map(([tool, count], index) => (
                      <TableRow key={tool}>
                        <TableCell>
                          <Badge variant="secondary" className="w-8 h-8 rounded-full flex items-center justify-center">
                            {index + 1}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">{tool}</TableCell>
                        <TableCell className="text-right">{count}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-12">
                  <ChartBar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No tool usage data recorded yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ebps" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>All EBP Views</CardTitle>
              <CardDescription>
                Complete breakdown of evidence-based practice views
              </CardDescription>
            </CardHeader>
            <CardContent>
              {sortedEBPs.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px]">Rank</TableHead>
                      <TableHead>EBP Name</TableHead>
                      <TableHead className="text-right">View Count</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedEBPs.map(([ebp, count], index) => (
                      <TableRow key={ebp}>
                        <TableCell>
                          <Badge variant="secondary" className="w-8 h-8 rounded-full flex items-center justify-center">
                            {index + 1}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">{ebp}</TableCell>
                        <TableCell className="text-right">{count}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-12">
                  <ChartBar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No EBP view data recorded yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
