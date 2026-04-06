import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AssessmentWizard } from "@/components/assessment/assessment-wizard"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Wellness Assessment | Salvere",
  description: "Take our comprehensive wellness assessment to discover your priority health areas and get personalized recommendations.",
}

export default function AssessmentPage() {
  return (
    <main className="min-h-screen bg-[#F5F5F4]">
      <Header />
      <div className="pt-24 pb-16">
        <AssessmentWizard />
      </div>
      <Footer />
    </main>
  )
}
