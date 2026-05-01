"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function createService(data: any) {
  const supabase = await createClient()
  if (!supabase) throw new Error("Supabase not configured")

  const { error } = await supabase
    .from('services_config')
    .insert([data])

  if (error) throw new Error(error.message)

  revalidatePath("/services")
  revalidatePath("/admin/services")
}

export async function updateService(id: string, data: any) {
  const supabase = await createClient()
  if (!supabase) throw new Error("Supabase not configured")

  const { error } = await supabase
    .from('services_config')
    .update(data)
    .eq('id', id)

  if (error) throw new Error(error.message)

  revalidatePath("/services")
  revalidatePath("/admin/services")
}

export async function deleteService(id: string) {
  const supabase = await createClient()
  if (!supabase) throw new Error("Supabase not configured")

  const { error } = await supabase
    .from('services_config')
    .delete()
    .eq('id', id)

  if (error) throw new Error(error.message)

  revalidatePath("/services")
  revalidatePath("/admin/services")
}

export async function toggleServiceStatus(id: string, currentStatus: boolean) {
  const supabase = await createClient()
  if (!supabase) throw new Error("Supabase not configured")

  const { error } = await supabase
    .from('services_config')
    .update({ is_active: !currentStatus })
    .eq('id', id)

  if (error) throw new Error(error.message)

  revalidatePath("/services")
  revalidatePath("/admin/services")
}
