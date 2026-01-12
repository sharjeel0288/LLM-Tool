import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "LLM Toolkit - All-in-One Developer Tools",
    template: "%s | LLM Toolkit",
  },
  description: "Comprehensive collection of 50+ useful tools for developers and LLM users - Compare models, calculate costs, use free APIs, and more!",
  keywords: [
    "LLM tools",
    "developer tools",
    "text tools",
    "code tools",
    "API tools",
    "converter tools",
    "generators",
    "LLM comparison",
    "token counter",
    "cost calculator",
    "free APIs",
    "web tools",
  ],
  authors: [{ name: "LLM Toolkit" }],
  creator: "LLM Toolkit",
  publisher: "LLM Toolkit",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://llm-toolkit.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://llm-toolkit.vercel.app",
    title: "LLM Toolkit - All-in-One Developer Tools",
    description: "Comprehensive collection of 50+ useful tools for developers and LLM users",
    siteName: "LLM Toolkit",
  },
  twitter: {
    card: "summary_large_image",
    title: "LLM Toolkit - All-in-One Developer Tools",
    description: "Comprehensive collection of 50+ useful tools for developers and LLM users",
    creator: "@llmtoolkit",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}

