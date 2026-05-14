"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function createPost(data: any) {
  const supabase = await createClient()
  if (!supabase) throw new Error("Supabase not configured")

  const { error } = await supabase
    .from('blog_posts')
    .insert([data])

  if (error) throw new Error(error.message)

  revalidatePath("/blog")
  revalidatePath("/admin/blog")
}

export async function updatePost(id: string, data: any) {
  const supabase = await createClient()
  if (!supabase) throw new Error("Supabase not configured")

  const { error } = await supabase
    .from('blog_posts')
    .update(data)
    .eq('id', id)

  if (error) throw new Error(error.message)

  revalidatePath("/blog")
  revalidatePath(`/blog/${data.slug}`)
  revalidatePath("/admin/blog")
}

export async function deletePost(id: string) {
  const supabase = await createClient()
  if (!supabase) throw new Error("Supabase not configured")

  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', id)

  if (error) throw new Error(error.message)

  revalidatePath("/blog")
  revalidatePath("/admin/blog")
}
