"use client"

import { FadeInUp, StaggerChildren, StaggerItem, staggerItemVariants } from "@/components/motion"
import { Phone, Calendar, FileText, Activity, FlaskConical, CheckCircle2, Info, Star } from "lucide-react"
import { BookSessionButton } from "@/components/book-session-button"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"

const services = [
  {
    icon: Phone,
    title: "Discovery Call",
    price: "₦25,000",
    description: "Start here if you're unsure where to begin. We understand your current situation, review your concerns, and guide you on the most appropriate next step.",
    benefit: "Clarity on what to do next",
    cta: "Learn More",
    href: "/services#discovery-call",
    featured: false
  },
  {
    icon: Calendar,
    title: "Single Session",
    price: "₦50,000",
    description: "A focused consultation where we analyze your health history, food patterns, and lab results to identify root causes.",
    benefit: "Understand what is happening and why",
    cta: "Learn More",
    href: "/services#single-session",
    featured: false
  },
  {
    icon: FileText,
    title: "Personal Health Blueprint",
    price: "₦80,000",
    description: "A personalized, structured plan you can follow daily, based on your labs, lifestyle, and health patterns.",
    benefit: "A clear roadmap for improving your health",
    cta: "Learn More",
    href: "/services#blueprint",
    featured: true
  },
  {
    icon: Activity,
    title: "Management Package",
    price: "₦150,000 / month",
    description: "Ongoing support with regular sessions, guidance, and adjustments as your health improves.",
    benefit: "Consistent support and accountability",
    cta: "Learn More",
    href: "/services#management",
    featured: false
  },
]

export function HowWeWorkSection() {
  return (
    <section className="py-16 lg:py-24 bg-[var(--soft-white)]" id="how-we-work">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <FadeInUp>
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[var(--warm-beige)] text-[var(--muted-sage)] text-xs font-bold uppercase tracking-widest mb-6 border border-[var(--muted-sage)]/20">
              Our Services
            </div>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <h2 className="font-serif text-4xl font-medium tracking-tight text-[var(--charcoal)] sm:text-5xl text-balance">
              How We Work
            </h2>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <p className="mt-6 text-xl leading-8 text-[var(--charcoal)]/70">
              Our approach is structured to meet you where you are — whether you&apos;re just starting or ready for deeper support.
            </p>
          </FadeInUp>
        </div>

        <StaggerChildren className="mx-auto mt-20 grid max-w-7xl grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <StaggerItem key={service.title} variants={staggerItemVariants} className="h-full">
              <div className={cn(
                "group flex flex-col h-full rounded-[2.5rem] p-8 transition-all duration-300 relative",
                service.featured 
                  ? "bg-white border-2 border-[var(--orange)] shadow-xl shadow-orange-900/5 -translate-y-2 z-10 hover:shadow-2xl" 
                  : "bg-[var(--warm-beige)] border border-transparent hover:border-[var(--muted-sage)]/20 shadow-sm hover:shadow-xl hover:scale-[1.02]"
              )}>
                {service.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[var(--orange)] text-white text-[10px] font-bold uppercase tracking-widest py-1.5 px-4 rounded-full shadow-md whitespace-nowrap flex items-center gap-1.5">
                    <Star className="h-3 w-3 fill-current" /> Recommended
                  </div>
                )}
                
                <div className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-2xl mb-6 shadow-sm transition-all duration-300",
                  service.featured ? "bg-[var(--orange)]/10 text-[var(--orange)]" : "bg-[var(--soft-white)] text-[var(--muted-sage)] group-hover:bg-[var(--muted-sage)] group-hover:text-white"
                )}>
                  <service.icon className="h-6 w-6" />
                </div>
                
                <h3 className="font-serif text-2xl font-medium text-[var(--charcoal)] mb-1 leading-tight">
                  {service.title}
                </h3>
                <p className={cn(
                  "text-lg font-bold mb-4",
                  service.featured ? "text-[var(--orange)]" : "text-[var(--muted-sage)]"
                )}>
                  {service.price}
                </p>
                
                <p className="text-sm text-[var(--charcoal)]/70 leading-relaxed mb-4">
                  {service.description}
                </p>

                <div className="flex items-start gap-2 text-sm text-[var(--charcoal)]/80 mb-8 flex-grow">
                  <CheckCircle2 className={cn("h-4 w-4 shrink-0 mt-0.5", service.featured ? "text-[var(--orange)]" : "text-[var(--muted-sage)]")} />
                  <span className="font-medium">{service.benefit}</span>
                </div>
                
                <div className="mt-auto pt-6 border-t border-[var(--charcoal)]/10">
                  <BookSessionButton 
                    variant={service.featured ? "vital" : "outline"} 
                    className="w-full rounded-full h-12"
                    href={service.href}
                    isExternal={false}
                  >
                    {service.cta}
                  </BookSessionButton>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>

        {/* Closing Note */}
        <FadeInUp delay={0.6}>
          <div className="mt-16 max-w-3xl mx-auto text-center">
            <p className="text-lg text-[var(--charcoal)]/70 mb-8">
              Not sure where to start? Take our quick assessment or click Start Here for better clarity.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-[var(--charcoal)]/15 text-[var(--charcoal)] hover:bg-white" asChild>
                <Link href="/assessment">Take Assessment</Link>
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-[var(--charcoal)]/15 text-[var(--charcoal)] hover:bg-white" asChild>
                <Link href="/start-here">Start Here</Link>
              </Button>
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  )
}
