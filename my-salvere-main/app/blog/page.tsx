import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BlogCard } from "@/components/blog/blog-card"
import { BlogHero } from "@/components/blog/blog-hero"
import { createClient } from "@/lib/supabase/server"
import { StaggerChildren, StaggerItem, staggerItemVariants } from "@/components/motion"

export const metadata = {
  title: "Blog | Salvere Health & Performance",
  description: "Insights on functional medicine, nutrition, and sustainable health from Dewumi Ebuk.",
}

export default async function BlogPage() {
  const supabase = await createClient()
  
  if (!supabase) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 text-center">
        <div>
          <h1 className="text-2xl font-serif mb-4">Under Maintenance</h1>
          <p className="text-gray-500">Supabase connection not configured for this demo.</p>
        </div>
      </div>
    )
  }

  const { data: featuredPosts } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('status', 'published')
    .eq('is_featured', true)
    .order('created_at', { ascending: false })
    .limit(1)

  const { data: recentPosts } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false })

  const featuredPost = featuredPosts?.[0] || recentPosts?.[0]
  const otherPosts = recentPosts?.filter(p => p.id !== featuredPost?.id) || []

  return (
    <main className="min-h-screen bg-[var(--soft-white)]">
      <Header />
      
      {featuredPost && <BlogHero post={featuredPost} />}

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="font-serif text-4xl text-[var(--charcoal)]">Recent Articles</h2>
          </div>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherPosts.map((post) => (
              <StaggerItem key={post.id} variants={staggerItemVariants}>
                <BlogCard post={post} />
              </StaggerItem>
            ))}
          </StaggerChildren>

          {recentPosts?.length === 0 && (
            <div className="text-center py-20 bg-white rounded-[3rem] border border-[#E7E5E4]">
              <p className="text-[var(--charcoal)]/50">No articles published yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
