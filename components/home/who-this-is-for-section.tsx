"use client"

import { FadeInUp, StaggerChildren, StaggerItem, staggerItemVariants } from "@/components/motion"
import { 
  User,
  Building2
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookSessionButton } from "@/components/book-session-button"


export function WhoThisIsForSection() {
  return (
    <section className="py-16 lg:py-24 bg-[var(--warm-beige)]" id="who-this-is-for">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <FadeInUp>
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[var(--orange)]/10 text-[var(--orange)] text-xs font-bold uppercase tracking-widest mb-6">
              Who We Help
            </div>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <h2 className="font-serif text-4xl font-medium tracking-tight text-[var(--charcoal)] sm:text-5xl">
              Conditions We Support
            </h2>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <p className="mt-6 text-xl leading-8 text-[var(--charcoal)]/70">
              We help you build resilient systems that target the root cause of these common challenges.
            </p>
          </FadeInUp>
        </div>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* For Individuals */}
          <StaggerItem variants={staggerItemVariants}>
            <div className="group flex flex-col h-full bg-[var(--soft-white)] rounded-[2.5rem] p-10 border border-transparent hover:border-[var(--muted-sage)]/20 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--warm-beige)] mb-8 transition-colors group-hover:bg-[var(--orange)] group-hover:text-white">
                <User className="h-8 w-8 text-[var(--muted-sage)] transition-colors group-hover:text-white" />
              </div>
              <h3 className="font-serif text-3xl font-medium text-[var(--charcoal)] mb-6">
                For Individuals
              </h3>
              <p className="text-lg text-[var(--charcoal)]/60 mb-8">
                Professionals who want to:
              </p>
              <ul className="space-y-4 flex-grow">
                {[
                  "Reduce dependence on supplements and drugs",
                  "Reduce stress and burn-out symptoms",
                  "Manage chronic illnesses and circumstances"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[var(--charcoal)]/80">
                    <div className="h-1.5 w-1.5 rounded-full bg-[var(--orange)] mt-2.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </StaggerItem>

          {/* For Organizations */}
          <StaggerItem variants={staggerItemVariants}>
            <div className="group flex flex-col h-full bg-[var(--soft-white)] rounded-[2.5rem] p-10 border border-transparent hover:border-[var(--muted-sage)]/20 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--warm-beige)] mb-8 transition-colors group-hover:bg-[var(--muted-sage)] group-hover:text-white">
                <Building2 className="h-8 w-8 text-[var(--muted-sage)] transition-colors group-hover:text-white" />
              </div>
              <h3 className="font-serif text-3xl font-medium text-[var(--charcoal)] mb-6">
                For Organizations
              </h3>
              <p className="text-lg text-[var(--charcoal)]/60 mb-8">
                Companies that want to:
              </p>
              <ul className="space-y-4 flex-grow">
                {[
                  "Improve employee wellbeing",
                  "Increase focus and productivity",
                  "Build sustainable performance cultures"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-[var(--charcoal)]/80">
                    <div className="h-1.5 w-1.5 rounded-full bg-[var(--muted-sage)] mt-2.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </StaggerItem>
        </StaggerChildren>

        <FadeInUp delay={0.6}>
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-5">
            <BookSessionButton size="xl" className="w-full sm:w-auto shadow-xl shadow-orange-600/20">
              Discovery Call
            </BookSessionButton>
            <Button variant="outline" size="xl" className="w-full sm:w-auto bg-[var(--soft-white)] border-[var(--border)] text-[var(--charcoal)] hover:bg-white transition-all duration-300" asChild>
              <Link href="/assessment">
                Take Assessment
              </Link>
            </Button>
          </div>
        </FadeInUp>
      </div>
    </section>
  )
}
