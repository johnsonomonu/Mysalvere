/**
 * Salvere Landing Page
 * Author: romeocodeit (timothydivine9@gmail.com)
 */
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/home/hero-section"
import { UnderstandTheGapSection } from "@/components/home/understand-the-gap-section"
import { IsThisYouSection } from "@/components/home/is-this-you-section"
import { TheShiftSection } from "@/components/home/the-shift-section"
import { TheSalvereApproachSection } from "@/components/home/the-salvere-approach"
import { WhoThisIsForSection } from "@/components/home/who-this-is-for-section"
import { HowWeWorkSection } from "@/components/home/how-we-work-section"
import { CorporateSolutionsSection } from "@/components/home/corporate-solutions-section"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { FinalCtaSection } from "@/components/home/final-cta-section"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <UnderstandTheGapSection />
      <IsThisYouSection />
      <TheShiftSection />
      <TheSalvereApproachSection />
      <WhoThisIsForSection />
      <HowWeWorkSection />
      <CorporateSolutionsSection />
      <TestimonialsSection />
      <FinalCtaSection />
      <Footer />
    </main>
  )
}
