"use client"

import { Button } from "@/components/ui/button"
import { FadeInUp } from "@/components/motion"
import { ArrowRight, Lock, UserPlus, LogIn } from "lucide-react"
import Link from "next/link"

export function GatedResults() {
  return (
    <div className="py-12 text-center">
      <FadeInUp>
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--vital-mint)] text-[var(--vital-green)] animate-pulse">
          <Lock className="h-10 w-10" />
        </div>
      </FadeInUp>

      <FadeInUp delay={0.1}>
        <h2 className="font-serif text-3xl font-medium text-[#1C1917] sm:text-4xl mb-4">
          Your results are ready!
        </h2>
        <p className="mx-auto max-w-lg text-lg text-[#57534E] mb-12">
          We&apos;ve analyzed your symptoms and impact areas. Create a free account or login to see your personalized wellness snapshot and root-cause analysis.
        </p>
      </FadeInUp>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
        <FadeInUp delay={0.2} className="w-full">
          <Button asChild size="xl" variant="vital" className="w-full rounded-2xl h-16 text-lg shadow-xl shadow-green-600/20">
            <Link href="/auth/sign-up?next=/assessment">
              <UserPlus className="mr-2 h-5 w-5" />
              Create Free Account
            </Link>
          </Button>
        </FadeInUp>
        <FadeInUp delay={0.3} className="w-full">
          <Button asChild size="xl" variant="outline" className="w-full rounded-2xl h-16 text-lg border-[#E7E5E4] hover:border-[#1C1917]">
            <Link href="/auth/login?next=/assessment">
              <LogIn className="mr-2 h-5 w-5" />
              Login
            </Link>
          </Button>
        </FadeInUp>
      </div>

      <FadeInUp delay={0.4}>
        <p className="mt-12 text-sm text-[#A8A29E] flex items-center justify-center gap-2">
          <span className="h-1 w-1 rounded-full bg-[#A8A29E]" />
          Join over 500+ professionals on their health journey
        </p>
      </FadeInUp>
    </div>
  )
}
