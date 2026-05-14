"use client"

import { FadeInUp } from "@/components/motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export function CorporateSolutionsSection() {
  return (
    <section className="py-16 lg:py-24 bg-[var(--charcoal)] overflow-hidden" id="corporate">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          <div className="order-2 lg:order-1 relative">
            <FadeInUp>
              {/* Abstract pattern for background */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-[var(--orange)]/20 to-transparent rounded-full blur-2xl opacity-50" />
              <div className="relative rounded-[3rem] overflow-hidden border border-white/10 aspect-square lg:aspect-[4/5] bg-[var(--soft-white)]/5 backdrop-blur-sm p-8 flex flex-col justify-center text-center">
                <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, var(--muted-sage) 1px, transparent 0)`,
                  backgroundSize: '24px 24px'
                }} />
                <h3 className="relative font-serif text-3xl font-medium text-white italic mb-6">
                  "Organizations that prioritize employee health see reduced turnover, better focus, and increased productivity."
                </h3>
              </div>
            </FadeInUp>
          </div>

          <div className="order-1 lg:order-2">
            <FadeInUp>
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[var(--orange)]/10 text-[var(--orange)] text-xs font-bold uppercase tracking-widest mb-6">
                Corporate Solutions
              </div>
            </FadeInUp>
            <FadeInUp delay={0.1}>
              <h2 className="font-serif text-4xl font-medium tracking-tight text-white sm:text-5xl text-balance">
                Healthy teams perform better.
              </h2>
            </FadeInUp>
            <FadeInUp delay={0.2}>
              <p className="mt-6 text-xl leading-relaxed text-white/70 font-light">
                Our Corporate Wellness Programs are structured to help your team perform at their best without burning out. We provide practical workshops, group coaching, and sustainable health strategies designed for busy professionals.
              </p>
            </FadeInUp>
            
            <FadeInUp delay={0.3}>
              <div className="mt-12 flex flex-col sm:flex-row items-center gap-5">
                <Button variant="vital" size="xl" className="w-full sm:w-auto shadow-2xl shadow-orange-600/20" asChild>
                  <Link href="/corporate">
                    Partner with Us
                  </Link>
                </Button>
                <Button variant="outline" size="xl" className="w-full sm:w-auto border-white/20 text-white hover:bg-white hover:text-[var(--charcoal)] transition-all duration-300" asChild>
                  <Link href="/services#corporate">
                    View Programs
                  </Link>
                </Button>
              </div>
            </FadeInUp>
          </div>
          
        </div>
      </div>
    </section>
  )
}
