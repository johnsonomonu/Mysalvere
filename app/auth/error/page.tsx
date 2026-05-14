import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertTriangle, ArrowLeft } from "lucide-react"

interface AuthErrorPageProps {
  searchParams: Promise<{ message?: string }>
}

export default async function AuthErrorPage({ searchParams }: AuthErrorPageProps) {
  const params = await searchParams
  const message = params.message ?? "Something went wrong during the authentication process. This could be due to an expired link or a technical issue."

  return (
    <div className="min-h-screen bg-[#F5F5F4] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
          <AlertTriangle className="h-10 w-10 text-red-600" />
        </div>

        <h1 className="mt-6 font-serif text-2xl font-medium text-[#1C1917]">
          Authentication Error
        </h1>

        <p className="mt-4 text-[#57534E]">{message}</p>

        <div className="mt-8 flex flex-col gap-4">
          <Button asChild>
            <Link href="/auth/login">
              Try Again
            </Link>
          </Button>
          
          <Button variant="outline" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        <p className="mt-6 text-sm text-[#57534E]">
          If this problem persists,{" "}
          <Link href="/contact" className="font-medium text-[#1C1917] hover:text-[#57534E]">
            contact support
          </Link>
        </p>
      </div>
    </div>
  )
}
