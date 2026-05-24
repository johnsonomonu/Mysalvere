"use client"

import { FadeInUp, StaggerChildren, StaggerItem, staggerItemVariants } from "@/components/motion"
import { Button } from "@/components/ui/button"
import { BookSessionButton } from "@/components/book-session-button"
import Link from "next/link"
import { FlaskConical, FileText, Phone, Activity, ArrowRight } from "lucide-react"

const options = [
  {
    icon: FlaskConical,
    title: "You Have Lab Results You Don't Fully Understand",
    description: "You've done your tests and received your results, but you don't know what they mean for your daily life or what to do next.",
    recommended: "Understand My Labs",
    cta: "Book Understand My Labs",
    href: "/services#lab-review",
    color: "orange",
  },
  {
    icon: FileText,
    title: "You Have a Diagnosis But No Clear Plan",
    description: "You know what the condition is, but not how to manage it through your daily habits, nutrition, or lifestyle.",
    recommended: "Salvere Personal Health Blueprint",
    cta: "Book Blueprint",
    href: "/book/guide",
    color: "orange",
  },
  {
    icon: Phone,
    title: "You Want to Understand What's Going On First",
    description: "You're not sure what the issue is yet, but you want clarity before taking further steps.",
    recommended: "Discovery Call",
    cta: "Book a Discovery Call",
    href: "/book/discovery",
    color: "sage",
  },
  {
    icon: Activity,
    title: "You Want Ongoing Support and Guidance",
    description: "You already have some understanding, but want structured support, accountability, and continuous improvement.",
    recommended: "Salvere Management Package",
    cta: "Explore Ongoing Support",
    href: "/book/management",
    color: "sage",
  },
]

export function StartHereContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-24 bg-[var(--soft-white)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <FadeInUp>
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[var(--orange)]/10 text-[var(--orange)] text-xs font-bold uppercase tracking-widest mb-8">
              Start Here
            </div>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <h1 className="font-serif text-5xl font-medium tracking-tight text-[var(--charcoal)] sm:text-7xl leading-tight max-w-4xl mx-auto">
              Not Sure Where to <span className="text-[var(--orange)]">Begin?</span>
            </h1>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <p className="mt-8 text-xl text-[var(--charcoal)]/70 leading-relaxed max-w-2xl mx-auto font-light">
              Let&apos;s decide which package fits you best. Most people come to us with lab results they don&apos;t fully understand, a diagnosis without a clear plan, or a general sense that something isn&apos;t right.
            </p>
          </FadeInUp>
          <FadeInUp delay={0.25}>
            <p className="mt-4 text-lg text-[var(--charcoal)]/60 max-w-2xl mx-auto">
              Choose the option below that best describes you, and we&apos;ll show you the next step.
            </p>
          </FadeInUp>
        </div>
      </section>

      {/* Options */}
      <section className="py-16 lg:py-24 bg-[var(--warm-beige)]">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <StaggerChildren className="space-y-6">
            {options.map((option, index) => (
              <StaggerItem key={index} variants={staggerItemVariants}>
                <div className="group bg-[var(--soft-white)] rounded-[2.5rem] p-8 lg:p-10 border border-[var(--charcoal)]/5 hover:border-[var(--orange)]/20 hover:shadow-lg transition-all duration-300">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[var(--warm-beige)] text-[var(--muted-sage)] group-hover:bg-[var(--orange)] group-hover:text-white transition-colors duration-300">
                      <option.icon className="h-8 w-8" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-serif text-2xl font-medium text-[var(--charcoal)] mb-2 group-hover:text-[var(--orange)] transition-colors duration-300">
                        {option.title}
                      </h3>
                      <p className="text-[var(--charcoal)]/70 mb-4 leading-relaxed">
                        {option.description}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-[var(--muted-sage)] font-medium">
                        <span>Recommended next step:</span>
                        <span className="text-[var(--orange)] font-bold">{option.recommended}</span>
                      </div>
                    </div>
                    <div className="shrink-0">
                      <BookSessionButton
                        className="w-full lg:w-auto rounded-full px-6"
                        href={option.href}
                        isExternal={false}
                      >
                        {option.cta}
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </BookSessionButton>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Still Unsure */}
      <section className="py-16 lg:py-24 bg-[var(--soft-white)]">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FadeInUp>
              <div className="bg-[var(--charcoal)] rounded-[2.5rem] p-10 text-center">
                <h3 className="font-serif text-3xl font-medium text-white mb-4">
                  Still Unsure?
                </h3>
                <p className="text-white/70 mb-8 leading-relaxed">
                  If you&apos;re not sure which option is right for you, start with a Discovery Call. We&apos;ll help you understand your situation and guide you to the most appropriate next step.
                </p>
                <BookSessionButton size="xl" className="w-full shadow-xl">
                  Start With a Discovery Call
                </BookSessionButton>
              </div>
            </FadeInUp>
            <FadeInUp delay={0.1}>
              <div className="bg-[var(--muted-sage)]/10 rounded-[2.5rem] p-10 text-center border border-[var(--muted-sage)]/20">
                <h3 className="font-serif text-3xl font-medium text-[var(--charcoal)] mb-4">
                  Prefer a Quick First Step?
                </h3>
                <p className="text-[var(--charcoal)]/70 mb-8 leading-relaxed">
                  Take a short assessment to get an initial understanding of patterns in your health and what may need attention.
                </p>
                <Button variant="outline" size="xl" className="w-full border-[var(--muted-sage)]/30 text-[var(--charcoal)] hover:bg-[var(--muted-sage)]/10" asChild>
                  <Link href="/assessment">
                    Take Assessment
                  </Link>
                </Button>
              </div>
            </FadeInUp>
          </div>
        </div>
      </section>
    </>
  )
}
