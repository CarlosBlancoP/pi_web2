"use client"

import { ShoppingCartDrawer } from "@/components/ui/shopping-cart"
import { Button } from "@/components/ui/button"
import { BestSellersCarousel } from "@/components/ui/best-sellers-carousel"
import { HeroCarousel } from "@/components/ui/hero-carousel"
import { ProductCard } from "@/components/ui/card"
import Mapa from "@/components/ui/Mapa"

// 🔹 Productos nuevos
const productos = [
  {
    id: 1,
    nombre: "Cuadro artesanal",
    categoria: "arte",
    precio: 100,
    imagen: "/banner2.jpg",
    descripcion: "Un cuadro artesanal único con detalles pintados a mano.",
  },
  {
    id: 2,
    nombre: "Ambientador",
    categoria: "perfume",
    precio: 50,
    imagen: "/budaazul.jpg",
    descripcion: "Ambientador natural con fragancia relajante.",
  },
  {
    id: 3,
    nombre: "Escultura de Buda",
    categoria: "arte",
    precio: 200,
    imagen: "/3budas.jpg",
    descripcion: "Una escultura artesanal en barro que representa serenidad y equilibrio.",
  },
]

// 🔹 Productos más vendidos
const masVendidos = [
  {
    id: 101,
    nombre: "Aretes Árboles",
    precio: 80,
    imagen: "/aretesarboles.jpg",
    vendidos: 95,
    descripcion: "Aretes hechos a mano con diseño natural y elegante.",
  },
  {
    id: 102,
    nombre: "Caballos pintados",
    precio: 150,
    imagen: "/caballos.jpg",
    vendidos: 60,
    descripcion: "Obra pintada en óleo con estilo artesanal y colorido.",
  },
  {
    id: 103,
    nombre: "Escultura decorativa",
    precio: 220,
    imagen: "/escultura-buda.jpg",
    vendidos: 85,
    descripcion: "Figura artesanal que representa calma y equilibrio.",
  },
]

export default function Home() {
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
            {productos.map((producto) => (
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
  )
}
