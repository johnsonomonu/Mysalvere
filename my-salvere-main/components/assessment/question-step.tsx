"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { FadeInUp } from "@/components/motion"
import { assessmentQuestions, type AssessmentFormValues } from "@/lib/assessment-schema"
import { cn } from "@/lib/utils"
import { ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react"

interface QuestionStepProps {
  answers: Record<string, number>
  onAnswer: (questionId: string, value: number) => void
  onComplete: () => void
}

export function QuestionStep({ answers, onAnswer, onComplete }: QuestionStepProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [direction, setDirection] = useState<"forward" | "backward">("forward")

  const totalQuestions = assessmentQuestions.length
  const currentQuestion = assessmentQuestions[currentIndex]
  const progress = ((currentIndex + 1) / totalQuestions) * 100
  const selectedValue = answers[currentQuestion.id]

  const goNext = useCallback(() => {
    if (currentIndex < totalQuestions - 1) {
      setDirection("forward")
      setAnimating(true)
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1)
        setAnimating(false)
      }, 250)
    } else {
      onComplete()
    }
  }, [currentIndex, totalQuestions, onComplete])

  const goBack = useCallback(() => {
    if (currentIndex > 0) {
      setDirection("backward")
      setAnimating(true)
      setTimeout(() => {
        setCurrentIndex(prev => prev - 1)
        setAnimating(false)
      }, 250)
    }
  }, [currentIndex])

  const handleSelect = (value: number) => {
    onAnswer(currentQuestion.id, value)
    // Auto-advance after a short delay
    setTimeout(() => {
      goNext()
    }, 400)
  }

  return (
    <div className="min-h-[520px] flex flex-col">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--vital-green)]">
            {currentQuestion.categoryLabel}
          </span>
          <span className="text-xs font-bold text-[#A8A29E] uppercase tracking-widest">
            {currentIndex + 1} of {totalQuestions}
          </span>
        </div>
        <div className="h-1.5 rounded-full bg-[#E7E5E4] overflow-hidden">
          <div
            className="h-full rounded-full bg-[var(--vital-green)] transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div
        className={cn(
          "flex-1 flex flex-col transition-all duration-250",
          animating
            ? direction === "forward"
              ? "opacity-0 translate-x-8"
              : "opacity-0 -translate-x-8"
            : "opacity-100 translate-x-0"
        )}
      >
        <FadeInUp key={currentQuestion.id}>
          <h2 className="font-serif text-2xl font-medium text-[#1C1917] sm:text-3xl mb-8 leading-tight">
            {currentQuestion.question}
          </h2>
        </FadeInUp>

        {/* Answer Options */}
        <div className="space-y-3 flex-1">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedValue === option.value

            return (
              <FadeInUp key={option.value} delay={0.05 * index}>
                <button
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className={cn(
                    "w-full flex items-center gap-4 rounded-2xl border-2 p-5 text-left transition-all duration-300",
                    "hover:shadow-md",
                    isSelected
                      ? "border-[var(--vital-green)] bg-[var(--vital-mint)]/40 shadow-sm"
                      : "border-[#E7E5E4] bg-white hover:border-[#D6D3D1]"
                  )}
                >
                  <div
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold transition-all duration-300",
                      isSelected
                        ? "border-[var(--vital-green)] bg-[var(--vital-green)] text-white"
                        : "border-[#D6D3D1] text-[#A8A29E]"
                    )}
                  >
                    {isSelected ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      String.fromCharCode(65 + index)
                    )}
                  </div>
                  <span
                    className={cn(
                      "text-sm sm:text-base font-medium transition-colors",
                      isSelected ? "text-[#1C1917]" : "text-[#57534E]"
                    )}
                  >
                    {option.label}
                  </span>
                </button>
              </FadeInUp>
            )
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-8 flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={goBack}
          disabled={currentIndex === 0}
          className="text-[#57534E]"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        {selectedValue !== undefined && (
          <Button onClick={goNext} size="lg">
            {currentIndex === totalQuestions - 1 ? "See My Results" : "Next"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
