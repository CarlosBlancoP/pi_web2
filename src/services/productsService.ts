import { Producto } from "../types/Producto";

const API_URL = "http://localhost:8080/api/products";

export async function fetchProductos(): Promise<Producto[]> {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Error al cargar los productos");
  }
  return response.json();
}
