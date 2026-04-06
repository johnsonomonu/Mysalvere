import { z } from "zod"

// ─── 12 Assessment Questions (inspired by Wholly Health) ───
export interface AssessmentQuestion {
  id: string
  category: string
  categoryLabel: string
  question: string
  options: { value: number; label: string }[]
}

export const assessmentQuestions: AssessmentQuestion[] = [
  // ── Chronic Health / Blood Sugar ──
  {
    id: "blood_sugar",
    category: "chronic_health",
    categoryLabel: "Chronic Health",
    question: "How would you describe your blood sugar or metabolic health?",
    options: [
      { value: 1, label: "No issues — my levels are stable and healthy" },
      { value: 2, label: "Occasional sugar cravings or energy dips after meals" },
      { value: 3, label: "Frequent energy crashes, diagnosed pre-diabetes, or on medication" },
      { value: 4, label: "Managing diabetes or chronic metabolic condition daily" },
    ],
  },
  {
    id: "medication_dependency",
    category: "chronic_health",
    categoryLabel: "Chronic Health",
    question: "How dependent are you on medication or supplements?",
    options: [
      { value: 1, label: "I rarely take any medication" },
      { value: 2, label: "Occasional supplements or over-the-counter meds" },
      { value: 3, label: "Daily medication for one or more conditions" },
      { value: 4, label: "Multiple daily medications — I can't function without them" },
    ],
  },

  // ── Energy & Vitality ──
  {
    id: "energy_levels",
    category: "energy",
    categoryLabel: "Energy & Vitality",
    question: "How would you rate your energy levels throughout the day?",
    options: [
      { value: 1, label: "Consistently high — I feel energized all day" },
      { value: 2, label: "Generally good with minor afternoon dips" },
      { value: 3, label: "Low energy with frequent crashes" },
      { value: 4, label: "Exhausted most of the time regardless of sleep" },
    ],
  },
  {
    id: "stimulant_reliance",
    category: "energy",
    categoryLabel: "Energy & Vitality",
    question: "How often do you rely on caffeine or sugar to get through the day?",
    options: [
      { value: 1, label: "Rarely — I don't need stimulants" },
      { value: 2, label: "1 cup of coffee in the morning" },
      { value: 3, label: "Multiple cups of coffee or energy drinks daily" },
      { value: 4, label: "I can't function without constant caffeine and sugar" },
    ],
  },

  // ── Digestive Wellness ──
  {
    id: "digestion",
    category: "digestive",
    categoryLabel: "Digestive Wellness",
    question: "How would you describe your digestive health?",
    options: [
      { value: 1, label: "Excellent — no issues at all" },
      { value: 2, label: "Occasional bloating or discomfort" },
      { value: 3, label: "Frequent bloating, gas, or irregular bowel movements" },
      { value: 4, label: "Chronic digestive issues (IBS, acid reflux, food sensitivities)" },
    ],
  },
  {
    id: "food_sensitivity",
    category: "digestive",
    categoryLabel: "Digestive Wellness",
    question: "Do you experience food sensitivities or reactions after eating?",
    options: [
      { value: 1, label: "No — I can eat anything without issues" },
      { value: 2, label: "A few foods bother me occasionally" },
      { value: 3, label: "Several foods cause discomfort or reactions" },
      { value: 4, label: "I react to most foods and have a very restricted diet" },
    ],
  },

  // ── Sleep Quality ──
  {
    id: "sleep_quality",
    category: "sleep",
    categoryLabel: "Sleep Quality",
    question: "How would you rate your sleep quality?",
    options: [
      { value: 1, label: "I sleep deeply and wake refreshed" },
      { value: 2, label: "Generally good but occasionally restless" },
      { value: 3, label: "I wake up frequently or have trouble falling asleep" },
      { value: 4, label: "Chronic insomnia or I never feel rested" },
    ],
  },
  {
    id: "sleep_duration",
    category: "sleep",
    categoryLabel: "Sleep Quality",
    question: "How many hours of sleep do you typically get per night?",
    options: [
      { value: 1, label: "7-9 hours consistently" },
      { value: 2, label: "6-7 hours most nights" },
      { value: 3, label: "5-6 hours or very inconsistent" },
      { value: 4, label: "Less than 5 hours or extremely disrupted" },
    ],
  },

  // ── Inflammation & Immunity ──
  {
    id: "pain_stiffness",
    category: "inflammation",
    categoryLabel: "Inflammation & Immunity",
    question: "Do you experience joint pain, muscle aches, or stiffness?",
    options: [
      { value: 1, label: "No pain or stiffness" },
      { value: 2, label: "Occasional mild aches after activity" },
      { value: 3, label: "Regular pain that limits some activities" },
      { value: 4, label: "Chronic pain that significantly impacts daily life" },
    ],
  },
  {
    id: "illness_frequency",
    category: "inflammation",
    categoryLabel: "Inflammation & Immunity",
    question: "How often do you get sick (colds, infections, etc.)?",
    options: [
      { value: 1, label: "Rarely — maybe once a year" },
      { value: 2, label: "A few times a year" },
      { value: 3, label: "Frequently — every couple of months" },
      { value: 4, label: "Constantly dealing with illness or recurring infections" },
    ],
  },

  // ── Mental Clarity ──
  {
    id: "mental_clarity",
    category: "mental",
    categoryLabel: "Mental Clarity",
    question: "How would you describe your mental clarity and focus?",
    options: [
      { value: 1, label: "Sharp and focused throughout the day" },
      { value: 2, label: "Generally clear with occasional foggy moments" },
      { value: 3, label: "Frequent brain fog that affects productivity" },
      { value: 4, label: "Severe brain fog, memory issues, and inability to concentrate" },
    ],
  },

  // ── Stress & Emotional Health ──
  {
    id: "stress_management",
    category: "stress",
    categoryLabel: "Stress & Emotional Health",
    question: "How well do you manage stress in your daily life?",
    options: [
      { value: 1, label: "I handle stress well and recover quickly" },
      { value: 2, label: "I manage okay but feel overwhelmed sometimes" },
      { value: 3, label: "I'm frequently stressed and it affects my health" },
      { value: 4, label: "I feel constantly overwhelmed and burned out" },
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
  level: "good" | "moderate" | "concerning" | "critical"
}

export interface AssessmentResult {
  overallScore: number
  categoryScores: CategoryScore[]
  priorityAreas: string[]
  impactLevel: "low" | "moderate" | "high" | "severe"
  recommendations: string[]
}

const categoryMeta: Record<string, string> = {
  chronic_health: "Chronic Health",
  energy: "Energy & Vitality",
  digestive: "Digestive Wellness",
  sleep: "Sleep Quality",
  inflammation: "Inflammation & Immunity",
  mental: "Mental Clarity",
  stress: "Stress & Emotional Health",
}

export function calculateAssessmentResult(data: AssessmentFormValues): AssessmentResult {
  // Group answers by category
  const categoryGroups: Record<string, number[]> = {}

  for (const q of assessmentQuestions) {
    const answer = data.answers[q.id]
    if (answer !== undefined) {
      if (!categoryGroups[q.category]) categoryGroups[q.category] = []
      categoryGroups[q.category].push(answer)
    }
  }

  // Calculate category scores
  const categoryScores: CategoryScore[] = Object.entries(categoryGroups).map(([category, scores]) => {
    const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length
    const percentage = Math.round(((avgScore - 1) / 3) * 100) // 1=0%, 4=100%
    
    let level: CategoryScore["level"]
    if (avgScore <= 1.5) level = "good"
    else if (avgScore <= 2.5) level = "moderate"
    else if (avgScore <= 3.5) level = "concerning"
    else level = "critical"

    return {
      category,
      label: categoryMeta[category] || category,
      score: Math.round(avgScore * 10) / 10,
      percentage,
      level,
    }
  })

  // Overall score (inverted: lower average = better health = higher score)
  const allScores = Object.values(data.answers)
  const overallAvg = allScores.reduce((a, b) => a + b, 0) / allScores.length
  const overallScore = Math.round(((4 - overallAvg) / 3) * 100) // 1=100 (great), 4=0 (critical)

  // Priority areas — categories with highest concern
  const priorityAreas = [...categoryScores]
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 3)
    .map(c => c.label)

  // Impact level
  let impactLevel: AssessmentResult["impactLevel"]
  if (overallAvg <= 1.5) impactLevel = "low"
  else if (overallAvg <= 2.5) impactLevel = "moderate"
  else if (overallAvg <= 3.25) impactLevel = "high"
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
  const concerning = categoryScores.filter(c => c.level === "concerning" || c.level === "critical")

  for (const c of concerning) {
    switch (c.category) {
      case "chronic_health":
        recommendations.push("Focus on blood sugar stabilization through whole foods and reduced processed carbohydrates")
        break
      case "energy":
        recommendations.push("Reduce stimulant dependency by optimizing nutrition, sleep, and meal timing")
        break
      case "digestive":
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
