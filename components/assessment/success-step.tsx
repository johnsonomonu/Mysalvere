"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookSessionButton } from "@/components/book-session-button"
import { FadeInUp } from "@/components/motion"
import { CheckCircle, Mail, ArrowRight } from "lucide-react"

export function SuccessStep() {
  return (
    <div className="text-center py-8">
      <FadeInUp>
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#1C1917]">
          <CheckCircle className="h-10 w-10 text-[#F5F5F4]" />
        </div>
      </FadeInUp>

      <FadeInUp delay={0.1}>
        <h2 className="mt-6 font-serif text-2xl font-medium text-[#1C1917] sm:text-3xl">
          Assessment Complete
        </h2>
      </FadeInUp>

      <FadeInUp delay={0.2}>
        <p className="mt-4 text-[#57534E] max-w-md mx-auto">
          Your wellness snapshot has been saved. Create an account to access your 
          personalized dashboard and track your progress over time.
        </p>
      </FadeInUp>

      {/* Email confirmation notice */}
      <FadeInUp delay={0.3}>
        <div className="mt-8 rounded-xl border border-[#E7E5E4] bg-[#FAFAF9] p-6 max-w-md mx-auto">
          <div className="flex items-center gap-3 text-left">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1C1917] shrink-0">
              <Mail className="h-5 w-5 text-[#F5F5F4]" />
            </div>
            <div>
              <p className="font-medium text-[#1C1917]">Check Your Inbox</p>
              <p className="text-sm text-[#57534E]">
                A confirmation email with your results will be sent upon sign up.
              </p>
            </div>
          </div>
        </div>
      </FadeInUp>

      <FadeInUp delay={0.4}>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/auth/sign-up">
              Create Account
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/auth/login">
              Sign In
            </Link>
          </Button>
        </div>
      </FadeInUp>

      <FadeInUp delay={0.5}>
        <div className="mt-8 pt-8 border-t border-[#E7E5E4]">
          <p className="text-sm text-[#57534E] mb-4">
            Ready to start your wellness journey?
          </p>
          <BookSessionButton 
            variant="secondary"
            href="/services"
          >
            Book Your Session
          </BookSessionButton>
        </div>
      </FadeInUp>
    </div>
  )
}
