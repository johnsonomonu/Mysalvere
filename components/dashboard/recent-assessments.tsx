"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileText, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

const assessments = [
  {
    id: "1",
    date: "Mar 25, 2026",
    score: 78,
    status: "completed",
    priorityArea: "Energy",
  },
  {
    id: "2",
    date: "Feb 18, 2026",
    score: 72,
    status: "completed",
    priorityArea: "Sleep",
  },
  {
    id: "3",
    date: "Jan 10, 2026",
    score: 65,
    status: "completed",
    priorityArea: "Blood Sugar",
  },
]

export function RecentAssessments() {
  return (
    <div className="rounded-2xl border border-[#E7E5E4] bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-serif text-lg font-medium text-[#1C1917]">
          Recent Assessments
        </h2>
        <Link 
          href="/assessment"
          className="text-sm text-[#57534E] hover:text-[#1C1917] transition-colors"
        >
          View all
        </Link>
      </div>

      <div className="space-y-3">
        {assessments.map((assessment) => (
          <div
            key={assessment.id}
            className="flex items-center gap-3 p-3 rounded-lg border border-[#E7E5E4] bg-[#FAFAF9] hover:border-[#D6D3D1] transition-colors cursor-pointer"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1C1917]">
              <FileText className="h-5 w-5 text-[#F5F5F4]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#1C1917]">
                {assessment.date}
              </p>
              <p className="text-xs text-[#57534E]">
                Priority: {assessment.priorityArea}
              </p>
            </div>
            <div className="text-right">
              <span className={cn(
                "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                assessment.score >= 75 
                  ? "bg-green-100 text-green-700"
                  : assessment.score >= 60
                  ? "bg-amber-100 text-amber-700"
                  : "bg-red-100 text-red-700"
              )}>
                {assessment.score}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-[#E7E5E4]">
        <Button variant="outline" className="w-full" asChild>
          <Link href="/assessment">
            New Assessment
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
