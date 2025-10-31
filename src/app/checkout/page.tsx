"use client"

import type React from "react"
import { useRef } from "react"
import { useRouter } from "next/navigation"
import {
  CreditCard,
  Lock,
  ArrowLeft,
  ShoppingBag,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"
import { toast } from "sonner"
import { useCheckout } from "@/hooks/useCheckout"

export default function CheckoutPage() {
  const router = useRouter()
  const { cartItems, subtotal, total, clearCart } = useCart()
  const { isProcessing, processCheckout } = useCheckout()
  const shipping = subtotal > 0 ? 15 : 0

  // Referencia para obtener la ciudad del formulario
  const cityRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!cartItems || cartItems.length === 0) {
      toast.error("Tu carrito está vacío")
      return
    }

    const city = cityRef.current?.value?.trim() || ""

    if (!city) {
      toast.error("Por favor ingresa una ciudad válida")
      return
    }

    try {
      const userId = 1 // ID de usuario simulado (puedes reemplazarlo con el real del contexto de autenticación)

      // 🟢 Construimos el objeto purchaseDto para verificarlo antes de enviarlo
      const purchaseDto = {
        userId,
        city,
        total: total + shipping,
        items: cartItems.map(item => ({
          productId: item.id,
          quantity: item.cantidad,
          price: item.precio
        }))
      }

      // 🟢 Mostramos en consola el objeto que se enviará al backend
      console.log("📦 purchaseDto enviado al backend:", purchaseDto)

      // Llamamos al hook con los 3 parámetros esperados
      await processCheckout(userId, cartItems, city)

      toast.success("Compra completada exitosamente 🎉", {
        description: "Gracias por tu compra. Pronto recibirás tu pedido.",
      })

      clearCart()

      // Redirige después de 2 segundos
      setTimeout(() => {
        router.push("/")
      }, 2000)
    } catch (error: any) {
      console.error("Error en handleSubmit:", error)
      toast.error("No se pudo procesar la compra", {
        description: error.message || "Intenta nuevamente más tarde",
      })
    }
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[var(--cream)] flex items-center justify-center p-4">
        <div className="text-center">
          <ShoppingBag className="h-16 w-16 text-[var(--burgundy)]/40 mx-auto mb-4" />
          <h2 className="text-2xl font-serif text-[var(--burgundy-dark)] mb-2">Tu carrito está vacío</h2>
          <p className="text-[var(--burgundy)]/60 mb-6">Agrega productos antes de proceder al pago</p>
          <Button
            onClick={() => router.push("/")}
            className="bg-[var(--burgundy)] hover:bg-[var(--burgundy-dark)] text-[var(--cream)]"
          >
            Volver a la tienda
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--cream)] to-[var(--burgundy)]/5">
      {/* Header */}
      <header className="bg-white border-b border-[var(--burgundy)]/10 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => router.push("/")}
              className="text-[var(--burgundy)] hover:bg-[var(--burgundy)]/10"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a la tienda
            </Button>
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-[var(--burgundy)]" />
              <span className="text-sm text-[var(--burgundy)]/80 font-medium">Pago seguro</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Formulario */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-[var(--burgundy)]/10">
              <h2 className="text-2xl font-serif text-[var(--burgundy-dark)] mb-6 flex items-center gap-2">
                <CreditCard className="h-6 w-6" />
                Información de pago
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contacto */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-[var(--burgundy-dark)]">Contacto</h3>
                  <div className="grid gap-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="tu@email.com" required />
                    </div>
                    <div>
                      <Label htmlFor="phone">Teléfono</Label>
                      <Input id="phone" type="tel" placeholder="+52 123 456 7890" required />
                    </div>
                  </div>
                </div>

                <Separator className="bg-[var(--burgundy)]/10" />

                {/* Dirección */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-[var(--burgundy-dark)]">Dirección de envío</h3>
                  <div className="grid gap-4">
                    <Input id="address" placeholder="Calle Principal 123" required />
                    <div className="grid sm:grid-cols-3 gap-4">
                      <Input id="city" placeholder="Ciudad" ref={cityRef} required />
                      <Input id="state" placeholder="Estado" required />
                      <Input id="zip" placeholder="12345" required />
                    </div>
                  </div>
                </div>

                <Separator className="bg-[var(--burgundy)]/10" />

                {/* Tarjeta */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-[var(--burgundy-dark)]">Información de tarjeta</h3>
                  <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
                  <Input id="cardName" placeholder="JUAN PÉREZ" required />
                  <div className="grid grid-cols-2 gap-4">
                    <Input id="expiry" placeholder="MM/AA" required />
                    <Input id="cvv" placeholder="123" required type="password" />
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isProcessing}
                  className="w-full bg-[var(--burgundy)] hover:bg-[var(--burgundy-dark)] text-[var(--cream)] font-semibold text-lg h-14 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {isProcessing ? (
                    <>
                      <div className="h-5 w-5 border-2 border-[var(--cream)] border-t-transparent rounded-full animate-spin mr-2" />
                      Procesando...
                    </>
                  ) : (
                    <>
                      <Lock className="h-5 w-5 mr-2" />
                      Finalizar Compra ${(total + shipping).toFixed(2)}
                    </>
                  )}
                </Button>

                <p className="text-xs text-center text-[var(--burgundy)]/60">
                  Tu información está protegida con encriptación SSL de 256 bits
                </p>
              </form>
            </div>
          </div>

          {/* Resumen */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-[var(--burgundy)]/10 sticky top-24">
              <h2 className="text-2xl font-serif text-[var(--burgundy-dark)] mb-6 flex items-center gap-2">
                <ShoppingBag className="h-6 w-6" />
                Resumen del pedido
              </h2>

              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-3 rounded-lg bg-[var(--cream)]/50 border border-[var(--burgundy)]/5"
                  >
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-[var(--burgundy)]/5">
                      <img
                        src={item.imagen || "/placeholder.svg"}
                        alt={item.nombre}
                        className="h-full w-full object-cover"
                      />
                      <Badge className="absolute -top-2 -right-2 h-6 w-6 flex items-center justify-center p-0 bg-[var(--burgundy)] text-[var(--cream)] text-xs">
                        {item.cantidad}
                      </Badge>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif text-[var(--burgundy-dark)] truncate">{item.nombre}</h3>
                      <p className="text-lg font-bold text-[var(--burgundy-dark)]">${item.precio.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="bg-[var(--burgundy)]/10" />
              <div className="flex justify-between text-[var(--burgundy-dark)] mt-4">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[var(--burgundy-dark)]">
                <span>Envío</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <Separator className="bg-[var(--burgundy)]/10 my-2" />
              <div className="flex justify-between text-lg font-bold text-[var(--burgundy-dark)]">
                <span>Total</span>
                <span>${(total + shipping).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
