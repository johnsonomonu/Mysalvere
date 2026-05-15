"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { Eye, EyeOff, Loader2, Check } from "lucide-react"

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

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

interface AuthStepProps {
  onSuccess: () => void
}

export function AuthStep({ onSuccess }: AuthStepProps) {
  const [mode, setMode] = useState<"login" | "signup">("signup")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: loginErrors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  })

  const {
    register: registerSignup,
    handleSubmit: handleSubmitSignup,
    watch: watchSignup,
    formState: { errors: signupErrors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  })

  const signupPassword = watchSignup("password", "")
  const passwordChecks = [
    { label: "8+ characters", valid: signupPassword.length >= 8 },
    { label: "Uppercase", valid: /[A-Z]/.test(signupPassword) },
    { label: "Number", valid: /[0-9]/.test(signupPassword) },
  ]

  const onLoginSubmit = async (data: any) => {
    setIsLoading(true)
    setError(null)
    try {
      const supabase = createClient()
      if (!supabase) throw new Error("Auth unavailable")
      
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      })

      if (signInError) throw signInError
      onSuccess()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const onSignupSubmit = async (data: any) => {
    setIsLoading(true)
    setError(null)
    try {
      const supabase = createClient()
      if (!supabase) throw new Error("Auth unavailable")
      
      const { error: signUpError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: { full_name: data.fullName },
          emailRedirectTo: `${window.location.origin}/auth/login`,
        },
      })

      if (signUpError) throw signUpError
      
      // Try to get session immediately (works when email confirmation is disabled)
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        onSuccess()
        return
      }

      // If no session yet, try signing in directly with the same credentials
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      })

      if (!signInError) {
        onSuccess()
        return
      }

      // If all else fails, show a message but still allow proceeding
      setError("Account created! Please check your email to confirm, then sign in.")
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center">
        <h2 className="font-serif text-2xl font-medium text-[#1C1917]">
          {mode === "signup" ? "Create your account" : "Welcome back"}
        </h2>
        <p className="mt-2 text-[#57534E]">
          {mode === "signup" 
            ? "Sign up to unlock your personalized health snapshot." 
            : "Sign in to access your assessment results."}
        </p>
      </div>

      <div className="rounded-2xl border border-[#E7E5E4] bg-[#FAFAF9] p-6 sm:p-8">
        {error && (
          <div className={`mb-6 rounded-lg p-4 text-sm ${error.includes("Account created") ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-600 border border-red-200"}`}>
            {error}
          </div>
        )}

        {mode === "login" ? (
          <form onSubmit={handleSubmitLogin(onLoginSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1C1917]">Email address</label>
              <input
                {...registerLogin("email")}
                type="email"
                className="w-full rounded-xl border border-[#E7E5E4] bg-white px-4 py-3 outline-none focus:border-[#1C1917] transition-colors"
                placeholder="you@example.com"
              />
              {loginErrors.email && <p className="text-xs text-red-500">{loginErrors.email.message as string}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1C1917]">Password</label>
              <div className="relative">
                <input
                  {...registerLogin("password")}
                  type={showPassword ? "text" : "password"}
                  className="w-full rounded-xl border border-[#E7E5E4] bg-white px-4 py-3 pr-12 outline-none focus:border-[#1C1917] transition-colors"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#57534E]"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {loginErrors.password && <p className="text-xs text-red-500">{loginErrors.password.message as string}</p>}
            </div>

            <Button type="submit" className="w-full h-12 rounded-xl" disabled={isLoading}>
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Sign in to see results"}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleSubmitSignup(onSignupSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1C1917]">Full name</label>
              <input
                {...registerSignup("fullName")}
                type="text"
                className="w-full rounded-xl border border-[#E7E5E4] bg-white px-4 py-3 outline-none focus:border-[#1C1917] transition-colors"
                placeholder="John Doe"
              />
              {signupErrors.fullName && <p className="text-xs text-red-500">{signupErrors.fullName.message as string}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1C1917]">Email address</label>
              <input
                {...registerSignup("email")}
                type="email"
                className="w-full rounded-xl border border-[#E7E5E4] bg-white px-4 py-3 outline-none focus:border-[#1C1917] transition-colors"
                placeholder="you@example.com"
              />
              {signupErrors.email && <p className="text-xs text-red-500">{signupErrors.email.message as string}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1C1917]">Password</label>
              <div className="relative">
                <input
                  {...registerSignup("password")}
                  type={showPassword ? "text" : "password"}
                  className="w-full rounded-xl border border-[#E7E5E4] bg-white px-4 py-3 pr-12 outline-none focus:border-[#1C1917] transition-colors"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#57534E]"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              
              <div className="flex gap-4 mt-2">
                {passwordChecks.map((check) => (
                  <div key={check.label} className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold">
                    <div className={`h-2.5 w-2.5 rounded-full flex items-center justify-center ${check.valid ? "bg-green-500" : "bg-[#E7E5E4]"}`}>
                      {check.valid && <Check className="h-1.5 w-1.5 text-white" strokeWidth={4} />}
                    </div>
                    <span className={check.valid ? "text-green-600" : "text-[#A8A29E]"}>{check.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1C1917]">Confirm password</label>
              <input
                {...registerSignup("confirmPassword")}
                type="password"
                className="w-full rounded-xl border border-[#E7E5E4] bg-white px-4 py-3 outline-none focus:border-[#1C1917] transition-colors"
                placeholder="Repeat password"
              />
              {signupErrors.confirmPassword && <p className="text-xs text-red-500">{signupErrors.confirmPassword.message as string}</p>}
            </div>

            <Button type="submit" className="w-full h-12 rounded-xl" disabled={isLoading}>
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Create account & see results"}
            </Button>
          </form>
        )}

        <div className="mt-6 text-center">
          <button
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
            className="text-sm font-medium text-[#1C1917] hover:underline"
          >
            {mode === "login" ? "Need an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  )
}
