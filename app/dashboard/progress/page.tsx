import { requireUser } from "@/lib/auth/guards"

export const metadata = {
  title: "Progress | Salvere",
}

export default async function ProgressPage() {
  await requireUser()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-medium text-[var(--charcoal)]">Progress Tracking</h1>
        <p className="mt-2 text-[var(--charcoal)]/70">
          Monitor your improvements and health markers over time.
        </p>
      </div>
      <div className="rounded-[2.5rem] bg-white p-8 border border-[var(--charcoal)]/5 shadow-sm text-center">
        <p className="text-[var(--charcoal)]/60 italic">Your progress metrics will appear here once tracking begins.</p>
      </div>
    </div>
  )
}
