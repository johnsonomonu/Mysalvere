"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { BookSessionButton } from "@/components/book-session-button"
import { HeaderAccountLink } from "@/components/header-account-link"
import { Menu, X } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Blog", href: "/blog" },
  { name: "Assessment", href: "/assessment" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
      isScrolled ? "bg-[var(--charcoal)]/95 backdrop-blur-md shadow-lg py-2" : "bg-transparent py-4"
    )}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 group">
            <span className={cn(
              "font-serif text-2xl font-bold tracking-tighter transition-colors duration-300",
              isScrolled ? "text-[var(--soft-white)] group-hover:text-[var(--orange)]" : "text-[var(--charcoal)] group-hover:text-[var(--orange)]"
            )}>
              Salvere<span className="text-[var(--orange)]">.</span>
            </span>
          </Link>
        </div>
        
        <div className="flex lg:hidden">
          <button
            type="button"
            className={cn(
              "-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 transition-colors",
              isScrolled ? "text-[var(--soft-white)]" : "text-[var(--charcoal)]"
            )}
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        
        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center lg:gap-x-10">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "relative py-2 text-sm font-medium uppercase tracking-[0.14em] transition-colors duration-300",
                  isActive
                    ? "text-[var(--orange)]"
                    : isScrolled ? "text-[var(--soft-white)]/70 hover:text-[var(--soft-white)]" : "text-[var(--charcoal)]/70 hover:text-[var(--charcoal)]"
                )}
              >
                {item.name}
                {isActive && (
                  <motion.span
                    layoutId="underline"
                    className="absolute left-0 top-[calc(100%-2px)] block h-[2px] w-full bg-[var(--orange)]"
                  />
                )}
                {!isActive && (
                  <motion.span
                    initial={false}
                    whileHover={{ scaleX: 1, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 top-[calc(100%-2px)] block h-[2px] w-full origin-left scale-x-0 bg-[var(--orange)]/40 opacity-0"
                  />
                )}
              </Link>
            );
          })}
        </div>
        
        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:gap-3">
          <BookSessionButton size="sm" className="rounded-full px-6 shadow-none">
            Book a Session
          </BookSessionButton>
          <HeaderAccountLink isScrolled={isScrolled} />
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
              <span className="font-serif text-2xl font-bold tracking-tighter text-[var(--charcoal)]">
                Salvere<span className="text-[var(--orange)]">.</span>
              </span>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-full p-2.5 text-[var(--charcoal)] bg-[var(--warm-beige)]"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <X className="h-6 w-6 text-[var(--muted-sage)]" aria-hidden="true" />
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
                      ? "border-[var(--warm-beige)] bg-[var(--warm-beige)] text-[var(--orange)]"
                      : "border-[var(--border)] text-[var(--charcoal)] hover:border-[var(--warm-beige)] hover:bg-[var(--warm-beige)] hover:text-[var(--orange)]"
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
