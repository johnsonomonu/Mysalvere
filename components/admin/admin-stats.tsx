"use client"

import { Users, FileText, TrendingUp, Shield } from "lucide-react"

interface AdminStatsProps {
  totalUsers: number
  totalAssessments: number
  averageScore: number
  adminCount: number
}

export function AdminStats({
  totalUsers,
  totalAssessments,
  averageScore,
  adminCount,
}: AdminStatsProps) {
  const stats = [
    {
      label: "Total Users",
      value: totalUsers.toLocaleString(),
      subtitle: "Registered accounts",
      icon: Users,
    },
    {
      label: "Assessments",
      value: totalAssessments.toLocaleString(),
      subtitle: "Captured responses",
      icon: FileText,
    },
    {
      label: "Avg. Score",
      value: averageScore.toFixed(1),
      subtitle: "Across all assessments",
      icon: TrendingUp,
    },
    {
      label: "Admin Accounts",
      value: adminCount.toLocaleString(),
      subtitle: "Privileged operators",
      icon: Shield,
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-xl border border-[#E7E5E4] bg-white p-6 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1C1917]">
              <stat.icon className="h-5 w-5 text-[#F5F5F4]" />
            </div>
          </div>
          <p className="mt-4 font-serif text-2xl font-medium text-[#1C1917]">
            {stat.value}
          </p>
          <p className="text-sm text-[#57534E]">{stat.label}</p>
          <p className="text-xs text-[#A8A29E]">{stat.subtitle}</p>
        </div>
      ))}
    </div>
  )
}
