"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"

const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>

export default function ResetPasswordPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
  })

  const onSubmit = async (data: ResetPasswordFormValues) => {
    setIsLoading(true)
    setError(null)

    try {
      const supabase = createClient()

      if (!supabase) {
        setError("Password reset is unavailable. Please contact support.")
        return
      }

      const { error: updateError } = await supabase.auth.updateUser({
        password: data.password,
      })

      if (updateError) {
        setError(updateError.message)
        return
      }

      router.push("/auth/login")
      router.refresh()
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
          <h1 className="font-serif text-2xl font-medium text-[#1C1917]">Set a new password</h1>
          <p className="mt-2 text-[#57534E]">Enter your new password to finish resetting your account.</p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
            {error && <p className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-600">{error}</p>}

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#1C1917] mb-2">
                New password
              </label>
              <input
                {...register("password")}
                type="password"
                id="password"
                autoComplete="new-password"
                className="w-full rounded-lg border border-[#E7E5E4] bg-[#FAFAF9] px-4 py-3 text-[#1C1917] placeholder:text-[#A8A29E] outline-none focus:border-[#1C1917] focus:ring-1 focus:ring-[#1C1917] transition-colors"
                placeholder="Create a strong password"
              />
              {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#1C1917] mb-2">
                Confirm password
              </label>
              <input
                {...register("confirmPassword")}
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                className="w-full rounded-lg border border-[#E7E5E4] bg-[#FAFAF9] px-4 py-3 text-[#1C1917] placeholder:text-[#A8A29E] outline-none focus:border-[#1C1917] focus:ring-1 focus:ring-[#1C1917] transition-colors"
                placeholder="Confirm your new password"
              />
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>}
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
              {isLoading ? "Updating password..." : "Update password"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
