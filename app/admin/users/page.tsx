import type { Metadata } from "next"
import { requireAdmin } from "@/lib/auth/guards"
import { getAdminDashboardData } from "@/lib/admin/dashboard-data"
import { UsersTable } from "@/components/admin/users-table"

export const metadata: Metadata = {
  title: "Admin Users | Salvere",
  description: "Manage user accounts and role assignments.",
}

export default async function AdminUsersPage() {
  const { user } = await requireAdmin()
  const { adminUsers } = await getAdminDashboardData()

  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#78716C]">Users</p>
        <h2 className="mt-2 font-serif text-3xl text-[#1C1917]">Account and Role Management</h2>
        <p className="mt-2 text-sm text-[#57534E]">
          Search users, inspect activity, and promote or demote admin access.
        </p>
      </div>
      <UsersTable currentAdminId={user.id} users={adminUsers} />
    </div>
  )
}
