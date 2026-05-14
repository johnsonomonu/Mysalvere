import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BookingWizard } from "@/components/booking/booking-wizard"
import { notFound } from "next/navigation"

const VALID_TIERS = ['discovery', 'single', 'guide', 'management']

interface PageProps {
  params: Promise<{
    tier: string
  }>
}

export default async function BookingPage({ params }: PageProps) {
  const { tier } = await params
  
  if (!VALID_TIERS.includes(tier)) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-[var(--warm-beige)]">
      <Header />
      <div className="pt-32 pb-20">
        <BookingWizard tier={tier as any} />
      </div>
      <Footer />
    </main>
  )
}
