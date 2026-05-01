"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createPost, updatePost } from "@/lib/admin/blog-actions"
import { Loader2, Save, UploadCloud } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

const blogSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  slug: z.string().min(2, "Slug is required"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  excerpt: z.string().optional(),
  author: z.string().min(2, "Author is required"),
  cover_image: z.string().url("Invalid URL").optional().or(z.literal("")),
  status: z.enum(["draft", "published"]),
  is_featured: z.boolean().default(false),
  tags: z.string().optional(),
})

interface BlogFormProps {
  initialData?: any
}

export function BlogForm({ initialData }: BlogFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm({
    resolver: zodResolver(blogSchema),
    defaultValues: initialData ? {
      ...initialData,
      tags: initialData.tags?.join(", ") || ""
    } : {
      status: "draft",
      author: "Dewumi Ebuk",
      is_featured: false
    }
  })

  // Auto-generate slug from title
  const title = watch("title")
  const generateSlug = () => {
    if (!initialData && title) {
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '')
      setValue("slug", slug)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
      // Clear URL input if file is selected
      setValue("cover_image", "")
    }
  }

  const onSubmit = async (data: any) => {
    setIsSubmitting(true)
    setError(null)
    
    let coverImageUrl = data.cover_image

    try {
      if (selectedFile) {
        const supabase = createClient()
        if (supabase) {
          const fileExt = selectedFile.name.split('.').pop()
          const fileName = `${Math.random()}.${fileExt}`
          const filePath = `${fileName}`

          const { error: uploadError, data: uploadData } = await supabase.storage
            .from('blog-images')
            .upload(filePath, selectedFile)

          if (uploadError) {
            throw new Error(`Image upload failed: ${uploadError.message}`)
          }

          const { data: { publicUrl } } = supabase.storage
            .from('blog-images')
            .getPublicUrl(filePath)
            
          coverImageUrl = publicUrl
        }
      }

      const formattedData = {
        ...data,
        cover_image: coverImageUrl,
        tags: data.tags ? data.tags.split(",").map((t: string) => t.trim()) : []
      }

      if (initialData) {
        await updatePost(initialData.id, formattedData)
      } else {
        await createPost(formattedData)
      }
      router.push("/admin/blog")
      router.refresh()
    } catch (err: any) {
      setError(err.message || "Failed to save post")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {error && (
        <div className="p-4 rounded-xl bg-red-50 text-red-600 text-sm border border-red-100">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Article Title</Label>
            <Input 
              id="title" 
              {...register("title")} 
              onBlur={generateSlug}
              placeholder="The Future of Functional Medicine" 
              className="rounded-xl h-12" 
            />
            {errors.title && <p className="text-red-500 text-xs">{errors.title.message as string}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug (URL)</Label>
            <Input id="slug" {...register("slug")} placeholder="future-of-functional-medicine" className="rounded-xl h-12" />
            {errors.slug && <p className="text-red-500 text-xs">{errors.slug.message as string}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="author">Author</Label>
            <Input id="author" {...register("author")} className="rounded-xl h-12" />
            {errors.author && <p className="text-red-500 text-xs">{errors.author.message as string}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Publishing Status</Label>
            <select 
              id="status" 
              {...register("status")}
              className="flex h-12 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          <div className="flex items-center space-x-2 pt-4">
            <input
              type="checkbox"
              id="is_featured"
              {...register("is_featured")}
              className="h-4 w-4 rounded border-gray-300 text-[var(--orange)] focus:ring-[var(--orange)]"
            />
            <Label htmlFor="is_featured" className="font-medium text-[#1C1917]">
              Featured Post
            </Label>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Cover Image</Label>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => fileInputRef.current?.click()}
                  className="rounded-xl h-12 shrink-0 border-dashed"
                >
                  <UploadCloud className="mr-2 h-4 w-4" />
                  Upload Image
                </Button>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
                <span className="text-sm text-[#78716C] truncate">
                  {selectedFile ? selectedFile.name : "Or paste a URL below"}
                </span>
              </div>
              <Input 
                id="cover_image" 
                {...register("cover_image")} 
                placeholder="https://images.unsplash.com/..." 
                className="rounded-xl h-12" 
                disabled={!!selectedFile}
              />
            </div>
            {errors.cover_image && <p className="text-red-500 text-xs">{errors.cover_image.message as string}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma separated)</Label>
            <Input id="tags" {...register("tags")} placeholder="Health, Nutrition, Energy" className="rounded-xl h-12" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Short Excerpt</Label>
            <Textarea 
              id="excerpt" 
              {...register("excerpt")} 
              placeholder="A brief summary for the blog card..." 
              className="rounded-2xl min-h-[130px] py-4"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Full Content (Markdown supported)</Label>
        <Textarea 
          id="content" 
          {...register("content")} 
          placeholder="Start writing your article here..." 
          className="rounded-3xl min-h-[400px] py-6 font-mono text-sm leading-relaxed"
        />
        {errors.content && <p className="text-red-500 text-xs">{errors.content.message as string}</p>}
      </div>

      <div className="flex justify-end gap-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => router.back()}
          className="rounded-full px-8 h-12"
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="rounded-full px-12 h-12 bg-[var(--orange)] hover:bg-[var(--orange)]/90"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Post
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
