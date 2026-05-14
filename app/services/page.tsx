import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServicesGrid } from "@/components/services/services-grid"
import { ServiceBenefits } from "@/components/services/service-benefits"
import { ServicesCta } from "@/components/services/services-cta"
import { FadeInUp } from "@/components/motion"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Our Services | Salvere",
  description: "Detailed breakdown of our 1:1 health coaching, corporate wellness programs, and the Salvere Open House community sessions.",
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[var(--soft-white)] border-b border-[#E7E5E4] isolation-auto">
        {/* Immersive Background Image */}
        <div className="absolute inset-0 z-0 opacity-20 overflow-hidden">
          <img 
            src="/premium_wellness_hero_background_texture_1777598115851.png" 
            alt="Wellness background" 
            className="w-full h-full object-cover scale-110"
          />
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[var(--orange)]/5 rounded-full blur-[120px] -mr-32 -mt-32" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center items-center flex flex-col">
          <FadeInUp>
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[var(--orange)]/10 text-[var(--orange)] text-xs font-bold uppercase tracking-widest mb-8">
              What We Do
            </div>
          </FadeInUp>
          
          <FadeInUp delay={0.1}>
            <h1 className="font-serif text-5xl font-medium tracking-tight text-[var(--charcoal)] sm:text-7xl leading-tight max-w-4xl mx-auto">
              How We Help You <span className="text-[var(--orange)]">Reclaim Your Performance.</span>
            </h1>
          </FadeInUp>
          
          <FadeInUp delay={0.2}>
            <p className="mt-8 text-xl text-[var(--charcoal)]/70 leading-relaxed max-w-2xl mx-auto font-light">
              We provide structured, research-backed systems for both individual 
              professionals and organizations looking to build sustainable wellness.
            </p>
          </FadeInUp>
        </div>
      </section>

      <ServicesGrid />
      <ServiceBenefits />
      <ServicesCta />
      <Footer />
    </main>
  )
}
