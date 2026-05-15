"use client"

import { FadeInUp } from "@/components/motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export function CorporateSolutionsSection() {
  return (
    <section className="py-24 lg:py-32 bg-[var(--warm-beige)] border-t border-[var(--charcoal)]/5" id="corporate">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <FadeInUp>
            <>
              <h2 className="label-caps mb-4">For Organizations</h2>
              <h3 className="font-serif text-4xl lg:text-5xl font-medium text-[var(--charcoal)] mb-8">
                Most organizations invest in employee health screenings. <span className="text-[var(--orange)]">Few translate the results into meaningful action.</span>
              </h3>
            </>
          </FadeInUp>
        </div>

        <div className="bg-white rounded-[3rem] p-8 lg:p-16 shadow-sm border border-[var(--charcoal)]/5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div className="space-y-8">
              <div className="flex flex-col items-center justify-center p-8 bg-[var(--warm-beige)]/30 rounded-2xl border border-dashed border-[var(--charcoal)]/10">
                <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left text-[var(--charcoal)]/60 font-medium italic">
                  <span>Employees complete tests</span>
                  <span className="text-[var(--orange)] hidden md:inline">→</span>
                  <span>Results are delivered</span>
                  <span className="text-[var(--orange)] hidden md:inline">→</span>
                  <span className="text-red-500 font-bold">No action</span>
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-2xl font-serif font-medium text-[var(--charcoal)]">We bridge the gap between health data and real-life action</h4>
                <ul className="space-y-4">
                  {[
                    "Interpret lab results",
                    "Identify early patterns",
                    "Provide structured guidance"
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-lg text-[var(--charcoal)]/80">
                      <span className="h-2 w-2 rounded-full bg-[var(--orange)]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="relative aspect-square lg:aspect-auto lg:h-[400px] rounded-3xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--muted-sage)]/20 to-transparent" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
                <p className="text-3xl font-serif italic text-[var(--charcoal)] mb-8">
                  "Health screenings are only the first step. Action is what changes outcomes."
                </p>
                <div className="w-16 h-1 bg-[var(--orange)]" />
              </div>
            </div>

          </div>

          <div className="mt-16 pt-16 border-t border-[var(--charcoal)]/5 flex flex-col sm:flex-row items-center justify-center gap-5">
            <Button size="xl" className="w-full sm:w-auto bg-[var(--orange)] hover:bg-[var(--orange-hover)] text-white" asChild>
              <Link href="/corporate">Explore Corporate Solutions</Link>
            </Button>
            <Button variant="outline" size="xl" className="w-full sm:w-auto border-[var(--charcoal)]/20 text-[var(--charcoal)] hover:bg-[var(--warm-beige)]" asChild>
              <Link href="/book">Request a Consultation</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
