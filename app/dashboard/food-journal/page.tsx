import { requireUser } from "@/lib/auth/guards"

export const metadata = {
  title: "Food Journal | Salvere",
}

export default async function FoodJournalPage() {
  await requireUser()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-medium text-[var(--charcoal)]">Food Journal</h1>
        <p className="mt-2 text-[var(--charcoal)]/70">
          Log your meals and track your nutrition patterns.
        </p>
      </div>
      <div className="rounded-[2.5rem] bg-white p-8 border border-[var(--charcoal)]/5 shadow-sm text-center">
        <p className="text-[var(--charcoal)]/60 italic">Your food entries will appear here.</p>
      </div>
    </div>
  )
}
