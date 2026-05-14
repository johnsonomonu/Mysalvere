"use client"

import { FadeInUp } from "@/components/motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookPlus } from "lucide-react"
import Link from "next/link"

export function ServicesCta() {
  return (
    <section className="py-24 lg:py-32 bg-[#F9FAFB] border-t border-[#E7E5E4]">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[3.5rem] bg-[var(--vital-green)] py-24 px-8 text-center text-white shadow-2xl isolation-auto">
          {/* Background Image Overlay */}
          <div className="absolute inset-0 z-0 opacity-40">
            <img 
              src="https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&q=80&w=1200" 
              alt="Background" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[var(--vital-green)] via-[var(--vital-green)]/80 to-transparent" />
          </div>

          {/* Decorative background blur */}
          <div className="absolute top-0 right-0 z-10 w-64 h-64 bg-white/20 rounded-full blur-[100px] -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 z-10 w-64 h-64 bg-white/10 rounded-full blur-[100px] -ml-32 -mb-32" />
          
          <div className="relative z-10">
            <FadeInUp>
              <h2 className="font-serif text-4xl font-medium tracking-tight sm:text-5xl leading-tight">
                Ready to reclaim your <span className="text-white underline decoration-white/30 underline-offset-8 italic">performance?</span>
              </h2>
              <p className="mt-8 text-xl text-white/90 max-w-2xl mx-auto font-light leading-relaxed">
                Whether you're an individual professional or a leader looking to support your team, 
                we have the systems in place to help you thrive sustainably.
              </p>
            </FadeInUp>
            
            <FadeInUp delay={0.2}>
              <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
                <Button asChild size="xl" variant="secondary" className="bg-white text-[var(--vital-green)] hover:bg-white/90 rounded-2xl h-18 px-12 text-lg font-bold shadow-xl shadow-green-900/20 group">
                  <Link href="/book">
                    <BookPlus className="mr-3 h-5 w-5" />
                    Book a Consulting Session
                  </Link>
                </Button>
                
                <Link 
                  href="/assessment" 
                  className="group inline-flex items-center gap-2 text-lg font-bold text-white hover:text-white/80 transition-colors"
                >
                  Take Free Assessment
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </FadeInUp>
            
            <FadeInUp delay={0.3}>
              <p className="mt-12 text-sm font-bold uppercase tracking-widest text-white/60">
                100% money-back guarantee if you're not satisfied with your strategy call.
              </p>
            </FadeInUp>
          </div>
        </div>
      </div>
    </section>
  )
}
