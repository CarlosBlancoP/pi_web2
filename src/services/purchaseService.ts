// src/services/purchaseService.ts
import axios from "axios"
import { PurchaseDto } from "../types/PurchaseDto"

const API_URL = "http://localhost:8080/api/purchases"

export const createPurchase = async (purchaseDto: PurchaseDto) => {
  const username = "admin"
  const password = "admin123"

  // Asegura que no haya undefined y limpia los datos
  const payload = {
    userId: purchaseDto.userId,
    totalAmount: purchaseDto.totalAmount,
    city: purchaseDto.city ?? "",
    items: purchaseDto.items?.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
    })) ?? [],
  }

  const response = await axios.post(API_URL, payload, {
    headers: {
      "Content-Type": "application/json",
    },
    auth: {
      username,
      password,
    },
  })

  return response.data
}
