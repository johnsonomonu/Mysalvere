"use client"

import { Button } from "@/components/ui/button"
import { FadeInUp } from "@/components/motion"
import { type AssessmentResult, type CategoryScore } from "@/lib/assessment-schema"
import { cn } from "@/lib/utils"
import { ArrowLeft, AlertCircle, CheckCircle2, TrendingUp, Shield } from "lucide-react"
import { BookSessionButton } from "@/components/book-session-button"

interface ResultsStepProps {
  result: AssessmentResult
  onBack: () => void
}

const levelColors = {
  good: "text-emerald-600",
  moderate: "text-amber-500",
  concerning: "text-orange-500",
  critical: "text-red-500",
}

const levelBgColors = {
  good: "bg-emerald-500",
  moderate: "bg-amber-500",
  concerning: "bg-orange-500",
  critical: "bg-red-500",
}

export function ResultsStep({ result, onBack }: ResultsStepProps) {
  const impactColors = {
    low: "text-emerald-600 bg-emerald-50 border-emerald-200",
    moderate: "text-amber-600 bg-amber-50 border-amber-200",
    high: "text-orange-600 bg-orange-50 border-orange-200",
    severe: "text-red-600 bg-red-50 border-red-200",
  }

  const impactMessages = {
    low: "Your health indicators are in a good range. Keep up the great work!",
    moderate: "Some areas need attention. Small changes can make a big difference.",
    high: "Several areas need focused attention for meaningful improvement.",
    severe: "Your health indicators suggest you need comprehensive support.",
  }

  // Score color based on value
  const scoreColor = result.overallScore >= 70
    ? "text-emerald-500"
    : result.overallScore >= 40
    ? "text-amber-500"
    : "text-red-500"

  const scoreStroke = result.overallScore >= 70
    ? "#10b981"
    : result.overallScore >= 40
    ? "#f59e0b"
    : "#ef4444"

  return (
    <div>
      <FadeInUp>
        <div className="text-center mb-8">
          <h2 className="font-serif text-2xl font-medium text-[#1C1917] sm:text-3xl">
            Your Wellness Snapshot
          </h2>
          <p className="mt-2 text-[#57534E]">
            This is a snapshot — not the full picture. But it shows where your body needs support the most.
          </p>
        </div>
      </FadeInUp>

      {/* Overall Score */}
      <FadeInUp delay={0.1}>
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            <svg className="w-40 h-40 transform -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="#E7E5E4"
                strokeWidth="12"
                fill="none"
              />
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke={scoreStroke}
                strokeWidth="12"
                fill="none"
                strokeDasharray={`${(result.overallScore / 100) * 440} 440`}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={cn("font-serif text-4xl font-medium", scoreColor)}>
                {result.overallScore}
              </span>
              <span className="text-sm text-[#57534E]">Health Score</span>
            </div>
          </div>
        </div>
      </FadeInUp>

      {/* Impact Level */}
      <FadeInUp delay={0.2}>
        <div className={cn(
          "rounded-xl border p-4 mb-6",
          impactColors[result.impactLevel]
        )}>
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <div>
              <p className="font-medium capitalize">
                {result.impactLevel} Impact Level
              </p>
              <p className="text-sm opacity-80">
                {impactMessages[result.impactLevel]}
              </p>
            </div>
          </div>
        </div>
      </FadeInUp>

      {/* Category Breakdown */}
      <FadeInUp delay={0.3}>
        <div className="mb-6">
          <h3 className="font-medium text-[#1C1917] mb-4 flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Health Breakdown by Category
          </h3>
          <div className="space-y-3">
            {result.categoryScores.map((cat: CategoryScore) => (
              <div key={cat.category} className="rounded-lg border border-[#E7E5E4] p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-[#1C1917]">
                    {cat.label}
                  </span>
                  <span className={cn("text-xs font-bold uppercase", levelColors[cat.level])}>
                    {cat.level}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-[#E7E5E4] overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-700 ease-out",
                      levelBgColors[cat.level]
                    )}
                    style={{ width: `${Math.max(cat.percentage, 5)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeInUp>

      {/* Priority Areas */}
      <FadeInUp delay={0.4}>
        <div className="mb-6">
          <h3 className="font-medium text-[#1C1917] mb-3 flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Top Priority Areas
          </h3>
          <div className="flex flex-wrap gap-2">
            {result.priorityAreas.map((area, index) => (
              <span
                key={area}
                className={cn(
                  "inline-flex items-center rounded-full px-4 py-2 text-sm font-medium",
                  index === 0
                    ? "bg-[#1C1917] text-[#F5F5F4]"
                    : "bg-[#E7E5E4] text-[#1C1917]"
                )}
              >
                {index === 0 && <span className="mr-1">1.</span>}
                {area}
              </span>
            ))}
          </div>
        </div>
      </FadeInUp>

      {/* Recommendations */}
      <FadeInUp delay={0.5}>
        <div className="rounded-xl border border-[#E7E5E4] bg-[#FAFAF9] p-6">
          <h3 className="font-medium text-[#1C1917] mb-4">Our Recommendations</h3>
          <ul className="space-y-3">
            {result.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-[var(--vital-green)] shrink-0 mt-0.5" />
                <span className="text-sm text-[#57534E]">{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      </FadeInUp>

      <FadeInUp delay={0.6}>
        <div className="mt-8 flex justify-between">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <BookSessionButton size="lg">
            Book a session today
          </BookSessionButton>
        </div>
      </FadeInUp>
    </div>
  )
}
