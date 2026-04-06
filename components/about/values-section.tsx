"use client"

import { FadeInUp } from "@/components/motion"
import { ShieldCheck, Heart, Sparkles, Scale } from "lucide-react"

const values = [
  {
    icon: ShieldCheck,
    title: "Truth & Transparency",
    description: "We don't hide behind medical jargon. We provide clear, data-driven insights into your biological health.",
    image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=600"
  },
  {
    icon: Heart,
    title: "Sustainable Care",
    description: "Our protocols are designed to be part of your life, not a temporary disruption. We build for the long term.",
    image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=600"
  },
  {
    icon: Sparkles,
    title: "Vitality First",
    description: "We measure success by how you feel, how you perform, and the quality of your daily experience.",
    image: "https://images.unsplash.com/photo-1444491741275-3747c53c99b4?auto=format&fit=crop&q=80&w=600"
  },
  {
    icon: Scale,
    title: "Bio-Individuality",
    description: "There is no 'one size fits all' in health. Your protocol is as unique as your DNA and lifestyle.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600"
  }
]

export function ValuesSection() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-24">
          <FadeInUp>
            <h2 className="font-serif text-4xl font-medium tracking-tight text-[#1C1917] sm:text-5xl">
              The Values That <span className="text-[var(--vital-green)] underline decoration-[var(--vital-green)]/30 underline-offset-8">Drive Us.</span>
            </h2>
          </FadeInUp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {values.map((value, index) => (
            <FadeInUp key={value.title} delay={index * 0.1}>
              <div className="group relative overflow-hidden rounded-[3rem] bg-[#F9FAFB] border border-[#E7E5E4] hover:shadow-2xl transition-all duration-500">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="p-10 lg:p-12 flex flex-col justify-center">
                    <div className="mb-8 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--vital-mint)] text-[var(--vital-green)] shadow-sm group-hover:bg-[var(--vital-green)] group-hover:text-white transition-colors duration-500">
                      <value.icon className="h-7 w-7" />
                    </div>
                    <h3 className="text-2xl font-serif font-medium text-[#1C1917] mb-4">{value.title}</h3>
                    <p className="text-[#57534E] leading-relaxed font-light">
                      {value.description}
                    </p>
                  </div>
                  <div className="relative h-64 lg:h-full overflow-hidden">
                    <img 
                      src={value.image} 
                      alt={value.title}
                      className="absolute inset-0 h-full w-full object-cover group-hover:scale-110 transition-transform duration-[2s]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#F9FAFB] hidden lg:block" />
                  </div>
                </div>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  )
}
