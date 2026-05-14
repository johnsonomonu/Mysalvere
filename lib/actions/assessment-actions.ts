"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { type AssessmentResult } from "@/lib/assessment-schema"

export async function saveAssessmentResult(result: AssessmentResult, answers: Record<string, number>) {
  const supabase = await createClient()
  if (!supabase) throw new Error("Supabase not configured")

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("User not authenticated")

  const { error } = await supabase
    .from('assessment_results')
    .insert([{
      user_id: user.id,
      overall_score: result.overallScore,
      category_scores: result.categoryScores,
      priority_areas: result.priorityAreas,
      impact_level: result.impactLevel,
      recommendations: result.recommendations,
      answers: answers
    }])

  if (error) {
    console.error('Error saving assessment result:', error)
    throw new Error(error.message)
  }

  revalidatePath('/dashboard')
}
