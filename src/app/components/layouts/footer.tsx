import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa"
import { Mail, Phone, MapPin } from "lucide-react"
import Link from "next/link"
// Replaced custom Input import with native input element to avoid missing module
import { Button } from "@/components/ui/button"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-900 to-[#4a1a1a] text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h2 className="font-bold text-2xl bg-gradient-to-r from-[#8b2942] to-[#c44569] bg-clip-text text-transparent">
              El Arte de Vivir
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              Descubre la elegancia y tradición en cada pieza artesanal. Calidad excepcional que perdura en el tiempo.
            </p>
            <div className="flex space-x-4 pt-2">
              <Link
                href="https://facebook.com"
                target="_blank"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-[#8b2942] flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <FaFacebook size={20} />
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-[#8b2942] flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <FaInstagram size={20} />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-[#8b2942] flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <FaTwitter size={20} />
              </Link>
              <Link
                href="https://wa.me/1234567890"
                target="_blank"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-[#8b2942] flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <FaWhatsapp size={20} />
              </Link>
            </div>
          </div>

          {/* Products Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-[#c44569]">Productos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/productos/nuevos" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Nuevos Productos
                </Link>
              </li>
              <li>
                <Link
                  href="/productos/mas-vendidos"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Más Vendidos
                </Link>
              </li>
              <li>
                <Link href="/productos/ofertas" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Ofertas Especiales
                </Link>
              </li>
              <li>
                <Link
                  href="/productos/colecciones"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Colecciones
                </Link>
              </li>
              <li>
                <Link
                  href="/productos/personalizados"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Personalizados
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-[#c44569]">Empresa</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/nosotros" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link href="/artesanos" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Nuestros Artesanos
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/trabaja-con-nosotros" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Trabaja con Nosotros
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-[#c44569]">Newsletter</h3>
            <p className="text-sm text-gray-400">Suscríbete para recibir ofertas exclusivas y novedades.</p>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="tu@email.com"
                className="w-full py-2 px-3 bg-gray-800 border border-gray-700 text-white placeholder:text-gray-500 focus:border-[#8b2942] rounded"
              />
              <Button className="bg-[#8b2942] hover:bg-[#6d1f34] text-white">Suscribirse</Button>
            </div>
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Phone size={16} className="text-[#c44569]" />
                <span>+58 312 4512 7855</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Mail size={16} className="text-[#c44569]" />
                <span>info@elartedelivir.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <MapPin size={16} className="text-[#c44569]" />
                <span>Medellin, Colombia</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400 text-center md:text-left">
            © 2025 El Arte de Vivir. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <Link href="/privacidad" className="hover:text-white transition-colors">
              Privacidad
            </Link>
            <Link href="/terminos" className="hover:text-white transition-colors">
              Términos
            </Link>
            <Link href="/cookies" className="hover:text-white transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

