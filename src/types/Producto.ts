export interface Producto {
  id: number;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  imageUrl: string;
  categoryId: number;
}