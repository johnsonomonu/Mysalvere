"use client"

import { FadeInUp } from "@/components/motion"
import { CheckCircle2, Apple, Heart, Activity } from "lucide-react"

const benefits = [
  {
    title: "Whole-Food Nutritional Strategies",
    description: "Move away from restrictive diets. We focus on local, nutrient-dense foods that support your specific metabolic needs and hormonal balance.",
    image: "/images/functional_nutrition.png",
    icon: Apple
  },
  {
    title: "Root-Cause Consultation",
    description: "Every session is designed to peel back the layers of your health history. We help you understand the 'why' behind your symptoms.",
    image: "/images/wellness_consultation.png",
    icon: Activity
  },
  {
    title: "Consistent Support Network",
    description: "You're never alone in your journey. Our bi-weekly check-ins and community access provide the motivation and accountability needed for lasting change.",
    image: "/images/burnout_recovery.png",
    icon: Heart
  }
]

export function ServiceBenefits() {
  return (
    <section className="py-24 lg:py-32 bg-[#F9FAFB] overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-24">
          <FadeInUp>
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[var(--vital-green)]/10 text-[var(--vital-green)] text-xs font-bold uppercase tracking-widest mb-6">
              What to Expect
            </div>
            <h2 className="font-serif text-4xl font-medium tracking-tight text-[#1C1917] sm:text-5xl">
              Foundations of Your <span className="text-[var(--vital-green)]">Restoration.</span>
            </h2>
          </FadeInUp>
        </div>

        <div className="space-y-32">
          {benefits.map((benefit, index) => (
            <div key={benefit.title} className={`flex flex-col lg:flex-row gap-16 lg:gap-24 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              {/* Image Side */}
              <FadeInUp className="w-full lg:w-1/2" delay={0.1}>
                <div className="relative aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl group border-[12px] border-white">
                  <img 
                    src={benefit.image} 
                    alt={benefit.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </FadeInUp>

              {/* Content Side */}
              <FadeInUp className="w-full lg:w-1/2" delay={0.2}>
                <div className="max-w-xl">
                  <div className="mb-6 h-12 w-12 rounded-2xl bg-[var(--vital-mint)] flex items-center justify-center text-[var(--vital-green)]">
                    <benefit.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-serif text-3xl font-medium text-[#1C1917] mb-6">{benefit.title}</h3>
                  <p className="text-lg text-[#57534E] leading-relaxed font-light mb-8">
                    {benefit.description}
                  </p>
                  <ul className="space-y-3">
                    {['Evidence-based protocols', 'Professional expert guidance', 'Sustainable lifestyle shifts'].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-sm font-medium text-[#1C1917]">
                        <CheckCircle2 className="h-5 w-5 text-[var(--vital-green)]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeInUp>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
