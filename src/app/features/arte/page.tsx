"use client";

import { ProductCard, Producto } from "@/components/ui/card";

const arteProductos: Producto[] = [
  { id: 1, nombre: "Cuadro artesanal", precio: 120, imagen: "/banner2.jpg" },
  { id: 2, nombre: "Escultura", precio: 300, imagen: "/budaazul.jpg" },
  { id: 3, nombre: "Pintura", precio: 150, imagen: "/banner2.jpg" },
  { id: 4, nombre: "Cuadro artesanal", precio: 120, imagen: "/banner2.jpg" },
  { id: 5, nombre: "Escultura", precio: 300, imagen: "/budaazul.jpg" },
  { id: 6, nombre: "Pintura", precio: 150, imagen: "/banner2.jpg" },
  { id: 7, nombre: "Cuadro artesanal", precio: 120, imagen: "/banner2.jpg" },
  { id: 8, nombre: "Escultura", precio: 300, imagen: "/budaazul.jpg" },
  { id: 9, nombre: "Pintura", precio: 150, imagen: "/banner2.jpg" },
  { id: 10, nombre: "Cuadro artesanal", precio: 120, imagen: "/banner2.jpg" },
  { id: 11, nombre: "Escultura", precio: 300, imagen: "/budaazul.jpg" },
  { id: 12, nombre: "Pintura", precio: 150, imagen: "/banner2.jpg" },
];

export default function ArtePage() {
  const handleAddToCart = (producto: Producto) => {
    console.log("Añadido al carrito:", producto);
    // Aquí puedes conectar tu lógica real de carrito
  };

  return (
    <section className="p-8">
      <h1 className="text-3xl font-bold mb-10 text-center text-[#800020]">
        Arte
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-center">
        {arteProductos.map((producto) => (
          <ProductCard
            key={producto.id}
            producto={producto}
            onAdd={handleAddToCart}
          />
        ))}
      </div>
    </section>
  );
}
