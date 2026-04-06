"use client"

import { 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Activity,
  Moon,
  Zap,
  Brain
} from "lucide-react"
import { cn } from "@/lib/utils"

const metrics = [
  {
    label: "Overall Wellness",
    value: 72,
    change: 8,
    trend: "up" as const,
    icon: Activity,
    color: "bg-[#1C1917]",
  },
  {
    label: "Energy Level",
    value: 65,
    change: 12,
    trend: "up" as const,
    icon: Zap,
    color: "bg-[#57534E]",
  },
  {
    label: "Sleep Quality",
    value: 78,
    change: -3,
    trend: "down" as const,
    icon: Moon,
    color: "bg-[#78716C]",
  },
  {
    label: "Mental Clarity",
    value: 70,
    change: 0,
    trend: "stable" as const,
    icon: Brain,
    color: "bg-[#A8A29E]",
  },
]

export function WellnessOverview() {
  return (
    <div className="rounded-2xl border border-[#E7E5E4] bg-white p-6 shadow-sm">
      <h2 className="font-serif text-xl font-medium text-[#1C1917] mb-6">
        Wellness Progress
      </h2>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {metrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </div>
    </div>
  )
}

interface MetricCardProps {
  metric: typeof metrics[number]
}

function MetricCard({ metric }: MetricCardProps) {
  const TrendIcon = metric.trend === "up" 
    ? TrendingUp 
    : metric.trend === "down" 
    ? TrendingDown 
    : Minus

  const trendColor = metric.trend === "up" 
    ? "text-green-600" 
    : metric.trend === "down" 
    ? "text-red-500" 
    : "text-[#57534E]"

  return (
    <div className="rounded-xl border border-[#E7E5E4] bg-[#FAFAF9] p-4">
      <div className="flex items-center gap-2 mb-3">
        <div className={cn("p-2 rounded-lg", metric.color)}>
          <metric.icon className="h-4 w-4 text-[#F5F5F4]" />
        </div>
      </div>
      
      <div className="flex items-baseline gap-1">
        <span className="font-serif text-2xl font-medium text-[#1C1917]">
          {metric.value}
        </span>
        <span className="text-sm text-[#57534E]">/ 100</span>
      </div>
      
      <p className="mt-1 text-sm text-[#57534E]">{metric.label}</p>
      
      <div className={cn("mt-2 flex items-center gap-1 text-xs", trendColor)}>
        <TrendIcon className="h-3 w-3" />
        <span>
          {metric.change > 0 && "+"}
          {metric.change}%
        </span>
        <span className="text-[#A8A29E]">vs last month</span>
      </div>
    </div>
  )
}
