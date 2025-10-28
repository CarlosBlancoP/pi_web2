"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CreditCard, Lock, ArrowLeft, ShoppingBag, Truck, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"

export default function CheckoutPage() {
  const router = useRouter()
  const { cartItems, subtotal, total } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)
  const shipping = subtotal > 0 ? 15 : 0

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simular procesamiento de pago
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Aquí iría la integración real con la pasarela de pago
    alert("¡Pago procesado exitosamente!")
    setIsProcessing(false)
    router.push("/")
  }

  if (cartItems.length === 0) {
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
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4 max-w-2xl mx-auto">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-[var(--burgundy)] flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-[var(--cream)]" />
              </div>
              <span className="text-sm font-medium text-[var(--burgundy-dark)]">Carrito</span>
            </div>
            <div className="h-0.5 w-16 bg-[var(--burgundy)]" />
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-[var(--burgundy)] flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-[var(--cream)]" />
              </div>
              <span className="text-sm font-medium text-[var(--burgundy-dark)]">Pago</span>
            </div>
            <div className="h-0.5 w-16 bg-[var(--burgundy)]/20" />
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-full bg-[var(--burgundy)]/20 flex items-center justify-center">
                <Truck className="h-5 w-5 text-[var(--burgundy)]/40" />
              </div>
              <span className="text-sm text-[var(--burgundy)]/40">Confirmación</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Formulario de pago */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-[var(--burgundy)]/10">
              <h2 className="text-2xl font-serif text-[var(--burgundy-dark)] mb-6 flex items-center gap-2">
                <CreditCard className="h-6 w-6" />
                Información de pago
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Información de contacto */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-[var(--burgundy-dark)]">Contacto</h3>
                  <div className="grid gap-4">
                    <div>
                      <Label htmlFor="email" className="text-[var(--burgundy-dark)]">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="tu@email.com"
                        required
                        className="border-[var(--burgundy)]/20 focus:border-[var(--burgundy)] bg-[var(--cream)]/50"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-[var(--burgundy-dark)]">
                        Teléfono
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+52 123 456 7890"
                        required
                        className="border-[var(--burgundy)]/20 focus:border-[var(--burgundy)] bg-[var(--cream)]/50"
                      />
                    </div>
                  </div>
                </div>

                <Separator className="bg-[var(--burgundy)]/10" />

                {/* Dirección de envío */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-[var(--burgundy-dark)]">Dirección de envío</h3>
                  <div className="grid gap-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName" className="text-[var(--burgundy-dark)]">
                          Nombre
                        </Label>
                        <Input
                          id="firstName"
                          placeholder="Juan"
                          required
                          className="border-[var(--burgundy)]/20 focus:border-[var(--burgundy)] bg-[var(--cream)]/50"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="text-[var(--burgundy-dark)]">
                          Apellido
                        </Label>
                        <Input
                          id="lastName"
                          placeholder="Pérez"
                          required
                          className="border-[var(--burgundy)]/20 focus:border-[var(--burgundy)] bg-[var(--cream)]/50"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="address" className="text-[var(--burgundy-dark)]">
                        Dirección
                      </Label>
                      <Input
                        id="address"
                        placeholder="Calle Principal 123"
                        required
                        className="border-[var(--burgundy)]/20 focus:border-[var(--burgundy)] bg-[var(--cream)]/50"
                      />
                    </div>
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city" className="text-[var(--burgundy-dark)]">
                          Ciudad
                        </Label>
                        <Input
                          id="city"
                          placeholder="Ciudad"
                          required
                          className="border-[var(--burgundy)]/20 focus:border-[var(--burgundy)] bg-[var(--cream)]/50"
                        />
                      </div>
                      <div>
                        <Label htmlFor="state" className="text-[var(--burgundy-dark)]">
                          Estado
                        </Label>
                        <Input
                          id="state"
                          placeholder="Estado"
                          required
                          className="border-[var(--burgundy)]/20 focus:border-[var(--burgundy)] bg-[var(--cream)]/50"
                        />
                      </div>
                      <div>
                        <Label htmlFor="zip" className="text-[var(--burgundy-dark)]">
                          C.P.
                        </Label>
                        <Input
                          id="zip"
                          placeholder="12345"
                          required
                          className="border-[var(--burgundy)]/20 focus:border-[var(--burgundy)] bg-[var(--cream)]/50"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="bg-[var(--burgundy)]/10" />

                {/* Información de tarjeta */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-[var(--burgundy-dark)]">Información de tarjeta</h3>
                  <div className="grid gap-4">
                    <div>
                      <Label htmlFor="cardNumber" className="text-[var(--burgundy-dark)]">
                        Número de tarjeta
                      </Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        required
                        maxLength={19}
                        className="border-[var(--burgundy)]/20 focus:border-[var(--burgundy)] bg-[var(--cream)]/50"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cardName" className="text-[var(--burgundy-dark)]">
                        Nombre en la tarjeta
                      </Label>
                      <Input
                        id="cardName"
                        placeholder="JUAN PÉREZ"
                        required
                        className="border-[var(--burgundy)]/20 focus:border-[var(--burgundy)] bg-[var(--cream)]/50"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry" className="text-[var(--burgundy-dark)]">
                          Fecha de expiración
                        </Label>
                        <Input
                          id="expiry"
                          placeholder="MM/AA"
                          required
                          maxLength={5}
                          className="border-[var(--burgundy)]/20 focus:border-[var(--burgundy)] bg-[var(--cream)]/50"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv" className="text-[var(--burgundy-dark)]">
                          CVV
                        </Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          required
                          maxLength={4}
                          type="password"
                          className="border-[var(--burgundy)]/20 focus:border-[var(--burgundy)] bg-[var(--cream)]/50"
                        />
                      </div>
                    </div>
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
                      Pagar ${total.toFixed(2)}
                    </>
                  )}
                </Button>

                <p className="text-xs text-center text-[var(--burgundy)]/60">
                  Tu información está protegida con encriptación SSL de 256 bits
                </p>
              </form>
            </div>
          </div>

          {/* Resumen del pedido */}
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
                      {item.categoria && (
                        <p className="text-xs text-[var(--burgundy)]/50 uppercase tracking-wider mt-1">
                          {item.categoria}
                        </p>
                      )}
                      <p className="text-lg font-bold text-[var(--burgundy-dark)] mt-1">
                        ${(item.precio * item.cantidad).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="bg-[var(--burgundy)]/10 mb-4" />

              <div className="space-y-3">
                <div className="flex justify-between text-[var(--burgundy)]/80">
                  <span>Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[var(--burgundy)]/80">
                  <span className="flex items-center gap-2">
                    <Truck className="h-4 w-4" />
                    Envío
                  </span>
                  <span className="font-semibold">${shipping.toFixed(2)}</span>
                </div>
                <Separator className="bg-[var(--burgundy)]/10" />
                <div className="flex justify-between text-2xl font-serif text-[var(--burgundy-dark)]">
                  <span>Total</span>
                  <span className="font-bold">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-br from-[var(--burgundy)]/5 to-[var(--burgundy)]/10 rounded-lg border border-[var(--burgundy)]/20">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[var(--burgundy)] flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-[var(--burgundy)]/80">
                    <p className="font-semibold text-[var(--burgundy-dark)] mb-1">Envío seguro garantizado</p>
                    <p className="text-xs">Todos nuestros productos están asegurados durante el envío</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
