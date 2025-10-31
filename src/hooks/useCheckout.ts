// src/hooks/useCheckout.ts
import { useState } from "react"
import { createPurchase } from "../services/purchaseService"
import { toast } from "sonner"
import { PurchaseDto } from "../types/PurchaseDto"
import { PurchaseItemDto } from "../types/PurchaseItemDto"

export const useCheckout = () => {
  const [isProcessing, setIsProcessing] = useState(false)

  /**
   * Procesa el checkout completo de una compra
   * @param userId - ID del usuario que realiza la compra
   * @param cartItems - Lista de productos del carrito (id, cantidad, precio)
   * @param city - Ciudad seleccionada en el formulario de compra
   */
  const processCheckout = async (
    userId: number,
    cartItems: { id: number; cantidad: number; precio: number }[],
    city: string
  ) => {
    try {
      if (!cartItems || cartItems.length === 0) {
        toast.error("Tu carrito está vacío o no se pudo procesar.")
        return
      }

      if (!city || city.trim() === "") {
        toast.error("Por favor selecciona una ciudad para continuar.")
        return
      }

      setIsProcessing(true)

      // Mapea los productos del carrito a PurchaseItemDto
      const items: PurchaseItemDto[] = cartItems.map((item) => ({
        productId: item.id,
        quantity: item.cantidad,
        price: item.precio,
      }))

      // Calcula el total de la compra
      const totalAmount = items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      )

      // Construye el DTO de compra
      const purchaseDto: PurchaseDto = {
        userId,
        totalAmount,
        city,
        items,
      }

      // Crea la compra en backend
      await createPurchase(purchaseDto)

      toast.success("¡Compra realizada con éxito!", {
        description: "Tu pedido está en camino 🚚✨",
      })
    } catch (error: any) {
      console.error("Error en el checkout:", error)
      toast.error("Ocurrió un error durante la compra", {
        description: error?.message || "Intenta nuevamente más tarde.",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  return { isProcessing, processCheckout }
}
