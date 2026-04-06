"use client"

import { Users, FileText, TrendingUp, Calendar } from "lucide-react"

const stats = [
  {
    label: "Total Users",
    value: "1,247",
    change: "+12%",
    changeType: "positive" as const,
    icon: Users,
  },
  {
    label: "Assessments",
    value: "3,891",
    change: "+23%",
    changeType: "positive" as const,
    icon: FileText,
  },
  {
    label: "Avg. Score",
    value: "72.4",
    change: "+5.2",
    changeType: "positive" as const,
    icon: TrendingUp,
  },
  {
    label: "Sessions Booked",
    value: "284",
    change: "+8%",
    changeType: "positive" as const,
    icon: Calendar,
  },
]

export function AdminStats() {
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
            <span className={`text-sm font-medium ${
              stat.changeType === "positive" ? "text-green-600" : "text-red-500"
            }`}>
              {stat.change}
            </span>
          </div>
          <p className="mt-4 font-serif text-2xl font-medium text-[#1C1917]">
            {stat.value}
          </p>
          <p className="text-sm text-[#57534E]">{stat.label}</p>
        </div>
      ))}
    </div>
  )
}
