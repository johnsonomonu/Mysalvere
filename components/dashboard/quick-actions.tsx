"use client"

import Link from "next/link"
import { ClipboardList, Calendar, MessageCircle, Settings } from "lucide-react"

const actions = [
  {
    label: "New Assessment",
    description: "Check your current wellness",
    href: "/assessment",
    icon: ClipboardList,
  },
  {
    label: "Book Session",
    description: "Schedule with your coach",
    href: "#",
    icon: Calendar,
  },
  {
    label: "Messages",
    description: "Chat with your support team",
    href: "#",
    icon: MessageCircle,
  },
  {
    label: "Settings",
    description: "Manage your account",
    href: "#",
    icon: Settings,
  },
]

export function QuickActions() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
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
