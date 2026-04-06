"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

const timeRanges = ["Week", "Month", "3 Months", "Year"] as const
type TimeRange = typeof timeRanges[number]

const mockData = {
  Week: [65, 68, 72, 70, 75, 73, 78],
  Month: [55, 58, 62, 65, 63, 68, 70, 72, 75, 73, 76, 78, 80, 79, 82, 78, 80, 83, 85, 82, 84, 86, 85, 87, 88, 86, 89, 88],
  "3 Months": Array.from({ length: 12 }, (_, i) => 50 + i * 3 + Math.random() * 5),
  Year: Array.from({ length: 12 }, (_, i) => 45 + i * 4 + Math.random() * 8),
}

const labels = {
  Week: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  Month: Array.from({ length: 28 }, (_, i) => (i + 1).toString()),
  "3 Months": ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8", "W9", "W10", "W11", "W12"],
  Year: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
}

export function ProgressCharts() {
  const [timeRange, setTimeRange] = useState<TimeRange>("Week")
  const data = mockData[timeRange]
  const chartLabels = labels[timeRange]

  const maxValue = Math.max(...data)
  const minValue = Math.min(...data)

  return (
    <div className="rounded-2xl border border-[#E7E5E4] bg-white p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="font-serif text-xl font-medium text-[#1C1917]">
          Wellness Trend
        </h2>
        
        <div className="flex gap-1 rounded-lg border border-[#E7E5E4] p-1 bg-[#FAFAF9]">
          {timeRanges.map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={cn(
                "px-3 py-1.5 text-sm font-medium rounded-md transition-all",
                timeRange === range
                  ? "bg-[#1C1917] text-[#F5F5F4]"
                  : "text-[#57534E] hover:text-[#1C1917]"
              )}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="h-64 relative">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-8 w-8 flex flex-col justify-between text-xs text-[#A8A29E]">
          <span>{Math.round(maxValue)}</span>
          <span>{Math.round((maxValue + minValue) / 2)}</span>
          <span>{Math.round(minValue)}</span>
        </div>

        {/* Chart area */}
        <div className="ml-10 h-full pb-8 relative">
          {/* Grid lines */}
          <div className="absolute inset-0 bottom-8 flex flex-col justify-between">
            {[0, 1, 2].map((i) => (
              <div key={i} className="border-b border-[#E7E5E4] border-dashed" />
            ))}
          </div>

          {/* Bars */}
          <div className="relative h-full pb-8 flex items-end gap-1">
            {data.map((value, index) => {
              const height = ((value - minValue) / (maxValue - minValue)) * 100
              const showLabel = timeRange === "Week" || 
                (timeRange === "Month" && index % 7 === 0) ||
                (timeRange === "3 Months") ||
                (timeRange === "Year")

              return (
                <div key={index} className="flex-1 flex flex-col items-center gap-1">
                  <div 
                    className="w-full bg-[#1C1917] rounded-t-sm transition-all duration-300 hover:bg-[#57534E] cursor-pointer group relative"
                    style={{ height: `${Math.max(height, 5)}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#1C1917] text-[#F5F5F4] px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {Math.round(value)}
                    </div>
                  </div>
                  {showLabel && (
                    <span className="text-xs text-[#A8A29E] absolute -bottom-0 transform">
                      {chartLabels[index]}
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
