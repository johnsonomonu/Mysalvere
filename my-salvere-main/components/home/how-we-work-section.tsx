"use client"

import { FadeInUp, StaggerChildren, StaggerItem, staggerItemVariants } from "@/components/motion"
import { Phone, Calendar, FileText, Activity } from "lucide-react"
import { BookSessionButton } from "@/components/book-session-button"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"

const services = [
  {
    icon: Phone,
    title: "Discovery Call",
    description: "Start here if you're unsure where to begin. We understand your current situation, review your concerns, and guide you on the most appropriate next step.",
    benefit: "Clarity on what to do next",
    cta: "Learn More",
    href: "/book",
    featured: false
  },
  {
    icon: Calendar,
    title: "Single Session",
    description: "A focused consultation where we analyze your health history, food patterns, and lab results to identify root causes.",
    benefit: "Understand what is happening and why",
    cta: "Learn More",
    href: "/services",
    featured: false
  },
  {
    icon: FileText,
    title: "Salvere Personal Health Blueprint",
    description: "A personalized, structured plan you can follow daily — based on your labs, lifestyle, and health patterns.",
    benefit: "A clear roadmap for improving your health",
    cta: "Learn More",
    href: "/services",
    featured: true
  },
  {
    icon: Activity,
    title: "Management Package",
    description: "Ongoing support with regular sessions, guidance, and adjustments as your health improves.",
    benefit: "Consistent support and accountability",
    cta: "Learn More",
    href: "/services",
    featured: false
  },
]

export function HowWeWorkSection() {
  return (
    <section className="py-24 lg:py-32 bg-[var(--soft-white)]" id="how-we-work">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-20">
          <FadeInUp>
            <h2 className="label-caps mb-4">Services</h2>
            <h3 className="font-serif text-4xl lg:text-5xl font-medium text-[var(--charcoal)] mb-6 text-balance">
              Our approach is structured to meet you where you are — whether you’re just starting or ready for deeper support.
            </h3>
          </FadeInUp>
        </div>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {services.map((service, index) => (
            <StaggerItem key={service.title} variants={staggerItemVariants} className="h-full">
              <div className={cn(
                "group flex flex-col h-full rounded-[2rem] p-8 transition-all duration-500 relative overflow-hidden",
                service.featured 
                  ? "bg-[var(--muted-sage)] border-2 border-[var(--muted-sage)] shadow-2xl text-white" 
                  : "bg-white border border-[var(--charcoal)]/5 shadow-sm hover:shadow-xl hover:-translate-y-1"
              )}>
                {service.featured && (
                  <div className="absolute top-0 right-0 bg-[var(--orange)] text-white text-[10px] font-bold uppercase tracking-widest py-1 px-4 rounded-bl-xl">
                    Featured
                  </div>
                )}
                
                <div className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-xl mb-8",
                  service.featured ? "bg-white/20 text-white" : "bg-[var(--warm-beige)] text-[var(--muted-sage)]"
                )}>
                  <service.icon className="h-6 w-6" />
                </div>
                
                <h3 className={cn(
                  "font-serif text-2xl font-medium mb-4 leading-tight",
                  service.featured ? "text-white" : "text-[var(--charcoal)]"
                )}>
                  {service.title}
                </h3>
                
                <p className={cn(
                  "text-sm leading-relaxed mb-6 flex-grow",
                  service.featured ? "text-white/80" : "text-[var(--charcoal)]/70"
                )}>
                  {service.description}
                </p>

                <div className={cn(
                  "mb-8 p-4 rounded-xl flex items-start gap-2 text-sm italic font-medium",
                  service.featured ? "bg-white/10 text-white" : "bg-[var(--warm-beige)] text-[var(--charcoal)]"
                )}>
                  <span className="text-[var(--orange)]">👉</span>
                  {service.benefit}
                </div>
                
                <Button 
                  variant={service.featured ? "secondary" : "outline"}
                  className={cn(
                    "w-full rounded-full h-12",
                    service.featured 
                      ? "bg-white text-[var(--muted-sage)] hover:bg-white/90" 
                      : "border-[var(--charcoal)]/20 text-[var(--charcoal)] hover:bg-[var(--warm-beige)]"
                  )}
                  asChild
                >
                  <Link href={service.href}>{service.cta}</Link>
                </Button>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>

        {/* Final CTA Area */}
        <FadeInUp>
          <div className="bg-[var(--warm-beige)] rounded-[3rem] p-10 lg:p-16 text-center border border-[var(--charcoal)]/5">
            <h3 className="font-serif text-3xl font-medium text-[var(--charcoal)] mb-4">Not sure where to start?</h3>
            <p className="text-xl text-[var(--charcoal)]/70 mb-10">Take our quick assessment or click on the Start Here button to gain better clarity.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <Button size="xl" className="w-full sm:w-auto bg-[var(--orange)] hover:bg-[var(--orange-hover)] text-white shadow-lg" asChild>
                <Link href="/assessment">Take Assessment</Link>
              </Button>
              <BookSessionButton size="xl" className="w-full sm:w-auto bg-white border border-[var(--charcoal)]/20 text-[var(--charcoal)] hover:bg-white/80 transition-all">
                Start Here
              </BookSessionButton>
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  )
}
