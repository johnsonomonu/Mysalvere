import { DashboardContent } from "@/components/dashboard/dashboard-content"
import { createClient } from "@/lib/supabase/server"
import { requireUser } from "@/lib/auth/guards"
import type { Metadata } from "next"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "SalvereTracker - Dashboard | Salvere",
  description: "Track your wellness progress, view your assessment results, and monitor your health journey.",
}

export default async function DashboardPage() {
  const user = await requireUser("/auth/login?redirect=/dashboard")
  const supabase = await createClient()

  let fullName: string | null = null
  let assessments: Array<{
    id: string
    overall_score: number
    impact_level: string
    priority_areas: string[]
    created_at: string
    status: string
  }> = []
  let appointments: Array<{
    id: string
    type: string
    status: string
    scheduled_at: string
    duration_minutes: number
    meeting_link: string | null
    notes: string | null
  }> = []

  if (supabase) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name, role")
      .eq("id", user.id)
      .single()

    fullName = profile?.full_name ?? null

    if (profile?.role?.trim()?.toUpperCase() === "ADMIN") {
      redirect("/admin/overview")
    }

    const { data: userAssessments } = await supabase
      .from("assessments")
      .select("id, overall_score, impact_level, priority_areas, created_at, status")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(30)

    assessments = userAssessments ?? []

    const { data: userAppointments } = await supabase
      .from("appointments")
      .select("id, type, status, scheduled_at, duration_minutes, meeting_link, notes")
      .eq("user_id", user.id)
      .order("scheduled_at", { ascending: true })
      .limit(20)

    appointments = userAppointments ?? []
  }

  const recentAssessments = assessments.slice(0, 5).map((assessment) => ({
    id: assessment.id,
    date: new Date(assessment.created_at).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    score: assessment.overall_score,
    status: assessment.status,
    priorityArea: assessment.priority_areas?.[0] ?? "General wellness",
  }))

  const scoreHistory = [...assessments]
    .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
    .map((assessment) => ({
      score: assessment.overall_score,
      dateLabel: new Date(assessment.created_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
    }))

  const upcomingAppointments = appointments
    .filter((appointment) => {
      const scheduledAt = new Date(appointment.scheduled_at).getTime()
      const now = Date.now()
      return scheduledAt >= now && appointment.status !== "cancelled" && appointment.status !== "completed"
    })
    .slice(0, 4)
    .map((appointment) => ({
      id: appointment.id,
      type: appointment.type,
      date: new Date(appointment.scheduled_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      time: new Date(appointment.scheduled_at).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      }),
      duration: appointment.duration_minutes,
      isVirtual: Boolean(appointment.meeting_link),
      status: appointment.status,
      coach: "Salvere Coach",
    }))

  return (
    <DashboardContent
      user={{
        name: fullName || user.email?.split("@")[0] || "there",
        email: user.email || "",
      }}
      recentAssessments={recentAssessments}
      upcomingAppointments={upcomingAppointments}
      scoreHistory={scoreHistory}
    />
  )
}
