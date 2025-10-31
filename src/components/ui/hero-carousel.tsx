"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface HeroSlide {
  id: number
  title: string
  subtitle: string
  category: string
  imageUrl: string
}

interface Categoria {
  id: number
  name: string
  description?: string
  imageUrl?: string
}

/**
 * Ajusta aquí según tu estructura de rutas:
 * - si tu carpeta dinámica está en app/categoria/[id]/page.tsx -> usa "categoria"
 * - si está en app/categorias/[id]/page.tsx -> usa "categorias"
 */
const ROUTE_BASE = "categoria" // <- cambia a "categorias" si corresponde

export function HeroCarousel() {
  const [slides, setSlides] = useState<HeroSlide[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/categories")
        if (!res.ok) throw new Error("Error al obtener categorías")
        const data: Categoria[] = await res.json()

        const mappedSlides = data.map((cat) => ({
          id: cat.id,
          title: cat.name,
          subtitle: cat.description || "Explora productos únicos de esta categoría",
          category: cat.name,
          imageUrl: cat.imageUrl || "/header1.jpg",
        }))

        setSlides(mappedSlides)
      } catch (err: any) {
        console.error("Error cargando categorías:", err)
        setError(err.message)
      }
    }

    fetchCategories()
  }, [])

  useEffect(() => {
    if (!isAutoPlaying || slides.length === 0) return
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, slides])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
  }

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setIsAutoPlaying(false)
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setIsAutoPlaying(false)
  }

  if (error) {
    return (
      <div className="w-full h-[50vh] flex items-center justify-center text-red-500">
        Error: {error}
      </div>
    )
  }

  if (slides.length === 0) {
    return (
      <div className="w-full h-[50vh] flex items-center justify-center text-gray-500">
        Cargando categorías...
      </div>
    )
  }

  return (
    <div
      className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden group"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Slides */}
      {slides.map((slide, index) => {
        const href = `/${ROUTE_BASE}/${slide.id}` // ruta dinámica construida aquí
        return (
          <Link
            key={slide.id}
            href={href}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <div className="relative w-full h-full">
              <img
                src={slide.imageUrl}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />

              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-4 md:px-8 lg:px-16">
                  <div className="max-w-2xl text-white">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-balance">
                      {slide.title}
                    </h2>
                    <p className="text-lg md:text-xl lg:text-2xl mb-8 text-balance opacity-90">
                      {slide.subtitle}
                    </p>
                    <Button
                      size="lg"
                      className="bg-[#8b2942] hover:bg-[#c44569] text-white px-8 py-6 text-lg rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
                    >
                      Explorar {slide.category}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )
      })}

      {/* Flechas de navegación */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 md:p-4 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
        aria-label="Anterior"
      >
        <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 md:p-4 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
        aria-label="Siguiente"
      >
        <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
      </button>

      {/* Indicadores */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? "w-12 h-3 bg-[#8b2942]"
                : "w-3 h-3 bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Ir a slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
