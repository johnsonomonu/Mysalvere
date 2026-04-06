"use client"

import { FadeInUp } from "@/components/motion"
import { Users, Building2, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const programs = [
  {
    icon: Users,
    title: "1:1 Health Coaching",
    description: "Personalized support to help you build a healthy lifestyle by sharing a meal plan, charting your health goals, and helping you stay motivated to reach them.",
    cta: "See our Rates",
    href: "#",
  },
  {
    icon: Building2,
    title: "Corporate Wellness Programs",
    description: "Structured programs designed to help teams perform at their best without burning out.",
    cta: "See our offerings",
    href: "#",
  },
  {
    icon: Calendar,
    title: "The Salvere open house (Monthly Sessions)",
    description: "A practical, relaxed session for professionals looking to improve their health and performance sustainably.",
    cta: "Reserve Your Spot",
    href: "#",
  },
]

export function HowWeWorkSection() {
  return (
    <section className="py-24 lg:py-32 bg-white" id="how-we-work">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <FadeInUp>
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[var(--vital-mint)] text-[var(--vital-green)] text-xs font-bold uppercase tracking-widest mb-6">
              Our Services
            </div>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <h2 className="font-serif text-4xl font-medium tracking-tight text-[#1C1917] sm:text-5xl text-balance">
              How We Work
            </h2>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <p className="mt-6 text-xl leading-8 text-[#57534E]">
              We keep things simple, effective, and sustainable.
            </p>
          </FadeInUp>
        </div>

        <div className="mx-auto mt-20 grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-3">
          {programs.map((program, index) => (
            <FadeInUp key={program.title} delay={0.1 + index * 0.1}>
              <div className="group flex flex-col h-full rounded-[2.5rem] bg-[#F9FAFB] p-10 shadow-sm transition-all duration-500 hover:shadow-xl border border-transparent hover:border-[var(--vital-green)]/10">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-sm group-hover:bg-[var(--vital-green)] transition-all duration-500">
                  <program.icon className="h-8 w-8 text-[var(--vital-green)] group-hover:text-white transition-all duration-500" />
                </div>
                
                <h3 className="mt-8 font-serif text-2xl font-medium text-[#1C1917]">
                  {program.title}
                </h3>
                
                <p className="mt-4 text-base text-[#57534E] leading-relaxed flex-grow">
                  {program.description}
                </p>
                
                <div className="mt-10 pt-8 border-t border-[#E7E5E4]">
                  <Button asChild variant="vital" className="w-full rounded-2xl h-14 text-base shadow-none">
                    <Link href={program.href}>
                      {program.cta}
                    </Link>
                  </Button>
                </div>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  )
}
