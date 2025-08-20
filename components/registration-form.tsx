"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Trash2, Plus, Users, CreditCard, Smartphone, ExternalLink } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ErrorDisplay } from "@/components/error-display"

interface Participant {
  nome: string
  tamanho_camisa: string
  cidade_origem: string
  equipe: string
}

export function RegistrationForm() {
  const [participants, setParticipants] = useState<Participant[]>([
    { nome: "", tamanho_camisa: "", cidade_origem: "", equipe: "" },
  ])
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "card">("pix")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [paymentData, setPaymentData] = useState<{
    orderId: string
    deeplink: string
    amount: number
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const shirtSizes = ["PP", "P", "M", "G", "GG", "XG", "XXG"]

  const addParticipant = () => {
    const lastParticipant = participants[participants.length - 1]
    setParticipants([
      ...participants,
      {
        nome: "",
        tamanho_camisa: "",
        cidade_origem: lastParticipant.cidade_origem,
        equipe: lastParticipant.equipe,
      },
    ])
  }

  const removeParticipant = (index: number) => {
    if (participants.length > 1) {
      setParticipants(participants.filter((_, i) => i !== index))
    }
  }

  const updateParticipant = (index: number, field: keyof Participant, value: string) => {
    const updated = participants.map((participant, i) =>
      i === index ? { ...participant, [field]: value } : participant,
    )
    setParticipants(updated)
  }

  const fillSameData = (index: number, field: "cidade_origem" | "equipe") => {
    const value = participants[index][field]
    if (value) {
      const updated = participants.map((participant) => ({ ...participant, [field]: value }))
      setParticipants(updated)
    }
  }

  const validateForm = () => {
    for (const participant of participants) {
      if (!participant.nome || !participant.tamanho_camisa) {
        toast({
          title: "Erro de validação",
          description: "Nome e tamanho da camisa são obrigatórios para todos os participantes.",
          variant: "destructive",
        })
        return false
      }
    }
    return true
  }

  const openInfinitePay = () => {
    if (paymentData?.deeplink) {
      // Tenta abrir o app InfinitePay
      window.location.href = paymentData.deeplink
      
      toast({
        title: "Abrindo InfinitePay...",
        description: "Se o app não abrir automaticamente, abra o InfinitePay manualmente.",
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null) // Limpa erros anteriores

    if (!validateForm()) return

    setIsLoading(true)

    try {
      const amount = paymentMethod === "pix" ? 130 : 135
      const totalAmount = amount * participants.length

      const paymentResponse = await fetch("/api/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: totalAmount * 100, // Converte para centavos
          paymentMethod,
          participants: participants.length,
          customerName: participants[0].nome,
          participantsData: participants,
        }),
      })

      const responseData = await paymentResponse.json()

      if (!paymentResponse.ok) {
        throw new Error(responseData.error || "Erro ao criar pagamento")
      }

      // Salva os dados do pagamento
      setPaymentData({
        orderId: responseData.orderId,
        deeplink: responseData.deeplink,
        amount: totalAmount,
      })

      setShowPaymentModal(true)

      toast({
        title: "Pagamento criado com sucesso!",
        description: `${participants.length} pessoa(s). Total: R$ ${totalAmount.toFixed(2)}. Abra o InfinitePay para finalizar o pagamento.`,
      })

      // Reset form após criar pagamento
      setParticipants([{ nome: "", tamanho_camisa: "", cidade_origem: "", equipe: "" }])
    } catch (error) {
      console.error("Erro:", error)
      const errorMessage = error instanceof Error ? error.message : "Tente novamente mais tarde."
      setError(errorMessage)
      toast({
        title: "Erro na inscrição",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const totalAmount = (paymentMethod === "pix" ? 130 : 135) * participants.length

  return (
    <section id="inscricao" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">FORMULÁRIO DE INSCRIÇÃO</h2>
          <div className="w-20 h-1 bg-red-500 mx-auto"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          {error && <ErrorDisplay error={error} onRetry={() => setError(null)} />}
          <form onSubmit={handleSubmit} className="space-y-8">
            <Card className="border-2 border-gray-200">
              <CardHeader className="bg-gray-50">
                <CardTitle className="flex items-center gap-2 text-blue-900">
                  <Users className="h-6 w-6" />
                  Participantes ({participants.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {participants.map((participant, index) => (
                  <div key={index} className="border-2 border-gray-100 rounded-lg p-6 space-y-4 bg-gray-50">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-lg text-blue-900">Participante {index + 1}</h4>
                      {participants.length > 1 && (
                        <Button type="button" variant="outline" size="sm" onClick={() => removeParticipant(index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`nome-${index}`} className="text-sm font-semibold text-gray-700">
                          Nome Completo *
                        </Label>
                        <Input
                          id={`nome-${index}`}
                          value={participant.nome}
                          onChange={(e) => updateParticipant(index, "nome", e.target.value)}
                          placeholder="Digite o nome completo"
                          required
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor={`tamanho-${index}`} className="text-sm font-semibold text-gray-700">
                          Tamanho da Camisa *
                        </Label>
                        <Select
                          value={participant.tamanho_camisa}
                          onValueChange={(value) => updateParticipant(index, "tamanho_camisa", value)}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Selecione o tamanho" />
                          </SelectTrigger>
                          <SelectContent>
                            {shirtSizes.map((size) => (
                              <SelectItem key={size} value={size}>
                                {size}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Label htmlFor={`cidade-${index}`} className="text-sm font-semibold text-gray-700">
                            Cidade
                          </Label>
                          {index > 0 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => fillSameData(index, "cidade_origem")}
                              className="text-xs text-red-500 hover:text-red-600"
                            >
                              Usar para todos
                            </Button>
                          )}
                        </div>
                        <Input
                          id={`cidade-${index}`}
                          value={participant.cidade_origem}
                          onChange={(e) => updateParticipant(index, "cidade_origem", e.target.value)}
                          placeholder="Cidade de origem"
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Label htmlFor={`equipe-${index}`} className="text-sm font-semibold text-gray-700">
                            Equipe
                          </Label>
                          {index > 0 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => fillSameData(index, "equipe")}
                              className="text-xs text-red-500 hover:text-red-600"
                            >
                              Usar para todos
                            </Button>
                          )}
                        </div>
                        <Input
                          id={`equipe-${index}`}
                          value={participant.equipe}
                          onChange={(e) => updateParticipant(index, "equipe", e.target.value)}
                          placeholder="Nome da equipe"
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  onClick={addParticipant}
                  className="w-full border-2 border-dashed border-gray-300 hover:border-red-500 hover:text-red-500 py-6 bg-transparent"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Adicionar Participante
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-200">
              <CardHeader className="bg-gray-50">
                <CardTitle className="text-blue-900">Forma de Pagamento</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={(value: "pix" | "card") => setPaymentMethod(value)}
                  className="grid md:grid-cols-2 gap-4"
                >
                  <div className="flex items-center space-x-3 border-2 rounded-lg p-6 hover:border-green-500 transition-colors">
                    <RadioGroupItem value="pix" id="pix" />
                    <Label htmlFor="pix" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <Smartphone className="h-8 w-8 text-green-500" />
                        <div>
                          <div className="font-bold text-lg">PIX</div>
                          <div className="text-green-600 font-semibold">R$ 130,00 por pessoa</div>
                          <div className="text-sm text-gray-600">Aprovação instantânea</div>
                        </div>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3 border-2 rounded-lg p-6 hover:border-blue-500 transition-colors">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-8 w-8 text-blue-500" />
                        <div>
                          <div className="font-bold text-lg">Cartão de Crédito</div>
                          <div className="text-blue-600 font-semibold">R$ 135,00 por pessoa</div>
                          <div className="text-sm text-gray-600">Pagamento em 1x</div>
                        </div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>

                <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border-2 border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-lg text-gray-800">Total a Pagar:</span>
                    <span className="text-3xl font-bold text-green-600">R$ {totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {participants.length} pessoa(s) × R$ {paymentMethod === "pix" ? "130,00" : "135,00"}
                  </div>
                  <div className="mt-3 text-xs text-gray-500">
                    * Os dados serão salvos apenas após a confirmação do pagamento
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Modal do InfinitePay */}
            <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle className="text-center text-2xl font-bold text-blue-900">
                    Pagamento com InfinitePay
                  </DialogTitle>
                </DialogHeader>

                <div className="text-center space-y-4">
                  <div className="p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      R$ {paymentData?.amount.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-600">
                      {participants.length} participante(s)
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-gray-700">
                      Para finalizar sua inscrição, você será redirecionado para o app InfinitePay.
                    </p>
                    
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <p className="text-sm text-yellow-800">
                        <strong>Importante:</strong> Certifique-se de ter o app InfinitePay instalado no seu dispositivo.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button onClick={() => setShowPaymentModal(false)} variant="outline" className="flex-1">
                      Cancelar
                    </Button>
                    <Button
                      onClick={openInfinitePay}
                      className="flex-1 bg-green-500 hover:bg-green-600"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Abrir InfinitePay
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 text-white py-6 text-xl font-bold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? "Processando..." : `CONFIRMAR INSCRIÇÃO - R$ ${totalAmount.toFixed(2)}`}
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
