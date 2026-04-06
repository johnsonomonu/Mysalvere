"use client"

import { useState } from "react"
import { FadeInUp } from "@/components/motion"
import { Play, X } from "lucide-react"
import { cn } from "@/lib/utils"

const podcastEpisodes = [
  {
    id: "MnOn6RvrGSw",
    show: "The Ultimate Human Podcast",
    host: "with Gary Brecka",
    title: "Women's Health — Biohacking Hormones and the Menstrual Cycle",
    thumbnail: `https://img.youtube.com/vi/MnOn6RvrGSw/hqdefault.jpg`,
  },
  {
    id: "BUPcXg2PslY",
    show: "Primally Pure Podcast",
    host: "Natural Health & Wellness",
    title: "Why Women Feel Off — And What's Really Going On",
    thumbnail: `https://img.youtube.com/vi/BUPcXg2PslY/hqdefault.jpg`,
  },
  {
    id: "Td5r4ziwcmI",
    show: "Culture Apothecary",
    host: "Functional Medicine Insights",
    title: "What Men Should Know About A Woman's Hormone Cycle",
    thumbnail: `https://img.youtube.com/vi/Td5r4ziwcmI/hqdefault.jpg`,
  },
]

export function PodcastAppearancesSection() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null)

  return (
    <section className="py-24 lg:py-32 bg-white" id="media">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <FadeInUp>
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[var(--vital-mint)] text-[var(--vital-green)] text-xs font-bold uppercase tracking-widest mb-6">
              Media & Features
            </div>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <h2 className="font-serif text-4xl font-medium tracking-tight text-[#1C1917] sm:text-5xl">
              Featured Podcast Appearances
            </h2>
            <p className="mt-4 text-lg text-[#57534E] max-w-2xl mx-auto">
              Watch insights on health optimization, hormonal wellness, and functional medicine from leading experts.
            </p>
          </FadeInUp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {podcastEpisodes.map((pod, index) => (
            <FadeInUp key={pod.id} delay={0.1 + index * 0.1}>
              <div className="group relative flex flex-col h-full rounded-3xl bg-[#F9FAFB] overflow-hidden border border-transparent hover:border-[var(--vital-green)]/10 hover:shadow-xl transition-all duration-500">
                {/* Video Thumbnail / Player */}
                <div className="relative aspect-video bg-[#1C1917] overflow-hidden">
                  {activeVideo === pod.id ? (
                    <>
                      <iframe
                        src={`https://www.youtube.com/embed/${pod.id}?autoplay=1&rel=0`}
                        title={pod.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setActiveVideo(null)
                        }}
                        className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
                        aria-label="Close video"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setActiveVideo(pod.id)}
                      className="relative w-full h-full group/play cursor-pointer"
                      aria-label={`Play ${pod.title}`}
                    >
                      {/* Thumbnail */}
                      <img
                        src={pod.thumbnail}
                        alt={pod.title}
                        className="w-full h-full object-cover group-hover/play:scale-105 transition-transform duration-700"
                      />

                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                      {/* Play button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className={cn(
                          "flex h-16 w-16 items-center justify-center rounded-full",
                          "bg-white/90 backdrop-blur-sm shadow-2xl",
                          "group-hover/play:bg-[var(--vital-green)] group-hover/play:scale-110",
                          "transition-all duration-500"
                        )}>
                          <Play className={cn(
                            "h-7 w-7 ml-1 text-[#1C1917]",
                            "group-hover/play:text-white",
                            "transition-colors duration-300"
                          )} />
                        </div>
                      </div>

                      {/* Duration badge */}
                      <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-black/70 text-white text-xs font-medium backdrop-blur-sm">
                        Watch Now
                      </div>
                    </button>
                  )}
                </div>

                {/* Info */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-[var(--vital-green)] mb-1">
                    {pod.show}
                  </h3>
                  <p className="text-xs text-[#A8A29E] font-medium mb-3">
                    {pod.host}
                  </p>
                  <h4 className="font-serif text-lg font-medium text-[#1C1917] leading-tight flex-grow">
                    {pod.title}
                  </h4>
                </div>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>

      {/* Fullscreen Video Modal */}
      {activeVideo && (
        <div
         className="fixed inset-0 z-50 hidden lg:flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setActiveVideo(null)}
          style={{ display: "none" }}
        >
          {/* Modal hidden on purpose — inline embed is the primary UX */}
        </div>
      )}
    </section>
  )
}
