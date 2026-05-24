"use client"

import { FadeInUp, StaggerChildren, StaggerItem, staggerItemVariants } from "@/components/motion"
import { 
  Heart,
  Activity,
  HeartPulse,
  Zap,
  Baby,
  Brain,
  Moon,
  FlaskConical,
  Flame,
  HelpCircle
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookSessionButton } from "@/components/book-session-button"

const conditions = [
  {
    icon: Heart,
    title: "Digestive and Gut Health",
    description: "Bloating, constipation, reflux, or ongoing digestive discomfort, especially when symptoms persist despite treatment."
  },
  {
    icon: Activity,
    title: "Metabolic Health",
    description: "Weight challenges, blood sugar imbalance, or insulin resistance, where daily habits play a key role."
  },
  {
    icon: HeartPulse,
    title: "Heart and Cardiovascular Health",
    description: "Early changes in blood pressure, cholesterol, or circulation that require deeper lifestyle understanding."
  },
  {
    icon: Zap,
    title: "Hormonal Health",
    description: "Hormonal imbalances affecting weight, energy, mood, acne, irregular cycles, hair loss, insulin resistance, and PCOS."
  },
  {
    icon: Baby,
    title: "Fertility, Pregnancy, and Postpartum",
    description: "Support during preconception, pregnancy, or postpartum, with a focus on nutrition, stability, and overall health."
  },
  {
    icon: Brain,
    title: "Neurological and Brain Health",
    description: "Neurological instability where hydration, nutrition, and internal balance matter."
  },
  {
    icon: Moon,
    title: "Stress, Sleep, and Mental Wellbeing",
    description: "Anxiety, poor sleep, or chronic stress, especially when there are underlying physiological contributors."
  },
  {
    icon: FlaskConical,
    title: "Early Lab Abnormalities",
    description: "Kidney, liver, blood markers, or other results that are slightly off but not clearly explained."
  },
  {
    icon: Flame,
    title: "Chronic and Inflammatory Conditions",
    description: "Ongoing conditions where symptoms are managed but root patterns are not fully addressed."
  },
  {
    icon: HelpCircle,
    title: "Unexplained or Persistent Symptoms",
    description: "When everything appears normal but you still don't feel well, and need a deeper, structured approach."
  },
]

export function WhoWeHelpSection() {
  return (
    <section className="py-16 lg:py-24 bg-[var(--warm-beige)]" id="who-we-help">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <FadeInUp>
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[var(--orange)]/10 text-[var(--orange)] text-xs font-bold uppercase tracking-widest mb-6">
              Who We Help
            </div>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <h2 className="font-serif text-4xl font-medium tracking-tight text-[var(--charcoal)] sm:text-5xl text-balance">
              Does any of these describe your current realities?
            </h2>
          </FadeInUp>
        </div>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {conditions.map((condition) => (
            <StaggerItem key={condition.title} variants={staggerItemVariants} className="h-full">
              <div className="flex flex-col h-full bg-[var(--soft-white)] rounded-[2rem] p-8 shadow-sm border border-[var(--charcoal)]/5 hover:border-[var(--orange)]/20 hover:shadow-md transition-all duration-300 group">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--warm-beige)] text-[var(--muted-sage)] group-hover:bg-[var(--orange)] group-hover:text-white transition-colors duration-300 mb-6">
                  <condition.icon className="h-5 w-5" />
                </div>
                <h3 className="font-serif text-xl font-medium text-[var(--charcoal)] mb-3 leading-tight group-hover:text-[var(--orange)] transition-colors duration-300">
                  {condition.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-[var(--charcoal)]/70">
                  {condition.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>

        <FadeInUp delay={0.6}>
          <div className="mt-12 text-center">
            <p className="text-xl text-[var(--charcoal)]/70 mb-8 font-serif italic">
              If you see yourself in any of these...
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <BookSessionButton size="xl" className="w-full sm:w-auto shadow-xl shadow-orange-600/20">
                Discovery Call
              </BookSessionButton>
              <Button variant="outline" size="xl" className="w-full sm:w-auto bg-[var(--soft-white)] border-[var(--charcoal)]/15 text-[var(--charcoal)] hover:bg-white transition-all duration-300" asChild>
                <Link href="/assessment">
                  Take Assessment
                </Link>
              </Button>
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  )
}
