"use client"

import { useState, useCallback, useEffect } from "react"
import { FadeInUp } from "@/components/motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const testimonials = [
  {
    quote: "I came to Salvere feeling overwhelmed, stressed, and actively trying to conceive. At the time, I didn’t realize how much my mental and physical health were connected. Through the structured approach — including nutrition, supplements, and lifestyle adjustments — I began to feel more stable, clearer, and better supported mentally. Not long after, I conceived, and Dew supported me closely throughout my pregnancy in a way that felt deeply personal. It felt like having someone who truly understood both my health and my journey.",
    author: "Entrepreneur",
  },
  {
    quote: "I used to fall sick almost every two weeks and relied heavily on antibiotics. After working with Salvere and making consistent changes to my routine, I began to notice a shift in how often I fell ill. For the first time in a long time, my body felt more resilient, and I wasn’t constantly dealing with recurring health issues.",
    author: "Corporate Professional",
  },
  {
    quote: "I had struggled with extremely painful periods for as long as I could remember. After joining Salvere and implementing the recommendations step by step, I began to notice a real difference. For the first time, I experienced a significant reduction in discomfort, and my cycles became much more manageable. It completely changed how I experience that time of the month.",
    author: "Young Professional",
  },
  {
    quote: "I joined Salvere because my lifestyle was beginning to affect my health, and I had been dealing with persistent swelling in my legs for months. We started a structured plan that included changes to my diet, supplements, and daily routine. Over time, I saw steady improvement, and the swelling gradually resolved. What stood out most for me was not just the results, but the fact that I now understand how to support my health long-term.",
    author: "Tech company founder",
  }
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(1) // 1 for right, -1 for left
  const [isPaused, setIsPaused] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const nextTestimonial = useCallback(() => {
    setDirection(1)
    setIsExpanded(false)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }, [])

  const prevTestimonial = () => {
    setDirection(-1)
    setIsExpanded(false)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  const goToTestimonial = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setIsExpanded(false)
    setCurrentIndex(index)
  }

  // Auto-scroll every 8 seconds unless paused or actively reading expanded text
  useEffect(() => {
    if (isPaused || isExpanded) return

    const timer = setInterval(() => {
      nextTestimonial()
    }, 8000)
    return () => clearInterval(timer)
  }, [nextTestimonial, isPaused, isExpanded])

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 50 : -50,
        opacity: 0,
        scale: 0.95
      }
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 50 : -50,
        opacity: 0,
        scale: 0.95
      }
    }
  }

  const currentQuote = testimonials[currentIndex].quote;
  const isLong = currentQuote.length > 150;
  const displayQuote = (isLong && !isExpanded) ? currentQuote.substring(0, 150) + "..." : currentQuote;

  return (
    <section className="py-24 lg:py-32 bg-[#EBE5D9] overflow-hidden border-t border-[#103028]/5" id="testimonials">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16 lg:mb-20">
          <FadeInUp>
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white text-[#103028] text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
              Real Stories
            </div>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#103028]">
              Inside Salvere
            </h2>
          </FadeInUp>
        </div>

        <div className="relative mx-auto max-w-5xl">
          {/* Slider Container */}
          <div className="relative min-h-[500px] md:min-h-[400px] lg:min-h-[350px] flex items-center justify-center perspective-1000">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 },
                  scale: { duration: 0.3 }
                }}
                className="w-full px-4"
              >
                {/* The Card */}
                <div 
                  className="relative bg-white rounded-[2.5rem] p-8 sm:p-12 md:p-16 shadow-2xl border border-white/50 text-center mx-auto max-w-4xl"
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                  onTouchStart={() => setIsPaused(true)}
                  onTouchEnd={() => setIsPaused(false)}
                >
                  {/* Decorative Quote Icon */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FA7A30] text-white p-4 rounded-full shadow-lg">
                    <Quote className="w-8 h-8" fill="currentColor" />
                  </div>

                  <div className="flex justify-center gap-1 mb-8 mt-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="h-6 w-6 text-[#FA7A30] fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  <motion.div layout>
                    <p className="font-serif text-xl sm:text-2xl lg:text-3xl leading-relaxed text-[#103028] mb-4 text-balance">
                      "{displayQuote}"
                    </p>
                    
                    {isLong && (
                      <button 
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-[#FA7A30] font-bold text-xs sm:text-sm uppercase tracking-widest hover:opacity-80 transition-opacity mb-10"
                      >
                        {isExpanded ? "Read Less" : "Read More"}
                      </button>
                    )}
                  </motion.div>
                  
                  <div className="flex flex-col items-center gap-3 mt-2">
                    <p className="font-medium text-[#103028] text-lg tracking-wide uppercase">
                      — {testimonials[currentIndex].author}
                    </p>
                    <div className="px-4 py-1.5 rounded-full bg-[#103028]/5 text-[#103028]/60 text-xs font-bold uppercase tracking-widest mt-1">
                      Verified Client
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="mt-16 flex items-center justify-center gap-8">
            <button
              onClick={prevTestimonial}
              className="p-3 rounded-full bg-white shadow-sm border border-[#103028]/10 text-[#103028] hover:bg-[#103028] hover:text-white transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#FA7A30] focus:ring-offset-2"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex gap-4">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-[#FA7A30] focus:ring-offset-2 ${
                    index === currentIndex ? "bg-[#FA7A30] w-8" : "bg-white shadow-sm border border-[#103028]/20 hover:bg-[#103028]/10"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={nextTestimonial}
              className="p-3 rounded-full bg-white shadow-sm border border-[#103028]/10 text-[#103028] hover:bg-[#103028] hover:text-white transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#FA7A30] focus:ring-offset-2"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Disclaimer */}
        <FadeInUp delay={0.4}>
          <div className="mt-24 pt-8 border-t border-[#103028]/10 text-center max-w-3xl mx-auto">
            <p className="text-sm sm:text-base text-[#103028]/60 italic font-light">
              “These are individual experiences and results may vary. Salvere provides lifestyle and wellness support and does not replace medical care.”
            </p>
          </div>
        </FadeInUp>

      </div>
    </section>
  )
}
