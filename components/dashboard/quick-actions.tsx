"use client"

import Link from "next/link"
import { LineChart, Calendar, CreditCard, Settings } from "lucide-react"

const actions = [
  {
    label: "View Progress",
    description: "Review your trends and milestones",
    href: "/dashboard",
    icon: LineChart,
  },
  {
    label: "Book Session",
    description: "Schedule with your coach",
    href: "/dashboard/appointments",
    icon: Calendar,
  },
  {
    label: "Payments",
    description: "Track your transaction status",
    href: "/dashboard/payments",
    icon: CreditCard,
  },
  {
    label: "Settings",
    description: "Manage your account",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export function QuickActions() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {actions.map((action) => (
        <Link
          key={action.label}
          href={action.href}
          className="group rounded-xl border border-[#E7E5E4] bg-white p-4 shadow-sm transition-all hover:border-[#D6D3D1] hover:shadow-md"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1C1917] group-hover:bg-[#57534E] transition-colors">
            <action.icon className="h-5 w-5 text-[#F5F5F4]" />
          </div>
          <p className="mt-3 font-medium text-[#1C1917]">{action.label}</p>
          <p className="text-xs text-[#57534E]">{action.description}</p>
        </Link>
      ))}
    </div>
  )
}
