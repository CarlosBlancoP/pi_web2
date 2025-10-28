"use client";

import Link from "next/link";
import { Categoria } from "src/types/Categoria";
import { useEffect, useRef } from "react";

interface DropdownCategoriasProps {
  categorias: Categoria[];
  cargando: boolean;
  error: string | null;
  onClose: () => void; // 👈 nuevo prop para cerrar desde el padre
}

export default function DropdownCategorias({
  categorias,
  cargando,
  error,
  onClose,
}: DropdownCategoriasProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cierra el dropdown si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={dropdownRef}
      className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg overflow-hidden z-50 border border-gray-200"
    >
      {cargando ? (
        <p className="px-4 py-2 text-gray-500 text-sm">
          Cargando categorías...
        </p>
      ) : error ? (
        <p className="px-4 py-2 text-red-500 text-sm">{error}</p>
      ) : categorias.length > 0 ? (
        categorias.map((cat) => (
          <Link
            key={cat.id}
            href={`/productos/${cat.id}`}
            onClick={onClose} // 👈 cierra al hacer clic en una categoría
            className="block px-4 py-2 text-gray-800 hover:bg-[#f4d4da] hover:text-[#8b2942] transition-all duration-200"
          >
            {cat.name}
          </Link>
        ))
      ) : (
        <p className="px-4 py-2 text-gray-500 text-sm">No hay categorías.</p>
      )}
    </div>
  );
}
