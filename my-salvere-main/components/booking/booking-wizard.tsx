"use client"

import { useState, useCallback, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { IntakeStep } from "./steps/intake-step"
import { PaymentStep } from "./steps/payment-step"
import { ScheduleStep } from "./steps/schedule-step"
import { SuccessStep } from "./steps/success-step"
import { AuthStep } from "@/components/assessment/auth-step"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase/client"
import { Loader2 } from "lucide-react"

export type BookingTier = 'discovery' | 'single' | 'guide' | 'management'

const TIER_DATA = {
  discovery: { name: "Discovery Call", price: 25000 },
  single: { name: "Single Session", price: 50000 },
  guide: { name: "Salvere Personalized Guide", price: 80000 },
  management: { name: "Salvere Management Package", price: 150000 },
}

interface BookingWizardProps {
  tier: BookingTier
}

function parseScheduledAt(dateStr: string, timeStr: string): Date {
  const now = new Date()
  const year = now.getFullYear()
  const dateMatch = dateStr.match(/(\w+),\s+(\w+)\s+(\d+)/)
  if (!dateMatch) return new Date()
  const monthStr = dateMatch[2]
  const day = parseInt(dateMatch[3])
  const monthIndex = new Date(`${monthStr} 1, 2000`).getMonth()
  const timeMatch = timeStr.match(/(\d+):(\d+)\s+(AM|PM)/)
  if (!timeMatch) return new Date()
  let hours = parseInt(timeMatch[1])
  const minutes = parseInt(timeMatch[2])
  const ampm = timeMatch[3]
  if (ampm === "PM" && hours !== 12) hours += 12
  if (ampm === "AM" && hours === 12) hours = 0
  return new Date(year, monthIndex, day, hours, minutes)
}

export function BookingWizard({ tier }: BookingWizardProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<any>({})
  const [isPaid, setIsPaid] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)

  // Check auth status on mount
  useEffect(() => {
    const supabase = createClient()
    if (!supabase) {
      setIsAuthenticated(false)
      return
    }
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setIsAuthenticated(!!session)
    }
    checkAuth()
  }, [])

  const nextStep = () => setStep(s => s + 1)
  const prevStep = () => setStep(s => s - 1)

  // Save appointment to Supabase
  const saveAppointment = async (scheduleData: any) => {
    setIsSaving(true)
    setSaveError(null)
    try {
      const supabase = createClient()
      if (!supabase) throw new Error("Auth service not configured")

      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error("Not authenticated")

      const scheduledAt = parseScheduledAt(scheduleData.appointmentDate, scheduleData.appointmentTime)

      const { error: insertError } = await supabase
        .from("appointments")
        .insert({
          user_id: user.id,
          type: TIER_DATA[tier].name,
          status: "confirmed",
          scheduled_at: scheduledAt.toISOString(),
          duration_minutes: 60,
          notes: `Name: ${formData?.fullName ?? "N/A"}, Email: ${formData?.email ?? user.email}, Phone: ${formData?.phone ?? "N/A"}, Concern: ${formData?.healthConcern ?? "N/A"}`,
        })

      if (insertError) {
        console.error("Failed to save:", JSON.stringify(insertError))
        throw new Error(insertError.message)
      }
    } catch (err: any) {
      console.error("Save error:", err)
      setSaveError(err.message)
    } finally {
      setIsSaving(false)
    }
  }

  // When schedule step completes
  const handleScheduleComplete = async (scheduleData: any) => {
    const updatedFormData = { ...formData, ...scheduleData }
    setFormData(updatedFormData)

    if (isAuthenticated) {
      // Already signed in — save and go to success
      await saveAppointment(scheduleData)
      setStep(5) // success step
    } else {
      // Not signed in — go to auth step
      setStep(4) // auth step
    }
  }

  // When auth step completes (user just signed up / signed in)
  const handleAuthSuccess = useCallback(async () => {
    setIsAuthenticated(true)
    // Now save the appointment
    await saveAppointment(formData)
    setStep(5) // success step
  }, [formData])

  const steps = [
    { number: 1, title: "Intake" },
    { number: 2, title: "Payment" },
    { number: 3, title: "Schedule" },
    { number: 4, title: "Confirm" },
  ]

  // Map step number for the progress bar (auth is hidden from progress)
  const progressStep = step <= 4 ? Math.min(step, 4) : 4

  return (
    <div className="max-w-3xl mx-auto px-6">
      {/* Progress Bar */}
      {step < 5 && (
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            {steps.map((s) => (
              <div 
                key={s.number} 
                className={cn(
                  "flex flex-col items-center gap-2",
                  progressStep >= s.number ? "text-[var(--orange)]" : "text-[var(--charcoal)]/30"
                )}
              >
                <div className={cn(
                  "h-10 w-10 rounded-full border-2 flex items-center justify-center font-bold transition-all duration-500",
                  progressStep >= s.number ? "border-[var(--orange)] bg-[var(--orange)]/10" : "border-gray-200 bg-white"
                )}>
                  {s.number}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest">{s.title}</span>
              </div>
            ))}
          </div>
          <div className="relative h-1 w-full bg-gray-200 rounded-full overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-[var(--orange)]"
              initial={{ width: "0%" }}
              animate={{ width: `${((progressStep - 1) / (steps.length - 1)) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      )}

      <Card className="p-8 md:p-12 rounded-[2.5rem] shadow-xl border-none bg-white relative overflow-hidden">
        {isSaving && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/50 backdrop-blur-[2px] rounded-[2.5rem]">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="h-10 w-10 animate-spin text-[var(--orange)]" />
              <p className="text-sm font-medium text-[var(--charcoal)]">Saving your appointment...</p>
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <IntakeStep 
                tier={TIER_DATA[tier]} 
                onNext={(data) => {
                  setFormData({ ...formData, ...data })
                  nextStep()
                }} 
              />
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <PaymentStep 
                tier={TIER_DATA[tier]} 
                formData={formData}
                onSuccess={() => {
                  setIsPaid(true)
                  nextStep()
                }}
                onBack={prevStep}
              />
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <ScheduleStep 
                onNext={handleScheduleComplete}
                onBack={prevStep}
              />
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4-auth"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="space-y-4">
                <div className="text-center mb-4">
                  <p className="text-sm text-[var(--charcoal)]/60">
                    Sign up or sign in to confirm your appointment
                  </p>
                </div>
                <AuthStep onSuccess={handleAuthSuccess} />
              </div>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              {saveError ? (
                <div className="text-center py-8 space-y-6">
                  <div className="text-red-500 text-lg font-medium">Could not save appointment</div>
                  <p className="text-sm text-[var(--charcoal)]/60">{saveError}</p>
                  <button 
                    onClick={() => saveAppointment(formData).then(() => { if (!saveError) setStep(5) })}
                    className="text-sm font-bold text-[var(--orange)] hover:underline"
                  >
                    Try again
                  </button>
                </div>
              ) : (
                <SuccessStep formData={formData} tier={TIER_DATA[tier]} />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </div>
  )
}
