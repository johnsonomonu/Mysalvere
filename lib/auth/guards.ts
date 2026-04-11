import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

interface AuthenticatedUser {
  id: string
  email?: string
}

interface UserWithRole {
  user: AuthenticatedUser
  role: string | null
}

export async function requireUser(redirectTo = "/auth/login"): Promise<AuthenticatedUser> {
  const supabase = await createClient()

  if (!supabase) {
    redirect("/auth/error?message=Authentication%20is%20not%20configured%20for%20this%20environment.")
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect(redirectTo)
  }

  return user
}

export async function requireAdmin(): Promise<UserWithRole> {
  const supabase = await createClient()

  if (!supabase) {
    redirect("/auth/error?message=Authentication%20is%20not%20configured%20for%20this%20environment.")
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login?redirect=/admin")
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  const role = profile?.role ?? null

  if (role !== "ADMIN") {
    redirect("/dashboard")
  }

  return { user, role }
}
