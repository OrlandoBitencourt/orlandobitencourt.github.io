import './global.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Navbar } from './components/nav'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Footer from './components/footer'
import { baseUrl } from './sitemap'
import ScrollToTop from './components/scroll-to-top'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Blog de Orlando Cechlar Bitencourt',
    template: '%s | Blog de Orlando Cechlar Bitencourt',
  },
  description: 'Este é meu blog',
  icons: {
    icon: '/icon.png',
  },
  openGraph: {
    title: 'Blog de Orlando Cechlar Bitencourt',
    description: 'Blog de Orlando onde eu posto sobre desenvolvimento, tecnologia e opiniões gerais.',
    url: baseUrl,
    siteName: 'Blog de Orlando Cechlar Bitencourt',
    locale: 'pt_BR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const cx = (...classes) => classes.filter(Boolean).join(' ')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="pt-BR"
      className={cx(
        'text-black bg-white dark:text-white dark:bg-neutral-800',
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      <body className="antialiased max-w-xl mx-4 mt-8 lg:mx-auto">
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
          <Navbar />
          {children}
          <Footer />
          <ScrollToTop />
        </main>
      </body>
    </html>
  )
}
