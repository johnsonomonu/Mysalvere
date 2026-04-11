import { DashboardContent } from "@/components/dashboard/dashboard-content"
import { createClient } from "@/lib/supabase/server"
import { requireUser } from "@/lib/auth/guards"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "SalvereTracker - Dashboard | Salvere",
  description: "Track your wellness progress, view your assessment results, and monitor your health journey.",
}

export default async function DashboardPage() {
  const user = await requireUser("/auth/login?redirect=/dashboard")
  const supabase = await createClient()

  let fullName: string | null = null

  if (supabase) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name")
      .eq("id", user.id)
      .single()

    fullName = profile?.full_name ?? null
  }

  return (
    <DashboardContent
      user={{
        name: fullName || user.email?.split("@")[0] || "there",
        email: user.email || "",
      }}
    />
  )
}
