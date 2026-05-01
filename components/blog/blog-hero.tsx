import Link from "next/link"
import { FadeInUp } from "@/components/motion"
import { ArrowRight, Calendar, User } from "lucide-react"

interface BlogHeroProps {
  post: {
    title: string
    slug: string
    excerpt: string | null
    author: string
    created_at: string
    cover_image?: string | null
  }
}

export function BlogHero({ post }: BlogHeroProps) {
  const date = new Date(post.created_at).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-white isolation-auto">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <FadeInUp>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[var(--orange)]/10 text-[var(--orange)] text-xs font-bold uppercase tracking-widest mb-8">
                Featured Post
              </div>
              <h1 className="font-serif text-5xl font-medium tracking-tight text-[var(--charcoal)] sm:text-6xl leading-tight mb-6">
                {post.title}
              </h1>
              <p className="text-xl text-[#57534E] leading-relaxed mb-8 font-light">
                {post.excerpt}
              </p>
              
              <div className="flex items-center gap-6 text-xs font-bold uppercase tracking-widest text-[#78716C] mb-10">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-[var(--orange)]" />
                  {date}
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-[var(--orange)]" />
                  {post.author}
                </div>
              </div>

              <Link 
                href={`/blog/${post.slug}`}
                className="inline-flex items-center h-14 px-8 rounded-2xl bg-[var(--charcoal)] text-white font-bold uppercase tracking-widest text-xs hover:bg-[var(--orange)] transition-all duration-300 group"
              >
                Read Featured Article
                <ArrowRight className="ml-3 h-4 w-4 transition-transform group-hover:translate-x-2" />
              </Link>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative aspect-square lg:aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl">
                {post.cover_image ? (
                  <img 
                    src={post.cover_image} 
                    alt={post.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--orange)] to-[var(--charcoal)] opacity-20" />
                )}
              </div>
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  )
}
