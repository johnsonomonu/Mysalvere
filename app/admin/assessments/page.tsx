import type { Metadata } from "next"
import { requireAdmin } from "@/lib/auth/guards"
import { getAdminDashboardData } from "@/lib/admin/dashboard-data"
import { AssessmentsTable } from "@/components/admin/assessments-table"

export const metadata: Metadata = {
  title: "Admin Assessments | Salvere",
  description: "Review and manage user assessments across the platform.",
}

export default async function AdminAssessmentsPage() {
  await requireAdmin()
  const { adminAssessments } = await getAdminDashboardData()

  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#78716C]">Assessments</p>
        <h2 className="mt-2 font-serif text-3xl text-[#1C1917]">Assessment Review Queue</h2>
        <p className="mt-2 text-sm text-[#57534E]">
          Review cross-user assessments and update their workflow status.
        </p>
      </div>
      <AssessmentsTable assessments={adminAssessments} />
    </div>
  )
}
