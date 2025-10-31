import type React from "react"
import type { Metadata } from "next"
import { ClerkProvider } from "@clerk/nextjs"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Toaster } from "sonner" // ✅ Toaster de Sonner
import { ClientWrapper } from "@/app/components/ClientWrapper" // ✅ Cliente (axios, hooks, etc.)

// ❇️ Fuentes
const geist = Geist({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "El Arte de Vivir",
  description: "Productos artesanales únicos",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="es">
        <body className={`${geist.className} ${geistMono.className} flex flex-col min-h-screen`}>
          {/* 🧠 Todo lo que requiere contexto de cliente (axios, toast, header interactivo, etc.) */}
          <ClientWrapper>
            {children}
          </ClientWrapper>

          {/* ✅ Toaster global de Sonner */}
          <Toaster
            position="top-right"
            richColors
            closeButton
            toastOptions={{
              style: {
                background: "white",
                border: "1px solid #e5e5e5",
                borderRadius: "0.75rem",
                padding: "0.75rem 1rem",
              },
            }}
          />

          {/* 📊 Analítica */}
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  )
}
