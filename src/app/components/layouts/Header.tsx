"use client";

import Link from "next/link";
import { Search, Menu, X, User, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import DropdownCategorias from "../ui/CategoryDropdown";
import { useCategorias } from "../../hooks/useCategorias";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // ✅ Hook de categorías
  const { categorias, cargando, error } = useCategorias();

  // 🔒 Cierra el dropdown si haces click fuera de él
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-[#8b2942] via-[rgb(223,125,148)] to-[#a71c3a] shadow-lg">
      <div className="max-w-7xl mx-auto">
        {/* 🔹 Top Bar */}
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo + Marca */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <img
                src="/logoredondo.jpg"
                alt="Logo El Arte de Vivir"
                className="h-14 w-14 object-contain transition-transform group-hover:scale-110 duration-300"
              />
              <div className="absolute inset-0 bg-white/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-2xl text-white tracking-tight">
                El Arte de Vivir
              </span>
              <span className="text-xs text-white/80 font-light">
                Artesanías Exclusivas
              </span>
            </div>
          </Link>

          {/* 🔹 Navegación Desktop */}
          <nav className="hidden md:flex items-center space-x-1 relative">
            <Link href="/">
              <Button
                variant="ghost"
                className="text-white hover:bg-white/20 hover:text-white transition-all duration-300 font-medium"
              >
                Inicio
              </Button>
            </Link>

            {/* 🔹 Dropdown Productos (Click + Hover funcional) */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <Button
                variant="ghost"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className="text-white hover:bg-white/20 hover:text-white transition-all duration-300 font-medium flex items-center"
              >
                Productos
                <ChevronDown
                  className={`ml-1 h-4 w-4 transition-transform duration-300 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </Button>

              {isDropdownOpen && (
                <div
                  className="absolute left-0"
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  <DropdownCategorias
                    categorias={categorias}
                    cargando={cargando}
                    error={error}
                  />
                </div>
              )}
            </div>

            <Link href="/visitanos">
              <Button
                variant="ghost"
                className="text-white hover:bg-white/20 hover:text-white transition-all duration-300 font-medium"
              >
                Visítanos
              </Button>
            </Link>
          </nav>

          {/* 🔹 Botones derecha */}
          <div className="flex items-center space-x-2">
            {/* Búsqueda */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-white hover:bg-white/20 transition-all duration-300 hidden md:flex"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Iniciar sesión */}
            <Link href="/login" className="hidden md:block">
              <Button className="bg-white text-[#8b2942] hover:bg-white/90 font-semibold transition-all duration-300 shadow-md hover:shadow-lg">
                <User className="h-4 w-4 mr-2" />
                Iniciar sesión
              </Button>
            </Link>

            {/* Menú móvil */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:bg-white/20 md:hidden"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* 🔹 Barra de búsqueda */}
        {isSearchOpen && (
          <div className="px-6 pb-4 animate-in slide-in-from-top duration-300">
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Buscar productos..."
                className="w-full px-4 py-3 pl-12 rounded-lg bg-white/95 backdrop-blur-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 shadow-lg"
                autoFocus
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>
        )}

        {/* 🔹 Menú móvil */}
        {isMenuOpen && (
          <div className="md:hidden px-6 pb-4 space-y-2 animate-in slide-in-from-top duration-300">
            <Link href="/" onClick={() => setIsMenuOpen(false)}>
              <Button
                variant="ghost"
                className="w-full justify-start text-white hover:bg-white/20 font-medium"
              >
                Inicio
              </Button>
            </Link>

            {/* Productos (versión móvil) */}
            <div className="w-full">
              <Button
                variant="ghost"
                className="w-full justify-between text-white hover:bg-white/20 font-medium"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                Productos
                <ChevronDown
                  className={`ml-2 h-4 w-4 transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </Button>

              {isDropdownOpen && (
                <div className="pl-4">
                  {cargando ? (
                    <p className="text-white/80 text-sm">Cargando...</p>
                  ) : (
                    categorias.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/productos/${cat.id}`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-white/90 hover:bg-white/20 text-sm"
                        >
                          {cat.name}
                        </Button>
                      </Link>
                    ))
                  )}
                </div>
              )}
            </div>

            <Link href="/visitanos" onClick={() => setIsMenuOpen(false)}>
              <Button
                variant="ghost"
                className="w-full justify-start text-white hover:bg-white/20 font-medium"
              >
                Visítanos
              </Button>
            </Link>

            {/* Login móvil */}
            <div className="pt-2 border-t border-white/20">
              <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-white text-[#8b2942] hover:bg-white/90 font-semibold">
                  <User className="h-4 w-4 mr-2" />
                  Iniciar sesión
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
