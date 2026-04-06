"use client"

import { useState } from "react"
import { FadeInUp } from "@/components/motion"
import { AdminStats } from "./admin-stats"
import { AssessmentsTable } from "./assessments-table"
import { UsersTable } from "./users-table"
import { cn } from "@/lib/utils"

type Tab = "assessments" | "users"

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("assessments")

  return (
    <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
      {/* Header */}
      <FadeInUp>
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-medium text-[#1C1917]">
            Admin Dashboard
          </h1>
          <p className="mt-1 text-[#57534E]">
            Manage users and view all assessment data.
          </p>
        </div>
      </FadeInUp>

      {/* Stats */}
      <FadeInUp delay={0.1}>
        <AdminStats />
      </FadeInUp>

      {/* Tabs */}
      <FadeInUp delay={0.2}>
        <div className="mt-8 border-b border-[#E7E5E4]">
          <nav className="-mb-px flex gap-6">
            <button
              onClick={() => setActiveTab("assessments")}
              className={cn(
                "border-b-2 pb-4 text-sm font-medium transition-colors",
                activeTab === "assessments"
                  ? "border-[#1C1917] text-[#1C1917]"
                  : "border-transparent text-[#57534E] hover:border-[#D6D3D1] hover:text-[#1C1917]"
              )}
            >
              All Assessments
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={cn(
                "border-b-2 pb-4 text-sm font-medium transition-colors",
                activeTab === "users"
                  ? "border-[#1C1917] text-[#1C1917]"
                  : "border-transparent text-[#57534E] hover:border-[#D6D3D1] hover:text-[#1C1917]"
              )}
            >
              Users
            </button>
          </nav>
        </div>
      </FadeInUp>

      {/* Content */}
      <FadeInUp delay={0.3}>
        <div className="mt-6">
          {activeTab === "assessments" ? (
            <AssessmentsTable />
          ) : (
            <UsersTable />
          )}
        </div>
      </FadeInUp>
    </div>
  )
}
