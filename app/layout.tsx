import type { Metadata } from 'next';
import { Inter, Manrope } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { LangProvider } from '@/context/LangContext';

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
    default: 'ServiceTrack — Track Your Activity',
    template: '%s | ServiceTrack',
  },
  description: 'A simple and beautiful activity tracker to manage your goals and time.',
  keywords: ['service', 'activity', 'tracking', 'goals', 'hours', 'sessions', 'follow-ups'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'ServiceTrack — Track Your Activity',
    description: 'A simple and beautiful activity tracker to manage your goals and time.',
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
    title: 'ServiceTrack — Track Your Activity',
    description: 'A simple and beautiful activity tracker to manage your goals and time.',
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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var lang = localStorage.getItem('lang') || 'en';
                  document.documentElement.lang = lang;
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground transition-colors duration-300">
        <ThemeProvider>
          <LangProvider>
            <AuthProvider>{children}</AuthProvider>
          </LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
