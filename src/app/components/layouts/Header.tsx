"use client";

import Link from "next/link";
import { Search, Menu, X, User, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import DropdownCategorias from "../ui/CategoryDropdown";
import { useCategorias } from "src/hooks/useCategorias";
import { useUser, SignInButton, UserButton } from "@clerk/nextjs";
import { ShoppingCartDrawer } from "@/components/ui/shopping-cart";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const { categorias, cargando, error } = useCategorias();
  const { isSignedIn, user } = useUser();

  // 🔹 Cierra dropdown al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside, true);
    return () => document.removeEventListener("click", handleClickOutside, true);
  }, []);

  // 🔹 Alternar dropdown
  const toggleDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-[#8b2942] via-[rgb(223,125,148)] to-[#a71c3a] shadow-lg">
      <div className="max-w-7xl mx-auto">
        {/* 🔸 BARRA SUPERIOR */}
        <div className="flex items-center justify-between px-6 py-4">
          {/* LOGO */}
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

          {/* 🔸 NAV DESKTOP */}
          <nav className="hidden md:flex items-center space-x-1 relative">
            <Link href="/">
              <Button
                variant="ghost"
                className="text-white hover:bg-white/20 transition-all font-medium"
              >
                Inicio
              </Button>
            </Link>

            {/* 🔸 DROPDOWN PRODUCTOS */}
            <div className="relative" ref={dropdownRef}>
              <Button
                ref={buttonRef}
                variant="ghost"
                onClick={toggleDropdown}
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
                  onClose={() => setIsDropdownOpen(false)}
                />
              )}
            </div>

            <Link href="https://maps.app.goo.gl/ZhHhj461jnmKvfMM7" target="_blank">
              <Button
                variant="ghost"
                className="text-white hover:bg-white/20 transition-all font-medium"
              >
                Visítanos
              </Button>
            </Link>
          </nav>

          {/* 🔸 ACCIONES DERECHA */}
          <div className="flex items-center space-x-3">
            {/* 🔹 BUSCAR */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-white hover:bg-white/20 hidden md:flex"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* 🔹 CARRITO */}
            <div className="relative hidden md:block">
              <ShoppingCartDrawer />
            </div>

            {/* 🔹 AUTH */}
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

            {/* 🔹 MENÚ MÓVIL */}
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

        {/* 🔸 BARRA DE BÚSQUEDA */}
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

        {/* 🔸 MENÚ MÓVIL */}
        {isMenuOpen && (
          <div className="md:hidden px-6 pb-4 space-y-2 animate-in slide-in-from-top duration-300">
            <Link href="/" onClick={() => setIsMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/20 font-medium">
                Inicio
              </Button>
            </Link>

            {/* Dropdown en móvil */}
            <div>
              <Button
                onClick={toggleDropdown}
                className="w-full justify-start text-white hover:bg-white/20 font-medium flex items-center"
              >
                Productos
                <ChevronDown
                  className={`ml-2 h-4 w-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                />
              </Button>
              {isDropdownOpen && (
                <div className="ml-4">
                  <DropdownCategorias
                    categorias={categorias}
                    cargando={cargando}
                    error={error}
                    onClose={() => setIsDropdownOpen(false)}
                  />
                </div>
              )}
            </div>

            <Link href="/visitanos" onClick={() => setIsMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/20 font-medium">
                Visítanos
              </Button>
            </Link>

            {/* 🔹 CARRITO EN MENÚ MÓVIL */}
            <div className="pt-3 border-t border-white/20">
              <ShoppingCartDrawer />
            </div>

            {/* 🔹 AUTH EN MÓVIL */}
            <div className="pt-2 border-t border-white/20">
              {isSignedIn ? (
                <div className="flex justify-between items-center text-white">
                  <span>Hola, {user?.firstName || user?.username}</span>
                  <UserButton afterSignOutUrl="/" />
                </div>
              ) : (
                <SignInButton mode="modal">
                  <Button className="w-full bg-white text-[#8b2942] hover:bg-white/90 font-semibold">
                    Iniciar sesión
                  </Button>
                </SignInButton>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
