import type { Metadata } from "next"
import Link from "next/link"
import { FileText, Users, Activity, RadioTower, CreditCard } from "lucide-react"
import { requireAdmin } from "@/lib/auth/guards"
import { getAdminDashboardData } from "@/lib/admin/dashboard-data"
import { AdminStats } from "@/components/admin/admin-stats"

export const metadata: Metadata = {
  title: "Admin Overview | Salvere",
  description: "Operational overview of users, assessments, and platform activity.",
}

export default async function AdminOverviewPage() {
  await requireAdmin()
  const { stats } = await getAdminDashboardData()

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#78716C]">Overview</p>
        <h2 className="mt-2 font-serif text-3xl text-[#1C1917]">System Snapshot</h2>
        <p className="mt-2 text-sm text-[#57534E]">
          Fast operational view before drilling into user and assessment management.
        </p>
      </div>

      <AdminStats
        totalUsers={stats.totalUsers}
        totalAssessments={stats.totalAssessments}
        averageScore={stats.averageScore}
        adminCount={stats.adminCount}
      />

      <div className="grid gap-4 md:grid-cols-5">
        <Link
          href="/admin/users"
          className="rounded-2xl border border-[#E7E5E4] bg-white p-5 shadow-sm transition-colors hover:bg-[#FAFAF9]"
        >
          <Users className="h-5 w-5 text-[#1C1917]" />
          <p className="mt-3 text-sm font-medium text-[#1C1917]">User Management</p>
          <p className="mt-1 text-sm text-[#57534E]">Promote admins, inspect account activity, and monitor user volume.</p>
        </Link>
        <Link
          href="/admin/assessments"
          className="rounded-2xl border border-[#E7E5E4] bg-white p-5 shadow-sm transition-colors hover:bg-[#FAFAF9]"
        >
          <FileText className="h-5 w-5 text-[#1C1917]" />
          <p className="mt-3 text-sm font-medium text-[#1C1917]">Assessment Queue</p>
          <p className="mt-1 text-sm text-[#57534E]">Review submitted assessments and update statuses for team workflows.</p>
        </Link>
        <Link
          href="/admin/operations"
          className="rounded-2xl border border-[#E7E5E4] bg-white p-5 shadow-sm transition-colors hover:bg-[#FAFAF9]"
        >
          <RadioTower className="h-5 w-5 text-[#1C1917]" />
          <p className="mt-3 text-sm font-medium text-[#1C1917]">Operations</p>
          <p className="mt-1 text-sm text-[#57534E]">Inspect webhook outcomes and operational health metrics.</p>
        </Link>
        <Link
          href="/admin/payments"
          className="rounded-2xl border border-[#E7E5E4] bg-white p-5 shadow-sm transition-colors hover:bg-[#FAFAF9]"
        >
          <CreditCard className="h-5 w-5 text-[#1C1917]" />
          <p className="mt-3 text-sm font-medium text-[#1C1917]">Payments</p>
          <p className="mt-1 text-sm text-[#57534E]">Review payment events, amounts, and customer transaction references.</p>
        </Link>
        <div className="rounded-2xl border border-[#E7E5E4] bg-white p-5 shadow-sm">
          <Activity className="h-5 w-5 text-[#1C1917]" />
          <p className="mt-3 text-sm font-medium text-[#1C1917]">Operations Focus</p>
          <p className="mt-1 text-sm text-[#57534E]">Keep this view for day-start checks before handling requests.</p>
        </div>
      </div>
    </div>
  )
}
