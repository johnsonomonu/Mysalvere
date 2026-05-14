"use client"

import { useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
})

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setIsLoading(true)
    setError(null)
    setMessage(null)

    try {
      const supabase = createClient()

      if (!supabase) {
        setError("Password reset is unavailable. Please contact support.")
        return
      }

      const { error: resetError } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })

      if (resetError) {
        setError(resetError.message)
        return
      }

      setMessage("If that email exists, a reset link has been sent.")
    } catch {
      setError("A network error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F5F4] flex flex-col">
      <div className="p-6">
        <Link
          href="/auth/login"
          className="inline-flex items-center gap-2 text-sm text-[#57534E] hover:text-[#1C1917] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Sign In
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md rounded-2xl border border-[#E7E5E4] bg-white p-8 shadow-sm">
          <h1 className="font-serif text-2xl font-medium text-[#1C1917]">Reset your password</h1>
          <p className="mt-2 text-[#57534E]">Enter your email and we will send you a reset link.</p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
            {error && <p className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-600">{error}</p>}
            {message && <p className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-700">{message}</p>}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#1C1917] mb-2">
                Email address
              </label>
              <input
                {...register("email")}
                type="email"
                id="email"
                autoComplete="email"
                className="w-full rounded-lg border border-[#E7E5E4] bg-[#FAFAF9] px-4 py-3 text-[#1C1917] placeholder:text-[#A8A29E] outline-none focus:border-[#1C1917] focus:ring-1 focus:ring-[#1C1917] transition-colors"
                placeholder="you@example.com"
              />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
              {isLoading ? "Sending reset link..." : "Send reset link"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
