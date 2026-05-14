"use client"

import { FadeInUp, StaggerChildren, StaggerItem, staggerItemVariants } from "@/components/motion"
import { ShieldCheck, Heart, Sparkles, Scale } from "lucide-react"

const values = [
  {
    icon: ShieldCheck,
    title: "Truth & Transparency",
    description: "We don't hide behind medical jargon. We provide clear, data-driven insights into your biological health.",
  },
  {
    icon: Heart,
    title: "Sustainable Care",
    description: "Our protocols are designed to be part of your life, not a temporary disruption. We build for the long term.",
  },
  {
    icon: Sparkles,
    title: "Vitality First",
    description: "We measure success by how you feel, how you perform, and the quality of your daily experience.",
  },
  {
    icon: Scale,
    title: "Bio-Individuality",
    description: "There is no 'one size fits all' in health. Your protocol is as unique as your DNA and lifestyle.",
  }
]

export function ValuesSection() {
  return (
    <section className="py-24 lg:py-32 bg-[var(--warm-beige)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-20">
          <FadeInUp>
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[var(--orange)]/10 text-[var(--orange)] text-xs font-bold uppercase tracking-widest mb-6">
              Our Core Values
            </div>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <h2 className="font-serif text-4xl font-medium tracking-tight text-[var(--charcoal)] sm:text-5xl">
              The Values That <span className="text-[var(--orange)]">Drive Us.</span>
            </h2>
          </FadeInUp>
        </div>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value) => (
            <StaggerItem key={value.title} variants={staggerItemVariants}>
              <div className="group flex flex-col h-full bg-[var(--soft-white)] rounded-[2.5rem] p-10 border border-transparent hover:border-[var(--muted-sage)]/20 shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="mb-8 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--warm-beige)] text-[var(--orange)] group-hover:bg-[var(--orange)] group-hover:text-white transition-colors duration-300">
                  <value.icon className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-serif font-medium text-[var(--charcoal)] mb-4">{value.title}</h3>
                <p className="text-base text-[var(--charcoal)]/60 leading-relaxed">
                  {value.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  )
}
