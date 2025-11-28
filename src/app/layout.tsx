import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SitePlan AI - AI-Powered Site Plan Generator",
  description:
    "Generate professional site plans in minutes with AI-powered property mapping and automated site plan generation. Perfect for real estate professionals, architects, and developers.",
  keywords: ["site plan", "AI", "property mapping", "site plan generator", "real estate", "architecture"],
  authors: [{ name: "SitePlan AI" }],
  openGraph: {
    title: "SitePlan AI - AI-Powered Site Plan Generator",
    description: "Generate professional site plans in minutes with AI-powered property mapping and automated site plan generation.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "SitePlan AI - AI-Powered Site Plan Generator",
    description: "Generate professional site plans in minutes with AI-powered property mapping and automated site plan generation.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SiteHeader />
          {children}
          <SiteFooter />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
