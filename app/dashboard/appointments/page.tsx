import { CalendarClock, Clock3, Video } from "lucide-react"
import { requireUser } from "@/lib/auth/guards"
import { createClient } from "@/lib/supabase/server"
import { BookSessionButton } from "@/components/book-session-button"

export default async function DashboardAppointmentsPage() {
  const user = await requireUser("/auth/login?redirect=/dashboard/appointments")
  const supabase = await createClient()

  const appointmentsResponse = supabase
    ? await supabase
        .from("appointments")
        .select("id, type, status, scheduled_at, duration_minutes, meeting_link, notes")
        .eq("user_id", user.id)
        .order("scheduled_at", { ascending: true })
        .limit(100)
    : { data: null }

  const appointments = appointmentsResponse.data ?? []

  const upcomingAppointments = appointments.filter((appointment) => {
    const scheduledAt = new Date(appointment.scheduled_at).getTime()
    return scheduledAt >= Date.now() && appointment.status !== "cancelled" && appointment.status !== "completed"
  })

  const pastAppointments = appointments.filter((appointment) => {
    const scheduledAt = new Date(appointment.scheduled_at).getTime()
    return scheduledAt < Date.now() || appointment.status === "completed" || appointment.status === "cancelled"
  })

  return (
    <section className="space-y-6">
      <div className="rounded-[28px] border border-[#E7E5E4] bg-white p-8 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A8A29E]">Appointments</p>
        <h1 className="mt-3 font-serif text-3xl text-[#1C1917]">Manage your sessions</h1>
        <p className="mt-3 max-w-2xl text-[#57534E]">
          View upcoming sessions, review your appointment history, and book your next coaching slot.
        </p>

        <div className="mt-6">
            <BookSessionButton href="/services">
              Book a Session
            </BookSessionButton>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-[#E7E5E4] bg-white p-5">
          <CalendarClock className="h-5 w-5 text-[#1C1917]" />
          <p className="mt-3 text-sm font-medium text-[#1C1917]">Upcoming</p>
          <p className="mt-1 text-sm text-[#78716C]">{upcomingAppointments.length} scheduled sessions.</p>
        </div>
        <div className="rounded-2xl border border-[#E7E5E4] bg-white p-5">
          <p className="text-sm font-medium text-[#1C1917]">Total appointments</p>
          <p className="mt-1 text-sm text-[#78716C]">{appointments.length} records available.</p>
        </div>
        <div className="rounded-2xl border border-[#E7E5E4] bg-white p-5">
          <p className="text-sm font-medium text-[#1C1917]">Session history</p>
          <p className="mt-1 text-sm text-[#78716C]">{pastAppointments.length} past or completed sessions.</p>
        </div>
      </div>

      <div className="rounded-2xl border border-[#E7E5E4] bg-white p-6 shadow-sm">
        <h2 className="font-serif text-xl text-[#1C1917]">Upcoming Sessions</h2>
        {upcomingAppointments.length === 0 ? (
          <p className="mt-3 text-sm text-[#57534E]">No upcoming sessions yet.</p>
        ) : (
          <div className="mt-4 space-y-3">
            {upcomingAppointments.map((appointment) => (
              <div key={appointment.id} className="rounded-xl border border-[#E7E5E4] bg-[#FAFAF9] p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-[#1C1917]">{appointment.type}</p>
                    <p className="text-xs text-[#78716C]">
                      {new Date(appointment.scheduled_at).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <span className="rounded-full bg-[#E7E5E4] px-2.5 py-0.5 text-xs font-medium capitalize text-[#1C1917]">
                    {appointment.status}
                  </span>
                </div>

                <div className="mt-3 flex items-center gap-4 text-sm text-[#57534E]">
                  <span className="inline-flex items-center gap-1">
                    <Clock3 className="h-4 w-4" />
                    {appointment.duration_minutes} mins
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Video className="h-4 w-4" />
                    {appointment.meeting_link ? "Virtual" : "In-person"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
