import { requireAdmin } from "@/lib/auth/guards"
import { BlogForm } from "@/components/admin/blog-form"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default async function NewBlogPostPage() {
  await requireAdmin()

  return (
    <div className="space-y-6">
      <Link href="/admin/blog" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-[#78716C] hover:text-[var(--orange)] transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
      </Link>

      <div>
        <h2 className="font-serif text-3xl text-[#1C1917]">Create New Article</h2>
        <p className="mt-2 text-sm text-[#57534E]">
          Fill in the details below to create a new blog post.
        </p>
      </div>

      <div className="rounded-[2rem] border border-[#E7E5E4] bg-white p-8 md:p-12">
        <BlogForm />
      </div>
    </div>
  )
}
