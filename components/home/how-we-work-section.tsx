"use client"

import { FadeInUp, StaggerChildren, StaggerItem, staggerItemVariants } from "@/components/motion"
import { Phone, Calendar, FileText, Activity, CheckCircle2, Info, Star } from "lucide-react"
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

const choosingLogic = [
  { label: "Start with Discovery Call", text: "if you’re unsure where to begin" },
  { label: "Choose Single Session", text: "if you want clarity and next steps" },
  { label: "Choose Personal Health Blueprint", text: "if you want a structured plan to follow" },
  { label: "Choose Management Package", text: "if you want ongoing support and guidance" },
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
              At Salvere, we don’t just tell you what’s wrong — we help you understand why it’s happening and what to do about it.
            </p>
          </FadeInUp>
        </div>

        <StaggerChildren className="mx-auto mt-20 grid max-w-7xl grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
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

        {/* How to Choose */}
        <FadeInUp delay={0.6}>
          <div className="mt-24 max-w-4xl mx-auto bg-[var(--soft-white)] rounded-[3rem] p-10 lg:p-16 border border-[var(--muted-sage)]/10 shadow-sm">
            <div className="flex items-center gap-4 mb-10">
              <div className="h-12 w-12 rounded-full bg-[var(--orange)]/10 flex items-center justify-center">
                <Info className="h-6 w-6 text-[var(--orange)]" />
              </div>
              <h3 className="font-serif text-3xl font-medium text-[var(--charcoal)]">How to Choose</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              {choosingLogic.map((item, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <span className="font-bold text-[var(--charcoal)] flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-[var(--orange)]" />
                    {item.label}
                  </span>
                  <span className="text-[var(--charcoal)]/60 text-sm pl-3.5">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  )
}
