"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { IntakeStep } from "./steps/intake-step"
import { PaymentStep } from "./steps/payment-step"
import { ScheduleStep } from "./steps/schedule-step"
import { SuccessStep } from "./steps/success-step"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

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

export function BookingWizard({ tier }: BookingWizardProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<any>({})
  const [isPaid, setIsPaid] = useState(false)

  const nextStep = () => setStep(s => s + 1)
  const prevStep = () => setStep(s => s - 1)

  const steps = [
    { number: 1, title: "Intake" },
    { number: 2, title: "Payment" },
    { number: 3, title: "Schedule" },
    { number: 4, title: "Success" },
  ]

  return (
    <div className="max-w-3xl mx-auto px-6">
      {/* Progress Bar */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
          {steps.map((s) => (
            <div 
              key={s.number} 
              className={cn(
                "flex flex-col items-center gap-2",
                step >= s.number ? "text-[var(--orange)]" : "text-[var(--charcoal)]/30"
              )}
            >
              <div className={cn(
                "h-10 w-10 rounded-full border-2 flex items-center justify-center font-bold transition-all duration-500",
                step >= s.number ? "border-[var(--orange)] bg-[var(--orange)]/10" : "border-gray-200 bg-white"
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
            animate={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <Card className="p-8 md:p-12 rounded-[2.5rem] shadow-xl border-none bg-white relative overflow-hidden">
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
                onNext={(data) => {
                  setFormData({ ...formData, ...data })
                  nextStep()
                }}
                onBack={prevStep}
              />
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <SuccessStep formData={formData} tier={TIER_DATA[tier]} />
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </div>
  )
}
