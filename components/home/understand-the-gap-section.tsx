"use client"

import { FadeInUp } from "@/components/motion"

const stats = [
  {
    value: "30%+",
    text: "of deaths in Nigeria are linked to chronic health conditions"
  },
  {
    value: "70%+",
    text: "of routine health screenings provide results without structured lifestyle guidance"
  },
  {
    value: "80%+",
    text: "of healthcare interactions focus on symptom management rather than underlying causes"
  }
]

export function UnderstandTheGapSection() {
  return (
    <section className="py-16 lg:py-24 bg-[var(--muted-sage)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8 divide-y md:divide-y-0 md:divide-x divide-[var(--charcoal)]/10">
          {stats.map((stat, index) => (
            <FadeInUp 
              key={index} 
              delay={0.1 * index}
              className="pt-8 md:pt-0 md:px-8 first:pt-0 first:md:px-0 first:md:pr-8 last:md:px-0 last:md:pl-8 flex flex-col items-center md:items-start text-center md:text-left"
            >
              <div className="font-serif text-6xl lg:text-7xl font-bold tracking-tighter text-[var(--charcoal)] mb-6">
                {stat.value}
              </div>
              <p className="text-lg lg:text-xl leading-relaxed text-[var(--charcoal)] font-medium">
                {stat.text}
              </p>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  )
}
