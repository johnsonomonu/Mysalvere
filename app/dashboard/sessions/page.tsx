import { requireUser } from "@/lib/auth/guards"
import { Plus } from "lucide-react"

export const metadata = {
  title: "Sessions | Salvere",
}

export default async function SessionsPage() {
  await requireUser()

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-medium text-[#1C1917]">Sessions</h1>
          <p className="mt-2 text-[#57534E]">Manage your upcoming and past consultations.</p>
        </div>
        <button className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1C1917] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#FA7A30]">
          <Plus className="h-4 w-4" />
          Book Session
        </button>
      </div>

      <div className="grid gap-6">
        <div className="rounded-[28px] border border-[#E7E5E4] bg-white p-8 shadow-sm">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 rounded-full bg-[#FAFAF9] p-4 text-[#A8A29E]">
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-serif text-xl font-medium text-[#1C1917]">No upcoming sessions</h3>
            <p className="mt-2 text-[#57534E]">You don't have any scheduled sessions at the moment.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
