"use client"

import { FadeInUp } from "@/components/motion"

export function TheShiftSection() {
  return (
    <section className="relative py-32 lg:py-48 overflow-hidden text-[#F5F5F4] isolation-auto" id="the-shift">
      {/* Immersive Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#1C1917]/70 z-10" />
        <img 
          src="/images/nature_background.png" 
          alt="Vitality background" 
          className="w-full h-full object-cover object-center scale-105"
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-20">
        <div className="mx-auto max-w-3xl text-center">
          <FadeInUp>
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[var(--vital-green)] text-white text-xs font-bold uppercase tracking-[0.2em] mb-6 shadow-xl shadow-green-900/40">
              The Salvere Philosophy
            </div>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <h2 className="font-serif text-5xl font-medium tracking-tight sm:text-7xl">
              The Shift.
            </h2>
          </FadeInUp>
        </div>

        <div className="mx-auto mt-24 max-w-4xl">
          <FadeInUp delay={0.2}>
            <div className="text-center mb-16">
              <p className="text-xl font-medium text-[var(--vital-green)] uppercase tracking-widest mb-10 opacity-80">Most people try to fix this with:</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { title: 'More caffeine', desc: 'Temporary alertness' },
                  { title: 'More motivation', desc: 'Short-lived willpower' },
                  { title: 'Short-term fixes', desc: 'Surface-level results' }
                ].map((item, index) => (
                  <div key={item.title} className="group flex flex-col items-center p-10 rounded-[2.5rem] bg-white/5 backdrop-blur-md border border-white/10 text-center hover:bg-white/10 hover:border-white/20 transition-all duration-500">
                    <span className="text-[#F5F5F4] font-serif text-xl mb-2">{item.title}</span>
                    <span className="text-[#A8A29E] text-xs font-bold uppercase tracking-widest leading-tight">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeInUp>

          <FadeInUp delay={0.3}>
            <div className="relative py-20 text-center">
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <p className="relative z-10 text-white font-serif text-4xl lg:text-5xl leading-tight italic px-6">
                "But the body doesn&apos;t respond to pressure. It responds to <span className="text-[var(--vital-green)] non-italic underline decoration-[var(--vital-green)]/30 underline-offset-8">balance</span>."
              </p>
            </div>
          </FadeInUp>

          <FadeInUp delay={0.4}>
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-12 rounded-[3.5rem] text-center max-w-2xl mx-auto mt-12">
              <p className="text-xl text-[#A8A29E] leading-relaxed font-light">
                When you start eating right, sleeping right and moving right, your energy level improves 
                and your stress level reduces. We teach you how to make this 
                improvement sustainable and part of your lifestyle.
              </p>
            </div>
          </FadeInUp>
        </div>
      </div>
    </section>
  )
}
