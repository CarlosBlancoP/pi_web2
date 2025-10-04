"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 1,
      name: "Los 3 Budas",
      price: 120000,
      quantity: 1,
      image: "3budas.jpg",
    },
    {
      id: 2,
      name: "Aretes Árboles",
      price: 350000,
      quantity: 2,
      image: "aretesarboles.jpg",
    },
    {
      id: 3,
      name: "Caballos",
      price: 80000,
      quantity: 1,
      image: "caballos.jpg",
    },
  ])

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  // 🔹 Funciones para manejar el carrito
  const increaseQuantity = (id: number) => {
    setCart(cart.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
  }

  const decreaseQuantity = (id: number) => {
    setCart(
      cart.map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    )
  }

  const clearCart = () => setCart([])

  return (
    <div className="link justify-center p-30 ml-150">
      <div className="w-full md:w-[60%] bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Tu Carrito</h2>

        {cart.length === 0 ? (
          <p className="text-gray-500 text-center text-lg">Tu carrito está vacío.</p>
        ) : (
          <div className="space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-6 border-b border-gray-100 pb-4"
              >
                {/* Imagen */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 rounded-lg object-cover shadow"
                />

                {/* Info del producto */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-gray-500">Precio: ${item.price.toLocaleString()}</p>
                  <p className="text-gray-700 font-medium">
                    Subtotal: ${(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>

                {/* Controles de cantidad */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    ➖
                  </Button>
                  <Badge
                    variant="secondary"
                    className="text-sm px-4 py-2 bg-blue-100 text-blue-800 rounded-full"
                  >
                    {item.quantity}
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => increaseQuantity(item.id)}
                  >
                    ➕
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Total */}
        <div className="flex flex-col gap-4 mt-8 pt-6 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-gray-800">
              Total: <span className="text-blue-600">${total.toLocaleString()}</span>
            </span>

            {/* 🔹 Botón que lleva a /checkout */}
            <Link href="./pago">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl shadow-md">
                Proceder al pago
              </Button>
            </Link>
          </div>

          {/* Botón eliminar todo */}
          <Button
            variant="destructive"
            className="w-[200px] bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl shadow-md"
            onClick={clearCart}
          >
            Eliminar todo
          </Button>
        </div>
      </div>
    </div>
  )
}



