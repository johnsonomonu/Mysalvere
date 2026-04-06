"use client"

import { FadeInUp } from "@/components/motion"
import { Quote } from "lucide-react"

export function FounderStory() {
  return (
    <section className="py-24 lg:py-32 bg-[#F9FAFB] overflow-hidden" id="founder-story">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">

          {/* Image/Visual Placeholder */}
          <FadeInUp>
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden group shadow-2xl">
              <img
                src="/about.png"
                alt="Dewumi Ebuk - Founder of Salvere"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/60 via-transparent to-transparent" />
              <div className="absolute bottom-10 left-10 p-8 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20">
                <p className="text-white font-serif text-2xl font-medium">Dewumi Ebuk</p>
                <p className="text-white/80 text-sm font-bold uppercase tracking-widest mt-1">Founding Director</p>
              </div>
            </div>
          </FadeInUp>

          {/* Text Content */}
          <div>
            <FadeInUp delay={0.1}>
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[var(--vital-green)]/10 text-[var(--vital-green)] text-xs font-bold uppercase tracking-widest mb-8">
                The Founder
              </div>
            </FadeInUp>

            <FadeInUp delay={0.2}>
              <h2 className="font-serif text-4xl font-medium tracking-tight text-[#1C1917] sm:text-5xl leading-tight mb-10">
                From Clinical Practice to <span className="text-[var(--vital-green)]">Performance Systems.</span>
              </h2>
            </FadeInUp>

            <div className="space-y-6 text-lg text-[#57534E] leading-relaxed font-light">
              <FadeInUp delay={0.3}>
                <p>
                  As a clinical specialist working within complex corporate environments, I began to see a
                  disturbing pattern: brilliant, high-performing individuals who were functionally burnt out.
                  They weren't "sick" in the traditional sense, but they were dependent on stimulants,
                  struggling with brain fog, and losing their vitality.
                </p>
              </FadeInUp>

              <FadeInUp delay={0.4}>
                <p>
                  I realized that modern healthcare is designed for symptom management, not human restoration.
                  We wait until a system breaks before we try to fix it. At Salvere, we've flipped the model.
                  We focus on the bio-individual needs of the human system, ensuring that the body has the
                  nutritional and lifestyle inputs it needs to thrive.
                </p>
              </FadeInUp>

              <FadeInUp delay={0.5}>
                <div className="mt-12 p-10 bg-white rounded-[2.5rem] border border-[var(--vital-green)]/10 shadow-sm relative overflow-hidden group hover:shadow-xl transition-all duration-500">
                  <div className="absolute top-0 left-0 w-2 h-full bg-[var(--vital-green)]" />
                  <Quote className="h-10 w-10 text-[var(--vital-green)] opacity-10 absolute top-8 right-8" />
                  <p className="text-xl text-[#1C1917] font-medium italic relative z-10 leading-relaxed">
                    "When we optimize the individual, the collective thrives.
                    Sustainable health is the only true competitive advantage."
                  </p>
                </div>
              </FadeInUp>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
