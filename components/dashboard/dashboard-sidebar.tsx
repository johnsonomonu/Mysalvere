"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { cn } from "@/lib/utils"
import {
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  LayoutDashboard,
  Settings,
  CalendarDays,
  LogOut,
  MessageCircle,
} from "lucide-react"

const navItems = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Assessment", href: "/assessment", icon: ClipboardList },
  { label: "Appointments", href: "/dashboard/appointments", icon: CalendarDays },
  { label: "Messages", href: "/dashboard/messages", icon: MessageCircle },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
]

interface DashboardSidebarProps {
  collapsed: boolean
  onToggleCollapsed: () => void
}

export function DashboardSidebar({ collapsed, onToggleCollapsed }: DashboardSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  const handleSignOut = async () => {
    const supabase = createClient()
    if (supabase) {
      await supabase.auth.signOut()
    }
    router.push("/")
    router.refresh()
  }

  return (
    <aside
      className={cn(
        "hidden lg:flex lg:flex-col lg:sticky lg:top-24 h-fit rounded-[28px] border border-[#E7E5E4] bg-white p-5 shadow-sm transition-all duration-300",
        collapsed ? "lg:w-[92px]" : "lg:w-[280px]"
      )}
    >
      <div className={cn("mb-6", collapsed && "mb-4")}> 
        <div className="mb-2 flex items-center justify-between">
          {!collapsed && (
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#A8A29E]">SalvereTracker</p>
          )}
          <button
            type="button"
            onClick={onToggleCollapsed}
            className="rounded-full border border-[#E7E5E4] p-1.5 text-[#57534E] hover:text-[#1C1917]"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>

        {!collapsed && (
          <>
            <h2 className="mt-2 font-serif text-2xl text-[#1C1917]">Your space</h2>
            <p className="mt-2 text-sm leading-6 text-[#57534E]">Track progress, manage sessions, and keep your account in one place.</p>
          </>
        )}
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))

          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center rounded-2xl px-4 py-3 text-sm font-medium transition-colors",
                collapsed ? "justify-center" : "gap-3",
                active
                  ? "bg-[var(--vital-mint)] text-[var(--vital-green)]"
                  : "text-[#57534E] hover:bg-[#FAFAF9] hover:text-[#1C1917]"
              )}
              title={item.label}
            >
              <Icon className="h-4 w-4" />
              {!collapsed && item.label}
            </Link>
          )
        })}
      </nav>

      {!collapsed && (
        <div className="mt-6 rounded-2xl bg-[#FAFAF9] p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#A8A29E]">Need something fast?</p>
          <Button asChild className="mt-3 w-full rounded-2xl">
            <Link href="/assessment">Start assessment</Link>
          </Button>
        </div>
      )}

      <Button
        type="button"
        variant="outline"
        className={cn("mt-4 w-full rounded-2xl px-4", collapsed ? "justify-center" : "justify-start")}
        onClick={handleSignOut}
      >
        <LogOut className="h-4 w-4" />
        {!collapsed && "Sign out"}
      </Button>
    </aside>
  )
}
