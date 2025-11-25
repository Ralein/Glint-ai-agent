import type React from "react"
import type { Metadata, Viewport } from "next"

import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/lib/auth-context"
import { ThemeProvider } from "@/lib/theme-context"
import "./globals.css"

import {
  Geist,
  Geist_Mono,
  Source_Serif_4,
} from "next/font/google"

// Initialize fonts
const geist = Geist({
  subsets: ["latin"],
  weight: ["100","200","300","400","500","600","700","800","900"],
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["100","200","300","400","500","600","700","800","900"],
})

const sourceSerif4 = Source_Serif_4({
  subsets: ["latin"],
  weight: ["200","300","400","500","600","700","800","900"],
})

export const metadata: Metadata = {
  title: "GlintAI - AI Learning & Collaboration Platform",
  description: "Connect, learn, and build with AI. The premier platform for AI developers, creators, and enthusiasts.",

  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: "#1a1a2e",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        <ThemeProvider>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}