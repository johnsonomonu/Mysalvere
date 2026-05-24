import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AssessmentWizard } from "@/components/assessment/assessment-wizard"
import { AssessmentIntro } from "@/components/assessment/assessment-intro"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Wellness Assessment | Salvere",
  description: "Take our comprehensive wellness assessment to discover your priority health areas and get personalized recommendations.",
}

export default function AssessmentPage() {
  return (
    <main className="min-h-screen bg-[var(--soft-white)]">
      <Header />
      <AssessmentIntro />
      <div id="assessment-wizard" className="py-24 bg-[var(--soft-white)]">
        <AssessmentWizard />
      </div>
      <Footer />
    </main>
  )
}
