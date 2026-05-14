import { requireUser } from "@/lib/auth/guards"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { createClient } from "@/lib/supabase/server"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await requireUser("/auth/login?redirect=/dashboard")
  const supabase = await createClient()

  let isAdmin = false

  if (supabase) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single()

    const normalizedRole = profile?.role?.trim()?.toUpperCase()
    isAdmin = normalizedRole === "ADMIN"
  }

  return <DashboardShell isAdmin={isAdmin}>{children}</DashboardShell>
}
