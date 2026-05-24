"use client"

import { FadeInUp } from "@/components/motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, FlaskConical, Activity, Lightbulb } from "lucide-react"

const whatWeDo = [
  { icon: FlaskConical, text: "Interpret lab results" },
  { icon: Activity, text: "Identify early patterns" },
  { icon: Lightbulb, text: "Provide structured guidance" },
]

export function CorporateSolutionsSection() {
  return (
    <section className="py-16 lg:py-24 bg-[var(--warm-beige)] overflow-hidden" id="corporate">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Content */}
          <div>
            <FadeInUp>
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[var(--orange)]/10 text-[var(--orange)] text-xs font-bold uppercase tracking-widest mb-6">
                For Organizations
              </div>
            </FadeInUp>
            <FadeInUp delay={0.1}>
              <h2 className="font-serif text-4xl font-medium tracking-tight text-[var(--charcoal)] sm:text-5xl text-balance leading-tight">
                Most organizations invest in employee health screenings. Few translate the results into <span className="text-[var(--orange)]">meaningful action.</span>
              </h2>
            </FadeInUp>

            {/* Flow */}
            <FadeInUp delay={0.2}>
              <div className="mt-10 flex flex-wrap items-center gap-3 text-[var(--charcoal)]/70">
                <span className="px-4 py-2 rounded-full bg-[var(--soft-white)] text-sm font-medium border border-[var(--charcoal)]/5">Employees complete tests</span>
                <ArrowRight className="h-4 w-4 text-[var(--orange)]" />
                <span className="px-4 py-2 rounded-full bg-[var(--soft-white)] text-sm font-medium border border-[var(--charcoal)]/5">Results are delivered</span>
                <ArrowRight className="h-4 w-4 text-[var(--orange)]" />
                <span className="px-4 py-2 rounded-full bg-red-50 text-sm font-medium text-red-600 border border-red-200">No action</span>
              </div>
            </FadeInUp>

            <FadeInUp delay={0.3}>
              <p className="mt-8 text-xl font-serif font-medium text-[var(--charcoal)] italic">
                We bridge the gap between health data and real-life action.
              </p>
            </FadeInUp>

            <FadeInUp delay={0.4}>
              <div className="mt-8 space-y-4">
                {whatWeDo.map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--muted-sage)]/10 text-[var(--muted-sage)]">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <span className="text-lg text-[var(--charcoal)]">{item.text}</span>
                  </div>
                ))}
              </div>
            </FadeInUp>

            <FadeInUp delay={0.5}>
              <p className="mt-8 text-[var(--charcoal)]/70">
                Health screenings are only the first step. Action is what changes outcomes.
              </p>
            </FadeInUp>
            
            <FadeInUp delay={0.6}>
              <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
                <Button variant="vital" size="xl" className="w-full sm:w-auto shadow-xl shadow-orange-600/20" asChild>
                  <Link href="/for-organizations">
                    Explore Corporate Solutions
                  </Link>
                </Button>
                <Button variant="outline" size="xl" className="w-full sm:w-auto border-[var(--charcoal)]/15 text-[var(--charcoal)] hover:bg-white transition-all duration-300" asChild>
                  <Link href="/contact">
                    Request a Consultation
                  </Link>
                </Button>
              </div>
            </FadeInUp>
          </div>

          {/* Right Column: Visual */}
          <div className="order-first lg:order-last">
            <FadeInUp>
              <div className="relative rounded-[3rem] overflow-hidden bg-[var(--charcoal)] p-10 lg:p-12 aspect-square lg:aspect-[4/5] flex flex-col justify-center text-center">
                <div className="absolute inset-0 opacity-10" style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, var(--muted-sage) 1px, transparent 0)`,
                  backgroundSize: '24px 24px'
                }} />
                <div className="relative z-10">
                  <h3 className="font-serif text-3xl lg:text-4xl font-medium text-white italic mb-6 leading-snug">
                    &quot;Organizations that prioritize employee health see reduced turnover, better focus, and increased productivity.&quot;
                  </h3>
                  <div className="mt-8 inline-flex items-center px-4 py-2 rounded-full bg-[var(--orange)]/20 text-[var(--orange)] text-sm font-medium">
                    Invest in your team&apos;s health
                  </div>
                </div>
              </div>
            </FadeInUp>
          </div>
          
        </div>
      </div>
    </section>
  )
}
