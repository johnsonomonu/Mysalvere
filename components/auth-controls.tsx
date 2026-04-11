"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"

interface AuthUser {
  id: string
  email?: string
}

export function AuthControls() {
  const router = useRouter()
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const supabase = createClient()

    if (!supabase) {
      setUser(null)
      return
    }

    const loadUser = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
    }

    loadUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const handleSignOut = async () => {
    setIsLoading(true)

    try {
      const supabase = createClient()

      if (!supabase) {
        router.push("/")
        return
      }

      await supabase.auth.signOut()
      router.push("/")
      router.refresh()
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="flex items-center gap-3">
        <Button asChild variant="ghost" size="sm" className="rounded-full px-5">
          <Link href="/auth/login">Sign In</Link>
        </Button>
        <Button asChild size="sm" className="rounded-full px-5">
          <Link href="/auth/sign-up">Sign Up</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3">
      <Button asChild variant="ghost" size="sm" className="rounded-full px-5">
        <Link href="/dashboard">Dashboard</Link>
      </Button>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="rounded-full px-5"
        onClick={handleSignOut}
        disabled={isLoading}
      >
        {isLoading ? "Signing out..." : "Sign Out"}
      </Button>
    </div>
  )
}
