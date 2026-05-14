"use client"

import { useMemo, useState } from "react"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"

export interface AdminAssessmentRow {
  id: string
  user: string
  email: string
  date: string
  score: number
  priorityAreas: string[]
  status: "draft" | "completed" | "reviewed"
}

interface AssessmentsTableProps {
  assessments: AdminAssessmentRow[]
}

const statusStyles = {
  draft: "bg-[#E7E5E4] text-[#57534E]",
  completed: "bg-green-100 text-green-700",
  reviewed: "bg-blue-100 text-blue-700",
}

export function AssessmentsTable({ assessments }: AssessmentsTableProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<"date" | "score">("date")
  const [rows, setRows] = useState(assessments)
  const [savingId, setSavingId] = useState<string | null>(null)

  const filteredAssessments = useMemo(() => {
    const filtered = rows.filter(
      (a) =>
        a.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.id.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return [...filtered].sort((a, b) => {
      if (sortBy === "score") return b.score - a.score
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
  }, [rows, searchQuery, sortBy])

  const updateAssessmentStatus = async (
    assessmentId: string,
    status: "draft" | "completed" | "reviewed"
  ) => {
    const supabase = createClient()

    if (!supabase) {
      toast.error("Admin actions are unavailable in this environment.")
      return
    }

    setSavingId(assessmentId)

    try {
      const { error } = await supabase
        .from("assessments")
        .update({ status })
        .eq("id", assessmentId)

      if (error) {
        throw error
      }

      setRows((previous) =>
        previous.map((row) => (row.id === assessmentId ? { ...row, status } : row))
      )

      toast.success("Assessment status updated")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not update assessment status")
    } finally {
      setSavingId(null)
    }
  }

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
            type="button"
            onClick={() => setSortBy(sortBy === "date" ? "score" : "date")}
            className="flex items-center gap-1 rounded-lg border border-[#E7E5E4] bg-[#FAFAF9] px-3 py-2 text-sm font-medium text-[#1C1917] hover:bg-[#E7E5E4]"
          >
            Sort: {sortBy === "date" ? "Date" : "Score"}
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
            {filteredAssessments.map((assessment) => (
              <tr key={assessment.id} className="hover:bg-[#FAFAF9]">
                <td className="px-4 py-4 text-sm font-mono text-[#57534E]">
                  {assessment.id.slice(0, 8)}
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
                    {assessment.priorityAreas.length === 0 ? (
                      <span className="text-xs text-[#A8A29E]">None</span>
                    ) : (
                      assessment.priorityAreas.map((area) => (
                        <span
                          key={`${assessment.id}-${area}`}
                          className="inline-flex items-center rounded-md bg-[#E7E5E4] px-2 py-0.5 text-xs text-[#1C1917]"
                        >
                          {area}
                        </span>
                      ))
                    )}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
                        statusStyles[assessment.status]
                      )}
                    >
                      {assessment.status}
                    </span>
                    <select
                      value={assessment.status}
                      disabled={savingId === assessment.id}
                      onChange={(event) =>
                        updateAssessmentStatus(
                          assessment.id,
                          event.target.value as "draft" | "completed" | "reviewed"
                        )
                      }
                      className="rounded-md border border-[#E7E5E4] bg-white px-2 py-1 text-xs text-[#57534E]"
                    >
                      <option value="draft">draft</option>
                      <option value="completed">completed</option>
                      <option value="reviewed">reviewed</option>
                    </select>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="border-t border-[#E7E5E4] px-4 py-3">
        <p className="text-sm text-[#57534E]">
          Showing <span className="font-medium">{filteredAssessments.length}</span> of{" "}
          <span className="font-medium">{rows.length}</span> assessments
        </p>
      </div>
    </div>
  )
}
