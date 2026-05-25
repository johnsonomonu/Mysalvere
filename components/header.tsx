"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { HeaderAccountLink } from "@/components/header-account-link"
import { Menu, X, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Start Here", href: "/start-here" },
  { name: "Services", href: "/services" },
  { name: "For Organizations", href: "/for-organizations" },
  { name: "Assessment", href: "/assessment" },
  { name: "About", href: "/about" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // We are keeping a consistent dark header to match the premium Parsley Health aesthetic.
  const headerBgClass = "bg-[#0A2622]" 
  const textClass = "text-white"
  const hoverClass = "hover:text-[#FA7A30]"

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-3",
      headerBgClass
    )}>
      <nav className="mx-auto flex max-w-[90rem] items-center justify-between gap-6 px-6 lg:px-8">
        {/* Logo */}
        <div className="flex shrink-0">
          <Link href="/" className="-m-1.5 p-1.5 group">
            <span className={cn(
              "font-serif text-2xl font-medium tracking-tighter transition-colors duration-300",
              textClass, hoverClass
            )}>
              Salvere<span className="text-[#FA7A30]">.</span>
            </span>
          </Link>
        </div>
        
        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className={cn(
              "-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 transition-colors",
              textClass
            )}
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:gap-x-8">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-[15px] font-medium transition-colors duration-300",
                  isActive ? "text-[#FA7A30]" : "text-white/90 hover:text-white"
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
        
        {/* Desktop Actions */}
        <div className="hidden lg:flex lg:items-center lg:gap-5 ml-6 pl-6 border-l border-white/20">
          <Link 
            href="/book/discovery"
            className="rounded-full bg-white px-6 py-2.5 text-[15px] font-medium text-[#0A2622] transition-colors hover:bg-[#F9F9F7]"
          >
            Join Now
          </Link>
          <Link 
            href="/auth/login"
            className="flex items-center gap-1.5 text-[15px] font-medium text-white/90 transition-colors hover:text-white"
          >
            Log In <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={cn(
        "lg:hidden fixed inset-0 z-50 transition-opacity duration-300",
        mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )}>
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
        <div className={cn(
          "fixed inset-y-0 right-0 z-50 flex h-[100dvh] w-full max-w-sm flex-col overflow-hidden bg-[#0A2622] px-6 py-6 transition-transform duration-500 ease-out",
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}>
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
              <span className="font-serif text-2xl font-medium tracking-tighter text-white">
                Salvere<span className="text-[#FA7A30]">.</span>
              </span>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-full p-2.5 text-white bg-white/10"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-10 flex min-h-0 flex-1 flex-col justify-between">
            <nav className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "block rounded-2xl px-4 py-4 text-lg font-medium transition-all duration-300",
                    pathname === item.href
                      ? "bg-white/10 text-[#FA7A30]"
                      : "text-white/80 hover:bg-white/5 hover:text-white"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="space-y-4 pb-6">
              <Link
                href="/book/discovery"
                className="flex w-full items-center justify-center rounded-full bg-white px-6 py-4 text-lg font-medium text-[#0A2622] transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Join Now
              </Link>
              <Link 
                href="/auth/login"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-white/10 px-6 py-4 text-lg font-medium text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Log In <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
