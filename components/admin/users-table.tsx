"use client"

import { useState } from "react"
import { Search, MoreHorizontal, Shield, User } from "lucide-react"
import { cn } from "@/lib/utils"

const mockUsers = [
  {
    id: "USR-001",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    role: "USER",
    assessments: 5,
    lastActive: "2 hours ago",
    status: "active",
  },
  {
    id: "USR-002",
    name: "Michael Chen",
    email: "m.chen@example.com",
    role: "USER",
    assessments: 3,
    lastActive: "1 day ago",
    status: "active",
  },
  {
    id: "USR-003",
    name: "Dr. Emily Davis",
    email: "emily.d@salvere.com",
    role: "ADMIN",
    assessments: 0,
    lastActive: "Just now",
    status: "active",
  },
  {
    id: "USR-004",
    name: "James Wilson",
    email: "j.wilson@example.com",
    role: "USER",
    assessments: 8,
    lastActive: "3 days ago",
    status: "inactive",
  },
  {
    id: "USR-005",
    name: "Lisa Anderson",
    email: "l.anderson@example.com",
    role: "USER",
    assessments: 2,
    lastActive: "1 week ago",
    status: "active",
  },
  {
    id: "USR-006",
    name: "Robert Taylor",
    email: "r.taylor@example.com",
    role: "USER",
    assessments: 12,
    lastActive: "4 hours ago",
    status: "active",
  },
]

export function UsersTable() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredUsers = mockUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="rounded-xl border border-[#E7E5E4] bg-white shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-[#E7E5E4]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A8A29E]" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-80 rounded-lg border border-[#E7E5E4] bg-[#FAFAF9] py-2 pl-10 pr-4 text-sm outline-none focus:border-[#1C1917] focus:ring-1 focus:ring-[#1C1917]"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#E7E5E4] bg-[#FAFAF9]">
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#57534E]">
                User
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#57534E]">
                Role
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#57534E]">
                Assessments
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#57534E]">
                Last Active
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
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-[#FAFAF9]">
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E7E5E4]">
                      {user.role === "ADMIN" ? (
                        <Shield className="h-5 w-5 text-[#57534E]" />
                      ) : (
                        <User className="h-5 w-5 text-[#57534E]" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#1C1917]">
                        {user.name}
                      </p>
                      <p className="text-xs text-[#57534E]">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                      user.role === "ADMIN"
                        ? "bg-[#1C1917] text-[#F5F5F4]"
                        : "bg-[#E7E5E4] text-[#1C1917]"
                    )}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-4 text-sm text-[#57534E]">
                  {user.assessments}
                </td>
                <td className="px-4 py-4 text-sm text-[#57534E]">
                  {user.lastActive}
                </td>
                <td className="px-4 py-4">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
                      user.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-[#E7E5E4] text-[#57534E]"
                    )}
                  >
                    <span
                      className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        user.status === "active" ? "bg-green-500" : "bg-[#A8A29E]"
                      )}
                    />
                    {user.status}
                  </span>
                </td>
                <td className="px-4 py-4 text-right">
                  <button className="inline-flex items-center justify-center rounded-lg p-2 text-[#57534E] hover:bg-[#E7E5E4] hover:text-[#1C1917]">
                    <MoreHorizontal className="h-4 w-4" />
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
          Showing <span className="font-medium">{filteredUsers.length}</span> of{" "}
          <span className="font-medium">{mockUsers.length}</span> users
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
