"use client"

import { FadeInUp } from "@/components/motion"
import { BookSessionButton } from "@/components/book-session-button"
import Image from "next/image"
import { CheckCircle2, Heart, Shield, Activity, Users } from "lucide-react"

const whoThisIsFor = [
  "You've been diagnosed with a chronic condition and want to know what you can do alongside your medication.",
  "You've done tests and the results are 'normal', but you still don't feel well.",
  "You're tired of piecing together advice from the internet and want a structured, evidence-based plan.",
  "You're a busy professional who wants to optimize your health without complicated, unsustainable routines.",
]

export function AboutContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-24 bg-[var(--soft-white)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <FadeInUp>
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[var(--orange)]/10 text-[var(--orange)] text-xs font-bold uppercase tracking-widest mb-8">
              Our Story
            </div>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <h1 className="font-serif text-5xl font-medium tracking-tight text-[var(--charcoal)] sm:text-7xl leading-tight">
              The Story Behind <span className="text-[var(--orange)]">Salvere</span>
            </h1>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <p className="mt-8 text-2xl font-serif text-[var(--charcoal)]/80 italic max-w-2xl mx-auto">
              "To be healthy, you have to be whole."
            </p>
          </FadeInUp>
        </div>
      </section>

      {/* Main Story Content */}
      <section className="py-16 lg:py-24 bg-[var(--warm-beige)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            {/* Left: Sticky Image / Info */}
            <div className="lg:col-span-5">
              <FadeInUp className="lg:sticky lg:top-32 space-y-8">
                <div className="relative rounded-[2.5rem] overflow-hidden aspect-square shadow-xl">
                  {/* Founder Image */}
                  <Image 
                    src="/about-ceo.jpg" 
                    alt="Salvere Founder" 
                    fill 
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-[var(--charcoal)]/10 mix-blend-multiply" />
                </div>
                
                <div className="bg-[var(--soft-white)] p-8 rounded-[2.5rem] shadow-sm border border-[var(--charcoal)]/5">
                  <h3 className="font-serif text-2xl font-medium text-[var(--charcoal)] mb-4">Why "Salvere"?</h3>
                  <p className="text-[var(--charcoal)]/70 leading-relaxed">
                    Salvere is a Latin word that means <span className="text-[var(--orange)] font-medium">"to be well, to be in good health."</span> 
                    <br /><br />
                    It represents our core belief: that true health goes beyond the absence of disease—it is about functioning at your highest level.
                  </p>
                </div>
              </FadeInUp>
            </div>

            {/* Right: Story Text */}
            <div className="lg:col-span-7 space-y-16">
              <FadeInUp>
                <div className="prose prose-lg prose-slate max-w-none">
                  <p className="text-xl leading-relaxed text-[var(--charcoal)]/80 mb-8">
                    I spent years working as a clinical pharmacist, dispensing medications and helping people manage chronic conditions. But over time, I noticed a recurring pattern: many of the people picking up medications were returning months later, not with better health, but with higher doses or new prescriptions.
                  </p>
                  <p className="text-lg leading-relaxed text-[var(--charcoal)]/70 mb-8">
                    The medications were doing their job—managing the symptoms—but the underlying drivers of the conditions (how people lived, ate, slept, and managed stress) were completely ignored.
                  </p>
                </div>
              </FadeInUp>

              <FadeInUp delay={0.1}>
                <h2 className="font-serif text-3xl font-medium text-[var(--charcoal)] mb-6">A Personal Journey</h2>
                <div className="prose prose-lg prose-slate max-w-none">
                  <p className="text-lg leading-relaxed text-[var(--charcoal)]/70 mb-8">
                    This reality hit home during my own pregnancy. Despite knowing exactly what medications to take, I faced significant complications that couldn't be solved by prescriptions alone. It was then I realized that true healing required looking at the body as an interconnected system.
                  </p>
                  <p className="text-lg leading-relaxed text-[var(--charcoal)]/70">
                    I had to dig deeper into how my daily habits, environment, and nutrition were affecting my physiological state. When I applied this systems-level approach to my own life, the shift was undeniable.
                  </p>
                </div>
              </FadeInUp>

              <FadeInUp delay={0.2}>
                <h2 className="font-serif text-3xl font-medium text-[var(--charcoal)] mb-6">From Practice to Purpose</h2>
                <div className="prose prose-lg prose-slate max-w-none bg-[var(--charcoal)] text-[var(--soft-white)] p-10 rounded-[2.5rem]">
                  <p className="text-lg leading-relaxed text-white/80 mb-6">
                    In 2020, I started helping other women apply these same principles. What started as informal guidance quickly grew. The results were clear: when you give the body the right conditions, it responds.
                  </p>
                  <p className="text-lg leading-relaxed text-white/80">
                    This led to the creation of Salvere. Today, we work with both individuals and corporate organizations, helping them translate clinical results and health data into practical, daily actions that restore balance and performance.
                  </p>
                </div>
              </FadeInUp>

              <FadeInUp delay={0.3}>
                <h2 className="font-serif text-3xl font-medium text-[var(--charcoal)] mb-6">The Salvere Approach</h2>
                <div className="prose prose-lg prose-slate max-w-none">
                  <p className="text-lg leading-relaxed text-[var(--charcoal)]/70 mb-8">
                    We do not diagnose or treat diseases. Instead, we connect the dots between your habits, your environment, your clinical lab results, and how you feel. We look for patterns—imbalances in digestion, metabolic health, or stress resilience—and provide structured, actionable steps to address them.
                  </p>
                </div>
                
                <div className="bg-[var(--muted-sage)]/10 p-8 rounded-[2rem] border border-[var(--muted-sage)]/20 mt-8">
                  <div className="flex items-start gap-4">
                    <Shield className="h-6 w-6 text-[var(--muted-sage)] shrink-0 mt-1" />
                    <div>
                      <h3 className="font-serif text-xl font-medium text-[var(--charcoal)] mb-2">Working Alongside Your Care</h3>
                      <p className="text-[var(--charcoal)]/70 leading-relaxed">
                        If you are currently under medical supervision, we work alongside your primary physician. While they manage the disease and medication, we manage the lifestyle drivers that support your recovery.
                      </p>
                    </div>
                  </div>
                </div>
              </FadeInUp>
            </div>

          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="py-16 lg:py-24 bg-[var(--soft-white)]">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <FadeInUp>
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl font-medium tracking-tight text-[var(--charcoal)] sm:text-5xl">
                Who This Is For
              </h2>
            </div>
          </FadeInUp>
          
          <div className="space-y-6">
            {whoThisIsFor.map((item, i) => (
              <FadeInUp key={i} delay={0.1 * i}>
                <div className="flex items-center gap-6 p-6 lg:p-8 rounded-[2rem] bg-white border border-[var(--charcoal)]/5 shadow-sm hover:shadow-md hover:border-[var(--orange)]/20 transition-all duration-300">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--warm-beige)] text-[var(--orange)]">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <p className="text-lg text-[var(--charcoal)]/80 leading-relaxed">
                    {item}
                  </p>
                </div>
              </FadeInUp>
            ))}
          </div>

          <FadeInUp delay={0.5}>
            <div className="mt-16 text-center">
              <p className="text-xl font-serif italic text-[var(--charcoal)]/70 mb-8">
                If this sounds like you, let's talk.
              </p>
              <BookSessionButton size="xl" className="shadow-xl">
                Book a Discovery Call
              </BookSessionButton>
            </div>
          </FadeInUp>
        </div>
      </section>
    </>
  )
}
