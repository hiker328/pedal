"use client"

import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setIsMenuOpen(false)
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="font-bold text-xl text-blue-900">PEDAL 2026</div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => scrollToSection("inicio")}
              className="text-gray-700 hover:text-red-500 transition-colors"
            >
              Início
            </button>
            <button
              onClick={() => scrollToSection("sobre")}
              className="text-gray-700 hover:text-red-500 transition-colors"
            >
              Sobre
            </button>
            <button
              onClick={() => scrollToSection("programacao")}
              className="text-gray-700 hover:text-red-500 transition-colors"
            >
              Programação
            </button>
            <button
              onClick={() => scrollToSection("localizacao")}
              className="text-gray-700 hover:text-red-500 transition-colors"
            >
              Localização
            </button>
            <button
              onClick={() => scrollToSection("contato")}
              className="text-gray-700 hover:text-red-500 transition-colors"
            >
              Contato
            </button>
          </nav>

          <div className="hidden md:block">
            <Button
              onClick={() => scrollToSection("inscricao")}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-semibold"
            >
              VAGAS LIMITADAS!
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <button onClick={() => scrollToSection("inicio")} className="text-left text-gray-700 hover:text-red-500">
                Início
              </button>
              <button onClick={() => scrollToSection("sobre")} className="text-left text-gray-700 hover:text-red-500">
                Sobre
              </button>
              <button
                onClick={() => scrollToSection("programacao")}
                className="text-left text-gray-700 hover:text-red-500"
              >
                Programação
              </button>
              <button
                onClick={() => scrollToSection("localizacao")}
                className="text-left text-gray-700 hover:text-red-500"
              >
                Localização
              </button>
              <button onClick={() => scrollToSection("contato")} className="text-left text-gray-700 hover:text-red-500">
                Contato
              </button>
              <Button
                onClick={() => scrollToSection("inscricao")}
                className="bg-red-500 hover:bg-red-600 text-white w-full mt-4"
              >
                INSCREVER-SE JÁ
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
