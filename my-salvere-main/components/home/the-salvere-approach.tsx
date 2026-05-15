"use client"

import { FadeInUp } from "@/components/motion"
import { Activity, Apple, FlaskConical, Stethoscope, HeartHandshake } from "lucide-react"

const pillars = [
  {
    icon: FlaskConical,
    title: "Comprehensive Functional Testing",
    description: "We go beyond regular lab interpretations to reveal systemic imbalances, nutrient deficiencies, and root causes.",
  },
  {
    icon: Apple,
    title: "Nutrition",
    description: "Local, whole-food strategies that rebuilds your body. Personalized for your unique body chemistry goal and health challenges.",
  },
  {
    icon: Activity,
    title: "Research backed Supplementation",
    description: "Address deficiencies, support detoxification, and optimize body functions.",
  },
  {
    icon: Stethoscope,
    title: "Metabolic & Hormonal Balance",
    description: "Helping your body regulate important body systems that support the heart, blood sugar, thyroid, sex hormones and cortisol.",
  },
  {
    icon: HeartHandshake,
    title: "Ongoing Expert Guidance",
    description: "Regular check-ins, thoughtful adjustments, and ongoing support to help you stay consistent and make real progress.",
  },
]

export function TheSalvereApproachSection() {
  return (
    <section className="py-24 lg:py-32 bg-[var(--warm-beige)]" id="the-approach">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="label-caps mb-4">The Salvere Approach</h2>
          <h3 className="font-serif text-4xl lg:text-5xl font-medium text-[var(--charcoal)] mb-8">
            Your health is not defined by a single result, symptom, or diagnosis. <span className="text-[var(--orange)]">It is shaped by patterns.</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center bg-[var(--soft-white)] rounded-[3rem] p-8 lg:p-16 shadow-sm border border-[var(--charcoal)]/5">
          
          {/* Left: Traditional vs Salvere */}
          <div className="space-y-12">
            <div>
              <h4 className="text-xl font-bold uppercase tracking-widest text-[var(--muted-sage)] mb-6">Most approaches focus on:</h4>
              <ul className="space-y-4">
                {["Isolated lab values", "Individual symptoms", "Short-term fixes"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-lg text-[var(--charcoal)]/70">
                    <span className="h-2 w-2 rounded-full bg-[var(--muted-sage)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 bg-[var(--muted-sage)]/10 rounded-2xl border border-[var(--muted-sage)]/20">
              <h4 className="text-xl font-bold uppercase tracking-widest text-[var(--muted-sage)] mb-6">At Salvere, we connect:</h4>
              <ul className="space-y-4">
                {["Lab results", "Lifestyle & habits", "Nutrition & hydration", "Body patterns"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-lg font-medium text-[var(--charcoal)]">
                    <span className="h-2 w-2 rounded-full bg-[var(--orange)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-bold uppercase tracking-widest text-[var(--muted-sage)] mb-6">To understand:</h4>
              <ul className="space-y-4">
                {["What is happening", "Why it is happening", "What to do next"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-lg font-bold text-[var(--charcoal)]">
                    <span className="text-[var(--orange)]">👉</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Flow Visualization */}
          <div className="relative flex flex-col items-center justify-center space-y-8">
            <div className="absolute inset-0 bg-[var(--muted-sage)]/5 rounded-[2rem] -rotate-2" />
            
            {[
              { label: "Lab Results", icon: "🔬" },
              { label: "Daily Habits", icon: "🥗" },
              { label: "Body Patterns", icon: "📊" },
              { label: "Action Plan", icon: "📝", featured: true }
            ].map((step, index, array) => (
              <div key={step.label} className="relative z-10 flex flex-col items-center">
                <FadeInUp delay={0.1 * index}>
                  <div className={`
                    w-64 py-6 rounded-2xl flex flex-col items-center justify-center shadow-md border transition-all duration-300
                    ${step.featured 
                      ? "bg-[var(--orange)] border-[var(--orange)] text-white scale-110 shadow-orange-500/20" 
                      : "bg-white border-[var(--muted-sage)]/20 text-[var(--charcoal)]"}
                  `}>
                    <span className="text-3xl mb-2">{step.icon}</span>
                    <span className="font-bold uppercase tracking-wider">{step.label}</span>
                  </div>
                </FadeInUp>
                {index < array.length - 1 && (
                  <FadeInUp delay={0.1 * index + 0.05}>
                    <div className="h-8 w-px bg-gradient-to-b from-[var(--muted-sage)] to-transparent my-2" />
                    <div className="text-[var(--muted-sage)] text-xl animate-bounce">↓</div>
                  </FadeInUp>
                )}
              </div>
            ))}
          </div>

        </div>

        <FadeInUp delay={0.5} className="mt-16 text-center">
          <p className="text-2xl font-serif italic text-[var(--charcoal)]">
            "When these pieces are connected, your next steps become clear."
          </p>
        </FadeInUp>
      </div>
    </section>
  )
}
