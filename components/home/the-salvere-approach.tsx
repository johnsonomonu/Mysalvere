"use client"

import { FadeInUp } from "@/components/motion"
import { FlaskConical, Utensils, Activity, ArrowRight } from "lucide-react"

const traditionalApproach = [
  "Isolated lab values",
  "Individual symptoms",
  "Short-term fixes",
]

const salvereConnects = [
  "Lab results",
  "Lifestyle and habits",
  "Nutrition and hydration",
  "Body patterns",
]

const salvereUnderstanding = [
  "What is happening",
  "Why it is happening",
  "What to do next",
]

const flowSteps = [
  { icon: FlaskConical, label: "Lab Results" },
  { icon: Utensils, label: "Daily Habits" },
  { icon: Activity, label: "Body Patterns" },
]

export function TheSalvereApproachSection() {
  return (
    <section className="py-16 lg:py-24 bg-[var(--warm-beige)]" id="the-approach">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <FadeInUp>
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[var(--orange)]/10 text-[var(--orange)] text-xs font-bold uppercase tracking-widest mb-6">
              Our Approach
            </div>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <h2 className="font-serif text-4xl font-medium tracking-tight text-[var(--charcoal)] sm:text-5xl text-balance">
              The Salvere Approach
            </h2>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <p className="mt-6 text-xl leading-8 text-[var(--charcoal)]/70">
              Your health is not defined by a single result, symptom, or diagnosis. It is shaped by patterns.
            </p>
          </FadeInUp>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left Column: Comparison */}
          <FadeInUp delay={0.3}>
            <div className="space-y-10">
              {/* Traditional */}
              <div className="p-8 rounded-[2rem] bg-[var(--soft-white)] border border-[var(--charcoal)]/5">
                <h3 className="font-serif text-2xl font-medium text-[var(--charcoal)] mb-6">
                  Most approaches focus on:
                </h3>
                <ul className="space-y-3">
                  {traditionalApproach.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-[var(--charcoal)]/60">
                      <div className="h-1.5 w-1.5 rounded-full bg-[var(--charcoal)]/30 shrink-0" />
                      <span className="text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Salvere Approach */}
              <div className="p-8 rounded-[2rem] bg-[var(--muted-sage)]/10 border border-[var(--muted-sage)]/20">
                <h3 className="font-serif text-2xl font-medium text-[var(--charcoal)] mb-6">
                  At Salvere, we <span className="text-[var(--orange)]">connect:</span>
                </h3>
                <ul className="space-y-3 mb-8">
                  {salvereConnects.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-[var(--charcoal)]">
                      <div className="h-1.5 w-1.5 rounded-full bg-[var(--orange)] shrink-0" />
                      <span className="text-lg font-medium">{item}</span>
                    </li>
                  ))}
                </ul>

                <h4 className="text-sm font-bold uppercase tracking-widest text-[var(--muted-sage)] mb-4">
                  To understand:
                </h4>
                <ul className="space-y-3">
                  {salvereUnderstanding.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-[var(--charcoal)]">
                      <div className="h-2 w-2 rounded-full bg-[var(--orange)] shrink-0" />
                      <span className="text-lg font-semibold">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeInUp>

          {/* Right Column: Flow Diagram */}
          <FadeInUp delay={0.4}>
            <div className="lg:sticky lg:top-32">
              <div className="p-10 rounded-[2.5rem] bg-[var(--soft-white)] border border-[var(--charcoal)]/5 shadow-sm">
                <h3 className="font-serif text-2xl font-medium text-[var(--charcoal)] mb-10 text-center">
                  How it all connects
                </h3>
                
                <div className="flex flex-col items-center gap-4">
                  {flowSteps.map((step, i) => (
                    <div key={i} className="w-full">
                      <div className="group flex items-center gap-5 p-6 rounded-2xl bg-[var(--warm-beige)] border border-transparent hover:border-[var(--orange)]/20 hover:shadow-md transition-all duration-300">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-[var(--muted-sage)] group-hover:bg-[var(--orange)] group-hover:text-white transition-colors duration-300 shadow-sm">
                          <step.icon className="h-7 w-7" />
                        </div>
                        <span className="text-xl font-medium text-[var(--charcoal)]">{step.label}</span>
                      </div>
                      {i < flowSteps.length - 1 && (
                        <div className="flex justify-center py-2">
                          <ArrowRight className="h-5 w-5 text-[var(--orange)] rotate-90" />
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Final: Action Plan */}
                  <div className="flex justify-center py-2">
                    <ArrowRight className="h-5 w-5 text-[var(--orange)] rotate-90" />
                  </div>
                  <div className="w-full p-6 rounded-2xl bg-[var(--orange)] text-white text-center shadow-lg shadow-orange-600/20">
                    <span className="text-xl font-bold">Action Plan</span>
                  </div>
                </div>

                <p className="mt-10 text-center text-lg text-[var(--charcoal)]/70 font-light">
                  When these pieces are connected, your next steps become clear.
                </p>
              </div>
            </div>
          </FadeInUp>
        </div>
      </div>
    </section>
  )
}
