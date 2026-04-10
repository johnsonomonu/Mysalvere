import { NextResponse } from "next/server"
import { sendBookingConfirmationEmail } from "@/lib/email/send-booking-confirmation"

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

  if (!webhookHash) {
    console.error("FLUTTERWAVE_WEBHOOK_HASH is not configured")
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
    return NextResponse.json({ received: true, ignored: true }, { status: 200 })
  }

  const customerEmail = payload.data?.customer?.email

  if (!customerEmail) {
    console.error("Flutterwave payload missing customer email", payload)
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
  } catch (error) {
    console.error("Failed to send booking confirmation email", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }

  return NextResponse.json({ received: true }, { status: 200 })
}
