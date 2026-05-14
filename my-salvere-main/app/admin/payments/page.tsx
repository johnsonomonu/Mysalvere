import type { Metadata } from "next"
import { CreditCard, CircleCheck, CircleAlert, Clock3 } from "lucide-react"
import { requireAdmin } from "@/lib/auth/guards"
import { createClient } from "@/lib/supabase/server"

export const metadata: Metadata = {
  title: "Admin Payments | Salvere",
  description: "Review payment webhook outcomes and transaction health.",
}

interface PaymentEventRow {
  id: string
  tx_ref: string | null
  event_status: "received" | "processed" | "failed" | "ignored"
  created_at: string
  processed_at: string | null
  payload: {
    data?: {
      amount?: number
      currency?: string
      customer?: {
        email?: string
      }
    }
  }
}

export default async function AdminPaymentsPage() {
  await requireAdmin()
  const supabase = await createClient()

  const eventsResponse = supabase
    ? await supabase
        .from("payment_webhook_events")
        .select("id, tx_ref, event_status, created_at, processed_at, payload")
        .order("created_at", { ascending: false })
        .limit(100)
    : { data: null }

  const events = (eventsResponse.data ?? []) as PaymentEventRow[]

  const processedCount = events.filter((row) => row.event_status === "processed").length
  const failedCount = events.filter((row) => row.event_status === "failed").length
  const pendingCount = events.filter((row) => row.event_status === "received").length

  return (
    <section className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#78716C]">Payments</p>
        <h2 className="mt-2 font-serif text-3xl text-[#1C1917]">Payment Operations</h2>
        <p className="mt-2 text-sm text-[#57534E]">
          Audit webhook processing outcomes and confirm transaction health.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-[#E7E5E4] bg-white p-5 shadow-sm">
          <CircleCheck className="h-5 w-5 text-green-700" />
          <p className="mt-3 text-sm font-medium text-[#1C1917]">Processed</p>
          <p className="mt-1 font-serif text-3xl text-[#1C1917]">{processedCount}</p>
        </div>
        <div className="rounded-2xl border border-[#E7E5E4] bg-white p-5 shadow-sm">
          <CircleAlert className="h-5 w-5 text-red-700" />
          <p className="mt-3 text-sm font-medium text-[#1C1917]">Failed</p>
          <p className="mt-1 font-serif text-3xl text-[#1C1917]">{failedCount}</p>
        </div>
        <div className="rounded-2xl border border-[#E7E5E4] bg-white p-5 shadow-sm">
          <Clock3 className="h-5 w-5 text-amber-700" />
          <p className="mt-3 text-sm font-medium text-[#1C1917]">Pending</p>
          <p className="mt-1 font-serif text-3xl text-[#1C1917]">{pendingCount}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-[#E7E5E4] bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-[#1C1917]" />
          <h3 className="font-medium text-[#1C1917]">Recent Transactions</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E7E5E4] bg-[#FAFAF9]">
                <th className="px-3 py-2 text-left text-xs uppercase tracking-[0.1em] text-[#78716C]">Time</th>
                <th className="px-3 py-2 text-left text-xs uppercase tracking-[0.1em] text-[#78716C]">Tx Ref</th>
                <th className="px-3 py-2 text-left text-xs uppercase tracking-[0.1em] text-[#78716C]">Customer</th>
                <th className="px-3 py-2 text-left text-xs uppercase tracking-[0.1em] text-[#78716C]">Amount</th>
                <th className="px-3 py-2 text-left text-xs uppercase tracking-[0.1em] text-[#78716C]">Status</th>
              </tr>
            </thead>
            <tbody>
              {events.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-3 py-6 text-sm text-[#78716C]">
                    No payment events yet.
                  </td>
                </tr>
              ) : (
                events.map((event) => {
                  const amount = event.payload?.data?.amount
                  const currency = event.payload?.data?.currency
                  const customerEmail = event.payload?.data?.customer?.email ?? "-"

                  return (
                    <tr key={event.id} className="border-b border-[#F0EFEE]">
                      <td className="px-3 py-2 text-sm text-[#57534E]">
                        {new Date(event.created_at).toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="px-3 py-2 text-sm text-[#57534E]">{event.tx_ref ?? "-"}</td>
                      <td className="px-3 py-2 text-sm text-[#57534E]">{customerEmail}</td>
                      <td className="px-3 py-2 text-sm text-[#57534E]">
                        {typeof amount === "number" ? `${currency ?? ""} ${amount}`.trim() : "-"}
                      </td>
                      <td className="px-3 py-2 text-sm text-[#1C1917]">{event.event_status}</td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
