import { useEffect, useState } from "react";
import { fetchProductos} from "src/services/productsService";
import { Producto } from "../types/Producto";


export function useProductos() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProductos = async () => {
      try {
        const data = await fetchProductos();
        setProductos(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadProductos();
  }, []);

  return { productos, loading, error };
}
