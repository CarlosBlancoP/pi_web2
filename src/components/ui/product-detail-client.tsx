"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Heart, Share2, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"

interface ProductDetails {
  origen: string
  tipoArtesania: string
  oficio: string
  materiaPrima: string
  etnia: string
  programa: string
}

interface Product {
  id: number
  nombre: string
  categoria: string
  precio: number
  imagen: string
  descripcion: string
  detalles: ProductDetails
  sku: string
  disponible: boolean
  descripcionDetallada: string
}

export function ProductDetailClient({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()
  const [isWishlisted, setIsWishlisted] = useState(false)

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        nombre: product.nombre,
        precio: product.precio,
        imagen: product.imagen,
        descripcion: product.descripcion,
        categoria: product.categoria,
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[var(--cream)] to-white">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-[var(--burgundy)] transition-colors">
              Inicio
            </Link>
            <span>/</span>
            <Link href="/" className="hover:text-[var(--burgundy)] transition-colors">
              Catálogo
            </Link>
            <span>/</span>
            <Link href="/" className="hover:text-[var(--burgundy)] transition-colors capitalize">
              {product.categoria}
            </Link>
            <span>/</span>
            <span className="text-[var(--burgundy)] font-medium">{product.nombre}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Navigation arrows */}
        <div className="flex justify-between items-center mb-6">
          <Button variant="ghost" size="icon" className="text-[var(--burgundy)]">
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon" className="text-[var(--burgundy)]">
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-lg">
              <img
                src={product.imagen || "/placeholder.svg"}
                alt={product.nombre}
                className="w-full h-full object-cover"
              />
              {/* Share buttons */}
              <div className="absolute top-4 left-4 flex gap-2">
                <Button variant="secondary" size="icon" className="bg-white/90 hover:bg-white rounded-full shadow-md">
                  <Share2 className="h-4 w-4 text-[var(--burgundy)]" />
                </Button>
              </div>
            </div>
          </div>

          {/* Product Info Section */}
          <div className="space-y-6">
            {/* Badge */}
            {product.disponible && (
              <div className="inline-block">
                <span className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
                  Disponible
                </span>
              </div>
            )}

            {/* Title */}
            <div>
              <h1 className="text-4xl md:text-5xl font-serif text-[var(--burgundy-dark)] mb-2">{product.nombre}</h1>
              <p className="text-sm text-gray-600">
                Referencia: <span className="font-medium">{product.sku}</span>
              </p>
            </div>

            {/* Price */}
            <div className="py-4 border-y border-gray-200">
              <p className="text-4xl font-bold text-[var(--burgundy-dark)]">${product.precio.toLocaleString()}</p>
            </div>

            {/* Description */}
            <p className="text-gray-700 leading-relaxed">{product.descripcion}</p>

            {/* Details Table */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-semibold text-[var(--burgundy)] mb-1">Origen</p>
                  <p className="text-gray-700">{product.detalles.origen}</p>
                </div>
                <div>
                  <p className="font-semibold text-[var(--burgundy)] mb-1">Tipo Artesanía</p>
                  <p className="text-gray-700">{product.detalles.tipoArtesania}</p>
                </div>
                <div>
                  <p className="font-semibold text-[var(--burgundy)] mb-1">Oficio</p>
                  <p className="text-gray-700">{product.detalles.oficio}</p>
                </div>
                <div>
                  <p className="font-semibold text-[var(--burgundy)] mb-1">Materia prima</p>
                  <p className="text-gray-700">{product.detalles.materiaPrima}</p>
                </div>
                <div>
                  <p className="font-semibold text-[var(--burgundy)] mb-1">Etnia/Comunidad</p>
                  <p className="text-gray-700">{product.detalles.etnia}</p>
                </div>
                <div>
                  <p className="font-semibold text-[var(--burgundy)] mb-1">Programa / Colección</p>
                  <p className="text-gray-700">{product.detalles.programa}</p>
                </div>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-gray-700">Cantidad:</label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-gray-100 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-6 py-2 border-x border-gray-300 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-gray-100 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 bg-[var(--burgundy)] hover:bg-[var(--burgundy-dark)] text-white py-6 text-lg font-medium rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Añadir al carrito
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`py-6 px-6 rounded-xl border-2 transition-all duration-300 ${
                    isWishlisted
                      ? "bg-[var(--burgundy)] border-[var(--burgundy)] text-white"
                      : "border-[var(--burgundy)] text-[var(--burgundy)] hover:bg-[var(--burgundy)]/10"
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
                </Button>
              </div>
            </div>

            {/* Additional Info */}
            <div className="text-sm text-gray-600 space-y-1">
              <p>
                <span className="font-medium">SKU:</span> {product.sku}
              </p>
              <p>
                <span className="font-medium">Categoría:</span>{" "}
                <Link href="/" className="text-[var(--burgundy)] hover:underline capitalize">
                  {product.categoria}
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="mt-16 max-w-4xl">
          <h2 className="text-3xl font-serif text-[var(--burgundy-dark)] mb-6">Descripción</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed">{product.descripcionDetallada}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
