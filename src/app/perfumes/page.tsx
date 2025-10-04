import { Card } from "../components/ui/card";
import Link from "next/link";

const arteProductos = [
  { id: 1, nombre: "Cuadro artesanal", precio: 120, imagen: "/banner2.jpg" },
  { id: 2, nombre: "Escultura", precio: 300, imagen: "/budaazul.jpg" },
  { id: 3, nombre: "Pintura", precio: 150, imagen: "/banner2.jpg" },
   { id: 4, nombre: "Cuadro artesanal", precio: 120, imagen: "/banner2.jpg" },
  { id: 5, nombre: "Escultura", precio: 300, imagen: "/budaazul.jpg" },
  { id: 6, nombre: "Pintura", precio: 150, imagen: "/banner2.jpg" },
   { id: 7, nombre: "Cuadro artesanal", precio: 120, imagen: "/banner2.jpg" },
  { id: 8, nombre: "Escultura", precio: 300, imagen: "/budaazul.jpg" },
  { id: 9, nombre: "Pintura", precio: 150, imagen: "/banner2.jpg" },
   { id: 10, nombre: "Cuadro artesanal", precio: 120, imagen: "/banner2.jpg" },
  { id:11, nombre: "Escultura", precio: 300, imagen: "/budaazul.jpg" },
  { id: 12, nombre: "Pintura", precio: 150, imagen: "/banner2.jpg" },
];

export default function PerfumesPage() {
  return (
    <section className="p-8">
      <h1 className="text-3xl font-bold mb-10 text-center">Perfumes</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 justify-center">
        {arteProductos.map((producto) => (
          <Card key={producto.id}>
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 text-center" >
              <h2 className="font-semibold">{producto.nombre}</h2>
              <p>${producto.precio}</p>
              <Link href={`/producto/${producto.id}`}>
                <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ">
                  Añadir al carrito
                </button>
               
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}