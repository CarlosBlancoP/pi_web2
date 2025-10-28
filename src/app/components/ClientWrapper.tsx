"use client"

import React from "react"
import { CartProvider } from "@/contexts/cart-context"
import Header from "../components/layouts/Header"
import Footer from "../components/layouts/footer"
import { Analytics } from "@vercel/analytics/next"
import { ChatWidget } from "@/components/ui/chat-widget" // 👈 Chat aquí

export function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <Analytics />
      <ChatWidget />
    </CartProvider>
  )
}
