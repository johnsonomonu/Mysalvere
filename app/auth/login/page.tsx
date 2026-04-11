"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { FadeInUp } from "@/components/motion"
import { createClient } from "@/lib/supabase/client"
import { Eye, EyeOff, ArrowLeft } from "lucide-react"

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  const getSafeRedirectPath = () => {
    const redirect = searchParams.get("redirect")

    if (!redirect || !redirect.startsWith("/") || redirect.startsWith("//")) {
      return "/dashboard"
    }

    return redirect
  }

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true)
    setError(null)

    try {
      const supabase = createClient()

      if (!supabase) {
        setError("Authentication is unavailable. Please contact support.")
        return
      }

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      })

      if (signInError) {
        setError(
          signInError.message.toLowerCase().includes("invalid")
            ? "Invalid email or password. Please try again."
            : "Could not sign in right now. Please try again in a moment."
        )
        return
      }

      router.push(getSafeRedirectPath())
      router.refresh()
    } catch {
      setError("A network error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F5F4] flex flex-col">
      {/* Back link */}
      <div className="p-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#57534E] hover:text-[#1C1917] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <FadeInUp>
            <div className="text-center mb-8">
              <Link href="/" className="inline-block">
                <span className="font-serif text-3xl font-semibold text-[#1C1917]">
                  Salvere
                </span>
              </Link>
              <h1 className="mt-6 font-serif text-2xl font-medium text-[#1C1917]">
                Welcome back
              </h1>
              <p className="mt-2 text-[#57534E]">
                Sign in to access your wellness dashboard
              </p>
            </div>
          </FadeInUp>

          <FadeInUp delay={0.1}>
            <div className="rounded-2xl border border-[#E7E5E4] bg-white p-8 shadow-sm">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {error && (
                  <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-600">
                    {error}
                  </div>
                )}

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[#1C1917] mb-2"
                  >
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
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-[#1C1917] mb-2"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      {...register("password")}
                      type={showPassword ? "text" : "password"}
                      id="password"
                      autoComplete="current-password"
                      className="w-full rounded-lg border border-[#E7E5E4] bg-[#FAFAF9] px-4 py-3 pr-12 text-[#1C1917] placeholder:text-[#A8A29E] outline-none focus:border-[#1C1917] focus:ring-1 focus:ring-[#1C1917] transition-colors"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#57534E] hover:text-[#1C1917]"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-[#D6D3D1] text-[#1C1917] focus:ring-[#1C1917]"
                    />
                    <span className="text-sm text-[#57534E]">Remember me</span>
                  </label>
                  <Link
                    href="/auth/forgot-password"
                    className="text-sm font-medium text-[#1C1917] hover:text-[#57534E]"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-[#57534E]">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/auth/sign-up"
                    className="font-medium text-[#1C1917] hover:text-[#57534E]"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </FadeInUp>
        </div>
      </div>
    </div>
  )
}
