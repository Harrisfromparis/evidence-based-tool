// src/components/auth/UserMenu.tsx
import { useEffect, useState } from 'react'

type SparkUser = {
  avatarUrl: string
  email: string
  id: string
  isOwner: boolean
  login: string
}

export function UserMenu() {
  const [user, setUser] = useState<SparkUser | null>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    let mounted = true

    const loadUser = async () => {
      try {
        const currentUser = await spark.user()
        if (mounted) setUser(currentUser)
      } catch {
        if (mounted) setUser(null)
      }
    }

    loadUser()

    return () => {
      mounted = false
    }
  }, [])

  if (!user) return null

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 rounded-xl border border-border bg-white/70 px-3 py-2 backdrop-blur-md transition hover:bg-white dark:bg-white/5 dark:hover:bg-white/10"
      >
        <img
          src={user.avatarUrl}
          alt={user.login}
          className="h-9 w-9 rounded-full object-cover"
        />

        <div className="hidden text-left md:block">
          <p className="text-sm font-medium leading-none">{user.login}</p>
          <p className="text-xs text-muted-foreground">{user.email}</p>
        </div>
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-56 rounded-2xl border border-border bg-white/90 p-3 shadow-soft backdrop-blur-xl dark:bg-white/5">
          <div className="mb-3 border-b border-border pb-3">
            <p className="text-sm font-medium">{user.login}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>

          {user.isOwner && (
            <div className="mb-2 rounded-lg bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
              Owner account
            </div>
          )}

          <button
            className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-muted"
            onClick={() => window.location.reload()}
          >
            Refresh session
          </button>
        </div>
      )}
    </div>
  )
}
