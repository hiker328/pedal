"use client"

import { Calendar, MapPin, Users, Gift } from "lucide-react"

export function EventInfo() {
  return (
    <section id="sobre" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">INFORMAÇÕES DO EVENTO</h2>
          <div className="w-20 h-1 bg-red-500 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-red-500 text-white p-6 rounded-lg text-center">
            <Calendar className="h-12 w-12 mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">Data e Horário</h3>
            <p className="text-sm">18 de Janeiro 2026</p>
            <p className="text-sm">Das 7h às 18h</p>
          </div>

          <div className="bg-gray-100 p-6 rounded-lg text-center">
            <MapPin className="h-12 w-12 mx-auto mb-4 text-gray-600" />
            <h3 className="font-bold text-lg mb-2 text-gray-800">Localização</h3>
            <p className="text-sm text-gray-600">Centro de Convenções</p>
            <p className="text-sm text-gray-600">Av. Principal, 1500</p>
            <p className="text-sm text-gray-600">São Paulo - SP</p>
          </div>

          <div className="bg-blue-900 text-white p-6 rounded-lg text-center">
            <Users className="h-12 w-12 mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">Ingressos</h3>
            <p className="text-sm">Acesso completo: R$ 130,00</p>
            <p className="text-sm">Estudantes: R$ 135,00</p>
          </div>

          <div className="bg-green-500 text-white p-6 rounded-lg text-center">
            <Gift className="h-12 w-12 mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">Kit Incluso</h3>
            <p className="text-sm">Camiseta + Bandana</p>
            <p className="text-sm">Mochila + Alimentação</p>
          </div>
        </div>

        <div className="bg-gray-50 p-8 rounded-lg">
          <h3 className="text-2xl font-bold text-center text-blue-900 mb-6">O que está incluso na sua inscrição:</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-lg mb-3 text-red-500">🎽 Kit Completo</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• Camiseta oficial do evento</li>
                <li>• Bandana personalizada</li>
                <li>• Mochila esportiva</li>
                <li>• Número de peito</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-3 text-red-500">🍽️ Alimentação</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• Café da manhã completo</li>
                <li>• Hidratação durante o percurso</li>
                <li>• Almoço após o evento</li>
                <li>• Frutas e energéticos</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
