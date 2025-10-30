import { useState, useEffect } from "react";
import { ProductDetail } from "@/types/ProductDetail";
import { productDetailsService } from "@/services/productDetailsService";

export const useProductDetails = (productId?: number) => {
  const [details, setDetails] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!productId) return;

    const fetchDetails = async () => {
      try {
        setLoading(true);
        const data = await productDetailsService.getById(productId);
        setDetails(data);
      } catch (err: any) {
        setError("Error al cargar los detalles del producto");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [productId]);

  return { details, loading, error };
};
