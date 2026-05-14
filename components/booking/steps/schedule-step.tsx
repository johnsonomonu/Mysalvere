"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar as CalendarIcon, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

const TIMES = [
  "09:00 AM", "10:00 AM", "11:00 AM", 
  "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"
]

interface ScheduleStepProps {
  onNext: (data: any) => void
  onBack: () => void
}

export function ScheduleStep({ onNext, onBack }: ScheduleStepProps) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  // Generate next 7 days (excluding Sundays)
  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() + i + 1)
    return d
  }).filter(d => d.getDay() !== 0)

  const handleComplete = () => {
    if (selectedDate && selectedTime) {
      onNext({ appointmentDate: selectedDate, appointmentTime: selectedTime })
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-8">
        <button onClick={onBack} className="flex items-center text-sm font-bold text-[var(--charcoal)]/50 hover:text-[var(--charcoal)] transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </button>
      </div>

      <div>
        <h2 className="font-serif text-3xl font-medium text-[var(--charcoal)] mb-6">Select Date & Time</h2>
        
        {/* Date Selector */}
        <div className="space-y-4 mb-8">
          <p className="text-sm font-bold uppercase tracking-widest text-[var(--charcoal)]/40 flex items-center gap-2">
            <CalendarIcon className="h-4 w-4" /> Available Dates
          </p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {dates.map((date) => {
              const dateStr = date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' })
              return (
                <button
                  key={dateStr}
                  onClick={() => setSelectedDate(dateStr)}
                  className={cn(
                    "flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all duration-300",
                    selectedDate === dateStr 
                      ? "border-[var(--orange)] bg-[var(--orange)]/5 text-[var(--orange)]" 
                      : "border-gray-100 bg-white text-[var(--charcoal)] hover:border-[var(--orange)]/30"
                  )}
                >
                  <span className="text-[10px] font-bold uppercase opacity-50">{date.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                  <span className="text-xl font-serif font-medium">{date.getDate()}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Time Selector */}
        <div className="space-y-4 mb-10">
          <p className="text-sm font-bold uppercase tracking-widest text-[var(--charcoal)]/40 flex items-center gap-2">
            <Clock className="h-4 w-4" /> Available Slots
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {TIMES.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={cn(
                  "p-3 rounded-xl border-2 text-sm font-medium transition-all duration-300",
                  selectedTime === time 
                    ? "border-[var(--orange)] bg-[var(--orange)]/5 text-[var(--orange)]" 
                    : "border-gray-100 bg-white text-[var(--charcoal)] hover:border-[var(--orange)]/30"
                )}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        <Button 
          onClick={handleComplete} 
          disabled={!selectedDate || !selectedTime}
          className="w-full h-14 rounded-2xl text-lg bg-[var(--orange)] hover:bg-[var(--orange)]/90"
        >
          Confirm Appointment
        </Button>
      </div>
    </div>
  )
}
