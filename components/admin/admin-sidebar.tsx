"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Shield, LayoutDashboard, Users, FileText, ActivitySquare, CreditCard, Settings, ArrowLeft, LogOut, BookOpen, Briefcase } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { cn } from "@/lib/utils"

const adminNav = [
  { label: "Overview", href: "/admin/overview", icon: LayoutDashboard },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Blog Posts", href: "/admin/blog", icon: BookOpen },
  { label: "Services", href: "/admin/services", icon: Briefcase },
  { label: "Assessments", href: "/admin/assessments", icon: FileText },
  { label: "Operations", href: "/admin/operations", icon: ActivitySquare },
  { label: "Payments", href: "/admin/payments", icon: CreditCard },
  { label: "Settings", href: "/admin/settings", icon: Settings },
]

interface AdminSidebarProps {
  adminEmail: string
}

export function AdminSidebar({ adminEmail }: AdminSidebarProps) {
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
    <aside className="w-full rounded-3xl border border-[#E7E5E4] bg-white p-5 lg:sticky lg:top-24 lg:w-[300px]">
      <div className="mb-6 rounded-2xl border border-[#E7E5E4] bg-[#FAFAF9] p-4">
        <div className="flex items-center gap-2 text-[#57534E]">
          <Shield className="h-4 w-4" />
          <p className="text-xs font-semibold uppercase tracking-[0.18em]">Admin Control</p>
        </div>
        <p className="mt-3 text-sm text-[#1C1917]">{adminEmail}</p>
      </div>

      <nav className="space-y-2">
        {adminNav.map((item) => {
          const Icon = item.icon
          const active = pathname === item.href

          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                active
                  ? "bg-[var(--vital-mint)] text-[var(--vital-green)]"
                  : "text-[#57534E] hover:bg-[#FAFAF9] hover:text-[#1C1917]"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="mt-6 space-y-2 border-t border-[#E7E5E4] pt-4">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-[#57534E] hover:bg-[#FAFAF9] hover:text-[#1C1917]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to site
        </Link>
        <button
          type="button"
          onClick={handleSignOut}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-[#57534E] hover:bg-[#FAFAF9] hover:text-[#1C1917]"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </aside>
  )
}