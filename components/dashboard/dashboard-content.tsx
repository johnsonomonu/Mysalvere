"use client"

import { FadeInUp } from "@/components/motion"
import { WellnessOverview } from "./wellness-overview"
import { ProgressCharts } from "./progress-charts"
import { RecentAssessments } from "./recent-assessments"
import { UpcomingAppointments } from "./upcoming-appointments"
import { QuickActions } from "./quick-actions"

interface DashboardContentProps {
  user: {
    name: string
    email: string
  }
}

export function DashboardContent({ user }: DashboardContentProps) {

  return (
    <div className="py-4 lg:py-6">
      {/* Header */}
      <FadeInUp>
        <div className="mb-10">
          <h1 className="font-serif text-4xl font-medium leading-tight text-[#1C1917]">
            Welcome back, {user.name}
          </h1>
          <p className="mt-2 max-w-2xl text-lg text-[#57534E]">
            Track your wellness journey and see your progress over time.
          </p>
        </div>
      </FadeInUp>

      {/* Quick Actions */}
      <FadeInUp delay={0.1}>
        <QuickActions />
      </FadeInUp>

      {/* Main Grid */}
      <div className="mt-10 grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Left Column - Wellness Overview */}
        <div className="xl:col-span-2 space-y-6">
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
