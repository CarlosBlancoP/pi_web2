"use client";

import { ShoppingCartDrawer } from "@/components/ui/shopping-cart";
import { BestSellersCarousel } from "@/components/ui/best-sellers-carousel";
import { HeroCarousel } from "@/components/ui/hero-carousel";
import { ProductCard } from "@/components/ui/card";
import Mapa from "@/components/ui/Mapa";
import { useProductos } from "@/hooks/useProductos";
import { Producto } from "@/types/Producto";

export default function Home() {
  const { productos, loading } = useProductos();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg text-gray-600">
        Cargando productos...
      </div>
    );
  }

  // 🔹 Adaptar productos del backend al formato del frontend
  const adaptados = productos.map((p: Producto) => ({
    id: p.id,
    nombre: p.name,
    categoria: p.categoryId?.toString() || "General",
    precio: p.price,
    imagen: p.imageUrl,
    descripcion: p.description,
  }));

  // 🔹 Últimos 3 productos agregados
  const nuevosProductos = [...adaptados].sort((a, b) => b.id - a.id).slice(0, 3);

  // 🔹 Más vendidos (por ahora aleatorios, 6 productos)
  const masVendidos = [...adaptados]
    .sort(() => Math.random() - 0.5) // mezcla los productos
    .slice(0, 6);

  return (
    <>
      {/* 🌀 Carrusel principal */}
      <HeroCarousel />

      {/* 🆕 Sección Nuevos productos */}
      <section className="py-16 bg-[var(--cream)]">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-[var(--burgundy)]">
            Nuevos productos
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {nuevosProductos.map((producto) => (
              <ProductCard key={producto.id} producto={producto} />
            ))}
          </div>
        </div>
      </section>

      {/* ⭐ Más vendidos */}
      <BestSellersCarousel products={masVendidos} />

      {/* 🗺️ Mapa / contacto */}
      <Mapa />
    </>
  );
}
