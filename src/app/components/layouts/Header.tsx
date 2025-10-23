"use client"

import Link from "next/link"
import { Search, Menu, X, User } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCartDrawer } from "@/components/ui/shopping-cart"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-[#8b2942] via-[rgb(223,125,148)] to-[#a71c3a] shadow-lg">
      <div className="max-w-7xl mx-auto">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo + Brand */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <img
                src="logoredondo.jpg"
                alt="Logo Artesanías"
                className="h-14 w-14 object-contain transition-transform group-hover:scale-110 duration-300"
              />
              <div className="absolute inset-0 bg-white/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-2xl text-white tracking-tight">El Arte de Vivir</span>
              <span className="text-xs text-white/80 font-light">Artesanías Exclusivas</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link href="/">
              <Button
                variant="ghost"
                className="text-white hover:bg-white/20 hover:text-white transition-all duration-300 font-medium"
              >
                Inicio
              </Button>
            </Link>
            <Link href="/arte">
              <Button
                variant="ghost"
                className="text-white hover:bg-white/20 hover:text-white transition-all duration-300 font-medium"
              >
                Arte
              </Button>
            </Link>
            <Link href="/perfumes">
              <Button
                variant="ghost"
                className="text-white hover:bg-white/20 hover:text-white transition-all duration-300 font-medium"
              >
                Perfumes
              </Button>
            </Link>
            <Link href="/artesanias">
              <Button
                variant="ghost"
                className="text-white hover:bg-white/20 hover:text-white transition-all duration-300 font-medium"
              >
                Artesanías
              </Button>
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-2">
            {/* Search Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-white hover:bg-white/20 transition-all duration-300 hidden md:flex"
            >
              <Search className="h-5 w-5" />
            </Button>

            
         

            {/* Login Button */}
            <Link href="/login" className="hidden md:block">
              <Button className="bg-white text-[#8b2942] hover:bg-white/90 font-semibold transition-all duration-300 shadow-md hover:shadow-lg">
                <User className="h-4 w-4 mr-2" />
                Iniciar sesión
              </Button>
            </Link>

            {/* Mobile Menu Button */}
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

        {/* Search Bar (Desktop) */}
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

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden px-6 pb-4 space-y-2 animate-in slide-in-from-top duration-300">
            <Link href="/" onClick={() => setIsMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/20 font-medium">
                Inicio
              </Button>
            </Link>
            <Link href="/arte" onClick={() => setIsMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/20 font-medium">
                Arte
              </Button>
            </Link>
            <Link href="/perfumes" onClick={() => setIsMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/20 font-medium">
                Perfumes
              </Button>
            </Link>
            <Link href="/artesanias" onClick={() => setIsMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/20 font-medium">
                Artesanías
              </Button>
            </Link>
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
  )
}


