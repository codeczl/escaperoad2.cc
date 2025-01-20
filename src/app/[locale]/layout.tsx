import './globals.css';
import '@radix-ui/themes/styles.css';
import React from 'react';
import { Inter } from 'next/font/google'
import { Layout } from '@/components/Layout';
import { Metadata, Viewport } from 'next'
import { GoogleAnalyticsScript } from "@/components/analytics/GoogleAnalyticsScript";
import { PlausibleAnalyticsScript } from "@/components/analytics/PlausibleAnalyticsScript";
import GoogleAdsenseScript from "@/components/ads/GoogleAdsenseScript";
import { ThemeProvider } from "next-themes"
import { DM_Sans } from "next/font/google";
import { cn } from "@/lib/utils";

import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { generateMetaTags } from '@/components/MetaTags'

const inter = Inter({ subsets: ['latin'] })
const sansFont = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ],
  width: 'device-width',
  initialScale: 1
}

export const metadata: Metadata = {
  title: {
    default: 'Escape Road 2 | Action Racing Game',
    template: '%s | Escape Road 2'
  },
  description: 'Escape Road 2 is an action-packed retro-style racing game where players evade relentless police chases through dynamic cityscapes.',
  authors: { name: 'escaperoad2.cc', url: 'https://escaperoad2.cc/' },
  keywords: 'Escape Road 2, retro racing game, police chase, driving skills, pixel art',
  alternates: {
    canonical: "https://escaperoad2.cc/",
    languages: {
      "en": "https://escaperoad2.cc/en",
      "zh": "https://escaperoad2.cc/zh",
    }
  },
  icons: [
    { rel: "icon", type: "image/png", sizes: "16x16", url: "/favicon-16x16.png" },
    { rel: "icon", type: "image/png", sizes: "32x32", url: "/favicon-32x32.png" },
    { rel: "icon", type: "image/png", sizes: "192x192", url: "/android-chrome-192x192.png" },
    { rel: "icon", type: "image/png", sizes: "512x512", url: "/android-chrome-512x512.png" },
    { rel: "apple-touch-icon", sizes: "180x180", url: "/apple-touch-icon.png" },
    { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#5bbad5" }
  ],
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Roblox Code"
  },
  ...generateMetaTags({
    title: 'Escape Road 2 | Action Racing Game',
    description: 'Escape Road 2 is an action-packed retro-style racing game where players evade relentless police chases through dynamic cityscapes.',
    url: 'https://escaperoad2.cc',
    imageUrl: 'https://escaperoad2.cc/og-image.jpg'
  }),
}

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <GoogleAnalyticsScript />
      </head>
      <body className={cn(inter.className, sansFont.variable)}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider 
            attribute="class" 
            defaultTheme="dark"
            enableSystem={false}
          >
            <Layout>{children}</Layout>
            <GoogleAdsenseScript />
            <PlausibleAnalyticsScript />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}