// components/Mapa.tsx
"use client"

export default function Mapa() {
  return (
    <div className="flex justify-center items-center py-10 px-4 mt-28">
       <div className="w-[80%] bg-white rounded-2xl shadow-xl overflow-hidden">
        
        {/* Encabezado */}
        <div className="p-6 text-center border-b border-gray-200 bg-gradient-to-r from-[#800020] to-[#A42A5C]">
          <h2 className="text-2xl md:text-3xl font-bold text-white drop-shadow-sm">
            Nuestra tienda fisica
          </h2>
          <p className="text-blue-100 mt-2 text-sm md:text-base">
            Cra. 49 #53 - 51, La Candelaria, Medellín, Antioquia
          </p>
        </div>

        {/* Mapa */}
        <div className="w-full h-[400px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.978452428808!2d-75.56884132579965!3d6.251289593730687!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e4428545b29562d%3A0x5d2d31d8f6b3a0c1!2sCra.%2049%20%2353-51%2C%20La%20Candelaria%2C%20Medell%C3%ADn%2C%20Antioquia!5e0!3m2!1ses!2sco!4v1697049097631!5m2!1ses!2sco"
            width="100%"
            height="100%"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Botón */}
        <div className="p-6 flex justify-center">
          <a
            href="https://www.google.com/maps/place/Cra.+49+%2353-51,+La+Candelaria,+Medell%C3%ADn,+Antioquia/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 hover:scale-105 transition-transform duration-300"
          >
            Ver en Google Maps
          </a>
        </div>
      </div>
    </div>
  )
}

