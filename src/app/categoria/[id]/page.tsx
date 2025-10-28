"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ProductCard } from "@/components/ui/card";

interface Producto {
  id: number;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  imageUrl: string;
  categoryId: number;
}

interface Categoria {
  id: number;
  name: string;
  description?: string;
}

export default function CategoriaPage() {
  const { id } = useParams();
  const [productos, setProductos] = useState<Producto[]>([]);
  const [categoria, setCategoria] = useState<Categoria | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        // 🔹 1. Obtener categorías para mostrar el nombre y descripción
        const catRes = await fetch("http://localhost:8080/api/categories");
        if (!catRes.ok) throw new Error("Error al obtener categorías");
        const categorias: Categoria[] = await catRes.json();

        const categoriaEncontrada = categorias.find(
          (c) => c.id === Number(id)
        );
        setCategoria(categoriaEncontrada || null);

        // 🔹 2. Obtener productos filtrados por categoría
        const prodRes = await fetch("http://localhost:8080/api/products");
        if (!prodRes.ok) throw new Error("Error al obtener productos");
        const productosData: Producto[] = await prodRes.json();

        const filtrados = productosData.filter(
          (producto) => producto.categoryId === Number(id)
        );
        setProductos(filtrados);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    fetchData();
  }, [id]);

  if (cargando) return <p className="p-6 text-center">Cargando productos...</p>;
  if (error)
    return <p className="p-6 text-center text-red-500">Error: {error}</p>;

  return (
    <section className="p-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-[#800020]">
          {categoria ? categoria.name : `Categoría ${id}`}
        </h1>

        {categoria?.description && (
          <p className="text-gray-600 text-sm mt-3 max-w-2xl mx-auto">
            {categoria.description}
          </p>
        )}
      </div>

      {productos.length === 0 ? (
        <p className="text-center text-gray-600">
          No hay productos disponibles en esta categoría.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 justify-center">
          {productos.map((producto) => (
            <ProductCard
              key={producto.id}
              producto={{
                id: producto.id,
                nombre: producto.name,
                precio: producto.price,
                imagen: producto.imageUrl,
                descripcion: producto.description,
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
}
