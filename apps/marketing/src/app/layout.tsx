import '@compiel/ui/globals.css';
import { cn } from '@compiel/ui/cn';
import { GeistMono } from 'geist/font/mono';
import type { Metadata } from 'next';
import { Toaster } from 'sonner';
import { Providers } from './providers';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://trycompiel.com'),
  title: {
    default: 'Compiel | Automate SOC 2, ISO 27001 and GDPR Compliance with AI',
    template: '%s | Compiel',
  },
  description: 'Streamline your compliance journey with AI-powered automation. Achieve SOC 2, ISO 27001, and GDPR certification faster.',
  keywords: ['compliance', 'SOC 2', 'ISO 27001', 'GDPR', 'automation', 'AI', 'security'],
  authors: [{ name: 'Compiel' }],
  openGraph: {
    title: 'Compiel | Automate Compliance with AI',
    description: 'Streamline your compliance journey with AI-powered automation.',
    url: 'https://trycompiel.com',
    siteName: 'Compiel',
    images: [
      {
        url: 'https://cdn.trycompiel.com/og-marketing.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Compiel | Automate Compliance with AI',
    description: 'Streamline your compliance journey with AI-powered automation.',
    images: ['https://cdn.trycompiel.com/og-marketing.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(GeistMono.variable, 'antialiased font-sans')}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
        <Toaster richColors />
      </body>
    </html>
  );
}
