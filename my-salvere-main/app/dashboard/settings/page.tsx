import type { Metadata } from "next"
import { Settings, Shield, Bell, UserRound } from "lucide-react"
import { SettingsForm } from "@/components/dashboard/settings-form"
import { createClient } from "@/lib/supabase/server"
import { requireUser } from "@/lib/auth/guards"

export const metadata: Metadata = {
  title: "Settings | Salvere",
  description: "Update your profile, notifications, and account security settings.",
}

export default async function DashboardSettingsPage() {
  const user = await requireUser("/auth/login?redirect=/dashboard/settings")
  const supabase = await createClient()

  let profile = {
    id: user.id,
    email: user.email ?? "",
    full_name: null,
    avatar_url: null,
    timezone: null,
    email_notifications: true,
    session_reminders: true,
    product_updates: false,
    role: "USER",
  }

  if (supabase) {
    const { data } = await supabase
      .from("profiles")
      .select("id, email, full_name, avatar_url, timezone, email_notifications, session_reminders, product_updates, role")
      .eq("id", user.id)
      .single()

    if (data) {
      profile = {
        id: data.id,
        email: data.email ?? user.email ?? "",
        full_name: data.full_name ?? null,
        avatar_url: data.avatar_url ?? null,
        timezone: data.timezone ?? null,
        email_notifications: data.email_notifications ?? true,
        session_reminders: data.session_reminders ?? true,
        product_updates: data.product_updates ?? false,
        role: data.role ?? "USER",
      }
    }
  }

  return (
    <section className="space-y-6">
      <div className="rounded-[28px] border border-[#E7E5E4] bg-white p-8 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A8A29E]">Settings</p>
        <h1 className="mt-3 font-serif text-3xl text-[#1C1917]">Manage your account</h1>
        <p className="mt-3 max-w-2xl text-[#57534E]">
          Update the details that shape your dashboard, notifications, and sign-in experience.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-[#E7E5E4] bg-white p-5">
          <UserRound className="h-5 w-5 text-[#1C1917]" />
          <p className="mt-3 text-sm font-medium text-[#1C1917]">Profile details</p>
          <p className="mt-1 text-sm text-[#78716C]">Name, avatar, and timezone.</p>
        </div>
        <div className="rounded-2xl border border-[#E7E5E4] bg-white p-5">
          <Bell className="h-5 w-5 text-[#1C1917]" />
          <p className="mt-3 text-sm font-medium text-[#1C1917]">Notifications</p>
          <p className="mt-1 text-sm text-[#78716C]">Control reminders and account emails.</p>
        </div>
        <div className="rounded-2xl border border-[#E7E5E4] bg-white p-5">
          <Shield className="h-5 w-5 text-[#1C1917]" />
          <p className="mt-3 text-sm font-medium text-[#1C1917]">Security</p>
          <p className="mt-1 text-sm text-[#78716C]">Change email, password, or sign out everywhere.</p>
        </div>
      </div>

      <SettingsForm userId={user.id} currentEmail={profile.email} profile={profile} />
    </section>
  )
}
