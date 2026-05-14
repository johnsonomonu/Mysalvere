"use client"

import { FadeInUp } from "@/components/motion"
import { FlaskConical, Microscope, Zap, ShieldCheck } from "lucide-react"

export function WhyItMattersSection() {
  return (
    <section className="py-24 lg:py-32 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Left Column: Image Richness */}
          <FadeInUp className="relative">
            <div className="relative aspect-square rounded-[3.52rem] overflow-hidden shadow-2xl">
              <img 
                src="/images/science_wellness.png" 
                alt="Science backed wellness" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[var(--vital-green)]/20 to-transparent mix-blend-overlay" />
            </div>
            
            {/* Floating Stats Card */}
            <div className="absolute -bottom-10 -right-10 bg-white p-8 rounded-3xl shadow-xl border border-[var(--vital-green)]/10 max-w-xs hidden lg:block">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 rounded-2xl bg-[var(--vital-mint)] flex items-center justify-center">
                  <Zap className="h-6 w-6 text-[var(--vital-green)]" />
                </div>
                <div>
                  <p className="text-2xl font-serif font-bold text-[#1C1917]">90%</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#A8A29E]">Energy Increase</p>
                </div>
              </div>
              <p className="text-sm text-[#57534E] leading-relaxed">
                Reported by clients within the first 60 days of following our restoration protocol.
              </p>
            </div>
          </FadeInUp>

          {/* Right Column: Content */}
          <div className="lg:pl-10">
            <FadeInUp>
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[var(--vital-green)]/10 text-[var(--vital-green)] text-xs font-bold uppercase tracking-widest mb-6">
                Data Driven Health
              </div>
            </FadeInUp>
            
            <FadeInUp delay={0.1}>
              <h2 className="font-serif text-4xl font-medium tracking-tight text-[#1C1917] sm:text-5xl leading-tight mb-8 text-balance">
                The Science of <span className="text-[var(--vital-green)]">Restoration.</span>
              </h2>
            </FadeInUp>
            
            <FadeInUp delay={0.2}>
              <p className="text-xl text-[#57534E] leading-relaxed font-light mb-12">
                We don't guess. We use comprehensive functional testing and nutritional analysis 
                to understand exactly where your system is lagging.
              </p>
            </FadeInUp>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              <div className="space-y-4">
                <div className="h-10 w-10 text-[var(--vital-green)]">
                  <FlaskConical className="h-10 w-10" />
                </div>
                <h3 className="text-lg font-bold text-[#1C1917]">Root Cause Analysis</h3>
                <p className="text-sm text-[#57534E] leading-relaxed">
                  Moving beyond surface symptoms to identify metabolic and hormonal imbalances.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="h-10 w-10 text-[var(--vital-green)]">
                  <ShieldCheck className="h-10 w-10" />
                </div>
                <h3 className="text-lg font-bold text-[#1C1917]">Bio-Individual Plans</h3>
                <p className="text-sm text-[#57534E] leading-relaxed">
                  Protocols designed specifically for your unique biology and lifestyle.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
