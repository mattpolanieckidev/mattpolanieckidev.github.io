import type { Metadata, Viewport } from "next"
import { Inter, Space_Mono, Noto_Serif } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
})
const notoSerif = Noto_Serif({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-noto-serif",
})

export const metadata: Metadata = {
  title: "Matt Polaniecki -- Projects",
  description:
    "A collection of web projects by Matt Polaniecki, including Jewish learning tools, games, and utilities.",
}

export const viewport: Viewport = {
  themeColor: "#1a1a1a",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" data-theme="bauhaus">
      <body className={`${inter.variable} ${spaceMono.variable} ${notoSerif.variable} font-sans antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
