import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AboutContent } from "@/components/about/about-content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us | Salvere Functional Medicine",
  description: "Learn about the story behind Salvere, our philosophy, and how we help you connect the dots between your habits, environment, and health.",
  openGraph: {
    title: "About Us | Salvere Functional Medicine",
    description: "Learn about the story behind Salvere, our philosophy, and how we help you connect the dots between your habits, environment, and health.",
    url: 'https://salvere.health/about',
    images: [{ url: '/about-ceo.jpg', width: 1200, height: 630, alt: 'Dr. Dew, Founder of Salvere' }],
  }
}

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <AboutContent />
      <Footer />
    </main>
  )
}
