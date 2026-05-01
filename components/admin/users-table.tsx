"use client"

import { useMemo, useState } from "react"
import { Search, Shield, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"

export interface AdminUserRow {
  id: string
  name: string
  email: string
  role: "USER" | "ADMIN"
  assessments: number
  lastActive: string
  status: "active" | "inactive"
}

interface UsersTableProps {
  currentAdminId: string
  users: AdminUserRow[]
}

export function UsersTable({ currentAdminId, users }: UsersTableProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [rows, setRows] = useState(users)
  const [savingId, setSavingId] = useState<string | null>(null)

  const filteredUsers = useMemo(
    () =>
      rows.filter(
        (u) =>
          u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          u.email.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [rows, searchQuery]
  )

  const updateRole = async (targetUserId: string, role: "USER" | "ADMIN") => {
    const supabase = createClient()

    if (!supabase) {
      toast.error("Admin actions are unavailable in this environment.")
      return
    }

    setSavingId(targetUserId)

    try {
      const { error } = await supabase
        .from("profiles")
        .update({ role })
        .eq("id", targetUserId)

      if (error) {
        throw error
      }

      setRows((previous) =>
        previous.map((row) => (row.id === targetUserId ? { ...row, role } : row))
      )

      toast.success(`Role updated to ${role}`)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not update role")
    } finally {
      setSavingId(null)
    }
  }

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
                ID
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
                Manage
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
                <td className="px-4 py-4 text-xs font-mono text-[#57534E]">
                  {user.id.slice(0, 8)}
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
                  <select
                    value={user.role}
                    disabled={savingId === user.id || user.id === currentAdminId}
                    onChange={(event) => updateRole(user.id, event.target.value as "USER" | "ADMIN")}
                    className="rounded-md border border-[#E7E5E4] bg-white px-2 py-1 text-xs text-[#57534E]"
                    title={user.id === currentAdminId ? "You cannot change your own role here" : "Change role"}
                  >
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="border-t border-[#E7E5E4] px-4 py-3">
        <p className="text-sm text-[#57534E]">
          Showing <span className="font-medium">{filteredUsers.length}</span> of{" "}
          <span className="font-medium">{rows.length}</span> users
        </p>
      </div>
    </div>
  )
}
