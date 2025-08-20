"use client"

import { Button } from "@/components/ui/button"

export function Hero() {
  const scrollToForm = () => {
    document.getElementById("inscricao")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="inicio"
      className="relative bg-gradient-to-br from-red-500 via-red-600 to-blue-600 text-white py-20 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border-2 border-white rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 border-2 border-white rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">PEDAL 2026</h1>

          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 mb-8 inline-block">
            <h2 className="text-2xl md:text-3xl font-semibold mb-2">REGISTRE-SE AGORA</h2>
            <div className="h-1 bg-red-300 w-32 mx-auto mb-4"></div>
            <p className="text-lg md:text-xl opacity-90">INGRESSOS LIMITADOS - 80% VAGAS OCUPADAS</p>
          </div>

          <Button
            onClick={scrollToForm}
            size="lg"
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 text-lg font-bold rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            INSCREVER-SE JÁ
          </Button>

          <div className="mt-8 text-sm opacity-80">
            <p>18 de Janeiro de 2026 • 07:00h • Inclui Kit Completo + Alimentação</p>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-gray-50 to-transparent"></div>
    </section>
  )
}
