"use client"

import { FadeInUp, StaggerChildren, StaggerItem, staggerItemVariants } from "@/components/motion"
import { ClipboardList, Activity, Heart, ArrowDown, FileText, Calendar } from "lucide-react"

const whatWeAssess = [
  { icon: Activity, title: "Metabolic and Energy Patterns", desc: "Understanding how your body uses fuel." },
  { icon: Heart, title: "Digestive and Gut Function", desc: "Tracking ongoing discomfort or irregularities." },
  { icon: FileText, title: "Stress, Sleep, and Recovery", desc: "How well your body resets each day." },
  { icon: ClipboardList, title: "Hormonal and Inflammatory Markers", desc: "Identifying subtle signs of imbalance." }
]

export function AssessmentIntro() {
  const scrollToAssessment = () => {
    document.getElementById('assessment-wizard')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-24 bg-[var(--soft-white)] overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[var(--orange)]/5 rounded-full blur-[120px] -mr-32 -mt-32" />
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center relative z-10">
          <FadeInUp>
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[var(--orange)]/10 text-[var(--orange)] text-xs font-bold uppercase tracking-widest mb-8">
              Health Assessment
            </div>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <h1 className="font-serif text-5xl font-medium tracking-tight text-[var(--charcoal)] sm:text-6xl leading-tight">
              Understand What Your Body May Be <span className="text-[var(--orange)]">Telling You.</span>
            </h1>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <p className="mt-8 text-xl text-[var(--charcoal)]/70 leading-relaxed font-light">
              Symptoms don't happen by accident — they are patterns. This assessment helps us identify what those patterns mean for your health.
            </p>
          </FadeInUp>
          <FadeInUp delay={0.3}>
            <button 
              onClick={scrollToAssessment}
              className="mt-10 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[var(--charcoal)] text-white hover:bg-[var(--orange)] transition-colors duration-300 font-medium"
            >
              Start the Assessment
              <ArrowDown className="h-4 w-4 animate-bounce" />
            </button>
          </FadeInUp>
        </div>
      </section>

      {/* Details */}
      <section className="py-16 lg:py-24 bg-[var(--warm-beige)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            
            <FadeInUp>
              <div className="bg-[var(--soft-white)] rounded-[2.5rem] p-10 border border-[var(--charcoal)]/5 h-full">
                <h2 className="font-serif text-3xl font-medium text-[var(--charcoal)] mb-6">What This Assessment Does</h2>
                <p className="text-[var(--charcoal)]/70 text-lg leading-relaxed mb-8">
                  This is not a diagnostic tool. It is an analytical survey designed to group your symptoms, habits, and history into a cohesive picture of your physiological state.
                </p>
                <h3 className="font-bold text-[var(--muted-sage)] uppercase tracking-widest text-sm mb-6">What We Assess:</h3>
                <ul className="space-y-6">
                  {whatWeAssess.map((item, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--warm-beige)] text-[var(--charcoal)]">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-[var(--charcoal)]">{item.title}</p>
                        <p className="text-sm text-[var(--charcoal)]/60">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeInUp>

            <div className="space-y-8">
              <FadeInUp delay={0.1}>
                <div className="bg-[var(--charcoal)] rounded-[2.5rem] p-10 text-white">
                  <h2 className="font-serif text-2xl font-medium mb-4">Why This Matters</h2>
                  <p className="text-white/70 leading-relaxed">
                    Many people live with low energy, poor sleep, digestive issues, or stubborn weight because they think it's "normal." It isn't. By understanding your patterns, we can determine the exact lifestyle adjustments you need.
                  </p>
                </div>
              </FadeInUp>
              
              <FadeInUp delay={0.2}>
                <div className="bg-[var(--soft-white)] rounded-[2.5rem] p-10 border border-[var(--charcoal)]/5">
                  <h2 className="font-serif text-2xl font-medium text-[var(--charcoal)] mb-6">What You'll Receive</h2>
                  <div className="flex items-start gap-4">
                    <div className="h-2 w-2 rounded-full bg-[var(--orange)] mt-2 shrink-0" />
                    <p className="text-[var(--charcoal)]/70 leading-relaxed">
                      A summary of your primary health patterns and an immediate recommendation on the best next step (e.g., Discovery Call or Blueprint Session).
                    </p>
                  </div>
                </div>
              </FadeInUp>

              <FadeInUp delay={0.3}>
                <div className="bg-[var(--muted-sage)]/10 rounded-[2.5rem] p-10 border border-[var(--muted-sage)]/20">
                  <h2 className="font-serif text-2xl font-medium text-[var(--charcoal)] mb-6 flex items-center gap-3">
                    <Calendar className="h-6 w-6 text-[var(--muted-sage)]" />
                    What Happens After
                  </h2>
                  <p className="text-[var(--charcoal)]/70 leading-relaxed">
                    You can book a session directly from your results page to review your findings in detail with our experts.
                  </p>
                </div>
              </FadeInUp>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
