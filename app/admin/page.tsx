import { Header } from "@/components/header"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { requireAdmin } from "@/lib/auth/guards"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Dashboard | Salvere",
  description: "View all user assessments and manage the Salvere wellness platform.",
}

export default async function AdminPage() {
  const { user } = await requireAdmin()

  return (
    <main className="min-h-screen bg-[#F5F5F4]">
      <Header />
      <div className="pt-20">
        <AdminDashboard adminEmail={user.email || ""} />
      </div>
    </main>
  )
}
