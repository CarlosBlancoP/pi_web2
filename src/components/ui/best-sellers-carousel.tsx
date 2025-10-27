"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useCart } from "@/contexts/cart-context"
import Link from "next/link"

interface Product {
  id: number
  nombre: string
  precio: number
  imagen: string
  vendidos?: number
  descripcion: string
}

interface BestSellersCarouselProps {
  products: Product[]
}

export function BestSellersCarousel({ products }: BestSellersCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const { addToCart } = useCart()

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length)
  }

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, currentIndex])

  const getVisibleProducts = () => {
    const visible = []
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % products.length
      visible.push(products[index])
    }
    return visible
  }

  return (
    <section className="relative w-full py-16 md:py-24 overflow-hidden bg-[var(--burgundy)]">
      {/* Background Pattern */}
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
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-block mb-4">
            <span className="text-[var(--gold)] text-sm font-medium tracking-[0.2em] uppercase">
              Lo Mejor de lo Mejor
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-serif text-[var(--cream)] mb-4 text-balance">Más Vendidos</h2>
          <p className="text-[var(--cream)]/80 text-lg md:text-xl max-w-2xl mx-auto text-pretty">
            Descubre los productos favoritos de nuestros clientes
          </p>
        </div>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {getVisibleProducts().map((product, idx) => (
              <Link key={`${product.id}-${idx}`} href={`/productos/${product.id}`}>
                <Card
                  className={`group relative overflow-hidden bg-[var(--cream)] border-none transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer ${
                    idx === 1 ? "md:scale-105 md:z-10" : "md:scale-95 md:opacity-90"
                  }`}
                >
                  {/* Badge */}
                  {product.vendidos && (
                    <div className="absolute top-4 left-4 z-10">
                      <span className="bg-[var(--burgundy-dark)] text-[var(--cream)] px-3 py-1 text-xs font-medium rounded-full">
                        {product.vendidos} vendidos
                      </span>
                    </div>
                  )}

                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden bg-[var(--burgundy)]/5">
                    <img
                      src={product.imagen || "/placeholder.svg"}
                      alt={product.nombre}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--burgundy)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Name */}
                    <h3 className="text-xl font-serif text-[var(--burgundy-dark)] mb-3 group-hover:text-[var(--burgundy)] transition-colors">
                      {product.nombre}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-[var(--burgundy)]/60 mb-4 line-clamp-2">{product.descripcion}</p>

                    {/* Price */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl font-bold text-[var(--burgundy-dark)]">${product.precio}</span>
                    </div>

                    {/* Button */}
                    <Button
                      onClick={(e) => {
                        e.preventDefault()
                        addToCart({
                          id: product.id,
                          nombre: product.nombre,
                          precio: product.precio,
                          imagen: product.imagen,
                          descripcion: product.descripcion,
                          categoria: "más vendidos",
                        })
                      }}
                      className="w-full bg-[var(--burgundy)] hover:bg-[var(--burgundy-dark)] text-[var(--cream)] transition-all duration-300"
                    >
                      Agregar al Carrito
                    </Button>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {/* Navigation Buttons */}
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

            {/* Dots Indicator */}
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
