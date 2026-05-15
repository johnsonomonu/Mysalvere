"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { BookSessionButton } from "@/components/book-session-button"
import { motion } from "framer-motion"

export function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] overflow-hidden flex flex-col lg:flex-row">
      
      {/* Animated gradient background */}
      <div className="absolute inset-0 hero-gradient" />
      
      {/* Animated floating orbs for depth */}
      <motion.div 
        className="absolute top-20 left-10 w-72 h-72 rounded-full bg-[#E8A87C]/20 blur-3xl"
        animate={{ 
          x: [0, 30, -20, 0], 
          y: [0, -40, 20, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-32 right-20 w-96 h-96 rounded-full bg-[#85CDCA]/15 blur-3xl"
        animate={{ 
          x: [0, -40, 20, 0], 
          y: [0, 30, -30, 0],
          scale: [1, 0.9, 1.15, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full bg-[#D4A574]/10 blur-3xl"
        animate={{ 
          x: [0, 50, -30, 0], 
          y: [0, -20, 40, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
        backgroundSize: '40px 40px',
      }} />

      {/* Left Column: Text Content */}
      <div className="relative z-10 w-full lg:w-1/2 flex items-center justify-center lg:justify-end px-6 lg:px-12 py-20 lg:py-0 pt-32 lg:pt-0">
        <div className="max-w-xl text-left w-full lg:mr-8 xl:mr-16">
          
          {/* Animated pill badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-white/30 text-sm font-medium text-[var(--charcoal)]/80 shadow-sm mb-8">
              <motion.span 
                className="inline-block w-2 h-2 rounded-full bg-emerald-500"
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              Trusted by 2,000+ Nigerians
            </span>
          </motion.div>

          {/* Headline with word-by-word animation */}
          <motion.h1 
            className="font-serif text-5xl sm:text-6xl lg:text-[5.5rem] font-medium tracking-tight leading-[1.05] text-balance"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            {"Staying healthy".split(" ").map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-[0.3em] text-[var(--charcoal)]"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
              >
                {word}
              </motion.span>
            ))}
            <br />
            {"doesn't have".split(" ").map((word, i) => (
              <motion.span
                key={`b-${i}`}
                className="inline-block mr-[0.3em]"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
                style={{
                  background: "linear-gradient(135deg, #E8A87C, #D4774A)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {word}
              </motion.span>
            ))}
            <br />
            {"to be so hard".split(" ").map((word, i) => (
              <motion.span
                key={`c-${i}`}
                className="inline-block mr-[0.3em] text-[var(--charcoal)]"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + i * 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>
          
          <motion.p 
            className="mt-8 text-lg sm:text-xl leading-relaxed text-[var(--charcoal)]/70 max-w-lg font-light text-balance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            We analyze your lab results, lifestyle, and daily habits to uncover the patterns affecting your health — and give you a structured plan you can follow.
          </motion.p>
          
          <motion.div 
            className="mt-10 flex flex-col sm:flex-row items-center justify-start gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <BookSessionButton size="xl" className="w-full sm:w-auto shadow-lg shadow-[var(--orange)]/25 font-medium px-8 h-14 bg-[var(--orange)] hover:bg-[var(--orange-hover)] text-white hover:scale-[1.02] transition-all duration-300">
              Book a Discovery Call
            </BookSessionButton>
            <Button variant="outline" size="xl" className="w-full sm:w-auto bg-white/40 backdrop-blur-md border-[var(--charcoal)]/15 text-[var(--charcoal)] hover:bg-white/60 hover:border-[var(--charcoal)]/30 hover:scale-[1.02] transition-all duration-300" asChild>
              <Link href="/assessment">
                Take Free Assessment
              </Link>
            </Button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div 
            className="mt-12 flex items-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.5 }}
          >
            <div className="flex -space-x-2">
              {[
                "bg-amber-200", "bg-emerald-200", "bg-rose-200", "bg-blue-200"
              ].map((bg, i) => (
                <div key={i} className={`w-8 h-8 rounded-full ${bg} border-2 border-white ring-1 ring-white/50`} />
              ))}
            </div>
            <div className="text-sm text-[var(--charcoal)]/60">
              <span className="font-semibold text-[var(--charcoal)]">4.9/5</span> from 200+ reviews
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Column: Hero Image with enhanced styling */}
      <div className="relative w-full lg:w-1/2 h-[50vh] lg:h-auto min-h-[500px] lg:min-h-screen">
        {/* Decorative glow behind image */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-l from-transparent via-[#E8A87C]/10 to-transparent z-[1]"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.div 
          className="w-full h-full"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.0, delay: 0.3, ease: "easeOut" }}
        >
          <Image 
            src="/hero.png" 
            alt="Personalized Wellness Coaching" 
            className="w-full h-full object-cover object-[center_top]"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </motion.div>

        {/* Gradient overlay on image for text readability on mobile */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#F8F5F0]/80 via-transparent to-transparent lg:hidden z-[2]" />
      </div>

      <style jsx>{`
        .hero-gradient {
          background: linear-gradient(
            135deg,
            #F8F5F0 0%,
            #EDE8E0 25%,
            #E8DFD4 50%,
            #F0EBE3 75%,
            #F5F0E8 100%
          );
          background-size: 400% 400%;
          animation: gradientShift 12s ease infinite;
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  )
}
