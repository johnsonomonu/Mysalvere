"use client"

import { FadeInUp } from "@/components/motion"
import { WellnessOverview } from "./wellness-overview"
import { ProgressCharts } from "./progress-charts"
import { RecentAssessments } from "./recent-assessments"
import { UpcomingAppointments } from "./upcoming-appointments"
import { QuickActions } from "./quick-actions"

export function DashboardContent() {
  // Mock user data - would come from Supabase auth
  const user = {
    name: "Sarah",
    email: "sarah@example.com",
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
      {/* Header */}
      <FadeInUp>
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-medium text-[#1C1917]">
            Welcome back, {user.name}
          </h1>
          <p className="mt-1 text-[#57534E]">
            Track your wellness journey and see your progress over time.
          </p>
        </div>
      </FadeInUp>

      {/* Quick Actions */}
      <FadeInUp delay={0.1}>
        <QuickActions />
      </FadeInUp>

      {/* Main Grid */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column - Wellness Overview */}
        <div className="lg:col-span-2 space-y-6">
          <FadeInUp delay={0.2}>
            <WellnessOverview />
          </FadeInUp>
          <FadeInUp delay={0.3}>
            <ProgressCharts />
          </FadeInUp>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          <FadeInUp delay={0.25}>
            <UpcomingAppointments />
          </FadeInUp>
          <FadeInUp delay={0.35}>
            <RecentAssessments />
          </FadeInUp>
        </div>
      </div>
    </div>
  )
}
