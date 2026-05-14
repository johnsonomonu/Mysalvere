import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AboutHero } from "@/components/about/about-hero"
import { FounderStory } from "@/components/about/founder-story"
import { ValuesSection } from "@/components/about/values-section"
import { TheSalvereApproachSection } from "@/components/home/the-salvere-approach"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us | Salvere",
  description: "Learn about Dewumi Ebuk's mission to help professionals and organizations build sustainable health and performance systems.",
}

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <AboutHero />
      <FounderStory />
      <ValuesSection />
      <TheSalvereApproachSection />
      <Footer />
    </main>
  )
}
