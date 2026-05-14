import { createClient } from "@/lib/supabase/server"
import { requireAdmin } from "@/lib/auth/guards"
import Link from "next/link"
import { Plus, Edit2, Trash2, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"

export default async function AdminBlogPage() {
  await requireAdmin()
  const supabase = await createClient()

  if (!supabase) return <div>Supabase not configured</div>

  const { data: posts } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#78716C]">CMS</p>
          <h2 className="mt-2 font-serif text-3xl text-[#1C1917]">Blog Management</h2>
          <p className="mt-2 text-sm text-[#57534E]">
            Create, edit, and publish articles to the Salvere blog.
          </p>
        </div>
        <Button asChild className="rounded-full bg-[var(--orange)] hover:bg-[var(--orange)]/90">
          <Link href="/admin/blog/new">
            <Plus className="mr-2 h-4 w-4" /> New Article
          </Link>
        </Button>
      </div>

      <div className="overflow-hidden rounded-[2rem] border border-[#E7E5E4] bg-white shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E7E5E4] bg-[#FAFAF9]">
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-[#78716C]">Title</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-[#78716C]">Status</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-[#78716C]">Author</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-[#78716C]">Date</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-[#78716C] text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E7E5E4]">
            {posts?.map((post) => (
              <tr key={post.id} className="hover:bg-[#FAFAF9] transition-colors">
                <td className="px-6 py-4">
                  <p className="font-medium text-[#1C1917]">{post.title}</p>
                  <p className="text-xs text-[#78716C]">/{post.slug}</p>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    post.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {post.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-[#57534E]">{post.author}</td>
                <td className="px-6 py-4 text-sm text-[#57534E]">
                  {new Date(post.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/blog/${post.slug}`} target="_blank">
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/admin/blog/${post.id}/edit`}>
                        <Edit2 className="h-4 w-4" />
                      </Link>
                    </Button>
                    {/* Add delete action later */}
                  </div>
                </td>
              </tr>
            ))}
            {posts?.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-20 text-center text-[#78716C]">
                  No articles found. Start by creating your first post!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
