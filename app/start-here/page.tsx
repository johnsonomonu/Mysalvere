import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { StartHereContent } from "@/components/start-here/start-here-content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Start Here | Salvere Functional Medicine",
  description: "Not sure where to begin? We'll guide you to the right starting point based on your current situation.",
  openGraph: {
    title: "Start Here | Salvere Functional Medicine",
    description: "Not sure where to begin? We'll guide you to the right starting point based on your current situation.",
    url: 'https://salvere.health/start-here',
    images: [{ url: '/hero-new.jpg', width: 1200, height: 630, alt: 'Start Your Salvere Journey' }],
  }
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
