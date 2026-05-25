import type { Metadata, Viewport } from 'next'
import { Fraunces, Outfit } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const fraunces = Fraunces({ 
  subsets: ["latin"],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['SOFT', 'WONK'],
});

const outfit = Outfit({ 
  subsets: ["latin"],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Salvere | Premium Wellness & Functional Medicine in Nigeria',
  description: 'Salvere offers physician-led functional medicine that resolves the root cause of symptoms. Achieve true health through lifestyle guidance, advanced labs, and root-cause resolution.',
  generator: 'v0.app',
  keywords: ['functional medicine Nigeria', 'wellness coaching', 'root cause health', 'chronic disease management', 'lifestyle medicine', 'health optimization', 'Salvere', 'Dr. Dew'],
  openGraph: {
    title: 'Salvere | Premium Wellness & Functional Medicine',
    description: 'Physician-led functional medicine that resolves the root cause of your symptoms.',
    url: 'https://salvere.health',
    siteName: 'Salvere',
    images: [
      {
        url: '/hero-new.jpg',
        width: 1200,
        height: 630,
        alt: 'Salvere - Premium Functional Medicine and Wellness',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Salvere | Premium Wellness & Functional Medicine',
    description: 'Physician-led functional medicine that resolves the root cause of your symptoms.',
    images: ['/hero-new.jpg'],
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#1C1917',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${outfit.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased bg-[var(--warm-beige)] text-[var(--charcoal)]" suppressHydrationWarning>
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
