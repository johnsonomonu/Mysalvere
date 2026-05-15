"use client"

import { Button } from "@/components/ui/button"
import { ShieldCheck, ArrowLeft, Loader2 } from "lucide-react"
import { useState, useEffect, useCallback } from "react"

interface PaymentStepProps {
  tier: { name: string; price: number }
  formData: any
  onSuccess: () => void
  onBack: () => void
}

declare global {
  interface Window {
    FlutterwaveCheckout?: (config: any) => void
  }
}

export function PaymentStep({ tier, formData, onSuccess, onBack }: PaymentStepProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [sdkReady, setSdkReady] = useState(false)
  const [sdkError, setSdkError] = useState(false)

  // Load Flutterwave inline script on mount
  useEffect(() => {
    if (typeof window !== "undefined" && window.FlutterwaveCheckout) {
      setSdkReady(true)
      return
    }

    const existingScript = document.querySelector(
      'script[src="https://checkout.flutterwave.com/v3.js"]'
    )
    if (existingScript) {
      // Script tag exists but may not be loaded yet
      existingScript.addEventListener("load", () => setSdkReady(true))
      existingScript.addEventListener("error", () => setSdkError(true))
      // If it's already loaded
      if (window.FlutterwaveCheckout) setSdkReady(true)
      return
    }

    const script = document.createElement("script")
    script.src = "https://checkout.flutterwave.com/v3.js"
    script.async = true
    script.onload = () => setSdkReady(true)
    script.onerror = () => setSdkError(true)
    document.body.appendChild(script)

    return () => {
      // Don't remove the script on unmount — it can be reused
    }
  }, [])

  const handlePayment = useCallback(() => {
    if (!window.FlutterwaveCheckout) {
      console.error("Flutterwave SDK not loaded")
      setSdkError(true)
      return
    }

    setIsProcessing(true)

    window.FlutterwaveCheckout({
      public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY || "FLWPUBK-140927192c53f0a5fb999d19d9f50e3d-X",
      tx_ref: `salvere-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      amount: tier.price,
      currency: "NGN",
      payment_options: "card,banktransfer,ussd",
      customer: {
        email: formData?.email || "customer@mysalvere.com",
        name: formData?.fullName || "Salvere Client",
        phone_number: formData?.phone || "",
      },
      customizations: {
        title: "Salvere Health",
        description: `Payment for ${tier.name}`,
        logo: "",
      },
      callback: (response: any) => {
        console.log("Payment response:", response)
        setIsProcessing(false)
        if (response.status === "successful" || response.status === "completed") {
          onSuccess()
        }
      },
      onclose: () => {
        setIsProcessing(false)
      },
    })
  }, [tier, formData, onSuccess])

  return (
    <div className="space-y-8 text-center">
      <div className="flex items-center justify-between mb-8">
        <button onClick={onBack} className="flex items-center text-sm font-bold text-[var(--charcoal)]/50 hover:text-[var(--charcoal)] transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </button>
      </div>

      <div className="bg-[var(--warm-beige)] p-8 rounded-3xl border border-[var(--orange)]/10">
        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[var(--orange)]/10 text-[var(--orange)]">
          <ShieldCheck className="h-8 w-8" />
        </div>
        <h2 className="font-serif text-3xl font-medium text-[var(--charcoal)] mb-2">Secure Payment</h2>
        <p className="text-[var(--charcoal)]/60">
          Payment for your <span className="font-bold">{tier.name}</span>
        </p>
        
        <div className="mt-8 pt-8 border-t border-[var(--charcoal)]/10 flex justify-between items-center text-left">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--charcoal)]/40 mb-1">Total Due</p>
            <p className="text-4xl font-serif font-medium text-[var(--charcoal)]">₦{tier.price.toLocaleString()}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-[var(--charcoal)]">{formData?.fullName}</p>
            <p className="text-xs text-[var(--charcoal)]/50">{formData?.email}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {sdkError && (
          <p className="text-sm text-red-500">
            Payment service failed to load. Please refresh the page and try again.
          </p>
        )}
        <Button 
          onClick={handlePayment} 
          disabled={isProcessing || !sdkReady || sdkError}
          className="w-full h-14 rounded-2xl text-lg bg-[var(--orange)] hover:bg-[var(--orange)]/90 flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Processing Securely...
            </>
          ) : !sdkReady ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Loading Payment...
            </>
          ) : (
            `Pay ₦${tier.price.toLocaleString()} via Flutterwave`
          )}
        </Button>
        <p className="text-xs text-[var(--charcoal)]/40 flex items-center justify-center gap-2">
          <ShieldCheck className="h-3 w-3" />
          Secure, encrypted payments processed by Flutterwave.
        </p>
      </div>
    </div>
  )
}
