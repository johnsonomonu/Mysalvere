"use client"

import { useState } from "react"
import { FadeInUp } from "@/components/motion"
import { Button } from "@/components/ui/button"
import { BookSessionButton } from "@/components/book-session-button"
import Link from "next/link"
import { Send, Phone, ArrowRight } from "lucide-react"

const describeOptions = [
  "I have lab results",
  "I have a diagnosis",
  "I'm not sure where to start",
  "Corporate inquiry",
]

export function ContactContent() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    describes: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formState)
  }

  return (
    <>
      <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-24 bg-[var(--warm-beige)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left: Form */}
            <div>
              <FadeInUp>
                <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[var(--orange)]/10 text-[var(--orange)] text-xs font-bold uppercase tracking-widest mb-8">
                  Contact
                </div>
              </FadeInUp>
              <FadeInUp delay={0.1}>
                <h1 className="font-serif text-5xl font-medium tracking-tight text-[var(--charcoal)] sm:text-6xl leading-tight mb-4">
                  Get in Touch
                </h1>
              </FadeInUp>
              <FadeInUp delay={0.2}>
                <p className="text-xl text-[var(--charcoal)]/70 mb-10 font-light">
                  If you have a question, need guidance, or are unsure where to begin, we&apos;re here to help.
                </p>
              </FadeInUp>

              <FadeInUp delay={0.3}>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium text-[var(--charcoal)] mb-2">
                      Full Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      className="w-full rounded-2xl border border-[var(--charcoal)]/10 bg-[var(--soft-white)] px-5 py-4 text-[var(--charcoal)] placeholder:text-[var(--charcoal)]/40 focus:outline-none focus:border-[var(--orange)] focus:ring-1 focus:ring-[var(--orange)] transition-all"
                      placeholder="Your full name"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium text-[var(--charcoal)] mb-2">
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      className="w-full rounded-2xl border border-[var(--charcoal)]/10 bg-[var(--soft-white)] px-5 py-4 text-[var(--charcoal)] placeholder:text-[var(--charcoal)]/40 focus:outline-none focus:border-[var(--orange)] focus:ring-1 focus:ring-[var(--orange)] transition-all"
                      placeholder="your@email.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-phone" className="block text-sm font-medium text-[var(--charcoal)] mb-2">
                      Phone Number <span className="text-[var(--charcoal)]/40">(optional but recommended)</span>
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      className="w-full rounded-2xl border border-[var(--charcoal)]/10 bg-[var(--soft-white)] px-5 py-4 text-[var(--charcoal)] placeholder:text-[var(--charcoal)]/40 focus:outline-none focus:border-[var(--orange)] focus:ring-1 focus:ring-[var(--orange)] transition-all"
                      placeholder="+234..."
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-describes" className="block text-sm font-medium text-[var(--charcoal)] mb-2">
                      What best describes you?
                    </label>
                    <select
                      id="contact-describes"
                      required
                      className="w-full rounded-2xl border border-[var(--charcoal)]/10 bg-[var(--soft-white)] px-5 py-4 text-[var(--charcoal)] focus:outline-none focus:border-[var(--orange)] focus:ring-1 focus:ring-[var(--orange)] transition-all appearance-none"
                      value={formState.describes}
                      onChange={(e) => setFormState({ ...formState, describes: e.target.value })}
                    >
                      <option value="" disabled>Select an option...</option>
                      {describeOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-sm font-medium text-[var(--charcoal)] mb-2">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={5}
                      className="w-full rounded-2xl border border-[var(--charcoal)]/10 bg-[var(--soft-white)] px-5 py-4 text-[var(--charcoal)] placeholder:text-[var(--charcoal)]/40 focus:outline-none focus:border-[var(--orange)] focus:ring-1 focus:ring-[var(--orange)] transition-all resize-none"
                      placeholder="Tell us how we can help..."
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="vital"
                    size="xl"
                    className="w-full rounded-2xl h-14 shadow-xl shadow-orange-600/20"
                  >
                    <Send className="h-5 w-5 mr-2" />
                    Send Message
                  </Button>
                  <p className="text-sm text-[var(--charcoal)]/50 text-center">
                    We typically respond within 24–48 hours.
                  </p>
                </form>
              </FadeInUp>
            </div>

            {/* Right: Quick Actions */}
            <div className="lg:pt-24">
              <FadeInUp delay={0.4}>
                <div className="bg-[var(--soft-white)] rounded-[2.5rem] p-8 lg:p-10 border border-[var(--charcoal)]/5 mb-8">
                  <h3 className="font-serif text-2xl font-medium text-[var(--charcoal)] mb-6">
                    Prefer a faster option?
                  </h3>
                  <div className="space-y-4">
                    <Link href="/book/discovery" className="group flex items-center justify-between p-4 rounded-2xl bg-[var(--warm-beige)] hover:bg-[var(--orange)] transition-all duration-300">
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-[var(--orange)] group-hover:text-white transition-colors" />
                        <span className="font-medium text-[var(--charcoal)] group-hover:text-white transition-colors">Book a Discovery Call</span>
                      </div>
                      <ArrowRight className="h-4 w-4 text-[var(--charcoal)]/40 group-hover:text-white transition-colors" />
                    </Link>
                    <Link href="/start-here" className="group flex items-center justify-between p-4 rounded-2xl bg-[var(--warm-beige)] hover:bg-[var(--muted-sage)] transition-all duration-300">
                      <div className="flex items-center gap-3">
                        <ArrowRight className="h-5 w-5 text-[var(--muted-sage)] group-hover:text-white transition-colors" />
                        <span className="font-medium text-[var(--charcoal)] group-hover:text-white transition-colors">Start Here</span>
                      </div>
                      <ArrowRight className="h-4 w-4 text-[var(--charcoal)]/40 group-hover:text-white transition-colors" />
                    </Link>
                    <Link href="/assessment" className="group flex items-center justify-between p-4 rounded-2xl bg-[var(--warm-beige)] hover:bg-[var(--muted-sage)] transition-all duration-300">
                      <div className="flex items-center gap-3">
                        <ArrowRight className="h-5 w-5 text-[var(--muted-sage)] group-hover:text-white transition-colors" />
                        <span className="font-medium text-[var(--charcoal)] group-hover:text-white transition-colors">Take Assessment</span>
                      </div>
                      <ArrowRight className="h-4 w-4 text-[var(--charcoal)]/40 group-hover:text-white transition-colors" />
                    </Link>
                  </div>
                </div>
              </FadeInUp>

              <FadeInUp delay={0.5}>
                <div className="bg-[var(--charcoal)] rounded-[2.5rem] p-8 lg:p-10">
                  <h3 className="font-serif text-2xl font-medium text-white mb-4">
                    Direct Contact
                  </h3>
                  <div className="space-y-3 text-white/70">
                    <a href="mailto:info@mysalvere.com" className="block hover:text-[var(--orange)] transition-colors">
                      info@mysalvere.com
                    </a>
                    <a href="mailto:dew@mysalvere.com" className="block hover:text-[var(--orange)] transition-colors">
                      dew@mysalvere.com
                    </a>
                  </div>
                </div>
              </FadeInUp>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
