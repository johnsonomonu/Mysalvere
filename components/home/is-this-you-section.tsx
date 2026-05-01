"use client"

import { FadeInUp, StaggerChildren, StaggerItem, staggerItemVariants } from "@/components/motion"
import { 
  HeartPulse,
  Zap,
  Scale,
  Brain,
  Moon,
  Activity
} from "lucide-react"

const points = [
  { 
    icon: HeartPulse, 
    title: "Chronic health issues", 
    description: "Like Diabetes, Hypertension, High Blood Pressure, and you depend on medication and supplements on a regular basis." 
  },
  { 
    icon: Zap, 
    title: "Low Energy", 
    description: "You rely on coffee to get through the day, and you’re always feeling tired and stressed." 
  },
  { 
    icon: Scale, 
    title: "Stubborn weight gain", 
    description: "You’re exercising, you’re not overeating, but the weight just won’t shift." 
  },
  { 
    icon: Brain, 
    title: "Brain fog", 
    description: "Reduced focus and mental clarity, forgetting things easily, your mind just doesn’t feel sharp." 
  },
  { 
    icon: Moon, 
    title: "Poor sleep", 
    description: "You struggle to fall asleep, and even when you do, you wake up tired." 
  },
  { 
    icon: Activity, 
    title: "Hormonal imbalance", 
    description: "Mood swings, irregular or painful cycles, low libido, hot flashes, or changes you can’t quite explain." 
  },
]

export function IsThisYouSection() {
  return (
    <section className="py-16 lg:py-24 bg-[var(--soft-white)]" id="about">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <FadeInUp>
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[var(--warm-beige)] text-[var(--muted-sage)] text-xs font-bold uppercase tracking-widest mb-6 border border-[var(--muted-sage)]/20">
              Who We Help
            </div>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <h2 className="font-serif text-4xl font-medium tracking-tight text-[var(--charcoal)] sm:text-5xl text-balance">
              Is This You?
            </h2>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <p className="mt-6 text-xl leading-8 text-[var(--charcoal)]/70">
              Over 65% of Nigerians have 1 or more of these chronic issues;
            </p>
          </FadeInUp>
        </div>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {points.map((point) => (
            <StaggerItem key={point.title} variants={staggerItemVariants} className="h-full">
              <div className="flex flex-col h-full bg-white rounded-[2rem] p-8 shadow-sm border border-[var(--muted-sage)]/5 hover:border-[var(--orange)]/20 hover:shadow-md transition-all duration-300 group">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--warm-beige)] text-[var(--muted-sage)] group-hover:bg-[var(--orange)] group-hover:text-white transition-colors duration-300 mb-6">
                  <point.icon className="h-5 w-5" />
                </div>
                <h3 className="font-serif text-xl font-medium text-[var(--charcoal)] mb-3 leading-tight">
                  {point.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-[var(--charcoal)]/70">
                  {point.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  )
}
