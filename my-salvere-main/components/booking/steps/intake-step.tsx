"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const intakeSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Valid phone number is required"),
  concerns: z.string().min(10, "Please briefly describe your health concerns"),
})

interface IntakeStepProps {
  tier: { name: string; price: number }
  onNext: (data: any) => void
}

export function IntakeStep({ tier, onNext }: IntakeStepProps) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(intakeSchema)
  })

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-3xl font-medium text-[var(--charcoal)] mb-2">Patient Intake</h2>
        <p className="text-[var(--charcoal)]/60">
          Booking for: <span className="font-bold text-[var(--orange)]">{tier.name}</span> (₦{tier.price.toLocaleString()})
        </p>
      </div>

      <form onSubmit={handleSubmit(onNext)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" {...register("fullName")} placeholder="Jane Doe" className="rounded-xl h-12" />
            {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName.message as string}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" {...register("email")} placeholder="jane@example.com" className="rounded-xl h-12" />
            {errors.email && <p className="text-red-500 text-xs">{errors.email.message as string}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" {...register("phone")} placeholder="+234 ..." className="rounded-xl h-12" />
          {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message as string}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="concerns">Health Concerns & Goals</Label>
          <Textarea 
            id="concerns" 
            {...register("concerns")} 
            placeholder="Tell us a bit about what you're hoping to achieve..." 
            className="rounded-2xl min-h-[120px] py-4"
          />
          {errors.concerns && <p className="text-red-500 text-xs">{errors.concerns.message as string}</p>}
        </div>

        <Button type="submit" className="w-full h-14 rounded-2xl text-lg bg-[var(--orange)] hover:bg-[var(--orange)]/90">
          Continue to Payment
        </Button>
      </form>
    </div>
  )
}
