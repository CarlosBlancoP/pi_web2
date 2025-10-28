"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"

export interface CartItem {
  id: number
  nombre: string
  precio: number
  cantidad: number
  imagen: string
  categoria?: string
  descripcion?: string
}

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (product: Omit<CartItem, "cantidad">) => void
  removeFromCart: (id: number) => void
  increaseQuantity: (id: number) => void
  decreaseQuantity: (id: number) => void
  clearCart: () => void
  totalItems: number
  subtotal: number
  total: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const addToCart = useCallback((product: Omit<CartItem, "cantidad">) => {
    setCartItems((items) => {
      const existingItem = items.find((item) => item.id === product.id)
      if (existingItem) {
        return items.map((item) => (item.id === product.id ? { ...item, cantidad: item.cantidad + 1 } : item))
      }
      return [...items, { ...product, cantidad: 1 }]
    })
  }, [])

  const removeFromCart = useCallback((id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }, [])

  const increaseQuantity = useCallback((id: number) => {
    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item)))
  }, [])

  const decreaseQuantity = useCallback((id: number) => {
    setCartItems((items) =>
      items.map((item) => (item.id === id && item.cantidad > 1 ? { ...item, cantidad: item.cantidad - 1 } : item)),
    )
  }, [])

  const clearCart = useCallback(() => {
    setCartItems([])
  }, [])

  const totalItems = cartItems.reduce((sum, item) => sum + item.cantidad, 0)
  const subtotal = cartItems.reduce((sum, item) => sum + item.precio * item.cantidad, 0)
  const shipping = subtotal > 0 ? 15 : 0
  const total = subtotal + shipping

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        totalItems,
        subtotal,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
