interface BookingConfirmationParams {
  to: string
  customerName?: string
  txRef?: string
  amount?: number
  currency?: string
  paidAt?: string
}

function formatPaymentAmount(amount?: number, currency?: string): string {
  if (typeof amount !== "number" || Number.isNaN(amount)) {
    return "Confirmed"
  }

  const safeCurrency = currency || "NGN"

  try {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: safeCurrency,
      maximumFractionDigits: 2,
    }).format(amount)
  } catch {
    return `${safeCurrency} ${amount.toFixed(2)}`
  }
}

export async function sendBookingConfirmationEmail({
  to,
  customerName,
  txRef,
  amount,
  currency,
  paidAt,
}: BookingConfirmationParams): Promise<void> {
  const resendApiKey = process.env.RESEND_API_KEY
  const fromEmail = process.env.BOOKING_FROM_EMAIL || "info@mysalvere.com"

  if (!resendApiKey) {
    throw new Error("Missing RESEND_API_KEY environment variable")
  }

  const greetingName = customerName?.trim() || "there"
  const amountLabel = formatPaymentAmount(amount, currency)
  const paidAtLabel = paidAt ? new Date(paidAt).toLocaleString("en-NG") : "Just now"

  const subject = "Your Salvere session has been confirmed"

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1f2937; max-width: 640px; margin: 0 auto; padding: 24px;">
      <h2 style="margin: 0 0 16px; color: #166534;">Session Confirmed</h2>
      <p style="margin: 0 0 12px;">Hi ${greetingName},</p>
      <p style="margin: 0 0 12px;">
        Your payment was successful and your Salvere session has been confirmed.
      </p>
      <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 14px 16px; margin: 16px 0;">
        <p style="margin: 0 0 8px;"><strong>Amount:</strong> ${amountLabel}</p>
        <p style="margin: 0 0 8px;"><strong>Payment time:</strong> ${paidAtLabel}</p>
        ${txRef ? `<p style="margin: 0;"><strong>Reference:</strong> ${txRef}</p>` : ""}
      </div>
      <p style="margin: 0 0 12px;">
        If you need help with your session schedule, reply to this email and our team will assist you.
      </p>
      <p style="margin: 20px 0 0;">Warmly,<br/>Salvere Wellness</p>
    </div>
  `

  const text = [
    `Hi ${greetingName},`,
    "",
    "Your payment was successful and your Salvere session has been confirmed.",
    `Amount: ${amountLabel}`,
    `Payment time: ${paidAtLabel}`,
    txRef ? `Reference: ${txRef}` : null,
    "",
    "If you need help with your session schedule, reply to this email and our team will assist you.",
    "",
    "Salvere Wellness",
  ]
    .filter(Boolean)
    .join("\n")

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [to],
      subject,
      html,
      text,
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Resend API error: ${response.status} ${errorText}`)
  }
}
