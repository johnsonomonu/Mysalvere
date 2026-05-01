"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"

interface HeaderUser {
  id: string
}

interface HeaderAccountLinkProps {
  isScrolled?: boolean
}

export function HeaderAccountLink({ isScrolled }: HeaderAccountLinkProps) {
  const [user, setUser] = useState<HeaderUser | null>(null)

  useEffect(() => {
    const supabase = createClient()
    let isMounted = true

    if (!supabase) {
      setUser(null)
      return
    }

    const loadUser = async () => {
      try {
        const { data } = await supabase.auth.getSession()
        if (isMounted) {
          setUser(data.session?.user ?? null)
        }
      } catch {
        if (isMounted) {
          setUser(null)
        }
      }
    }

    void loadUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (isMounted) {
        setUser(session?.user ?? null)
      }
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [])

  return (
    <Button 
      asChild 
      variant="outline" 
      size="sm" 
      className={`rounded-full px-5 transition-colors ${
        isScrolled 
          ? "border-white/20 text-[var(--soft-white)] hover:bg-white hover:text-[var(--charcoal)]" 
          : "border-[var(--charcoal)]/20 text-[var(--charcoal)] hover:bg-[var(--charcoal)] hover:text-white"
      }`}
    >
      <Link href={user ? "/dashboard" : "/auth/login"}>
        {user ? "Account" : "Sign in"}
      </Link>
    </Button>
  )
}
