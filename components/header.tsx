"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { BookSessionButton } from "@/components/book-session-button"
import { HeaderAccountLink } from "@/components/header-account-link"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Assessment", href: "/assessment" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-[0_1px_0_rgba(28,25,23,0.08)]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 group">
            <span className="font-serif text-2xl font-bold tracking-tighter text-[#1C1917] group-hover:text-[var(--vital-green)] transition-colors duration-300">
              Salvere<span className="text-[var(--vital-green)]">.</span>
            </span>
          </Link>
        </div>
        
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-[#1C1917]"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        
        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center lg:gap-x-10">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-sm font-medium uppercase tracking-[0.14em] transition-colors duration-300",
                pathname === item.href
                  ? "text-[var(--vital-green)]"
                  : "text-[#57534E] hover:text-[#1C1917]"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
        
        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:gap-3">
          <BookSessionButton size="sm" className="rounded-full px-6 shadow-none">
            Book a Session
          </BookSessionButton>
          <HeaderAccountLink />
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={cn(
        "lg:hidden fixed inset-0 z-50 transition-opacity duration-300",
        mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )}>
        <div className="fixed inset-0 bg-[#1C1917]/40 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
        <div className={cn(
          "fixed inset-y-0 right-0 z-50 flex h-[100dvh] w-full max-w-sm flex-col overflow-hidden bg-white px-6 py-6 transition-transform duration-500 ease-out",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}>
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
              <span className="font-serif text-2xl font-bold tracking-tighter text-[#1C1917]">
                Salvere<span className="text-[var(--vital-green)]">.</span>
              </span>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-full p-2.5 text-[#1C1917] bg-[var(--vital-mint)]"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <X className="h-6 w-6 text-[var(--vital-green)]" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-10 flex min-h-0 flex-1 flex-col justify-between">
            <nav className="space-y-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "block rounded-2xl border px-4 py-4 text-base font-medium transition-all duration-300",
                    pathname === item.href
                      ? "border-[var(--vital-mint)] bg-[var(--vital-mint)] text-[var(--vital-green)]"
                      : "border-[#E7E5E4] text-[#1C1917] hover:border-[var(--vital-mint)] hover:bg-[var(--vital-mint)] hover:text-[var(--vital-green)]"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="space-y-3 pb-2">
              <BookSessionButton
                className="w-full rounded-2xl h-14 text-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Book a Session
              </BookSessionButton>
              <Button asChild variant="outline" className="w-full rounded-2xl h-12" onClick={() => setMobileMenuOpen(false)}>
                <Link href="/auth/login">Account</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
