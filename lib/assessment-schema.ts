import { z } from "zod"

// ─── 14 Assessment Questions (aligned to website brief) ───
export type AssessmentCategory =
  | "sleep"
  | "energy"
  | "mental"
  | "stress"
  | "hormones"
  | "gut"
  | "inflammation"

type OptionImpact = Partial<Record<AssessmentCategory, number>>

interface AssessmentOption {
  value: number
  label: string
  impact: OptionImpact
}

export interface AssessmentQuestion {
  id: string
  category: AssessmentCategory
  categoryLabel: string
  question: string
  options: AssessmentOption[]
}

export const assessmentQuestions: AssessmentQuestion[] = [
  {
    id: "wake_feel",
    category: "sleep",
    categoryLabel: "Sleep Quality",
    question: "How do you feel when you wake up?",
    options: [
      { value: 1, label: "Fully rested", impact: { sleep: 0, energy: 0 } },
      { value: 2, label: "Slightly tired", impact: { sleep: 1, energy: 1 } },
      { value: 3, label: "Tired most mornings", impact: { sleep: 2, energy: 2 } },
      { value: 4, label: "Exhausted no matter what", impact: { sleep: 3, energy: 3, stress: 3 } },
    ],
  },
  {
    id: "day_energy",
    category: "energy",
    categoryLabel: "Energy & Vitality",
    question: "How is your energy during the day?",
    options: [
      { value: 1, label: "Stable", impact: { energy: 0 } },
      { value: 2, label: "Slight dips", impact: { energy: 1 } },
      { value: 3, label: "Noticeable crashes", impact: { energy: 2, hormones: 2 } },
      { value: 4, label: "Constant fatigue", impact: { energy: 3, stress: 3 } },
    ],
  },
  {
    id: "focus_clarity",
    category: "mental",
    categoryLabel: "Mental Clarity",
    question: "How would you describe your focus?",
    options: [
      { value: 1, label: "Sharp", impact: { mental: 0 } },
      { value: 2, label: "Slightly distracted", impact: { mental: 1 } },
      { value: 3, label: "Often struggle", impact: { mental: 2, stress: 2 } },
      { value: 4, label: "Mentally slow or foggy", impact: { mental: 3, stress: 3 } },
    ],
  },
  {
    id: "sleep_quality",
    category: "sleep",
    categoryLabel: "Sleep Quality",
    question: "How is your sleep quality?",
    options: [
      { value: 1, label: "Deep and restful", impact: { sleep: 0 } },
      { value: 2, label: "Light but okay", impact: { sleep: 1 } },
      { value: 3, label: "Interrupted", impact: { sleep: 2, stress: 2 } },
      { value: 4, label: "Poor most nights", impact: { sleep: 3, stress: 3, hormones: 3 } },
    ],
  },
  {
    id: "hormonal_symptoms",
    category: "hormones",
    categoryLabel: "Hormonal Balance",
    question: "Do you experience hormonal symptoms?",
    options: [
      { value: 1, label: "None", impact: { hormones: 0 } },
      { value: 2, label: "Occasional", impact: { hormones: 1 } },
      { value: 3, label: "Frequent", impact: { hormones: 2 } },
      { value: 4, label: "Severe or disruptive", impact: { hormones: 3 } },
    ],
  },
  {
    id: "food_response",
    category: "gut",
    categoryLabel: "Gut Health",
    question: "How does your body respond to food?",
    options: [
      { value: 1, label: "No issues", impact: { gut: 0 } },
      { value: 2, label: "Occasional bloating", impact: { gut: 1 } },
      { value: 3, label: "Frequent discomfort", impact: { gut: 2, inflammation: 2 } },
      { value: 4, label: "Daily bloating or gas", impact: { gut: 3, inflammation: 3 } },
    ],
  },
  {
    id: "weight_changes",
    category: "hormones",
    categoryLabel: "Hormonal Balance",
    question: "How has your weight been recently?",
    options: [
      { value: 1, label: "Stable", impact: { energy: 0 } },
      { value: 2, label: "Slight fluctuations", impact: { energy: 1 } },
      { value: 3, label: "Unexplained gain", impact: { hormones: 2, energy: 2 } },
      { value: 4, label: "Persistent gain", impact: { hormones: 3, inflammation: 3 } },
    ],
  },
  {
    id: "stress_frequency",
    category: "stress",
    categoryLabel: "Stress & Emotional Health",
    question: "How often do you feel stressed?",
    options: [
      { value: 1, label: "Rarely", impact: { stress: 0 } },
      { value: 2, label: "Sometimes", impact: { stress: 1 } },
      { value: 3, label: "Often", impact: { stress: 2, hormones: 2 } },
      { value: 4, label: "Constantly overwhelmed", impact: { stress: 3, hormones: 3 } },
    ],
  },
  {
    id: "inflammation_frequency",
    category: "inflammation",
    categoryLabel: "Inflammation & Immunity",
    question: "How often do you feel inflamed or get sick?",
    options: [
      { value: 1, label: "Rarely", impact: { inflammation: 0 } },
      { value: 2, label: "Occasionally", impact: { inflammation: 1 } },
      { value: 3, label: "Frequently", impact: { inflammation: 2, gut: 2 } },
      { value: 4, label: "Constant issues", impact: { inflammation: 3, gut: 3 } },
    ],
  },
  {
    id: "post_meal_feeling",
    category: "gut",
    categoryLabel: "Gut Health",
    question: "How do you feel after meals?",
    options: [
      { value: 1, label: "Energized", impact: { energy: 0 } },
      { value: 2, label: "Slightly tired", impact: { energy: 1 } },
      { value: 3, label: "Sluggish", impact: { energy: 2, gut: 2 } },
      { value: 4, label: "Very tired or bloated", impact: { energy: 3, gut: 3, hormones: 3 } },
    ],
  },
  {
    id: "mental_fog_frequency",
    category: "mental",
    categoryLabel: "Mental Clarity",
    question: "How often do you experience mental fog?",
    options: [
      { value: 1, label: "Rarely", impact: { mental: 0 } },
      { value: 2, label: "Occasionally", impact: { mental: 1 } },
      { value: 3, label: "Frequently", impact: { mental: 2 } },
      { value: 4, label: "Almost daily", impact: { mental: 3, stress: 3 } },
    ],
  },
  {
    id: "demanding_tasks",
    category: "mental",
    categoryLabel: "Mental Clarity",
    question: "How do you perform during demanding tasks?",
    options: [
      { value: 1, label: "Clear", impact: { mental: 0 } },
      { value: 2, label: "Slight dips", impact: { mental: 1 } },
      { value: 3, label: "Noticeable difficulty", impact: { mental: 2 } },
      { value: 4, label: "Easily overwhelmed", impact: { mental: 3, stress: 3 } },
    ],
  },
  {
    id: "fall_asleep_time",
    category: "sleep",
    categoryLabel: "Sleep Quality",
    question: "How long does it take you to fall asleep?",
    options: [
      { value: 1, label: "Less than 15 minutes", impact: { sleep: 0 } },
      { value: 2, label: "15 to 30 minutes", impact: { sleep: 1 } },
      { value: 3, label: "30 to 60 minutes", impact: { sleep: 2, stress: 2 } },
      { value: 4, label: "More than 60 minutes", impact: { sleep: 3, stress: 3, hormones: 3 } },
    ],
  },
  {
    id: "sleep_disruption",
    category: "sleep",
    categoryLabel: "Sleep Quality",
    question: "What happens during your sleep?",
    options: [
      { value: 1, label: "Sleep through", impact: { sleep: 0 } },
      { value: 2, label: "Wake once", impact: { sleep: 1 } },
      { value: 3, label: "Wake multiple times", impact: { sleep: 2, stress: 2 } },
      { value: 4, label: "Frequent waking", impact: { sleep: 3, stress: 3, hormones: 3 } },
    ],
  },
]

// ─── Zod Schema ───
export const assessmentSchema = z.object({
  answers: z.record(z.string(), z.number().min(1).max(4)),
})

export type AssessmentFormValues = z.infer<typeof assessmentSchema>

// ─── Category scoring ───
export interface CategoryScore {
  category: string
  label: string
  score: number       // average of question scores in this category (1-4)
  percentage: number  // normalized to 0-100 (higher = more concern)
  level: "Balanced" | "Mild" | "Moderate" | "High" | "Significant"
}

export interface AssessmentResult {
  overallScore: number
  categoryScores: CategoryScore[]
  priorityAreas: string[]
  impactLevel: "low" | "moderate" | "high" | "severe"
  recommendations: string[]
}

const categoryMeta: Record<AssessmentCategory, string> = {
  sleep: "Sleep Quality",
  energy: "Energy & Vitality",
  mental: "Mental Clarity",
  stress: "Stress & Emotional Health",
  hormones: "Hormonal Balance",
  gut: "Gut Health",
  inflammation: "Inflammation & Immunity",
}

export function calculateAssessmentResult(data: AssessmentFormValues): AssessmentResult {
  const categoryScoresMap: Record<AssessmentCategory, number> = {
    sleep: 0,
    energy: 0,
    mental: 0,
    stress: 0,
    hormones: 0,
    gut: 0,
    inflammation: 0,
  }

  const categoryMaxMap: Record<AssessmentCategory, number> = {
    sleep: 0,
    energy: 0,
    mental: 0,
    stress: 0,
    hormones: 0,
    gut: 0,
    inflammation: 0,
  }

  for (const question of assessmentQuestions) {
    const selectedValue = data.answers[question.id]

    const maxImpactForQuestion: OptionImpact = {}
    for (const option of question.options) {
      for (const [category, points] of Object.entries(option.impact)) {
        const key = category as AssessmentCategory
        const existing = maxImpactForQuestion[key] ?? 0
        maxImpactForQuestion[key] = Math.max(existing, points ?? 0)
      }
    }

    for (const [category, points] of Object.entries(maxImpactForQuestion)) {
      categoryMaxMap[category as AssessmentCategory] += points ?? 0
    }

    if (selectedValue === undefined) {
      continue
    }

    const selectedOption = question.options.find((option) => option.value === selectedValue)
    if (!selectedOption) {
      continue
    }

    for (const [category, points] of Object.entries(selectedOption.impact)) {
      categoryScoresMap[category as AssessmentCategory] += points ?? 0
    }
  }

  const categoryScores: CategoryScore[] = (Object.keys(categoryScoresMap) as AssessmentCategory[]).map((category) => {
    const score = categoryScoresMap[category]
    const maxScore = categoryMaxMap[category]
    const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0

    let level: CategoryScore["level"]
    if (percentage <= 20) level = "Balanced"
    else if (percentage <= 40) level = "Mild"
    else if (percentage <= 60) level = "Moderate"
    else if (percentage <= 80) level = "High"
    else level = "Significant"

    return {
      category,
      label: categoryMeta[category],
      score,
      percentage,
      level,
    }
  })

  const totalConcern = categoryScores.reduce((sum, item) => sum + item.score, 0)
  const totalMaxConcern = Object.values(categoryMaxMap).reduce((sum, item) => sum + item, 0)
  const concernPercentage = totalMaxConcern > 0 ? Math.round((totalConcern / totalMaxConcern) * 100) : 0
  const overallScore = Math.max(0, 100 - concernPercentage)

  // Priority areas — categories with highest concern
  const priorityAreas = [...categoryScores]
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 3)
    .map(c => c.label)

  // Impact level
  let impactLevel: AssessmentResult["impactLevel"]
  if (concernPercentage <= 25) impactLevel = "low"
  else if (concernPercentage <= 50) impactLevel = "moderate"
  else if (concernPercentage <= 75) impactLevel = "high"
  else impactLevel = "severe"

  // Generate recommendations
  const recommendations = generateRecommendations(categoryScores, impactLevel)

  return {
    overallScore,
    categoryScores,
    priorityAreas,
    impactLevel,
    recommendations,
  }
}

function generateRecommendations(
  categoryScores: CategoryScore[],
  impactLevel: AssessmentResult["impactLevel"]
): string[] {
  const recommendations: string[] = []
  const concerning = categoryScores.filter(c => c.level === "High" || c.level === "Significant")

  for (const c of concerning) {
    switch (c.category) {
      case "energy":
        recommendations.push("Reduce stimulant dependency by optimizing nutrition, sleep, and meal timing")
        break
      case "gut":
        recommendations.push("Address digestive health through an elimination protocol and gut-healing nutrition")
        break
      case "sleep":
        recommendations.push("Establish a consistent sleep routine and optimize your sleep environment")
        break
      case "inflammation":
        recommendations.push("Reduce systemic inflammation through anti-inflammatory foods and stress management")
        break
      case "mental":
        recommendations.push("Support cognitive function through targeted nutrition and brain-supporting habits")
        break
      case "stress":
        recommendations.push("Implement daily stress management practices — breathwork, movement, and boundaries")
        break
      case "hormones":
        recommendations.push("Support hormonal balance through stress regulation, blood sugar stability, and restorative sleep")
        break
    }
  }

  if (impactLevel === "high" || impactLevel === "severe") {
    recommendations.push("Consider 1:1 coaching for comprehensive support and faster results")
  }

  if (recommendations.length === 0) {
    recommendations.push("Maintain your current healthy habits and consider periodic reassessments")
  }

  return recommendations.slice(0, 4)
}
