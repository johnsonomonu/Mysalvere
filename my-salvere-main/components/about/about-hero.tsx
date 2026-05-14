"use client"

import { FadeInUp } from "@/components/motion"
import { ArrowDown } from "lucide-react"

export function AboutHero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white isolation-auto">
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <FadeInUp>
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[var(--vital-green)]/10 text-[var(--vital-green)] text-xs font-bold uppercase tracking-widest mb-10">
              The Salvere Mission
            </div>
          </FadeInUp>
          
          <FadeInUp delay={0.1}>
            <h1 className="font-serif text-6xl font-medium tracking-tight text-[#1C1917] sm:text-8xl leading-[1.05]">
              Restoring <span className="text-[var(--vital-green)]">Vitality.</span> <br />
              Reclaiming <span className="underline decoration-[var(--vital-green)]/30 underline-offset-8">Humanity.</span>
            </h1>
          </FadeInUp>
          
          <FadeInUp delay={0.2}>
            <p className="mt-12 text-2xl text-[#57534E] leading-relaxed font-light mx-auto max-w-3xl">
              Healing is not just the <span className="italic font-medium text-[#1C1917]">absence of illness</span>, but the presence of life-force and sustainable performance.
            </p>
          </FadeInUp>
          
          <FadeInUp delay={0.3}>
            <div className="mt-16 flex flex-col items-center gap-6">
              <div className="flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-[#1C1917]">
                <span className="h-0.5 w-12 bg-[var(--vital-green)]" />
                Our Story Below
                <ArrowDown className="h-4 w-4 text-[var(--vital-green)] animate-bounce" />
              </div>
            </div>
          </FadeInUp>
        </div>
      </div>
    </section>
  )
}
