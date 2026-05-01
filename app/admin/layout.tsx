import { requireAdmin } from "@/lib/auth/guards"
import { AdminSidebar } from "@/components/admin/admin-sidebar"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user } = await requireAdmin()

  return (
    <main className="min-h-screen bg-[#F5F5F4]">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="mb-8 rounded-3xl border border-[#E7E5E4] bg-white p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#A8A29E]">Salvere Administration</p>
          <h1 className="mt-3 font-serif text-4xl text-[#1C1917]">Platform Operations</h1>
          <p className="mt-2 max-w-3xl text-sm text-[#57534E]">
            Manage users, monitor assessments, and control system-level workflows. This area is restricted to admins.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
          <AdminSidebar adminEmail={user.email || ""} />
          <section className="rounded-3xl border border-[#E7E5E4] bg-[#F5F5F4] p-6">{children}</section>
        </div>
      </div>
    </main>
  )
}