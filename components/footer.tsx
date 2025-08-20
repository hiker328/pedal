"use client"

import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer id="contato" className="bg-blue-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">PEDAL 2026</h3>
            <p className="text-blue-200 mb-4">
              O maior evento de inovação e tecnologia do Brasil. Junte-se a nós para uma experiência única e
              transformadora.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-200 hover:text-white transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-blue-200 hover:text-white transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2 text-blue-200">
              <li>
                <a href="#inicio" className="hover:text-white transition-colors">
                  Início
                </a>
              </li>
              <li>
                <a href="#sobre" className="hover:text-white transition-colors">
                  Sobre o Evento
                </a>
              </li>
              <li>
                <a href="#programacao" className="hover:text-white transition-colors">
                  Programação
                </a>
              </li>
              <li>
                <a href="#localizacao" className="hover:text-white transition-colors">
                  Localização
                </a>
              </li>
              <li>
                <a href="#inscricao" className="hover:text-white transition-colors">
                  Inscrições
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contato</h4>
            <div className="space-y-3 text-blue-200">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                <span>contato@pedal2026.com.br</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                <span>+55 11 9999-8888</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>Av. Principal, 1500 - São Paulo, SP</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-200">
          <p>&copy; 2024 PEDAL 2026. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
