import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServicesGrid } from "@/components/services/services-grid"
import { FadeInUp } from "@/components/motion"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Work With Us | Salvere Services",
  description: "We offer structured services to help you understand your patterns, correct imbalances, and build a sustainable lifestyle.",
  openGraph: {
    title: "Work With Us | Salvere Services",
    description: "We offer structured services to help you understand your patterns, correct imbalances, and build a sustainable lifestyle.",
    url: 'https://salvere.health/services',
    images: [{ url: '/hero-new.jpg', width: 1200, height: 630, alt: 'Salvere Wellness Services' }],
  }
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[var(--soft-white)]">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-24 overflow-hidden border-b border-[var(--charcoal)]/5 isolation-auto bg-[var(--warm-beige)]">
        <div className="absolute inset-0 z-0 opacity-10" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--muted-sage) 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }} />
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[var(--orange)]/10 rounded-full blur-[120px] -mr-32 -mt-32" />
        
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center items-center flex flex-col z-10">
          <FadeInUp>
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[var(--orange)]/10 text-[var(--orange)] text-xs font-bold uppercase tracking-widest mb-8">
              Work With Us
            </div>
          </FadeInUp>
          
          <FadeInUp delay={0.1}>
            <h1 className="font-serif text-5xl font-medium tracking-tight text-[var(--charcoal)] sm:text-7xl leading-tight max-w-4xl mx-auto">
              Reclaim Your Health, <span className="text-[var(--orange)]">Step by Step.</span>
            </h1>
          </FadeInUp>
          
          <FadeInUp delay={0.2}>
            <p className="mt-8 text-xl text-[var(--charcoal)]/70 leading-relaxed max-w-2xl mx-auto font-light">
              We offer structured services to help you understand your patterns, correct imbalances, and build a sustainable lifestyle.
            </p>
          </FadeInUp>
        </div>
      </section>

      <ServicesGrid />
      <Footer />
    </main>
  )
}
