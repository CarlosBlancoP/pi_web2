import { ProductCard, Producto } from "@/components/ui/card";

const productosArtesanias: Producto[] = [
  { id: 1, nombre: "Cuadro artesanal", precio: 120, imagen: "/banner2.jpg", descripcion: "Pintura hecha a mano con materiales naturales." },
  { id: 2, nombre: "Escultura", precio: 300, imagen: "/budaazul.jpg", descripcion: "Figura tallada a mano con acabado detallado." },
  { id: 3, nombre: "Pintura decorativa", precio: 150, imagen: "/banner2.jpg", descripcion: "Ideal para decorar interiores con estilo." },
  { id: 4, nombre: "Jarrón artesanal", precio: 180, imagen: "/banner2.jpg", descripcion: "Diseño único y materiales reciclados." },
];

export default function ArtesaniasPage() {
  return (
    <section className="p-8">
      <h1 className="text-3xl font-bold mb-10 text-center text-[#800020]">Artesanías</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 justify-center">
        {productosArtesanias.map((producto) => (
          <ProductCard key={producto.id} producto={producto} />
        ))}
      </div>
    </section>
  );
}
