"use client"

import { FadeInUp } from "@/components/motion"

const stats = [
  {
    value: "30%+",
    text: "of deaths in Nigeria are linked to chronic health conditions. Many of these conditions develop over time — driven by daily habits, environment, and long-term physiological patterns."
  },
  {
    value: "70%+",
    text: "of routine health screenings provide results without structured lifestyle guidance or follow-up. Detection is increasing, but interpretation and practical direction are still limited."
  },
  {
    value: "80%+",
    text: "of healthcare interactions focus on symptom management rather than underlying causes. Without addressing root drivers, many conditions persist, recur, or progress."
  }
]

export function UnderstandTheGapSection() {
  return (
    <section className="py-16 lg:py-24 bg-[var(--warm-beige)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <FadeInUp>
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[var(--orange)]/10 text-[var(--orange)] text-xs font-bold uppercase tracking-widest mb-6">
              The Reality
            </div>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <h2 className="font-serif text-4xl font-medium tracking-tight text-[var(--charcoal)] sm:text-5xl text-balance">
              Understand the Gap in Nigeria Today
            </h2>
          </FadeInUp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8">
          {stats.map((stat, index) => (
            <FadeInUp 
              key={index} 
              delay={0.1 * index}
              className="relative pt-8 md:pt-0 md:px-8 first:pt-0 first:md:px-0 first:md:pr-8 last:md:px-0 last:md:pl-8 flex flex-col items-center md:items-start text-center md:text-left"
            >
              {/* Divider between cards on desktop */}
              {index > 0 && (
                <div className="hidden md:block absolute left-0 top-0 h-full w-px bg-[var(--charcoal)]/10" />
              )}
              <div className="font-serif text-6xl lg:text-7xl font-bold tracking-tighter text-[var(--orange)] mb-6">
                {stat.value}
              </div>
              <p className="text-base lg:text-lg leading-relaxed text-[var(--charcoal)]/80">
                {stat.text}
              </p>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  )
}
