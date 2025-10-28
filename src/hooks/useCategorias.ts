import { useEffect, useState } from "react";
import { Categoria } from "../types/Categoria";

export const useCategorias = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/categories");
        if (!res.ok) throw new Error("Error al obtener categorías");

        const data = await res.json();

        setCategorias(data);
      } catch (err) {
        console.error("❌ Error al cargar categorías:", err);
        setError("No se pudieron cargar las categorías");
      } finally {
        setCargando(false);
      }
    };
    fetchCategorias();
  }, []);

  return { categorias, cargando, error };
};