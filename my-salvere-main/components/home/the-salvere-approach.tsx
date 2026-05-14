"use client"

import { FadeInUp } from "@/components/motion"
import { Activity, Apple, FlaskConical, Stethoscope, HeartHandshake } from "lucide-react"

const pillars = [
  {
    icon: FlaskConical,
    title: "Comprehensive Functional Testing",
    description: "We go beyond regular lab interpretations to reveal systemic imbalances, nutrient deficiencies, and root causes.",
  },
  {
    icon: Apple,
    title: "Nutrition",
    description: "Local, whole-food strategies that rebuilds your body. Personalized for your unique body chemistry goal and health challenges.",
  },
  {
    icon: Activity,
    title: "Research backed Supplementation",
    description: "Address deficiencies, support detoxification, and optimize body functions.",
  },
  {
    icon: Stethoscope,
    title: "Metabolic & Hormonal Balance",
    description: "Helping your body regulate important body systems that support the heart, blood sugar, thyroid, sex hormones and cortisol.",
  },
  {
    icon: HeartHandshake,
    title: "Ongoing Expert Guidance",
    description: "Regular check-ins, thoughtful adjustments, and ongoing support to help you stay consistent and make real progress.",
  },
]

export function TheSalvereApproachSection() {
  return (
    <section className="py-16 lg:py-24 bg-[var(--warm-beige)]" id="the-approach">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          
          {/* Left Column: Founder Story */}
          <div className="lg:sticky lg:top-32">
            <FadeInUp>
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[var(--orange)]/10 text-[var(--orange)] text-xs font-bold uppercase tracking-widest mb-6">
                Our Mission
              </div>
            </FadeInUp>
            <FadeInUp delay={0.1}>
              <h2 className="font-serif text-4xl font-medium tracking-tight text-[var(--charcoal)] sm:text-5xl leading-tight">
                At Salvere, we focus on restoring your system — <span className="text-[var(--orange)]">not just managing symptoms.</span>
              </h2>
            </FadeInUp>
            
            <FadeInUp delay={0.2}>
              <div className="mt-10 space-y-6 text-lg leading-relaxed text-[var(--charcoal)]/70 font-light">
                <p>
                  For Dewumi Ebuk, this mission is deeply personal. After working in both clinical and corporate environments, I began to notice a pattern. Brilliant, hardworking people were constantly exhausted, and always on one stimulant or the other.
                </p>
                <p>
                  Not because they lacked discipline, or didn’t know right from wrong, but because their bodies were overwhelmed and burnt-out.
                </p>
                <p className="font-medium text-[var(--charcoal)]">
                  That realization changed everything.
                </p>
                <div className="p-8 bg-[var(--soft-white)] rounded-3xl border border-[var(--muted-sage)]/15 shadow-sm relative overflow-hidden group hover:shadow-xl transition-all duration-500">
                  <div className="absolute top-0 left-0 w-2 h-full bg-[var(--orange)]" />
                  <p className="text-[var(--charcoal)] font-medium italic relative z-10">
                    "Today, I help professionals and organizations build systems that support both health and performance — so they can thrive without burning out."
                  </p>
                </div>
              </div>
            </FadeInUp>
          </div>

          {/* Right Column: Pillars */}
          <div className="lg:mt-0 mt-8">
            <FadeInUp delay={0.3}>
              <h3 className="text-2xl font-serif font-medium text-[var(--charcoal)] mb-12">
                Our approach is built on:
              </h3>
            </FadeInUp>
            
            <div className="space-y-6">
              {pillars.map((pillar, index) => (
                <FadeInUp key={pillar.title} delay={0.3 + index * 0.1}>
                  <div className="group flex gap-6 p-8 rounded-[2rem] bg-[var(--soft-white)] border border-transparent hover:border-[var(--muted-sage)]/15 hover:shadow-[0_20px_50px_rgba(122,143,123,0.07)] transition-all duration-300">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[var(--warm-beige)] group-hover:bg-[var(--muted-sage)] transition-colors duration-300">
                      <pillar.icon className="h-8 w-8 text-[var(--muted-sage)] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <h4 className="text-xl font-medium text-[var(--charcoal)] group-hover:text-[var(--orange)] transition-colors duration-300">
                        {pillar.title}
                      </h4>
                      <p className="mt-2 text-base text-[var(--charcoal)]/70 leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </FadeInUp>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
