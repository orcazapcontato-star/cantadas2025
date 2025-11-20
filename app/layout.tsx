import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { FavoritesProvider } from "@/lib/favorites-context"
import { AuthProvider } from "@/lib/auth-context"
import { RealtimeSyncProvider } from "@/lib/realtime-sync"
import { Suspense } from "react"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  title: "Cantadas Cristãs - Relacionamentos com Fé e Respeito",
  description: "Cantadas respeitosas, mensagens prontas e conselhos bíblicos para relacionamentos cristãos",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`font-sans ${inter.variable} antialiased`}>
        <Suspense fallback={<div>Loading...</div>}>
          <AuthProvider>
            <FavoritesProvider>
              <RealtimeSyncProvider>{children}</RealtimeSyncProvider>
            </FavoritesProvider>
          </AuthProvider>
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
