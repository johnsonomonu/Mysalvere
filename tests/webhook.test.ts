import { describe, expect, it, vi } from "vitest"

vi.mock("@/lib/supabase/admin", () => ({
  createAdminClient: () => ({
    from: () => ({
      upsert: () => ({
        select: async () => ({ data: [{ id: "event-id" }], error: null }),
      }),
      update: () => ({
        eq: async () => ({ error: null }),
      }),
    }),
  }),
}))

vi.mock("@/lib/email/send-booking-confirmation", () => ({
  sendBookingConfirmationEmail: async () => undefined,
}))

vi.mock("@/lib/email/send-operational-alert", () => ({
  sendOperationalAlertEmail: async () => undefined,
}))

import { POST, isSuccessfulPayment } from "@/app/api/flutterwave/webhook/route"

describe("Flutterwave webhook verification", () => {
  it("returns 401 for invalid webhook hash", async () => {
    process.env.FLUTTERWAVE_WEBHOOK_HASH = "expected-hash"

    const request = new Request("https://example.com/api/flutterwave/webhook", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "verif-hash": "invalid-hash",
      },
      body: JSON.stringify({ event: "charge.completed", data: { status: "successful" } }),
    })

    const response = await POST(request)
    expect(response.status).toBe(401)
  })

  it("detects successful charge completion payloads", () => {
    expect(
      isSuccessfulPayment({
        event: "charge.completed",
        data: { status: "successful" },
      })
    ).toBe(true)

    expect(
      isSuccessfulPayment({
        event: "charge.completed",
        data: { status: "failed" },
      })
    ).toBe(false)
  })
})
