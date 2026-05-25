import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactContent } from "@/components/contact/contact-content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact | Salvere Functional Medicine",
  description: "Get in touch with Salvere. If you have a question, need guidance, or are unsure where to begin, we're here to help.",
  openGraph: {
    title: "Contact | Salvere Functional Medicine",
    description: "Get in touch with Salvere. If you have a question, need guidance, or are unsure where to begin, we're here to help.",
    url: 'https://salvere.health/contact',
    images: [{ url: '/hero-new.jpg', width: 1200, height: 630, alt: 'Contact Salvere' }],
  }
}

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <ContactContent />
      <Footer />
    </main>
  )
}
