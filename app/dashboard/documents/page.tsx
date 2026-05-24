import { requireUser } from "@/lib/auth/guards"

export const metadata = {
  title: "Documents | Salvere",
}

export default async function DocumentsPage() {
  await requireUser()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-medium text-[var(--charcoal)]">Documents & Resources</h1>
        <p className="mt-2 text-[var(--charcoal)]/70">
          Access your intake forms, lab results, and educational resources.
        </p>
      </div>
      <div className="rounded-[2.5rem] bg-white p-8 border border-[var(--charcoal)]/5 shadow-sm text-center">
        <p className="text-[var(--charcoal)]/60 italic">Your documents will appear here once uploaded.</p>
      </div>
    </div>
  )
}
