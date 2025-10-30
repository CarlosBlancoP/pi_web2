"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  ShoppingCart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/cart-context";
import { useProductos } from "@/hooks/useProductos";
import { useProductDetails } from "@/hooks/useProductDetails";
import { Producto } from "@/types/Producto";
import { ProductDetail } from "@/types/ProductDetail";

export default function ProductDetailClient() {
  const params = useParams();
  const productId = Number(params?.id);
  const { productos, loading: loadingProductos } = useProductos();
  const { details, loading: loadingDetalles } = useProductDetails(productId);
  const [product, setProduct] = useState<Producto | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    if (productos.length > 0) {
      const found = productos.find((p) => p.id === productId);
      setProduct(found || null);
    }
  }, [productos, productId]);

  if (loadingProductos || loadingDetalles) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-600">Cargando producto...</p>
      </div>
    );
  }

  if (!product || !details) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-600">Producto no encontrado.</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        nombre: product.name,
        precio: product.price,
        imagen: product.imageUrl,
        descripcion: product.description,
        categoria: product.categoryId.toString(),
      });
    }
  };

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
            <span className="text-[var(--burgundy)] font-medium">
              {product.name}
            </span>
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
                src={product.imageUrl || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <Button
                  variant="secondary"
                  size="icon"
                  className="bg-white/90 hover:bg-white rounded-full shadow-md"
                >
                  <Share2 className="h-4 w-4 text-[var(--burgundy)]" />
                </Button>
              </div>
            </div>
          </div>

          {/* Product Info Section */}
          <div className="space-y-6">
            {/* Title */}
            <div>
              <h1 className="text-4xl md:text-5xl font-serif text-[var(--burgundy-dark)] mb-2">
                {product.name}
              </h1>
              <p className="text-sm text-gray-600">
                Referencia: <span className="font-medium">{details.sku}</span>
              </p>
            </div>

            {/* Price */}
            <div className="py-4 border-y border-gray-200">
              <p className="text-4xl font-bold text-[var(--burgundy-dark)]">
                ${product.price.toLocaleString()}
              </p>
            </div>

            {/* Description */}
            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>

            {/* Details Table */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <DetailItem label="Origen" value={details.origen} />
                <DetailItem label="Tipo Artesanía" value={details.tipoArtesania} />
                <DetailItem label="Oficio" value={details.oficio} />
                <DetailItem label="Materia prima" value={details.materiaPrima} />
                <DetailItem label="Etnia/Comunidad" value={details.etnia} />
                <DetailItem label="Programa / Colección" value={details.programa} />
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
                  <span className="px-6 py-2 border-x border-gray-300 font-medium">
                    {quantity}
                  </span>
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

            {/* SKU & Category */}
            <div className="text-sm text-gray-600 space-y-1">
              <p>
                <span className="font-medium">SKU:</span> {details.sku}
              </p>
              <p>
                <span className="font-medium">Categoría:</span>{" "}
                <Link
                  href="/"
                  className="text-[var(--burgundy)] hover:underline capitalize"
                >
                  {product.categoryId}
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="mt-16 max-w-4xl">
          <h2 className="text-3xl font-serif text-[var(--burgundy-dark)] mb-6">
            Descripción
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed">
              {details.descripcionDetallada}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailItem({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <p className="font-semibold text-[var(--burgundy)] mb-1">{label}</p>
      <p className="text-gray-700">{value || "—"}</p>
    </div>
  );
}
