"use client"

import { FadeInUp } from "@/components/motion"
import { Button } from "@/components/ui/button"
import { BookSessionButton } from "@/components/book-session-button"
import Link from "next/link"

export function FinalCtaSection() {
  return (
    <section className="py-24 lg:py-32 bg-[#F9FAFB]" id="final-cta">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-[3rem] bg-[var(--vital-green)] py-24 px-6 lg:px-12 text-center shadow-2xl shadow-green-600/20 relative overflow-hidden isolation-auto">
          {/* Decorative Background */}
          <div className="absolute top-0 right-0 z-10 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 z-10 w-64 h-64 bg-black/5 rounded-full blur-3xl -ml-32 -mb-32" />
          
          <div className="relative z-10">
            <FadeInUp>
              <h2 className="font-serif text-4xl font-medium tracking-tight text-white sm:text-6xl text-balance leading-tight">
                You don&apos;t have to do life alone
              </h2>
            </FadeInUp>
            <FadeInUp delay={0.1}>
              <p className="mt-8 text-xl lg:text-2xl leading-relaxed text-white/90 max-w-2xl mx-auto">
                There is a better way to work, live, and feel. Take the first step today.
              </p>
            </FadeInUp>
            
            <FadeInUp delay={0.2}>
              <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
                <BookSessionButton 
                  size="xl" 
                  className="w-full sm:w-auto bg-white text-[var(--vital-green)] hover:bg-[#F0FDF4] rounded-2xl h-16 px-10 shadow-xl"
                >
                  Book a Session
                </BookSessionButton>
                <Button 
                  variant="outline" 
                  size="xl" 
                  className="w-full sm:w-auto border-white/30 bg-white/10 text-white hover:bg-white/20 hover:border-white rounded-2xl h-16 px-10 backdrop-blur-sm"
                  asChild
                >
                  <Link href="/assessment">
                    Take a free health assessment
                  </Link>
                </Button>
              </div>
            </FadeInUp>
          </div>
        </div>
      </div>
    </section>
  )
}
