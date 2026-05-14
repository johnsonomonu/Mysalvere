"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { updateService, deleteService, toggleServiceStatus } from "@/lib/admin/services-actions"
import { Loader2, Save, Edit2, X, Trash2, Eye, EyeOff, AlertTriangle } from "lucide-react"

const serviceSchema = z.object({
  name: z.string().min(3),
  price: z.string().min(1),
  description: z.string().min(10),
  features: z.string(),
  cta_text: z.string(),
  is_featured: z.boolean().default(false),
})

export function ServiceForm({ service }: { service: any }) {
  const [isEditing, setIsEditing] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isToggling, setIsToggling] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const { register, handleSubmit } = useForm({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      name: service.name,
      price: service.price,
      description: service.description,
      features: service.features.join("\n"),
      cta_text: service.cta_text || "Book Now",
      is_featured: service.is_featured,
    }
  })

  const onSubmit = async (data: any) => {
    setIsSubmitting(true)
    try {
      const formattedData = {
        ...data,
        features: data.features.split("\n").filter((f: string) => f.trim() !== "")
      }
      await updateService(service.id, formattedData)
      setIsEditing(false)
    } catch (err) {
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleToggleActive = async () => {
    setIsToggling(true)
    try {
      await toggleServiceStatus(service.id, service.is_active)
    } catch (err) {
      console.error(err)
    } finally {
      setIsToggling(false)
    }
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await deleteService(service.id)
    } catch (err) {
      console.error(err)
    } finally {
      setIsDeleting(false)
      setShowDeleteConfirm(false)
    }
  }

  if (showDeleteConfirm) {
    return (
      <div className="rounded-2xl border border-red-100 bg-red-50 p-5 space-y-4 animate-in fade-in duration-200">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-red-700">Delete "{service.name}"?</p>
            <p className="text-xs text-red-500 mt-1">This is permanent and cannot be undone.</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setShowDeleteConfirm(false)}
            className="flex-1 rounded-full"
          >
            Cancel
          </Button>
          <Button
            type="button"
            size="sm"
            disabled={isDeleting}
            onClick={handleDelete}
            className="flex-1 rounded-full bg-red-600 hover:bg-red-700 text-white"
          >
            {isDeleting ? <Loader2 className="h-3 w-3 animate-spin" /> : <Trash2 className="mr-1.5 h-3 w-3" />}
            Delete
          </Button>
        </div>
      </div>
    )
  }

  if (!isEditing) {
    return (
      <div className="flex flex-wrap gap-2">
        <Button
          onClick={() => setIsEditing(true)}
          variant="outline"
          className="flex-1 rounded-full h-10 hover:bg-[var(--orange)] hover:text-white hover:border-transparent transition-all text-sm"
        >
          <Edit2 className="mr-2 h-3.5 w-3.5" /> Edit
        </Button>
        <Button
          onClick={handleToggleActive}
          disabled={isToggling}
          variant="outline"
          className="flex-1 rounded-full h-10 transition-all text-sm"
        >
          {isToggling ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : service.is_active ? (
            <><EyeOff className="mr-2 h-3.5 w-3.5" /> Hide</>
          ) : (
            <><Eye className="mr-2 h-3.5 w-3.5" /> Show</>
          )}
        </Button>
        <Button
          onClick={() => setShowDeleteConfirm(true)}
          variant="outline"
          className="h-10 w-10 rounded-full hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all p-0"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
      <div className="space-y-2">
        <Label>Service Name</Label>
        <Input {...register("name")} className="rounded-xl" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label>Price (NGN)</Label>
          <Input {...register("price")} className="rounded-xl" />
        </div>
        <div className="space-y-2">
          <Label>Button Text</Label>
          <Input {...register("cta_text")} className="rounded-xl" />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea {...register("description")} className="rounded-xl min-h-[80px]" />
      </div>

      <div className="space-y-2">
        <Label>Features (one per line)</Label>
        <Textarea {...register("features")} className="rounded-xl min-h-[120px]" />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id={`is_featured_${service.id}`}
          {...register("is_featured")}
          className="h-4 w-4 rounded border-gray-300 text-[var(--orange)]"
        />
        <Label htmlFor={`is_featured_${service.id}`}>Mark as Featured</Label>
      </div>

      <div className="flex gap-2 pt-2">
        <Button
          type="button"
          variant="ghost"
          onClick={() => setIsEditing(false)}
          className="flex-1 rounded-full"
        >
          <X className="mr-2 h-4 w-4" /> Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 rounded-full bg-[var(--orange)] hover:bg-[var(--orange)]/90"
        >
          {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          Save Changes
        </Button>
      </div>
    </form>
  )
}
