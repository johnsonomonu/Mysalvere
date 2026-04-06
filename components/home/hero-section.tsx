"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { FadeInUp } from "@/components/motion"
import { BookSessionButton } from "@/components/book-session-button"

export function HeroSection() {
  return (
    <section className="relative min-h-[92svh] flex items-center bg-[#F9FAFB] pt-24 overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full bg-gradient-to-b from-[var(--vital-mint)]/40 to-transparent rounded-[3rem] lg:rounded-[5rem]" />
      </div>
      
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--vital-green) 1.5px, transparent 0)`,
          backgroundSize: '64px 64px'
        }} />
      </div>
      
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">
          
          {/* Left Column: Text Content */}
          <div className="max-w-2xl text-center lg:text-left py-12 lg:py-32 mx-auto lg:mx-0">
            <FadeInUp>
              <div className="inline-flex items-center rounded-full bg-[var(--vital-green)]/10 px-6 py-2 border border-[var(--vital-green)]/10 mb-10">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--vital-green)]">
                  Personalized Wellness Coaching
                </span>
              </div>
            </FadeInUp>
            
            <FadeInUp delay={0.1}>
              <h1 className="font-serif text-5xl font-medium tracking-tight text-[#1C1917] sm:text-6xl lg:text-8xl text-balance leading-[1.02]">
                Staying healthy shouldn&apos;t have to be so hard
              </h1>
            </FadeInUp>
            
            <FadeInUp delay={0.2}>
              <p className="mt-10 text-xl lg:text-2xl leading-relaxed text-[#57534E] max-w-xl mx-auto lg:mx-0 text-pretty font-light">
                We help you manage chronic illnesses and drug-dependent conditions using natural foods and sustainable lifestyle changes.
              </p>
            </FadeInUp>
            
            <FadeInUp delay={0.3}>
              <div className="mt-12 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5">
                <BookSessionButton size="xl" className="w-full sm:w-auto shadow-2xl shadow-green-600/20 hover:scale-[1.02] transition-all duration-500 rounded-2xl">
                  Book a Session
                </BookSessionButton>
                <Button variant="outline" size="xl" className="w-full sm:w-auto bg-white/80 backdrop-blur-md border-[#E7E5E4] text-[#1C1917] hover:bg-white hover:border-[#1C1917] transition-all duration-500 rounded-2xl" asChild>
                  <Link href="/assessment">
                    Take a free health assessment
                  </Link>
                </Button>
              </div>
            </FadeInUp>
          </div>
          
          {/* Right Column: Hero Image Contained */}
          <div className="relative flex justify-center lg:justify-end items-center h-full">
            <FadeInUp 
              delay={0.4} 
              className="relative w-full max-w-md lg:max-w-xl mx-auto lg:mx-0"
            >
              {/* Decorative backdrop shape to give it a premium staging */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[var(--vital-green)]/20 to-[var(--vital-mint)] rounded-full blur-[100px] opacity-40 -z-10 transform scale-110 translate-y-10" />
              
              <div className="relative rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl">
                <Image 
                  src="/hero.png" 
                  alt="Personalized Wellness Coaching" 
                  className="w-full h-auto object-cover hover:scale-110 transition-transform duration-[3s] ease-out"
                  width={800}
                  height={1000}
                  priority
                />
              </div>
            </FadeInUp>
          </div>
        </div>
      </div>
    </section>
  )
}
