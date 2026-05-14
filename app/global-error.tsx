"use client"

import Link from "next/link"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body className="min-h-screen bg-[#F5F5F4] text-[#1C1917]">
        <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 py-16 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-[#78716C]">Unexpected Error</p>
          <h1 className="mt-4 font-serif text-4xl">Something went wrong</h1>
          <p className="mt-4 text-[#57534E]">
            We could not finish this request. Please try again, or return home if the issue persists.
          </p>
          {process.env.NODE_ENV !== "production" && (
            <pre className="mt-6 w-full overflow-x-auto rounded-lg bg-[#E7E5E4] p-4 text-left text-sm text-[#292524]">
              {error.message}
            </pre>
          )}
          <div className="mt-8 flex gap-3">
            <button
              type="button"
              onClick={() => reset()}
              className="rounded-lg bg-[#1C1917] px-5 py-2 text-sm font-medium text-white"
            >
              Try again
            </button>
            <Link
              href="/"
              className="rounded-lg border border-[#D6D3D1] px-5 py-2 text-sm font-medium text-[#1C1917]"
            >
              Back home
            </Link>
          </div>
        </main>
      </body>
    </html>
  )
}
