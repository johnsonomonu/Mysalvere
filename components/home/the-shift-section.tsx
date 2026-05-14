"use client"

import { FadeInUp } from "@/components/motion"

export function TheShiftSection() {
  return (
    <section className="py-24 lg:py-32 bg-[var(--charcoal)] text-[var(--soft-white)]" id="the-shift">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center mb-24">
          <FadeInUp>
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[var(--orange)]/10 text-[var(--orange)] text-xs font-bold uppercase tracking-widest mb-6 border border-[var(--orange)]/20">
              The Salvere Philosophy
            </div>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <h2 className="font-serif text-5xl lg:text-8xl font-medium tracking-tight text-white mb-8">
              The Shift.
            </h2>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <p className="text-xl lg:text-2xl text-white/60 font-light leading-relaxed max-w-2xl mx-auto">
              Moving from temporary symptom management to sustainable, root-cause health.
            </p>
          </FadeInUp>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-stretch">
          {/* Traditional Cycle */}
          <FadeInUp delay={0.3}>
            <div className="h-full flex flex-col p-8 lg:p-12 rounded-[3rem] bg-white/5 border border-white/10">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--orange)] mb-6">The Traditional Cycle</span>
              <h3 className="text-3xl font-serif text-white mb-8 leading-tight">
                Most people try to fix health issues with temporary solutions.
              </h3>
              <div className="space-y-4 flex-grow">
                {[
                  { title: 'More caffeine', desc: 'Masking exhaustion with stimulants.' },
                  { title: 'More motivation', desc: 'Relying on willpower that eventually fades.' },
                  { title: 'Short-term fixes', desc: 'Targeting symptoms without knowing why they started.' }
                ].map((item, index) => (
                  <div key={index} className="group p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/20 transition-all duration-300">
                    <p className="font-medium text-white group-hover:text-[var(--orange)] transition-colors">{item.title}</p>
                    <p className="text-sm text-white/50 mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeInUp>

          {/* Salvere Way */}
          <FadeInUp delay={0.4}>
            <div className="h-full flex flex-col p-8 lg:p-12 rounded-[3rem] bg-[var(--muted-sage)]/20 border border-[var(--muted-sage)]/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-[var(--orange)]/20 rounded-full blur-[100px]" />
              
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--orange)] mb-6 relative z-10">The Salvere Way</span>
              
              <div className="relative z-10 flex-grow flex flex-col justify-center">
                <blockquote className="mb-12">
                  <p className="font-serif text-3xl lg:text-5xl italic leading-[1.2] text-white">
                    "But the body doesn&apos;t respond to pressure. It responds to <span className="text-[var(--orange)] non-italic underline decoration-[var(--orange)]/30 underline-offset-[12px]">balance</span>."
                  </p>
                </blockquote>
                
                <p className="text-lg lg:text-xl text-white/80 leading-relaxed font-light">
                  When you start eating right, sleeping right and moving right, your energy level improves 
                  and your stress level reduces. And most importantly, we teach you how to make this 
                  improvement sustainable and part of your lifestyle.
                </p>
              </div>
            </div>
          </FadeInUp>
        </div>
      </div>
    </section>
  )
}
