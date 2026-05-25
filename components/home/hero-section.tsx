"use client"

import Link from "next/link"
import Image from "next/image"
import { FadeInUp } from "@/components/motion"

export function HeroSection() {
  const bgColor = "bg-[#EBE5D9]" // Warm cream background matching Parsley reference
  const textColor = "text-[#103028]" // Deep green/charcoal text

  return (
    <section className={`relative min-h-[100dvh] pt-0 lg:pt-24 pb-0 flex flex-col-reverse lg:flex-row overflow-hidden ${bgColor}`}>
      
      {/* Left Column: Text Content */}
      <div className="relative z-20 w-full lg:w-1/2 flex items-center justify-center lg:justify-end px-6 lg:px-12 pt-8 pb-16 lg:py-0">
        <div className="max-w-xl text-left w-full lg:mr-8 xl:mr-12 pt-8 lg:pt-0">
          <FadeInUp delay={0.1}>
            <h1 className={`font-serif text-5xl sm:text-6xl lg:text-[5.5rem] font-medium tracking-tight leading-[1.05] text-balance ${textColor}`}>
              Staying healthy doesn&apos;t have to be so hard
            </h1>
          </FadeInUp>
          
          <FadeInUp delay={0.2}>
            <p className={`mt-8 text-lg sm:text-xl leading-relaxed max-w-lg font-light text-balance ${textColor}/80`}>
              Physician-led functional medicine that resolves the root cause of your symptoms to help you feel better now and build a foundation for lasting health. We use what you do know to tell you what you don&apos;t know — to achieve your optimal health.
            </p>
          </FadeInUp>
          
          <FadeInUp delay={0.3}>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-start gap-4">
              <Link
                href="/book/discovery"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D46C20] px-8 py-4 text-base font-medium text-white transition-colors hover:bg-[#B35817] shadow-sm w-full sm:w-auto"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Book a Discovery Call
                <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <Link
                href="/assessment"
                className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-base font-medium text-[#103028] border border-[#103028]/10 transition-colors hover:bg-gray-50 shadow-sm w-full sm:w-auto"
              >
                Take Assessment
              </Link>
            </div>
          </FadeInUp>
        </div>
      </div>

      {/* Right Column: Hero Image Edge-to-Edge */}
      <div className="relative w-full lg:w-1/2 h-[60vh] min-h-[450px] lg:h-auto lg:min-h-screen">
        {/* Gradient Mask to blend image into the left background (Desktop) and bottom background (Mobile) */}
        <div className={`absolute inset-y-0 left-0 z-10 hidden lg:block bg-gradient-to-r from-[#EBE5D9] via-[#EBE5D9]/40 to-transparent w-1/3`} />
        <div className={`absolute inset-x-0 bottom-0 z-10 lg:hidden bg-gradient-to-t from-[#EBE5D9] via-[#EBE5D9]/60 to-transparent h-1/3`} />
        
        <FadeInUp delay={0.4} className="w-full h-full relative">
          <Image 
            src="/hero-new.jpg" 
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
