"use client"

import { ReactNode } from "react"
import { CartProvider } from "@/contexts/cart-context"
import { ShoppingCartDrawer } from "@/components/ui/shopping-cart"
import { ChatWidget } from "@/components/ui/chat-widget"

export function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      {/* ✅ Carrito flotante disponible en todas las páginas */}
      <div className="fixed top-4 right-4 z-50">
        <ShoppingCartDrawer />
      </div>

      {/* ✅ Contenido dinámico (cada página) */}
      {children}

      {/* ✅ Chatbot visible en todas las páginas */}
      <ChatWidget />
    </CartProvider>
  )
}
