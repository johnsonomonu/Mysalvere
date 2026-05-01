"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle2, Calendar, Mail, ArrowRight } from "lucide-react"
import Link from "next/link"

interface SuccessStepProps {
  formData: any
  tier: { name: string; price: number }
}

export function SuccessStep({ formData, tier }: SuccessStepProps) {
  return (
    <div className="text-center py-8">
      <div className="mb-8 inline-flex h-24 w-24 items-center justify-center rounded-full bg-green-50 text-green-600">
        <CheckCircle2 className="h-12 w-12" />
      </div>
      
      <h2 className="font-serif text-4xl font-medium text-[var(--charcoal)] mb-4">You're All Set!</h2>
      <p className="text-xl text-[var(--charcoal)]/60 mb-12 max-w-md mx-auto">
        Your booking for <span className="text-[var(--charcoal)] font-bold">{tier.name}</span> has been confirmed and paid.
      </p>

      <div className="bg-[var(--warm-beige)] p-8 rounded-3xl border border-[var(--orange)]/10 text-left mb-12">
        <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--charcoal)]/40 mb-6 border-b border-[var(--charcoal)]/10 pb-4">
          Appointment Details
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="mt-1 h-8 w-8 rounded-full bg-white flex items-center justify-center text-[var(--orange)] shadow-sm">
              <Calendar className="h-4 w-4" />
            </div>
            <div>
              <p className="font-bold text-[var(--charcoal)]">{formData.appointmentDate}</p>
              <p className="text-sm text-[var(--charcoal)]/60">{formData.appointmentTime}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="mt-1 h-8 w-8 rounded-full bg-white flex items-center justify-center text-[var(--orange)] shadow-sm">
              <Mail className="h-4 w-4" />
            </div>
            <div>
              <p className="font-bold text-[var(--charcoal)]">{formData.fullName}</p>
              <p className="text-sm text-[var(--charcoal)]/60">Confirmation sent to {formData.email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button asChild className="h-14 rounded-2xl text-lg bg-[var(--orange)] hover:bg-[var(--orange)]/90">
          <Link href="/dashboard">
            Go to Dashboard <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
        <Button asChild variant="outline" className="h-14 rounded-2xl text-lg">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
      
      <p className="mt-8 text-xs text-[var(--charcoal)]/40">
        A calendar invite has been sent to your email. Need to reschedule? Please contact support.
      </p>
    </div>
  )
}
