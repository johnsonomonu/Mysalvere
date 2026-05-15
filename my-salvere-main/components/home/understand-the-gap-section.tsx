"use client"

import { FadeInUp } from "@/components/motion"

const stats = [
  {
    value: "30%+",
    text: "of deaths in Nigeria are linked to chronic health conditions",
    subtext: "Many of these conditions develop over time — driven by daily habits, environment, and long-term physiological patterns."
  },
  {
    value: "70%+",
    text: "of routine health screenings provide results without structured lifestyle guidance or follow-up",
    subtext: "Detection is increasing, but interpretation and practical direction are still limited."
  },
  {
    value: "80%+",
    text: "of healthcare interactions focus on symptom management rather than underlying causes",
    subtext: "Without addressing root drivers, many conditions persist, recur, or progress."
  }
]

export function UnderstandTheGapSection() {
  return (
    <section className="py-24 lg:py-32 bg-[var(--warm-beige)] border-y border-[var(--charcoal)]/5">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16 text-center md:text-left">
          <h2 className="label-caps mb-4">Understand the Gap</h2>
          <h3 className="font-serif text-4xl lg:text-5xl font-medium text-[var(--charcoal)]">The reality of Nigeria today</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {stats.map((stat, index) => (
            <FadeInUp 
              key={index} 
              delay={0.1 * index}
              className="flex flex-col items-center md:items-start text-center md:text-left"
            >
              <div className="font-serif text-6xl lg:text-7xl font-bold tracking-tighter text-[var(--orange)] mb-6">
                {stat.value}
              </div>
              <p className="text-xl lg:text-2xl leading-snug text-[var(--charcoal)] font-medium mb-4">
                {stat.text}
              </p>
              <p className="text-base text-[var(--charcoal)]/70 leading-relaxed italic">
                <span className="text-[var(--orange)] mr-2">👉</span>
                {stat.subtext}
              </p>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  )
}
