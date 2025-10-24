import { ProductCard, Producto } from "@/components/ui/card";

const productosPerfumes: Producto[] = [
  { id: 1, nombre: "Perfume floral", precio: 120, imagen: "/banner2.jpg", descripcion: "Aroma suave y natural." },
  { id: 2, nombre: "Esencia oriental", precio: 300, imagen: "/budaazul.jpg", descripcion: "Fragancia intensa con notas especiadas." },
  { id: 3, nombre: "Aroma cítrico", precio: 150, imagen: "/banner2.jpg", descripcion: "Frescura y energía en cada nota." },
  { id: 4, nombre: "Perfume artesanal", precio: 200, imagen: "/banner2.jpg", descripcion: "Hecho a mano con aceites esenciales." },
];

export default function PerfumesPage() {
  return (
    <section className="p-8">
      <h1 className="text-3xl font-bold mb-10 text-center text-[#800020]">Perfumes</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 justify-center">
        {productosPerfumes.map((producto) => (
          <ProductCard key={producto.id} producto={producto} />
        ))}
      </div>
    </section>
  );
}
