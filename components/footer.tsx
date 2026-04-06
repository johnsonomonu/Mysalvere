import Link from "next/link"

const footerLinks = {
  company: [
    { name: "About", href: "/#about" },
    { name: "How We Work", href: "/#how-we-work" },
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
    <footer className="bg-[#1C1917] text-[#F5F5F4] relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-full h-1 bg-[var(--vital-green)]" />
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block group">
              <span className="font-serif text-3xl font-bold tracking-tighter text-white group-hover:text-[var(--vital-green)] transition-colors duration-300">
                Salvere<span className="text-[var(--vital-green)]">.</span>
              </span>
            </Link>
            <p className="mt-6 text-base leading-relaxed text-[#A8A29E]">
              Helping you build sustainable health and performance through functional nutrition and lifestyle medicine.
            </p>
            <div className="mt-8 flex flex-col gap-3 text-sm text-[#A8A29E]">
              <a href="mailto:info@mysalvere.com" className="flex items-center gap-2 hover:text-[var(--vital-green)] transition-colors">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--vital-green)]" />
                info@mysalvere.com
              </a>
              <a href="mailto:dew@mysalvere.com" className="flex items-center gap-2 hover:text-[var(--vital-green)] transition-colors">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--vital-green)]" />
                dew@mysalvere.com
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-2 lg:grid-cols-3 lg:pl-10">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white">Company</h3>
              <ul className="mt-6 space-y-4">
                {footerLinks.company.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm leading-6 text-[#A8A29E] hover:text-white transition-all duration-300"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white">Resources</h3>
              <ul className="mt-6 space-y-4">
                {footerLinks.resources.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm leading-6 text-[#A8A29E] hover:text-white transition-all duration-300"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white">Legal</h3>
              <ul className="mt-6 space-y-4">
                {footerLinks.legal.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm leading-6 text-[#A8A29E] hover:text-white transition-all duration-300"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-1">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white">Stay Updated</h3>
            <p className="mt-6 text-sm leading-relaxed text-[#A8A29E]">
              Join our newsletter for weekly health insights and performance strategies.
            </p>
            <form className="mt-6 flex flex-col gap-3">
              <input
                type="email"
                placeholder="Email address"
                className="w-full rounded-2xl border-0 bg-white/5 px-5 py-4 text-sm text-white placeholder:text-[#57534E] focus:ring-2 focus:ring-[var(--vital-green)] outline-none transition-all duration-300"
              />
              <button
                type="submit"
                className="w-full rounded-2xl bg-[var(--vital-green)] px-5 py-4 text-sm font-bold text-white hover:bg-[var(--vital-green-hover)] transition-all duration-300 shadow-lg shadow-green-600/10"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-20 border-t border-white/5 pt-10">
          <p className="text-center text-xs font-medium uppercase tracking-widest text-[#57534E]">
            &copy; {new Date().getFullYear()} Salvere Healthcare Services. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
