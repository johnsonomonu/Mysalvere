"use client"

import { FadeInUp } from "@/components/motion"
import { User, Building2, Check } from "lucide-react"

export function WhoThisIsForSection() {
  return (
    <section className="py-24 lg:py-32 bg-[#F9FAFB]" id="who-this-is-for">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-20">
          <FadeInUp>
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[var(--vital-mint)] text-[var(--vital-green)] text-xs font-bold uppercase tracking-widest mb-6">
              Who We Serve
            </div>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <h2 className="font-serif text-4xl font-medium tracking-tight text-[#1C1917] sm:text-5xl">
              Who This Is For
            </h2>
          </FadeInUp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {/* Individuals Card */}
          <FadeInUp delay={0.2}>
            <div className="group bg-white rounded-[2.5rem] p-10 border border-transparent hover:border-[var(--vital-green)]/10 shadow-sm hover:shadow-xl transition-all duration-500 h-full">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--vital-mint)] mb-8 transition-colors group-hover:bg-[var(--vital-green)]">
                <User className="h-8 w-8 text-[var(--vital-green)] transition-colors group-hover:text-white" />
              </div>
              <h3 className="font-serif text-3xl font-medium text-[#1C1917] mb-4">
                For Individuals
              </h3>
              <p className="text-lg text-[#57534E] mb-10 font-light">
                Professionals who want to:
              </p>
              <ul className="space-y-5">
                {[
                  "Reduce dependence on supplements and drugs",
                  "Reduce stress and burn-out symptoms",
                  "Manage chronic illnesses and circumstances"
                ].map((item) => (
                  <li key={item} className="flex items-start gap-4 text-[#1C1917]">
                    <div className="mt-1 h-5 w-5 rounded-full bg-[var(--vital-mint)] flex items-center justify-center shrink-0">
                      <Check className="h-3 w-3 text-[var(--vital-green)] font-bold" />
                    </div>
                    <span className="text-base leading-tight font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeInUp>

          {/* Organizations Card */}
          <FadeInUp delay={0.3}>
            <div className="group bg-white rounded-[2.5rem] p-10 border border-transparent hover:border-[var(--vital-green)]/10 shadow-sm hover:shadow-xl transition-all duration-500 h-full">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--vital-mint)] mb-8 transition-colors group-hover:bg-[var(--vital-green)]">
                <Building2 className="h-8 w-8 text-[var(--vital-green)] transition-colors group-hover:text-white" />
              </div>
              <h3 className="font-serif text-3xl font-medium text-[#1C1917] mb-4">
                For Organizations
              </h3>
              <p className="text-lg text-[#57534E] mb-10 font-light">
                Companies that want to:
              </p>
              <ul className="space-y-5">
                {[
                  "Improve employee wellbeing",
                  "Increase focus and productivity",
                  "Build sustainable performance cultures"
                ].map((item) => (
                  <li key={item} className="flex items-start gap-4 text-[#1C1917]">
                    <div className="mt-1 h-5 w-5 rounded-full bg-[var(--vital-mint)] flex items-center justify-center shrink-0">
                      <Check className="h-3 w-3 text-[var(--vital-green)] font-bold" />
                    </div>
                    <span className="text-base leading-tight font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeInUp>
        </div>
      </div>
    </section>
  )
}
