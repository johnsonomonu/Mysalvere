"use client"

import { useState } from "react"
import Image from "next/image"
import { FadeInUp } from "@/components/motion"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus, ArrowRight } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const stats = [
  {
    id: "stat-1",
    value: "30%+",
    title: "Chronic Disease Impact",
    description: "of deaths in Nigeria are linked to chronic health conditions. Many of these conditions develop over time — driven by daily habits, environment, and long-term physiological patterns.",
  },
  {
    id: "stat-2",
    value: "70%+",
    title: "Actionless Screenings",
    description: "of routine health screenings provide results without structured lifestyle guidance or follow-up. Detection is increasing, but interpretation and practical direction are still limited.",
  },
  {
    id: "stat-3",
    value: "80%+",
    title: "Symptom-focused Care",
    description: "of healthcare interactions focus on symptom management rather than underlying causes. Without addressing root drivers, many conditions persist, recur, or progress.",
  }
]

export function UnderstandTheGapSection() {
  const [openStep, setOpenStep] = useState<string>("stat-1")

  return (
    <section className="py-24 lg:py-32 bg-[#F9F9F7] border-y border-[#103028]/5" id="understand-the-gap">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Image */}
          <div className="relative w-full aspect-[4/5] lg:aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
            <FadeInUp className="w-full h-full">
              <Image
                src="/how-we-work-new.jpg"
                alt="Salvere CEO"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </FadeInUp>
          </div>

          {/* Right Column: Accordion */}
          <div className="flex flex-col justify-center">
            <FadeInUp>
              <h2 className="font-serif text-4xl sm:text-5xl font-medium tracking-tight text-[#103028] mb-12">
                Understand the Gap in Nigeria Today
              </h2>
            </FadeInUp>

            <div className="space-y-2">
              {stats.map((stat, index) => {
                const isOpen = openStep === stat.id
                return (
                  <FadeInUp key={stat.id} delay={0.1 * index}>
                    <div 
                      className={cn(
                        "border-b border-[#103028]/10 transition-colors duration-300",
                        isOpen ? "border-[#103028]/30" : ""
                      )}
                    >
                      <button
                        onClick={() => setOpenStep(isOpen ? "" : stat.id)}
                        className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
                          <span className={cn(
                            "font-serif text-4xl sm:text-5xl font-bold transition-colors duration-300",
                            isOpen ? "text-[#FA7A30]" : "text-[#103028] group-hover:text-[#FA7A30]"
                          )}>
                            {stat.value}
                          </span>
                          <span className={cn(
                            "text-xl sm:text-2xl font-medium transition-colors duration-300",
                            isOpen ? "text-[#FA7A30]/80" : "text-[#103028]/70 group-hover:text-[#FA7A30]/80"
                          )}>
                            {stat.title}
                          </span>
                        </div>
                        <div className="ml-4 shrink-0 flex items-center justify-center w-8 h-8 rounded-full border border-[#103028]/20 group-hover:border-[#FA7A30] transition-colors">
                          {isOpen ? (
                            <Minus className="h-4 w-4 text-[#FA7A30]" />
                          ) : (
                            <Plus className="h-4 w-4 text-[#103028] group-hover:text-[#FA7A30]" />
                          )}
                        </div>
                      </button>
                      
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="pb-8 pr-12 text-[#103028]/70 text-lg leading-relaxed font-light">
                              {stat.description}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </FadeInUp>
                )
              })}
            </div>
            
            <FadeInUp delay={0.4}>
              <div className="mt-12">
                <Link
                  href="/assessment"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#103028] px-8 py-4 text-base font-medium text-white transition-colors hover:bg-[#FA7A30] shadow-sm group"
                >
                  Take Assessment
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </FadeInUp>
            
          </div>
          
        </div>
      </div>
    </section>
  )
}
