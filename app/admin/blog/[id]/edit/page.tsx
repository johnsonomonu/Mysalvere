import { requireAdmin } from "@/lib/auth/guards"
import { BlogForm } from "@/components/admin/blog-form"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"

interface EditPostPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function EditBlogPostPage({ params }: EditPostPageProps) {
  const { id } = await params
  await requireAdmin()
  const supabase = await createClient()

  if (!supabase) return <div>Supabase not configured</div>

  const { data: post } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', id)
    .single()

  if (!post) notFound()

  return (
    <div className="space-y-6">
      <Link href="/admin/blog" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-[#78716C] hover:text-[var(--orange)] transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
      </Link>

      <div>
        <h2 className="font-serif text-3xl text-[#1C1917]">Edit Article</h2>
        <p className="mt-2 text-sm text-[#57534E]">
          Update the details for "{post.title}".
        </p>
      </div>

      <div className="rounded-[2rem] border border-[#E7E5E4] bg-white p-8 md:p-12">
        <BlogForm initialData={post} />
      </div>
    </div>
  )
}
