import { Header } from "@/components/header"
import { DashboardContent } from "@/components/dashboard/dashboard-content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "SalvereTracker - Dashboard | Salvere",
  description: "Track your wellness progress, view your assessment results, and monitor your health journey.",
}

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#F5F5F4]">
      <Header />
      <div className="pt-20">
        <DashboardContent />
      </div>
    </main>
  )
}
