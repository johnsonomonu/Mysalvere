import { Header } from "@/components/header"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Dashboard | Salvere",
  description: "View all user assessments and manage the Salvere wellness platform.",
}

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-[#F5F5F4]">
      <Header />
      <div className="pt-20">
        <AdminDashboard />
      </div>
    </main>
  )
}
