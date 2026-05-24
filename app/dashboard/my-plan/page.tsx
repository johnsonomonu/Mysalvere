import { requireUser } from "@/lib/auth/guards"

export const metadata = {
  title: "My Plan | Salvere",
}

export default async function MyPlanPage() {
  await requireUser()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-medium text-[var(--charcoal)]">My Plan</h1>
        <p className="mt-2 text-[var(--charcoal)]/70">
          Your personalized nutrition and lifestyle protocol.
        </p>
      </div>
      <div className="rounded-[2.5rem] bg-white p-8 border border-[var(--charcoal)]/5 shadow-sm text-center">
        <p className="text-[var(--charcoal)]/60 italic">This section is currently being updated to match your new blueprint.</p>
      </div>
    </div>
  )
}
