import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

interface ApiAuthenticatedUser {
  id: string
  email?: string
}

interface ApiAuthSuccess {
  ok: true
  user: ApiAuthenticatedUser
}

interface ApiAuthFailure {
  ok: false
  response: NextResponse
}

type ApiAuthResult = ApiAuthSuccess | ApiAuthFailure

export async function requireApiUser(): Promise<ApiAuthResult> {
  const supabase = await createClient()

  if (!supabase) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "Authentication is not configured for this environment." },
        { status: 500 }
      ),
    }
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return {
      ok: false,
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    }
  }

  return {
    ok: true,
    user: {
      id: user.id,
      email: user.email,
    },
  }
}

export async function requireApiAdmin(): Promise<ApiAuthResult> {
  const userResult = await requireApiUser()

  if (!userResult.ok) {
    return userResult
  }

  const supabase = await createClient()

  if (!supabase) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "Authentication is not configured for this environment." },
        { status: 500 }
      ),
    }
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userResult.user.id)
    .single()

  if (profileError || profile?.role !== "ADMIN") {
    return {
      ok: false,
      response: NextResponse.json({ error: "Forbidden" }, { status: 403 }),
    }
  }

  return userResult
}
