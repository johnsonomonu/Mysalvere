import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/home/hero-section"
import { AssessmentSection } from "@/components/home/assessment-section"
import { IsThisYouSection } from "@/components/home/is-this-you-section"
import { TheShiftSection } from "@/components/home/the-shift-section"
import { WhyItMattersSection } from "@/components/home/why-it-matters"
import { TheSalvereApproachSection } from "@/components/home/the-salvere-approach"
import { WhoThisIsForSection } from "@/components/home/who-this-is-for-section"
import { HowWeWorkSection } from "@/components/home/how-we-work-section"
import { PodcastAppearancesSection } from "@/components/home/podcast-section"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { FinalCtaSection } from "@/components/home/final-cta-section"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <AssessmentSection />
      <IsThisYouSection />
      <TheShiftSection />
      <WhyItMattersSection />
      <TheSalvereApproachSection />
      <WhoThisIsForSection />
      <HowWeWorkSection />
      <PodcastAppearancesSection />
      <TestimonialsSection />
      <FinalCtaSection />
      <Footer />
    </main>
  )
}
