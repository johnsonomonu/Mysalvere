"use client"

import { FadeInUp } from "@/components/motion"
import { 
  Activity, 
  Brain, 
  Moon, 
  Scale, 
  Zap, 
  HeartPulse 
} from "lucide-react"

const symptoms = [
  {
    icon: HeartPulse,
    title: "Chronic health issues",
    description: "Diabetes, Hypertension, High Blood Pressure, and you depend on medication and supplements on a regular basis."
  },
  {
    icon: Zap,
    title: "Low Energy",
    description: "You rely on coffee to get through the day, and you're always feeling tired and stressed."
  },
  {
    icon: Scale,
    title: "Stubborn weight gain",
    description: "You're exercising, you're not overeating, but the weight just won't shift."
  },
  {
    icon: Brain,
    title: "Brain fog",
    description: "Reduced focus and mental clarity, forgetting things easily, your mind just doesn't feel sharp."
  },
  {
    icon: Moon,
    title: "Poor sleep",
    description: "You struggle to fall asleep, and even when you do, you wake up tired."
  },
  {
    icon: Activity,
    title: "Hormonal imbalance",
    description: "Mood swings, irregular or painful cycles, low libido, hot flashes, or changes you can't quite explain."
  },
]

export function IsThisYouSection() {
  return (
    <section className="py-24 lg:py-32 bg-[#F9FAFB]" id="about">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <FadeInUp>
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[var(--vital-mint)] text-[var(--vital-green)] text-xs font-bold uppercase tracking-widest mb-6">
              Does This Sound Familiar?
            </div>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <h2 className="font-serif text-4xl font-medium tracking-tight text-[#1C1917] sm:text-5xl text-balance">
              Is This You?
            </h2>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <p className="mt-6 text-xl leading-8 text-[#57534E]">
              You&apos;re not alone. These are the most common challenges we help our 
              clients overcome.
            </p>
          </FadeInUp>
        </div>

        <div className="mx-auto mt-20 grid max-w-6xl grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {symptoms.map((symptom, index) => (
            <FadeInUp key={symptom.title} delay={0.1 + index * 0.05} className="h-full">
              <div className="h-full group relative rounded-[2rem] bg-white p-10 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(22,163,74,0.08)] border border-transparent hover:border-[var(--vital-green)]/10">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--vital-mint)] transition-colors group-hover:bg-[var(--vital-green)]">
                  <symptom.icon className="h-8 w-8 text-[var(--vital-green)] transition-colors group-hover:text-white" />
                </div>
                <h3 className="mt-8 font-serif text-2xl font-medium text-[#1C1917]">
                  {symptom.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-[#57534E]">
                  {symptom.description}
                </p>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  )
}
