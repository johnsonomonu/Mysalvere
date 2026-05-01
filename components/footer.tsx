import Link from "next/link"
import { Twitter, Instagram, Linkedin, ArrowRight } from "lucide-react"

const footerLinks = {
  company: [
    { name: "About", href: "/about" },
    { name: "How We Work", href: "/services" },
    { name: "Contact", href: "/contact" },
  ],
  resources: [
    { name: "Assessment", href: "/assessment" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Blog", href: "/blog" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-[var(--charcoal)] text-[var(--soft-white)] relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          {/* Brand & Social */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block group">
              <span className="font-serif text-3xl font-bold tracking-tighter text-[var(--soft-white)] group-hover:text-[var(--orange)] transition-colors duration-300">
                Salvere<span className="text-[var(--orange)]">.</span>
              </span>
            </Link>
            <p className="mt-6 text-base leading-relaxed text-[var(--soft-white)]/70 max-w-xs">
              Helping you build sustainable health and performance
            </p>
            <div className="mt-8 flex flex-col gap-3 text-sm text-[var(--soft-white)]/70">
              <a href="mailto:info@mysalvere.com" className="flex items-center gap-2 hover:text-[var(--orange)] transition-colors">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--orange)]" />
                info@mysalvere.com
              </a>
              <a href="mailto:dew@mysalvere.com" className="flex items-center gap-2 hover:text-[var(--orange)] transition-colors">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--orange)]" />
                dew@mysalvere.com
              </a>
            </div>
            <div className="mt-8 flex items-center gap-4">
              <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-[var(--orange)] hover:text-white transition-all duration-300">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-[var(--orange)] hover:text-white transition-all duration-300">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-[var(--orange)] hover:text-white transition-all duration-300">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-4 lg:grid-cols-3">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--muted-sage)]">Company</h3>
              <ul className="mt-6 space-y-4">
                {footerLinks.company.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm leading-6 text-[var(--soft-white)]/70 hover:text-white hover:underline hover:underline-offset-4 decoration-[var(--orange)] transition-all duration-300"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--muted-sage)]">Resources</h3>
              <ul className="mt-6 space-y-4">
                {footerLinks.resources.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm leading-6 text-[var(--soft-white)]/70 hover:text-white hover:underline hover:underline-offset-4 decoration-[var(--orange)] transition-all duration-300"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--muted-sage)]">Legal</h3>
              <ul className="mt-6 space-y-4">
                {footerLinks.legal.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm leading-6 text-[var(--soft-white)]/70 hover:text-white hover:underline hover:underline-offset-4 decoration-[var(--orange)] transition-all duration-300"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-4 lg:pl-8">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--muted-sage)] mb-6">Stay Updated</h3>
            <p className="text-sm leading-6 text-[var(--soft-white)]/70 mb-6">
              Get wellness insights and tips delivered straight to your inbox.
            </p>
            <form className="relative flex max-w-md items-center">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full rounded-full bg-white/5 border border-white/10 px-6 py-4 text-sm text-[var(--soft-white)] placeholder:text-[var(--soft-white)]/40 focus:outline-none focus:border-[var(--orange)] focus:ring-1 focus:ring-[var(--orange)] transition-all"
                required
              />
              <button 
                type="submit" 
                className="absolute right-2 rounded-full bg-[var(--orange)] hover:bg-[var(--orange-hover)] p-2.5 text-white transition-all shadow-lg shadow-orange-500/20 active:scale-95"
              >
                <ArrowRight className="h-4 w-4" />
                <span className="sr-only">Subscribe</span>
              </button>
            </form>
          </div>
        </div>

        <div className="mt-20 border-t border-white/10 pt-10">
          <p className="text-center text-xs font-medium uppercase tracking-widest text-[var(--soft-white)]/50">
            &copy; {new Date().getFullYear()} Salvere Healthcare Services. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
