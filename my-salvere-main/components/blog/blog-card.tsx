import Link from "next/link"
import { ArrowRight, Calendar, User } from "lucide-react"

interface BlogCardProps {
  post: {
    title: string
    slug: string
    excerpt: string | null
    author: string
    created_at: string
    cover_image?: string | null
  }
}

export function BlogCard({ post }: BlogCardProps) {
  const date = new Date(post.created_at).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="flex flex-col h-full bg-white rounded-[2.5rem] overflow-hidden border border-[#E7E5E4] hover:shadow-2xl transition-all duration-500">
        <div className="relative h-64 overflow-hidden bg-[var(--warm-beige)]">
          {post.cover_image ? (
            <img 
              src={post.cover_image} 
              alt={post.title}
              className="absolute inset-0 h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
               {/* Fallback pattern */}
               <div className="w-full h-full bg-gradient-to-br from-[var(--orange)] to-[var(--charcoal)]" />
            </div>
          )}
        </div>

        <div className="p-8 flex flex-col flex-grow">
          <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-[#78716C] mb-4">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3 w-3" />
              {date}
            </div>
            <div className="flex items-center gap-1.5">
              <User className="h-3 w-3" />
              {post.author}
            </div>
          </div>

          <h3 className="font-serif text-2xl text-[var(--charcoal)] mb-4 group-hover:text-[var(--orange)] transition-colors line-clamp-2">
            {post.title}
          </h3>

          <p className="text-[var(--charcoal)]/70 text-sm leading-relaxed mb-8 line-clamp-3">
            {post.excerpt}
          </p>

          <div className="mt-auto flex items-center text-[var(--orange)] text-sm font-bold uppercase tracking-widest gap-2">
            Read Article
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
          </div>
        </div>
      </article>
    </Link>
  )
}
