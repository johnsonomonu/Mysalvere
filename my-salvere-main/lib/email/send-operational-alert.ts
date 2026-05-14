interface OperationalAlertParams {
  subject: string
  message: string
  details?: Record<string, unknown>
}

function formatDetails(details?: Record<string, unknown>): string {
  if (!details) {
    return ""
  }

  return Object.entries(details)
    .map(([key, value]) => `${key}: ${typeof value === "string" ? value : JSON.stringify(value)}`)
    .join("\n")
}

export async function sendOperationalAlertEmail({
  subject,
  message,
  details,
}: OperationalAlertParams): Promise<void> {
  const resendApiKey = process.env.RESEND_API_KEY
  const alertEmail = process.env.OPERATIONS_ALERT_EMAIL
  const fromEmail = process.env.BOOKING_FROM_EMAIL || "info@mysalvere.com"

  if (!resendApiKey || !alertEmail) {
    console.error("Operational alert could not be sent", {
      subject,
      message,
      details,
      hasResendApiKey: Boolean(resendApiKey),
      hasAlertEmail: Boolean(alertEmail),
    })
    return
  }

  const detailsBlock = formatDetails(details)

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1f2937; max-width: 640px; margin: 0 auto; padding: 24px;">
      <h2 style="margin: 0 0 16px; color: #991b1b;">${subject}</h2>
      <p style="margin: 0 0 12px;">${message}</p>
      ${detailsBlock ? `<pre style="white-space: pre-wrap; background: #f8fafc; border: 1px solid #e5e7eb; border-radius: 12px; padding: 16px;">${detailsBlock}</pre>` : ""}
    </div>
  `

  const text = [subject, "", message, detailsBlock ? `\n${detailsBlock}` : null]
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
      to: [alertEmail],
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