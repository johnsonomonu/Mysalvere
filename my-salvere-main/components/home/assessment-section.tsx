"use client"

import { Button } from "@/components/ui/button"
import { FadeInUp } from "@/components/motion"
import { 
  HeartPulse, 
  Zap, 
  Sun, 
  Moon, 
  ShieldCheck,
  Brain,
  Flame,
  ArrowRight 
} from "lucide-react"
import Link from "next/link"

const categories = [
  { icon: HeartPulse, label: "Chronic Health" },
  { icon: Zap, label: "Energy & Vitality" },
  { icon: Sun, label: "Digestive Wellness" },
  { icon: Moon, label: "Sleep Quality" },
  { icon: ShieldCheck, label: "Inflammation & Immunity" },
  { icon: Brain, label: "Mental Clarity" },
  { icon: Flame, label: "Stress & Burnout" },
]

export function AssessmentSection() {
  return (
    <section className="py-24 lg:py-32 bg-[#F9FAFB]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[3rem] bg-white shadow-2xl">
          {/* Top Half: Green Banner */}
          <div className="bg-[var(--vital-green)] py-16 px-6 text-center text-white relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16" />
            
            <FadeInUp>
              <div className="inline-flex items-center rounded-full bg-white/20 px-4 py-1 text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-md">
                Free 2-Minute Assessment
              </div>
            </FadeInUp>
            
            <FadeInUp delay={0.1}>
              <h2 className="font-serif text-3xl font-medium tracking-tight sm:text-5xl text-balance leading-tight">
                Discover What&apos;s Really Going On With Your Health
              </h2>
              <p className="mt-6 text-lg text-white/90 max-w-2xl mx-auto font-light">
                Answer 14 quick questions to uncover the root causes behind your symptoms and get a personalized wellness snapshot.
              </p>
            </FadeInUp>
          </div>

          {/* Bottom Half: Icons and CTA */}
          <div className="py-16 px-6 lg:px-12 text-center">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-6 mb-16">
              {categories.map((cat, index) => (
                <FadeInUp key={cat.label} delay={0.2 + index * 0.05}>
                  <div className="flex flex-col items-center group">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--vital-mint)] text-[var(--vital-green)] group-hover:bg-[var(--vital-green)] group-hover:text-white transition-all duration-500 shadow-sm">
                      <cat.icon className="h-7 w-7" />
                    </div>
                    <span className="text-xs font-bold text-[#1C1917] leading-tight text-center">
                      {cat.label}
                    </span>
                  </div>
                </FadeInUp>
              ))}
            </div>

            <FadeInUp delay={0.4}>
              <div className="flex flex-col items-center gap-4">
                <Button asChild size="xl" variant="vital" className="rounded-2xl h-16 px-12 text-lg shadow-xl shadow-green-600/20 group">
                  <Link href="/assessment">
                    Start My Assessment
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <p className="text-xs text-[#A8A29E] font-medium uppercase tracking-widest">
                  14 questions. 100% confidential. Your information is never shared.
                </p>
              </div>
            </FadeInUp>
          </div>
        </div>
      </div>
    </section>
  )
}
