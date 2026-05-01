"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { cn } from "@/lib/utils"

interface DashboardShellProps {
  children: React.ReactNode
  isAdmin: boolean
}

export function DashboardShell({ children, isAdmin }: DashboardShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <main className="min-h-screen bg-[#F5F5F4]">
      <div className="sticky top-0 z-40 border-b border-[#E7E5E4] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-[#E7E5E4] px-4 py-2 text-sm text-[#57534E] hover:text-[#1C1917]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to site
            </Link>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A8A29E]">
              Dashboard
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl gap-8 px-6 pt-8 pb-12 lg:px-8">
        <DashboardSidebar
          isAdmin={isAdmin}
          collapsed={sidebarCollapsed}
          onToggleCollapsed={() => setSidebarCollapsed((value) => !value)}
        />
        <div className={cn("min-w-0 flex-1 transition-all duration-300", sidebarCollapsed && "lg:pl-1")}>{children}</div>
      </div>
    </main>
  )
}
