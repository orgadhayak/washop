import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { FloatingWhatsAppButton } from "@/components/FloatingWhatsAppButton";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getActiveCategoriesWithCounts } from "@/lib/category-stats";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const rubik = Rubik({
  subsets: ["hebrew", "latin"],
  variable: "--font-rubik",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: {
    default: siteConfig.title,
    template: "%s | washop.co.il",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: siteConfig.favicon16, type: "image/png", sizes: "16x16" },
      { url: siteConfig.favicon32, type: "image/png", sizes: "32x32" },
      { url: siteConfig.brandIcon192, type: "image/png", sizes: "192x192" },
      { url: siteConfig.brandIcon, type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: siteConfig.appleTouchIcon, sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "he_IL",
    url: new URL("/", siteConfig.domain),
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name}, ${siteConfig.hebrewPositioning}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const footerCategories = getActiveCategoriesWithCounts()
    .slice(0, 8)
    .map(({ slug, name }) => ({ slug, name }));

  return (
    <html lang="he" dir="rtl" className={`${rubik.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col text-zinc-950">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer activeCategories={footerCategories} />
        <FloatingWhatsAppButton />
        <Analytics />
      </body>
    </html>
  );
}
