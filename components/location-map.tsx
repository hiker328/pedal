"use client"

export function LocationMap() {
  return (
    <section id="localizacao" className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">COMO CHEGAR</h2>
          <div className="w-20 h-1 bg-red-500 mx-auto"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="aspect-video bg-gray-200 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🗺️</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Mapa do Local do Evento</h3>
                <p className="text-gray-600">Centro de Convenções</p>
                <p className="text-gray-600">Av. Principal, 1500 - São Paulo, SP</p>
                <div className="mt-4">
                  <a
                    href="https://maps.app.goo.gl/gdgai8PgHJoVtaAV8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Ver no Google Maps
                  </a>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl mb-2">🚗</div>
                  <h4 className="font-semibold mb-2">De Carro</h4>
                  <p className="text-sm text-gray-600">Estacionamento gratuito disponível no local</p>
                </div>

                <div className="text-center">
                  <div className="text-3xl mb-2">🚇</div>
                  <h4 className="font-semibold mb-2">Transporte Público</h4>
                  <p className="text-sm text-gray-600">Estação Metro Linha Azul - 500m do local</p>
                </div>

                <div className="text-center">
                  <div className="text-3xl mb-2">🚌</div>
                  <h4 className="font-semibold mb-2">Ônibus</h4>
                  <p className="text-sm text-gray-600">Linhas 100, 200, 300 param em frente ao evento</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
