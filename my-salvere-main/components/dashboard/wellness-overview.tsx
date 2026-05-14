"use client"

import { 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Activity,
  LineChart,
  BarChart3,
  Target,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface WellnessOverviewProps {
  scoreHistory: Array<{
    score: number
    dateLabel: string
  }>
}

export function WellnessOverview({ scoreHistory }: WellnessOverviewProps) {
  const latest = scoreHistory.at(-1)?.score ?? 0
  const previous = scoreHistory.at(-2)?.score ?? latest
  const monthSlice = scoreHistory.slice(-4)
  const monthAverage =
    monthSlice.length > 0
      ? monthSlice.reduce((sum, item) => sum + item.score, 0) / monthSlice.length
      : latest
  const best = scoreHistory.length > 0 ? Math.max(...scoreHistory.map((item) => item.score)) : latest

  const metrics = [
    {
      label: "Overall Wellness",
      value: latest,
      change: latest - previous,
      trend: latest > previous ? "up" : latest < previous ? "down" : "stable",
      icon: Activity,
      color: "bg-[#1C1917]",
      suffix: "/ 100",
    },
    {
      label: "Trend Delta",
      value: latest - previous,
      change: latest - previous,
      trend: latest > previous ? "up" : latest < previous ? "down" : "stable",
      icon: LineChart,
      color: "bg-[#57534E]",
      suffix: " pts",
    },
    {
      label: "30-Day Average",
      value: monthAverage,
      change: monthAverage - previous,
      trend: monthAverage > previous ? "up" : monthAverage < previous ? "down" : "stable",
      icon: BarChart3,
      color: "bg-[#78716C]",
      suffix: " avg",
    },
    {
      label: "Best Recorded",
      value: best,
      change: best - latest,
      trend: best > latest ? "up" : "stable",
      icon: Target,
      color: "bg-[#A8A29E]",
      suffix: " peak",
    },
  ] as const

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
  metric: {
    label: string
    value: number
    change: number
    trend: "up" | "down" | "stable"
    icon: React.ComponentType<{ className?: string }>
    color: string
    suffix: string
  }
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
          {Math.round(metric.value)}
        </span>
        <span className="text-sm text-[#57534E]">{metric.suffix}</span>
      </div>
      
      <p className="mt-1 text-sm text-[#57534E]">{metric.label}</p>
      
      <div className={cn("mt-2 flex items-center gap-1 text-xs", trendColor)}>
        <TrendIcon className="h-3 w-3" />
        <span>
          {metric.change > 0 && "+"}
          {Math.round(metric.change)}
        </span>
        <span className="text-[#A8A29E]">vs previous entry</span>
      </div>
    </div>
  )
}
