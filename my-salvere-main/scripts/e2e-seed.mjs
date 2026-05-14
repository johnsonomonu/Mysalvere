import { createClient } from "@supabase/supabase-js"

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const E2E_EMAIL = process.env.E2E_EMAIL ?? "timothydivine9@gmail.com"

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY for e2e seed")
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY)

function assessmentPayload(userId, index) {
  const score = 55 + index * 7
  return {
    user_id: userId,
    symptoms: { energy: true, sleep: index % 2 === 0 },
    severity: { energy: 3 + (index % 2), sleep: 2 + (index % 3) },
    impact_scores: {
      daily_life: 3,
      work_productivity: 3,
      relationships: 2,
      mental_health: 3,
      physical_activity: 2,
    },
    overall_score: score,
    priority_areas: index % 2 === 0 ? ["Energy", "Sleep"] : ["Weight", "Hormones"],
    impact_level: score >= 70 ? "low" : score >= 60 ? "moderate" : "high",
    recommendations: ["Hydration plan", "Consistent sleep routine"],
    status: "completed",
    completed_at: new Date(Date.now() - index * 86_400_000).toISOString(),
  }
}

function appointmentPayload(userId, index) {
  return {
    user_id: userId,
    coach_id: null,
    type: index % 2 === 0 ? "coaching_session" : "follow_up",
    status: index % 2 === 0 ? "scheduled" : "confirmed",
    scheduled_at: new Date(Date.now() + (index + 1) * 86_400_000).toISOString(),
    duration_minutes: index % 2 === 0 ? 45 : 30,
    notes: "E2E seeded appointment",
    meeting_link: "https://meet.salvere.com/e2e-session",
  }
}

async function main() {
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id, email, role")
    .eq("email", E2E_EMAIL)
    .maybeSingle()

  if (profileError) {
    throw profileError
  }

  if (!profile) {
    throw new Error(`Could not find profile for ${E2E_EMAIL}`)
  }

  const userId = profile.id

  const { error: roleError } = await supabase
    .from("profiles")
    .update({ role: "ADMIN" })
    .eq("id", userId)

  if (roleError) {
    throw roleError
  }

  const { data: existingAssessments, error: assessmentsError } = await supabase
    .from("assessments")
    .select("id")
    .eq("user_id", userId)
    .limit(3)

  if (assessmentsError) {
    throw assessmentsError
  }

  const assessmentCount = existingAssessments?.length ?? 0
  if (assessmentCount < 3) {
    const inserts = Array.from({ length: 3 - assessmentCount }, (_, index) => assessmentPayload(userId, index + 1))
    const { error: insertError } = await supabase.from("assessments").insert(inserts)
    if (insertError) {
      throw insertError
    }
  }

  const { data: existingAppointments, error: appointmentsError } = await supabase
    .from("appointments")
    .select("id")
    .eq("user_id", userId)
    .limit(2)

  if (appointmentsError) {
    throw appointmentsError
  }

  const appointmentCount = existingAppointments?.length ?? 0
  if (appointmentCount < 2) {
    const inserts = Array.from({ length: 2 - appointmentCount }, (_, index) => appointmentPayload(userId, index + 1))
    const { error: insertError } = await supabase.from("appointments").insert(inserts)
    if (insertError) {
      throw insertError
    }
  }

  const paymentEvents = [
    {
      provider: "flutterwave",
      dedupe_key: `e2e:${userId}:processed`,
      tx_ref: `e2e-processed-${userId.slice(0, 8)}`,
      event_status: "processed",
      payload: {
        event: "charge.completed",
        data: {
          customer: { email: E2E_EMAIL },
          amount: 75000,
          currency: "NGN",
          status: "successful",
        },
      },
      processed_at: new Date().toISOString(),
    },
    {
      provider: "flutterwave",
      dedupe_key: `e2e:${userId}:failed`,
      tx_ref: `e2e-failed-${userId.slice(0, 8)}`,
      event_status: "failed",
      payload: {
        event: "charge.completed",
        data: {
          customer: { email: E2E_EMAIL },
          amount: 55000,
          currency: "NGN",
          status: "failed",
        },
      },
      processed_at: new Date().toISOString(),
    },
  ]

  const { error: paymentsError } = await supabase
    .from("payment_webhook_events")
    .upsert(paymentEvents, { onConflict: "dedupe_key" })

  if (paymentsError) {
    throw paymentsError
  }

  console.log("E2E seed complete", {
    email: E2E_EMAIL,
    role: "ADMIN",
    ensuredAssessments: 3,
    ensuredAppointments: 2,
    ensuredPaymentEvents: 2,
  })
}

main().catch((error) => {
  console.error("E2E seed failed", error)
  process.exit(1)
})
