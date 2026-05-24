import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ForOrganizationsContent } from "@/components/for-organizations/for-organizations-content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "For Organizations | Salvere",
  description: "Turn routine health screenings into actionable insights that improve employee health, reduce risk, and prevent long-term complications.",
}

export default function ForOrganizationsPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <ForOrganizationsContent />
      <Footer />
    </main>
  )
}
