import { NextResponse } from "next/server"
import { sendBookingConfirmationEmail } from "@/lib/email/send-booking-confirmation"
import { createAdminClient } from "@/lib/supabase/admin"

interface FlutterwaveWebhookPayload {
  event?: string
  data?: {
    id?: string | number
    status?: string
    tx_ref?: string
    amount?: number
    currency?: string
    paid_at?: string
    customer?: {
      email?: string
      name?: string
    }
  }
}

function isSuccessfulPayment(payload: FlutterwaveWebhookPayload): boolean {
  const event = payload.event || ""
  const status = payload.data?.status || ""

  return event === "charge.completed" && status.toLowerCase() === "successful"
}

export async function POST(request: Request) {
  const webhookHash = process.env.FLUTTERWAVE_WEBHOOK_HASH
  const headerHash = request.headers.get("verif-hash")
  const supabaseAdmin = createAdminClient()

  if (!webhookHash) {
    console.error("FLUTTERWAVE_WEBHOOK_HASH is not configured")
    return NextResponse.json({ error: "Server not configured" }, { status: 500 })
  }

  if (!supabaseAdmin) {
    console.error("SUPABASE_SERVICE_ROLE_KEY is not configured")
    return NextResponse.json({ error: "Server not configured" }, { status: 500 })
  }

  if (!headerHash || headerHash !== webhookHash) {
    return NextResponse.json({ error: "Unauthorized webhook" }, { status: 401 })
  }

  let payload: FlutterwaveWebhookPayload

  try {
    payload = (await request.json()) as FlutterwaveWebhookPayload
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
  }

  if (!isSuccessfulPayment(payload)) {
    const ignoredEventId = payload.data?.id ? String(payload.data.id) : null
    const ignoredTxRef = payload.data?.tx_ref ?? null
    const ignoredDedupeKey = ignoredEventId
      ? `flutterwave:event:${ignoredEventId}`
      : ignoredTxRef
        ? `flutterwave:tx:${ignoredTxRef}`
        : null

    if (ignoredDedupeKey) {
      await supabaseAdmin.from("payment_webhook_events").upsert(
        {
          provider: "flutterwave",
          dedupe_key: ignoredDedupeKey,
          event_id: ignoredEventId,
          tx_ref: ignoredTxRef,
          event_status: "ignored",
          payload,
          processed_at: new Date().toISOString(),
        },
        { onConflict: "dedupe_key", ignoreDuplicates: true }
      )
    }

    return NextResponse.json({ received: true, ignored: true }, { status: 200 })
  }

  const eventId = payload.data?.id ? String(payload.data.id) : null
  const txRef = payload.data?.tx_ref ?? null
  const dedupeKey = eventId
    ? `flutterwave:event:${eventId}`
    : txRef
      ? `flutterwave:tx:${txRef}`
      : null

  if (!dedupeKey) {
    return NextResponse.json({ error: "Missing event identifier" }, { status: 400 })
  }

  const { data: insertedEvent, error: insertError } = await supabaseAdmin
    .from("payment_webhook_events")
    .upsert(
      {
        provider: "flutterwave",
        dedupe_key: dedupeKey,
        event_id: eventId,
        tx_ref: txRef,
        event_status: "received",
        payload,
      },
      { onConflict: "dedupe_key", ignoreDuplicates: true }
    )
    .select("id")

  if (insertError) {
    console.error("Failed to persist webhook event", insertError)
    return NextResponse.json({ error: "Failed to persist webhook event" }, { status: 500 })
  }

  if (!insertedEvent || insertedEvent.length === 0) {
    return NextResponse.json({ received: true, duplicate: true }, { status: 200 })
  }

  const customerEmail = payload.data?.customer?.email

  if (!customerEmail) {
    console.error("Flutterwave payload missing customer email", payload)
    await supabaseAdmin
      .from("payment_webhook_events")
      .update({ event_status: "failed" })
      .eq("dedupe_key", dedupeKey)
    return NextResponse.json({ error: "Missing customer email" }, { status: 400 })
  }

  try {
    await sendBookingConfirmationEmail({
      to: customerEmail,
      customerName: payload.data?.customer?.name,
      txRef: payload.data?.tx_ref,
      amount: payload.data?.amount,
      currency: payload.data?.currency,
      paidAt: payload.data?.paid_at,
    })

    await supabaseAdmin
      .from("payment_webhook_events")
      .update({
        event_status: "processed",
        processed_at: new Date().toISOString(),
      })
      .eq("dedupe_key", dedupeKey)
  } catch (error) {
    console.error("Failed to send booking confirmation email", error)

    await supabaseAdmin
      .from("payment_webhook_events")
      .update({ event_status: "failed" })
      .eq("dedupe_key", dedupeKey)

    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }

  return NextResponse.json({ received: true }, { status: 200 })
}
