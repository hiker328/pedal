"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Clock, ExternalLink } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function PaymentResultPage() {
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [status, setStatus] = useState<"loading" | "success" | "error" | "pending">("loading")
  const [paymentData, setPaymentData] = useState<any>(null)

  useEffect(() => {
    const processPaymentResult = async () => {
      try {
        // Extrai os parâmetros da URL
        const orderId = searchParams.get("order_id")
        const nsu = searchParams.get("nsu")
        const aut = searchParams.get("aut")
        const cardBrand = searchParams.get("card_brand")
        const warning = searchParams.get("warning")

        if (warning) {
          setStatus("error")
          setPaymentData({ error: warning, orderId })
          toast({
            title: "Erro no pagamento",
            description: warning,
            variant: "destructive",
          })
          return
        }

        if (nsu && aut) {
          // Pagamento aprovado
          setStatus("success")
          setPaymentData({
            orderId,
            nsu,
            aut,
            cardBrand,
            message: "Pagamento processado com sucesso!"
          })

          // Envia os dados para a API
          try {
            const response = await fetch("/api/payment-result", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                order_id: orderId,
                nsu,
                aut,
                card_brand: cardBrand,
                user_id: searchParams.get("user_id"),
                access_id: searchParams.get("access_id"),
                handle: searchParams.get("handle"),
                merchant_document: searchParams.get("merchant_document")
              })
            })

            if (response.ok) {
              toast({
                title: "Inscrição confirmada!",
                description: "Seus dados foram salvos com sucesso. Você receberá um email de confirmação.",
              })
            }
          } catch (apiError) {
            console.error("Erro ao processar resultado:", apiError)
          }
        } else {
          setStatus("pending")
          setPaymentData({ orderId, message: "Aguardando confirmação do pagamento" })
        }
      } catch (error) {
        console.error("Erro ao processar resultado:", error)
        setStatus("error")
        setPaymentData({ error: "Erro ao processar resultado do pagamento" })
      }
    }

    processPaymentResult()
  }, [searchParams, toast])

  const getStatusIcon = () => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-16 w-16 text-green-500" />
      case "error":
        return <XCircle className="h-16 w-16 text-red-500" />
      case "pending":
        return <Clock className="h-16 w-16 text-yellow-500" />
      default:
        return <Clock className="h-16 w-16 text-blue-500 animate-spin" />
    }
  }

  const getStatusTitle = () => {
    switch (status) {
      case "success":
        return "Pagamento Aprovado!"
      case "error":
        return "Erro no Pagamento"
      case "pending":
        return "Processando Pagamento"
      default:
        return "Verificando Pagamento"
    }
  }

  const getStatusMessage = () => {
    switch (status) {
      case "success":
        return "Sua inscrição foi confirmada com sucesso! Você receberá um email de confirmação em breve."
      case "error":
        return paymentData?.error || "Ocorreu um erro durante o processamento do pagamento."
      case "pending":
        return "Aguardando confirmação do pagamento. Isso pode levar alguns minutos."
      default:
        return "Verificando o status do seu pagamento..."
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            {getStatusIcon()}
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">
            {getStatusTitle()}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-center text-gray-600">
            {getStatusMessage()}
          </p>

          {paymentData && (
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              {paymentData.orderId && (
                <div className="flex justify-between">
                  <span className="font-medium">Pedido:</span>
                  <span className="text-sm text-gray-600">{paymentData.orderId}</span>
                </div>
              )}
              {paymentData.nsu && (
                <div className="flex justify-between">
                  <span className="font-medium">NSU:</span>
                  <span className="text-sm text-gray-600">{paymentData.nsu}</span>
                </div>
              )}
              {paymentData.aut && (
                <div className="flex justify-between">
                  <span className="font-medium">Autorização:</span>
                  <span className="text-sm text-gray-600">{paymentData.aut}</span>
                </div>
              )}
              {paymentData.cardBrand && (
                <div className="flex justify-between">
                  <span className="font-medium">Bandeira:</span>
                  <span className="text-sm text-gray-600 capitalize">{paymentData.cardBrand}</span>
                </div>
              )}
            </div>
          )}

          <div className="flex gap-3">
            <Button
              onClick={() => window.location.href = "/"}
              variant="outline"
              className="flex-1"
            >
              Voltar ao Início
            </Button>
            {status === "success" && (
              <Button
                onClick={() => window.open("https://pedal12.vercel.app", "_blank")}
                className="flex-1 bg-green-500 hover:bg-green-600"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Ver Evento
              </Button>
            )}
          </div>

          {status === "error" && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-800">
                Se você acredita que o pagamento foi realizado, entre em contato conosco:
                <br />
                <strong>contato@pedal2026.com.br</strong>
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
