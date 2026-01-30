interface AnalyticsData {
  toolUsage: { [key: string]: number }
  ebpViews: { [key: string]: number }
  totalSessions: number
  totalUsers: number
  emailsSent: number
  lastUpdated: string
}

export const trackToolUsage = async (toolName: string) => {
  try {
    const analytics = await spark.kv.get<AnalyticsData>('admin-analytics') || {
      toolUsage: {},
      ebpViews: {},
      totalSessions: 0,
      totalUsers: 0,
      emailsSent: 0,
      lastUpdated: new Date().toISOString()
    }

    analytics.toolUsage[toolName] = (analytics.toolUsage[toolName] || 0) + 1
    analytics.lastUpdated = new Date().toISOString()

    await spark.kv.set('admin-analytics', analytics)
  } catch (error) {
    console.error('Failed to track tool usage:', error)
  }
}

export const trackEBPView = async (ebpName: string) => {
  try {
    const analytics = await spark.kv.get<AnalyticsData>('admin-analytics') || {
      toolUsage: {},
      ebpViews: {},
      totalSessions: 0,
      totalUsers: 0,
      emailsSent: 0,
      lastUpdated: new Date().toISOString()
    }

    analytics.ebpViews[ebpName] = (analytics.ebpViews[ebpName] || 0) + 1
    analytics.lastUpdated = new Date().toISOString()

    await spark.kv.set('admin-analytics', analytics)
  } catch (error) {
    console.error('Failed to track EBP view:', error)
  }
}

export const trackEmailSent = async () => {
  try {
    const analytics = await spark.kv.get<AnalyticsData>('admin-analytics') || {
      toolUsage: {},
      ebpViews: {},
      totalSessions: 0,
      totalUsers: 0,
      emailsSent: 0,
      lastUpdated: new Date().toISOString()
    }

    analytics.emailsSent = (analytics.emailsSent || 0) + 1
    analytics.lastUpdated = new Date().toISOString()

    await spark.kv.set('admin-analytics', analytics)
  } catch (error) {
    console.error('Failed to track email sent:', error)
  }
}

export const trackSession = async () => {
  try {
    const analytics = await spark.kv.get<AnalyticsData>('admin-analytics') || {
      toolUsage: {},
      ebpViews: {},
      totalSessions: 0,
      totalUsers: 0,
      emailsSent: 0,
      lastUpdated: new Date().toISOString()
    }

    analytics.totalSessions = (analytics.totalSessions || 0) + 1
    analytics.lastUpdated = new Date().toISOString()

    await spark.kv.set('admin-analytics', analytics)
  } catch (error) {
    console.error('Failed to track session:', error)
  }
}

export const trackUser = async () => {
  try {
    const hasVisited = await spark.kv.get<boolean>('user-has-visited')
    
    if (!hasVisited) {
      const analytics = await spark.kv.get<AnalyticsData>('admin-analytics') || {
        toolUsage: {},
        ebpViews: {},
        totalSessions: 0,
        totalUsers: 0,
        emailsSent: 0,
        lastUpdated: new Date().toISOString()
      }

      analytics.totalUsers = (analytics.totalUsers || 0) + 1
      analytics.lastUpdated = new Date().toISOString()

      await spark.kv.set('admin-analytics', analytics)
      await spark.kv.set('user-has-visited', true)
    }
  } catch (error) {
    console.error('Failed to track user:', error)
  }
}
