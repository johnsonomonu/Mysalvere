"use client"

import { FadeInUp, StaggerChildren, StaggerItem, staggerItemVariants } from "@/components/motion"
import { CheckCircle2, Apple, Heart, Activity } from "lucide-react"
import { cn } from "@/lib/utils"

const benefits = [
  {
    title: "Whole-Food Nutritional Strategies",
    description: "Move away from restrictive diets. We focus on local, nutrient-dense foods that support your specific metabolic needs and hormonal balance.",
    image: "/nigerian_whole_foods_wellness_1777597052886.png",
    icon: Apple
  },
  {
    title: "Root-Cause Consultation",
    description: "Every session is designed to peel back the layers of your health history. We help you understand the 'why' behind your symptoms.",
    image: "/nigerian_professional_wellness_consultation_1777597073573.png",
    icon: Activity
  },
  {
    title: "Consistent Support Network",
    description: "You're never alone in your journey. Our sessions and community access provide the motivation and accountability needed for lasting change.",
    image: "/nigerian_wellness_community_support_1777597114504.png", 
    icon: Heart
  }
]

export function ServiceBenefits() {
  return (
    <section className="py-24 lg:py-32 bg-[var(--warm-beige)]" id="foundations">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-20">
          <FadeInUp>
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[var(--orange)]/10 text-[var(--orange)] text-xs font-bold uppercase tracking-widest mb-6">
              What to Expect
            </div>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <h2 className="font-serif text-4xl font-medium tracking-tight text-[var(--charcoal)] sm:text-5xl">
              Foundations of Your <span className="text-[var(--orange)]">Restoration.</span>
            </h2>
          </FadeInUp>
        </div>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {benefits.map((benefit, index) => (
            <StaggerItem key={benefit.title} variants={staggerItemVariants}>
              <div className="group flex flex-col h-full bg-[var(--soft-white)] rounded-[2.5rem] overflow-hidden border border-transparent hover:border-[var(--muted-sage)]/20 shadow-sm hover:shadow-xl transition-all duration-500">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={benefit.image} 
                    alt={benefit.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--charcoal)]/40 to-transparent" />
                </div>
                
                <div className="p-10 flex flex-col flex-grow">
                  <div className="mb-6 h-12 w-12 rounded-2xl bg-[var(--warm-beige)] flex items-center justify-center text-[var(--orange)] group-hover:bg-[var(--orange)] group-hover:text-white transition-colors duration-300">
                    <benefit.icon className="h-6 w-6" />
                  </div>
                  
                  <h3 className="font-serif text-2xl font-medium text-[var(--charcoal)] mb-4">{benefit.title}</h3>
                  <p className="text-base text-[var(--charcoal)]/70 leading-relaxed mb-8 flex-grow">
                    {benefit.description}
                  </p>
                  
                  <ul className="space-y-3 pt-6 border-t border-[var(--charcoal)]/10">
                    {['Evidence-based protocols', 'Professional expert guidance', 'Sustainable lifestyle shifts'].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-sm font-medium text-[var(--charcoal)]/80">
                        <CheckCircle2 className="h-4 w-4 text-[var(--orange)]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  )
}
