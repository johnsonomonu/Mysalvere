"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createService } from "@/lib/admin/services-actions"
import { Loader2, Plus, X, Briefcase } from "lucide-react"

const serviceSchema = z.object({
  name: z.string().min(3, "Name required"),
  slug: z.string().min(2, "Slug required"),
  price: z.string().min(1, "Price required"),
  description: z.string().min(10, "Description required"),
  features: z.string().min(1, "At least one feature required"),
  cta_text: z.string().default("Book Now"),
  is_featured: z.boolean().default(false),
})

export function AddServiceModal() {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { register, handleSubmit, reset, formState: { errors }, watch, setValue } = useForm({
    resolver: zodResolver(serviceSchema),
    defaultValues: { cta_text: "Book Now", is_featured: false }
  })

  const nameVal = watch("name")
  const autoSlug = () => {
    if (nameVal) {
      setValue("slug", nameVal.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''))
    }
  }

  const onSubmit = async (data: any) => {
    setIsSubmitting(true)
    setError(null)
    try {
      const formattedData = {
        ...data,
        features: data.features.split("\n").filter((f: string) => f.trim() !== ""),
        display_order: 99,
        is_active: true,
      }
      await createService(formattedData)
      reset()
      setOpen(false)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="rounded-full bg-[var(--orange)] hover:bg-[var(--orange)]/90"
      >
        <Plus className="mr-2 h-4 w-4" /> Add Service
      </Button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Modal */}
          <div className="relative z-10 w-full max-w-xl bg-white rounded-[2.5rem] p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-[var(--warm-beige)] flex items-center justify-center text-[var(--orange)]">
                  <Briefcase className="h-5 w-5" />
                </div>
                <h2 className="font-serif text-2xl text-[#1C1917]">New Service Tier</h2>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="h-9 w-9 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-600 text-sm border border-red-100">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Service Name</Label>
                  <Input {...register("name")} onBlur={autoSlug} className="rounded-xl" placeholder="e.g. Premium Package" />
                  {errors.name && <p className="text-red-500 text-xs">{errors.name.message as string}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label>Slug (URL key)</Label>
                  <Input {...register("slug")} className="rounded-xl" placeholder="e.g. premium" />
                  {errors.slug && <p className="text-red-500 text-xs">{errors.slug.message as string}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Price (NGN)</Label>
                  <Input {...register("price")} className="rounded-xl" placeholder="e.g. 200,000" />
                  {errors.price && <p className="text-red-500 text-xs">{errors.price.message as string}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label>Button CTA Text</Label>
                  <Input {...register("cta_text")} className="rounded-xl" placeholder="e.g. Book Now" />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label>Description</Label>
                <Textarea {...register("description")} className="rounded-xl min-h-[80px]" placeholder="Describe this service tier..." />
                {errors.description && <p className="text-red-500 text-xs">{errors.description.message as string}</p>}
              </div>

              <div className="space-y-1.5">
                <Label>Features (one per line)</Label>
                <Textarea {...register("features")} className="rounded-xl min-h-[100px]" placeholder={"Root cause analysis\nPersonalized protocol\nMonthly check-in"} />
                {errors.features && <p className="text-red-500 text-xs">{errors.features.message as string}</p>}
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="is_featured_new"
                  {...register("is_featured")}
                  className="h-4 w-4 rounded border-gray-300 text-[var(--orange)]"
                />
                <Label htmlFor="is_featured_new">Mark as Featured</Label>
              </div>

              <div className="flex gap-3 pt-2">
                <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1 rounded-full h-12">
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 rounded-full h-12 bg-[var(--orange)] hover:bg-[var(--orange)]/90"
                >
                  {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
                  Create Service
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
