import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { Calendar, User, ArrowLeft, Tag } from "lucide-react"
import Link from "next/link"
import { FadeInUp } from "@/components/motion"

interface PostPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function BlogPostPage({ params }: PostPageProps) {
  const { slug } = await params
  const supabase = await createClient()

  if (!supabase) return notFound()

  const { data: post } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (!post) notFound()

  const date = new Date(post.created_at).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      <article className="pt-32 pb-24">
        {/* Post Header */}
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <FadeInUp>
            <Link href="/blog" className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-[var(--orange)] mb-12 hover:gap-3 transition-all group">
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:mr-3" /> Back to Articles
            </Link>
            
            <div className="flex items-center gap-6 text-xs font-bold uppercase tracking-widest text-[#78716C] mb-8">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[var(--orange)]" />
                {date}
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-[var(--orange)]" />
                {post.author}
              </div>
            </div>

            <h1 className="font-serif text-4xl font-medium tracking-tight text-[var(--charcoal)] sm:text-6xl leading-tight mb-8">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-xl text-[#57534E] leading-relaxed mb-12 font-light italic border-l-4 border-[var(--orange)] pl-6">
                {post.excerpt}
              </p>
            )}
          </FadeInUp>
        </div>

        {/* Featured Image */}
        {post.cover_image && (
          <div className="mx-auto max-w-6xl px-6 lg:px-8 mb-16">
            <FadeInUp delay={0.2}>
              <div className="relative aspect-[21/9] rounded-[3rem] overflow-hidden shadow-2xl">
                <img 
                  src={post.cover_image} 
                  alt={post.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </FadeInUp>
          </div>
        )}

        {/* Post Content */}
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <FadeInUp delay={0.3}>
            <div className="prose prose-lg prose-stone prose-orange max-w-none">
              {/* Simple split by newline for paragraphs for now */}
              {post.content.split('\n').map((para: string, i: number) => (
                <p key={i} className="text-[#57534E] leading-relaxed mb-6 text-lg">
                  {para}
                </p>
              ))}
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-16 pt-8 border-t border-[#E7E5E4] flex flex-wrap gap-3">
                {post.tags.map((tag: string) => (
                  <span key={tag} className="inline-flex items-center px-4 py-2 rounded-full bg-[#FAFAF9] border border-[#E7E5E4] text-xs font-bold uppercase tracking-widest text-[#78716C]">
                    <Tag className="h-3 w-3 mr-2 text-[var(--orange)]" />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </FadeInUp>
        </div>
      </article>

      <Footer />
    </main>
  )
}
