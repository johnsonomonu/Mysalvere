"use client"

import { FadeInUp, StaggerChildren, StaggerItem, staggerItemVariants } from "@/components/motion"
import { Phone, Calendar, FileText, Activity, FlaskConical, CheckCircle2, Star, ArrowRight } from "lucide-react"
import { BookSessionButton } from "@/components/book-session-button"
import { cn } from "@/lib/utils"

const services = [
  {
    id: "discovery-call",
    icon: Phone,
    title: "Discovery Call",
    price: "₦25,000",
    description: "Start here if you are unsure where to begin. We understand your current situation, review your concerns, and guide you on the most appropriate next step.",
    includesTitle: "What's included:",
    includes: [
      "A review of your current concerns",
      "Guidance on which service fits you best",
      "Discussion of our approach"
    ],
    bestFor: "People who want to ensure Salvere is the right fit before committing to a full session.",
    cta: "Book Discovery Call",
    href: "/book/discovery",
    featured: false
  },
  {
    id: "single-session",
    icon: Calendar,
    title: "Single Session",
    price: "₦50,000",
    description: "A focused, one-time consultation to analyze your health history, food patterns, and lab results to identify root causes.",
    includesTitle: "During this session, we will:",
    includes: [
      "Review your Intake Forms and Food Journal",
      "Identify possible root-cause patterns",
      "Provide immediate, actionable next steps"
    ],
    bestFor: "People who need clarity on a specific issue but don't want ongoing support.",
    cta: "Book Single Session",
    href: "/book/single",
    featured: false
  },
  {
    id: "blueprint",
    icon: FileText,
    title: "Salvere Personal Health Blueprint",
    price: "₦80,000",
    description: "A personalized, documented guide you can follow daily, based on your labs, lifestyle, and health patterns.",
    includesTitle: "What's included:",
    includes: [
      "One deep-dive session (up to 90 mins)",
      "Full analysis of Intake Forms & Food Journal",
      "Nutrition and hydration guidelines",
      "Daily habits and lifestyle adjustments",
      "Targeted supplement recommendations"
    ],
    bestFor: "People who want a clear, documented plan they can execute independently.",
    cta: "Get Your Blueprint",
    href: "/book/guide",
    featured: true
  },
  {
    id: "management",
    icon: Activity,
    title: "Salvere Management Package",
    price: "₦150,000 / month",
    description: "For ongoing support, accountability, and regular adjustments as your health improves.",
    includesTitle: "What's included:",
    includes: [
      "Everything in the Blueprint Package",
      "4 sessions per month (Weekly check-ins)",
      "Continuous monitoring and adjustments",
      "Direct support for questions and guidance"
    ],
    bestFor: "People dealing with chronic issues (PCOS, stubborn weight, metabolic conditions) who need ongoing accountability.",
    cta: "Start Management",
    href: "/book/management",
    featured: false
  },
  {
    id: "lab-review",
    icon: FlaskConical,
    title: "Understand My Labs",
    price: "₦40,000",
    description: "If you already have recent lab results but don't fully understand what they mean for your daily health.",
    includesTitle: "What's included:",
    includes: [
      "A review of your specific lab results",
      "Translation of clinical numbers into lifestyle impact",
      "Practical guidance on what to adjust (diet, sleep, habits)"
    ],
    bestFor: "People who feel fine but want to catch early patterns, or those with abnormal results but no clear action plan.",
    cta: "Book Lab Review",
    href: "/book/labs",
    featured: false
  },
]

export function ServicesGrid() {
  return (
    <section className="py-24 lg:py-32 bg-[var(--soft-white)]" id="services-grid">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <StaggerItem key={service.id} id={service.id} variants={staggerItemVariants} className="h-full scroll-mt-32">
              <div className={cn(
                "group flex flex-col h-full rounded-[2.5rem] p-8 transition-all duration-300 relative",
                service.featured 
                  ? "bg-white border-2 border-[var(--orange)] shadow-xl shadow-orange-900/5 -translate-y-2 z-10 hover:shadow-2xl" 
                  : "bg-[var(--warm-beige)] border border-transparent hover:border-[var(--muted-sage)]/20 shadow-sm hover:shadow-xl hover:-translate-y-1"
              )}>
                {service.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[var(--orange)] text-white text-[10px] font-bold uppercase tracking-widest py-1.5 px-4 rounded-full shadow-md whitespace-nowrap flex items-center gap-1.5">
                    <Star className="h-3 w-3 fill-current" /> Recommended
                  </div>
                )}
                
                <div className={cn(
                  "flex h-14 w-14 items-center justify-center rounded-2xl mb-6 shadow-sm transition-all duration-300",
                  service.featured ? "bg-[var(--orange)]/10 text-[var(--orange)]" : "bg-[var(--soft-white)] text-[var(--muted-sage)] group-hover:bg-[var(--orange)] group-hover:text-white"
                )}>
                  <service.icon className="h-7 w-7" />
                </div>
                
                <h3 className="font-serif text-2xl font-medium text-[var(--charcoal)] mb-2 leading-tight">
                  {service.title}
                </h3>
                <p className={cn(
                  "text-xl font-bold mb-6",
                  service.featured ? "text-[var(--orange)]" : "text-[var(--muted-sage)]"
                )}>
                  {service.price}
                </p>
                
                <p className="text-base text-[var(--charcoal)]/80 leading-relaxed mb-8">
                  {service.description}
                </p>

                <div className="flex-grow">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-[var(--charcoal)] mb-4">
                    {service.includesTitle}
                  </h4>
                  <ul className="space-y-3 mb-8">
                    {service.includes.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-[var(--charcoal)]/80">
                        <CheckCircle2 className={cn("h-5 w-5 shrink-0", service.featured ? "text-[var(--orange)]" : "text-[var(--muted-sage)]")} />
                        <span className="mt-0.5">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mb-8 p-4 rounded-2xl bg-[var(--soft-white)] border border-[var(--charcoal)]/5">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-[var(--orange)] mb-2">
                      Best For
                    </h4>
                    <p className="text-sm text-[var(--charcoal)]/70 italic">
                      {service.bestFor}
                    </p>
                  </div>
                </div>
                
                <div className="mt-auto pt-6 border-t border-[var(--charcoal)]/10">
                  <BookSessionButton 
                    variant={service.featured ? "vital" : "outline"} 
                    className="w-full rounded-full h-14 text-base shadow-lg"
                    href={service.href}
                    isExternal={false}
                  >
                    {service.cta}
                    {service.featured && <ArrowRight className="ml-2 h-4 w-4" />}
                  </BookSessionButton>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  )
}
