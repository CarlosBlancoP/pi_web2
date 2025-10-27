"use client"

import { ShoppingCart, Plus, Minus, Trash2, X, ShoppingBag } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { useCart } from "@/contexts/cart-context"

export function ShoppingCartDrawer() {
  const router = useRouter()
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart: removeItem,
    clearCart,
    totalItems,
    subtotal,
    total,
  } = useCart()

  const shipping = subtotal > 0 ? 15 : 0

  const handleCheckout = () => {
    router.push("/checkout")
  }

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative bg-[var(--cream)] border-[var(--burgundy)]/20 hover:bg-[var(--burgundy)]/10 hover:border-[var(--burgundy)] text-[var(--burgundy-dark)] transition-all duration-300"
        >
          <ShoppingCart className="h-5 w-5" />
          <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-[var(--burgundy)] text-[var(--cream)] text-xs border-2 border-[var(--cream)]">
            {totalItems}
          </Badge>
          <span className="sr-only">Abrir carrito</span>
        </Button>
      </DrawerTrigger>

      <DrawerContent className="bg-[var(--cream)] border-l-2 border-[var(--burgundy)]/20">
        <DrawerHeader className="border-b border-[var(--burgundy)]/10 bg-gradient-to-b from-[var(--burgundy)]/5 to-transparent">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-[var(--burgundy)] flex items-center justify-center">
                <ShoppingBag className="h-5 w-5 text-[var(--cream)]" />
              </div>
              <div>
                <DrawerTitle className="text-2xl font-serif text-[var(--burgundy-dark)]">Tu Carrito</DrawerTitle>
                <DrawerDescription className="text-[var(--burgundy)]/60">
                  {totalItems} {totalItems === 1 ? "producto" : "productos"}
                </DrawerDescription>
              </div>
            </div>
            <DrawerClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-[var(--burgundy)] hover:bg-[var(--burgundy)]/10 hover:text-[var(--burgundy-dark)]"
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Cerrar</span>
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>

        {cartItems.length === 0 ? (
          <div className="flex-1 flex items-center justify-center p-8">
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <ShoppingCart className="h-8 w-8 text-[var(--burgundy)]/40" />
                </EmptyMedia>
                <EmptyTitle className="text-[var(--burgundy-dark)]">Tu carrito está vacío</EmptyTitle>
                <EmptyDescription className="text-[var(--burgundy)]/60">
                  Agrega productos para comenzar tu compra
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <DrawerClose asChild>
                  <Button className="bg-[var(--burgundy)] hover:bg-[var(--burgundy-dark)] text-[var(--cream)]">
                    Explorar Productos
                  </Button>
                </DrawerClose>
              </EmptyContent>
            </Empty>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 px-6 py-4">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="group relative flex gap-4 p-4 rounded-lg bg-white border border-[var(--burgundy)]/10 hover:border-[var(--burgundy)]/30 hover:shadow-md transition-all duration-300"
                  >
                    {/* Image */}
                    <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-[var(--burgundy)]/5">
                      <img
                        src={item.imagen || "/placeholder.svg"}
                        alt={item.nombre}
                        className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-serif text-lg text-[var(--burgundy-dark)] group-hover:text-[var(--burgundy)] transition-colors">
                              {item.nombre}
                            </h3>
                            {item.categoria && (
                              <p className="text-xs text-[var(--burgundy)]/50 uppercase tracking-wider mt-1">
                                {item.categoria}
                              </p>
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => removeItem(item.id)}
                            className="text-[var(--burgundy)]/40 hover:text-destructive hover:bg-destructive/10 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Eliminar</span>
                          </Button>
                        </div>
                        <p className="mt-2 text-xl font-bold text-[var(--burgundy-dark)]">${item.precio}</p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3 mt-3">
                        <div className="flex items-center gap-2 bg-[var(--burgundy)]/5 rounded-lg p-1">
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => decreaseQuantity(item.id)}
                            disabled={item.cantidad <= 1}
                            className="h-7 w-7 text-[var(--burgundy)] hover:bg-[var(--burgundy)] hover:text-[var(--cream)] disabled:opacity-30 transition-all"
                          >
                            <Minus className="h-3 w-3" />
                            <span className="sr-only">Disminuir cantidad</span>
                          </Button>
                          <span className="w-8 text-center font-semibold text-[var(--burgundy-dark)]">
                            {item.cantidad}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => increaseQuantity(item.id)}
                            className="h-7 w-7 text-[var(--burgundy)] hover:bg-[var(--burgundy)] hover:text-[var(--cream)] transition-all"
                          >
                            <Plus className="h-3 w-3" />
                            <span className="sr-only">Aumentar cantidad</span>
                          </Button>
                        </div>
                        <span className="text-sm text-[var(--burgundy)]/60">
                          Subtotal:{" "}
                          <span className="font-semibold text-[var(--burgundy-dark)]">
                            ${item.precio * item.cantidad}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <Separator className="bg-[var(--burgundy)]/10" />

            {/* Summary */}
            <div className="px-6 py-4 bg-gradient-to-t from-[var(--burgundy)]/5 to-transparent">
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-[var(--burgundy)]/80">
                  <span>Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[var(--burgundy)]/80">
                  <span>Envío</span>
                  <span className="font-semibold">${shipping.toFixed(2)}</span>
                </div>
                <Separator className="bg-[var(--burgundy)]/10" />
                <div className="flex justify-between text-xl font-serif text-[var(--burgundy-dark)]">
                  <span>Total</span>
                  <span className="font-bold">${total.toFixed(2)}</span>
                </div>
              </div>

              <DrawerFooter className="px-0 pt-0">
                <Button
                  size="lg"
                  onClick={handleCheckout}
                  className="w-full bg-[var(--burgundy)] hover:bg-[var(--burgundy-dark)] text-[var(--cream)] font-semibold text-lg h-12 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Finalizar Compra
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={clearCart}
                  className="w-full border-[var(--burgundy)]/30 text-[var(--burgundy)] hover:bg-destructive/10 hover:text-destructive hover:border-destructive transition-all duration-300 bg-transparent"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Vaciar Carrito
                </Button>
              </DrawerFooter>
            </div>
          </>
        )}
      </DrawerContent>
    </Drawer>
  )
}
