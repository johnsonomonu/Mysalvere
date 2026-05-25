"use client"

import { useState } from "react"
import Image from "next/image"
import { FadeInUp } from "@/components/motion"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus, ArrowRight } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const steps = [
  {
    id: "step-1",
    title: "Share your health history",
    description: "Before we even meet, you'll share your full health history, daily habits, and symptoms through our comprehensive intake process. This allows us to hit the ground running.",
  },
  {
    id: "step-2",
    title: "Meet your clinician",
    description: "A dedicated 60–90 minute session focused entirely on understanding your body's specific patterns, reviewing your history, and identifying the root causes of your symptoms.",
  },
  {
    id: "step-3",
    title: "Get advanced labs",
    description: "We develop a personalized blueprint tailored to your lab results and goals. This includes specific nutrition guidelines, targeted supplements, and realistic lifestyle adjustments.",
  },
  {
    id: "step-4",
    title: "Start your care plan",
    description: "Health isn't static, and neither is our approach. We continuously monitor your progress, review new data, and adjust your plan as your body responds and improves.",
  },
]

export function HowWeWorkSection() {
  const [openStep, setOpenStep] = useState<string>("step-1")

  return (
    <section className="py-24 lg:py-32 bg-[#F9F9F7] border-y border-[#103028]/5" id="how-we-work">
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
                How We Work
              </h2>
            </FadeInUp>

            <div className="space-y-2">
              {steps.map((step, index) => {
                const isOpen = openStep === step.id
                return (
                  <FadeInUp key={step.id} delay={0.1 * index}>
                    <div 
                      className={cn(
                        "border-b border-[#103028]/10 transition-colors duration-300",
                        isOpen ? "border-[#103028]/30" : ""
                      )}
                    >
                      <button
                        onClick={() => setOpenStep(isOpen ? "" : step.id)}
                        className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
                      >
                        <span className={cn(
                          "font-serif text-2xl sm:text-3xl transition-colors duration-300",
                          isOpen ? "text-[#FA7A30]" : "text-[#103028] group-hover:text-[#FA7A30]"
                        )}>
                          {step.title}
                        </span>
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
                              {step.description}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </FadeInUp>
                )
              })}
            </div>

            <FadeInUp delay={0.5}>
              <div className="mt-12">
                <Link
                  href="/start-here"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#103028] px-8 py-4 text-base font-medium text-white transition-colors hover:bg-[#FA7A30] shadow-sm group"
                >
                  Start your care plan
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
