import { PurchaseItemDto } from "./PurchaseItemDto"

export interface PurchaseDto {
  userId: number
  totalAmount: number
  city: string
  items: PurchaseItemDto[]
}
