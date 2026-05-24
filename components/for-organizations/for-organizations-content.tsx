"use client"

import { FadeInUp } from "@/components/motion"
import { Button } from "@/components/ui/button"
import { BookSessionButton } from "@/components/book-session-button"
import Link from "next/link"
import { ArrowRight, Users, FileText, Activity, CheckCircle2, TrendingUp, Heart, Shield, Zap } from "lucide-react"

const corporateSolutions = [
  {
    title: "Post-Screening Corporate Consultation Program",
    description: "We support employees after routine health checks by interpreting lab results in context, identifying early risk patterns, and providing clear next steps. Delivered as individual sessions or group-based education.",
    icon: Users,
  },
  {
    title: "Employee Health Blueprint Program",
    description: "Employees receive personalized health reports, nutrition and lifestyle guidance, and practical implementation strategies focused on sustainable improvement.",
    icon: FileText,
  },
  {
    title: "Ongoing Health Support (Optional)",
    description: "For organizations seeking continuous engagement — monthly employee sessions, progress tracking, and ongoing guidance.",
    icon: Activity,
  },
]

const whoThisIsFor = [
  "Organizations conducting annual health screenings",
  "Companies looking to reduce long-term health risks",
  "Teams experiencing fatigue, burnout, or declining performance",
  "Employers who want proactive, not reactive, health strategies",
]

const businessBenefits = [
  { icon: TrendingUp, text: "Early risk identification reduces future costs" },
  { icon: Zap, text: "Healthier employees perform better" },
  { icon: Heart, text: "Reduced absenteeism" },
  { icon: Shield, text: "Improved employee wellbeing and morale" },
]

const howItWorks = [
  { step: "01", title: "Initial Consultation", description: "We understand your organization's needs and structure." },
  { step: "02", title: "Program Design", description: "We tailor a solution based on your workforce." },
  { step: "03", title: "Implementation", description: "We work with employees through structured sessions." },
  { step: "04", title: "Ongoing Support", description: "Continuous engagement and monitoring (optional)." },
]

export function ForOrganizationsContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 lg:pt-48 lg:pb-24 bg-[var(--warm-beige)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <FadeInUp>
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[var(--orange)]/10 text-[var(--orange)] text-xs font-bold uppercase tracking-widest mb-8">
              For Organizations
            </div>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <h1 className="font-serif text-5xl font-medium tracking-tight text-[var(--charcoal)] sm:text-7xl leading-tight max-w-5xl mx-auto">
              Your Employees Are Getting Tested — But Are You <span className="text-[var(--orange)]">Acting on the Results?</span>
            </h1>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <p className="mt-8 text-xl text-[var(--charcoal)]/70 leading-relaxed max-w-3xl mx-auto font-light">
              We help organizations turn routine health screenings into actionable insights that improve employee health, reduce risk, and prevent long-term complications.
            </p>
          </FadeInUp>
          <FadeInUp delay={0.3}>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <BookSessionButton size="xl" className="w-full sm:w-auto shadow-xl shadow-orange-600/20">
                Book a Corporate Consultation
              </BookSessionButton>
              <Button variant="outline" size="xl" className="w-full sm:w-auto border-[var(--charcoal)]/15 text-[var(--charcoal)] hover:bg-white" asChild>
                <Link href="/contact">Request a Proposal</Link>
              </Button>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-16 lg:py-24 bg-[var(--soft-white)]">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <FadeInUp>
            <h2 className="font-serif text-4xl font-medium tracking-tight text-[var(--charcoal)] sm:text-5xl text-center mb-8">
              Most Workplace Health Screenings Stop at Detection.
            </h2>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <p className="text-xl text-[var(--charcoal)]/70 leading-relaxed text-center mb-12">
              Many organizations invest in annual medical checks and routine lab tests. But after results are delivered, no structured interpretation is provided, employees are left confused, and early warning signs are ignored.
            </p>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <div className="bg-[var(--warm-beige)] rounded-[2.5rem] p-8 lg:p-12">
              <h3 className="font-serif text-2xl font-medium text-[var(--charcoal)] mb-6">
                What Happens When Early Signs Are Ignored:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Preventable conditions progress",
                  "Productivity declines over time",
                  "Absenteeism increases",
                  "Long-term healthcare costs rise",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-[var(--charcoal)]/80">
                    <div className="h-2 w-2 rounded-full bg-red-400 shrink-0" />
                    <span className="text-lg">{item}</span>
                  </div>
                ))}
              </div>
              <p className="mt-8 text-[var(--charcoal)]/70 italic">
                By the time symptoms appear, intervention becomes more complex and expensive.
              </p>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Case Insight */}
      <section className="py-16 lg:py-24 bg-[var(--warm-beige)]">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <FadeInUp>
            <div className="bg-[var(--charcoal)] rounded-[2.5rem] p-8 lg:p-12 text-white">
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[var(--orange)]/20 text-[var(--orange)] text-xs font-bold uppercase tracking-widest mb-6">
                Case Insight
              </div>
              <h3 className="font-serif text-3xl font-medium mb-6">
                A Preventable Risk Hidden in Routine Results
              </h3>
              <p className="text-white/70 leading-relaxed mb-8">
                An employee underwent a standard workplace health screening. Early signs of kidney strain, hypertension, and metabolic health issues were present. No structured follow-up was provided. No actionable guidance was given.
              </p>
              <h4 className="text-[var(--orange)] font-bold uppercase tracking-widest text-sm mb-4">Through Salvere intervention:</h4>
              <ul className="space-y-3 mb-6">
                {[
                  "Root causes were identified (hydration and lifestyle patterns)",
                  "Practical corrections were implemented",
                  "Risk progression was reduced",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/80">
                    <CheckCircle2 className="h-5 w-5 text-[var(--orange)] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-white font-medium text-lg">
                A potential long-term condition was addressed early.
              </p>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Our Corporate Solutions */}
      <section className="py-16 lg:py-24 bg-[var(--soft-white)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <FadeInUp>
            <h2 className="font-serif text-4xl font-medium tracking-tight text-[var(--charcoal)] sm:text-5xl text-center mb-4">
              Our Corporate Solutions
            </h2>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <p className="text-xl text-[var(--charcoal)]/70 text-center max-w-2xl mx-auto mb-16">
              Most providers deliver lab results. Salvere translates results into practical, real-life interventions.
            </p>
          </FadeInUp>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {corporateSolutions.map((solution, i) => (
              <FadeInUp key={i} delay={0.2 + i * 0.1}>
                <div className="group bg-[var(--warm-beige)] rounded-[2.5rem] p-8 lg:p-10 border border-transparent hover:border-[var(--orange)]/20 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--soft-white)] text-[var(--muted-sage)] group-hover:bg-[var(--orange)] group-hover:text-white transition-colors duration-300 mb-6">
                    <solution.icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-serif text-2xl font-medium text-[var(--charcoal)] mb-4 group-hover:text-[var(--orange)] transition-colors">
                    {solution.title}
                  </h3>
                  <p className="text-[var(--charcoal)]/70 leading-relaxed flex-grow">
                    {solution.description}
                  </p>
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      {/* Who This Is For + Business Benefits */}
      <section className="py-16 lg:py-24 bg-[var(--warm-beige)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <FadeInUp>
              <div>
                <h2 className="font-serif text-3xl font-medium text-[var(--charcoal)] mb-8">Who This Is For</h2>
                <ul className="space-y-4">
                  {whoThisIsFor.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-lg text-[var(--charcoal)]/80">
                      <CheckCircle2 className="h-5 w-5 text-[var(--muted-sage)] mt-1 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeInUp>
            <FadeInUp delay={0.1}>
              <div>
                <h2 className="font-serif text-3xl font-medium text-[var(--charcoal)] mb-8">Why This Matters</h2>
                <div className="space-y-6">
                  {businessBenefits.map((item, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-[var(--soft-white)] border border-[var(--charcoal)]/5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--orange)]/10 text-[var(--orange)]">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <span className="text-lg font-medium text-[var(--charcoal)]">{item.text}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-[var(--charcoal)]/70 font-medium italic">
                  This is not just health support — it is risk management.
                </p>
              </div>
            </FadeInUp>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 lg:py-24 bg-[var(--soft-white)]">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <FadeInUp>
            <h2 className="font-serif text-4xl font-medium tracking-tight text-[var(--charcoal)] sm:text-5xl text-center mb-16">
              How It Works
            </h2>
          </FadeInUp>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((step, i) => (
              <FadeInUp key={i} delay={0.1 * i}>
                <div className="text-center p-6">
                  <div className="text-5xl font-serif font-bold text-[var(--orange)]/20 mb-4">{step.step}</div>
                  <h3 className="font-serif text-xl font-medium text-[var(--charcoal)] mb-2">{step.title}</h3>
                  <p className="text-sm text-[var(--charcoal)]/70">{step.description}</p>
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 lg:py-24 bg-[var(--charcoal)]">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <FadeInUp>
            <h2 className="font-serif text-4xl font-medium tracking-tight text-white sm:text-5xl mb-6">
              Don&apos;t Let Health Screenings End at Results.
            </h2>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <p className="text-xl text-white/70 mb-10">
              Turn your organization&apos;s health data into real, preventive action.
            </p>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <BookSessionButton size="xl" className="w-full sm:w-auto shadow-xl">
                Book a Corporate Consultation
              </BookSessionButton>
              <Button variant="outline" size="xl" className="w-full sm:w-auto border-white/20 text-white hover:bg-white hover:text-[var(--charcoal)]" asChild>
                <Link href="/contact">Request a Proposal</Link>
              </Button>
            </div>
          </FadeInUp>
        </div>
      </section>
    </>
  )
}
