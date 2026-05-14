import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Mail, ArrowRight } from "lucide-react"

export default function SignUpSuccessPage() {
  return (
    <div className="min-h-screen bg-[#F5F5F4] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#1C1917]">
          <Mail className="h-10 w-10 text-[#F5F5F4]" />
        </div>

        <h1 className="mt-6 font-serif text-2xl font-medium text-[#1C1917]">
          Check your email
        </h1>

        <p className="mt-4 text-[#57534E]">
          We&apos;ve sent a confirmation link to your email address. 
          Please click the link to verify your account and complete your registration.
        </p>

        <div className="mt-8 rounded-xl border border-[#E7E5E4] bg-white p-6">
          <p className="text-sm text-[#57534E]">
            Didn&apos;t receive the email? Check your spam folder or click below to resend.
          </p>
          <Button variant="outline" className="mt-4 w-full">
            Resend confirmation email
          </Button>
        </div>

        <div className="mt-8">
          <Button asChild>
            <Link href="/auth/login">
              Go to Sign In
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <p className="mt-6 text-sm text-[#57534E]">
          Need help?{" "}
          <Link href="/contact" className="font-medium text-[#1C1917] hover:text-[#57534E]">
            Contact support
          </Link>
        </p>
      </div>
    </div>
  )
}
