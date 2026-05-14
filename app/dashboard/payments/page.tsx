import type { Metadata } from "next"
import { CreditCard, CircleCheck, CircleAlert, Clock3 } from "lucide-react"
import { requireUser } from "@/lib/auth/guards"
import { createClient } from "@/lib/supabase/server"

export const metadata: Metadata = {
  title: "Payments | Salvere",
  description: "View your payment history and webhook transaction status.",
}

interface PaymentEventRow {
  id: string
  tx_ref: string | null
  event_status: "received" | "processed" | "failed" | "ignored"
  created_at: string
  payload: {
    data?: {
      amount?: number
      currency?: string
    }
  }
}

export default async function DashboardPaymentsPage() {
  const user = await requireUser("/auth/login?redirect=/dashboard/payments")
  const supabase = await createClient()

  const eventsResponse = supabase
    ? await supabase
        .from("payment_webhook_events")
        .select("id, tx_ref, event_status, created_at, payload")
        .order("created_at", { ascending: false })
        .limit(50)
    : { data: null }

  const events = (eventsResponse.data ?? []) as PaymentEventRow[]

  const processedCount = events.filter((row) => row.event_status === "processed").length
  const failedCount = events.filter((row) => row.event_status === "failed").length
  const pendingCount = events.filter((row) => row.event_status === "received").length

  return (
    <section className="space-y-6">
      <div className="rounded-[28px] border border-[#E7E5E4] bg-white p-8 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A8A29E]">Payments</p>
        <h1 className="mt-3 font-serif text-3xl text-[#1C1917]">Transaction History</h1>
        <p className="mt-3 max-w-2xl text-[#57534E]">
          Track your payment processing outcomes and transaction references.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-[#E7E5E4] bg-white p-5">
          <CircleCheck className="h-5 w-5 text-green-700" />
          <p className="mt-3 text-sm font-medium text-[#1C1917]">Processed</p>
          <p className="mt-1 font-serif text-3xl text-[#1C1917]">{processedCount}</p>
        </div>
        <div className="rounded-2xl border border-[#E7E5E4] bg-white p-5">
          <CircleAlert className="h-5 w-5 text-red-700" />
          <p className="mt-3 text-sm font-medium text-[#1C1917]">Failed</p>
          <p className="mt-1 font-serif text-3xl text-[#1C1917]">{failedCount}</p>
        </div>
        <div className="rounded-2xl border border-[#E7E5E4] bg-white p-5">
          <Clock3 className="h-5 w-5 text-amber-700" />
          <p className="mt-3 text-sm font-medium text-[#1C1917]">Pending</p>
          <p className="mt-1 font-serif text-3xl text-[#1C1917]">{pendingCount}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-[#E7E5E4] bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-[#1C1917]" />
          <h2 className="font-serif text-xl text-[#1C1917]">Recent Payments</h2>
        </div>

        {events.length === 0 ? (
          <div className="rounded-lg border border-[#E7E5E4] bg-[#FAFAF9] p-4 text-sm text-[#57534E]">
            No payment records yet. Once you complete checkout, your transactions will appear here.
          </div>
        ) : (
          <div className="space-y-3">
            {events.map((event) => {
              const amount = event.payload?.data?.amount
              const currency = event.payload?.data?.currency

              return (
                <div key={event.id} className="rounded-xl border border-[#E7E5E4] bg-[#FAFAF9] p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-[#1C1917]">{event.tx_ref ?? "Transaction"}</p>
                      <p className="text-xs text-[#78716C]">
                        {new Date(event.created_at).toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <span className="rounded-full bg-[#E7E5E4] px-2.5 py-0.5 text-xs font-medium capitalize text-[#1C1917]">
                      {event.event_status}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-[#57534E]">
                    Amount: {typeof amount === "number" ? `${currency ?? ""} ${amount}`.trim() : "-"}
                  </p>
                </div>
              )
            })}
          </div>
        )}

        <p className="mt-4 text-xs text-[#78716C]">
          Signed in as {user.email ?? "unknown"}. Only your own transactions are shown.
        </p>
      </div>
    </section>
  )
}
