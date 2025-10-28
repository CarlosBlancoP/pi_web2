"use client";

import Link from "next/link";
import { Search, Menu, X, User, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import DropdownCategorias from "../ui/CategoryDropdown";
import { useCategorias } from "src/hooks/useCategorias";
import { useUser, SignInButton, UserButton } from "@clerk/nextjs";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { categorias, cargando, error } = useCategorias();
  const { isSignedIn, user } = useUser();

  // Cerrar el dropdown si se hace click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleDropdownToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-[#8b2942] via-[rgb(223,125,148)] to-[#a71c3a] shadow-lg">
      <div className="max-w-7xl mx-auto">
        {/* 🔹 Top Bar */}
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo */}
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
                className="text-white hover:bg-white/20 transition-all font-medium"
              >
                Inicio
              </Button>
            </Link>

            {/* Dropdown Productos */}
            <div className="relative" ref={dropdownRef}>
              <Button
                ref={buttonRef}
                variant="ghost"
                onClick={handleDropdownToggle}
                className="text-white hover:bg-white/20 font-medium flex items-center"
              >
                Productos
                <ChevronDown
                  className={`ml-1 h-4 w-4 transition-transform duration-300 ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </Button>

              {isDropdownOpen && (
                <DropdownCategorias
                  categorias={categorias}
                  cargando={cargando}
                  error={error}
                  visible={isDropdownOpen}
                  setVisible={setIsDropdownOpen}
                />
              )}
            </div>

            <Link href="/visitanos">
              <Button
                variant="ghost"
                className="text-white hover:bg-white/20 transition-all font-medium"
              >
                Visítanos
              </Button>
            </Link>
          </nav>

          {/* 🔹 Botones derecha */}
          <div className="flex items-center space-x-3">
            {/* Búsqueda */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-white hover:bg-white/20 hidden md:flex"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Clerk Auth */}
            {isSignedIn ? (
              <div className="flex items-center space-x-2">
                <span className="hidden sm:inline text-sm text-white/90">
                  Hola,{" "}
                  <span className="font-semibold text-white">
                    {user?.firstName || user?.username}
                  </span>
                </span>
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "w-9 h-9 border-2 border-white",
                    },
                  }}
                  afterSignOutUrl="/"
                />
              </div>
            ) : (
              <SignInButton mode="modal">
                <Button className="bg-white text-[#8b2942] hover:bg-white/90 font-semibold shadow-md hover:shadow-lg">
                  <User className="h-4 w-4 mr-2" />
                  Iniciar sesión
                </Button>
              </SignInButton>
            )}

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
                className="w-full px-4 py-3 pl-12 rounded-lg bg-white/95 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 shadow-lg"
                autoFocus
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
