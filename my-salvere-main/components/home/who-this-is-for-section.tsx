"use client"

import { FadeInUp, StaggerChildren, StaggerItem, staggerItemVariants } from "@/components/motion"
import { 
  User,
  Building2
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookSessionButton } from "@/components/book-session-button"


const conditions = [
  {
    title: "Digestive & Gut Health",
    description: "Bloating, constipation, reflux, or ongoing digestive discomfort — especially when symptoms persist despite treatment.",
    icon: "🧩"
  },
  {
    title: "Metabolic Health",
    description: "Weight challenges, blood sugar imbalance, or insulin resistance — where daily habits play a key role.",
    icon: "🧩"
  },
  {
    title: "Heart & Cardiovascular Health",
    description: "Early changes in blood pressure, cholesterol, or circulation that require deeper lifestyle understanding.",
    icon: "🧩"
  },
  {
    title: "Hormonal Health",
    description: "Hormonal imbalances affecting weight, energy, mood, acne, irregular cycles, hair loss, insulin resistances, PCOS — often influenced by lifestyle patterns.",
    icon: "🧩"
  },
  {
    title: "Fertility, Pregnancy & Postpartum",
    description: "Support during preconception, pregnancy, or postpartum — with a focus on nutrition, stability, and overall health.",
    icon: "🧩"
  },
  {
    title: "Neurological & Brain Health",
    description: "Neurological instability — where hydration, nutrition, and internal balance matter.",
    icon: "🧩"
  },
  {
    title: "Stress, Sleep & Mental Wellbeing",
    description: "Anxiety, poor sleep, or chronic stress — especially when there are underlying physiological contributors.",
    icon: "🧩"
  },
  {
    title: "Early Lab Abnormalities",
    description: "Kidney, liver, blood markers, or other results that are “slightly off” — but not clearly explained.",
    icon: "🧩"
  },
  {
    title: "Chronic & Inflammatory Conditions",
    description: "Ongoing conditions where symptoms are managed, but root patterns are not fully addressed.",
    icon: "🧩"
  },
  {
    title: "Unexplained or Persistent Symptoms",
    description: "When everything appears “normal,” but you still don’t feel well — and need a deeper, structured approach.",
    icon: "🧩"
  }
]

export function WhoThisIsForSection() {
  return (
    <section className="py-24 lg:py-32 bg-[var(--warm-beige)]" id="who-this-is-for">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-20">
          <FadeInUp>
            <h2 className="label-caps mb-4">Who We Help</h2>
            <h3 className="font-serif text-4xl lg:text-5xl font-medium text-[var(--charcoal)] mb-6">
              Does any of these describe your current realities?
            </h3>
          </FadeInUp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {conditions.map((condition, index) => (
            <FadeInUp key={condition.title} delay={0.05 * index}>
              <div className="bg-[var(--soft-white)] p-8 rounded-3xl border border-[var(--charcoal)]/5 h-full flex flex-col hover:shadow-xl transition-all duration-300">
                <div className="text-3xl mb-4">{condition.icon}</div>
                <h4 className="text-xl font-bold text-[var(--charcoal)] mb-4">{condition.title}</h4>
                <p className="text-[var(--charcoal)]/70 leading-relaxed">{condition.description}</p>
              </div>
            </FadeInUp>
          ))}
        </div>

        <div className="mt-20 text-center">
          <FadeInUp>
            <p className="text-2xl font-serif text-[var(--charcoal)] mb-10">If you see yourself in any of these...</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <BookSessionButton size="xl" className="w-full sm:w-auto bg-[var(--orange)] hover:bg-[var(--orange-hover)] text-white shadow-xl shadow-orange-600/20">
                Book a Discovery Call
              </BookSessionButton>
              <Button variant="outline" size="xl" className="w-full sm:w-auto bg-white border-[var(--charcoal)]/20 text-[var(--charcoal)] hover:bg-[var(--warm-beige)] transition-all duration-300" asChild>
                <Link href="/assessment">
                  Take Assessment
                </Link>
              </Button>
            </div>
          </FadeInUp>
        </div>
      </div>
    </section>
  )
}
