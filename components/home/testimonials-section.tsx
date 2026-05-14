"use client"

import { FadeInUp } from "@/components/motion"
import { Quote } from "lucide-react"

const testimonials = [
  {
    quote: "I didn't realize how much my lifestyle was affecting my performance until I started working with Salvere.",
    author: "Client Testimonial",
  },
  {
    quote: "Simple changes, but the impact has been significant — better energy, clearer thinking, and less stress.",
    author: "Client Testimonial",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-16 lg:py-24 bg-[var(--soft-white)]" id="testimonials">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-20">
          <FadeInUp>
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[var(--warm-beige)] text-[var(--muted-sage)] text-xs font-bold uppercase tracking-widest mb-6 border border-[var(--muted-sage)]/20">
              Real Results
            </div>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <h2 className="font-serif text-4xl font-medium tracking-tight text-[var(--charcoal)] sm:text-5xl text-balance">
              Testimonials From Real People
            </h2>
          </FadeInUp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <FadeInUp key={index} delay={0.2 + index * 0.1}>
              <div className="flex flex-col h-full">
                
                <div className="flex gap-1 mb-8">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-6 w-6 text-yellow-500 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="font-serif text-3xl leading-relaxed text-[var(--charcoal)] flex-grow">
                  &quot;{testimonial.quote}&quot;
                </p>
                
                <div className="mt-10 pt-8 border-t border-[var(--charcoal)]/10 flex items-center justify-between">
                  <p className="font-medium text-[var(--charcoal)] text-lg tracking-wide uppercase">
                    {testimonial.author}
                  </p>
                  <div className="px-4 py-1.5 rounded-full bg-[var(--muted-sage)]/10 text-[var(--muted-sage)] text-xs font-bold uppercase tracking-widest">
                    Verified
                  </div>
                </div>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  )
}
