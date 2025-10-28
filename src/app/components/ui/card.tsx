"use client"

import * as React from "react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { useCart } from "@/contexts/cart-context"
import Link from "next/link"

export type Producto = {
  id: number
  nombre: string
  precio: number
  imagen: string
  descripcion?: string
  categoria?: string
}

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "w-full max-w-xs bg-white rounded-xl border border-gray-200 shadow-sm transition transform hover:shadow-lg hover:scale-[1.02] overflow-hidden mx-auto",
        className
      )}
      {...props}
    />
  )
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col items-center p-4 space-y-2", className)} {...props} />
  )
)
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref as any} className={cn("font-bold text-lg text-[#800020] text-center", className)} {...props} />
  )
)
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref as any} className={cn("text-sm text-gray-600 mt-2 text-center", className)} {...props} />
  )
)
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("px-4 pb-4 text-center", className)} {...props} />
  )
)
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col items-center gap-2 px-4 pb-4", className)} {...props} />
  )
)
CardFooter.displayName = "CardFooter"

function ProductCard({ producto }: { producto: Producto }) {
  const [expanded, setExpanded] = useState(false)
  const { addToCart } = useCart()

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    addToCart({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
      descripcion: producto.descripcion,
      categoria: producto.categoria || "general",
    })
  }

  return (
    <Link href={`/productos/${producto.id}`} className="block">
      <Card className="cursor-pointer">
        {/* Imagen del producto */}
        <div className="relative w-full h-48">
          <img
            src={producto.imagen || "/placeholder.svg"}
            alt={producto.nombre}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        <CardHeader>
          <CardTitle>{producto.nombre}</CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-[#800020] font-semibold">${producto.precio}</span>
          </div>
        </CardHeader>

        <CardFooter>
          <button
            onClick={handleAdd}
            className="w-full bg-gradient-to-r from-[#800020] to-[#A42A5C] text-white py-2 rounded-lg hover:from-[#6B001A] hover:to-[#8C2A4C] transition"
          >
            Añadir al carrito
          </button>

          <button
            onClick={(e) => {
              e.preventDefault()
              setExpanded((v) => !v)
            }}
            aria-expanded={expanded}
            className="mt-2 flex items-center gap-2 text-sm text-gray-600 hover:text-[#800020]"
          >
            <span>{expanded ? "Ocultar" : "Ver más"}</span>
            <svg
              className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`}
              viewBox="0 0 20 20"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {expanded && (
            <CardDescription className="mt-3 px-2">
              {producto.descripcion ?? "Producto artesanal, único y hecho a mano."}
            </CardDescription>
          )}
        </CardFooter>
      </Card>
    </Link>
  )
}

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, ProductCard }
