import Link from "next/link"

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 py-16 text-center">
      <p className="text-sm uppercase tracking-[0.2em] text-[#78716C]">404</p>
      <h1 className="mt-4 font-serif text-4xl text-[#1C1917]">Page not found</h1>
      <p className="mt-4 text-[#57534E]">
        The page you requested does not exist or may have moved.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-lg bg-[#1C1917] px-5 py-2 text-sm font-medium text-white"
      >
        Return home
      </Link>
    </main>
  )
}
