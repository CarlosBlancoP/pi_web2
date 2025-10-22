"use client"

import { useState, useEffect, useMemo } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface Product {
  id: number
  nombre: string
  precio: number
  imagen: string
  vendidos?: number
  descripcion: string
}

interface BestSellersCarouselProps {
  products?: Product[] // ✅ ahora es opcional por seguridad
}

export function BestSellersCarousel({ products = [] }: BestSellersCarouselProps) {
  // ✅ Evita errores si el array viene vacío o indefinido
  if (!products.length) {
    return (
      <section className="py-16 text-center text-[var(--cream)] bg-[var(--burgundy)]">
        <p>No hay productos disponibles en este momento.</p>
      </section>
    )
  }

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length)
  }

  // ✅ Autoplay controlado y estable
  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, currentIndex])

  // ✅ Memoizamos los productos visibles para evitar renders innecesarios
  const visibleProducts = useMemo(() => {
    const visible: Product[] = []
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % products.length
      visible.push(products[index])
    }
    return visible
  }, [currentIndex, products])

  return (
    <section className="relative w-full py-16 md:py-24 overflow-hidden bg-[var(--burgundy)]">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="container relative mx-auto px-4 md:px-6">
        {/* Encabezado */}
        <div className="mb-12 text-center">
          <span className="text-[var(--gold)] text-sm font-medium tracking-[0.2em] uppercase block mb-4">
            Lo Mejor de lo Mejor
          </span>
          <h2 className="text-4xl md:text-6xl font-serif text-[var(--cream)] mb-4">
            Más Vendidos
          </h2>
          <p className="text-[var(--cream)]/80 text-lg md:text-xl max-w-2xl mx-auto">
            Descubre los productos favoritos de nuestros clientes
          </p>
        </div>

        {/* Carrusel */}
        <div
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Productos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {visibleProducts.map((product, idx) => (
              <Card
                key={`${product.id}-${idx}`}
                className={`group relative overflow-hidden bg-[var(--cream)] border-none transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                  idx === 1 ? "md:scale-105 md:z-10" : "md:scale-95 md:opacity-90"
                }`}
              >
                {/* Etiqueta de ventas */}
                {product.vendidos && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-[var(--burgundy-dark)] text-[var(--cream)] px-3 py-1 text-xs font-medium rounded-full">
                      {product.vendidos} vendidos
                    </span>
                  </div>
                )}

                {/* Imagen */}
                <div className="relative aspect-square overflow-hidden bg-[var(--burgundy)]/5">
                  <img
                    src={product.imagen || "/placeholder.svg"}
                    alt={product.nombre}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--burgundy)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Contenido */}
                <div className="p-6">
                  <h3 className="text-xl font-serif text-[var(--burgundy-dark)] mb-3 group-hover:text-[var(--burgundy)] transition-colors">
                    {product.nombre}
                  </h3>
                  <p className="text-sm text-[var(--burgundy)]/60 mb-4 line-clamp-2">{product.descripcion}</p>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl font-bold text-[var(--burgundy-dark)]">
                      ${product.precio}
                    </span>
                  </div>
                  <Button className="w-full bg-[var(--burgundy)] hover:bg-[var(--burgundy-dark)] text-[var(--cream)] transition-all duration-300">
                    Agregar al Carrito
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Botones y Dots */}
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="h-12 w-12 rounded-full bg-[var(--cream)] border-[var(--cream)] hover:bg-[var(--cream)]/90 text-[var(--burgundy)] hover:text-[var(--burgundy-dark)] transition-all duration-300"
            >
              <ChevronLeft className="h-6 w-6" />
              <span className="sr-only">Anterior</span>
            </Button>

            {/* Indicadores */}
            <div className="flex items-center gap-2">
              {products.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? "w-8 bg-[var(--cream)]"
                      : "w-2 bg-[var(--cream)]/40 hover:bg-[var(--cream)]/60"
                  }`}
                  aria-label={`Ir al producto ${idx + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="h-12 w-12 rounded-full bg-[var(--cream)] border-[var(--cream)] hover:bg-[var(--cream)]/90 text-[var(--burgundy)] hover:text-[var(--burgundy-dark)] transition-all duration-300"
            >
              <ChevronRight className="h-6 w-6" />
              <span className="sr-only">Siguiente</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
