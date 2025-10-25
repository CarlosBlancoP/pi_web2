import Link from "next/link";
import { Categoria } from "../../types/Categoria";

interface DropdownCategoriasProps {
  categorias: Categoria[];
  cargando: boolean;
  error: string | null;
}

export default function DropdownCategorias({
  categorias,
  cargando,
  error,
}: DropdownCategoriasProps) {
  return (
    <div className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg overflow-hidden z-50 animate-in fade-in-0 zoom-in-95 border border-gray-200">
      {cargando ? (
        <p className="px-4 py-2 text-gray-500 text-sm">Cargando categorías...</p>
      ) : error ? (
        <p className="px-4 py-2 text-red-500 text-sm">{error}</p>
      ) : categorias.length > 0 ? (
        categorias.map((cat) => (
          <Link
            key={cat.id}
            href={`/productos/${cat.id}`}
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
