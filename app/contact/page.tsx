import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactContent } from "@/components/contact/contact-content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact | Salvere",
  description: "Get in touch with Salvere. If you have a question, need guidance, or are unsure where to begin, we're here to help.",
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
