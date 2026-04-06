"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { FadeInUp } from "@/components/motion"
import { Eye, EyeOff, ArrowLeft, Check } from "lucide-react"

const signUpSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type SignUpFormValues = z.infer<typeof signUpSchema>

export default function SignUpPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
  })

  const password = watch("password", "")

  const passwordChecks = [
    { label: "At least 8 characters", valid: password.length >= 8 },
    { label: "One uppercase letter", valid: /[A-Z]/.test(password) },
    { label: "One number", valid: /[0-9]/.test(password) },
  ]

  const onSubmit = async (data: SignUpFormValues) => {
    setIsLoading(true)
    setError(null)

    try {
      // Mock sign up - would use Supabase auth in production
      console.log("Sign up attempt:", data.email)
      
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))
      
      // Redirect to success page
      router.push("/auth/sign-up-success")
    } catch {
      setError("An error occurred. Please try again.")
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
                Create your account
              </h1>
              <p className="mt-2 text-[#57534E]">
                Start your wellness journey today
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
                    htmlFor="fullName"
                    className="block text-sm font-medium text-[#1C1917] mb-2"
                  >
                    Full name
                  </label>
                  <input
                    {...register("fullName")}
                    type="text"
                    id="fullName"
                    autoComplete="name"
                    className="w-full rounded-lg border border-[#E7E5E4] bg-[#FAFAF9] px-4 py-3 text-[#1C1917] placeholder:text-[#A8A29E] outline-none focus:border-[#1C1917] focus:ring-1 focus:ring-[#1C1917] transition-colors"
                    placeholder="John Doe"
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

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
                      autoComplete="new-password"
                      className="w-full rounded-lg border border-[#E7E5E4] bg-[#FAFAF9] px-4 py-3 pr-12 text-[#1C1917] placeholder:text-[#A8A29E] outline-none focus:border-[#1C1917] focus:ring-1 focus:ring-[#1C1917] transition-colors"
                      placeholder="Create a password"
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
                  
                  {/* Password requirements */}
                  <div className="mt-3 space-y-1">
                    {passwordChecks.map((check) => (
                      <div
                        key={check.label}
                        className="flex items-center gap-2 text-xs"
                      >
                        <div
                          className={`flex h-4 w-4 items-center justify-center rounded-full ${
                            check.valid
                              ? "bg-green-500"
                              : "bg-[#E7E5E4]"
                          }`}
                        >
                          {check.valid && (
                            <Check className="h-3 w-3 text-white" />
                          )}
                        </div>
                        <span
                          className={
                            check.valid ? "text-green-600" : "text-[#57534E]"
                          }
                        >
                          {check.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-[#1C1917] mb-2"
                  >
                    Confirm password
                  </label>
                  <input
                    {...register("confirmPassword")}
                    type="password"
                    id="confirmPassword"
                    autoComplete="new-password"
                    className="w-full rounded-lg border border-[#E7E5E4] bg-[#FAFAF9] px-4 py-3 text-[#1C1917] placeholder:text-[#A8A29E] outline-none focus:border-[#1C1917] focus:ring-1 focus:ring-[#1C1917] transition-colors"
                    placeholder="Confirm your password"
                  />
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Create account"}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-[#57534E]">
                  Already have an account?{" "}
                  <Link
                    href="/auth/login"
                    className="font-medium text-[#1C1917] hover:text-[#57534E]"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </FadeInUp>

          <FadeInUp delay={0.2}>
            <p className="mt-6 text-center text-xs text-[#57534E]">
              By creating an account, you agree to our{" "}
              <Link href="/terms" className="underline hover:text-[#1C1917]">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="underline hover:text-[#1C1917]">
                Privacy Policy
              </Link>
              .
            </p>
          </FadeInUp>
        </div>
      </div>
    </div>
  )
}
