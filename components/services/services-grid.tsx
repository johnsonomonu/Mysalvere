"use client"

import { FadeInUp, StaggerChildren, StaggerItem, staggerItemVariants } from "@/components/motion"
import { Phone, Calendar, FileText, Activity, CheckCircle2, Star, Target, TrendingUp, FlameKindling, ArrowRight } from "lucide-react"
import { BookSessionButton } from "@/components/book-session-button"
import { cn } from "@/lib/utils"

const services = [
  {
    icon: Phone,
    title: "Discovery Call",
    price: "₦25,000",
    description: "The first step in working with Salvere. We discuss your concerns and determine the best way to proceed.",
    features: [
      "Discuss current health challenges",
      "Understand your expectations",
      "Identify potential areas of concern",
      "Guided onboarding process"
    ],
    cta: "Book Discovery Call",
    href: "/book/discovery",
    featured: false
  },
  {
    icon: Calendar,
    title: "Single Session",
    price: "₦50,000",
    description: "Ideal if you want clarity and direction without ongoing support.",
    features: [
      "Comprehensive root cause analysis",
      "Filled Forms, food journal & labs analysis",
      "Clear explanation of findings",
      "Practical immediate next steps"
    ],
    cta: "Book Single Session",
    href: "/book/single",
    featured: false
  },
  {
    icon: FileText,
    title: "Salvere Personalized Guide",
    price: "₦80,000",
    description: "A documented, actionable guide you can follow daily independently.",
    features: [
      "Comprehensive root cause analysis",
      "Personalized guide document",
      "Therapeutic meals & lifestyle protocol",
      "One deep-dive session"
    ],
    cta: "Get Your Guide",
    href: "/book/guide",
    featured: true
  },
  {
    icon: Activity,
    title: "Salvere Management Package",
    price: "₦150,000 / month",
    description: "Continuous care model for consistent guidance and accountability.",
    features: [
      "Comprehensive root cause analysis",
      "Personalized health guide",
      "Ongoing implementation support",
      "Four sessions per month"
    ],
    cta: "Start Management",
    href: "/book/management",
    featured: false
  },
]

export function ServicesGrid() {
  return (
    <section className="py-24 lg:py-32 bg-white" id="services-grid">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  service.featured ? "bg-[var(--orange)]/10 text-[var(--orange)]" : "bg-white text-[var(--muted-sage)] group-hover:bg-[var(--muted-sage)] group-hover:text-white"
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
                
                <p className="text-sm text-[var(--charcoal)]/70 leading-relaxed mb-6">
                  {service.description}
                </p>

                <ul className="space-y-3 mb-8 flex-grow">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-[13px] text-[var(--charcoal)]/80">
                      <CheckCircle2 className={cn("h-4 w-4 shrink-0 mt-0.5", service.featured ? "text-[var(--orange)]" : "text-[var(--muted-sage)]")} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
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

        {/* Process Visual */}
        <div className="mt-40 border-t border-[#E7E5E4] pt-32">
          <FadeInUp>
            <div className="text-center mb-24">
              <h2 className="font-serif text-4xl font-medium tracking-tight text-[#1C1917] sm:text-5xl">
                Our Proven Pathway to <span className="text-[var(--orange)]">Vitality.</span>
              </h2>
              <p className="mt-4 text-xl text-[#57534E] max-w-2xl mx-auto font-light">
                We believe in systems over shortcuts. Here is how we guide you through the Salvere restoration model.
              </p>
            </div>
          </FadeInUp>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center lg:px-24">
            <ProcessItem icon={Target} step="01" title="Assessment" desc="Identify root-cause imbalances and metabolic needs." />
            <ProcessItem icon={TrendingUp} step="02" title="Plan" desc="Receive a high-impact nutrition and lifestyle protocol." />
            <ProcessItem icon={FlameKindling} step="03" title="Support" desc="Ongoing expert coaching to ensure consistency." />
            <ProcessItem icon={CheckCircle2} step="04" title="Results" desc="Move from surviving to peak performance." />
          </div>
        </div>
      </div>
    </section>
  )
}

function ProcessItem({ step, title, desc, icon: Icon }: { step: string; title: string, desc: string, icon: any }) {
  return (
    <FadeInUp>
      <div className="group">
        <div className="relative mb-12 inline-flex h-24 w-24 items-center justify-center rounded-[2.5rem] bg-white border border-[#E7E5E4] shadow-sm group-hover:border-[var(--orange)] transition-all duration-500">
          <Icon className="h-10 w-10 text-[var(--orange)]" />
          <div className="absolute -bottom-4 bg-[#1C1917] text-white px-3 py-1 rounded-full text-xs font-bold tracking-widest">
            STEP {step}
          </div>
        </div>
        <h4 className="text-xl font-bold text-[#1C1917] mb-3">{title}</h4>
        <p className="text-[#57534E] text-sm leading-relaxed">{desc}</p>
      </div>
    </FadeInUp>
  )
}
