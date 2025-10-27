import { notFound } from "next/navigation"
import { ProductDetailClient } from "@/components/ui/product-detail-client"

// Datos de productos (en producción vendrían de una base de datos)
const allProducts = [
  {
    id: 1,
    nombre: "Cuadro artesanal",
    categoria: "arte",
    precio: 100,
    imagen: "/banner2.jpg",
    descripcion: "Un cuadro artesanal único con detalles pintados a mano.",
    detalles: {
      origen: "Colombia, Bogotá",
      tipoArtesania: "Tradicional",
      oficio: "Pintura",
      materiaPrima: "Lienzo y óleo",
      etnia: "Artesanos locales",
      programa: "Arte Colombiano",
    },
    sku: "ART-001",
    disponible: true,
    descripcionDetallada:
      "Este cuadro artesanal es una pieza única creada por artesanos colombianos. Cada trazo está cuidadosamente pintado a mano, utilizando técnicas tradicionales que han sido transmitidas de generación en generación. El uso de colores vibrantes y la atención al detalle hacen de esta obra una adición perfecta para cualquier espacio que busque un toque de autenticidad y cultura.",
  },
  {
    id: 2,
    nombre: "Ambientador",
    categoria: "perfume",
    precio: 50,
    imagen: "/budaazul.jpg",
    descripcion: "Ambientador natural con fragancia relajante.",
    detalles: {
      origen: "Colombia, Medellín",
      tipoArtesania: "Tradicional",
      oficio: "Perfumería artesanal",
      materiaPrima: "Aceites esenciales naturales",
      etnia: "Artesanos locales",
      programa: "Aromas de Colombia",
    },
    sku: "PERF-002",
    disponible: true,
    descripcionDetallada:
      "Nuestro ambientador artesanal está elaborado con aceites esenciales 100% naturales, extraídos de plantas colombianas. Su fragancia relajante crea un ambiente de paz y tranquilidad en cualquier espacio. Cada ambientador es preparado a mano siguiendo recetas tradicionales que garantizan una experiencia aromática única y duradera.",
  },
  {
    id: 3,
    nombre: "Cuadro artesanal",
    categoria: "arte",
    precio: 100,
    imagen: "/banner2.jpg",
    descripcion: "Obra artística hecha con técnicas tradicionales.",
    detalles: {
      origen: "Colombia, Cali",
      tipoArtesania: "Tradicional",
      oficio: "Pintura",
      materiaPrima: "Lienzo y acrílico",
      etnia: "Artesanos del Valle",
      programa: "Arte Colombiano",
    },
    sku: "ART-003",
    disponible: true,
    descripcionDetallada:
      "Esta obra de arte representa la riqueza cultural de Colombia a través de técnicas tradicionales de pintura. Los artesanos del Valle del Cauca han plasmado su visión del mundo en cada pincelada, creando una pieza que no solo decora, sino que cuenta una historia de tradición y pasión por el arte.",
  },
  {
    id: 4,
    nombre: "Ambientador",
    categoria: "perfume",
    precio: 50,
    imagen: "/budaazul.jpg",
    descripcion: "Perfuma y decora tus espacios con este ambientador artesanal.",
    detalles: {
      origen: "Colombia, Cartagena",
      tipoArtesania: "Tradicional",
      oficio: "Perfumería artesanal",
      materiaPrima: "Aceites esenciales y flores",
      etnia: "Artesanos costeños",
      programa: "Aromas de Colombia",
    },
    sku: "PERF-004",
    disponible: true,
    descripcionDetallada:
      "Este ambientador combina la tradición perfumera de la costa colombiana con ingredientes naturales de la región. Las flores y aceites esenciales se mezclan en proporciones perfectas para crear una fragancia que evoca la brisa del mar Caribe y la calidez de nuestra tierra.",
  },
  {
    id: 5,
    nombre: "Cuadro artesanal",
    categoria: "arte",
    precio: 100,
    imagen: "/banner2.jpg",
    descripcion: "Decoración perfecta para el hogar con estilo único.",
    detalles: {
      origen: "Colombia, Bucaramanga",
      tipoArtesania: "Tradicional",
      oficio: "Pintura",
      materiaPrima: "Lienzo y técnica mixta",
      etnia: "Artesanos santandereanos",
      programa: "Arte Colombiano",
    },
    sku: "ART-005",
    disponible: true,
    descripcionDetallada:
      "Un cuadro que refleja la belleza de los paisajes santandereanos y la habilidad de nuestros artesanos locales. Utilizando técnicas mixtas, esta pieza combina texturas y colores que dan vida a una obra única, perfecta para darle personalidad a cualquier espacio de tu hogar.",
  },
  {
    id: 6,
    nombre: "Ambientador",
    categoria: "perfume",
    precio: 50,
    imagen: "/budaazul.jpg",
    descripcion: "Fragancia duradera hecha con aceites naturales.",
    detalles: {
      origen: "Colombia, Pereira",
      tipoArtesania: "Tradicional",
      oficio: "Perfumería artesanal",
      materiaPrima: "Aceites esenciales del eje cafetero",
      etnia: "Artesanos del café",
      programa: "Aromas de Colombia",
    },
    sku: "PERF-006",
    disponible: true,
    descripcionDetallada:
      "Inspirado en los aromas del eje cafetero colombiano, este ambientador artesanal captura la esencia de nuestras montañas y cafetales. Elaborado con aceites esenciales extraídos de plantas de la región, ofrece una fragancia duradera que transforma cualquier ambiente en un espacio acogedor y aromático.",
  },
  {
    id: 101,
    nombre: "Escultura de Buda",
    precio: 200,
    imagen: "/3budas.jpg",
    categoria: "arte",
    descripcion: "Una escultura artesanal en barro que representa serenidad y equilibrio espiritual.",
    detalles: {
      origen: "Colombia, Villa de Leyva",
      tipoArtesania: "Tradicional",
      oficio: "Escultura en barro",
      materiaPrima: "Barro y cerámica",
      etnia: "Artesanos de Villa de Leyva",
      programa: "Escultura Colombiana",
    },
    sku: "ESC-101",
    disponible: true,
    descripcionDetallada:
      "Esta escultura de Buda es una obra maestra de la cerámica colombiana. Modelada a mano por artesanos de Villa de Leyva, cada pieza es única y representa la búsqueda de la paz interior y el equilibrio espiritual. El barro utilizado proviene de canteras locales y es tratado con técnicas ancestrales que garantizan su durabilidad y belleza.",
  },
  {
    id: 102,
    nombre: "Aretes Árboles",
    precio: 80,
    imagen: "/aretesarboles.jpg",
    categoria: "artesanias",
    descripcion: "Aretes hechos a mano con diseño de árboles, un accesorio único y elegante.",
    detalles: {
      origen: "Colombia, Popayán",
      tipoArtesania: "Tradicional",
      oficio: "Joyería artesanal",
      materiaPrima: "Plata y piedras naturales",
      etnia: "Artesanos del Cauca",
      programa: "Joyería Colombiana",
    },
    sku: "JOY-102",
    disponible: true,
    descripcionDetallada:
      "Estos aretes artesanales están inspirados en la naturaleza y la conexión con nuestras raíces. Elaborados en plata por joyeros del Cauca, cada par es único y representa la belleza de los árboles colombianos. El diseño delicado y la atención al detalle hacen de estos aretes un accesorio perfecto para cualquier ocasión.",
  },
  {
    id: 103,
    nombre: "Caballos pintados",
    precio: 150,
    imagen: "/caballos.jpg",
    categoria: "arte",
    descripcion: "Obra pintada en óleo de caballos, llena de color y movimiento artístico.",
    detalles: {
      origen: "Colombia, Armenia",
      tipoArtesania: "Tradicional",
      oficio: "Pintura al óleo",
      materiaPrima: "Lienzo y óleo",
      etnia: "Artesanos del Quindío",
      programa: "Arte Colombiano",
    },
    sku: "ART-103",
    disponible: true,
    descripcionDetallada:
      "Esta pintura al óleo captura la fuerza y la elegancia de los caballos en movimiento. Los artistas del Quindío han plasmado su amor por estos nobles animales en cada pincelada, utilizando colores vibrantes que dan vida a la obra. Es una pieza perfecta para los amantes del arte ecuestre y la cultura colombiana.",
  },
]

export default function ProductPage({ params }: { params: { id: string } }) {
  const id = Number(params.id)

  // 🔎 Validar que sea un número válido
  if (isNaN(id)) {
    notFound()
  }

  const product = allProducts.find((p) => p.id === id)

  // ⚠️ Si no se encuentra el producto, mostrar 404
  if (!product) {
    notFound()
  }

  return <ProductDetailClient product={product} />
}

