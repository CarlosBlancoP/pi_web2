import ProductDetailClient from "@/components/ui/product-detail-client";

interface ProductPageProps {
  params: {
    id: string;
  };
}

// ✅ Este componente es del lado del servidor
export default function ProductPage({ params }: ProductPageProps) {
  const { id } = params;

  // Pasamos el ID al componente cliente
  return <ProductDetailClient key={id} />;
}
