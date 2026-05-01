"use client"

import { BookSessionButton } from "@/components/book-session-button"
import { Calendar, Clock, Video } from "lucide-react"

interface UpcomingAppointmentsProps {
  appointments: Array<{
    id: string
    type: string
    coach: string
    date: string
    time: string
    duration: number
    isVirtual: boolean
    status: string
  }>
}

export function UpcomingAppointments({ appointments }: UpcomingAppointmentsProps) {
  return (
    <div className="rounded-2xl border border-[#E7E5E4] bg-white p-6 shadow-sm">
      <h2 className="font-serif text-lg font-medium text-[#1C1917] mb-4">
        Upcoming Sessions
      </h2>

      {appointments.length > 0 ? (
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="rounded-xl border border-[#E7E5E4] bg-[#FAFAF9] p-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-[#1C1917]">
                    {appointment.type}
                  </p>
                  <p className="text-sm text-[#57534E]">
                    with {appointment.coach}
                  </p>
                </div>
                {appointment.isVirtual && (
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1C1917]">
                    <Video className="h-4 w-4 text-[#F5F5F4]" />
                  </div>
                )}
              </div>

              <div className="mt-3 flex items-center gap-4 text-sm text-[#57534E]">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {appointment.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {appointment.time}
                </span>
              </div>

              <div className="mt-3 pt-3 border-t border-[#E7E5E4]">
                <p className="text-xs uppercase tracking-[0.14em] text-[#A8A29E]">{appointment.status}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6">
          <Calendar className="mx-auto h-10 w-10 text-[#A8A29E]" />
          <p className="mt-2 text-sm text-[#57534E]">
            No upcoming appointments
          </p>
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-[#E7E5E4]">
        <BookSessionButton 
          variant="outline" 
          className="w-full"
          href="/services"
        >
          Schedule Session
        </BookSessionButton>
      </div>
    </div>
  )
}
