import type { Metadata } from 'next';
import { Inter, Manrope } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://servicetrack.vercel.app'),
  title: {
    default: 'ServiceTrack — Track Your Ministry Activity',
    template: '%s | ServiceTrack',
  },
  description: 'A simple and beautiful ministry activity tracker for Jehovah\'s Witnesses publishers and pioneers.',
  keywords: ['JW', 'ministry', 'publisher', 'pioneer', 'field service', 'hours', 'Bible studies', 'return visits'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'ServiceTrack — Track Your Ministry Activity',
    description: 'A simple and beautiful ministry activity tracker for Jehovah\'s Witnesses publishers and pioneers.',
    siteName: 'ServiceTrack',
    images: [{
      url: '/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'ServiceTrack Dashboard',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ServiceTrack — Track Your Ministry Activity',
    description: 'A simple and beautiful ministry activity tracker for Jehovah\'s Witnesses.',
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground transition-colors duration-300">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
