"use client"

import { useState } from "react"
import { Search, ChevronDown, Eye } from "lucide-react"
import { cn } from "@/lib/utils"

const mockAssessments = [
  {
    id: "ASM-001",
    user: "Sarah Johnson",
    email: "sarah.j@example.com",
    date: "Mar 28, 2026",
    score: 78,
    priorityAreas: ["Energy", "Sleep"],
    status: "completed",
  },
  {
    id: "ASM-002",
    user: "Michael Chen",
    email: "m.chen@example.com",
    date: "Mar 27, 2026",
    score: 65,
    priorityAreas: ["Blood Sugar", "Weight"],
    status: "completed",
  },
  {
    id: "ASM-003",
    user: "Emily Davis",
    email: "emily.d@example.com",
    date: "Mar 27, 2026",
    score: 82,
    priorityAreas: ["Hormones"],
    status: "completed",
  },
  {
    id: "ASM-004",
    user: "James Wilson",
    email: "j.wilson@example.com",
    date: "Mar 26, 2026",
    score: 58,
    priorityAreas: ["Brain Fog", "Energy", "Sleep"],
    status: "reviewed",
  },
  {
    id: "ASM-005",
    user: "Lisa Anderson",
    email: "l.anderson@example.com",
    date: "Mar 26, 2026",
    score: 71,
    priorityAreas: ["Weight", "Hormones"],
    status: "completed",
  },
  {
    id: "ASM-006",
    user: "Robert Taylor",
    email: "r.taylor@example.com",
    date: "Mar 25, 2026",
    score: 45,
    priorityAreas: ["Blood Sugar", "Energy", "Sleep"],
    status: "flagged",
  },
  {
    id: "ASM-007",
    user: "Jennifer Brown",
    email: "j.brown@example.com",
    date: "Mar 25, 2026",
    score: 89,
    priorityAreas: ["Sleep"],
    status: "completed",
  },
  {
    id: "ASM-008",
    user: "David Martinez",
    email: "d.martinez@example.com",
    date: "Mar 24, 2026",
    score: 62,
    priorityAreas: ["Weight", "Brain Fog"],
    status: "completed",
  },
]

const statusStyles = {
  completed: "bg-green-100 text-green-700",
  reviewed: "bg-blue-100 text-blue-700",
  flagged: "bg-red-100 text-red-700",
}

export function AssessmentsTable() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<"date" | "score">("date")

  const filteredAssessments = mockAssessments.filter(
    (a) =>
      a.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.id.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const sortedAssessments = [...filteredAssessments].sort((a, b) => {
    if (sortBy === "score") return b.score - a.score
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  return (
    <div className="rounded-xl border border-[#E7E5E4] bg-white shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-[#E7E5E4] flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A8A29E]" />
          <input
            type="text"
            placeholder="Search by name, email, or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-80 rounded-lg border border-[#E7E5E4] bg-[#FAFAF9] py-2 pl-10 pr-4 text-sm outline-none focus:border-[#1C1917] focus:ring-1 focus:ring-[#1C1917]"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#57534E]">Sort by:</span>
          <button
            onClick={() => setSortBy(sortBy === "date" ? "score" : "date")}
            className="flex items-center gap-1 rounded-lg border border-[#E7E5E4] bg-[#FAFAF9] px-3 py-2 text-sm font-medium text-[#1C1917] hover:bg-[#E7E5E4]"
          >
            {sortBy === "date" ? "Date" : "Score"}
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#E7E5E4] bg-[#FAFAF9]">
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#57534E]">
                ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#57534E]">
                User
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#57534E]">
                Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#57534E]">
                Score
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#57534E]">
                Priority Areas
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#57534E]">
                Status
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-[#57534E]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E7E5E4]">
            {sortedAssessments.map((assessment) => (
              <tr key={assessment.id} className="hover:bg-[#FAFAF9]">
                <td className="px-4 py-4 text-sm font-mono text-[#57534E]">
                  {assessment.id}
                </td>
                <td className="px-4 py-4">
                  <div>
                    <p className="text-sm font-medium text-[#1C1917]">
                      {assessment.user}
                    </p>
                    <p className="text-xs text-[#57534E]">{assessment.email}</p>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-[#57534E]">
                  {assessment.date}
                </td>
                <td className="px-4 py-4">
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                      assessment.score >= 75
                        ? "bg-green-100 text-green-700"
                        : assessment.score >= 60
                        ? "bg-amber-100 text-amber-700"
                        : "bg-red-100 text-red-700"
                    )}
                  >
                    {assessment.score}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex flex-wrap gap-1">
                    {assessment.priorityAreas.map((area) => (
                      <span
                        key={area}
                        className="inline-flex items-center rounded-md bg-[#E7E5E4] px-2 py-0.5 text-xs text-[#1C1917]"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
                      statusStyles[assessment.status as keyof typeof statusStyles]
                    )}
                  >
                    {assessment.status}
                  </span>
                </td>
                <td className="px-4 py-4 text-right">
                  <button className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium text-[#57534E] hover:bg-[#E7E5E4] hover:text-[#1C1917]">
                    <Eye className="h-4 w-4" />
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="border-t border-[#E7E5E4] px-4 py-3 flex items-center justify-between">
        <p className="text-sm text-[#57534E]">
          Showing <span className="font-medium">{sortedAssessments.length}</span> of{" "}
          <span className="font-medium">{mockAssessments.length}</span> results
        </p>
        <div className="flex gap-2">
          <button className="rounded-lg border border-[#E7E5E4] px-3 py-1.5 text-sm font-medium text-[#57534E] hover:bg-[#FAFAF9] disabled:opacity-50" disabled>
            Previous
          </button>
          <button className="rounded-lg border border-[#E7E5E4] px-3 py-1.5 text-sm font-medium text-[#57534E] hover:bg-[#FAFAF9] disabled:opacity-50" disabled>
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
