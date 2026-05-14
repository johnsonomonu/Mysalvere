import type { Metadata } from "next"
import { AlertTriangle, CheckCircle2, Clock3, RadioTower } from "lucide-react"
import { requireAdmin } from "@/lib/auth/guards"
import { createClient } from "@/lib/supabase/server"

export const metadata: Metadata = {
  title: "Admin Operations | Salvere",
  description: "Monitor webhook processing, appointment load, and operational health.",
}

export default async function AdminOperationsPage() {
  await requireAdmin()
  const supabase = await createClient()

  const webhookResponse = supabase
    ? await supabase
        .from("payment_webhook_events")
        .select("id, provider, event_status, tx_ref, created_at, processed_at")
        .order("created_at", { ascending: false })
        .limit(25)
    : { data: null }

  const appointmentsResponse = supabase
    ? await supabase
        .from("appointments")
        .select("id, status, scheduled_at, type")
        .order("scheduled_at", { ascending: false })
        .limit(100)
    : { data: null }

  const profilesResponse = supabase
    ? await supabase
        .from("profiles")
        .select("id, role")
    : { data: null }

  const webhookEvents = webhookResponse.data ?? []
  const appointments = appointmentsResponse.data ?? []
  const profiles = profilesResponse.data ?? []

  const webhookProcessed = webhookEvents.filter((event) => event.event_status === "processed").length
  const webhookFailed = webhookEvents.filter((event) => event.event_status === "failed").length
  const webhookPending = webhookEvents.filter((event) => event.event_status === "received").length

  const appointmentsScheduled = appointments.filter((appointment) =>
    appointment.status === "scheduled" || appointment.status === "confirmed"
  ).length
  const appointmentsCompleted = appointments.filter((appointment) => appointment.status === "completed").length

  const adminCount = profiles.filter((profile) => profile.role === "ADMIN").length
  const userCount = profiles.filter((profile) => profile.role === "USER").length

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#78716C]">Operations</p>
        <h2 className="mt-2 font-serif text-3xl text-[#1C1917]">System Monitoring and Workflow Health</h2>
        <p className="mt-2 text-sm text-[#57534E]">
          Live operational telemetry for webhooks, appointment flow, and role distribution.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-[#E7E5E4] bg-white p-5 shadow-sm">
          <CheckCircle2 className="h-5 w-5 text-green-700" />
          <p className="mt-3 text-sm font-medium text-[#1C1917]">Processed Webhooks</p>
          <p className="mt-1 font-serif text-3xl text-[#1C1917]">{webhookProcessed}</p>
        </div>
        <div className="rounded-2xl border border-[#E7E5E4] bg-white p-5 shadow-sm">
          <AlertTriangle className="h-5 w-5 text-red-700" />
          <p className="mt-3 text-sm font-medium text-[#1C1917]">Failed Webhooks</p>
          <p className="mt-1 font-serif text-3xl text-[#1C1917]">{webhookFailed}</p>
        </div>
        <div className="rounded-2xl border border-[#E7E5E4] bg-white p-5 shadow-sm">
          <Clock3 className="h-5 w-5 text-amber-700" />
          <p className="mt-3 text-sm font-medium text-[#1C1917]">Pending Webhooks</p>
          <p className="mt-1 font-serif text-3xl text-[#1C1917]">{webhookPending}</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-[#E7E5E4] bg-white p-5 shadow-sm">
          <h3 className="font-medium text-[#1C1917]">Appointment Pipeline</h3>
          <p className="mt-2 text-sm text-[#57534E]">Scheduled/Confirmed: {appointmentsScheduled}</p>
          <p className="mt-1 text-sm text-[#57534E]">Completed: {appointmentsCompleted}</p>
        </div>
        <div className="rounded-2xl border border-[#E7E5E4] bg-white p-5 shadow-sm">
          <h3 className="font-medium text-[#1C1917]">Role Distribution</h3>
          <p className="mt-2 text-sm text-[#57534E]">Admins: {adminCount}</p>
          <p className="mt-1 text-sm text-[#57534E]">Users: {userCount}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-[#E7E5E4] bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <RadioTower className="h-5 w-5 text-[#1C1917]" />
          <h3 className="font-medium text-[#1C1917]">Recent Webhook Events</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E7E5E4] bg-[#FAFAF9]">
                <th className="px-3 py-2 text-left text-xs uppercase tracking-[0.1em] text-[#78716C]">Time</th>
                <th className="px-3 py-2 text-left text-xs uppercase tracking-[0.1em] text-[#78716C]">Provider</th>
                <th className="px-3 py-2 text-left text-xs uppercase tracking-[0.1em] text-[#78716C]">Status</th>
                <th className="px-3 py-2 text-left text-xs uppercase tracking-[0.1em] text-[#78716C]">Transaction Ref</th>
              </tr>
            </thead>
            <tbody>
              {webhookEvents.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-3 py-6 text-sm text-[#78716C]">
                    No webhook events found yet. Run transactions to populate operational logs.
                  </td>
                </tr>
              ) : (
                webhookEvents.map((event) => (
                  <tr key={event.id} className="border-b border-[#F0EFEE]">
                    <td className="px-3 py-2 text-sm text-[#57534E]">
                      {new Date(event.created_at).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-3 py-2 text-sm text-[#57534E]">{event.provider}</td>
                    <td className="px-3 py-2 text-sm text-[#1C1917]">{event.event_status}</td>
                    <td className="px-3 py-2 text-sm text-[#57534E]">{event.tx_ref ?? "-"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
