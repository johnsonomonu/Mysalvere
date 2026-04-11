import { requireUser } from "@/lib/auth/guards"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await requireUser("/auth/login?redirect=/dashboard")

  return <DashboardShell>{children}</DashboardShell>
}
