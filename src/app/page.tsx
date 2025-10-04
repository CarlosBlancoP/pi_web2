// app/page.tsx
"use client"
import { useState } from "react"
import Link from "next/link"
import { CarouselDemo } from "./components/layouts/carousel"
import { ProductCard } from "@/components/ui/card";

// 🔹 Productos nuevos
const productos = [
  { id: 1, nombre: "Cuadro artesanal", categoria: "arte", precio: 100, imagen: "/banner2.jpg", descripcion: "Un cuadro artesanal único con detalles pintados a mano." },
  { id: 2, nombre: "Ambientador", categoria: "perfume", precio: 50, imagen: "/budaazul.jpg", descripcion: "Ambientador natural con fragancia relajante." },
  { id: 3, nombre: "Cuadro artesanal", categoria: "arte", precio: 100, imagen: "/banner2.jpg", descripcion: "Obra artística hecha con técnicas tradicionales." },
  { id: 4, nombre: "Ambientador", categoria: "perfume", precio: 50, imagen: "/budaazul.jpg", descripcion: "Perfuma y decora tus espacios con este ambientador artesanal." },
  { id: 5, nombre: "Cuadro artesanal", categoria: "arte", precio: 100, imagen: "/banner2.jpg", descripcion: "Decoración perfecta para el hogar con estilo único." },
  { id: 6, nombre: "Ambientador", categoria: "perfume", precio: 50, imagen: "/budaazul.jpg", descripcion: "Fragancia duradera hecha con aceites naturales." },
]

// 🔹 Productos más vendidos (ficticios)
const masVendidos = [
  { 
    id: 101, 
    nombre: "Escultura de Buda", 
    precio: 200, 
    imagen: "/3budas.jpg", 
    vendidos: 120, 
    descripcion: "Una escultura artesanal en barro que representa serenidad y equilibrio espiritual." 
  },
  { 
    id: 102, 
    nombre: "Aretes Árboles", 
    precio: 80, 
    imagen: "/aretesarboles.jpg", 
    vendidos: 95, 
    descripcion: "Aretes hechos a mano con diseño de árboles, un accesorio único y elegante." 
  },
  { 
    id: 103, 
    nombre: "Caballos pintados", 
    precio: 150, 
    imagen: "/caballos.jpg", 
    vendidos: 60, 
    descripcion: "Obra pintada en óleo de caballos, llena de color y movimiento artístico." 
  },
]

export default function Home() {
  return (
    <>
      {/* Carrusel */}
      <CarouselDemo />

      {/* Sección Nuevos productos */}
      <section className="p-8">
        <h1 className="text-3xl font-bold mb-10 text-center">Nuevos productos</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 justify-center">
          {productos.map((producto) => (
            <ProductCard key={producto.id} producto={producto} />
          ))}
        </div>
      </section>

      {/* Sección Lo más vendido */}
      <section className="p-8 bg-gray-50">
        <h1 className="text-3xl font-bold mb-10 text-center">Lo más vendido</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 justify-center">
          {masVendidos.map((producto) => (
            <ProductCard key={producto.id} producto={producto} />
          ))}
        </div>
      </section>
    </>
  )
}
