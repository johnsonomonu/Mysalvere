import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { StartHereContent } from "@/components/start-here/start-here-content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Start Here | Salvere",
  description: "Not sure where to begin? We'll guide you to the right starting point based on your current situation.",
}

export default function StartHerePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <StartHereContent />
      <Footer />
    </main>
  )
}
