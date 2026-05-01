import { createClient } from "@/lib/supabase/server"

export async function getAdminDashboardData() {
  const supabase = await createClient()

  const profilesResponse = supabase
    ? await supabase
        .from("profiles")
        .select("id, email, full_name, role, created_at, updated_at")
        .order("created_at", { ascending: false })
    : { data: null }

  const assessmentsResponse = supabase
    ? await supabase
        .from("assessments")
        .select("id, user_id, overall_score, priority_areas, status, created_at")
        .order("created_at", { ascending: false })
        .limit(250)
    : { data: null }

  const profiles = profilesResponse.data ?? []
  const assessments = assessmentsResponse.data ?? []

  const profileMap = new Map(
    profiles.map((profile) => [
      profile.id,
      {
        name: profile.full_name ?? profile.email?.split("@")[0] ?? "Unknown user",
        email: profile.email ?? "",
      },
    ])
  )

  const assessmentCounts = assessments.reduce<Record<string, number>>((acc, item) => {
    acc[item.user_id] = (acc[item.user_id] ?? 0) + 1
    return acc
  }, {})

  const stats = {
    totalUsers: profiles.length,
    totalAssessments: assessments.length,
    averageScore:
      assessments.length > 0
        ? assessments.reduce((sum, item) => sum + (item.overall_score ?? 0), 0) / assessments.length
        : 0,
    adminCount: profiles.filter((profile) => profile.role === "ADMIN").length,
  }

  const adminAssessments = assessments.map((item) => {
    const profile = profileMap.get(item.user_id)

    return {
      id: item.id,
      user: profile?.name ?? "Unknown user",
      email: profile?.email ?? "",
      date: new Date(item.created_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      score: item.overall_score ?? 0,
      priorityAreas: item.priority_areas ?? [],
      status: (item.status ?? "draft") as "draft" | "completed" | "reviewed",
    }
  })

  const adminUsers = profiles.map((profile) => {
    const lastUpdated = profile.updated_at ? new Date(profile.updated_at) : null
    const daysSinceActivity = lastUpdated
      ? Math.floor((Date.now() - lastUpdated.getTime()) / (1000 * 60 * 60 * 24))
      : null

    return {
      id: profile.id,
      name: profile.full_name ?? profile.email?.split("@")[0] ?? "Unknown user",
      email: profile.email ?? "",
      role: (profile.role ?? "USER") as "USER" | "ADMIN",
      assessments: assessmentCounts[profile.id] ?? 0,
      lastActive: lastUpdated
        ? lastUpdated.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        : "Unknown",
      status: (daysSinceActivity !== null && daysSinceActivity <= 30 ? "active" : "inactive") as "active" | "inactive",
    }
  })

  return {
    stats,
    adminAssessments,
    adminUsers,
  }
}