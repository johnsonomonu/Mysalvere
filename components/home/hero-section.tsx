"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { FadeInUp } from "@/components/motion"
import { BookSessionButton } from "@/components/book-session-button"

export function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] bg-[var(--muted-sage)] pt-24 pb-0 flex flex-col lg:flex-row overflow-hidden">
      
      {/* Left Column: Text Content */}
      <div className="relative z-10 w-full lg:w-1/2 flex items-center justify-center lg:justify-end px-6 lg:px-12 py-16 lg:py-0">
        <div className="max-w-xl text-left w-full lg:mr-8 xl:mr-16">
          <FadeInUp delay={0.1}>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-[5.5rem] font-medium tracking-tight text-[var(--charcoal)] leading-[1.05] text-balance">
              Staying healthy doesn&apos;t have to be so hard
            </h1>
          </FadeInUp>
          
          <FadeInUp delay={0.2}>
            <p className="mt-8 text-lg sm:text-xl leading-relaxed text-[var(--charcoal)]/80 max-w-lg font-light text-balance">
              We use what you do know to tell you what you don&apos;t know — to achieve your optimal health. We analyze your lab results, lifestyle, and daily habits to uncover the patterns affecting your health — and give you a structured plan you can follow.
            </p>
          </FadeInUp>
          
          <FadeInUp delay={0.3}>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-start gap-4">
              <BookSessionButton size="xl" className="w-full sm:w-auto shadow-none font-medium px-8 h-14">
                Book a Discovery Call
              </BookSessionButton>
              <Button variant="outline" size="xl" className="w-full sm:w-auto bg-white/80 backdrop-blur-md border-[var(--charcoal)]/20 text-[var(--charcoal)] hover:bg-white hover:border-[var(--charcoal)]/40 transition-all duration-300" asChild>
                <Link href="/assessment">
                  Take Assessment
                </Link>
              </Button>
            </div>
          </FadeInUp>
        </div>
      </div>

      {/* Right Column: Hero Image Edge-to-Edge */}
      <div className="relative w-full lg:w-1/2 h-[50vh] lg:h-auto min-h-[500px] lg:min-h-screen">
        <FadeInUp delay={0.4} className="w-full h-full">
          <Image 
            src="/hero.png" 
            alt="Personalized Wellness Coaching" 
            className="w-full h-full object-cover object-[center_top]"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </FadeInUp>
      </div>

    </section>
  )
}
