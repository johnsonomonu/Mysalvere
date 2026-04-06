"use client"

import { useState, useEffect, useCallback } from "react"
import {
  assessmentQuestions,
  calculateAssessmentResult,
  type AssessmentResult
} from "@/lib/assessment-schema"
import { QuestionStep } from "./question-step"
import { ResultsStep } from "./results-step"
import { SuccessStep } from "./success-step"
import { GatedResults } from "./gated-results"
import { FadeInUp } from "@/components/motion"
import { createClient } from "@/lib/supabase/client"

type Step = "questions" | "results" | "success"

export function AssessmentWizard() {
  const [currentStep, setCurrentStep] = useState<Step>("questions")
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [result, setResult] = useState<AssessmentResult | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient()
      if (!supabase) {
        setIsAuthenticated(false)
        return
      }
      const { data: { session } } = await supabase.auth.getSession()
      setIsAuthenticated(!!session)
    }
    checkAuth()
  }, [])

  const handleAnswer = useCallback((questionId: string, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
  }, [])

  const handleQuestionsComplete = useCallback(() => {
    const assessmentResult = calculateAssessmentResult({ answers })
    setResult(assessmentResult)
    setCurrentStep("results")
  }, [answers])

  const handleBackToQuestions = useCallback(() => {
    setCurrentStep("questions")
  }, [])

  // Determine step number for progress (1=questions, 2=results)
  const stepIndex = currentStep === "questions" ? 0 : currentStep === "results" ? 1 : 2

  const progressSteps = [
    { id: "questions", title: "Assessment", description: "Answer 12 health questions" },
    { id: "results", title: "Results", description: "Your personalized wellness snapshot" },
  ]

  return (
    <div className="mx-auto max-w-3xl px-6 lg:px-8">
      {/* Progress indicator */}
      {currentStep !== "success" && (
        <FadeInUp>
          <div className="mb-12">
            <div className="flex items-center justify-center gap-4">
              {progressSteps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-medium transition-all ${
                        index < stepIndex
                          ? "border-[var(--vital-green)] bg-[var(--vital-green)] text-white"
                          : index === stepIndex
                          ? "border-[#1C1917] bg-white text-[#1C1917]"
                          : "border-[#D6D3D1] bg-white text-[#A8A29E]"
                      }`}
                    >
                      {index < stepIndex ? (
                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        index + 1
                      )}
                    </div>
                    <span className={`mt-2 text-xs font-medium hidden sm:block ${
                      index <= stepIndex ? "text-[#1C1917]" : "text-[#A8A29E]"
                    }`}>
                      {step.title}
                    </span>
                  </div>
                  {index < progressSteps.length - 1 && (
                    <div
                      className={`mx-4 h-0.5 w-12 sm:w-24 lg:w-32 ${
                        index < stepIndex ? "bg-[var(--vital-green)]" : "bg-[#D6D3D1]"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </FadeInUp>
      )}

      {/* Step content */}
      <div className="relative rounded-3xl border border-[#E7E5E4] bg-white p-8 sm:p-12 shadow-sm min-h-[500px] flex flex-col justify-center">
        {currentStep === "questions" && (
          <QuestionStep
            answers={answers}
            onAnswer={handleAnswer}
            onComplete={handleQuestionsComplete}
          />
        )}
        {currentStep === "results" && result && (
          isAuthenticated ? (
            <ResultsStep result={result} onBack={handleBackToQuestions} />
          ) : (
            <GatedResults />
          )
        )}
        {currentStep === "success" && (
          <SuccessStep />
        )}
      </div>
    </div>
  )
}
