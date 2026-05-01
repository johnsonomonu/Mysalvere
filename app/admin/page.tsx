import { redirect } from "next/navigation"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Dashboard | Salvere",
  description: "View all user assessments and manage the Salvere wellness platform.",
}

export default async function AdminPage() {
  redirect("/admin/overview")
}
