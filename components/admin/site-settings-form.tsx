"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Save } from "lucide-react"

export function SiteSettingsForm({ initialSettings = {} }: { initialSettings?: any }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const { register, handleSubmit } = useForm({
    defaultValues: {
      contactEmail: initialSettings.contactEmail || "info@mysalvere.com",
      instagramUrl: initialSettings.instagramUrl || "",
      twitterUrl: initialSettings.twitterUrl || "",
    }
  })

  const onSubmit = async (data: any) => {
    setIsSubmitting(true)
    try {
      // We would call a server action here to update site_settings
      // await updateSiteSettings('global', data)
      console.log('Saving site settings:', data)
      
      // Simulate API call for MVP
      await new Promise(r => setTimeout(r, 1000))
      
    } catch (err) {
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="rounded-[28px] border border-[#E7E5E4] bg-white p-8 mt-8">
      <h2 className="font-serif text-2xl text-[#1C1917] mb-6">Global Site Settings</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Contact Email</Label>
            <Input {...register("contactEmail")} className="rounded-xl h-12" />
          </div>
          
          <div className="space-y-2">
            <Label>Instagram URL</Label>
            <Input {...register("instagramUrl")} className="rounded-xl h-12" />
          </div>
          
          <div className="space-y-2">
            <Label>Twitter / X URL</Label>
            <Input {...register("twitterUrl")} className="rounded-xl h-12" />
          </div>
        </div>

        <div className="flex justify-end">
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="rounded-full px-8 h-12 bg-[var(--orange)] hover:bg-[var(--orange)]/90"
          >
            {isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            Save Site Settings
          </Button>
        </div>
      </form>
    </div>
  )
}
